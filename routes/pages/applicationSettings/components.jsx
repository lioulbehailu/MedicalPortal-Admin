import React, { useState, useEffect } from "react";
import { ApiClient, Box, Header, Text } from "admin-bro";

import CronJobSetting from "./cronJobSetting";
import { optionConstants } from "./selectorOptions";

const api = new ApiClient();

const APISettingsComponent = () => {
  const [settingCheckerState, setSettingCheckerState] = useState({
    id: null,
    fetch: false,
    available: false,
  });
  const [loading, setLoading] = useState({
    fetch: false,
    available: false,
  });
  const [fetchCronJob, setFetchCronJob] = useState({
    frequency: optionConstants.MONTHLY,
    date: "1",
    day: "",
    hour: "3",
  });
  const [availabilityCronJob, setAvailabilityCronJob] = useState({
    frequency: optionConstants.MONTHLY,
    date: "1",
    day: "",
    hour: "3",
  });

  console.log(settingCheckerState);
  useEffect(() => {
    api
      .resourceAction({
        resourceId: "ApplicationAPISettings",
        actionName: "list",
      })
      .then((results) => {
        if (
          results.data.records &&
          Array.isArray(results.data.records) &&
          results.data.records.length > 0
        ) {
          const cronjobState = results.data.records[0].params;
          setSettingCheckerState({
            ...settingCheckerState,
            id: cronjobState._id || null,
            fetch: cronjobState.fetchCronJobEnabled || false,
            available: cronjobState.availableCronjobEnabled || false,
          });
          setFetchCronJob({
            ...fetchCronJob,

            frequency: cronjobState.fetchFrequency || optionConstants.MONTHLY,
            date: cronjobState.fetchDate || "1",
            day: cronjobState.fetchDay || "",
            hour: cronjobState.fetchHour || "3",
          });
          setAvailabilityCronJob({
            ...availabilityCronJob,

            frequency:
              cronjobState.availableFrequency || optionConstants.MONTHLY,
            date: cronjobState.availableDate || "1",
            day: cronjobState.availableDay || "",
            hour: cronjobState.availableHour || "3",
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const onFetchCronjobSettingSave = () => {
    const form = new FormData();
    form.append("fetchCronJobEnabled", settingCheckerState.fetch);
    form.append("fetchDate", fetchCronJob.date);
    form.append("fetchDay", fetchCronJob.day);
    form.append("fetchHour", fetchCronJob.hour);
    form.append("fetchFrequency", fetchCronJob.frequency);
    setLoading({ ...loading, fetch: true });

    if (settingCheckerState.id) {
      api
        .recordAction({
          resourceId: "ApplicationAPISettings",
          recordId: `${settingCheckerState.id}`,
          actionName: "edit",
          data: form,
        })
        .then((res) => {
          setSettingCheckerState({
            ...settingCheckerState,
            id: res.data.record.id,
          });
          setLoading({ ...loading, fetch: false });
        })
        .catch((err) => {
          console.log("err", err);
          setLoading({ ...loading, fetch: false });
        });
    } else {
      api
        .resourceAction({
          resourceId: "ApplicationAPISettings",
          actionName: "new",
          data: form,
        })
        .then((res) => {
          setSettingCheckerState({
            ...settingCheckerState,
            id: res.data.record.id,
          });
          setLoading({ ...loading, fetch: false });
        })
        .catch((err) => {
          console.log("err", err);
          setLoading({ ...loading, fetch: false });
        });
    }
  };

  const onAvailabilityCronjobSettingSave = () => {
    const form = new FormData();
    form.append("availableCronjobEnabled", settingCheckerState.available);
    form.append("availableDate", availabilityCronJob.date);
    form.append("availableDay", availabilityCronJob.day);
    form.append("availableHour", availabilityCronJob.hour);
    form.append("availableFrequency", availabilityCronJob.frequency);
    setLoading({ ...loading, available: true });

    if (settingCheckerState.id) {
      api
        .recordAction({
          resourceId: "ApplicationAPISettings",
          recordId: `${settingCheckerState.id}`,
          actionName: "edit",
          data: form,
        })
        .then((res) => {
          setSettingCheckerState({
            ...settingCheckerState,
            id: res.data.record.id,
          });
          setLoading({ ...loading, available: false });
        })
        .catch((err) => {
          console.log("err", err);
          setLoading({ ...loading, available: false });
        });
    } else {
      api
        .resourceAction({
          resourceId: "ApplicationAPISettings",
          actionName: "new",
          data: form,
        })
        .then((res) => {
          setSettingCheckerState({
            ...settingCheckerState,
            id: res.data.record.id,
          });
          setLoading({ ...loading, available: false });
        })
        .catch((err) => {
          console.log("err", err);
          setLoading({ ...loading, available: false });
        });
    }
  };

  const frequencyChangeHandler = (event) => {
    console.log(event.target.name, event.target.value);

    switch (event.target.name) {
      case "fetch":
        if (event.target.value === optionConstants.WEEKLY) {
          setFetchCronJob({
            ...fetchCronJob,
            frequency: event.target.value,
            date: "",
            day: "0",
          });
        } else if (event.target.value === optionConstants.MONTHLY) {
          setFetchCronJob({
            ...fetchCronJob,
            frequency: event.target.value,
            date: "1",
            day: "",
          });
        } else if (event.target.value === optionConstants.DAYLY) {
          setFetchCronJob({
            ...fetchCronJob,
            frequency: event.target.value,
            date: "",
            day: "",
            hour: "3",
          });
        } else {
          setFetchCronJob({
            ...fetchCronJob,
            frequency: event.target.value,
            date: "1",
            day: "",
          });
        }
        break;
      case "available":
        if (event.target.value === optionConstants.WEEKLY) {
          setAvailabilityCronJob({
            ...availabilityCronJob,
            frequency: event.target.value,
            date: "",
            day: "0",
          });
        } else if (event.target.value === optionConstants.MONTHLY) {
          setAvailabilityCronJob({
            ...availabilityCronJob,
            frequency: event.target.value,
            date: "1",
            day: "",
          });
        } else if (event.target.value === optionConstants.DAYLY) {
          setAvailabilityCronJob({
            ...availabilityCronJob,
            frequency: event.target.value,
            date: "",
            day: "",
            hour: "3",
          });
        } else {
          setAvailabilityCronJob({
            ...availabilityCronJob,
            frequency: event.target.value,
            date: "1",
            day: "",
          });
        }
        break;
    }
  };
  const dayChangeHandler = (event) => {
    switch (event.target.name) {
      case "fetch":
        setFetchCronJob({ ...fetchCronJob, day: event.target.value });
        break;
      case "available":
        setAvailabilityCronJob({
          ...availabilityCronJob,
          day: event.target.value,
        });
        break;
    }
  };
  const dateChangeHandler = (event) => {
    switch (event.target.name) {
      case "fetch":
        setFetchCronJob({ ...fetchCronJob, date: event.target.value });
        break;
      case "available":
        setAvailabilityCronJob({
          ...availabilityCronJob,
          date: event.target.value,
        });
        break;
    }
  };
  const hourChangeHandler = (event) => {
    switch (event.target.name) {
      case "fetch":
        setFetchCronJob({ ...fetchCronJob, hour: event.target.value });
        break;
      case "available":
        setAvailabilityCronJob({
          ...availabilityCronJob,
          hour: event.target.value,
        });
        break;
    }
  };

  return (
    <Box variant="grey">
      <Box variant="white" p={"10px !impotant"}>
        <Header.H3 textAlign={"center"}>Application API Setting</Header.H3>
        <Text textAlign={"center"} color="grey">
          This page is intended to set global application setting that will be
          applied for the application
        </Text>
      </Box>

      <CronJobSetting
        id="fetch"
        title="Fetch API Settings"
        isLoading={loading.fetch}
        changeHandler={() =>
          setSettingCheckerState({
            ...settingCheckerState,
            fetch: !settingCheckerState.fetch,
          })
        }
        enable={settingCheckerState.fetch}
        enableLabel="Enable Fetching Api"
        cronJob={fetchCronJob}
        frequencyChangeHandler={frequencyChangeHandler}
        dayChangeHandler={dayChangeHandler}
        dateChangeHandler={dateChangeHandler}
        hourChangeHandler={hourChangeHandler}
        onSave={onFetchCronjobSettingSave}
      />
      <CronJobSetting
        id="available"
        title="Check Hospital Availability"
        isLoading={loading.available}
        changeHandler={() =>
          setSettingCheckerState({
            ...settingCheckerState,
            available: !settingCheckerState.available,
          })
        }
        enable={settingCheckerState.available}
        enableLabel="Enable Online Checker"
        cronJob={availabilityCronJob}
        frequencyChangeHandler={frequencyChangeHandler}
        dayChangeHandler={dayChangeHandler}
        dateChangeHandler={dateChangeHandler}
        hourChangeHandler={hourChangeHandler}
        onSave={onAvailabilityCronjobSettingSave}
      />
    </Box>
  );
};

export default APISettingsComponent;
