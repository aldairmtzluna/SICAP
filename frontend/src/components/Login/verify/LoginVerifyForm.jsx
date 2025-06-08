import { useState } from 'react';
import Form from '../../Elements/Forms/Form';
import FormGroup from '../../Elements/Forms/FormGroup';
import Input from '../../Elements/Forms/Input';
import Label from '../../Elements/Forms/Label';
import Button from '../../Elements/Buttons/Button';
import labels from '../../../locales/es/labels.json';
import buttons from '../../../locales/es/buttons.json';

const LoginVerifyForm = ({ onVerifyCode, isSubmitting }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerifyCode(code, e);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label 
          htmlFor="verificationCode"
          text={labels.login.email.verify}
        />
        <Input
          type="number"
          id="verificationCode"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          pattern="[0-9]*"
          maxLength={8}
        />
      </FormGroup>

      <Button 
        type="submit" 
        text={isSubmitting ? buttons.login.email.valid : buttons.login.email.form}
        disabled={isSubmitting}
        className={isSubmitting ? 'button-loading' : ''}
      />
    </Form>
  );
};

export default LoginVerifyForm;