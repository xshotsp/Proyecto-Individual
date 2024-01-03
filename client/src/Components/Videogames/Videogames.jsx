import style from "./Videogames.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, deleteVideogame } from "../../Redux/actions";
import Videogame from "../Videogame/Videogame";
import Pagination from "../Pagination/Pagination";
import Nav from "../Nav/Nav";

export default function Videogames() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames);
  const renderedVideogames = useSelector((state) => state.renderedVideogames);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  let currentVideogames = [
    ...renderedVideogames.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    ),
  ];

  useEffect(() => {
    if (!allVideogames.length) {
      dispatch(getVideogames());
    }
    setCurrentPage(1);

    
  }, [renderedVideogames, allVideogames]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDispatchClose = (id) => {
    dispatch(deleteVideogame(id));
  };

  return (
    <div className={style.imgContainer}>
      <div className={style.container}>
        <Nav />
        <Pagination
          currentPage={currentPage}
          totalCount={renderedVideogames.length}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
        <div className={style.containerVideogames}>
          {currentVideogames?.map((videogame) => (
            <Videogame
              id={videogame.id}
              name={videogame.name}
              background_image={videogame.background_image}
              genres={videogame.genres}
              rating={videogame.rating}
              key={videogame.id} 
              handleDispatchClose={handleDispatchClose}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
