import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import CourseCard from './CourseCard';
import DetailsCard from '../UI/DetailsCard';

export default class CoursesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: false,
      courses: [],
    };
  }

  componentDidMount() {
    this.loadCourses();
  }

  loadCourses() {
    this.setState({ isLoading: true });
    axios.get('/api/courses').then((response) => {
      this.setState({ courses: response.data, isLoading: false });
    });
  }

  render() {
    return (
      <div>
        <DetailsCard>
          <DetailsCard.Header>
            <div><i className="fa fa-cog fa-spin fa-3x fa-fw"></i></div>
            <h1 className="title">Courses</h1>
            <DetailsCard.ButtonGroup>
              <Link to="/courses/create" className="btn btn-success">Add new course</Link>
            </DetailsCard.ButtonGroup>
          </DetailsCard.Header>
        </DetailsCard>
        {this.state.isLoading && <h3>Loading...</h3>}
        {!this.state.isLoading && (
          <div className="row">
            {this.state.courses.map(course => <CourseCard key={course.id} course={course} />)}
          </div>
        )}
      </div>
    );
  }
}