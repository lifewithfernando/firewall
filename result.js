import React, { useState, useEffect } from "react";
import xml2js from "xml2js";

const PolicyList = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch(
          "https://localhost/api/?type=config&action=get&xpath=/config/devices/entry[@name='localhost.localdomain']/vsys/entry[@name='vsys1']/rulebase"
        );
        const data = await response.text();
        const parsedData = await xml2js.parseStringPromise(data);
        const policyData = parsedData.response.result[0].rules[0].entry;
        setPolicies(policyData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <div>
      <h1>Policy List</h1>
      {policies.map((policy) => (
        <div key={policy.$.name}>{policy.$.name}</div>
      ))}
    </div>
  );
};

export default PolicyList;
