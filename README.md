# Maths Quiz

## About the Project
  I began working on this when beginning my coursework in Full Stack Development. As my daughter was 5 and a half at the time and learning basic mathematics, I thought a maths game would be a sound first project idea. I set out to create a maths game for my daughter with the following points in mind:

 * Basic addition and subtraction, using formal mathematical notation.
 * Aimed at children aged 5 - 7, specifially for dealing with formal, abstract mathematical notation.
 * Simple child-frendly interface requiring minimal adult assistance
 * Adaptability between large or small screen devices
 * Keyboard, mouse, and touch interactivity.

 At the time, I had only explored HTML5, CSS3, and vanilla JavaScript without having yet learned React, Bootstrap, or any other frameworks or libraries.

## Features

- **Game Modes**: Choose from three different game modes: addition, subtraction, and friends of 10.
- **Difficulty Levels**: Each mode includes three difficulty levels to cater to different learning stages.
- **Interactive Interface**: Designed with touch-friendly number buttons for ease of use on both desktop and mobile devices.
- **Keyboard Support**: Users can input answers using the keyboard (numbers, delete, backspace and enter key) in addition to clicking or touching buttons.
- **Progress Tracking**: The game keeps track of questions using a progress bar to show users how far through a game they are.
- **Results Display**: At the end of each game session, results are displayed with animated emoticons (smiley for correct answers, funny face for incorrect answers).
- **Exit Option**: Users can exit the game at any time using the provided exit button.

## Game Modes

- **Addition**: Generates random addition problems within a specified range, ensuring positive results.
- **Subtraction**: Generates random subtraction problems, ensuring no negative-number answers.
- **Friends of 10**: Presents number problems where the sum is 10, and the user needs to find the number corresponding with the number provided to add to 10. This reinforces basic arithmetic relationships.

## User Interface Details

- Interactive number buttons with click animations and hover effects.
- Feedback for correct and incorrect answers using sounds.
- Exit button prominently displayed for easy game termination.

## Game Logic

- Answers are validated with exact matching, ensuring precise correctness.
- Random number generation is controlled to provide a mix of difficulty levels and problem types.
- Game keeps track of generated maths probelms that are given to ensure a specific maths probelm does not appear more than once per game.
- Additional features include a timing mechanism to animated results at end of game.

## Accessibility and Responsiveness

- Keyboard navigation enabled for gameplay as well as buttons for touch-devices.
- Responsive design adapts to different screen sizes and orientations.
- ARIA roles and attributes used to enhance accessibility for screen readers.

## Screenshots

![Game selection menu](./resources/images/screenshots/gamemenu.png)

![Game on desktop PC](./resources/images/screenshots/game1.png)

![Game on mobile device](./resources/images/screenshots/game2.png)

![Game results screen](./resources/images/screenshots/gameresults.png)

## Getting Started

To run this project locally, clone the repository and open `index.html` in your web browser. Alternativele, play it by visiting: https://simonwindsor.github.io/Maths-Quiz/

```bash
git clone https://github.com/SimonWindsor/Maths-Quiz
cd Maths-Quiz
```
## Acknowledgements
  * [GitHub Pages](https://pages.github.com/)
  * [Google Fonts](https://fonts.google.com/)
  * [Pixabay](https://pixabay.com) - with specific credit to users with credit to u_31vnwfmzt6 and UNIVERSFIELD
  * [Unsplash](https://unsplash.com) - with specific credit to users Nina Garman and Mick Haupt.
