const express = require('express');
const router = express.Router();
const thongkeModel = require('../models/thongke.model');
const moment = require('moment');
var prices;

router.use(async(req, res, next) => {
    prices = await thongkeModel.allPrice();
    next();
});
router.get('/Admin', async(req, res) => {
    var type = req.query.type || 1;
    var value1 = req.query.value1;
    var value2 = req.query.value2 || moment().year();

    if (type == 1)
        var data = await thongkeModel.tongSpTheoNam(value2);
    if (type == 2)
        var data = await thongkeModel.tongSpTheoQuy(value1, value2);
    if (type == 3)
        var data = await thongkeModel.tongSpTheoThang(value1, value2);

    data.splice(data.length - 1, 1);
    data = data[0];
    var tonggia = 0;
    var tongsoluong = 0
    for (let i = 0; i < data.length; i++) {
        var dongia = prices.find((ele) => ele.id == data[i].ID_SP).price;
        var soluong = data[i]["SUM(SO_LUONG)"];
        data[i].price = dongia * soluong;
        tonggia = tonggia + data[i].price;
        data[i].soluong = soluong;
        tongsoluong = tongsoluong + soluong;
        delete data[i]["SUM(SO_LUONG)"];
    }
    res.render('thongke', { data, tonggia, tongsoluong, CN: false });
})

router.get('/CN', async(req, res) => {
    var dsCN = await thongkeModel.dsChiNhanh();
    var CN = req.query.CN || 0;
    if (CN != 0) {
        var type = req.query.type || 1;
        var value1 = req.query.value1;
        var value2 = req.query.value2 || moment().year();

        if (type == 1)
            var data = await thongkeModel.tongSpTheoNamCN(value2, CN);
        if (type == 2)
            var data = await thongkeModel.tongSpTheoQuyCN(value1, value2, CN);
        if (type == 3)
            var data = await thongkeModel.tongSpTheoThangCN(value1, value2, CN);

        data.splice(data.length - 1, 1);
        data = data[0];
        var tonggia = 0;
        var tongsoluong = 0
        for (let i = 0; i < data.length; i++) {
            var dongia = prices.find((ele) => ele.id == data[i].ID_SP).price;
            var soluong = data[i]["SUM(SO_LUONG)"];
            data[i].price = dongia * soluong;
            tonggia = tonggia + data[i].price;
            data[i].soluong = soluong;
            tongsoluong = tongsoluong + soluong;
            delete data[i]["SUM(SO_LUONG)"];
        }
    }
    res.render('thongke', { CN: true, dsCN, data, tonggia, tongsoluong });
})

router.get('/myCN', async(req, res) => {
    var dsCN = await thongkeModel.dsChiNhanh();
    var CN = req.session.user.ID_CN;
    if (CN != 0) {
        var type = req.query.type || 1;
        var value1 = req.query.value1;
        var value2 = req.query.value2 || moment().year();

        if (type == 1)
            var data = await thongkeModel.tongSpTheoNamCN(value2, CN);
        if (type == 2)
            var data = await thongkeModel.tongSpTheoQuyCN(value1, value2, CN);
        if (type == 3)
            var data = await thongkeModel.tongSpTheoThangCN(value1, value2, CN);

        data.splice(data.length - 1, 1);
        data = data[0];
        var tonggia = 0;
        var tongsoluong = 0
        for (let i = 0; i < data.length; i++) {
            var dongia = prices.find((ele) => ele.id == data[i].ID_SP).price;
            var soluong = data[i]["SUM(SO_LUONG)"];
            data[i].price = dongia * soluong;
            tonggia = tonggia + data[i].price;
            data[i].soluong = soluong;
            tongsoluong = tongsoluong + soluong;
            delete data[i]["SUM(SO_LUONG)"];
        }
    }
    res.render('thongke', { CN: true, dsCN, data, tonggia, tongsoluong });
})

module.exports = router;