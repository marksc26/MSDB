import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import './styles/SerieGenres.css'

const SerieGenres = () => {

    const BASE_URL = 'https://api.themoviedb.org/3'
    const API_KEY = import.meta.env.VITE_API_KEY
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'

    const [listSeriesGenre, setListSeriesGenre] = useState([])
    const [genre, setGenre] = useState("")

    const { id } = useParams()

    const fetchListSerieGenre = async (serieId) => {
        const { data } = await axios.get(`${BASE_URL}/discover/tv`, {
            params: {
                api_key: API_KEY,
                with_genres: serieId,
                page: 1,

            }
        })

        const firstPage = data.results.filter(res => res.popularity > 50 && res.poster_path)
        const totalPages = data.total_pages

        if (totalPages > 1) {
            const promises = []
            for (let page = 2; page <= Math.min(totalPages, 25); page++) {
                promises.push(
                    axios.get(`${BASE_URL}/discover/tv`, {
                        params: {
                            api_key: API_KEY,
                            with_genres: serieId,
                            page: page,


                        }
                    })
                )
            }

            const responses = await Promise.all(promises)
            const additionalMovies = responses.map(res => res.data.results).flat()
                .filter(res => res.popularity > 50 && res.poster_path)

            setListSeriesGenre([...firstPage, ...additionalMovies])
        }

    }

    const fetchNameGenre = async (genreId) => {
        const { data } = await axios.get(`${BASE_URL}/genre/tv/list`, {
            params: {
                api_key: API_KEY,


            }
        })
        data.genres.find(res => res.id === Number(genreId) ? setGenre(res.name) : "")

    }

    useEffect(() => {
        fetchListSerieGenre(id)
        fetchNameGenre(id)
        window.scrollTo(0, 0)
    }, [id])

    const navigate = useNavigate()

    const handleSerie = (serieId) => {
        navigate(`/serie/${serieId}`)
    }


    return (
        <section>

            <Header />

            <h3 className='titleGenre'>{genre}</h3>

            <div className='serieGenre-container'>
                {
                    listSeriesGenre.map(serie => (
                        <div className='serie-genre' key={serie.id}>
                            <img onClick={() => handleSerie(serie.id)} className='serieGenre-Img' src={`${IMAGE_PATH + serie.poster_path}`} alt="" />
                        </div>
                    ))
                }
            </div>

            <Footer />

        </section>
    )
}

export default SerieGenres