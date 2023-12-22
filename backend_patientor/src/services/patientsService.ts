/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const Patient = require('../models/patient');
import mongoose from 'mongoose';
import {toOldPatientEntry} from '../utils/patientUtils';
import {v1 as uuid} from 'uuid';

import {Patients, PatientsBasicInfo, NewPatientEntry, EntryWithoutId} from '../types';

const getPatientsPrivateInfo = async (): Promise<
  NewPatientEntry[] | string | undefined
> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const result: unknown = await Patient.find({});

    if (result && Array.isArray(result)) {
      const mappedResult = result.map((notOk: unknown) => {
        const ok = toOldPatientEntry(notOk);
        return ok;
      });
      void mongoose.connection.close();
      return mappedResult;
    } else {
      console.log('error in get');
      return 'error in GET';
    }
  } catch (error) {
    console.log(error);
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    throw new Error(message);
  }
};

const getPatientsBasicInfo = async (): Promise<
  string | undefined | PatientsBasicInfo[]
> => {
  try {
    const result = await Patient.find({}).lean();

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
      return 'error in GET';
    }
  } catch (error) {
    console.log('here', error);
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    throw new Error(message);
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

const createNewEntry = async (
  entry: EntryWithoutId,
  patientId: string
): Promise<Patients | undefined> => {
  console.log(entry);
  const entryWithId = {
    ...entry,
    id: uuid(),
  };
  try {
    const patient = await Patient.findByIdAndUpdate(
      patientId,
      {$push: {entries: entryWithId}},
      {new: true, runValidators: true}
    );
    console.log('patient', patient);

    return toOldPatientEntry(patient);
  } catch (error) {
    console.log(error);
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    throw new Error(message);
  }
};

const findPatientById = async (id: string): Promise<Patients | undefined> => {
  try {
    const patient = await Patient.findById(id);
    console.log(patient);
    return toOldPatientEntry(patient);
  } catch (error) {
    console.log(error);
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    throw new Error(message);
  }
};

export default {
  getPatientsPrivateInfo,
  addPatients,
  getPatientsBasicInfo,
  findPatientById,
  createNewEntry,
};
