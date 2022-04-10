from alice_blue import *
from time import sleep
import datetime
from registerLogin.strategies import AliceBlue_Get_historical as histo
import xlwings as xw

colnum = 2
username = ""
password = ''
twoFA = ''
api_secret = ""
app_id = ""

access_token = AliceBlue.login_and_get_access_token(username=username, password=password, twoFA=twoFA,
                                                    api_secret=api_secret, app_id=app_id)
alice = AliceBlue(username=username, password=password, access_token=access_token)
traded_stocks = []
socket_opened = False

wb = xw.Book('new.xlsx')
sheet = wb.sheets['Sheet1']
sheet.range("A2:E300").clear_contents()

def event_handler_quote_update(message):
    """print(f"quote update {message}")"""
    global colnum
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
    v =histo.test(name)
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
        ##"""print(f"quote update {message}")"""
        print(f"buy: {name} , H1: {H1} , ltp: {ltp}")
        traded_stocks.append(name)
        #message = alice.place_order(transaction_type = TransactionType.Buy, instrument = alice.get_instrument_by_symbol('NSE', name), quantity = 10 , order_type = OrderType.Limit, product_type = ProductType.BracketOrder, price = H1, trigger_price = None, stop_loss =low, square_off =float(format((high-low), ".1f")), trailing_sl = None, is_amo = False)
        #sleep(1)
        a = 'A' + str(colnum)
        wb = xw.Book('new.xlsx')
        sheet = wb.sheets['Sheet1']
        sheet.range(a).expand().value = [name, "BUY", quantity_b, H1]
        colnum+=1


    if ((datetime.datetime.now().time() >= datetime.time(9,19,55)) and (name not in traded_stocks) and (openx > p_diff_s) and (ltp > c_high) and (volume > vy) and (range_OC1 > range_HL1*0.80 )):
        #"""print(f"quote update {message}")"""
        print(f"sell: {name} , L1: {L1} , ltp: {ltp}")
        traded_stocks.append(name)
        #message = alice.place_order(transaction_type = TransactionType.Sell, instrument = alice.get_instrument_by_symbol('NSE', name), quantity = 10 , order_type = OrderType.Limit, product_type = ProductType.BracketOrder, price = L1, trigger_price = None, stop_loss =low, square_off =float(format((high-low), ".1f")), trailing_sl = None, is_amo = False)
        #sleep(1)
        a = 'A' + str(colnum)
        wb = xw.Book('new.xlsx')
        sheet = wb.sheets['Sheet1']      
        sheet.range(a).expand().value = [name, "SELL", quantity_s, "", L1]
        colnum+=1
    
       
   
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

