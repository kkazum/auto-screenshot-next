import { Layout } from '../../components/shared/Layout';
import { NextPage } from 'next';
import { NewDetailSettingTemplate } from '../../components/settings/NewDetailSettingTemplate';

const DetailPage: NextPage = () => {
  return (
    <Layout>
      <NewDetailSettingTemplate />
    </Layout>
  );
};

export default DetailPage;
