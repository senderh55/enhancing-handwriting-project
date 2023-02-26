import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome, Please login.</p>

        <LoginForm />
      </header>
    </div>
  );
}

export default App;
