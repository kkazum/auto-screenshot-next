import React from 'react';
import { TableBody, TableRow, TableCell, Checkbox, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { SettingListType } from '../../NewDetailSettingArea';

type TableBodyProps = {
  rows: SettingListType;
  isSelected: (rowId: string) => boolean;
  toggleSelected: (id: string) => void;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  setCurrentItemId: React.Dispatch<React.SetStateAction<string | null>>;
};

export const SettingLIstTableBody: React.VFC<TableBodyProps> = ({
  rows,
  isSelected,
  toggleSelected,
  setAnchorEl,
  setCurrentItemId,
}) => {
  const onClickIcon = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    setCurrentItemId(id);
    setAnchorEl(e.currentTarget);
  };
  return (
    <TableBody>
      {rows.map((row) => {
        const isItemSelected = isSelected(row.id);
        const {
          id,
          setting: { name, url, size },
        } = row;
        return (
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.id}
            onClick={() => toggleSelected(id)}
            selected={isItemSelected}
          >
            <TableCell padding="checkbox">
              <Checkbox checked={isItemSelected} />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{url}</TableCell>
            <TableCell>{size.map(({ px }) => `${px}px`).join('、')}</TableCell>
            <TableCell>
              <IconButton onClick={(e) => onClickIcon(e, id)} size={'small'}>
                <MoreHorizIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};
