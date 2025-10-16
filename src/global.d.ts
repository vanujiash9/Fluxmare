// Allow importing CSS files as side-effect modules (e.g. `import './index.css'`)
declare module "*.css";
declare module "*.module.css";

// Common static asset shims to avoid missing-module errors during TS checks
declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
