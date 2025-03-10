import { initTsrReactQuery } from '@ts-rest/react-query/v5';
import { contract } from "@monorepo/api-types";

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
console.log('baseUrl===>', baseUrl);

export const api = initTsrReactQuery(contract, {
  baseUrl,
  baseHeaders: {
  },
  credentials: 'include',
});