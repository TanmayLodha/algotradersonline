import requests, json
from alice_blue import *
import dateutil.parser
from datetime import datetime, timedelta
import pandas as pd
import pandasql as ps

username = "411686"
password = "kaku4567"
app_id = "SX5Vs0UiCE"
api_secret = "NfL6k8K82kryxfAusAtUOsLUdJzSY7TjrHvMmrsO22WHiRTOuc4QCKGMw27C1uly"
twoFA = "1979"


access_token = AliceBlue.login_and_get_access_token(username=username, password=password, twoFA=twoFA,
                                                    api_secret=api_secret, app_id=app_id)
alice = AliceBlue(username=username, password=password, access_token=access_token)


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