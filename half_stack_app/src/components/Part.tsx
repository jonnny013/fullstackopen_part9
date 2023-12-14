import { CoursePart } from "../App";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

interface PartProps {
  item: CoursePart
}

const Part =( props: PartProps) => {
  switch (props.item.kind) {
    case 'basic':
      return <em>{props.item.description}</em>;
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
      return <em>Project exercises {props.item.groupProjectCount}</em>;
    default:
      return assertNever(props.item);
  }
};

export default Part;
