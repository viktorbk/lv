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
                initForsida(itemElement);
                nextButton(itemElement, itemIndex, "Hefja greiningu");
                break;
            case 1:
                initPersonuuppl(itemElement);
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
});

function nextButton(itemElement, id, text) {
    itemElement.append($("<br>"));
    var itemId = "next-button-" + id;
    itemElement.append($("<div id='" + itemId + "'></div>"));
    var selectItemId = "#" + itemId;
    $(selectItemId).dxButton({
        text: text,
        onClick: function () {
            var curIndex = $("#tab").dxTabPanel("option", "selectedIndex");
            var nextIndex = (curIndex +1) % 5;
            $("#tab").dxTabPanel("instance").option("selectedIndex", nextIndex);
        }
    });
    var docWidth = $(document).width();
    var divWidth = $(selectItemId).width();
    var centerMargin = (docWidth / 2) - (divWidth / 2) - 30;
    $(selectItemId).css("margin-left", centerMargin);
}
function numberWithDots(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

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
                    return value + "+ ára";
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
                $("#fjoldi-barna-heima").dxSlider("instance").option("value", 0)
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

function initPeningar(itemElement) {
    itemElement.append($("#thirdTab").html());
    $("#husnaedi").dxRadioGroup({
        items: ['Leigu', 'Eigin'],
        width: "300px",
        value: 'Leigu',
        layout: "horizontal",
        onValueChanged: function (e) {
            var newText = "";
            if (e.value == "Leigu") {
                newText = "Hver er leigukostnaður þinn á mánuði";
            }
            else {
                newText = "Hver er lánakostnaður þinn á mánuði";
            }
            $("#husnaedi-kostnadur-grp").hide();
            $("#husnaedi-kostnadur-display").text(newText);
            $("#husnaedi-kostnadur").dxSlider("instance").option("value", 0);
            $("#husnaedi-kostnadur-grp").fadeIn("fast");
        }
    });
    $("#laun").dxSlider({
        min: 0,
        max: 1000000,
        step: 50000,
        value: 0,
        width: 300,
        hint: "Dragðu stikuna á rétt laun.",
        tooltip: {
            enabled: true,
            format: function (value) {
                if (value == 0) {
                    return "Engin laun";
                }
                else if (value < 1000000) {
                    return numberWithDots(value) + " kr.";
                }
                else {
                    return numberWithDots(value) + " kr. eða hærri"
                }
            }
        },
        label: {
            visible: true,
            position: 'bottom',
            format: function (value) {
                if (value < 1000000) {
                    return "Engin laun";
                }
                else {
                    return "Milljón+"
                }
            }
        }
    });
    $("#husnaedi-kostnadur").dxSlider({
        min: 0,
        max: 400000,
        step: 12500,
        value: 0,
        width: 300,
        hint: "Dragðu stikuna á réttan kostnað.",
        tooltip: {
            enabled: true,
            format: function (value) {
                if (value == 0) {
                    return "Enginn húsnæðiskostnaður";
                }
                else if (value < 1000000) {
                    return numberWithDots(value) + " kr.";
                }
                else {
                    return numberWithDots(value) + " kr. eða hærri"
                }
            }
        },
        label: {
            visible: true,
            position: 'bottom',
            format: function (value) {
                if (value < 400000) {
                    return "Enginn";
                }
                else {
                    return "400.000+ kr."
                }
            }
        }
    });
}

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

function initForsida(itemElement) {
    itemElement.append($("#fifthTab").html());
}

var dataItems = [
{
    html: getTitle('info', 'Forsíða'),
    data: {
    }
},
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

