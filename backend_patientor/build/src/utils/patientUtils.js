"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toOldPatientEntry = exports.parseDate = exports.isString = void 0;
const types_1 = require("../types");
const entryUtils_1 = __importDefault(require("./entryUtils"));
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
exports.isString = isString;
const parseName = (name) => {
    if (!name || !(0, exports.isString)(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !(0, exports.isString)(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
exports.parseDate = parseDate;
const parseOccupation = (occupation) => {
    if (!occupation || !(0, exports.isString)(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseSsn = (ssn) => {
    if (!ssn || !(0, exports.isString)(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !(0, exports.isString)(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseId = (id) => {
    if (id !== null && typeof id !== 'undefined' && typeof id.toString === 'function') {
        return id.toString();
    }
    else {
        // Handle the case where id is null, undefined, or doesn't have a toString method
        throw new Error('Invalid or missing id');
    }
};
const toOldPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object &&
        'dateOfBirth' in object &&
        'gender' in object &&
        'occupation' in object &&
        'ssn' in object &&
        'entries' in object &&
        '_id' in object) {
        const newEntry = {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            id: parseId(object._id),
            name: parseName(object.name),
            dateOfBirth: (0, exports.parseDate)(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            ssn: parseSsn(object.ssn),
            entries: (0, entryUtils_1.default)(object.entries),
        };
        return newEntry;
    }
    throw new Error('Incorrect data: missing required fields.');
};
exports.toOldPatientEntry = toOldPatientEntry;
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object && 'entries' in object) {
        const newEntry = {
            name: parseName(object.name),
            dateOfBirth: (0, exports.parseDate)(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            ssn: parseSsn(object.ssn),
            entries: (0, entryUtils_1.default)(object.entries)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: missing required fields.');
};
exports.default = toNewPatientEntry;
