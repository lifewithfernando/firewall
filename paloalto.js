import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PolicyList() {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
    };
    axios.get('/api/policies', config)
      .then(response => setPolicies(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="policy-list">
      {policies.map(policy => (
        <Policy key={policy.id} policy={policy} />
      ))}
    </div>
  );
}

function Policy({ policy }) {
  const { name, to, from, source, destination, sourceUser, category, application, service, hipProfiles, tags, action, profiles, disabled } = policy;

  return (
    <div className="policy">
      <div className="policy-header">
        <h2>{name}</h2>
        <div className="policy-controls">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
      <div className="policy-body">
        <p>To: {to}</p>
        <p>From: {from}</p>
        <p>Source: {source}</p>
        <p>Destination: {destination}</p>
        <p>Source User: {sourceUser}</p>
        <p>Category: {category}</p>
        <p>Application: {application}</p>
        <p>Service: {service}</p>
        <p>HIP Profiles: {hipProfiles.join(', ')}</p>
        <p>Tags: {tags.join(', ')}</p>
        <p>Action: {action}</p>
        <p>Profiles: {profiles.join(', ')}</p>
        <p>Disabled: {disabled ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}

export default PolicyList;