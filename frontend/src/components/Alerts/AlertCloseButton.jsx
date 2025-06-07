import styles from './AlertContainer.module.css';

const AlertCloseButton = ({ onClick }) => {
  return (
    <button className={styles.closeButton} onClick={onClick}>
      &times;
    </button>
  );
};

export default AlertCloseButton;