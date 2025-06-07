import styles from './AlertContainer.module.css';

const AlertContainer = ({ children, onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default AlertContainer;