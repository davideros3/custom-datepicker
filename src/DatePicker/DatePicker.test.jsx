import { render, screen, fireEvent } from "@testing-library/react";
import DatePicker from "./DatePicker";

describe("DatePicker Integration", () => {
  it("opens the calendar when the input is clicked", () => {
    render(<DatePicker label="Select Date" name="date" value="" onChange={vi.fn()} />);
    
  
    expect(screen.queryByText("Su")).not.toBeInTheDocument();
    
   
    const input = screen.getByPlaceholderText("yyyy-mm-dd");
    fireEvent.click(input);
    
  
    expect(screen.getByText("Su")).toBeInTheDocument();
  });

  it("updates the value and closes the calendar when a day is selected", () => {
    const handleChange = vi.fn();
    
    render(<DatePicker name="date" value="2024-05-01" onChange={handleChange} />);
    
  
    fireEvent.click(screen.getByPlaceholderText("yyyy-mm-dd"));
    
   
    const day15 = screen.getByText("15");
    fireEvent.click(day15);
    
  
    expect(handleChange).toHaveBeenCalledWith({
      target: { name: "date", value: "2024-05-15" }
    });
    
    expect(screen.queryByText("Su")).not.toBeInTheDocument();
  });
});