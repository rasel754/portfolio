# 🌐 Mine Portfolio

> A modern, dynamic, and production-ready portfolio application with an integrated administrative dashboard.

## 📌 Overview
Mine Portfolio is a full-stack capable frontend application designed to showcase technical skills, professional projects, and personal blogs. It serves as both a public-facing resume and a private content management system. It solves the problem of static portfolios by connecting to a backend REST API, allowing the owner to update their skills, projects, tools, and blog posts directly from a custom admin dashboard without deploying new code.

## 🛠️ Tech Stack
This project leverages a modern React ecosystem focused on performance, accessibility, and high-quality UI/UX:
- **Framework:** Next.js 15 (App Router), React 19
- **Styling:** Tailwind CSS, next-themes (Dark/Light mode)
- **UI Components:** Radix UI primitives, shadcn/ui
- **Animations & 3D:** Framer Motion, Three.js (@react-three/fiber, @react-three/drei)
- **Forms & Validation:** React Hook Form, Zod
- **Data Visualization:** Recharts
- **Icons:** Lucide React

## ✨ Features
- **Dynamic Content:** Projects, skills, tools, and blog posts are fetched dynamically from the backend API.
- **Admin Dashboard (`/rasel754`):** A secure, minimalistic interface to perform CRUD operations on portfolio content and read incoming contact messages.
- **Engaging UI/UX:** Smooth page transitions, scroll animations, and interactive 3D elements.
- **Contact System:** A fully functional contact form that saves messages to the database.
- **Fully Responsive:** Optimized layouts for mobile, tablet, and desktop devices.
- **Accessible:** Built with Radix UI to ensure keyboard navigation and screen reader compatibility.

## 🔗 API Integration
The frontend is designed to communicate seamlessly with a dedicated Node.js/Express backend via REST API.
- **Base URL (Local):** `https://portfolio-server-blush-one.vercel.app/api/p4` (Configurable via Environment Variables)
- **Architecture:** Client components fetch data for public display (Projects, Blogs, Skills), while the admin dashboard interacts with protected routes for creating, updating, and deleting content.

## 📂 Project Structure
- `app/`: Next.js App Router configuration.
  - `(public routes)`: `page.tsx` (Home), `/projects`, `/blog`
  - `rasel754/`: Admin dashboard routes and management interfaces.
- `components/`: Reusable React components (UI elements, sections like `hero-section`, `about-section`).
- `hooks/`: Custom React hooks.
- `lib/`: Utility functions and helper modules.
- `public/`: Static assets (images, fonts).
- `styles/`: Global CSS and Tailwind configurations.

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation
1. Clone the repository:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd portfolio
   ```
2. Install dependencies:
   ```bash
   npm install
   # or yarn install / pnpm install
   ```

### Environment Variables
Create a `.env.local` file in the root directory and add the following:
```env
# Example Environment Variables
NEXT_PUBLIC_API_URL=https://portfolio-server-blush-one.vercel.app/api/p4
```

### Run the Project
Start the development server:
```bash
npm run dev
# or yarn dev / pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🚀 Build & Deployment
This Next.js application is optimized for deployment on platforms like Vercel or Netlify.

To build the project locally:
```bash
npm run build
```
To start the production build:
```bash
npm run start
```

## 📱 Responsiveness
The application utilizes Tailwind CSS's mobile-first approach, ensuring a flawless experience across:
- **Mobile Devices** (Smartphones)
- **Tablets** (iPads, Android tablets)
- **Desktop** (Laptops, large monitors)

## 🤝 Contributing
While this is a personal portfolio, suggestions and improvements are welcome. Please feel free to fork the repository and submit a pull request.

## 📄 License
This project is licensed under the [MIT License](LICENSE).

## 👨‍💻 Author
**[Your Name / Placeholder]**
- GitHub: [Your GitHub Profile]
- LinkedIn: [Your LinkedIn Profile]
- Portfolio: [Live Link Placeholder]
