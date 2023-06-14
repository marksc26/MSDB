import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styles/Upcoming.css'
import { useNavigate } from 'react-router-dom'


//import '../../node_modules/slick-carousel/slick/slick-theme.css'
//import '../../node_modules/slick-carousel/slick/slick.css'
import Slider from 'react-slick';
import moment from 'moment/moment';



const Upcoming = () => {

  const BASE_URL = 'https://api.themoviedb.org/3'
  const API_KEY = import.meta.env.VITE_API_KEY
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original'

  const [upMovies, setUpMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [value, setValue] = useState(0)



  const fetchUpcomingMovie = async () => {

    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 100);

    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    const formattedFutureDate = futureDate.toISOString().split('T')[0];

    const { data: { results } } = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: {
        api_key: API_KEY,
        page: currentPage,
        'primary_release_date.gte': formattedCurrentDate,
        'primary_release_date.lte': formattedFutureDate,

      }
    })

    setUpMovies(results.filter(res => res.poster_path && res.popularity > 18))

  }

  useEffect(() => {
    fetchUpcomingMovie()

  }, [])

  const navigate = useNavigate()

  const handleMovie = (movieId) => {
    navigate(`/movie/${movieId}`)
  }

  const PrevArrow = ({ onClick }) => {
    return (
      <div className='arrow prev' onClick={onClick}>
        <i className='bx bx-left-arrow'></i>
      </div>
    )
  }

  const NextArrow = ({ onClick }) => {
    return (
      <div className='arrow next' onClick={onClick}>
        <i className='bx bx-right-arrow'></i>
      </div>
    )
  }

  const settings = {
    lazyload: true,
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 5,
    speed: 800,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setValue(next),
    responsive: [
      {
        breakpoint: 1069,
        settings: {
          slidesToShow: 3,

        }
      }
    ]

  }


  return (


    <section className='upcoming'>


      <h3 className='titleUp'>Upcoming</h3>

      <Slider {...settings}>

        {
          upMovies.map((item, index) => (
            <div className={index === value ? 'slide activeSlide' : "slide"} key={index}>
              <img onClick={() => handleMovie(item.id)}
                className='imgUpcoming'
                src={`${URL_IMAGE + item.poster_path}`} alt="" />
            </div>
          ))
        }

      </Slider>

      <div className='infoUp'>
        <h3>{upMovies[value]?.title}</h3>
        <p>{moment(upMovies[value]?.release_date).format('MMM DD, YYYY')}</p>
      </div>


    </section >
  )
}

export default Upcoming