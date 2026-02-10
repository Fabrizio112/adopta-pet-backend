import mongoose, { Document, Schema } from "mongoose"

export enum ProvinciaArgentina {
    BUENOS_AIRES = "Buenos Aires",
    CABA = "Ciudad Autónoma de Buenos Aires",
    CATAMARCA = "Catamarca",
    CHACO = "Chaco",
    CHUBUT = "Chubut",
    CORDOBA = "Córdoba",
    CORRIENTES = "Corrientes",
    ENTRE_RIOS = "Entre Ríos",
    FORMOSA = "Formosa",
    JUJUY = "Jujuy",
    LA_PAMPA = "La Pampa",
    LA_RIOJA = "La Rioja",
    MENDOZA = "Mendoza",
    MISIONES = "Misiones",
    NEUQUEN = "Neuquén",
    RIO_NEGRO = "Río Negro",
    SALTA = "Salta",
    SAN_JUAN = "San Juan",
    SAN_LUIS = "San Luis",
    SANTA_CRUZ = "Santa Cruz",
    SANTA_FE = "Santa Fe",
    SANTIAGO_DEL_ESTERO = "Santiago del Estero",
    TIERRA_DEL_FUEGO = "Tierra del Fuego",
    TUCUMAN = "Tucumán"
}


type AnimalType = "Perro" | "Gato";
type AnimalSize = "Pequeño" | "Mediano" | "Grande";
type AnimalAge = "Cachorro" | "Joven" | "Adulto" | "Senior";

type LocationType = ProvinciaArgentina

export interface IAnimal extends Document {
    name: string,
    type: AnimalType,
    raza: string,
    age: AnimalAge,
    size: AnimalSize,
    description: string,
    location: LocationType,
    imageUrl: string,
    createdAt: Date
}

const animalSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    raza: { type: String, required: true },
    age: { type: String, required: true },
    size: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String }
},
    {
        timestamps: true
    }
)

export const Animal = mongoose.model<IAnimal>("Animal", animalSchema);