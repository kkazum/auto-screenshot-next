import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type DeleteDialogProps = {
  open: boolean;
  handleClose: (e?: {} | React.MouseEvent<HTMLButtonElement>) => void;
  handleDelete: () => void;
  target: string;
};

export const DeleteDialog: React.VFC<DeleteDialogProps> = ({
  open,
  handleClose,
  handleDelete,
  target,
}) => {
  return (
    <Dialog
      open={open}
      onClose={(e, reason) => {
        if (reason == "backdropClick") return;
        handleClose(e);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{target}を削除します。</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          この操作は取り消せません。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          キャンセル
        </Button>
        <Button onClick={handleDelete}>削除</Button>
      </DialogActions>
    </Dialog>
  );
};
