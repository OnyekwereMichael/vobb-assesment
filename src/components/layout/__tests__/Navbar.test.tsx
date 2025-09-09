import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../Navbar';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../theme/ThemeProvider';

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/' }),
  };
});

// Mock theme provider
vi.mock('../../theme/ThemeProvider', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn()
  }),
  ThemeProvider: ({ children }) => <>{children}</>
}));

describe('Navbar Component', () => {
  it('renders the navbar with logo and navigation links', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </ThemeProvider>
    );

    // Check if logo is rendered
    expect(screen.getByText(/Vobb/i)).toBeInTheDocument();
    
    // Check if navigation links are rendered
    expect(screen.getByText(/Deals/i)).toBeInTheDocument();
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
  });

  it('highlights the active link based on current route', () => {
    // Override the mock for this test only
    const useLocationMock = vi.spyOn(require('react-router-dom'), 'useLocation');
    useLocationMock.mockReturnValue({ pathname: '/deals' });

    render(
      <ThemeProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </ThemeProvider>
    );

    // Check if Deals link has active class (border-primary)
    const dealsLink = screen.getByText(/Deals/i).closest('a');
    expect(dealsLink).toHaveClass('border-primary');
    
    // Restore the original mock
    useLocationMock.mockRestore();
  });

  it('contains links to the correct routes', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </ThemeProvider>
    );

    // Check if links have correct href attributes
    expect(screen.getByText(/Deals/i).closest('a')).toHaveAttribute('href', '/deals');
    expect(screen.getByText(/Settings/i).closest('a')).toHaveAttribute('href', '/settings');
    expect(screen.getByText(/Profile/i).closest('a')).toHaveAttribute('href', '/profile');
  });
});