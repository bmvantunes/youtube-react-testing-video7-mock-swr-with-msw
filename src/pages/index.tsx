import { useState } from 'react';
import { CarBrands } from '../components/CarBrands';

export default function Home() {
  const [country, setCountry] = useState<'Germany' | 'France' | 'Italy'>(
    'Germany'
  );
  return (
    <>
      <h1>Car App</h1>
      <button onClick={() => setCountry('Germany')}>Germany</button>
      <button onClick={() => setCountry('France')}>France</button>
      <button onClick={() => setCountry('Italy')}>Italy</button>

      <CarBrands country={country} />
    </>
  );
}
