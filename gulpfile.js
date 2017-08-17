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

     
//Bootstrap scss source
var bootstrapSass = {
        in: './node_modules/bootstrap-sass/'
};

var fonts = {
        in: ['src/fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
        out: 'dist/fonts/'
};
 
// Our scss source folder: .scss files
var scss = {
    in: 'src/scss/style.scss',
    out: 'dist/',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
         includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};

var jsBootstrap = {
    in: 'src/js/main.js',
    out: '/dist',
    jsOpts :{
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/javascripts'],
    }
}


    gulp.task('default', ['html', 'sass', 'js', 'materialDesign'], function(){
        browserSync.init({proxy : 'http://127.0.0.1:3100/'});
        gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"])    
        gulp.watch(["src/*.html", "src/**/*.html"], ['html']);  
        gulp.watch(["src/js/*.js", "src/js/**/*.js" ], ["js"])
        gulp.watch(["src/**/*.html"], ["materialDesign"]);
})


    //Compila el archvivo SASS  -> [] Ejecuta esta primero
    gulp.task('sass', ['fonts'], function(){
         gulp.src('src/scss/main.scss')
        .pipe(sass(scss.sassOpts))
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
        .pipe(tap(function(file) { //tap nos permite ejecutar una funcion por cada fichero relacionado en gulp.src
            //reemplazamos el contenido del fichero (main.js) por lo que nos devuelve browserify pasandole el fichero
            file.contents = browserify(file.path, {debug: true}) //creamos una instancia de browserify en base al archivo
                            .transform('babelify', {presets : ["es2015"]}) //traduce el codigo de ES6 -> ES5
                            .bundle() //Compilamos  el archivo
                            .on("error", function(error){
                                return notify().write(error);
                            })

        }))
        .pipe(buffer())                 //Se pasa a buffer para que pueda ejecutarse el sigueinte pipe 
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())                 //Se minifica el JS
        .pipe(sourcemaps.write('./'))   //y los guarda en el mismo directorio que el archivo fuente
        .pipe(gulp.dest("dist/")) 
        .pipe(browserSync.stream()) 
        .pipe(notify("JS compilado"));

    })



    

    gulp.task('materialDesign', function(){
        gulp.src(['node_modules/material-design-lite/material.min.css', 'node_modules/material-design-lite/material.min.js'])
        .pipe(gulp.dest("dist/"));
    })

    
    // copy bootstrap required fonts to dest
    gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
    });

