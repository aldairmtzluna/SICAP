import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLoginEmail';
import LoginForm from './LoginEmailForm';
import TermsAndConditions from './TermsAndConditions';
import { BASE_URL } from '../../../config/config';
import esMessages from '../../../locales/es/messages.json';
import enMessages from '../../../locales/en/messages.json';
import SuccessAlert from '../../Alerts/SuccessAlert';
import ErrorAlert from '../../Alerts/ErrorAlert';
import WarningAlert from '../../Alerts/WarningAlert';
import Title from '../../Elements/Texts/Title';
import Subtitle from '../../Elements/Texts/Subtitle';
import Logo from '../../Elements/Images/Logo';
import AuthCard from '../../Elements/Cards/AuthCard';
import texts from '../../../locales/es/texts.json';

const LoginEmail = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('es');
  const messages = language === 'es' ? esMessages : enMessages;

  const [identifier, setIdentifier] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputType, setInputType] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState(null);

  // Redirección si ya hay sesión
  useEffect(() => {
    if (sessionStorage.getItem('userIdentifier')) {
      navigate('/login/verify');
    }
  }, [navigate]);

  useEffect(() => {
    let timeoutId;
    
    if (showAlert && alertType === 'success') {
      document.body.classList.add('alert-open');
      timeoutId = setTimeout(() => {
        closeAlert();
        navigate('/login/verify');
      }, 5000);
    } else if (showAlert) {
      document.body.classList.add('alert-open');
      timeoutId = setTimeout(() => {
        closeAlert();
      }, 5000);
    } else {
      document.body.classList.remove('alert-open');
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showAlert, alertType, navigate]);

  const detectAndValidateInput = (value) => {
    if (value.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrorMessage(messages.login.email.invalid);
        setIsValid(false);
        setAlertType('warning');
        setShowAlert(true);
        return { isValid: false, type: 'email' };
      }
      return { isValid: true, type: 'email' };
    } else {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value)) {
        setErrorMessage(messages.login.phone.invalid);
        setIsValid(false);
        setAlertType('warning');
        setShowAlert(true);
        return { isValid: false, type: 'phone' };
      }
      return { isValid: true, type: 'phone' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    if (identifier.trim() === '') {
      setIsValid(false);
      setErrorMessage(messages.login.required);
      setAlertType('warning');
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    const { isValid: validInput, type } = detectAndValidateInput(identifier);
    setInputType(type);

    if (!validInput) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsValid(true);
        setAlertType('success');
        setErrorMessage(
          type === 'email'
            ? messages.login.email.success
            : messages.login.phone.success
        );
        setShowAlert(true);
        
        // Guardar el identificador en sessionStorage
        sessionStorage.setItem('userIdentifier', identifier);
        sessionStorage.setItem('inputType', type);
      } else {
        setIsValid(false);
        setAlertType('error');
        setErrorMessage(
          type === 'email'
            ? messages.login.email.error
            : messages.login.phone.error
        );
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsValid(false);
      setAlertType('error');
      setErrorMessage(messages.login.server_error);
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setAlertType(null);
    setErrorMessage('');
  };

  return (
    <>
      <AuthCard>
        <Logo />        
        <Title text={texts.login.email.login} />
        <Subtitle 
          text={texts.login.email.access} 
        />
        
        <SocialLogin />
        <LoginForm 
          identifier={identifier}
          setIdentifier={setIdentifier}
          isValid={isValid}
          inputType={inputType}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          messages={messages}
        />
        <TermsAndConditions />
      </AuthCard>

      {showAlert && alertType === 'success' && (
        <SuccessAlert message={errorMessage} onClose={closeAlert} />
      )}
      {showAlert && alertType === 'error' && (
        <ErrorAlert message={errorMessage} onClose={closeAlert} />
      )}
      {showAlert && alertType === 'warning' && (
        <WarningAlert message={errorMessage} onClose={closeAlert} />
      )}
    </>
  );
};

export default LoginEmail;