<<<<<<< HEAD
var height = $( document ).height();
var width = $( document ).width();

function magie(){
   localStorage.setItem('record', 35); 
}

setInterval(function(){ 
    var record = localStorage.getItem('record');
    $('#record').text(record); 
}, 500);

$( "#ferme" ).click(function() {
  $('#credit').addClass('dispnone');
});

$( "#return_2" ).click(function() {
  $('#credit').addClass('dispnone');
});

$( "#play" ).click(function() {
  $('#menu').addClass('dispnone');
  $('body').removeClass('bg_img');
  $('#canvas-play').removeClass('dispnone');
  game();
});

$( "#credits" ).click(function() {
  $('.lien').addClass('dispnone');
  $('#record_echo').addClass('dispnone');
  $('.touche').addClass('dispnone');
  $('#credit').removeClass('dispnone');
});


function game(){
// main.js
var game = new Phaser.Game(width, height, Phaser.AUTO, 'canvas-play');

var timer;
var total = 0;
var molecule;
var applaudissement;
var m_fond;
var walls; // Contiendra le groupe de murs

var map = [
                  ["M","M","M","M","M","M","X","X","X","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M"],
                  ["M","_","_","_","_","_","X","_","X","X","X","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M"],
                  ["M","M","M","M","M","M","X","_","_","_","X","M","M","X","X","X","M","M","M","M","M","M","M","M","M","M","M","M","M"],
                  ["M","M","M","M","M","_","X","X","X","_","X","M","M","X","_","X","X","X","M","M","M","M","M","M","M","M","M","M","M"],
                  ["M","M","X","X","X","X","X","X","_","_","X","M","M","X","_","_","_","X","M","M","M","X","X","X","X","X","M","M","M"],
                  ["M","M","X","_","_","_","X","_","_","X","X","M","M","X","X","X","_","X","X","X","X","_","_","F","_","X","M","M","M"],
                  ["M","M","X","_","X","_","_","P","X","X","X","M","M","M","M","X","_","_","_","_","M","_","X","X","_","X","M","M","M"],
                  ["M","M","X","_","X","X","X","X","X","_","X","M","M","M","M","X","X","X","_","X","M","X","X","X","_","X","M","M","M"],
                  ["M","X","X","_","X","M","M","M","X","_","X","M","M","M","M","M","X","X","_","X","X","X","_","_","_","X","M","M","M"],
                  ["X","X","_","P","X","X","X","X","X","_","X","X","X","X","X","X","X","_","_","X","M","X","_","X","X","X","X","M","M"],
                  ["X","_","_","X","_","_","_","X","X","_","X","X","_","_","_","X","X","_","X","X","M","X","_","_","_","_","X","M","M"],
                  ["X","_","X","X","_","X","_","_","_","_","_","_","_","X","_","X","X","P","X","X","M","X","X","X","X","_","X","M","M"],
                  ["X","_","_","_","_","X","X","X","X","_","X","X","X","X","_","_","_","_","_","X","M","M","M","M","X","_","X","X","X"],
                  ["X","X","X","X","X","X","M","M","X","_","X","M","M","X","X","X","_","X","X","X","X","X","X","X","X","_","_","_","X"],
                  ["M","M","M","M","X","X","X","X","X","_","X","M","M","M","M","X","_","X","X","X","_","_","_","_","_","_","X","_","X"],
                  ["M","M","M","M","X","_","_","_","_","_","X","M","M","M","M","X","_","X","_","X","_","X","X","X","X","X","X","_","X"],
                  ["X","X","X","X","X","_","X","_","X","X","X","X","X","X","X","X","_","_","_","X","_","_","X","M","M","M","X","_","X"],
                  ["X","_","X","_","_","_","X","_","X","X","X","X","_","_","_","_","_","X","X","X","X","_","X","X","X","X","X","_","X"],
                  ["X","_","X","X","X","_","_","_","_","_","X","X","_","X","X","X","X","X","X","X","_","_","_","_","_","X","X","_","X"],
                  ["X","_","_","X","X","X","X","X","X","_","_","_","_","X","X","X","X","_","_","_","_","X","X","X","_","X","X","X","X"],
                  ["X","_","_","X","X","X","X","X","X","_","X","X","_","X","X","_","_","_","X","X","X","X","X","X","_","X","M","M","M"],
                  ["X","_","X","X","X","_","_","_","X","_","X","X","_","_","_","_","X","X","X","M","M","X","_","_","_","X","M","M","M"],
                  ["X","_","_","X","X","_","X","_","X","_","X","X","X","X","X","_","X","X","X","X","M","X","X","X","_","X","X","X","M"],
                  ["X","X","_","X","X","_","X","_","_","_","X","M","M","M","X","_","_","_","_","X","M","M","M","X","_","_","_","X","M"],
                  ["M","X","_","_","_","D","X","X","X","X","X","M","M","M","X","X","X","X","_","X","M","M","M","X","X","X","X","X","M"],
                  ["M","X","X","X","X","X","X","M","M","M","M","M","M","M","M","M","M","X","_","X","M","M","M","M","M","M","M","M","M"],
                  ["M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","X","X","X","M","M","M","M","M","M","M","M","M"],


        ];

        var map1 = [
                  ["M","M","M","M","M","M","X","X","X","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M"],
                  ["M","_","_","_","_","_","X","_","X","X","X","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M"],
                  ["M","M","M","M","M","M","X","_","_","_","X","M","M","X","X","X","M","M","M","M","M","M","M","M","M","M","M","M","M"],
                  ["M","M","M","M","M","_","X","X","X","F","X","M","M","X","_","X","X","X","M","M","M","M","M","M","M","M","M","M","M"],
                  ["M","M","X","X","X","X","X","X","_","_","X","M","M","X","_","_","_","X","M","M","M","X","X","X","X","X","M","M","M"],
                  ["M","M","X","_","_","_","X","_","_","X","X","M","M","X","X","X","_","X","X","X","X","_","_","_","_","X","M","M","M"],
                  ["M","M","X","_","X","_","_","P","X","X","X","M","M","M","M","X","_","_","_","_","M","_","X","X","_","X","M","M","M"],
                  ["M","M","X","_","X","X","X","X","X","_","X","M","M","M","M","X","X","X","_","X","M","X","X","X","_","X","M","M","M"],
                  ["M","X","X","_","X","M","M","M","X","_","X","M","M","M","M","M","X","X","_","X","X","X","_","_","_","X","M","M","M"],
                  ["X","X","_","P","X","X","X","X","X","_","X","X","X","X","X","X","X","_","_","X","M","X","_","X","X","X","X","M","M"],
                  ["X","_","_","X","_","_","_","X","X","_","X","X","_","_","_","X","X","_","X","X","M","X","_","_","_","_","X","M","M"],
                  ["X","_","X","X","_","X","_","_","_","_","_","_","_","X","_","X","X","P","X","X","M","X","X","X","X","_","X","M","M"],
                  ["X","_","_","_","_","X","X","X","X","_","X","X","X","X","_","_","_","_","_","X","M","M","M","M","X","_","X","X","X"],
                  ["X","X","X","X","X","X","M","M","X","_","X","M","M","X","X","X","_","X","X","X","X","X","X","X","X","_","_","_","X"],
                  ["M","M","M","M","X","X","X","X","X","_","X","M","M","M","M","X","_","X","X","X","_","_","_","_","_","_","X","_","X"],
                  ["M","M","M","M","X","_","_","_","_","_","X","M","M","M","M","X","_","X","_","X","_","X","X","X","X","X","X","_","X"],
                  ["X","X","X","X","X","_","X","_","X","X","X","X","X","X","X","X","_","_","_","X","_","_","X","M","M","M","X","_","X"],
                  ["X","_","X","_","_","_","X","_","X","X","X","X","_","_","_","_","_","X","X","X","X","_","X","X","X","X","X","_","X"],
                  ["X","_","X","X","X","_","_","_","_","_","X","X","_","X","X","X","X","X","X","X","_","_","_","_","_","X","X","_","X"],
                  ["X","_","_","X","X","X","X","X","X","_","_","_","_","X","X","X","X","_","_","_","_","X","X","X","_","X","X","X","X"],
                  ["X","_","_","X","X","X","X","X","X","_","X","X","_","X","X","_","_","_","X","X","X","X","X","X","_","X","M","M","M"],
                  ["X","_","X","X","X","_","_","_","X","_","X","X","_","_","_","_","X","X","X","M","M","X","_","_","_","X","M","M","M"],
                  ["X","_","_","X","X","_","X","_","X","_","X","X","X","X","X","_","X","X","X","X","M","X","X","X","_","X","X","X","M"],
                  ["X","X","_","X","X","_","X","_","_","_","X","M","M","M","X","_","_","_","_","X","M","M","M","X","_","_","_","X","M"],
                  ["M","X","_","_","_","D","X","X","X","X","X","M","M","M","X","X","X","X","_","X","M","M","M","X","X","X","X","X","M"],
                  ["M","X","X","X","X","X","X","M","M","M","M","M","M","M","M","M","M","X","_","X","M","M","M","M","M","M","M","M","M"],
                  ["M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","X","X","X","M","M","M","M","M","M","M","M","M"],


        ];

         var map2 = [
                  ["M","M","M","M","M","M","X","X","X","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M"],
                  ["M","_","_","_","_","_","X","_","X","X","X","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M"],
                  ["M","M","M","M","M","M","X","_","_","_","X","M","M","X","X","X","M","M","M","M","M","M","M","M","M","M","M","M","M"],
                  ["M","M","M","M","M","_","X","X","X","X","X","M","M","X","_","X","X","X","M","M","M","M","M","M","M","M","M","M","M"],
                  ["M","M","X","X","X","X","X","X","_","_","X","M","M","X","_","_","_","X","M","M","M","X","X","X","X","X","M","M","M"],
                  ["M","M","X","_","_","_","X","_","_","X","X","M","M","X","X","X","_","X","X","X","X","_","_","_","_","X","M","M","M"],
                  ["M","M","X","_","X","_","_","P","X","X","X","M","M","M","M","X","_","_","_","_","M","_","X","X","_","X","M","M","M"],
                  ["M","M","X","_","X","X","X","X","X","_","X","M","M","M","M","X","X","X","_","X","M","X","X","X","_","X","M","M","M"],
                  ["M","X","X","_","X","M","M","M","X","_","X","M","M","M","M","M","X","X","_","X","X","X","_","_","_","X","M","M","M"],
                  ["X","X","_","P","X","X","X","X","X","_","X","X","X","X","X","X","X","_","_","X","M","X","_","X","X","X","X","M","M"],
                  ["X","F","_","X","_","_","_","X","X","_","X","X","_","_","_","X","X","_","X","X","M","X","_","_","_","_","X","M","M"],
                  ["X","_","X","X","_","X","_","_","_","_","_","_","_","X","_","X","X","P","X","X","M","X","X","X","X","_","X","M","M"],
                  ["X","_","_","_","_","X","X","X","X","_","X","X","X","X","_","_","_","_","_","X","M","M","M","M","X","_","X","X","X"],
                  ["X","X","X","X","X","X","M","M","X","_","X","M","M","X","X","X","_","X","X","X","X","X","X","X","X","_","_","_","X"],
                  ["M","M","M","M","X","X","X","X","X","_","X","M","M","M","M","X","_","X","X","X","_","_","_","_","_","_","X","_","X"],
                  ["M","M","M","M","X","_","_","_","_","_","X","M","M","M","M","X","_","X","_","X","_","X","X","X","X","X","X","_","X"],
                  ["X","X","X","X","X","_","X","_","X","X","X","X","X","X","X","X","_","_","_","X","_","_","X","M","M","M","X","_","X"],
                  ["X","_","X","_","_","_","X","_","X","X","X","X","_","_","_","_","_","X","X","X","X","_","X","X","X","X","X","_","X"],
                  ["X","_","X","X","X","_","_","_","_","_","X","X","_","X","X","X","X","X","X","X","_","_","_","_","_","X","X","_","X"],
                  ["X","_","_","X","X","X","X","X","X","_","_","_","_","X","X","X","X","_","_","_","_","X","X","X","_","X","X","X","X"],
                  ["X","_","_","X","X","X","X","X","X","_","X","X","_","X","X","_","_","_","X","X","X","X","X","X","_","X","M","M","M"],
                  ["X","_","X","X","X","_","_","_","X","_","X","X","_","_","_","_","X","X","X","M","M","X","_","_","_","X","M","M","M"],
                  ["X","_","_","X","X","_","X","_","X","_","X","X","X","X","X","_","X","X","X","X","M","X","X","X","_","X","X","X","M"],
                  ["X","X","_","X","X","_","X","_","_","_","X","M","M","M","X","_","_","_","_","X","M","M","M","X","_","_","_","X","M"],
                  ["M","X","_","_","_","D","X","X","X","X","X","M","M","M","X","X","X","X","_","X","M","M","M","X","X","X","X","X","M"],
                  ["M","X","X","X","X","X","X","M","M","M","M","M","M","M","M","M","M","X","_","X","M","M","M","M","M","M","M","M","M"],
                  ["M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","X","X","X","M","M","M","M","M","M","M","M","M"],


        ];



var main_state = {

    preload: function() { 
        game.load.image("background", "assets/background.png");
        game.load.image('molecule', 'assets/molecule.png');
        game.load.image('mur', 'assets/wall.png');
        game.load.image('mur_b', 'assets/wall2.png');
        game.load.audio('applaudissement', ['assets/audio/applaudissement.mp3']);
        game.load.audio('gb_ms', ['assets/audio/HEARTBEAT.mp3']);
    },

    create: function() {

    	//Audio
	m_fond = game.add.audio('gb_ms');
	applaudissement = game.add.audio('applaudissement');
	m_fond.play();
        // Démarrage du système de collision de type ARCADE (simple)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Définition de la taille du world (zone de jeu complète)
        game.world.setBounds(0, 0, 1920, 1920);

        // Ajout du sprite de fond qui se répète
       game.add.tileSprite(0, 0, 4000, 4000, 'background');

       // Ajout d'un groupe de mur
        walls = game.add.group();
        walls.enableBody = true;

        // Ajout du groupe de mur sortie
        wall_exit = game.add.group();
        wall_exit.enableBody = true;
        var nb = Math.floor(Math.random() * 3);
        console.log(nb);
        if(nb == 1){
          // Parcours du tableau de la map en Y (vertical)
            for (var y = 0; y < map1.length; y++) {
                for (var x = 0; x < map1[y].length; x++) {
                    if (map1[y][x] === 'X') { // Si c'est un mur
                        walls.create(x*80,y*80, 'mur'); // Multiplié par 80 car 80px c'est la largeur/hauteur de l'image du mur
                    }
                    if (map1[y][x] === 'F') { // Si c'est un mur
                        wall_exit.create(x*80,y*80, 'mur_b'); // Multiplié par 80 car 80px c'est la largeur/hauteur de l'image du mur
                    }
                } 
            }
        }
        else if(nb == 2){
          // Parcours du tableau de la map en Y (vertical)
            for (var y = 0; y < map2.length; y++) {
                for (var x = 0; x < map2[y].length; x++) {
                    if (map2[y][x] === 'X') { // Si c'est un mur
                        walls.create(x*80,y*80, 'mur'); // Multiplié par 80 car 80px c'est la largeur/hauteur de l'image du mur
                    }
                    if (map2[y][x] === 'F') { // Si c'est un mur
                        wall_exit.create(x*80,y*80, 'mur_b'); // Multiplié par 80 car 80px c'est la largeur/hauteur de l'image du mur
                    }
                } 
            }
        }
        else{
          // Parcours du tableau de la map en Y (vertical)
            for (var y = 0; y < map.length; y++) {
                for (var x = 0; x < map[y].length; x++) {
                    if (map[y][x] === 'X') { // Si c'est un mur
                        walls.create(x*80,y*80, 'mur'); // Multiplié par 80 car 80px c'est la largeur/hauteur de l'image du mur
                    }
                    if (map[y][x] === 'F') { // Si c'est un mur
                        wall_exit.create(x*80,y*80, 'mur_b'); // Multiplié par 80 car 80px c'est la largeur/hauteur de l'image du mur
                    }
                } 
            }
        }
       // Ajout du joueur principal 'molecule'
        molecule = game.add.sprite(440, 1920, 'molecule');
        molecule.anchor.setTo(0.5, 0.5); 
        // La camera suivra les déplacements du joueur
        game.camera.follow(molecule);
        game.camera.deadzone = new Phaser.Rectangle(100, 100, 400, 250);

        // Système physique
        // ===============

        // Activation de la physX sur le joueur
        game.physics.enable(molecule, Phaser.Physics.ARCADE);
        // Indique que le joueur ne pourra pas sortir des limites du game.world
        molecule.body.collideWorldBounds = true;
        molecule.body.setSize(molecule.width * 0.92, molecule.height * 0.92);
        // Indique que le mur reste fixe s'il se fait toucher par un autre body
        walls.forEachAlive(function (member) {
            member.body.immovable = true;
        }, this);

        // Indique que la sortie n'est pas fixe
        wall_exit.forEachAlive(function (member) {
            member.body.immovable = true;
        }, this);
        
        //  Create our Timer
    timer = game.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    timer.loop(2000, updateCounter, this);

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timer.start();
    function updateCounter() {
    	total++;
     }
},


    update: function () {

        // ====================
        // Vérification des collisions
        // ====================

        // Mur 1 VS Joueur
        game.physics.arcade.collide(walls, molecule , function() {}, null, this);

           // Exit VS Joueur
        game.physics.arcade.collide(wall_exit, molecule , function() { 
                molecule.kill();
                applaudissement.play();
                m_fond.stop();
                timer.stop();
                var record = localStorage.getItem('record')
                if (record >= total) {
                    localStorage.setItem('record', total);
                }
                setTimeout(function(){ window.location.reload(); }, 2500);
        }, null, this);

        // ====================
        // Déplacement du joueur
        // ====================

        molecule.body.velocity.x = 0;
        molecule.body.velocity.y = 0;

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            molecule.body.velocity.x = -300;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            molecule.body.velocity.x = 300;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
           molecule.body.velocity.y = -300;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
           molecule.body.velocity.y = 300;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
           molecule.reset(440,1920);
        }

    },

    render: function() {
        // Parcours de tous les membres du groupe pour afficher leur debug
        walls.forEachAlive(function (member) {
                /*game.debug.body(member);*/
        }, this);
       /* game.debug.body(molecule);*/
        game.debug.text('Time : ' + total+' secondes', 32, 64);
    }
};


game.state.add('main', main_state);  
game.state.start('main');  
=======
var height = $( document ).height();
var width = $( document ).width();
setInterval(function(){ 
    var record = localStorage.getItem('record');
    $('#record').text(record); 
}, 500);

$( "#play" ).click(function() {
  $('#menu').addClass('dispnone');
  $('body').removeClass('bg_img');
  $('#canvas-play').removeClass('dispnone');
  game();
});

function game(){
// main.js
var game = new Phaser.Game(width, height, Phaser.AUTO, 'canvas-play');

var timer;
var total = 0;
var molecule;
var applaudissement;
var m_fond;
var walls; // Contiendra le groupe de murs

var map = [
                  ["M","M","M","M","M","M","X","X","X","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M"],
                  ["M","_","_","_","_","_","X","_","X","X","X","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M"],
                  ["M","M","M","M","M","M","X","_","_","_","X","M","M","X","X","X","M","M","M","M","M","M","M","M","M","M","M","M","M"],
                  ["M","M","M","M","M","_","X","X","X","_","X","M","M","X","_","X","X","X","M","M","M","M","M","M","M","M","M","M","M"],
                  ["M","M","X","X","X","X","X","X","_","_","X","M","M","X","_","_","_","X","M","M","M","X","X","X","X","X","M","M","M"],
                  ["M","M","X","_","_","_","X","_","_","X","X","M","M","X","X","X","_","X","X","X","X","_","_","F","_","X","M","M","M"],
                  ["M","M","X","_","X","_","_","P","X","X","X","M","M","M","M","X","_","_","_","_","M","_","X","X","_","X","M","M","M"],
                  ["M","M","X","_","X","X","X","X","X","_","X","M","M","M","M","X","X","X","_","X","M","X","X","X","_","X","M","M","M"],
                  ["M","X","X","_","X","M","M","M","X","_","X","M","M","M","M","M","X","X","_","X","X","X","_","_","_","X","M","M","M"],
                  ["X","X","_","P","X","X","X","X","X","_","X","X","X","X","X","X","X","_","_","X","M","X","_","X","X","X","X","M","M"],
                  ["X","_","_","X","_","_","_","X","X","_","X","X","_","_","_","X","X","_","X","X","M","X","_","_","_","_","X","M","M"],
                  ["X","_","X","X","_","X","_","_","_","_","_","_","_","X","_","X","X","P","X","X","M","X","X","X","X","_","X","M","M"],
                  ["X","_","_","_","_","X","X","X","X","_","X","X","X","X","_","_","_","_","_","X","M","M","M","M","X","_","X","X","X"],
                  ["X","X","X","X","X","X","M","M","X","_","X","M","M","X","X","X","_","X","X","X","X","X","X","X","X","_","_","_","X"],
                  ["M","M","M","M","X","X","X","X","X","_","X","M","M","M","M","X","_","X","X","X","_","_","_","_","_","_","X","_","X"],
                  ["M","M","M","M","X","_","_","_","_","_","X","M","M","M","M","X","_","X","_","X","_","X","X","X","X","X","X","_","X"],
                  ["X","X","X","X","X","_","X","_","X","X","X","X","X","X","X","X","_","_","_","X","_","_","X","M","M","M","X","_","X"],
                  ["X","_","X","_","_","_","X","_","X","X","X","X","_","_","_","_","_","X","X","X","X","_","X","X","X","X","X","_","X"],
                  ["X","_","X","X","X","_","_","_","_","_","X","X","_","X","X","X","X","X","X","X","_","_","_","_","_","X","X","_","X"],
                  ["X","_","_","X","X","X","X","X","X","_","_","_","_","X","X","X","X","_","_","_","_","X","X","X","_","X","X","X","X"],
                  ["X","_","_","X","X","X","X","X","X","_","X","X","_","X","X","_","_","_","X","X","X","X","X","X","_","X","M","M","M"],
                  ["X","_","X","X","X","_","_","_","X","_","X","X","_","_","_","_","X","X","X","M","M","X","_","_","_","X","M","M","M"],
                  ["X","_","_","X","X","_","X","_","X","_","X","X","X","X","X","_","X","X","X","X","M","X","X","X","_","X","X","X","M"],
                  ["X","X","_","X","X","_","X","_","_","_","X","M","M","M","X","_","_","_","_","X","M","M","M","X","_","_","_","X","M"],
                  ["M","X","_","_","_","D","X","X","X","X","X","M","M","M","X","X","X","X","_","X","M","M","M","X","X","X","X","X","M"],
                  ["M","X","X","X","X","X","X","M","M","M","M","M","M","M","M","M","M","X","_","X","M","M","M","M","M","M","M","M","M"],
                  ["M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","X","X","X","M","M","M","M","M","M","M","M","M"],


        ];

/*        var map = [
            ["M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M"],
            ["M","M","M","M","M","M","M","M","X","X","X","X","X","X","X","X","X","X","M","M"],
            ["M","M","M","M","M","M","M","M","X","_","X","_","_","P","_","_","_","X","M","M"],
            ["M","M","M","M","M","M","M","M","X","_","X","_","X","_","X","X","_","X","M","M"],
            ["X","X","X","X","X","X","X","X","X","_","X","_","X","_","X","X","_","X","X","M"],
            ["D","_","_","_","_","_","_","X","_","_","P","_","X","_","X","X","_","_","X","M"],
            ["X","X","X","X","_","X","_","X","_","X","X","_","X","_","X","X","X","X","X","M"],
            ["M","X","X","X","_","X","_","X","_","X","X","_","X","_","_","_","_","X","X","M"],
            ["M","X","_","_","_","X","_","X","_","X","X","_","X","X","X","X","_","X","X","M"],
            ["M","X","_","X","_","X","P","_","_","X","X","_","X","_","_","X","_","_","F","M"],
            ["M","X","_","X","_","X","_","X","X","X","X","_","_","_","X","X","X","X","X","M"],
            ["M","X","X","X","_","_","_","X","M","M","X","X","X","X","X","M","M","M","M","M"],
            ["M","M","M","X","X","X","X","X","M","M","M","M","M","M","M","M","M","M","M","M"],
            ["M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M"]
        ];
*/
var main_state = {

    preload: function() { 
        game.load.image("background", "assets/background.png");
        game.load.image('molecule', 'assets/molecule.png');
        game.load.image('mur', 'assets/wall.png');
        game.load.image('mur_b', 'assets/wall2.png');
        game.load.audio('applaudissement', ['assets/audio/applaudissement.mp3']);
        game.load.audio('gb_ms', ['assets/audio/HEARTBEAT.mp3']);
    },

    create: function() {

    	//Audio
	m_fond = game.add.audio('gb_ms');
	applaudissement = game.add.audio('applaudissement');
	m_fond.play();
        // Démarrage du système de collision de type ARCADE (simple)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Définition de la taille du world (zone de jeu complète)
        game.world.setBounds(0, 0, 1920, 1920);

        // Ajout du sprite de fond qui se répète
       game.add.tileSprite(0, 0, 4000, 4000, 'background');

       // Ajout d'un groupe de mur
        walls = game.add.group();
        walls.enableBody = true;

        // Ajout du groupe de mur sortie
        wall_exit = game.add.group();
        wall_exit.enableBody = true;

        // Parcours du tableau de la map en Y (vertical)
        for (var y = 0; y < map.length; y++) {
            for (var x = 0; x < map[y].length; x++) {
                if (map[y][x] === 'X') { // Si c'est un mur
                    walls.create(x*80,y*80, 'mur'); // Multiplié par 80 car 80px c'est la largeur/hauteur de l'image du mur
                }
                if (map[y][x] === 'F') { // Si c'est un mur
                    wall_exit.create(x*80,y*80, 'mur_b'); // Multiplié par 80 car 80px c'est la largeur/hauteur de l'image du mur
                }
            } 
        }
       // Ajout du joueur principal 'molecule'
        molecule = game.add.sprite(440, 1920, 'molecule');
        molecule.anchor.setTo(0.5, 0.5);
        molecule.scale.setTo(0.26, 0.26);     
        // La camera suivra les déplacements du joueur
        game.camera.follow(molecule);
        game.camera.deadzone = new Phaser.Rectangle(100, 100, 400, 250);

        // Système physique
        // ===============

        // Activation de la physX sur le joueur
        game.physics.enable(molecule, Phaser.Physics.ARCADE);
        // Indique que le joueur ne pourra pas sortir des limites du game.world
        molecule.body.collideWorldBounds = true;
        // Indique que le mur reste fixe s'il se fait toucher par un autre body
        walls.forEachAlive(function (member) {
            member.body.immovable = true;
        }, this);

        // Indique que la sortie n'est pas fixe
        wall_exit.forEachAlive(function (member) {
            member.body.immovable = true;
        }, this);
        
        //  Create our Timer
    timer = game.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    timer.loop(2000, updateCounter, this);

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timer.start();
    function updateCounter() {
    	total++;
     }
},


    update: function () {

        // ====================
        // Vérification des collisions
        // ====================

        // Mur 1 VS Joueur
        game.physics.arcade.collide(walls, molecule , function() {}, null, this);

           // Exit VS Joueur
        game.physics.arcade.collide(wall_exit, molecule , function() { 
                molecule.kill();
                applaudissement.play();
                m_fond.stop();
                timer.stop();
                var record = localStorage.getItem('record')
                if (record >= total) {
                    localStorage.setItem('record', total);
                }
                setTimeout(function(){ window.location.reload(); }, 2500);
        }, null, this);

        // ====================
        // Déplacement du joueur
        // ====================

        molecule.body.velocity.x = 0;
        molecule.body.velocity.y = 0;

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            molecule.body.velocity.x = -300;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            molecule.body.velocity.x = 300;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
           molecule.body.velocity.y = -300;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
           molecule.body.velocity.y = 300;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
           molecule.reset(440,1920);
        }

    },

    render: function() {
        // Parcours de tous les membres du groupe pour afficher leur debug
        walls.forEachAlive(function (member) {
                /*game.debug.body(member);*/
        }, this);
        /*game.debug.body(molecule);*/
        game.debug.text('Time : ' + total+' seconds', 32, 64);
    }
};


game.state.add('main', main_state);  
game.state.start('main');  
>>>>>>> origin/master
};