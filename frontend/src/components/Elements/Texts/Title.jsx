import styles from './Title.module.css';

const Title = ({ text, className = '' }) => {
  return <h2 className={`${styles.title} ${className}`}>{text}</h2>;
};

export default Title;