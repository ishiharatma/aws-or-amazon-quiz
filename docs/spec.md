# Amazon or AWS Quiz — 仕様書

## 概要

AWSサービス名の正式名称が **Amazon** と **AWS** どちらで始まるかを当てるブラウザクイズゲーム。

ログイン不要・静的ファイルのみ・GitHub Pages でホスト可能。

---

## ゲームフロー

```
スタート画面
  ↓ [クイズ開始]
問題表示（サービスアイコン + サービス名）
  ↓ [Amazon] or [AWS] を選択
正誤表示 + サービス説明
  ↓ [次へ]
20問終了
  ↓
結果画面（スコア・正答率・ランク・シェアボタン）
```

---

## 問題

| 表示項目 | 内容 |
|---|---|
| サービスアイコン | カテゴリ別カラーアイコン |
| サービス名 | Amazon / AWS プレフィックスを除いた名称 |
| 設問文 | 「このサービスの正式名称は？」 |
| 選択肢 | [Amazon] [AWS] の2択ボタン |

---

## 回答フィードバック

| 結果 | 表示 |
|---|---|
| 正解 | ⭕ Correct! + 正式名称 + サービス説明 |
| 不正解 | ❌ Incorrect + 正式名称 + サービス説明 |

---

## 結果画面

| 項目 | 内容 |
|---|---|
| 正解数 | N / 20 |
| 正答率 | N% |
| ランク | 下表参照 |
| Play Again | 同データ・新シャッフルでリスタート |
| Share on X | スコアをXへポスト |

### ランク定義

| 正答率 | ランク |
|---|---|
| 100% | 🏆 AWS Naming Legend |
| 95%以上 | 🥇 AWS Naming Master |
| 80%以上 | 🥈 Architect |
| 60%以上 | 🥉 Builder |
| 60%未満 | 🌱 Getting Started |

---

## 言語

- 初回起動時 `navigator.language` が `ja` → 日本語、それ以外 → 英語
- 画面右上トグルボタンで切替
- 切替対象：UI文言 + サービス説明

---

## データ形式

```json
{
  "id": "lambda",
  "prefix": "AWS",
  "name": "Lambda",
  "fullName": "AWS Lambda",
  "category": "compute",
  "descriptionJa": "サーバーを管理せずにコードを実行できるサーバーレスコンピューティングサービス。",
  "descriptionEn": "Run code without provisioning or managing servers."
}
```

---

## ランダム

- 毎回シャッフル
- 同一ゲーム内で重複なし
- デフォルト20問（データには65問以上収録）

---

## アクセシビリティ

- ボタンサイズ 44px 以上
- キーボード操作対応（`1`/`A` → Amazon、`2`/`W` → AWS、`Enter`/`Space` → 次へ）
- `aria-label` / `role` 設定
- 十分なコントラスト比

---

## 対応ブラウザ

Chrome / Edge / Firefox / Safari — PC・スマートフォン対応

---

## 技術スタック

| 要素 | 選択 |
|---|---|
| HTML/CSS/TS | Vanilla（フレームワークなし） |
| ビルド | Vite 5 |
| 型チェック | TypeScript 5 |
| CI/CD | GitHub Actions |
| ホスト | GitHub Pages |

---

## Share on X テキスト例

```
I scored 18/20 (90%) on Amazon or AWS Quiz!
Can you beat me?
https://ishiharatma.github.io/aws-or-amazon-quiz/
```

---

## 将来拡張（実装外）

- 問題数選択（10 / 20 / 50 / All）
- カテゴリ別出題
- タイムアタックモード
- PWA 対応
- LocalStorage への成績保存
