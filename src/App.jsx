import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { Loader } from './pages/Loader'
import MovieCard from './pages/MovieCard'
import CelebrityCard from './pages/CelebrityCard'
import TopRated from './components/TopRated'
import TvSeries from './components/TvSeries'
import SerieCard from './pages/SerieCard'
import MovieGenres from './pages/MovieGenres'
import SerieGenres from './pages/SerieGenres'






function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(!loading)
    }, 1800)
  }, [])



  return (
    <main>
      <Routes>
        <Route path='/' element={loading ? (<Loader />) : (<Home />)} />
        <Route path='/movie/:id' element={(<MovieCard />)} />
        <Route path='/actor/:id' element={(<CelebrityCard />)} />
        <Route path='/top_rated' element={(<TopRated />)} />
        <Route path='/tvseries' element={(<TvSeries />)} />
        <Route path='/serie/:id' element={(<SerieCard />)} />
        <Route path='/moviegenre/:id' element={(<MovieGenres />)} />
        <Route path='/seriegenre/:id' element={(<SerieGenres />)} />
      </Routes>


    </main>
  )
}

export default App
