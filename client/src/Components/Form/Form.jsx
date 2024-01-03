// Form.jsx

import style from "./Form.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames } from "../../Redux/actions";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { validation } from "./validation";

export default function Form() {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.allGenres);

  const [data, setData] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0.0,
    image: "", 
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    image: "", 
    allFields: "", 
  });

  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    if (!allGenres.length) {
      dispatch(getGenres());
    }
    
  }, []);

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors(validation({ ...data, [e.target.name]: e.target.value }));
  };

  const handleInputGenres = (e) => {
    if (!e.target.checked)
      setGenres([...genres.filter((element) => element !== e.target.value)]);
    else setGenres([...genres, e.target.value]);
  };

  const handleInputPlatforms = (e) => {
    if (!e.target.checked)
      setPlatforms([...platforms.filter((element) => element !== e.target.value)]);
    else setPlatforms([...platforms, e.target.value]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objectToPost = {
      ...data,
      platforms: [...platforms],
      genres: [...genres],
    };

    try {
      const response = await axios.post("/videogames", { ...objectToPost });
      window.alert(
        response.data.success ? response.data.success : response.data.error
      );
    } catch (err) {
      window.alert(err.message);
    }

    dispatch(getVideogames());
  };

  return (
    <div className={style.imgContainer}>
      <div className={style.container}>
        <h1 className={style.title}>Create Videogames</h1>
        <NavLink to="/home">
          <button className={style.btn}>Return to home</button>
        </NavLink>
        <form className={style.inputsContainer} onSubmit={handleSubmit}>
          <div className={style.inputContainer}>
            <label className={style.subtitles} htmlFor="name">
              Name
            </label>
            <input
              className={style.input}
              type="text"
              value={data.name}
              name="name"
              onChange={handleInputChange}
              placeholder="Enter name"
            />
            {errors.name && <p className={style.spans}>{errors.name}</p>}
          </div>
          <div className={style.inputContainer}>
            <label className={style.subtitles} htmlFor="description">
              Description
            </label>
            <textarea
              className={style.input}
              value={data.description}
              name="description"
              onChange={handleInputChange}
              placeholder="Enter description"
            />
            {errors.description && (
              <p className={style.spans}>{errors.description}</p>
            )}
          </div>
          <div className={style.inputContainer}>
            <label className={style.subtitles} htmlFor="released">
              Released
            </label>
            <input
              className={style.input}
              type="text"
              value={data.released}
              name="released"
              onChange={handleInputChange}
              placeholder="Enter released date"
            />
            {errors.released && (
              <p className={style.spans}>{errors.released}</p>
            )}
          </div>
          <div className={style.inputContainer}>
            <label className={style.subtitles} htmlFor="rating">
              Rating
            </label>
            <input
              className={style.input}
              type="number"
              value={data.rating}
              name="rating"
              onChange={handleInputChange}
            />
            {errors.rating && <p className={style.spans}>{errors.rating}</p>}
          </div>
          <div className={style.inputContainer}>
            <label className={style.subtitles} htmlFor="image">
              Image URL
            </label>
            <input
              className={style.input}
              type="text"
              value={data.image}
              name="image"
              onChange={handleInputChange}
              placeholder="Enter image URL"
            />
            {errors.image && <p className={style.spans}>{errors.image}</p>}
          </div>
          <div className={style.inputContainer}>
            <label className={style.subtitles}>Add genres</label>
            <div className={style.genresContainer}>
              {allGenres?.map((obj, index) => (
                <label
                  className={style.genrePlatformsLabel}
                  htmlFor={obj.name}
                  key={index}
                >
                  {obj.name}
                  <input
                    type="checkbox"
                    name="genres"
                    id={obj.name}
                    value={obj.name}
                    onChange={handleInputGenres}
                  />
                </label>
              ))}
            </div>
          </div>
          <div className={style.inputContainer}>
            <label className={style.subtitles}>Add platforms</label>
            <div className={style.platfomrsContainer}>
              <label className={style.genrePlatformsLabel} htmlFor="PC">
                PC
                <input
                  type="checkbox"
                  name="platforms"
                  id="PC"
                  value="PC"
                  onChange={handleInputPlatforms}
                />
              </label>

              <label className={style.genrePlatformsLabel} htmlFor="Console">
                Console
                <input
                  type="checkbox"
                  name="platforms"
                  id="Console"
                  value="Console"
                  onChange={handleInputPlatforms}
                />
              </label>

              <label className={style.genrePlatformsLabel} htmlFor="Mobile">
                Mobile
                <input
                  type="checkbox"
                  name="platforms"
                  id="Mobile"
                  value="Mobile"
                  onChange={handleInputPlatforms}
                />
              </label>
            </div>
          </div>
          {errors.allFields && (
            <p className={style.spans}>{errors.allFields}</p>
          )}
          <button
            className={style.btnCreate}
            type="submit"
            onClick={handleSubmit}
          >
            Create Videogame
          </button>
        </form>
      </div>
    </div>
  );
}
