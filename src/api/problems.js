export const getProblemList = () => {
  return fetch("http://localhost:8000/problems")
    .then(res => res.json());
};
