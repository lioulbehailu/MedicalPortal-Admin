import React from "react";

export const optionConstants = {
  DAYLY: "dayly",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
};

export const cronTimeTriggerOptions = [
  {
    key: "Once a day",
    value: optionConstants.DAYLY,
  },
  {
    key: "Once a week",
    value: optionConstants.WEEKLY,
  },
  {
    key: "Once a month",
    value: optionConstants.MONTHLY,
  },
];

export const onceWeekSelectOption = [
  { key: "Sunday", value: "0" },
  { key: "Monday", value: "1" },
  { key: "Tuesday", value: "2" },
  { key: "Wednesday", value: "3" },
  { key: "Thursday", value: "4" },
  { key: "Friday", value: "5" },
  { key: "Saturday", value: "6" },
];

const Selector = ({ otherProps, options, defaultValue, onChange }) => {
  return (
    <select
      style={{ width: "120px", height: "20px !important", padding: "5px" }}
      onChange={onChange}
      defaultValue={defaultValue}
      {...otherProps}
    >
      {options.map((option) => (
        <option
          key={option.key}
          value={option.value}
          style={{ width: "120px", height: "20px !important" }}
        >
          {" "}
          {option.key}
        </option>
      ))}
    </select>
  );
};

export default Selector;
