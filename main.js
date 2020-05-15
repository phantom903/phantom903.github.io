function loadJson() {
//  var json = require("./settings.json");
  var json;
  var xmlRequest = new XMLHttpRequest();
  xmlRequest.open("GET", "https://phantom903.github.io/settings.json");
  xmlRequest.responseType = "json";
  xmlRequest.send();
  xmlRequest.onload = function () {
    let json = xmlRequest.response;
    console.log(xmlRequest.response);
  }
  console.log(json);
  return JSON.parse(json);
}  

function populateCards() {
  var jsonData = loadJson();
  jsonData.cards.forEach(element => {
    var cardHeader = document.createElement("h4");
    cardHeader.setAttribute("class", "card-title");
    cardHeader.innerHTML = element.title;

    var cardContent = document.createElement("p");
    cardContent.setAttribute("class", "card-text");
    element.links.forEach(link => {
      var cardLink = document.createElement("a");
      cardLink.setAttribute("href", link.url);
      cardLink.innerHTML = link.name;
      cardContent.appendChild(cardLink);
    })

    var cardBlock = document.createElement("div");
    cardBlock.setAttribute("class", "card-block");
    cardBlock.appendChild(cardHeader);
    cardBlock.appendChild(cardContent);
    
    var newCard = document.createElement("div");
    newCard.setAttribute("class", "card text-center");
    newCard.appendChild(cardBlock);
  });
}
