TAB_PERSONUUPPL = 1;
TAB_UTREIKNINGUR = 3;

var lvApp = angular.module('lvApp', ['dx', 'ngMaterial']);
lvApp.controller("defaultCtrl", function ($scope) {
    
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
        if (selectedTab == TAB_UTREIKNINGUR)
            initEditables();
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

    $scope.kronur = function(x) {return kronur(x)};

    //window.scope = $scope;

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
            formatBornTooltip: fmtBornTooltip
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
            formatArLabel: fmtArLabel,
            formatArTooltip: fmtArTooltip
        }
    ];
}

angular.element(document).ready(function () {
    //debugger;
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


