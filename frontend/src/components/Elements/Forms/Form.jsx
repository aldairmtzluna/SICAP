import styles from './Form.module.css';

const Form = ({ children, onSubmit, className = '' }) => {
  return (
    <form 
      onSubmit={onSubmit} 
      className={`${styles.form} ${className}`}
    >
      {children}
    </form>
  );
};

export default Form;