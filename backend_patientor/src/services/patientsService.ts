import patients from '../../data/patients';

import {Patients, PatientsBasicInfo, Gender} from '../types';

import { v1 as uuid } from 'uuid';
const id: string = uuid();

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

const addPatients = (
  name: string,
  dateOfBirth: string,
  gender: Gender,
  occupation: string,
  ssn: string
) => {
  const newPatientEntry = {
    id: id,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    name,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatientsPrivateInfo,
  addPatients,
  getPatientsBasicInfo,
};
