var gyms = [
    {
        place : 'GoldStone Fitness',
        desc : '',
        lat : 52.233226,
        long : -7.146934
    },
    {
        place : 'Kingfisher Fitness',
        desc : '',
        lat : 52.243669,
        long : -7.121648
    },
    {
        place : 'crystal sports and leisure waterford',
        desc : '',
        lat : 52.24329,
        long : -7.150439
    },
    {
        place : 'ben dunne gym waterford',
        desc : '',
        lat : 52.241282,
        long : -7.127282
    }
];


var mapApp = angular.module('mapsController', ['gymServices']);
mapApp.controller('mapsController', function ($scope, Gym) {
    var app = this;

    //Initializing the map and adding the default coords of WIT college
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(52.245878,-7.138828),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (info){

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.location.latitude, info.location.longitude),
            title: info.name
        });
        marker.content =
            '<div class="infoWindowContent">' +
            '<strong>Monthly Price: </strong>€'+ info.monthlyPrice + '<br />' +
            '<strong>3 Months: </strong>€'+info.threeMonthPrice + '<br />' +
            '<strong>Yearly Price: </strong>€'+info.yearPrice + '<br />' +
            info.location.latitude + ' East ,' +
            info.location.longitude +  ' North , ' +
            '</div>';

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h4>' + marker.title + '</h4>' +
                marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

    };
    // loops through all the cities in the cities object
    Gym.getGymCoords().then(function (data) {
        for (i = 0; i < data.data.length; i++){
            createMarker(data.data[i]);
        }
    });
    // for (i = 0; i < cities.length; i++){
    //     createMarker(cities[i]);
    // }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});