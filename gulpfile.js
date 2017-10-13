"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var svgSprite = require("gulp-svg-sprite");

var config = {
  shape: {
    dimension		: {			// Set maximum dimensions

    },
    spacing: { // Add padding
      padding			: 20,						// Padding around all shapes
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

// var configdest = {
//   sprite: {
//     "kek.svg"
//   },
// };

gulp.task("sprite", function () {
  return gulp.src("img/*.svg")
  .pipe(svgSprite(config))
    .pipe(gulp.dest("img"));
});

gulp.task("spriteSymbol", function() {
  return gulp.src("img/*.svg")
    .pipe(svgSprite(configS))
    .pipe(gulp.dest("img"));
})

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
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
