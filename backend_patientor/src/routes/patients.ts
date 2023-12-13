import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatientsBasicInfo());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, gender, occupation, ssn } = req.body;

  const addedPatient = patientsService.addPatients({name, dateOfBirth, gender, occupation, ssn});
  res.json(addedPatient);
});

export default router;
