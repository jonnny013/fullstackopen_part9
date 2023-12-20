import {
  Entry,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
} from '../../../types';

export const isHospitalEntry = (entry: Entry): entry is HospitalEntry => {
  return entry.type === 'Hospital';
};

export const isHealthCheckEntry = (entry: Entry): entry is HealthCheckEntry => {
  return entry.type === 'HealthCheck';
};

export const isOccupationalHealthcareEntry = (
  entry: Entry
): entry is OccupationalHealthcareEntry => {
  return entry.type === 'OccupationalHealthcare';
};
