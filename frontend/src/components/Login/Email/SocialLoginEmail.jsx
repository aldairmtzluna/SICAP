import styles from './SocialLoginEmail.module.css';
import Button from '../../Elements/Buttons/Button';
import IconGoogle from '../../Elements/Images/IconGoogle';
import buttons from '../../../locales/es/buttons.json';

const SocialLogin = () => {
  const handleGoogleLogin = () => {
    console.log('Iniciar sesión con Google');
  };

  return (
    <>
      <Button
        onClick={handleGoogleLogin}
        className={styles.googleButton}
      >
        <IconGoogle />
        {buttons.login.email.google}
      </Button>
      <div className={styles.separator}>
        <div className={styles.separatorLine}></div>
        <span className={styles.separatorText}>O</span>
        <div className={styles.separatorLine}></div>
      </div>
    </>
  );
};

export default SocialLogin;