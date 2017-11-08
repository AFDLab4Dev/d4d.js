// rollup.config.js
import json from 'rollup-plugin-json';

export default {
  input: 'src/main.js',
  output: {
    file: 'build/d4d.js',
    format: 'iife',
    name: 'd4d'
  },
  plugins: [ json() ]
};