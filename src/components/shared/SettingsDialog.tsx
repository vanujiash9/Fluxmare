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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/controls/label";
import { Switch } from "@/components/ui/controls/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/controls/select";
import { Slider } from "@/components/ui/controls/slider";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Trash2,
  Download,
  Upload,
  Bell,
  Type,
  Palette,
  Shield,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { ThemeColor } from "@/App";

interface SettingsDialogProps {
  themeColor: ThemeColor;
  isDarkMode: boolean;
  customColor: string;
  onChangeTheme: (theme: ThemeColor) => void;
  onChangeCustomColor: (color: string) => void;
  onClearHistory: () => void;
  username: string;
}

export default function SettingsDialog({
  themeColor,
  isDarkMode,
  customColor,
  onChangeTheme,
  onChangeCustomColor,
  onClearHistory,
  username,
}: SettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const [showClearAlert, setShowClearAlert] = useState(false);
  const [fontSize, setFontSize] = useState(
    parseInt(localStorage.getItem("fontSize") || "14")
  );
  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") !== "false"
  );
  const [soundEnabled, setSoundEnabled] = useState(
    localStorage.getItem("soundEnabled") !== "false"
  );
  const [autoSave, setAutoSave] = useState(
    localStorage.getItem("autoSave") !== "false"
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "vi"
  );

  const themeColors: {
    value: ThemeColor;
    label: string;
    previewLight?: string;
    previewDark?: string;
    isCustom?: boolean;
  }[] = [
    {
      value: "default",
      label: "🎨 Mặc định",
      previewLight: "bg-white border-2 border-[#2002a6]",
      previewDark: "bg-black border-2 border-[#e3d5f7]",
    },
    { value: "custom", label: "🎨 Tùy chỉnh RGB", isCustom: true },
  ];

  const handleThemeChange = (theme: ThemeColor) => {
    onChangeTheme(theme);
    toast.success("Đã thay đổi theme!");
  };

  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
    localStorage.setItem("fontSize", String(newSize));
    document.documentElement.style.setProperty("--font-size", `${newSize}px`);
  };

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    localStorage.setItem("notifications", String(checked));
    toast.success(checked ? "Đã bật thông báo" : "Đã tắt thông báo");
  };

  const handleSoundChange = (checked: boolean) => {
    setSoundEnabled(checked);
    localStorage.setItem("soundEnabled", String(checked));
    toast.success(checked ? "Đã bật âm thanh" : "Đã tắt âm thanh");
  };

  const handleAutoSaveChange = (checked: boolean) => {
    setAutoSave(checked);
    localStorage.setItem("autoSave", String(checked));
    toast.success(checked ? "Đã bật tự động lưu" : "Đã tắt tự động lưu");
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    toast.success("Đã thay đổi ngôn ngữ!");
  };

  const handleExportData = () => {
    const data = {
      username,
      conversations: localStorage.getItem(`conversations_${username}`),
      settings: {
        themeColor,
        fontSize,
        notifications,
        soundEnabled,
        autoSave,
        language,
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fluxmare-backup-${username}-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    toast.success("Đã xuất dữ liệu thành công!");
  };

  const handleImportData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            if (data.conversations) {
              localStorage.setItem(
                `conversations_${username}`,
                data.conversations
              );
            }
            if (data.settings) {
              Object.entries(data.settings).forEach(([key, value]) => {
                localStorage.setItem(key, String(value));
              });
            }
            toast.success(
              "Đã nhập dữ liệu thành công! Vui lòng tải lại trang."
            );
          } catch (error) {
            toast.error("File không hợp lệ!");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearHistoryConfirm = () => {
    onClearHistory();
    setShowClearAlert(false);
    setOpen(false);
    toast.success("Đã xóa toàn bộ lịch sử!");
  };

  const bgClass = isDarkMode
    ? "bg-gray-900"
    : "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50";
  const textClass = isDarkMode ? "text-white" : "text-gray-900";

  const getColors = (theme: ThemeColor, dark: boolean) => {
    const base = {
      default: dark
        ? { accent: "text-[#e3d5f7]", border: "border-[#e3d5f7]/60" }
        : { accent: "text-[#2002a6]", border: "border-[#2002a6]/50" },
      pink: dark
        ? { accent: "text-pink-300", border: "border-pink-400/60" }
        : { accent: "text-pink-700", border: "border-pink-400/50" },
      rose: dark
        ? { accent: "text-rose-300", border: "border-rose-400/60" }
        : { accent: "text-rose-700", border: "border-rose-400/50" },
      fuchsia: dark
        ? { accent: "text-fuchsia-300", border: "border-fuchsia-400/60" }
        : { accent: "text-fuchsia-700", border: "border-fuchsia-400/50" },
      purple: dark
        ? { accent: "text-purple-300", border: "border-purple-400/50" }
        : { accent: "text-purple-700", border: "border-purple-400/50" },
      indigo: dark
        ? { accent: "text-indigo-300", border: "border-indigo-400/60" }
        : { accent: "text-indigo-700", border: "border-indigo-400/50" },
      blue: dark
        ? { accent: "text-blue-300", border: "border-blue-400/50" }
        : { accent: "text-blue-700", border: "border-blue-400/50" },
      sky: dark
        ? { accent: "text-sky-300", border: "border-sky-400/60" }
        : { accent: "text-sky-700", border: "border-sky-400/50" },
      ocean: dark
        ? { accent: "text-cyan-300", border: "border-cyan-400/50" }
        : { accent: "text-cyan-700", border: "border-cyan-400/50" },
      teal: dark
        ? { accent: "text-teal-300", border: "border-teal-400/60" }
        : { accent: "text-teal-700", border: "border-teal-400/50" },
      emerald: dark
        ? { accent: "text-emerald-300", border: "border-emerald-400/50" }
        : { accent: "text-emerald-700", border: "border-emerald-400/50" },
      lime: dark
        ? { accent: "text-lime-300", border: "border-lime-400/60" }
        : { accent: "text-lime-700", border: "border-lime-400/50" },
      amber: dark
        ? { accent: "text-amber-300", border: "border-amber-400/60" }
        : { accent: "text-amber-700", border: "border-amber-400/50" },
      sunset: dark
        ? { accent: "text-orange-300", border: "border-orange-400/50" }
        : { accent: "text-orange-700", border: "border-orange-400/50" },
      custom: dark
        ? { accent: "text-white", border: "border-white/60" }
        : { accent: "text-gray-900", border: "border-gray-900/50" },
    };
    return base[theme];
  };

  const colors = getColors(themeColor, isDarkMode);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className={`inline-flex items-center justify-center rounded-md ${colors.border} ${colors.accent} hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all h-7 w-7 border-2`}
          title="Cài đặt"
        >
          <Settings className="h-3 w-3" />
        </DialogTrigger>
        <DialogContent
          className={`max-w-2xl max-h-[85vh] overflow-hidden ${bgClass}`}
        >
          <DialogHeader>
            <DialogTitle className={`flex items-center gap-2 ${textClass}`}>
              <Settings className="h-5 w-5" />
              Cài đặt Fluxmare
            </DialogTitle>
            <DialogDescription
              className={isDarkMode ? "text-pink-300" : "text-purple-600"}
            >
              Tùy chỉnh trải nghiệm chatbot của bạn
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="appearance" className="w-full">
            <TabsList
              className={`grid w-full grid-cols-4 ${
                isDarkMode ? "bg-gray-800" : "bg-white/80"
              }`}
            >
              <TabsTrigger value="appearance" className="text-xs">
                <Palette className="h-3 w-3 mr-1" />
                Giao diện
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs">
                <Bell className="h-3 w-3 mr-1" />
                Thông báo
              </TabsTrigger>
              <TabsTrigger value="data" className="text-xs">
                <Download className="h-3 w-3 mr-1" />
                Dữ liệu
              </TabsTrigger>
              <TabsTrigger value="privacy" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Bảo mật
              </TabsTrigger>
            </TabsList>

            <div className="overflow-y-auto max-h-[calc(85vh-200px)] mt-4 pr-2">
              {/* Appearance Tab */}
              <TabsContent value="appearance" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-white/80"
                    }`}
                  >
                    <Label className={`${textClass} mb-3 block`}>
                      Theme Màu Sắc
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {themeColors.map((theme) => (
                        <Button
                          key={theme.value}
                          variant={
                            themeColor === theme.value ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => handleThemeChange(theme.value)}
                          className={`justify-start h-9 ${
                            themeColor === theme.value
                              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0"
                              : isDarkMode
                              ? "border-gray-600"
                              : "border-gray-300"
                          }`}
                        >
                          {theme.isCustom ? (
                            <div className="flex items-center gap-2 mr-2">
                              <div
                                className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                                style={{ backgroundColor: customColor }}
                              ></div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 mr-2">
                              <div
                                className={`w-3 h-3 rounded-full ${theme.previewLight}`}
                              ></div>
                              <div
                                className={`w-3 h-3 rounded-full ${theme.previewDark}`}
                              ></div>
                            </div>
                          )}
                          <span className="text-xs">{theme.label}</span>
                        </Button>
                      ))}
                    </div>

                    {/* RGB Color Picker */}
                    <div
                      className={`mt-3 p-4 rounded-lg ${
                        isDarkMode ? "bg-gray-900" : "bg-gray-100"
                      }`}
                    >
                      <Label className={`${textClass} text-xs mb-2 block`}>
                        Bảng màu RGB tùy chỉnh
                      </Label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={customColor}
                          onChange={(e) => onChangeCustomColor(e.target.value)}
                          className="h-12 w-24 rounded cursor-pointer border-2 border-gray-400"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={customColor}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (/^#[0-9A-F]{6}$/i.test(val)) {
                                onChangeCustomColor(val);
                              }
                            }}
                            onBlur={(e) => {
                              // Auto-complete partial hex codes
                              const val = e.target.value;
                              if (
                                /^#[0-9A-F]{0,5}$/i.test(val) &&
                                val.length < 7
                              ) {
                                onChangeCustomColor(customColor);
                              }
                            }}
                            placeholder="#FF0080"
                            className={`w-full px-3 py-2 text-sm rounded border-2 ${
                              isDarkMode
                                ? "bg-gray-800 border-gray-600 text-white"
                                : "bg-white border-gray-300"
                            }`}
                          />
                        </div>
                      </div>
                      <p
                        className={`text-xs mt-2 ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Nhấp vào ô màu hoặc nhập mã hex (vd: #FF0080, #00FF00)
                      </p>
                    </div>

                    <p
                      className={`text-xs mt-3 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Màu mặc định + Vô số tùy chọn RGB tùy chỉnh × 2 chế độ
                      sáng/tối
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-white/80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Type
                          className={`h-4 w-4 ${
                            isDarkMode ? "text-pink-300" : "text-purple-500"
                          }`}
                        />
                        <Label className={textClass}>
                          Kích thước chữ: {fontSize}px
                        </Label>
                      </div>
                    </div>
                    <Slider
                      value={[fontSize]}
                      onValueChange={handleFontSizeChange}
                      min={12}
                      max={18}
                      step={1}
                      className="w-full"
                    />
                    <p
                      className={`text-xs mt-2 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Điều chỉnh kích thước chữ hiển thị
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-white/80"
                    }`}
                  >
                    <Label className={`${textClass} mb-3 block`}>
                      Ngôn ngữ
                    </Label>
                    <Select
                      value={language}
                      onValueChange={handleLanguageChange}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vi">🇻🇳 Tiếng Việt</SelectItem>
                        <SelectItem value="en">🇬🇧 English</SelectItem>
                        <SelectItem value="ja">🇯🇵 日本語</SelectItem>
                        <SelectItem value="ko">🇰🇷 한국어</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-white/80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Label className={textClass}>Thông báo</Label>
                      <Switch
                        checked={notifications}
                        onCheckedChange={handleNotificationsChange}
                      />
                    </div>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Nhận thông báo khi có phản hồi mới
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-white/80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Label className={textClass}>Âm thanh</Label>
                      <Switch
                        checked={soundEnabled}
                        onCheckedChange={handleSoundChange}
                      />
                    </div>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Phát âm thanh khi có tin nhắn mới
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-white/80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Label className={textClass}>Tự động lưu</Label>
                      <Switch
                        checked={autoSave}
                        onCheckedChange={handleAutoSaveChange}
                      />
                    </div>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Tự động lưu cuộc trò chuyện
                    </p>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Data Tab */}
              <TabsContent value="data" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-white/80"
                    }`}
                  >
                    <Label className={`${textClass} mb-3 block`}>
                      Quản lý dữ liệu
                    </Label>
                    <div className="space-y-2">
                      <Button
                        onClick={handleExportData}
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Xuất dữ liệu
                      </Button>
                      <Button
                        onClick={handleImportData}
                        variant="outline"
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Nhập dữ liệu
                      </Button>
                    </div>
                    <p
                      className={`text-xs mt-2 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Sao lưu và khôi phục dữ liệu của bạn
                    </p>
                  </div>

                  <Separator />

                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-red-900/20" : "bg-red-50"
                    } border-2 ${
                      isDarkMode ? "border-red-500/50" : "border-red-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <Label className="text-red-500">Vùng nguy hiểm</Label>
                    </div>
                    <Button
                      onClick={() => setShowClearAlert(true)}
                      variant="destructive"
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa toàn bộ lịch sử
                    </Button>
                    <p className={`text-xs mt-2 text-red-500`}>
                      Hành động này không thể hoàn tác!
                    </p>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-white/80"
                    }`}
                  >
                    <Label className={`${textClass} mb-2 block`}>
                      Thông tin tài khoản
                    </Label>
                    <div
                      className={`text-sm space-y-1 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <p>
                        👤 Người dùng:{" "}
                        <span className={textClass}>{username}</span>
                      </p>
                      <p>
                        📅 Ngày tạo: <span className={textClass}>Hôm nay</span>
                      </p>
                      <p>
                        💬 Số cuộc trò chuyện:{" "}
                        <span className={textClass}>
                          {
                            JSON.parse(
                              localStorage.getItem(
                                `conversations_${username}`
                              ) || "[]"
                            ).length
                          }
                        </span>
                      </p>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-white/80"
                    }`}
                  >
                    <Label className={`${textClass} mb-2 block`}>
                      Bảo mật & Quyền riêng tư
                    </Label>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      ✓ Dữ liệu của bạn được lưu trữ cục bộ trên trình duyệt
                      <br />
                      ✓ Không có dữ liệu nào được gửi đến máy chủ bên ngoài
                      <br />
                      ✓ Bạn có toàn quyền kiểm soát dữ liệu của mình
                      <br />✓ Có thể xóa hoặc xuất dữ liệu bất cứ lúc nào
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4" />
                      <Label className="text-white">
                        Fluxmare Pro (Sắp ra mắt)
                      </Label>
                    </div>
                    <p className="text-xs opacity-90">
                      Nâng cấp lên Pro để có thêm nhiều tính năng cao cấp!
                    </p>
                  </div>
                </motion.div>
              </TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Clear History Confirmation */}
      <AlertDialog open={showClearAlert} onOpenChange={setShowClearAlert}>
        <AlertDialogContent
          className={isDarkMode ? "bg-gray-900 border-red-500" : "bg-white"}
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              className={`flex items-center gap-2 ${textClass}`}
            >
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Xác nhận xóa lịch sử
            </AlertDialogTitle>
            <AlertDialogDescription
              className={isDarkMode ? "text-gray-300" : "text-gray-600"}
            >
              Bạn có chắc chắn muốn xóa toàn bộ lịch sử trò chuyện? Hành động
              này không thể hoàn tác!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearHistoryConfirm}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
            >
              Xóa tất cả
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
