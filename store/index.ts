import { ActionTree, MutationTree } from 'vuex';
import { Country, FootballApiResponse, LeagueInfo, Player, Standing, StandingInfo, Team, TeamSquad, TeamStatistics } from '../static/types';

export interface RootState {
  countries: Country[];
  leagues: LeagueInfo[];
  standingByRound: Record<string, Standing[]>;
  rounds: string[];
  team: Team | null;
  teamStatistic: TeamStatistics | null;
  players: Player[];
  selectedCountry: string | null;
  selectedLeagueId: number | null;
  selectedSeason: number | null;
  selectedRound: string | null;
}

export const state = (): RootState => ({
  countries: [],
  leagues: [],
  standingByRound: {},
  rounds: [],
  team: null,
  teamStatistic: null,
  players: [],
  selectedCountry: null,
  selectedLeagueId: null,
  selectedSeason: null,
  selectedRound: null
});

export const mutations: MutationTree<RootState> = {
  setCountries: (state, countries) => {
    state.countries = countries;
  },
  setLeagues: (state, leagues) => {
    state.leagues = leagues;
  },
  setStandingByRound: (state, standingByRound) => {
    state.standingByRound = standingByRound;
  },
  setRounds: (state, rounds) => {
    state.rounds = rounds;
  },
  setTeam: (state, team) => {
    state.team = team;
  },
  setTeamStatistic: (state, teamStatistic) => {
    state.teamStatistic = teamStatistic;
  },
  setPlayers: (state, players) => {
    state.players = players;
  },
  setSelectedCountry: (state, country) => {
    state.selectedCountry = country;
  },
  setSelectedLeagueId: (state, leagueId) => {
    state.selectedLeagueId = leagueId;
  },
  setSelectedSeason: (state, season) => {
    state.selectedSeason = season;
  },
  setSelectedRound: (state, round) => {
    state.selectedRound = round;
  }
};

export const actions: ActionTree<RootState, RootState> = {
  async fetchCountries({ commit }) {
    commit('setLoading', true); // Set loading to true
    try {
      const { data } = await this.$axios.get<FootballApiResponse<Country[]>>('/api/countries');
      commit('setCountries', data.response);
      commit('setError', null); // Clear error on success
    } catch (error) {
      console.error('Error fetching countries:', error);
      commit('setError', 'Failed to fetch countries'); // Set error message
    } finally {
      commit('setLoading', false); // Set loading to false
    }
  },
  async fetchLeagues({ commit }, countryCode: string) {
    commit('setLoading', true); // Set loading to true
    try {
      const { data } = await this.$axios.get<FootballApiResponse<LeagueInfo[]>>(`/api/leagues?country=${countryCode}`);
      commit('setLeagues', data.response);
      commit('setError', null); // Clear error on success
    } catch (error) {
      console.error('Error fetching leagues:', error);
      commit('setError', 'Failed to fetch leagues'); // Set error message
    } finally {
      commit('setLoading', false); // Set loading to false
    }
  },
  async fetchStandings({ commit }, { leagueId, season }: { leagueId: number; season: number }) {
    commit('setLoading', true); // Set loading to true
    try {
      const { data } = await this.$axios.get<FootballApiResponse<{ league: StandingInfo }[]>>(`/api/standings?league=${leagueId}&season=${season}`);

      const rounds: string[] = [];
      const standingByRound: Record<string, Standing[]> = {};
      data.response.at(0)?.league.standings.forEach((standings) => {
        const groupName = standings.at(0)?.group;
        if (groupName) {
          rounds.push(groupName);
          standingByRound[groupName] = standings;
        }
      });

      commit('setRounds', rounds);
      commit('setStandingByRound', standingByRound);
      commit('setError', null); // Clear error on success
    } catch (error) {
      console.error('Error fetching standings:', error);
      commit('setError', 'Failed to fetch standings'); // Set error message
    } finally {
      commit('setLoading', false); // Set loading to false
    }
  },
  async fetchTeam({ commit }, teamId: number) {
    commit('setLoading', true); // Set loading to true
    try {
      const { data } = await this.$axios.get<FootballApiResponse<Team[]>>(`/api/teams?id=${teamId}`);
      commit('setTeam', data.response.at(0));
      commit('setError', null); // Clear error on success
    } catch (error) {
      console.error('Error fetching team:', error);
      commit('setError', 'Failed to fetch team'); // Set error message
    } finally {
      commit('setLoading', false); // Set loading to false
    }
  },
  async fetchTeamStatistics({ commit }, { season, team, league }: { season: number; team: number; league: number }) {
    commit('setLoading', true); // Set loading to true
    try {
      const { data } = await this.$axios.get<FootballApiResponse<TeamStatistics>>(`/api/teams/statistics?season=${season}&team=${team}&league=${league}`);
      commit('setTeamStatistic', data.response);
      commit('setError', null); // Clear error on success
    } catch (error) {
      console.error('Error fetching standings:', error);
      commit('setError', 'Failed to fetch team statistics'); // Set error message
    } finally {
      commit('setLoading', false); // Set loading to false
    }
  },
  async fetchPlayers({ commit }, teamId: number) {
    commit('setLoading', true); // Set loading to true
    try {
      const { data } = await this.$axios.get<FootballApiResponse<TeamSquad[]>>(`/api/players/squads?team=${teamId}`);
      commit('setPlayers', data.response.at(0)?.players);
      commit('setError', null); // Clear error on success
    } catch (error) {
      console.error('Error fetching team:', error);
      commit('setError', 'Failed to fetch team'); // Set error message
    } finally {
      commit('setLoading', false); // Set loading to false
    }
  },
  onCountryChange({ commit }, country) {
    commit('setSelectedCountry', country);
  },
  onLeagueChange({ commit }, leagueId) {
    commit('setSelectedLeagueId', leagueId);
  },
  onSeasonChange({ commit }, season) {
    commit('setSelectedSeason', season);
  },
  onRoundChange({ commit }, round) {
    commit('setSelectedRound', round);
  }
};
