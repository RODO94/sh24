# Decision Capture

## Global

## Where do I put the allow list?

Thinking about this now, I'd rather have one set of Allow Lists, one for postcodes and one for LSOAs. I'm trying to think how they connect together and if they should relate to each other and thus be one allow list, but I'm not that deep in it. Current call seems simplest.

I'd rather put the one allow list in the backend, probably as a variable in an allow list file with type checking.

## Frontend

I'm putting error handling on submit rather than change to reduce noise, config, and keep the UI simple for the user. Can foresee possibility for annoying pattern where you don't know something is wrong until you submit, but it's only one input so I'm happy to balance this.

## Backend
