const axios = require('axios');
const util = require('util');
const format = require('date-format');

getCryptoPrice = async (req, res) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${req.params.id}&vs_currencies=usd`;
    let response = await axios.get(url);
    res.json(util.inspect(response.data[req.params.id].usd));
}

getMarketChart = async (req, res) => {
    const url = `https://api.coingecko.com/api/v3/coins/${req.params.id}/market_chart?vs_currency=${req.params.currency}&days=${req.params.days}&interval=daily`
    let response = await axios.get(url);
    res.send(util.inspect(response.data.prices));
}

getAveragePrice = async (req, res) => {
    let runningTotal = 0;
    const url = `https://api.coingecko.com/api/v3/coins/${req.params.id}/market_chart?vs_currency=${req.params.currency}&days=${req.params.days}&interval=daily`
    let response = await axios.get(url);
    for(let prices of response.data.prices){
        runningTotal += prices[1];
    }
    res.send(`${req.params.id}'s average price for the last ${req.params.days} days is: ` + runningTotal / req.params.days);
}

get24HourChange = async (req, res) => {
    const today = new Date();
    let yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = format.asString('dd-MM-yyyy', yesterday);

    let currentResponse = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${req.params.id}&vs_currencies=usd`);
    let previousDayResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${req.params.id}/history?date=${yesterday}`);

    let percentChange = ((currentResponse.data[req.params.id].usd - previousDayResponse.data.market_data.current_price.usd) / ((currentResponse.data[req.params.id].usd + previousDayResponse.data.market_data.current_price.usd )/ (2)) * 100);
    res.json(util.inspect(percentChange));
    //res.json(util.inspect(previousDayResponse.data.market_data.current_price.usd));
} 

superSecretRoute = (req, res) => {
    res.send('You have found the super secret route here is a cookie for you! 🍪')
}

module.exports = {
    getCryptoPrice,
    getMarketChart,
    getAveragePrice,
    get24HourChange,
    superSecretRoute
}