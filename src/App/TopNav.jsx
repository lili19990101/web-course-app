import React from 'react';
import { Link } from 'react-router-dom';

export default function TopNav() {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top jr-top-nav">
      <div className="container">
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/">Courses</Link>
            </li>
            <li>
              <Link to="/students">Students</Link>
            </li>
            <li>
              <Link to="/lecturers">Lecturers</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}