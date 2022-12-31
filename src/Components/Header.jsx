import React from 'react'
import AccountIcon from './AccountIcon'
import CompareButton from './CompareButton'

function Header() {
  return (
    <div className="header">
      
        <div className="logo">
            <span>
            <img src='https://typingtestnow.com/images/social-share-thumb.png' alt='h'
            style={{width:'50px', height:'50px'}} />
            </span>
            <div>
              <CompareButton/>
            </div>
        </div>
        <div className="user-icon">
            <AccountIcon />
        </div>

    </div>
  )
}

export default Header