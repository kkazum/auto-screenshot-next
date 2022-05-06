import { useState } from 'react';
import { Checkbox, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { DeleteDialog } from '../../../shared/DeleteDialog';

export type HeadCell = {
  id: string;
  label: string;
};

type SelectableTableHeadProps = {
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  headCells: HeadCell[];
  checked: boolean;
  indeterminate: boolean;
  selectedRowIds: string[];
  handleDelete: (selectedRowIds: string[]) => void;
};

export const SelectableTableHead: React.VFC<SelectableTableHeadProps> = ({
  onSelectAllClick,
  headCells,
  checked,
  indeterminate,
  selectedRowIds,
  handleDelete,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const deleteItems = () => {
    handleDelete(selectedRowIds);
    setIsDeleteDialogOpen(false);
  };

  const isSelectedRowIdsNotEmpty = !!selectedRowIds.length;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ ...(isSelectedRowIdsNotEmpty && { border: 'none' }) }}>
          <Checkbox indeterminate={indeterminate} checked={checked} onChange={onSelectAllClick} />
        </TableCell>
        {isSelectedRowIdsNotEmpty ? (
          <>
            <TableCell sx={{ border: 'none' }}>
              <Button onClick={() => setIsDeleteDialogOpen(true)}>削除する</Button>
            </TableCell>
            <DeleteDialog
              open={isDeleteDialogOpen}
              handleClose={() => setIsDeleteDialogOpen(false)}
              handleDelete={deleteItems}
              target={'選択した項目'}
            />
          </>
        ) : (
          <>
            {headCells.map((headCell) => (
              <TableCell key={headCell.id} padding={'normal'}>
                {headCell.label}
              </TableCell>
            ))}
          </>
        )}
      </TableRow>
    </TableHead>
  );
};
