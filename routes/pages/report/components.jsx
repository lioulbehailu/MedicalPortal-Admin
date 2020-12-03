import React from "react";
import { ApiClient, Box, Header, Text } from "admin-bro";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const renderLineChart = () => {
  const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];

  return (
    <Box variant="grey">
      <Box variant="white" p="10px !important">
        <Header.H3 textAlign="center">
          <strong>Generalized Report of Report Data</strong>
        </Header.H3>
        <Box variant="white" mt={3}>
          <p>Select</p>
          <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
        </Box>
      </Box>
    </Box>
  );
};

export default renderLineChart;
