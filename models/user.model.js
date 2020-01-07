const db = require('../utils/db');
module.exports = {
    singleByUsername: (username) => db.load(`SELECT TEN_DANG_NHAP as username, MAT_KHAU as password FROM tai_khoan WHERE TEN_DANG_NHAP = '${username}'`),
}