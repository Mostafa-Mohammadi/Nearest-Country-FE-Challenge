import React, {useState, FC} from 'react';
//Styles
import styles from './input.module.scss';
//Types
import type {TCountry} from 'services/TCountries';

interface Props {
  label: string;
  placeholder: string;
  onSelected: (val: TCountry) => void;
  onChange: (va: string) => void;
  data: {countries: TCountry[]} | undefined;
  searchvalue: string;
  isLoading: boolean;
}

const InputAuto: FC<Props> = ({
  label,
  placeholder,
  data,
  onSelected,
  isLoading,
  searchvalue,
  onChange,
}) => {
  const [isHideSuggs, setIsHideSuggs] = useState<boolean>(false);
  const [selectedVal, setSelectedVal] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setIsHideSuggs(false);
    setSelectedVal(input);
    onChange(input);
  };

  const hideSuggs = (value: TCountry) => {
    onSelected(value);
    setSelectedVal(value.name);
    setIsHideSuggs(true);
  };

  return (
    <div className={styles['sugesstion-auto']}>
      <div className={styles['form-control-auto']}>
        <label htmlFor="tag-input">{label}</label>
        <input
          placeholder={placeholder}
          type="search"
          value={selectedVal}
          onChange={handleChange}
        />
      </div>

      <div
        className={styles['suggestions']}
        style={{display: isHideSuggs ? 'none' : 'block'}}
      >
        {searchvalue &&
          data?.countries?.map((item, idx) => (
            <div
              key={'' + item.name + idx}
              onClick={() => {
                hideSuggs(item);
              }}
            >
              {item?.name}
            </div>
          ))}
        {searchvalue && isLoading && <div>Loading.....</div>}
      </div>
    </div>
  );
};

export default InputAuto;
