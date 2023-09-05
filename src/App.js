import { useState } from "react";
import "./App.css";
import { Quiz } from "./components/Quiz";
import { StartMenu } from "./components/StartMenu";
import { domains } from "./words/words";

function App() {
  const [currentDomain, setCurrentDomain] = useState(null);
  const [shuffle, setShuffle] = useState(false);

  return (
    <div className="App">
      {currentDomain === null ? (
        <StartMenu
          setShuffle={setShuffle}
          shuffle={shuffle}
          setCurrentDomain={setCurrentDomain}
        />
      ) : (
        <Quiz
          shuffle={shuffle}
          onBack={() => setCurrentDomain(null)}
          domain={domains[currentDomain]}
        />
      )}
    </div>
  );
}

export default App;
