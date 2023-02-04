import {useQuery} from 'react-query';

//services
import {getCountries} from 'services';
 
// TODO: Implementing pagination for service response
export const useCountries = search => {
  const {data, isLoading} = useQuery(['contries', search], () =>
    getCountries(search),
  );
  return {data, isLoading};
};
