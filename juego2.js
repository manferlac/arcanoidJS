function elemento(){
	this.imgId;
	this.posx;
	this.posy;
	this.ancho;
	this.alto;
	this.div;
	
	this.dibuja = function(){
		this.div.style.left = this.posx+ "px";
		this.div.style.top = this.posy+ "px";
	}
	
	
	this.calcPos = function(){
	}
	
	this.crearC = function(im, x, y, anc, alt, cont){
		this.imgId = im;
		this.posx = x;
		this.posy = y;
		this.ancho = anc;
		this.alto = alt;
		this.div = cont;
	}
	
}

function Bola(id, x, y, anc, alt, dirx, diry, vx, vy, contenedor){
	this.direccionX = dirx;
	this.direccionY = diry;
	this.velocidadX = vx;
	this.velocidadY = vy;
	this.i = 1;
	
	this.crearC(id, x, y, anc, alt, contenedor);
	
	this.calcPos = function(contX, contY){
		if(this.direccionX == "der"){
			if(this.posx+this.velocidadX < contX){
				this.posx = this.posx + this.velocidadX;
			}
			else{
				this.direccionX = "izq";
			}
		}
		else{
			if(this.posx-this.velocidadX > 0){
				this.posx = this.posx - this.velocidadX;
			}
			else{
				this.direccionX = "der";
			}
		}
		
		if(this.direccionY == "down"){
			if(this.posy+this.velocidadY < contY){
				this.posy = this.posy + this.velocidadY;
			}
			else{
				this.direccionY = "up";
				document.getElementById("vida"+this.i).style.visibility="hidden";
				this.i+=1;
				this.posx=250;
				this.posy=250;
				this.direccionY="down";
				this.direccionX="der";
				this.velocidadX=3;
				this.velocidadY=3;
				if(this.i >3){
						
						alert("HAS PERDIDO");
						document.getElementById("bola").style.visibility="hidden";
						this.velocidadX=0;
						this.velocidadY=0;

				}
			}
		}
		else{
			if(this.posy-this.velocidadY > 0){
				this.posy = this.posy - this.velocidadY;
			}
			else{
				this.direccionY = "down";
			}
		}
	}
	
}

Bola.prototype = new elemento();

function Juego(){
	
	var ladrillos = new Array();
	var altura = 22;
	var anchura = 45;
	
	var puntuacion = 0;
	var con = 2*6;
	
	var bola1 = new Bola("bola", 220, 420, 18, 18, "izq", "up", 7, 7, document.getElementById("bola"));
	var barrita = new Barra("barra1", 200, 450, 90, 14, "der", 10, document.getElementById("barra1"));
	
	document.write('<div>');
	for (i=1; i<=2; i++){
		ladrillos[i] = new Array();
		for(j=1; j<=6; j++){
			document.write('<div id="l'+i+j+'"><img src="ladrillo.jpg"/></div>');
			var a = 'l'+i+j;
			ladrillos[i][j] = new ladrillo(a, (70*j), (35*i), anchura, altura, document.getElementById(a));
			ladrillos[i][j].dibuja();
		}
	}
	document.write('</div>');
	
	window.onkeydown = function(e){
		if (e.keyCode == 37){
			if(barrita.posx > 0)
				barrita.posx = barrita.posx-barrita.vel;
		}
		if (e.keyCode == 39){
			if(barrita.posx+barrita.vel+barrita.ancho <= 500)
				barrita.posx = barrita.posx+barrita.vel;
		}
	}
	
	this.bucle = function(){

		bola1.calcPos(500-bola1.ancho, 500-bola1.alto);
		bola1.dibuja();
		barrita.dibuja();
		this.choque(bola1, barrita);
		
		for(i=1; 1<=2; i++){
			for(j=1; j<=6; j++){
				this.choque(bola1, ladrillos[i][j]);
				if(ladrillos[i][j].choca && (document.getElementById(ladrillos[i][j].imgId).style.visibility != "hidden")){
					document.getElementById(ladrillos[i][j].imgId).style.visibility = "hidden";
					if(puntuacion<550){
					puntuacion = puntuacion + 50;
					document.getElementById("puntu").value = puntuacion;
					bola1.velocidadX=6;
					}
					else{
					alert("HAS GANADOO !!");
					document.getElementById("bola").style.visibility="hidden";
					document.getElementById("barra1").style.visibility="hidden";
					bola1.velocidadX=0;
					bola1.velocidadY=0;
					

					}
				}
			}
		}
		
	}
	
	
	this.choque = function(elem1, elem2){
		if (elem2.div.style.visibility != "hidden"){
			if (elem1.direccionX == "der"){
				if(((elem1.posx+elem1.ancho-elem1.velocidadX) < elem2.posx) && ((elem1.posx+elem1.ancho) >= elem2.posx) && (((elem1.posy+elem1.alto) >= elem2.posy) && (elem1.posy <= (elem2.posy+elem2.alto)))){
					elem1.direccionX = "izq";
					elem2.choca = true;
				}
			}
			else if(elem1.direccionX == "izq"){
				if(((elem1.posx+elem1.velocidadX) > (elem2.posx+elem2.ancho)) && ((elem1.posx) <= (elem2.posx+elem2.ancho)) && (((elem1.posy+elem1.alto) >= elem2.posy) && (elem1.posy <= (elem2.posy+elem2.alto)))){
					elem1.direccionX = "der";
					elem2.choca = true;
				}
			}
		
			if (elem1.direccionY == "down"){
				if(((elem1.posx+elem1.ancho) >= elem2.posx) && (elem1.posx <= (elem2.posx+elem2.ancho)) && ((elem1.posy+elem1.alto-elem1.velocidadY) < elem2.posy) && ((elem1.posy+elem1.alto) >= elem2.posy)){
					elem1.direccionY = "up";
					elem2.choca = true;
				}
			}
			else if (elem1.direccionY == "up"){
				if (((elem1.posx+elem1.ancho) >= elem2.posx) && (elem1.posx <= (elem2.posx+elem2.ancho)) && ((elem1.posy+elem1.velocidadY) >= (elem2.posy+elem2.alto)) && (elem1.posy <= (elem2.posy+elem2.alto))){
					elem1.direccionY = "down";
					elem2.choca = true;
				}
			}
		}
		
	}

}

function Barra(id, x, y, anc, alt, dir, v, contenedor){
	this.vel = v;
	this.posx = x;
	this.ancho = anc;
	
	this.choca = false;
	
	this.moverIzq = function(){
	 if(this.posx > 0)
		 this.posx = this.posx - this.vel;
	 }
	
	 this.moverDer = function(){
	  if(this.posx < 500-this.ancho-this.vel){
		 this.posx += this.vel;
	 
	 }
	 
	}
	
	
	this.crearC(id, x, y, anc, alt, contenedor);
}
Barra.prototype = new elemento();


function ladrillo(id, x, y, anc, alt, contenedor){
	this.choca = false;
	this.crearC(id, x, y, anc, alt, contenedor);
}
ladrillo.prototype = new elemento();

var juego = new Juego();
setInterval("juego.bucle()", 30);
