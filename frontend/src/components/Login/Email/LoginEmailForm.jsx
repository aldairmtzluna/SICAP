import Form from '../../Elements/Forms/Form';
import FormGroup from '../../Elements/Forms/FormGroup';
import Input from '../../Elements/Forms/Input';
import Label from '../../Elements/Forms/Label';
import Button from '../../Elements/Buttons/Button';
import labels from '../../../locales/es/labels.json';
import buttons from '../../../locales/es/buttons.json';

const LoginForm = ({
  identifier,
  setIdentifier,
  isValid,
  inputType,
  isLoading,
  handleSubmit,
  messages
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label 
          htmlFor="identifier"
          text={labels.login.email.data}
        />
        <Input
          type={inputType === 'phone' ? 'tel' : 'text'}
          id="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className={isValid === false ? 'inputError' : isValid ? 'inputSuccess' : ''}
        />
      </FormGroup>

      <Button 
        type="submit" 
        text={isLoading ? buttons.login.email.valid : buttons.login.email.form}
      />
    </Form>
  );
};

export default LoginForm;