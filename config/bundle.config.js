/**
 * Created by Edward on 2/12/2016.
 */
module.exports = {
    bundle: {
        vendor: {
            scripts: ['./bower_components/jquery/dist/jquery.js','./bower_components/bootstrap-sass/javascripts/bootstrap.js','./bower_components/timecircles/inc/TimeCircles.js','./bower_components/vegas/vegas.js'],
            styles: ['./temp/vendor.css'],
            options: {
                useMin: false,
                minCSS: false,
                rev: false,
                pathPrefix: './vendor/'
            }
        }
    }
};