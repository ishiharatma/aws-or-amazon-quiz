# 実装計画 — Amazon or AWS Quiz

## ディレクトリ構成

```
aws-or-amazon-quiz/
├── docs/
│   ├── spec.md                  # 仕様書
│   └── implementation-plan.md   # 本ファイル
├── src/
│   ├── types.ts     # 型定義
│   ├── i18n.ts      # 翻訳文字列・言語検出
│   ├── quiz.ts      # クイズロジック（シャッフル・採点・ランク）
│   ├── result.ts    # 結果画面描画・シェアURL生成
│   └── main.ts      # エントリポイント・画面管理・イベント
├── public/
│   └── data/
│       └── services.json  # 問題データ（65問以上）
├── styles/
│   └── style.css    # テーマ変数・レイアウト・アニメーション
├── index.html       # Vite エントリポイント（単一HTML）
├── vite.config.ts
├── tsconfig.json
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml   # GitHub Pages デプロイ
```

---

## フェーズ別タスク

### Phase 1: プロジェクト初期化
- [x] `package.json` (Vite 5 + TypeScript 5)
- [x] `tsconfig.json`
- [x] `vite.config.ts` (`base: './'` で相対パス対応)
- [x] `.gitignore`

### Phase 2: データ
- [x] `public/data/services.json`
  - 65問以上収録（Amazon prefix: ~35件、AWS prefix: ~30件）
  - カテゴリ: compute / storage / database / networking / security / analytics / ml / developer / management / messaging

### Phase 3: TypeScript ソース
- [x] `src/types.ts` — Service / QuizState / Lang 型
- [x] `src/i18n.ts` — ja/en 翻訳辞書・getLang()・t()
- [x] `src/quiz.ts` — shuffle() / createQuiz() / getRank() / getRankEmoji()
- [x] `src/result.ts` — renderResult() / Share on X URL生成
- [x] `src/main.ts` — init() / 画面遷移 / イベントハンドラ / キーボード操作

### Phase 4: スタイル
- [x] `styles/style.css`
  - CSS カスタムプロパティでライト/ダークテーマ
  - AWS ブランドカラー（オレンジ #FF9900・ダークブルー #232F3E）
  - モバイルファースト・レスポンシブ
  - 正解/不正解アニメーション

### Phase 5: HTML
- [x] `index.html`
  - スタート画面 (`#start-screen`)
  - クイズ画面 (`#quiz-screen`)
  - 結果画面 (`#result-screen`)
  - 言語トグルボタン（右上）

### Phase 6: GitHub Actions
- [x] `.github/workflows/deploy.yml`
  - `main` ブランチ push トリガー
  - `npm ci && npm run build`
  - `dist/` を GitHub Pages にデプロイ

---

## 状態管理

```
idle（スタート画面表示中）
  ↓ startQuiz()
question（問題表示中）
  ↓ handleAnswer('Amazon'|'AWS')
answered（正誤・解説表示中）
  ↓ handleNext()
  ├─ 次問あり → question
  └─ 20問終了 → result（結果画面表示）
```

---

## キーボードショートカット

| キー | 操作 |
|---|---|
| `1` / `A` | Amazon を選択 |
| `2` / `W` | AWS を選択 |
| `Enter` / `Space` | 次へ（回答後のみ） |

---

## アイコン方針

AWS Architecture Icons は著作権があるため本リポジトリには含めない。

代替として：
- カテゴリ別のカラーバッジ（CSS で実装）にカテゴリ絵文字を表示
- 実際のAWSアイコンに差し替える場合は `public/icons/` に配置し `services.json` の `icon` フィールドを指定

---

## GitHub Pages URL

```
https://ishiharatma.github.io/aws-or-amazon-quiz/
```

デプロイ先ブランチ: `gh-pages`（GitHub Actions が自動作成）

GitHub リポジトリ Settings → Pages → Source: `GitHub Actions` に設定が必要。

---

## テスト方針

- TypeScript 型チェック: `npm run build` (tsc + vite build)
- ローカル動作確認: `npm run dev`
- ブラウザ確認: Chrome / Firefox / Safari / Edge
- モバイル確認: Chrome DevTools デバイスエミュレーション
