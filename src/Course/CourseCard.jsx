import React from 'react';
import { Link } from 'react-router-dom';
import Gravatar from '../UI/Gravatar';

export default function CourseCard({ course }) {
  return (
    <div className="col-sm-6 col-md-3">
      <div className="jk-course-card">
        <img src="https://www.techaltum.com/img/web-developent.jpg" />       
        <div className="jk-course-card__flex">  
          <h3>{course.name}</h3>
          <div style={{ flex: 1 }}>
            <div className="jk-course-card__button-group">
              <Link to={`/courses/${course.id}`} className="btn btn-default">
                Details
              </Link>
            </div>
          </div>
        </div>
        <div className="jk-course-card__flex"> 
          <Gravatar email="ktei2008@gmail.com" size={40} />
          <div className="jk-course-card__name">
            <div>Lecturer : Philip Robin</div>
          </div>
        </div>
        <div className="jk-course-card__font">
          <div>Enddate : {course.end_at}</div>
          <div>Startdate : {course.start_at}</div>
        </div>       
      </div>
    </div>
  );
}