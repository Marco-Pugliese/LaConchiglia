import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

const allowedEmail = "gestione.laconchiglia@gmail.com"; // L'email autorizzata

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Verifica che l'email sia quella corretta
    if (email !== allowedEmail) {
      setError("L'email non è autorizzata.");
      return;
    }

    // Prova di login con l'email e la password
    // eslint-disable-next-line no-unused-vars
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError("Email o password non corretti.");
      return;
    }

    // Login riuscito, reindirizza alla pagina admin
    navigate("/admin");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
