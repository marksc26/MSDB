import React, { useEffect, useState } from 'react'
import './styles/SimilarMovies.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const SimilarMovies = () => {

    const BASE_URL = 'https://api.themoviedb.org/3'
    const API_KEY = import.meta.env.VITE_API_KEY
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'

    const [similars, setSimilars] = useState([])
    const [showSimilars, setShowSimilars] = useState(true)

    const { id } = useParams()

    const fetchSimilarMovies = async (movieId) => {

        const { data: { results } } = await axios.get(`${BASE_URL}/movie/${movieId}/recommendations`, {
            params: {
                api_key: API_KEY
            }
        })

        setSimilars(results.filter(res => res.poster_path && res.popularity > 10))


    }

    useEffect(() => {
        fetchSimilarMovies(id)
        window.scrollTo(0, 0)
        setTimeout(() => {
            setShowSimilars(false)
        }, 1200)
    }, [id])



    const navigate = useNavigate()

    const handleMovie = (movieId) => {
        navigate(`/movie/${movieId}`)
    }



    return (
        <section >

            {
                showSimilars ? "" : (
                    <>
                        <h3 className={similars.length === 0 ? "" : "recommendations"}>Recommendations</h3>

                        <div className='similar-container'>
                            {
                                similars.map((similar, index) => (
                                    <div onClick={() => handleMovie(similar.id)} className='poster-sim-cont' key={index}>
                                        <img src={`${IMAGE_PATH + similar.poster_path}`} alt="" />
                                    </div>
                                ))
                            }
                        </div>

                    </>)

            }




        </section>
    )
}

export default SimilarMovies