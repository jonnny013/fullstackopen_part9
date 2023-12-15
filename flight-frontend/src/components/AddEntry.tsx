import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {createDiary} from '../services/diaryServices';
import {Diaries, NewDiary} from '../styles';
import {useState} from 'react';
import ErrorNotification from './ErrorNotification';

const AddEntry = ({
  diaries,
  setDiaries,
}: {
  diaries: Diaries[];
  setDiaries: React.Dispatch<React.SetStateAction<Diaries[]>>;
}) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diary: NewDiary = {
      date,
      visibility,
      weather,
      comment,
    };
      const data: Diaries | string = await createDiary(diary);
      if (typeof data !== 'string') {
        setDiaries(diaries.concat(data));
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
      } else {
        setErrorMessage(data)
      }
    
  };

  return (
    <Form onSubmit={onSubmit} style={{margin: 20}}>
      <Form.Group className='mb-3' controlId='text'>
        <Form.Label>Date</Form.Label>
        <Form.Control
          type='date'
          placeholder='yyyy-mm-dd'
          onChange={event => setDate(event.target.value)}
        />
      </Form.Group>
      <Form.Label>Weather</Form.Label>
      <Form.Select
        aria-label='Default select example'
        onChange={event => setWeather(event.target.value)}
        defaultValue='default'
      >
        <option value='default' disabled>
          Weather
        </option>
        <option value='sunny'>sunny</option>
        <option value='rainy'>rainy</option>
        <option value='cloudy'>cloudy</option>
        <option value='stormy'>stormy</option>
        <option value='windy'>windy</option>
      </Form.Select>
      <Form.Label>Visibility</Form.Label>
      <Form.Select
        aria-label='Default select example'
        onChange={event => setVisibility(event.target.value)}
        defaultValue='default'
      >
        <option value='default' disabled>
          Visibility
        </option>
        <option value='great'>great</option>
        <option value='good'>good</option>
        <option value='ok'>ok</option>
        <option value='poor'>poor</option>
      </Form.Select>

      <Form.Group className='mb-3' controlId='text'>
        <Form.Label>Comments</Form.Label>
        <Form.Control
          type='text'
          placeholder='comments'
          onChange={event => setComment(event.target.value)}
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
      <ErrorNotification errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </Form>
  );
};

export default AddEntry;
