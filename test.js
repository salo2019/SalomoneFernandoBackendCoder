console.clear()
const ProductManager = require('./ProductManager.js');

const productos = new ProductManager('contenedor.txt');

const test = async () => {
	const data = await productos.addProduct({ name: "Fernando", lastName: "Salomone" });
	console.log(productos.objetos);
}

test();