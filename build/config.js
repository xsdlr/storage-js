const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const uglify = require('rollup-plugin-uglify');
const uglifyJS = require('uglify-js-harmony');
const moduleName = require('../package.json').name;
const version = require('../package.json').version;
const buble = require('rollup-plugin-buble');
const progress = require('rollup-plugin-progress');
const filesize = require('rollup-plugin-filesize');
const banner =
`/*
 * ${moduleName} v${version}
 * (c) xsdlr
 * Released under the MIT License.
 */
`;
const external = ['log4js-helper', 'lodash/isNumber', 'lodash/isString'];
const builds = {
  "full-umd": {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/index.js'),
    format: 'umd',
    moduleName,
    banner
  },
  "prod-umd": {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/index.min.js'),
    format: 'umd',
    sourceMap: true,
    plugins: [
      uglify({}, uglifyJS.minify)
    ],
    moduleName,
    banner
  },
  "esm": {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/index.es.js'),
    format: 'es',
    moduleName,
    banner
  },
  "cjs": {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/index.cjs.js'),
    format: 'cjs',
    moduleName,
    banner
  }
};

function genConfig(opts) {
  const config = {
    entry: opts.entry,
    dest: opts.dest,
    external: external.concat(opts.external),
    format: opts.format,
    banner: opts.banner,
    moduleName: opts.moduleName,
    globals: {
      'log4js-helper': 'Logger'
    },
    plugins: [
      replace({
        __VERSION__: version
      }),
      resolve(),
      buble(),
      progress(),
      filesize()
    ].concat(opts.plugins || [])
  };
  return config
}

exports.getAllBuilds = () => Object.keys(builds).map(name => genConfig(builds[name]));
