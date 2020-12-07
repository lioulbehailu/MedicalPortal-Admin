import React, { useEffect, useState } from "react";
import { ApiClient, Box, Header, Text } from "admin-bro";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const api = new ApiClient();

const renderLineChart = () => {
  const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];

  const [patientList, setPatientList] = useState();
  const [hospitalList, setHospitalList] = useState();

  useEffect(() => {
    api
      .resourceAction({
        resourceId: "Patients",
        actionName: "list",
      })
      .then((result) => {
        console.log(result);
        setPatientList(result.data.records);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .resourceAction({
        resourceId: "Hospital",
        actionName: "list",
      })
      .then((result) => {
        setHospitalList(result.data.records);
      });
  }, []);

  console.log(patientList);

  return (
    <Box variant="grey">
      <Box variant="white" p="10px !important">
        <Header.H3 textAlign="center">
          <strong>Generalized Report of Report Data</strong>
        </Header.H3>
        <Box variant="white" mt={3}>
          {Array.isArray(patientList) &&
          Array.isArray(hospitalList) &&
          patientList.length > 0 &&
          hospitalList.length > 0 ? (
            <Header.H4 textAlign="right">
              <strong>
                We have collected {patientList.length} Patients from{" "}
                {hospitalList.length}
              </strong>
            </Header.H4>
          ) : (
            ""
          )}

          <br />
          <br />
          <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="Time" />
            <YAxis />
          </LineChart>
        </Box>
      </Box>
    </Box>
  );
};

export default renderLineChart;
