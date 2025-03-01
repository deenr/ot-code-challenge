<template>
  <main class="min-h-screen px-4 pb-12 pt-8 sm:px-6 md:px-8 lg:px-12">
    <div class="mx-auto flex max-w-7xl flex-col items-center gap-6 rounded-lg bg-white sm:gap-8 md:gap-12">
      <article class="flex w-full flex-col gap-4 rounded-xl border bg-gray-50 p-4 md:flex-row">
        <div class="flex-1">
          <label for="input-countries" class="block text-sm font-medium text-gray-700">Countries</label>
          <select
            id="input-countries"
            v-model="selectedCountry"
            @change="onCountryChange"
            required
            placeholder="Select a country"
            :class="{
              'mt-1 block w-full rounded-md border border-gray-300 py-2 pl-2 pr-3 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500': true,
              'cursor-not-allowed bg-gray-200': !countryOptions.length
            }"
            :disabled="!countryOptions.length"
          >
            <option :value="null" disabled>Select a country</option>
            <option v-for="country in countryOptions" :key="country.value" :value="country.value">{{ country.text }}</option>
          </select>
        </div>

        <div class="flex-1">
          <label for="input-leagues" class="block text-sm font-medium text-gray-700">Leagues</label>
          <select
            id="input-leagues"
            v-model="selectedLeagueId"
            @change="onLeagueChange"
            required
            placeholder="Select a league"
            :disabled="!selectedCountry"
            :class="{
              'mt-1 block w-full rounded-md border border-gray-300 py-2 pl-2 pr-3 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500': true,
              'cursor-not-allowed bg-gray-200': !selectedCountry
            }"
          >
            <option :value="null" disabled>Select a league</option>
            <option v-for="league in leagueOptions" :key="league.value" :value="league.value">{{ league.text }}</option>
          </select>
        </div>

        <div class="flex-1">
          <label for="input-seasons" class="block text-sm font-medium text-gray-700">Seasons</label>
          <select
            id="input-seasons"
            v-model="selectedSeason"
            @change="onSeasonChange"
            required
            placeholder="Select a season"
            :disabled="!selectedLeagueId"
            :class="{
              'mt-1 block w-full rounded-md border border-gray-300 py-2 pl-2 pr-3 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500': true,
              'cursor-not-allowed bg-gray-200': !selectedLeagueId
            }"
          >
            <option :value="null" disabled>Select a season</option>
            <option v-for="season in seasonOptions" :key="season" :value="season">{{ season }}</option>
          </select>
        </div>

        <div class="flex-1">
          <div v-if="roundOptions && roundOptions.length > 1">
            <label for="input-rounds" class="block text-sm font-medium text-gray-700">Rounds</label>
            <select
              id="input-rounds"
              v-model="selectedRound"
              @change="onRoundChange"
              required
              placeholder="Select a round"
              :class="{
                'mt-1 block w-full rounded-md border border-gray-300 py-2 pl-2 pr-3 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500': true,
                'cursor-not-allowed bg-gray-200': !roundOptions.length
              }"
            >
              <option :value="null" disabled>Select a round</option>
              <option v-for="round in roundOptions" :key="round" :value="round">{{ round }}</option>
            </select>
          </div>
        </div>
      </article>
      <section class="h-full w-full overflow-hidden rounded-xl border md:mt-0">
        <header v-if="selectedLeagueId && selectedSeason" class="flex flex-row items-center rounded-lg border-b bg-white p-4 shadow-md">
          <img
            v-if="leagues.find(({ league }) => league.id === selectedLeagueId)?.league.logo"
            :src="leagues.find(({ league }) => league.id === selectedLeagueId)?.league.logo"
            alt="League logo"
            class="size-16 rounded-full border-2 border-gray-300 object-contain"
          />
          <div class="ml-2">
            <div class="flex flex-row items-center gap-2">
              <h2 class="text-lg font-semibold text-gray-900">{{ leagues.find(({ league }) => league.id === selectedLeagueId)?.league.name }}</h2>
              <div class="rounded-md border border-slate-300 px-2.5 py-0.5 text-center text-sm text-slate-600 shadow-sm transition-all">{{ selectedSeason }}</div>
            </div>
            <p v-if="selectedRound" class="italic text-gray-500">{{ selectedRound }}</p>
          </div>
        </header>
        <!-- data here -->
        <div class="h-full flex-1" :class="{ 'overflow-y-hidden': !standings, 'overflow-y-auto': standings }">
          <!-- Added a div to enable vertical scrolling -->
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="relative z-20 bg-gray-50">
              <tr>
                <th class="text-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Rank</th>
                <th class="text-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Logo</th>
                <th class="text-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Team</th>
                <th class="text-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Games Played</th>
                <th class="text-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Points</th>
                <th class="text-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Wins</th>
                <th class="text-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Draws</th>
                <th class="text-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Losses</th>
                <th class="text-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Goal Difference</th>
                <th class="text-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Form</th>
              </tr>
            </thead>
            <tbody v-if="standings" class="divide-y divide-gray-200 bg-white">
              <tr v-for="(standing, index) in standings" :key="index" @click="navigateToTeam(standing.team.id)" class="cursor-pointer hover:bg-gray-50">
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{{ standing.rank }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  <img :src="standing.team.logo" alt="Team Logo" class="size-8 object-contain" />
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{{ standing.team.name }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{{ standing.all.played }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{{ standing.points }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{{ standing.all.win }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{{ standing.all.draw }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{{ standing.all.lose }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{{ standing.goalsDiff }}</td>
                <td class="inline-flex gap-1 whitespace-nowrap px-6 py-4 text-sm">
                  <span
                    v-for="(char, index) in standing.form?.split('')"
                    :key="index"
                    class="flex size-6 items-center justify-center rounded-md"
                    :class="{
                      'bg-green-100 text-green-800': char === 'W',
                      'bg-red-100 text-red-800': char === 'L',
                      'bg-yellow-100 text-yellow-800': char === 'D',
                      'bg-gray-100 text-gray-800': !['W', 'L', 'D'].includes(char)
                    }"
                  >
                    {{ char }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <template v-if="!standings && selectedCountry && selectedLeagueId && selectedSeason">
            <div class="sticky left-0 flex min-h-72 flex-col items-center justify-center border-t">
              <div class="h-fit max-w-96">
                <div class="relative mb-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-12 rounded-md border bg-white p-2.5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      d="M21 21L16.65 16.65M11 6C13.7614 6 16 8.23858 16 11M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="circles absolute z-0 size-[768px] overflow-hidden"></div>
                </div>
                <h2 class="text-center text-lg font-semibold text-gray-900">No standings found</h2>
                <p class="text-center text-sm">No results were found, please change your inputs to try again.</p>
              </div>
            </div>
          </template>
          <template v-else-if="!standings">
            <div class="sticky left-0 flex min-h-72 flex-col items-center justify-center border-t">
              <div class="h-fit max-w-96">
                <div class="relative mb-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-12 rounded-md border bg-white p-2.5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      d="M2 4.6C2 4.03995 2 3.75992 2.10899 3.54601C2.20487 3.35785 2.35785 3.20487 2.54601 3.10899C2.75992 3 3.03995 3 3.6 3H20.4C20.9601 3 21.2401 3 21.454 3.10899C21.6422 3.20487 21.7951 3.35785 21.891 3.54601C22 3.75992 22 4.03995 22 4.6V5.26939C22 5.53819 22 5.67259 21.9672 5.79756C21.938 5.90831 21.8901 6.01323 21.8255 6.10776C21.7526 6.21443 21.651 6.30245 21.4479 6.4785L15.0521 12.0215C14.849 12.1975 14.7474 12.2856 14.6745 12.3922C14.6099 12.4868 14.562 12.5917 14.5328 12.7024C14.5 12.8274 14.5 12.9618 14.5 13.2306V18.4584C14.5 18.6539 14.5 18.7517 14.4685 18.8363C14.4406 18.911 14.3953 18.9779 14.3363 19.0315C14.2695 19.0922 14.1787 19.1285 13.9971 19.2012L10.5971 20.5612C10.2296 20.7082 10.0458 20.7817 9.89827 20.751C9.76927 20.7242 9.65605 20.6476 9.58325 20.5377C9.5 20.4122 9.5 20.2142 9.5 19.8184V13.2306C9.5 12.9618 9.5 12.8274 9.46715 12.7024C9.43805 12.5917 9.39014 12.4868 9.32551 12.3922C9.25258 12.2856 9.15102 12.1975 8.94789 12.0215L2.55211 6.4785C2.34898 6.30245 2.24742 6.21443 2.17449 6.10776C2.10986 6.01323 2.06195 5.90831 2.03285 5.79756C2 5.67259 2 5.53819 2 5.26939V4.6Z"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="circles absolute z-0 size-[768px] overflow-hidden"></div>
                </div>
                <h2 class="text-center text-lg font-semibold text-gray-900">Select inputs to view standings</h2>
                <p class="text-center text-sm">Please choose the required inputs to display relevant standings in the table.</p>
              </div>
            </div>
          </template>
        </div>
      </section>
    </div>
  </main>
</template>
<!-- End of Selection -->

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Country, LeagueInfo, Standing } from '../static/types';

@Component
export default class IndexPage extends Vue {
  get selectedCountry() {
    return this.$store.state.selectedCountry;
  }

  get selectedLeagueId() {
    return this.$store.state.selectedLeagueId;
  }

  get selectedSeason() {
    return this.$store.state.selectedSeason;
  }

  get selectedRound() {
    return this.$store.state.selectedRound ?? this.rounds[0];
  }

  get countries(): Country[] {
    return this.$store.state.countries;
  }

  get leagues(): LeagueInfo[] {
    return this.$store.state.leagues;
  }

  get rounds(): string[] {
    return this.$store.state.rounds;
  }

  get standingByRound(): Record<string, Standing[]> {
    return this.$store.state.standingByRound;
  }

  get countryOptions() {
    return this.countries.map((country) => ({
      value: country.name,
      text: country.name
    }));
  }

  get leagueOptions() {
    return this.leagues.map(({ league }) => ({
      value: league.id,
      text: league.name
    }));
  }

  get seasonOptions() {
    return this.leagues.find(({ league }) => league.id === this.selectedLeagueId)?.seasons.map((season) => season.year);
  }

  get roundOptions() {
    if (!this.selectedCountry || !this.selectedLeagueId || !this.selectedSeason) return null;
    return this.rounds;
  }

  get standings() {
    if (!this.selectedCountry || !this.selectedLeagueId || !this.selectedSeason) return null;
    return this.standingByRound?.[this.selectedRound];
  }

  created() {
    this.$store.dispatch('fetchCountries');
  }

  onCountryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const country = target.value;

    this.$store.commit('setSelectedCountry', country);
    this.$store.commit('setSelectedLeagueId', null);
    this.$store.commit('setSelectedSeason', null);
    this.$store.commit('setSelectedRound', null);

    this.fetchLeagues();
    this.fetchStandings();
  }

  onLeagueChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const leagueId = Number(target.value);

    this.$store.commit('setSelectedLeagueId', leagueId);
    this.$store.commit('setSelectedSeason', null);
    this.$store.commit('setSelectedRound', null);

    this.fetchStandings();
  }

  onSeasonChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const season = Number(target.value);

    this.$store.commit('setSelectedSeason', season);
    this.$store.commit('setSelectedRound', null);

    this.fetchStandings();
  }

  onRoundChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    console.log(target.value);

    this.$store.commit('setSelectedRound', target.value);
  }

  fetchLeagues() {
    if (this.selectedCountry) {
      this.$store.dispatch('fetchLeagues', this.selectedCountry);
    }
  }

  fetchStandings() {
    if (this.selectedSeason) {
      this.$store.dispatch('fetchStandings', { leagueId: this.selectedLeagueId, season: this.selectedSeason });
    }
  }

  navigateToTeam(teamId: number) {
    this.$router.push(`team/${teamId.toString()}?season=${this.selectedSeason}&league=${this.selectedLeagueId}`);
  }
}
</script>

<style scoped>
.circles {
  mask-image: url('../static/circles.svg');
  background: radial-gradient(50% 50% at 50% 50%, oklch(0.928 0.006 264.531) 0%, transparent 100%);
}
</style>
