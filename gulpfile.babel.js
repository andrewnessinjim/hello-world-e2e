import gulp from "gulp";
import path from "path";
import rimraf from "rimraf";
import chalk from "chalk";

import { webpack } from "webpack";
import webpackDevConfig from "./webpack.config.dev";
import webpackProdConfig from "./webpack.config.prod";

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
        gulp.parallel(
            buildServer,
            copyStaticServerAssets
        )
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

function copyStaticServerAssets(){
    return gulp.src("./src/server/schema.graphql")
        .pipe($.changed("./build"))
        .pipe(gulp.dest("./build"));
}

function watchServer(){
    return gulp.watch([
        "./src/server/**/*.js",
        "./src/server/**/*.ts",
        "./src/server/schema.graphql"
    ], gulp.parallel(
        copyStaticServerAssets,
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

gulp.task("client:build", buildClient);
gulp.task("client:dev", watchClient);

const consoleStats = {
    colors: true,
    exclude: ["node_modules"],
    chunks: false,
    assets: false,
    timings: true,
    modules: false,
    hash: false,
    version: false
}

function buildClient(done){
    let webpackConfig;
    if(process.env.NODE_ENV === "production") {
        console.log(chalk.bgRed.white("Using webpack PRODUCTION config"));
		webpackConfig = webpackProdConfig;
	} else {
		console.log(chalk.bgRed.white("Using webpack DEVELOPMENT config"));
		webpackConfig = webpackDevConfig;
	}

    webpack(webpackConfig, (err, stats) => {
		if(err) {
			done(err);
			return;
		}

		console.log(stats.toString(consoleStats));
		done();
	});
}

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
gulp.task("build", gulp.parallel("server:build", "client:build"));
gulp.task("test", function runJestTests(){
    return gulp.src("src/server/__tests__").pipe($.jest.default());
});