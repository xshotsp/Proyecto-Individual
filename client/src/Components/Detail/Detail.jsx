import style from "./Detail.module.css";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

export default function Detail() {
  const { detailId } = useParams();
  const [videogame, setVideogame] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${detailId}?key=1be5de2656ee4bd488a4b8248b6e8343`
        );
        console.log('API Response:', response.data); 
        setVideogame(response.data);
      } catch (error) {
        console.error('Error fetching videogame:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [detailId]);

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div className={style.imgContainerBack}>
      <div className={style.container}>
        <h1 className={style.title}>{videogame.name}</h1>
        <NavLink to={"/home"}>
          <button className={style.btn}>Return to home</button>
        </NavLink>
        <div className={style.detailContainer}>
          <div className={style.imgContainer}>
            <img
              className={style.img}
              src={videogame.background_image}
              alt=""
            />
          </div>
          <div className={style.dataContainer}>
            <div className={style.descriptionContainer}>
              <h2 className={style.subtitles}>Description</h2>
              {videogame.description_raw !== "" ? (
                <p className={style.pTexts} value="description">
                  {videogame.description_raw}
                </p>
              ) : (
                <p className={style.pTexts}>No description available</p>
              )}
            </div>
            <div className={style.smallDataContainer}>
              <div className={style.verySmallContainers}>
                <h2 className={style.subtitles}>Genres</h2>
                <ul className={style.lists}>
                  {videogame.genres?.map((obj) => {
                    return <li key={obj.name}>{obj.name}</li>;
                  })}
                </ul>
              </div>
              <div className={style.verySmallContainers}>
                <h2 className={style.subtitles}>Released</h2>
                <p className={style.pTexts} value="released">
                  {videogame.released}
                </p>
              </div>
              <div className={style.verySmallContainers}>
                <h2 className={style.subtitles}>Rating</h2>
                <p className={style.pTexts} value="rating">
                  {videogame.rating}
                </p>
              </div>
              <div className={style.verySmallContainers}>
                <h2 className={style.subtitles}>Platforms</h2>
                <ul className={style.lists}>
                  {videogame.platforms?.map((obj) => {
                    if (obj.platform) {
                      return (
                        <li key={obj.platform.name}>{obj.platform.name}</li>
                      );
                    } else {
                      return <li key={obj}>{obj}</li>;
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
