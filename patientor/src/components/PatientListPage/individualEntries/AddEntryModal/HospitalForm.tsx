import {TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

type DateSetter = React.Dispatch<React.SetStateAction<string | null>>;

interface props {
  discharge: {
    criteria: string;
    date: null | string;
  };
  setDischarge: React.Dispatch<
    React.SetStateAction<{
      date: string | null;
      criteria: string;
    }>
  >;
  dateInput: (date: string | null, setter: DateSetter) => void;
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
        value={discharge.date}
        onChange={value =>
          dateInput(value, date => setDischarge({...discharge, date: date as string}))
        }
      />
    </>
  );
};

export default HospitalForm;
