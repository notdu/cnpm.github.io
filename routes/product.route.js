const express = require('express');
const cnModel = require('../models/product.model');

const router = express.Router();

router.get('/',  async(req, res) => {  
  const rows = await cnModel.all();
  
 
    res.render('instockProduct',{
      empty: rows.length === 0,
     rows
    });
   
    
  })
  router.get('/search',  async(req, res) => {  
    const kw = req.query.keyword;


    const rows = await cnModel.search(kw);
    
   
      res.render('instockProduct',{
        empty: rows.length === 0,
       rows
      });
     
      
    })
  router.get('/out',  async(req, res) => {  
    const rows = await cnModel.allout();
    
   
      res.render('outProduct',{
        empty: rows.length === 0,
       rows
      });
     
      
    })

  router.get('/edit/:id', async (req, res) => {
    const rows = await cnModel.single(req.params.id);
    if (rows.length === 0) {
      throw new Error('Invalid category id');
    }
    res.render('editProduct',{
      
      rows: rows[0]
    });
  })

  router.get('/add', async (req, res) => {
    res.render('addProduct',{
      
    });
  })


  router.post('/add', async(req,res) => {
  
    const result = await cnModel.add(req.body);
   
    res.redirect('/product');
  });
  router.post('/patch', async (req, res) => {
    const result = await cnModel.patch(req.body);
    res.redirect('/product');
  })
  
  router.post('/del', async (req, res) => {
    const result = await cnModel.del(req.body.ID_CN);
   
    res.redirect('/branch');
  })

  
  router.get('/:id', async (req, res) => {
    const name = await cnModel.name(req.params.id);
    const rows = await cnModel.productCN(req.params.id);
    console.log(name);
    res.render('branchProduct',{
      rows,
     name:name[0],
      empty: rows.length === 0
      
    });
    
  })



   module.exports = router;
  

