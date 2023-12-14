import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import DiaryDisplay from './components/Diaries'

export interface Diaries {
  id: number,
  date: string,
  weather: string,
  visibility: string
}

function App() {
  const [diaries, setDiaries] = useState<Diaries[]>([])

  useEffect(() => {
    axios.get<Diaries[]>('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data)
    })
  }, [])

  console.log(diaries)
  return (
    <>
      <Header />
      <DiaryDisplay diaries={diaries} />
    </>
  )
}

export default App
