export type PostDoctorScores = {
  hook: number;
  caption: number;
  platformFit: number;
  cta: number;
  engagement: number;
  visualAlignment: number;
  total: number;
};

export type PostDoctorReport = {
  summary: string;
  captions: string[];
  hook: string;
  cta: string;
  keywords: string[];
  hashtags: string[];
  strengths: string[];
  improvements: string[];
  scores: PostDoctorScores;
};
