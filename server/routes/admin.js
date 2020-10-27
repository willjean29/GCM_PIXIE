const express = require('express');
const router = express.Router();

router.post('/singin',(req,res) => {
  res.json({
    ok: true,
    msg: "Prueba endpont"
  })
})

router.get('/admin',(req,res) => {
  res.json({
    ok: true,
    msg: "Prueba endpont"
  })
})

module.exports = router;
