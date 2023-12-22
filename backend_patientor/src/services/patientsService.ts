/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../../data/patients';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Patient = require('../models/patient');
import mongoose from 'mongoose';
import  { toOldPatientEntry } from '../utils/patientUtils';

import {
  Patients,
  PatientsBasicInfo,
  NewPatientEntry,
  EntryWithoutId,
  Entry,
} from '../types';

import {v1 as uuid} from 'uuid';


const getPatientsPrivateInfo = async (): Promise<NewPatientEntry[] | void> => {
  try {
    const result: unknown = await Patient.find({});

    if (result && Array.isArray(result)) {
      const mappedResult = result.map((notOk: unknown) => {
        const ok = toOldPatientEntry(notOk);

        return ok;
      });
      void mongoose.connection.close();
      return mappedResult;
    }
  } catch (error) {
    console.log(error);
  }
};

const getPatientsBasicInfo = async (): Promise<void | PatientsBasicInfo[]> => {
  try {
    const result: unknown = await Patient.find({});
    console.log('result', result);
    if (result && Array.isArray(result)) {
      const filteredResults = result.map((notOk: unknown) => {
        
        const ok: Patients = toOldPatientEntry(notOk);
          const filtered = {
            id: ok.id,
            name: ok.name,
            dateOfBirth: ok.dateOfBirth,
            gender: ok.gender,
            occupation: ok.occupation,
          };
          return filtered;

      });
      void mongoose.connection.close();
      return filteredResults;
    } else {
      console.log('error in get');
    }

  } catch (error) {
    console.log(error);
  }
};

const addPatients = async (entry: NewPatientEntry): Promise<Patients> => {
  const body: NewPatientEntry = entry;
  const newPatientEntry = new Patient({
    name: body.name,
    dateOfBirth: body.dateOfBirth,
    ssn: body.ssn,
    gender: body.gender,
    occupation: body.occupation,
    entries: body.entries,
  });
  console.log(newPatientEntry);
  const savedPatient = await newPatientEntry.save();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return savedPatient;
};

const createNewEntry = (entry: EntryWithoutId, patientId: string): Entry => {
  console.log(entry);
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
