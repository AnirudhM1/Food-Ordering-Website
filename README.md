# Welcome to Cibus!

This website was created for the core review assignment for DevSoc.

The video guide for this website is hosted here: [VIDEO](https://drive.google.com/file/d/1aARwck3rKsdWxXfsCBtgxv1S9iwdXFxV/view?usp=sharing)

# Development

Install pnpm (if not already installed):

```bash
$ npm install -g pnpm
```

Clone the repository:

```bash
$ git clone git@github.com:AnirudhM1/Food-Ordering-Website.git
$ # If ssh is not set up,
$ # git clone https://github.com/AnirudhM1/Food-Ordering-Website.git
$ cd Food-Ordering-Website
```

Install the dependencies

```bash
$ pnpm install -C frontend
$ # To install the local server as well,
$ # pnpm install -C backend
```

Set environment variables:

```bash
$ cd frontend
$ cp .env.local.example .env.local
$ # Fill the empty variables
$ # If you are using local mongodb, to start the local instance,
$ # sudo service mongodb start
```

Start the Next.js application in development mode:

```bash
$ pnpm dev
```

To start a build optimized server:

```bash
$ pnpm build
$ pnpm start
```

To start the local server:

```bash
$ # Navigate to the backend folder
$ # cd backend
$ # Add environment variables
$ cp .env.example .env
$ # Fill the empty fields
$ pnpm dev # Reccomended for development
$ # or
$ pnpm start
```

## Tech stack

### Main app:

Made using Next.js and it's serverless functions for api fetching and connecting to mongodb database.
Next-Auth library is used to handle authentication
Scss is used for Styling.

### Local server:

Made using express to connect to mongodb database.
