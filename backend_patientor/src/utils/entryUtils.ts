import {
  Diagnosis,
  Discharge,
  Entry,
  EntryWithoutId,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  OccupationalHealthcareEntry,
  SickLeave,
} from '../types';
import {parseDate, isString} from './patientUtils';

const ishealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(v => v).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (
    healthCheckRating === undefined ||
    typeof healthCheckRating !== 'number' ||
    !ishealthCheckRating(healthCheckRating)
  ) {
    throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing criteria');
  }
  return criteria;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing Discharge data');
  }

  if ('date' in object && 'criteria' in object) {
    const newObject = {
      date: parseDate(object.date),
      criteria: parseCriteria(object.criteria),
    };
    return newObject;
  }
  throw new Error('Incorrect or missing Discharge data');
};


const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing SickLeave data');
  }

  if ('startDate' in object && 'endDate' in object) {
    const newObject = {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate)
    };
    return newObject;
  }
  throw new Error('Incorrect or missing SickLeave data');
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseEmployer = (employer: unknown): string => {
  if (!employer || !isString(employer)) {
    throw new Error('Incorrect or missing employer');
  }
  return employer;
};

 const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing id');
  }
  return id;
};

const parseDiagnosis = (diagnosis: unknown): Array<Diagnosis['code']> => {
  if (!diagnosis || !Array.isArray(diagnosis) || !diagnosis.every(isString)) {
    throw new Error('Incorrect or missing diagnosis');
  }
  return diagnosis;
};


const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error('Entries must be an array');
  }
  const checkedEntries: Entry[] = entries.map(entry => {
    if (!entry || typeof entry !== 'object') {
      throw new Error('Incorrect or missing data');
    }
    if (entry.type === 'HealthCheck') {
      if (
        'description' in entry &&
        'date' in entry &&
        'specialist' in entry &&
        'healthCheckRating' in entry
      ) {
        const newEntry: HealthCheckEntry = {
          diagnosisCodes: entry.diagnosisCodes
            ? parseDiagnosis(entry.diagnosisCodes)
            : undefined,
          id: parseId(entry.id),
          type: 'HealthCheck',
          healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
          description: parseDescription(entry.description),
          date: parseDate(entry.date),
          specialist: parseSpecialist(entry.specialist),
        };
        return newEntry;
      }
      throw new Error('Incorrect data: missing required fields.');
    } else if (entry.type === 'Hospital') {
      if (
        'description' in entry &&
        'date' in entry &&
        'specialist' in entry &&
        'discharge' in entry
      ) {
        const newEntry: HospitalEntry = {
          diagnosisCodes: entry.diagnosisCodes
            ? parseDiagnosis(entry.diagnosisCodes)
            : undefined,
          id: parseId(entry.id),
          type: 'Hospital',
          discharge: parseDischarge(entry.discharge),
          description: parseDescription(entry.description),
          date: parseDate(entry.date),
          specialist: parseSpecialist(entry.specialist),
        };
        return newEntry;
      }
      throw new Error('Incorrect data: missing required fields.');
    } else if (entry.type === 'OccupationalHealthcare') {
      if (
        'description' in entry &&
        'date' in entry &&
        'specialist' in entry &&
        'employerName' in entry
      ) {
        const newEntry: OccupationalHealthcareEntry = {
          diagnosisCodes: entry.diagnosisCodes ? parseDiagnosis(entry.diagnosisCodes) : undefined,
          id: parseId(entry.id),
          type: 'OccupationalHealthcare',
          sickLeave: entry.sickLeave ? parseSickLeave(entry.sickLeave) : undefined,
          description: parseDescription(entry.description),
          date: parseDate(entry.date),
          specialist: parseSpecialist(entry.specialist),
          employerName: parseEmployer(entry.employerName),
        };
        return newEntry;
      }
      throw new Error('Incorrect data: missing required fields.');
    }
    throw new Error('Invalid type');
});
const validEntries: Entry[] = checkedEntries.filter((entry) => entry !== undefined);
  return validEntries;
};

export const parseNewEntries = (entry: unknown): EntryWithoutId => {
    if (!entry || typeof entry !== 'object') {
      throw new Error('Incorrect or missing data');
    }
    if ('type' in entry === false) {
      throw new Error('Incorrect or missing data');
    }
if (entry.type !== undefined) {
if (entry.type === 'HealthCheck') {
    if (
      'description' in entry &&
      'date' in entry &&
      'specialist' in entry &&
      'healthCheckRating' in entry
    ) {
      const newEntry: NewHealthCheckEntry = {
        diagnosisCodes: 'diagnosisCodes' in entry
          ? parseDiagnosis(entry.diagnosisCodes)
          : undefined,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
        description: parseDescription(entry.description),
        date: parseDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
      };
      return newEntry;
    }
    throw new Error('Incorrect data: missing required fields.');
  } else if (entry.type === 'Hospital') {
    if (
      'description' in entry &&
      'date' in entry &&
      'specialist' in entry &&
      'discharge' in entry
    ) {
      const newEntry: NewHospitalEntry = {
        diagnosisCodes:
          'diagnosisCodes' in entry ? parseDiagnosis(entry.diagnosisCodes) : undefined,
        type: 'Hospital',
        discharge: parseDischarge(entry.discharge),
        description: parseDescription(entry.description),
        date: parseDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
      };
      return newEntry;
    }
    throw new Error('Incorrect data: missing required fields.');
  } else if (entry.type === 'OccupationalHealthcare') {
    if (
      'description' in entry &&
      'date' in entry &&
      'specialist' in entry &&
      'employerName' in entry
    ) {
      const newEntry: NewOccupationalHealthcareEntry = {
        diagnosisCodes:
          'diagnosisCodes' in entry ? parseDiagnosis(entry.diagnosisCodes) : undefined,
        type: 'OccupationalHealthcare',
        sickLeave: 'sickLeave' in entry ? parseSickLeave(entry.sickLeave) : undefined,
        description: parseDescription(entry.description),
        date: parseDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
        employerName: parseEmployer(entry.employerName),
      };
      return newEntry;
    }
    throw new Error('Incorrect data: missing required fields.');
  } else {
    throw new Error('Invalid type');
  }}
  throw new Error('Invalid type');
  
};

export default parseEntries;
