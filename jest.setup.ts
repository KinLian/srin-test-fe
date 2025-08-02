// https://medium.com/@vitor.vicen.te/setting-up-jest-js-for-a-vite-ts-js-react-project-the-ultimate-guide-7816f4c8b738
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });