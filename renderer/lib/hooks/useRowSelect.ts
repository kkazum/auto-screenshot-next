import { useState } from 'react';

export const useRowSelect = (
  rowIds: number[],
  initialSelectedRowIds: number[] = []
): {
  selectedRowIds: number[];
  isSelected: (rowId: number) => boolean;
  isSelectedAll: boolean;
  isIndeterminate: boolean;
  toggleSelected: (id: number) => void;
  toggleSelectedAll: () => void;
} => {
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>(initialSelectedRowIds);

  const isSelected = (rowId: number) => selectedRowIds.includes(rowId);
  const isSelectedAll = rowIds.length > 0 && selectedRowIds.length === rowIds.length;
  const isIndeterminate = selectedRowIds.length > 0 && selectedRowIds.length < rowIds.length;

  const toggleSelected = (rowId: number) => {
    isSelected(rowId)
      ? setSelectedRowIds(selectedRowIds.filter((selectedId) => selectedId !== rowId))
      : setSelectedRowIds([...selectedRowIds, rowId]);
  };
  const toggleSelectedAll = () => {
    isSelectedAll ? setSelectedRowIds([]) : setSelectedRowIds(rowIds);
  };

  return {
    selectedRowIds,
    isSelected,
    isSelectedAll,
    isIndeterminate,
    toggleSelected,
    toggleSelectedAll,
  };
};
