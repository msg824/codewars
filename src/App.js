import React, { useState, useEffect } from 'react';
import './App.css';
import { getProblemList } from './api/problems';
import CodeMirror from 'react-codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

// prop
function ProblemDetail({ problem }) {
  return (
    <div className="problem">
      <section className="description">
        <h3>{problem.title}</h3>
        <p>{problem.description}</p>
      </section>
      <section className="code-editor">
        <CodeMirror
          value={'function solution () {}'}
          options={{
            mode: 'javascript'
          }}
        />
        <button>제출</button>
      </section>
    </div>
  );
}

function App() {
  const [ problems, setProblems ] = useState([]);
  const [ selectedProblemId, setSelectedProblemId ] = useState(null);

  const [ selectedProblem ] = problems.filter(data => data.id === selectedProblemId);

  useEffect(function () {
    async function getProblems () {
      const data = await getProblemList();
      setProblems(data);
    }

    getProblems();
  }, []);

  return (
    <div className="App">
      {
        selectedProblemId === null &&
        <>
          <nav>
            Codewars
          </nav>
          <ul>
            {
              problems.map(function (problem) {
                return (
                  <li key={problem.id}>
                    <h3>{problem.title}</h3>
                    <button onClick={() => setSelectedProblemId(problem.id)}>문제풀기</button>
                  </li>
                );
              })
            }
          </ul>
        </>
      }
      {
        selectedProblemId !== null &&
        <ProblemDetail problem={selectedProblem} />
      }
    </div>
  );
}

export default App;
