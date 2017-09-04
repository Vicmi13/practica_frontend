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
    cssnano = require('cssnano'),
    boostrapConfig = require('gulp-bootstrap-configurator');

     
//Bootstrap scss source
var bootstrapSass = {
        in: './node_modules/bootstrap-sass/'
};

var bootstrapModule ={
    fontsIn: ['src/fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
    fontsOut: 'dist/fonts/',
    jsIn : [bootstrapSass.in] + 'assets/javascripts/bootstrap.min.js',
    jsOut: 'dist/bootstrap3/'
}


 
// Our scss source folder: .scss files
var scss = {
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


    gulp.task('default', ['html', 'sass', 'js', 'make-bootstrap-js', 'images', 'materialDesign'], function(){
        browserSync.init({proxy : 'http://127.0.0.1:3100/'});
        gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"]);    
        gulp.watch(["src/*.html", "src/**/*.html"], ['html']);  
        gulp.watch(["src/js/*.js", "src/js/**/*.js" ], ["js"]);
        gulp.watch(["src/**/*.html"], ["materialDesign"]);
    })



    //Copia e importa el archivo HTML
    gulp.task('html', function(){
        gulp.src('src/*.html')
        .pipe(gulpImport('src/components/'))
        .pipe(gulp.dest('dist/'))       
        .pipe(browserSync.stream())
        .pipe(notify('HTML importado'))
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
   

    //compilar y generar un único JS
    gulp.task('js', function(){
        gulp.src('src/js/main.js')
            .pipe(tap(function(file) { 
                file.contents = browserify(file.path, {debug: true}) //creamos una instancia de browserify en base al archivo
                                .transform('babelify', {presets : ["es2015"]}) //traduce el codigo de ES6 -> ES5
                                .bundle() //Compilamos  el archivo
                                .on("error", function(error){
                                    return notify().write(error);
                                })

            }))
            .pipe(buffer()) //convertimos a buffer para que funcione el sigueinte pipe
            .pipe(sourcemaps.init({loadMaps: true})) //captura los source maps del fichero de origen
            .pipe(uglify()) //Minificamos el JS
            .pipe(sourcemaps.write('./')) //y los guarda en el mismo directorio que el archivo fuente
            .pipe(gulp.dest("dist/")) //lo guardamos en la carpeta dist
            .pipe(browserSync.stream()) //recargamos el navegador
            .pipe(notify("JS compilado"));
    })


    

    gulp.task('materialDesign', function(){
        gulp.src(['node_modules/material-design-lite/material.min.css', 'node_modules/material-design-lite/material.min.js'])
        .pipe(gulp.dest("dist/bootstrap/mdl/"))
    })

    
    // Copia fonts de Boostrap a dist/fonts
    gulp.task('fonts', function () {
        gulp.src(bootstrapModule.fontsIn)
        .pipe(gulp.dest(bootstrapModule.fontsOut))
    });

    //Copia JS files de boostrap a dist/js
    gulp.task('jsBootstrap', function(){
        gulp.src(bootstrapModule.jsIn)
        .pipe(gulp.dest(bootstrapModule.jsOut))
    })

    // For JS 
    gulp.task('make-bootstrap-js', function(){
    return gulp.src(bootstrapModule.jsIn)
        .pipe(gulp.dest("dist/bootstrap"))
    })

    //images
    gulp.task('images', function(){
        gulp.src(['src/imgs/*.jpg', 'src/imgs/*.jpeg', 'src/imgs/*.png'])
        .pipe(gulp.dest('dist/imgs'))
        .pipe(browserSync.stream())
    })
    
