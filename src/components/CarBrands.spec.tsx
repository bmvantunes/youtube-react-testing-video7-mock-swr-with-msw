import { render, screen } from '@testing-library/react';
import React from 'react';
import { CarBrands } from './CarBrands';
import { MySwrConfig } from './MySwrConfig';

describe('Car Brands', () => {
  describe('when "France" is selected', () => {
    beforeEach(() => {
      render(
        <MySwrConfig>
          <CarBrands country="France" />
        </MySwrConfig>
      );
    });

    it('renders "Car Brands from France"', () => {
      const element = screen.getByText('Car Brands from France');
      expect(element).toBeInTheDocument();
    });
  });

  describe('when "Germany" is selected', () => {
    beforeEach(() => {
      render(
        <MySwrConfig>
          <CarBrands country="Germany" />
        </MySwrConfig>
      );
    });

    it('renders "Car Brands from Germany"', () => {
      const element = screen.getByText('Car Brands from Germany');
      expect(element).toBeInTheDocument();
    });
  });

  describe('when "Italy" is selected', () => {
    beforeEach(() => {
      render(
        <MySwrConfig>
          <CarBrands country="Italy" />
        </MySwrConfig>
      );
    });

    it('renders "Car Brands from Italy"', () => {
      const element = screen.getByText('Car Brands from Italy');
      expect(element).toBeInTheDocument();
    });
  });
});
