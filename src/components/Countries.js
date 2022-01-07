import React, { useEffect, useState } from 'react';

export const Countries = ({
  country,
  transitionToChild,
  infoToChild,
  showInformation,
}) => {
  const [cityName, setCityName] = useState();

  useEffect(() => {
    if (country !== undefined) {
      fetch(`https://restcountries.com/v2/name/${country}`)
        .then((res) => res.json())
        .then((data) => {
          setCityName(data);
        });
    } else {
      console.log('Insert a country name');
    }
  }, [country]);

  const [dataTransfer, setDataTransfer] = useState('');

  const handleFlagClick = (e) => {
    fetch(`https://restcountries.com/v2/name/${e.target.alt}`)
      .then((response) => response.json())
      .then((info) => {
        setDataTransfer([info[0]]);
        transitionToChild();
        infoToChild();
      });
  };
  return (
    <>
      {!showInformation ? (
        <div onClick={handleFlagClick} className='countries-container'>
          {cityName
            ? cityName.map((city, i) => (
                <div key={i}>
                  <img
                    src={city.flags.png}
                    alt={city.name}
                    height='200px'
                    width='200px'
                  />
                  <p>{city.name}</p>
                </div>
              ))
            : ''}
        </div>
      ) : (
        dataTransfer.map((element, index) => (
          <div className='countries-information' key={index}>
            <div>
              <img src={element.flags.png} alt='country flag' />
            </div>
            <div className='countries-information__countries'>
              <h1>{element.name}</h1>
              <div className='countries-info'>
                <p>
                  <strong>Native name:</strong> {element.nativeName}
                </p>
                <p>
                  <strong>Top level domain: </strong>{' '}
                  {element.topLevelDomain[0]}
                </p>
                <p>
                  <strong>Population:</strong> {element.population}
                </p>
                <p>
                  <strong>Region:</strong> {element.region}
                </p>
                <p>
                  <strong>Subregion:</strong> {element.subregion}
                </p>
                <p>
                  <strong>Capital:</strong>
                  {element.capital}
                </p>
                <p>
                  <strong>Currencie:</strong> {element.currencies[0].name}
                </p>
              </div>
              {element.borders !== undefined ? <p>{element.borders[0]}</p> : ''}
            </div>
          </div>
        ))
      )}
    </>
  );
};
