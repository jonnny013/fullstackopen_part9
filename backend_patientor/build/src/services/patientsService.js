"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const Patient = require('../models/patient');
const patientUtils_1 = require("../utils/patientUtils");
const uuid_1 = require("uuid");
const getPatientsPrivateInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const result = yield Patient.find({});
        if (result && Array.isArray(result)) {
            const mappedResult = result.map((notOk) => {
                const ok = (0, patientUtils_1.toOldPatientEntry)(notOk);
                return ok;
            });
            return mappedResult;
        }
        else {
            console.log('error in get');
            return 'error in GET';
        }
    }
    catch (error) {
        console.log(error);
        let message;
        if (error instanceof Error)
            message = error.message;
        else
            message = String(error);
        throw new Error(message);
    }
});
const getPatientsBasicInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Patient.find({}).lean();
        console.log('result', result);
        if (result && Array.isArray(result)) {
            const filteredResults = result.map((notOk) => {
                const ok = (0, patientUtils_1.toOldPatientEntry)(notOk);
                const filtered = {
                    id: ok.id,
                    name: ok.name,
                    dateOfBirth: ok.dateOfBirth,
                    gender: ok.gender,
                    occupation: ok.occupation,
                };
                return filtered;
            });
            return filteredResults;
        }
        else {
            console.log('error in get');
            return 'error in GET';
        }
    }
    catch (error) {
        console.log('here', error);
        let message;
        if (error instanceof Error)
            message = error.message;
        else
            message = String(error);
        throw new Error(message);
    }
});
const addPatients = (entry) => __awaiter(void 0, void 0, void 0, function* () {
    const body = entry;
    const newPatientEntry = new Patient({
        name: body.name,
        dateOfBirth: body.dateOfBirth,
        ssn: body.ssn,
        gender: body.gender,
        occupation: body.occupation,
        entries: body.entries,
    });
    console.log(newPatientEntry);
    const savedPatient = yield newPatientEntry.save();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return savedPatient;
});
const createNewEntry = (entry, patientId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(entry);
    const entryWithId = Object.assign(Object.assign({}, entry), { id: (0, uuid_1.v1)() });
    try {
        const patient = yield Patient.findByIdAndUpdate(patientId, { $push: { entries: entryWithId } }, { new: true, runValidators: true });
        console.log('patient', patient);
        return (0, patientUtils_1.toOldPatientEntry)(patient);
    }
    catch (error) {
        console.log(error);
        let message;
        if (error instanceof Error)
            message = error.message;
        else
            message = String(error);
        throw new Error(message);
    }
});
const findPatientById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield Patient.findById(id);
        console.log(patient);
        return (0, patientUtils_1.toOldPatientEntry)(patient);
    }
    catch (error) {
        console.log(error);
        let message;
        if (error instanceof Error)
            message = error.message;
        else
            message = String(error);
        throw new Error(message);
    }
});
exports.default = {
    getPatientsPrivateInfo,
    addPatients,
    getPatientsBasicInfo,
    findPatientById,
    createNewEntry,
};
