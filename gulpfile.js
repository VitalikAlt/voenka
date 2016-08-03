var gulp  = require('gulp'),
    concat = require('gulp-concat'),
    mainBowerFiles = require('main-bower-files'),
    order = require('gulp-order'),
    filter = require('gulp-filter')
    exec = require('child_process').exec;

// Путь к собранным файлам
var buildPath = "clientApp/build";

// Компоненты bower
var vendorsJsFiles = mainBowerFiles({
  filter:'**/*.js',
    paths: {
        bowerDirectory: 'bower_components'
    }
});
var vendorsCssFiles = mainBowerFiles({
  filter:'**/*.css',
    paths: {
        bowerDirectory: 'bower_components'
    }
});

// Пути к пользовательским файлам
var diaryJsPath    = 'clientApp/diaryApp/**/*.js',
    diaryCssPath   = 'clientApp/diaryApp/styles.css',
    diaryFontsPath = 'clientApp/diaryApp/content/fonts/*';

gulp.task('vendors_js', function(){
  return gulp.src(vendorsJsFiles)
  .pipe(concat('vendors.js'))
  .pipe(gulp.dest(buildPath + '/js'));
});

gulp.task('vendors_css', function(){
  return gulp.src(vendorsCssFiles)
  .pipe(concat('vendors.css'))
  .pipe(gulp.dest(buildPath + '/css'));
});

gulp.task('diary_js', function(){
  return gulp.src(diaryJsPath)
  .pipe(order([
    "**/**.module.js",
    "**/*.js"
  ]))
  .pipe(concat('diary.js'))
  .pipe(gulp.dest(buildPath + '/js'));
});

gulp.task('diary_css', function(){
  return gulp.src(diaryCssPath)
  .pipe(concat('diary.css'))
  .pipe(gulp.dest(buildPath + '/css'));
});

gulp.task('diary_fonts', function(){
  return gulp.src(diaryFontsPath)
  .pipe(gulp.dest(buildPath + '/fonts'));
});

gulp.task('server', function (cb) {
  exec('node server.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('watch', function(){
  gulp.watch(vendorsJsFiles, ['vendors_js']);
  gulp.watch(vendorsCssFiles, ['vendors_css']);
  gulp.watch(diaryJsPath, ['diary_js']);
  gulp.watch(diaryCssPath, ['diary_css']);
});

// Выполняет сборку
gulp.task('build', ['vendors_js', 'vendors_css', 'diary_js', 'diary_css','diary_fonts']);

// Собирает проект, запускае сервер и отслеживает изменения
gulp.task('default', ['build', 'server', 'watch']);
gulp.task('serve', ['build', 'server', 'watch']);
// Альтернативный вызов для запуска сервера и отслеживания изменений (без предварительной сборки)
gulp.task('run', ['server', 'watch']);

