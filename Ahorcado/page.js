const button = document.querySelector("#btn-init");
const movie_div = document.querySelector("#movie");
let image = document.querySelector("#hangman-image");
let lifes, letters_to_win, movie_temp;
let game = false;
let movies = ["Buscando a Nemo", "Ciudad de Dios", "Hable con ella", "El Señor de los Anilllos", "Kandahar", "La mirada de Ulises", "Pulp Fiction", "Adios a mi concubina", "La lista de Schindler", "Sin Perdon", "Uno de los nuestros", "Muerte entre las flores", "El cielo sobre Berlin", "La mosca", "El detective cantante", "Buscando a Nemo ", "Ciudad de Dios ", "Hable con ella ", "El Señor de los Anilllos", "Kandahar", "La mirada de Ulises ", "Chunking Express", "Drunken Master II", "Pulp Fiction ", "Adios a mi concubina ", "La lista de Schindler ", "Leolo", "Sin Perdon ", "Uno de los nuestros ", "Muerte entre las flores ", "El decalogo", "Nakayan", "El cielo sobre Berlin ", "La mosca ", "Brazil", "La Rosa purpura del Cairo", "Blade Runner", "E.T. El extraterrestre", "Berlin Alexanderplatz", "Mi tio de America", "Toro salvaje", "La Guerra de las Galaxias", "Taxi Driver", "Barry Lyndon", "Chinatown", "La noche americana", "El Padrino", "Aguirre, la colera de Dios", "El discreto encanto de la burguesia", "A touch of Zen", "erase una vez en America", "Bonnie and Clide", "Mouchette", "El bueno, el feo y el malo", "Persona", "Telefono rojo, volamos hacia Moscu", "Que noche la de aquel dia", "Charada", "ocho y un medio", "Lawrence de Arabia", "El mensajero del miedo", "Yoyimbo", "Psicosis", "Los cuatrocientos golpes", "Con faldas y a lo loco", "Pyassa", "Chantaje en Broadway", "La invasion de los ladrones de cuerpos", "Centauros del desierto", "La trilogia de Apu", "Sonrisas de una noche de verano", "Cuentos de Tokio", "Historias de la luna palida de agosto", "Vivir", "Cantando bajo la lluvia", "Umberto D", "Un tranvia llamado deseo", "En un lugar solitario", "Ocho sentencias de muerte", "Al rojo vivo", "Retorno al pasado", "Que bello es vivir", "Encadenados", "Les enfants du paradise", "Detour", "Perdicion", "Cita en San Luis", "Casablanca", "Ciudadano Kane", "Las tres noches de Eva", "Pinocho", "El bazar de las sorpresas", "Ninotchka", "Olimpia I y II", "La picara puritana"];

window.onload = () => {
    addEventListeners();
};

const addEventListeners = () => {
    button.addEventListener("click", () => {
        //Seleccionando película y quitándola del arreglo para que no se repitan
        if (movies.length < 1) {
            movie_div.insertAdjacentHTML("beforeend", `<p class="h1">Ya no hay más películas, has adivinado todas</p>`);
            button.disabled = true;
            button.className = "btn btn-secondary";
            return;
        }
        let number = Math.floor(Math.random() * movies.length);
        movie_temp = movies[number];
        letters_to_win = movie_temp.replace(/\ /g, "").length;
        console.log(movie_temp);
        movies.splice(number, 1);
        //Seleecionando cuántas vidas va a tener
        lifes = 7;
        if (letters_to_win < 12)
            lifes = 5;
        //Restableciendo valores
        movie_div.innerHTML = "";
        image.src = `img/lifes-7.png`;
        document.querySelector("#game-over").innerHTML = `Vidas: ${lifes}`;
        //Creando los espacios de cada letra
        let movie_words = movie_temp.split(" ");
        for (let word of movie_words) {
            movie_div.insertAdjacentHTML("beforeend", `<div class="container-fluid">`);
            for (let i = 0; i < word.length; i++)
                movie_div.insertAdjacentHTML("beforeend", `<div class="col h3"><p class="letter-${word.charAt(i).toUpperCase()}">____</p></div>`);
            movie_div.insertAdjacentHTML("beforeend", `</div>`);
        }
        game = true;
    });
    document.addEventListener("keyup", function (event) {
        let letter = String.fromCharCode(event.keyCode);
        if (!/[a-zÀ\,]/i.test(letter))
            return;
        //Error con las eñes según el teclado
        if(letter == "À")
            letter = "Ñ";
        let p_node = document.querySelectorAll(".letter-" + letter);
        if (p_node.length < 1 && game) {
            lifes--;
            if (lifes < 1) {
                image.src = `img/perdiste.png`
                document.querySelector("#game-over").innerHTML = "Se te han acabado las vidas, la respuesta era: " + movie_temp;
                return;
            }
            image.src = `img/lifes-${lifes}.png`
            document.querySelector("#game-over").innerHTML = `Vidas: ${lifes}`;
            return;
        }
        console.log(letters_to_win);
        for (let p of p_node) {
            p.innerHTML = letter;
            p.className = "";
            letters_to_win--;
        }
        if (letters_to_win === 0) {
            image.src = `img/ganaste.png`
            document.querySelector("#game-over").innerHTML = "¡¡Has ganado el juego!!";
            return;
        }
    })
}
