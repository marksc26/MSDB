import React, { useEffect, useState } from 'react'
import './styles/TvSeries.css'
import axios from 'axios'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ScrollY from '../layout/ScrollY'
import { setScrollGlobal } from '../store/slices/scroll.slice'

const TvSeries = () => {


    const BASE_URL = 'https://api.themoviedb.org/3'
    const API_KEY = import.meta.env.VITE_API_KEY
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'

    const [tvseries, setTvseries] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [seriesNotFound, setSeriesNotFound] = useState(false);

    const fetchTvSeries = async () => {
        const { data } = await axios.get(`${BASE_URL}/tv/top_rated`, {
            params: {
                api_key: API_KEY,
                page: 1
            }
        })

        const firstPage = (data.results.filter(res => res.popularity > 20))

        const totalPages = data.total_pages

        if (totalPages > 1) {
            const promises = []

            for (let page = 2; page <= Math.min(totalPages, 20); page++) {
                promises.push(
                    axios.get(`${BASE_URL}/tv/top_rated`, {
                        params: {
                            api_key: API_KEY,
                            page: page
                        }
                    })

                )

            }

            const responses = await Promise.all(promises)
            const aditionalTvSeries = responses.map(res => res.data.results)
                .flat().filter(res => res.popularity > 20)

            setTvseries([...firstPage, ...aditionalTvSeries])

        }

    }



    const fetchSearchSerie = async () => {
        const { data: { results } } = await axios.get(`${BASE_URL}/search/tv`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        })

        if (results.length === 0) {
            setSeriesNotFound(true)
        } else {
            setSeriesNotFound(false)
            setTvseries(results.filter(res => res.poster_path))
        }
        setTvseries(results.filter(res => res.poster_path))
    }


    useEffect(() => {
        fetchTvSeries()
        window.scrollTo(0, 0)
    }, [])


    const dispatch = useDispatch()
    useEffect(() => {

        function handleScroll() {
            dispatch(setScrollGlobal(window.scrollY))
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }


    }, [])


    const searchSeries = (e) => {
        e.preventDefault()
        if (searchKey) {
            fetchSearchSerie(searchKey)
        } else {
            fetchTvSeries()
            setSeriesNotFound(false)
        }

    }

    const navigate = useNavigate()
    const handleSerie = (serieId) => {
        navigate(`/serie/${serieId}`)
    }




    return (
        <section className='tvseries'>

            <Header />

            <div className='input-container'>
                <form onSubmit={searchSeries}>
                    <div className='input-search'>
                        <input type="text" onChange={(e) =>
                            setSearchKey(e.target.value)}
                            placeholder='Search a tv serie' />
                        <button><i className='bx bx-search'></i></button>
                    </div>
                </form>
            </div>


            <h3 className='seriesTitle'>Tv Series</h3>

            {
                seriesNotFound === true ? <p className='error'>We didn't find anything related</p> : ""
            }
            <div className='seriesContainer'>
                {
                    tvseries.map((serie, index) => (
                        <div className='imgCont' key={index}>
                            <img className='serieImg'
                                src={`${IMAGE_PATH + serie.poster_path}`} alt=""
                                onClick={() => handleSerie(serie.id)}
                            />
                        </div>
                    ))
                }
            </div>


            <ScrollY />


            <Footer />

        </section>
    )
}

export default TvSeries