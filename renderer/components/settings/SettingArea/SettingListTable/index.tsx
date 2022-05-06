import React, { useState, useEffect, useContext } from 'react';
import { TableContainer, Table, Paper, Typography, Box, Popover, MenuItem, Button } from '@mui/material';
import { useRowSelect } from '../../../../lib/hooks/useRowSelect';
import { getSettingById } from '../../../../lib/functions/getSettingById';
import { HeadCell, SelectableTableHead } from './SelectableTableHead';
import { SettingLIstTableBody } from './SettingLIstTableBody';
import { SettingListType } from '../../NewDetailSettingArea';
import { useRouter } from 'next/router';
import { DispatchContext } from '../../../../lib/context';
import { DELETE_MESSAGE, GENERAL_ERROR_MESSAGE, SUCCESS_SCREEN_SHOT_MESSAGE } from '../../../../lib/messages';
import { actions } from '../../../../lib/context/reducer';
import { asyncLocalStorage } from '../../../../lib/asyncLocalStorage';
import { ImageInfo } from '../../../../lib/types/ImageInfo';

const headCells: HeadCell[] = [
  {
    id: 'name',
    label: 'name',
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

type SettingListTable = {
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  setImageInfo: React.Dispatch<React.SetStateAction<ImageInfo | null>>;
};

export const SettingListTable: React.VFC<SettingListTable> = ({ setIsProcessing, setImageInfo }) => {
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

  const goToNewPage = () => {
    setAnchorEl(null);
    router.push('/settings/new');
  };

  const goToDetailPage = () => {
    router.push(`/settings/${currentItemId}`);
  };

  const onClickScreenshotButton = () => {
    if (!settingList || !currentItemId) return;
    setIsProcessing(true);
    setAnchorEl(null);
    // TODO: getSettingByIdのundefinedチェックする
    window.myAPI
      .passInfo(getSettingById(settingList, currentItemId))
      .then((data) => {
        if (!!data.length) {
          dispatch(actions.showSnackbar(SUCCESS_SCREEN_SHOT_MESSAGE));
          setImageInfo(data);
        } else {
          dispatch(actions.showSnackbar(GENERAL_ERROR_MESSAGE, true));
        }
      })
      // .catch((error) => {
      //   dispatch(actions.showSnackbar(GENERAL_ERROR_MESSAGE, true));
      // })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  useEffect(() => {
    getItem('settings').then((list) => {
      setSettingList(list ? JSON.parse(list) : null);
    });
  }, []);

  return (
    <>
      <Button onClick={() => goToNewPage()}>新規条件作成</Button>
      {!!settingList?.length ? (
        <Box>
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
        </Box>
      ) : (
        <Typography variant="h5">まだ撮影設定がありません。</Typography>
      )}
    </>
  );
};
