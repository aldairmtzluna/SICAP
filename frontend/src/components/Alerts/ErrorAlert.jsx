import AlertContainer from './AlertContainer';
import AlertMessage from './AlertMessage';
import AlertCloseButton from './AlertCloseButton';
import AcceptButton from './AcceptButton';

const ErrorAlert = ({ message, onClose }) => {
  return (
    <AlertContainer onClose={onClose}>
      <AlertCloseButton onClick={onClose} />
      <AlertMessage message={message} type="error" />
      <AcceptButton onClick={onClose} />
    </AlertContainer>
  );
};

export default ErrorAlert;