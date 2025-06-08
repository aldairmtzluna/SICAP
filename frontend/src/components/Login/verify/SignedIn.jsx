import Checkbox from '../../Elements/Forms/Checkbox';
import CheckboxCard from '../../Elements/Cards/CheckboxCard';
import ContainerCard from '../../Elements/Cards/ContainerCard';
import BodyText from '../../Elements/Texts/BodyText';
import Link from '../../Elements/Buttons/Link';
import texts from '../../../locales/es/texts.json';
import buttons from '../../../locales/es/buttons.json';

const SignedIn = () => {
  return (
    <>
      <CheckboxCard>
          <Checkbox 
            id="keepSignedIn"
            name="keepSignedIn"
        />
        <BodyText
          text={texts.login.email['signed-In']}
          lines={[texts.login.email.security]}
        />
      </CheckboxCard>
      <ContainerCard>
        <Link text={buttons.login.email.password} />
      </ContainerCard>
    </>
  );
};

export default SignedIn;