import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  res.send(diagnosisService.getDiagnosis());
});

router.post('/', (_req, res) => {
  res.send('Posting not available!');
});

export default router;
