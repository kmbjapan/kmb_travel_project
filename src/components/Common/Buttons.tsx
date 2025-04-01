import { Button } from "@mui/material";
import { Delete, Edit, AddCircle } from "@mui/icons-material";
import { useState } from "react";

interface ButtonsProps {
  onSearchClick?: () => void;
  onCreateClick?: () => void;
  onBackClick?: () => void;
  onDeleteClick?: (id: number) => Promise<void>;
  onEditClick?: () => void;
  onCheckInListClick?: () => void;
  onPackageDetailClick?: () => void;
  isCreatePage?: boolean;
  isEditPage?: boolean;
  isSearchVisible?: boolean;
  isDeleteVisible?: boolean;
  isCheckinListVisible?: boolean;
  isPackageDetailVisble?: boolean;
  id?: number;
  title?: string;
  isCheckInPage?: boolean;
  status?: number;
  onStatusToggle?: () => void;
}

const Buttons = ({
  onSearchClick,
  onCreateClick,
  onBackClick,
  onDeleteClick,
  onEditClick,
  onCheckInListClick,
  onPackageDetailClick,
  isCreatePage,
  isEditPage,
  isSearchVisible,
  isDeleteVisible,
  isCheckinListVisible,
  isPackageDetailVisble,
  title,
  id,
  isCheckInPage,
  status,
  onStatusToggle,
}: ButtonsProps) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const toggleCheckIn = () => {
    setIsCheckedIn((prev) => !prev);
  };

  return (
    <div className="flex gap-4">
      {/* 検索 */}
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

      {/* 削除 */}
      {isDeleteVisible && onDeleteClick && (
        <Button
          variant="outlined"
          onClick={() => {
            if (id !== undefined) {
              onDeleteClick(id);
            }
          }}
          color="error"
          startIcon={<Delete />}
        >
          削除
        </Button>
      )}

      {/* 修正 */}
      {isEditPage && (
        <Button variant="outlined" onClick={onEditClick} startIcon={<Edit />}>
          編集
        </Button>
      )}

      {/* 新規登録 */}
      {isCreatePage && onCreateClick && (
        <Button variant="contained" color="primary" onClick={onCreateClick}>
          {title}
        </Button>
      )}

      {/* チェックインリスト */}
      {isCheckinListVisible && onCheckInListClick && (
        <Button variant="outlined" color="primary" onClick={onCheckInListClick}>
          顧客
        </Button>
      )}

      {/* パッケージdetail */}
      {isPackageDetailVisble && onPackageDetailClick && (
        <Button
          variant="outlined"
          color="primary"
          onClick={onPackageDetailClick}
        >
          詳細
        </Button>
      )}

      {/* チェックリスト状況 */}
      {isCheckInPage && (
        <Button
          variant="contained"
          color={status === 1 ? "success" : "error"}
          onClick={onStatusToggle}
        >
          {status === 1 ? "チェックイン済み" : "チェックイン前"}
        </Button>
      )}
    </div>
  );
};

export default Buttons;
