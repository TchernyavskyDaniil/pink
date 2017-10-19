"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var svgSprite = require("gulp-svg-sprite");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var run = require("run-sequence");
var del = require("del");
var uglify = require('gulp-uglify');
var pump = require('pump');
var htmlmin = require('gulp-htmlmin');


//config build

gulp.task("build", function (done) {
  run("clean", "sprite", "spriteSymbol", "style", "compress", "images", "webp", "html", "minify", "copy", done);
});

//end config build

//config min js uglify

gulp.task("compress", function (cb) {
  pump([
      gulp.src("js/*.js"),
      uglify(),
      gulp.dest("build/js")
    ],
    cb
  );
});

//end config min js

//config min html

gulp.task('minify', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
});

//end config min html

//sprite config

var config = {
  shape: {
    dimension		: {

    },
    spacing: {
      padding			: 20,
      box				: 'content'
    }
  },
  mode: {
    view: { // Activate the «css» mode
      bust: false,
      sprite: "../sprite/sprite.svg"
    },
  },
};

var configS = {
  shape: {
    spacing: {
      padding: 0
    }
  },
  mode: {
    symbol: {
      sprite: "../../img/sprite/sprite-symbols.svg"
    }
  },
};

gulp.task("sprite", function () {
  return gulp.src("img/*.svg")
  .pipe(svgSprite(config))
    .pipe(gulp.dest("build/img"));

});

gulp.task("spriteSymbol", function() {
  return gulp.src("img/*.svg")
    .pipe(svgSprite(configS))
    .pipe(gulp.dest("build/img"));
});

//end sprite config

//config style (+ css min)

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))

    .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html", ["html"]);
});

//config image min

gulp.task("images", function () {
  return gulp.src("img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

//end config image min

//config webp

gulp.task("webp", function () {
  return gulp.src("img/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

//end config webp

//config post html

gulp.task("html", function () {
  return gulp.src("*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

//end config post hmtl

//copy in build

gulp.task("copy", function () {
  return gulp.src([
    "fonts/*.{woff,woff2}"], {
    base: "."
  })
    .pipe(gulp.dest("build"));
});

//end copy

//config del

gulp.task("clean", function () {
  return del("build");
});

//end config del
