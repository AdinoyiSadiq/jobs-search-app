import axios from 'axios';
import { Location } from 'expo';
import qs from 'qs';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from './types';

import JOB_DATA from './IndeedJobsData.json';

const JOB_ROOT_URL = 'https://authenticjobs.com/api/?';
const JOB_QUERY_PARAMS = {
  api_key:'bd30dde2e8c818a9792851aef058eeae',
  method: 'aj.jobs.search',
  perpage: '10',
  format: 'json',
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS})
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async (dispatch) => {
  try {
    // let zip = await Location.reverseGeocodeAsync(region);
    // const url = buildJobsUrl(zip);
    // let { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: JOB_DATA });
    callback();
  } catch(e) {
    console.error(e);
  }
}

export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB 
  };
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
};
