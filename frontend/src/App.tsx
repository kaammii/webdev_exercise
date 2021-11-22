import "./App.css";
import Users from "./Users";

function App(): JSX.Element {
  return (
    <div className="container">
      <h3>Platform Users</h3>
      <Users data-testid="users" />
    </div>
  );
}

export default App;
