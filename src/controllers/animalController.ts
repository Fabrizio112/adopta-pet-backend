import { Request, Response } from "express";
import { Animal } from "../models/Animals";
import { User } from "../models/User";

export class AnimalController {
    static getAllAnimals = async (req: Request, res: Response) => {
        try {
            const animals = await Animal.find().populate("user");
            return res.status(200).json(animals);
        } catch (error) {
            return res.status(500).json({ message: "Ocurrio un error" });
        }
    }
    static getAnimalByID = async (req: Request, res: Response) => {
        try {
            const animal = await Animal.findById(req.params.id).populate("user");
            if (!animal) {
                return res.status(404).json({ message: "Animal no encontrado" })
            }
            return res.status(200).json(animal);
        } catch (error) {
            return res.status(500).json({ message: "Ocurrio un error" });
        }
    }
    static createAnimal = async (req: Request, res: Response) => {
        try {
            const newAnimal = await Animal.create(req.body)
            const user = await User.findById(req.body.user);
            if (user) {
                user.animals.push(newAnimal._id);
                await user.save();
                await user.populate('animals');
                return res.status(201).json({
                    user,
                    animal: newAnimal
                });
            }
            return res.status(404).json({ message: "Usuario no encontrado" });
        } catch (error) {
            return res.status(500).json({ message: "Ocurrio un error" });
        }
    }
    static updateAnimal = async (req: Request, res: Response) => {
        try {
            const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!animal) {
                return res.status(404).json({ message: "Animal no encontrado" })
            }
            return res.status(200).json(animal);
        }
        catch (error) {
            return res.status(500).json({ message: "Ocurrio un error" });
        }
    }
    static deleteAnimal = async (req: Request, res: Response) => {
        try {
            const animal = await Animal.findByIdAndDelete(req.params.id);
            if (!animal) {
                return res.status(404).json({ message: "Animal no encontrado" })
            }
            return res.status(200).json({ message: "Animal eliminado correctamente" });
        }
        catch (error) {
            return res.status(500).json({ message: "Ocurrio un error" });
        }
    }
}