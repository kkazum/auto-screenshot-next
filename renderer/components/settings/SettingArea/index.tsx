import { Typography, Box, Button } from '@mui/material';
import { SettingListTable } from './SettingListTable';
import { useRouter } from 'next/router';
export const SettingArea: React.VFC = () => {
  const router = useRouter();
  const goToNewPage = () => {
    router.push('/settings/new');
  };
  return (
    <Box sx={{ maxWidth: 1500, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4" sx={{ py: 2 }}>
          スクリーンショット自動撮影
        </Typography>
        <Button onClick={() => goToNewPage()}>新規条件作成</Button>
      </Box>
      <SettingListTable />
    </Box>
  );
};
