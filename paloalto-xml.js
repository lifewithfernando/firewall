import { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'xml-parser';

function PolicyList() {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_FIREWALL_ADDRESS}/api/?type=config&action=get&xpath=/config/devices/entry[@name='localhost.localdomain']/vsys/entry[@name='vsys1']/rulebase&key=${process.env.REACT_APP_API_KEY}`);
        const xmlData = response.data;
        const parsedData = parse(xmlData);
        const policyData = parsedData.root.children[0].children
          .filter(child => child.name === 'entry')
          .map(entry => {
            const name = entry.attributes.name;
            const source = entry.children.find(child => child.name === 'from').children
              .filter(child => child.name === 'member')
              .map(member => member.content);
            const destination = entry.children.find(child => child.name === 'to').children
              .filter(child => child.name === 'member')
              .map(member => member.content);
            const service = entry.children.find(child => child.name === 'service').children
              .filter(child => child.name === 'member')
              .map(member => member.content);
            const action = entry.children.find(child => child.name === 'action').content;
            return { name, source, destination, service, action };
          });
        setPolicies(policyData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPolicies();
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
          {policies.map(policy => (
            <tr key={policy.name}>
              <td>{policy.name}</td>
              <td>{policy.source.join(', ')}</td>
              <td>{policy.destination.join(', ')}</td>
              <td>{policy.service.join(', ')}</td>
              <td>{policy.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PolicyList;
