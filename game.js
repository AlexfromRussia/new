function Game(gameContainer, width, height) {
	this.data = undefined;
	this.hod = 0;
	this.gameContainer = gameContainer;
	this.width = width;
	this.height = height;
	this.createFields();

};
Game.prototype.createFields = function() {
	this.data=new Array(this.width); 
	var root = document.createElement("div");

	for (var i=0;i<this.width;i++)  {
		var row = document.createElement("div");
		row.className = "row";
		root.appendChild(row);
		for ( var j=0; j < this.height; j++) {
			var cell = document.createElement("div");
			cell.className = "block";
			row.appendChild(cell);
			cell.onclick = this.bindBlockClick (i, j);
		}
		this.data[i]=new Array(this.height);
	}
	this.gameContainer.appendChild(root);
}
Game.prototype.bindBlockClick = function (i, j) {
	return function () {
		if (this.hod%2==0) {
			event.target.innerHTML = 'x';
			this.data [i][j] = 1;
		}
		else {
			event.target.innerHTML = '0';
			this.data [i][j] = 2;
		}
		this.hod++;
		this.checkWinner();
	}.bind(this); 
}
Game.prototype.checkWinner = function () {
	for ( i = 0; i < this.data.length; i++) {
		var hasWinner = this.data[i][0] != undefined;
		for ( j = 1; j < this.data[i].length; j++) {
			if(this.data[i][j] != this.data[i][j-1]) {
				hasWinner = false
			}
		}
		if (hasWinner) this.showWinner (this.data[i][0]);
	}
	for ( i = 0; i < this.data.length; i++) {
		var hasWinner = this.data[0][i] != undefined;
		for ( j = 1; j < this.data.length; j++) {
			if(this.data[j][i] != this.data[j-1][i]) {
				hasWinner = false
			}
		}
		if (hasWinner) this.showWinner (this.data[0][i]);
	}
	var hasWinner = this.data[0][0] != undefined;
	for ( i = 1; i < this.data.length; i++) {
		if(this.data[i-1][i-1] != this.data[i][i]) {
			hasWinner = false
		}
	}
	if (hasWinner) this.showWinner (this.data[0][0]);	
	
	var hasWinner = this.data[this.data.length - 1][0] != undefined;
	for ( i = 1; i < this.data.length; i++) {
		if(this.data[this.data.length-i][i-1] != this.data[this.data.length-1-i][i]) {
			hasWinner = false
		}
	}
	if (hasWinner) this.showWinner (this.data[this.data.length-1][0]);	
}
Game.prototype.showWinner = function (indicator) {
	alert('winner'+indicator);
};

