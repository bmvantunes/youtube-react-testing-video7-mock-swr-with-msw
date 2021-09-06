import {
  render,
  RenderOptions,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React, { FC, ReactElement } from 'react';
import { CarBrands } from './CarBrands';
import { MySwrConfig } from './MySwrConfig';
import { setupServer } from 'msw/node';
import { DefaultRequestBody, rest } from 'msw';

const server = setupServer(
  rest.get<DefaultRequestBody, string[]>(
    '/api/cars/france',
    (req, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.json([`Custom France B1`, `Custom France B2`])
      );
    }
  ),

  rest.get<DefaultRequestBody, string[]>(
    '/api/cars/germany',
    (req, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.json([`Custom Germany B1`, `Custom Germany B2`])
      );
    }
  ),

  rest.get<DefaultRequestBody, { message: string }>(
    '/api/cars/italy',
    (req, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.status(500),
        ctx.json({ message: 'Unit test message' })
      );
    }
  )

  // rest.get<DefaultRequestBody, string[]>(
  //   '/api/cars/:country',
  //   (req, res, ctx) => {
  //     return res(
  //       ctx.delay(100),
  //       ctx.json([`${req.params.country} xB1`, `${req.params.country} B2`])
  //     );
  //   }
  // )\\\\\\
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Car Brands', () => {
  describe('when "France" is selected', () => {
    beforeEach(async () => {
      customRender(<CarBrands country="France" />);

      await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    });

    it('renders "Car Brands from France"', () => {
      const element = screen.getByText('Car Brands from France');
      expect(element).toBeInTheDocument();
    });

    it('renders the expected brands', () => {
      expect(screen.getByText('Custom France B1')).toBeInTheDocument();
      expect(screen.getByText('Custom France B2')).toBeInTheDocument();
    });
  });

  describe('when "Germany" is selected', () => {
    beforeEach(async () => {
      customRender(<CarBrands country="Germany" />);
      await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    });

    it('renders "Car Brands from Germany"', () => {
      const element = screen.getByText('Car Brands from Germany');
      expect(element).toBeInTheDocument();
    });

    it('renders the expected brands', () => {
      expect(screen.getByText('Custom Germany B1')).toBeInTheDocument();
      expect(screen.getByText('Custom Germany B2')).toBeInTheDocument();
    });
  });

  describe('when "Italy" is selected', () => {
    beforeEach(async () => {
      customRender(<CarBrands country="Italy" />);
      await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    });

    it('renders "Car Brands from Italy"', () => {
      const element = screen.getByText('Car Brands from Italy');
      expect(element).toBeInTheDocument();
    });

    it('show expected error message', () => {
      expect(screen.getByText('Unit test message')).toBeInTheDocument();
    });
  });

  describe('when no results returned', () => {
    beforeEach(async () => {
      server.use(
        rest.get<DefaultRequestBody, string[]>(
          '/api/cars/france',
          (req, res, ctx) => {
            return res(ctx.delay(100), ctx.json([]));
          }
        )
      );

      customRender(<CarBrands country="France" />);
      await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    });

    it('show expected no data message', () => {
      expect(screen.getByText('No Data to Show')).toBeInTheDocument();
    });
  });
});

const AllTheProviders: FC = ({ children }) => {
  return (
    <MySwrConfig swrConfig={{ dedupingInterval: 0, provider: () => new Map() }}>
      {children}
    </MySwrConfig>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });
