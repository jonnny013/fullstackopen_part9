import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatientsBasicInfo());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
