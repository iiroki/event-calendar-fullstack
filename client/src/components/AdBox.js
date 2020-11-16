import React from 'react'
import Slider from 'react-slick'

const AdImage = ({ path, link, alt}) => (
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
      slidesToShow={3}
      pauseOnHover
      dots
      arrows={false}
      centerMode
      centerPadding='10px'
    >
      <AdImage
        path='/ads/ad_tek.png'
        link='www.tek.fi'
        alt='Tekniikan Akateemiset'
      />

      <AdImage
        path='/ads/ad_kattosauna.png'
        link='kattosauna.fi'
        alt='Hämpin Kattosauna'
      />

      <AdImage
        path='/ads/ad_tk.png'
        link='tekniikankutsu.com'
        alt='Tekniikan Kutsu'
      />

      <AdImage
        path='/ads/ad_np.png'
        link='nokianpanimo.fi'
        alt='Nokian Panimo'
      />
    </Slider>
  </div>
)

export default AdBox
