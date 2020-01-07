const db = require('../utils/db');

module.exports = {

  all: () => db.load('select * from CHI_NHANH'),

  singleCN: id => db.load(`SELECT *
	FROM chi_nhanh
  WHERE ID_CN= ${id}`),

  singleP: (idCN,id) => db.load(`SELECT sp.TEN_SP,sp.ID_SP, spcn.SO_LUONG , spcn.ID_CN
	FROM SAN_PHAM sp, SP_CN spcn
  WHERE sp.ID_SP=${id} and spcn.SO_LUONG>0 and spcn.ID_CN= ${idCN}`),

  productCN: id => db.load(`SELECT sp.TEN_SP,sp.ID_SP, spcn.SO_LUONG , spcn.ID_CN
	FROM SAN_PHAM sp, SP_CN spcn
  WHERE sp.ID_SP=spcn.ID_SP and spcn.SO_LUONG>0 and spcn.ID_CN= ${id}`),

  productCNout: id => db.load(`SELECT sp.TEN_SP,sp.ID_SP, spcn.SO_LUONG , spcn.ID_CN
	FROM SAN_PHAM sp, SP_CN spcn
  WHERE sp.ID_SP=spcn.ID_SP and spcn.SO_LUONG=0 and spcn.ID_CN= ${id}`),

  search:kw=>db.load(`SELECT *
	FROM chi_nhanh
	WHERE TEN_CN Like '%${kw}%' `),

  name: id => db.load(`select * from CHI_NHANH where ID_CN= ${id}`),

  add: entity => db.add('chi_nhanh', entity),
  del: id => db.del('chi_nhanh', { ID_CN: id }),
 
  patch: entity => {
    const condition = { ID_CN: entity.ID_CN };
    delete entity.ID_CN;
    return db.patch('chi_nhanh', entity, condition);
  },

  patchP: entity => {
    const condition = { ID_CN: entity.ID_CN };
    const condition2 = { ID_SP: entity.ID_SP };
    delete entity.ID_CN;
    delete  entity.ID_SP;
    return db.patch2('sp_cn', entity, condition, condition2);
  },

  allWithDetails: _ => {
    const sql = `
      select c.CatID, c.CatName, count(p.ProID) as num_of_products
      from categories c left join products p on c.CatID = p.CatID
      group by c.CatID, c.CatName`;
    return db.load(sql);
  },
};
