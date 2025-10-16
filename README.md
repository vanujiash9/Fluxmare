# Fluxmare — local development & maintenance

This repository contains the Fluxmare React + TypeScript app scaffolded with Vite.

This README gives step-by-step instructions to run, build, and maintain the project locally on Windows (PowerShell). It also documents the recent UI reorganization (canonical `src/components/ui/*` subfolders) and where backups were stored.

## Quick start (PowerShell)

1. Install dependencies

```powershell
cd 'd:/Downloads/Fluxmare'
npm install
```

2. Development server

```powershell
npm run dev
```

Open the address printed by Vite (usually http://localhost:5173) in your browser.

3. Build for production

```powershell
npm run build
npm run preview
```

4. TypeScript checks

```powershell
npx tsc --noEmit
```

## What I changed (important)

- The UI component folder was reorganized into canonical subfolders under `src/components/ui/` — for example:
  - `controls/` (Button, Input, Select, Switch, etc.)
  - `overlays/` (Dialog, Sheet, Popover, DropdownMenu, etc.)
  - `layout/` (Card, Sidebar, Tabs, Accordion, etc.)
  - `primitives/`, `data/`, `feedback/`, `helpers/` and so on.
- To keep backward compatibility, top-level files were either restored or replaced by thin re-export proxies pointing to the canonical implementation.
- Files that were removed/overwritten were copied to `src/components/_deprecated/` as backups. If you need to recover a file, that folder should be the first place to look.

## Restoring backups

If you need to restore an original file from the `_deprecated` folder back to its original path, run (PowerShell):

````powershell
# Fluxmare — Hướng dẫn sử dụng & phát triển (Tiếng Việt)

Phiên bản rút gọn cho developers: dự án là một ứng dụng React + TypeScript dùng Vite.
README này hướng dẫn cách chạy, build, debug và giải thích cấu trúc thư mục quan trọng của dự án.

## Nhanh: chạy trên Windows (PowerShell)

1) Cài dependencies

```powershell
cd 'd:/Downloads/Fluxmare'
npm install
````

2. Chạy dev server

```powershell
npm run dev
```

Mở URL do Vite in ra (thường là http://localhost:5173).

3. Build production

```powershell
npm run build
npm run preview
```

4. Kiểm tra TypeScript (không tạo file)

```powershell
npx tsc --noEmit
```

## Các chức năng chính của website

- Chatbot: giao diện chat (gửi/nhận tin nhắn, lịch sử chat) và một số helper UI.
- Dashboard / Admin: bảng điều khiển quản trị, xem lịch sử, so sánh dữ liệu.
- Các trang phụ: trang so sánh (Compare), trang tiêu thụ nhiên liệu (Fuel), v.v.
- Xác thực: form đăng nhập/đăng ký (Register, Login) và các UI liên quan.
- Hệ thống UI component tái sử dụng (đã được tổ chức lại vào thư mục `src/components/ui`).

## Giải thích cấu trúc thư mục (quan trọng)

Gốc dự án (liệt kê các thư mục/trang chính):

- `src/` — mã nguồn ứng dụng.

  - `main.tsx` — điểm vào (entry) của ứng dụng.
  - `App.tsx` — thành phần chính điều phối routes/điều kiện hiển thị.
  - `index.css` / `src/styles/` — style toàn cục (Tailwind).

- `src/pages/` — các trang lớn của ứng dụng (ví dụ `Admin/`, `Compare/`, `Fuel/`).

- `src/components/` — các component ứng dụng. Một số thư mục quan trọng:

  - `auth/` — các form và logic xác thực (LoginForm, RegisterForm).
  - `chat/` — ChatBot, ChatHistory, ChatInput.
  - `shared/` — dialog chung, settings, empty states, helpers dùng chung.
  - `_deprecated/` — nơi lưu các file backup cũ nếu có thay đổi lớn (khôi phục khi cần).

- `src/components/ui/` — thư mục chứa toàn bộ UI primitives & components (đã được tái cấu trúc):
  - `controls/` — các control cơ bản: `Button`, `Input`, `Checkbox`, `Radio`, `Select`, `Switch`, `Textarea`, `Slider`, `Toggle`.
  - `overlays/` — các component overlay và modal: `Dialog`, `Sheet`, `Popover`, `DropdownMenu`, `Tooltip`, `Drawer`, `ContextMenu`, `Menubar`, `NavigationMenu`.
  - `layout/` — component bố cục: `Card`, `Sidebar`, `Tabs`, `Accordion`, `Separator`, `ScrollArea`.
  - `primitives/` — các cấu phần thấp hơn (separator, avatar, badge, breadcrumbs) dùng nội bộ.
  - `data/` — component hiển thị dữ liệu: `Table`, `Chart`, `Pagination`, `Skeleton`, `Progress`.
  - `feedback/` — các thông báo/alert/toast (sonner wrapper, alert dialog helpers).
  - `helpers/` — helpers chung (ví dụ `utils.ts` cho `cn`, `useMobile` hook, toaster wrapper).

Lý do tách như vậy: giúp tái sử dụng, dễ tìm, và tách rõ concerns (controls vs overlays vs layout).

## Các file quan trọng khác

- `tsconfig.json` — cấu hình TypeScript (bao gồm alias `@/*` → `src/*`).
- `vite.config.ts` — cấu hình Vite (alias, dev server, build options).
- `package.json` — scripts: `dev`, `build`, `preview`, `lint` (nếu có), dependencies.

## Backup & phục hồi

- Khi tiến hành tái cấu trúc, các file bị ghi đè/di chuyển được lưu vào `src/components/_deprecated/` (backup).
- Để khôi phục một file từ backup:

```powershell
Copy-Item -Path .\src\components\_deprecated\ui\button.tsx.bak -Destination .\src\components\ui\button.tsx -Force
```

- Hoặc khôi phục từ git HEAD (nếu trước đó bạn chưa commit thay đổi mình muốn giữ):

```powershell
git restore --source=HEAD -- .\src\components\ui\sidebar.tsx
```

## Lưu ý về TypeScript / CSS

- Có tệp `src/global.d.ts` khai báo `declare module '*.css'` để TypeScript chấp nhận side-effect import của file CSS (ví dụ `import './index.css'`).
- Nếu gặp cảnh báo deprecation về `baseUrl` hay `moduleResolution=node10`, đó là cảnh báo migration của TypeScript; repo hiện có `"ignoreDeprecations": "6.0"` để tạm ức chế cảnh báo này. Thay đổi tuỳ chọn này chỉ khi bạn nâng version TypeScript theo hướng dẫn Microsoft.

## Câu lệnh hữu ích (PowerShell)

- Cài dependencies:

```powershell
npm install
```

- Chạy dev server:

```powershell
npm run dev
```

- Build production:

```powershell
npm run build
npm run preview
```

- Kiểm tra TypeScript:

```powershell
npx tsc --noEmit
```

- Commit & push:

```powershell
git add -A
git commit -m "Mô tả thay đổi"
git push origin main
```

## Gợi ý debug khi dev server lỗi

- Unresolved import `@/components/ui/...` → kiểm tra:
  - đổi import sang đường dẫn canonical (`@/components/ui/controls/button`) hoặc
  - đảm bảo file proxy top-level tồn tại (ví dụ `src/components/ui/button.tsx`) và export lại.
- Thiếu packages/types → `npm install`.
- Lỗi TypeScript do compiler option không hợp lệ (`ignoreDeprecations`) → xóa option nếu `npx tsc` báo lỗi unknown option.

## Muốn tôi làm tiếp? (tôi có thể giúp)

- Hoàn thiện chuyển đổi imports trên toàn repo (loại bỏ proxies khi tất cả file đã import canonical paths).
- Phục hồi file cụ thể từ `_deprecated` hoặc từ `HEAD` nếu bạn muốn nguyên trạng cũ.
- Chạy dev server và sửa các lỗi runtime mà Vite báo.

Cho biết lựa chọn của bạn, tôi sẽ tiếp tục và commit các thay đổi (nếu cần) rồi push.

---

Last updated: October 16, 2025
