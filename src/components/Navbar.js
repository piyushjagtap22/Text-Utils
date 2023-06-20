import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


export default function Navbar(props) {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/Text-Utils">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/Text-Utils">Home</Link>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="/About">About</a>
            </li> */}
          </ul>
          <div className="d-flex">
            <div className="bg-primary rounded mx-2" style={{ height: '30px', width: '30px', cursor: 'pointer' }} onClick={() => { props.toggleMode('primary') }} />
            <div className="bg-danger rounded mx-2" style={{ height: '30px', width: '30px', cursor: 'pointer' }} onClick={() => { props.toggleMode('danger') }} />
            <div className="bg-success rounded mx-2" style={{ height: '30px', width: '30px', cursor: 'pointer' }} onClick={() => { props.toggleMode('success') }} />
            <div className="bg-warning rounded mx-2" style={{ height: '30px', width: '30px', cursor: 'pointer' }} onClick={() => { props.toggleMode('warning') }} />
            <div className="bg-info rounded mx-2" style={{ height: '30px', width: '30px', cursor: 'pointer' }} onClick={() => { props.toggleMode('info') }} />

          </div>
          <div className={`mx-2 form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
            <input type="checkbox" className="form-check-input" id="customSwitch1" onClick={() => { props.toggleMode(props.mode === 'light' ? 'dark' : 'light') }} />
            <label className="form-check-label" for="customSwitch1">Dark Mode</label>
          </div>


        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  title: PropTypes.string,
}

Navbar.defaultProps = {
  title: 'Set Title here'
}