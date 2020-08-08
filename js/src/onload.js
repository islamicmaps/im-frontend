// Set local storage
var imLang = localStorage.getItem('imLang')

var map // Map variable initialise
var configText, searchPlaces, themeTree

function onloadPage() {
    /**
     * Onload function for landing page
     */

    try {

        // Set default language
        if (imLang == null) {
            imLang = 'en'
            localStorage.setItem('imLang', 'en')
        } 

        // Set default properties
        document.title = config.ui.title
        document.getElementById('islamicmapWatermark').setAttribute('href', config.ui.webpage.home)

        // Load Config Text for change language modal
        var s3ConfigText = config.S3.resourceUrl + '/' + imLang + '/' + config.S3.data.configText
        // Load Search Places list
        var s3SearchPlaces = config.S3.resourceUrl + '/' + imLang + '/' + config.S3.data.searchPlaces
        // Load Theme Tree
        var s3ThemeTree = config.S3.resourceUrl + '/' + imLang + '/' + config.S3.data.themeTree

        axios.all([
            axios.get(s3ConfigText), 
            axios.get(s3SearchPlaces),
            axios.get(s3ThemeTree)
            ])
            .then(axios.spread((res1, res2, res3) => {
                configText = res1.data
                searchPlaces = res2.data
                themeTree = res3.data
            }))
            .then((r) => {
                // Set basemap
                map = setBasemap(imLang)

                // Set place search text box
                autocomplete(document.getElementById("searchPlaceComplete"));

                // Set language
                setLanguage(imLang)

                // Remove waiting page
                document.getElementById("waitingPage").style.visibility = 'hidden'; 

            })
            .catch((e) => {
                console.log(e)
                if (e.message == 'Network Error') {
                    // If server not running, move to server error page
                    window.location.href = '5xx.html';
                }
            })
        
    } catch (e) {
        console.log("Error - onloadPublic() -> ", e.message)
    } 

}

function onload5xx() {
    try {

        // Set default properties
        document.title = config.ui.title
        document.getElementById('islamicmapWatermark').setAttribute('href', config.ui.webpage.home)
        
    } catch (e) {
        console.log("Error - onload5xx() -> ", e.message)
    }
}