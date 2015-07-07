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
}
