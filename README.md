# SecureSight Dashboard 🔒📹

A full-stack CCTV incident monitoring dashboard built with:

- **Next.js 15 (App Router)**
- **TypeScript**
- **Prisma ORM + SQLite**
- **Lucide React Icons**
- **API Routes (Edge runtime ready)**

## 🚀 Features
- Incident feed (Unresolved + Resolved)
- Incident resolution with status update
- Interactive incident viewer with timeline scrubber
- Responsive UI with custom fonts and theme
- Optimized for deployment on Vercel

## 📸 Demo
🔗 [Live Deployment on Vercel](https://securesight-dashboard-ao8h.vercel.app/)

## 📦 Tech Stack
- Frontend: React 19 + Next.js App Router
- Backend: Prisma ORM with SQLite (Edge-compatible)
- Styling: CSS Modules
- Hosting: Vercel (Serverless)

## 🛠️ Development

```bash
git clone https://github.com/mohamed-sinan/securesight-dashboard
cd securesight-dashboard
npm install
npx prisma generate
npm run dev

🧪 Seed Data

npx prisma db push
npm run seed

🧠 Notes

    For serverless deploys (like Vercel), Prisma Client is auto-generated using a postinstall hook.

    This app uses mocked incident thumbnails and camera data for demo purposes.

📬 Contact

Created by Mohamed Sinan


---

#### 2. **Push the README to GitHub**
```bash
git add README.md
git commit -m "Add README"
git push origin main
