import styles from './Checkbox.module.css';

const Checkbox = ({ id, name, checked, onChange, className = '' }) => {
  return (
    <input
      type="checkbox"
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
      className={`${styles.checkbox} ${className}`}
    />
  );
};

export default Checkbox;