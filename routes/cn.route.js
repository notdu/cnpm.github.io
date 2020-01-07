const express = require('express');
const userModel = require('../models/cn.model');

const router = express.Router();

router.get('/',  async(req, res) => {  
  
 
    res.render('cnProduct',{
     
    });
   
    
  })
  
  
  

  
 
  

   module.exports = router;
  

