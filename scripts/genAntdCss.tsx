// scripts/genAntdCss.tsx
/**
 * Extracts antdesign minified css and store it in output path
 * @returns {any}
 */
import fs from "fs";
import { extractStyle } from "@ant-design/static-style-extract";

const outputPath = "./src/antd.min.css";

const css = extractStyle();

fs.writeFileSync(outputPath, css);
