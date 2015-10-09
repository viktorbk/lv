/*
Concatenated JS file 
Author: Geysir It 
Created Date: 2015-10-09
 */ 
function onHusnaediChanged(e) {
    var newText = '';
    if (e.value == 'Leigu') {
        newText = 'Hver er leigukostnaður þinn á mánuði';
        $('#husnaedislan-grp').hide();
        $('#husnaedislan').dxSlider('instance').option('value', 1000000);
    }
    else {
        newText = 'Hver er lánakostnaður þinn á mánuði';
    }
    $('#husnaedi-kostnadur-grp').hide();
    $('#husnaedi-kostnadur-display').text(newText);
    $('#husnaedi-kostnadur').dxSlider('instance').option('value', 0);
    $('#husnaedi-kostnadur-grp').fadeIn('fast');
}

function initEditables() {
    $("#endurstillaGildi").click(function () {
        Framfaersla.Hjon = JSON.parse(JSON.stringify(FramfaerslaOriginal.Hjon));
        Framfaersla.Einstaklingur = JSON.parse(JSON.stringify(FramfaerslaOriginal.Einstaklingur));
        initEditables();
    });

    // eyði út ediables ef til fyrir
    $(".editable").each(function(obj) {$(this).editable('destroy')})

    $('#xaldur').editable({
    type: 'text',
    value: Persona.aldur,
    success: function(response, newValue) {
        Persona.aldur = Number(newValue);
        initEditables();
    }
    });   
    $('#xborn').editable({
        type: 'text',
        value: Persona.fjoldiBarna,
        success: function(response, newValue) {
            Persona.fjoldiBarna = Number(newValue);
            initEditables();
        }
    });  
    $('#xlaun').editable({
        type: 'text',
        value: Persona.laun,
        success: function(response, newValue) {
            Persona.laun = Number(newValue);
            initEditables();
        }
    });
    $('#xmakalaun').editable({
        type: 'text',
        value: Persona.makaLaun,
        success: function (response, newValue) {
            Persona.makaLaun = Number(newValue);
            initEditables();
        }
    });
    $('#xmatur').editable({
        type: 'text',
        value: Persona.kostnadur()[0],
        success: function (response, newValue) {
            breytaFramfaersluGildi(0, Number(newValue));
            initEditables();
        }
    });
    $('#xfot').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(1),
        success: function (response, newValue) {
            breytaFramfaersluGildi(1, Number(newValue));
            initEditables();
        }
    });
    $('#xlaeknis').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(2),
        success: function (response, newValue) {
            breytaFramfaersluGildi(2, Number(newValue));
            initEditables();
        }
    });
    $('#xtomstundir').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(3),
        success: function (response, newValue) {
            breytaFramfaersluGildi(3, Number(newValue));
            initEditables();
        }
    });
    $('#xsamskipti').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(4),
        success: function (response, newValue) {
            breytaFramfaersluGildi(4, Number(newValue));
            initEditables();
        }
    });
    $('#xþjonusta').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(5),
        success: function (response, newValue) {
            breytaFramfaersluGildi(5, Number(newValue));
            initEditables();
        }
    });
    $('#xsamgongur').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(6),
        success: function (response, newValue) {
            breytaFramfaersluGildi(6, Number(newValue));
            initEditables();
        }
    });
}

function breytaFramfaersluGildi(gildiNr, nyttGildi) {
    var bornIndex = Math.min(5, Persona.fjoldiBarna);
    if (Persona.maki == 2) {
        var gamlaGildi = Framfaersla.Einstaklingur[bornIndex][gildiNr];
        var munur = nyttGildi - gamlaGildi;
        Framfaersla.Einstaklingur[bornIndex][gildiNr] = nyttGildi;
        Framfaersla.Einstaklingur[bornIndex][7] += munur;
    }
    else {
        var gamlaGildi = Framfaersla.Hjon[bornIndex][gildiNr];
        var munur = nyttGildi - gamlaGildi;
        Framfaersla.Hjon[bornIndex][gildiNr] = nyttGildi;
        Framfaersla.Hjon[bornIndex][7] += munur;
    }
}

function saekjaFramfaersluGildi(gildiNr) {
    var bornIndex = Math.min(5, Persona.fjoldiBarna);
    var gildi = 0;
    if (Persona.maki == 2) {
        gildi = Framfaersla.Einstaklingur[bornIndex][gildiNr];
    }
    else {
        gildi = Framfaersla.Hjon[bornIndex][gildiNr];
    }
    return gildi;
}

function initInfo1() {
    var gluggar = ["born"];
    gluggar.forEach(createPopover);
}

function initInfo2() {
    var gluggar = ["skammtimaskuldir", "laun"];
    gluggar.forEach(createPopover);}

function initInfo3() {
    var gluggar = ["forsendur"];
    gluggar.forEach(createPopover);

    gluggar = ["framfaersla"];
    gluggar.forEach(createPopover2);
}

function createPopover(element, index, array) {
    var gluggi = "#" + element + "InfoWindow";
    var icon = '#' + element + 'Info';
    var a = $(gluggi).dxPopover({
        target: icon,
        width: '300',
        animation: {
            show: {
                type: 'pop',
                from: { scale: 0 },
                to: { scale: 1 }
            },
            hide: {
                type: 'pop',
                from: { scale: 1 },
                to: { scale: 0 }
            }
        },
        visible: false
    }).dxPopover("instance");
    $(icon).unbind().hover(function () { a.show() }, function () { a.hide() });
}

function createPopover2(element, index, array) {
    var gluggi = "#" + element + "InfoWindow";
    var icon = '#' + element + 'Info';
    var popoverWithShading = $(gluggi).dxPopover({
        target: icon,
        position: "top",
        width: 300,
        shading: true,
        shadingColor: "rgba(0, 0, 0, 0.5)"
    }).dxPopover("instance");

    $(icon).unbind().hover(function () { popoverWithShading.show(); }, null).click(function () { popoverWithShading.hide(); });

}

var Framfaersla = {
    Einstaklingur: [
        [44645, 8249, 9683, 12582, 11870, 4360, 45080, 136469],
        [69625, 13356, 11777, 23426, 14317, 7264, 45080, 184843],
        [90291, 18462, 13871, 32819, 16763, 10169, 52080, 234454],
        [106640, 23568, 15964, 40763, 19209, 13075, 59080, 278298],
        [118673, 28676, 18058, 40763, 21654, 15979, 66080, 309882],
        [118673, 33782, 20151, 40763, 24100, 18885, 78659, 335013]
    ],
    Hjon: [
        [82506, 10929, 14449, 22495, 17314, 8669, 45080, 201442],
        [107487, 16037, 16543, 33339, 19760, 11575, 52080, 256820],
        [128153, 21143, 18637, 42733, 22206, 14479, 59080, 306430],
        [144502, 26249, 20730, 50676, 24652, 17385, 66080, 350274],
        [156536, 31355, 22824, 50676, 27097, 20290, 78659, 387438],
        [156536, 36463, 24917, 50676, 29543, 23195, 85659, 406989]
    ]
}

var FramfaerslaOriginal = {
    Einstaklingur: [
        [44645, 8249, 9683, 12582, 11870, 4360, 45080, 136469],
        [69625, 13356, 11777, 23426, 14317, 7264, 45080, 184843],
        [90291, 18462, 13871, 32819, 16763, 10169, 52080, 234454],
        [106640, 23568, 15964, 40763, 19209, 13075, 59080, 278298],
        [118673, 28676, 18058, 40763, 21654, 15979, 66080, 309882],
        [118673, 33782, 20151, 40763, 24100, 18885, 78659, 335013]
    ],
    Hjon: [
        [82506, 10929, 14449, 22495, 17314, 8669, 45080, 201442],
        [107487, 16037, 16543, 33339, 19760, 11575, 52080, 256820],
        [128153, 21143, 18637, 42733, 22206, 14479, 59080, 306430],
        [144502, 26249, 20730, 50676, 24652, 17385, 66080, 350274],
        [156536, 31355, 22824, 50676, 27097, 20290, 78659, 387438],
        [156536, 36463, 24917, 50676, 29543, 23195, 85659, 406989]
    ]
}
// Matur og hreinlætisvörur
// Föt og skór
// Læknis- og lyfjakostnaður
// Tómstundir
// Samskipti
// Önnur þjónusta
// Samgöngur

var Liftrygging = {
    Reyklaus: [
        1226,1235,1242,1249,1257,1268,1279,1293,1309,1326,1346,1369,1391,1415,1442,1472,1507,1548,1592,1643,1699,1763,1841,1928,2025,2133,2254,2397,2557,2738,2939,3166,3427,3720,4050,4421,4839,5340,5905,6546,7272,8093,9007,10041,11211,12535,14033,15701,17586,19716,22125
    ],
    Reykir: [
        1327,1337,1362,1389,1417,1448,1481,1517,1557,1600,1647,1698,1769,1848,1934,2030,2136,2241,2357,2486,2630,2791,2947,3123,3320,3542,3792,4059,4359,4694,5070,5492,5936,6432,6987,7606,8296,9047,9884,10817,11855,13013,14301,15738,17336,19119,21103,23217,25558,28153,31028
    ]
}


var Sjukdomatrygging = { 
    Reyklaus: [
        1133,1184,1242,1300,1365,1437,1517,1602,1693,1792,1909,2042,2193,2363,2553,2763,2998,3255,3540,3867,4233,4636,5082,5571,6145,6821,7573,8382,9224,10113,11075,12226,13452,14736,16129,17640,19317,21084,22957,25236,28121,30554,33201,36080,39213,42621,46330,50364,54753,59528,64723
    ],
    Reykir: [
        1221,1283,1348,1411,1483,1565,1655,1753,1858,1974,2111,2314,2555,2825,3146,3507,3844,4188,4543,5008,5560,6209,7010,7890,8925,10513,12378,14453,16282,18020,19595,20973,22407,23928,25584,27745,30185,33500,36698,39790,43500,46983,50465,54352,58535,63036,67879,73090,78694,84722,91204
    ]
}
function fmtAldur(value) {
    return value < 70 ? value + ' ára' : value + ' ára eða eldri'
}

function fmtBornLabel(value) {
    if (value == 0) {
        return "Engin";
    }
    else if (value < 10) {
        return value;
    }
    else {
        return value + "+"
    }
}

function fmtBornTooltip(value) {
    if (value == 0) {
        return "Engin börn";
    }
    else if (value < 10) {
        return value + " börn";
    }
    else {
        return value + " eða fleiri börn"
    }
}


function fmtLaunLabel(value) {
    if (value < 1000000) {
        return "Engin laun";
    }
    else {
        return "1 milljón";
    }
}

function fmtKronur(value) {
    if (value == 0) {
        return "Enga";
    }
    else {
        return kronur(value);
    }
}

function fmtLaunTooltip(value) {
    if (value == 0) {
        return "Engin laun";
    }
    else if (value < 1000000) {
        return numberWithDots(value) + " kr.";
    }
    else {
        return numberWithDots(value) + " kr. eða hærri";
    }
}


function fmtSkammtimaskuldirLabel(value) {
    if (value == 0) {
        return "Ekkert";
    }
    else if (value < 10000000) {
        return "~" + numberWithDots(value) + " kr.";
    }
    else {
        return "10 milljónir";
    }
}

function fmtSkammtimaskuldirTooltip(value) {
    if (value == 0) {
        return "Engar skuldir";
    }
    else if (value < 10000000) {
        return "~" + numberWithDots(value) + " kr.";
    }
    else {
        return numberWithDots(value) + " kr. eða hærri";
    }
}

function fmtProsentLabel(value) {
    return value + '%';
}

function fmtProsentTooltip(value) {
    return value + '%';
}

function fmtArLabel(value) {
    return value + ' ár';
}

function fmtArTooltip(value) {
    return value + ' ár';
}
TAB_PERSONUUPPL = 1;
TAB_FJARMALAUPPL = 2;
TAB_UTREIKNINGUR = 3;

var lvApp = angular.module('lvApp', ['dx', 'ngMaterial']);

lvApp.controller("defaultCtrl", ["$scope", function ($scope) {
    
    $scope.data = {
        group1: 'Banana',
        group2: '2',
        group3: 'avatar-1'
    };
    $scope.radioData = [
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: '3', isDisabled: true },
          { label: '4', value: '4' }
    ];

    stillaTabPanel($scope);

    $scope.tabChanged = function (e) {
        var selectedTab = e.component.option('selectedIndex');
        var icon = $scope.tabPanelItems[selectedTab].icon;
        //var icnBkgnd = $(".fa-" + icon).parent().parent().parent().parent().parent().parent();
        //icnBkgnd.css({'color': 'white', 'background-color': 'green'});
        $(".fa-" + icon).css({'color': 'green'});
        if (selectedTab == TAB_UTREIKNINGUR) {
            initEditables();
            initInfo3();
        }
        if (selectedTab == TAB_PERSONUUPPL)
            initInfo1();
        if (selectedTab == TAB_FJARMALAUPPL)
            initInfo2();
    }

    $scope.naestaSida = function () {
        var curIndex = $("#tabPanel").dxTabPanel("option", "selectedIndex");
        var nextIndex = (curIndex + 1) % 5;
        $("#tabPanel").dxTabPanel("instance").option("selectedIndex", nextIndex);
    }

    $scope.sendaUmsokn = function () {
        var persona = {};
        persona.aldur = Persona.aldur;
        persona.kyn = Persona.kyn == 1 ? "karl" : "kona";
        persona.maki = Persona.maki == 1 ? true : false;
        persona.reykir = Persona.reykir == 1 ? true : false;
        persona.borgaManadarlega = Persona.borgaManadarlega;
        persona.vernd = Persona.vernd;
        persona.verndAr = Persona.verndAr;
        persona.sjukdomaVernd = Persona.sjukdomaVernd;
        persona.sjukdomaVerndAr = Persona.sjukdomaVerndAr;
        persona.adrarTryggingar = Persona.adrarTryggingar;
        persona.onnurLiftrygging = Persona.onnurLiftrygging;
        persona.onnurSjukdomaTrygging = Persona.onnurSjukdomaTrygging;
        location.href = JSON.ser;
        console.log(persona); 
    }

    $scope.tabInit = function(e) {
        window.tabPanel = $("#tabPanel").dxTabPanel("instance");
    }

    // hér er hægt að setja inn fyrir næsta tab
    $scope.buttonSettings = {
        text: 'Add item',
        clickAction: function (e) {
            $scope.tabPanelItems.push({ title: 'New item' });
        } 
    };
}]);

lvApp.filter("kronur", function () {
    return function (input) {
        return kronur(input);
    }
});

lvApp.filter("aldur", function () {
    return function (input) {
        return input + ' ára';
    }
});

lvApp.filter("jaNei", function () {
    return function (input) {
        return input == 1 ? 'Já' : 'Nei';
    }
});

lvApp.filter("kyn", function () {
    return function (input) {
        return input == 1 ? 'Karl' : 'Kona';
    }
});

lvApp.filter("kronurPerManud", function () {
    return function (input) {
        return kronur(Math.round(input / 12));
    }
});

lvApp.filter("born", function () {
    return function (input) {
        if (input == 0)
            return "Engin";
        if (input == 1)
            return "1 barn";
        return input + " börn";
    }
});


function stillaTabPanel($scope) {
    $scope.docHeight = document.documentElement.clientHeight - 1,
    $scope.tabPanelItems = [
        {
            icon: "info-circle",
            iconSize: '20px', iconColor: 'grey',
            title: "Forsíða",
            template: 'tab0'
        },
        {
            icon: "user",
            iconSize: '20px', iconColor: 'grey',
            title: "Persónuupplýsingar",
            template: 'tab1',
            model: Persona,
            valkostir: Valkostir,
            formatAldur: fmtAldur,
            formatBornLabel: fmtBornLabel,
            formatBornTooltip: fmtBornTooltip,
            aBarn: function () {
                return Persona.fjoldiBarna > 0;
            },
            hefurMaka: function () {
                return Persona.maki == 1;
            },
            range: function (x) {
                return new Array(Math.min(x, 5));
            }
        },
        {
            icon: "money",
            iconSize: '20px', iconColor: 'grey',
            title: "Lán/útgjöld",
            template: 'tab2',
            model: Persona,
            valkostir: Valkostir,
            currentHusnaedi: 1,
            currentHusnaediskostnadur: 0,
            currentLan: 0,
            formatLaunLabel: fmtLaunLabel,
            formatLaunTooltip: fmtLaunTooltip,
            formatSkammtimaskuldirLabel: fmtSkammtimaskuldirLabel,
            formatSkammtimaskuldirTooltip: fmtSkammtimaskuldirTooltip,
            erLeiga: function() {
                return Persona.husnaedi == 1;
            },
            hefurMaka: function () {
                return Persona.maki == 1;
            },
            radstofunNeikvaed: function () {
                return Persona.tilRadstofunar() < 0;
            }
        },
        {
            icon: "calculator",
            iconSize: '18px', iconColor: 'grey',
            title: "Útreikningur",
            template: 'tab3',
            model: Persona,
            formatProsentLabel: fmtProsentLabel,
            formatProsentTooltip: fmtProsentTooltip,
            formatKronur: fmtKronur,
            formatArLabel: fmtArLabel,
            formatArTooltip: fmtArTooltip,
            hefurMaka: function () {
                return Persona.maki == 1;
            },
            round: function (x) {
                return Math.round(x);
            }
        }
    ];
}

angular.element(document).ready(function () {
    angular.bootstrap(document, ['lvApp']);
    $.fn.editable.defaults.mode = 'popup';
});

function initUtreikningur(itemElement) {
    itemElement.append($("#fourthTab").html());
    $("#laun-prosenta").dxSlider({
        min: 10,
        max: 100,
        step: 5,
        value: 10,
        width: 300,
        hint: "Dragðu stikuna á prósentuna.",
        tooltip: {
            enabled: true,
            format: function (value) {
                return value + "%"
            }
        },
        label: {
            visible: true,
            position: 'bottom',
            format: function (value) {
                return value + "%"
            }
        }
    });
    $("#laun-ar").dxSlider({
        min: 1,
        max: 10,
        step: 1,
        value: 1,
        width: 300,
        hint: "Dragðu stikuna á árafjöldann.",
        tooltip: {
            enabled: true,
            format: function (value) {
                return value + " ár";
            }
        },
        label: {
            visible: true,
            position: 'bottom',
            format: function (value) {
                return value + " ár";
            }
        }
    });
    $("#idgjald").dxButton({
        text: "Reikna líftryggingu",
        onClick: function () {
            var aldur = $("#aldur").dxSlider("option", "value");
            var reykir = $("#reykir").dxRadioGroup("option", "value") == "Já" ? true : false;
            var maki = $("#maki").dxRadioGroup("option", "value") == "Já" ? true : false;
            var fjoldiBarna = $("#fjoldi-barna-heima").dxSlider("option", "value");
            var laun = $("#laun").dxSlider("option", "value");
            var husKostnadur = $("#husnaedi-kostnadur").dxSlider("option", "value");
            var launaProsenta = $("#laun-prosenta").dxSlider("option", "value");
            var fjoldiAra = $("#laun-ar").dxSlider("option", "value");
            var liftryggingaUpphaed = laun * (launaProsenta / 100) * 12 * fjoldiAra;
            $("#liftrygging-amt-display").text(numberWithDots(Math.floor(liftryggingaUpphaed)) + " kr.");
            $.get('/Data/GetIdgjald', { aldur: aldur, reykir: reykir }).success(function (svar) {
                if (!svar) {
                    DevExpress.ui.notify("Vila kom upp!", "danger", 2000);
                    return;
                }
                else {
                    var idgjald = svar;
                    var idgjaldAr = liftryggingaUpphaed / 1000000 * idgjald;
                    var idgjaldManudur = idgjaldAr / 12;
                    $("#idgjald-amt-display").text(numberWithDots(Math.floor(idgjaldManudur)) + " kr. á mánuði.");
                }
            });
        }
    });
}



function nextButton(itemElement, id, text) {
    itemElement.append($("<br>"));
    var itemId = "next-button-" + id;
    itemElement.append($("<div id='" + itemId + "'></div>"));
    var selectItemId = "#" + itemId;
    $(selectItemId).dxButton({
        text: text,
        onClick: function () {
            var curIndex = $("#tab").dxTabPanel("option", "selectedIndex");
            var nextIndex = (curIndex + 1) % 5;
            $("#tab").dxTabPanel("instance").option("selectedIndex", nextIndex);
        }
    });
    var docWidth = $(document).width();
    var divWidth = $(selectItemId).width();
    var centerMargin = (docWidth / 2) - (divWidth / 2) - 30;
    $(selectItemId).css("margin-left", centerMargin);
}

function getTabPanelObject($scope) {
    return {
        dataSource: dataItems,
        swipeEnabled: true,
        loop: true,
        animationEnabled: true,
        height: document.documentElement.clientHeight - 1,
        itemTemplate: function(itemData, itemIndex, itemElement) {
            var content = '';
            switch (itemIndex) {
                case 0:
                    initForsida(itemElement);
                    nextButton(itemElement, itemIndex, "Hefja greiningu");
                    break;
                case 1:
                    $scope.initPersonuuppl(itemElement);
                    nextButton(itemElement, itemIndex, "Næsta skref");
                    break;
                case 2:
                    initBorn(itemElement);
                    nextButton(itemElement, itemIndex, "Næsta skref");
                    break;
                case 3:
                    initPeningar(itemElement);
                    nextButton(itemElement, itemIndex, "Næsta skref");
                    break;
                case 4:
                    initUtreikningur(itemElement);
                    break;
            }
        }
    }
}

function getTitle(icon, txt) {
    return '<table><tr><td><i class="fa fa-' + icon + ' lv-icon"></i></td><td style="padding-left:8px;">&nbsp;' + txt + '</td></tr></table>';
}
var Persona = {
	kyn: 1,
	aldur: 25,
	reykir: 2,
	maki: 2,
	fjoldiBarna: 0,
	laun: 150000,
	makaLaun: 150000,
	skammtimaSkuldir: 0,
	husnaedi: 2,
	erLeiga: function() {return this.husnaedi == 1},
	husnaediTxt: function() { return this.erLeiga() ? 'Leiguhúsnæði' : 'Eigin húsnæði';},
	husnaedisLan: 0,
	leiga: 0,
	husnaediLabel: function() {return this.erLeiga() ? 'Leiga á mánuði' : 'Afborganir á mánuði';},
	husnaediUpphaed: function() {return this.erLeiga() ? this.leiga : this.husnaedisLan;},
	kostnadur: function () {
	    var bornIndex = Math.min(5, this.fjoldiBarna);
		if (this.maki == 2)
			return Framfaersla.Einstaklingur[bornIndex];
		else
			return Framfaersla.Hjon[bornIndex];
	},
	afborganir: function() {
		var svar = this.skammtimaSkuldir;
		if (this.erLeiga())
			svar += this.leiga;
		else
			svar += this.husnaedisLan;
		return svar;
	},
	heildarKostn: function() {
		var svar = this.kostnadur()[7];
		svar += this.afborganir();
		return svar;
	},
	tilRadstofunar: function() {
	    var svar = this.laun - this.heildarKostn();
	    if (this.maki == 1)
	        svar += this.makaLaun;
		return svar;
	},
	vernd: 50,  
	verndAr: 2,
	sjukdomaVernd: 80,
	sjukdomaVerndAr: 2,
	adrarTryggingar: false,
	onnurLiftrygging: 0,
    onnurSjukdomaTrygging: 0,
	liftrygging: function() {
		var svar = this.laun * this.vernd / 100.0;
		svar = svar * this.verndAr * 12;
		return svar;
	},
	liftryggingTotal: function () {
	    var svar = this.liftrygging()   ;
	    if (this.adrarTryggingar)
	        svar -= this.onnurLiftrygging;
	    return svar;
	},
	lifIdgjald: function() {
	    var idg = Liftrygging.Reyklaus[this.aldur - 19];
		if (this.reykir == 1)
		    idg = Liftrygging.Reykir[this.aldur - 19];
		var heildarUpphaed = this.liftrygging();
		if (this.adrarTryggingar)
		    heildarUpphaed = this.liftryggingTotal();
		var fjoldiMilljona = heildarUpphaed / 1000000.0;
		var idgjaldPerAr = Math.round(fjoldiMilljona * idg);
		return idgjaldPerAr;
	},
	sjukdomaTrygging: function() {
		var svar = this.laun * this.sjukdomaVernd / 100.0;
		svar = svar * this.sjukdomaVerndAr * 12;	
		return svar;
	},
	sjukdomaTryggingTotal: function () {
	    var svar = this.sjukdomaTrygging();
	    if (this.adrarTryggingar)
	        svar -= this.onnurSjukdomaTrygging;
	    return svar;
	},
	sjukdomaIdgjald: function() {
		var idg = Sjukdomatrygging.Reyklaus[this.aldur - 19];
		if (this.reykir == 1)
		    idg = Sjukdomatrygging.Reykir[this.aldur - 19];
		var heildarUpphaed = this.sjukdomaTrygging();
		if (this.adrarTryggingar)
		    heildarUpphaed = this.sjukdomaTryggingTotal()
		var fjoldiMilljona = heildarUpphaed / 1000000.0;
		var idgjaldPerAr = Math.round(fjoldiMilljona * idg);
		return idgjaldPerAr;
	},
	idgjold: function() {
		var svar = this.lifIdgjald() + this.sjukdomaIdgjald();
		return svar;
	},
	tryggingTexti: function () {
	    return "Ég vil að fjölskylda mín haldi " + this.vernd + "% af núverandi launum mínum í " + this.verndAr + " ár ef ég fell frá.";
	},
	sjukdomaTryggingTexti: function () {
	    return "Ég vil halda " + this.sjukdomaVernd + "% af núverandi launum mínum í " + this.sjukdomaVerndAr + " ár ef ég greinist með illvígan sjúkdóm.";
	},
	borgaManadarlega: true,
	personImg: function () {
	    return "/Images/empty.png";
	    var mynd = "/Images/";
	    if (this.kyn == 1)
	        mynd += "man-";
	    else
	        mynd += "woman-";
	    var aldur = Math.round(this.aldur / 15);
	    mynd += aldur;
	    mynd += ".png";
	    return mynd;
	},
	makiImg: function () {
	    return "/Images/empty.png";
	    var mynd = "/Images/";
	    if (this.kyn != 1)
	        mynd += "man-";
	    else
	        mynd += "woman-";
	    var aldur = Math.round(this.aldur / 15);
	    mynd += aldur;
	    mynd += ".png";
	    return mynd;
	},
	houseImg: function () {
	    return "/Images/empty.png";
	    var mynd = "/Images/";
	    var kostnadur = 0;
	    if (this.husnaedi == 1) {
	        mynd += "leigu-";
	        kostnadur = this.leiga;
	    }
	    else {
	        mynd += "eigin-";
	        kostnadur = this.husnaedisLan;
	    }
	    kostnadur = Math.min(200000, kostnadur + 1);
	    var myndNr = Math.ceil((kostnadur) / 40000);
	    mynd += myndNr;
	    mynd += ".png";
	    return mynd;
	},
	reykirImg: function () {
	    return "/Images/empty.png";
	    var mynd = "/Images/";
	    if (this.reykir == 1)
	        mynd += "smoking.png";
	    else
	        mynd += "empty.png";
	    return mynd;
	},
	startBabyImage: Math.floor(Math.random() * 3 + 1),
	babyImg: function (nr) {
	    return "/Images/empty.png";
	    var mynd = "/Images/baby-";
	    return mynd + (((this.startBabyImage + nr) % 4) + 1) + ".png" ;
	},
	peningaImg: function () {
	    return "/Images/empty.png";
	    var mynd = "/Images/money-";
	    var radstofun = this.laun;
	    if (this.maki == 1)
	        radstofun += this.makaLaun;
	    radstofun = Math.min(999999, radstofun);
	    return mynd + (Math.floor(radstofun / 200000) + 1) + ".png";
	}
}

var Valkostir = {
	kyn: [
	    { text: "Karl", value: 1 },
	    { text: "Kona", value: 2 }
    ],
    jaNei: [
        { text: "Já",  value: 1 },
        { text: "Nei", value: 2 }
    ],
    husnaedi: [
        { text: "Leigi", value: 1 },
        { text: "Eigin húsnæði", value: 2 }
    ]
}
function numberWithDots(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function kronur(x) {
	return numberWithDots(x) + ' kr.';
}