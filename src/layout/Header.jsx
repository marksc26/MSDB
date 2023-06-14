import React, { useState, useEffect } from 'react'
import './styles/Header.css'
import logo from '../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setMenuGlobal } from '../store/slices/menu.slice'

const Header = () => {

    const BASE_URL = 'https://api.themoviedb.org/3'
    const API_KEY = import.meta.env.VITE_API_KEY
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'

    const [genres, setGenres] = useState([])
    const [menuMovieGenres, setMenuMovieGenres] = useState(false)
    const [menuSerieGenres, setMenuSerieGenres] = useState(false)
    const [genresSeries, setGenresSeries] = useState([])

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const menu = useSelector(state => state.menu)

    const handleLogo = () => {
        navigate('/')
    }

    const handleMenu = () => {
        dispatch(setMenuGlobal(!menu))
        setMenuMovieGenres(false)
        setMenuSerieGenres(false)

    }

    const handleMenuMoviesGenres = () => {
        setMenuMovieGenres(!menuMovieGenres)
        setMenuSerieGenres(false)

    }

    const handleMenuSeriesGenres = () => {
        setMenuSerieGenres(!menuSerieGenres)
        setMenuMovieGenres(false)

    }





    const fetchMovieGenres = async () => {
        const { data } = await axios.get(`${BASE_URL}/genre/movie/list`, {
            params: {
                api_key: API_KEY
            }
        })
        setGenres(data.genres)


    }

    const fetchSerieGenres = async () => {
        const { data } = await axios.get(`${BASE_URL}/genre/tv/list`, {
            params: {
                api_key: API_KEY
            }
        })

        setGenresSeries(data.genres)


    }


    useEffect(() => {
        fetchMovieGenres()
        fetchSerieGenres()
    }, [])



    const handleMovieGenre = (genreId) => {
        navigate(`/moviegenre/${genreId}`)
        setMenuMovieGenres(false)
        setMenuSerieGenres(false)
        dispatch(setMenuGlobal(false))
    }

    const handleSeriesGenre = (genreId) => {
        navigate(`/seriegenre/${genreId}`)
        setMenuMovieGenres(false)
        setMenuSerieGenres(false)
        dispatch(setMenuGlobal(false))
    }

    const closeMenu = () => {
        dispatch(setMenuGlobal(false))
    }

    const handleHome = () => {
        navigate("/")
        dispatch(setMenuGlobal(false))
    }


    return (
        <header className='header'>
            <div className='logo-container'>
                <img className='logo' src={logo} alt="" onClick={handleLogo} />
            </div>

            <div className='menu-container'>
                {
                    !menu ? <i onClick={handleMenu} className='bx bx-menu-alt-right'></i> : <i onClick={handleMenu} className='bx bx-x'></i>
                }

            </div>
            <div className={!menu ? "navbar-container" : "show-menu"}>
                <ul className='navlist'>
                    <li onClick={handleHome}>Home</li>
                    <Link className='link' to='/top_rated'><li onClick={closeMenu}>Top Rated</li></Link>
                    <Link className='link' to='/tvseries'><li onClick={closeMenu}>Tv Series</li></Link>
                    <li onClick={handleMenuMoviesGenres}>Movie Genres</li>
                    <li onClick={handleMenuSeriesGenres}>Serie Genres</li>

                </ul>

            </div>

            <div className={!menuMovieGenres ? "genres-container" : "show-genres"}>
                {
                    genres.map(genre => (
                        <div className='genre' key={genre.id} onClick={() => handleMovieGenre(genre.id)}>
                            <h3 className='genre-name'>{genre.name}</h3>
                        </div>
                    ))
                }
            </div>

            <div className={!menuSerieGenres ? "genres-container" : "show-genres"}>
                {
                    genresSeries.map(genre => (
                        <div className='genre' key={genre.id} onClick={() => handleSeriesGenre(genre.id)}>
                            <h3 className='genre-name'>{genre.name}</h3>
                        </div>
                    ))
                }

            </div>

        </header >
    )
}

export default Header