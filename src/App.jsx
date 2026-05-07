import { useState } from "react";
import axios from "axios";

function App() {
  const [rules, setRules] = useState([]);

  const accessToken = new URLSearchParams(window.location.search).get(
    "access_token"
  );

  const instanceUrl = "https://orgfarm-6e89951539-dev-ed.develop.my.salesforce.com";

  const getValidationRules = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/validation-rules?access_token=${accessToken}`
      );

      setRules(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleRule = async (ruleId, currentStatus) => {
    try {
      await axios.post("http://localhost:5000/toggle-rule", {
        accessToken,
        instanceUrl,
        ruleId,
        currentStatus,
      });

      getValidationRules();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1>Salesforce Validation Rule Manager</h1>

      <button
        onClick={getValidationRules}
        style={{
          padding: "10px 20px",
          marginBottom: "30px",
          cursor: "pointer",
        }}
      >
        Get Validation Rules
      </button>

      {rules.map((rule) => (
        <div
          key={rule.Id}
          style={{
            border: "1px solid lightgray",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
            width: "400px",
            margin: "20px auto",
          }}
        >
          <h2>{rule.ValidationName}</h2>

          <p>
            <strong>Object:</strong>{" "}
            {rule.EntityDefinition.QualifiedApiName}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {rule.Active ? "Active" : "Inactive"}
          </p>

          <button
            onClick={() => toggleRule(rule.Id, rule.Active)}
            style={{
              padding: "10px 15px",
              backgroundColor: rule.Active ? "red" : "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {rule.Active ? "Deactivate" : "Activate"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;