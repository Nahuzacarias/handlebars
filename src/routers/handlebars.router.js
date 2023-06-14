import { Router } from 'express';
import { ProductManager } from '../../ProductManager.js';

const router = Router();
const prod = new ProductManager('../../ProductManager.js');

router.get('/home', async (request, response) => {
    const limite = request.query.limite;
  const prod2 = await prod.getProducts(limite);
  

  response.render('home',  {prod2} );
});
router.get('realtimeproducts',async(req,res)=>{

  res.render('realtimeproducts',{})
})
export default router;
