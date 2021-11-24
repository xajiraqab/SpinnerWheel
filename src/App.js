import { useState } from "react";
import Wheel from "./components/wheel/wheel";


function App() {

  const [winner, setWinner] = useState(null)

  return (
    <div style={{ padding: "2em", display: "grid", gap: "2em", placeItems: "center" }}>

      <Wheel onFinished={(winner) => setWinner(winner)} />

      {winner && <h1>winner is: {winner.name}</h1>}

    </div>
  );
}

export default App;
