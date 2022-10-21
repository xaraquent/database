const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT


app.use(cors({
    origin: "*"
}))

app.use(express.json())

const products = [
    {
        name: "iphone11",
        price: 8888,
        id: 1,
    },
    {
        name: "iphone12",
        price: 9999,
        id: 2,
    },
];


/* ALL PRODUCTS */
app.get('/products', (req, res) => {
    res.json(products)
})

/* http://localhost:3000/products/1 */

app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const product = products.find((product) => {
        return product.id === id
    })
    if (!product) {
        return res.status(404).send({ message: "Product not found" });
    }

    res.json(product);
})

app.post("/product", (req, res) => {
    const { name, price } = req.body

    const product = {
        name: name,
        price: price,
        id: products.length + 1
    }

    products.push(product)
    console.log(req.body)
    res.json(product)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})