import {TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

type DateSetter = React.Dispatch<React.SetStateAction<string | null>>;

interface props {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeave: {
    startDate: null | string;
    endDate: null | string;
  };
  setSickLeave: React.Dispatch<React.SetStateAction<string | null>>;
  dateInput: (date: Dayjs | null, setter: DateSetter) => void;
}

const EmployerForm = ({employerName, setEmployerName, sickLeave, setSickLeave, dateInput}: props) => {
  return (
    <>
      <TextField
        label='Employer Name'
        fullWidth
        value={employerName}
        onChange={({target}) => setEmployerName(target.value)}
        required
      />
      <DatePicker
        label='Sick Leave start date (optional)'
        value={sickLeave.startDate}
        onChange={(value: Dayjs) => {
          if (value !== null) {
            console.log(value);
            // Do something with the Dayjs object
          } else {
            // Handle the case where the date is null
            console.log('Date is null');
          }
        }}
      />
      <DatePicker
        label='Sick Leave end date (optional)'
        value={sickLeave.endDate}
        onChange={value =>
          dateInput(value, date => setSickLeave({...sickLeave, endDate: date}))
        }
      />
    </>
  );
};

export default EmployerForm;
