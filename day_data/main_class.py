import datetime
import time
from time import localtime, strftime
import threading
from alice_blue import *
import pandas as pd
from config import Credentials

SCRIPT_LIST = [
    'ACC', 'AUBANK', 'ADANIENT', 'ADANIPORTS', 'AMBUJACEM', 'APOLLOHOSP',
    'ASIANPAINT', 'AUROPHARMA', 'AXISBANK', 'BAJAJ-AUTO', 'BAJFINANCE',
    'BATAINDIA', 'BHARATFORG', 'BPCL', 'BHARTIARTL', 'BIOCON', 'CHOLAFIN',
    'CIPLA', 'COALINDIA', 'COFORGE', 'DLF', 'DABUR', 'DIVISLAB', 'DRREDDY',
    'EICHERMOT', 'GODREJCP', 'GODREJPROP', 'GRASIM', 'HCLTECH', 'HDFCBANK',
    'HDFCLIFE', 'HAVELLS', 'HEROMOTOCO', 'HINDALCO', 'HINDPETRO', 'HINDUNILVR',
    'HDFC', 'ICICIBANK', 'ICICIPRULI', 'ITC', 'IRCTC', 'IGL', 'INDUSINDBK',
    'INFY', 'INDIGO', 'JSWSTEEL', 'JINDALSTEL', 'JUBLFOOD', 'KOTAKBANK',
    'LICHSGFIN', 'LTI', 'LT', 'LUPIN', 'M&M', 'MANAPPURAM', 'MARUTI',
    'MINDTREE', 'MUTHOOTFIN', 'PVR', 'PIDILITIND', 'PEL', 'RELIANCE',
    'SBICARD', 'SBILIFE', 'SRF', 'SRTRANSFIN', 'SBIN', 'SUNPHARMA', 'TVSMOTOR',
    'TATACHEM', 'TCS', 'TATACONSUM', 'TATAMOTORS', 'TATAPOWER', 'TATASTEEL',
    'TECHM', 'TITAN', 'UPL', 'VEDL', 'VOLTAS', 'WIPRO', 'ZEEL'
]

socket_opened = False
df = pd.DataFrame()
df_final = pd.DataFrame()
ORB_timeFrame = 300  # in seconds


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

    while (socket_opened == False):
        pass

    alice.subscribe([
        alice.get_instrument_by_symbol('NSE', i.upper()) for i in SCRIPT_LIST
    ], LiveFeedType.MARKET_DATA)


def event_handler_quote_update(message):
    ltp = message['ltp']
    timestamp = datetime.datetime.fromtimestamp(message['exchange_time_stamp'])
    vol = message['volume']
    instrument = message['instrument'].symbol
    exchange = message['instrument'].exchange
    high = message['high']
    low = message['low']
    global df
    currentTime = time.strftime("%Y-%m-%d %H:%M:%S", localtime())
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
    print(f"{instrument} {ltp} : {timestamp} : {vol} : {currentTime}")


def open_callback():
    global socket_opened
    socket_opened = True
    print("Socket opened")


def createOHLC():
    start = time.time()
    global df
    copydf = df.copy(deep=True).drop_duplicates()
    df = pd.DataFrame()
    getOHLC_df(copydf)
    interval = ORB_timeFrame - (time.time() - start)
    print(
        f"Next check will start after {interval} sec : {datetime.datetime.now()}"
    )

    threading.Timer(interval, createOHLC).start()


def getOHLC_df(df):
    grouped = df.groupby('symbol')
    global df_final
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
        df_final = pd.concat([df_final, df_append], ignore_index=True)
        df_final.to_excel(
            f'/Users/nitishgupta/Desktop/ORB/{datetime.datetime.now().strftime("%Y-%m-%d")}.xlsx'
        )


if __name__ == '__main__':
    while ((datetime.datetime.now().time() <= datetime.time(9, 14, 25))
           or (datetime.datetime.now().time() >= datetime.time(15, 30, 00))):
        pass

    alice = login()
    # interval = ORB_timeFrame - datetime.datetime.now().second
    interval = (5 - datetime.datetime.now().minute % 5) * 60 - (
        datetime.datetime.now().second)
    print("start in ", interval)
    time.sleep(interval)
    createOHLC()
