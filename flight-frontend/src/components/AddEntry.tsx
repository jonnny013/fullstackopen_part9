import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const AddEntry = () => {
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    console.log(event.target.value)
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className='mb-3' controlId='text'>
        <Form.Label>Date</Form.Label>
        <Form.Control type='text' placeholder='Enter date' />
      </Form.Group>
      <Form.Label>Weather</Form.Label>
      <Form.Select aria-label='Default select example'>
        <option disabled>Weather</option>
        <option value='sunny'>sunny</option>
        <option value='rainy'>rainy</option>
        <option value='cloudy'>cloudy</option>
        <option value='stormy'>stormy</option>
        <option value='windy'>windy</option>
      </Form.Select>
      <Form.Label>Visibility</Form.Label>
      <Form.Select aria-label='Default select example'>
        <option disabled>Visibility</option>
        <option value='great'>great</option>
        <option value='good'>good</option>
        <option value='ok'>ok</option>
        <option value='poor'>poor</option>
      </Form.Select>

      <Form.Group className='mb-3' controlId='text'>
        <Form.Label>Comments</Form.Label>
        <Form.Control type='text' placeholder='comments' />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default AddEntry;
