# Interactive Developer Portfolio

A premium developer portfolio featuring a dynamic particles background, responsive design, abstract tech stack visualizations, and downloadable resume.

## 🚀 How to Run the Program

Since this is a vanilla static web application (HTML5, CSS3, ES6 JavaScript), you do not need to install any frameworks or external backend dependencies. You can run it locally in two ways:

### Option 1: Direct File Launch (Easiest)
1. Navigate to the project root directory: `d:\varshithaga100\Portfolio`.
2. Locate the [index.html](file:///d:/varshithaga100/Portfolio/index.html) file.
3. Double-click [index.html](file:///d:/varshithaga100/Portfolio/index.html) (or right-click and select **Open with** your preferred web browser like Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari).

### Option 2: Local Development Server (Recommended)
Using a development server ensures smooth loading of local assets, fonts, and particle canvases, and enables auto-reload.
- **VS Code Extension (Live Server)**:
  1. Open the project folder in VS Code.
  2. Install the **Live Server** extension by Ritwick Dey.
  3. Click the **Go Live** button at the bottom-right corner of the status bar.
- **Using Python's Built-in Server**:
  Run this command in your terminal from the project folder:
  ```bash
  python -m http.server 8000
  ```
  Then open your browser and navigate to `http://localhost:8000`.
- **Using Node.js (`npx` / `serve`)**:
  Run this command:
  ```bash
  npx serve
  ```
  Then open your browser and navigate to `http://localhost:3000` (or the address printed in terminal).

---

## 🛠️ Features
- **Custom Particles Background**: Multi-colored reactive canvas lines connecting nodes dynamically using cursor distance algorithms.
- **Project Detail Modals**: High-fidelity detail views injected dynamically based on project choice filters.
- **Premium Glassmorphic Design**: Curated CSS variables with rich dark modes, smooth gradients, and micro-interactions.
- **Direct Resume Download**: Readily accessible resume links integrated in the header, hero section, mobile drawer, and about page.

---

## 📂 Project Structure
- [index.html](file:///d:/varshithaga100/Portfolio/index.html) - Structural semantic HTML5 layout.
- [style.css](file:///d:/varshithaga100/Portfolio/style.css) - Core styling, custom scrollbars, animations, and typography variables.
- [script.js](file:///d:/varshithaga100/Portfolio/script.js) - Particles canvas simulation, project filter, and drawer logic.
- [varshithaga3.pdf](file:///d:/varshithaga100/Portfolio/varshithaga3.pdf) - Professional CV/Resume download source.
