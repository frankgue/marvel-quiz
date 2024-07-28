import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FirebaseContext } from "../Firebase";

const ForgetPassword = (props) => {
  const firebase = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [btn, setBtn] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .passwordReset(email)
      .then(() => {
        setError(null);
        setSuccess(
          `Consultez votre email ${email} pour changer votre mot de passe`
        );
        setEmail("");

        setTimeout(() => {
          props.history.push("/login");
        }, 5000);
      })
      .catch((error) => {
        setError(error);
        setEmail("");
      });
  };

  const disabled = email === "";

  useEffect(() => {
    if (email !== "") {
      setBtn(true);
    } else {
      setBtn(false);
    }
  }, [email, btn]);

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {success && (
              <span
                style={{
                  border: "1px solid green",
                  background: "green",
                  color: "#ffffff",
                }}
              >
                {success}
              </span>
            )}

            {error && <span>{error.message}</span>}

            <h2>Mot de passe oublié?</h2>
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
              <button onClick={handleSubmit} disabled={disabled}>
                Recupérer
              </button>
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Déjà inscrit? Connectez-vous
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
