import styles from './SocialLoginEmail.module.css';

const SocialLogin = () => {
  const handleGoogleLogin = () => {
    console.log('Iniciar sesión con Google');
  };

  return (
    <>
      <button 
        onClick={handleGoogleLogin}
        className={styles.googleButton}
      >
        <span className={styles.googleIcon}>G</span>
        Iniciar sesión con Google
      </button>
      
      <div className={styles.separator}>
        <div className={styles.separatorLine}></div>
        <span className={styles.separatorText}>O</span>
        <div className={styles.separatorLine}></div>
      </div>
    </>
  );
};

export default SocialLogin;