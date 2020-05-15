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
  for (var [key, value] of Object.entries(jsonData)) {
    //console.log(value);
    for (var [key1, value1] of Object.entries(value)) {
      //console.log(key1, value1);
      var cardHeader = document.createElement("h4");
      cardHeader.setAttribute("class", "card-title");
      cardHeader.innerHTML = value1["title"];

      var cardContent = document.createElement("p");
      cardContent.setAttribute("class", "card-text");
      for (var [url, name] of Object.entries(value1["links"])) {
        console.log(url);
        var cardLink = document.createElement("a");
        cardLink.setAttribute("href", `${url}`);
        cardLink.innerHTML = `${name}`;
        cardContent.appendChild(cardLink);
      }
      
      var cardBlock = document.createElement("div");
      cardBlock.setAttribute("class", "card-block");
      cardBlock.appendChild(cardHeader);
      cardBlock.appendChild(cardContent);

      var newCard = document.createElement("div");
      newCard.setAttribute("class", "card text-center");
      newCard.appendChild(cardBlock);

      document.getElementById("cards").appendChild(newCard);
    }
  }
}

