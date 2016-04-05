/**
 * Created by kilaz on 4/5/2016.
 */
function ready() {
    console.log( 'DOM готов' );
    var button = document.getElementsByClassName("dlpdf");
    console.log(button);
    button[0].onclick = function(){
        var xhr = new XMLHttpRequest();

        xhr.open('GET', '/dlpdf', true);
        xhr.setRequestHeader("Content-type","text/plain");
        console.log('clicked client');
        xhr.onload = function() {
            console.log(this.responseText);
        }
    };
}

document.addEventListener("DOMContentLoaded", ready);