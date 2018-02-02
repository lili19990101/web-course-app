import React from 'react';
import Gravatar from '../UI/Gravatar';

export default function LecturerItem({ lecturer }) {
  return (
    <div className="list-group-item">
      <div className="jr-person-item">
        <Gravatar email={lecturer.email} size={50} />
        <div style={{ flex: 1 }}>
          <div className="jr-person-item__text">
            <div>{lecturer.first_name} {lecturer.last_name}</div>
            <div>{lecturer.email}</div>
          </div>
        </div>
      </div>
    </div>
  )
}