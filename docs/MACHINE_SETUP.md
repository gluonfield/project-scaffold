# Machine setup

Install the required tools on macOS:

```sh
brew install git gh node@24
brew tap oven-sh/bun
brew install bun
```

Verify versions and log in to GitHub:

```sh
node --version     # Node.js 24
bun --version      # Bun 1.3.5
gh auth login
```

Clone the project and install dependencies:

```sh
git clone https://github.com/gluonfield/project-scaffold.git
cd project-scaffold
bun install --frozen-lockfile
```

Start development:

```sh
bun run dev
```

For deployment work, authenticate the Vercel CLI when needed:

```sh
bunx vercel login
```
