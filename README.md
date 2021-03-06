# ![Nucleum](./src/assets/images/nucleum-banner.png)

**Nucleum** is an opinionated, performance oriented web development starter kit. It can be used as-is as a static site generator, or can be configured and integrated into many different web development environments and sites or apps structures.

The [extras](./extras) folder contains configuration details for **WordPress** projects. Check the [WordPress with Nucleum](./extras/wordpress/README-WP.md) documentation to learn more about how to set up Nucleum for WordPress based projects.

## Quick start on a fresh project (empty directory)

### Setup

The easiest way to get started with Nucleum is by using `create-nucleum-project`. This simple CLI tool enables you to quickly start building a new Nucleum project, with everything set up for you. To get started, use the following command:

```zsh
yarn create nucleum-project
# or
npx create-nucleum-project
```

After the installation is complete, follow the instructions to start the development server. Try editing `src/views/pages/index.njk` and see the result on your browser.

For more information on how to use `create-nucleum-project`, you can review the [`create-nucleum-project` documentation](https://github.com/CosAnca/create-nucleum-project).

### Manual Setup

**Nucleum** is published as an npm package which allows us to start a new project in a only a few steps:

```zsh
yarn add nucleum
yarn nucleum init
# or
npm install nucleum
npm run nucleum init
```

This will create the default `src` directory and `nucleum.config.js` file in your project directory.

The `init` command also updates your `package.json` file to include `dev` and `build` scripts for Nucleum:

```js
// package.json
"scripts": {
  "dev": "yarn nucleum",
  "build": "yarn nucleum build"
}
```

which you can then use on the command line:

```zsh
yarn dev
yarn build
# or
npm run dev
npm run build
```

A default `browserslist` configuration is added as well into the `package.json` file. You can customize it based on your project needs.

```js
// package.json
"browserslist": [
  ">0.5%",
  "not dead",
  "ie >= 11",
  "not op_mini all"
]
```

Your project's CSS and JavaScript files will be compiled for production to include the necessary prefixes or syntax for the browsers you need to support.

You can find more details about browserslist and the type of queries its configuration requires by visiting the [browserslist repo](https://github.com/browserslist/browserslist).

## Adding to an existing project?

If you want to use Nucleum as a front-end build tool in an existing project, you can generate a basic `nucleum.config.js` file with:

```zsh
yarn nucleum init-config
# or
npm run nucleum init-config
```

Then edit the configs to match the needs of your project. To understand better how you can customize each config object, take a look at our [`config-defaults`](gulpfile.js/lib/config-defaults.js) file.

## Recommended Setup

To benefit even further of Nucleum's capabilities, we recommend you install some dev dependencies that can help you lint your SCSS and JavaScript files.

Nucleum automatically generates config files for eslint and stylelint that you can either use as they are or change them based on your project needs.

#### Additional dev dependencies

[eslint](https://eslint.org/)
[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
[eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat)
[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
[prettier](https://prettier.io/)
[stylelint](https://stylelint.io/)
[stylelint-config-nucleum](https://github.com/CosAnca/stylelint-config-nucleum)
[husky](https://github.com/typicode/husky)
[lint-staged](https://github.com/okonet/lint-staged)

You can install them all at once by running the following command in your Terminal:

```zsh
yarn add -D eslint eslint-config-prettier eslint-plugin-compat eslint-plugin-prettier husky lint-staged prettier stylelint stylelint-config-nucleum
# or
npm install -D eslint eslint-config-prettier eslint-plugin-compat eslint-plugin-prettier husky lint-staged prettier stylelint stylelint-config-nucleum
```

If you'd like to have your code (SCSS and JS) linted before every commit, you can add the following configuraiton objects into your `package.json` file:

```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "src/assets/js/**/*.js": [
    "eslint --fix",
    "prettier --write"
  ],
  "src/assets/style/**/*.scss": [
    "stylelint --fix",
    "prettier --write"
  ]
}
```

# Commands

```zsh
yarn dev
# or
npm run dev
```

This is where the magic happens. The perfect workflow. This runs the development task, which starts compiling, watching, and live updating all our files as we change them. BrowserSync will start a server on port 3000, or do whatever you've configured it to do. You'll be able to see live changes in all connected browsers. Don't forget about the additional BrowserSync tools available on port 3001!

```zsh
yarn build
# or
npm run build
```

Compiles files for production to your destination directory. JS files are built using Webpack with standard production optimisations (Uglify, etc.). CSS is run through CSSNano and PurgeCSS. If `rev` is set to `true` in your `nucleum.config.js` file, filenames will be hashed (file.css -> file-a8908d9io20.css) so your server may cache them indefinitely.

# Configuration

You may override the default configuration by creating a `nucleum.config.js` file. The file will be created by any of the `init` tasks, or you can generate _only_ the config file with the following command:

```zsh
yarn nucleum init-config
# or
npm run nucleum init-config
```

By default, Nucleum expects the config file to live at the root of your project. You may specify an alternative relative location by setting an environment variable:

```js
// package.json
"scripts": {
  "nucleum": "NUCLEUM_CONFIG_PATH='./some/location' nucleum"
}
```

```zsh
# command line
yarn nucleum
# or
npm run nucleum
```

The file must be named `nucleum.config.js`.

### Configuring files structure and tasks

`nucleum.config.js`

This file specifies the `src` (default to _"./src"_) and `dest` (default to _"./public"_) root directories under a `basePats` object, and `src` and `dest` for each task, relative to the configured base paths. For example, if your source files live in a folder called `app`, and your compiled files should be output to a folder called `static`, you'd update the base paths `src` and `dest` properties here to reflect that.

This file also exposes per-task configuration and overrides. At minimum, you just need to set the task to `true` to enable the task with its default configuration. If you wish to configure a task, provide a configuration object instead.

- Any task may be disabled by setting the value to `false`. For example, if your project has its own handling of HTML and template engine (WordPress, Craft, etc), you'll want to set `html` to `false` in your config file.
- All asset tasks have an `extensions` option that can be used to overwrite the ones that are processed and watched.

See [config defaults](./gulpfile.js/lib/config-defaults.js) for a closer look. All configuration objects will be merged with these defaults. Note that `array` options are replaced rather than merged or concatenated.

### browserSync

Options to pass to [browserSync](https://browsersync.io/docs/options).

**If you're using Eleventy (built in) to create a static site**, you'll want to use the `server` property and tell it which directory to serve up via the `baseDir` option.

```js
browserSync: {
  server: {
    baseDir: "public";
  }
}
```

**If you're running another server (Docker for example)**, you'll want to use the `proxy` option, along with `files` to tell browserSync to watch additional files (like your templates).

```js
browserSync: {
  proxy: {
    target: "localhost"
  },
  files: ["public/wp-content/themes/nucleum/**/*.php"]
}
```

**If you need to turn on polling within webpack-dev-middleware**, specify `watchOptions` within this section, too.

```js
browserSync: {
  watchOptions: {
    poll: true,
    aggregateTimeout: 300
  }
}
```

**If you need to add extra middlewares**, specify `extraMiddlewares` within the `server` subsection of this section.

```js
browserSync: {
  server: {
    extraMiddlewares: [historyApiFallbackMiddleware],
  },
},
```

**If you need to override completely all server's middleware**, specify `middleware` within the `server` subsection of this section.

```js
browserSync: {
  server: {
    middleware: [
      /* On your own! Note that default 'webpack-dev-middleware' will not be enabled using this option */
    ],
  },
}
```

### javascripts

Under the hood, JS is compiled with Webpack with a heavily customized Webpack file to get you up and running with little to no configuration. An API for configuring some of the most commonly accessed options are exposed, along with some other helpers for scoping to environment. Additionally, you can get full access to modify Nucleum's `webpackConfig` via the [`customizeWebpackConfig`](#customizeWebpackConfig) option.

#### `src`

This is the source path, relative to the src base path for the JavaScript files. Default to _"assets/js"_.

#### `dest`

This is the destination path, relative to the dest base path for the compiled JavaScript files. Default to _"assets/js"_.

#### `entry` (required)

Discrete js bundle entry points. A js file will be bundled for each item. Paths are relative to the `js` folder. This maps directly to `webpackConfig.entry`.

#### `publicPath`

The public path to your assets on your server. Only needed if this differs from the result of `path.join(TASK_CONFIG.basePaths.dest, TASK_CONFIG.javascripts.dest)`. Maps directly to `webpackConfig.publicPath`

#### `devtool`

Sets the webpack devtool option in development mode. Defaults to `eval-cheap-module-source-map`, one of the fastest source map options. To enable sourcemaps in production builds, use [`customizeWebpackConfig`](#customizeWebpackConfig).

#### `babel`

Object to overwrite the default Babel loader config object. Set by default to:

```js
presets: [["@babel/preset-env", { modules: false }]],
plugins: [
  ["@babel/plugin-proposal-class-properties", { loose: true }],
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-transform-runtime",
],
```

Same format as a `.babelrc` file.

#### `babelLoader`

Object to extend the default config for _entire_ Babel loader object. See [Webpack loader documentation](https://webpack.js.org/concepts/loaders/) for details.

#### `provide`

Key value list of variables that should be provided for modules to resolve dependencies on import using [webpack.ProvidePlugin](https://webpack.github.io/docs/list-of-plugins.html#provideplugin). A common example is making jQuery available to all modules (jQuery plugins need this). In that scenario, with `jquery` installed via `yarn`, add this to your javascripts config:

```js
provide: {
  $: "jquery",
  jQuery: "jquery"
}
```

Under the hood, this gets passed directly to [webpack.ProvidePlugin](https://webpack.github.io/docs/list-of-plugins.html#provideplugin) in the webpack config.

```js
plugins: [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
  }),
];
```

#### `plugins`

Define additional webpack plugins that should be used in all environments.

#### `loaders`

Define additional webpack loaders that should be used in all environments. Adds to `webpackConfig.module.rules`

#### `development`, `production`

Specify additional environment specific configuration to be merged in with Nucleum's defaults

- [`devtool`](https://webpack.js.org/configuration/devtool/#devtool)
- [`plugins`](https://webpack.js.org/concepts/plugins/)
- [`loaders`](https://webpack.js.org/concepts/loaders/)

_Production Only:_

- [`definePlugin`](https://webpack.js.org/plugins/define-plugin)

**Example:**

```js
production: {
  devtool: "hidden-source-map",
  definePlugin: {
    SOME_API_KEY: "abcdefg"
  },
  plugins: (webpack) => { return [ new webpack.IgnorePlugin(/jsdom$/) ] },
  loaders: [] // Adds to `webpackConfig.module.rules`
}
```

By default, the `env` will be `"development"` when running `yarn nucleum`, and `"production"` when running `yarn nucleum build`.

#### `hot`

By default, webpack HMR will simply do a full browser refresh when your js files change. If your code takes advantage of [hot module replacement methods](https://webpack.github.io/docs/hot-module-replacement.html), modules will be hot loaded.

_Defaults to:_

```js
hot: {
  enabled: true,
  reload: true,
  quiet: true,
  react: false
}
```

**If you're using React** `yarn add react-hot-loader` or `npm install react-hot-loader` and set `react: true` to enable [react-hot-loader](https://github.com/gaearon/react-hot-loader). [Follow the docs](https://github.com/gaearon/react-hot-loader) and update your React app to take advantage. Also install `@babel/preset-react` and add it to the babel presets configuration.

#### `customizeWebpackConfig`

In the event that an option you need is not exposed, you may access, modify and return a further customized webpackConfig by providing this option as a function. The function will receive the Nucleum `webpackConfig`, `env` and `webpack` as params. The `env` value will be either `development` or `production`.

```js
customizeWebpackConfig: function (webpackConfig, env, webpack) {
  if(env === "production") {
    webpackConfig.devtool = "nosources-source-map"
  }

  return webpackConfig
}
```

**CAUTION!** Avoid overwriting `webpackConfig.entry` or `webpackConfig.plugins` via this function, and rely on the `entry` and `plugins` options above to avoid breaking Nucleum's hot-loading and file revisioning setup ([view source](./gulpfile.js/lib/webpack-multi-config.js)).

### stylesheets

#### `src`

This is the source path, relative to the src base path for the Sass files. Default to _"assets/styles"_.

#### `dest`

This is the destination path, relative to the dest base path for the compiled CSS files. Default to _"assets/css"_.

#### `presetEnv`

[PostCSS Preset Env](https://github.com/csstools/postcss-preset-env) lets you convert modern CSS into something most browsers can understand, determining the polyfills you need based on your targeted browsers or runtime environments.

Be default we set the stage of postcssPresetEnv to 0 which will enable experimental feature of CSS.

Within this object you can also override the `browserslist` configuration and/or `autoprefixer` settings. Please read more about postcssPresetEnv configuration on their repo page https://github.com/csstools/postcss-preset-env#options.

```js
stylesheets: {
  presetEnv: {
    stage: 3,
    browsers: "last 2 versions",
    autoprefixer: { grid: true } // passing `autoprefixer: false` disables autoprefixer
  }
}
```

#### `normalize`

[PostCSS Normalize](https://github.com/csstools/postcss-normalize) lets you use the parts of normalize.css you need from your `browserslist`. Please read more about postcssNormalize configuration option on their repo page https://github.com/csstools/postcss-normalize#options.
By default this option is disabled in Nucleum but you can enable it either by setting the `forceImport` option to `true` under `stylesheets.normalize` object in `nucleum.config.js` without having to specifically include the library at the beginning of our sass file, or by importing the library in your main sass file.

#### `cssnano`

[cssnano](https://cssnano.co/) takes your nicely formatted CSS and runs it through many focused optimisations, to ensure that the final result is as small as possible for a production environment. _This optimisation is only run on the build task_.

#### `purgecss`

[purgecss](https://www.purgecss.com/) is a tool to remove unused CSS. Purgecss has a list of options that allow you to customize its behavior. Customization can improve the performance and efficiency of Purgecss. You can customize its configuration with the options found on their documentation page https://www.purgecss.com/configuration. _This optimisation (when enabled) will only run on the build task_.

```js
stylesheets: {
  purgecss: {
    content: ["./src/**/*.njk"], // the path should be absolute (you may need to use `path.resolve()`)
    // extra configuration (check the options in their documentation)
  }
}
```

**IMPORTANT** All of the above stylesheets options are included as PostCSS plugins.

#### `postcssPlugins`

Allows passing extra postcss plugins into the pipeline.

```js
stylesheets: {
  postcssPlugins: [pluginName(pluginConfig)];
}
```

#### `sass`

Options to pass to [node-sass](https://github.com/sass/node-sass#options).

Defaults to `{ includePaths: ["./node_modules"] }` so you can `@import` files installed to `node_modules`.

#### `criticalCss`

We use [critical](https://github.com/addyosmani/critical) to extract and inline critical-path (above-the-fold) CSS from HTML.

**IMPORTANT** Use the `criticalCss` object inside `nucleum.config.js` file to set the critical `src` and `dest`. _Setting these properties inside `criticalCss.config` will not work_.

There are two ways of generating critical CSS.

1. Running the gulp task through all the templates generated at the root of the public folder.

```js
// nucleum.config.js
criticalCss: {
  src: "./**/*.html",
  dest: "./",
  config: {
    base: "./public",
    inline: true,
    width: 1280,
    height: 800,
  },
}
```

1. Creating a `pages` array where each page object sets an `url` and a `template` property. This is useful for generating critical CSS when the templates are generated by CMSs or other tools.

```js
// nucleum.config.js
criticalCss: {
  src: "", // this should be empty because the src is set per page in the `pages` array
  dest: "assets/style/critical",
  siteUrl: "http://localhost", // can also be external URL
  config: {
    // ...critical options
    base: "./public/wp-content/themes/nucleum",
    width: 1200,
    height: 1200
  },
  pages: [
    {
      url: "",
      template: "index"
    }
  ]
}
```

**IMPORTANT** If `pages.url` is not set to a `.html` file or to a file system path make sure your website is running on a local server for the criticalCss task to work.

Setting the `config` object, you can create the necessary configuration for [critical](https://github.com/addyosmani/critical).

### html

#### `src`

This is the source path, relative to the src base path for the template languages files. Default to _"views"_.

#### `dest`

This is the destination path, relative to the dest base path for the compiled template files. Default to _"./"_.

**Note:** If you are on a platform that's already handling html, like a CMS (WordPress, Craft, etc.), set `html: false` or delete the configuration object completely from `nucleum.config.js`. If that's the case, don't forget to use the BrowserSync [`files` option](https://browsersync.io/docs/options#option-file) in the `browserSync` config object to start watching your templates folder.

Nucleum is using [Eleventy] under the hood to generate static HTML files.

We use [Nunjucks] as the default templating engine but you can change that to any other Eleventy [supported template languages](https://www.11ty.dev/docs/languages/). Also, by default the HTML output is beautified rather than minified. If you'd like to change that behaviour, you'll have to add a new transform to minify the output. Find out more in the [Eleventy Documentation](https://www.11ty.dev/docs/config/#transforms-example-minify-html-output).

You can change or extend Eleventy's configuration through the [.eleventy.js](./.eleventy.js) file.

**IMPORTANT** If you change the html src and dest paths make sure the paths under the dir object in .eleventy.js file are updated accordingly.

If you ever need a more verbose error output for Eleventy, run your project with the following command: `DEBUG=Eleventy* yarn dev`.

### static

There are some files that belong in your root destination directory that you won't want to process or revision in production. Things like [favicons, app icons, etc.](http://realfavicongenerator.net), should go in `src/static`, and will get copied over to `public` as a last step (after revisioning in production). _Nothing_ should ever go directly in `public`, since it gets completely trashed and re-build when running the `default` or `production` tasks.

#### `scrOptions`

Options passed to `gulp.src`. See [gulp documentation](https://github.com/gulpjs/gulp/blob/master/docs/API.md#options) for details. Defaults to:

```js
static: {
  srcOptions: {
    dot: true; // include dotfiles
  }
}
```

### fonts, images

#### `src`

This is the source path, relative to the src base path for the fonts or images files. Default to _"assets/fonts"_ and _"assets/fonts"_.

#### `dest`

This is the destination path, relative to the dest base path for the fonts or images files. Default to _"assets/images"_ and _"assets/images"_.

These tasks simply copy files from `src` to `dest` configured in `nucleum.config.js`. Nothing to configure here other that specifying extensions or disabling the task.

### icons

#### `src`

This is the source path, relative to the src base path for the icon files. Default to _"assets/icons"_.

#### `dest`

This is the destination path, relative to the dest base path for the compiled SVG sprite file. Default to _"assets/images"_.

Generates an SVG Sprite from `.svg` files in `src/icons`. You can either include the created SVG directly on the page and reference the icon by id like this:

```html
<svg viewBox="0 0 1 1"><use xlink:href="#my-icon"></use></svg>
```

or reference the image remotely:

```html
<svg viewBox="0 0 1 1">
  <use xlink:href="/assets/images/icons.svg#my-icon"></use>
</svg>
```

If you reference the sprite remotely, be sure to include something like [inline-svg-sprite](https://github.com/vigetlabs/inline-svg-sprite) to ensure external loading works on Internet Explorer.

Nucleum includes a macro inside `src/includes/_macros.njk` which generates the required svg markup for your icons, so you can just do:

```njk
{% from "_macros.njk" import icon %}

{{ icon("my-icon") }}
```

Which outputs:

```html
<svg class="c-icon">
  <use xlink:href="/assets/images/icons.svg#my-icon"></use>
</svg>
```

For advanced usage, see the example at the top of the `src/includes/_macros.njk` file.

This particular setup allows styling 2 different colors from your CSS. You can have unlimited colors hard coded into your svg.

In the following example, the first path will be `red`, the second will be `white`, and the third will be `blue`. Paths **without a fill attribute** will inherit the `fill` property from CSS. Paths with `fill="currentColor"` will inherit the current CSS `color` value, and hard-coded fills will not be overwritten, since inline styles trump CSS values.

```scss
.c-icon {
  fill: #f00;
  color: #fff;
}
```

```svg
<svg xmlns="http://www.w3.org/2000/svg">
  <path d="..."/>
  <path fill="currentColor" d="..."/>
  <path fill="blue" d="..."/>
</svg>
```

Make sure:

1. you draw your SVGs on a square (24 x 24) canvas
2. you center your artwork
3. you expand/combine any shapes of the same color

The last step is very important to ensure the correct style (fill) gets applied to the path you actually target.

We also include [postcss-svg](https://github.com/jonathantneal/postcss-svg) which automatically encodes SVGs referenced through `url("../path/to/file.svg")` in our CSS files.

Example:

```scss
.c-element {
  background-image: url("../img/logo.svg");
}
```

The above will output:

```css
.c-element {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' ...");
}
```

We can also set the fill color of the encoded SVG using custom properties in our SVGs markup.

To use this option make sure the `<path/>` styles are not set with individual attributes (like `fill="currentColor"` or `fill="red"`) but within a single `style` attribute, like so:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <path style="fill: currentColor; fill: var(--icon-fill-color, currentColor)" d="M7 7h2v5H7V7zm1-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 8A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm0 2A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
</svg>

```

The first `fill` property is a fallback for Internet Explorer while the second one is picked up by browsers that support CSS Custom Properties (CSS Variables).

In our SCSS file, when we need an inline icon we can just reference the symbol id from the SVG sprite or the SVG file path, like this:

```scss
.c-icon {
  background-image: url("icons#icon-info"param(--icon-fill-color color("success")));
}
```

### clean

```js
clean: {
  patterns: [
    path.resolve(process.env.INIT_CWD, "dist/assets"),
    path.resolve(process.env.INIT_CWD, "dist/templates"),
  ];
}
```

By default, the entire `dest` directory is deleted before each build. By setting the `clean.patterns` option, you can specify which directory or directories (using globbing syntax) should be deleted instead. Use this if you have subdirectories within the `dest` directory that should be left alone (media uploaded through a CMS, say).

### production

Filenames are revisioned when running the production `build` task. If you want to disable this behaviour, you can set `rev` to false.

```js
production: {
  rev: true;
}
```

The default directory where the `rev-manifest.json` file is generated is `assets`. If you want to output your compiled files into a different directory, you can also ensure the `rev-manifest.json` file is generated as part of the same directory by using the `manifestDir` property.

For example, in a project where you only need to handle the CSS and JS compilation and bundling and in your `nucleum.config.js` file you set the `dist` path directly to your assets destination folder, you can set the `manifestDir` to an empty string.

```js
production: {
  rev: {
    manifestDir: "";
  }
}
```

### additionalTasks

If you wish to define additional gulp tasks, and have them run at a certain point in the build process, you may use this configuration to do so via the following config object:

```js
additionalTasks: {
  initialize(gulp, TASK_CONFIG) {
    // Add gulp tasks here
  },
  development: {
    prebuild: [],
    postbuild: []
  },
  production: {
    prebuild: [],
    postbuild: []
  }
}
```

Nucleum will call `initialize`, passing in `gulp`, along with the path and task configs. Use this method to define or `require` additional gulp tasks. You can specify when and in what order your custom tasks should run in the `production` and `development` `prebuild` and `postbuild` options.

For example, say you had a sprite task you wanted to run before your css compiled, and in production, you wanted to run an image compression task you had after all assets had been compiled. Your configuration might look something like this:

```js
additionalTasks: {
  initialize(gulp, TASK_CONFIG) {
    gulp.task("createPngSprite", function() {
      // do stuff
    })
    gulp.task("compressImages", function() {
      // compress all the things
    })
  },
  development: {
    prebuild: ["createPngSprite"],
    postbuild: []
  },
  production: {
    prebuild: ["createPngSprite"],
    postbuild: ["compressImages"]
  }
}
```

# FAQ

## Can I customize and add Gulp tasks?

Yep! See [additionalTasks](#additionaltasks).

You can also clone this repo, copy over the gulpfile.js folder and package.json dependencies and run `gulp` instead of installing it as a modules directly, or you could fork and maintain your own custom setup.

## I don't see JS files in my dest directory during development

JS files are compiled and live-update via BrowserSync + WebpackDevMiddleware + WebpackHotMiddleware. That means, that you won't actually see `.js` files output to your destination directory during development, but they will be available to your browser running on the BrowserSync port.

## What's under the hood?

Gulp tasks! Built combining the following:

| Feature               | Packages Used                                                     |
| --------------------- | ----------------------------------------------------------------- |
| **HTML**              | [Eleventy]                                                        |
| **CSS**               | [Sass], [PostCSS], [purgecss], [cssnano]                          |
| **JavaScript**        | [Babel], [babel-preset-env], [Webpack]                            |
| **Icons**             | Auto-generated SVG Sprites with [svgstore]                        |
| **Live Updating**     | [BrowserSync], [Webpack Dev Middleware], [Webpack Hot Middleware] |
| **Production Builds** | [Filename hashing], [Size Report]                                 |

Extras:

| Feature            | Packages Used                                                                        |
| ------------------ | ------------------------------------------------------------------------------------ |
| **WordPress**      | [Docker], [docker-compose], [WordPress quick start](./extras/wordpress/README-WP.md) |
| **Sass Libraries** | [Bourbon](http://bourbon.io/), [Adaptable](https://github.com/CosAnca/adaptable/)    |

[sass]: https://sass-lang.com
[libsass]: https://sass-lang.com/libsass
[node-sass]: https://github.com/sass/node-sass
[postcss]: https://github.com/postcss/postcss
[postcss-preset-env]: https://github.com/csstools/postcss-preset-env
[postcss-normalize]: https://github.com/csstools/postcss-normalize
[postcsssvg]: https://github.com/jonathantneal/postcss-svg
[purgecss]: https://github.com/FullHuman/purgecss
[cssnano]: https://github.com/cssnano/cssnano
[babel]: https://babeljs.io/
[babel-preset-env]: https://babeljs.io/docs/en/babel-preset-env
[webpack]: https://webpack.js.org/
[webpack dev middleware]: https://github.com/webpack/webpack-dev-middleware
[webpack hot middleware]: https://github.com/glenjamin/webpack-hot-middleware
[eleventy]: https://11ty.dev
[svgstore]: https://github.com/w0rm/gulp-svgstore
[browsersync]: https://www.browsersync.io/
[docker]: https://www.docker.com/products/docker-desktop
[docker-compose]: https://docs.docker.com/compose/install/#install-compose
[filename hashing]: https://github.com/sindresorhus/gulp-rev
[size report]: https://github.com/jaysalvat/gulp-sizereport
