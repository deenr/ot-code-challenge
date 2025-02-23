# Opteamal Code Challenge: Competition Standings App

## Overview

This challenge tasks you with creating a Standings Application using Nuxt 2. 
Your Application will display the current standings of a selected competition and will also provide the user with details of the teams within the competition.

### Project Setup

A Nuxt 2 project template with Boostrap-Vue is provided as the base for this challenge.
You are required to use this template. Feel free to install additional packages as needed to complete the challenge.

## Challenge Requirements

### Main Page

-   **Selection:** You should create a small card with some selection possibilities:
    - The country
    - The league
    - The season
    - Optional round: some competitions ,like the belgian competition, are played in different phases. For example a regular season and play-offs. In that case the user should also be able to select the phase of the competition

-   **Standings:** Based on this selection, the homepage should feature a table displaying the standings for the chosen competition including:
    - Rank
    - Logo
    - Team
    - Games Played
    - Points
    - Wins
    - Draws
    - Losses
    - Goal Difference
    - Form (result of last 5 games played as W/D/L)

### Team Details
 
-   **Click to:** Clicking on a row within the table should lead the user to a new page with detailed information of the club that is selected.

-   **General Information:** On the detail page the user can find a card with some general information of the club:
    - Country
    - City
    - Stadium (address, capacity, surface, ...)
    - Image of the stadium

-   **Season Information:** The user should also find some information of the season statistics based on the selection that was made on the Main Page:
    - Total Form
    - Goals For
    - Goals Against
    - Wins
    - Draws
    - Losses
    - ...

-   **Players:** Underneath the information, a table with all the current players should be provided with the following information:
    - Photo
    - Shirtnumber
    - Name
    - Age
    - Position

-   **Data Persistence:** Utilize a store to manage the selections made on the Main Page. Ensure persistence of this data to maintain the Selection when returning from the Team Details back to the Main Page.

### API Integration

- To fetch the data, you are to use the [API-FOOTBALL](https://www.api-football.com/documentation-v3). The api calls should be made usign Axios and the API key should be provided within a `.env` file.
The API Key will be provided before the start of your assignment.
The packages axios & @nuxtjs/axios are already included in the `package.json` file. However, they are not yet included in for example the `nuxt.config.js`.

-   **Get /countries:** Use the get countries endpoint to fetch the countries for the Selection.

-   **Get /leagues:** Use the get leagues endpoint to fetch the leagues within the countries.

-   **Get /leagues/seasons:** Use the get leagues/seasons endpoint to fetch the seasons of a selected league.

-   **Get /standings:** Use the get standings endpoint to fetch the standings for a given league and season. If a competition has more than one round, the endpoint will return more than one *standings*.
    The round Selection dropdown can be created based on this response.

-   **Get /teams:** Use the get teams endpoint to fetch the team & stadium information.

-   **Get /teams/statistics:** Use the get teams endpoint to fetch the team statistics based on the state Selections (team and season).

-   **Get /players/teams:** Use the get players/teams endpoint to fetch the players within the selected team.



## Evaluation Criteria

Your submission will be assessed based on:

-   **Functionality:** Adherence to the requirements and overall functionality of the application.
-   **Code Quality:** Organization, readability, and documentation of code.
-   **UI/UX Design:** The usability and aesthetic appeal of the application interface.
-   **Innovation and Creativity:** Any additional features or enhancements that improve the app's functionality or user experience.

## Submission Guidelines

-   Your completed project should be submitted as a ZIP file.

We look forward to seeing your innovative solution. Best of luck!
