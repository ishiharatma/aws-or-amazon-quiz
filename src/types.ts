export interface Service {
  id: string;
  prefix: 'Amazon' | 'AWS';
  name: string;
  fullName: string;
  category: string;
  descriptionJa: string;
  descriptionEn: string;
  icon?: string;
}

export type Lang = 'ja' | 'en';

export interface QuizState {
  services: Service[];
  currentIndex: number;
  score: number;
  answered: boolean;
  selectedAnswer: 'Amazon' | 'AWS' | null;
  streak: number;
}
