const db = require('../utils/db');
module.exports = {
    singleByUsername: (username) => db.load(`SELECT TEN_DANG_NHAP as username, MAT_KHAU as password, CHI_NHANH_LAM_VIEC as ID_CN FROM tai_khoan tk JOIN nhan_vien nv on tk.MA_NHAN_VIEN = nv.ID_NV WHERE tk.TEN_DANG_NHAP = '${username}'`),

}