var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var gulpif = require('gulp-if');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var jsonMinify = require('gulp-jsonminify');


var env, 
    coffeeSources, 
    jsSources, 
    sassSources,
    htmlSources, 
    jsonSources,
    outputDir,
    saasStyle;



 env = process.env.Node_ENV || 'development' ; 



if (env === 'development'){
    
    outputDir = 'Build/Development/';
    saasStyle = 'expanded';
    
}
else {
    
    outputDir = 'Build/Production/';
    saasStyle = 'compressed';
}





 coffeeSources = ['Components/coffee/*.coffee'];

 jsSources = ['Components/scripts/rclick.js',
                  'Components/scripts/pixgrid.js',
                   'Components/scripts/tagline.js',
                 'Components/scripts/template.js'
                ];

 sassSources = ['Components/sass/style.scss'];

 htmlSources = [outputDir + '*.html'];


jsonSources = [outputDir + 'js/*.json'];


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
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
    
});




gulp.task('compass', function() {
    
    gulp.src(sassSources)
        .pipe(compass({
        
            sass : 'Components/sass',
            image : outputDir +'images',
            style : saasStyle

        })
        .on('error', gutil.log))
        .pipe(gulp.dest( outputDir +'css'))
        .pipe(connect.reload())
    
    
})


//watch for changes in files
gulp.task('watch', function(){
    
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('Components/sass/*.scss', ['compass']);
    gulp.watch('Build/Development/*.html', ['html']);
    gulp.watch('Build/Development/js/*.json', ['json']);
    
    
});


gulp.task('connect', function(){
    
    connect.server({
        root : outputDir,
        livereload : true
    });
    
});


gulp.task('html', function(){
    
    gulp.src('Build/Development/*.html')
    .pipe(gulpif(env === 'production', minifyHtml()))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    .pipe(connect.reload());
    
});



gulp.task('json', function(){
   
    gulp.src('Build/Development/js/*.json')
        .pipe(gulpif(env === 'production', jsonMinify()))
        .pipe(gulpif(env === 'production', gulp.dest('Build/Production/js')))
        .pipe(connect.reload());
    
});


gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'connect', 'watch']);