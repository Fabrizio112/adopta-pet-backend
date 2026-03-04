import { Request, Response } from "express";
import { User } from "../models/User";
import { checkPassword, hashPassword } from "../helper/auth";
import { generateJWT } from "../helper/jwt";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {
            const { name, email, password, telphone } = req.body;

            if (!name || !email || !password || !telphone) {
                return res.status(400).json({ error: "Faltan campos obligatorios" });
            }
            const userExists = await User.findOne({ email })
            if (userExists) {
                const error = new Error("El Usuario ya esta registrado")
                return res.status(409).json({ error: error.message })
            }
            const user = new User(req.body);
            user.password = await hashPassword(password)
            await user.save();
            res.status(201).json(user);

        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }


    }
    static loginUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).populate("animals").populate("favorites");
            if (!user) {
                const error = new Error("Usuario no encontrado");
                return res.status(404).json({ error: error.message });
            }
            const isPasswordCorrect = await checkPassword(password, user.password)
            if (!isPasswordCorrect) {
                const error = new Error("Password Incorrecto")
                return res.status(404).json({ error: error.message })
            }
            const token = generateJWT(user._id.toString())
            res.status(200).json({ message: "Login exitoso", user, token });
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }
    }
    static getProfile = async (req: Request, res: Response) => {
        return res.json(req.user)
    }
}