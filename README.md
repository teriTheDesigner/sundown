# Sundown 2.0 🚀✨

This project was built in Nuxt and Vue 

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) & [Vue documentation](https://vuejs.org/) to learn more.

## Key Features </br>
- **Authentication:** Users can securely log in using their email and password, which are validated against a local JSON-based file containing authorized space agents' credentials.</br>

- **Persistent User Data:** Once logged in, user information is persisted for easy navigation throughout the application.</br>

- **Space Report Management:** Users can view a list of previously created space reports and create new ones.</br>

- **Mission Details:** During the report creation process, users can input mission details such as mission name, description, and start date.</br>

- **Image Selection:** Users can select images from the NASA API to include in their space reports.</br>

- **Real-time ISS Position:** The application displays the current position of the ISS over Earth, updating coordinates every 30 seconds.</br>

- **Report Finalization:** Users can review their mission reports, saving data locally and linking it to their user profile.</br>

- **Report History:** Users have access to a list of all mission reports they've created, with options to edit or delete them as needed.</br>

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

## Deployment

https://sundown-two.vercel.app/</br>

Check out [Vercel](https://vercel.com/) for documentation.
