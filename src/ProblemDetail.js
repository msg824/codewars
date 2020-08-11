import React, { useState } from 'react';
import CodeMirror from 'react-codemirror';
import { postUserSolution } from './api/problems';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

export default function ProblemDetail({ problem }) {
  const [ code, setCode ] = useState('');
  const [ isModalShowing, setIsModalShowing ] = useState(false);
  const [ codeResult, setCodeResult ] = useState('');

  async function validateAnswer() {
    postUserSolution(problem._id, code).then(data => {
      setIsModalShowing(true);
      
      if (data.result !== '에러') {
        setCodeResult(data.result);
      } else {
        setCodeResult(data.detail);
      }
    });
  }

  return (
    <div className="problem">
      {
        isModalShowing &&
        <div>
          <div className="modal-overlay" onClick={() => setIsModalShowing(false)}></div>
          <div className="modal">
            { codeResult }
            <button onClick={() => setIsModalShowing(false)}>Close</button>
          </div>
        </div>
      }
      <section className="description">
        <h3>{problem.title}</h3>
        <p>{problem.description}</p>
      </section>
      <section className="code-editor">
        <CodeMirror
          onChange={(newValue) => { setCode(newValue) }}
          value={'function solution () {}'}
          options={{
            mode: 'javascript'
          }}
        />
        <button onClick={() => validateAnswer()}>제출</button>
      </section>
    </div>
    );
  }