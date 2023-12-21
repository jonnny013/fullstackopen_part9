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
  ListItemText,
} from '@mui/material';
import {
  Diagnosis,
  Discharge,
  EntryWithoutId,
  HealthCheckRating,
  SickLeave,
} from '../../../../types';
import EmployerForm from './EmployerForm';
import HospitalForm from './HospitalForm';
import HealthCheckForm from './HealthCheckForm';

type DateSetter = React.Dispatch<React.SetStateAction<string | null>>;

type EntryType = 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnosis: Diagnosis[];
}

const healthCheckRatingOptions = Object.entries(HealthCheckRating)
  .map(([key, value]) => ({
    value: value,
    label: key,
  }))
  .filter(a => isNaN(Number(a.label)) !== false);

const NewEntry = ({onCancel, onSubmit, diagnosis}: Props) => {
  const [date, setDate] = useState<string | null>(null);
  const [specialist, setSpecialist] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<EntryType>('Hospital');
  const [employerName, setEmployerName] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: null,
    endDate: null,
  });
  const [discharge, setDischarge] = useState<Discharge>({
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

  const dateInput = (date: Dayjs | null | string, setter: DateSetter): void => {
    if (date && date instanceof dayjs) {
      const formattedDate: string = date.format('YYYY-MM-DD');
      setter(formattedDate);
    } else if (typeof date === 'string') {
      setter(date);
    } else {
      setter('');
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    const data = {
      date,
      specialist,
      description,
      type,
      diagnosisCodes,
      employerName,
      healthCheckRating,
      discharge,
      ...(sickLeave.startDate !== null && sickLeave.endDate !== null ? {sickLeave} : {}),
    };
    onSubmit(data);
    console.log(data);
  };
  const ok = Boolean(Date.parse(sickLeave.startDate as string));
  console.log('date', date, 'type', typeof date);
  console.log(ok);
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
            onChange={event => setType(event.target.value as EntryType)}
            required
          >
            <MenuItem value='OccupationalHealthcare'>Occupational Healthcare</MenuItem>
            <MenuItem value='Hospital'>Hospital</MenuItem>
            <MenuItem value='HealthCheck'>Health Check</MenuItem>
          </Select>
        </FormControl>
        <DatePicker
          label='Date'
          value={date}
          onChange={(value: Dayjs | null | string) => dateInput(value, setDate)}
          //onChange={target => setDate(target.value)}
          maxDate={dayjs('2030-12-31')}
        />
        <TextField
          label='Specialist'
          fullWidth
          value={specialist}
          onChange={({target}) => setSpecialist(target.value)}
          required
        />
        <TextField
          label='Description'
          fullWidth
          value={description}
          onChange={({target}) => setDescription(target.value)}
          required
        />
        <FormControl>
          <InputLabel style={{marginTop: 0}} id='diagnosesCodes'>
            Diagnoses Codes (optional)
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
        {type === 'OccupationalHealthcare' && (
          <EmployerForm
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
            dateInput={dateInput}
          />
        )}
        {type === 'Hospital' && (
          <HospitalForm
            discharge={discharge}
            setDischarge={setDischarge}
            dateInput={dateInput}
          />
        )}
        {type === 'HealthCheck' && (
          <HealthCheckForm
            healthCheckRating={healthCheckRating}
            onHealthCheckRatingChange={onHealthCheckRatingChange}
            healthCheckRatingOptions={healthCheckRatingOptions}
          />
        )}
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
