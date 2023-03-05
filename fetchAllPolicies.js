import xml2js from 'xml2js';

const fetchAllPolicies = async () => {
  const response = await fetch('http://localhost:8080/api/policies');
  const xmlData = await response.text();

  const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
  const parsedData = await parser.parseStringPromise(xmlData);

  const policyData = parsedData.root.children[0].children;

  const policies = policyData.map((policy) => ({
    name: policy.name,
    source: policy.source,
    destination: policy.destination,
    service: policy.service,
    action: policy.action,
  }));

  return policies;
};

export default fetchAllPolicies;
