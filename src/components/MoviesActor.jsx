import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './styles/MoviesActor.css'

const MoviesActor = () => {

  const BASE_URL = 'https://api.themoviedb.org/3'
  const API_KEY = import.meta.env.VITE_API_KEY
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'

  const [gallery, setGallery] = useState([])

  const { id } = useParams()

  const fetchMoviesActor = async (personId) => {
    const { data: { cast } } = await axios.get(`${BASE_URL}/person/${personId}/movie_credits`, {
      params: {
        api_key: API_KEY
      }
    })
    setGallery(cast.filter(cast => cast.poster_path && cast.popularity > 8))
    console.log(cast)
  }

  useEffect(() => {
    fetchMoviesActor(id)
  }, [id])


  const navigate = useNavigate()

  const handleMovieActor = (movieId) => {
    navigate(`/movie/${movieId}`)
  }

  return (
    <section className='movies-act-container'>

      {
        gallery?.map((item, index) => (
          <div className='movies-actor-div' onClick={() => handleMovieActor(item.id)} key={index}>
            <img className='img-movies-actor' src={`${IMAGE_PATH + item.poster_path}`} alt="" />
          </div>
        ))
      }

    </section>
  )
}

export default MoviesActor