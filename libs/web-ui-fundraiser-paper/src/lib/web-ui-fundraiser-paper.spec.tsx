import { MemoryRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';

import WebUiFundraiserPaper from './web-ui-fundraiser-paper';

describe('WebUiFundraiserPaper', () => {
  it('should render successfully', () => {
    render(
      <MemoryRouter>
        <WebUiFundraiserPaper
          fundraiser={{
            _id: '1',
            name: 'Bob',
            email: 'bob@example.com',
            title: 'Test title',
            description: 'Hello',
            goal: 100,
            coverUrl: '',
          }}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Test title')).toBeVisible();
  });
});
