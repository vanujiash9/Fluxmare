import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/layout/card";
import { Button } from "@/components/ui/controls/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  GitCompare,
  Fuel,
  Gauge,
  Ship,
  Check,
  X,
  ArrowLeft,
  Download,
  Maximize2,
  Minimize2,
  Activity,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import type { ThemeColor } from "@/App";
import { Checkbox } from "@/components/ui/controls/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "motion/react";

interface HistoryItem {
  timestamp: Date;
  query: string;
  analysis: {
    fuelConsumption: number;
    fuelConsumptionTons: number;
    estimatedCost: number;
    efficiency: number;
    avgConsumptionRate: number;
    recommendation: string;
  };
  vesselInfo: {
    type: string;
    speedCalc: number;
    distance: number;
    datetime: string;
  };
}

interface ComparisonDashboardProps {
  themeColor: ThemeColor;
  isDarkMode: boolean;
  customColor?: string;
  dashboardHistory: HistoryItem[];
  onBack: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export default function ComparisonDashboard({
  themeColor,
  isDarkMode,
  customColor,
  dashboardHistory,
  onBack,
  isFullscreen = false,
  onToggleFullscreen,
}: ComparisonDashboardProps) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Get colors based on theme
  const getColors = () => {
    if (themeColor === "custom" && customColor) {
      return {
        primary: customColor,
        secondary: customColor + "80",
        bg: isDarkMode ? "bg-[#0f0f0f]" : "bg-white",
        card: isDarkMode ? "bg-[#1a1a1a]" : "bg-white",
        cardBg: isDarkMode ? "bg-[#252525]" : "bg-gray-50",
        text: isDarkMode ? "text-white" : "text-[#1a1a1a]",
        textSecondary: isDarkMode ? "text-[#b0b0b0]" : "text-[#666]",
        border: `border-[${customColor}]`,
        borderHex: customColor,
        accent: isDarkMode ? "text-white" : "text-[#1a1a1a]",
      };
    }

    const baseColor = isDarkMode ? "#8b5cf6" : "#2002a6";
    return {
      primary: baseColor,
      secondary: isDarkMode ? "#8b5cf680" : "#2002a680",
      bg: isDarkMode ? "bg-[#0f0f0f]" : "bg-white",
      card: isDarkMode ? "bg-[#1a1a1a]" : "bg-white",
      cardBg: isDarkMode ? "bg-[#252525]" : "bg-gray-50",
      text: isDarkMode ? "text-white" : "text-[#1a1a1a]",
      textSecondary: isDarkMode ? "text-[#b0b0b0]" : "text-[#666]",
      border: isDarkMode ? "border-[#8b5cf6]" : "border-[#2002a6]",
      borderHex: baseColor,
      accent: isDarkMode ? "text-white" : "text-[#1a1a1a]",
    };
  };

  const colors = getColors();

  // Toggle selection
  const toggleSelection = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else {
      if (selectedItems.length >= 5) {
        toast.error("Tối đa 5 predictions để so sánh!");
        return;
      }
      setSelectedItems([...selectedItems, index]);
    }
  };

  // Clear all selections
  const handleClearSelection = () => {
    setSelectedItems([]);
    toast.info("Đã bỏ chọn tất cả");
  };

  // Handle Export
  const handleExport = () => {
    const originalTitle = document.title;
    document.title = `Fluxmare-Comparison-${new Date()
      .toISOString()
      .slice(0, 10)}`;

    toast.info("Print Comparison", {
      id: "export",
      description: "Dashboard so sánh sẽ print full trang",
      duration: 4000,
    });

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    }, 300);
  };

  // Transform data for charts
  const comparisonData = selectedItems.map((index) => {
    const item = dashboardHistory[index];
    return {
      name: `#${dashboardHistory.length - index}`,
      fuel: item.analysis.fuelConsumption,
      efficiency: item.analysis.efficiency,
      speed: item.vesselInfo.speedCalc,
      cost: item.analysis.estimatedCost,
      timestamp: new Date(item.timestamp).toLocaleString("vi-VN", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  });

  return (
    <div className={`h-full overflow-hidden flex flex-col ${colors.bg}`}>
      {/* Header */}
      <motion.div
        className={`p-4 border-b-2 ${colors.border} flex items-center justify-between flex-shrink-0`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-3">
          <Button
            onClick={onBack}
            size="sm"
            variant="outline"
            className={`h-7 text-xs border-2 ${colors.border}`}
            style={
              themeColor === "custom"
                ? { borderColor: colors.borderHex + "80" }
                : {}
            }
          >
            <ArrowLeft className="h-3 w-3 mr-1" />
            Quay lại
          </Button>
        </div>

        <div className="flex gap-2">
          {onToggleFullscreen && (
            <Button
              onClick={onToggleFullscreen}
              size="sm"
              variant="outline"
              className={`h-7 text-xs border-2 ${colors.border}`}
              style={
                themeColor === "custom"
                  ? { borderColor: colors.borderHex + "80" }
                  : {}
              }
              title={isFullscreen ? "Thu nhỏ" : "Toàn màn hình"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="h-3 w-3 mr-1" />
                  Thu nhỏ
                </>
              ) : (
                <>
                  <Maximize2 className="h-3 w-3 mr-1" />
                  Fullscreen
                </>
              )}
            </Button>
          )}

          <Button
            onClick={handleExport}
            size="sm"
            variant="outline"
            className={`h-7 text-xs border-2 ${colors.border}`}
            style={
              themeColor === "custom"
                ? { borderColor: colors.borderHex + "80" }
                : {}
            }
            disabled={selectedItems.length === 0}
          >
            <Download className="h-3 w-3 mr-1" />
            Print/PDF
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left: History Selection */}
        <motion.div
          className={`w-80 border-r-2 ${colors.border} flex flex-col flex-shrink-0`}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div
            className={`p-3 border-b ${colors.border} flex items-center justify-between`}
          >
            <h3 className={`text-sm ${colors.text}`}>
              Lịch Sử ({dashboardHistory.length})
            </h3>
            {selectedItems.length > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleClearSelection}
                className="h-6 text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Bỏ chọn
              </Button>
            )}
          </div>

          <ScrollArea className="flex-1">
            <div className="p-3 space-y-2">
              {dashboardHistory.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedItems.includes(index)
                      ? `${colors.border} ${colors.cardBg}`
                      : `border-gray-300 ${
                          isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
                        } hover:border-gray-400`
                  }`}
                  onClick={() => toggleSelection(index)}
                >
                  <div className="flex items-start gap-2">
                    <Checkbox
                      checked={selectedItems.includes(index)}
                      onCheckedChange={() => toggleSelection(index)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs ${colors.text}`}>
                          #{dashboardHistory.length - index}
                        </span>
                        <span
                          className={`text-[10px] ${
                            isDarkMode ? "text-[#888]" : "text-gray-500"
                          }`}
                        >
                          {new Date(item.timestamp).toLocaleString("vi-VN", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p
                        className={`text-[10px] truncate mb-2 ${colors.text}`}
                        title={item.query}
                      >
                        {item.query}
                      </p>
                      <div
                        className={`grid grid-cols-2 gap-1 text-[9px] ${colors.textSecondary}`}
                      >
                        <div>
                          <Fuel className="h-2 w-2 inline mr-1" />
                          {item.analysis.fuelConsumption.toFixed(1)} kg
                        </div>
                        <div>
                          <Gauge className="h-2 w-2 inline mr-1" />
                          {item.analysis.efficiency}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {dashboardHistory.length === 0 && (
                <div className={`text-center py-8 ${colors.textSecondary}`}>
                  <Ship className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Chưa có lịch sử dashboard</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </motion.div>

        {/* Right: Comparison Dashboard */}
        <div className="flex-1 overflow-y-auto">
          {selectedItems.length === 0 ? (
            <div
              className={`flex flex-col items-center justify-center h-full ${colors.textSecondary}`}
            >
              <GitCompare className="h-16 w-16 mb-4 opacity-30" />
              <p className="text-sm">Chọn ít nhất 1 prediction để so sánh</p>
              <p className="text-xs mt-1">Tối đa 5 predictions</p>
            </div>
          ) : (
            <div
              ref={dashboardRef}
              data-print-dashboard
              className="p-4 space-y-4"
            >
              {/* Print Header */}
              <div className="hidden print:block mb-4 border-b-2 pb-2 print:!border-gray-300">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Ship className="h-5 w-5 print:!text-gray-800" />
                      <h1 className="print:!text-gray-900">
                        Fluxmare Comparison Report
                      </h1>
                    </div>
                    <p className="text-xs print:!text-gray-600 mt-1">
                      So sánh {selectedItems.length} predictions
                    </p>
                  </div>
                  <div className="text-xs print:!text-gray-600">
                    {new Date().toLocaleString("vi-VN")}
                  </div>
                </div>
              </div>

              {/* Fuel Consumption Comparison - Compact */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <Card className={`border-2 ${colors.border} ${colors.card}`}>
                  <CardHeader className={`${colors.cardBg} p-2`}>
                    <CardTitle className="text-xs flex items-center gap-2">
                      <Fuel className="h-3 w-3" />
                      So Sánh Tiêu Thụ Nhiên Liệu
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <ResponsiveContainer width="100%" height={160}>
                      <BarChart
                        data={comparisonData}
                        margin={{ top: 5, right: 5, left: -15, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis
                          dataKey="name"
                          stroke={isDarkMode ? "#e5e5e5" : "#1a1a1a"}
                          tick={{ fontSize: 9 }}
                        />
                        <YAxis
                          stroke={isDarkMode ? "#e5e5e5" : "#1a1a1a"}
                          tick={{ fontSize: 9 }}
                          width={35}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDarkMode ? "#1a1a1a" : "#fff",
                            border: `1px solid ${colors.primary}`,
                            fontSize: "9px",
                            padding: "4px 8px",
                          }}
                          formatter={(value: number) => [
                            `${value.toFixed(1)} kg`,
                            "Fuel",
                          ]}
                        />
                        <Bar
                          dataKey="fuel"
                          fill={colors.primary}
                          radius={[4, 4, 0, 0]}
                          maxBarSize={50}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Efficiency & Speed Comparison - Beautiful */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <Card className={`border ${colors.border} ${colors.card}`}>
                  <CardHeader className="p-3 pb-2">
                    <CardTitle
                      className={`text-sm flex items-center gap-2 ${colors.text}`}
                    >
                      <Gauge className="h-4 w-4" />
                      Hiệu Suất & Tốc Độ
                    </CardTitle>
                    <p
                      className={`text-[10px] ${
                        isDarkMode ? "text-[#9ca3af]" : "text-gray-600"
                      } mt-0.5`}
                    >
                      Performance metrics comparison
                    </p>
                  </CardHeader>
                  <CardContent className="p-3 pt-2">
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart
                        data={comparisonData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={isDarkMode ? "#2a2a2a" : "#e5e5e5"}
                          opacity={0.7}
                        />
                        <XAxis
                          dataKey="name"
                          stroke={isDarkMode ? "#666" : "#999"}
                          tick={{
                            fontSize: 11,
                            fill: isDarkMode ? "#a0a0a0" : "#1a1a1a",
                          }}
                          axisLine={{ stroke: isDarkMode ? "#3a3a3a" : "#ccc" }}
                        />
                        <YAxis
                          stroke={isDarkMode ? "#666" : "#999"}
                          tick={{
                            fontSize: 10,
                            fill: isDarkMode ? "#a0a0a0" : "#1a1a1a",
                          }}
                          width={40}
                          axisLine={{ stroke: isDarkMode ? "#3a3a3a" : "#ccc" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDarkMode ? "#252525" : "#fff",
                            border: `2px solid ${
                              isDarkMode ? "#8b5cf6" : colors.primary
                            }`,
                            borderRadius: "8px",
                            fontSize: "11px",
                            padding: "8px 12px",
                            boxShadow: isDarkMode
                              ? "0 4px 20px rgba(0,0,0,0.5)"
                              : "0 4px 12px rgba(0,0,0,0.15)",
                            color: isDarkMode ? "#e5e5e5" : "#1a1a1a",
                          }}
                          labelStyle={{
                            fontWeight: 600,
                            marginBottom: "4px",
                            color: isDarkMode ? "#e5e5e5" : "#1a1a1a",
                          }}
                        />
                        <Legend
                          wrapperStyle={{
                            fontSize: "11px",
                            paddingTop: "10px",
                            color: isDarkMode ? "#a0a0a0" : "#666",
                          }}
                          iconSize={12}
                          iconType="line"
                        />
                        <Line
                          type="monotone"
                          dataKey="efficiency"
                          stroke={isDarkMode ? "#8b5cf6" : colors.primary}
                          strokeWidth={2.5}
                          name="Efficiency (%)"
                          dot={{
                            r: 4,
                            fill: isDarkMode ? "#8b5cf6" : colors.primary,
                            strokeWidth: 2,
                            stroke: isDarkMode ? "#6d28d9" : colors.primary,
                          }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="speed"
                          stroke={isDarkMode ? "#f59e0b" : "#d97706"}
                          strokeWidth={2.5}
                          name="Speed (kn)"
                          dot={{
                            r: 4,
                            fill: isDarkMode ? "#f59e0b" : "#d97706",
                            strokeWidth: 2,
                            stroke: isDarkMode ? "#d97706" : "#d97706",
                          }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Detailed Table - Beautiful */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className={`border ${colors.border} ${colors.card}`}>
                  <CardHeader className="p-3 pb-2">
                    <CardTitle
                      className={`text-sm flex items-center gap-2 ${colors.text}`}
                    >
                      <Ship className="h-4 w-4" />
                      Chi Tiết So Sánh
                    </CardTitle>
                    <p
                      className={`text-[10px] ${
                        isDarkMode ? "text-[#9ca3af]" : "text-gray-600"
                      } mt-0.5`}
                    >
                      Detailed metrics breakdown
                    </p>
                  </CardHeader>
                  <CardContent className="p-3 pt-2">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr
                            className={`border-b ${
                              isDarkMode
                                ? "border-[#3a3a3a]"
                                : "border-gray-300"
                            }`}
                          >
                            <th
                              className={`text-left py-2 pr-3 ${colors.text}`}
                            >
                              #
                            </th>
                            <th
                              className={`text-right py-2 px-3 ${colors.text}`}
                            >
                              Fuel (kg)
                            </th>
                            <th
                              className={`text-right py-2 px-3 ${colors.text}`}
                            >
                              Efficiency
                            </th>
                            <th
                              className={`text-right py-2 px-3 ${colors.text}`}
                            >
                              Speed
                            </th>
                            <th
                              className={`text-right py-2 pl-3 ${colors.text}`}
                            >
                              Cost ($)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonData.map((item, idx) => (
                            <tr
                              key={idx}
                              className={`border-b ${
                                isDarkMode
                                  ? "border-[#2a2a2a]"
                                  : "border-gray-200"
                              } hover:bg-[#252525] dark:hover:bg-[#252525] transition-all`}
                            >
                              <td className={`py-2.5 pr-3 ${colors.text}`}>
                                {item.name}
                              </td>
                              <td
                                className={`text-right py-2.5 px-3 font-mono ${colors.text}`}
                              >
                                {item.fuel.toFixed(1)}
                              </td>
                              <td className="text-right py-2.5 px-3">
                                <div className="flex items-center justify-end gap-2">
                                  <div
                                    className={`h-1.5 w-12 ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a]"
                                        : "bg-gray-200"
                                    } rounded-full overflow-hidden`}
                                  >
                                    <div
                                      className="h-full rounded-full transition-all"
                                      style={{
                                        width: `${item.efficiency}%`,
                                        backgroundColor: isDarkMode
                                          ? "#8b5cf6"
                                          : colors.primary,
                                      }}
                                    />
                                  </div>
                                  <span className={colors.text}>
                                    {item.efficiency}%
                                  </span>
                                </div>
                              </td>
                              <td
                                className={`text-right py-2.5 px-3 ${colors.text}`}
                              >
                                {item.speed.toFixed(1)} kn
                              </td>
                              <td
                                className={`text-right py-2.5 pl-3 ${colors.text}`}
                              >
                                ${item.cost.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* AI Insights Analysis - Moved to Bottom */}
              {selectedItems.length === 1 ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <Card
                    className={`border ${colors.border} ${colors.card} ${
                      isDarkMode
                        ? "bg-gradient-to-br from-[#1a1a2e] to-[#16213e]"
                        : "bg-gradient-to-br from-blue-50 to-purple-50"
                    }`}
                  >
                    <CardHeader className="p-3 pb-2">
                      <CardTitle
                        className={`text-sm flex items-center gap-2 ${colors.text}`}
                      >
                        <Activity className="h-4 w-4" />
                        AI Phân Tích
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-2 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div
                          className={`p-2.5 rounded-lg ${
                            isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
                          } border ${colors.border}`}
                        >
                          <div
                            className={`text-[10px] ${
                              isDarkMode ? "text-[#9ca3af]" : "text-gray-600"
                            } mb-1`}
                          >
                            Fuel Consumption
                          </div>
                          <div className={`text-base ${colors.text}`}>
                            {comparisonData[0].fuel.toFixed(1)} kg
                          </div>
                        </div>
                        <div
                          className={`p-2.5 rounded-lg ${
                            isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
                          } border ${colors.border}`}
                        >
                          <div
                            className={`text-[10px] ${
                              isDarkMode ? "text-[#9ca3af]" : "text-gray-600"
                            } mb-1`}
                          >
                            Efficiency
                          </div>
                          <div className={`text-base ${colors.text}`}>
                            {comparisonData[0].efficiency}%
                          </div>
                        </div>
                        <div
                          className={`p-2.5 rounded-lg ${
                            isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
                          } border ${colors.border}`}
                        >
                          <div
                            className={`text-[10px] ${
                              isDarkMode ? "text-[#9ca3af]" : "text-gray-600"
                            } mb-1`}
                          >
                            Speed
                          </div>
                          <div className={`text-base ${colors.text}`}>
                            {comparisonData[0].speed.toFixed(1)} kn
                          </div>
                        </div>
                        <div
                          className={`p-2.5 rounded-lg ${
                            isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
                          } border ${colors.border}`}
                        >
                          <div
                            className={`text-[10px] ${
                              isDarkMode ? "text-[#9ca3af]" : "text-gray-600"
                            } mb-1`}
                          >
                            Cost
                          </div>
                          <div className={`text-base ${colors.text}`}>
                            ${comparisonData[0].cost.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`p-2.5 rounded-lg border ${
                          isDarkMode
                            ? "border-blue-500 bg-[#0d1829]"
                            : "border-blue-300 bg-blue-50"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <Activity
                            className={`h-4 w-4 mt-0.5 ${
                              isDarkMode ? "text-blue-400" : "text-blue-500"
                            }`}
                          />
                          <p
                            className={`text-[10px] leading-relaxed ${
                              isDarkMode ? "text-blue-200" : "text-blue-800"
                            }`}
                          >
                            💡 <strong>Gợi ý:</strong> Chọn thêm predictions để
                            so sánh và nhận AI insights chi tiết về tối ưu hóa
                            nhiên liệu, hiệu suất và chi phí.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                selectedItems.length > 1 &&
                (() => {
                  const fuelValues = comparisonData.map((d) => d.fuel);
                  const efficiencyValues = comparisonData.map(
                    (d) => d.efficiency
                  );
                  const speedValues = comparisonData.map((d) => d.speed);
                  const costValues = comparisonData.map((d) => d.cost);

                  const maxFuel = Math.max(...fuelValues);
                  const minFuel = Math.min(...fuelValues);
                  const avgFuel =
                    fuelValues.reduce((a, b) => a + b, 0) / fuelValues.length;
                  const avgEfficiency =
                    efficiencyValues.reduce((a, b) => a + b, 0) /
                    efficiencyValues.length;
                  const avgSpeed =
                    speedValues.reduce((a, b) => a + b, 0) / speedValues.length;

                  const maxIdx = comparisonData.findIndex(
                    (d) => d.fuel === maxFuel
                  );
                  const minIdx = comparisonData.findIndex(
                    (d) => d.fuel === minFuel
                  );
                  const bestEffIdx = comparisonData.findIndex(
                    (d) => d.efficiency === Math.max(...efficiencyValues)
                  );

                  // AI Scoring & Analysis
                  const predictions = comparisonData.map((d, idx) => ({
                    ...d,
                    score:
                      d.efficiency * 0.4 +
                      (1 - d.fuel / maxFuel) * 100 * 0.35 +
                      (d.speed / Math.max(...speedValues)) * 100 * 0.25,
                    fuelPerSpeed: d.fuel / d.speed,
                  }));

                  const bestPrediction = predictions.reduce((best, curr) =>
                    curr.score > best.score ? curr : best
                  );
                  const difference = maxFuel - minFuel;
                  const percentDiffNum = (difference / minFuel) * 100;
                  const percentDiff = percentDiffNum.toFixed(1);

                  // AI Analysis Text - Simulating chatbot response
                  const generateAIAnalysis = () => {
                    const insights = [];

                    // Main comparison insight
                    insights.push(
                      `Dựa trên phân tích ${selectedItems.length} predictions, tôi nhận thấy:`
                    );

                    // Fuel consumption analysis
                    if (percentDiffNum > 20) {
                      insights.push(
                        `\n📊 **Phân tích tiêu thụ nhiên liệu:**\nChênh lệch đáng kể ${percentDiff}% giữa các predictions cho thấy có nhiều cơ hội tối ưu. Prediction ${
                          bestPrediction.name
                        } là lựa chọn tốt nhất với score ${bestPrediction.score.toFixed(
                          0
                        )}/100, có thể giúp tiết kiệm ${difference.toFixed(
                          0
                        )}kg nhiên liệu so với ${comparisonData[maxIdx].name}.`
                      );
                    } else if (percentDiffNum > 10) {
                      insights.push(
                        `\n📊 **Phân tích tiêu thụ nhiên liệu:**\nCó sự chênh lệch ${percentDiff}% giữa các predictions. Prediction ${
                          bestPrediction.name
                        } vẫn là lựa chọn tối ưu nhất với khả năng tiết kiệm ${difference.toFixed(
                          0
                        )}kg.`
                      );
                    }

                    // Efficiency analysis
                    if (avgEfficiency < 70) {
                      insights.push(
                        `\n⚠️ **Cảnh báo hiệu suất:**\nHiệu suất trung bình chỉ ${avgEfficiency.toFixed(
                          1
                        )}% - thấp hơn ngưỡng khuyến nghị (75%). Đề xuất kiểm tra:\n- Điều kiện thời tiết và sóng biển\n- Tình trạng vỏ tàu (fouling)\n- Cài đặt động cơ và tốc độ vận hành\n- Xem xét giảm tốc độ 10-15% để cải thiện efficiency`
                      );
                    } else if (avgEfficiency < 80) {
                      insights.push(
                        `\n✅ **Hiệu suất:**\nHiệu suất trung bình ${avgEfficiency.toFixed(
                          1
                        )}% nằm trong khoảng chấp nhận được. Vẫn có thể tối ưu thêm bằng cách điều chỉnh tốc độ và route.`
                      );
                    } else {
                      insights.push(
                        `\n✅ **Hiệu suất xuất sắc:**\nHiệu suất trung bình đạt ${avgEfficiency.toFixed(
                          1
                        )}% - rất tốt! Duy trì các thông số vận hành hiện tại.`
                      );
                    }

                    // Speed optimization
                    const speedVariation =
                      Math.max(...speedValues) - Math.min(...speedValues);
                    if (speedVariation > 5) {
                      const optimalSpeed = predictions.reduce((best, curr) =>
                        curr.fuelPerSpeed < best.fuelPerSpeed ? curr : best
                      );
                      const fuelSavingPercent = (
                        ((maxFuel - optimalSpeed.fuel) / maxFuel) *
                        100
                      ).toFixed(1);
                      insights.push(
                        `\n🎯 **Tối ưu tốc độ:**\nTốc độ tối ưu nhất: ${optimalSpeed.speed.toFixed(
                          1
                        )} knots (${
                          optimalSpeed.name
                        })\n- Fuel consumption: ${optimalSpeed.fuel.toFixed(
                          1
                        )} kg\n- Tiết kiệm: ~${fuelSavingPercent}% so với tốc độ cao nhất\n- Trade-off: Thời gian di chuyển có thể tăng nhưng chi phí giảm đáng kể`
                      );
                    }

                    // Final recommendation
                    insights.push(
                      `\n💡 **Khuyến nghị cuối cùng:**\nÁp dụng profile ${
                        bestPrediction.name
                      } để đạt hiệu quả tối ưu. Profile này cân bằng tốt giữa fuel efficiency (${
                        comparisonData.find(
                          (d) => d.name === bestPrediction.name
                        )?.efficiency
                      }%), tốc độ (${bestPrediction.speed.toFixed(
                        1
                      )} kn), và chi phí (${bestPrediction.cost.toLocaleString()}).`
                    );

                    return insights.join("\n");
                  };

                  const aiAnalysisText = generateAIAnalysis();

                  return (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.35 }}
                    >
                      <Card
                        className={`border ${colors.border} ${colors.card} ${
                          isDarkMode
                            ? "bg-gradient-to-br from-[#1a1a2e] to-[#16213e]"
                            : "bg-gradient-to-br from-blue-50 to-purple-50"
                        }`}
                      >
                        <CardHeader className="p-3 pb-2">
                          <CardTitle
                            className={`text-sm flex items-center gap-2 ${colors.text}`}
                          >
                            <Activity className="h-4 w-4" />
                            🤖 AI Phân Tích & Đề Xuất
                          </CardTitle>
                          <p
                            className={`text-[10px] ${
                              isDarkMode ? "text-[#9ca3af]" : "text-gray-600"
                            } mt-1`}
                          >
                            Insights dựa trên phân tích {selectedItems.length}{" "}
                            predictions
                          </p>
                        </CardHeader>
                        <CardContent className="p-3 pt-2 space-y-3">
                          {/* Stats Grid */}
                          <div className="grid grid-cols-3 gap-2">
                            <div
                              className={`p-2.5 rounded-lg ${
                                isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
                              } border ${colors.border}`}
                            >
                              <div
                                className={`text-[10px] ${
                                  isDarkMode
                                    ? "text-[#9ca3af]"
                                    : "text-gray-600"
                                } mb-1`}
                              >
                                Cao nhất
                              </div>
                              <div className={`text-sm ${colors.text}`}>
                                {maxFuel.toFixed(1)}
                              </div>
                              <div
                                className={`text-[9px] ${
                                  isDarkMode ? "text-[#888]" : "text-gray-500"
                                }`}
                              >
                                {comparisonData[maxIdx].name}
                              </div>
                            </div>
                            <div
                              className={`p-2.5 rounded-lg ${
                                isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
                              } border ${colors.border}`}
                            >
                              <div
                                className={`text-[10px] ${
                                  isDarkMode
                                    ? "text-[#9ca3af]"
                                    : "text-gray-600"
                                } mb-1`}
                              >
                                Thấp nhất
                              </div>
                              <div className={`text-sm ${colors.text}`}>
                                {minFuel.toFixed(1)}
                              </div>
                              <div
                                className={`text-[9px] ${
                                  isDarkMode ? "text-[#888]" : "text-gray-500"
                                }`}
                              >
                                {comparisonData[minIdx].name}
                              </div>
                            </div>
                            <div
                              className={`p-2.5 rounded-lg ${
                                isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
                              } border ${colors.border}`}
                            >
                              <div
                                className={`text-[10px] ${
                                  isDarkMode
                                    ? "text-[#9ca3af]"
                                    : "text-gray-600"
                                } mb-1`}
                              >
                                Best Overall
                              </div>
                              <div className={`text-sm ${colors.text}`}>
                                {bestPrediction.score.toFixed(0)}
                              </div>
                              <div
                                className={`text-[9px] ${
                                  isDarkMode ? "text-[#888]" : "text-gray-500"
                                }`}
                              >
                                {bestPrediction.name}
                              </div>
                            </div>
                          </div>

                          {/* AI Analysis Text */}
                          <div
                            className={`p-3 rounded-lg border-2 ${colors.border} ${colors.card}`}
                          >
                            <div className="flex items-start gap-2 mb-2">
                              <Activity
                                className="h-4 w-4 mt-0.5"
                                style={{ color: colors.primary }}
                              />
                              <h4 className={`text-xs ${colors.text}`}>
                                Phân Tích Chi Tiết
                              </h4>
                            </div>
                            <div
                              className={`text-[10px] leading-relaxed ${colors.text} whitespace-pre-wrap space-y-2`}
                            >
                              {aiAnalysisText.split("\n").map((line, idx) => {
                                if (line.trim() === "") return null;

                                // Format bold text
                                const formattedLine = line
                                  .split("**")
                                  .map((part, i) =>
                                    i % 2 === 1 ? (
                                      <strong key={i}>{part}</strong>
                                    ) : (
                                      part
                                    )
                                  );

                                return (
                                  <p
                                    key={idx}
                                    className={
                                      line.startsWith("📊") ||
                                      line.startsWith("⚠️") ||
                                      line.startsWith("✅") ||
                                      line.startsWith("🎯") ||
                                      line.startsWith("💡")
                                        ? "mt-2"
                                        : ""
                                    }
                                  >
                                    {formattedLine}
                                  </p>
                                );
                              })}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })()
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
