import styles from "./CalendarGrid.module.css";

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const pad = (n) => (n < 10 ? `0${n}` : n);

const CalendarGrid = ({ viewDate, value, min, max, onDayClick }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

  const weeks = [];
  let days = Array(firstDay).fill(null);

  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
    if (days.length === 7) {
      weeks.push(days);
      days = [];
    }
  }
  if (days.length > 0) {
    while (days.length < 7) days.push(null);
    weeks.push(days);
  }

  const handleDayClick = (day) => {
    const dateStr = `${viewDate.getFullYear()}-${pad(viewDate.getMonth() + 1)}-${pad(day)}`;
    onDayClick(dateStr);
  };

  return (
    <div className={styles.grid}>
      <div className={styles.weekdays}>
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {weeks.map((week, i) => (
        <div key={i} className={styles.row}>
          {week.map((day, j) => {
            if (!day) return <div key={j} className={`${styles.cell} ${styles.empty}`} />;

            const dateObj = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
            const dateStr = `${viewDate.getFullYear()}-${pad(viewDate.getMonth() + 1)}-${pad(day)}`;
            const isSelected = value === dateStr;

            const isToday =
              day === today.getDate() &&
              viewDate.getMonth() === today.getMonth() &&
              viewDate.getFullYear() === today.getFullYear();

            let isDisabled = false;
            if (max && dateObj > new Date(max)) isDisabled = true;
            if (min && dateObj < new Date(min)) isDisabled = true;

            return (
              <button
                key={j}
                type="button"
                disabled={isDisabled}
                className={`${styles.cell} ${isSelected ? styles.selected : ""} ${isToday && !isSelected ? styles.today : ""}`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;