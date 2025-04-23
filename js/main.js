const main = document.getElementsByTagName("main").item(0);  //con getElementsByTagName trae una colleccion de elementos del documento index.html,y se trae al primer elemento que encuentra con .item(0) en este caso se pide a main
const URLMain = "https://fakestoreapi.com/products/"; // es el url de la página donde se encuentra una API pública con datos de productos en formato JSON
const URLCategories = "https://fakestoreapi.com/products/categories/"; // se establece la url de la API, por categorias de los productos
const mainProds = document.getElementById("mainProds");  // con getElementById trae un elemento del documento index.html para limpiar 
const ulMenu = document.getElementById("ulMenu"); // se obtiene el elemento ulMenu del documento index.html 


function getData(cat) {  //funcion getData
    fetch(URLMain + cat)  //se hace una promesa a traves de fetch 
        .then((respose) => {  // se genera  then si llega la promesa  
            respose.json().then((res) => {
                console.log(res.length);
                createCards(res);
            });
            console.log(respose);
        })
        .catch((err) => {  // si no llega genera un error y lanza una alerta 
            main.insertAdjacentHTML("beforeend",
                `<div> class = "alert alert-danger" role = "alert">
            ${err.message}
            </div>`
            );
        });
}//getData

function getCategories() {  //función para obtener (get) por categorias
    const options = { "method": "GET" }; // opciones para la petición fetch (método GET)
    fetch(URLMain + "categories/", options) //promesa para tener las opciones por categorias
        .then((respose) => {    //then si la promesa llega a cumplirse
            respose.json().then((res) => {  // recibe la respuesta  (respose) y la convierte a JSON para acceder a las categorías y la guarda a través del parametro res 
                res.forEach((cat) => { //se inserta por categoria como parametro cat y se inserta  a  ulMenu  por listas desordenadas
                    ulMenu.insertAdjacentHTML("afterbegin",
                        `
                        <li>
                            <a class = "dropdown-item" onclick = "getData('category/${cat.replace("'", "%27")}');" href = "#">
                                ${cat}
                            </a>
                        </li>
                        `
                    );
                })
            });
            console.log(respose);
        })
        .catch((err) => { //error si la promesa no llega a cumplirse lanza una aler alert-danger
            main.insertAdjacentHTML("afterbegin",
                `<div> class = "alert alert-danger" role = "alert">  
            ${err.message}
            </div>`
            );
        });
}//getCategories


function createCards(prods) { //se crean lar tarjetas para los productos 
    mainProds.innerHTML = ""; // se ocupa el mainPronds para limpiar contenido anterior

    prods.forEach((res) => {  // prods lista de productos que vienen de la API, y forEach recorre cada producto uno por uno
        // inserta el HTML de la tarjeta en el DOM

        mainProds.insertAdjacentHTML("beforeend", `
  <div class="col-md-4">
    <div class="card h-100">
          
            <div class="col-md-4 d-flex align-items-center justify-content-center">
              <img src="${res.image}" class="img-fluid rounded-start p-3" alt="${res.title}" style="max-height: 800px;">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${res.title}</h5>
                <p class="card-text">${res.description.slice(0, 50)}...</p>
                <p class="card-text"><small class="text-muted">Categoría: ${res.category}</small></p>
                <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modal-${res.id}">
                  See more
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Modal -->
        <div class="modal fade" id="modal-${res.id}" tabindex="-1"> 
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">${res.title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body d-flex flex-column align-items-center">
                <img src="${res.image}" class="img-fluid mb-3" alt="${res.title}" style="max-width: 200px;">
                <p>${res.description}</p>
                <p>$${res.price}</p>
                <p>${res.category}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      `);
    });
}//createCards

getData("");// se llama a la función getData
getCategories();  // se llama a la funcion getCategories

