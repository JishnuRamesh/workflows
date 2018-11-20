var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var connect = require('gulp-connect');


var coffeeSources = ['Components/coffee/*.coffee'];

var jsSources = ['Components/scripts/rclick.js',
                  'Components/scripts/pixgrid.js',
                   'Components/scripts/tagline.js',
                 'Components/scripts/template.js'
                ];

var sassSources = ['Components/sass/style.scss'];

var htmlSources = ['Build/Development/*.html'];


gulp.task('coffee', function(){

    
   gulp.src(coffeeSources)
    .pipe(coffee({bare: true})
          .on('error', gutil.log))
            .pipe(gulp.dest('Components/scripts/'))
          

});



gulp.task('js', function (){
    
    
    gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest('Build/Development/js'))
    .pipe(connect.reload())
    
});




gulp.task('compass', function() {
    
    gulp.src(sassSources)
        .pipe(compass({
        
            sass : 'Components/sass',
            image : 'Build/Development/images',
            style : 'expanded'

        })
        .on('error', gutil.log))
        .pipe(gulp.dest('Build/Development/css'))
        .pipe(connect.reload())
    
    
})


//watch for changes in files
gulp.task('watch', function(){
    
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('Components/sass/*.scss', ['compass']);
    gulp.watch(htmlSources, ['html']);
    gulp.watch('Build/Development/js/*.json', ['json']);
    
    
});


gulp.task('connect', function(){
    
    connect.server({
        root : 'Build/Development',
        livereload : true
    });
    
});


gulp.task('html', function(){
    
    gulp.src(htmlSources)
    .pipe(connect.reload());
    
});



gulp.task('json', function(){
   
    gulp.src('Build/Development/js/*.json')
        .pipe(connect.reload());
    
});


gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'connect', 'watch']);