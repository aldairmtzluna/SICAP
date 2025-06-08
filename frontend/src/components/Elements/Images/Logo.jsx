import styles from './Logo.module.css';
import logo from '../../../assets/logo_sicap.png';

const Logo = ({ className = '' }) => {
  return <img src={logo} alt="SICAP Logo" className={`${styles.logo} ${className}`} />;
};

export default Logo;