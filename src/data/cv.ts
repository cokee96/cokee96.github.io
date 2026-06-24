import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as yaml from 'js-yaml';

const raw = readFileSync(resolve(process.cwd(), 'cv.yaml'), 'utf8');
export const cv = yaml.load(raw) as Cv;

export interface CvProfile {
  name: string;
  role: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface CvJob {
  company: string;
  role: string;
  start: string;
  end: string | null;
  tags: string[];
  bullets: string[];
}

export interface CvSkillGroup {
  label: string;
  items: string[];
}

export interface CvProject {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  badge: string;
  github: string;
}

export interface CvEducation {
  institution: string;
  degree: string;
  period: string;
}

export interface Cv {
  profile: CvProfile;
  experience: CvJob[];
  skills: CvSkillGroup[];
  projects: CvProject[];
  education: CvEducation[];
}

function formatPeriod(start: string, end: string | null): string {
  const fmt = (s: string) => {
    const [y, m] = s.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(m, 10) - 1]} ${y}`;
  };
  return `${fmt(start)} – ${end ? fmt(end) : 'Present'}`;
}

export const experience = cv.experience.map(j => ({
  ...j,
  period: formatPeriod(j.start, j.end),
  current: j.end === null,
}));
