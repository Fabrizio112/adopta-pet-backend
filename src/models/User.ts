import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";
import { IAnimal } from "./Animals";

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    telphone: string,
    animals: PopulatedDoc<IAnimal & Document>[],
    favorites: PopulatedDoc<IAnimal & Document>[]
}
const userSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telphone: { type: String, required: true },
    animals: [{ type: Types.ObjectId, ref: "Animal" }],
    favorites: [{ type: Types.ObjectId, ref: "Animal" }]
}, {
    timestamps: true
});

export const User = mongoose.model<IUser>("User", userSchema);