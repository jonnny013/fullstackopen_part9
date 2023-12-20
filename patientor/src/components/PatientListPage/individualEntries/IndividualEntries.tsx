import {CardContent} from '@mui/material';
import {Diagnosis, Entry} from '../../../types';
import Hospital from './Hospital';
import HealthCheck from './HealthCheck';
import Employer from './Employer';

const IndividualEntries = ({
  entry,
  diagnosis,
}: {
  entry: Entry;
  diagnosis: Diagnosis[];
}) => {
  const typeCheck = (type: string) => {
    switch (type) {
      case 'Hospital':
        return <Hospital entry={entry} diagnosis={diagnosis} />;
      case 'HealthCheck':
        return <HealthCheck entry={entry} diagnosis={diagnosis} />;
      case 'OccupationalHealthcare':
        return <Employer entry={entry} diagnosis={diagnosis} />;
    }
  };

  return (
    <CardContent>
      {typeCheck(entry.type)}
    </CardContent>
  );
};

export default IndividualEntries;
