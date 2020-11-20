import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SWPeopleGrid } from './SWPeopleGrid';
import { SWCharacterDetails } from './SWCharacterDetails';
import {
  loadPeopleData,
  loadCharDetails,
  selectPeopleData,
  selectCharDetails,
  selectGridLoading,
  selectCharDetailsLoading,
} from './starWarsSlice';

export function StarWars() {
  const peopleData = useSelector(selectPeopleData);
  const charDetails = useSelector(selectCharDetails);
  const isGridLoading = useSelector(selectGridLoading);
  const isCharDetailsLoading = useSelector(selectCharDetailsLoading);
  const dispatch = useDispatch();

  // Initial load
  useEffect(() => {
    dispatch(loadPeopleData());
  }, [dispatch]);

  // Load the list of characters
  const fetchPeopleData = (pageNo = 1) => {
    dispatch(loadPeopleData(pageNo));
  }

  // Load details of selected character
  const fetchCharDetails = (char) => {
    if (char.name !== charDetails.name)
      dispatch(loadCharDetails(char));
  }

  return (
    <div>
      <SWPeopleGrid peopleData={peopleData} isGridLoading={isGridLoading} fetchPeopleData={fetchPeopleData} fetchCharDetails={fetchCharDetails} />
      {charDetails.name ?
        <SWCharacterDetails isCharDetailsLoading={isCharDetailsLoading} charDetails={charDetails} />
        : null}
    </div>
  );
}
