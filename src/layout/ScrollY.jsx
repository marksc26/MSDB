import React from 'react'
import './styles/ScrollY.css'
import { useSelector } from 'react-redux'

const ScrollY = () => {


    const handleScrollY = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    const scroll = useSelector(state => state.scroll)
    const menu = useSelector(state => state.menu)


    return (
        <div className={scroll > 2500 && !menu ? "scrollContainer" : "hide"}>
            <div className='buttonScroll' onClick={handleScrollY}>
                <i className='bx bx-up-arrow'></i>
                <p>Back to top</p>
            </div>
        </div>
    )
}

export default ScrollY