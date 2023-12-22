"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPatientsPrivateInfo = () => {
    return patients_1.default;
};
const getPatientsBasicInfo = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatients = (entry) => {
    const newPatientEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    console.log(newPatientEntry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const createNewEntry = (entry, patientId) => {
    console.log(entry);
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    const patient = patients_1.default.find(patient => patient.id === patientId);
    patient === null || patient === void 0 ? void 0 : patient.entries.push(newEntry);
    return newEntry;
};
const findPatientById = (id) => {
    const patient = patients_1.default.find(p => p.id === id);
    console.log(patient);
    return patient;
};
exports.default = {
    getPatientsPrivateInfo,
    addPatients,
    getPatientsBasicInfo,
    findPatientById,
    createNewEntry
};
