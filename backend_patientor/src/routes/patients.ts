import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils/patientUtils';
import  { parseNewEntries } from '../utils/entryUtils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatientsBasicInfo());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientsService.addPatients(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong...';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientsService.findPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newPatientEntry = parseNewEntries(req.body);
    const addedEntry = patientsService.createNewEntry(newPatientEntry, id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong...';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
