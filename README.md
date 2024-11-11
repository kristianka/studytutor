# Study tutor

Study tutor is a software for students and everyone who wants to learn new skills and keep track of the progress! Live at https://studytutor.vercel.app/. Made by [@HenriSjoblom](https://github.com/HenriSjoblom), [@kristianka](https://github.com/kristianka) and [@Zennrr](https://github.com/Zennrr)!

For through documentation, please visit the [Wiki](https://github.com/kristianka/studytutor/wiki)!

## Running the app

Requirements:

-   VS Code or similiar text editor / IDE
-   Node.js / NPM
-   Supabase account
-   OpenAI API key

### Development

First install the node_modules and run the application in development mode:

1. `npm i`
2. Setup `.env.local` values based on `.env.example`
3. `npm run dev`

### Production

First install the node_modules, then build the application and finally start it:

1. `npm i`
2. Setup `.env.local` values based on `.env.example`
3. `npm run build`
4. `npm run start`

### Tests

Automated tests made with Playwright.

> [!CAUTION]
> Make sure to use different `.env` values than in development, testing will reset the database every run!

1. `npm i`
2. Setup `.env.local` values based on `.env.example`.
3. `npm run test-env`
4. `npm run test-ui`

## Live deployment

You can checkout the app at https://studytutor.vercel.app/ :)
