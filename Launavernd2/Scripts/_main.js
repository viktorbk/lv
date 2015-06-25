$().ready(function () {
    var dataItems = [
    {
        icon: 'group',
        html: getTitle('users', 'Persónuupplýsingar'),
        data: {
            firstName: "John",
            lastName: "Smith",
            birthYear: 1986,
        }
    },
    {
        html: getTitle('child', 'Börn'),
        data: {
            phone: "(555)555-5555",
            email: "John.Smith@example.com",
            ds: [
                { ID: 1, Name: "Name " + 1 },
                { ID: 2, Name: "Name " + 2 },
                { ID: 3, Name: "Name " + 3 },
                { ID: 4, Name: "Name " + 4 }
            ]
        }
    },
    {
        html: getTitle('money', 'Lán/útgjöld'),
        data: {
            state: "CA",
            city: "San Francisco",
            street: "Stanford Ave",
        }
    },
    {
        html: getTitle('calculator', 'Útreikningur'),
        data: {
            state: "CA",
            city: "San Francisco",
            street: "Stanford Ave",
        }
    }
    ];

    $("#tabPanel").dxTabPanel({
        items: dataItems,
        height: document.documentElement.clientHeight - 1,
        itemTemplate: function (itemData, itemIndex, itemElement) {
            var content;
            switch (itemData.title) {
                case "Persónuupplýsingar":
                    content = InitCarData(itemData.data);
                    break;
                case "Börn":
                    content = InitEmergencyData(itemData.data);
                    break;
                case "Peningar":
                    content = InitAddressData(itemData.data);
                    break;
            }
            itemElement.append(content);
        }
    });

    function InitEmergencyData(data) {

        return $("#secondTab");
    }

    function InitAddressData(data) {
        $("#state").dxTextBox({
            value: data.state
        });
        $("#city").dxTextBox({
            value: data.city
        });
        $("#street").dxTextBox({
            value: data.street
        });
        return $("#thirdTab");
    }

    function InitCarData(data) {
        $("#firstName").dxTextBox({
            value: data.firstName
        });
        $("#lastName").dxTextBox({
            value: data.lastName
        });
        $("#birthYear").dxTextBox({
            value: data.birthYear
        });
        return $("#firstTab");
    }

});

function getTitle(icon, txt) {
    return '<table><tr><td><i class="fa fa-' + icon + ' lv-icon"></i></td><td style="padding-left:8px;">' + txt + '</td></tr></table>';
}