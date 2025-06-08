import styles from './Subtitle.module.css';

const Subtitle = ({ text, className = '' }) => {
  return <p className={`${styles.subtitle} ${className}`}>{text}</p>;
};

export default Subtitle;