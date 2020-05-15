function loadJson() {
//  var json = require("./settings.json");
  var xmlRequest = new XMLHttpRequest();
  xmlRequest.open("GET", "https://phantom903.github.io/settings.json");
  xmlRequest.responseType = "json";
  xmlRequest.send();
  xmlRequest.onload = function () {
    populateCards(xmlRequest.response);
  }
}  

function populateCards(jsonData) {
  //var jsonData = JSON.parse(json);
  for (var [key, value] of Object.entries(jsonData["cards"])) {
    //console.log(value);
    //for (var [key1, value1] of Object.entries(value)) {
    //console.log(key1, value1);
    var cardHeader = document.createElement("h4");
    cardHeader.setAttribute("class", "card-title");
    cardHeader.innerHTML = value["title"];

    var cardContent = document.createElement("p");
    cardContent.setAttribute("class", "card-text");
    for (var [key1, value1] of Object.entries(value["links"])) {
      var cardLink = document.createElement("a");
      cardLink.setAttribute("href", value1["url"]);
      cardLink.innerHTML = value1["name"];
      var linkContainer = document.createElement("p");
      linkContainer.appendChild(cardLink);
      cardContent.appendChild(linkContainer);
    }
    
    var cardBlock = document.createElement("div");
    cardBlock.setAttribute("class", "card-block");
    cardBlock.appendChild(cardHeader);
    cardBlock.appendChild(cardContent);

    var newCard = document.createElement("div");
    newCard.setAttribute("class", "card text-center border-0");
    newCard.appendChild(cardBlock);

    document.getElementById("cards").appendChild(newCard);
  //}
  }
  drawDoc(jsonData);
}

function drawDoc(jsonData) {
  pallette = jsonData["pallettes"][0];
  console.log(pallette);
  document.body.style.backgroundColor = jsonData["pallettes"][0]["bgcolor"];
  document.getElementById("jumbotron").style.backgroundColor = jsonData["pallettes"][0]["bgcolor"];
  var cards = document.getElementsByClassName("card");
  for (var i = 0; i < cards.length; i++) {
    cards[i].style.backgroundColor = jsonData["pallettes"][0]["bgcolor"];
  }
  var cardtitles = document.getElementsByClassName("card-title");
  for (var i = 0; i < cardtitles.length; i++) {
    cardtitles[i].style.color = jsonData["pallettes"][0]["fgcolor"];
  }
  document.getElementById("welcome").style.color = jsonData["pallettes"][0]["fgcolor"];
  var pallette = new Array();
  pallette = jsonData["pallettes"][0]["colors"];
  var alllinks = document.getElementsByTagName("a");
  for (var i = 0; i < alllinks.length; i++) {
    alllinks[i].style.color = pallette[Math.floor(Math.random() * pallette.length)];
    alllinks[i].style.fontSize = "1.2rem";
    alllinks[i].style.textDecoration = "none";
  }
  $("a").hover(function () {
    $(this).css("color", jsonData["pallettes"][0]["fgcolor"]);
    $(this).css("font-size", "1.6rem");
  }, function () {
      $(this).css("color", pallette[Math.floor(Math.random() * pallette.length)]);
      $(this).css("font-size", "1.2rem");
  });
 }
