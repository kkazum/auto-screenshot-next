import { Typography, Box } from '@mui/material';
import { SettingListTable } from './SettingListTable';

export const SettingArea: React.VFC = () => {
  return (
    <Box sx={{ maxWidth: 1500, mx: 'auto' }}>
      <Typography variant="h4" sx={{ py: 2 }}>
        Selectable Table Sample
      </Typography>
      <SettingListTable />
    </Box>
  );
};
