import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './styles/People.css'
import { useNavigate } from 'react-router-dom'


const People = () => {

  const [actors, setActors] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchKey, setSearchKey] = useState("")


  const BASE_URL = 'https://api.themoviedb.org/3'
  const API_KEY = import.meta.env.VITE_API_KEY
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'


  const fetchActors = async () => {
    const { data: { results } } = await axios.get(`${BASE_URL}/person/popular`, {
      params: {
        api_key: API_KEY,
        page: currentPage,
      }
    })
    setActors(results.filter(actor => actor.profile_path))


  }

  const fetchActor = async () => {
    const { data: { results } } = await axios.get(`${BASE_URL}/search/person`, {
      params: {
        api_key: API_KEY,
        page: currentPage,
        query: searchKey,


      }
    })

    setActors(results.filter(actor => actor.profile_path))
  }

  useEffect(() => {
    fetchActors()

  }, [currentPage])



  const loadMoreActors = () => {
    setCurrentPage(prevPage => prevPage + 1)
  }

  const searchActors = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    if (searchKey) {
      fetchActor(searchKey)
    } else {
      fetchActors()
    }


  }

  const navigate = useNavigate()

  const handleCelebrity = (actorId) => {
    navigate(`/actor/${actorId}`)
  }



  return (
    <section className='actors-container'>
      <div>
        <h2 className='title-actors'>Celebrities</h2>
      </div>
      <div className='buttons'>

        <form onSubmit={searchActors}>
          <div className='form-container'>
            <input onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder='Search a celebrity' />
            <button><i className='bx bx-search'></i></button>
          </div>

        </form>
        <button className='button-load' onClick={loadMoreActors}>Load more</button>
      </div>

      <div className='listActors'>
        {
          actors.map((actor, index) => (
            <div className='image-name' key={index}>
              {
                actor.profile_path ? <div> <img onClick={() => handleCelebrity(actor.id)} className='actors' src={`${IMAGE_PATH + actor.profile_path}`} alt="" />
                  <h3>{actor.name}</h3></div>
                  : null
              }

            </div>
          ))
        }

      </div>



    </section>
  )
}

export default People