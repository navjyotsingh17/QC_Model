import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = (props)=> {

  let location = useLocation();

  let navigate = useNavigate();

  const handelLogout = () => {
    localStorage.removeItem('authToken')
    props.showAlert("Logged out successfully", "success");
    navigate('/login')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark fixed-top" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href=" ">Addhar Masking</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Dashboard</Link>
              <Link className={`nav-link ${location.pathname === "/redaction" ? "active" : ""}`} aria-current="page" to="/redaction">Redaction</Link>
              </li>
            </ul>
            
            {!localStorage.getItem('authToken') ? <form className="d-flex">
              <Link className="btn btn-outline-primary rounded-pill mx-1" to="/login" role="button">Login</Link>
              {/* <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link> */}
            </form> : <button className='btn btn-outline-danger rounded-pill' onClick={handelLogout}>Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
