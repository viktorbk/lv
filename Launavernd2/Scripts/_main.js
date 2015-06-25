var lvApp = angular.module('lvApp', ['dx']);
lvApp.controller("defaultCtrl", function ($scope) {

    $scope.tabPanel = {
        dataSource: dataItems,
        swipeEnabled: true,
        loop: true,
        animationEnabled: true,
        height: document.documentElement.clientHeight - 1,
        itemTemplate: function(itemData, itemIndex, itemElement) {
            var content = '';
            switch (itemIndex) {
            case 0:
                initPersonuuppl(itemElement);
                break;
            case 1:
                initBorn(itemElement);
                break;
            }
        }
    }
});

function initPersonuuppl(itemElement) {
    itemElement.append($("#firstTab").html());

    $("#kyn").dxRadioGroup({
        items: ['Karl', 'Kona'],
        width: "300px",
        value: 'Karl',
        layout: "horizontal"
    });
    $("#aldur").dxSlider({
        min: 18,
        max: 70,
        step: 1,
        value: 18,
        width: 300,
        hint: "Dragðu stikuna á réttan aldur.",
        tooltip: {
            enabled: true,
            format: function (value) {
                if (value < 70) {
                    return value + " ára";
                }
                else {
                    return value + " ára eða eldri"
                }
            }
        },
        label: {
            visible: true,
            position: 'bottom',
            format: function (value) {
                if (value < 70) {
                    return value + " ára";
                }
                else {
                    return value + " ára eða eldri"
                }
            }
        }
    });
    $("#reykir").dxRadioGroup({
        items: ['Já', 'Nei'],
        width: "300px",
        value: 'Já',
        layout: "horizontal"
    });
    $("#maki").dxRadioGroup({
        items: ['Já', 'Nei'],
        width: "300px",
        value: 'Nei',
        layout: "horizontal"
    });
}

function initBorn(itemElement) {
    itemElement.append($("#secondTab").html());

    $("#fjoldi-barna").dxSlider({
        min: 0,
        max: 10,
        step: 1,
        value: 0,
        width: 300,
        hint: "Dragðu stikuna á réttan fjölda barna.",
        tooltip: {
            enabled: true,
            format: function (value) {
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
        },
        label: {
            visible: true,
            position: 'bottom',
            format: function (value) {
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
        },
        onValueChanged: function (e) {
            if (e.value != 0) {
                $("#fjoldi-barna-heima-grp").fadeIn("slow");
                var currvalue = $("#fjoldi-barna-heima").dxSlider("option", "value");
                var instance = $("#fjoldi-barna-heima").dxSlider("instance");
                instance.option("tooltip", {
                    enabled: true,
                    format: function (value) {
                        if (value == 0) {
                            return "Engin börn";
                        }
                        else if (value == 10) {
                            return value + " eða fleiri börn"
                        }
                        else if (value <= e.value) {
                            return value + " börn";
                        }
                    }
                });
                instance.option("max", e.value);
                if (currvalue > e.value) {
                    $("#fjoldi-barna-heima").dxSlider("instance").option("value", e.value);
                }
            }
            else {
                $("#fjoldi-barna-heima-grp").fadeOut("slow");
            }
        }
    });
    $("#fjoldi-barna-heima").dxSlider({
        min: 0,
        max: 10,
        step: 1,
        value: 0,
        width: 300,
        hint: "Dragðu stikuna á réttan fjölda barna.",
        tooltip: {
            enabled: true,
            format: function (value) {
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
        },
        label: {
            visible: true,
            position: 'bottom',
            format: function (value) {
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
        }
    });
    $("#fjoldi-barna-heima-grp").hide();
}
var dataItems = [
{
    html: getTitle('users', 'Persónuupplýsingar'),
    data: {
    }
},
{
    html: getTitle('child', 'Börn'),
    data: {
    }
},
{
    html: getTitle('money', 'Lán/útgjöld'),
    data: {
    }
},
{
    html: getTitle('calculator', 'Útreikningur'),
    data: {
    }
}];

function getTitle(icon, txt) {
    return '<table><tr><td><i class="fa fa-' + icon + ' lv-icon"></i></td><td style="padding-left:8px;">&nbsp;' + txt + '</td></tr></table>';
}

//$().ready(function () {


//    $("#tabPanel").dxTabPanel({
//        items: dataItems,
//        height: document.documentElement.clientHeight - 1,
//        itemTemplate: function (itemData, itemIndex, itemElement) {
//            var content = '';
//            switch (itemIndex) {
//                case 0:
//                    initPersonuuppl(itemElement);
//                    break;
//            }
            

//        }
//    });

//    function initPersonuuppl(itemElement) {
//        itemElement.append($("#firstTab").html());

//        $("#kyn").dxRadioGroup({
//            items: ['Karl', 'Kona'],
//            value: 'Karl',
//            layout: "horizontal"
//        });
//    }

//    function InitAddressData(data) {
//        $("#state").dxTextBox({
//            value: data.state
//        });
//        $("#city").dxTextBox({
//            value: data.city
//        });
//        $("#street").dxTextBox({
//            value: data.street
//        });
//        return $("#thirdTab");
//    }

//    function InitCarData(data) {
//        $("#firstName").dxTextBox({
//            value: data.firstName
//        });
//        $("#lastName").dxTextBox({
//            value: data.lastName
//        });
//        $("#birthYear").dxTextBox({
//            value: data.birthYear
//        });
//        return $("#firstTab");
//    }

//});

