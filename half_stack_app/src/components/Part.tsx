import {CoursePart} from '../App';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

interface PartProps {
  item: CoursePart;
}

const Part = (props: PartProps) => {
  switch (props.item.kind) {
    case 'basic':
      return (
        <div>
          <em>{props.item.description}</em>
        </div>
      );
    case 'background':
      return (
        <div>
          <em>{props.item.description}</em>
          <br />
          <em>
            Submit to <a>{props.item.backgroundMaterial}</a>
          </em>
        </div>
      );
    case 'group':
      return (
        <div>
          <em>Project exercises {props.item.groupProjectCount}</em>
        </div>
      );
    case 'special':
      return (
        <div>
          <em>{props.item.description}</em>
          <br />
          <div>required skills: {props.item.requirements.join(', ')}</div>
        </div>
      );
    default:
      return assertNever(props.item);
  }
};

export default Part;
