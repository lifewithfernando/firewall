import axios from 'axios';

function PolicyList() {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_FIREWALL_ADDRESS}/api/policies`, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
          }
        });
        setPolicies(response.data.policies);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <div className="policy-list">
      {policies.map((policy, index) => (
        <Policy key={index} policy={policy} />
      ))}
    </div>
  );
}

function Policy(props) {
  const { name, to, from, source, destination, sourceUser, category, application, service, hipProfiles, tags, action, profiles, disabled } = props.policy;

  return (
    <div className="policy">
      <div className="policy-header">
        <h2>{name}</h2>
        <button>Edit</button>
        <button>Delete</button>
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
        <p>HIP Profiles: {hipProfiles}</p>
        <p>Tags: {tags}</p>
        <p>Action: {action}</p>
        <p>Profiles: {profiles}</p>
        <p>Disabled: {disabled}</p>
      </div>
    </div>
  );
}

export default PolicyList;