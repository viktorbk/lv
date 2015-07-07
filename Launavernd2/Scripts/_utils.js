function numberWithDots(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function kronur(x) {
	return numberWithDots(x) + ' kr.';
}