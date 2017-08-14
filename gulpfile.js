var gulp = require("gulp"),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    notify = require('gulp-notify'),
    gulpImport = require('gulp-html-import'),
    tap = require('gulp-tap'),
    browserify = require('browserify'),
    buffer = require ('gulp-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require ('gulp-uglify'),
    postcss = require ('gulp-postcss'),
    autoprefixer = require ('autoprefixer'),
    cssnano = require('cssnano');

    //Tarea de  gulp por defecto     
    gulp.task('default', ['sass', 'html', 'js'], function(){
        browserSync.init({proxy : 'http://127.0.0.1:3100/'});


        gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"]);
      
        gulp.watch(["src/*.html", "src/**/*.html"], ['html']); 

           
        gulp.watch(["src/js/*.js", "src/js/**/*.js" ], ["js"])
})


//Compila el archvivo SASS
gulp.task('sass', function(){
        gulp.src('src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', function (error){
            return notify().write(error);
        }))
        .pipe(postcss([
            autoprefixer(),//Transforma el CSS dandole compatibilidad a versiones antiguas
            cssnano()
        ]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream())     //rearga el csss del navegador
        .pipe(notify('SASS compilado')) 
    })

    //Copia e importa el archivo HTML
    gulp.task('html', function(){
        gulp.src('src/*.html')
        .pipe(gulpImport('src/components/'))
        .pipe(gulp.dest('dist/'))       
        .pipe(browserSync.stream())
        .pipe(notify('HTML importado'))
    })

    //Compila y genera un sólo archivo JS
    gulp.task('js', function (){
        gulp.src('src/js/main.js')
        // .pipe(tap(function (file){
        //     file.contents = browserify(file.path, {debug: true})
        //                    // .transform('babelify', {presets: ['es:2015']})
        //                     .bundle()     //Se compila el archivo
        //                     .on('error', function(error){
        //                         return notify().write(error);
        //                     })
        // }))
        .pipe(buffer())                 //Se pasa a buffer para que pueda ejecutarse el sigueinte pipe
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())                 //Se minifica el JS
        .pipe(sourcemaps.write('./'))   //y los guarda en el mismo directorio que el archivo fuente
        .pipe(gulp.dest("dist/")) 
        .pipe(browserSync.stream()) 
        .pipe(notify("JS compilado"));

    })

