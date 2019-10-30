import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

export default function BottomNavbar() {

  return (
    <div>
      <Navbar fixed="bottom" bg="light">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="m-auto">
            <Nav.Link as={Link} to="/">Feed</Nav.Link>
            <Nav.Link as={Link} to="/forum">Forum</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            <Nav.Link as={Link} to="/swipe">Swipe</Nav.Link>
            <Nav.Link as={Link} to="/messages">Mess</Nav.Link>
          </Nav>
      </Navbar>
    </div>
  )
}
