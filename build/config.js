const path = require('path');
const flow = require('rollup-plugin-flow-no-whitespace');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const filesize = require('rollup-plugin-filesize');
const progress = require('rollup-plugin-progress');
const uglify = require('rollup-plugin-uglify');
const uglifyJS = require('uglify-js-harmony');
const version = process.env.VERSION || require('../package.json').version;
const moduleName = require('../package.json').name;
const pkg = require('../package.json');

const banner =
`/*
 * ${moduleName} v${version}
 * (c) xsdlr
 * Released under the MIT License.
 */
`;

const builds = {
  "full-umd": {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/storage-js.js'),
    format: 'umd',
    moduleName,
    banner
  },
  "prod-umd": {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/storage-js.min.js'),
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
    dest: path.resolve(__dirname, '../dist/storage-js.es.js'),
    format: 'es',
    moduleName,
    banner
  },
  "cjs": {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/storage-js.cjs.js'),
    format: 'cjs',
    moduleName,
    banner
  }
};

function genConfig(opts) {
  const config = {
    entry: opts.entry,
    dest: opts.dest,
    external: opts.external,
    format: opts.format,
    banner: opts.banner,
    moduleName: opts.moduleName,
    plugins: [
      replace({
        __VERSION__: version
      }),
      flow(),
      resolve(),
      babel(Object.assign(pkg.babel, {
        babelrc: false,
        plugins: ['external-helpers'],
        externalHelpers: true,
        exclude: 'node_modules/**',
        runtimeHelpers: true,
        presets: pkg.babel.presets.map(x => (x === 'latest' ? ['latest', { es2015: { modules: false } }] : x)),
      })),
      progress(),
      filesize()
    ].concat(opts.plugins || [])
  }
  return config
}

exports.getAllBuilds = () => Object.keys(builds).map(name => genConfig(builds[name]));
