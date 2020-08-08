/**
 * Filter Places
 */
function filterPlacesItems(str) {
    try {

        str = str.toLowerCase()

        var filterItems = []
        for (let i=0; i<searchPlaces.length; i++) {
            var mainStr = searchPlaces[i]['p'].toLowerCase()
            if (mainStr.startsWith(str)) {
                var item = {
                    'p': searchPlaces[i]['p'],
                    'c': searchPlaces[i].c,
                    'd': searchPlaces[i].d,
                    'z': searchPlaces[i].z
                }
                filterItems.push(item)
            }
        }

        filterItems = _.uniq(filterItems, filterItems => filterItems.p)
        filterItems = filterItems.slice(0, 5)

        return filterItems

    } catch (e) {
        console.log("Error - filterPlacesItems() -> ", e.message)
    }
}

/**
 * Place search text box module
 */
var searchInputCounter = 0
function autocomplete(inp) {
    try {

        /* The autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        /* Execute a function when someone writes in the text field:*/

        inp.addEventListener("input", function(e) {

            searchInputCounter += 1

            var a, b, i, val = this.value;
            
            /* Close any already open lists of autocompleted values*/
            if (!val) { return false;}
            currentFocus = -1;

            /* Create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", searchInputCounter + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");

            /* Append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);

            /**
             * Search item
             */
            var filterPlaces = filterPlacesItems(val)
            
            var arr = filterPlaces

            for (i = 0; i < arr.length; i++) {

                /* Check if the item starts with the same letters as the text field value:*/
                /* Create a DIV element for each matching element:*/
                b = document.createElement("DIV");

                switch (imLang) {
                    case 'en':
                        b.style.textAlign = "left"
                        break
                    case 'hi':
                        b.style.textAlign = "left"
                        break
                    case 'tr':
                        b.style.textAlign = "left"
                        break
                    case 'ar':
                        b.style.textAlign = "right"
                        break
                    case 'ur':
                        b.style.textAlign = "right"
                        break
                    case 'de':
                        b.style.textAlign = "left"
                        break
                    case 'fr':
                        b.style.textAlign = "left"
                        break
                    case 'it':
                        b.style.textAlign = "left"
                        break
                    case 'es':
                        b.style.textAlign = "left"
                        break
                    case 'pt':
                        b.style.textAlign = "left"
                        break
                    case 'id':
                        b.style.textAlign = "left"
                        break
                    case 'ja':
                        b.style.textAlign = "left"
                        break
                    case 'ko':
                        b.style.textAlign = "left"
                        break
                    case 'fa':
                        b.style.textAlign = "right"
                        break
                    case 'ru':
                        b.style.textAlign = "left"
                        break
                }

                /* Make the matching letters bold:*/
                b.innerHTML += "<strong><font color=\"black\" size=\"2\">" + arr[i].p.substring(0, val.length) + "</font></strong>";

                var firstCommaIndex = arr[i].p.split(/,(.+)/)[0].length
                b.innerHTML += "<font color=\"black\" size=\"2\">" + arr[i].p.substring(val.length, firstCommaIndex) + "</font>"

                b.innerHTML += "<font color=\"grey\" size=\"2\">" + arr[i].p.substring(firstCommaIndex, 38) + "</font>"
                if (arr[i].p.length > 38) {
                    b.innerHTML += "<font color=\"grey\" size=\"2\">" + '...' + "</font>"
                }

                /* Insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' placeholder='[" + arr[i].c + "," + arr[i].d + "]' value='" + arr[i].p + "'>";

                /* Execute a function when someone clicks on the item value (DIV element):*/

                b.addEventListener("click", function(e) {

                    /* Insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;

                    // Fly to the point
                    flyToPoint(this.getElementsByTagName("input")[0].placeholder)

                    /* Close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();

                });

                a.appendChild(b);
            }

        });

        /* Execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {

            var x = document.getElementById(searchInputCounter + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {

            /* If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;

            /* And and make the current item more visible:*/
            addActive(x);

            } else if (e.keyCode == 38) {

            /* If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;

            /* And and make the current item more visible:*/
            addActive(x);

            } else if (e.keyCode == 13) {

            /* If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();

            if (currentFocus > -1) {

                /* And simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();

            }
            }
        });

        function addActive(x) {
            try {

                /* A function to classify an item as "active":*/
                if (!x) return false;
                
                /* Start by removing the "active" class on all items:*/
                removeActive(x);

                if (currentFocus >= x.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = (x.length - 1);

                /* Add class "autocomplete-active":*/
                x[currentFocus].classList.add("autocomplete-active");
                
            } catch (e) {
                console.log("Error - addActive() -> ", e.message)
            }
        }

        function removeActive(x) {
            try {

                /* A function to remove the "active" class from all autocomplete items:*/
                for (var i = 0; i < x.length; i++) {
                    x[i].classList.remove("autocomplete-active");
                }
                
            } catch (e) {
                console.log("Error - removeActive() -> ", e.message)
            }
        }
        
    } catch (e) {
        console.log("Error - autocomplete() -> ", e.message)
    }
}

function closeAllLists() {
    try {
        $('.autocomplete-items').remove()
    } catch (e) {
        console.log("Error - closeAllLists() -> ", e.message)
    }
}