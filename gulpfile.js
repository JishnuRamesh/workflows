var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');

var coffeeSources = ['Components/coffee/*.coffee']
var jsSources = ['Components/scripts/rclick.js',
                  'Components/scripts/pixgrid.js',
                   'Components/scripts/tagline.js',
                 'Components/scripts/template.js'
                ]

gulp.task('coffee', function(){

    
   gulp.src(coffeeSources)
    .pipe(coffee({bare: true})
          .on('error', gutil.log))
            .pipe(gulp.dest('Components/scripts/'))
          

})



gulp.task('js', function (){
    
    
    gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(gulp.dest('Build/Development/js'))
    
})