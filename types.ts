
export interface BirthDetails {
  fullName: string;
  dob: string;
  tob: string;
  pob: string;
}

export interface PlanetaryPosition {
  planet: string;
  sign: string;
  house: number;
  nakshatra: string;
  strength: 'Strong' | 'Moderate' | 'Sensitive';
}

export interface Yoga {
  name: string;
  effect: string;
}

export interface VedicReport {
  overview: {
    lagna: string;
    moonSign: string;
    sunSign: string;
    dominantElement: string;
    dominantGuna: string;
  };
  placements: PlanetaryPosition[];
  navamsa: {
    lagna: string;
    placements: PlanetaryPosition[];
    relationshipInsight: string;
    spiritualInsight: string;
    significanceExplanation: string;
  };
  analysis: {
    mind: string;
    intelligence: string;
    action: string;
    growth: string;
    discipline: string;
  };
  yogas: Yoga[];
  career: {
    domains: string[];
    wealthTendencies: string;
  };
  relationships: {
    emotionalPatterns: string;
    marriageTendencies: string;
  };
  health: {
    sensitiveAreas: string[];
    lifestyleGuidance: string;
  };
  dasha: {
    currentMahadasha: string;
    theme: string;
    focus: string;
  };
  transits: {
    influences: string;
    caution: string;
    opportunity: string;
  };
  numerology: {
    driver: number;
    conductor: number;
    traits: string;
  };
  remedies: {
    mantra?: string;
    habit?: string;
    charity?: string;
    color?: string;
    weekday?: string;
  };
}
