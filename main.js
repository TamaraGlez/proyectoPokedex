//DECLARAMOS LAS VARIABLES QUE UTILIZAREMOS
let response;
let results; // results es los 1279 pokemons
let resp;
let resul; // cada pokemon individual
let pokemons = [];
let tipos = [];
// console.log("esto son mis tipos en una const", tipos);
// console.log("este es mi array de objetos pokemons", pokemons);

//SELECCIONAMOS ELEMENTOS HTML
const ol$$ = document.querySelector("#pokedex");
const container$$ = document.querySelector(".container");
const search$$ = document.querySelector(".search-input");

// FUNCION BOTONES TYPES
const renderButtons = () => {
  const buttonTypes$$ = document.querySelector(".container-buttonTypes");
  buttonTypes$$.innerHTML = "";
  const types = [];

  const buttonTodos$$ = document.createElement("button");
  buttonTypes$$.appendChild(buttonTodos$$);
  buttonTodos$$.setAttribute("class", "todos");
  buttonTodos$$.addEventListener("click", () => {
    ol$$.innerHTML = "";
    renderFront(pokemons);
  });

  for (const pokemon of pokemons) {
    for (const tipo of pokemon.types) {
      if (!types.includes(tipo.type.name)) {
        types.push(tipo.type.name);
      }
    }
  }

  // creamos los botones para el filtrado
  for (const tipo of types) {
    const buttonTipo$$ = document.createElement("button");
    buttonTypes$$.appendChild(buttonTipo$$);
    buttonTipo$$.setAttribute("class", "btn-types");
    buttonTipo$$.addEventListener("click", () => filtrar(tipo));

    tipos.push(tipo);

    if (tipo === "grass") {
      buttonTipo$$.style.backgroundImage = "url('./assets/grass.png')";
    }
    if (tipo === "electric") {
      buttonTipo$$.style.backgroundImage = "url('./assets/electric.png')";
    }
    if (tipo === "normal") {
      buttonTipo$$.style.backgroundImage = "url('./assets/normal.png')";
    }
    if (tipo === "fire") {
      buttonTipo$$.style.backgroundImage = "url('./assets/fire.png')";
    }
    if (tipo === "water") {
      buttonTipo$$.style.backgroundImage = "url('./assets/water.png')";
    }
    if (tipo === "ice") {
      buttonTipo$$.style.backgroundImage = "url('./assets/ice.png')";
    }
    if (tipo === "rock") {
      buttonTipo$$.style.backgroundImage = "url('./assets/rock.png')";
    }
    if (tipo === "flying") {
      buttonTipo$$.style.backgroundImage = "url('./assets/flying.png')";
    }

    if (tipo === "bug") {
      buttonTipo$$.style.backgroundImage = "url('./assets/bug.png')";
    }
    if (tipo === "poison") {
      buttonTipo$$.style.backgroundImage = "url('./assets/poison.png')";
    }
    if (tipo === "ground") {
      buttonTipo$$.style.backgroundImage = "url('./assets/ground.png')";
    }
    if (tipo === "dragon") {
      buttonTipo$$.style.backgroundImage = "url('./assets/dragon.png')";
    }
    if (tipo === "steel") {
      buttonTipo$$.style.backgroundImage = "url('./assets/steel.png')";
    }
    if (tipo === "fighting") {
      buttonTipo$$.style.backgroundImage = "url('./assets/fight.png')";
    }
    if (tipo === "psychic") {
      buttonTipo$$.style.backgroundImage = "url('./assets/psychic.png')";
    }
    if (tipo === "ghost") {
      buttonTipo$$.style.backgroundImage = "url('./assets/ghost.png')";
    }
    if (tipo === "fairy") {
      buttonTipo$$.style.backgroundImage = "url('./assets/fairy.png')";
    }
    if (tipo === "todos") {
      buttonTipo$$.style.backgroundImage = "url('./assets/todos.png')";
    }
  }
};
// FILTRAR BOTONES
let pokemonsFiltered = [];
let filtrar = (tipos) => {
  pokemonsFiltered = pokemons.filter((pokemon) => {
    for (let element of pokemon.types) {
      if (element.type.name === tipos && tipos !== "todos") {
        return (pokemonsFiltered = [...pokemonsFiltered, pokemon]);
      }
    }
  });

  ol$$.innerHTML = "";
  renderFront(pokemonsFiltered);
};

// aqui vamos guardar los pokemon
const POKEMONS = [];
// esta variable era un parámetro pero interesaba mas sacarla como global para reutilizarla en cambiar pagina hay que usarla para saber en cual estamos
let LIMITE = 0;
let COMIENZO = 0;
// guardamos en ambito global nuestra página y lo pasamos a num entero el textConten nos lo devuelve en string y evitamos problemas

const restarPagina$$ = document.querySelector(".restarPagina");
const pagina$$ = document.querySelector(".pagina");
const sumarPagina$$ = document.querySelector(".sumarPagina");
let PAGINA = parseInt(pagina$$.textContent);
// petición para pokemons nos trae los primeros 20
// vamos a realizar varias llamadas segun pagina hay que vaciarlo
// splice con posicion 0 borra desde esa posicion hacia delante vacia el array
const llamada = async () => {
  POKEMONS.splice(0);

  const result = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${COMIENZO}&limit=20`
  );
  const resultJSON = await result.json();
  // console.log(resultJSON.results);

  // en rjson tenemos la cantidad total de pokemon si lo dividimo entre las pag nos dará un numero decimal le añadimos Math.floor para redondear y sumamos una pagina para los pikos
  LIMITE = Math.floor(resultJSON.count / 20) + 1;
  // tenemos que iterar para llegar hasta pokemon>results>url
  for (const p of resultJSON.results) {
    const poke = await fetch(p.url);
    const pokeJSON = await poke.json();
    POKEMONS.push(pokeJSON);
  }
  console.log("pokemons", POKEMONS);
};

const cambiarPagina = (operacion) => {

  if(PAGINA === 1 && operacion === "+") {

    pagina$$.textContent = ++PAGINA;
    COMIENZO += 20;

  } else if (PAGINA === LIMITE && operacion === "-"){
    pagina$$.textContent = --PAGINA;
    COMIENZO -= 20;

  } else if (PAGINA !== 1 && PAGINA !== LIMITE){
    if (operacion === "-") {
      pagina$$.textContent = --PAGINA;
      COMIENZO -= 20;
    } else {
      pagina$$.textContent = ++PAGINA;
      COMIENZO += 20;
    }

  }

  
  llamada();
};

restarPagina$$.addEventListener("click", () => cambiarPagina("-"));
sumarPagina$$.addEventListener("click", () => cambiarPagina("+"));

llamada();

// BUSCADOR
const search = () => {
  const pokemonsSearch = pokemons.filter((pokemon) => {
    // search$$ es el input buscar y value su valor
    return pokemon.name.toLowerCase().includes(search$$.value.toLowerCase());
  });
  console.log("pokemonSearch", pokemonsSearch);
  ol$$.innerHTML = "";
  renderFront(pokemonsSearch);
};
search$$.addEventListener("input", search);

// COGER POKEMONS DE LA API
const getPokemons = async () => {
  response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150`
  );
  results = await response.json();
  // console.log("este es el resultado de results", results);

  for (let i = 1; i < results.results.length; i++) {
    resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    resul = await resp.json();
    pokemons.push(resul);
    // pokemon = [...pokemon, resul] otra forma de sumar en vez de push resul a pokemon y conseguir un
  }
  renderFront(pokemons);
  renderButtons(pokemons);
};

// PINTAR POKEMON
function renderFront(Pokemons) {
  for (const pokemon of Pokemons) {
    const cardLi$$ = document.createElement("li");

    const cardFront$$ = document.createElement("div");
    cardLi$$.appendChild(cardFront$$);
    const cardBack$$ = document.createElement("div");
    cardLi$$.appendChild(cardBack$$);
    // ELEMENTOS CARDFRONT
    const h2$$ = document.createElement("h2");
    h2$$.textContent = pokemon.name;

    //Creación de circulo detrás imagen
    const circle$$ = document.createElement("div");
    circle$$.setAttribute("id", "circle");
    cardFront$$.appendChild(circle$$);

    const imageContainer$$ = document.createElement("div");
    const img$$ = document.createElement("img");
    img$$.setAttribute("class", "imgFront");
    img$$.src = pokemon.sprites.other.dream_world.front_default;

    const id$$ = document.createElement("h3");
    id$$.textContent = "Nº" + " " + pokemon.id;

    const types$$ = document.createElement("div");

    types$$.setAttribute("id", "typeDiv");

    for (const tipo of pokemon.types) {
      const nameType$$ = document.createElement("span");
      nameType$$.setAttribute("id", "nameType");
      types$$.appendChild(nameType$$);
      nameType$$.textContent = tipo.type.name;

      if (tipo.type.name === "grass") {
        nameType$$.style.backgroundColor = "#63bb5b";
        cardLi$$.style.backgroundColor = "#63bb5b";
      }
      if (tipo.type.name === "electric") {
        nameType$$.style.backgroundColor = "#f3d23b";
        cardLi$$.style.backgroundColor = "#f3d23b";
      }
      if (tipo.type.name === "normal") {
        nameType$$.style.backgroundColor = "#9099a1";
        cardLi$$.style.backgroundColor = "#9099a1";
      }
      if (tipo.type.name === "fire") {
        nameType$$.style.backgroundColor = "#ff9c54";
        cardLi$$.style.backgroundColor = "#ff9c54";
      }
      if (tipo.type.name === "water") {
        nameType$$.style.backgroundColor = "#4d90d5";
        cardLi$$.style.backgroundColor = "#4d90d5";
      }
      if (tipo.type.name === "ice") {
        nameType$$.style.backgroundColor = "#74cec0";
        cardLi$$.style.backgroundColor = "#74cec0";
      }
      if (tipo.type.name === "rock") {
        nameType$$.style.backgroundColor = "#c7b78b";
        cardLi$$.style.backgroundColor = "#c7b78b";
      }
      if (tipo.type.name === "flying") {
        nameType$$.style.backgroundColor = "#8fa8dd";
        cardLi$$.style.backgroundColor = "#8fa8dd";
      }

      if (tipo.type.name === "bug") {
        nameType$$.style.backgroundColor = "#90c12c";
        cardLi$$.style.backgroundColor = "#90c12c";
      }
      if (tipo.type.name === "poison") {
        nameType$$.style.backgroundColor = "#ab6ac8";
        cardLi$$.style.backgroundColor = "#ab6ac8";
      }
      if (tipo.type.name === "ground") {
        nameType$$.style.backgroundColor = "#d97746";
        cardLi$$.style.backgroundColor = "#d97746";
      }
      if (tipo.type.name === "dragon") {
        nameType$$.style.backgroundColor = "#0a6dc4";
        cardLi$$.style.backgroundColor = "#0a6dc4";
      }
      if (tipo.type.name === "steel") {
        nameType$$.style.backgroundColor = "#5a8ea1";
        cardLi$$.style.backgroundColor = "#5a8ea1";
      }
      if (tipo.type.name === "fighting") {
        nameType$$.style.backgroundColor = "#ce4069";
        cardLi$$.style.backgroundColor = "#ce4069";
      }
      if (tipo.type.name === "psychic") {
        nameType$$.style.backgroundColor = "#f97176";
        cardLi$$.style.backgroundColor = "#f97176";
      }
      if (tipo.type.name === "ghost") {
        nameType$$.style.backgroundColor = "#5269ac";
        cardLi$$.style.backgroundColor = "#5269ac";
      }
      if (tipo.type.name === "fairy") {
        nameType$$.style.backgroundColor = "#ec8fe6";
        cardLi$$.style.backgroundColor = "#ec8fe6";
      }
    }

    // ELEMENTOS CARDBACK
    const h2$$Back = document.createElement("h2");
    h2$$Back.setAttribute("class", "h2Back");
    h2$$Back.textContent = "#" + pokemon.id;
    cardBack$$.appendChild(h2$$Back);

    const heightWeight$$ = document.createElement("span");
    heightWeight$$.setAttribute("class", "heightWeight");
    cardBack$$.appendChild(heightWeight$$);

    const height$$ = document.createElement("p");
    height$$.textContent = "Altura" + " " + pokemon.height;
    heightWeight$$.appendChild(height$$);
    const weight$$ = document.createElement("p");
    weight$$.textContent = "Peso" + " " + pokemon.weight;
    heightWeight$$.appendChild(weight$$);

    const experience$$ = document.createElement("span");
    experience$$.setAttribute("class", "experience");
    cardBack$$.appendChild(experience$$);
    const experienceText$$ = document.createElement("p");
    experienceText$$.textContent = "Experiencia ";
    experience$$.appendChild(experienceText$$);
    const experienceResul$$ = document.createElement("p");
    experienceResul$$.textContent = pokemon.base_experience;
    experience$$.appendChild(experienceResul$$);

    const hp$$ = document.createElement("span");
    hp$$.setAttribute("class", "hp");
    cardBack$$.appendChild(hp$$);
    const hpText$$ = document.createElement("p");
    hpText$$.textContent = "Hp";
    hp$$.appendChild(hpText$$);
    const hpResul$$ = document.createElement("p");
    hpResul$$.textContent = pokemon.stats[0].base_stat;
    hp$$.appendChild(hpResul$$);

    const attack$$ = document.createElement("span");
    attack$$.setAttribute("class", "hp");
    cardBack$$.appendChild(attack$$);
    const attackText$$ = document.createElement("p");
    attackText$$.textContent = "Ataque";
    attack$$.appendChild(attackText$$);
    const attackResul$$ = document.createElement("p");
    attackResul$$.textContent = pokemon.stats[1].base_stat;
    attack$$.appendChild(attackResul$$);

    const especialAttack$$ = document.createElement("span");
    especialAttack$$.setAttribute("class", "hp");
    cardBack$$.appendChild(especialAttack$$);
    const especialAttackText$$ = document.createElement("p");
    especialAttackText$$.textContent = "Ataq. Especial";
    especialAttack$$.appendChild(especialAttackText$$);
    const especialAttackResul$$ = document.createElement("p");
    especialAttackResul$$.textContent = pokemon.stats[4].base_stat;
    especialAttack$$.appendChild(especialAttackResul$$);

    const defense$$ = document.createElement("span");
    defense$$.setAttribute("class", "hp");
    cardBack$$.appendChild(defense$$);
    const defenseText$$ = document.createElement("p");
    defenseText$$.textContent = "Defensa";
    defense$$.appendChild(defenseText$$);
    const defenseTextResul$$ = document.createElement("p");
    defenseTextResul$$.textContent = pokemon.stats[2].base_stat;
    defense$$.appendChild(defenseTextResul$$);

    const especialDefense$$ = document.createElement("span");
    especialDefense$$.setAttribute("class", "hp");
    cardBack$$.appendChild(especialDefense$$);
    const especialDefenseText$$ = document.createElement("p");
    especialDefenseText$$.textContent = "Def.Especial";
    especialDefense$$.appendChild(especialDefenseText$$);
    const especialDefenseResul$$ = document.createElement("p");
    especialDefenseResul$$.textContent = pokemon.stats[3].base_stat;
    especialDefense$$.appendChild(especialDefenseResul$$);

    const speed$$ = document.createElement("span");
    speed$$.setAttribute("class", "hp");
    cardBack$$.appendChild(speed$$);
    const speedText$$ = document.createElement("p");
    speedText$$.textContent = "Velocidad";
    speed$$.appendChild(speedText$$);
    const speedResul$$ = document.createElement("p");
    speedResul$$.textContent = pokemon.stats[5].base_stat;
    speed$$.appendChild(speedResul$$);

    cardLi$$.setAttribute("class", "li");
    imageContainer$$.setAttribute("class", "imageContainer");
    types$$.setAttribute("class", "element");
    cardFront$$.setAttribute("class", "front");
    cardBack$$.setAttribute("class", "back");

    cardFront$$.appendChild(h2$$);
    cardFront$$.appendChild(imageContainer$$);
    imageContainer$$.appendChild(img$$);
    cardFront$$.appendChild(id$$);
    cardFront$$.appendChild(types$$);

    ol$$.appendChild(cardLi$$);

    //Con este escuchador de eventos giramos la carta al hacer click
    cardLi$$.addEventListener("click", function () {
      cardLi$$.classList.toggle("is-flipped");
    });
  }
}

function init() {
  getPokemons();
}

window.onload = init;
