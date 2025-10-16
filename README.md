# Fluxmare — Hướng dẫn chi tiết

**Tổng quan ngắn:** Fluxmare là một ứng dụng web React + TypeScript dùng Vite, kết hợp một số thành phần AI để hỗ trợ **dự đoán tiêu thụ nhiên liệu** và đưa ra các **khuyến nghị hành động** dựa trên dữ liệu lịch sử và đầu vào thời gian thực. Ứng dụng chứa dashboard quản trị, lịch sử chat, bot trợ lý, và nhiều component UI có thể tái sử dụng.

README này cung cấp hướng dẫn chạy, build, debug, và mô tả chi tiết từng thư mục + file quan trọng. File viết bằng tiếng Việt, có bảng để bạn tham khảo dễ hơn.

---

## 1. Các thao tác cơ bản

Lưu ý: các lệnh dưới đây dùng PowerShell trên Windows (bạn cũng có thể dùng Bash trên macOS/Linux với các lệnh tương tự).

- Cài dependencies

```powershell
cd 'd:/Downloads/Fluxmare'
npm install
```

- Chạy dev server

```powershell
npm run dev
```

Mở trình duyệt tới URL mà Vite in ra (thường `http://localhost:5173`).

- Build production

```powershell
npm run build
npm run preview
```

- Kiểm tra TypeScript (chỉ kiểm tra, không emit)

```powershell
npx tsc --noEmit
```

---

## 2. Giới thiệu Fluxmare (ý tưởng & tính năng chính)

- Mục tiêu: sử dụng dữ liệu về tiêu thụ nhiên liệu để dự đoán xu hướng tiêu thụ và gợi ý các hành động tối ưu (ví dụ thay đổi lịch trình, cảnh báo tiết kiệm nhiên liệu, gợi ý kiểm tra phương tiện).
- Thành phần chính:
  - Chatbot — giao diện thần kinh để tương tác với người dùng, hỗ trợ truy vấn, đánh giá dữ liệu và nhận khuyến nghị.
  - Dashboard (Admin) — xem biểu đồ, bảng, lịch sử, và gợi ý từ AI.
  - Compare — công cụ so sánh các tập dữ liệu/hành vi.
  - Fuel Consumption Dashboard — tính toán/hiển thị dự đoán tiêu thụ nhiên liệu, biểu đồ, và đề xuất.

---

## 3. Cấu trúc dự án (chi tiết)

Dưới đây là bảng mô tả các thư mục/file chính. Những file quan trọng được **in đậm**.

| Đường dẫn        | Mục đích                                     | Ghi chú                                              |
| ---------------- | -------------------------------------------- | ---------------------------------------------------- |
| `package.json`   | Quản lý dependencies & scripts               | Scripts: `dev`, `build`, `preview`, ...              |
| `vite.config.ts` | Cấu hình Vite (alias `@` → `src`)            | Điều chỉnh alias, proxy dev nếu cần                  |
| `tsconfig.json`  | Cấu hình TypeScript (paths, compilerOptions) | Chứa `baseUrl` và `paths` (alias `@/*`)              |
| `src/main.tsx`   | **Entry**: mount React app                   | Import global css, providers (Toaster, Theme)        |
| `src/App.tsx`    | **Router / App shell**                       | Thành phần điều phối routes (Dashboard, Chat, Pages) |
| `src/index.css`  | Styles toàn cục (Tailwind)                   | Được import trong `main.tsx`                         |

### Thư mục `src/pages/`

| `src/pages/Admin/` | Admin dashboard pages | `AdminDashboard.tsx` |
| `src/pages/Compare/` | So sánh dữ liệu | `ComparisonDashboard.tsx` |
| `src/pages/Fuel/` | Dashboard tiêu thụ nhiên liệu | `FuelConsumptionDashboard.tsx` |

### Thư mục `src/components/`

Thư mục chứa các component của app, phân theo mục đích:

- `auth/` — các form xác thực: **`LoginForm.tsx`, `RegisterForm.tsx`**.
- `chat/` — chat UI: **`ChatBot.tsx`, `ChatHistory.tsx`, `ChatInput.tsx`**.
- `shared/` — các components dùng chung: **`CompareDialog.tsx`, `SettingsDialog.tsx`, `HelpDialog.tsx`, `EmptyState.tsx`**.
- `_deprecated/` — nơi chứa backup khi tái cấu trúc; an toàn để khôi phục nếu cần.

### Thư mục `src/components/ui/` (chi tiết)

Đây là nơi chứa thư viện UI nội bộ (đã tái cấu trúc). Mỗi folder con có nhiệm vụ rõ ràng:

- `controls/` — các control cơ bản (button, input, checkbox, select, switch...).
- `overlays/` — modal/overlay components (Dialog, Sheet, Popover, DropdownMenu, Drawer...).
- `layout/` — các layout components (Card, Sidebar, Tabs, Accordion, ScrollArea, Separator...).
- `primitives/` — các primitive thấp hơn (avatar, badge, breadcrumb, separator).
- `data/` — components hiển thị dữ liệu (Chart, Table, Pagination, Skeleton, Progress).
- `feedback/` — alert, toast, alert-dialog wrappers, sonner integration.
- `helpers/` — utilities nội bộ: `utils.ts` (cn wrapper), `useMobile.ts` hook, `toaster.tsx`.

Ví dụ file quan trọng:

- `src/components/ui/helpers/utils.ts` — hàm `cn` (classNames + twMerge) dùng khắp nơi.
- `src/components/ui/helpers/use-mobile.ts` — hook phát hiện mobile viewport.
- `src/components/ui/overlays/dialog.tsx` — wrapper Dialog dùng trong Settings/Compare dialogs.

### `src/components/_deprecated/`

Thư mục này chứa các backup của file đã bị ghi đè hoặc di chuyển trong quá trình tái cấu trúc. Nếu thấy một component mất code, kiểm tra thư mục này để restore.

---

## 4. Mô tả những file script & công cụ dev (thư mục `scripts/`)

Trong repo có các script hỗ trợ tái cấu trúc/import fix:

- `scripts/restructure_fluxmare.ps1` — script PowerShell dry-run để di chuyển file theo mapping (chạy với `-Apply` để thực thi). **Giữ file này** nếu bạn muốn tái cấu trúc an toàn.
- `scripts/fix_imports_more.ps1` — script PowerShell sửa import paths qua nhiều pattern; tạo `.bak` trước khi sửa. **Dùng cẩn thận**.
- `scripts/archive/` — chứa các script cũ (ví dụ `fix_imports.ps1`, `fix_imports.py`).

Gợi ý: trước khi chạy bất kỳ script nào, commit code hiện tại để có điểm restore.

---

## 5. Quy trình phát triển & debug (flow đề xuất)

1. Tạo branch feature:

```powershell
git checkout -b feature/my-change
```

2. Cài dependencies và chạy dev server:

```powershell
npm install
npm run dev
```

3. Kiểm tra TypeScript & lint (nếu có):

```powershell
npx tsc --noEmit
# (eslint nếu có cấu hình)
npm run lint
```

4. Khi có conflict hoặc cần di chuyển file:

- Dùng `scripts/restructure_fluxmare.ps1` (dry-run) để xem kế hoạch.
- Nếu OK, chạy với `-Apply`.

5. Commit & push:

```powershell
git add -A
git commit -m "Mô tả thay đổi"
git push origin feature/my-change
```

6. Mở Pull Request và merge khi review xong.

---

## 6. Các lưu ý quan trọng & troubleshooting

- Nếu TypeScript báo về `*.css` imports: dự án có `src/global.d.ts` khai báo `declare module '*.css'` để tránh lỗi này. Nếu bạn gặp lỗi, kiểm tra rằng file đó tồn tại và `tsconfig.json` bao gồm `src/**/*.d.ts` trong `include`.
- Nếu `git push` bị từ chối vì remote có commit mới:
  - Chạy `git pull --rebase origin main`, giải quyết conflict, rồi `git push origin main`.
  - Nếu bạn cần ghi đè remote (cẩn trọng): `git push --force-with-lease origin main`.
- Nếu Vite báo unresolved import `@/components/ui/...`, sửa import sang đường dẫn canonical hoặc đảm bảo file proxy top-level tồn tại.

---

## 7. Bảng tóm tắt nhanh (file → mô tả ngắn)

| File/Folder                  | Mô tả ngắn                                                        |
| ---------------------------- | ----------------------------------------------------------------- |
| `src/main.tsx`               | Entry, import global CSS, providers                               |
| `src/App.tsx`                | Router, layout chung                                              |
| `src/index.css`              | Tailwind / global styles                                          |
| `src/pages`                  | Các trang: Admin / Compare / Fuel                                 |
| `src/components/auth`        | Login/Register forms                                              |
| `src/components/chat`        | Chat UI components                                                |
| `src/components/shared`      | Dialogs & shared components                                       |
| `src/components/ui`          | UI system (controls, overlays, layout, primitives, data, helpers) |
| `src/components/_deprecated` | Backup files khi reorg                                            |
| `scripts/`                   | Tooling scripts (restructure, fix-imports)                        |

---

## 8. Tôi có thể giúp gì tiếp theo?

- Tôi có thể: chạy dev server & fix lỗi runtime, hoàn thiện chuyển đổi import, hoặc restore các file từ `_deprecated`.
- Nói cho tôi biết hành động bạn muốn: `run-dev`, `fix-imports`, `restore <file>`, hoặc `do-nothing`.

---

Phiên bản tài liệu: 2025-10-16

---

## 9. Bản đồ file → module (chi tiết)

Dưới đây là bảng chi tiết các file quan trọng trong `src/` và vai trò của chúng (module liên quan). Mục tiêu: giúp developer mới hiểu ngay file nằm ở đâu và làm gì.

### A. Entry / App

| File           |             Module | Mô tả                                                                          |
| -------------- | -----------------: | ------------------------------------------------------------------------------ |
| `src/main.tsx` |              entry | Khởi tạo React, mount App, import `index.css`, bọc providers (Toaster, Theme). |
| `src/App.tsx`  | app shell / router | Điều phối routes, layout chính, chứa Navbar/Sidebar nếu có.                    |

### B. Pages (route-level)

| File                                          |        Module | Mô tả                                                             |
| --------------------------------------------- | ------------: | ----------------------------------------------------------------- |
| `src/pages/Admin/AdminDashboard.tsx`          |   pages/Admin | Trang Dashboard cho admin, biểu đồ/tổng quan.                     |
| `src/pages/Compare/ComparisonDashboard.tsx`   | pages/Compare | Trang so sánh dữ liệu giữa các tập hợp.                           |
| `src/pages/Fuel/FuelConsumptionDashboard.tsx` |    pages/Fuel | Trang chuyên biệt hiển thị tiêu thụ nhiên liệu, dự đoán, đề xuất. |

### C. Components chính (feature-level)

| File                                       |            Module | Mô tả                                                       |
| ------------------------------------------ | ----------------: | ----------------------------------------------------------- |
| `src/components/chat/ChatBot.tsx`          |   components/chat | Thành phần chatbot UI (controller, tích hợp API).           |
| `src/components/chat/ChatHistory.tsx`      |   components/chat | Hiển thị lịch sử chat, scroll, lưu/truy xuất message.       |
| `src/components/chat/ChatInput.tsx`        |   components/chat | Input box cho user gửi tin nhắn, attachment, shortcuts.     |
| `src/components/auth/LoginForm.tsx`        |   components/auth | Form đăng nhập (validate, submit).                          |
| `src/components/auth/RegisterForm.tsx`     |   components/auth | Form đăng ký (validate, submit).                            |
| `src/components/shared/CompareDialog.tsx`  | components/shared | Dialog dùng chung cho chức năng so sánh.                    |
| `src/components/shared/SettingsDialog.tsx` | components/shared | Dialog cài đặt ứng dụng (profile, prefs).                   |
| `src/components/shared/HelpDialog.tsx`     | components/shared | Dialog help/tài liệu ngắn.                                  |
| `src/components/shared/EmptyState.tsx`     | components/shared | Component hiển thị trạng thái rỗng (no-data).               |
| `src/components/DashboardHistory.tsx`      |        components | Thành phần lịch sử/khung thời gian hiển thị dưới dashboard. |

### D. UI system (`src/components/ui/`)

Lưu ý: thư mục này tổ chức thành nhiều nhóm: `controls`, `overlays`, `layout`, `primitives`, `data`, `feedback`, `helpers`.

#### Controls (form / inputs / buttons)

| File                                         |      Module | Mô tả                                                                   |
| -------------------------------------------- | ----------: | ----------------------------------------------------------------------- |
| `src/components/ui/controls/button.tsx`      | ui/controls | Button tùy biến (variants, sizes), export `Button` và `buttonVariants`. |
| `src/components/ui/controls/input.tsx`       | ui/controls | Input standard với lớp css và accessibility.                            |
| `src/components/ui/controls/input-otp.tsx`   | ui/controls | Input OTP (mã) component.                                               |
| `src/components/ui/controls/select.tsx`      | ui/controls | Select dropdown component (styled).                                     |
| `src/components/ui/controls/switch.tsx`      | ui/controls | Toggle switch component.                                                |
| `src/components/ui/controls/checkbox.tsx`    | ui/controls | Checkbox control.                                                       |
| `src/components/ui/controls/radio-group.tsx` | ui/controls | Radio group control.                                                    |
| `src/components/ui/controls/textarea.tsx`    | ui/controls | Textarea control.                                                       |

#### Overlays / Modals

| File                                          |      Module | Mô tả                                                                  |
| --------------------------------------------- | ----------: | ---------------------------------------------------------------------- |
| `src/components/ui/overlays/dialog.tsx`       | ui/overlays | Dialog/Modal wrapper (DialogTrigger, DialogContent, etc.).             |
| `src/components/ui/overlays/sheet.tsx`        | ui/overlays | Sheet (side panel) implementation used cho sidebar mobile hoặc drawer. |
| `src/components/ui/overlays/popover.tsx`      | ui/overlays | Popover helper.                                                        |
| `src/components/ui/overlays/dropdownMenu.tsx` | ui/overlays | Dropdown menu wrapper.                                                 |

#### Layout & primitives

| File                                         |        Module | Mô tả                                 |
| -------------------------------------------- | ------------: | ------------------------------------- |
| `src/components/ui/layout/card.tsx`          |     ui/layout | Card layout used across dashboards.   |
| `src/components/ui/layout/sidebar.tsx`       |     ui/layout | Sidebar navigation (links, collapse). |
| `src/components/ui/layout/tabs.tsx`          |     ui/layout | Tabs component.                       |
| `src/components/ui/layout/accordion.tsx`     |     ui/layout | Accordion component.                  |
| `src/components/ui/primitives/separator.tsx` | ui/primitives | Thin separator line component.        |
| `src/components/ui/primitives/avatar.tsx`    | ui/primitives | Avatar image wrapper.                 |

#### Data display

| File                                    |  Module | Mô tả                                        |
| --------------------------------------- | ------: | -------------------------------------------- |
| `src/components/ui/data/chart.tsx`      | ui/data | Chart wrapper (chart library) cho dashboard. |
| `src/components/ui/data/table.tsx`      | ui/data | Table component (sortable, paginated).       |
| `src/components/ui/data/pagination.tsx` | ui/data | Pagination control.                          |
| `src/components/ui/data/skeleton.tsx`   | ui/data | Skeleton loader khi loading data.            |

#### Feedback / notifications

| File                                         |      Module | Mô tả                       |
| -------------------------------------------- | ----------: | --------------------------- |
| `src/components/ui/feedback/toast.tsx`       | ui/feedback | Wrapper cho toast (sonner). |
| `src/components/ui/feedback/alertDialog.tsx` | ui/feedback | Alert dialog pattern.       |

#### Helpers & utils

| File                                     |     Module | Mô tả                                                   |
| ---------------------------------------- | ---------: | ------------------------------------------------------- |
| `src/components/ui/helpers/utils.ts`     | ui/helpers | `cn()` helper (clsx + twMerge).                         |
| `src/components/ui/helpers/useMobile.ts` | ui/helpers | Hook `useIsMobile` để detect viewport nhỏ.              |
| `src/components/ui/helpers/toaster.tsx`  | ui/helpers | Toaster wrapper (theme-aware).                          |
| `src/components/ui/sonner.tsx`           | ui/helpers | Re-export hoặc wrapper cho thư viện sonner (toast lib). |

### E. Other utility files

| File                                  | Module | Mô tả                                          |
| ------------------------------------- | -----: | ---------------------------------------------- |
| `src/utils/logoUtils.ts`              |  utils | Helpers cho logo hiển thị.                     |
| `src/utils/mockData.ts`               |  utils | Mock dữ liệu dùng cho dev/demo.                |
| `src/global.d.ts` / `src/custom.d.ts` |  types | Ambient d.ts để khai báo module (CSS, assets). |

### F. Scripts & tooling

| File                               |  Module | Mô tả                                                       |
| ---------------------------------- | ------: | ----------------------------------------------------------- |
| `scripts/restructure_fluxmare.ps1` | scripts | Dry-run & apply file moves mapping.                         |
| `scripts/fix_imports_more.ps1`     | scripts | Replace import paths across repo, tạo `.bak` trước khi sửa. |
| `scripts/archive/*`                | scripts | Các script cũ/backup.                                       |

---

Nếu bạn muốn, tôi có thể: tạo file `DOCS/file-map.md` chứa bảng này (hoặc mở rộng thành CSV), hoặc embed mapping vào header của `README.md` (tôi đã thêm vào README hiện tại). Nói rõ bạn muốn file mapping ở đâu.

# Fluxmare — Hướng dẫn sử dụng & phát triển (Tiếng Việt)

Phiên bản rút gọn cho developers: dự án là một ứng dụng React + TypeScript dùng Vite.
README này hướng dẫn cách chạy, build, debug và giải thích cấu trúc thư mục quan trọng của dự án.

## Nhanh: chạy trên Windows (PowerShell)

1. Cài dependencies

```powershell
cd 'd:/Downloads/Fluxmare'
npm install
```

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


---

Last updated: October 16, 2025

# Chatbot with User Dashboard

This is a code bundle for Chatbot with User Dashboard. The original project is available at https://www.figma.com/design/1OlIrLm0GBTKsPJuVUSmbP/Chatbot-with-User-Dashboard.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.
