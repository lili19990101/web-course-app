import React from 'react';
import axios from 'axios';

import StudentItem from './StudentItem';

export default class StudentsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: false,
      students: [],
    };
  }

  componentDidMount() {
    this.loadStudents();
  }

  loadStudents() {
    this.setState({ isLoading: true });
    axios.get('/api/students').then((response) => {
      this.setState({ students: response.data, isLoading: false });
    });
  }

  render() {
    return (
      <div>
        <h1 className="title">Awesome Students</h1>
        {this.state.isLoading && <h3>Loading...</h3>}
        {!this.state.isLoading && (
          <div className="list-group">
            {this.state.students.map(student => <StudentItem key={student.id} student={student} />)}
          </div>        
        )}
      </div>
    );
  }
}