import { Service, QuizState, Lang } from './types';
import { createQuiz, CATEGORY_COLORS, CATEGORY_ICONS } from './quiz';
// CATEGORY_COLORS and CATEGORY_ICONS used as emoji+color fallback when icon image fails to load
import { getLang, t } from './i18n';
import { renderResult } from './result';

let lang: Lang = getLang();
let state: QuizState | null = null;
let allServices: Service[] = [];

async function loadServices(): Promise<Service[]> {
  const resp = await fetch('./data/services.json');
  if (!resp.ok) throw new Error(`Failed to load services: ${resp.status}`);
  return resp.json() as Promise<Service[]>;
}

function $(selector: string, root: Element | Document = document): Element | null {
  return root.querySelector(selector);
}

function $$(selector: string, root: Element | Document = document): NodeListOf<Element> {
  return root.querySelectorAll(selector);
}

function showScreen(id: string): void {
  $$('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
}

function updateStaticTexts(): void {
  const quizEl = document.getElementById('quiz-screen')!;
  const startEl = document.getElementById('start-screen')!;

  ($('.start-title', startEl) as HTMLElement).textContent = t(lang, 'title');
  ($('.start-subtitle', startEl) as HTMLElement).textContent = t(lang, 'subtitle');
  ($('#start-btn', startEl) as HTMLElement).textContent = t(lang, 'start_btn');

  const langBtn = document.getElementById('lang-toggle') as HTMLButtonElement;
  langBtn.textContent = t(lang, 'lang_toggle');
  langBtn.setAttribute('aria-label', lang === 'ja' ? 'Switch to English' : '日本語に切り替え');
}

function renderQuestion(): void {
  if (!state) return;

  const service = state.services[state.currentIndex];
  const total = state.services.length;
  const idx = state.currentIndex;
  const quizEl = document.getElementById('quiz-screen')!;

  // Progress
  const progressText = lang === 'ja'
    ? `${t(lang, 'question_label')} ${idx + 1} ${t(lang, 'question_of')} ${total}`
    : `${t(lang, 'question_label')} ${idx + 1} ${t(lang, 'question_of')} ${total}`;
  ($('.progress-text', quizEl) as HTMLElement).textContent = progressText;
  ($('.score-text', quizEl) as HTMLElement).textContent =
    `${t(lang, 'score')}: ${state.score}/${idx}`;
  const fill = $('.progress-fill', quizEl) as HTMLElement;
  fill.style.width = `${(idx / total) * 100}%`;

  // Streak
  const streakEl = $('.streak', quizEl) as HTMLElement;
  if (state.streak >= 3) {
    streakEl.textContent = lang === 'ja'
      ? `🔥 ${state.streak}${t(lang, 'streak')}`
      : `🔥 ${state.streak}${t(lang, 'streak')}`;
    streakEl.hidden = false;
  } else {
    streakEl.hidden = true;
  }

  // Icon
  const iconEl = $('.service-icon', quizEl) as HTMLImageElement;
  iconEl.src = `./assets/icons/${service.icon ?? service.id + '.svg'}`;
  iconEl.alt = `${service.name} icon`;
  iconEl.onerror = () => {
    iconEl.style.display = 'none';
    const wrap = iconEl.parentElement!;
    let fallback = wrap.querySelector('.icon-fallback') as HTMLElement | null;
    if (!fallback) {
      fallback = document.createElement('div');
      fallback.className = 'icon-fallback';
      wrap.appendChild(fallback);
    }
    fallback.textContent = CATEGORY_ICONS[service.category] ?? '☁️';
    (fallback as HTMLElement).style.backgroundColor = CATEGORY_COLORS[service.category] ?? '#232F3E';
    fallback.style.display = 'flex';
  };
  // Reset display in case previous icon had error
  iconEl.style.display = '';
  const existingFallback = iconEl.parentElement?.querySelector('.icon-fallback') as HTMLElement | null;
  if (existingFallback) existingFallback.style.display = 'none';

  // Service name
  ($('.service-name', quizEl) as HTMLElement).textContent = service.name;

  // Question text
  ($('.question-text', quizEl) as HTMLElement).textContent = t(lang, 'question_text');

  // Answer buttons
  const amazonBtn = $('[data-answer="Amazon"]', quizEl) as HTMLButtonElement;
  const awsBtn = $('[data-answer="AWS"]', quizEl) as HTMLButtonElement;
  amazonBtn.disabled = false;
  awsBtn.disabled = false;
  amazonBtn.className = 'answer-btn';
  awsBtn.className = 'answer-btn';
  amazonBtn.setAttribute('aria-pressed', 'false');
  awsBtn.setAttribute('aria-pressed', 'false');

  // Reset answer area
  const answerArea = $('.answer-result', quizEl) as HTMLElement;
  answerArea.hidden = true;
  answerArea.className = 'answer-result';

  // Next button
  const nextBtn = $('.next-btn', quizEl) as HTMLButtonElement;
  nextBtn.hidden = true;

  // Reset state
  state.answered = false;
  state.selectedAnswer = null;
}

function handleAnswer(answer: 'Amazon' | 'AWS'): void {
  if (!state || state.answered) return;

  const service = state.services[state.currentIndex];
  const correct = answer === service.prefix;

  state.answered = true;
  state.selectedAnswer = answer;
  if (correct) {
    state.score++;
    state.streak++;
  } else {
    state.streak = 0;
  }

  const quizEl = document.getElementById('quiz-screen')!;

  const amazonBtn = $('[data-answer="Amazon"]', quizEl) as HTMLButtonElement;
  const awsBtn = $('[data-answer="AWS"]', quizEl) as HTMLButtonElement;
  const selectedBtn = answer === 'Amazon' ? amazonBtn : awsBtn;
  const otherBtn = answer === 'Amazon' ? awsBtn : amazonBtn;

  selectedBtn.className = `answer-btn ${correct ? 'correct' : 'incorrect'}`;
  selectedBtn.setAttribute('aria-pressed', 'true');
  otherBtn.disabled = true;
  selectedBtn.disabled = true;

  if (!correct) {
    const correctBtn = service.prefix === 'Amazon' ? amazonBtn : awsBtn;
    correctBtn.className = 'answer-btn correct';
  }

  // Update score display
  ($('.score-text', quizEl) as HTMLElement).textContent =
    `${t(lang, 'score')}: ${state.score}/${state.currentIndex + 1}`;

  // Show answer result
  const answerArea = $('.answer-result', quizEl) as HTMLElement;
  answerArea.hidden = false;
  answerArea.className = `answer-result ${correct ? 'correct' : 'incorrect'}`;

  ($('.result-verdict', quizEl) as HTMLElement).textContent =
    t(lang, correct ? 'correct' : 'incorrect');
  ($('.full-name', quizEl) as HTMLElement).textContent =
    `${t(lang, 'full_name_label')}${service.fullName}`;
  ($('.service-description', quizEl) as HTMLElement).textContent =
    lang === 'ja' ? service.descriptionJa : service.descriptionEn;

  // Show streak if fresh milestone
  if (correct && state.streak >= 3) {
    const streakEl = $('.streak', quizEl) as HTMLElement;
    streakEl.textContent = lang === 'ja'
      ? `🔥 ${state.streak}${t(lang, 'streak')}`
      : `🔥 ${state.streak}${t(lang, 'streak')}`;
    streakEl.hidden = false;
  }

  // Next button
  const nextBtn = $('.next-btn', quizEl) as HTMLButtonElement;
  const isLast = state.currentIndex === state.services.length - 1;
  nextBtn.textContent = isLast ? t(lang, 'see_results') : t(lang, 'next');
  nextBtn.hidden = false;
  nextBtn.focus();
}

function handleNext(): void {
  if (!state) return;
  if (state.currentIndex === state.services.length - 1) {
    renderResult(state, lang);
    showScreen('result-screen');
    return;
  }
  state.currentIndex++;
  renderQuestion();
  // Return focus to Amazon button for keyboard users
  const amazonBtn = document.querySelector('[data-answer="Amazon"]') as HTMLButtonElement | null;
  amazonBtn?.focus();
}

function startQuiz(): void {
  state = createQuiz(allServices);
  showScreen('quiz-screen');
  renderQuestion();
  const amazonBtn = document.querySelector('[data-answer="Amazon"]') as HTMLButtonElement | null;
  amazonBtn?.focus();
}

function bindEvents(): void {
  document.getElementById('start-btn')?.addEventListener('click', startQuiz);
  document.getElementById('play-again-btn')?.addEventListener('click', startQuiz);

  $$('[data-answer]').forEach(btn => {
    btn.addEventListener('click', () => {
      handleAnswer(btn.getAttribute('data-answer') as 'Amazon' | 'AWS');
    });
  });

  document.querySelector('.next-btn')?.addEventListener('click', handleNext);

  const langBtn = document.getElementById('lang-toggle') as HTMLButtonElement;
  langBtn.addEventListener('click', () => {
    lang = lang === 'ja' ? 'en' : 'ja';
    updateStaticTexts();
    if (state && !state.answered) {
      renderQuestion();
    } else if (state && state.answered) {
      // re-render answer area texts
      const service = state.services[state.currentIndex];
      const correct = state.selectedAnswer === service.prefix;
      const quizEl = document.getElementById('quiz-screen')!;
      ($('.result-verdict', quizEl) as HTMLElement).textContent =
        t(lang, correct ? 'correct' : 'incorrect');
      ($('.full-name', quizEl) as HTMLElement).textContent =
        `${t(lang, 'full_name_label')}${service.fullName}`;
      ($('.service-description', quizEl) as HTMLElement).textContent =
        lang === 'ja' ? service.descriptionJa : service.descriptionEn;
      ($('.question-text', quizEl) as HTMLElement).textContent = t(lang, 'question_text');
      const isLast = state.currentIndex === state.services.length - 1;
      ($('.next-btn', quizEl) as HTMLButtonElement).textContent =
        isLast ? t(lang, 'see_results') : t(lang, 'next');
    }
    // Re-render result screen if visible
    const resultScreen = document.getElementById('result-screen')!;
    if (resultScreen.classList.contains('active') && state) {
      renderResult(state, lang);
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    const active = document.querySelector('.screen.active')?.id;
    if (active === 'quiz-screen') {
      if (!state?.answered) {
        if (e.key === '1' || e.key.toLowerCase() === 'a') handleAnswer('Amazon');
        if (e.key === '2' || e.key.toLowerCase() === 'w') handleAnswer('AWS');
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNext();
        }
      }
    }
    if (active === 'start-screen' && e.key === 'Enter') {
      startQuiz();
    }
  });
}

async function init(): Promise<void> {
  try {
    allServices = await loadServices();
  } catch (err) {
    console.error('Failed to load services.json', err);
    document.body.innerHTML = '<p style="text-align:center;padding:2rem;">データの読み込みに失敗しました。ページを再読み込みしてください。</p>';
    return;
  }

  updateStaticTexts();
  bindEvents();
  showScreen('start-screen');
}

init();
