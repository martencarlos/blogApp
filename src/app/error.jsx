"use client";

const error = ({ error, reset }) => {
  return (
    <div>
      <h1>Oops!</h1>
      <p>{error.message}</p>
      <p>{error.cause}</p>
      <p>{error.name}</p>
      <p>{error.stack}</p>
      <br />
      <br />
      <button onClick={reset}>try again</button>
    </div>
  );
};
