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
  Area,
  AreaChart,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Fuel,
  TrendingDown,
  TrendingUp,
  Gauge,
  Zap,
  Ship,
  AlertCircle,
  Activity,
  Target,
  Download,
  Copy,
  Check,
  GitCompare,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useState, useRef } from "react";
import type { ThemeColor } from "@/App";

interface FuelConsumptionDashboardProps {
  data: {
    query: string;
    analysis: {
      fuelConsumption: number; // kg
      fuelConsumptionTons: number; // tons
      estimatedCost: number; // USD
      efficiency: number; // 0-100
      avgConsumptionRate: number; // kg/nm
      recommendation: string;
    };
    vesselInfo: {
      type: string;
      speedCalc: number;
      distance: number;
      datetime: string;
    };
    timeSeriesData: Array<{
      time: string;
      consumption: number;
      speed: number;
    }>;
    comparison: Array<{
      metric: string;
      current: number;
      optimal: number;
    }>;
    timestamp: Date;
  };
  themeColor: ThemeColor;
  isDarkMode: boolean;
  customColor: string;
  dashboardHistory?: any[];
  onCompareMode?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export default function FuelConsumptionDashboard({
  data,
  themeColor,
  isDarkMode,
  customColor,
  dashboardHistory = [],
  onCompareMode,
  isFullscreen = false,
  onToggleFullscreen,
}: FuelConsumptionDashboardProps) {
  const { analysis, vesselInfo, timeSeriesData, comparison, query } = data;
  const [copied, setCopied] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Vessel name mapping
  const vesselNames: Record<string, string> = {
    diverse_1_tier1: "Tàu hỗn hợp (Diverse)",
    mpv_1_tier1: "Tàu đa năng (MPV)",
    tanker_1_tier1: "Tàu chở dầu (Tanker)",
    ropax_1_tier1: "Tàu khách-xe (RoPax)",
    container_1_tier1: "Tàu container",
  };

  const vesselDisplayName = vesselInfo?.type
    ? vesselNames[vesselInfo.type] || vesselInfo.type
    : "Tàu container";

  // Theme configuration
  const getColors = (theme: ThemeColor, dark: boolean) => {
    const themes = {
      default: dark
        ? {
            bg: "bg-[#0a0a0a]",
            card: "bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]",
            text: "text-white",
            accent: "text-[#e3d5f7]",
            border: "border-[#e3d5f7]/50",
            borderHex: "#e3d5f7",
            gradient: "bg-gradient-to-r from-[#e3d5f7] to-[#b8acf5]",
            cardBg: "bg-[#1a1a1a]",
            cardBorder: "border-[#e3d5f7]/30",
            secondary: "text-[#b0b0b0]",
            chartColor: "#e3d5f7",
          }
        : {
            bg: "bg-[#fafafa]",
            card: "bg-gradient-to-br from-white to-[#fafafa]",
            text: "text-[#1a1a1a]",
            accent: "text-[#2002a6]",
            border: "border-[#2002a6]/50",
            borderHex: "#2002a6",
            gradient: "bg-gradient-to-r from-[#2002a6] to-[#5b47d9]",
            cardBg: "bg-white",
            cardBorder: "border-[#2002a6]/20",
            secondary: "text-[#525252]",
            chartColor: "#2002a6",
          },
      pink: dark
        ? {
            bg: "bg-black",
            card: "bg-gradient-to-br from-[#1a1a1a] to-black",
            text: "text-white",
            accent: "text-pink-300",
            border: "border-pink-400/60",
            borderHex: "#f9a8d4",
            gradient: "bg-gradient-to-r from-pink-400 to-pink-500",
            cardBg: "bg-[#1a1a1a]",
            cardBorder: "border-pink-400/30",
            secondary: "text-pink-200",
            chartColor: "#f9a8d4",
          }
        : {
            bg: "bg-white",
            card: "bg-gradient-to-br from-white to-pink-50",
            text: "text-pink-950",
            accent: "text-pink-700",
            border: "border-pink-400/50",
            borderHex: "#db2777",
            gradient: "bg-gradient-to-r from-pink-600 to-pink-700",
            cardBg: "bg-white",
            cardBorder: "border-pink-400/20",
            secondary: "text-pink-800",
            chartColor: "#db2777",
          },
      rose: dark
        ? {
            bg: "bg-black",
            card: "bg-gradient-to-br from-[#1a1a1a] to-black",
            text: "text-white",
            accent: "text-rose-300",
            border: "border-rose-400/60",
            borderHex: "#fb7185",
            gradient: "bg-gradient-to-r from-rose-400 to-rose-500",
            cardBg: "bg-[#1a1a1a]",
            cardBorder: "border-rose-400/30",
            secondary: "text-rose-200",
            chartColor: "#fb7185",
          }
        : {
            bg: "bg-white",
            card: "bg-gradient-to-br from-white to-rose-50",
            text: "text-rose-950",
            accent: "text-rose-700",
            border: "border-rose-400/50",
            borderHex: "#e11d48",
            gradient: "bg-gradient-to-r from-rose-600 to-rose-700",
            cardBg: "bg-white",
            cardBorder: "border-rose-400/20",
            secondary: "text-rose-800",
            chartColor: "#e11d48",
          },
      fuchsia: dark
        ? {
            bg: "bg-black",
            card: "bg-gradient-to-br from-[#1a1a1a] to-black",
            text: "text-white",
            accent: "text-fuchsia-300",
            border: "border-fuchsia-400/60",
            borderHex: "#e879f9",
            gradient: "bg-gradient-to-r from-fuchsia-400 to-fuchsia-500",
            cardBg: "bg-[#1a1a1a]",
            cardBorder: "border-fuchsia-400/30",
            secondary: "text-fuchsia-200",
            chartColor: "#e879f9",
          }
        : {
            bg: "bg-white",
            card: "bg-gradient-to-br from-white to-fuchsia-50",
            text: "text-fuchsia-950",
            accent: "text-fuchsia-700",
            border: "border-fuchsia-400/50",
            borderHex: "#c026d3",
            gradient: "bg-gradient-to-r from-fuchsia-600 to-fuchsia-700",
            cardBg: "bg-white",
            cardBorder: "border-fuchsia-400/20",
            secondary: "text-fuchsia-800",
            chartColor: "#c026d3",
          },
      blue: dark
        ? {
            bg: "bg-black",
            card: "bg-gradient-to-br from-[#1a1a1a] to-black",
            text: "text-white",
            accent: "text-blue-300",
            border: "border-blue-400/60",
            borderHex: "#60a5fa",
            gradient: "bg-gradient-to-r from-blue-400 to-blue-500",
            cardBg: "bg-[#1a1a1a]",
            cardBorder: "border-blue-400/30",
            secondary: "text-blue-200",
            chartColor: "#60a5fa",
          }
        : {
            bg: "bg-white",
            card: "bg-gradient-to-br from-white to-blue-50",
            text: "text-blue-950",
            accent: "text-blue-700",
            border: "border-blue-400/50",
            borderHex: "#2563eb",
            gradient: "bg-gradient-to-r from-blue-600 to-blue-700",
            cardBg: "bg-white",
            cardBorder: "border-blue-400/20",
            secondary: "text-blue-800",
            chartColor: "#2563eb",
          },
      purple: dark
        ? {
            bg: "bg-black",
            card: "bg-gradient-to-br from-[#1a1a1a] to-black",
            text: "text-white",
            accent: "text-purple-300",
            border: "border-purple-400/60",
            borderHex: "#c084fc",
            gradient: "bg-gradient-to-r from-purple-400 to-purple-500",
            cardBg: "bg-[#1a1a1a]",
            cardBorder: "border-purple-400/30",
            secondary: "text-purple-200",
            chartColor: "#c084fc",
          }
        : {
            bg: "bg-white",
            card: "bg-gradient-to-br from-white to-purple-50",
            text: "text-purple-950",
            accent: "text-purple-700",
            border: "border-purple-400/50",
            borderHex: "#9333ea",
            gradient: "bg-gradient-to-r from-purple-600 to-purple-700",
            cardBg: "bg-white",
            cardBorder: "border-purple-400/20",
            secondary: "text-purple-800",
            chartColor: "#9333ea",
          },
      indigo: dark
        ? {
            bg: "bg-black",
            card: "bg-gradient-to-br from-[#1a1a1a] to-black",
            text: "text-white",
            accent: "text-indigo-300",
            border: "border-indigo-400/60",
            borderHex: "#a5b4fc",
            gradient: "bg-gradient-to-r from-indigo-400 to-indigo-500",
            cardBg: "bg-[#1a1a1a]",
            cardBorder: "border-indigo-400/30",
            secondary: "text-indigo-200",
            chartColor: "#a5b4fc",
          }
        : {
            bg: "bg-white",
            card: "bg-gradient-to-br from-white to-indigo-50",
            text: "text-indigo-950",
            accent: "text-indigo-700",
            border: "border-indigo-400/50",
            borderHex: "#4f46e5",
            gradient: "bg-gradient-to-r from-indigo-600 to-indigo-700",
            cardBg: "bg-white",
            cardBorder: "border-indigo-400/20",
            secondary: "text-indigo-800",
            chartColor: "#4f46e5",
          },
      sky: dark
        ? {
            bg: "bg-black",
            card: "bg-gradient-to-br from-[#1a1a1a] to-black",
            text: "text-white",
            accent: "text-sky-300",
            border: "border-sky-400/60",
            borderHex: "#7dd3fc",
            gradient: "bg-gradient-to-r from-sky-400 to-sky-500",
            cardBg: "bg-[#1a1a1a]",
            cardBorder: "border-sky-400/30",
            secondary: "text-sky-200",
            chartColor: "#7dd3fc",
          }
        : {
            bg: "bg-white",
            card: "bg-gradient-to-br from-white to-sky-50",
            text: "text-sky-950",
            accent: "text-sky-700",
            border: "border-sky-400/50",
            borderHex: "#0284c7",
            gradient: "bg-gradient-to-r from-sky-600 to-sky-700",
            cardBg: "bg-white",
            cardBorder: "border-sky-400/20",
            secondary: "text-sky-800",
            chartColor: "#0284c7",
          },
      ocean: dark
        ? {
            bg: "bg-black",
            card: "bg-gradient-to-br from-[#1a1a1a] to-black",
            text: "text-white",
            accent: "text-cyan-300",
            border: "border-cyan-400/60",
            borderHex: "#67e8f9",
            gradient: "bg-gradient-to-r from-cyan-400 to-cyan-500",
            cardBg: "bg-[#1a1a1a]",
            cardBorder: "border-cyan-400/30",
            secondary: "text-cyan-200",
            chartColor: "#67e8f9",
          }
        : {
            bg: "bg-white",
            card: "bg-gradient-to-br from-white to-cyan-50",
            text: "text-cyan-950",
            accent: "text-cyan-700",
            border: "border-cyan-400/50",
            borderHex: "#0891b2",
            gradient: "bg-gradient-to-r from-cyan-600 to-cyan-700",
            cardBg: "bg-white",
            cardBorder: "border-cyan-400/20",
            secondary: "text-cyan-800",
            chartColor: "#0891b2",
          },
      teal: dark
        ? {
            bg: "bg-black",
            card: "bg-gradient-to-br from-[#1a1a1a] to-black",
            text: "text-white",
            accent: "text-teal-300",
            border: "border-teal-400/60",
            borderHex: "#5eead4",
            gradient: "bg-gradient-to-r from-teal-400 to-teal-500",
            cardBg: "bg-[#1a1a1a]",
            cardBorder: "border-teal-400/30",
            secondary: "text-teal-200",
            chartColor: "#5eead4",
          }
        : {
            bg: "bg-white",
            card: "bg-gradient-to-br from-white to-teal-50",
            text: "text-teal-950",
            accent: "text-teal-700",
            border: "border-teal-400/50",
            borderHex: "#0d9488",
            gradient: "bg-gradient-to-r from-teal-600 to-teal-700",
            cardBg: "bg-white",
            cardBorder: "border-teal-400/20",
            secondary: "text-teal-800",
            chartColor: "#0d9488",
          },
      emerald: dark
        ? {
            bg: "bg-black",
            card: "bg-gradient-to-br from-[#1a1a1a] to-black",
            text: "text-white",
            accent: "text-emerald-300",
            border: "border-emerald-400/60",
            borderHex: "#6ee7b7",
            gradient: "bg-gradient-to-r from-emerald-400 to-emerald-500",
            cardBg: "bg-[#1a1a1a]",
            cardBorder: "border-emerald-400/30",
            secondary: "text-emerald-200",
            chartColor: "#6ee7b7",
          }
        : {
            bg: "bg-white",
            card: "bg-gradient-to-br from-white to-emerald-50",
            text: "text-emerald-950",
            accent: "text-emerald-700",
            border: "border-emerald-400/50",
            borderHex: "#059669",
            gradient: "bg-gradient-to-r from-emerald-600 to-emerald-700",
            cardBg: "bg-white",
            cardBorder: "border-emerald-400/20",
            secondary: "text-emerald-800",
            chartColor: "#059669",
          },
      lime: dark
        ? {
            bg: "bg-black",
            card: "bg-gradient-to-br from-[#1a1a1a] to-black",
            text: "text-white",
            accent: "text-lime-300",
            border: "border-lime-400/60",
            borderHex: "#a3e635",
            gradient: "bg-gradient-to-r from-lime-400 to-lime-500",
            cardBg: "bg-[#1a1a1a]",
            cardBorder: "border-lime-400/30",
            secondary: "text-lime-200",
            chartColor: "#a3e635",
          }
        : {
            bg: "bg-white",
            card: "bg-gradient-to-br from-white to-lime-50",
            text: "text-lime-950",
            accent: "text-lime-700",
            border: "border-lime-400/50",
            borderHex: "#65a30d",
            gradient: "bg-gradient-to-r from-lime-600 to-lime-700",
            cardBg: "bg-white",
            cardBorder: "border-lime-400/20",
            secondary: "text-lime-800",
            chartColor: "#65a30d",
          },
      amber: dark
        ? {
            bg: "bg-black",
            card: "bg-gradient-to-br from-[#1a1a1a] to-black",
            text: "text-white",
            accent: "text-amber-300",
            border: "border-amber-400/60",
            borderHex: "#fbbf24",
            gradient: "bg-gradient-to-r from-amber-400 to-amber-500",
            cardBg: "bg-[#1a1a1a]",
            cardBorder: "border-amber-400/30",
            secondary: "text-amber-200",
            chartColor: "#fbbf24",
          }
        : {
            bg: "bg-white",
            card: "bg-gradient-to-br from-white to-amber-50",
            text: "text-amber-950",
            accent: "text-amber-700",
            border: "border-amber-400/50",
            borderHex: "#d97706",
            gradient: "bg-gradient-to-r from-amber-600 to-amber-700",
            cardBg: "bg-white",
            cardBorder: "border-amber-400/20",
            secondary: "text-amber-800",
            chartColor: "#d97706",
          },
      sunset: dark
        ? {
            bg: "bg-black",
            card: "bg-gradient-to-br from-[#1a1a1a] to-black",
            text: "text-white",
            accent: "text-orange-300",
            border: "border-orange-400/60",
            borderHex: "#fb923c",
            gradient: "bg-gradient-to-r from-orange-400 to-orange-500",
            cardBg: "bg-[#1a1a1a]",
            cardBorder: "border-orange-400/30",
            secondary: "text-orange-200",
            chartColor: "#fb923c",
          }
        : {
            bg: "bg-white",
            card: "bg-gradient-to-br from-white to-orange-50",
            text: "text-orange-950",
            accent: "text-orange-700",
            border: "border-orange-400/50",
            borderHex: "#ea580c",
            gradient: "bg-gradient-to-r from-orange-600 to-orange-700",
            cardBg: "bg-white",
            cardBorder: "border-orange-400/20",
            secondary: "text-orange-800",
            chartColor: "#ea580c",
          },
      custom: dark
        ? {
            bg: "bg-black",
            card: "bg-gradient-to-br from-[#1a1a1a] to-black",
            text: "text-white",
            accent: "text-white",
            border: "border-white/60",
            borderHex: customColor,
            gradient: "bg-gradient-to-r from-white to-gray-300",
            cardBg: "bg-[#1a1a1a]",
            cardBorder: "border-white/30",
            secondary: "text-gray-300",
            chartColor: customColor,
          }
        : {
            bg: "bg-white",
            card: "bg-gradient-to-br from-white to-gray-50",
            text: "text-gray-900",
            accent: "text-gray-900",
            border: "border-gray-900/50",
            borderHex: customColor,
            gradient: "bg-gradient-to-r from-gray-900 to-gray-700",
            cardBg: "bg-white",
            cardBorder: "border-gray-900/20",
            secondary: "text-gray-700",
            chartColor: customColor,
          },
    };
    return themes[theme];
  };

  const colors = getColors(themeColor, isDarkMode);

  // Derived variables for easier usage
  const cardBgClass = colors.cardBg;
  const textClass = colors.text;
  const textSecondaryClass = colors.accent;
  const borderColor = colors.borderHex;

  // Transform data for Radar Chart - comparing 7 features
  const radarData = [
    {
      feature: "Speed",
      actual: (data.vesselInfo.speedCalc / 12) * 100, // Normalize to 0-100
      optimal: 70,
    },
    {
      feature: "Wind",
      actual:
        (comparison.find((c) => c.metric.includes("Wind"))?.current || 5) * 10,
      optimal: 50,
    },
    {
      feature: "Wave",
      actual:
        (comparison.find((c) => c.metric.includes("Wave"))?.current || 2) * 25,
      optimal: 50,
    },
    {
      feature: "Fuel Eff.",
      actual: analysis.efficiency,
      optimal: 90,
    },
    {
      feature: "Depth",
      actual: 75,
      optimal: 80,
    },
    {
      feature: "Temp",
      actual: 65,
      optimal: 75,
    },
    {
      feature: "Current",
      actual: 60,
      optimal: 70,
    },
  ];

  // Handle Export Dashboard - Print to PDF (Full Page)
  const handleExport = () => {
    if (!dashboardRef.current) return;

    // Set document title for PDF filename
    const originalTitle = document.title;
    document.title = `Fluxmare-Prediction-${new Date()
      .toISOString()
      .slice(0, 10)}`;

    toast.info("Print Dashboard Prediction", {
      id: "export",
      description:
        'Dashboard sẽ print full trang. Chọn "Save as PDF" để lưu file.',
      duration: 4000,
    });

    // Open print dialog
    setTimeout(() => {
      window.print();
      // Restore original title after print
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    }, 300);
  };

  // Handle Add to Comparison
  const handleAddToCompare = () => {
    const compareData = {
      timestamp: new Date().toISOString(),
      query,
      fuelConsumption: analysis.fuelConsumption,
      efficiency: analysis.efficiency,
      speed: vesselInfo.speedCalc,
    };

    // Save to localStorage for comparison
    const existing = localStorage.getItem("fluxmare_comparisons");
    const comparisons = existing ? JSON.parse(existing) : [];
    comparisons.push(compareData);
    localStorage.setItem(
      "fluxmare_comparisons",
      JSON.stringify(comparisons.slice(-3))
    ); // Keep last 3

    setCopied(true);
    toast.success("Đã thêm vào So Sánh!", {
      description: "Tối đa 3 predictions để so sánh",
    });

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`h-full overflow-y-auto p-4 ${colors.bg}`}>
      <motion.div
        className="mb-4 flex items-end justify-end"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleAddToCompare}
            size="sm"
            variant="outline"
            className={`h-7 text-xs border-2 ${colors.border}`}
            style={
              themeColor === "custom"
                ? { borderColor: colors.borderHex + "80" }
                : {}
            }
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Đã thêm
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                So Sánh
              </>
            )}
          </Button>

          <Button
            onClick={onCompareMode}
            size="sm"
            variant="outline"
            className={`h-7 text-xs border-2 ${colors.border}`}
            style={
              themeColor === "custom"
                ? { borderColor: colors.borderHex + "80" }
                : {}
            }
          >
            <GitCompare className="h-3 w-3 mr-1" />
            So Sánh Predictions
          </Button>

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
          >
            <Download className="h-3 w-3 mr-1" />
            Print/PDF
          </Button>
        </div>
      </motion.div>

      {/* Dashboard Content - Wrapped with ref for export */}
      <div
        ref={dashboardRef}
        data-print-dashboard
        className={`space-y-4 ${colors.bg} p-4 rounded-lg relative print:!bg-white`}
      >
        {/* Print Header - Only visible when printing */}
        <div className="hidden print:block mb-4 border-b-2 pb-2 print:!border-gray-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Ship className="h-5 w-5 print:!text-gray-800" />
                <h1 className="print:!text-gray-900">
                  Fluxmare Dashboard Prediction Report
                </h1>
              </div>
              <p className="text-xs print:!text-gray-600 mt-1">{query}</p>
            </div>
            <div className="text-xs print:!text-gray-600">
              {new Date().toLocaleString("vi-VN")}
            </div>
          </div>
        </div>

        {/* Watermark for screen only */}
        <div className="absolute top-2 right-2 opacity-30 pointer-events-none print:hidden">
          <div className={`flex items-center gap-1 text-[10px] ${colors.text}`}>
            <Ship className="h-3 w-3" />
            <span>Fluxmare.ai</span>
          </div>
        </div>
        {/* Kết quả phân tích chính */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card
            className={`border-2 ${colors.border} ${colors.card}`}
            style={
              themeColor === "custom"
                ? { borderColor: colors.borderHex + "99" }
                : {}
            }
          >
            <CardHeader className={`${colors.accent} bg-opacity-10 p-3`}>
              <CardTitle
                className={`flex items-center gap-2 ${colors.text} text-xs`}
              >
                <Fuel className={`h-4 w-4 ${colors.accent}`} />
                Fuel Consumption
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 p-3">
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`${colors.cardBg} ${colors.cardBorder} rounded-lg p-3 border-2`}
                  style={
                    themeColor === "custom"
                      ? { borderColor: colors.borderHex + "60" }
                      : {}
                  }
                >
                  <div
                    className={`flex items-center gap-2 ${colors.accent} mb-2`}
                    style={
                      themeColor === "custom"
                        ? { color: colors.chartColor }
                        : {}
                    }
                  >
                    <Fuel className="h-4 w-4" />
                    <span className="text-xs">Fuel Consumption</span>
                  </div>
                  <div className={`text-2xl ${colors.text}`}>
                    {analysis.fuelConsumption.toFixed(2)} kg
                  </div>
                  <div className={`text-xs ${colors.secondary} mt-1`}>
                    ≈ {analysis.fuelConsumptionTons.toFixed(3)} tons
                  </div>
                </div>
                <div
                  className={`${colors.cardBg} ${colors.cardBorder} rounded-lg p-3 border-2`}
                  style={
                    themeColor === "custom"
                      ? { borderColor: colors.borderHex + "60" }
                      : {}
                  }
                >
                  <div
                    className={`flex items-center gap-2 ${colors.accent} mb-2`}
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs">Chi phí ước tính</span>
                  </div>
                  <div className={`text-2xl ${colors.text}`}>
                    ${analysis.estimatedCost.toLocaleString()}
                  </div>
                  <div className={`text-xs ${colors.secondary} mt-1`}>
                    ${analysis.avgConsumptionRate.toFixed(2)}/nm
                  </div>
                </div>
              </div>

              {/* Hiệu suất */}
              <div
                className={`mt-3 ${colors.cardBg} ${colors.cardBorder} rounded-lg p-3 border-2`}
                style={
                  themeColor === "custom"
                    ? { borderColor: colors.borderHex + "60" }
                    : {}
                }
              >
                <div className={`flex items-center justify-between mb-2`}>
                  <div className={`flex items-center gap-2 ${colors.accent}`}>
                    <Gauge className="h-4 w-4" />
                    <span className="text-xs">Hiệu suất vận hành</span>
                  </div>
                  <div className={`text-lg ${colors.text}`}>
                    {analysis.efficiency}%
                  </div>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className={`h-full ${colors.gradient}`}
                    style={
                      themeColor === "custom"
                        ? {
                            background: `linear-gradient(to right, ${colors.chartColor}, ${colors.chartColor}dd)`,
                          }
                        : {}
                    }
                    initial={{ width: 0 }}
                    animate={{ width: `${analysis.efficiency}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Thông tin tàu */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card
            className={`border-2 ${colors.border} ${colors.card}`}
            style={
              themeColor === "custom"
                ? { borderColor: colors.borderHex + "99" }
                : {}
            }
          >
            <CardHeader className={`${colors.accent} bg-opacity-10 p-3`}>
              <CardTitle
                className={`flex items-center gap-2 ${colors.text} text-xs`}
              >
                <Ship className={`h-4 w-4 ${colors.accent}`} />
                Thông Tin Vessel
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3 p-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="col-span-2">
                  <span className={colors.secondary}>Type:</span>
                  <span className={`ml-2 ${colors.text}`}>
                    {vesselDisplayName}
                  </span>
                </div>
                <div>
                  <span className={colors.secondary}>Speed_calc:</span>
                  <span className={`ml-2 ${colors.text}`}>
                    {vesselInfo.speedCalc} kn
                  </span>
                </div>
                <div>
                  <span className={colors.secondary}>Distance:</span>
                  <span className={`ml-2 ${colors.text}`}>
                    {vesselInfo.distance} nm
                  </span>
                </div>
                <div>
                  <span className={colors.secondary}>Interval:</span>
                  <span className={`ml-2 ${colors.text}`}>15 phút</span>
                </div>
                <div>
                  <span className={colors.secondary}>Analysis Time:</span>
                  <span className={`ml-2 ${colors.text}`}>
                    {new Date(vesselInfo.datetime).toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className={colors.secondary}>Datetime:</span>
                  <span className={`ml-2 ${colors.text}`}>
                    {new Date(vesselInfo.datetime).toLocaleString("vi-VN")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Biểu đồ time series - ComposedChart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card
            className={`border-2 ${colors.border} ${colors.card}`}
            style={
              themeColor === "custom"
                ? { borderColor: colors.borderHex + "99" }
                : {}
            }
          >
            <CardHeader className={`${colors.accent} bg-opacity-10 p-3`}>
              <CardTitle
                className={`flex items-center gap-2 ${colors.text} text-xs`}
              >
                <Activity className={`h-4 w-4 ${colors.accent}`} />
                Tiêu Thụ Nhiên Liệu & Tốc Độ Theo Thời Gian
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 p-3">
              <ResponsiveContainer width="100%" height={220}>
                <ComposedChart data={timeSeriesData}>
                  <defs>
                    <linearGradient
                      id="colorConsumption"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={borderColor}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={borderColor}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDarkMode ? "#333" : "#e0e0e0"}
                  />
                  <XAxis
                    dataKey="time"
                    stroke={
                      colors.text.includes("text-white") ||
                      colors.text.includes("text-[#e5e5e5]")
                        ? "#e5e5e5"
                        : "#1a1a1a"
                    }
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke={
                      colors.text.includes("text-white") ||
                      colors.text.includes("text-[#e5e5e5]")
                        ? "#e5e5e5"
                        : "#1a1a1a"
                    }
                    tick={{ fontSize: 10 }}
                    label={{
                      value: "Fuel (kg/s)",
                      angle: -90,
                      position: "insideLeft",
                      style: {
                        fontSize: 10,
                        fill: colors.text.includes("text-white")
                          ? "#e5e5e5"
                          : "#1a1a1a",
                      },
                    }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke={isDarkMode ? "#888" : "#666"}
                    tick={{ fontSize: 10 }}
                    label={{
                      value: "Speed (m/s)",
                      angle: 90,
                      position: "insideRight",
                      style: {
                        fontSize: 10,
                        fill: isDarkMode ? "#888" : "#666",
                      },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? "#1a1a1a" : "#fff",
                      border: `1px solid ${borderColor}`,
                      fontSize: "10px",
                    }}
                    labelStyle={{ color: isDarkMode ? "#e5e5e5" : "#1a1a1a" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "10px" }} />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="consumption"
                    stroke={borderColor}
                    fillOpacity={1}
                    fill="url(#colorConsumption)"
                    name="Fuel Consumption"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="speed"
                    stroke={isDarkMode ? "#fbbf24" : "#d97706"}
                    strokeWidth={2}
                    dot={false}
                    name="Speed"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Biểu đồ cột so sánh Actual vs Optimal */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <Card
            className={`border-2 ${colors.border} ${colors.card}`}
            style={
              themeColor === "custom"
                ? { borderColor: colors.borderHex + "99" }
                : {}
            }
          >
            <CardHeader className={`${colors.accent} bg-opacity-10 p-3`}>
              <CardTitle
                className={`flex items-center gap-2 ${colors.text} text-xs`}
              >
                <Target className={`h-4 w-4 ${colors.accent}`} />
                So Sánh: Current vs Optimal Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 p-3">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={comparison}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDarkMode ? "#333" : "#e0e0e0"}
                  />
                  <XAxis
                    dataKey="metric"
                    stroke={
                      colors.text.includes("text-white") ||
                      colors.text.includes("text-[#e5e5e5]")
                        ? "#e5e5e5"
                        : "#1a1a1a"
                    }
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    stroke={
                      colors.text.includes("text-white") ||
                      colors.text.includes("text-[#e5e5e5]")
                        ? "#e5e5e5"
                        : "#1a1a1a"
                    }
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? "#1a1a1a" : "#fff",
                      border: `1px solid ${borderColor}`,
                      fontSize: "10px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "10px" }} />
                  <Bar
                    dataKey="current"
                    fill={borderColor}
                    name="Current"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="optimal"
                    fill={isDarkMode ? "#10b981" : "#059669"}
                    name="Optimal"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* So sánh với điều kiện tối ưu - Radar Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card
            className={`border-2 ${colors.border} ${colors.card}`}
            style={
              themeColor === "custom"
                ? { borderColor: colors.borderHex + "99" }
                : {}
            }
          >
            <CardHeader className={`${colors.accent} bg-opacity-10 p-3`}>
              <CardTitle
                className={`flex items-center gap-2 ${colors.text} text-xs`}
              >
                <Target className={`h-4 w-4 ${colors.accent}`} />
                Phân Tích 7 Features - Actual vs Optimal
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 p-3">
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke={isDarkMode ? "#444" : "#ddd"} />
                  <PolarAngleAxis
                    dataKey="feature"
                    tick={{
                      fill:
                        colors.text.includes("text-white") ||
                        colors.text.includes("text-[#e5e5e5]")
                          ? "#e5e5e5"
                          : "#1a1a1a",
                      fontSize: 11,
                    }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{
                      fill:
                        colors.text.includes("text-white") ||
                        colors.text.includes("text-[#e5e5e5]")
                          ? "#e5e5e5"
                          : "#1a1a1a",
                      fontSize: 9,
                    }}
                  />
                  <Radar
                    name="Actual"
                    dataKey="actual"
                    stroke={borderColor}
                    fill={borderColor}
                    fillOpacity={0.5}
                  />
                  <Radar
                    name="Optimal"
                    dataKey="optimal"
                    stroke={isDarkMode ? "#10b981" : "#059669"}
                    fill={isDarkMode ? "#10b981" : "#059669"}
                    fillOpacity={0.3}
                  />
                  <Legend wrapperStyle={{ fontSize: "10px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? "#1a1a1a" : "#fff",
                      border: `1px solid ${borderColor}`,
                      fontSize: "10px",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <p className={`text-[10px] ${colors.secondary} text-center mt-2`}>
                💡 Vùng xanh là điều kiện tối ưu - Vùng màu theme là thực tế
                hiện tại
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Smart Suggestions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <Card
            className={`border-2 ${colors.border} ${colors.card}`}
            style={
              themeColor === "custom"
                ? { borderColor: colors.borderHex + "99" }
                : {}
            }
          >
            <CardHeader className={`${colors.accent} bg-opacity-10 p-3`}>
              <CardTitle
                className={`flex items-center gap-2 ${colors.text} text-xs`}
              >
                <Zap className={`h-4 w-4 ${colors.accent}`} />
                AI Smart Suggestions - Tối Ưu Nhiên Liệu
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3 p-3">
              <div className="grid grid-cols-2 gap-3">
                {/* Suggestion 1: Reduce Speed */}
                <div
                  className={`${colors.cardBg} ${colors.cardBorder} rounded-lg p-3 border-2`}
                  style={
                    themeColor === "custom"
                      ? { borderColor: colors.borderHex + "60" }
                      : {}
                  }
                >
                  <div
                    className={`flex items-center gap-2 ${colors.accent} mb-2`}
                  >
                    <TrendingDown className="h-3 w-3" />
                    <span className="text-xs">Giảm Tốc Độ</span>
                  </div>
                  <p className={`text-[11px] ${colors.text} mb-2`}>
                    Nếu giảm speed xuống{" "}
                    <span className={colors.accent}>
                      {(vesselInfo.speedCalc * 0.85).toFixed(1)} m/s
                    </span>
                  </p>
                  <div className={`text-lg ${colors.accent}`}>
                    ↓ 12-15% fuel
                  </div>
                  <p className={`text-[10px] ${colors.secondary} mt-1`}>
                    Tiết kiệm ~{(analysis.fuelConsumption * 0.135).toFixed(1)}{" "}
                    kg
                  </p>
                </div>

                {/* Suggestion 2: Optimal Weather Window */}
                <div
                  className={`${colors.cardBg} ${colors.cardBorder} rounded-lg p-3 border-2`}
                  style={
                    themeColor === "custom"
                      ? { borderColor: colors.borderHex + "60" }
                      : {}
                  }
                >
                  <div
                    className={`flex items-center gap-2 ${colors.accent} mb-2`}
                  >
                    <Gauge className="h-3 w-3" />
                    <span className="text-xs">Điều Kiện Tối Ưu</span>
                  </div>
                  <p className={`text-[11px] ${colors.text} mb-2`}>
                    Chờ sóng giảm xuống{" "}
                    <span className={colors.accent}>{"<"} 1.5m</span>
                  </p>
                  <div className={`text-lg ${colors.accent}`}>↓ 8-10% fuel</div>
                  <p className={`text-[10px] ${colors.secondary} mt-1`}>
                    Tiết kiệm ~{(analysis.fuelConsumption * 0.09).toFixed(1)} kg
                  </p>
                </div>

                {/* Suggestion 3: Route Optimization */}
                <div
                  className={`${colors.cardBg} ${colors.cardBorder} rounded-lg p-3 border-2`}
                  style={
                    themeColor === "custom"
                      ? { borderColor: colors.borderHex + "60" }
                      : {}
                  }
                >
                  <div
                    className={`flex items-center gap-2 ${colors.accent} mb-2`}
                  >
                    <Ship className="h-3 w-3" />
                    <span className="text-xs">Tuyến Đường</span>
                  </div>
                  <p className={`text-[11px] ${colors.text} mb-2`}>
                    Tránh vùng gió mạnh {">"}10 m/s
                  </p>
                  <div className={`text-lg ${colors.accent}`}>↓ 5-7% fuel</div>
                  <p className={`text-[10px] ${colors.secondary} mt-1`}>
                    Tiết kiệm ~{(analysis.fuelConsumption * 0.06).toFixed(1)} kg
                  </p>
                </div>

                {/* Suggestion 4: Engine Optimization */}
                <div
                  className={`${colors.cardBg} ${colors.cardBorder} rounded-lg p-3 border-2`}
                  style={
                    themeColor === "custom"
                      ? { borderColor: colors.borderHex + "60" }
                      : {}
                  }
                >
                  <div
                    className={`flex items-center gap-2 ${colors.accent} mb-2`}
                  >
                    <AlertCircle className="h-3 w-3" />
                    <span className="text-xs">Hiệu Suất Động Cơ</span>
                  </div>
                  <p className={`text-[11px] ${colors.text} mb-2`}>
                    Duy trì RPM ổn định ±2%
                  </p>
                  <div className={`text-lg ${colors.accent}`}>↓ 3-5% fuel</div>
                  <p className={`text-[10px] ${colors.secondary} mt-1`}>
                    Tiết kiệm ~{(analysis.fuelConsumption * 0.04).toFixed(1)} kg
                  </p>
                </div>
              </div>

              {/* Combined Optimization */}
              <div
                className={`mt-3 ${colors.cardBg} rounded-lg p-3 border-2`}
                style={{
                  borderColor: isDarkMode ? "#10b981" : "#059669",
                  backgroundColor: isDarkMode
                    ? "rgba(16, 185, 129, 0.1)"
                    : "rgba(5, 150, 105, 0.1)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap
                      className="h-4 w-4"
                      style={{ color: isDarkMode ? "#10b981" : "#059669" }}
                    />
                    <span className={`text-xs ${colors.text}`}>
                      Kết hợp tất cả:
                    </span>
                  </div>
                  <div
                    className="text-lg"
                    style={{ color: isDarkMode ? "#10b981" : "#059669" }}
                  >
                    ↓ 25-35% fuel
                  </div>
                </div>
                <p className={`text-[10px] ${colors.secondary} mt-1`}>
                  Tiết kiệm tối đa ~
                  {(analysis.fuelConsumption * 0.3).toFixed(1)} kg ≈ $
                  {(((analysis.fuelConsumption * 0.3) / 1000) * 650).toFixed(0)}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Khuyến nghị */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card
            className={`border-2 ${colors.border} ${colors.card}`}
            style={
              themeColor === "custom"
                ? { borderColor: colors.borderHex + "99" }
                : {}
            }
          >
            <CardHeader className={`${colors.accent} bg-opacity-10 p-3`}>
              <CardTitle
                className={`flex items-center gap-2 ${colors.text} text-xs`}
              >
                <AlertCircle className={`h-4 w-4 ${colors.accent}`} />
                Khuyến Nghị Tối Ưu Hóa
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3 p-3">
              <p className={`text-xs ${colors.text} leading-relaxed`}>
                {analysis.recommendation}
              </p>
              <div
                className={`mt-3 p-2 rounded-lg ${colors.cardBg} border-2 ${colors.cardBorder}`}
                style={
                  themeColor === "custom"
                    ? { borderColor: colors.borderHex + "60" }
                    : {}
                }
              >
                <div className="flex items-start gap-2">
                  <TrendingDown
                    className={`h-4 w-4 ${colors.accent} flex-shrink-0 mt-0.5`}
                  />
                  <div className="text-xs">
                    <p className={`${colors.accent} mb-1`}>Cơ hội tối ưu:</p>
                    <ul className={`space-y-1 ${colors.secondary}`}>
                      <li>
                        • Điều chỉnh Speed_calc để cân bằng thời gian và nhiên
                        liệu
                      </li>
                      <li>
                        • Tối ưu hóa hệ thống động lực dựa trên loại vessel
                      </li>
                      <li>• Theo dõi và bảo dưỡng hệ thống động lực định kỳ</li>
                      <li>
                        • Phân tích lịch sử tiêu thụ để dự báo chính xác hơn
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
