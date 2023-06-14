import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import './styles/MovieGenres.css'

const MovieGenres = () => {

    const BASE_URL = 'https://api.themoviedb.org/3'
    const API_KEY = import.meta.env.VITE_API_KEY
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'

    const [listMoviesGenre, setListMoviesGenre] = useState([])
    const [genre, setGenre] = useState("")

    const { id } = useParams()

    const fetchListMovieGenre = async (genreId) => {
        const { data } = await axios.get(`${BASE_URL}/discover/movie`, {
            params: {
                api_key: API_KEY,
                with_genres: genreId,
                page: 1
            }
        })

        const firstPage = data.results.filter(res => res.popularity > 20 && res.poster_path)

        const totalPages = data.total_pages

        if (totalPages > 1) {
            const promises = []
            for (let page = 2; page <= Math.min(totalPages, 25); page++) {
                promises.push(
                    axios.get(`${BASE_URL}/discover/movie`, {
                        params: {
                            api_key: API_KEY,
                            page: page,
                            with_genres: genreId
                        }
                    })
                )
            }

            const responses = await Promise.all(promises)
            const additionalMovies = responses.map(res => res.data.results).flat()
                .filter(res => res.popularity > 20 && res.poster_path)

            const merged = ([...firstPage, ...additionalMovies])
            setListMoviesGenre(merged)
        }



    }


    const fetchGenres = async (genreId) => {
        const { data } = await axios.get(`${BASE_URL}/genre/movie/list`, {
            params: {
                api_key: API_KEY
            }
        })


        data.genres.find(res => res.id === Number(genreId) ? setGenre(res.name) : "")

    }

    useEffect(() => {

        fetchListMovieGenre(id)
        window.scrollTo(0, 0)
        fetchGenres(id)

    }, [id])

    const navigate = useNavigate()

    const handleMovie = (movieId) => {
        navigate(`/movie/${movieId}`)
    }

    return (
        <section>
            <Header />
            <h3 className='titleGenre'>{genre}</h3>

            <div className='movieGenre-container'>
                {
                    listMoviesGenre.map((movie, index) => (
                        <div className='movieGenre-poster' key={index}>
                            <img onClick={() => handleMovie(movie.id)} className='movieGenre-Img' src={`${IMAGE_PATH + movie.poster_path}`} alt="" />
                        </div>
                    ))
                }
            </div>

            <Footer />
        </section>
    )
}

export default MovieGenres