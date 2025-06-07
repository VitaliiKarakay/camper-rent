import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredCampers } from '../../redux/campers/operations.js';
import { selectCampers } from '../../redux/campers/selectors.js';
import { changeFilter } from '../../redux/filters/slice.js';
import { useLocation } from 'react-router-dom';
import { pageLimit } from '../../constants/constants.js';
import { toggleFavorite } from '../../redux/favorites/slice.js';
import { selectFavorites } from '../../redux/favorites/selectors.js';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [params, setParams] = useState('');
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  const f = useSelector(selectFavorites);

  //TODO: implement change filter function
  const hanldeChangeFilter = () => {
    //TODO: add query params to URL
    dispatch(changeFilter(`?page=${page}&limit=${pageLimit}`));
  };

  useEffect(() => {
    if (location.pathname.endsWith('catalog')) {
      console.log(location.pathname);
      dispatch(fetchFilteredCampers(params));
    }
  }, [dispatch, location.pathname, params]);

  const handleAddToFavorites = (id) => {
    dispatch(toggleFavorite(id));
    console.log('fav :>> ', f);
  };

  const campers = useSelector(selectCampers);

  return (
    <>
      <button onClick={hanldeChangeFilter}>filter</button>
      {campers &&
        campers.items &&
        campers.items.map((camper) => (
          <div key={camper.id}>
            {camper.name}{' '}
            <button onClick={() => handleAddToFavorites(camper.id)}>
              {' '}
              fav
            </button>
          </div>
        ))}
    </>
  );
};

export default CatalogPage;
