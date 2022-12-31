import React from 'react'
import AccountIcon from './AccountIcon'

function Header() {
  return (
    <div className="header">
        <div className="logo">
            <img src='https://typingtestnow.com/images/social-share-thumb.png' alt='h'
            style={{width:'50px', height:'50px'}} />
        </div>
        <div className="user-icon">
            <AccountIcon />
        </div>

    </div>
  )
}

export default Header