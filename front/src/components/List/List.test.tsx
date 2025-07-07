import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import List from './List';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('List', () => {
    it('should render the component', async () => {
        const responseData = [
            { product: 'Produto A', commentary: 'Ótimo', score: 5 },
            { product: 'Produto A', commentary: 'Bom', score: 4 },
            { product: 'Produto B', commentary: 'Ruim', score: 2 },
        ];

        fetchMock.mockResponseOnce(JSON.stringify(responseData));

        render(<List />);

        await waitFor(() => {
            expect(screen.getByRole('option', { name: 'Produto A' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Produto B' })).toBeInTheDocument();
        });

        fireEvent.change(screen.getByRole('combobox'), {
            target: { value: 'Produto A' },
        });

        await userEvent.click(screen.getByTestId('submit'));

    
        await waitFor(() => {
            expect(screen.getByText(/Total respostas: 2/)).toBeInTheDocument();
            expect(screen.getByText(/NPS:/)).toBeInTheDocument();
        });
    })
})

