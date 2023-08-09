import React from 'react'
import Instagram from '../../assets/img/icons/instagram-white.svg'
import Telegram from '../../assets/img/icons/icons8-telegram-logo.svg'
import Linkedin from '../../assets/img/icons/linkedin-white.svg'

function Footer() {
  return (
    <footer>
    <div className='p-8 pb-10'>
            <div className='flex flex-col justify-center gap-4'>
              <p className='text-white'>Done by Oleg Mikhailov</p>
              <ul className='flex gap-3 justify-center'>
                <li className='w-5'><a href='https://www.instagram.com/olegmikhaylov_/'><img src={Instagram} alt='instagram'/></a></li>
                <li className='w-5'><a href='https://t.me/OlegMikhaylovErevan'><img src={Telegram} alt='telegram'/></a></li>
                <li className='w-5'><a href='https://www.linkedin.com/in/oleg-mikhaylov-/'><img src={Linkedin} alt='linkedin'/></a></li>
              </ul>
            </div>
            <div></div>
            
    </div>
  </footer>
  )
}

export default Footer