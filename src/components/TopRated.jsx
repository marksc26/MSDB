import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styles/TopRated.css'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import { useNavigate } from 'react-router-dom'

const TopRated = () => {

    const BASE_URL = 'https://api.themoviedb.org/3'
    const API_KEY = import.meta.env.VITE_API_KEY
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'


    const [tops, setTops] = useState([])



    const fetchTopRated = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/movie/top_rated`, {
                params: {
                    api_key: API_KEY,
                    page: 1,
                    region: 'US,GB'
                }
            });

            const firstPageResults = data.results.filter(res => res.popularity > 35);

            const totalPages = data.total_pages;
            if (totalPages > 1) {
                const promises = [];


                for (let page = 2; page <= Math.min(totalPages, 65); page++) {
                    promises.push(
                        axios.get(`${BASE_URL}/movie/top_rated`, {
                            params: {
                                api_key: API_KEY,
                                page: page,
                                region: 'US,GB'
                            }
                        })
                    );
                }

                const responses = await Promise.all(promises);

                const additionalResults = responses
                    .map(response => response.data.results)
                    .flat()
                    .filter(res => res.popularity > 35);

                setTops([...firstPageResults, ...additionalResults]);
            }


        } catch (error) {
            console.log('Error fetching top rated movies:', error);
        }
    };


    useEffect(() => {
        fetchTopRated()
        window.scrollTo(0, 0)

    }, [])

    const navigate = useNavigate()

    const handleMovie = (movieId) => {
        navigate(`/movie/${movieId}`)
    }

    return (
        <section className='topContainer'>
            <Header />
            <h3>Top Rated</h3>

            <div className='topList' >
                {
                    tops.map((item, index) => (
                        <div key={index}>
                            <img onClick={() => handleMovie(item.id)} className='imgTopRated' src={`${IMAGE_PATH + item.poster_path}`} alt="" />
                        </div>
                    ))
                }

            </div>

            <Footer />

        </section>
    )
}

export default TopRated