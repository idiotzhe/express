var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var browserSync = require("browser-sync");

const server = browserSync.create();


function serve(done) {
    server.init(null, {
        proxy: "localhost:3000",
        open: false,
        files: ["public/**/*.*","views/**/*.*"],
        port: 7000,
    });
    done();
}


function nodeDev(done) {
    var stream = nodemon({
        script: "server.js",
        ignore: ["gulpfile.js", "node_modules/**", "public/**"],
        ext: "js css html",
        env: { NODE_ENV: "development" },
        done: done,
    });
    stream
        .on("restart", function () {
            console.log("restarted!");
            server.reload();
        })
        .on("crash", function () {
            console.error("Application has crashed!\n");
            stream.emit("restart", 10); // restart the server in 10 seconds
        });
}

const dev = gulp.series(serve, nodeDev);
exports.default = dev;