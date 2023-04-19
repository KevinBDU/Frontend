jQuery(document).ready(function ($) {
  const srcImg = "images/"; // emplacement des images de l'appli
  const albumDefaultMini = srcImg + "noComicsMini.jpeg";
  const albumDefault = srcImg + "noComics.jpeg";
  const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
  const srcAlbum = "albums/"; // emplacement des images des albums en grand

  const myModal = $("#myModal");
  window.addEventListener("load", Load);

  // Lecture d'un album
  // function modalAlbum() {
  //   console.log("Lecture d'un album");
  //   var album = albums.get("3");
  //   var serie = series.get(album.idSerie);
  //   var auteur = auteurs.get(album.idAuteur);
  //   console.log(album.titre + " " + serie.nom + " " + auteur.nom);
  // }

  // Liste des albums
  // Creation d'une liste d'albums
  function Load() {
    albums.forEach((album) => {
      tableRow = document.createElement("div");
      $(tableRow).addClass("border");

      serie = series.get(album.idSerie);
      auteur = auteurs.get(album.idAuteur);

      var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;
      nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");

      tableRow.innerHTML = `<img src="${
        srcAlbumMini + nomFic + ".jpg"
      }" id="albumMini"> ${album.titre} N°${album.numero}; Série: ${
        serie.nom
      }; Auteur: ${auteur.nom} <input type="button" value="Ajouter">`;
      $("#liste").append(tableRow);
    });
  }

  // $("#liste").click(() => {
  //   alert("test");
  // });

  // Tri par séries
  function ListBySerie() {
    var SerieList = new Array();

    for (var [idSerie, serie] of series.entries()) {
      // Recherche des albums de la série
      for (var [idAlbum, album] of albums.entries()) {
        if (album.idSerie == idSerie) {
          console.log(
            serie.nom +
              ", Album N°" +
              album.numero +
              " " +
              album.titre +
              ", Auteur:" +
              auteurs.get(album.idAuteur).nom
          );
        }
      }
    }
  }
  $("#inlineRadio3").focus(ListBySerie);

  function ListByAuthor() {
    var AuthorList = new Array();

    for (var [idAuteur, auteur] of auteurs.entries()) {
      // Recherche des albums de l'auteur
      for (var [idAlbum, album] of albums.entries()) {
        var ListByAuthor = 
        if (album.idAuteur == idAuteur && ) {
          AuthorList.push(auteur.nom);
          console.log(AuthorList);
          // console.log(
          //   auteur.nom +
          //     ", Album N°" +
          //     album.numero +
          //     " " +
          //     album.titre +
          //     ", Série:" +
          //     series.get(album.idSerie).nom
          //);
        }
      }
    }
  }
  $("#inlineRadio2").focus(ListByAuthor);

  function search() {
    var Search = $("#search");

  }

  // <!-- chatGPT -->
  // var form = $("#form");
  // var searchInput = form.querySelector("#search");
  // var Albums = $(albums);
  // var searchValue = searchInput.value.toLowerCase();

  // form.addEventListener('submit', (e) => {
  //   e.preventDefault();
  // });
  // Albums.forEach((album) => {
  //   var title = album.titre.textContent.toLowerCase();
  //   if(title.includes(searchValue)) {
  //     album.style.display = "block";
  //   } else {
  //     album.style.display = "none";
  //   }
  // });

  // Affichage des BD
  var txtSerie = document.getElementById("serie");
  var txtNumero = document.getElementById("numero");
  var txtTitre = document.getElementById("titre");
  var txtAuteur = document.getElementById("auteur");
  var txtPrix = document.getElementById("prix");
  var imgAlbum = document.getElementById("album");
  var imgAlbumMini = document.getElementById("albumMini");

  imgAlbum.addEventListener("error", function () {
    prbImg(this);
  });

  imgAlbumMini.addEventListener("error", function () {
    prbImg(this);
  });

  var id = document.getElementById("idAlbum");
  id.addEventListener("change", function () {
    getAlbum(this);
  });

  /**
   * Récupération de l'album par son id et appel de
   * la fonction d'affichage
   *
   * @param {number} num
   */
  function getAlbum(num) {
    var album = albums.get(num.value);

    if (album === undefined) {
      txtSerie.value = "";
      txtNumero.value = "";
      txtTitre.value = "";
      txtAuteur.value = "";
      txtPrix.value = 0;

      afficheAlbums(
        $("#albumMini"),
        $("#album"),
        albumDefaultMini,
        albumDefault
      );
    } else {
      var serie = series.get(album.idSerie);
      var auteur = auteurs.get(album.idAuteur);

      txtSerie.value = serie.nom;
      txtNumero.value = album.numero;
      txtTitre.value = album.titre;
      txtAuteur.value = auteur.nom;
      txtPrix.value = album.prix;

      var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;

      // Utilisation d'une expression régulière pour supprimer
      // les caractères non autorisés dans les noms de fichiers : '!?.":$
      nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");

      afficheAlbums(
        $("#albumMini"),
        $("#album"),
        srcAlbumMini + nomFic + ".jpg",
        srcAlbum + nomFic + ".jpg"
      );
    }
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
