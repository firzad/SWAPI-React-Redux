import { createSlice } from '@reduxjs/toolkit';
import {getSWApiPeople, getFilmNameWithYear} from '../../api/starWars.api';

export const starWarsSlice = createSlice({
  name: 'starWars',
  initialState: {
    peopleData: {
      pageNo: 0,
      count: 0,
      next: null,
      previous: null,
      results: []
    },
    charDetails: {
      name: null,
      birthYear: null,
      gender: null,
      filmList: []
    },
    isGridLoading: false,
    isCharDetailsLoading: false
  },
  reducers: {
    peopleData: (state, action) => {
      state.peopleData = { ...action.payload };
    },
    charDetails: (state, action) => {
      state.charDetails = { ...action.payload };
    },
    gridLoading: (state, action) => {
      state.isGridLoading = action.payload;
    },
    charDetailsLoading: (state, action) => {
      state.isCharDetailsLoading = action.payload;
    },
  },
});

export const { peopleData, charDetails, gridLoading, charDetailsLoading } = starWarsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action. This will call the thunk with the `dispatch`
// function as the first argument.
// Async code can then be executed and other actions can be dispatched

export const loadPeopleData = (pageNo = 1) => dispatch => {
  dispatch(gridLoading(true));
  getSWApiPeople(pageNo).then((data) => {
      dispatch(peopleData({ ...data }));
      dispatch(gridLoading(false));
    })
    .catch(err => console.log(err));
};

// Load names of all the films listed and append it to the character details
export const loadCharDetails = (char) => dispatch => {
  dispatch(charDetailsLoading(true));
  const filmTitles = char.films.map(x => getFilmNameWithYear(x));
  Promise.all(filmTitles).then(respArray => {
    dispatch(charDetails({
      name: char.name,
      birthYear: char.birth_year,
      gender: char.gender,
      filmList: respArray
    }));
    dispatch(charDetailsLoading(false));

  })
  .catch(err => console.log(err));
};


// The function below is called a selector and allows us to select a 'field' from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.starWars.field)`
export const selectPeopleData = reducerState => reducerState.starWarsReducer.peopleData;
export const selectCharDetails = reducerState => reducerState.starWarsReducer.charDetails;
export const selectGridLoading = reducerState => reducerState.starWarsReducer.isGridLoading;
export const selectCharDetailsLoading = reducerState => reducerState.starWarsReducer.isCharDetailsLoading;

export default starWarsSlice.reducer;
