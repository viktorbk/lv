var Persona = {
	kyn: 1,
	kynTxt: function() { return this.kyn == 1 ? 'Karl' : 'Kona';},
	aldur: 20,
	aldurTxt: function() {return this.aldur + ' ára'},
	reykir: 2,
	jaNei: function(svar) { return svar == 1 ? 'Já' : 'Nei';},
	maki: 2,
	fjoldiBarna: 0,
	laun: 150000,
	skammtimaSkuldir: 10000,
	husnaedi: 2,
	erLeiga: function() {return this.husnaedi == 1},
	husnaediTxt: function() { return this.erLeiga() ? 'Leiguhúsnæði' : 'Eigin húsnæði';},
	husnaedisLan: 0,
	leiga: 0,
	husnaediLabel: function() {return this.erLeiga() ? 'Leiga á mánuði' : 'Afborganir á mánuði';},
	husnaediUpphaed: function() {return this.erLeiga() ? this.leiga : this.husnaedisLan;},
	kostnadur: function () {
	    var bornIndex = Math.min(5, this.fjoldiBarna);
		if (this.maki == 2)
			return Framfaersla.Einstaklingur[bornIndex];
		else
			return Framfaersla.Hjon[bornIndex];
	},
	kostnadurTxt: function(nr) {
		var kostn = this.kostnadur();
		var svar = numberWithDots(kostn[nr]);
		return svar + ' kr.';
	},
	afborganir: function() {
		var svar = this.skammtimaSkuldir;
		if (this.erLeiga())
			svar += this.leiga;
		else
			svar += this.husnaedisLan;
		return svar;
	},
	afborganirTxt: function() {
		return kronur(this.afborganir());
	},
	heildarKostn: function() {
		var svar = this.kostnadur()[7] + this.skammtimaSkuldir;
		svar += this.afborganir();
		return svar;
	},
	heildarKostnTxt: function() {
		return kronur(this.heildarKostn());
	},
	tilRadstofunar: function() {
		var svar = this.laun - this.heildarKostn();
		return kronur(svar);		
	},
	vernd: 50,
	verndAr: 2,
	sjukdomaVernd: 80,
    sjukdomaVerndAr: 2,
	liftrygging: function() {
		var svar = this.laun * this.vernd / 100.0;
		svar = svar * this.verndAr * 12;
		return svar;
	},
	lifIdgjald: function() {
		var idg = Liftrygging.Reyklaus[this.aldur];
		if (this.reykir == 1)
			idg = Liftrygging.Reykir[this.aldur];
		var upph = this.liftrygging() / 1000000.0;
		upph = Math.round(upph * idg);
		return upph;
	},
	sjukdomatrygging: function() {
		var svar = this.laun * this.sjukdomaVernd / 100.0;
		svar = svar * this.sjukdomaVerndAr * 12;	
		return svar;
	},
	sjukdomaIdgjald: function() {
		var idg = Sjukdomatrygging.Reyklaus[this.aldur];
		if (this.reykir == 1)
			idg = Sjukdomatrygging.Reykir[this.aldur];
		var upph = this.sjukdomatrygging() / 1000000.0;
		upph = Math.round(upph * idg);
		return upph;
	},
	idgjold: function() {
		var svar = this.lifIdgjald() + this.sjukdomaIdgjald();
		return svar;
	}
}

var Valkostir = {
	kyn: [
	    { text: "Karl", value: 1 },
	    { text: "Kona", value: 2 }
    ],
    jaNei: [
        { text: "Já",  value: 1 },
        { text: "Nei", value: 2 }
    ],
    husnaedi: [
        { text: "Leigi", value: 1 },
        { text: "Eigin húsnæði", value: 2 }
    ]
}