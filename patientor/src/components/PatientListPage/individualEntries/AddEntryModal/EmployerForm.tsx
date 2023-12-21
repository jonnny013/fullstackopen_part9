import {TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { SickLeave } from '../../../../types';

type DateSetter = React.Dispatch<React.SetStateAction<string | null>>;

interface props {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeave: {
    startDate: null | string;
    endDate: null | string;
  };
  setSickLeave: React.Dispatch<React.SetStateAction<SickLeave>>;
  dateInput: (date: Dayjs | null | string, setter: DateSetter) => void;
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
        onChange={(value: Dayjs | null | string) => dateInput(value, date => setSickLeave({...sickLeave, startDate: date as string}))}
      />
      <DatePicker
        label='Sick Leave end date (optional)'
        value={sickLeave.endDate}
        onChange={(value: Dayjs | null | string) =>
          dateInput(value, date => setSickLeave({...sickLeave, endDate: date as string}))
        }
      />
    </>
  );
};

export default EmployerForm;
