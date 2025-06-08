import styles from './CheckboxCard.module.css';

const CheckboxCard = ({ children }) => {
  return (
    <div className={styles.checkboxCard}>
      {children}
    </div>
  );
};

export default CheckboxCard;