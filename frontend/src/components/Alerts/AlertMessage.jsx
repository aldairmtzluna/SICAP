import styles from './AlertContainer.module.css';
import logo from '../../assets/logo_sicap.png';

const AlertMessage = ({ message, type }) => {
  return (
    <div className={styles.messageContainer}>
      <img src={logo} alt="SICAP Logo" className={styles.logo} />
      <p className={`${styles.message} ${styles[type]}`}>{message}</p>
    </div>
  );
};

export default AlertMessage;