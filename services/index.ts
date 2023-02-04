import Axios from 'axios';

//Types
import type {TCountry} from './TCountries';

export const api = Axios.create({
  baseURL: 'http://localhost:3000',
});

const getCountries = async (search: string) => {
  const data: {data: {countries: TCountry[]}} = await api.get(
    `/api/countries?search=${search}`,
  );
  return data?.data;
};

export {getCountries};
