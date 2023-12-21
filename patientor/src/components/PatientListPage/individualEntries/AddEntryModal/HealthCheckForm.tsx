import {FormControl, InputLabel, Select, SelectChangeEvent, MenuItem} from '@mui/material';
import { HealthCheckRating } from '../../../../types';


interface props {
  healthCheckRating: HealthCheckRating;
  onHealthCheckRatingChange: (event: SelectChangeEvent<number>) => void;
  healthCheckRatingOptions: {
    value: string | HealthCheckRating;
    label: string;
  }[];
}

const HealthCheckForm = ({
  healthCheckRating,
  onHealthCheckRatingChange,
  healthCheckRatingOptions,
}: props) => {
  return (
    <>
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
          required
        >
          {healthCheckRatingOptions.map(option => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default HealthCheckForm;
