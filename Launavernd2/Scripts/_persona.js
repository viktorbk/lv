var Persona = {
	kyn: 1,
	aldur: 20,
	reykir: 2,
	maki: 2,
	fjoldiBarna: 0,
	laun: 150000,
	makaLaun: 150000,
	skammtimaSkuldir: 0,
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
	afborganir: function() {
		var svar = this.skammtimaSkuldir;
		if (this.erLeiga())
			svar += this.leiga;
		else
			svar += this.husnaedisLan;
		return svar;
	},
	heildarKostn: function() {
		var svar = this.kostnadur()[7];
		svar += this.afborganir();
		return svar;
	},
	tilRadstofunar: function() {
	    var svar = this.laun - this.heildarKostn();
	    if (this.maki == 1)
	        svar += this.makaLaun;
		return svar;
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
		var fjoldiMilljona = this.liftrygging() / 1000000.0;
		var idgjaldPerAr = Math.round(fjoldiMilljona * idg);
		return idgjaldPerAr;
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
		var fjoldiMilljona = this.sjukdomatrygging() / 1000000.0;
		var idgjaldPerAr = Math.round(fjoldiMilljona * idg);
		return idgjaldPerAr;
	},
	idgjold: function() {
		var svar = this.lifIdgjald() + this.sjukdomaIdgjald();
		return svar;
	},
	tryggingTexti: function () {
	    return "Ég vil að fjölskylda mín haldi " + this.vernd + "% af núverandi launum mínum í " + this.verndAr + " ár ef ég fell frá.";
	},
	sjukdomaTryggingTexti: function () {
	    return "Ég vil halda " + this.sjukdomaVernd + "% af núverandi launum mínum í " + this.sjukdomaVerndAr + " ár ef ég greinist með illvígan sjúkdóm.";
	},
	borgaManadarlega: true,
	personImg: function () {
	    var mynd = "/Images/";
	    if (this.kyn == 1)
	        mynd += "man-";
	    else
	        mynd += "woman-";
	    var aldur = Math.round(this.aldur / 15);
	    mynd += aldur;
	    mynd += ".png";
	    return mynd;
	},
	houseImg: function () {
	    var mynd = "/Images/";
	    var kostnadur = 0;
	    if (this.husnaedi == 1) {
	        mynd += "leigu-";
	        kostnadur = this.leiga;
	    }
	    else {
	        mynd += "eigin-";
	        kostnadur = this.husnaedisLan;
	    }
	    kostnadur = Math.min(200000, kostnadur + 1);
	    var myndNr = Math.ceil((kostnadur) / 40000);
	    mynd += myndNr;
	    mynd += ".png";
	    return mynd;
	},
	reykirImg: function () {
	    var mynd = "/Images/";
	    if (this.reykir == 1)
	        mynd += "smoking.png";
	    else
	        mynd += "empty.png";
	    return mynd;
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