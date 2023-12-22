"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const patientSchema = new mongoose_1.default.Schema({
    name: String,
    dateOfBirth: String,
    ssn: String,
    gender: String,
    occupation: String,
    entries: Array,
});
patientSchema.set('toJSON', {
    virtuals: true,
    transform: (_document, returnedObject) => {
        console.log('Before deletion:', returnedObject);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        console.log('After deletion:', returnedObject);
    },
});
patientSchema.pre('save', function (next) {
    this.id = this._id.toString();
    next();
});
module.exports = mongoose_1.default.model('Patient', patientSchema);
