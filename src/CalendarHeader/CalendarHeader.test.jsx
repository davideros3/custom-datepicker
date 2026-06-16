import { render, screen, fireEvent } from "@testing-library/react";
import CalendarHeader from "./CalendarHeader";

describe("CalendarHeader", () => {
  it("renders the current month and year", () => {
    const viewDate = new Date(2024, 4, 1);
    const setViewDate = vi.fn();

    render(<CalendarHeader viewDate={viewDate} setViewDate={setViewDate} />);
    
    expect(screen.getByDisplayValue("May")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2024")).toBeInTheDocument();
  });

  it("calls setViewDate with the next month when clicking the right arrow", () => {
    const viewDate = new Date(2024, 4, 1); 
    const setViewDate = vi.fn();

    render(<CalendarHeader viewDate={viewDate} setViewDate={setViewDate} />);
    
    const nextButton = screen.getByText(">");
    fireEvent.click(nextButton);
    
  
    expect(setViewDate).toHaveBeenCalledWith(new Date(2024, 5, 1));
  });

  it("calls setViewDate with the previous month when clicking the left arrow", () => {
    const viewDate = new Date(2024, 4, 1); 
    const setViewDate = vi.fn();

    render(<CalendarHeader viewDate={viewDate} setViewDate={setViewDate} />);
    
    const prevButton = screen.getByText("<");
    fireEvent.click(prevButton);
    
    // Should call with April 2024
    expect(setViewDate).toHaveBeenCalledWith(new Date(2024, 3, 1));
  });
});