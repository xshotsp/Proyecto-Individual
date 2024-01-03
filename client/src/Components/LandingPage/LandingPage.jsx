import { NavLink } from "react-router-dom";
import style from "./LandingPage.module.css";


export default function LandingPage(props) {
  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        
      <NavLink to={"/home"}>
        <button className={style.btn}>Enter</button>
      </NavLink>
      </div>
    </div>
  );
}

