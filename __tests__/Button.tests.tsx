import { Button } from '@/components/ui/button'; // Adjust the import if necessary
import '@testing-library/jest-dom'; // for assertions like toBeInTheDocument, toHaveClass
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button Component', () => {
  // Test: Should render the button with correct text
  it('should render the button with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  // Test: Should apply the default variant classes
  it('should apply the default variant classes', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText('Click me');
    // Checking if the button has the default variant class (bg-primary)
    expect(button).toHaveClass('bg-primary');
  });

  // Test: Should apply the correct variant class when "variant" prop is provided
  it('should apply the correct variant class when "variant" prop is provided', () => {
    render(<Button variant="destructive">Click me</Button>);
    const button = screen.getByText('Click me');
    // Check if the button has the destructive variant class (bg-destructive)
    expect(button).toHaveClass('bg-destructive');
  });

  // Test: Should apply the correct size class when "size" prop is provided
  it('should apply the correct size class when "size" prop is provided', () => {
    render(<Button size="sm">Click me</Button>);
    const button = screen.getByText('Click me');
    // Check if the button has the correct size class (h-8)
    expect(button).toHaveClass('h-8');
  });

  // Test: Should apply additional custom classes passed via "className" prop
  it('should apply additional custom classes passed via "className" prop', () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByText('Click me');
    // Check if the button has the custom class
    expect(button).toHaveClass('custom-class');
  });

  // Test: Should trigger the onClick handler when clicked
  it('should trigger the onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    // Simulate user click
    await userEvent.click(screen.getByText('Click me'));

    // Ensure the onClick handler was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test: Should render as a custom element when "asChild" is passed
  it('should render as a custom element when "asChild" is passed', () => {
    render(
      <Button asChild>
        <a href="#">Click me</a>
      </Button>
    );
    // Check that the component renders an <a> element instead of <button>
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  // Test: Should apply disabled styles when the "disabled" prop is passed
  it('should apply disabled styles when the "disabled" prop is passed', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByText('Click me');
    // Check that the button is disabled
    expect(button).toBeDisabled();
    // Check if the button has the correct disabled classes
    expect(button).toHaveClass('disabled:pointer-events-none');
  });
});
