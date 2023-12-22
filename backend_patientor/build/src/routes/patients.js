"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const patientUtils_1 = __importDefault(require("../utils/patientUtils"));
const entryUtils_1 = require("../utils/entryUtils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getPatientsBasicInfo());
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = (0, patientUtils_1.default)(req.body);
        const addedPatient = patientsService_1.default.addPatients(newPatientEntry);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong...';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.get('/:id', (req, res) => {
    const patient = patientsService_1.default.findPatientById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/:id/entries', (req, res) => {
    console.log(req.body);
    try {
        const id = req.params.id;
        const newPatientEntry = (0, entryUtils_1.parseNewEntries)(req.body);
        const addedEntry = patientsService_1.default.createNewEntry(newPatientEntry, id);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong...';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
