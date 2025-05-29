import { type Config } from "@react-router/dev/config";

export default {
  ssr: false,
  prerender: ["/about"], // MEMO: 静的なHTMLとしてプリレンダリングされる
} satisfies Config;
