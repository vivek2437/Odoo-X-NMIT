import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const LoginContainer = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 50%, #A5D6A7 100%);
  padding: 2rem;
`;

const LoginCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  color: #4CAF50;
  font-size: 2rem;
  font-weight: bold;
  
  svg {
    margin-right: 0.5rem;
    color: #81C784;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #2E7D32;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #333;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
  
  &.error {
    border-color: #f44336;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #4CAF50;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  color: #4CAF50;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
  
  &:hover:not(:disabled) {
    background: #45a049;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const LinkSection = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: #666;
`;

const StyledLink = styled(Link)`
  color: #4CAF50;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SampleCredentials = styled.div`
  background: #f0f9f0;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 0.9rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #2E7D32;
  }
  
  p {
    margin: 0.25rem 0;
    color: #666;
  }
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fillSampleCredentials = (email: string) => {
    setFormData({
      email,
      password: 'password123'
    });
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <span style={{marginRight: '0.5rem'}}>🌱</span>
          EcoFinds
        </Logo>
        
        <Title>Welcome Back!</Title>
        <Subtitle>Sign in to your account to continue</Subtitle>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={error && !formData.email ? 'error' : ''}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <InputWrapper>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={error && !formData.password ? 'error' : ''}
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </PasswordToggle>
            </InputWrapper>
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </SubmitButton>
        </Form>

        <SampleCredentials>
          <h4>Try with sample accounts:</h4>
          <p>
            <button 
              type="button" 
              onClick={() => fillSampleCredentials('john@example.com')}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#4CAF50', 
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              john@example.com
            </button> / password123
          </p>
          <p>
            <button 
              type="button" 
              onClick={() => fillSampleCredentials('sarah@example.com')}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#4CAF50', 
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              sarah@example.com
            </button> / password123
          </p>
        </SampleCredentials>

        <LinkSection>
          Don't have an account?{' '}
          <StyledLink to="/register">Create one here</StyledLink>
        </LinkSection>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
