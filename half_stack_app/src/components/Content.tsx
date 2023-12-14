interface ContentProps {
  courseParts: 
    {name: string;
    exerciseCount: number;
    }[]
}

const Content = (props: ContentProps) => {
  return (
    <>
     <p>{props.courseParts.map(item => <p>{item.name} {item.exerciseCount}</p>)}</p> 
    </>
  )
}

export default Content