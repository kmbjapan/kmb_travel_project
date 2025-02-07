import { Button } from "@mui/material";
import { Delete, Edit, AddCircle } from "@mui/icons-material";

interface ButtonsProps {
  onSearchClick?: () => void;
  onCreateClick?: () => void;
  onBackClick?: () => void;
  onDeleteClick?: (id: number) => void;
  onEditClick?: () => void;
  onCheckInListClick?: () => void;
  onPackageDetailClick?: () => void;
  isCreatePage?: boolean;
  isEditPage?: boolean;
  isSearchVisible?: boolean;
  isDeleteVisible?: boolean;
  isCheckinListVisible?: boolean;
  isPackageDetailVisble?: boolean;
  id?: number; // id 추가
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
  id, // id prop 추가
}: ButtonsProps) => {
  return (
    <div className="flex gap-4">
      {/* 검색 */}
      {isSearchVisible && onSearchClick && (
        <Button variant="outlined" onClick={onSearchClick}>
          検索する
        </Button>
      )}

      {/* 뒤로가기 */}
      {onBackClick && (
        <Button variant="outlined" onClick={onBackClick} color="inherit">
          戻る
        </Button>
      )}

      {/* 삭제 버튼 */}
      {isDeleteVisible && onDeleteClick && id && (
        <Button
          variant="outlined"
          onClick={() => onDeleteClick(id)} // 클릭 시 id를 넘겨서 삭제 호출
          color="error"
          startIcon={<Delete />}
        >
          削除
        </Button>
      )}

      {/* 수정 */}
      {isEditPage && (
        <Button variant="outlined" onClick={onEditClick} startIcon={<Edit />}>
          編集
        </Button>
      )}

      {/* 신규 등록 */}
      {isCreatePage && onCreateClick && (
        <Button variant="contained" color="primary" onClick={onCreateClick}>
          新規登録
        </Button>
      )}

      {/* 체크리스트 */}
      {isCheckinListVisible && onCheckInListClick && (
        <Button variant="outlined" color="primary" onClick={onCheckInListClick}>
          顧客
        </Button>
      )}

      {/* 패키지디테일 */}
      {isPackageDetailVisble && onPackageDetailClick && (
        <Button
          variant="outlined"
          color="primary"
          onClick={onPackageDetailClick}
        >
          詳細
        </Button>
      )}
    </div>
  );
};

export default Buttons;
