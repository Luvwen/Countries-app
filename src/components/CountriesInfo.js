import React from 'react';

export const CountriesInfo = ({ props, info, data }) => {
  console.log(data);
  // console.log(data.borders);

  return (
    <>
      {data.map((element, index) => (
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
                <strong>Top level domain: </strong> {element.topLevelDomain[0]}
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
      ))}
    </>
  );
};
