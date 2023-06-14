import React from 'react'
import './styles/Loader.css'
import logoLoader from '../assets/images/logo.png'

export const Loader = () => {
  return (
    <section className='loaderContainer'>
      <div className='loader'>
        <img src={logoLoader} alt="" />
      </div>
    </section>
  )
}
