jQuery(document).ready(function ($) {
  const srcImg = "images/"; // emplacement des images de l'appli
  const albumDefaultMini = srcImg + "noComicsMini.jpeg";
  const albumDefault = srcImg + "noComics.jpeg";
  const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
  const srcAlbum = "albums/"; // emplacement des images des albums en grand

  // Affichage des albums au chargement de la page
  window.addEventListener("load", display([], true));
  // On empêche le comprotement par default du formulaire à l'envoie
  $("#form").submit((e) => e.preventDefault());

  // Lecture d'un album
  // console.log("Lecture d'un album");
  // var album = albums.get("5");
  // var serie = series.get(album.idSerie);
  // var auteur = auteurs.get(album.idAuteur);
  // console.log(album.titre+" "+serie.nom+" "+auteur.nom);

  // Methode qui retourne un objet pour factoriser le code
  function albumDetails(album) {
    var serie = series.get(album.idSerie);
    var auteur = auteurs.get(album.idAuteur);

    var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;
    nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");

    return {
      serie,
      auteur,
      nomFic,
    };
  }

  // Liste des albums
  // Creation des éléments album de la liste
  // On passe en parametre un tableau vide et un booleen pour éviter d'avoir à afficher tout les albums à chaque recherche
  function display(elt = [], showAll = false) {
    $("#liste").empty();

    for (var [idAlbum, album] of albums.entries()) {
      listElt = document.createElement("div");
      $(listElt).addClass("divElt border");
      $(listElt).attr("id", idAlbum);

      var { serie, auteur, nomFic } = albumDetails(album);
      // On vérifie que les id de notre tableau sont présent dans albums si c' est le cas on l'ajoute à la liste et on l'affiche
      if (showAll || elt.includes(idAlbum)) {
        listElt.innerHTML = `<img src="${
          srcAlbumMini + nomFic + ".jpg"
        }" class="albumMini"> ${album.titre} N°${album.numero}; Série: ${
          serie.nom
        }; Auteur: ${
          auteur.nom
        } <input type="button" value="Ajouter" class="add">`;

        $("#liste").append(listElt);
      }
    } // On recupère l'id du parent et on execute la function addToCart au click
    $(".add").on("click", function () {
      addToCart($(this).parent().attr("id"));
    });
    // Ajout écouteur d'évènement qui au click va ouvrir une modal avec les détails de l'album selectionné grace à son id
    $(".albumMini").on("click", function () {
      $("#myModal").modal();
      const album = albums.get($(this).parent().attr("id"));
      $("#albumContent").html(
        $(this).parent().html() + `<div>${album.prix} €</div>`
      );
    });
  }

  function recherche() {
    var idArray = []; // On initialise un nouveau tableau ne contenant que les id des albums
    var filtre = $("#recherche").val().toLowerCase(); // On recupère la valeur de l'input de recherche et on le transforme en minuscule
    var radioChecked = $('input[name="inlineRadioOptions"]:checked').val(); // On vérifie si un bouton radio est checked et on recup sa valeur

    // Si notre bouton radio est sur Auteur alors on tri les albums par auteur
    if (radioChecked == "auteur") {
      for (var [idAuteur, auteur] of auteurs.entries()) {
        // Recherche des albums de l'auteur après vérification de la correspondance de la valeur de recherche et du nom de l'auteur
        if (auteur.nom.toLowerCase().includes(filtre)) {
          for (var [idAlbum, album] of albums.entries()) {
            // On récupère les id des albums en vérifiant qu'ils ne sont pas déja présent dans le tableau et on l'ajoute
            if (album.idAuteur == idAuteur && idArray.indexOf(idAlbum) == -1) {
              idArray.push(idAlbum);
            }
          }
        }
      }
    }
    // Si notre bouton radio est sur Serie alors on tri les albums par séries
    if (radioChecked == "serie") {
      for (var [idSerie, serie] of series.entries()) {
        // Recherche des albums des series qui contiennent la valeur de notre recherche
        if (serie.nom.toLowerCase().includes(filtre)) {
          for (var [idAlbum, album] of albums.entries()) {
            // On récupère les id des albums en vérifiant qu'ils ne sont pas déja présent dans le tableau et on l'ajoute
            if (album.idSerie == idSerie && idArray.indexOf(idAlbum) == -1) {
              idArray.push(idAlbum);
            }
          }
        }
      }
    }
    // Si notre bouton radio est sur Titre alors on tri les albums par titre
    if (radioChecked == "titre") {
      for (var [idAlbum, album] of albums.entries()) {
        // Recherche des albums par titre qui contiennent la valeur de notre recherche
        // On récupère les id des albums en vérifiant qu'ils ne sont pas déja présent dans le tableau et on l'ajoute
        if (
          album.titre.toLowerCase().includes(filtre) &&
          idArray.indexOf(idAlbum) == -1
        ) {
          idArray.push(idAlbum);
        }
      }
    }
    display(idArray);
  }

  $("#search").click(recherche);
  $("#recherche").on("input", recherche);

  let cart = [];

  function addToCart(idAlbum) {
    // Ajoutez un album au panier
    const album = albums.get(idAlbum); // Récupérez l'album à partir de son id
    // Créez un objet représentant l'album
    const cartItem = {
      quantity: 1, // Ajoutez une propriété quantity
      id: idAlbum, // Ajout d'une propriété id, correspondant à l'id de l'album
    };
    // On vérifie si l'id est déja présent dans le tableau avec une var qui
    var cartIndex = cart.findIndex((item) => item.id == idAlbum);
    if (cartIndex == -1) {
      cart.push(cartItem); // Ajoutez l'objet à la fin du tableau cart
    }
    // Mettez à jour l'affichage du panier
    updateCartDisplay();
  }
  // Maj affichage du panier
  function updateCartDisplay() {
    const $cartItems = $("#cart ul");
    $cartItems.empty();

    let total = 0;
    cart.forEach((item, index) => {
      const album = albums.get(item.id);
      const auteur = auteurs.get(album.idAuteur);
      const li = $("<li>")
        .html(
          ` ${auteur.nom} - ${album.titre} 
                   <button class="minus" data-index="${index}">-</button>
                   <span class="quantity">${item.quantity}</span>
                   <button class="plus" data-index="${index}">+</button><span>&nbsp;&nbsp;&nbsp;</span>
                   <button class="remove-item" data-index="${index}">&times;</button>`
        )
        .data("index", index);
      $cartItems.append(li);
      total += parseFloat(album.prix) * item.quantity; // calcul du total
    });

    $(".total").text(total.toFixed(2)); // affichage du total
  }

  $(document)
    .off("click", ".add-to-cart")
    .on("click", ".add-to-cart", function () {
      const idAlbum = $(this).parent().attr("data-id");
      addToCart(idAlbum);
    });

  // Ajoutez un écouteur d'événement "click" pour la croix
  $(document).on("click", ".remove-item", function () {
    const itemIndex = $(this).data("index");
    removeCartItem(itemIndex);
  });

  function removeCartItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
  }

  // Gestion des boutons + et -

  $(document).on("click", ".plus", function () {
    const itemIndex = $(this).data("index");
    const item = cart[itemIndex];
    item.quantity++;
    updateCartDisplay();
  });

  $(document).on("click", ".minus", function () {
    const itemIndex = $(this).data("index");
    const item = cart[itemIndex];
    if (item.quantity > 1) {
      item.quantity--;
      updateCartDisplay();
    } else {
      removeCartItem(itemIndex);
    }
  });

  // imgAlbum.addEventListener("error", function () {
  //   prbImg(this);
  // });

  // imgAlbumMini.addEventListener("error", function () {
  //   prbImg(this);
  // });

  // var id = document.getElementById("idAlbum");
  // id.addEventListener("change", function () {
  //   getAlbum(this);
  // });

  /**
   * Affichage des images, les effets sont chainés et traités
   * en file d'attente par jQuery d'où les "stop()) et "clearQueue()"
   * pour éviter l'accumulation d'effets si défilement rapide des albums.
   *
   * @param {object jQuery} $albumMini
   * @param {object jQuery} $album
   * @param {string} nomFic
   * @param {string} nomFicBig
   */
  function afficheAlbums($albumMini, $album, nomFicMini, nomFic) {
    $album
      .stop(true, true)
      .clearQueue()
      .fadeOut(100, function () {
        $album.attr("src", nomFic);
        $albumMini
          .stop(true, true)
          .clearQueue()
          .fadeOut(150, function () {
            $albumMini.attr("src", nomFicMini);
            $albumMini.slideDown(200, function () {
              $album.slideDown(200);
            });
          });
      });
  }

  /**
   * Affichage de l'image par défaut si le chargement de l'image de l'album
   * ne s'est pas bien passé
   *
   * @param {object HTML} element
   */
  function prbImg(element) {
    // console.log(element);
    if (element.id === "albumMini") element.src = albumDefaultMini;
    else element.src = albumDefault;
  }
});
