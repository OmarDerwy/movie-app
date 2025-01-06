import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = [];

    if (!/^[^\s]+$/.test(formData.username)) {
      newErrors.push('Username must not contain spaces');
    }

    if(!/^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(formData.email)){
        newErrors.push('Email is not valid');
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/.test(formData.password)) {
      newErrors.push('Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 special character, 1 digit, and be at least 8 characters long');
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.push('Passwords do not match');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Sign Up</h2>

        <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control value={formData.name} name='name' onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control value={formData.email} name='email' onChange={handleChange} isInvalid={submitted && errors.some(error => error.includes('Email'))}></Form.Control>
        </Form.Group>


        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                isInvalid={submitted && errors.some(error => error.includes('Username'))}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={submitted && errors.some(error => error.includes('Password'))}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            isInvalid={submitted && errors.some(error => error.includes('Passwords do not match'))}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>

        {submitted && errors.length > 0 && (
          <Alert variant="danger" className="mt-3">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default Signup;

