import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import '../css/BottomNavbar.css'
import { Store } from '../utilities/Store'

export default function BottomNavbar() {

  const { state } = React.useContext(Store);
  const [showNotification, setShowNotification] = useState(false)


  // eslint-disable-next-line
  useEffect(() => {
    if (state.currentUser) {
      setShowNotification(false)
      shouldNotificationShow()
    }
  })

  const shouldNotificationShow = () => {
    for (let i = 0; i < state.currentUser.matches.length; i++) {
      if (state.currentUser.matches[i].match_seen === false) {
        setShowNotification(true)
        break;
      } else if (state.currentUser.matches[i].messages !== undefined) {
        if (state.currentUser.matches[i].messages.receiver === state.currentUser.id && state.currentUser.matches[i].messages.seen === false) {
          setShowNotification(true)
          break;
        }
      }
    }
  }

  return (
    <div>
      <Navbar fixed="bottom" bg="light">
        <Nav className="navbar pr-0 pb-0">
          <NavLink className="navbar-item" activeClassName="active" to="/forum"><i className="fas fa-align-left navbar-icon"></i><p className="navbar-title">Forum</p></NavLink>
          <NavLink className="navbar-item" activeClassName="active" to="/swipe"><i className="fas fa-exchange-alt navbar-icon"></i><p className="navbar-title">Swipa</p></NavLink>
          <NavLink className="navbar-item" activeClassName="active" exact to="/"><i className="fas fa-bullseye navbar-icon"></i><p className="navbar-title" >Flöde</p></NavLink>
          <div>
            {
              showNotification ? <i className="fas fa-circle notification-dot"></i> : ''
            }
            <NavLink className="navbar-item" activeClassName="active" to="/messages"><i className="far fa-comments navbar-icon"></i><p className="navbar-title">Medd</p></NavLink>
          </div>
          <NavLink className="navbar-item" activeClassName="active" to="/myprofile"><i className="far fa-user navbar-icon"></i><p className="navbar-title">Profil</p></NavLink>
        </Nav>
      </Navbar>
    </div>
  )
}
