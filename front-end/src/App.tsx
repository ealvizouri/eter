import logo from './logo.svg';

function App() {
  return (
    <div className="h-screen flex justify-center items-center">
      <header className="w-fit flex flex-col items-center gap-3">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="text-blue-700 hover:text-blue-900"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
