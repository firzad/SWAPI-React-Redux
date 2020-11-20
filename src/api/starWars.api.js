import axios from "axios";

// SWAPI call to retrieve list of characters
export const getSWApiPeople = (pageNo = 1) => {
    return axios
        .get(`http://swapi.dev/api/people/?page=${pageNo}`)
        .then(({ data }) => {
            // Add PageNo to the repsonse
            return Promise.resolve({ ...data, pageNo });
        })
        .catch(err => err);
};

// SWAPI call to get the title of the movie along with the year in which it was released
export const getFilmNameWithYear = (url) => {
    return axios
        .get(url)
        .then(({ data }) => {
            return Promise.resolve(`${data.title} (${data.release_date.split('-')[0]})`);
        })
        .catch(err => err);
};