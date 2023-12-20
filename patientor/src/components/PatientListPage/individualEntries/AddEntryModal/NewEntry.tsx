import {useState, SyntheticEvent} from 'react';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs, {Dayjs} from 'dayjs';

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  FormControl,
  Checkbox,
  ListItemText
} from '@mui/material';
import {Diagnosis, EntryWithoutId, HealthCheckRating} from '../../../../types';

type DateSetter = React.Dispatch<React.SetStateAction<string | null>>;

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnosis: Diagnosis[]
}


const healthCheckRatingOptions = Object.entries(
  HealthCheckRating
).map(([key, value]) => ({
    value: value,
    label: key,
  })).filter(a => isNaN(Number(a.label)) !== false  );


const NewEntry = ({onCancel, onSubmit, diagnosis}: Props) => {
  const [date, setDate] = useState<string | null>(null);
  const [specialist, setSpecialist] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [sickLeave, setSickLeave] = useState({
    startDate: null,
    endDate: null,
  });
  const [discharge, setDischarge] = useState({
    date: null,
    criteria: '',
  });
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
  const diagnosisCodeArray: string[] = diagnosis.map(a => a.code);
  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    const value = event.target.value;
    if (typeof value === 'number') {
      setHealthCheckRating(value);
    }
  };

  const dateInput = (date: Dayjs | null, setter: DateSetter) => {
    if (date) {
      const formattedDate = date.format('YYYY-MM-DD');
      setter(formattedDate);
    } else {
      setter(''); 
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      specialist,
      description,
      type,
      diagnosisCodes,
      employerName,
      sickLeave,
      healthCheckRating,
      discharge
    });
  };

  return (
    <div>
      <form
        onSubmit={addPatient}
        style={{display: 'flex', gap: 10, flexDirection: 'column'}}
      >
        <FormControl fullWidth>
          <InputLabel id='type'>Type</InputLabel>
          <Select
            value={type}
            fullWidth
            labelId='type'
            label='Type'
            id='type'
            onChange={({target}) => setType(target.value)}
          >
            <MenuItem value='OccupationalHealthcare'>Occupational Healthcare</MenuItem>
            <MenuItem value='Hospital'>Hospital</MenuItem>
            <MenuItem value='HealthCheck'>Health Check</MenuItem>
          </Select>
        </FormControl>
        <DatePicker
          label='Date'
          value={date}
          onChange={value => dateInput(value, setDate)}
          maxDate={dayjs('2030-12-31')}
          fullWidth
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
        <FormControl>
          <InputLabel style={{marginTop: 0}} id='diagnosesCodes'>
            Diagnoses Codes
          </InputLabel>
          <Select
            labelId='diagnosesCodes'
            id='diagnosesCodes'
            label='Diagnoses Codes'
            multiple
            fullWidth
            renderValue={selected => selected.join(', ')}
            value={diagnosisCodes}
            onChange={event => setDiagnosisCodes(event.target.value as string[])}
          >
            {diagnosisCodeArray.map(option => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={(diagnosisCodes as string[]).indexOf(option) > -1} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <DatePicker
          label='Sick Leave start date'
          value={sickLeave.startDate}
          onChange={value =>
            dateInput(value, date => setSickLeave({...sickLeave, startDate: date}))
          }
        />
        <DatePicker
          label='Sick Leave end date'
          value={sickLeave.endDate}
          onChange={value =>
            dateInput(value, date => setSickLeave({...sickLeave, endDate: date}))
          }
        />
        <TextField
          label='Discharge criteria'
          fullWidth
          value={discharge.criteria}
          onChange={({target}) => setDischarge({...discharge, criteria: target.value})}
        />
        <DatePicker
          label='Discharge date'
          value={discharge.date}
          onChange={value =>
            dateInput(value, date => setDischarge({...discharge, date: date}))
          }
        />
        <FormControl>
          <InputLabel style={{marginTop: 0}} id='healthCheckRating'>
            Health Check Rating
          </InputLabel>
          <Select
            labelId='healthCheckRating'
            id='healthCheckRating'
            label='Health Check Rating'
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
        </FormControl>
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
