/*--------------------Empezar función al dar enter---------------------------*/
//Rastrea el input donde se ingresó el nombre
var input = document.getElementById("pokeName");

//Ejecuta un evento cuando se suelta una tecla
input.addEventListener("keyup", function(event) {
    //Si la tecla es "Enter" entonces...
  if (event.keyCode === 13) {
    //Cancela la accion por default
   event.preventDefault();
   //Ejecuta la función que esta en el boton de busqueda en el HTML
   document.getElementById("sbutton").click();
  }
});

//Función para conseguir la información del pokemon ingresado
const fetchPokemon = () => {
    const pokeName = document.getElementById("pokeName");
    let pokeImput = pokeName.value.toLowerCase(); 
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeImput}`;
    fetch(url).then((res) => {
        if (res.status != 200) {    //tenia en comillas "200"
            //console.log(res);

            let none="not";

            

            pokeImage("./img/MHH_037.png");

            //Reemplazo de datos
            printName("No encontrado");
            idfunction("???");
            Heightfunction(000);
            Weightfunction(000);
            graphicstats("10","10","10","10","10","10");

            //Reemplazo de link con más datos
            resource("none");
            
        }
        else {
            return res.json();
       }
    }).then ((data) => {
        //console.log (data);
        let pokeImg=data.sprites.front_default;
        
        console.log("Url Sprite: "+pokeImg);
        //console.log (pokeImg);
        // pokeImage(pokeImg);

        //Obtiene el nombre del pokemon-----------------
        let pokeName1=data.forms;
        let pokeName2=pokeName1[0].name;
        
        printName(pokeName2);

        //Obtiene su numero en la pokedex--------------
        let pokeNumber=data.id;
        
        idfunction(pokeNumber);

        //Obtiene su altura----------------------------
        let pokeHeight=data.height;
        
        Heightfunction(pokeHeight);

        //Obtiene su peso------------------------------
        let pokeWeight=data.weight;
        
        Weightfunction(pokeWeight);

        //Estadisticas base---------------------------
        let est=data.stats;
        let hp=est[0].base_stat;    let attack=est[1].base_stat;    let defense=est[2].base_stat;    let spattack=est[3].base_stat;    let spdefense=est[4].base_stat;    let speed=est[5].base_stat;

        graphicstats(hp,attack,defense,spattack,spdefense,speed);


        //Url de pagina relacionada con más datos----------------------------
        let resurl=data.species.url;
        console.log("Segunda pag. de datos: "+resurl);
  
        //llama a la funcion pokeImage con la url de la imagen llamada pokeImg----
        pokeImage(pokeImg);
        //llama a la función resource con la url con más datos---------------------
        resource(resurl);  
   })
}


/*---------------------------------------------Info extra--------------------------------------------------*/
//Aqui recopila información de la segunda página con datos
const resource = (adress) => {

    fetch(adress).then((res) => {

        if(res.status != 200) {
                console.log("No se pudo conectar")

                //Datos si no se pudo conectar o se ingresó mal---------
                Apodofunction("pokémon no se pudo encontrar");
                Entradafunction("Asegurese de haber escrito bien el nombre del pokémon");

                $habitat("Se desconoce");
                $evolution("none");
        }
        else {
            //si es encontrado (200) nos regresa la respuesta
            return res.json();
        } 

    }).then((data) => {

        //obtiene el texto de entrada de la pokedex------------------------------------------------------
        let entrada=data.flavor_text_entries;

        let i=0;
        let openEntrada=0;
        
        //Escoge la entrada en español------------------------------------------------
        while(openEntrada != "es"){

            openEntrada=entrada[i].language.name;
            key=i;
            i=i+1;   
        }
        let EntradaPoke=entrada[key].flavor_text;
        
        Entradafunction(EntradaPoke);

        //obtiene el apodo del pokemon en español------------------------------------
        let apodo=data.genera;

        let e=0;
        let openGenera=0;
        
        while(openGenera != "es"){

            openGenera=apodo[e].language.name;
            keyG=e;
            e=e+1;
            
        }
        let ApodoPoke=apodo[keyG].genus;

        Apodofunction(ApodoPoke);

        //Obtiene url para obtener el habitat----------------------------------------------------------
        
        let habitatcheck=data.habitat;
        let habitaturl=0;

        if(habitatcheck==null){
            //Respuesta si el pokémon no tiene un hábitat conocido--------------
            habitaturl="Se desconoce"
            //console.log(habitaturl);
        }
        else{
            //Dirección con la url----------------------------------------------
            habitaturl=data.habitat.url;    
        }
        

        //Llama a función para obtener habitad y cadena evolutiva
        $habitat(habitaturl);
    })
}

/*---------------------------------------------Habitad----------------------------------------------------*/
//Obtiene el habitat del pokémon en español
const $habitat=(hurl)=>{
    let HabitatName="not";

    if (hurl=="Se desconoce"){
        //Si no se sabe cual es su habitat
        HabitatName=hurl;

        Habitatfunction(HabitatName);

    }
    else{
        //Si se conoce, se conecta a la url para obtener el habitat en español
        fetch(hurl).then((res)=>{
            //console.log(res);
    
            if(res.status !=200){
                    console.log("No se pudo conectar Habitat")
                
            }
            else {
                //si es encontrado (200) nos regresa la respuesta
                return res.json();
            } 
        }).then((data) => {
    
            //Obtiene el habitat en español-------------------------------------
            let namesHab=data.names;
            
            y=0;
            let openNames=0;
    
            while(openNames != "es"){
                openNames=namesHab[y].language.name;
                keyH=y;
                y=y+1;
            }
            HabitatName=namesHab[keyH].name;
            
            //Función para poner la info en el html-------------------------- 
            Habitatfunction(HabitatName);
        })
    }
}

// fetchPokemon ();
/*---------------------------------------------Imagen del poke-----------------------------------------*/
//Consigue la imagen del pokémon ingresado
const pokeImage = (url) => {
     const pokeImg = document.getElementById("pokeImg");
     console.log("Url de imagen"+url); /*faltaba esto: cambia el src del elemento del id pokeImg con el url de la imagen,
     de forma que cambia la imagen anterior*/
     pokeImg.src = url;
}

/*-------------------------------------Impresion de info---------------------------------------------------*/
    //Nombre del pokemon
    const printName=(a)=>{
        //Crea el span con el nombre
        const elementoPI=document.createElement("span");
        elementoPI.innerText=`${a}`;
        console.log(elementoPI);

        //Rastrea el contenedor
        const $contenedorPI = document.getElementById("pokemon");
        //Elimina la info anterior
        $contenedorPI.removeChild($contenedorPI.childNodes[0]);
        //Inserta el dato
        $contenedorPI.prepend(elementoPI);
    }

    //Id de pokemon
    const idfunction=($id)=>{
        //Crea el span con el ID
        const elementoPI=document.createElement("span");
        elementoPI.innerText=`ID: ${$id}`;
        console.log(elementoPI);

        //Rastrea el contenedor
        const $contenedorPI = document.getElementById("pokeID");
        //Elimina la info anterior
        $contenedorPI.removeChild($contenedorPI.childNodes[0]);
        //Inserta el dato
        $contenedorPI.prepend(elementoPI);
    }

    //Altura de pokemon
    const Heightfunction=($Height)=>{
        //COnvierte la altura a metros
        let HeightEst=$Height/10;

        //Agrega el icono para LA ALTURA
        const imageWei=document.createElement("img");
        imageWei.setAttribute("src","./img/4.png");
        imageWei.setAttribute("width","30px");
        //Crea span con la altura
        const elementoPH=document.createElement("span");
        elementoPH.innerText=`${HeightEst}m`;
        console.log(elementoPH);
        //Rastrea el contenedor
        const $contenedorPH = document.getElementById("pokeHeight");

        //Borra la info anterior
        while($contenedorPH.firstChild){
            $contenedorPH.removeChild($contenedorPH.firstChild);
            }
        //Inserta la imagen y la info
        $contenedorPH.prepend(elementoPH);
        $contenedorPH.prepend(imageWei);
    }

    //Peso de pokemon
    const Weightfunction=($Weight)=>{
        //Convierte el peso a kg
        let WeightEst=$Weight/10;
        
        //Agrega el icono del PESO
        const imageWei=document.createElement("img");
        imageWei.setAttribute("src","./img/5.png");
        imageWei.setAttribute("width","30px");
        //Crea el span con el peso
        const elementoPW=document.createElement("span");
        elementoPW.innerText=`${WeightEst}Kg`;
        console.log(elementoPW);
        //Rastrea el contenedor
        const $contenedorPW = document.getElementById("pokeWeight");

        //Borra la info anterior
        while($contenedorPW.firstChild){
            $contenedorPW.removeChild($contenedorPW.firstChild);
            }
        //Inserta la imagen y la info
        $contenedorPW.prepend(elementoPW);
        $contenedorPW.prepend(imageWei);  
    }

    //Entrada de pokemon
    const Entradafunction=($Entrada)=>{

        //Crea el span con la entrada del pokémon
        const elementoPE=document.createElement("p");
        elementoPE.setAttribute("class","PokeEntrada");
        elementoPE.innerText=`${$Entrada} `;
        console.log(elementoPE);
        //Rastrea el contenedor
        const $contenedorPE = document.getElementById("pokeEntrada");
        
        //Borra la info anterior
        while($contenedorPE.firstChild){
            $contenedorPE.removeChild($contenedorPE.firstChild);
            }
        //Inserta la info
        $contenedorPE.prepend(elementoPE);
    }

    //Apodo de pokemon
    const Apodofunction=($Apodo)=>{

        //Crea el span con el apodo del pokémon
        const elementoPA=document.createElement("p");
        elementoPA.setAttribute("class","PokeApodo");
        elementoPA.innerText=`Entrada Pokedex: El ${$Apodo} `;
        console.log(elementoPA);
        //Rastrea el contenedor
        const $contenedorPA = document.getElementById("pokeApodo");
        
        //Borra la info anterior
        while($contenedorPA.firstChild){
            $contenedorPA.removeChild($contenedorPA.firstChild);
            }
        //Inserta la info
        $contenedorPA.prepend(elementoPA);
    }

    //Habitat de pokemon
    const Habitatfunction=($HabitatF)=>{

        //Inserta la imagen del habitat
        const imageWei=document.createElement("img");
        imageWei.setAttribute("src","./img/6.png");
        imageWei.setAttribute("width","30px");

        //Crea span con nombre del habitat
        const elementoPHA=document.createElement("span");
        elementoPHA.innerText=`${$HabitatF} `;
        console.log(elementoPHA);
        //Rastrea el contenedor
        const $contenedorPHA = document.getElementById("pokeHabitat");
        
        //Elimina la info anterior
        while($contenedorPHA.firstChild){
            $contenedorPHA.removeChild($contenedorPHA.firstChild);
            }
        //INserta la imagen y la info
        $contenedorPHA.prepend(elementoPHA);
        $contenedorPHA.prepend(imageWei);
    }

    //Gráfica de stats--------------------------------------------------------
    const graphicstats=(a,b,c,d,e,f)=>{

        //Convierte los stats a porcentajes-------------------------------
        let $hpF=parseInt((a/255)*100); let $hpE=100-$hpF;
        let $AtF=parseInt((b/255)*100); let $AtE=100-$AtF;
        let $DfF=parseInt((c/255)*100); let $DfE=100-$DfF;
        let $SAtF=parseInt((d/255)*100); let $SAtE=100-$SAtF;
        let $SDfF=parseInt((e/255)*100); let $SDfE=100-$SDfF;
        let $SpF=parseInt((f/255)*100); let $SpE=100-$SpF;

        console.log($hpF,$AtF,$DfF,$SAtF,$SDfF,$SpF)


        //--------HP-------------------------------------
        //Crea una grid en base a los porcentajes del stat------
        const graphicHP=document.createElement("div");
        graphicHP.setAttribute("class","b");
        graphicHP.setAttribute("style",`grid-template-rows: ${$hpE}% ${$hpF}%;`);
        graphicHP.innerHTML=`<div>HP</div><div></div>`;
        console.log(graphicHP);

        //--------Attack-------------------------------------
        //Crea una grid en base a los porcentajes del stat------        
        const graphicAT=document.createElement("div");
        graphicAT.setAttribute("class","b");
        graphicAT.setAttribute("style",`grid-template-rows: ${$AtE}% ${$AtF}%;`);
        graphicAT.innerHTML=`<div>At</div><div></div>`;
        console.log(graphicAT);

        //--------Defense-------------------------------------
        //Crea una grid en base a los porcentajes del stat------
        const graphicDF=document.createElement("div");
        graphicDF.setAttribute("class","b");
        graphicDF.setAttribute("style",`grid-template-rows: ${$DfE}% ${$DfF}%;`);
        graphicDF.innerHTML=`<div>Df</div><div></div>`;
        console.log(graphicDF);
        
        //--------Special Attack-------------------------------------
        //Crea una grid en base a los porcentajes del stat------
        const graphicSAT=document.createElement("div");
        graphicSAT.setAttribute("class","b");
        graphicSAT.setAttribute("style",`grid-template-rows: ${$SAtE}% ${$SAtF}%;`);
        graphicSAT.innerHTML=`<div>SAt</div><div></div>`;
        console.log(graphicSAT);
        
        //--------Special Defense-------------------------------------
        //Crea una grid en base a los porcentajes del stat------
        const graphicSDF=document.createElement("div");
        graphicSDF.setAttribute("class","b");
        graphicSDF.setAttribute("style",`grid-template-rows: ${$SDfE}% ${$SDfF}%;`);
        graphicSDF.innerHTML=`<div>SDf</div><div></div>`;
        console.log(graphicSDF);
        
        //--------Speed-------------------------------------
        //Crea una grid en base a los porcentajes del stat------
        const graphicSp=document.createElement("div");
        graphicSp.setAttribute("class","b");
        graphicSp.setAttribute("style",`grid-template-rows: ${$SpE}% ${$SpF}%;`);
        graphicSp.innerHTML=`<div>Spd</div><div></div>`;
        console.log(graphicSp);  

        //Rastrea el contenedor de la gráfica---------------------------------------------
        const $contenedorGraphic = document.getElementById("stats");
 
        //Borra la gráfica anterior-----------------------------------------------
        while($contenedorGraphic.firstChild){
            $contenedorGraphic.removeChild($contenedorGraphic.firstChild);
        }
        //Inserta todos los divs con las grid definidas en base a su porcentaje------
        $contenedorGraphic.prepend(graphicSp);
        $contenedorGraphic.prepend(graphicSDF);
        $contenedorGraphic.prepend(graphicSAT);
        $contenedorGraphic.prepend(graphicDF);
        $contenedorGraphic.prepend(graphicAT);
        $contenedorGraphic.prepend(graphicHP);
    }



//pokeImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png");

//const imprimir = () => {
  //  const pokeName = document.getElementById("pokeName");
  //  let pokeImput = pokeName.value;
  //  console.log("Hola " + pokeImput);
//}