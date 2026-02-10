import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { body } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";

const authRouter = Router();

authRouter.post("/create-account",
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("password").notEmpty().withMessage("La contraseña es obligatoria"),
    body("repeat_password").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Las contraseñas no coinciden");
        }
        return true;
    }),
    body("email").isEmail().withMessage("Ingrese un email válido"),
    handleInputErrors,
    AuthController.createAccount);

authRouter.post("/login",
    body("email").isEmail().withMessage("Ingrese un email válido"),
    body("password").notEmpty().withMessage("La contraseña es obligatoria"),
    handleInputErrors,
    AuthController.loginUser);

export default authRouter; 