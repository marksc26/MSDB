import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import './styles/MovieCard.css'
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import SimilarMovies from '../components/SimilarMovies'
import Youtube from 'react-youtube'
import moment from "moment"
import black from '../assets/images/black.jpg'



const MovieCard = () => {

  const BASE_URL = 'https://api.themoviedb.org/3'
  const API_KEY = import.meta.env.VITE_API_KEY
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'


  const [movie, setMovie] = useState([])
  const [trailer, setTrailer] = useState(null)
  const [showVideo, setShowVideo] = useState(false)
  const [providers, setProviders] = useState([])
  const [info, setInfo] = useState(true)
  const [cast, setCast] = useState([])
  const [showCast, setShowCast] = useState(true)
  const [alert, setAlert] = useState("")


  //! Este Effect funciona para cuando accede a otra ruta 
  //!la posición del scroll en Home no afecta y lo lleva al inicio de cada página

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  const { id } = useParams()


  //!Función asincrona para traer el trailer de cada pelicula con el parametro movie.id
  const fetchMovie = async (movieId) => {

    const { data } = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos"
      }
    })

    setTrailer(data.videos.results.find(video => video.name === 'Official Trailer')
      || data.videos.results.find(video => video.type === 'Trailer'))
    setMovie(data)






  }

  //!Función asincrona para traer a los provedores de streaming con el movie.id

  const fetchProvider = async (movieId) => {
    const { data: { results } } = await axios.get(`${BASE_URL}/movie/${movieId}/watch/providers`, {
      params: {
        api_key: API_KEY
      }
    })


    setProviders(results.MX.flatrate)


  }


  const fetchMovieCredits = async (movieId) => {
    const { data } = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: API_KEY
      }
    })
    setCast(data.cast.filter(res => res.popularity > 10))

  }


  useEffect(() => {
    fetchMovie(id)
    fetchProvider(id)
    fetchMovieCredits(id)
    setTimeout(() => {
      setInfo(false)
      setShowCast(false)
    }, 1000)

  }, [id])



  const handleButtonTrailer = () => {
    if (trailer) {
      setShowVideo(true)
      window.scrollTo(0, 0)

    } else {
      window.alert("We're sorry, trailer not available.")
    }


  }

  const handleClose = () => {
    setShowVideo(false)
  }

  const navigate = useNavigate()
  const handleActor = (actorId) => {
    navigate(`/actor/${actorId}`)
  }





  return (
    <section>
      <Header />


      <div className="imageContainer">
        {
          movie.backdrop_path ? (

            <img className="image-background" src={`${IMAGE_PATH}${movie.backdrop_path}`} alt="" />
          ) : (<img className='background' src={black} />)
        }
        <div className="overlay"></div>
        {
          info ? "" : (
            <div className={movie.backdrop_path ? "info" : "backgroundBlack"}>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <div className="release-runtime">
                <p>{moment(String(movie.release_date)).format('MMM DD, YYYY')}</p>
                <p>{movie.runtime} minutes</p>
                <p className="average"><i className='bx bxs-star'></i>
                  <span>{movie.vote_average ? Number(movie.vote_average).toFixed(1) : null}</span>/10</p>
              </div>
              <div className="genres">
                {
                  movie.genres && movie.genres.map((genre) => (
                    <p className="gen" key={genre.id}>{genre.name}</p>
                  ))
                }




              </div>

              <div className="provider-container">
                {
                  providers?.map(logo => (
                    <div key={logo.provider_id} className="logoProvider">
                      <img src={`${IMAGE_PATH + logo.logo_path}`} alt="" />
                    </div>
                  ))
                }

              </div>

              <div className="buttonTrailer">
                <button onClick={handleButtonTrailer}>Play Trailer</button>
              </div>

            </div>

          )
        }


        <div className="production-container">
          <img className="production"
            src={`${IMAGE_PATH}${movie.production_companies && movie.production_companies[0]?.logo_path}`} alt="" />
        </div>

        {
          showVideo && trailer && (

            <>
              <div className="videoContainer">
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
            </>

          )
        }



      </div>



      <SimilarMovies />

      {
        showCast ? "" : (
          <div className="cast-section">

            <h3 className={cast.length === 0 ? "" : "cast"}>Cast</h3>
            <div className="cast-container">
              {
                cast.map(cast => (
                  <div className="cast-div" key={cast.id}>
                    <h3 onClick={() => handleActor(cast.id)} className="cast-name">{cast.name}</h3>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }


      <Footer />
    </section>
  )
}

export default MovieCard