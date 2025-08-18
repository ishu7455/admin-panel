import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api/fileApi";



import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 0 5px rgba(0,0,0,0.2)",
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>{label}</strong>
        </p>
        <p style={{ margin: 0 }}>Total: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const PaymentChart = () => {
  const [filter, setFilter] = useState("month");
  const [status, setStatus] = useState("Completed");
  const [assign_to, setAssignTo] = useState("");

  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/applicant-stats?filter=${filter}&status=${status}&assign_to=${assign_to}`
        );
        const jsonData = await response.json();

        if (Array.isArray(jsonData)) {
          const normalized = jsonData.map((item) => ({
            label: item.label,
            total: item.total ?? item.count ?? 0,
          }));
          setData(normalized);
        } else {
          console.warn("Unexpected API response:", jsonData);
          setData([]);
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
        setData([]);
      }
    };

    fetchStats();
  }, [filter, status, assign_to]);

  useEffect(() => {
     fetchUsers().then(setUsers).catch(console.error);
  }, []);

  const getTotal = () => {
    if (!Array.isArray(data)) return "0";
    return data
      .reduce((acc, item) => {
        const value = parseFloat(item.total ?? item.count);
        return acc + (isNaN(value) ? 0 : value);
      }, 0)
      .toFixed(0);
  };

  return (
    <div className="main-content-container overflow-hidden">
      <div className="row">
        <div className="col-lg-12 col-xxl-12">
          <div
            className="rounded-3 p-4 mb-4"
            style={{
              background:
                "linear-gradient(104deg, #361E7D 2.4%, #403CFF 112.33%)",
            }}
          >
            <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mb-1">
              <span className="d-block mb-1" style={{ color: "#B1BBC8" }}>
                Progress Chart
              </span>
              <div className="d-flex justify-content-end gap-2">
                <select
                  className="form-select w-auto bg-border-color border-color"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="week">Weekly</option>
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>

                <select
                  className="form-select w-auto bg-border-color border-color"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Final Review">Final Review</option>
                  <option value="In Process">In Process</option>
                </select>

                 <select
                  className="form-select w-auto bg-border-color border-color"
                  value={assign_to}
                  onChange={(e) => setAssignTo(e.target.value)}
                >
                  <option value="">Select Status</option>
                  {users.map((user) => (
                  <option value={user.id}>{user.first_name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <h6 className="fs-26 fw-bold text-white mb-4">
                Total {getTotal()}
              </h6>
            </div>

            <div
              style={{
                margin: "-24px -9px -27px -17px",
                height: 250,
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentChart;
