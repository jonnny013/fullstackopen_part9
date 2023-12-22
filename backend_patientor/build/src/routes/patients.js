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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const patientUtils_1 = __importDefault(require("../utils/patientUtils"));
const entryUtils_1 = require("../utils/entryUtils");
const router = express_1.default.Router();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield patientsService_1.default.getPatientsBasicInfo();
        res.send(patients);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).send(`${error}`);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entries = [];
    const newpat = req.body;
    let addEntryToPat;
    if ('entries' in newpat) {
        addEntryToPat = newpat;
    }
    else {
        addEntryToPat = Object.assign(Object.assign({}, newpat), { entries: entries });
    }
    try {
        const newPatientEntry = (0, patientUtils_1.default)(addEntryToPat);
        const addedPatient = yield patientsService_1.default.addPatients(newPatientEntry);
        res.json(addedPatient);
        console.log(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong...';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
            console.error('Error:', error);
        }
        res.status(400).send(errorMessage);
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield patientsService_1.default.findPatientById(req.params.id);
        if (patient) {
            res.send(patient);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).send(`${error}`);
    }
}));
router.post('/:id/entries', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const id = req.params.id;
        const newPatientEntry = (0, entryUtils_1.parseNewEntries)(req.body);
        const addedEntry = yield patientsService_1.default.createNewEntry(newPatientEntry, id);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong...';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
}));
exports.default = router;
