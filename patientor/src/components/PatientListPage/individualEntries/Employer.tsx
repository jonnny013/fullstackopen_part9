import {CardContent, Typography} from '@mui/material';
import {Diagnosis, OccupationalHealthcareEntry} from '../../../types';
import WorkIcon from '@mui/icons-material/Work';

const IndividualEntries = ({
  entry,
  diagnosis,
}: {
  entry: OccupationalHealthcareEntry;
  diagnosis: Diagnosis[];
}) => {
  return (
    <CardContent>
      <Typography style={{display: 'flex', gap: 15}}>
        <WorkIcon style={{color: 'blue'}} />
        <b>{entry.employerName} </b>
        {entry.date}
      </Typography>
      <Typography>{entry.description}</Typography>
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map(code => {
            const matchingDiagnosis = diagnosis?.find(d => d.code === code);
            return (
              <li key={code}>
                {code}: {matchingDiagnosis ? matchingDiagnosis.name : 'Unknown Diagnosis'}
              </li>
            );
          })}
      </ul>

      {entry.sickLeave && (
        <div>
          <Typography>Sick leave start: {entry.sickLeave.startDate}</Typography>
          <Typography>Sick leave end: {entry.sickLeave.endDate}</Typography>
        </div>
      )}

      <Typography>Diagnosed by: {entry.specialist}</Typography>
    </CardContent>
  );
};

export default IndividualEntries;
