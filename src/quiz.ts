import { Service, QuizState } from './types';

export const QUIZ_COUNT = 20;

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function createQuiz(services: Service[], count = QUIZ_COUNT): QuizState {
  const shuffled = shuffle(services).slice(0, Math.min(count, services.length));
  return {
    services: shuffled,
    currentIndex: 0,
    score: 0,
    answered: false,
    selectedAnswer: null,
    streak: 0,
  };
}

export type Rank = 'legend' | 'master' | 'architect' | 'builder' | 'starter';

export function getRank(score: number, total: number): Rank {
  const pct = (score / total) * 100;
  if (pct === 100) return 'legend';
  if (pct >= 95) return 'master';
  if (pct >= 80) return 'architect';
  if (pct >= 60) return 'builder';
  return 'starter';
}

export function getRankEmoji(rank: Rank): string {
  const map: Record<Rank, string> = {
    legend: '🏆',
    master: '🥇',
    architect: '🥈',
    builder: '🥉',
    starter: '🌱',
  };
  return map[rank];
}

export interface RankMessage {
  main: string;
  color: string;
}

export function getRankMessage(score: number, total: number, lang: 'ja' | 'en'): RankMessage {
  const pct = (score / total) * 100;
  const messages: Array<{ min: number; ja: string; en: string; color: string }> = [
    { min: 100, ja: '完璧！！',         en: 'Perfect!!',       color: '#FF9900' },
    { min: 95,  ja: '素晴らしい！',     en: 'Excellent!',      color: '#FF9900' },
    { min: 80,  ja: 'なかなかいい！',   en: 'Well Done!',      color: '#38B2C4' },
    { min: 60,  ja: 'もう一息！',       en: 'Almost There!',   color: 'var(--text-primary)' },
    { min: 0,   ja: 'まだまだこれから！', en: 'Keep Going!',    color: 'var(--text-muted)' },
  ];
  const m = messages.find(x => pct >= x.min)!;
  return { main: lang === 'ja' ? m.ja : m.en, color: m.color };
}

export const CATEGORY_COLORS: Record<string, string> = {
  compute:    '#FF9900',
  storage:    '#3F8624',
  database:   '#2E73B8',
  networking: '#8C4FFF',
  security:   '#DD344C',
  analytics:  '#01A88D',
  ml:         '#01A2D8',
  developer:  '#C7131F',
  management: '#E7157B',
  messaging:  '#F59300',
  business:   '#7AA116',
};

export const CATEGORY_ICONS: Record<string, string> = {
  compute:    '⚙️',
  storage:    '🗄️',
  database:   '🗃️',
  networking: '🌐',
  security:   '🔒',
  analytics:  '📊',
  ml:         '🤖',
  developer:  '🛠️',
  management: '📋',
  messaging:  '📨',
  business:   '💼',
};
