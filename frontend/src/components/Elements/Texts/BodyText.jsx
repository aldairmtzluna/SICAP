import styles from './BodyText.module.css';

const BodyText = ({ text, lines = [], className = '' }) => {
  return (
    <div className={`${styles.bodyText} ${className}`}>
      {text}
      {lines.map((line, index) => (
        <span key={index}>
          <br />
          {line}
        </span>
      ))}
    </div>
  );
};

export default BodyText;