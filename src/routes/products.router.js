import { Router } from 'express';
import ProductManager from '../fileManager/productsManager.js';

const router = Router();
const productManager = new ProductManager();

// Obtener todos los productos
router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.status(200).send({ status: "success", products });
});

// Obtener un producto por ID
router.get('/:pid', async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);
    if (product) {
        res.status(200).send({ status: "success", product });
    } else {
        res.status(404).send({ status: "error", message: "Producto no encontrado" });
    }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).send({ status: "success", product: newProduct });
});

// Actualizar un producto
router.put('/:pid', async (req, res) => {
    const updatedProduct = await productManager.updateProduct(req.params.pid, req.body);
    if (updatedProduct) {
        res.status(200).send({ status: "success", product: updatedProduct });
    } else {
        res.status(404).send({ status: "error", message: "Producto no encontrado" });
    }
});

// Eliminar un producto
router.delete('/:pid', async (req, res) => {
    const result = await productManager.deleteProduct(req.params.pid);
    if (result) {
        res.status(200).send({ status: "success", message: "Producto eliminado" });
    } else {
        res.status(404).send({ status: "error", message: "Producto no encontrado" });
    }
});

export default router;
