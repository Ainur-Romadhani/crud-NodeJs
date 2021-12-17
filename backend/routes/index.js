import Express from "express";
import { 
    getAllProducts,
    createProduct,
    getAllProductsById,
    updateProduct,
    deleteProduct
} from "../controllers/product.js";
import { getUsers,registerUser,loginUser,logoutUser} from "../controllers/auth.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { resfreshToken } from "../controllers/refreshToken.js";

const router = Express.Router();

router.get('/users',verifyToken, getUsers);
router.post('/users',registerUser);
router.post('/login',loginUser);
router.get('/token',resfreshToken);
router.post('/logout', logoutUser);


router.get('/products', getAllProducts);
router.post('/products', createProduct);
router.get('/products/:id', getAllProductsById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct)

export default router;