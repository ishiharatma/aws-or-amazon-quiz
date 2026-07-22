import { QuizState, Lang } from './types';
import { getRankMessage } from './quiz';
import { t, tFormat } from './i18n';

export function renderResult(state: QuizState, lang: Lang): void {
  const el = document.getElementById('result-screen')!;
  const total = state.services.length;
  const score = state.score;
  const pct = Math.round((score / total) * 100);

  const finalScoreEl = el.querySelector('.final-score');
  const accuracyEl = el.querySelector('.accuracy-value');
  const rankLabelEl = el.querySelector('.rank-value');
  const resultTitleEl = el.querySelector('.result-title');
  const accuracyLabelEl = el.querySelector('.accuracy-label');
  const rankNameEl = el.querySelector('.rank-label');
  const playAgainBtn = el.querySelector('#play-again-btn');
  const shareBtn = el.querySelector('#share-btn') as HTMLAnchorElement | null;
  const shareBtnText = el.querySelector('#share-btn span');

  if (resultTitleEl) resultTitleEl.textContent = t(lang, 'result_title');
  if (finalScoreEl) finalScoreEl.textContent = `${score} / ${total}`;
  if (accuracyLabelEl) accuracyLabelEl.textContent = t(lang, 'accuracy');
  if (accuracyEl) accuracyEl.textContent = `${pct}%`;
  if (rankNameEl) rankNameEl.textContent = t(lang, 'rank_label');
  if (rankLabelEl) {
    const msg = getRankMessage(score, total, lang);
    rankLabelEl.textContent = msg.main;
    (rankLabelEl as HTMLElement).style.color = msg.color;
  }
  if (playAgainBtn) playAgainBtn.textContent = t(lang, 'play_again');
  if (shareBtnText) shareBtnText.textContent = t(lang, 'share_on_x');

  if (shareBtn) {
    const shareText = tFormat(lang, 'share_text', { score, total, pct });
    const challenge = t(lang, 'share_challenge');
    const url = window.location.href.split('?')[0];
    const tweet = `${shareText}\n${challenge}\n${url}`;
    shareBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    shareBtn.target = '_blank';
    shareBtn.rel = 'noopener noreferrer';
  }
}
