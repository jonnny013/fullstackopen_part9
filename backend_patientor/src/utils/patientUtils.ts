import {  Gender, NewPatientEntry, Patients } from "../types";
import parseEntries from "./entryUtils";

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

 const parseId = (id: unknown): string => {
  if (id !== null && typeof id !== 'undefined' && typeof id.toString === 'function') {
    return (id as {toString(): string}).toString();
  } else {
    // Handle the case where id is null, undefined, or doesn't have a toString method
    throw new Error('Invalid or missing id');
  }
};

export const toOldPatientEntry = (object: unknown): Patients => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'gender' in object &&
    'occupation' in object &&
    'ssn' in object &&
    'entries' in object &&
    '_id' in object
  ) {
    const newEntry: Patients = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      id: parseId(object._id),
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
      entries: parseEntries(object.entries),

    };
    return newEntry;
  }
  throw new Error('Incorrect data: missing required fields.');
};


const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation'in object && 'ssn' in object && 'entries' in object ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
      entries: parseEntries(object.entries)
    };
    return newEntry;
  } 
  throw new Error('Incorrect data: missing required fields.');
};

export default toNewPatientEntry;