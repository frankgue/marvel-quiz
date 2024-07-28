import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../Firebase";
import { Tooltip } from "react-tooltip";

const Logout = () => {
  const firebase = useContext(FirebaseContext);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      firebase.signoutUser();
      console.log("Deconnexion");
    }
  }, [checked]);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span
          className="slider round"
          data-tooltip-id="logout-tooltip"
          data-tooltip-content="Deconnexion"
        ></span>
        <Tooltip
        place="left"
        effect="solid"
         id="logout-tooltip" />
      </label>
    </div>
  );
};

export default Logout;
