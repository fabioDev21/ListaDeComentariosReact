import "./App.css";
import { useState, useEffect } from "react";

const url = "http://localhost:3000/usuarios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function puxaDados() {
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data);
    }
    puxaDados();
  }, [users]);

  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [profissao, setProfissao] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [biografia, setBiografia] = useState("");

  const handleSubmit = async (e) => {
    setOpen(false);
    e.preventDefault();
    
    if (nome === "" || profissao === "" || nascimento === "" || biografia === "") {
      return
    }

    const userData = {
      nome,
      profissao,
      nascimento,
      biografia,
      imagemPerfil:
        "https://images.unsplash.com/photo-1574419040712-50e168ed5f1e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    setBiografia((prevUsers) => [...prevUsers, userData]);
  };

  return (
    <>
      <h1 className="font-bold text-3 my-5">Comentários</h1>
      {users.map((user) => (
        <div
          key={user.id}
          className="px-4 py-4 flex items-center my-4 gap-3 border-4 rounded-md border-orange-100"
        >
          <div>
            <img
              className="rounded-full h-24 w-24"
              src={user.imagemPerfil}
              alt="foto de perfil"
            />
          </div>
          <div className="text-left grid gap-1">
            <h2 className="text-lg font-bold text-lime-300">{user.nome}</h2>
            <h3 className="font-semibold text-lime-100">{user.profissao}</h3>
            <p>{user.biografia}</p>
          </div>
        </div>
      ))}
      <i
        className="fa-solid fa-circle-plus text-2xl cursor-pointer text-green-200 hover:text-green-300 transition-colors"
        onClick={() => setOpen(true)}
      ></i>
      {open && (
        <dialog
          open
          className="w-80 text-xl absolute inset-0 px-6 py-6 rounded-md"
        >
          <i
            className="fa-solid fa-circle-xmark text-2xl cursor-pointer absolute top-2 right-2 text-red-200 hover:text-red-300 transition-colors"
            onClick={() => setOpen(false)}
          ></i>
          <form onSubmit={handleSubmit} className="grid gap-2">
            <label htmlFor="userNome">
              <p>Nome:</p>
              <input
                required
                type="text"
                id="nome"
                placeholder="Nome da Silva..."
                className="bg-lime-100 text-black px-2 focus:bg-lime-300 outline-none"
                onChange={(e) => setNome(e.target.value)}
              />
            </label>
            <label htmlFor="userProfissao">
              <p>Profissao:</p>
              <input
                required
                type="text"
                placeholder="Caminhoneiro..."
                id="userProfissao"
                className="bg-lime-100 text-black px-2 focus:bg-lime-300 outline-none"
                onChange={(e) => setProfissao(e.target.value)}
              />
            </label>
            <label htmlFor="userNascimento">
              <p>Nascimento:</p>
              <input
              required
                id="userNascimento"
                type="date"
                className="bg-lime-100 text-black px-2 text-black focus:bg-lime-300 outline-none"
                onChange={(e) => setNascimento(e.target.value)}
              />
            </label>
            <label htmlFor="biografia">
              <p className="m-1">Biografia:</p>
              <textarea
              required
                id="biografia"
                placeholder="Algo legal"
                className="bg-lime-100 text-black px-2 h-20 w-full focus:bg-lime-300 outline-none"
                onChange={(e) => setBiografia(e.target.value)}
              ></textarea>
            </label>
            <input
              type="submit"
              value="Enviar"
              className="block m-auto text-black font-semibold px-4 py-2 rounded-md cursor-pointer bg-lime-100 hover:bg-lime-300 transition-colors"
            />
          </form>
        </dialog>
      )}
    </>
  );
}

export default App;
