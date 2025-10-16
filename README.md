# Fluxmare

Fluxmare là ứng dụng web được xây dựng bằng **React + TypeScript (Vite)** nhằm phân tích và dự đoán tiêu thụ nhiên liệu.  
Hệ thống có giao diện dashboard trực quan, tích hợp **AI Assistant** để đưa ra gợi ý tối ưu dựa trên dữ liệu lịch sử và thời gian thực.

---

## Mục lục
1. Tổng quan  
2. Cài đặt và chạy ứng dụng  
3. Cấu trúc dự án  
4. Mô tả chi tiết chức năng từng module / file  
5. Thành phần và tính năng chính  
6. Quy trình phát triển và debug  
7. Troubleshooting và lưu ý  
8. Lệnh Git cơ bản  
9. Thông tin thêm  

---

## 1. Tổng quan

Fluxmare hướng đến việc hỗ trợ doanh nghiệp hoặc cơ quan quản lý năng lượng trong việc:

- Phân tích xu hướng tiêu thụ nhiên liệu theo thời gian.  
- Dự đoán và đề xuất giải pháp tiết kiệm nhiên liệu.  
- Tự động hoá báo cáo và giám sát thông qua dashboard.  

---

## 2. Cài đặt và chạy ứng dụng

### Yêu cầu môi trường
- Node.js >= 18  
- npm hoặc yarn  

### Cách cài đặt
```bash
git clone https://github.com/vanujiash9/Fluxmare.git
cd Fluxmare
npm install
npm run dev
```

Ứng dụng mặc định chạy tại:  
`http://localhost:5173`

---

## 3. Cấu trúc dự án

```
Fluxmare/
│
├── src/
│   ├── app/                 # Cấu hình gốc của ứng dụng, gồm provider, routes, layout
│   ├── components/          # Các component UI tái sử dụng
│   │   ├── charts/          # Biểu đồ thống kê (Bar, Line, Pie)
│   │   ├── tables/          # Bảng dữ liệu hiển thị
│   │   ├── forms/           # Input, Select, Button, Modal
│   │   └── layout/          # Header, Sidebar, Footer
│   │
│   ├── modules/             # Các module chính của ứng dụng
│   │   ├── dashboard/       # Trang Dashboard chính
│   │   ├── assistant/       # Chatbot AI và logic xử lý hội thoại
│   │   ├── analytics/       # Phân tích dữ liệu, biểu đồ và thống kê
│   │   ├── auth/            # Đăng nhập, phân quyền (nếu có)
│   │   └── settings/        # Cấu hình cá nhân / hệ thống
│   │
│   ├── hooks/               # Custom React hooks (logic tái sử dụng)
│   │   ├── use-fetch.ts     # Hook gọi API chung
│   │   ├── use-mobile.ts    # Kiểm tra chế độ mobile
│   │   └── use-theme.ts     # Thay đổi theme sáng/tối
│   │
│   ├── utils/               # Hàm tiện ích và helper
│   │   ├── cn.ts            # Gộp className an toàn (clsx + tailwind-merge)
│   │   ├── format.ts        # Định dạng số, ngày, đơn vị nhiên liệu
│   │   ├── storage.ts       # Lưu dữ liệu vào localStorage/sessionStorage
│   │   └── constants.ts     # Các hằng số toàn cục
│   │
│   ├── lib/                 # Tích hợp bên ngoài (API, config, middleware)
│   │   ├── api.ts           # Endpoint API, axios client
│   │   ├── ai-client.ts     # Kết nối với chatbot hoặc model dự đoán
│   │   └── env.ts           # Đọc biến môi trường .env
│   │
│   ├── styles/              # CSS toàn cục, custom theme
│   │   ├── globals.css
│   │   └── tailwind.css
│   │
│   ├── main.tsx             # File khởi chạy chính, render App
│   ├── App.tsx              # Root component, định nghĩa router
│   └── vite-env.d.ts        # Định nghĩa type cho Vite
│
├── public/                  # Static assets (logo, favicon, v.v.)
├── tsconfig.json            # Cấu hình TypeScript
├── tailwind.config.js       # Cấu hình TailwindCSS
├── vite.config.ts           # Cấu hình Vite (alias, server, plugin)
├── package.json             # Danh sách dependency
└── README.md
```

---

## 4. Mô tả chi tiết chức năng từng module / file

### 4.1 `modules/dashboard/`
- **index.tsx**: Component hiển thị tổng quan dữ liệu tiêu thụ (theo biểu đồ, chỉ số, tỉ lệ).  
- **useDashboardData.ts**: Hook xử lý logic lấy dữ liệu, lọc theo thời gian hoặc khu vực.  
- **widgets/**: Các card nhỏ trong dashboard (ví dụ: tổng tiêu thụ, mức tăng trưởng).  

### 4.2 `modules/assistant/`
- **Assistant.tsx**: Giao diện AI Chatbot.  
- **MessageList.tsx**: Hiển thị danh sách tin nhắn giữa người dùng và bot.  
- **useAssistant.ts**: Hook quản lý luồng hội thoại, gửi request tới `ai-client.ts`.  

### 4.3 `modules/analytics/`
- **charts/**: Tập hợp các biểu đồ (Bar, Line, Pie) dùng để phân tích sâu dữ liệu.  
- **filters/**: Bộ lọc phân tích (thời gian, khu vực, loại nhiên liệu).  
- **analyticsService.ts**: Xử lý dữ liệu đầu vào, chuẩn hóa để hiển thị.  

### 4.4 `hooks/`
- **use-fetch.ts**: Gọi API RESTful với axios, có xử lý loading và error.  
- **use-mobile.ts**: Kiểm tra chiều rộng màn hình để điều chỉnh layout responsive.  
- **use-theme.ts**: Thay đổi theme sáng/tối, lưu vào localStorage.  

### 4.5 `utils/`
- **cn.ts**: Hàm hợp nhất className cho Tailwind.  
- **format.ts**: Định dạng số liệu (ví dụ: `1,234 L` hoặc `10.2%`).  
- **storage.ts**: Hàm lưu/truy xuất dữ liệu từ `localStorage` / `sessionStorage`.  
- **constants.ts**: Chứa danh sách key, API endpoint, và thông số cấu hình mặc định.  

### 4.6 `lib/`
- **api.ts**: Cấu hình axios base URL, interceptor, và hàm gọi API chung.  
- **ai-client.ts**: Kết nối đến endpoint AI (chatbot hoặc model dự đoán).  
- **env.ts**: Đọc và validate biến môi trường từ `.env`.  

---

## 5. Thành phần và tính năng chính

- **Dashboard**: Hiển thị dữ liệu tiêu thụ nhiên liệu và các chỉ số hiệu suất.  
- **AI Assistant**: Chatbot hỗ trợ người dùng phân tích hoặc đặt câu hỏi về dữ liệu.  
- **Analytics**: Cung cấp biểu đồ và bộ lọc giúp so sánh theo loại nhiên liệu, khu vực, thời gian.  
- **Responsive Design**: Tự động điều chỉnh giao diện trên mobile, tablet, desktop.  
- **Authentication (dự kiến)**: Đăng nhập và phân quyền người dùng.  

---

## 6. Quy trình phát triển và debug

```bash
# Chạy chế độ phát triển
npm run dev

# Build bản production
npm run build

# Kiểm tra lỗi lint
npm run lint
```

---

## 7. Troubleshooting và lưu ý

- Nếu gặp lỗi TypeScript deprecation (ví dụ: moduleResolution), thêm vào `tsconfig.json`:
  ```json
  "ignoreDeprecations": "6.0"
  ```
- Nếu gặp lỗi khi push code:
  ```bash
  git switch main
  git pull origin main --rebase
  git push origin main
  ```

---

## 8. Lệnh Git cơ bản

```bash
# Tạo commit
git add .
git commit -m "update"

# Đồng bộ code từ GitHub
git pull origin main --rebase

# Push lên GitHub
git push origin main
```

---

## 9. Thông tin thêm

- Repository: https://github.com/vanujiash9/Fluxmare  
- Tác giả: Thanh Vân  
- Công nghệ: React + TypeScript + TailwindCSS  

---

