import styles from './Link.module.css';

const Link = ({ 
  type = 'button',
  text,
  onClick,
  className = '',
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`${styles.link} ${className}`}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
};

export default Link;