import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import DetailsCard from '../UI/DetailsCard';
import DisplayField from '../UI/DisplayField';
import Spinner from '../UI/Spinner';
import Button from '../UI/Button';
import ConfirmModal from '../UI/ConfirmModal';
import { statusCodeToError } from '../utils';

class CourseDetailsView extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isEditing: false,
      isSaving: false,
      showConfirmDeleteModal: false,
      isDeleting: false,
      course: null,
      error: '',
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
  }

  componentDidMount() {
    this.loadCourse();
  }

  handleEdit() {
    this.setState({ isEditing: true });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ isSaving: true });
    const { course } = this.state;
    const onSuccess = (response) => {
      this.course = response.data;
      this.setState({
        isEditing: false,
        isSaving: false,
        course: response.data,
      });
    };

    if (this.props.match.params.id === 'create') {
      axios.post('/api/courses', course)
        .then(onSuccess);
    } else {
      axios.put(`/api/courses/${course.id}`, course)
        .then(onSuccess);
    }
  }

  handleCancel() {
    const { id } = this.props.match.params;
    if (id === 'create') {
      this.props.history.push('/courses');
    } else {
      this.setState({
        course: this.course,
        isEditing: false,
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      course: {
        ...this.state.course,
        [name]: value,
      },
    });
  }

  renderForm() {
    const { course, isSaving } = this.state;

    return (
      <DetailsCard>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={course.name || ''}
              name="name"
              onChange={this.handleInputChange}
              id="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="code">Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Code"
              value={course.code || ''}
              name="code"
              onChange={this.handleInputChange}
              id="code"
            />
          </div>
          <div className="form-group">
            <label htmlFor="start-at">Start at</label>
            <input
              type="text"
              className="form-control"
              placeholder="DD/MM/YYYY"
              value={course.start_at || ''}
              name="start_at"
              onChange={this.handleInputChange}
              id="start-at"
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-at">End at</label>
            <input
              type="text"
              className="form-control"
              placeholder="DD/MM/YYYY"
              value={course.end_at || ''}
              name="end_at"
              onChange={this.handleInputChange}
              id="end-at"
            />
          </div>
          <div className="form-group">
            <label htmlFor="introduction">Introduction</label>
            <textarea
              className="form-control"
              placeholder="Introduction"
              value={course.introduction || ''}
              name="introduction"
              onChange={this.handleInputChange}
              style={{ height: 80 }}
              id="introduction"
            />
          </div>
          <Button
            primary
            type="submit"
            className="btn btn-primary"
            disabled={isSaving}
          >
            Save
          </Button>
          <Button
            onClick={this.handleCancel}
            disabled={isSaving}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </Button>
        </form>
      </DetailsCard>
    );
  }

  loadCourse() {
    const { id } = this.props.match.params;

    if (id === 'create') {
      this.setState({ course: {}, isEditing: true });
      return;
    }

    this.setState({ isLoading: true, error: '' });
    const onSuccess = (response) => {
      this.course = response.data; //save a copy
      this.setState({
        course: response.data,
        isLoading: false,
      });
    };
    const onFail = (error) => {
      this.setState({
        course: null,
        error: statusCodeToError(error.response.status),
        isLoading: false,
      });
    };
    axios.get(`/api/courses/${id}`).then(onSuccess).catch(onFail);
  }

  handleDeleteClick() {
    this.setState({ showConfirmDeleteModal: true });
  }

  handleConfirmDelete() {
    const { course } = this.state;
    this.setState({ isDeleting: true });
    axios.delete(`/api/courses/${course.id}`)
      .then(() => {
        this.props.history.push('/courses');
      });
  }

  handleCancelDelete() {
    this.setState({ showConfirmDeleteModal: false });
  }

  renderDisplay() {
    const { course, isDeleting } = this.state;

    return (
      <DetailsCard>
        <DetailsCard.Header>
          <h1>{course.name}</h1>
        </DetailsCard.Header>
        <DetailsCard.ButtonGroup>
          <Button primary onClick={this.handleEdit}>Edit</Button>
          {course.id > 0 && (
            <Button
              danger
              onClick={this.handleDeleteClick}
              disabled={isDeleting}
              style={{ marginLeft: 10 }}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          )}
        </DetailsCard.ButtonGroup>
        <DisplayField label="Code">{course.code}</DisplayField>
        <DisplayField label="Start at">{course.start_at}</DisplayField>
        <DisplayField label="End at">{course.end_at}</DisplayField>
        <DisplayField label="Introduction">{course.introduction}</DisplayField>
        <ConfirmModal
          show={this.state.showConfirmDeleteModal}
          onClose={this.handleCancelDelete}
          onConfirm={this.handleConfirmDelete}
        />
      </DetailsCard>
    );
  }


  render() {
    const { isLoading, error, course, isEditing } = this.state;

    if (isLoading) {
      return (
        <DetailsCard><Spinner /></DetailsCard>
      );
    }
    if (!isLoading && error) {
      return (
        <DetailsCard>{error}</DetailsCard>
      );
    }
    if (course && !isEditing) {
      return this.renderDisplay();
    }

    if (course && isEditing) {
      return this.renderForm();
    }

    return null;
  }
}

export default withRouter(CourseDetailsView);