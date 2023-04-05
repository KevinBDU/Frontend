let btn = document.getElementById("btn");

function ChargeInfoJson() {
    fetch("pizza.json")
        .then((Response) => {
            return Response.json();
        })
        .then((data) => {
            console.log(data);
            CreateDivs(data);
        });
}

function CreateDivs(data) {
    btn.addEventListener("click", ChargeInfoJson());
    preview = document.getElementsByClassName("preview")[0];
    preview.innerHTML = "";

    pizzeriaName = document.createElement("div");
    pizzeriaName.innerHTML = data.Name;
    pizzeriaName.setAttribute("id", "NomPizza");

    pizzeriSlogan = document.createElement("div");
    pizzeriSlogan.innerHTML = data.Slogan;
    pizzeriSlogan.setAttribute("id", "Slogan");

    preview.appendChild(pizzeriSlogan);
    preview.appendChild(pizzeriaName);

    pizzeriaList = document.createElement("div");
    pizzeriaList.setAttribute("id", "pizzaList");
    pizzeriaList.setAttribute("class", "contenu");

    listPizza = data.Pizza;
    for (let x = 0; x < listPizza.length; x++) {
        pizzaListElement = document.createElement("div");
        pizzaListElement.setAttribute("class", "card");

        listIngredient = listPizza[x].Ingredients;

        pizzaListElement.innerHTML = "<h2 class='pizzanom'>" +
            listPizza[x].Nom + "</h2>" + "<h3 class='pizzaprix'>" + listPizza[x].Prix + "</h3>" + "<img src=" + listPizza[x].Image + ">";
        for (let y = 0; y < listIngredient.length; y++) {
             pizzaListElement.innerHTML += "<li class='ingredient'>" + listIngredient[y] + "</li>";
         }

        pizzeriaList.appendChild(pizzaListElement);
    }
    preview.appendChild(pizzeriaList);
}