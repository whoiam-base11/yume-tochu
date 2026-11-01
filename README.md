This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## メール通知 (Resend)

問い合わせフォーム送信時に、Resend経由でメール通知を送信します。

### セットアップ

1. [Resend](https://resend.com) でアカウントを作成し、APIキーを取得
2. `.env.local` に以下を設定:
   ```
   RESEND_API_KEY=re_xxxxx
   CONTACT_FROM_EMAIL=onboarding@resend.dev
   CONTACT_TO_EMAIL=your-email@example.com
   ```

### テストモードと本番モードの切り替え

| 環境 | `CONTACT_FROM_EMAIL` | 備考 |
|------|---------------------|------|
| テスト | `onboarding@resend.dev` | ドメイン認証不要。送信先はResendアカウントのメールのみ |
| 本番 | `noreply@yourdomain.com` | 要ドメイン認証（DNS MX/TXTレコード追加）。任意のメールに送信可 |

### Vercel環境変数

Vercelダッシュボード → Settings → Environment Variables に `RESEND_API_KEY`、`CONTACT_FROM_EMAIL`、`CONTACT_TO_EMAIL` を設定してください。

> `RESEND_API_KEY` が未設定の場合、メール送信はスキップされ、フォーム送信（Sanity保存）は通常通り動作します。

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
