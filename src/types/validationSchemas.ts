// validationSchemas.ts
import * as Yup from 'yup';

// Registration Validation Schema
export const registrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters long'),
  lastName: Yup.string()
    .required('Last Name is required')
    .min(2, 'Last Name must be at least 2 characters long'),
  email: Yup.string()
    .email('Invalid email format')  // Ensure email format is valid
    .nullable(),
  mobileNumber: Yup.string()
    .required('Mobile Number is required')
    .matches(/^[0-9]+$/, 'Mobile must be only digits')
    .min(10, 'Mobile Number must be at least 10 digits long')
    .max(15, 'Mobile Number cannot exceed 15 digits'), // Adjust as per your requirements
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

// Login Validation Schema
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format') // Ensure email format is valid
    .nullable(),
  mobileNumber: Yup.string()
    .required('Mobile Number is required')
    .matches(/^[0-9]+$/, 'Mobile must be only digits')
    .min(10, 'Mobile Number must be at least 10 digits long')
    .max(15, 'Mobile Number cannot exceed 15 digits'), // Adjust as per your requirements
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});
