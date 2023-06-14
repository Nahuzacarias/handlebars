import {Router} from 'express'
import {ProductManager} from "../../ProductManager.js"

const router = Router()
const prod = new ProductManager('../../ProductManager.js')

router.get('/:pid',async(request,response)=>{

    const prod2 = await prod.getProducts();
    const id =  request.params.pid
    const product = await prod2.find(product=>product.id==id)
    
    if(!product){
    response.status(404).send({error: 'el ID solicitado no existe'})
    }else{

        response.status(200).send(product)
    }

})

router.get('/',async(request,response)=>{
    const prod2 = await prod.getProducts();
    const limite = request.query.limite
    const product = await prod2.slice(0,limite)
   if(!limite) {
    return response.status(200).send(prod2)
    
}else{
    return response.status(200).send(product)
}

})

router.post('/', async (request, response) => {
    const agregarprod = request.body
    const id_producto = await prod.addProduct(agregarprod)
    response.json({
      status: true,
      data: id_producto,

    });
  });

  router.put("/:pid", async (req, res) => {
    const id_producto = req.params.pid;
  
    const {title, description, price, thumbnail, code, stock,status,category } = req.body
  
    const updatedProduct = await prod.updateProduct(
      id_producto, 
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    );
  
    res.status(200).send(updatedProduct);
  });

  router.delete("/:pid", async (req, res) => {
    const id_producto = req.params.pid;
  
    const deletedProduct = await prod.deleteProduct(id_producto);
  
    res.status(200).send(deletedProduct);
  });

  

export default router