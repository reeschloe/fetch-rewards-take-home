import UserForm from "./layout/UserForm";
import Header from "./layout/Header";

function App() {
  return (
    <div className="card" style={{maxWidth: "80%", alignItems: "center", marginLeft: "10%"}}>
      <div className="card-body" style={{width: "100%"}}>
        <Header />
        <UserForm />
      </div>
    </div>
  )
}

export default App;
