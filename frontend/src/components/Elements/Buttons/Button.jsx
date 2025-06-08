import styles from './Button.module.css';

const Button = ({ 
  type = 'button',
  text = '',          // Texto opcional
  onClick,
  className = '',
  children,           // Elementos hijos opcionales
  ...props 
}) => {
  // Determina el contenido a mostrar
  const content = children || text;
  
  return (
    <button
      type={type}
      className={`${styles.submitButton} ${className}`}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;