<template>
  <main class="min-h-screen px-4 pb-12 pt-8 sm:px-6 md:px-8 lg:px-12">
    <div class="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8">
      <button
        @click="goBack"
        class="bg-primary hover:bg-primary/90 focus:ring-primary/50 mb-2 inline-flex w-fit items-center gap-2 rounded-md py-2 pl-3 pr-4 text-white transition-colors focus:outline-none focus:ring-2"
        aria-label="Go back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-arrow-left"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Back
      </button>
      <header class="flex flex-row flex-wrap items-center gap-3">
        <img :src="team?.team.logo" alt="Team Logo" class="size-16 object-contain md:size-12" />
        <div class="flex flex-col flex-wrap md:flex-row md:items-center">
          <h1 class="mr-3 text-nowrap text-3xl font-bold text-gray-800">{{ team?.team.name }}</h1>
          <div class="h-fit text-nowrap rounded-md border border-slate-300 px-2.5 py-0.5 text-center text-sm text-slate-600 shadow-sm transition-all">
            {{ team?.venue.city }}, {{ team?.team.country }}
          </div>
        </div>

        <b-button v-b-modal.stadium-modal class="text-nowrap sm:ml-auto">View Stadium</b-button>
        <b-modal id="stadium-modal" title="Stadium Information" hide-footer>
          <img :src="team?.venue.image" alt="Stadium Image" class="w-full rounded-lg" />
          <p class="mt-3"><strong>Stadium Name:</strong> {{ team?.venue.name }}</p>
          <p><strong>Address:</strong> {{ team?.venue.address }}</p>
          <p><strong>Capacity:</strong> {{ team?.venue.capacity }}</p>
          <p><strong>Surface:</strong> {{ team?.venue.surface.charAt(0).toUpperCase() + team?.venue.surface.slice(1) }}</p>
        </b-modal>
      </header>
      <div class="flex flex-col gap-6 md:flex-row">
        <section class="flex-2 flex min-w-0 flex-col gap-6 rounded-xl border bg-gray-50 p-6">
          <h2 class="text-xl font-bold text-gray-800">Team Season Statistics</h2>

          <!-- League and Team Information -->
          <div v-if="teamStatistic" class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div class="rounded-lg border bg-white p-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-semibold text-gray-700">League Information</h3>
                  <p class="mt-2"><span class="font-medium">Name:</span> {{ teamStatistic.league.name }}</p>
                  <p><span class="font-medium">Country:</span> {{ teamStatistic.league.country }}</p>
                  <p><span class="font-medium">Season:</span> {{ teamStatistic.league.season }}</p>
                </div>
                <div class="flex flex-col items-end gap-2">
                  <img :src="teamStatistic.league.logo" alt="League Logo" class="h-12 w-12 object-contain" />
                  <img :src="teamStatistic.league.flag" alt="Country Flag" class="h-8 w-12 object-contain" />
                </div>
              </div>
            </div>

            <div class="rounded-lg border bg-white p-4">
              <div>
                <h3 class="font-semibold text-gray-700">Season Form</h3>
                <div class="mt-2 flex flex-wrap gap-1 whitespace-nowrap text-sm">
                  <span
                    v-for="(char, index) in teamStatistic.form?.split('')"
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
                </div>
              </div>
            </div>
          </div>

          <!-- Match Statistics -->
          <div v-if="teamStatistic" class="rounded-lg border bg-white p-4">
            <h3 class="mb-3 font-semibold text-gray-700">Season Record</h3>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
              <div class="rounded-md border p-3">
                <div class="text-center">
                  <h4 class="mb-3 font-medium text-gray-600">Matches</h4>
                  <div class="flex justify-center gap-4">
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Home</p>
                      <p class="text-lg font-bold">{{ teamStatistic.fixtures.played.home }}</p>
                    </div>
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Away</p>
                      <p class="text-lg font-bold">{{ teamStatistic.fixtures.played.away }}</p>
                    </div>
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Total</p>
                      <p class="text-lg font-bold">{{ teamStatistic.fixtures.played.total }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="rounded-md border p-3">
                <div class="text-center">
                  <h4 class="mb-3 font-medium text-gray-600">Wins</h4>
                  <div class="flex justify-center gap-4">
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Home</p>
                      <p class="text-lg font-bold text-green-600">{{ teamStatistic.fixtures.wins.home }}</p>
                    </div>
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Away</p>
                      <p class="text-lg font-bold text-green-600">{{ teamStatistic.fixtures.wins.away }}</p>
                    </div>
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Total</p>
                      <p class="text-lg font-bold text-green-600">{{ teamStatistic.fixtures.wins.total }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="rounded-md border p-3">
                <div class="text-center">
                  <h4 class="mb-3 font-medium text-gray-600">Clean Sheets</h4>
                  <div class="flex justify-center gap-4">
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Home</p>
                      <p class="text-lg font-bold text-blue-600">{{ teamStatistic.clean_sheet.home }}</p>
                    </div>
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Away</p>
                      <p class="text-lg font-bold text-blue-600">{{ teamStatistic.clean_sheet.away }}</p>
                    </div>
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Total</p>
                      <p class="text-lg font-bold text-blue-600">{{ teamStatistic.clean_sheet.total }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="rounded-md border p-3">
                <div class="text-center">
                  <h4 class="mb-3 font-medium text-gray-600">Draws</h4>
                  <div class="flex justify-center gap-4">
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Home</p>
                      <p class="text-lg font-bold text-yellow-600">{{ teamStatistic.fixtures.draws.home }}</p>
                    </div>
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Away</p>
                      <p class="text-lg font-bold text-yellow-600">{{ teamStatistic.fixtures.draws.away }}</p>
                    </div>
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Total</p>
                      <p class="text-lg font-bold text-yellow-600">{{ teamStatistic.fixtures.draws.total }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="rounded-md border p-3">
                <div class="text-center">
                  <h4 class="mb-3 font-medium text-gray-600">Losses</h4>
                  <div class="flex justify-center gap-4">
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Home</p>
                      <p class="text-lg font-bold text-red-600">{{ teamStatistic.fixtures.loses.home }}</p>
                    </div>
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Away</p>
                      <p class="text-lg font-bold text-red-600">{{ teamStatistic.fixtures.loses.away }}</p>
                    </div>
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Total</p>
                      <p class="text-lg font-bold text-red-600">{{ teamStatistic.fixtures.loses.total }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="rounded-md border p-3">
                <div class="text-center">
                  <h4 class="mb-3 font-medium text-gray-600">Failed to Score</h4>
                  <div class="flex justify-center gap-4">
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Home</p>
                      <p class="text-lg font-bold text-gray-700">{{ teamStatistic.failed_to_score.home }}</p>
                    </div>
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Away</p>
                      <p class="text-lg font-bold text-gray-700">{{ teamStatistic.failed_to_score.away }}</p>
                    </div>
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Total</p>
                      <p class="text-lg font-bold text-gray-700">{{ teamStatistic.failed_to_score.total }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Goals Statistics -->
          <div v-if="teamStatistic" class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div class="rounded-lg border bg-white p-4">
              <h3 class="mb-3 font-semibold text-gray-700">Goals Scored</h3>
              <div class="mb-3 rounded-md border p-3">
                <div class="text-center">
                  <div class="flex justify-center gap-4">
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Home</p>
                      <p class="text-xl font-bold text-green-600">{{ teamStatistic.goals.for.total.home }}</p>
                    </div>
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Away</p>
                      <p class="text-xl font-bold text-green-600">{{ teamStatistic.goals.for.total.away }}</p>
                    </div>
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Total</p>
                      <p class="text-xl font-bold text-green-600">{{ teamStatistic.goals.for.total.total }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="rounded-md border p-3">
                <h4 class="mb-3 text-center font-medium text-gray-600">Goals Scored by Minute</h4>
                <div class="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div v-for="(data, interval) in teamStatistic.goals.for.minute" :key="interval" class="flex justify-between">
                    <span>{{ interval }}</span>
                    <span class="font-medium text-green-600"> {{ data.total }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="rounded-lg border bg-white p-4">
              <h3 class="mb-3 font-semibold text-gray-700">Goals Conceded</h3>
              <div class="mb-3 rounded-md border p-3">
                <div class="text-center">
                  <div class="flex justify-center gap-4">
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Home</p>
                      <p class="text-xl font-bold text-red-600">{{ teamStatistic.goals.against.total.home }}</p>
                    </div>
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Away</p>
                      <p class="text-xl font-bold text-red-600">{{ teamStatistic.goals.against.total.away }}</p>
                    </div>
                    <div class="text-center">
                      <p class="text-sm text-gray-500">Total</p>
                      <p class="text-xl font-bold text-red-600">{{ teamStatistic.goals.against.total.total }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="rounded-md border p-3">
                <h4 class="mb-3 text-center font-medium text-gray-600">Goals Conceded by Minute</h4>
                <div class="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div v-for="(data, interval) in teamStatistic.goals.against.minute" :key="interval" class="flex justify-between">
                    <span>{{ interval }}</span>
                    <span class="font-medium text-red-600">{{ data.total }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Statistics -->
          <div v-if="teamStatistic" class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div class="rounded-lg border bg-white p-4">
              <h3 class="mb-3 font-semibold text-gray-700">Team Records</h3>
              <div class="mb-4 rounded-md border p-3">
                <h4 class="mb-3 text-center font-medium text-gray-600">Longest Streak</h4>
                <div class="grid grid-cols-3 gap-2">
                  <div class="text-center">
                    <p class="text-sm text-gray-500">Wins</p>
                    <p class="text-lg font-bold text-green-600">{{ teamStatistic.biggest.streak.wins }}</p>
                  </div>
                  <div class="text-center">
                    <p class="text-sm text-gray-500">Draws</p>
                    <p class="text-lg font-bold text-yellow-600">{{ teamStatistic.biggest.streak.draws }}</p>
                  </div>
                  <div class="text-center">
                    <p class="text-sm text-gray-500">Losses</p>
                    <p class="text-lg font-bold text-red-600">{{ teamStatistic.biggest.streak.loses }}</p>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
                <div class="rounded-md border bg-white p-3">
                  <h4 class="mb-3 text-center font-medium text-gray-600">Biggest Win</h4>
                  <div class="grid grid-cols-1 gap-x-4 gap-y-2">
                    <div class="flex justify-between">
                      <span>Home</span>
                      <span class="font-medium text-green-600"> {{ teamStatistic.biggest.wins.home }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Away</span>
                      <span class="font-medium text-green-600"> {{ teamStatistic.biggest.wins.away }}</span>
                    </div>
                  </div>
                </div>
                <div class="rounded-md border bg-white p-3">
                  <h4 class="mb-3 text-center font-medium text-gray-600">Biggest Loss</h4>
                  <div class="grid grid-cols-1 gap-x-4 gap-y-2">
                    <div class="flex justify-between">
                      <span>Home</span>
                      <span class="font-medium text-red-600"> {{ teamStatistic.biggest.loses.home }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Away</span>
                      <span class="font-medium text-red-600"> {{ teamStatistic.biggest.loses.away }}</span>
                    </div>
                  </div>
                </div>
                <div class="rounded-md border bg-white p-3">
                  <h4 class="mb-3 text-center font-medium text-gray-600">Most Goals Scored</h4>
                  <div class="grid grid-cols-1 gap-x-4 gap-y-2">
                    <div class="flex justify-between">
                      <span>Home</span>
                      <span class="font-medium text-green-600"> {{ teamStatistic.biggest.goals.for.home }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Away</span>
                      <span class="font-medium text-green-600"> {{ teamStatistic.biggest.goals.for.away }}</span>
                    </div>
                  </div>
                </div>
                <div class="rounded-md border bg-white p-3">
                  <h4 class="mb-3 text-center font-medium text-gray-600">Most Goals Conceded</h4>
                  <div class="grid grid-cols-1 gap-x-4 gap-y-2">
                    <div class="flex justify-between">
                      <span>Home</span>
                      <span class="font-medium text-red-600"> {{ teamStatistic.biggest.goals.against.home }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Away</span>
                      <span class="font-medium text-red-600"> {{ teamStatistic.biggest.goals.against.away }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="rounded-lg border bg-white p-4">
              <h3 class="mb-3 font-semibold text-gray-700">Discipline & Penalties</h3>

              <div class="mb-4 rounded-md border p-3">
                <h4 class="mb-3 text-center font-medium text-gray-600">Penalties</h4>
                <div class="grid grid-cols-3 gap-2">
                  <div class="text-center">
                    <p class="text-sm text-gray-500">Total</p>
                    <p class="text-lg font-bold">{{ teamStatistic.penalty.total }}</p>
                  </div>
                  <div class="text-center">
                    <p class="text-sm text-gray-500">Scored</p>
                    <p class="text-lg font-bold text-green-600">{{ teamStatistic.penalty.scored.total }}</p>
                    <p class="text-sm">({{ teamStatistic.penalty.scored.percentage }})</p>
                  </div>
                  <div class="text-center">
                    <p class="text-sm text-gray-500">Missed</p>
                    <p class="text-lg font-bold text-red-600">{{ teamStatistic.penalty.missed.total }}</p>
                    <p class="text-sm">({{ teamStatistic.penalty.missed.percentage }})</p>
                  </div>
                </div>
              </div>

              <div class="flex flex-col gap-4">
                <div class="rounded-md border p-3">
                  <h4 class="mb-3 text-center font-medium text-gray-600">Yellow Cards</h4>
                  <div class="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div v-for="(data, interval) in teamStatistic.cards.yellow" :key="interval" v-if="typeof interval === 'string' && interval.trim() !== ''" class="flex justify-between">
                      <span>{{ interval }}</span>
                      <span class="font-medium text-yellow-600"> {{ data.total }}</span>
                    </div>
                  </div>
                </div>

                <div class="rounded-md border p-3">
                  <h4 class="mb-3 text-center font-medium text-gray-600">Red Cards</h4>
                  <div class="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div v-for="(data, interval) in teamStatistic.cards.red" :key="interval" v-if="typeof interval === 'string' && interval.trim() !== ''" class="flex justify-between">
                      <span>{{ interval }}</span>
                      <span class="font-medium text-red-600"> {{ data.total }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Goals Over/Under Statistics -->
          <div v-if="teamStatistic" class="rounded-lg border bg-white p-4">
            <h3 class="mb-3 font-semibold text-gray-700">Goals Over/Under Statistics</h3>

            <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div class="overflow-x-auto rounded-md border">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="w-1/2 text-nowrap px-4 py-2 text-left text-sm font-medium text-gray-600">Goals scored</th>
                      <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Over</th>
                      <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Under</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(data, key) in teamStatistic.goals.for.under_over" :key="key" class="hover:bg-gray-50">
                      <td class="w-1/2 text-nowrap px-4 py-2 text-sm text-gray-900">{{ key }} Goals</td>
                      <td class="px-4 py-2 text-sm text-green-600">{{ data.over }}</td>
                      <td class="px-4 py-2 text-sm text-blue-600">{{ data.under }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="overflow-x-auto rounded-md border">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="w-1/2 text-nowrap px-4 py-2 text-left text-sm font-medium text-gray-600">Goals Conceded</th>
                      <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Over</th>
                      <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Under</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(data, key) in teamStatistic.goals.against.under_over" :key="key" class="hover:bg-gray-50">
                      <td class="w-1/2 text-nowrap px-4 py-2 text-sm text-gray-900">{{ key }} Goals</td>
                      <td class="px-4 py-2 text-sm text-red-600">{{ data.over }}</td>
                      <td class="px-4 py-2 text-sm text-blue-600">{{ data.under }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        <section class="flex h-fit w-full min-w-96 flex-1 flex-col gap-6 overflow-scroll rounded-xl border bg-gray-50 p-6">
          <div class="flex flex-row items-center gap-2">
            <h2 class="text-lg font-bold text-gray-800">Players</h2>
            <div v-if="playersLength > 0" class="rounded-md border border-slate-300 px-2.5 py-0.5 text-center text-sm text-slate-600 shadow-sm transition-all">{{ playersLength }}</div>
          </div>
          <div v-for="(players, position, index) in playersByPosition" :key="position">
            <span class="text-sm font-normal text-gray-500">{{ position }}</span>
            <div v-for="player in players" :key="player.id" class="mt-2 flex flex-row items-center gap-1.5">
              <img :src="player.photo" :alt="player.name" class="size-10 rounded-full object-contain object-center" />
              <p class="text-nowrap">{{ player.name }}</p>
              <div v-if="player.number" class="relative flex items-center justify-center">
                <svg
                  class="size-8"
                  :class="{
                    'text-green-800': index % 4 === 0, // First position
                    'text-blue-800': index % 4 === 1, // Second position
                    'text-red-800': index % 4 === 2, // Third position
                    'text-gray-800': index % 4 === 3 // Fourth position
                  }"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.4565 3.46L16.5138 2C16.5138 3.06087 16.0383 4.07828 15.1918 4.82843C14.3452 5.57857 13.1971 6 12 6C10.8029 6 9.65475 5.57857 8.80825 4.82843C7.96174 4.07828 7.48618 3.06087 7.48618 2L2.54355 3.46C2.03279 3.61079 1.59968 3.91842 1.3224 4.32734C1.04511 4.73627 0.941908 5.21956 1.03142 5.69L1.68592 9.16C1.72889 9.39491 1.86499 9.60855 2.06976 9.76251C2.27453 9.91648 2.53455 10.0007 2.80309 10H5.22927V20C5.22927 21.1 6.24488 22 7.48618 22H16.5138C17.1124 22 17.6864 21.7893 18.1097 21.4142C18.5329 21.0391 18.7707 20.5304 18.7707 20V10H21.1969C21.4655 10.0007 21.7255 9.91648 21.9302 9.76251C22.135 9.60855 22.2711 9.39491 22.3141 9.16L22.9686 5.69C23.0581 5.21956 22.9549 4.73627 22.6776 4.32734C22.4003 3.91842 21.9672 3.61079 21.4565 3.46Z"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="absolute text-xs text-green-100">{{ player.number }}</span>
              </div>
              <div class="inline text-nowrap rounded-md border border-transparent bg-slate-100 px-2.5 py-0.5 text-sm text-slate-600 shadow-sm transition-all">
                {{ player.age }} <span class="hidden lg:inline">years old</span><span class="inline lg:hidden">y/o</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Player, Team, TeamStatistics } from '../../static/types';

@Component({})
export default class TeamPage extends Vue {
  teamId: string | null = null;
  season: string | null = null;
  leagueId: string | null = null;

  get team(): Team {
    return this.$store.state.team;
  }

  get teamStatistic(): TeamStatistics {
    return this.$store.state.teamStatistic;
  }

  get playersLength(): number {
    return this.$store.state.players.length;
  }

  get playersByPosition(): Record<string, Player[]> {
    return groupBy(this.$store.state.players, 'position');
  }

  async created() {
    this.teamId = this.$route.params.slug;
    this.season = this.$route.query.season as string;
    this.leagueId = this.$route.query.league as string;
    await this.fetchTeam(this.teamId);
    await this.fetchTeamStatistics();
    await this.fetchPlayers();
  }

  async fetchTeam(teamId: string) {
    try {
      await this.$store.dispatch('fetchTeam', teamId);
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  }

  async fetchTeamStatistics() {
    if (this.season && this.leagueId && this.teamId) {
      try {
        await this.$store.dispatch('fetchTeamStatistics', {
          season: Number(this.season),
          team: Number(this.teamId),
          league: Number(this.leagueId)
        });
      } catch (error) {
        console.error('Error fetching team statistics:', error);
      }
    }
  }

  async fetchPlayers() {
    if (this.teamId) {
      try {
        await this.$store.dispatch('fetchPlayers', this.teamId);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    }
  }

  goBack() {
    this.$router.go(-1);
  }
}

type GroupedRecord<T, K extends keyof T> = Record<string, T[]>;

function groupBy<T, K extends keyof T>(array: T[], key: K): GroupedRecord<T, K> {
  return array.reduce(
    (acc, item) => {
      const groupKey = String(item[key]); // Ensure the key is a string for the record
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    },
    {} as GroupedRecord<T, K>
  );
}
</script>

<style scoped>
/* Add any specific styles here */
</style>
