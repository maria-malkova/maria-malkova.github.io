const  gulp = require('gulp');
const  del = require('del');
const  autoprefixer = require('gulp-autoprefixer');
const  browserSync = require('browser-sync');
const  sass = require('gulp-sass')(require('sass'));
const  pug = require('gulp-pug');
const  concat = require("gulp-concat");
const  rename = require("gulp-rename");
const  imagemin = require('gulp-imagemin');
const imgCompress = require('imagemin-jpeg-recompress');
const  plumber = require('gulp-plumber');
const  cleanCss = require('gulp-clean-css');
const  sourcemaps = require('gulp-sourcemaps');
const  uglify = require('gulp-uglify');
const pump = require('pump');

var paths = {
  dirs: {
    build: './build'
  },
  html: {
    src: './src/pages/*.pug',
    dest: './build',
    watch: ['./src/pages/*.pug', './src/templates/*.pug', './src/blocks/**/*.pug']
  },
  css: {
    src: './src/styles/style.scss',
    dest: './build/css',
    watch: ['./src/blocks/**/*.scss', './src/styles/**/*.scss', './src/styles/*.scss']
  },
  js: {
    src: ['./src/plugins/*.js', './src/blocks/**/*.js'],
    dest: './build/js',
    watch: './src/blocks/**/*.js',
    watchPlugins: './src/scripts/plugins/*.js'
  },
  images: {
    src: './src/blocks/**/img/*',
    dest: './build/img',
    watch: ['./src/blocks/**/img/*']
  },
  fonts: {
    src: './src/fonts/*',
    dest: './build/fonts',
    watch: './src/fonts/*'
  }
};

gulp.task('clean', function () {
  return del(paths.dirs.build);
});

gulp.task('templates', function () {
  return gulp.src(paths.html.src)
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.html.dest))
	.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('styles', function () {
  return gulp.src(paths.css.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 20 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css.dest))
	.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('scripts', function () {
  return gulp.src(paths.js.src)
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(paths.js.dest));
});

gulp.task('images', function () {
  return gulp.src(paths.images.src)
    .pipe(plumber())
    .pipe(imagemin([
      imgCompress({
        loops: 4,
        min: 70,
        max: 80,
        quality: 'high'
      }),
      imagemin.gifsicle(),
      imagemin.optipng(),
    ]))
    .pipe(rename({
      dirname: ''
    }))
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task('fonts', function () {
  return gulp.src(paths.fonts.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.fonts.dest))
	.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: './build/'
    },
  });
  gulp.watch(paths.html.watch, gulp.parallel('templates'));
  gulp.watch(paths.css.watch, gulp.parallel('styles'));
  gulp.watch(paths.js.watch, gulp.parallel('scripts'));
  gulp.watch(paths.js.watchPlugins, gulp.parallel('scripts'));
  gulp.watch(paths.images.watch, gulp.parallel('images'));
  gulp.watch(paths.fonts.watch, gulp.parallel('fonts'));
});

gulp.task('build', gulp.series(
      'clean',
      'templates',
      'styles',
      'scripts',
      'images',
      'fonts'
));

gulp.task('dev', gulp.series(
  'build', 'server'
));

gulp.task('css:minify', function () {
  return gulp.src(paths.css.dest + '/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest(paths.css.dest));
})

gulp.task('js:minify', function (cb) {
  pump([
      gulp.src(paths.js.dest + '/*.js'),
      uglify(),
      gulp.dest(paths.js.dest)
    ],
  cb
  );
})


gulp.task('prod', gulp.series(
  'build','css:minify','js:minify'
))
