import React, { useState, useEffect } from "react";

const PaymentChart = () => {
  const [filter, setFilter] = useState("monthly");
  const [data, setData] = useState([]);
  

  useEffect(() => {
    axios.get(`/api/dashboard/applicant-stats?filter=${filter}`).then((res) => {
      setChartData(res.data);
    });
  }, [filter]);

  const getTotal = () => data.reduce((acc, item) => acc + parseFloat(item.total), 0).toFixed(0);

  return (
    <div className="rounded-3 p-4 mb-4" style={{
      background: "linear-gradient(104deg, #361E7D 2.4%, #403CFF 112.33%)",
    }}>
      <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mb-1">
        <span className="d-block mb-1" style={{ color: "#B1BBC8" }}>Today’s Payment</span>
        <select
          className="form-select w-auto bg-border-color border-color"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="d-flex align-items-center mb-4">
        <h3 className="fs-32 fw-bold text-white mb-0">${getTotal()}</h3>
      </div>

      <div style={{ margin: "-24px -9px -27px -17px", height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#ffffff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PaymentChart;
