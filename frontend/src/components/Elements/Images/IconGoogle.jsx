import styles from './IconGoogle.module.css';
import iconGoogle from '../../../assets/google_sicap.png';

const IconGoogle = ({ className = '' }) => {
  return <img src={iconGoogle} alt="SICAP iconGoogle" className={`${styles.iconGoogle} ${className}`} />;
};

export default IconGoogle;