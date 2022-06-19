import datetime
import time
import threading
from alice_blue import *
import pandas as pd
from openpyxl import load_workbook, Workbook
from config1 import Credentials

# To make django-models work outside django
import sys
import os
import django
sys.path.append("/Users/nitishgupta/Desktop/algoTrade/backend")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
from strategiesAPI.models import LTP


SCRIPT_LIST = [
    'ACC', 'ADANIENT', 'ADANIPORTS', 'AMBUJACEM', 'APOLLOHOSP', 'ASIANPAINT', 'AUBANK',
    'AUROPHARMA', 'AXISBANK', 'BAJAJ-AUTO', 'BAJFINANCE', 'BATAINDIA', 'BHARATFORG',
    'BHARTIARTL', 'BIOCON', 'BPCL', 'CHOLAFIN', 'CIPLA', 'COALINDIA', 'COFORGE', 'DABUR',
    'DIVISLAB', 'DLF', 'DRREDDY', 'EICHERMOT', 'GODREJCP', 'GODREJPROP', 'GRASIM', 'HAVELLS',
    'HCLTECH', 'HDFC', 'HDFCBANK', 'HDFCLIFE', 'HEROMOTOCO', 'HINDALCO', 'HINDPETRO',
    'HINDUNILVR', 'ICICIBANK', 'ICICIPRULI', 'IGL', 'INDIGO', 'INDUSINDBK', 'INFY',
    'IRCTC', 'ITC', 'JINDALSTEL', 'JSWSTEEL', 'JUBLFOOD', 'KOTAKBANK', 'LICHSGFIN',
    'LT', 'LTI', 'LUPIN', 'M&M', 'MANAPPURAM', 'MARUTI', 'MINDTREE', 'MUTHOOTFIN',
    'PEL', 'PIDILITIND', 'PVR', 'RELIANCE', 'SBICARD', 'SBILIFE', 'SBIN', 'SRF',
    'SRTRANSFIN', 'SUNPHARMA', 'TATACHEM', 'TATACONSUM', 'TATAMOTORS', 'TATAPOWER',
    'TATASTEEL', 'TCS', 'TECHM', 'TITAN', 'TVSMOTOR', 'UPL', 'VEDL', 'VOLTAS', 'WIPRO',
    'ZEEL']

socket_opened = False
df = pd.DataFrame()
df_final = pd.DataFrame()
ORB_timeFrame = 60  # in seconds
x = 1

# Creates a new file
filepath = f'/Users/nitishgupta/Desktop/algoTrade/day_data/{datetime.datetime.now().strftime("%Y-%m-%d")}_1MIN.xlsx'
wb = Workbook()
wb.save(filepath)


def login():
    access_token = AliceBlue.login_and_get_access_token(
        username=Credentials.UserName.value,
        password=Credentials.PassWord.value,
        twoFA=Credentials.TwoFA.value,
        api_secret=Credentials.SecretKey.value,
        app_id=Credentials.AppId.value)
    alice = AliceBlue(username=Credentials.UserName.value,
                      password=Credentials.PassWord.value,
                      access_token=access_token)

    alice.start_websocket(subscribe_callback=event_handler_quote_update,
                          socket_open_callback=open_callback,
                          run_in_background=True)

    while not socket_opened:
        pass

    alice.subscribe([
        alice.get_instrument_by_symbol('NSE', i.upper()) for i in SCRIPT_LIST
    ], LiveFeedType.MARKET_DATA)


def event_handler_quote_update(message):
    # print(message)
    ltp = message['ltp']
    instrument = message['instrument'].symbol

    # update live LTP to database
    q = LTP.objects.get(name=instrument)
    q.ltp = ltp
    q.save()

    timestamp = pd.to_datetime(message['exchange_time_stamp'], unit='s')
    # timestamp = datetime.datetime.fromtimestamp(message['exchange_time_stamp'])
    vol = message['volume']
    exchange = message['instrument'].exchange
    high = message['high']
    low = message['low']
    global df
    df_new = pd.DataFrame(
        {
            'symbol': instrument,
            'timestamp': timestamp,
            'vol': vol,
            'ltp': ltp,
            'high': high,
            'low': low,
            'exchange': exchange
        },
        index=[0])
    df = pd.concat([df, df_new], ignore_index=True)
    print(f"{instrument} : {ltp} : {timestamp} : {vol}")


def open_callback():
    global socket_opened
    socket_opened = True
    print("Socket opened")


def create_ohlc():
    start = time.time()
    global df
    copydf = df.copy(deep=True).drop_duplicates()
    df = pd.DataFrame()
    get_ohlc(copydf)
    interval = ORB_timeFrame - (time.time() - start)
    print(
        f"Next check will start after {interval} sec : {datetime.datetime.now()}"
    )

    threading.Timer(interval, create_ohlc).start()


def get_ohlc(dataframe):
    grouped = dataframe.groupby('symbol')
    global df_final
    global x
    book = load_workbook(
        f'/Users/nitishgupta/Desktop/algoTrade/day_data/{datetime.datetime.now().strftime("%Y-%m-%d")}_1MIN.xlsx')
    writer = pd.ExcelWriter(
        f'/Users/nitishgupta/Desktop/algoTrade/day_data/{datetime.datetime.now().strftime("%Y-%m-%d")}_1MIN.xlsx',
        engine='openpyxl')
    writer.book = book

    x = 1
    for name, group in grouped:
        group = group.sort_values('timestamp')
        timestamp = group['timestamp'].iloc[0]
        symbol = name
        volume = group['vol'].iloc[-1] - group['vol'].iloc[0]
        open = group['ltp'].iloc[0]
        close = group['ltp'].iloc[-1]
        high = group['ltp'].max()
        low = group['ltp'].min()
        exchange = group['exchange'].iloc[0]
        data = {
            'timestamp': timestamp,
            'symbol': symbol,
            'volume': volume,
            'open': open,
            'close': close,
            'high': high,
            'low': low,
            'exchange': exchange
        }

        df_append = pd.DataFrame(data, index=[0])
        df_append.to_excel(writer, header=False, index=False, startrow=x, startcol=0)
        x += 1
    writer.save()
    book.close()


if __name__ == '__main__':
    while ((datetime.datetime.now().time() <= datetime.time(9, 14, 25))
           or (datetime.datetime.now().time() >= datetime.time(15, 30, 00))):
        pass

    login()
    main_interval = ORB_timeFrame - datetime.datetime.now().second
    # interval = (5 - datetime.datetime.now().minute % 5) * 60 - (
    # datetime.datetime.now().second)
    print("start in ", main_interval)
    time.sleep(main_interval)
    create_ohlc()
