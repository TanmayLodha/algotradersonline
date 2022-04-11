from alice_blue import *
from time import sleep
# import xlwings as xw
import dateutil.parser
from datetime import datetime, timedelta
import pandas as pd
import pandasql as ps
import requests


username = "411686"
password = "kaku4567"
app_id = "SX5Vs0UiCE"
api_secret = "NfL6k8K82kryxfAusAtUOsLUdJzSY7TjrHvMmrsO22WHiRTOuc4QCKGMw27C1uly"
twoFA = "1979"

access_token = AliceBlue.login_and_get_access_token(username=username, password=password, twoFA=twoFA,
                                                    api_secret=api_secret, app_id=app_id)
alice = AliceBlue(username=username, password=password, access_token=access_token)
traded_stocks = []
socket_opened = False


def event_handler_quote_update(message):
    print(f"quote update {message}")
    name = message['instrument'].symbol
    openx = message['open']
    high = message['high']
    low = message['low']
    close = message['close']
    ltp = message['ltp']
    volume = message['volume']
    buy_qty=message['total_buy_quantity']
    sell_qty=message['total_sell_quantity']
    curr_time=datetime.datetime.now()
    crt_time=curr_time.time()
    breakout=datetime.time()
    v = test(name)
    c_low= close + close*0.03
    c_high= close - close*0.03
    range_HL1=high - low
    range_OC1=openx -ltp
    range_HL2=high - low
    range_OC2=ltp - openx
    L1=low - low*0.1/100
    H1=high + high*0.1/100
    money = 100000
    quantity_b = int(money/H1)
    quantity_s = int(money/L1)
    p_open= v[1]*0.06
    p_diff_b=p_open + v[1]
    p_diff_s=v[1] - p_open
    vy=round (v[0] + v[0]*0.0075)
    print(name, v[0], vy, v[1])

    if ((datetime.datetime.now().time() >= datetime.time(9,19,55)) and (name not in traded_stocks) and (openx < p_diff_b) and (ltp < c_low) and (volume > vy) and (range_OC2 > range_HL2*0.80 )):
        print(f"buy: {name} , H1: {H1} , ltp: {ltp}")
        traded_stocks.append(name)
        alice.place_order(transaction_type=TransactionType.Buy,
                          instrument=alice.get_instrument_by_symbol('NSE', name),
                          quantity=quantity_b,
                          order_type=OrderType.Market,
                          product_type=ProductType.Delivery,
                          # price=0.0,
                          trigger_price=None,
                          stop_loss=None,
                          square_off=None,
                          trailing_sl=None,
                          is_amo=False)


        # a = 'A' + str(colnum)
        # wb = xw.Book('new.xlsx')
        # sheet = wb.sheets['Sheet1']
        # sheet.range(a).expand().value = [name, "BUY", quantity_b, H1]
        # colnum+=1


    if ((datetime.datetime.now().time() >= datetime.time(9,19,55)) and (name not in traded_stocks) and (openx > p_diff_s) and (ltp > c_high) and (volume > vy) and (range_OC1 > range_HL1*0.80 )):
        print(f"sell: {name} , L1: {L1} , ltp: {ltp}")
        traded_stocks.append(name)

        alice.place_order(transaction_type=TransactionType.Sell,
                          instrument=alice.get_instrument_by_symbol('NSE', name),
                          quantity=quantity_s,
                          order_type=OrderType.Market,
                          product_type=ProductType.Delivery,
                          # price=0.0,
                          trigger_price=None,
                          stop_loss=None,
                          square_off=None,
                          trailing_sl=None,
                          is_amo=False)

        # a = 'A' + str(colnum)
        # wb = xw.Book('new.xlsx')
        # sheet = wb.sheets['Sheet1']
        # sheet.range(a).expand().value = [name, "SELL", quantity_s, "", L1]
        # colnum+=1

def get_historical(instrument, from_datetime, to_datetime, interval, indices=False):
    params = {"token": instrument.token,
              "exchange": instrument.exchange if not indices else "NSE_INDICES",
              "starttime": str(int(from_datetime.timestamp())),
              "endtime": str(int(to_datetime.timestamp())),
              "candletype": 3 if interval.upper() == "DAY" else (2 if interval.upper().split("_")[1] == "HR" else 1),
              "data_duration": None if interval.upper() == "DAY" else interval.split("_")[0]}
    lst = requests.get(
        f" https://ant.aliceblueonline.com/api/v1/charts/tdv?", params=params).json()["data"]["candles"]
    records = []
    for i in lst:
        record = {"date": dateutil.parser.parse(i[0]), "open": i[1], "high": i[2], "low": i[3], "close": i[4], "volume": i[5]}
        records.append(record)
    return records


def func(ticker):
    record = get_historical(alice.get_instrument_by_symbol("NSE", ticker), datetime.now() - timedelta(days= 5), datetime.now(), "5_MIN")
    for i in range(0,len(record)):
        record[i]['date'] = record[i]['date'].replace(microsecond=0).isoformat(' ')

    return record


def test (i):
    instrument = alice.get_instrument_by_symbol("NSE", i)
    from_datetime = datetime.now() - timedelta(days= 1) ##[ON Monday Value Need to change to 4]
    to_datetime = datetime.now() - timedelta(days= 0)   ##[ON Monday Value Need to change to 3]
    interval1 = "5_MIN"   # ["DAY", "1_HR", "3_HR", "1_MIN", "5_MIN", "15_MIN", "60_MIN"]
    interval2 = "DAY"   # ["DAY", "1_HR", "3_HR", "1_MIN", "5_MIN", "15_MIN", "60_MIN"]
    indices = False
    df1 = pd.DataFrame(get_historical(instrument, from_datetime, to_datetime, interval1, indices))
    # df1.index = df1["volume"]
    # df1 = df1.drop("volume", axis=1)

    df2 = pd.DataFrame(get_historical(instrument, from_datetime, to_datetime, interval2, indices))
    # df2.index = df2["date"]
    # df2 = df2.drop("date", axis=1)
    # print(df1)
    q1 = """SELECT  volume FROM df1 order by volume DESC LIMIT 1 """
    q2 = """SELECT  open FROM df2 """
    #print (i)
    s1= ps.sqldf(q1, locals())
    s2= ps.sqldf(q2, locals())

    vol= s1["volume"][0]
    op = s2["open"][0]
    # print(vol, op)
    return (vol,op)


def open_callback():
    global socket_opened
    socket_opened = True


alice.start_websocket(subscribe_callback=event_handler_quote_update,
                        socket_open_callback=open_callback,
                        run_in_background=True)

while(socket_opened==False):
    pass

live_data={}

instrument_list=['ACC', 'AUBANK', 'ADANIENT', 'ADANIPORTS', 'AMBUJACEM', 'APOLLOHOSP', 'ASIANPAINT', 'AUROPHARMA', 'AXISBANK', 'BAJAJ-AUTO', 'BAJFINANCE',
 'BATAINDIA', 'BHARATFORG', 'BPCL', 'BHARTIARTL', 'BIOCON', 'CHOLAFIN', 'CIPLA', 'COALINDIA', 'COFORGE', 'DLF', 'DABUR', 'DIVISLAB',
 'DRREDDY', 'EICHERMOT', 'GODREJCP', 'GODREJPROP', 'GRASIM', 'HCLTECH', 'HDFCBANK', 'HDFCLIFE', 'HAVELLS', 'HEROMOTOCO', 'HINDALCO', 'HINDPETRO',
 'HINDUNILVR', 'HDFC', 'ICICIBANK', 'ICICIPRULI', 'ITC', 'IRCTC', 'IGL', 'INDUSINDBK', 'INFY', 'INDIGO', 'JSWSTEEL', 'JINDALSTEL', 'JUBLFOOD', 'KOTAKBANK',
 'LICHSGFIN', 'LTI', 'LT', 'LUPIN', 'M&M', 'MANAPPURAM', 'MARUTI','MINDTREE', 'MUTHOOTFIN', 'PVR', 'PIDILITIND', 'PEL', 'RELIANCE', 'SBICARD', 'SBILIFE', 
 'SRF', 'SRTRANSFIN', 'SBIN', 'SUNPHARMA', 'TVSMOTOR', 'TATACHEM', 'TCS', 'TATACONSUM', 'TATAMOTORS', 'TATAPOWER', 'TATASTEEL', 'TECHM',  'TITAN',
 'UPL', 'VEDL', 'VOLTAS', 'WIPRO', 'ZEEL']


alice.subscribe([alice.get_instrument_by_symbol('NSE', i.upper()) for i in instrument_list], LiveFeedType.MARKET_DATA)

while len(instrument_list) != len(list(live_data.keys())):
    sleep(1)



