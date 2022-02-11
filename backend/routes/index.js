import Express from "express";
import {check, body, validationResult} from "express-validator";
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
import { registerSchema,loginSchema } from "../rules/usersValidator.js";

const router = Express.Router();

router.get('/users',verifyToken, getUsers);
router.post('/users',registerSchema,registerUser);
router.post('/login',loginSchema, loginUser);
router.get('/token',resfreshToken);
router.delete('/logout', logoutUser);


router.get('/products', getAllProducts);
router.post('/products', createProduct);
router.get('/products/:id', getAllProductsById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct)

export default router;