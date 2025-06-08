import styles from './AuthCard.module.css';

const AuthCard = ({ children }) => {
  return <div className={styles.loginContainer}>{children}</div>;
};

export default AuthCard;