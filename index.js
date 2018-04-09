const Metalsmith     = require('metalsmith');
const timer          = require('./plugins/timer');
const jade           = require('metalsmith-jade');
const layouts        = require('metalsmith-layouts');
const permalinks     = require('metalsmith-permalinks');
const collections    = require('metalsmith-collections');
const uglify         = require('metalsmith-uglify');
const less           = require('metalsmith-less');
const ignore         = require('metalsmith-ignore');
const cleanCss       = require('metalsmith-clean-css');
const metalsmithInspectFiles = require('metalsmith-inspect-files');
const partial = require('metalsmith-partial');

Metalsmith(__dirname)
    .source('./source')
    .metadata({
        title: 'Example blog',
        layout: 'index.jade',
        menuLinks: [
            {title:'Home', url: '/'},
            {title:'Articles', url: '/articles/'},
            {title:'About', url: '/about/'}
        ]
    })
    .destination('./build')
    .clean(true)
    .use(collections({
        articles: {
            pattern: [
                'articles/**',
                '!articles/index.jade'
            ],
            sortBy: 'title'
        },
    }))
    .use(partial({
        directory: './partials',
        engine: 'jade'
    }))
    .use(jade({
        useMetadata: true
    }))
    .use(permalinks({
        relative: false
    }))
    .use(layouts({
        engine: 'jade',
        default: 'index.jade',
        pattern: '**/*.html'
    }))
    .use(less())
    .use(cleanCss())
    .use(uglify())
    .use(ignore([
        '**/*.less'
    ]))
    .use(metalsmithInspectFiles())
    .build((err, files) => {
        if (err) { throw err; }

        timer('Build time: ')();
    });
