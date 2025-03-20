// manipulação DOM
//Criar um header -> DOM
let header = documents.createElement("header");
//style do header
header.style.backgroundColor = "black";
header.style.height = "8vh";
//adicionar o header -> boddy
document.body.appenChild(header);
documents.body.style.margin = 0;
//Criar uma Navbar
let navBar = document.createElement("div");
navBar.classList.add("navBar")
//adicionar a navBar -> header
header.appenChild(navBar);
//Prencher a navBar
let menuitens = ['Home','About','Products','Contact'];
menuitens.forEach(element => {
    let a = document.createElement("a");
    a.innerText = element;
    a.classList.add("menuItens");
    navBar.appendChild(a);
});

//criando o footer
let footer = document.createElement("footer");
//style do footer
footer.style.backgroundColor = "black";
footer.style.height = "5vh";
footer.style.position = "absolute";
footer.style.bottom = "0";
//adicionar footer -> body
document.bodt.appenChild(footer);
//adicionar elementos -> fotter
let bottomNavBar = document.createElement("div");
bottomNavBar.classList.add("bottomNavBar");
//bottomNavBar -> footer
footer.appendChild(bottomNavBar);
//itens footer
let footerIntens = ["Redes Sociais", "copyright", "Endereço"]
footerIntens.forEach(elements => {
    let a = document.createElement("a");
    a.innerText = element;
    a.classList.add("footerItens");
    bottomNavBar.appendChild(a);
});
