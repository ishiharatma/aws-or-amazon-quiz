<div align="center">

<img src="https://img.shields.io/badge/Amazon%20or%20AWS%20%3F-Quiz%20Game-FF9900?style=for-the-badge&labelColor=232F3E" alt="Amazon or AWS Quiz" />

# Amazon or AWS ?

**Can you tell if it's Amazon or AWS?**  
A browser quiz game that tests your knowledge of official AWS service names.

[![Play Now](https://img.shields.io/badge/▶%20Play%20Now-GitHub%20Pages-FF9900?style=for-the-badge&labelColor=232F3E)](https://ishiharatma.github.io/aws-or-amazon-quiz/)
&nbsp;
[![Version](https://img.shields.io/badge/version-v1.7-blue?style=flat-square)](CHANGELOG)
&nbsp;
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

*Read this in other languages:*
[![🇯🇵 日本語](https://img.shields.io/badge/%F0%9F%87%AF%F0%9F%87%B5-日本語-white)](./README.ja.md)
[![🇺🇸 English](https://img.shields.io/badge/%F0%9F%87%BA%F0%9F%87%B8-English-white)](./README.md)

</div>

---

## 🎮 What is this?

AWS services have names that start with either **Amazon** or **AWS** — and the rule isn't always obvious.

> Is it **Amazon** Lambda or **AWS** Lambda?  
> Is it **Amazon** GuardDuty or **AWS** GuardDuty?

This quiz game challenges you to pick the correct prefix for 20 randomly selected AWS services. No login required — just open and play.

---

## 📸 Screenshots

<table>
<tr>
<td align="center" width="33%">

**Start Screen**

```
┌─────────────────────────┐
│  Amazon or AWS ?  v1.7  │  ← Header
├─────────────────────────┤
│                         │
│      Quiz Game          │
│                         │
│   Amazon or AWS ?       │
│  Test your AWS names!   │
│                         │
│  📝 20 questions        │
│  ⌨️  Keyboard support   │
│  🌐 EN / JA             │
│                         │
│   [ Start Quiz ]        │
└─────────────────────────┘
```

</td>
<td align="center" width="33%">

**Quiz Screen**

```
┌─────────────────────────┐
│  Amazon or AWS ?  v1.7  │
├─────────────────────────┤
│ Q 5/20   Score: 4/4     │
│ ████░░░░░░░░░░░░░░░░░░  │
│ 🔥 4 correct in a row!  │
│                         │
│         ⚡              │
│       Lambda            │
│  What's the full name?  │
│                         │
│  [  Amazon  ] [ AWS  ]  │
│                         │
│  ✓ Correct!             │
│  AWS Lambda             │  ← Answer
│  Run code without ...   │
│          [ Next › ]     │  ← Orange btn
└─────────────────────────┘
```

</td>
<td align="center" width="33%">

**Result Screen**

```
┌─────────────────────────┐
│  Amazon or AWS ?  v1.7  │
├─────────────────────────┤
│                         │
│     Quiz Finished!      │
│                         │
│         Score           │
│        18 / 20          │
│                         │
│  ┌──────────┬────────┐  │
│  │ Accuracy │ Result │  │
│  │   90%    │Well    │  │
│  │          │Done!   │  │
│  └──────────┴────────┘  │
│                         │
│  [ Play Again ]         │
│  [ 𝕏 Share on X ]      │
└─────────────────────────┘
```

</td>
</tr>
</table>

---

## 🕹️ How to Play

1. **Press "Start Quiz"** on the start screen
2. **Look at the service name** shown (e.g., `Lambda`, `S3`, `GuardDuty`)
3. **Choose** either `Amazon` or `AWS` — which prefix is correct?
4. **See the result** instantly — you'll learn the full name and a brief description
5. **Press "Next ›"** (or hit **Enter**) to continue
6. **Finish all 20 questions** and see your score!

### ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `1` or `A` | Select "Amazon" |
| `2` or `W` | Select "AWS" |
| `Enter` / `Space` | Go to next question |

---

## 🏆 Score Ratings

| Accuracy | Result |
|---|---|
| 100% | 🟡 **Perfect!!** |
| 95% + | 🟡 **Excellent!** |
| 80% + | 🔵 **Well Done!** |
| 60% + | ⚪ **Almost There!** |
| < 60% | ⚫ **Keep Going!** |

---

## ✨ Features

- **70+ AWS services** in the question pool — randomized every game
- **Bilingual** — Japanese 🇯🇵 and English 🇺🇸, auto-detected from browser language
- **Service descriptions** after every answer so you actually learn
- **Streak counter** — tracks consecutive correct answers
- **Share on X** — post your score to social media
- **Keyboard navigation** for desktop users
- **Dark mode** support
- **No login, no tracking** (except anonymous Google Analytics)
- Works on **mobile and desktop**

---

## 🚀 Play Online

> **[▶ Play now on GitHub Pages](https://ishiharatma.github.io/aws-or-amazon-quiz/)**

No installation needed — just click and play in your browser.

---

## 🛠️ Tech Stack

| | |
|---|---|
| Language | TypeScript (Vanilla, no framework) |
| Build | Vite 5 |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

---

## 📄 License

MIT © [issy](https://ishiharatma.github.io/)
