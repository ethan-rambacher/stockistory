from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from datetime import date
from alpha_vantage.timeseries import TimeSeries
from fastapi.middleware.cors import CORSMiddleware
import pandas

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:9000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

ts = TimeSeries(key="P806T3E80Y5C9QNM", output_format="pandas")

CACHE = {}

@app.get("/")
async def root():
    return {"message": "Hello World"}

app.mount("/static", StaticFiles(directory="src"), name="static")

def get_symbol(symbol):
    if symbol in CACHE:
        return CACHE[symbol]
    else:
        data, _ = ts.get_weekly_adjusted(symbol=symbol)
        data = data[["5. adjusted close","7. dividend amount"]]
        data["wa"] = pandas.RangeIndex(start=0, step=-1, stop=-1*data.index.size)
        csv_data = data.to_csv(line_terminator="\n", header=False)
        CACHE[symbol] = csv_data
        return csv_data


@app.get("/prices/{symbols}")
async def read_item(symbols: str):
    print(f"Request for symbols {symbols}")
    response_data = {}
    for symbol in symbols.split(","):
        response_data[symbol] = get_symbol(symbol)

    return response_data