const db = require('../utils/db');

module.exports = {

  all: () => db.load('SELECT sp.*, sum(spcn.SO_LUONG ) as sl,d.TEN_LOAI FROM SAN_PHAM sp, SP_CN spcn, danh_muc_sp d WHERE sp.ID_SP=spcn.ID_SP and spcn.SO_LUONG>0 AND d.ID_LOAI = sp.LOAI_SP GROUP BY sp.ID_SP '),
  allout:()=> db.load(`	SELECT sp.*
	FROM SAN_PHAM sp, SP_CN spcn
  WHERE sp.ID_SP=spcn.ID_SP and spcn.SO_LUONG=0 
	GROUP BY sp.ID_SP`),
  single: id => db.load(`SELECT *
	FROM san_pham
  WHERE ID_SP= ${id}`),

  productCN: id => db.load(`SELECT sp.TEN_SP,sp.ID_SP, spcn.SO_LUONG 
	FROM SAN_PHAM sp, SP_CN spcn
  WHERE sp.ID_SP=spcn.ID_SP and spcn.ID_CN= ${id}`),

  search:kw=>db.load(`SELECT *
	FROM SAN_PHAM, danh_muc_sp
	WHERE TEN_SP Like '%${kw}%' AND ID_LOAI = LOAI_SP`),

  name: id => db.load(`select * from san_pham where ID_CN= ${id}`),

  add: entity => db.add('san_pham', entity),
  del: id => db.del('san_pham', { ID_SP: id }),
 
  patch: entity => {
    const condition = { ID_SP: entity.ID_SP };
    delete entity.ID_SP;
    return db.patch('san_pham', entity, condition);
  },

  allWithDetails: _ => {
    const sql = `
      select c.CatID, c.CatName, count(p.ProID) as num_of_products
      from categories c left join products p on c.CatID = p.CatID
      group by c.CatID, c.CatName`;
    return db.load(sql);
  },
};
