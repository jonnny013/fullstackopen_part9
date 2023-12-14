import Part from './Part';
import {CoursePart} from '../App';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map(item => (
        <div key={item.name}>
          <b>
            {item.name} {item.exerciseCount}
          </b>
          <br />
          <Part item={item} />
          <br />
          <br />
        </div>
      ))}
    </>
  );
};

export default Content;
