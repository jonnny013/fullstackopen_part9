import { Diaries } from "../styles"
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';

interface DiaryDisplayProps {
  diaries: Diaries[]
}

const DiaryDisplay = (props: DiaryDisplayProps) => {

  return (
    <div style={{margin: 20}}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Weather</th>
            <th>Visibility</th>
          </tr>
        </thead>
        <tbody>
          {props.diaries.map(diary => (
            <tr key={diary.id}>
              <td>{diary.id}</td>
              <td>{diary.date}</td>
              <td>{diary.weather}</td>
              <td>{diary.visibility}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DiaryDisplay