import styles from './AlertContainer.module.css';

const AcceptButton = ({ onClick, children = 'Aceptar' }) => {
  return (
    <button className={styles.acceptButton} onClick={onClick}>
      {children}
    </button>
  );
};

export default AcceptButton;