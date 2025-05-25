# Decision Capture

## Global

Trying my best to capture thoughts and decisions while keeping PRs and commits small so it's easier as I come back and forth.

Main aim is to hit the challenge and make note of refactors, and come back if I still have time in the 4 hours.

## Where do I put the allow list?

Thinking about this now, I'd rather have one set of Allow Lists, one for postcodes and one for LSOAs. I'm trying to think how they connect together and if they should relate to each other and thus be one allow list, but I'm not that deep in it. Current call seems simplest.

I'd rather put the one allow list in the backend, probably as a variable in an allow list file with type checking.

## Frontend

I'm putting error handling on submit rather than change to reduce noise, config, and keep the UI simple for the user. Can foresee possibility for annoying pattern where you don't know something is wrong until you submit, but it's only one input so I'm happy to balance this.

Made ErrorBox and SuccessBox separate components because it was quicker in my head to separate the two roles, but it is perfectly reasonable in future to refactor these in to one component with a variant prop or something since they both can't exist at the same time.

Unit tests were simple, mostly does it render and does it do something

For hooking up with the backend, I've tried to keep it simple with the error journey and success journey both delivering a `data` field to the `handleSubmit` which feeds either state variable for `errorMessage` and `successMessage` which then controls which message gets displayed.

Something missing that I thought of was a `loading` state. Definitely a good thing to put in considering I rely on an external API.

## Backend

Built this with routes and controllers as it separated out nicely what done the logic within a route, and what done the logic outside of the route. This decoupling also relates to potential additions in future, hopefully this helps. It could have sent in a module or service structure, but it goes along with my thinking in this structure.

Tests are built first focusing on the functions that dictate the controller function. The checks and transforms. I went with the NodeJS Test Runner rather than Jest / Vitest because I wanted to have a run at built in packages rather than setup a test config, turned out quite quick. The second focuses on integrations, so mocking the postcodes.io API with Mock Service Worker, then running through the different iterations to ensure it filters well through the controller and responds to the API correctly.

Allow List files ended up in a `logic/` folder as I couldn't at first thinking get a better name, but there's probably one.

Most decisions went toward decoupling logic and keeping files small. The `controller/postcode.ts` file flies in the face of this a bit as I ran out of time to break it down into something more manageable.

## E2E

Decided to add in base test cases for e2e to make sure the journeys are all covered and isolated.

Built this so it could run from the root and call upon tests in an e2e folder. This was just my first instinct since it could run each part of the stack then the tests.

Hit a bit of overlap with integrations, but smoothed it out by reducing the scope, focusing on hitting user journeys.
