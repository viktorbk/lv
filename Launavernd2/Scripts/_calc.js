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
        Framfaersla = FramfaerslaOriginal;
        initEditables();
    });

    // eyði út ediables ef til fyrir
    $(".editable").each(function(obj) {$(this).editable('destroy')})

    $('#xaldur').editable({
    type: 'number',
    value: Persona.aldur,
    success: function(response, newValue) {
        Persona.aldur = newValue;
        window.tabPanel.repaint();
        initEditables();
    }
    });   
    $('#xborn').editable({
        type: 'number',
        value: Persona.fjoldiBarna,
        success: function(response, newValue) {
            Persona.fjoldiBarna = newValue;
            window.tabPanel.repaint();
            initEditables();
        }
    });  
    $('#xlaun').editable({
        type: 'text',
        value: Persona.laun,
        success: function(response, newValue) {
            Persona.laun = Number(newValue);
            window.tabPanel.repaint();
            initEditables();
        }
    });
    $('#xmakalaun').editable({
        type: 'text',
        value: Persona.makaLaun,
        success: function (response, newValue) {
            Persona.makaLaun = Number(newValue);
            window.tabPanel.repaint();
            initEditables();
        }
    });
    $('#xmatur').editable({
        type: 'text',
        value: Persona.kostnadur()[0],
        success: function (response, newValue) {
            breytaFramfaersluGildi(0, Number(newValue));
            window.tabPanel.repaint();
            initEditables();
        }
    });
    $('#xfot').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(1),
        success: function (response, newValue) {
            breytaFramfaersluGildi(1, Number(newValue));
            window.tabPanel.repaint();
            initEditables();
        }
    });
    $('#xlaeknis').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(2),
        success: function (response, newValue) {
            breytaFramfaersluGildi(2, Number(newValue));
            window.tabPanel.repaint();
            initEditables();
        }
    });
    $('#xtomstundir').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(3),
        success: function (response, newValue) {
            breytaFramfaersluGildi(3, Number(newValue));
            window.tabPanel.repaint();
            initEditables();
        }
    });
    $('#xsamskipti').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(4),
        success: function (response, newValue) {
            breytaFramfaersluGildi(4, Number(newValue));
            window.tabPanel.repaint();
            initEditables();
        }
    });
    $('#xþjonusta').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(5),
        success: function (response, newValue) {
            breytaFramfaersluGildi(5, Number(newValue));
            window.tabPanel.repaint();
            initEditables();
        }
    });
    $('#xsamgongur').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(6),
        success: function (response, newValue) {
            breytaFramfaersluGildi(6, Number(newValue));
            window.tabPanel.repaint();
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
    var b = $("#bornInfoWindow").dxPopover({
        target: '#bornInfo',
        width: '200',
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
    $("#bornInfo").unbind().hover(function () { b.show(); }, function () { b.hide(); });
}

function initInfo2() {
    var b = $("#skammtimaskuldirInfoWindow").dxPopover({
        target: '#skammtimaskuldirInfo',
        width: '200',
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
    $("#skammtimaskuldirInfo").unbind().hover(function () { b.show() }, function () { b.hide() });
}