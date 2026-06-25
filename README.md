# 🌐 Rasel Ahmed | Professional Full Stack Portfolio

A clean, modern, and highly interactive developer portfolio featuring a dynamic 3D interactive user interface, dark/light theme options, and an integrated admin dashboard.

---

### 🔗 Quick Links
- **Live Demo:** [https://portfolio-iota-two-90.vercel.app/](https://portfolio-iota-two-90.vercel.app/)
- **GitHub Repository:** [https://github.com/rasel754/portfolio](https://github.com/rasel754/portfolio)
- **Backend API Base:** `https://portfolio-server-blush-one.vercel.app/api/p4`

---

## 🔰 Project Information

- **Project Name:** Rasel Ahmed | MERN Stack Developer Portfolio
- **Overview:**
  A dynamic full-stack developer portfolio and personal CMS (Content Management System) designed to showcase projects, skills, blogs, and tools. Built with a Next.js 15 frontend, the project communicates with a Node.js/Express REST API backend to dynamically render content. Rather than redeploying code, the author can manage all public-facing information directly from a secure, custom administration dashboard interface.

- **Project Screenshot:**
  *(No screenshot provided. Replace this line with an image tag when available)*
  ```markdown
  <!-- ![Portfolio Screenshot](path/to/screenshot.png) -->
  ```

---

## ⚙️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Core** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white) ![React 19](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) |
| **Styling & UI** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) `next-themes` (Dark/Light mode) `Radix UI` primitives |
| **Animations & 3D** | ![Three.js](https://img.shields.io/badge/Three.js-black?style=flat-square&logo=threedotjs&logoColor=white) `@react-three/fiber` `@react-three/drei` `Framer Motion` |
| **Forms & Verification** | `React Hook Form` ![Zod](https://img.shields.io/badge/Zod-3068b7?style=flat-square&logo=zod&logoColor=white) |
| **Backend Integration** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) REST API |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) (via API backend) |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) |

---

## ✨ Features

- **🌐 Dynamic Content Integration:** Projects, blogs, tools, and technical skills are fetched live from a REST API backend.
- **🛡️ Secure Administrative Dashboard:** Accessible via `/rasel754` with complete CRUD capabilities for projects, blogs, skills, and tools, as well as a client contact message viewer.
- **✨ Premium UI/UX Animations:** Powered by Three.js and Framer Motion, presenting elegant scroll-based transitions, cursor glow effects, and a responsive CSS starfield backdrop.
- **✉️ Direct Contact System:** Clean form interface with live client-side validation (via React Hook Form & Zod) that pushes messages straight to the administrative backend.
- **📱 Fully Responsive & Accessible:** Fully mobile-first design using Tailwind CSS with standard accessibility protocols via Radix UI primitives.

---

## 📦 Dependencies

### Core Frontend Stack
- `next` (v15.2.9)
- `react` / `react-dom` (v19)
- `typescript` (v5)

### UI, Theme, & Animation
- `tailwindcss` (v3.4.17)
- `framer-motion`
- `three` & `@react-three/fiber` / `@react-three/drei`
- `next-themes`
- `@radix-ui` (React dialog, dropdown menu, alert-dialog, slider, tabs, slot, label)
- `lucide-react` (for icons)
- `class-variance-authority` & `clsx` & `tailwind-merge` & `tailwindcss-animate`

### Forms & Validation
- `react-hook-form`
- `zod`
- `@emotion/is-prop-valid`

---

## 🚀 Run Locally

Follow these step-by-step instructions to get a copy of the project running on your local machine:

### Prerequisites
- **Node.js** (v18.x or later recommended)
- **npm** (v9.x or later) or **yarn** / **pnpm**

### 1. Clone the repository
```bash
git clone https://github.com/rasel754/portfolio.git
cd portfolio
```

### 2. Install dependencies
Install all project dependencies locally:
```bash
npm install
```

### 3. Setup environment variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://portfolio-server-blush-one.vercel.app/api/p4
```

### 4. Run the project locally
Start the Next.js development server:
```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🛠️ Build and Production Deployments

To build the project for production distribution:
```bash
npm run build
```

To run the production build locally:
```bash
npm run start
```

---

## 🤝 Contributing

Suggestions, feature requests, and bug reports are welcome.
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Rasel Ahmed**
* **GitHub:** [@rasel754](https://github.com/rasel754)
* **Live Portfolio:** [portfolio-iota-two-90.vercel.app](https://portfolio-iota-two-90.vercel.app/)
* **Linkedin:** [https://www.linkedin.com/in/rasel754](https://www.linkedin.com/in/rasel754)

