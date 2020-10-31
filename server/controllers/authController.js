
// verificar si el administrador esta esta autenticado
const adminsitradorAutenticado = (req,res,next) => {
  if(req.isAuthenticated())
    // res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
    return next();
  
  return res.redirect('/admin/login');
}

module.exports = {
  adminsitradorAutenticado,
}