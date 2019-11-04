import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import '../css/BottomNavbar.css'

export default function BottomNavbar() {

  return (
    <div>
      <Navbar fixed="bottom" bg="light">
        <Nav className="navbar pr-0 pb-0">
          <NavLink className="navbar-item" activeClassName="active" to="/forum"><i className="fas fa-align-left navbar-icon"></i><p className="navbar-title">Forum</p></NavLink>
          <NavLink className="navbar-item" activeClassName="active" to="/swipe"><i className="fas fa-exchange-alt navbar-icon"></i><p className="navbar-title">Swipa</p></NavLink>
          <NavLink className="navbar-item" activeClassName="active" exact to="/"><i className="fas fa-bullseye navbar-icon"></i><p className="navbar-title" >Flöde</p></NavLink>
          <NavLink className="navbar-item" activeClassName="active" to="/messages"><i className="far fa-comments navbar-icon"></i><p className="navbar-title">Medd</p></NavLink>
          <NavLink className="navbar-item" activeClassName="active" to="/myprofile"><i className="far fa-user navbar-icon"></i><p className="navbar-title">Profil</p></NavLink>
        </Nav>
      </Navbar>
    </div>
  )
}
