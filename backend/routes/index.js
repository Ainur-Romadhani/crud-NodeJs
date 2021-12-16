import Express from "express";
import { 
    getAllProducts,
    createProduct,
    getAllProductsById,
    updateProduct,
    deleteProduct
} from "../controllers/product.js";

const router = Express.Router();


router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/:id', getAllProductsById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct)

export default router;