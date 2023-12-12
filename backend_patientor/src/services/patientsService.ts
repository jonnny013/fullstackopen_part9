import patients from '../../data/patients';

import {Patients, PatientsBasicInfo} from '../types';

const getPatientsPrivateInfo = (): Patients[] => {
  return patients;
};

const getPatientsBasicInfo = (): PatientsBasicInfo[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatients = () => {
  return null;
};

export default {
  getPatientsPrivateInfo,
  addPatients,
  getPatientsBasicInfo,
};
