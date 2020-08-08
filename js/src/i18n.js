function langTable(lang) {
    try {
        var allLang = [
            {
                'code': 'en',
                'lang': 'English'
            },
            {
                'code': 'de',
                'lang': 'Deutsch'
            },
            {
                'code': 'es',
                'lang': 'Española'
            },
            {
                'code': 'fr',
                'lang': 'Française'
            },
            {
                'code': 'id',
                'lang': 'Indonesia'
            },
            {
                'code': 'it',
                'lang': 'Italiana'
            },
            {
                'code': 'pt',
                'lang': 'Portugues'
            },
            {
                'code': 'tr',
                'lang': 'Türkçe'
            },
            {
                'code': 'hi',
                'lang': 'हिन्दी'
            },   
            {
                'code': 'ar',
                'lang': 'عربى'
            },
            {
                'code': 'ur',
                'lang': 'اردو'
            },
            {
                'code': 'fa',
                'lang': 'فارسی'
            },  
            {
                'code': 'ru',
                'lang': 'русский'
            },  
            {
                'code': 'zh',
                'lang': '中文'
            },
            {
                'code': 'ja',
                'lang': '日本人'
            },
            {
                'code': 'ko',
                'lang': '한국어'
            }
        ]
        allLang = allLang.filter(function(o) { return o.code !== lang; })

        function tblCreateRow(tblRow) {
            var remainingCell = 5 - tblRow.length
            var row = '<tr>'
            for (let i=0; i<tblRow.length; i++) {
                row += '<td><a onclick="langClick(\'' + tblRow[i].code + '\')" style="cursor: pointer;">' + tblRow[i].lang + '</a></td>'
            }
            for (let i=0; i<remainingCell; i++) {
                row += '<td></td>'
            }
            row += '<tr>'
            return row
        }
        var table = '<table>'
        var tblRow = []
        var counter = 0
        for (let i=0; i<allLang.length; i++) {
            if (counter == 5) {
                let row = tblCreateRow(tblRow)
                table += row
                tblRow = []
                counter = 0
            }
            tblRow.push(allLang[i])
            counter++
        }
        if (tblRow.length > 0) {
            let row = tblCreateRow(tblRow)
            table += row
        }
        table += '</table>'

        document.getElementById("langTable").innerHTML = table
        
    } catch (e) {
        console.log("Error - languageModal() -> ", e.message)
    }
}

function langBasemap(lang) {
    try {
        // Few language support is not yet available in MB
        if (lang == 'id' || lang == 'tr' || lang == 'hi' || lang == 'ur' || lang == 'fa' || lang == 'zh') {
            lang = 'en'
        }

        var layers = map.getStyle().layers
        var check = _.some(layers, function( el ) {
            return el.id == 'country-label';
        });

        if (check == true) {
            map.setLayoutProperty('country-label', 'text-field', [
                'get',
                'name_' + lang
                ]);
        }  

    } catch (e) {
        console.log("Error - langBasemap() -> ", e.message)
    }
}

function setLanguage(lang) {
    try {
    
        switch (lang) {
            case 'en':
                var textAlign = "lft"                
                break
            case 'hi':
                var textAlign = "lft"
                break
            case 'tr':
                var textAlign = "lft"
                break
            case 'ar':
                var textAlign = "rtl"
                break
            case 'ur':
                var textAlign = "rtl"
                break
            case 'de':
                var textAlign = "lft"
                break
            case 'fr':
                var textAlign = "lft"
                break
            case 'it':
                var textAlign = "lft"
                break
            case 'es':
                var textAlign = "lft"
                break
            case 'pt':
                var textAlign = "lft"
                break
            case 'id':
                var textAlign = "lft"
                break
            case 'ja':
                var textAlign = "lft"
                break
            case 'ko':
                var textAlign = "lft"
                break
            case 'fa':
                var textAlign = "rtl"
                break
            case 'ru':
                var textAlign = "lft"
                break  
            case 'zh':
                var textAlign = "lft"
                break           
        }

        langTable(lang)
        document.getElementById('searchPlaceComplete').value = ''
        document.getElementById("searchPlaceComplete").dir = textAlign
        changeTextLang(lang, textAlign)

    } catch (e) {
        console.log("Error - setLanguage() -> ", e.message)
    }
}

function changeTextLang(lang, textAlign) {
    try {
        if (textAlign == 'rtl') {
            var textMove = 'right'
        } else if (textAlign == 'lft') {
            var textMove = 'left'
        }

        document.getElementById("selectLanguage").dir = textAlign
        document.getElementById("selectLanguage").innerHTML = configText['selectLanguage']
        document.getElementById("currentLanguage").dir = textAlign
        document.getElementById("currentLanguage").innerHTML = configText['currentLanguage']
        document.getElementById("searchPlaceComplete").dir = textAlign
        document.getElementById("searchPlaceComplete").placeholder= configText['searchYourRegion']
        document.getElementById("basemapName").style.textAlign = textMove
        document.getElementById("basemapName").innerHTML= configText['basemapName']
        document.getElementById("light").style.textAlign = textMove
        document.getElementById("light").innerHTML= configText['light']
        document.getElementById("dark").style.textAlign = textMove
        document.getElementById("dark").innerHTML= configText['dark']
        document.getElementById("streets").style.textAlign = textMove
        document.getElementById("streets").innerHTML= configText['streets']
        document.getElementById("outdoors").style.textAlign = textMove
        document.getElementById("outdoors").innerHTML= configText['outdoors']
        document.getElementById("satellite").style.textAlign = textMove
        document.getElementById("satellite").innerHTML= configText['satellite']
        document.getElementById("satellite-streets").style.textAlign = textMove
        document.getElementById("satellite-streets").innerHTML= configText['satellite-streets']
    } catch (e) {
        console.log("Error - changeTextLang() -> ", e.message)
    }
}


function langClick(ln) {
    try {
        console.log(ln)
        // $('#langModal').modal('hide');
        localStorage.setItem('imLang', ln)
        location.reload()
        // setLanguage(ln)
        // langBasemap(ln)

        // if (searchInputCounter > 0) {
        //     closeAllLists()
        //     searchInputCounter = 0
        // }

    } catch (e) {
        console.log("Error - langClick() -> ", e.message)
    }
}