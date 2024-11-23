//
//Calender Component
//
//This component renders a date picker using the react-datepicker library.
//It takes two props:
// - selected: The currently selected date
// - onChange: A function to handle the change in the selected date
//

import React from "react";
import DatePicker from "react-datepicker"; // Import DatePicker component from react-datepicker library
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the DatePicker component

const Calender = ({ selected, onChange }) => {
  return <DatePicker selected={selected} onChange={onChange} />;
};

export default Calender; // Export the Calender component as the default export
