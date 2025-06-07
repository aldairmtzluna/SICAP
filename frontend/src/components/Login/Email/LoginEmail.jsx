import { useState, useEffect } from 'react';
import styles from './LoginEmail.module.css';
import SocialLogin from './SocialLoginEmail';
import LoginForm from './LoginEmailForm';
import TermsAndConditions from './TermsAndConditions';
import logo from '../../../assets/logo_sicap.png'; 
import { BASE_URL } from '../../../config/config';
import esMessages from '../../../locales/es/messages.json';
import enMessages from '../../../locales/en/messages.json';
import SuccessAlert from '../../Alerts/SuccessAlert';
import ErrorAlert from '../../Alerts/ErrorAlert';
import WarningAlert from '../../Alerts/WarningAlert';

const Login = () => {
  const [language, setLanguage] = useState('es');
  const messages = language === 'es' ? esMessages : enMessages;

  const [identifier, setIdentifier] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputType, setInputType] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState(null);

  useEffect(() => {
    let timeoutId;
    
    if (showAlert) {
      document.body.classList.add('alert-open');
      // Configura el temporizador para cerrar automáticamente después de 5 segundos
      timeoutId = setTimeout(() => {
        closeAlert();
      }, 5000);
    } else {
      document.body.classList.remove('alert-open');
    }

    // Limpieza del temporizador al desmontar o cuando showAlert cambie
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showAlert]);

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
      <div className={styles.loginContainer}>
        <img src={logo} alt="SICAP Logo" className={styles.logo} />
        
        <h2 className={styles.title}>Inicia sesión o crea una cuenta</h2>
        <p className={styles.subtitle}>
          Accede a SIstema de Control y Administración de Pólizas.
        </p>
        
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
      </div>

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

export default Login;