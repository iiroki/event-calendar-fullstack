import React from 'react'
import Slider from 'react-slick'

const AdBox = () => (
  <div className='adbox'>
    <Slider
      infinite
      autoplay
      autoplaySpeed={3000}
      speed={1000}
      pauseOnHover
      slidesToShow={3}
      dots
      arrows={false}
      centerMode
    >
      <div>
        1
      </div>
      <div>
        2
      </div>
      <div>
        3
      </div>
      <div>
        4
      </div>
      <div>
        5
      </div>
    </Slider>
  </div>
)

export default AdBox
