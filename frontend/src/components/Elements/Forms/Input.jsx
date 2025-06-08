import styles from './Input.module.css';

const Input = ({ 
  type = 'text',
  id,
  value,
  onChange,
  placeholder,
  className = '',
  ...props 
}) => {
  return (
    <input
      type={type}
      id={id}
      className={`${styles.input} ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;