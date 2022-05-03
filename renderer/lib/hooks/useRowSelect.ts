import React from 'react';
import { useState } from 'react';

export const useRowSelect = (
  rowIds: string[],
  initialSelectedRowIds: string[] = []
): {
  selectedRowIds: string[];
  isSelected: (rowId: string) => boolean;
  isSelectedAll: boolean;
  isIndeterminate: boolean;
  toggleSelected: (id: string) => void;
  toggleSelectedAll: () => void;
  setSelectedRowIds: React.Dispatch<React.SetStateAction<string[]>>;
} => {
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>(initialSelectedRowIds);
  const isSelected = (rowId: string) => selectedRowIds.includes(rowId);
  const isSelectedAll = rowIds.length > 0 && selectedRowIds.length === rowIds.length;
  const isIndeterminate = selectedRowIds.length > 0 && selectedRowIds.length < rowIds.length;

  const toggleSelected = (rowId: string) => {
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
    setSelectedRowIds,
  };
};
