import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Page from './src/app/auth/sign-in/Page';

describe('Sign-in Page', () => {
  it('renders sign-in form correctly', () => {
    const { getByLabelText, getByText } = render(<Page />);
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText('Sign in')).toBeInTheDocument();
  });

  it('allows users to sign in with valid credentials', async () => {
    const { getByLabelText, getByText } = render(<Page />);
    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(getByText('Sign in'));
    await waitFor(() => expect(getByText('Signed in successfully')).toBeInTheDocument());
    // Add assertions for redirection or other actions after successful sign-in
  });

  it('displays error message for invalid credentials', async () => {
    const { getByLabelText, getByText } = render(<Page />);
    fireEvent.change(getByLabelText('Email'), { target: { value: 'invalid@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'invalidpassword' } });
    fireEvent.click(getByText('Sign in'));
    await waitFor(() => expect(getByText('Invalid email or password.')).toBeInTheDocument());
  });

  // Add more test cases as needed...
});
