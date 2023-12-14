import { Diaries } from "../App"

interface DiaryDisplayProps {
  diaries: Diaries[]
}

const DiaryDisplay = (props: DiaryDisplayProps) => {

  return (
    <>
    <p>hi</p>
      {props.diaries.map(diary => (
        <div key={diary.id}>
          <p>{diary.id}</p>
          <p>{diary.date}</p>
          <p>{diary.weather}</p>
          <p>{diary.comment}</p>
        </div>
          
      ))}
    </>
  )
}

export default DiaryDisplay