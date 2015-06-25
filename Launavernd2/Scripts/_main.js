﻿var lvApp = angular.module('lvApp', ['dx']);
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
            }
        }
    }
});

function initPersonuuppl(itemElement) {
    itemElement.append($("#firstTab").html());

    $("#kyn").dxRadioGroup({
        items: ['Karl', 'Kona'],
        value: 'Karl',
        layout: "horizontal"
    });
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

