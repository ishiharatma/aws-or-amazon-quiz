<div align="center">

<img src="https://img.shields.io/badge/AWS%20or%20Amazon%20%3F-Quiz%20Game-FF9900?style=for-the-badge&labelColor=232F3E" alt="AWS or Amazon Quiz" />

# AWS or Amazon ?

**Can you tell them all apart?!**  
A browser quiz game that tests your knowledge of official AWS service names.

[![Play Now](https://img.shields.io/badge/▶%20Play%20Now-GitHub%20Pages-FF9900?style=for-the-badge&labelColor=232F3E)](https://ishiharatma.github.io/aws-or-amazon-quiz/)
&nbsp;
[![Version](https://img.shields.io/badge/version-v1.8-blue?style=for-the-badge&labelColor=232F3E)](CHANGELOG)
&nbsp;
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=for-the-badge&labelColor=232F3E)](LICENSE)

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

<img src="docs/screenshots/start_en.png" width="260" alt="Start screen" />

</td>
<td align="center" width="33%">

**Quiz Screen**

<img src="docs/screenshots/quiz_en.png" width="260" alt="Quiz screen" />

</td>
<td align="center" width="33%">

**Result Screen**

<img src="docs/screenshots/result_en.png" width="260" alt="Result screen" />

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
| `A` | Select "Amazon" |
| `W` | Select "AWS" |
| `1` / `2` | Select the left / right button (order is randomized each question) |
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

- **150 AWS services** in the question pool — 20 randomly selected every game
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
