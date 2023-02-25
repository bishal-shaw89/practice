const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, prodPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { product: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyse the cart => Find exisiting product
            const exisitingproductIndex = cart.product.findIndex(prod => prod.id === id)
            const exisitingproduct = cart.product[exisitingproductIndex];
            let updatedProduct;
            // Add new product/ increase quantity
            if (exisitingproduct) {
                updatedProduct = { ...exisitingproduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.product = [...cart.product];
                cart.product[exisitingproductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.product = [...cart.product, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +prodPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })

    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.product.find(prod => prod.id === id);
            const productqty = product.qty;
            updatedCart.product = updatedCart.product.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productqty;
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        })
    }
}