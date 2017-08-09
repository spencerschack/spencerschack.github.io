const fs = require('fs');
const yaml = require('js-yaml');
const Funnel = require('broccoli-funnel');
const Concat = require('broccoli-concat');
const MergeTrees = require('broccoli-merge-trees');
const Postcss = require('broccoli-postcss');
const BroccoliHandlebars = require('broccoli-handlebars');
const BroccoliLivereload = require('broccoli-livereload');

const data = new Funnel('.', {
  // Watch data.yaml so livereload works when you edit it.
  // Funnel CNAME through for GitHub pages config.
  files: ['data.yaml', 'CNAME']
});

const html = new BroccoliHandlebars(['public'], ['index.hbs'], {
  noEscape: true,
  context: function() {
    return yaml.safeLoad(fs.readFileSync('data.yaml'));
  }
});

const index = new BroccoliLivereload(html, {
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
    {
      module: require('postcss-cssnext'),
      options: {
        features: {
          customProperties: false
        }
      }
    },
    require('postcss-css-variables')
  ]
});

const scripts = new Concat('scripts', {

  inputFiles: [
    '**/*.js'
  ],

  outputFile: '/scripts.js'

});

const images = new Funnel('images', {
  destDir: 'images'
});

module.exports = new MergeTrees([scripts, styles, images, index, data]);
