import {CardContent, Typography} from '@mui/material';
import {Diagnosis, HospitalEntry} from '../../../types';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';


const IndividualEntries = ({
  entry,
  diagnosis,
}: {
  entry: HospitalEntry;
  diagnosis: Diagnosis[];
}) => {


  return (
    <CardContent>
      <Typography style={{display: 'flex', gap: 15}}>
        <LocalHospitalRoundedIcon style={{color: 'red'}} /> {entry.date}
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
      <Typography>Discharged: {entry.discharge.date}</Typography>
      <Typography>Discharged criteria: {entry.discharge.criteria}</Typography>
      <Typography>Diagnosed by: {entry.specialist}</Typography>
    </CardContent>
  );
};

export default IndividualEntries;
