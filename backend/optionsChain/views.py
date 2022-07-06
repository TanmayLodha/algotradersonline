from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from strategiesAPI.models import LTP
from strategiesAPI.serializers import LTPSerializer
import requests
import json


# Create your views here.
indexes = ["BANKNIFTY", "NIFTY"]
url_oc = "https://www.nseindia.com/option-chain"
url_bnf = 'https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY'
url_nf = 'https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY'
url_indices = "https://www.nseindia.com/api/allIndices"

headers = {
    'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 '
        'Safari/537.36',
    'accept-language': 'en,gu;q=0.9,hi;q=0.8',
    'accept-encoding': 'gzip, deflate, br'
}

sess = requests.Session()
cookies = dict()


# Local methods
def set_cookie():
    global cookies
    request = sess.get(url_oc, headers=headers, timeout=5)
    cookies = dict(request.cookies)


def get_data(url):
    set_cookie()
    response = sess.get(url, headers=headers, timeout=5, cookies=cookies)

    if response.status_code == 401:
        set_cookie()
        response = sess.get(url_nf,
                            headers=headers,
                            timeout=5,
                            cookies=cookies)
    if response.status_code == 200:
        return response.text
    return ""


@api_view(['POST'])
def option_data(request):
    date = request.data["date"]
    symbol = request.data["symbol"]
    if symbol in indexes:
        if symbol == 'BANKNIFTY':
            ltp = LTP.objects.all().get(name='Nifty Bank')
        else:
            ltp = LTP.objects.all().get(name='Nifty 50')
        options = json.loads(get_data("https://www.nseindia.com/api/option-chain-indices?symbol=" + symbol))["records"]
    else:
        options = json.loads(get_data("https://www.nseindia.com/api/option-chain-equities?symbol=" + symbol))["records"]
        ltp = LTP.objects.all().get(name=symbol)

    expiry_dates = options["expiryDates"]
    serializer = LTPSerializer(ltp)

    if date == "":
        data = [d for d in options["data"] if d["expiryDate"] == expiry_dates[0]]
    else:
        data = [d for d in options["data"] if d["expiryDate"] == date]

    return Response([data, expiry_dates, [serializer.data]], status=status.HTTP_200_OK)
