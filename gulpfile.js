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
 spacing: { // Add padding
 padding: 20
 }
 },
 mode: {
 css: { // Activate the «css» mode
 render: {
 css: true // Activate CSS output (with default options)
 }
 },
 symbol: true
 }
};


gulp.task("sprite", function () {
  return gulp.src("img/*.svg")
  .pipe(svgSprite(config))
  .pipe(gulp.dest("img"));
});

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
