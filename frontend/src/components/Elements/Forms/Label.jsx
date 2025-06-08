import styles from './Label.module.css';

const Label = ({ htmlFor, text, className = '' }) => {
  return (
    <label 
      htmlFor={htmlFor} 
      className={`${styles.label} ${className}`}
    >
      {text}
    </label>
  );
};

export default Label;