
function Main_js(velocidad, gravedad, tiempo){
WIDTH =  window.innerWidth; // Ancho de pantalla
HEIGHT = window.innerHeight; // Alto de pantalla
//var grav = sessionStorage.getItem("gravedad");
// Lienzo u objeto encargado del renderizado
var lienzo = new THREE.WebGLRenderer({antialias: true});

// Establecemos las dimensiones del lienzo
lienzo.setSize(
	WIDTH,
	HEIGHT
);

// Añadimos el lienzo a la página
document.body.appendChild(lienzo.domElement);
//document.getElementById("canvas").innerHTML=document.getElementById("canvas").appendChild(lienzo.domElement);
//document.getElementById("canvas").appendChild(lienzo.domElement);
// Creamos la escena
var escena = new THREE.Scene;

// Generamos la cámara
var camara = new THREE.PerspectiveCamera(
	45,
	(WIDTH / HEIGHT),
	0.1,
	10000
);
// Situamos la cámara
camara.position.y = 0;
camara.position.y = 0;
camara.position.z = 400;
// Añadimos la cámara a la escena
escena.add(camara);

// Creamos una par de focos de luz
var luz1 = new THREE.PointLight(0xff0044); // Rojizo
luz1.position.set(
	120, // Posición en eje X
	260, // Posición en eje Y
	100	 // Posición en eje Z
);
var luz2 = new THREE.PointLight(0x4499ff); // Azulado
luz2.position.set(
	-100, // Posición en eje X
	100, // Posición en eje Y
	200	 // Posición en eje Z
);
// Añadimos las luces
//escena.add(luz1);
escena.add(luz2);


//...................EJES..............................
   // Geometría linea
function linea(x1,y1,x2,y2,valor){		
		Geometria=new THREE.Geometry();
		// vector a dibujar
		var vertices=[[x1,y1,0],[x2,y2,0]];
		var long_vertices=vertices.length;
		for(i=0;i<long_vertices;i++){
			x=vertices[i][0];
			y=vertices[i][1];
			z=vertices[i][2];
			//Agregamos vértices al vector
			Vector=new THREE.Vector3(x,y,z);
			//Agregamos el vector a la geometría
			Geometria.vertices.push(Vector);
			}
		// agregamos un material para que el punto tenga color
		Material=new THREE.ParticleBasicMaterial({color: valor });
		// creamos una partícula con la geometría y el material
		Figura=new THREE.Line(Geometria,Material);
	    escena.add(Figura);		
}

var alto= HEIGHT/2;
var largo=WIDTH/2; 

//referencias...........................................
for(var xn=-10;xn>=-largo;xn=xn-10){
  linea(xn,alto,xn,-alto,0xF2F2F2);
}
for(var xp=10;xp<=largo;xp=xp+10){
  linea(xp,alto,xp,-alto,0xF2F2F2);
}

for(var yn=-10;yn>=-alto;yn=yn-10){
   linea(-largo,yn,largo,yn,0xF2F2F2);
}
for(var yp=10;yp<=alto;yp=yp+10){
   linea(-largo,yp,largo,yp,0xF2F2F2);
}

//ejes
linea(0,0,0,alto,0x01DF01);
linea(0,0,0,-alto,0x01DF01);
linea(0,165,-5,165-5,0x01DF01); linea(0,165,5,165-5,0x01DF01);
linea(0,-165,-5,-165+5,0x01DF01); linea(0,-165,5,-165+5,0x01DF01);

linea(0,0,largo,0,0x08088A);
linea(0,0,-largo,0,0x08088A);
linea(355,0,355-5,-5,0x08088A); linea(355,0,355-5,5,0x08088A);
linea(-355,0,-355+5,-5,0x08088A); linea(-355,0,-355+5,5,0x08088A);

//normal
linea(0,0,0,40,0xFFFF00);
linea(0,40,-5,40-5,0xFFFF00); linea(0,40,5,40-5,0xFFFF00);

linea(0,0,40,0,0x01DFD7);
linea(40,0,40-5,-5,0x01DFD7); linea(40,0,40-5,5,0x01DFD7);

//................texto.........................
//var textGeo = new THREE.TextGeometry( "hola", { size: 90, height: 90, weight: 'normal', font: 'helvetiker', style: 'normal', bevelThickness: 2, bevelSize: 4, bevelSegments: 3, bevelEnabled: true, curveSegments: 12 });
//var material2 = new THREE.MeshBasicMaterial({color: 0x11ff00});
//var text = new THREE.Mesh(textGeo, material2); 
//escena.add(text);			
//text.position.set(0.0, 0.0, 0.0);

//.............ESFERA-COLOR.............................

var geometriaSphere = new THREE.SphereGeometry(10, 10, 10);
var material = new THREE.MeshBasicMaterial({ color: 0xFF0000 }); // Skin the cube with 100% blue.
//var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('textura/mundo.jpg') } ); //TEXTURA
var esfera = new THREE.Mesh(geometriaSphere,material);
esfera.position.set(0.0, 0.0, 0.0);
escena.add(esfera);


//.............................PARED(CUBO).......................
var geometry = new THREE.CubeGeometry(20, 400, 0); // Create a 20 by 20 by 20 cube.
var material = new THREE.MeshBasicMaterial({ color: 0x0000FF }); // Skin the cube with 100% blue.
var cube = new THREE.Mesh(geometry, material); 
cube.position.set( 220.0, 0.0, 0.0);
//geometry.position.set(0, 0, 0);
escena.add(cube); // Add the cube at (0, 0, 0).


var x=0;//velocidad
var dir=1;
var delay=0;
var parar=1;
var time=tiempo;
tiempo=0;
//y=0;
function movimiento(){
//while (parar!=0){	//if(grav==1){
	
if(parar==1){
	// movemos la esfera
	//original 
	//x=x+(0.5*dir);
	x=x+((gravedad*tiempo*0.1)*dir);
	//x=(velocidad*tiempo)+
	document.getElementById("cordenada").value=parseFloat(x.toPrecision([4]));
	//x=(velocidad*tiempo)+((0.5*gravedad*(Math.pow(tiempo,2))*dir);
	if(x<=200){
	  esfera.position.x = x;
	}else{
	    dir=dir*-1;	
	}
	// Renderizamos la escena
	lienzo.render(escena, camara);
	// Volvemos a renderizar
	requestAnimationFrame(movimiento);
	//tiempo
    if(delay==85){
		//tiempo=tiempo-1; //para que sea de rapido a lento
		tiempo=tiempo+1;
		document.getElementById("tiempo").value=tiempo;
		//reloj.innerHTML= tiempo;
		delay=0;
	}
		delay++;
	
		//para que sea de rapido a lento
		if(tiempo==time){ parar=0;}

  }

}


// Empezamos a renderizar
movimiento();








}


