# Marinex AI - Fuel Consumption Prediction Chatbot

## 📋 Tổng Quan

Marinex AI là ứng dụng chatbot chuyên phân tích và dự đoán mức tiêu thủ nhiên liệu cho tàu thủy. Ứng dụng sử dụng benchmark **FuelCast** với 10 features chuẩn để dự đoán **Total.MomentaryFuel (kg/s)** cho 96 timestamps (mỗi timestamp 15 phút).

## 🚀 Tính Năng Chính

### 1. **Dự Đoán Nhiên Liệu**
- Nhập 10 features theo chuẩn FuelCast
- Dự đoán tự động cho 96 timestamps
- Hiển thị dashboard trực quan với biểu đồ

### 2. **Hệ Thống Chat**
- Chat text thông thường về nhiên liệu tàu thủy
- Gợi ý câu hỏi thông minh
- Lưu lịch sử phân tích

### 3. **Quản Lý Lịch Sử**
- Xem lịch sử phân tích
- Tìm kiếm trong lịch sử
- Đánh dấu yêu thích
- Xóa từng cuộc trò chuyện
- Xuất lịch sử ra file

### 4. **Giao Diện Đa Theme**
- 14 themes màu sắc
- Custom color với color picker
- Dark/Light mode
- Animation mượt mà

### 5. **Admin Dashboard**
- Quản lý người dùng
- Thống kê hệ thống
- Tài khoản admin: `marinex_admin@gmail.com` / `19062004`

## 📁 Cấu Trúc Dự Án

```
marinex-ai/
├── App.tsx                          # Component chính, routing, authentication
├── components/
│   ├── AdminDashboard.tsx           # Dashboard quản trị
│   ├── ChatBot.tsx                  # Component chatbot chính
│   ├── ChatHistory.tsx              # Sidebar lịch sử phân tích
│   ├── ChatInput.tsx                # Form nhập 10 features + chat
│   ├── FuelConsumptionDashboard.tsx # Dashboard biểu đồ phân tích
│   ├── HelpDialog.tsx               # Hướng dẫn sử dụng
│   ├── LoginForm.tsx                # Form đăng nhập
│   ├── RegisterForm.tsx             # Form đăng ký
│   ├── SettingsDialog.tsx           # Cài đặt theme
│   ├── figma/
│   │   └── ImageWithFallback.tsx    # Component image với fallback
│   └── ui/                          # ShadCN UI components
├── utils/
│   └── mockData.ts                  # Mock data, suggestions, types
└── styles/
    └── globals.css                  # Global styles, Tailwind config
```

## 🔧 Các Components Chính

### **App.tsx**
- **Chức năng**: Root component, quản lý authentication, theme, dark mode
- **State chính**:
  - `currentUser`: Người dùng hiện tại
  - `themeColor`: Theme màu đang chọn
  - `isDarkMode`: Chế độ sáng/tối
  - `customColor`: Màu tùy chỉnh
- **Logic**: Kiểm tra admin, lưu state vào localStorage

### **ChatBot.tsx**
- **Chức năng**: Component chatbot chính, quản lý conversations, messages
- **Features**:
  - Tạo/xóa/chọn conversation
  - Gửi message (text hoặc form 10 features)
  - Hiển thị dashboard khi có dự đoán
  - Toggle sidebar, suggestions
  - Export chat history
- **State chính**:
  - `conversations`: Danh sách cuộc trò chuyện
  - `activeConversationId`: ID cuộc trò chuyện đang active
  - `fuelPredictionData`: Dữ liệu dự đoán nhiên liệu
  - `showDashboard`: Hiện/ẩn dashboard

### **ChatInput.tsx**
- **Chức năng**: Form nhập 10 features + textarea chat
- **10 Features**:
  1. SpeedOverGround (0-14 m/s)
  2. SeaFloorDepth (0-11000 m)
  3. Temperature2M (-10 to 45°C)
  4. OceanCurrentVelocity (0-5 m/s)
  5. OceanCurrentDirection (0-360°)
  6. WindSpeed10M (0-40 m/s)
  7. WindDirection10M (0-360°)
  8. WaveHeight (0-20 m)
  9. WavePeriod (0-30 s)
  10. WaveDirection (0-360°)
- **Validation**: Kiểm tra range cho từng feature
- **Storage**: Lưu 10 lịch sử input gần nhất vào localStorage

### **ChatHistory.tsx**
- **Chức năng**: Sidebar hiển thị lịch sử phân tích
- **Features**:
  - Tìm kiếm conversation
  - Đánh dấu yêu thích (star)
  - Xóa từng conversation
  - Hiển thị stats (số phân tích, thời gian phản hồi)
  - Load more (5 conversations mỗi lần)

### **FuelConsumptionDashboard.tsx**
- **Chức năng**: Dashboard hiển thị kết quả dự đoán
- **Biểu đồ**:
  - Area chart: Tiêu thụ nhiên liệu theo thời gian
  - Bar chart: So sánh hiệu suất
  - Progress bar: Hiệu suất vận hành
- **Cards**:
  - Fuel consumption (kg, tons)
  - Chi phí ước tính (USD)
  - Thông tin vessel
  - Khuyến nghị tối ưu

## 🎯 Quy Trình Sử Dụng

### 1. **Đăng Nhập/Đăng Ký**
```
- Người dùng thường: Đăng ký tài khoản mới
- Admin: marinex_admin@gmail.com / 19062004
```

### 2. **Chat Text Thông Thường**
```
User: "Làm sao để tối ưu nhiên liệu?"
Bot: Hiển thị hướng dẫn và yêu cầu nhập 10 features
```

### 3. **Dự Đoán Với 10 Features**
```
1. Click "Form 10 Features" hoặc mở form mặc định
2. Nhập đầy đủ 10 features
3. Click "Dự đoán Total.MomentaryFuel"
4. Bot trả về kết quả + Dashboard tự động hiện
```

### 4. **Xem Dashboard**
```
- Dashboard hiện tự động sau khi dự đoán
- Click "Dashboard" button để toggle
- Resizable: Kéo giữa chat và dashboard
```

### 5. **Quản Lý Lịch Sử**
```
- Click conversation để xem lại
- Star để đánh dấu yêu thích
- Trash icon để xóa
- Search để tìm kiếm
- "Xóa lịch sử" để xóa tất cả
```

## 🔄 Data Flow

### **Prediction Flow**
```
ChatInput (10 features)
    ↓
ChatBot.handleSendMessage(content, formData)
    ↓
generateMockFuelData(formData) → predictions (96 timestamps)
    ↓
setFuelPredictionData({...})
    ↓
setShowDashboard(true)
    ↓
FuelConsumptionDashboard renders
```

### **Message Flow**
```
User message → conversations state
    ↓
setTimeout (1-2s)
    ↓
Bot response → conversations state
    ↓
Auto scroll to bottom
    ↓
Save to localStorage
```

## 🎨 Theme System

### **Predefined Themes**
- default (purple: #2002a6 / #e3d5f7)
- pink, blue, purple, indigo
- sky, ocean, teal, emerald
- lime, amber, sunset
- rose, fuchsia

### **Custom Theme**
- Color picker trong Settings
- Tự động adjust brightness cho dark/light mode
- Apply cho tất cả components

### **Color Variables**
```typescript
{
  bg: 'bg-black',           // Background chính
  bgSecondary: 'bg-[#0a0a0a]', // Background phụ
  text: 'text-[#e5e5e5]',   // Text chính
  accent: 'text-[#e3d5f7]', // Text accent
  border: 'border-[#e3d5f7]/60', // Border color
  primary: 'bg-[#e3d5f7]',  // Primary button
  messageBg: 'bg-[#e3d5f7]', // User message bg
  messageBotBg: 'bg-[#1a1a1a]' // Bot message bg
}
```

## 💾 LocalStorage Structure

### **User Data**
```javascript
localStorage.setItem('currentUser', username);
localStorage.setItem('currentUserEmail', email);
localStorage.setItem('user_${username}', password);
```

### **Conversations**
```javascript
conversations_${username}: [
  {
    id: 'conv-123456789',
    title: 'Dự đoán với Speed 10 m/s...',
    timestamp: Date,
    messages: [
      { id, type: 'user', content, timestamp },
      { id, type: 'bot', content, timestamp, responseTime }
    ],
    isFavorite: false
  }
]
```

### **Settings**
```javascript
localStorage.setItem('themeColor', 'default');
localStorage.setItem('isDarkMode', 'true');
localStorage.setItem('customColor', '#ff0080');
```

### **Input History**
```javascript
marinex_saved_inputs: [
  {
    id: '123456789',
    timestamp: '2025-10-11T...',
    label: 'Speed 10 m/s | Depth 100 m...',
    data: { speedOverGround: '10', ... }
  }
]
```

## 📊 Mock Data Generation

### **Fuel Prediction Algorithm**
```typescript
const generateMockFuelData = (features) => {
  const base = 0.15 + (features.speedOverGround / 100) * 0.05;
  
  for (let i = 0; i < 96; i++) {
    const timeVariation = Math.sin(i / 10) * 0.02;
    const depthFactor = (features.seaFloorDepth / 1000) * 0.005;
    const tempFactor = (features.temperature2M / 30) * 0.003;
    const windFactor = (features.windSpeed10M / 20) * 0.008;
    const waveFactor = (features.waveHeight / 5) * 0.006;
    
    const fuelConsumption = base + timeVariation + depthFactor 
                          + tempFactor + windFactor + waveFactor;
    
    predictions.push({ timestamp: i, time: '...', fuelConsumption });
  }
  
  return predictions;
}
```

## 🛠️ Công Nghệ Sử Dụng

- **React**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS v4**: Styling
- **ShadCN UI**: Component library
- **Motion (Framer Motion)**: Animations
- **Recharts**: Charts & graphs
- **Sonner**: Toast notifications
- **re-resizable**: Resizable panels

## 📝 Best Practices

### **State Management**
- Use `useState` cho local state
- Use `useEffect` cho side effects (localStorage sync)
- Avoid prop drilling (pass callbacks)

### **Performance**
- `useMemo` cho expensive calculations
- `useCallback` cho callbacks
- Lazy load large datasets
- Virtual scrolling cho long lists

### **Styling**
- Tailwind utility classes
- NO inline styles (except dynamic colors)
- Responsive design (mobile-first)
- Dark mode support

### **Data Validation**
- Validate input ranges
- Show error toasts
- Prevent invalid submissions

## 🐛 Debugging Tips

### **Messages không hiển thị?**
- Check `conversations` state in React DevTools
- Verify `activeConversationId` matches conversation.id
- Check if message has `content` field

### **Dashboard không hiện?**
- Check `fuelPredictionData` state
- Verify all 10 features được nhập
- Check `showDashboard` state

### **Theme không apply?**
- Check localStorage: `themeColor`, `customColor`
- Verify color classes trong theme config
- Check `isDarkMode` state

### **LocalStorage issues?**
- Clear localStorage: `localStorage.clear()`
- Check browser console for errors
- Verify JSON parse/stringify

## 🔐 Security Notes

⚠️ **QUAN TRỌNG**: Đây là demo app, KHÔNG dùng cho production!

- Passwords được lưu plain text trong localStorage
- Không có server-side validation
- Không có rate limiting
- Mock data thay vì API thật

**Để deploy production:**
1. Thêm backend API (Node.js, Python)
2. Sử dụng database (PostgreSQL, MongoDB)
3. Hash passwords (bcrypt)
4. Add JWT authentication
5. Input sanitization
6. HTTPS only

## 📚 Tài Liệu Tham Khảo

- **FuelCast Dataset**: CPS Poseidon benchmark
- **ShadCN UI**: https://ui.shadcn.com/
- **Recharts**: https://recharts.org/
- **Tailwind CSS**: https://tailwindcss.com/

## 👥 Hỗ Trợ

Nếu gặp vấn đề:
1. Check console logs
2. Clear localStorage và reload
3. Verify input data format
4. Check React DevTools state

## 📄 License

MIT License - Free to use for educational purposes.

---

**Version**: 1.0.0  
**Last Updated**: October 11, 2025  
**Author**: Marinex AI Team
