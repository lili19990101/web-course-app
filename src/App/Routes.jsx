import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CoursesView from '../Course/CoursesView';
import LecturersView from '../Lecturer/LecturersView';
import StudentsView from '../Student/StudentsView';
import CourseDetailsView from '../Course/CourseDetailsView';

export default () => ((
  <Switch>
    <Route exact path="/" component={CoursesView} />
    <Route exact path="/courses" component={CoursesView} />
    <Route exact path="/courses/:id" component={CourseDetailsView} />
    <Route exact path="/lecturers" component={LecturersView} />
    <Route exact path="/students" component={StudentsView} />
  </Switch>
));