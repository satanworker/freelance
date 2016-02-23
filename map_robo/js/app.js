/**
 * Created by dpetrov on 07.12.2015.
 */
function initMarkers() {
    var map;
// Sets the map on all markers in the array.
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

// Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
    }
    var mapArray = [];
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'data.json',
        success: mapObject
    })
        .fail(function(){
            alert('fail');
        });
    function mapObject(data) {
        mapArray = data.Items;
        var markers = [];
        var myLatLng = {lat: 55.75583, lng: 37.61730};
        //var myLatLng = data.Items[0].geo;
         map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: myLatLng
        });
        var i = 1;
        for(i; i < data.Items.length; i++) {
            if(i%12 == 0 ) {
                var marker = new google.maps.Marker({
                    position: {lat: data.Items[i].geo.Latitude, lng: data.Items[i].geo.Longitude},
                    map: map
                });
                markers.push(marker);
            }
            function setMapOnAll(map) {
                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(map);
                }
            }
            function clearMarkers() {
                setMapOnAll(null);
            }
        }
        setTimeout(function () {
            for(var l =0; l < markers.length; l++) {
                clearMarkers();
            }
            console.log(markers);
        }, 2000);
    }
};
$(document).ready(function(){
    initMarkers();
});