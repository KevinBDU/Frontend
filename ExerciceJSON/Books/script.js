var options = {
  weeksday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
var booksList = new Array();
var authorsList = new Array();
var categoriesList = new Array();

window.addEventListener("load", jsonOnLoad);


document.getElementById("listAuthors").addEventListener("click", () => {
  document
    .getElementById("listAuthors")
    .addEventListener("change", ChargeByAuthor);
});

document.getElementById("listCategories").addEventListener("click", () => {
  document
    .getElementById("listCategories")
    .addEventListener("change", ChargeByCategories);
});

function jsonOnLoad() {
  fetch("books.json")
    .then((Response) => {
      return Response.json();
    })
    .then((booksData) => {
      console.log(booksData);
      createList(booksData);
    });
}

function createList(Data) {
  for (var x = 0; x < Data.length; x++) {
    var book = Data[x];
    booksList.push(book);

    // liste des auteurs
    for (var y = 0; y < book.authors.length; y++) {
      var author = book.authors[y];

      if (authorsList.indexOf(author) == -1) {
        authorsList.push(author);
      }
    }

    // ici liste categories
    for (var z = 0; z < book.categories.length; z++) {
      var category = book.categories[z];

      if (categoriesList.indexOf(category) == -1) {
        categoriesList.push(category);
      }
    }
  }

  // tri liste
  booksList.sort();
  authorsList.sort();
  categoriesList.sort();

  for (var x = 0; x < authorsList.length; x++) {
    var option = document.createElement("option");
    option.value = authorsList[x];
    option.innerText = authorsList[x];
    document.getElementById("listAuthors").appendChild(option);
  }

  for (y = 0; y < categoriesList.length; y++) {
    var option = document.createElement("option");
    option.value = categoriesList[y];
    option.innerText = categoriesList[y];
    document.getElementById("listCategories").appendChild(option);
  }

  showBooks(booksList);
  document.getElementById("loading").style.display="none";
}

function showBooks(booksList) {
  document.getElementById("bookList").innerHTML = "";

  for (y = 0; y < booksList.length; y++) {
    var bookCard = document.createElement("div");
    bookCard.setAttribute("class", "card mb-4 p-2 w-25 d-flex mt-2");

    if (
      booksList[y].thumbnailUrl == undefined ||
      booksList[y].thumbnailUrl == null
    ) {
      booksList[y].thumbnailUrl =
        "https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png";
    }

    var titre;

    if (booksList[y].title.length > 20) {
      titre = booksList[y].title.substring(0, 20) + " (...)";
    } else {
      titre = booksList[y].title;
    }

    var isbn = booksList[y].isbn;
    var pages = booksList[y].pageCount;
    var description;
    var descriptionShort;

    if (booksList[y].pageCount == undefined || booksList[y].pageCount == null) {
      pages = "";
    }

    if (
      booksList[y].shortDescription == undefined ||
      booksList[y].shortDescription == null
    ) {
      description = "";
      descriptionShort = "";
    } else {
      if (booksList[y].shortDescription.length > 200) {
        descriptionShort =
          booksList[y].shortDescription.substring(0, 200) + " (...)";
        description = booksList[y].shortDescription;
      } else {
        description = booksList[y].shortDescription;
        descriptionShort = booksList[y].shortDescription;
      }
    }

    var dataPubli;

    try {
      datePubli = new Date(
        booksList[y].publishedDate.dt_txt
      ).toLocaleDateString("fr-FR", options);
    } catch (error) {
      dataPubli = "Pas de date";
    }

    bookCard.innerHTML = `<img src="${booksList[y].thumbnailUrl}"/><h1 class="bookTitle"><span class="infobulle" title="${booksList[y].title}">${titre}</span></h1><span style="font-size:12px;"><b>ISBN: </b>${isbn}</span><br><h4 style="font-size:12px;"><b>Date de publication: </b>${datePubli}</h4><br>`;

    if (pages != "") {
      bookCard.innerHTML +=
        '<p style="font-size:12px;"><b>Nombre de pages: </b>' + pages + "</p>";
    }

    if (description != "") {
      bookCard.innerHTML +=
        '<h4> <span class="infobulle" title="' +
        booksList[y].shortDescription +
        '">' +
        descriptionShort +
        "<span></h4>";
    }

    document.getElementById("bookList").appendChild(bookCard);
  }
}

function ChargeByAuthor() {
  var e = document.getElementById("listAuthors");
  var strAuthors = e.options[e.selectedIndex].innerText;

  var BooksByAuthorsList = new Array();
  if (strAuthors == "") {
    showBooks(booksList);
  } else {
    for (x = 0; x < booksList.length; x++) {
      var BooksByAuthor = booksList[x];
      if (BooksByAuthor.authors.indexOf(strAuthors) !== -1) {
        BooksByAuthorsList.push(BooksByAuthor);
      }
    }
  }

  BooksByAuthorsList.sort();
  showBooks(BooksByAuthorsList);
}

function ChargeByCategories() {
  var e = document.getElementById("listCategories");
  var strCategories = e.options[e.selectedIndex].innerText;

  var BooksByCategories = new Array();
  if (strCategories == "") {
    showBooks(booksList);
  } else {
    for (x = 0; x < booksList.length; x++) {
      var booksCategory = booksList[x];
      if (booksCategory.categories.indexOf(strCategories) !== -1) {
        BooksByCategories.push(booksCategory);
      }
    }
  }

  BooksByCategories.sort();
  showBooks(BooksByCategories);
}
