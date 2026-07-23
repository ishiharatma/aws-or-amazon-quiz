import { Lang } from './types';

const translations = {
  ja: {
    title: 'AWS or Amazon ?',
    subtitle: 'あなたはすべてを見分けられるか？！',
    start_btn: 'クイズ開始',
    question_label: '問',
    question_of: '/',
    score: 'スコア',
    question_text: 'このサービスの正式名称は？',
    correct: '⭕ 正解！',
    incorrect: '❌ 不正解',
    full_name_label: '正式名称：',
    next: '次へ',
    see_results: '結果を見る',
    streak: '問連続正解！',
    result_title: 'クイズ終了！',
    accuracy: '正答率',
    rank_label: '評価',
    play_again: 'もう一度',
    share_on_x: 'Xでシェア',
    share_text: 'AWS or Amazon Quiz で {score}/{total} ({pct}%) でした！あなたは？',
    share_challenge: 'あなたもチャレンジ！',
    lang_toggle: 'EN',
    service_total: '全{count}サービス対応',
    service_page: 'AWS公式ページ',
    ranks: {
      legend: 'AWS Naming Legend',
      master: 'AWS Naming Master',
      architect: 'Architect',
      builder: 'Builder',
      starter: 'Getting Started',
    },
  },
  en: {
    title: 'AWS or Amazon ?',
    subtitle: 'Can you tell them all apart?!',
    start_btn: 'Start Quiz',
    question_label: 'Question',
    question_of: '/',
    score: 'Score',
    question_text: 'What is the official prefix for this service?',
    correct: '⭕ Correct!',
    incorrect: '❌ Incorrect',
    full_name_label: 'Full name: ',
    next: 'Next',
    see_results: 'See Results',
    streak: ' correct in a row!',
    result_title: 'Quiz Finished!',
    accuracy: 'Accuracy',
    rank_label: 'Result',
    play_again: 'Play Again',
    share_on_x: 'Share on X',
    share_text: 'I scored {score}/{total} ({pct}%) on AWS or Amazon Quiz!',
    share_challenge: 'Can you beat me?',
    lang_toggle: 'JA',
    service_total: '{count} services',
    service_page: 'AWS Service Page',
    ranks: {
      legend: 'AWS Naming Legend',
      master: 'AWS Naming Master',
      architect: 'Architect',
      builder: 'Builder',
      starter: 'Getting Started',
    },
  },
} as const;

type Translations = typeof translations;
type JaTranslations = Translations['ja'];

export function getLang(): Lang {
  const nav = (navigator.language || navigator.languages?.[0] || 'en').toLowerCase();
  return nav.startsWith('ja') ? 'ja' : 'en';
}

export function t(lang: Lang, key: string): string {
  const dict = translations[lang] as Record<string, unknown>;
  const parts = key.split('.');
  let val: unknown = dict;
  for (const part of parts) {
    if (val && typeof val === 'object') {
      val = (val as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  return typeof val === 'string' ? val : key;
}

export function tFormat(lang: Lang, key: string, vars: Record<string, string | number>): string {
  let str = t(lang, key);
  for (const [k, v] of Object.entries(vars)) {
    str = str.replace(`{${k}}`, String(v));
  }
  return str;
}
