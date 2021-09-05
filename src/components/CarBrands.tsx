import React from 'react';
import useSWR from 'swr';
import { MyApiError } from '../MyApiError';

export interface CarBrandsProps {
  country: 'Germany' | 'France' | 'Italy';
}
export function CarBrands({ country }: CarBrandsProps) {
  const { isValidating, error, data } = useSWR<string[], MyApiError>(
    `/api/cars/${country}`
  );

  return (
    <>
      <h5>Car Brands from {country}</h5>
      {isValidating && !error ? <div>Loading...</div> : null}
      {error ? <div>{error.message}</div> : null}

      {!data?.length && !isValidating && !error ? (
        <div>No Data to Show</div>
      ) : (
        <ul>
          {data?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
}
