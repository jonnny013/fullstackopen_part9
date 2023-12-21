import {TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Dayjs} from 'dayjs';

type DateSetter = React.Dispatch<React.SetStateAction<string | null>>;

interface props {
  discharge: {
    criteria: string;
    date: null | string;
  };
  setDischarge: React.Dispatch<
    React.SetStateAction<{
      date: null | string;
      criteria: string;
    }>
  >;
  dateInput: (date: Dayjs | null, setter: DateSetter) => void;
}

const HospitalForm = ({
  discharge,
  setDischarge,
  dateInput,
}: props) => {
  return (
    <>
      <TextField
        label='Discharge criteria'
        fullWidth
        value={discharge.criteria}
        onChange={({target}) => setDischarge({...discharge, criteria: target.value})}
        required
      />
      <DatePicker
        label='Discharge date'
        required
        value={discharge.date}
        onChange={value =>
          dateInput(value, date => setDischarge({...discharge, date: date}))
        }
      />
    </>
  );
};

export default HospitalForm;
