import { useState } from "react";
import axios from "axios";

function App() {
  const [rules, setRules] = useState([]);

  const accessToken = new URLSearchParams(window.location.search).get(
    "access_token"
  );

  // Your deployed backend URL
  const BACKEND_URL =
    "https://salesforce-backend-21qw.onrender.com";

  const instanceUrl =
    "https://orgfarm-6e89951539-dev-ed.develop.my.salesforce.com";

  const getValidationRules = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/validation-rules?access_token=${accessToken}`
      );

      setRules(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch validation rules");
    }
  };

  const toggleRule = async (ruleId, currentStatus) => {
    try {
      await axios.post(`${BACKEND_URL}/toggle-rule`, {
        accessToken,
        instanceUrl,
        ruleId,
        currentStatus,
      });

      getValidationRules();
    } catch (error) {
      console.log(error);
      alert("Failed to update validation rule");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "30px",
        fontFamily: "Arial",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          color: "#0176d3",
        }}
      >
        Salesforce Validation Rule Manager
      </h1>

      <button
        onClick={getValidationRules}
        style={{
          padding: "12px 25px",
          marginBottom: "30px",
          cursor: "pointer",
          backgroundColor: "#0176d3",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      >
        Get Validation Rules
      </button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {rules.map((rule) => (
          <div
            key={rule.Id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "12px",
              width: "320px",
              backgroundColor: "white",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{
                color: "#333",
                marginBottom: "15px",
              }}
            >
              {rule.ValidationName}
            </h2>

            <p>
              <strong>Object:</strong>{" "}
              {rule.EntityDefinition.QualifiedApiName}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color: rule.Active ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {rule.Active ? "Active" : "Inactive"}
              </span>
            </p>

            <button
              onClick={() => toggleRule(rule.Id, rule.Active)}
              style={{
                padding: "10px 20px",
                backgroundColor: rule.Active ? "#dc3545" : "#28a745",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
              {rule.Active ? "Deactivate" : "Activate"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;