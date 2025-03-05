import React from "react";
import dedent from "dedent";

export default {
  SUGGESTIONS: [
    "Create Todo App in React",
    "Create Budget Track App",
    "Create Login Signup Screen",
    "Create Gym Portal Dashboard",
    "Create Next.js App",
  ],
  HERO_MAIN_HEADING1:"Im Excited",
  HERO_MAIN_HEADING2:"Plz write Something🙃",
  HERO_HEADING: "What do you want to build?",
  HERO_DESC: "Prompt,run,edit and deploy full-stack web apps.",
  SIGNIN_HEADING: "Continue With Blink Build ",
  SIGNIN_SUBHEADING:
    "To use Bolt you must log into an existing account or create one.",

  DEMO: {
    projectTitle: "React TODO App",
    description: "A basic Todo App in React with Tailwind CSS,",
    generatedFiles: [
      "/src/App.js",
      "/src/index.js",
      "/src/components/TodoList.js",
      "/src/components/TodoForm.js",
      "/src/components/TodoItem.js",
    ],
files: {
  "/App.js": {
    code: `import React,{useState,useEffect} from 'react'
      import './App.css';
      import TodoList from './components/TodoList';
      import TodoForm from './components/TodoForm';
                
      function App()
      {
        const [todos,setTodos]=useState(()=>
        {
          const storedTodos = localStorage.getItem('todos');
          return storedTodos ? JSON.parser(storedTodos) : [];
        })
      }`,
      },
    },
  },
  DEFAULT_FILE: {
    "/public/index.html": {
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="root"></div>
</body>
</html>`,
    },
    "/App.css": {
      code: `@tailwind base;
@tailwind components;
@tailwind utilities;`,
    },
    "/tailwind.config.js": {
      code: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}],
  theme: {
    extend: {}, 
  },
  variants: {}, 
  plugins: [], 
}`,
    },
"/postcss.config.js": {
  code: `/** @type {import('postcss-load-config').Config} */
const config={
    plugins:{
        tailwindcss:{},
    },
};

export default config;`,
},
    
"/src/App.jsx": {
  code: `export default function App()
{
  return (
    <div>
      <h1>hello world 2!</h1>
    </div>
  )
}`,
},
"/index.js": {
  code: `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./src/App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
},

},

  DEPENDANCY: {
    autoprefixer: "^10.0.0",
    // "tailwind-animate": "^3.0.2",
    postcss: "^8",
    tailwindcss: "^3.4.1",
    "@google/generative-ai": "^0.21.0",
    "lucide-react": "latest",
    "react-router-dom": "latest",
    "tailwind-merge": "^2.4.0",
    "uuid4": "^2.0.3",
    "firebase": "^11.1.0",
    "uuid": "^11.0.5",
  },

  PRICING_DESC:'Start with a free account to speed up your Workflow on public project or boost your entire team with instantly-opening production enviroments',
  PRICING_OPTIONS:[
    {
      name:'Free',
      tokens:'50k',
      value:50000,
      desc:'Ideal for hobbyists and casual users for light,exploratory use.',
      price:4.99
    },
    {
      name:'Starter',
      tokens:'1.2M',
      value:1200000,
      desc:'Designed for proffessionals who need to use Blink Build v1 a few times per week.',
      price:9.99
    },
    {
      name:'Pro',
      tokens:'2.5M',
      value:2500000,
      desc:'Perfect for heavy users looking to enhance daily workflows',
      price:9.99
    },
    {
      name:'Unlimited(License)',
      tokens:'Unlimited',
      value:9999999999,
      desc:'Best for power users relying on Blink Build v1 as a core tool for continuous use.',
      price:49.99
    }
  ]
};
