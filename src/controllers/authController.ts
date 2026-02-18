import { Request, Response } from "express";
import { User } from "../models/User";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {
            const { name, email, password, telphone } = req.body;

            if (!name || !email || !password || !telphone) {
                return res.status(400).json({ error: "Faltan campos obligatorios" });
            }
            const user = new User(req.body);
            await user.save();
            res.status(201).json(user);

        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }


    }
    static loginUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).populate("animals");
            if (!user) {
                const error = new Error("Usuario no encontrado");
                return res.status(404).json({ error: error.message });
            }
            if (user.password !== password) {
                return res.status(401).json({ error: "Usuario o Contraseña Incorrectos" })
            }

            res.status(200).json({ message: "Login exitoso", user });
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }
    }
    static getProfile = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id
            console.log(userId)
            const user = await User.findById(userId).populate("animals");
            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" })
            }
            return res.status(200).json(user);

        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }
    }
}