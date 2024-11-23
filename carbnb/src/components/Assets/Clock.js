//
//Clock component
//
//This functional component renders a TimePicker component.
//It takes in two props: 'value' (the current time) and 'onChange'
//(a callback function to handle changes to the time value).
//
import React from "react";

// Import the TimePicker component from the 'react-time-picker' library
import TimePicker from "react-time-picker";

// Import CSS styles for the TimePicker and Clock components
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const Clock = ({ value, onChange }) => {
  return <TimePicker onChange={onChange} value={value} />;
};

// Export the Clock component as the default export
export default Clock;
