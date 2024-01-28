const urlInput = document.querySelector("input[type='url']");
const area = document.querySelector(".textbox");
urlInput.addEventListener("click", (evt) =>{
  let text = evt.currentTarget.value;
  if (text === "")
    return;
   window.open("google.com/search?=allo", "_blank");
});
const form = document.getElementById("info");
form.addEventListener("submit", (evt) =>{
  evt.preventDefault();
  const name = document.getElementById("nom").value;
  const article = document.getElementById("article_title").value;
  const site = document.getElementById("article_site").value;
  const website = document.getElementById("website").value;
  area.innerHTML = copyToClipboard(name, article, site, website);
})
const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Décembre"];

function getDate(){
  var text = "[Page consultée le "
  const now = new Date();
  text += now.getDate() + " ";
  text += monthNames[now.getMonth()] + " ";
  text += now.getFullYear() + "]";
  return text;
}

function copyToClipboard(name, article, site, website){
  const date = getDate();
  if (name !== "") {name += ", ";} 
  let text = "<p>" + name + "« " + article + " », " + "<i>" + site+ `</i> [En ligne], <a href="${website}">`+ website +  "</a>, "+ date + ".</p>";
  writeOnClipboard(text);  
  return text;
}


async function writeOnClipboard(text){
        const type = "text/html";
        const blob = new Blob([text], {type});
        const data = [new ClipboardItem({[type]:blob})];
        await navigator.clipboard.write(data);
        alert("It worked");
}
