import {useState, SyntheticEvent} from 'react';

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import {EntryWithoutId, HealthCheckRating} from '../../../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

interface HealthCheckRatingOptions {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOptions[] = Object.entries(
  HealthCheckRating
).map(([key, value]) => ({
    value: value,
    label: key,
  })).filter(a => isNaN(Number(a.label)) !== false  );


const NewEntry = ({onCancel, onSubmit}: Props) => {
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState([]);
  const [sickLeave, setSickLeave] = useState({
    startDate: '',
    endDate: '',
  });

  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = event.target.value;
    setHealthCheckRating(value);
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log({
      date,
      specialist,
      description,
      type,
      diagnosisCodes,
      employerName,
      sickLeave,
      healthCheckRating,
    });
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField
          label='Date'
          fullWidth
          value={date}
          onChange={({target}) => setDate(target.value)}
        />
        <TextField
          label='Specialist'
          fullWidth
          value={specialist}
          onChange={({target}) => setSpecialist(target.value)}
        />
        <TextField
          label='Description'
          fullWidth
          value={description}
          onChange={({target}) => setDescription(target.value)}
        />
        <TextField
          label='Employer Name'
          fullWidth
          value={employerName}
          onChange={({target}) => setEmployerName(target.value)}
        />
        <TextField
          label='Type'
          fullWidth
          value={type}
          onChange={({target}) => setType(target.value)}
        />
        <TextField
          label='Diagnosis Codes'
          fullWidth
          value={diagnosisCodes.join(', ')}
          onChange={({target}) => setDiagnosisCodes(target.value.split(','))}
        />
        <TextField
          label='Sick Leave Start Date'
          fullWidth
          value={sickLeave.startDate}
          onChange={({target}) => setSickLeave({...sickLeave, startDate: target.value})}
        />
        <TextField
          label='Sick Leave End Date'
          fullWidth
          value={sickLeave.endDate}
          onChange={({target}) => setSickLeave({...sickLeave, endDate: target.value})}
        />
        <InputLabel style={{marginTop: 20}}>Health Check Rating</InputLabel>
        <Select
          label='healthCheckRating'
          fullWidth
          value={healthCheckRating}
          onChange={onHealthCheckRatingChange}
        >
          {healthCheckRatingOptions.map(option => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <Grid>
          <Grid item>
            <Button
              color='secondary'
              variant='contained'
              style={{float: 'left'}}
              type='button'
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type='submit'
              variant='contained'
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default NewEntry;
