/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils/patientUtils';
import  { parseNewEntries } from '../utils/entryUtils';
import {Request, Response} from 'express';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const patients = await patientsService.getPatientsBasicInfo();
    res.send(patients);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const entries: string[] = [];
  const newpat = req.body;
  let addEntryToPat;
  if ('entries' in newpat) {
    addEntryToPat = newpat;
  } else {
    addEntryToPat = {...newpat, entries: entries};
  }

  try {
    const newPatientEntry = toNewPatientEntry(addEntryToPat);
    const addedPatient = await patientsService.addPatients(newPatientEntry);
    res.json(addedPatient);
    console.log(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong...';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
      console.error('Error:', error);
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
  console.log(req.body);
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
