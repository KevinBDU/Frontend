jQuery(document).ready(function ($) {
  const srcImg = "images/"; // emplacement des images de l'appli
  const albumDefaultMini = srcImg + "noComicsMini.jpeg";
  const albumDefault = srcImg + "noComics.jpeg";
  const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
  const srcAlbum = "albums/"; // emplacement des images des albums en grand

  // Affichage des albums au chargement de la page
  window.addEventListener("load", display([], true));
  $("#form").submit((e) => e.preventDefault());

  // Lecture d'un album
  // console.log("Lecture d'un album");
  // var album = albums.get("5");
  // var serie = series.get(album.idSerie);
  // var auteur = auteurs.get(album.idAuteur);
  // console.log(album.titre+" "+serie.nom+" "+auteur.nom);

  // Liste des albums
  // Creation des éléments album de la liste

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

  function display(elt = [], showAll = false) {
    $("#liste").empty();

    for (var [idAlbum, album] of albums.entries()) {
      listElt = document.createElement("div");
      $(listElt).addClass("divElt border");
      $(listElt).attr("id", idAlbum);

      var { serie, auteur, nomFic } = albumDetails(album);

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
    }
    $(".add").on("click", function () {
      addToCart($(this).parent().attr("id"));
    });

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

  $("#search").click(() => recherche());
  $("#recherche").on("input", recherche);

  let cart = [];

  function addToCart(idAlbum) {
    // Ajoutez un album au panier
    const album = albums.get(idAlbum); // Récupérez l'album à partir de son id
    const cartItem = {
      // Créez un objet représentant l'album
      quantity: 1, // Ajoutez une propriété quantity
      id: idAlbum,
    };
    var cartIndex = cart.findIndex((item) => item.id == idAlbum);
    if (cartIndex == -1) {
      cart.push(cartItem); // Ajoutez l'objet à la fin du tableau cart
    }
    // Mettez à jour l'affichage du panier
    updateCartDisplay();
  }

  function updateCartDisplay() {
    const $cartItems = $("#cart ul");
    $cartItems.empty();

    let total = 0;
    console.log(cart);
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
      total += parseFloat(album.prix) * item.quantity;
    });

    $(".total").text(total.toFixed(2));
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

  // Tri par série
  // function listBySerie() {
  //   console.log("Liste des albums par série");
  //   for (var [idSerie, serie] of series.entries()) {
  //     // Recherche des albums de la série
  //     for (var [idAlbum, album] of albums.entries()) {
  //       if (album.idSerie == idSerie) {
  //         console.log(
  //           serie.nom +
  //             ", Album N°" +
  //             album.numero +
  //             " " +
  //             album.titre +
  //             ", Auteur:" +
  //             auteurs.get(album.idAuteur).nom
  //         );
  //       }
  //     }
  //   }
  // }
  // $("#inlineRadio3").focus(listBySerie);

  // Tri par auteur
  // function listByAuteur() {
  //   console.log("Liste des albums par auteur");
  //   for (var [idAuteur, auteur] of auteurs.entries()) {
  //     // Recherche des albums de l'auteur
  //     for (var [idAlbum, album] of albums.entries()) {
  //       if (album.idAuteur == idAuteur) {
  //         console.log(
  //           auteur.nom +
  //             ", Album N°" +
  //             album.numero +
  //             " " +
  //             album.titre +
  //             ", Série:" +
  //             series.get(album.idSerie).nom
  //         );
  //       }
  //     }
  //   }
  // }
  // $("#inlineRadio2").focus(listByAuteur);

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
   * Récupération de l'album par son id et appel de
   * la fonction d'affichage
   *
   * @param {number} num
   */
  function getAlbum(num) {
    var album = albums.get(num.value);

    // on initialise un nouveau tableau (qui ne contient que les clés des albums... la longueur sera la meme que la longueur de la map albums)
    var albumsKeys = albums.keys();
    var albumKey;

    //on refait une boucle sur la map des albums
    albums.forEach((album2) => {
      // sur le tableau des clés, la fonction next().value va donner la clé suivante
      // ainsi vu qu'on est dans une boucle sur les albums, à chaque passage
      // la valeur va changer
      albumKey = albumsKeys.next().value;

      //on compare l'album de la boucle avec l'album que l'on veut afficher
      if (album.titre == album2.titre) {
        console.log(" Clé de l'album " + albumKey);
        console.log(
          "La valeur de num passé en paramètre de la fonction est " + num
        );

        // on peut ainsi adapter la chose pour mettre un id dans notre balise
        // que ce soit le bouton ajouter au panier (par exemple id="btn-" + albumKey )
        // ou notre card pr l'affichage de la modal à qui on va passer un paramètre à savoir l'albumKey
      }
    });

    var serie = series.get(album.idSerie);
    var auteur = auteurs.get(album.idAuteur);

    var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;

    // Utilisation d'une expression régulière pour supprimer
    // les caractères non autorisés dans les noms de fichiers : '!?.":$
    nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");

    // afficheAlbums(
    //   $("#albumMini"),
    //   $("#album"),
    //   srcAlbumMini + nomFic + ".jpg",
    //   srcAlbum + nomFic + ".jpg"
    // );
  }

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
