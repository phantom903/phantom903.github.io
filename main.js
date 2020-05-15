function loadJson() {
//  var json = require("./settings.json");
  var theme = 0;
  var anXmlRequest = new XMLHttpRequest();
  anXmlRequest.open("GET", "https://phantom903.github.io/user.json");
  anXmlRequest.responseType = "json";
  anXmlRequest.send();
  anXmlRequest.onload = function () {
    theme = anXmlRequest.response["theme"];
  }
  var xmlRequest = new XMLHttpRequest();
  xmlRequest.open("GET", "https://phantom903.github.io/settings.json");
  xmlRequest.responseType = "json";
  xmlRequest.send();
  xmlRequest.onload = function () {
    populateCards(xmlRequest.response, theme);
  }
}  

function populateCards(jsonData, theme) {
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
  drawDoc(jsonData, theme);
}

function drawDoc(jsonData, theme) {
  var pallette = jsonData["pallettes"][theme];
  document.body.style.backgroundColor = pallette["bgcolor"];
  document.getElementById("jumbotron").style.backgroundColor = pallette["bgcolor"];
  var cards = document.getElementsByClassName("card");
  for (var i = 0; i < cards.length; i++) {
    cards[i].style.backgroundColor = pallette["bgcolor"];
  }
  var cardtitles = document.getElementsByClassName("card-title");
  for (var i = 0; i < cardtitles.length; i++) {
    cardtitles[i].style.color = pallette["fgcolor"];
  }
  document.getElementById("welcome").style.color = pallette["fgcolor"];
  var palletteCols = new Array();
  palletteCols = pallette["colors"];
  var alllinks = document.getElementsByTagName("a");
  for (var i = 0; i < alllinks.length; i++) {
    alllinks[i].style.color = palletteCols[Math.floor(Math.random() * palletteCols.length)];
    alllinks[i].style.fontSize = "1.2rem";
    alllinks[i].style.textDecoration = "none";
  }
  $("a").hover(function () {
    $(this).css("color", pallette["fgcolor"]);
    $(this).css("font-size", "1.6rem");
  }, function () {
      $(this).css("color", palletteCols[Math.floor(Math.random() * palletteCols.length)]);
      $(this).css("font-size", "1.2rem");
  });
 }
