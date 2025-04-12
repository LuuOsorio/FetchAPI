const main = document.getElementsByTagName("main").item(0);
const URLMain = "https://fakestoreapi.com/products/";
const URLCategories = "https://fakestoreapi.com/products/categories/";
const mainProds = document.getElementById("mainProds");
const ulMenu = document.getElementById("ulMenu");

function getData(cat) {
    fetch(URLMain + cat)
        .then((respose) => {
            respose.json().then((res) => {
                console.log(res.length);
                createCards(res);
            });
            console.log(respose);
        })
        .catch((err) => {
            main.insertAdjacentHTML("beforeend",
                `<div> class = "alert alert-danger" role = "alert">
            ${err.message}
            </div>`
            );
        });
}//getData

function getCategories() {
    const options = { "method": "GET" };
    fetch(URLMain+"categories/", options)
        .then((respose) => {
            respose.json().then((res) => {
                res.forEach((cat) => {
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
        .catch((err) => {
            main.insertAdjacentHTML("afterbegin",
                `<div> class = "alert alert-danger" role = "alert">
            ${err.message}
            </div>`
            );
        });
}//getCategories

function createCards(prods) {
    
    mainProds.innerHTML="";
    
    prods.forEach((res) => {
        mainProds.insertAdjacentHTML("beforeend",
            `
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${res.image}" alt="${res.title}">
                <div class="card-body">
                    <h5 class="card-title">${res.title}</h5>
                    <p class="card-text">${res.description.slice(0, 100)}...</a>
                    <p></p>

                    <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${res.id}Modal">
                            see more
                        </button>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="${res.id}Modal" tabindex="-1" role="dialog" aria-labelledby="${res.id}ModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="${res.id}ModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ${res.description}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            
            `
        );
    });
}//createCards

getData("");// se llama a la función getData
getCategories();  // se llama a la funcion getCategories




