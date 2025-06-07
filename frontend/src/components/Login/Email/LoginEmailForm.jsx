import styles from './LoginEmailForm.module.css';

const LoginForm = ({
  identifier,
  setIdentifier,
  isValid,
  inputType,
  isLoading,
  handleSubmit,
  messages
}) => {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="identifier" className={styles.label}>
          {messages.login.label || 'Correo o teléfono'}
        </label>
        <input
          type={inputType === 'phone' ? 'tel' : 'text'}
          id="identifier"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
          }}
          className={`${styles.input} ${
            isValid === false ? styles.inputError : ''
          } ${isValid ? styles.inputSuccess : ''}`}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        {isLoading ? 'Validando...' : 'Continuar'}
      </button>
    </form>
  );
};

export default LoginForm;