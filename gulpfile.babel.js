import gulp from "gulp";
import path from "path";
import rimraf from "rimraf";
import chalk from "chalk";

import { webpack } from "webpack";
import webpackDevConfig from "./webpack.config.dev";

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

gulp.task("server:dev",
    gulp.series(
        "server:build",
        gulp.parallel(
            watchServer,
            runServer
        )
));

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

function watchServer(){
    return gulp.watch([
        "./src/server/**/*.js",
        "./src/server/**/*.ts",
    ], gulp.parallel(
        buildServer
    ));
}

function runServer() {
    return $.nodemon({
        script: "./run.js",
        watch: "./build",
        ignore: ["**/tests"],
        nodeArgs: ["--inspect=0.0.0.0:9229"]
    })
}

gulp.task("client:dev", watchClient);

function watchClient() {
    const WebpackDevServer = require("webpack-dev-server");
    const compiler =  webpack(webpackDevConfig);
    const server = new WebpackDevServer({
        headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		}
    }, compiler);

    server.start(8080, () => {});
}

gulp.task("dev", gulp.parallel("server:dev", "client:dev"));