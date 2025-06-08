import ContainerCard from '../../Elements/Cards/ContainerCard';
import Link from '../../Elements/Buttons/Link';
import BodyText from '../../Elements/Texts/BodyText';
import texts from '../../../locales/es/texts.json';
import buttons from '../../../locales/es/buttons.json';

const TermsAndConditions = () => {
  return (
    <>
      <BodyText
        text={texts.login.email.terms}
      />
      
      <ContainerCard>
        <Link text={buttons.login.email.other} />
      </ContainerCard>
    </>
  );
};

export default TermsAndConditions;