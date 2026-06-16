import { useState } from "react";
import  DatePicker  from "./DatePicker/DatePicker";


function App() {
  const [myDate, setMyDate] = useState("");

  const handleDateChange = (e) => {
    setMyDate(e.target.value);
  };

  return (
    <div>
      
     
      <DatePicker
        value={myDate}
        onChange={handleDateChange}
        iconOnly 
      />
    </div>
  );
}

export default App;