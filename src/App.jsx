import "./App.css";
import CarregaComentarios from "./components/CarregaComentarios";

const url = "http://localhost:3000/usuarios";

function App() {



  return (
    <div className="App">
      <h1 className="font-bold text-3 my-5">Comentários</h1>
      <CarregaComentarios />  
    </div>
  );
}

export default App;
