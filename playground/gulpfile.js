const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const path = require('path');
const fs = require('fs');


gulp.task("scripts:server", () => {
    return gulp.src("./src-server/**/*.js")
        .pipe($.cached("server"))
        .pipe($.babel())
        .pipe(gulp.dest("./build"));
});

gulp.task("watch:scripts:server", gulp.series(
    "scripts:server",
    () => gulp.watch("./src-server/**/*.js", gulp.series("scripts:server")))
);

gulp.task("watch:scripts:client", () => {
    const files = fs.readdirSync("./src-client");
    for(var i = 0; i < files.length; i++) {
        const file = files[i];
        if(path.extname(file) !== ".js") {
            continue;
        }

        initBundlerWatch(path.join("src-client", file));
    }

    return gulp.watch("./src-client/**/*.js")
        .on("change", initBundlerWatch)
});

gulp.task("watch:scripts", gulp.parallel("watch:scripts:client", "watch:scripts:server"))

let bundlers = {};

function initBundlerWatch(file) {
    if(bundlers.hasOwnProperty(file)) {
        return;
    }

    const bundler = createBundler(file);
    bundler[file] = bundler;

    const watcher = watchify(bundler);
    const filename = path.basename(file);

    function bundle() {
        return bundler
            .bundle()
            .on("error", error => console.error(error))
            .pipe(source(filename))
            .pipe(gulp.dest("./public/build"));
    }

    watcher.on("update", bundle);
    watcher.on("time", time => console.log(`Build client in ${time}ms`));

    bundle();
}

function createBundler(file) {
    const bundler = browserify(file);   // browserify - imports all relevant modules
    bundler.transform(babelify);        // babelify - only converts es6 -> es5
    return bundler;
}