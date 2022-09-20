import UserForm from "./layout/UserForm";
import Header from "./layout/Header";
import "./App.css"

function App() {
  return (
    <div className="card">
      <div className="card-body" style={{width: "100%"}}>
        <Header />
        <UserForm />
      </div>
    </div>
  )
}

export default App;
