import patients from '../../data/patients';

import {Patients, PatientsBasicInfo, NewPatientEntry} from '../types';

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

const addPatients = (entry: NewPatientEntry): Patients => {
  const newPatientEntry = {
    id: id,
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findPatientById = (id: string): Patients | undefined => {
  const patient = patients.find(p => p.id === id);
  console.log(patient);
  return patient;
};

export default {
  getPatientsPrivateInfo,
  addPatients,
  getPatientsBasicInfo,
  findPatientById
};
