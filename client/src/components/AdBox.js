import React from 'react'
import Slider from 'react-slick'

const AdImage = ({ path, link, alt }) => (
  <div className='ad-container'>
    <a
      href={`//${link}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <img className='ad' src={path} alt={alt} />
    </a>
  </div>
)

const AdBox = () => (
  <div className='adbox'>
    <Slider
      autoplay
      autoplaySpeed={5000}
      speed={1800}
      slidesToShow={2}
      pauseOnHover
      dots
      arrows={false}
      centerMode
      centerPadding='10px'
    >
      <AdImage
        path='/media/demo2.png'
        link='www.jaynakisa.fi'
        alt='Demo 2'
      />

      <AdImage
        path='/media/demo1.png'
        link='www.jaynakisa.fi'
        alt='Demo 1'
      />

      <AdImage
        path='/media/pseura.png'
        link='www.jaynakisa.fi'
        alt='PerinneSeura'
      />
    </Slider>
  </div>
)

export default AdBox
