import React, {FC} from 'react';
import styles from './details.module.scss';

interface Props {
  lat: string | number;
  lng: string | number;
  name: string;
}

const CountryDetails: FC<Props> = ({name, lat, lng}) => {
  return (
    <div className={styles['details-container']}>
      <div className={styles['details-container__item']}>
        <div>Country :</div>
        <div>{name}</div>
      </div>
      <div className={styles['details-container__item']}>
        <div>Latitude :</div>
        <div>{lat}</div>
      </div>
      <div className={styles['details-container__item']}>
        <div>Longitude :</div>
        <div>{lng}</div>
      </div>
    </div>
  );
};

export default CountryDetails;
