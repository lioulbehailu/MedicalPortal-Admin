import React, { useState, useEffect } from "react";
import { ApiClient, Box, Header, Text, Loader, Badge, Label } from "admin-bro";

const api = new ApiClient();

const DashBoard = () => {
  const [loading, setLoading] = useState(false);
  const [hospitalInfo, setHospitalInfo] = useState([]);

  useEffect(() => {
    api
      .resourceAction({
        resourceId: "Hospital",
        actionName: "list",
      })
      .then((result) => {
        if (result.data.records && Array.isArray(result.data.records)) {
          setHospitalInfo(result.data.records);
          setLoading(!loading);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  // const listHos = () => {

  // };

  return (
    <Box variant="grey">
      <Header.H3 textAlign="center">
        <strong>Status of Registered Hospitals</strong>
      </Header.H3>

      {!loading ? (
        <Loader />
      ) : (
        hospitalInfo.map((hospital, i) => {
          return (
            <Box variant="grey">
              <Box variant="white" mt={3}>
                <Box key={i} flex flexDirection="row">
                  <Box flexGrow={0}>
                    <Box p="xl">
                      <Header.H3>
                        <strong>{hospital.params.HospitalName}</strong>
                      </Header.H3>
                      <Text>{hospital.params.email}</Text>
                      <Text>{hospital.params.address}</Text>
                    </Box>
                  </Box>

                  <Box flexGrow={1} py="20px !important" px="20px !important">
                    <Box flex flexDirection="row">
                      <Box px={"20px !important"}>
                        <Label>Last Checked</Label>
                        <Text>
                          {hospital.params.lastChecked
                            ? hospital.params.lastChecked
                            : "Long Time Ago"}
                        </Text>
                      </Box>
                    </Box>
                  </Box>

                  <Box py={"20px !important"} ml={5}>
                    <Label>Fetching Status</Label>
                    {hospital.params.isFetching ? (
                      <Loader />
                    ) : (
                      "Currently Not Fetching"
                    )}
                  </Box>

                  <Box py={"40px !important"} ml={5}>
                    <Label>
                      {hospital.params.isOnline ? "Online" : "Offline"}
                    </Label>
                    <Badge
                      variant={hospital.params.isOnline ? "success" : "danger"}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })
      )}
    </Box>
  );
};
export default DashBoard;
