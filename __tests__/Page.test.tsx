import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom' // For simulating Next.js router behavior
import Page from 'src/app/auth/sign-in/page';


describe('Sign-in page', () => {
  test('submits form with valid data', async () => {
    render(<Page />, { wrapper: MemoryRouter })

    // Fill in form fields
    userEvent.type(screen.getByLabelText(/Email/i), 'test@example.com')
    userEvent.type(screen.getByLabelText(/Password/i), 'password')

    // Mock signIn function
    const mockSignIn = jest.fn()

    // Replace the real signIn function with the mock
    jest.spyOn(Page.prototype, 'signIn').mockImplementation(mockSignIn)

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }))

    // Wait for the sign-in function to be called
    expect(mockSignIn).toHaveBeenCalled()

    // Check if signIn is called with the correct data
    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password'
    })
  })
})
