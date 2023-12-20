import {CardContent, Typography} from '@mui/material';
import {Diagnosis, HealthCheckEntry} from '../../../types';
import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

const IndividualEntries = ({
  entry,
  diagnosis,
}: {
  entry: HealthCheckEntry;
  diagnosis: Diagnosis[];
}) => {
  const healthRating = (rating: number) => {
    return (
      <div>
        {rating > 0 ? (
          Array.from({length: rating}, (_, index) => <FavoriteRoundedIcon key={index} />)
        ) : (
          <FavoriteBorderRoundedIcon />
        )}
      </div>
    );
  };

  return (
    <CardContent>
      <Typography style={{display: 'flex', gap: 15}}>
        <MonitorHeartRoundedIcon style={{color: 'green'}} /> {entry.date}
      </Typography>
      <Typography>{entry.description}</Typography>
      {healthRating(entry.healthCheckRating)}
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
      <Typography>Diagnosed by: {entry.specialist}</Typography>
    </CardContent>
  );
};

export default IndividualEntries;
