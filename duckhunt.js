var pato = null;
var temporizador = null;
var intervaloActualizacao = 10;
var incremento = 1; 

var topo = 0; //Posição vertical
var topo_dir_num = 0; //Numero de passos da deslocação vertical
var topo_dir = 0; //Direção da deslocação vertical
var esquerda = 0; //Posição Horizontal
var num_tiros = 3;
var num_patos_falhados = 0;
var num_patos_atingidos = 0;
var num_patos_total = 0;

function mover(){
	//Movimento vertical
	if(topo_dir_num-- <= 0)
	{
		topo_dir = (Math.random()-0.5) * incremento;
		topo_dir_num = Math.random()*300;
	}

	//Limite superior e inferior
	if(topo <= 0 || (topo+64) >= window.innerHeight){
		topo_dir *=-1;
	}

	topo += topo_dir;

	//Incrementar posicao horizontal
	esquerda += incremento;

	//FIM?
	if (esquerda >= window.innerWidth)
	{
		//Chegou ao fim
		num_patos_falhados += 1;
		atualizaResultados();
		removePato()
		setTimeout(novoPato,2000 * Math.random());
	}else{
		//Ainda não
		pato.style.left = esquerda+"px"; 
		pato.style.top = topo + "px";
	}

}

function resetBg(){
	bg = document.getElementById("bg");
	bg.style.filter = "invert(0)";
}
function flickBg(){
	bg = document.getElementById("bg");
	bg.style.filter = "invert(1)";
	setTimeout(resetBg, 100);
}

function clickPato(){	
	removePato();
	incremento = incremento + 0.5; 
	setTimeout(novoPato,2000 * Math.random());
	num_patos_atingidos += 1;
	atualizaResultados();
}

function removePato(){
	pato.style.display = "none";
	clearInterval(temporizador);
}

function atualizaResultados(){
	score = document.getElementById("score");
	score.innerHTML = "Falhados: " + num_patos_falhados + " Atingidos: " + num_patos_atingidos;
}

function novoPato(){
	esquerda = -64;
	topo = Math.random()*(window.innerHeight-200)+100;
	topo_dir_count = 0;
	pato.style.display = "block";
	pato.style.left = esquerda+"px";
	pato.style.top = topo+"px";
	pato.onclick = clickPato;
	temporizador = setInterval(mover, intervaloActualizacao);	
}


function inicio(){
	pato = document.getElementById("alvo");
	setTimeout(novoPato,2000 * Math.random());
}
