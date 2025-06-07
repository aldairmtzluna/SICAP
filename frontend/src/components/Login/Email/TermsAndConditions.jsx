import styles from './TermsAndConditions.module.css';

const TermsAndConditions = () => {
  return (
    <>
      <p className={styles.termsText}>
        Al continuar, declaras que leíste y aceptas nuestros Términos y condiciones, 
        el Aviso de privacidad, y los Términos y condiciones de SICAP
      </p>
      
      <div className={styles.otherOptions}>
        <button className={styles.otherOptionsButton}>
          Otras opciones de inicio de sesión
        </button>
      </div>
    </>
  );
};

export default TermsAndConditions;