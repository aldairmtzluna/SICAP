import styles from './ContainerCard.module.css';

const ContainerCard = ({ children }) => {
  return (
    <div className={styles.ContainerCard}>
      {children}
    </div>
  );
};

export default ContainerCard;