import React from 'react';
import Gravatar from '../UI/Gravatar';

export default function StudentItem({ student }) {
  return (
    <div className="list-group-item">
      <div className="jr-person-item">
        <Gravatar email={student.email} size={50} />
        <div style={{ flex: 1 }}>
          <div className="jr-person-item__text">
            <div>{student.first_name} {student.last_name}</div>
            <div>{student.email}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

