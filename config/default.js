
var config = {
    "ui": {
        "title": "Islamic Maps",
        "webpage": {
            "home": "",
            "register": "",
            "password": "",
        },
        "default": {
            "center": [39.773886, 23.080771], // Mecca Madina center long and lat
            "zoom": 5.5,
            "maxzoom": 21
        }
    },
    "S3": {
        "resourceUrl": "https://s3.eu-central-1.amazonaws.com/resources.islamicmaps.org",
        "language": {
            'en': 'en',
            'hi': 'hi',
            'tr': 'tr',
            'ar': 'ar',
            'ur': 'ur',
            'de': 'de',
            'fr': 'fr',
            'it': 'it',
            'es': 'es',
            'pt': 'pt',
            'id': 'id',
            'ja': 'ja',
            'ko': 'ko',
            'fa': 'fa',
            'ru': 'ru',
            'zh': 'zh'
        },
        "data": {
            "configText": "configText.json", // Codes taken from here - https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
            "searchPlaces": "searchPlaces.json",
            "themeTree": "themeTree.json"
        }
    },
    "mapbox": {
        "accessTokenKey": "pk.eyJ1IjoiemlhLW0iLCJhIjoiQjM5aVpfTSJ9.s_U7YxQCK-Zq5SaJemH5bA",
        "style": {
            // https://docs.mapbox.com/mapbox-gl-js/api/#Map#setStyle
            "light": "mapbox://styles/mapbox/light-v10",
            "dark": "mapbox://styles/mapbox/dark-v10",
            "streets": "mapbox://styles/mapbox/streets-v11",
            "outdoors":"mapbox://styles/mapbox/outdoors-v11",
            "satellite": "mapbox://styles/mapbox/satellite-v9",
            "satellitestreets": "mapbox://styles/mapbox/satellite-streets-v11"
        }
    },
    "miss": {
        "osmattribution": "© OpenMapTiles © OpenStreetMap contributors"
    }
}