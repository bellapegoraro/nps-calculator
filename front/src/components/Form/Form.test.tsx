import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form'

describe('Form', () => {
  it('should render the Form component', () => {
    render(<Form />);
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  
  it('shows validation errors when submitting empty', async () => {
    render(<Form />);
    const submitButton = screen.getByTestId('submit');

    await userEvent.click(submitButton);

    const errors = screen.getAllByText('Campo obrigatório')

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toBeInTheDocument();
  });

  it('submits the form with valid inputs', async () => {
    const data = {
      product: 'Product',
      commentary: 'Commentary',
      score: 4
    }

    render(<Form />);
    
    await userEvent.type(screen.getByTestId('product'), data.product);
    await userEvent.type(screen.getByTestId('commentary'), data.commentary);
    await userEvent.click(screen.getByTestId('score-4'))
    
    await userEvent.click(screen.getByTestId('submit'));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3001/nps',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
      );
    });

  });
});
