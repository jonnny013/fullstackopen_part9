"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNewEntries = void 0;
const types_1 = require("../types");
const patientUtils_1 = require("./patientUtils");
const ishealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).map(v => v).includes(param);
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (healthCheckRating === undefined ||
        typeof healthCheckRating !== 'number' ||
        !ishealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
    }
    return healthCheckRating;
};
const parseCriteria = (criteria) => {
    if (!criteria || !(0, patientUtils_1.isString)(criteria)) {
        throw new Error('Incorrect or missing criteria');
    }
    return criteria;
};
const parseDischarge = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing Discharge data');
    }
    if ('date' in object && 'criteria' in object) {
        const newObject = {
            date: (0, patientUtils_1.parseDate)(object.date),
            criteria: parseCriteria(object.criteria),
        };
        return newObject;
    }
    throw new Error('Incorrect or missing Discharge data');
};
const parseSickLeave = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing SickLeave data');
    }
    if ('startDate' in object && 'endDate' in object) {
        const newObject = {
            startDate: (0, patientUtils_1.parseDate)(object.startDate),
            endDate: (0, patientUtils_1.parseDate)(object.endDate)
        };
        return newObject;
    }
    throw new Error('Incorrect or missing SickLeave data');
};
const parseDescription = (description) => {
    if (!description || !(0, patientUtils_1.isString)(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !(0, patientUtils_1.isString)(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};
const parseEmployer = (employer) => {
    if (!employer || !(0, patientUtils_1.isString)(employer)) {
        throw new Error('Incorrect or missing employer');
    }
    return employer;
};
const parseId = (id) => {
    if (!id || !(0, patientUtils_1.isString)(id)) {
        throw new Error('Incorrect or missing id');
    }
    return id;
};
const parseDiagnosis = (diagnosis) => {
    if (!diagnosis || !Array.isArray(diagnosis) || !diagnosis.every(patientUtils_1.isString)) {
        throw new Error('Incorrect or missing diagnosis');
    }
    return diagnosis;
};
const parseEntries = (entries) => {
    if (!Array.isArray(entries)) {
        throw new Error('Entries must be an array');
    }
    const checkedEntries = entries.map(entry => {
        if (!entry || typeof entry !== 'object') {
            throw new Error('Incorrect or missing data');
        }
        if (entry.type === 'HealthCheck') {
            if ('description' in entry &&
                'date' in entry &&
                'specialist' in entry &&
                'healthCheckRating' in entry) {
                const newEntry = {
                    diagnosisCodes: entry.diagnosisCodes
                        ? parseDiagnosis(entry.diagnosisCodes)
                        : undefined,
                    id: parseId(entry.id),
                    type: 'HealthCheck',
                    healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
                    description: parseDescription(entry.description),
                    date: (0, patientUtils_1.parseDate)(entry.date),
                    specialist: parseSpecialist(entry.specialist),
                };
                return newEntry;
            }
            throw new Error('Incorrect data: missing required fields.');
        }
        else if (entry.type === 'Hospital') {
            if ('description' in entry &&
                'date' in entry &&
                'specialist' in entry &&
                'discharge' in entry) {
                const newEntry = {
                    diagnosisCodes: entry.diagnosisCodes
                        ? parseDiagnosis(entry.diagnosisCodes)
                        : undefined,
                    id: parseId(entry.id),
                    type: 'Hospital',
                    discharge: parseDischarge(entry.discharge),
                    description: parseDescription(entry.description),
                    date: (0, patientUtils_1.parseDate)(entry.date),
                    specialist: parseSpecialist(entry.specialist),
                };
                return newEntry;
            }
            throw new Error('Incorrect data: missing required fields.');
        }
        else if (entry.type === 'OccupationalHealthcare') {
            if ('description' in entry &&
                'date' in entry &&
                'specialist' in entry &&
                'employerName' in entry) {
                const newEntry = {
                    diagnosisCodes: entry.diagnosisCodes ? parseDiagnosis(entry.diagnosisCodes) : undefined,
                    id: parseId(entry.id),
                    type: 'OccupationalHealthcare',
                    sickLeave: entry.sickLeave ? parseSickLeave(entry.sickLeave) : undefined,
                    description: parseDescription(entry.description),
                    date: (0, patientUtils_1.parseDate)(entry.date),
                    specialist: parseSpecialist(entry.specialist),
                    employerName: parseEmployer(entry.employerName),
                };
                return newEntry;
            }
            throw new Error('Incorrect data: missing required fields.');
        }
        throw new Error('Invalid type');
    });
    const validEntries = checkedEntries.filter((entry) => entry !== undefined);
    return validEntries;
};
const parseNewEntries = (entry) => {
    if (!entry || typeof entry !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('type' in entry === false) {
        throw new Error('Incorrect or missing data');
    }
    if (entry.type !== undefined) {
        if (entry.type === 'HealthCheck') {
            if ('description' in entry &&
                'date' in entry &&
                'specialist' in entry &&
                'healthCheckRating' in entry) {
                const newEntry = {
                    diagnosisCodes: 'diagnosisCodes' in entry
                        ? parseDiagnosis(entry.diagnosisCodes)
                        : undefined,
                    type: 'HealthCheck',
                    healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
                    description: parseDescription(entry.description),
                    date: (0, patientUtils_1.parseDate)(entry.date),
                    specialist: parseSpecialist(entry.specialist),
                };
                return newEntry;
            }
            throw new Error('Incorrect data: missing required fields.');
        }
        else if (entry.type === 'Hospital') {
            if ('description' in entry &&
                'date' in entry &&
                'specialist' in entry &&
                'discharge' in entry) {
                const newEntry = {
                    diagnosisCodes: 'diagnosisCodes' in entry ? parseDiagnosis(entry.diagnosisCodes) : undefined,
                    type: 'Hospital',
                    discharge: parseDischarge(entry.discharge),
                    description: parseDescription(entry.description),
                    date: (0, patientUtils_1.parseDate)(entry.date),
                    specialist: parseSpecialist(entry.specialist),
                };
                return newEntry;
            }
            throw new Error('Incorrect data: missing required fields.');
        }
        else if (entry.type === 'OccupationalHealthcare') {
            if ('description' in entry &&
                'date' in entry &&
                'specialist' in entry &&
                'employerName' in entry) {
                const newEntry = {
                    diagnosisCodes: 'diagnosisCodes' in entry ? parseDiagnosis(entry.diagnosisCodes) : undefined,
                    type: 'OccupationalHealthcare',
                    sickLeave: 'sickLeave' in entry ? parseSickLeave(entry.sickLeave) : undefined,
                    description: parseDescription(entry.description),
                    date: (0, patientUtils_1.parseDate)(entry.date),
                    specialist: parseSpecialist(entry.specialist),
                    employerName: parseEmployer(entry.employerName),
                };
                return newEntry;
            }
            throw new Error('Incorrect data: missing required fields.');
        }
        else {
            throw new Error('Invalid type');
        }
    }
    throw new Error('Invalid type');
};
exports.parseNewEntries = parseNewEntries;
exports.default = parseEntries;
