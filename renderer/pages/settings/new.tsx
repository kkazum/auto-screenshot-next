import { Layout } from '../../components/shared/Layout';
import { NextPage } from 'next';
import { NewDetailSettingTemplate } from '../../components/settings/NewDetailSettingTemplate';

const NewPage: NextPage = () => {
  return (
    <Layout>
      <NewDetailSettingTemplate />
    </Layout>
  );
};

export default NewPage;
