import {ProductTypes} from '../src/react-query/queries/product/products';

export function validateEmailAndPassword(
  email: string,
  password: string,
): boolean {
  // Email validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password validation using regex
  // At least one uppercase letter, one number, and one special character, and minimum 8 characters
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = passwordRegex.test(password);

  return isEmailValid && isPasswordValid;
}

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en', {style: 'currency', currency: 'USD'}).format(
    value,
  );
export const validateEmail = (email: string): boolean => {
  // Regular expression for validating email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
