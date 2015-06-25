employees = [{
    "EmployeeID": 1,
    "LastName": "Davolio",
    "FirstName": "Nancy",
    "Title": "Sales Representative",
    "TitleOfCourtesy": "Ms.",
    "BirthDate": "1968-12-08T00:00:00.000Z",
    "HireDate": "2011-05-01T00:00:00.000Z",
    "Address": "507 - 20th Ave. E.\r\nApt. 2A",
    "City": "Seattle",
    "Region": "WA",
    "PostalCode": "98122",
    "Country": "USA",
    "HomePhone": "(206) 555-9857",
    "Extension": "5467",
    "Photo": "images/employees/01.jpg",
    "ReportsTo": 2
}, {
    "EmployeeID": 2,
    "LastName": "Fuller",
    "FirstName": "Andrew",
    "Title": "Vice President, Sales",
    "TitleOfCourtesy": "Dr.",
    "BirthDate": "1972-02-19T00:00:00.000Z",
    "HireDate": "2011-08-14T00:00:00.000Z",
    "Address": "908 W. Capital Way",
    "City": "Tacoma",
    "Region": "WA",
    "PostalCode": "98401",
    "Country": "USA",
    "HomePhone": "(206) 555-9482",
    "Extension": "3457",
    "Photo": "images/employees/02.jpg",
    "ReportsTo": null
}];

tabPanelData = [
        {
            title: "Personal Data",
            data: {
                firstName: "John",
                lastName: "Smith",
                birthYear: 1986,
            }
        },
        {
            title: "Contacts",
            data: {
                phone: "(555)555-5555",
                email: "John.Smith@example.com",
            }
        },
        {
            title: "Address",
            data: {
                state: "CA",
                city: "San Francisco",
                street: "Stanford Ave",
            }
        }
];

var lvApp = angular.module('lvApp', ['dx']);
lvApp.controller("defaultCtrl", function ($scope) {

    $scope.gridSettings = {
        dataSource: employees,
        paging: {
            pageSize: 6
        },
        filterRow: {
            visible: true
        },
        groupPanel: {
            visible: true,
        },
        editing: {
            editMode: 'row',
            editEnabled: true,
            removeEnabled: true,
            insertEnabled: true

        }
    }
    $scope.tabSettings = {
        dataSource: tabPanelData,
        swipeEnabled: true,
        loop: true,
        animationEnabled: false
    }
});

//$().ready(function () {
//    var dataItems = [
//    {
//        icon: 'group',
//        html: getTitle('users', 'Persónuupplýsingar'),
//        data: {
//            firstName: "John",
//            lastName: "Smith",
//            birthYear: 1986,
//        }
//    },
//    {
//        html: getTitle('child', 'Börn'),
//        data: {
//            phone: "(555)555-5555",
//            email: "John.Smith@example.com",
//            ds: [
//                { ID: 1, Name: "Name " + 1 },
//                { ID: 2, Name: "Name " + 2 },
//                { ID: 3, Name: "Name " + 3 },
//                { ID: 4, Name: "Name " + 4 }
//            ]
//        }
//    },
//    {
//        html: getTitle('money', 'Lán/útgjöld'),
//        data: {
//            state: "CA",
//            city: "San Francisco",
//            street: "Stanford Ave",
//        }
//    },
//    {
//        html: getTitle('calculator', 'Útreikningur'),
//        data: {
//            state: "CA",
//            city: "San Francisco",
//            street: "Stanford Ave",
//        }
//    }
//    ];

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

//function getTitle(icon, txt) {
//    return '<table><tr><td><i class="fa fa-' + icon + ' lv-icon"></i></td><td style="padding-left:8px;">' + txt + '</td></tr></table>';
//}