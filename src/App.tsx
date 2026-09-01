import "./App.css";

/**
 * Временная заглушка UI на время реализации MVP по этапам (Task.md §43).
 * На данный момент готова каноническая модель параметров, SemanticProfile
 * и normalizer пользовательского ввода (`src/domain`) — экраны Quick /
 * Custom / Invisible Nickname ещё не реализованы.
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
      <p>
        Реализовано: каноническая модель параметров, семантическая база и
        нормализация пользовательского ввода (см. <code>src/domain</code>).
        Экраны Quick / Custom / Invisible Nickname — следующий этап.
      </p>
    </main>
  );
}

export default App;
