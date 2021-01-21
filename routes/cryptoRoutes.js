const express = require('express')

const cryptoCtrl = require('../controllers/cryptoController')

const router = express.Router()

router.get('/cryptoPrice/:id', cryptoCtrl.getCryptoPrice)
router.get('/cryptoMarketChart/:id/:currency/:days', cryptoCtrl.getMarketChart)
router.get('/cryptoAveragePrice/:id/:currency/:days', cryptoCtrl.getAveragePrice)
router.get('/crypto24HourChange/:id', cryptoCtrl.get24HourChange)
router.get('/superSecretRoute', cryptoCtrl.superSecretRoute)

module.exports = router