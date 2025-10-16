import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/controls/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Ship,
  TrendingDown,
  BarChart3,
  Star,
  Lightbulb,
} from "lucide-react";
import { motion } from "motion/react";
import { ThemeColor } from "@/App";

interface HelpDialogProps {
  themeColor: ThemeColor;
  isDarkMode: boolean;
  customColor: string;
}

export default function HelpDialog({
  themeColor,
  isDarkMode,
  customColor,
}: HelpDialogProps) {
  const [open, setOpen] = useState(false);

  const getColors = (theme: ThemeColor, dark: boolean) => {
    const base = {
      default: dark
        ? {
            bg: "bg-[#0a0a0a]",
            bgSecondary: "bg-[#1a1a1a]",
            text: "text-[#e5e5e5]",
            textSecondary: "text-[#b0b0b0]",
            accent: "text-[#e3d5f7]",
            border: "border-[#e3d5f7]/30",
          }
        : {
            bg: "bg-white",
            bgSecondary: "bg-[#f5f5f5]",
            text: "text-[#1a1a1a]",
            textSecondary: "text-[#4a4a4a]",
            accent: "text-[#2002a6]",
            border: "border-[#2002a6]/50",
          },
      pink: dark
        ? {
            bg: "bg-black",
            bgSecondary: "bg-[#1a1a1a]",
            text: "text-pink-50",
            textSecondary: "text-pink-200",
            accent: "text-pink-300",
            border: "border-pink-400/30",
          }
        : {
            bg: "bg-white",
            bgSecondary: "bg-white",
            text: "text-pink-950",
            textSecondary: "text-pink-800",
            accent: "text-pink-700",
            border: "border-pink-400/50",
          },
      blue: dark
        ? {
            bg: "bg-black",
            bgSecondary: "bg-[#1a1a1a]",
            text: "text-blue-50",
            textSecondary: "text-blue-200",
            accent: "text-blue-300",
            border: "border-blue-400/50",
          }
        : {
            bg: "bg-white",
            bgSecondary: "bg-white",
            text: "text-blue-950",
            textSecondary: "text-blue-800",
            accent: "text-blue-700",
            border: "border-blue-400/50",
          },
      purple: dark
        ? {
            bg: "bg-black",
            bgSecondary: "bg-[#1a1a1a]",
            text: "text-purple-50",
            textSecondary: "text-purple-200",
            accent: "text-purple-300",
            border: "border-purple-400/50",
          }
        : {
            bg: "bg-white",
            bgSecondary: "bg-white",
            text: "text-purple-950",
            textSecondary: "text-purple-800",
            accent: "text-purple-700",
            border: "border-purple-400/50",
          },
      ocean: dark
        ? {
            bg: "bg-black",
            bgSecondary: "bg-[#1a1a1a]",
            text: "text-cyan-50",
            textSecondary: "text-cyan-200",
            accent: "text-cyan-300",
            border: "border-cyan-400/50",
          }
        : {
            bg: "bg-white",
            bgSecondary: "bg-white",
            text: "text-cyan-950",
            textSecondary: "text-cyan-800",
            accent: "text-cyan-700",
            border: "border-cyan-400/50",
          },
      sunset: dark
        ? {
            bg: "bg-black",
            bgSecondary: "bg-[#1a1a1a]",
            text: "text-orange-50",
            textSecondary: "text-orange-200",
            accent: "text-orange-300",
            border: "border-orange-400/50",
          }
        : {
            bg: "bg-white",
            bgSecondary: "bg-white",
            text: "text-orange-950",
            textSecondary: "text-orange-800",
            accent: "text-orange-700",
            border: "border-orange-400/50",
          },
      emerald: dark
        ? {
            bg: "bg-black",
            bgSecondary: "bg-[#1a1a1a]",
            text: "text-emerald-50",
            textSecondary: "text-emerald-200",
            accent: "text-emerald-300",
            border: "border-emerald-400/50",
          }
        : {
            bg: "bg-white",
            bgSecondary: "bg-white",
            text: "text-emerald-950",
            textSecondary: "text-emerald-800",
            accent: "text-emerald-700",
            border: "border-emerald-400/50",
          },
      rose: dark
        ? {
            bg: "bg-black",
            bgSecondary: "bg-[#1a1a1a]",
            text: "text-rose-50",
            textSecondary: "text-rose-200",
            accent: "text-rose-300",
            border: "border-rose-400/50",
          }
        : {
            bg: "bg-white",
            bgSecondary: "bg-white",
            text: "text-rose-950",
            textSecondary: "text-rose-800",
            accent: "text-rose-700",
            border: "border-rose-400/50",
          },
      fuchsia: dark
        ? {
            bg: "bg-black",
            bgSecondary: "bg-[#1a1a1a]",
            text: "text-fuchsia-50",
            textSecondary: "text-fuchsia-200",
            accent: "text-fuchsia-300",
            border: "border-fuchsia-400/50",
          }
        : {
            bg: "bg-white",
            bgSecondary: "bg-white",
            text: "text-fuchsia-950",
            textSecondary: "text-fuchsia-800",
            accent: "text-fuchsia-700",
            border: "border-fuchsia-400/50",
          },
      indigo: dark
        ? {
            bg: "bg-black",
            bgSecondary: "bg-[#1a1a1a]",
            text: "text-indigo-50",
            textSecondary: "text-indigo-200",
            accent: "text-indigo-300",
            border: "border-indigo-400/50",
          }
        : {
            bg: "bg-white",
            bgSecondary: "bg-white",
            text: "text-indigo-950",
            textSecondary: "text-indigo-800",
            accent: "text-indigo-700",
            border: "border-indigo-400/50",
          },
      sky: dark
        ? {
            bg: "bg-black",
            bgSecondary: "bg-[#1a1a1a]",
            text: "text-sky-50",
            textSecondary: "text-sky-200",
            accent: "text-sky-300",
            border: "border-sky-400/50",
          }
        : {
            bg: "bg-white",
            bgSecondary: "bg-white",
            text: "text-sky-950",
            textSecondary: "text-sky-800",
            accent: "text-sky-700",
            border: "border-sky-400/50",
          },
      teal: dark
        ? {
            bg: "bg-black",
            bgSecondary: "bg-[#1a1a1a]",
            text: "text-teal-50",
            textSecondary: "text-teal-200",
            accent: "text-teal-300",
            border: "border-teal-400/50",
          }
        : {
            bg: "bg-white",
            bgSecondary: "bg-white",
            text: "text-teal-950",
            textSecondary: "text-teal-800",
            accent: "text-teal-700",
            border: "border-teal-400/50",
          },
      lime: dark
        ? {
            bg: "bg-black",
            bgSecondary: "bg-[#1a1a1a]",
            text: "text-lime-50",
            textSecondary: "text-lime-200",
            accent: "text-lime-300",
            border: "border-lime-400/50",
          }
        : {
            bg: "bg-white",
            bgSecondary: "bg-white",
            text: "text-lime-950",
            textSecondary: "text-lime-800",
            accent: "text-lime-700",
            border: "border-lime-400/50",
          },
      amber: dark
        ? {
            bg: "bg-black",
            bgSecondary: "bg-[#1a1a1a]",
            text: "text-amber-50",
            textSecondary: "text-amber-200",
            accent: "text-amber-300",
            border: "border-amber-400/50",
          }
        : {
            bg: "bg-white",
            bgSecondary: "bg-white",
            text: "text-amber-950",
            textSecondary: "text-amber-800",
            accent: "text-amber-700",
            border: "border-amber-400/50",
          },
      custom: dark
        ? {
            bg: "bg-black",
            bgSecondary: "bg-[#1a1a1a]",
            text: "text-white",
            textSecondary: "text-gray-300",
            accent: "text-white",
            border: "border-white/30",
          }
        : {
            bg: "bg-white",
            bgSecondary: "bg-white",
            text: "text-gray-900",
            textSecondary: "text-gray-700",
            accent: "text-gray-900",
            border: "border-gray-900/50",
          },
    };
    return base[theme];
  };

  const colors = getColors(themeColor, isDarkMode);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={`inline-flex items-center justify-center rounded-md border-2 ${colors.border} ${colors.accent} h-7 w-7 p-0 transition-colors`}
        title="Hướng dẫn sử dụng"
      >
        <HelpCircle className="h-3 w-3" />
      </DialogTrigger>
      <DialogContent
        className={`${colors.bg} ${colors.text} max-w-2xl max-h-[85vh] overflow-y-auto`}
      >
        <DialogHeader>
          <DialogTitle className={`${colors.accent} flex items-center gap-2`}>
            <HelpCircle className="h-5 w-5" />
            Hướng dẫn sử dụng Fluxmare
          </DialogTitle>
          <DialogDescription className={colors.textSecondary}>
            Tìm hiểu cách sử dụng chatbot phân tích nhiên liệu tàu thủy
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <Accordion type="single" collapsible className="space-y-2">
            {/* 1. Giới thiệu */}
            <AccordionItem
              value="intro"
              className={`border-2 ${colors.border} rounded-lg px-3`}
            >
              <AccordionTrigger className={`${colors.text} hover:no-underline`}>
                <div className="flex items-center gap-2">
                  <Ship className={`h-4 w-4 ${colors.accent}`} />
                  <span className="text-sm">1. Giới thiệu Fluxmare</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-xs space-y-2 pt-2">
                <p className={colors.textSecondary}>
                  Fluxmare là hệ thống phân tích{" "}
                  <strong>Total.MomentaryFuel (kg/s)</strong> - tiêu thụ nhiên
                  liệu tức thời cho tàu thủy dựa trên 10 đặc trưng môi trường và
                  vận hành.
                </p>
                <div className="space-y-1">
                  <p className={colors.accent}>🚢 5 loại tàu được hỗ trợ:</p>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>
                      <strong>Tàu hỗn hợp (Diverse)</strong> - Tàu dịch vụ, kéo,
                      cá, công vụ (tiêu thụ thấp)
                    </li>
                    <li>
                      <strong>Tàu đa năng (MPV)</strong> - Multi-purpose vessel,
                      chở hàng tổng hợp + container
                    </li>
                    <li>
                      <strong>Tàu chở dầu (Tanker)</strong> - Chở dầu, khí, hóa
                      chất lỏng (tiêu thụ cao)
                    </li>
                    <li>
                      <strong>Tàu khách-xe (RoPax)</strong> - Ferry chở hành
                      khách và xe (hoạt động nhiều)
                    </li>
                    <li>
                      <strong>Tàu container</strong> - Tốc độ cao 20-25 knots,
                      tiêu thụ nhiên liệu lớn
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 2. Cách nhập dữ liệu */}
            <AccordionItem
              value="input"
              className={`border-2 ${colors.border} rounded-lg px-3`}
            >
              <AccordionTrigger className={`${colors.text} hover:no-underline`}>
                <div className="flex items-center gap-2">
                  <TrendingDown className={`h-4 w-4 ${colors.accent}`} />
                  <span className="text-sm">2. Cách nhập dữ liệu</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-xs space-y-2 pt-2">
                <p className={colors.accent}>⚠️ Bắt buộc nhập đủ 4 trường:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>
                    <strong>Type</strong>: Chọn 1 trong 5 loại tàu (diverse,
                    mpv, tanker, ropax, container)
                  </li>
                  <li>
                    <strong>Datetime</strong>: Thời gian phân tích (mỗi 15 phút
                    1 lần)
                  </li>
                  <li>
                    <strong>Speed_calc</strong>: Tốc độ tàu (knots), từ 0-30
                    knots
                  </li>
                  <li>
                    <strong>Distance</strong>: Quãng đường di chuyển (nautical
                    miles)
                  </li>
                </ul>

                <div
                  className={`${colors.bgSecondary} border ${colors.border} rounded p-2 mt-2`}
                >
                  <p className={colors.accent}>💡 Mẹo:</p>
                  <ul className="list-disc ml-5 space-y-1 mt-1">
                    <li>Nhấn "Ẩn Form" để chỉ chat text đơn giản</li>
                    <li>Tốc độ thấp hơn = tiết kiệm nhiên liệu (Speed^2.8)</li>
                    <li>Theo dõi mỗi 15 phút để phát hiện bất thường sớm</li>
                    <li>Dataset có dữ liệu thực từ 5 loại tàu khác nhau</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 3. Đọc hiểu Dashboard */}
            <AccordionItem
              value="dashboard"
              className={`border-2 ${colors.border} rounded-lg px-3`}
            >
              <AccordionTrigger className={`${colors.text} hover:no-underline`}>
                <div className="flex items-center gap-2">
                  <BarChart3 className={`h-4 w-4 ${colors.accent}`} />
                  <span className="text-sm">3. Đọc hiểu Dashboard</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-xs space-y-2 pt-2">
                <p className={colors.textSecondary}>
                  Sau khi nhập đủ 4 trường, nhấn "Dashboard" để xem phân tích
                  chi tiết:
                </p>

                <div className="space-y-2">
                  <p className={colors.accent}>📊 Các chỉ số quan trọng:</p>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>
                      <strong>Fuel Consumption</strong>: Tổng nhiên liệu tiêu
                      thụ (kg và tons)
                    </li>
                    <li>
                      <strong>Chi phí ước tính</strong>: Tính theo $0.65/kg (có
                      thể thay đổi)
                    </li>
                    <li>
                      <strong>Avg rate</strong>: Tiêu thụ trung bình trên mỗi
                      nautical mile (kg/nm)
                    </li>
                    <li>
                      <strong>Hiệu suất</strong>: 0-100%, càng cao càng tốt
                    </li>
                  </ul>

                  <p className={colors.accent}>📈 Biểu đồ:</p>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>
                      <strong>Time Series</strong>: Tiêu thụ nhiên liệu theo
                      thời gian (mỗi 15 phút)
                    </li>
                    <li>
                      <strong>Speed vs Consumption</strong>: Mối quan hệ tốc độ
                      và tiêu thụ (Speed^2.8)
                    </li>
                    <li>
                      <strong>So sánh Current vs Optimal</strong>: So với điều
                      kiện tối ưu
                    </li>
                  </ul>

                  <p className={colors.accent}>💡 Khuyến nghị:</p>
                  <p className={colors.textSecondary}>
                    Hệ thống sẽ tự động đưa ra khuyến nghị tối ưu hóa dựa trên
                    dữ liệu của bạn.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 4. Tính năng khác */}
            <AccordionItem
              value="features"
              className={`border-2 ${colors.border} rounded-lg px-3`}
            >
              <AccordionTrigger className={`${colors.text} hover:no-underline`}>
                <div className="flex items-center gap-2">
                  <Star className={`h-4 w-4 ${colors.accent}`} />
                  <span className="text-sm">4. Tính năng khác</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-xs space-y-2 pt-2">
                <ul className="list-disc ml-5 space-y-1">
                  <li>
                    <strong>💡 Gợi ý thông minh</strong>: Nhấn biểu tượng 💡 để
                    xem câu hỏi mẫu
                  </li>
                  <li>
                    <strong>⭐ Yêu thích</strong>: Đánh dấu cuộc trò chuyện quan
                    trọng
                  </li>
                  <li>
                    <strong>🗑️ Xóa cuộc trò chuyện</strong>: Hover vào item để
                    hiện nút xóa
                  </li>
                  <li>
                    <strong>📥 Xuất dữ liệu</strong>: Download lịch sử chat dạng
                    text
                  </li>
                  <li>
                    <strong>🔍 Tìm kiếm</strong>: Tìm nhanh trong lịch sử phân
                    tích
                  </li>
                  <li>
                    <strong>🎨 Theme màu sắc</strong>: Chọn từ 6 theme khác nhau
                  </li>
                  <li>
                    <strong>⚙️ Cài đặt</strong>: Tùy chỉnh giao diện, font size,
                    thông báo
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* 5. Mẹo tối ưu hóa */}
            <AccordionItem
              value="tips"
              className={`border-2 ${colors.border} rounded-lg px-3`}
            >
              <AccordionTrigger className={`${colors.text} hover:no-underline`}>
                <div className="flex items-center gap-2">
                  <Lightbulb className={`h-4 w-4 ${colors.accent}`} />
                  <span className="text-sm">5. Mẹo tối ưu hóa nhiên liệu</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-xs space-y-2 pt-2">
                <div className="space-y-2">
                  <p className={colors.accent}>
                    🎯 Chiến lược tiết kiệm nhiên liệu:
                  </p>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>
                      <strong>Speed Optimization</strong>: Giảm tốc độ 10-20% →
                      tiết kiệm 30-40%
                    </li>
                    <li>
                      <strong>Route Planning</strong>: Tối ưu tuyến đường, tránh
                      sóng lớn
                    </li>
                    <li>
                      <strong>Weather Routing</strong>: Tránh sóng lớn, dòng hải
                      lưu ngược
                    </li>
                    <li>
                      <strong>Regular Maintenance</strong>: Bảo dưỡng định kỳ,
                      vệ sinh thân tàu
                    </li>
                    <li>
                      <strong>Data Monitoring</strong>: Theo dõi mỗi 15 phút để
                      phát hiện vấn đề
                    </li>
                  </ul>

                  <div
                    className={`${colors.bgSecondary} border ${colors.border} rounded p-2 mt-2`}
                  >
                    <p className={colors.accent}>⚡ Tối ưu Fuel Consumption:</p>
                    <ul className="list-none ml-0 space-y-1 mt-1 text-[10px]">
                      <li>
                        🟢 <strong>Tốc độ thấp</strong>: Giảm Speed 10-20% →
                        tiết kiệm 30-40%
                      </li>
                      <li>
                        🟡 <strong>Tuyến đường</strong>: Tránh sóng lớn, chọn
                        tuyến ngắn nhất
                      </li>
                      <li>
                        🟠 <strong>Bảo dưỡng</strong>: Vệ sinh thân tàu, kiểm
                        tra động cơ định kỳ
                      </li>
                      <li>
                        🔴 <strong>Tải trọng</strong>: Phân phối tải đều, không
                        quá tải
                      </li>
                      <li>
                        🔵 <strong>Giám sát</strong>: Theo dõi mỗi 15 phút để
                        phát hiện sớm
                      </li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div
            className={`mt-4 p-3 ${colors.bgSecondary} border-2 ${colors.border} rounded-lg`}
          >
            <p className={`text-xs ${colors.accent}`}>
              💬 Cần hỗ trợ thêm? Hãy sử dụng form phân tích hoặc hỏi trực tiếp
              trong chat!
            </p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
