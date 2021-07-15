import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { AppBar } from './app-bar';

describe('Header', () => {
  it('should render successfully', () => {
    const handleLogin = jest.fn();
    const handleLogout = jest.fn();
    const user = { name: 'Alice', email: 'alice@example.com' };
    const { baseElement } = render(
      <MemoryRouter>
        <AppBar
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
          items={[]}
        />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
