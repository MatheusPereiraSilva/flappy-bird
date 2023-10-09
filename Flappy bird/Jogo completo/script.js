var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var bird = new Image();
bird.src = 'images/bird.png';
var bg = new Image();
bg.src = 'images/bg.png';
var chao = new Image();
chao.src = 'images/chao.png';
var canocima = new Image();
canocima.src = 'images/canocima.png';
var canobaixo = new Image();
canobaixo.src = 'images/canobaixo.png';

var eec = 100;
var constant;
var bX = 33;
var bY = 200;
var gravidade = 1.3;
var score = 0;
var cano = [];

cano[0] = {
	x: canvas.width,
	y: 0 
}

var fly = new Audio()
fly.src = 'sounds/fly.mp3';
var scor = new Audio();
scor.src = 'sounds/score.mp3';

document.addEventListener('keydown', voa);

function voa() {
	bY -= 30;
	fly.play();
}

function jogo() {
	ctx.drawImage(bg, 0,0);
	ctx.drawImage(chao, 0, canvas.height - chao.height);

	for(let i = 0; i < cano.length; i++) {
		constant = canocima.height + eec;
		ctx.drawImage(canocima, cano[i].x, cano[i].y);
		ctx.drawImage(canobaixo, cano[i].x, cano[i].y+constant);
		cano[i].x = cano[i].x -1;
		if(cano[i].x == 125){
			cano.push({
				x: canvas.width,
				y: Math.floor(Math.random()*canocima.height)-canocima.height
			})
		}
		if(bX + bird.width >= cano[i].x && bX <= cano[i].x + canocima.width && (bY <= cano[i].y + canocima.height || bY + bird.height >= cano[i].y+constant) || bY + bird.height >= canvas.height - chao.height) {
			location.reload();
		}
		if(cano[i].x == 5) {
			score += 1;
			scor.play()
		}
	}

	ctx.drawImage(bird, bX, bY);
	bY += gravidade;
	ctx.fillStyle = '#000';
	ctx.font = '20px Verdana';
	ctx.fillText('Placar: ' + score, 10, canvas.height-20);
	requestAnimationFrame(jogo);
}

jogo();