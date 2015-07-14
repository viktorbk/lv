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