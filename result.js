import React, { useState, useEffect } from 'react';
import xml2js from 'xml2js';

const API_KEY = 'your_api_key_here';
const API_URL = `https://your_firewall_ip_here/api/?type=config&action=get&xpath=/config/devices/entry[@name='localhost.localdomain']/vsys/entry[@name='vsys1']/rulebase/security`;

const PolicyList = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            'Content-Type': 'application/xml',
            'X-PAN-KEY': API_KEY
          }
        });
        const data = await response.text();
        const parsedData = await xml2js.parseStringPromise(data);
        const policyData = parsedData.response.result[0].rules[0].rule;
        setPolicies(policyData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Policy List</h2>
      {policies.map((policy, index) => (
        <div key={index}>
          <h3>Name: {policy.$.name}</h3>
          <p>Source: {policy.from[0].member.join(', ')}</p>
          <p>Destination: {policy.to[0].member.join(', ')}</p>
          <p>Service: {policy.service[0].member.join(', ')}</p>
          <p>Action: {policy.action[0]}</p>
        </div>
      ))}
    </div>
  );
};

export default PolicyList;
