
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserDetails, type UsersProps } from './';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('UserDetails component', () => {
  const mockUser: UsersProps['user'] = {
    id: 1,
    name: 'Alice Example',
    username: 'alice123',
    email: 'alice@example.com',
    phone: '555-1234',
    website: 'example.com',
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    render(
      <MemoryRouter>
        <UserDetails user={mockUser} />
      </MemoryRouter>
    );
  });

  it('renders all user details correctly', () => {
    expect(
      screen.getByRole('heading', { level: 1, name: mockUser.username })
    ).toBeInTheDocument();

    expect(screen.getByText('Username:')).toBeInTheDocument();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();

    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();

    expect(screen.getByText('Phone:')).toBeInTheDocument();
    expect(screen.getByText(mockUser.phone)).toBeInTheDocument();

    expect(screen.getByText('Website:')).toBeInTheDocument();
    expect(screen.getByText(mockUser.website)).toBeInTheDocument();
  });

  it('calls navigate(-1) when Back button is clicked', () => {
    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
