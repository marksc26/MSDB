import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styles/Home.css'
import { useNavigate } from 'react-router-dom'
import People from './People'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import Upcoming from './Upcoming'



const Home = () => {


  const BASE_URL = 'https://api.themoviedb.org/3'
  const API_KEY = import.meta.env.VITE_API_KEY
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original'

  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [showTitle, setshowTitle] = useState(true)
  const [moviesNotFound, setMoviesNotFound] = useState(false);




  //!RENDERIZAR LA BUSQUEDA

  const fetchMovies = async (searchKey) => {

    const type = searchKey ? "search" : "discover"
    const { data: { results } } =
      await axios.get(`${BASE_URL}/${type}/movie`, {
        params: {
          api_key: API_KEY,
          query: searchKey,

        }
      })

    if (results.length === 0) {
      setMoviesNotFound(true)
    } else {
      setMoviesNotFound(false)
      setMovies(results.filter((movie) => movie.poster_path))

    }
    setMovies(results.filter((movie) => movie.poster_path))


  }

  //! RENDERIZAR LAS PELICULAS EN CINE

  const fetchInTheaters = async () => {
    const currentDate = new Date()
    const formattedCurrentDate = currentDate.toISOString().split('T')[0]

    const { data: { results } } = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
        'primary_release_date.lte': formattedCurrentDate,
        region: 'US,GB'
      }
    })

    setMovies(results)


  }

  const searchMovies = (e) => {
    e.preventDefault()

    if (searchKey) {
      fetchMovies(searchKey)
      setshowTitle(false)
    } else {
      fetchInTheaters()
      setMoviesNotFound(false)
      setshowTitle(true)
    }


  }

  useEffect(() => {
    fetchInTheaters()
    window.scrollTo(0, 0)
  }, [])



  const navigate = useNavigate()

  const handleCard = (movieId) => {
    navigate(`/movie/${movieId}`)
  }




  return (
    <section>

      <Header />

      <div className='input-container'>
        <form onSubmit={searchMovies}>
          <div className='input-search'>
            <input type="text" placeholder='Search a movie' onChange={(e) => setSearchKey(e.target.value)} />
            <button><i className='bx bx-search'></i></button>
          </div>

        </form>

      </div>

      <div>
        {
          showTitle ? <h3 className='title-list'>New Releases</h3> : <h3 className='title-list'>Results</h3>
        }

        {
          moviesNotFound === true ? <p className='error'>We didn't find anything related</p> : ""
        }

        <div className='list'>

          {
            movies.map(movie => {
              return <div key={movie.id} className='image-container' onClick={() => handleCard(movie.id)}>
                <img src={`${URL_IMAGE + movie.poster_path}`} alt="" />

              </div>
            })
          }

        </div>
      </div>

      <div>
        <Upcoming />
      </div>

      <div>
        <People />
      </div>


      <Footer />
    </section>
  )
}

export default Home