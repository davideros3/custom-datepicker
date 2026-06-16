import { useState, useRef, useEffect, forwardRef } from "react";
import DatePickerInput from "../DatePickerInput/DatePickerInput";
import CalendarHeader from "../CalendarHeader/CalendarHeader";
import CalendarGrid from "../CalendarGrid/CalendarGrid";
import styles from "./DatePicker.module.css";

const DatePicker = forwardRef(({ 
  label, 
  name, 
  value, 
  onChange = () => {}, 
  required = false, 
  min, 
  max, 
  customStyle = "", 
  ...props 
}, forwardedRef) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    if (typeof value === 'string' && value.includes('-')) {
      const [y, m] = value.split("-");
      return new Date(Number(y), Number(m) - 1, 1);
    }
    return new Date();
  });

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCalendar]);

  useEffect(() => {
    if (typeof value === 'string' && value.includes('-')) {
      const [y, m] = value.split("-");
      setViewDate(new Date(Number(y), Number(m) - 1, 1));
    }
  }, [value]);

  const handleInputToggle = () => setShowCalendar(!showCalendar);

  const handleDaySelect = (dateStr) => {
    setShowCalendar(false);
    onChange({ target: { name, value: dateStr } });
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <DatePickerInput
        ref={forwardedRef}
        label={label}
        name={name}
        value={value}
        required={required}
        onClick={handleInputToggle}
        customStyle={customStyle}
        {...props}
      />

      {showCalendar && (
        <div className={styles.dropdown}>
          <CalendarHeader 
            viewDate={viewDate} 
            setViewDate={setViewDate} 
          />
          <CalendarGrid 
            viewDate={viewDate} 
            value={value} 
            min={min} 
            max={max} 
            onDayClick={handleDaySelect} 
          />
        </div>
      )}
    </div>
  );
});

export default DatePicker;