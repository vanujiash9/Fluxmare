import { motion, AnimatePresence } from "motion/react";
import { BarChart3, Clock, TrendingUp, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardData } from "../utils/mockData";

interface DashboardHistoryProps {
  dashboards: Array<{
    id: string;
    messageId: string;
    title: string;
    timestamp: Date;
    data: DashboardData;
  }>;
  onSelectDashboard: (data: DashboardData) => void;
  onClose: () => void;
  isDarkMode: boolean;
  accentColor: string;
}

export default function DashboardHistory({
  dashboards,
  onSelectDashboard,
  onClose,
  isDarkMode,
  accentColor,
}: DashboardHistoryProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;

    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl rounded-2xl shadow-2xl ${
          isDarkMode ? "bg-slate-900" : "bg-white"
        }`}
        style={{
          maxHeight: "80vh",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{
            borderColor: isDarkMode
              ? "rgba(51, 65, 85, 0.5)"
              : "rgba(226, 232, 240, 0.5)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: `${accentColor}20`,
                color: accentColor,
              }}
            >
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h2
                className="text-lg"
                style={{ color: isDarkMode ? "#e5e5e5" : "#1a1a1a" }}
              >
                Lịch sử Dashboard
              </h2>
              <p
                className={`text-xs ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {dashboards.length} phân tích đã lưu
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className={`rounded-lg ${
              isDarkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
            }`}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="h-[calc(80vh-8rem)]">
          <div className="p-6 space-y-3">
            {dashboards.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3
                  className="h-16 w-16 mx-auto mb-4 opacity-30"
                  style={{ color: accentColor }}
                />
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Chưa có Dashboard nào được tạo
                </p>
                <p
                  className={`text-xs mt-2 ${
                    isDarkMode ? "text-slate-500" : "text-slate-500"
                  }`}
                >
                  Nhập 10 features để tạo Dashboard phân tích
                </p>
              </div>
            ) : (
              dashboards.map((dashboard, index) => (
                <motion.div
                  key={dashboard.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    isDarkMode
                      ? "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => {
                    onSelectDashboard(dashboard.data);
                    onClose();
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Title with analysis number */}
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="px-2 py-0.5 rounded text-xs"
                          style={{
                            backgroundColor: `${accentColor}20`,
                            color: accentColor,
                          }}
                        >
                          Phân tích #{dashboards.length - index}
                        </div>
                        <span
                          className={`text-xs ${
                            isDarkMode ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          <Clock className="h-3 w-3 inline mr-1" />
                          {formatDate(dashboard.timestamp)}
                        </span>
                      </div>

                      {/* Query info */}
                      <h3
                        className={`text-sm mb-2 truncate ${
                          isDarkMode ? "text-slate-200" : "text-slate-900"
                        }`}
                      >
                        {dashboard.data.query}
                      </h3>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span
                            className={
                              isDarkMode ? "text-slate-400" : "text-slate-600"
                            }
                          >
                            Nhiên liệu:
                          </span>
                          <p className="mt-0.5" style={{ color: accentColor }}>
                            {dashboard.data.analysis.fuelConsumptionTons.toFixed(
                              3
                            )}{" "}
                            tons
                          </p>
                        </div>
                        <div>
                          <span
                            className={
                              isDarkMode ? "text-slate-400" : "text-slate-600"
                            }
                          >
                            Chi phí:
                          </span>
                          <p className="mt-0.5" style={{ color: accentColor }}>
                            ${dashboard.data.analysis.estimatedCost.toFixed(0)}
                          </p>
                        </div>
                        <div>
                          <span
                            className={
                              isDarkMode ? "text-slate-400" : "text-slate-600"
                            }
                          >
                            Hiệu suất:
                          </span>
                          <p className="mt-0.5" style={{ color: accentColor }}>
                            {dashboard.data.analysis.efficiency.toFixed(0)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action button */}
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{
                        backgroundColor: `${accentColor}15`,
                      }}
                    >
                      <TrendingUp
                        className="h-4 w-4"
                        style={{ color: accentColor }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        {dashboards.length > 0 && (
          <div
            className="p-4 border-t"
            style={{
              borderColor: isDarkMode
                ? "rgba(51, 65, 85, 0.5)"
                : "rgba(226, 232, 240, 0.5)",
            }}
          >
            <p
              className={`text-xs text-center ${
                isDarkMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Click vào bất kỳ phân tích nào để xem lại Dashboard
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
