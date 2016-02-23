(function(){
    var gl;
    function start () {
        var canvas = document.getElementById('myCanvas');
        gl = initWebGL();
        if(gl) {
            gl.clearColor(0.0,0.0,0.0,1.0);

        }
    }
}());