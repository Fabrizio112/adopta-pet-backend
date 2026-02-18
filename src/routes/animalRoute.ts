import { Router } from "express";
import { AnimalController } from "../controllers/animalController";
import { handleInputErrors } from "../middlewares/validation";
import { body, param } from "express-validator";


const animalRouter = Router();

animalRouter.get("/", AnimalController.getAllAnimals);

animalRouter.get("/:id",
    param("id").isMongoId().withMessage("ID de animal no válido"),
    handleInputErrors,
    AnimalController.getAnimalByID);

animalRouter.post("/",
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("type").notEmpty().withMessage("El tipo de animal es obligatorio"),
    body("breed").notEmpty().withMessage("La raza es obligatoria"),
    body("age").notEmpty().withMessage("La edad es obligatoria"),
    body("size").notEmpty().withMessage("El tamaño es obligatorio"),
    body("description").notEmpty().withMessage("La descripción es obligatoria"),
    body("location").notEmpty().withMessage("La ubicación es obligatoria"),
    handleInputErrors,
    AnimalController.createAnimal);

animalRouter.put("/:id",
    param("id").isMongoId().withMessage("ID de animal no válido"),
    body("name").optional().notEmpty().withMessage("El nombre no puede estar vacío"),
    body("type").notEmpty().withMessage("El tipo de animal es obligatorio"),
    body("breed").notEmpty().withMessage("La raza es obligatoria"),
    body("age").notEmpty().withMessage("La edad es obligatoria"),
    body("size").notEmpty().withMessage("El tamaño es obligatorio"),
    body("description").notEmpty().withMessage("La descripción es obligatoria"),
    body("location").notEmpty().withMessage("La ubicación es obligatoria"),
    handleInputErrors,
    AnimalController.updateAnimal);

animalRouter.delete("/:id",
    param("id").isMongoId().withMessage("ID de animal no válido"),
    handleInputErrors,
    AnimalController.deleteAnimal);

export default animalRouter;