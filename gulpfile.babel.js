import gulp from "gulp";
import path from "path";
import rimraf from "rimraf";

const $ = require("gulp-load-plugins")();

gulp.task("hello", done => {
    console.log("Hello gulp");
    done();
})

gulp.task("server:clean", done => {
    rimraf("./build", done);
})

gulp.task("server:build", 
    gulp.series(
        "server:clean",
        buildServer
    )
);

function buildServer() {
    return gulp.src([
        "./src/server/**/*.js",
        "./src/server/**/*.ts"
    ])
    .pipe($.changed("./build", {extension: ".js"}))
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write(".", {sourceRoot: path.join(__dirname, "src", "server")}))
    .pipe(gulp.dest("./build"));
}