import React from 'react'
import useTheme from '../../../hooks/useTheme'

import './Loader.scss'

const Loader = ({ theme = 'light' }) => {

  return (
    <div className={`loader-container ${theme === 'light' ? 'light-theme-loader' : ''}`} >
        <div className='loader' />
    </div>
  )
}

export default Loader