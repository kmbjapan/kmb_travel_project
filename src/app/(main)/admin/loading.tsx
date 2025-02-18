// app/admin/loading.tsx
export default function AdminLoading() {
  return (
    <div
      className="flex h-screen items-center justify-center bg-gray-100/70"
      aria-label="読み込み中"
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-2 text-lg text-blue-500">管理者ページを読み込み中…</p>
      </div>
    </div>
  );
}
