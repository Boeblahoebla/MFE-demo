import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import { string } from 'rollup-plugin-string'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/main.js',
    format: 'iife'
  },
  plugins: [
    json(), 
    resolve(), 
    string({
      include: '**/*.css',
      exclude: '**.index.html'
    })
  ]
}
