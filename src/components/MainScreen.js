import React, { useEffect, useState } from 'react';
import { useForm } from '../hooks/useForm';
import { Countries } from './Countries';

export const MainScreen = () => {
  const [values, handleInputChange, reset] = useForm({ country: '' });

  const { country } = values;

  const [city, setCity] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(country);
    reset();
    setLoading(true);
  };

  const [selectedRegion, setSelectedRegion] = useState();

  const [countryInfo, setCountryInfo] = useState();

  const [Loading, setLoading] = useState(true);

  const handleSelect = (e) => {
    if (e.target.value !== '') {
      setSelectedRegion(e.target.value);
    } else {
      console.log('invalid region');
    }
  };

  useEffect(() => {
    if (selectedRegion !== undefined) {
      fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
        .then((resp) => resp.json())
        .then((data) => {
          setCountryInfo(data);
          setLoading(false);
        });
    } else {
    }
  }, [selectedRegion]);

  return (
    <div className='wrapper'>
      <div className='navbar'>
        <p className='navbar__logo'>Where in the world?</p>
        <p className='navbar__mode'>Dark/Light mode</p>
      </div>
      <div className='input-container'>
        <div>
          <ion-icon name='search-circle-outline'></ion-icon>
          <form className='input-container-form' onSubmit={handleSubmit}>
            <input
              className='input-container-form__input'
              type='text'
              placeholder='Search for a country...'
              value={country}
              name='country'
              onChange={handleInputChange}
            />
          </form>
        </div>
        <select onChange={handleSelect} className='input-container__options'>
          <option value=''>Select a region</option>
          <option value='Africa'>Africa</option>
          <option value='America'>America</option>
          <option value='Asia'>Asia</option>
          <option value='Europe'>Europe</option>
          <option value='Oceania'>Oceania</option>
        </select>
      </div>
      <div className={!Loading ? 'countries-container' : ''}>
        {Loading ? (
          <Countries country={city} />
        ) : (
          countryInfo.map((element, index) => (
            <div key={index}>
              <div>
                <img
                  src={element.flags.png}
                  alt='country flag'
                  height='200px'
                  width='200px'
                ></img>
                <p>{element.name.common}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
