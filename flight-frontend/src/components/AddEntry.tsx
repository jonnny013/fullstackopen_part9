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
      <Form.Group className='mb-3'>
        <Form.Label>Weather</Form.Label>
        <br />
        {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map((weatherOption, index) => (
          <Form.Check
            inline
            label={weatherOption}
            name='weatherGroup'
            type='radio'
            id={`weather-radio-${index}`}
            key={`weather-radio-${index}`}
            value={weatherOption}
            checked={weather === weatherOption}
            onChange={event => setWeather(event.target.value)}
          />
        ))}
      </Form.Group>
      
      <Form.Group className='mb-3'>
        <Form.Label>Visibility</Form.Label>
        <br />
        {['great', 'good', 'ok', 'poor'].map((visibilityOption, index) => (
          <Form.Check
            inline
            label={visibilityOption}
            name='visibilityGroup'
            type='radio'
            id={`visibility-radio-${index}`}
            key={`visibility-radio-${index}`}
            value={visibilityOption}
            checked={visibility === visibilityOption}
            onChange={event => setVisibility(event.target.value)}
          />
        ))}
      </Form.Group>
      
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
