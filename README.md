# Agribuddy

A modern, beginner-friendly dashboard for students, built with React, TypeScript, and Tailwind CSS. Agribuddy helps students manage academic, financial, and campus activities in one place.

## Live Demo

[View the Live Demo on GitHub Pages](https://collegedaddy.github.io/agribuddy/)

---

## Features

- **Dashboard**: Central overview of your student life
- **Mandi Prices**: Track current market prices (for agri-focused students)
- **Price Prediction**: Mock predictions for vegetable prices
- **Crop Calendar**: Plan activities with an interactive calendar
- **Government Schemes**: Information on student and agricultural support programs
- **AI Assistant**: Chatbot for advice and support
- **Finance Tools**: Budget planner, expense tracker, and financial reports
- **Settings**: Profile, preferences, and data management

## Technology Stack

- **Frontend**: React, TypeScript, Vite
- **UI**: Tailwind CSS, shadcn/ui
- **Routing**: React Router

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/collegedaddy/agribuddy.git
   cd agribuddy
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
yarn dev
   ```
4. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)

## Project Structure

```
agribuddy/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI and feature components
│   ├── context/           # React context providers (auth, language, preferences)
│   ├── hooks/             # Custom React hooks
│   ├── integrations/      # External service integrations (e.g., Supabase)
│   ├── lib/               # Utility functions
│   ├── pages/             # Main route components
│   ├── utils/             # Helper utilities
│   └── main.tsx           # App entry point
├── index.html             # HTML template
├── package.json           # Project metadata and scripts
└── ...
```

## Deployment (GitHub Pages)

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```
2. **Update `package.json`:**
   - Add a `homepage` field:
     ```json
     "homepage": "https://collegedaddy.github.io/agribuddy/"
     ```
   - Add scripts:
     ```json
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
     ```
3. **Update `vite.config.ts`:**
   Set the base path:
   ```js
   export default defineConfig({
     base: '/agribuddy/',
     // ...
   })
   ```
4. **Deploy:**
   ```bash
   npm run deploy
   ```

Your site will be live at `https://collegedaddy.github.io/agribuddy/`.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

## License

This project is licensed under the MIT License.


