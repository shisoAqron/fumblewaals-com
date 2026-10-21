# fumblewaals.com

ファンブルワールス公式サイト。WordPress から [Astro](https://astro.build/)（TypeScript・静的出力）に移行したもの。GitHub Pages でホスティングする。

## 開発

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # 型チェック + dist/ に静的ファイルを出力
npm run preview
```

## コンテンツの編集

| 対象 | 場所 |
| --- | --- |
| ブログ記事 | `src/content/posts/*.md`（`permalink` が URL になる） |
| 作品 | `src/content/products/*.md` |
| メンバー | `src/content/members/*.md` |
| 画像・PDF | `public/uploads/` |
| サイト共通の文言・ナビ | `src/lib/site.ts` |

旧サイトの URL（`/YYYY/MM/DD/<slug>/`、`/portfolio/<slug>/`、`/team/<slug>/`、`/members/`、`/products/`、`/posts/`、`/contact/`）はそのまま維持している。

## デプロイ

`main` に push すると `.github/workflows/deploy.yml` が GitHub Pages に公開する。

1. リポジトリの Settings → Pages → Source を **GitHub Actions** にする
2. 独自ドメインは `public/CNAME`（`fumblewaals.com`）。DNS を GitHub Pages に向けてから Settings → Pages でドメインを設定し、Enforce HTTPS を有効にする

### `*.github.io/<repo>/` で事前確認する場合

```sh
SITE_URL=https://<user>.github.io BASE_PATH=/<repo> npm run build
```
