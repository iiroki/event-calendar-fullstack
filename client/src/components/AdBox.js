import React from 'react'
import Slider from 'react-slick'

const AdBox = () => (
  <div className='adbox'>
    <Slider
      infinite
      autoplay
      autoplaySpeed={3000}
      pauseOnHover
      slidesPerRow={2}
      dots
      arrows={false}
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
