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
    .pipe(gulp.dest("img"));

});

gulp.task("spriteSymbol", function() {
  return gulp.src("img/*.svg")
    .pipe(svgSprite(configS))
    .pipe(gulp.dest("img"));
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
    .pipe(gulp.dest("css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("css"))

    .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});

//config image min

gulp.task("images", function () {
  return gulp.src("img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("img/min"));
});

//end config image min

//config webp

gulp.task("webp", function () {
  return gulp.src("img/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("img/webp"));
});

//end config webp

//config post html

gulp.task("html", function () {
  return gulp.src("*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("."));
});
