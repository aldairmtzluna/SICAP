import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignedIn from './SignedIn';
import LoginVerifyForm from './LoginVerifyForm';
import Title from '../../Elements/Texts/Title';
import Subtitle from '../../Elements/Texts/Subtitle';
import Logo from '../../Elements/Images/Logo';
import AuthCard from '../../Elements/Cards/AuthCard';
import texts from '../../../locales/es/texts.json';
import SuccessAlert from '../../Alerts/SuccessAlert';
import ErrorAlert from '../../Alerts/ErrorAlert';
import WarningAlert from '../../Alerts/WarningAlert';
import esMessages from '../../../locales/es/messages.json';
import enMessages from '../../../locales/en/messages.json';

const LoginVerify = () => {
  const navigate = useNavigate();
  const userIdentifier = sessionStorage.getItem('userIdentifier');
  const inputType = sessionStorage.getItem('inputType');
  const [language] = useState('es');
  const messages = language === 'es' ? esMessages : enMessages;

  // Estados para las alertas
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Efecto para manejar el refresco de página
  useEffect(() => {
    const handlePageLoad = () => {
      const navigationEntries = performance.getEntriesByType("navigation");
      const isPageRefresh = navigationEntries.some(entry => entry.type === 'reload');
      
      if (isPageRefresh) {
        sessionStorage.removeItem('userIdentifier');
        sessionStorage.removeItem('inputType');
        navigate('/');
      }
    };

    if (!userIdentifier) {
      sessionStorage.removeItem('userIdentifier');
      sessionStorage.removeItem('inputType');
      navigate('/');
      return;
    }

    window.addEventListener('load', handlePageLoad);
    return () => window.removeEventListener('load', handlePageLoad);
  }, [userIdentifier, navigate]);

  // Efecto para manejar el cierre automático de alertas
  useEffect(() => {
    let timeoutId;
    
    if (showAlert) {
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
  }, [showAlert]);

  const handleVerifyCode = async (code, e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setShowAlert(false);

    // Validaciones
    if (!code || code.trim() === '') {
      showAlertMessage(messages.login.required, 'warning');
      setIsSubmitting(false);
      return;
    }

    if (!/^\d+$/.test(code)) {
      showAlertMessage(messages.login.code.invalid, 'warning');
      setIsSubmitting(false);
      return;
    }

    if (code.length !== 8) {
      showAlertMessage(messages.login.code.warning, 'warning');
      setIsSubmitting(false);
      return;
    }

    // Simulación de verificación
    try {
      const isCodeValid = true;
      
      if (isCodeValid) {
        showAlertMessage(messages.login.code.success, 'success');
      } else {
        showAlertMessage(messages.login.code.error, 'error');
      }
    } catch (error) {
      showAlertMessage(messages.login.server_error, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showAlertMessage = (message, type) => {
    setErrorMessage(message);
    setAlertType(type);
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
    setAlertType(null);
    setErrorMessage('');
  };

  if (!userIdentifier) {
    return null;
  }

  const getSubtitleText = () => {
    if (inputType === 'email') {
      return texts.login.email.code.replace('{email}', userIdentifier);
    } else {
      return texts.login.phone.code.replace('{phone}', userIdentifier);
    }
  };

  return (
    <>
      <AuthCard>
        <Logo />
        <Title text={
          inputType === 'email' 
            ? texts.login.email.confirm 
            : texts.login.phone.confirm
        } />
        <Subtitle text={getSubtitleText()} />
        <LoginVerifyForm 
          onVerifyCode={handleVerifyCode} 
          isSubmitting={isSubmitting}
        />
        <SignedIn />
      </AuthCard>

      {/* Sistema de Alertas */}
      {showAlert && alertType === 'success' && (
        <SuccessAlert 
          message={errorMessage} 
          onClose={closeAlert} 
          position="top-center"
        />
      )}
      {showAlert && alertType === 'error' && (
        <ErrorAlert 
          message={errorMessage} 
          onClose={closeAlert}
          position="top-center"
        />
      )}
      {showAlert && alertType === 'warning' && (
        <WarningAlert 
          message={errorMessage} 
          onClose={closeAlert}
          position="top-center"
        />
      )}
    </>
  );
};

export default LoginVerify;