import patients from '../../data/patients';

import {
  Patients,
  PatientsBasicInfo,
  NewPatientEntry,
  EntryWithoutId,
  Entry,
} from '../types';

import {v1 as uuid} from 'uuid';


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
    id: uuid(),
    ...entry,
  };
  console.log(newPatientEntry);
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const createNewEntry = (entry: EntryWithoutId, patientId: string): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  const patient = patients.find(patient => patient.id === patientId);
  patient?.entries.push(newEntry);
  return newEntry;
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
  findPatientById,
  createNewEntry
};
