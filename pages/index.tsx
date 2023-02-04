import {useCountries} from 'hooks/useCountries';
import InputAuto from 'components/inputAuto';
import {useState} from 'react';
import CountryDetails from 'components/CountryDetails';
//Types
import type {TCountry} from 'services/TCountries';
import type {NextPage} from 'next';

//Utils
import {debounce} from 'utils/debunce';

//Styles
import styles from 'styles/home.module.scss';

//TODO: write unit test with RTL

const Home: NextPage = () => {
  const [searchvalue, setSearchValue] = useState('');
  const {data, isLoading} = useCountries(searchvalue);
  const [selectedItem, setSelectedItem] = useState<TCountry>();
  const getChanges = debounce((value: string) => {
    if (!value) {
      setSelectedItem(null);
    }
    setSearchValue(value);
  });

  const getSelectedVal = (value: TCountry) => {
    setSelectedItem(value);
  };
  return (
    <div className={styles['container']}>
      <div className={styles['container__input']}>
        <h1 className={styles['container__title']}>
          Search By Nearest Country
        </h1>
        <InputAuto
          isLoading={isLoading}
          searchvalue={searchvalue}
          label="Countries"
          placeholder="search countries"
          data={data}
          onSelected={getSelectedVal}
          onChange={getChanges}
        />
      </div>
      {selectedItem?.name && (
        <CountryDetails
          name={selectedItem?.name}
          lat={selectedItem?.lat}
          lng={selectedItem?.lng}
        />
      )}
    </div>
  );
};

export default Home;
