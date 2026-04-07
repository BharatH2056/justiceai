/**
 * JusticeAI TypeScript Type Definitions
 */

// ============ Chat Types ============

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: MessageMetadata;
}

export interface MessageMetadata {
  sources?: string[];
  model?: string;
  relevance?: number;
}

export interface Analysis {
  caseType: string;
  verdict: 'win' | 'loss' | 'partial';
  confidence: number;
  constitutionalGrounds: string[];
  keyFactors: string[];
  strategy: string[];
  laws: LawReference[];
  arguments: {
    for: string[];
    against: string[];
  };
  timeline: TimelineItem[];
  courtroomPrep: CourtroomPrep;
}

export interface LawReference {
  act: string;
  description: string;
  section?: string;
}

export interface TimelineItem {
  stage: string;
  status: 'completed' | 'active' | 'pending';
  detail: string;
  estimatedDate?: string;
}

export interface CourtroomPrep {
  openingStatement: string;
  whatNotToSay: string[];
  judgeQuestions: {
    question: string;
    answer: string;
  }[];
}

// ============ Case Types ============

export interface Case {
  id: string;
  title: string;
  messages: Message[];
  analysis: Analysis | null;
  timestamp: Date;
  jurisdiction?: string;
  tags?: string[];
}

// ============ Chat Settings ============

export type ChatMode = 'copilot' | 'simulator';
export type JudgePersonality = 'Strict' | 'Neutral' | 'Lenient';
export type Jurisdiction =
  | 'National'
  | 'Maharashtra'
  | 'Delhi'
  | 'Karnataka'
  | 'Tamil Nadu'
  | 'West Bengal'
  | 'Uttar Pradesh';

export interface ChatSettings {
  mode: ChatMode;
  judgePersonality: JudgePersonality;
  jurisdiction: Jurisdiction;
}

// ============ Document Types ============

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: DocumentCategory;
  fields: DocumentField[];
  preview: string;
}

export type DocumentCategory = 'notice' | 'complaint' | 'affidavit' | 'rti' | 'agreement';

export interface DocumentField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'number' | 'select' | 'email' | 'phone';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

// ============ Lawyer Types ============

export interface Lawyer {
  id: string;
  name: string;
  specialization: string[];
  city: string;
  state: string;
  experience: number;
  tier: 'senior' | 'mid' | 'junior';
  rating: number;
  reviews: number;
  fees: {
    consultation: number;
    caseRange: string;
  };
  contact: {
    phone?: string;
    email?: string;
    address?: string;
  };
  bio: string;
  languages: string[];
}

// ============ Quiz Types ============

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  grade: string;
  feedback: string;
}

// ============ Case Tracker Types ============

export interface CaseMilestone {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: Date;
  completedDate?: Date;
  category: CaseMilestoneCategory;
}

export type CaseMilestoneCategory =
  | 'filing'
  | 'hearing'
  | 'evidence'
  | 'judgment'
  | 'appeal'
  | 'other';

export interface TrackedCase {
  id: string;
  title: string;
  caseType: string;
  milestones: CaseMilestone[];
  createdAt: Date;
  updatedAt: Date;
  notes: string;
}

// ============ Legal Glossary Types ============

export interface LegalTerm {
  term: string;
  definition: string;
  category: LegalCategory;
  relatedTerms: string[];
  legalReference?: string;
  example?: string;
}

export type LegalCategory = 'constitutional' | 'criminal' | 'civil' | 'corporate' | 'procedural';

// ============ Cost Estimator Types ============

export interface CostEstimate {
  courtFees: number;
  lawyerFees: {
    min: number;
    max: number;
  };
  additionalCosts: {
    documentation: number;
    travel: number;
    misc: number;
  };
  total: {
    min: number;
    max: number;
  };
  breakdown: CostBreakdown[];
}

export interface CostBreakdown {
  item: string;
  amount: number;
  notes: string;
}

// ============ API Response Types ============

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  metadata?: {
    timestamp: string;
    model?: string;
    sources?: string[];
  };
}

export interface ChatRequest {
  messages: Omit<Message, 'id' | 'timestamp'>[];
  personality: JudgePersonality;
  mode: ChatMode;
  jurisdiction: Jurisdiction;
  basePrompt: string;
  stream?: boolean;
}

export interface ChatResponse {
  message: {
    role: 'assistant';
    content: string;
  };
  metadata: {
    sources: string[];
    model: string;
    timestamp: string;
  };
}

// ============ Health Check Types ============

export interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  memory: NodeJS.MemoryUsage;
  rag: {
    loaded: boolean;
    chunks: number;
  };
  ollama: {
    baseUrl: string;
    embeddingModel: string;
    chatModel: string;
  };
}

// ============ Toast Types ============

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastData {
  title?: string;
  message: string;
  duration?: number;
}

export interface Toast extends ToastData {
  id: string;
  type: ToastType;
}

// ============ Utility Types ============

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Nullable<T> = T | null;

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
