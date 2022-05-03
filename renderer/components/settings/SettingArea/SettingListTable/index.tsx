import React, { useState, useEffect, useContext } from 'react';
import { TableContainer, Table, Paper, Typography, Box, Popover, MenuItem } from '@mui/material';
import { useRowSelect } from '../../../../lib/hooks/useRowSelect';
import { getSettingById } from '../../../../lib/functions/getSettingById';
import { HeadCell, SelectableTableHead } from './SelectableTableHead';
import { SettingLIstTableBody } from './SettingLIstTableBody';
import { SettingListType } from '../../NewDetailSettingArea';
import { useRouter } from 'next/router';
import { DispatchContext } from '../../../../lib/context';
import { DELETE_MESSAGE } from '../../../../lib/messages';
import { actions } from '../../../../lib/context/reducer';
import { asyncLocalStorage } from '../../../../lib/asyncLocalStorage';

const headCells: HeadCell[] = [
  {
    id: 'id',
    label: 'Unique Id',
  },
  {
    id: 'url',
    label: 'URL',
  },
  {
    id: 'size',
    label: 'px',
  },
  {
    id: 'actions',
    label: '詳細/撮影',
  },
];

export type Setting = SettingListType[number];

export const SettingListTable: React.VFC = () => {
  const [settingList, setSettingList] = useState<SettingListType | null>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const dispatch = useContext(DispatchContext);
  const { getItem, setItem } = asyncLocalStorage;
  const router = useRouter();
  const {
    selectedRowIds,
    isSelected,
    isSelectedAll,
    isIndeterminate,
    toggleSelected,
    toggleSelectedAll,
    setSelectedRowIds,
  } = useRowSelect(!!settingList ? settingList.map((list) => list.id) : []);

  const handleDelete = (selectedRowIds: string[]) => {
    if (!settingList || !selectedRowIds.length) return;
    const filteredSettingList = settingList.filter((setting) => !selectedRowIds.includes(setting.id));
    setItem('settings', JSON.stringify(filteredSettingList)).then(() => {
      setSettingList(filteredSettingList);
      setSelectedRowIds([]);
      dispatch(actions.showSnackbar(DELETE_MESSAGE));
    });
  };

  const goToDetailPage = () => router.push(`/settings/${currentItemId}`);

  const onClickScreenshotButton = async () => {
    if (!settingList || !currentItemId) return;
    // TODO: getSettingByIdのundefinedチェックする
    const buffers: string[] = await window.myAPI.passInfo(getSettingById(settingList, currentItemId));
    console.log(buffers);
  };

  useEffect(() => {
    getItem('settings').then((list) => {
      setSettingList(list ? JSON.parse(list) : null);
    });
  }, []);

  return (
    <>
      {!!settingList?.length ? (
        <>
          <TableContainer component={Paper}>
            <Table>
              <SelectableTableHead
                onSelectAllClick={toggleSelectedAll}
                headCells={headCells}
                checked={isSelectedAll}
                indeterminate={isIndeterminate}
                selectedRowIds={selectedRowIds}
                handleDelete={handleDelete}
              />
              <SettingLIstTableBody
                rows={settingList}
                isSelected={isSelected}
                toggleSelected={toggleSelected}
                setAnchorEl={setAnchorEl}
                setCurrentItemId={setCurrentItemId}
              />
            </Table>
          </TableContainer>
          <Popover
            elevation={2}
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Box width={200} my={1}>
              <MenuItem onClick={goToDetailPage}>詳細</MenuItem>
              <MenuItem onClick={onClickScreenshotButton}>撮影</MenuItem>
            </Box>
          </Popover>
        </>
      ) : (
        <Box sx={{ py: 2 }}>
          <Typography variant="h5">まだ撮影設定がありません。</Typography>
        </Box>
      )}
    </>
  );
};
