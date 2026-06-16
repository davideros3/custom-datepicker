import { render, screen, fireEvent } from "@testing-library/react";
import CalendarGrid from "./CalendarGrid";

describe("CalendarGrid", () => {
  it("renders the correct number of days for the month", () => {
    const viewDate = new Date(2024, 1, 1); 
    
   
    render(<CalendarGrid viewDate={viewDate} value="" onDayClick={vi.fn()} />); 
    
    expect(screen.getByText("29")).toBeInTheDocument();
    expect(screen.queryByText("30")).not.toBeInTheDocument(); 
  });

  it("calls onDayClick with the formatted date string", () => {
    const viewDate = new Date(2024, 4, 1); 
    
   
    const handleDayClick = vi.fn(); 

    render(<CalendarGrid viewDate={viewDate} value="" onDayClick={handleDayClick} />);
    
    const day15 = screen.getByText("15");
    fireEvent.click(day15);
    
    expect(handleDayClick).toHaveBeenCalledWith("2024-05-15");
  });

  it("disables dates outside the min and max range", () => {
    const viewDate = new Date(2024, 4, 1); 
    
    render(
      <CalendarGrid 
        viewDate={viewDate} 
        value="" 
        min="2024-05-10" 
        max="2024-05-20" 
      
        onDayClick={vi.fn()} 
      />
    );
    
    expect(screen.getByText("5")).toBeDisabled();
    expect(screen.getByText("15")).not.toBeDisabled();
    expect(screen.getByText("25")).toBeDisabled();
  });
});