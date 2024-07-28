import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FirebaseContext } from "../Firebase";

const Login = (props) => {
  const firebase = useContext(FirebaseContext);

  // const data = {email: '', password: ''}
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .loginUser(email, password)
      .then((user) => {
        setEmail("");
        setPassword("");
        props.history.push("/welcome");
      })
      .catch((error) => {
        setEmail("");
        setPassword("");
        setError(error);
      });
  };

  useEffect(() => {
    if (password.length > 5 && email !== "") {
      setBtn(true);
    } else {
      setBtn(false);
    }
  }, [email, password, btn]);

  const Button = !btn ? (
    <button disabled>Connexion</button>
  ) : (
    <button onClick={handleSubmit}>Connexion</button>
  );

  const errorMsg = error !== "" && <span>{error.message}</span>;

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  type="email"
                  id="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  type="password"
                  id="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
              {Button}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">
                Nouveau sur Marvel Quiz? S'insccrire maintenant
              </Link>
              <br />
              <Link className="simpleLink" to="/signup">
                Mot de passe oublié? Récupérez-le ici.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
