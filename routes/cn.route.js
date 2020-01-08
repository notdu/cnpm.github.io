const express = require('express');
const cnModel = require('../models/cn.model');

const router = express.Router();

router.get('/',  async(req, res) => {  
  const rows = await cnModel.all();
  
 
    res.render('allBranch',{
      empty: rows.length === 0,
     rows
    });
   
    
  })

  router.get('/out',  async(req, res) => {  
    const rows = await cnModel.all();
    
   
      res.render('allBranchout',{
        empty: rows.length === 0,
       rows
      });
     
      
    })

    router.get('/searchCN',  async(req, res) => {  
      const kw = req.query.keyword;
  
  
      const rows = await cnModel.search(kw);
      
     
        res.render('allBranch',{
          empty: rows.length === 0,
         rows
        });
       
        
      })


  router.get('/:idCN/edit/:id', async (req, res) => {
    const rows = await cnModel.singleP(req.params.idCN,req.params.id);
    if (rows.length === 0) {
      throw new Error('Invalid category id');
    }
    res.render('editBranchProduct',{
      
      rows: rows[0]
    });
  })

  router.post('/:id/patch', async (req, res) => {
    const id = req.params.id;
    const result = await cnModel.patchP(req.body);
    res.redirect('/branch/'+id);
  })

  router.get('/edit/:id', async (req, res) => {
    const rows = await cnModel.singleCN(req.params.id);
    if (rows.length === 0) {
      throw new Error('Invalid category id');
    }
    res.render('editBranch',{
      
      rows: rows[0]
    });
  })

  router.get('/:id/addLo', async (req, res) => {
     const rows = await cnModel.allProductCN(req.params.id);
    res.render('addLo',{
      IDCN: req.params.id,
      rows
    });
  })

   router.post('/addLo', async(req,res) => {
  
    const result = await cnModel.addLo(req.body);
   
    res.redirect('/branch');
  });

  router.get('/add', async (req, res) => {
    res.render('addBranch',{
      
    });
  })


  router.post('/add', async(req,res) => {
  
    const result = await cnModel.add(req.body);
   
    res.redirect('/branch');
  });
  router.post('/patch', async (req, res) => {
    const result = await cnModel.patch(req.body);
    res.redirect('/branch');
  })
  
  router.post('/del', async (req, res) => {
    const result = await cnModel.del(req.body.ID_CN);
   
    res.redirect('/branch');
  })

  
  router.get('/:id', async (req, res) => {
    const name = await cnModel.name(req.params.id);
    const rows = await cnModel.productCN(req.params.id);
    const IDCN = rows[0].ID_CN;
    console.log(name);
    res.render('branchProduct',{
      rows,
      IDCN,
     name:name[0],
      empty: rows.length === 0
      
    });
    
  })

  router.get('/out/:id', async (req, res) => {
    const name = await cnModel.name(req.params.id);
    const rows = await cnModel.productCNout(req.params.id);
    const IDCN = rows[0].ID_CN;
    console.log(name);
    res.render('branchProduct',{
      rows,
       IDCN,
     name:name[0],
      empty: rows.length === 0
      
    });
    
  })

   module.exports = router;
  

