{
	var map = [
	["M","M","M","M","M","M","M","M"],
	["M","_","_","M","M","_","_","M"],
	["M","_","_","M","_","M","_","M"],
	["M","_","_","P","M","_","_","M"],
	["M","_","_","_","_","_","M","M"],
	["M","_","_","M","_","M","_","M"],
	["M","_","_","M","_","_","_","M"],
	["M","_","_","M","_","M","_","M"],
	["M","_","M","M","_","M","_","M"],
	["M","_","_","M","_","M","S","M"],
	["M","M","M","M","M","M","M","M"]
	];
	var taillemurs = 3,
		block 	= "%c",
		pos_x = 3,
		pos_y = 3, 
		direction = '', 
		couleurmurs 	= "#000",
		couleursols 	= "#f40",
		couleurjoueur 	= "#f80",
		couleursortie 	= "#b4d455";
	for(var i = 0; !(i == taillemurs); i++){
		block += " ";
	}
	setInterval(GameLoop,1000/30);
	
	window.document.onkeydown = function(e){
		if(e.keyCode == 38){
			direction = 'haut';
		}
		
		if(e.keyCode == 37){
			direction = 'gauche';
		}
		
		if(e.keyCode == 39){
			direction = 'droite';
		}
		 
		 if(e.keyCode == 40){
			direction ='bas';
		}
	};	
}

function GameLoop(){
	MovePlayer(direction);
	DrawMap();
	direction = 'neutre'; 
	
}

function MovePlayer(input){
	
	if(input != '')
	{
		map[pos_y][pos_x] = "_"; 
		switch(input)
		{
			case 'haut':
			{	
				if(	map[pos_y-1][pos_x]!='M')
				{
					pos_y = pos_y -1;
				}	
			
				break;
			}
			case'bas':
			{
				if(map[pos_y+1][pos_x] !='M'){
					pos_y = pos_y+1; 
				
				}
				break;
			}	
			case'gauche': 
			{
			if(map[pos_y][pos_x-1] !='M'){
					pos_x = pos_x-1; 
			}
			
				break;
			}	
			case'droite':
			{
				if(map[pos_y][pos_x+1]!='M'){
					pos_x = pos_x + 1;		
				}
				
			 
				break;
			}	
		}
		map[pos_y][pos_x] = "P"; 
	}
}

function DrawMap(){
	//prévoir un espace pour les cases vides
	//un bloc noir pour les murs console.log("%c ","background: #000")
	//une lettre verte pour le joueur
	var	tablcss = [],
		ligne = "",
		casecourante = 0,
		lignecourante = 0;
		
	while(true){
		casecourante = 0;
		//ligne = "";
		//tablcss = [];
		
		while(true){
			ligne += block;
			if(map[lignecourante][casecourante]=="M"){
				tablcss.push("background : " + couleurmurs);
			}
			if(map[lignecourante][casecourante]=="_"){
				tablcss.push("background : " + couleursols);
			}
			if(map[lignecourante][casecourante]=="P"){
				tablcss.push("background : " + couleurjoueur);
			}
			if(map[lignecourante][casecourante]=="S"){
				tablcss.push("background : " + couleursortie);
			}
			casecourante++;
			if(casecourante == map[lignecourante].length){
				break;
			}
		}
		
		
		lignecourante++;
		ligne += "\n";
		
		if(lignecourante == map.length){	
			break;
		}
	}
	
	console.log(ligne, ...tablcss);
}