import React, { useEffect, useState } from 'react'
import './pagehero.css'
import { useLocation } from 'react-router-dom'

const PageHero = ({bgimg,pageName}) => {
  const [location, setLocation] = useState({})
  const curLocation = useLocation()

  useEffect(() => {
    setLocation(curLocation)
  }, [curLocation])
  return (
    <section id="page-hero-container">
      <div id="page-hero-background">
        <img src={bgimg} alt={bgimg}  id="page-hero-background-img" />
      </div>
      <div id="page-hero-content">
        <div id="page-hero-content-section1">
            <div id="page-hero-text">
            <span className="page-hero-main-text" id="page-hero-main-text-name">/{String(location.pathname).split("/").pop()}</span>
            </div>
        </div>
      </div>
    </section>
  )
}

export default PageHero
