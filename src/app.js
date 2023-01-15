const { request } = require("express");
const express = require("express");
/* const fs = require('fs'); */
const { ProductManager } = require("./ProductManager");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.get("/", (require, res) => {
    res.send("este es mi servidor");
});

path = "./src/database/products.json";

const pm = new ProductManager(path);

app.get("/products", async (require, res) => {
    await pm.fileCreator();
    const resultado = await pm.readFileProducts();
    res.send(resultado.data);
});

app.get("/products/:pid", async(req, res) => { 
    let pid = req.params.pid;
    pid = parseInt(pid);
    
    let product = await pm.getProductById(pid);

    res.send({status: "Ok", message: product})
})

app.listen(8080, () => {
    console.log("Listening on 8080");
})