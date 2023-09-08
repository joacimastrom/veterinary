import { useState } from "react";
import "./App.css";
import { Quiz } from "./components/Quiz";
import { StartMenu } from "./components/StartMenu";
import { domains } from "./words/words";

function App() {
  const [currentDomain, setCurrentDomain] = useState(null);
  const [shuffle, setShuffle] = useState(false);
  const [wordSet, setWordSet] = useState();

  const onBack = () => {
    setWordSet(null);
    setCurrentDomain(null);
  };

  const selectedDomain =
    currentDomain && domains.find(({ domain }) => domain === currentDomain);

  return (
    <div className="App">
      {currentDomain === null ? (
        <StartMenu
          setShuffle={setShuffle}
          shuffle={shuffle}
          setCurrentDomain={setCurrentDomain}
          setWordSet={setWordSet}
        />
      ) : (
        <Quiz
          shuffle={shuffle}
          onBack={onBack}
          domain={selectedDomain}
          subSet={wordSet}
        />
      )}
    </div>
  );
}

export default App;
