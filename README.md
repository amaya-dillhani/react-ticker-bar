# React Ticker Bar
<img width="912" height="93" alt="image" src="https://github.com/user-attachments/assets/8c373cbe-1a2b-47fd-a510-25fd8ac35582" />

A standalone React TypeScript ticker bar component that displays hardcoded stock data.

## Features
- Single `.tsx` file
- Hardcoded stock values (no API)
- Smooth horizontal scrolling
- Built with React and TypeScript
- Uses Tailwind CSS
- Icons from `lucide-react`

## Usage
1. Copy `TickerBar.tsx` into your React or Laravel (Vite) project.
2. Import the component where needed.
3. Ensure Tailwind CSS and `lucide-react` are installed.

```ts
import TickerBar from "./TickerBar";

export default function App() {
  return <TickerBar />;
}


