import { Request, Response } from "express";
import { Animal } from "../models/Animals";

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
            return res.status(201).json(newAnimal);
        } catch (error) {
            return res.status(500).json({ message: "Ocurrio un error" });
        }
    }
}