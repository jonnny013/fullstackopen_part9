import diagnosis from '../../data/diagnosis';

import { Diagnosis } from '../types';

const getDiagnosis = (): Diagnosis[] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnosis;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnosis,
  addDiagnosis,
};