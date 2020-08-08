function setBasemap(imLang) {
    try {

        /**
         * Set basemap
         */

        mapboxgl.accessToken = config.mapbox.accessTokenKey

        var style = config.mapbox.style.light
        var zoom = config.ui.default.zoom
        var center = config.ui.default.center
        var maxZoom = config.ui.default.maxzoom

        var map = new mapboxgl.Map({
            container: 'map',
            style: style,
            zoom: zoom,
            center: center,
            maxZoom: maxZoom
        });

        map.addControl(new mapboxgl.NavigationControl(), 'top-right')

        map.on('style.load', function() {
            langBasemap(imLang)
        })

        var divMap = document.getElementById('map');
        divMap.addEventListener("click", function(e) {
            try {
                if (searchInputCounter > 0) {
                    closeAllLists()
                    searchInputCounter = 0
                }
            } catch (e) {
                console.log("Error - addEventListener - click -> ", e.message)
            }
        })
        
        return map
        
    } catch (e) {
        console.log("Error - setBasemap() -> ", e.message)
    }
}

function switchBasemap(layer) {
    try {

        /**
         * Check if user didnt click an already clicked basemap
         */
        var ul = document.getElementById("basemapDropdownUl");
        var items = ul.getElementsByTagName("li");
        for (var i = 0; i < items.length; ++i) {
            if (items[i].className == 'disabled' && items[i].id == layer) {
                return
            }
        }

        /**
         * Handle change basemap
         */
        var ul = document.getElementById("basemapDropdownUl");
        var items = ul.getElementsByTagName("li");
        for (var i = 0; i < items.length; ++i) {
            if (items[i].className == 'disabled') {
                $("#"+items[i].id).removeClass('disabled');
                $("#"+items[i].id).css({'background-color': '#FFFFFF'});
                // $("#"+items[i].id).re
            }
        }

        var layerSource
        switch (layer) {
            case 'light':
                layerSource = config.mapbox.style.light
                break
            case 'dark':
                layerSource = config.mapbox.style.dark
                break
            case 'streets':
                layerSource = config.mapbox.style.streets
                break
            case 'outdoors':
                layerSource = config.mapbox.style.outdoors
                break
            case 'satellite':
                layerSource = config.mapbox.style.satellite
                break
            case 'satellite-streets':
                layerSource = config.mapbox.style.satellitestreets
        }
        map.setStyle(layerSource);
        $("#"+layer).addClass('disabled');
        $("#"+layer).css({'background-color': '#f0f0f0'});
        
    } catch (e) {
        console.log("Error - switchBasemap() -> ", e.message)
    }
}

function flyToPoint(coord) {
    try {

        var coord = JSON.parse(coord)

        switch (coord[2]) {
            case 1:
                var zoom = 5.5
                break
            case 2:
                var zoom = 8
                break
            case 3:
                var zoom = 11
                break
            case 4:
                var zoom = 12
                break
            case 5:
                var zoom = 13
        }

        map.flyTo({
            center: [
                coord[0],
                coord[1]
            ],
            zoom: zoom,
            bearing: 0,
            speed: 5, // make the flying slow
            curve: 1, // change the speed at which it zooms out
            easing: function(t) {
                return t;
                },
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
        
    } catch (e) {
        console.log("Error - flyToPoint() -> ", e.message)
    }
}