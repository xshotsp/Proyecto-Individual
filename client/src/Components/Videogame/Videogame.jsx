// Videogame.jsx
import style from "./Videogame.module.css";
import { useHistory } from "react-router-dom";

export default function Videogame(props) {
  const history = useHistory();

  const handleCardClick = () => {
    history.push(`/detail/${props.id}`);
  };

  return (
    <div className={style.container} onClick={handleCardClick}>
      <button
        className={style.btn}
        onClick={() => props.handleDispatchClose(props.id)}
      >
        X
      </button>
      <h3 className={style.title}>{props.name}</h3>
      <div className={style.imgContainer}>
        <img
          className={style.img}
          src={props.background_image}
          loading="lazy"
          alt=""
        />
      </div>
      <div className={style.pContainer}>
        {props.genres?.map((obj) => {
          return (
            <p className={style.genre} key={obj.name}>
              {obj.name}
            </p>
          );
        })}
      </div>
      <h3 className={style.rating}>{props.rating}</h3>
    </div>
  );
}
