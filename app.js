import express from 'express'
import productRouter from "./src/routers/products.router.js"
import carritoRouter from "./src/routers/carrito.router.js"
import handlebars from "express-handlebars"
import prodhandlebars from "./src/routers/handlebars.router.js"
import { ProductManager } from './ProductManager.js'

const prod = new ProductManager('../../ProductManager.js')
const serverhttp=app.listen(8080,()=>console.log("server running"))
const io = new Server (serverhttp)

const app = express()
app.use(express.json())
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))
app.use('/products', productRouter)
app.use('/api/carts', carritoRouter)
app.use('/',prodhandlebars)

io.on('connection',async(socket)=>{

const products = await prod.addProduct()
console.log("conexion realizada")
socket.emit('products',products)

})

app.post('/products',async(req,res)=>{
const result = await prod.addProduct()
if(result != 'passed') return res.status(400).json({status:'error',detalle:result})
const products = await prod.getProducts()
io.emit('products',products)
return res.status(200).json({status:'succes',detalle:'producto agregado con éxito'})
 })
