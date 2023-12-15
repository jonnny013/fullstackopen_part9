import { useState, useEffect } from 'react'
import Header from './components/Header'
import DiaryDisplay from './components/Diaries'
import AddEntry from './components/AddEntry'
import { getAllDiaries } from './services/diaryServices'
import { Diaries } from './styles'

function App() {
  const [diaries, setDiaries] = useState<Diaries[]>([])

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  return (
    <>
      <Header />
      <AddEntry diaries={diaries} setDiaries={setDiaries} />
      <br />
      <DiaryDisplay diaries={diaries} />
    </>
  );
}

export default App
