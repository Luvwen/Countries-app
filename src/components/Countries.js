import React, { useEffect, useState } from 'react';

export const Countries = ({ country }) => {
  const [cityName, setCityName] = useState();

  useEffect(() => {
    if (country !== undefined) {
      fetch(`https://restcountries.com/v2/name/${country}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data[0]);
          setCityName(data);
        });
    } else {
      console.log('Insert a country name');
    }
  }, [country]);

  return (
    <div className='countries-container'>
      {cityName
        ? cityName.map((city, i) => (
            <div key={i}>
              <img
                src={city.flags.png}
                alt='country flag'
                height='200px'
                width='200px'
              />
              <p>{city.name}</p>
            </div>
          ))
        : ''}
    </div>
  );
};
