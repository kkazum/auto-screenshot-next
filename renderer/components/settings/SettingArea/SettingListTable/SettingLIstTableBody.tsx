import { TableBody, TableRow, TableCell, Checkbox } from '@mui/material';
import { Data } from '.';

type TableBodyProps = {
  rows: Data[];
  isSelected: (rowId: number) => boolean;
  toggleSelected: (id: number) => void;
};

export const SettingLIstTableBody: React.VFC<TableBodyProps> = ({ rows, isSelected, toggleSelected }) => {
  return (
    <TableBody>
      {rows.map((row) => {
        const isItemSelected = isSelected(row.id);
        const { name, calories, fat, carbs, protein } = row;
        return (
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.id}
            onClick={() => toggleSelected(row.id)}
            selected={isItemSelected}
          >
            <TableCell padding="checkbox">
              <Checkbox checked={isItemSelected} />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{calories}</TableCell>
            <TableCell>{fat}</TableCell>
            <TableCell>{carbs}</TableCell>
            <TableCell>{protein}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};
