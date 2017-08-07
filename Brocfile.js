const Funnel = require('broccoli-funnel');
const Concat = require('broccoli-concat');
const MergeTrees = require('broccoli-merge-trees');
const JSTranspiler = require('broccoli-babel-transpiler');
const Postcss = require('broccoli-postcss');
const BroccoliLivereload = require('broccoli-livereload');

const index = new BroccoliLivereload('public', {
  target: 'index.html'
});

const css = new Concat('styles', {

  inputFiles: [
    '**/*.css'
  ],

  outputFile: '/styles.css',

  headerFiles: ['typography.css', 'variables.css']

});

const styles = new Postcss(css, {
  // postcss-for and postcss-conditionals must come before postcss-cssnext because the loops and variable interpolation must come before things like nesting and calc reduction.
  plugins: [
    require('postcss-for'),
    require('postcss-conditionals'),
    require('postcss-css-variables'),
    require('postcss-cssnext')
  ]
});

const js = new JSTranspiler('scripts', {

  plugins: [
    'transform-function-bind',
    'transform-es2015-modules-amd'
  ],

  presets: [
    'es2015'
  ],

  moduleIds: true

});

const packages = new Funnel('node_modules/requirejs', {
  files: ['require.js']
});

const scripts = new Concat(new MergeTrees([js, packages]), {

  inputFiles: [
    '**/*.js'
  ],

  outputFile: '/scripts.js',

  headerFiles: ['require.js'],

  footer: "require(['main'], function(main) { main.default(); });"

});

const images = new Funnel('images', {
  destDir: 'images'
});

module.exports = new MergeTrees([scripts, styles, images, index]);
