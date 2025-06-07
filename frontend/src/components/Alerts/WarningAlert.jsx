import AlertContainer from './AlertContainer';
import AlertMessage from './AlertMessage';
import AlertCloseButton from './AlertCloseButton';
import AcceptButton from './AcceptButton';


const WarningAlert = ({ message, onClose }) => {
  return (
    <AlertContainer onClose={onClose}>
      <AlertCloseButton onClick={onClose} />
      <AlertMessage message={message} type="warning" />
      <AcceptButton onClick={onClose} />
    </AlertContainer>
  );
};

export default WarningAlert;