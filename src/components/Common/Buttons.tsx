import { Button } from "@mui/material";
import { Delete, Edit, AddCircle } from "@mui/icons-material";

interface ButtonsProps {
  onSearchClick?: () => void;
  onCreateClick?: () => void;
  onBackClick?: () => void;
  onDeleteClick?: () => void;
  onEditClick?: () => void;
  onCheckInListClick?: () => void;
  isCreatePage?: boolean;
  isEditPage?: boolean;
  isSearchVisible?: boolean;
  isDeleteVisible?: boolean;
  isCheckinListVisible?: boolean;
}

const Buttons = ({
  onSearchClick,
  onCreateClick,
  onBackClick,
  onDeleteClick,
  onEditClick,
  onCheckInListClick,
  isCreatePage,
  isEditPage,
  isSearchVisible,
  isDeleteVisible,
  isCheckinListVisible,
}: ButtonsProps) => {
  return (
    <div className="flex gap-4">
      {/* 検索する  */}
      {isSearchVisible && onSearchClick && (
        <Button variant="outlined" onClick={onSearchClick}>
          検索する
        </Button>
      )}

      {/* 戻る */}
      {onBackClick && (
        <Button variant="outlined" onClick={onBackClick} color="inherit">
          戻る
        </Button>
      )}

      {/* 削除  */}
      {isDeleteVisible && onDeleteClick && (
        <Button
          variant="outlined"
          onClick={onDeleteClick}
          color="error"
          startIcon={<Delete />}
        >
          削除
        </Button>
      )}

      {/* 編集 */}
      {isEditPage && (
        <Button variant="outlined" onClick={onEditClick} startIcon={<Edit />}>
          編集
        </Button>
      )}

      {/* 新規登録 */}
      {isCreatePage && onCreateClick && (
        <Button variant="contained" color="primary" onClick={onCreateClick}>
          新規登録
        </Button>
      )}

      {/* 登録する */}
      {onCreateClick && !isCreatePage && (
        <Button variant="contained" color="primary" onClick={onCreateClick}>
          登録する
        </Button>
      )}

      {onCheckInListClick && (
        <Button variant="outlined" color="primary" onClick={onCreateClick}>
          チェックリスト
        </Button>
      )}
    </div>
  );
};

export default Buttons;
