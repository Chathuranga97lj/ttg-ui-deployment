# TTG Web

Frontend for TTG, a tutoring platform where students post assessments and tutors pick them up — built with Next.js 16 and statically exported to GitHub Pages.

**[▶ Live Demo](https://chathuranga97lj.github.io/ttg-ui-deployment/)**

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

---

<img width="1895" height="881" alt="screen_shot_1" src="https://github.com/user-attachments/assets/039ae53d-6b87-45a5-bb4d-6b73379d5b73" />
<img width="1082" height="772" alt="screen_shot_3" src="https://github.com/user-attachments/assets/29f2a62f-aa0b-47ad-88af-b6d23fb2fb3d" />
<img width="1892" height="870" alt="screen_shot_2" src="https://github.com/user-attachments/assets/13f53381-724c-4e30-85e7-3a89334247dd" />
<img width="1887" height="800" alt="screen_shot_4" src="https://github.com/user-attachments/assets/9e8e231e-3563-4ea8-9d84-3c08b92693c9" />
<img width="1080" height="776" alt="screen_shot_5" src="https://github.com/user-attachments/assets/9fa2d4b5-dae8-4d4a-b6f3-84b06a0d7caf" />


---

## About

TTG is a platform that connects students with tutors around assessment work. Students create a profile, submit assessments, and track them through to completion; tutors browse open submissions, pick up the ones matching their subjects, and manage their workload from a single dashboard. Both sides share one account system with role-specific views.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, static export) |
| UI | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/postcss`) |
| Icons | Phosphor Icons |
| Package manager | pnpm |
| Linting | ESLint 9 + `eslint-config-next` |
| CI/CD | GitHub Actions → GitHub Pages |

## Getting Started

**Prerequisites:** Node.js 20+ and [pnpm](https://pnpm.io/installation).

```bash
git clone https://github.com/Chathuranga97lj/ttg-ui-deployment.git
cd ttg-ui-deployment
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Produce a static export in `out/` |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint |

## Deployment

The site is deployed to GitHub Pages as a fully static export — no Node server at runtime. Because Pages serves the site from a subpath rather than the domain root, `next.config.ts` handles a few things that a Vercel deployment wouldn't need:

- **`output: "export"`** — builds to static HTML/CSS/JS in `out/` instead of requiring a Node runtime.
- **`basePath` + `assetPrefix`** — set to `/ttg-ui-deployment` so routes and asset URLs resolve correctly under the subpath. Overridable via the `NEXT_PUBLIC_BASE_PATH` environment variable, so the same build works on a custom domain at the root.
- **`trailingSlash: true`** — emits folder-based output (`/about/index.html`), which is what Pages' static file server expects.
- **`images.unoptimized: true`** — the Next.js Image Optimization API needs a server, so it's disabled for static hosting.

Pushes to `main` trigger the workflow in `.github/workflows/`, which builds and publishes to Pages.

## Project Structure

```
├── .github/workflows/   # CI/CD pipeline for GitHub Pages
├── public/              # Static assets
├── src/                 # Application source
├── next.config.ts       # Static export + basePath configuration
└── tsconfig.json
```

## Author

**Chathuranga Jayawardhana** — Full-Stack Developer, Sri Lanka

[Portfolio](https://articlore.wordpress.com/) · [LinkedIn](https://www.linkedin.com/in/chathuranga97/) · [GitHub](https://github.com/Chathuranga97lj)
