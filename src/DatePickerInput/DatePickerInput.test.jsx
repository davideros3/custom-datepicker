import { render, screen, fireEvent } from "@testing-library/react";
import DatePickerInput from "./DatePickerInput";

describe("DatePickerInput", () => {
  it("renders the input and label correctly", () => {
    render(<DatePickerInput label="Start Date" name="startDate" value="2024-05-15" />);
    
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2024-05-15")).toBeInTheDocument();
  });

  it("renders the required asterisk when required is true", () => {
    render(<DatePickerInput label="Start Date" name="startDate" required={true} />);
    
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("calls onClick when the input wrapper is clicked", () => {
    const handleClick = vi.fn();
    render(<DatePickerInput name="startDate" onClick={handleClick} />);
    

    const input = screen.getByPlaceholderText("yyyy-mm-dd");
    fireEvent.click(input);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});