import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Header from '../layout/Header'
import './styles/CelebrityCard.css'
import Footer from '../layout/Footer'
import MoviesActor from '../components/MoviesActor'

const CelebrityCard = () => {


    const BASE_URL = 'https://api.themoviedb.org/3'
    const API_KEY = import.meta.env.VITE_API_KEY
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'

    const [celebrity, setCelebrity] = useState([])

    const { id } = useParams()

    const fetchCelebrity = async (personId) => {
        const { data } = await axios.get(`${BASE_URL}/person/${personId}`, {
            params: {
                api_key: API_KEY,

            }
        })
        setCelebrity(data)
        console.log(data)
    }

    useEffect(() => {
        fetchCelebrity(id)
        window.scrollTo(0, 0)
    }, [id])

    return (
        <section>
            <Header />
            <div className='profile'>

                <div>
                    <img className='celebrityImg' src={`${IMAGE_PATH + celebrity.profile_path}`} alt="" />
                </div>
                <div>
                    <h3 className='celebrityName'>{celebrity.name}</h3>
                    <p className='biography'>{celebrity.biography}</p>
                    <p className='placeB'>Place of Birth: <span>{celebrity.place_of_birth}</span></p>
                    <p className='birthday'>Birthday: <span>{celebrity.birthday}</span></p>
                    {
                        celebrity.deathday === null ? "" : <p className='deathday'>Deathday: <span>{celebrity.deathday}</span></p>
                    }

                </div>
            </div>

            <MoviesActor />

            <Footer />
        </section>
    )
}

export default CelebrityCard