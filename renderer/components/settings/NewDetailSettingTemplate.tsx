import { useRouter } from 'next/router';
import { NewDetailSettingArea } from './NewDetailSettingArea';

export const NewDetailSettingTemplate: React.VFC = () => {
  const router = useRouter();
  const settingId = router.query['id']?.toString() || '';
  return <NewDetailSettingArea settingId={settingId} />;
};
