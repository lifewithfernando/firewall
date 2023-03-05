import React, { useState, useEffect } from 'react';
import fetchAllPolicies from './api/policies';

const PolicyList = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const policies = await fetchAllPolicies();
      setPolicies(policies);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Policy List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Service</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.name}>
              <td>{policy.name}</td>
              <td>{policy.source}</td>
              <td>{policy.destination}</td>
              <td>{policy.service}</td>
              <td>{policy.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PolicyList;
