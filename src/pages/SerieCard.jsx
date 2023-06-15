import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../layout/Footer'
import './styles/SerieCard.css'
import Header from '../layout/Header'
import Youtube from 'react-youtube'
import SimilarSeries from '../components/SimilarSeries'



const SerieCard = () => {

    const BASE_URL = 'https://api.themoviedb.org/3'
    const API_KEY = import.meta.env.VITE_API_KEY
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'

    const [serie, setSerie] = useState([])
    const [trailer, setTrailer] = useState(null)
    const [showVideo, setShowVideo] = useState(false)
    const [providers, setProviders] = useState([])
    const [info, setInfo] = useState(true)

    const { id } = useParams()

    const fetchSerieCard = async (serieId) => {

        const { data } = await axios.get(`${BASE_URL}/tv/${serieId}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos"
            }
        })

        setSerie(data)
        setTrailer(data.videos.results.find(vid => vid.type === "Trailer" || vid.name === "Official Trailer"))

    }


    useEffect(() => {
        fetchSerieCard(id)
        fetchSerieProvider(id)
        window.scrollTo(0, 0)
        setTimeout(() => {
            setInfo(false)
        }, 800)
    }, [id])


    const fetchSerieProvider = async (serieId) => {
        const { data: { results } } = await axios.get(`${BASE_URL}/tv/${serieId}/watch/providers`, {
            params: {
                api_key: API_KEY
            }
        })
        setProviders(results.MX?.flatrate)

    }


    const first = String(serie.first_air_date).slice(0, 4)
    const last = String(serie.last_air_date).slice(0, 4)


    const handleButtonTrailer = () => {
        if (trailer) {
            setShowVideo(true)
            window.scrollTo(0, 0)
        } else {
            alert("We're sorry, trailer not available.")

        }

    }

    const handleClose = () => {
        setShowVideo(false)
    }

    return (
        <section>
            <Header />
            <div className='imageContainer'>
                {
                    serie.backdrop_path && (
                        <img className='image-background' src={`${IMAGE_PATH}${serie.backdrop_path}`} alt="" />
                    )
                }
                <div className="overlay"></div>
                {
                    info ? "" : (
                        <div className={serie.backdrop_path ? "info" : "backgroundBlack"}>
                            <h2>{serie.name}</h2>
                            <p>{serie.overview}</p>
                            <div className='release-runtime'>
                                {
                                    first === last || serie.status === "Returning Series" ?
                                        <p>{String(serie.first_air_date).slice(0, 4)}</p>
                                        : <p>{`${String(serie.first_air_date).slice(0, 4)}-${String(serie.last_air_date).slice(0, 4)}`}</p>
                                }

                                <p>{serie.number_of_seasons}  Seasons</p>


                                <div>
                                    <p className='average'>
                                        <i className='bx bxs-star'></i>
                                        <span>{Number(serie.vote_average).toFixed(1)}/10</span></p>
                                </div>

                            </div>
                            <div className='genres'>
                                {
                                    serie.genres && serie.genres.map(genre => (
                                        <p className='gen' key={genre.id}>{genre.name}</p>
                                    ))
                                }

                            </div>

                            <div className="provider-container">

                                {
                                    providers?.map(provider => (
                                        <div key={provider.provider_id} className='logoProvider'>
                                            <img src={`${IMAGE_PATH + provider.logo_path}`} alt="" />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='buttonTrailer'>
                                <button onClick={handleButtonTrailer}>Play Trailer</button>
                            </div>


                        </div>
                    )
                }




                <div className='production-container'>
                    <img className='production'
                        src={`${IMAGE_PATH}${serie.production_companies &&
                            serie.production_companies[0]?.logo_path}`} alt="" />
                </div>
                {
                    showVideo && trailer && (
                        <div className='videoContainer'>
                            <div className="buttonClose">
                                <i onClick={handleClose} className='bx bx-x'></i>
                            </div>
                            <Youtube
                                videoId={trailer.key}
                                opts={{
                                    playerVars: {
                                        autoplay: 1,
                                        controls: 0,
                                        cc_load_policy: 0,
                                        fs: 0,
                                        iv_load_policy: 0,
                                        modestbranding: 0,
                                        rel: 0,
                                        showinfo: 0,
                                    },
                                }}

                            />

                        </div>
                    )
                }




            </div>

            <SimilarSeries />

            <Footer />

        </section>
    )
}

export default SerieCard