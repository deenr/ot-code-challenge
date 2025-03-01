// Types

export interface FootballApiResponse<T> {
  get: string;
  parameters: Record<string, any>;
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: T;
}

export interface Country {
  code: string;
  flag: string;
  name: string;
}

export interface League {
  id: number;
  name: string;
  type: string;
  logo: string;
}

export interface LeagueInfo {
  league: League;
  country: Country;
  seasons: Array<{
    year: number;
    start: string;
    end: string;
    current: boolean;
    coverage: {
      fixtures: {
        events: boolean;
        lineups: boolean;
        statistics_fixtures: boolean;
        statistics_players: boolean;
      };
      standings: boolean;
      players: boolean;
      top_scorers: boolean;
      top_assists: boolean;
      top_cards: boolean;
      injuries: boolean;
      predictions: boolean;
      odds: boolean;
    };
  }>;
}

export interface Standing {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string | null;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  home: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  away: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  update: string;
}

export interface StandingInfo {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: Standing[][];
}

export interface Team {
  team: {
    id: number;
    name: string;
    code: string;
    country: string;
    founded: number;
    national: boolean;
    logo: string;
  };
  venue: {
    id: number;
    name: string;
    address: string;
    city: string;
    capacity: number;
    surface: string;
    image: string;
  };
}

export interface TeamStatistics {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
  };
  team: TeamShort;
  form: string;
  fixtures: Fixtures;
  goals: Goals;
  biggest: Biggest;
  clean_sheet: CleanSheet;
  failed_to_score: FailedToScore;
  penalty: Penalty;
  lineups: any[];
  cards: Cards;
}
interface TeamShort {
  id: number;
  name: string;
  logo: string;
}

interface Fixtures {
  played: HomeAwayTotal;
  wins: HomeAwayTotal;
  draws: HomeAwayTotal;
  loses: HomeAwayTotal;
}

interface HomeAwayTotal {
  home: number;
  away: number;
  total: number;
}

interface Goals {
  for: GoalsDetail;
  against: GoalsDetail;
}

interface GoalsDetail {
  total: HomeAwayTotal;
  average: HomeAwayTotalString;
  minute: MinuteGoals;
  under_over: UnderOver;
}

interface HomeAwayTotalString {
  home: string;
  away: string;
  total: string;
}

interface MinuteGoals {
  '0-15': MinuteData;
  '16-30': MinuteData;
  '31-45': MinuteData;
  '46-60': MinuteData;
  '61-75': MinuteData;
  '76-90': MinuteData;
  '91-105': MinuteData;
  '106-120': MinuteData;
}

interface MinuteData {
  total: number | null;
  percentage: number | null;
}

interface UnderOver {
  '0.5': OverUnderData;
  '1.5': OverUnderData;
  '2.5': OverUnderData;
  '3.5': OverUnderData;
  '4.5': OverUnderData;
}

interface OverUnderData {
  over: number;
  under: number;
}

interface Biggest {
  streak: Streak;
  wins: HomeAwayString;
  loses: HomeAwayString;
  goals: BiggestGoals;
}

interface Streak {
  wins: number;
  draws: number;
  loses: number;
}

interface HomeAwayString {
  home: string;
  away: string;
}

interface BiggestGoals {
  for: HomeAwayNumber;
  against: HomeAwayNumber;
}

interface HomeAwayNumber {
  home: number;
  away: number;
}

interface CleanSheet {
  home: number;
  away: number;
  total: number;
}

interface FailedToScore {
  home: number;
  away: number;
  total: number;
}

interface Penalty {
  scored: PenaltyDetail;
  missed: PenaltyDetail;
  total: number;
}

interface PenaltyDetail {
  total: number;
  percentage: string;
}

interface Cards {
  yellow: CardMinutes;
  red: CardMinutes;
}

interface CardMinutes {
  '0-15': MinuteData;
  '16-30': MinuteData;
  '31-45': MinuteData;
  '46-60': MinuteData;
  '61-75': MinuteData;
  '76-90': MinuteData;
  '91-105': MinuteData;
  '106-120': MinuteData;
}

export interface TeamSquad {
  team: TeamShort;
  players: Player[];
}

interface TeamShort {
  id: number;
  name: string;
  logo: string;
}

export interface Player {
  id: number;
  name: string;
  age: number;
  number: number | null;
  position: string;
  photo: string;
}
