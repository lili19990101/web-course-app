import React from 'react';
//import faker from 'faker';
import axios from 'axios';

import LecturerItem from './LecturerItem';

// function generateSampleLecturers(total = 10) {
//   const results = [];
//   for (let i = 0; i < total; i+= 1) {
//     results.push({
//       id: i + 1,
//       first_name: faker.name.firstName(),
//       last_name: faker.name.lastName(),
//       email: faker.internet.email(),
//     });
//   }
//   return results;
// }

export default class LecturersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: false,
      lecturers: [],
    };
  }

  componentDidMount() {
    this.loadLecturers();
  }

  loadLecturers() {
    this.setState({ isLoading: true });
    axios.get('/api/lecturers').then((response) => {
      this.setState({ lecturers: response.data, isLoading: false });
    });
  }

  render() {
    return (
      <div>
        <h1 className="title">Lecturers from Ancient Time</h1>
        {this.state.isLoading && <h3>Loading...</h3>}
        {!this.state.isLoading && (
          <div className="list-group">
            {this.state.lecturers.map(lecturer => <LecturerItem key={lecturer.id} lecturer={lecturer} />)}
          </div>
        )}
      </div>
    );
  }
}