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
    });

    // eyði út ediables ef til fyrir
    $(".editable").each(function(obj) {$(this).editable('destroy')})

    $('#xaldur').editable({
    type: 'text',
    value: Persona.aldur,
    success: function(response, newValue) {
        Persona.aldur = newValue;
    }
    });   
    $('#xborn').editable({
        type: 'text',
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
            Persona.laun = newValue;
            window.tabPanel.repaint();
            initEditables();
        }
    });
    $('#xmatur').editable({
        type: 'text',
        value: Persona.kostnadur()[0],
        success: function (response, newValue) {
            breytaFramfaersluGildi(0, newValue);
            window.tabPanel.repaint();
            initEditables();
        }
    });
    $('#xfot').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(1),
        success: function (response, newValue) {
            breytaFramfaersluGildi(1, newValue);
            window.tabPanel.repaint();
            initEditables();
        }
    });
    $('#xlaeknis').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(2),
        success: function (response, newValue) {
            breytaFramfaersluGildi(2, newValue);
            window.tabPanel.repaint();
            initEditables();
        }
    });
    $('#xtomstundir').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(3),
        success: function (response, newValue) {
            breytaFramfaersluGildi(3, newValue);
            window.tabPanel.repaint();
            initEditables();
        }
    });
    $('#xsamskipti').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(4),
        success: function (response, newValue) {
            breytaFramfaersluGildi(4, newValue);
            window.tabPanel.repaint();
            initEditables();
        }
    });
    $('#xþjonusta').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(5),
        success: function (response, newValue) {
            breytaFramfaersluGildi(5, newValue);
            window.tabPanel.repaint();
            initEditables();
        }
    });
    $('#xsamgongur').editable({
        type: 'text',
        value: saekjaFramfaersluGildi(6),
        success: function (response, newValue) {
            breytaFramfaersluGildi(6, newValue);
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