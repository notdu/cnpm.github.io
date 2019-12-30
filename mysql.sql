create database QLCH;
 
use QLCH;

create table SAN_PHAM
(
	ID_SP int,
	TEN_SP varchar(50) charset utf8,
	LOAI_SP varchar(10), -- ID loai sản phẩm
	HSD date,
	DON_GIA decimal(15,4),
	primary key (ID_SP)
);

 create table DANH_MUC_SP
(
	ID_LOAI varchar(10),
	TEN_LOAI varchar(50),
	primary key (ID_LOAI)
);

create table NHAN_VIEN
(
	ID_NV int,
	TEN_NV varchar(50) charset utf8,
	NGAY_SINH date,
	PHAI tinyint, -- 0: Nam, 1: Nữ
	SĐT char(10),
	DIA_CHI_NV varchar(50) charset utf8,
	LUONG decimal(15,4),
	CHI_NHANH_LAM_VIEC int, -- ID chi nhánh
	LOAI_NV int, -- 0: CEO, 1: Quản lý, 2: Bán hàng
	primary key (ID_NV)
);

create table TAI_KHOAN
(
	TEN_DANG_NHAP varchar(50) charset utf8,
	MAT_KHAU varchar(50) charset utf8,
	MA_NHAN_VIEN int, -- ID_NV
	primary key (TEN_DANG_NHAP)
);

create table CHI_NHANH
(
	ID_CN int,
	TEN_CN varchar(50) charset utf8,
	DIA_CHI_CN varchar(50) charset utf8,
	primary key(ID_CN)
);

create table SP_CN -- cho biết số lượng sản phẩm thuộc mỗi chi nhánh
(
	ID_SP int,
	ID_CN int,
	SO_LUONG int,
	primary key (ID_SP, ID_CN)
);

create table DON_HANG
(
	ID_DH int,
	NGUOI_BAN int, -- ID Nhan viên
	CHI_NHANH int, -- ID Chi nhánh
	NGAY_BAN date,
	TONG_TIEN decimal(15,4),
	primary key (ID_DH)
);

create table GIO_HANG
(
	ID_DH int,
	ID_SP int,
	SO_LUONG int,
	DON_GIA decimal(15,4),
	THANH_TIEN decimal(15,4),
	primary key (ID_DH, ID_SP)
);

create table DON_NHAP_HANG
(
	ID_DON_NHAP int,
	SAN_PHAM_NHAP int, -- ID Sản phẩm
	CHI_NHANH_NHAP int, -- ID chi nhánh
	SO_LUONG_NHAP int,
	NHA_CUNG_CAP varchar(50) charset utf8,
	NGAY_NHAP date,
	primary key (ID_DON_NHAP)
);

-- TẠO KHÓA NGOẠI

-- alter table Bảng ngoại add constraint FK_Bảng ngoại_Bảng chính
-- foreign key (Tên khóa ngoại ở bảng ngoại) references Bảng Chính(Tên khóa chính ở bảng chính)

-- SẢN PHẨM
alter table SAN_PHAM add constraint FK_SAN_PHAM_DANH_MUC_SP
foreign key (LOAI_SP) references DANH_MUC_SP(ID_LOAI);
-- SP_CN
alter table SP_CN add constraint FK_SP_CN_SAN_PHAM
foreign key (ID_SP) references SAN_PHAM(ID_SP);

alter table SP_CN add constraint FK_CHI_NHANH_SP_CN
foreign key (ID_CN) references CHI_NHANH(ID_CN);

-- NHÂN VIÊN
alter table NHAN_VIEN add constraint FK_CHI_NHANH_NHAN_VIEN
foreign key (CHI_NHANH_LAM_VIEC) references CHI_NHANH(ID_CN);

-- TÀI KHOẢN
alter table TAI_KHOAN add constraint FK_NHAN_VIEN_TAI_KHOAN
foreign key (MA_NHAN_VIEN) references NHAN_VIEN(ID_NV);

-- ĐƠN HÀNG
alter table DON_HANG add constraint FK_CHI_NHANH_DON_HANG
foreign key (CHI_NHANH) references CHI_NHANH(ID_CN);

alter table DON_HANG add constraint FK_NHAN_VIEN_DON_HANG
foreign key (NGUOI_BAN) references NHAN_VIEN(ID_NV);

-- GIỎ HÀNG
alter table GIO_HANG add constraint FK_SAN_PHAM_GIO_HANG
foreign key (ID_SP) references SAN_PHAM(ID_SP);

alter table GIO_HANG add constraint FK_DON_HANG_GIO_HANG
foreign key (ID_DH) references DON_HANG(ID_DH);

-- ĐƠN NHẬP HÀNG
alter table DON_NHAP_HANG add constraint FK_SAN_PHAM_DON_NHAP_HANG
foreign key (SAN_PHAM_NHAP) references SAN_PHAM(ID_SP);

alter table DON_NHAP_HANG add constraint FK_CHI_NHANH_DON_NHAP_HANG
foreign key (CHI_NHANH_NHAP) references CHI_NHANH(ID_CN);