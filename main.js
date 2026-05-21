
window.onload = function () {
    cargarJuegos();
};


let juegosGlobal = [];


function cargarJuegos() {

    fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=30")

        .then(function (respuesta) {
            return respuesta.json();
        })

        .then(function (datos) {


            juegosGlobal = datos.map(function (juego) {

                let titulo = juego.title.toLowerCase();

                let categoria = "action";

                if (
                    titulo.includes("fifa") ||
                    titulo.includes("nba") ||
                    titulo.includes("football")
                ) {
                    categoria = "sports";
                }

                else if (
                    titulo.includes("race") ||
                    titulo.includes("rally") ||
                    titulo.includes("car")
                ) {
                    categoria = "racing";
                }

                else if (
                    titulo.includes("dragon") ||
                    titulo.includes("final fantasy") ||
                    titulo.includes("elder")
                ) {
                    categoria = "rpg";
                }

                juego.categoria = categoria;

                return juego;
            });

            mostrarJuegos(juegosGlobal);

        })

        .catch(function (error) {
            console.log(error);
        });

}

function mostrarJuegos(juegos) {

    let catalogo = document.getElementById("catalogo");

    catalogo.innerHTML = "";

    if (juegos.length === 0) {
        catalogo.innerHTML = "<p>No se encontraron juegos.</p>";
        return;
    }

    for (let i = 0; i < juegos.length; i++) {

        catalogo.innerHTML += `

            <div class="card">

                <img src="${juegos[i].thumb}" alt="${juegos[i].title}">

                <div class="card-info">

                    <h3>${juegos[i].title}</h3>

                    <p>Precio: $${juegos[i].salePrice}</p>

                    <button onclick="mostrarDetalle(
                        '${juegos[i].title}',
                        '${juegos[i].salePrice}',
                        '${juegos[i].normalPrice}',
                        '${juegos[i].thumb}',
                        '${juegos[i].categoria}'
                    )">

                        Ver más

                    </button>

                    <button class="btn-steam" onclick="verSteam('${juegos[i].dealID}')">

    Ver en Steam

</button>

                </div>
                

            </div>

            `;
    }

}

function buscarJuego() {

    var texto = document.getElementById("buscar").value.trim();

    fetch(
        "https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=30&title=" + texto
    )

        .then(function (respuesta) {

            return respuesta.json();

        })

        .then(function (datos) {

            var catalogo = document.getElementById("catalogo");

            catalogo.innerHTML = "";

            if (datos.length === 0) {

                catalogo.innerHTML = "<p>No se encontraron juegos</p>";

                return;
            }

            for (var i = 0; i < datos.length; i++) {

                catalogo.innerHTML += `

                <div class="card">

                    <img src="${datos[i].thumb}" alt="${datos[i].title}">

                    <div class="card-info">

                        <h3>${datos[i].title}</h3>

                        <p>Precio: $${datos[i].salePrice}</p>

                        <button onclick="mostrarDetalle(
                            '${datos[i].title}',
                            '${datos[i].salePrice}',
                            '${datos[i].normalPrice}',
                            '${datos[i].thumb}'
                        )">

                            Ver más

                        </button>

                        <button 
                            class="btn-steam"
                            onclick="verSteam('${datos[i].dealID}')"
                        >

                            Ver en Steam

                        </button>

                    </div>

                </div>

                `;
            }

        })

        .catch(function (error) {

            console.log(error);

        });

}




function mostrarDetalle(titulo, precio, precioNormal, imagen, categoria) {

    let descripcion = "";

    if (categoria === "action") {
        descripcion = "Juego lleno de acción, combates intensos y aventuras emocionantes.";
    }

    else if (categoria === "rpg") {
        descripcion = "Explora mundos fantásticos, mejora habilidades y vive una historia épica.";
    }

    else if (categoria === "sports") {
        descripcion = "Compite en emocionantes eventos deportivos y demuestra tus habilidades.";
    }

    else if (categoria === "racing") {
        descripcion = "Velocidad extrema, carreras intensas y vehículos impresionantes.";
    }

    else {
        descripcion = "Videojuego disponible en oferta.";
    }

    alert(
        "🎮 " + titulo +
        "\n\n💲 Precio oferta: $" + precio +
        "\n💵 Precio normal: $" + precioNormal +
        "\n\n📖 Descripción:\n" + descripcion
    );

}

// FUNCION REGISTRAR
function validarRegistro(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmar = document.getElementById("confirmar").value.trim();

    // Validar campos vacíos
    if (
        nombre === "" ||
        correo === "" ||
        usuario === "" ||
        password === "" ||
        confirmar === ""
    ) {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (!correo.includes("@")) {

        alert("El correo debe contener un @");
        return;
    }

    // Validar contraseñas
    if (password !== confirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // Registro correcto
    alert("Registro completado correctamente");

    // Redirigir al login
    window.location.href = "login.html";
}

// FUNCION LOGIN
function validarLogin(event) {

    event.preventDefault();

    const usuarioLogin = document.getElementById("usuarioLogin").value;
    const passwordLogin = document.getElementById("passwordLogin").value;

    // SOLO VALIDAR QUE NO ESTEN VACIOS
    if (usuarioLogin === "" || passwordLogin === "") {

        alert("Por favor completa todos los campos");

    } else {

        alert("Bienvenido a GAMEZONE");

        window.location.href = "index.html";
    }
}

function filtrarCategoria(categoria) {

    let filtrados = juegosGlobal.filter(function (juego) {

        return juego.categoria === categoria;

    });

    mostrarJuegos(filtrados);

}

function verSteam(id) {

    window.open(`https://www.cheapshark.com/redirect?dealID=${id}`, "_blank");

}
