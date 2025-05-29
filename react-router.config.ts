import { type Config } from "@react-router/dev/config";

export default {
  ssr: true, // MEMO: サーバーサイドレンダリングを有効にする(clientLoaderを使うと、部分的にクライアントフェッチする)
  prerender: ["/about"], // MEMO: 静的なHTMLとしてプリレンダリングされる
} satisfies Config;
