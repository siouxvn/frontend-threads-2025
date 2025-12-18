import axios from 'axios';

import { corePrefix } from '../variables';

export const coreApi = axios.create({
  baseURL: corePrefix,
});
