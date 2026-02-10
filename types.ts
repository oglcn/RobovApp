export type Difficulty = 'easy' | 'medium' | 'hard';
export type Language = 'tr' | 'en';
export type GameMode = 'treasure' | 'quiz' | 'qr';
export type FontSizeLevel = 0 | 1 | 2; // 0: Normal, 1: Large, 2: Extra Large

export interface LocalizedString {
    tr: string;
    en: string;
}

export interface LocalizedStringArray {
    tr: string[];
    en: string[];
}

export interface QuestionData {
    text: LocalizedString;
    options: LocalizedStringArray;
    correct: number;
    image?: string;
}

export interface Artifact {
    id: number;
    qrCode: string; // Unique QR code identifier (e.g., "ROBOV_ART_1")
    name: LocalizedString;
    museums?: string[];
    image: string;
    hint: LocalizedString; // Riddle/Clue for Treasure Hunt
    inspectionQuestion: QuestionData; // Observation question after finding artifact
    questions: {
        easy: QuestionData;
        medium: QuestionData;
        hard: QuestionData;
    };
}

export interface GameQuestion {
    artifactName: string;
    image: string;
    text: string;
    options: string[];
    correct: number;
    isBonus?: boolean;
    museums?: string[];
    hint?: LocalizedString; // Added for Treasure Hunt
    inspectionQuestion?: QuestionData; // Added for Treasure Hunt
}

export interface UserAnswer {
    selectedOption: number;
    isCorrect: boolean;
    scoreDelta: number;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export interface LeaderboardEntry {
    name: string;
    score: number;
    date: string;
}
