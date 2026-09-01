import "./App.css";
import { QuickNickname } from "./screens/QuickNickname";

/**
 * Реализовано по этапам Task.md §43: каноническая модель параметров,
 * SemanticProfile, normalizer, генератор с несколькими механизмами и
 * Validator (`src/domain`), режим Quick Nickname. Home с выбором режима,
 * Custom Nickname, Invisible Nickname и локализация — следующие этапы.
 */
function App() {
  return (
    <main
      style={{
        maxWidth: 640,
        margin: "4rem auto",
        padding: "0 1.5rem",
        fontFamily: "system-ui, sans-serif",
        lineHeight: 1.5,
      }}
    >
      <h1>NexTag Gamer</h1>
      <p>Gamer Nickname Generator — MVP в разработке.</p>
      <QuickNickname />
    </main>
  );
}

export default App;
