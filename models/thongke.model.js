const db = require('../utils/db');
module.exports = {
    allPrice: () => db.load("SELECT ID_SP as id, DON_GIA as price FROM san_pham"),
    tongSpTheoNam: (nam) => db.load(`CALL TONG_SP_DA_BAN_THEO_NAM(${nam})`),
    tongSpTheoThang: (thang, nam) => db.load(`CALL TONG_SP_DA_BAN_THEO_THANG(${thang},${nam})`),
    tongSpTheoQuy: (quy, nam) => db.load(`CALL TONG_SP_DA_BAN_THEO_QUY(${quy},${nam})`),
    dsChiNhanh: () => db.load("SELECT ID_CN as id, TEN_CN as name from chi_nhanh"),
    tongSpTheoNamCN: (nam, CN) => db.load(`CALL SP_DA_BAN_MOI_CN_THEO_NAM(${nam},${CN})`),
    tongSpTheoThangCN: (thang, nam, CN) => db.load(`CALL SP_DA_BAN_MOI_CN_THEO_THANG(${thang},${nam},${CN})`),
    tongSpTheoQuyCN: (quy, nam, CN) => db.load(`CALL SP_DA_BAN_MOI_CN_THEO_QUY(${quy},${nam},${CN})`),
}