declare module "*.png";
declare module "*.jpg";
declare module "figma:asset/*";
declare module "@/*";
declare module "sonner";

// Allow importing assets via alias
declare module "@/assets/*" {
  const value: string;
  export default value;
}
