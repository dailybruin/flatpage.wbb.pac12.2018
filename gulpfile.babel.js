import gulp from 'gulp';
import fs from 'fs';
// HTML
import nunjucksRender from 'gulp-nunjucks-render';
import data from 'gulp-data';
// HTML
// import htmlmin from 'gulp-htmlmin';

// Styling related packages
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import minifyCSS from 'gulp-csso';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';

// Browsersync
import bs from 'browser-sync';
const browserSync = bs.create();

gulp.task('styles', () =>
  gulp
    .src('./src/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded',
      }).on('error', sass.logError)
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dev/css'))
    .pipe(browserSync.stream())
);

gulp.task('html', () =>
  gulp
    .src('src/*.{njk,html}')
    .pipe(
      data(file => {
        return JSON.parse(fs.readFileSync('./src/data.json'));
      })
    )
    .pipe(
      nunjucksRender({
        path: ['src/'],
      })
    )
    .pipe(gulp.dest('dev/'))
);

gulp.task('images', () => {
  gulp.src('src/images/*').pipe(gulp.dest('dev/img'));
});

gulp.task('scripts', () => {
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dev/js'))
});

gulp.task('development', ['html', 'styles', 'images', 'scripts'], () => {
  browserSync.init({
    server: {
      baseDir: './dev',
      serveStaticOptions: {
        extensions: ['html'],
      },
    },
  });

  gulp.watch('src/**/*.{njk,html,json}', ['html']).on('change', browserSync.reload);
  gulp.watch('src/**/*.scss', ['styles']);
  gulp.watch('src/**/*.js', ['scripts']);
});

gulp.task('clean', () => del(['dev/', 'prod/']));
gulp.task('default', ['development']);
gulp.task('build', ['production']);
