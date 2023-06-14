import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './styles/SimilarSeries.css'

const SimilarSeries = () => {

    const BASE_URL = 'https://api.themoviedb.org/3'
    const API_KEY = import.meta.env.VITE_API_KEY
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'

    const [similarTv, setSimilarTv] = useState([])
    const [showSimilars, setShowSimilars] = useState(true)

    const { id } = useParams()

    const fetchSimilarSeries = async (seriesId) => {

        const { data: { results } } = await axios.get(`${BASE_URL}/tv/${seriesId}/recommendations`, {
            params: {
                api_key: API_KEY
            }
        })

        setSimilarTv(results)

    }

    useEffect(() => {
        fetchSimilarSeries(id)
        window.scrollTo(0, 0)
        setTimeout(() => {
            setShowSimilars(false)
        }, 1200)
    }, [id])

    const navigate = useNavigate()

    const handleSerie = (serieId) => {
        navigate(`/serie/${serieId}`)
    }

    return (
        <section className='similarSeries-Section'>


            {
                showSimilars ? "" : (
                    <div>
                        <h3 className={similarTv.length === 0 ? "" : "recommendations"}>Recommendations</h3>
                        <div className='similarSeries-container'>
                            {
                                similarTv.map(similar => (
                                    <div className='poster-sim-cont' key={similar.id}>
                                        <img onClick={() => handleSerie(similar.id)} className='similarSeries-img' src={`${IMAGE_PATH + similar.poster_path}`} alt="" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                )
            }


        </section>
    )
}

export default SimilarSeries