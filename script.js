const select = document.getElementById("author_count");
select.addEventListener("change", (evt)=>{
  const val = evt.currentTarget.value;
  const first = [];
  first.push(document.getElementById("first_name1"));
  first.push(document.getElementById("name1"));
  first.push(document.getElementById("first_name2"));
  first.push(document.getElementById("name2"));
  first.push(document.getElementById("first_name3"));
  first.push(document.getElementById("name3"));
  if (val == 0){
     first.forEach(e => e.style.display = "none"); 
  }
  if (val >= 1){
    first[0].style.display = "block";
    first[1].style.display = "block";
  }
  if (val >= 2){
    first[2].style.display = "block";
    first[3].style.display = "block";
  }
  else if (val < 2){
    first[2].style.display = "none";
    first[3].style.display = "none";
  }
  
  if (val == 3){
    first[4].style.display = "block";
    first[5].style.display = "block";
  }
  else if (val < 3){
    first[4].style.display = "none";
    first[5].style.display = "none";
  }
    
});

function getAuthorsName(){
  const val = select.value;
  if (val == 0)
    return "";
  const names = [];
  for (let i = 1; i <= val; i++){
    names.push(document.querySelector(`#name${i} input`).value);
    names.push(document.querySelector(`#first_name${i} input`).value);
  }
  var string;
  if (val == 1){
    return names[0] + ", " + names[1];
  }
  if (val == 2){
    return `${names[0]}, ${names[1]} et ${names[3]} ${names[2]}`;
  }
  if (val == 3){
    return `${names[0]}, ${names[1]}, ${names[3]} ${names[2].toUpperCase().charAt(0)}. et al.`
  }
}

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
  const lang = document.getElementById("lang").value;
  const name = getAuthorsName();
  const article = document.getElementById("article_title").value;
  const site = document.getElementById("article_site").value;
  const website = document.getElementById("website").value;
  area.innerHTML = copyToClipboard(lang,name, article, site, website);
})
const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Décembre", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDate(lang){
  var text = (lang == "fr") ? "[page consultée le " : "[page consulted the ";
  const now = new Date();
  text += now.getDate() + (lang == "fr" ? "" : "nd") + " ";
  text += monthNames[now.getMonth() + (lang == "fr" ? 0 : 12)] + " ";
  text += now.getFullYear() + "]";
  return text;
}

function copyToClipboard(lang,name, article, site, website){
  const date = getDate(lang);
  if (name !== "") {name += ", ";} 
  let text = "<p>" + name + (lang === "fr" ? "« " : '"') + article + (lang === "fr" ? " », " : ' ", ') + "<i>" + site+ `</i> [${(lang == fr) ? "En ligne" : "Online"}], <a href="${website}">`+ website +  "</a>, "+ date + ".</p>";
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
