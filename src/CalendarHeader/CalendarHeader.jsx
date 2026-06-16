import styles from "./CalendarHeader.module.css";

const CalendarHeader = ({ viewDate, setViewDate }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i);

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleMonthChange = (e) => {
    setViewDate(new Date(viewDate.getFullYear(), Number(e.target.value), 1));
  };

  const handleYearChange = (e) => {
    setViewDate(new Date(Number(e.target.value), viewDate.getMonth(), 1));
  };

  return (
    <div className={styles.header}>
      <button type="button" onClick={handlePrevMonth}>&lt;</button>
      <div className={styles.selectors}>
        <select value={viewDate.getMonth()} onChange={handleMonthChange}>
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {new Date(2000, i, 1).toLocaleString("default", { month: "short" })}
            </option>
          ))}
        </select>
        <select value={viewDate.getFullYear()} onChange={handleYearChange}>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      <button type="button" onClick={handleNextMonth}>&gt;</button>
    </div>
  );
};

export default CalendarHeader;