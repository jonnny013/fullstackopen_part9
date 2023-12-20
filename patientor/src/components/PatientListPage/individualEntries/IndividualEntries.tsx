import {CardContent} from '@mui/material';
import {Diagnosis, Entry} from '../../../types';
import Hospital from './Hospital';
import HealthCheck from './HealthCheck';
import Employer from './Employer';
import { isHospitalEntry, isHealthCheckEntry, isOccupationalHealthcareEntry } from './TypeCheck';

const IndividualEntries = ({
  entry,
  diagnosis,
}: {
  entry: Entry;
  diagnosis: Diagnosis[];
}) => {
   const typeCheck = (type: string, entry: Entry, diagnosis: Diagnosis[]) => {
    switch (type) {
      case 'Hospital':
        if (isHospitalEntry(entry)) {
          return <Hospital entry={entry} diagnosis={diagnosis} />;
        }
        break;
      case 'HealthCheck':
        if (isHealthCheckEntry(entry)) {
          return <HealthCheck entry={entry} diagnosis={diagnosis} />;
        }
        break;
      case 'OccupationalHealthcare':
        if (isOccupationalHealthcareEntry(entry)) {
          return <Employer entry={entry} diagnosis={diagnosis} />;
        }
        break;
    }
    return null; // or some default component or message
  };

  return (
    <CardContent>
      {typeCheck(entry.type, entry, diagnosis)}
    </CardContent>
  );
};

export default IndividualEntries;
