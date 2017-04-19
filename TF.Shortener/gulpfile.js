/// <binding AfterBuild='scriptsNStyles, ts' Clean='clean' ProjectOpened='watch' />
var ts = require('gulp-typescript');
var gulp = require('gulp');
var clean = require('gulp-clean');

var destPath = './libs/';

// Delete the dist directory
gulp.task('clean', function () {
    return gulp.src([destPath])
        .pipe(clean());
});

gulp.task("scriptsNStyles", function () {
    gulp.src([
            'core-js/client/*.js',
            'systemjs/dist/*.js',
            'reflect-metadata/*.js',
            'rxjs/**',
            'zone.js/dist/*.js',
            '@angular/**/bundles/*.js',
            'bootstrap/dist/js/*.js',
            'ngx-clipboard/dist/bundles/*.js',
            'clipboard/dist/*.js'

        ], {
            cwd: "node_modules/**"
        })
        .pipe(gulp.dest("./libs"));
});

var tsProject = ts.createProject('tsScripts/tsconfig.json', {
    typescript: require('typescript')
});
gulp.task('ts', function (done) {
    //var tsResult = tsProject.src()
    var tsResult = gulp.src([
        "tsScripts/*.ts"
        ])
        .pipe(tsProject(), undefined, ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest('./Scripts'));
});
//gulp.task('comp',
//    function(done) {
//        gulp.src([
//                "tsScripts/*.html"
//            ])
//            .pipe(gulp.dest("./Components"));
//    });

//gulp.task('ts-clip', function (done) {
//    //var tsResult = tsProject.src()
//    var tsResult = gulp.src([
//            "node_modules/ts-clipboard/*.ts"
//        ])
//        .pipe(tsProject(), undefined, ts.reporter.fullReporter());
//    return tsResult.js.pipe(gulp.dest('./libs'));
//});

gulp.task('watch', ['watch.ts']);

gulp.task('watch.ts', ['ts'], function () {
    return gulp.watch('tsScripts/*.ts', ['ts']);
});

//gulp.task('watch.comp',
//    ['comp'],
//    function() {
//        return gulp.watch('tsScripts/*.html', ['comp']);
//    });

gulp.task('default', ['scriptsNStyles', 'watch']);