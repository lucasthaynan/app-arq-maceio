

// função dos botoes de menu da home

let btnsHome = document.querySelectorAll("section#home div.btn-menu")

let pages = document.querySelectorAll("section")

btnsHome.forEach(buttonMenu => {
    // console.log(buttonMenu)
    buttonMenu.addEventListener("click", e => {

        // console.log(buttonMenu.classList[1])

        

        // ocultando todas as páginas quando um botao for clicado
        pages.forEach(pagina => {
            pagina.style.display = "none"
        })

        let classBtn = buttonMenu.classList[1]

        // exibindo apenas a página do botão clicado
        document.querySelector(`section#${classBtn}`).style.display = "block"
        
        // corrindo bug do scroll da página
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    })
})


// ativando o botão de voltar das páginas

let btnVoltar = document.querySelectorAll("div.arrow")

console.log(btnVoltar)

btnVoltar.forEach(voltar => {

    voltar.addEventListener("click", e => {

        // ocultando todas as páginas quando um botao for clicado
        pages.forEach(pagina => {
            pagina.style.display = "none"
        })
    
        // exibindo apenas a home 
        document.querySelector(`section#home`).style.display = "block"

        // corrindo bug do scroll da página
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    
    })

    

})



// Faz a solicitação fetch para obter o conteúdo do arquivo CSV
// os dados foram tabulados no google sheets usando importxml

let dadosMaterias 

fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRX8ZduXbFmkpUfHZqMIp1IABi_x2ABiBQxg3SpZ5OvetjHTJe80JVJixvOv0R_fU7UyS8ravWdvqv0/pub?gid=2105305031&single=true&output=csv")
  .then(response => response.text())
  .then(csvText => {
    // Analisa o conteúdo do CSV com a biblioteca Papa Parse
    const results = Papa.parse(csvText, {
      header: true, // indica que a primeira linha contém cabeçalhos de coluna
      delimiter: ",", // especifica o delimitador do CSV (padrão é ",")
    });

    // Transforma os dados em objetos
    const objects = [];
    results.data.forEach(row => {
      const obj = {};
      Object.keys(row).forEach(key => {
        obj[key.trim()] = row[key].trim();
      });
      objects.push(obj);
    });

    // Faça algo com os objetos, como exibi-los no console
    // console.log(objects);
    dadosMaterias = objects

    // chamando função de adicionar matérias na home
    addNewsHome(dadosMaterias)
    
  })
  .catch(error => console.error(error));



  function addNewsHome(data) {


    // Container para as notícias
    const containerNoticias = document.querySelector('.container-news');
    
    // Cria um elemento HTML para cada objeto e adiciona-os ao container de notícias
    data.forEach(noticia => {
        // Cria o elemento principal
        const divNoticia = document.createElement('div');
        divNoticia.className = 'news';
    
        // Cria a imagem
        const imgNoticia = document.createElement('img');
        imgNoticia.src = noticia.photo;
        imgNoticia.alt = noticia.titulo;
        divNoticia.appendChild(imgNoticia);
    
        // Cria o conteúdo de texto
        const divTextos = document.createElement('div');
        divTextos.className = 'textos';
    
        const pNoticia = document.createElement('p');
        pNoticia.textContent = noticia.date_publish;
        divTextos.appendChild(pNoticia);
    
        const aNoticia = document.createElement('a');
        aNoticia.href = noticia.url;
        aNoticia.target = '_blank';
    
        const h2Noticia = document.createElement('h2');
        h2Noticia.textContent = noticia.titulo;
        aNoticia.appendChild(h2Noticia);
    
        divTextos.appendChild(aNoticia);
    
        divNoticia.appendChild(divTextos);
    
        // Adiciona o elemento ao container de notícias
        containerNoticias.appendChild(divNoticia);
  });

    document.getElementById("loading-spinner").style.display = "none"
  
  }



//   Pegando dados das Paróquias


fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRX8ZduXbFmkpUfHZqMIp1IABi_x2ABiBQxg3SpZ5OvetjHTJe80JVJixvOv0R_fU7UyS8ravWdvqv0/pub?gid=1201232551&single=true&output=csv")
  .then(response => response.text())
  .then(csvText => {
    // Analisa o conteúdo do CSV com a biblioteca Papa Parse
    const results = Papa.parse(csvText, {
      header: true, // indica que a primeira linha contém cabeçalhos de coluna
      delimiter: ",", // especifica o delimitador do CSV (padrão é ",")
    });

    // Transforma os dados em objetos
    const objects = [];
    results.data.forEach(row => {
      const obj = {};
      Object.keys(row).forEach(key => {
        obj[key.trim()] = row[key].trim();
      });
      objects.push(obj);
    });

    // Faça algo com os objetos, como exibi-los no console
    console.log(objects);
    // dadosMaterias = objects

    // chamando função de adicionar as paroquias
    addParoquia(objects)
    
  })
  .catch(error => console.error(error));




function addParoquia(dadosObjetos) {

        // Selecionando o elemento pai
    const elementoPai = document.querySelector(".list-view");

    // Iterando sobre cada objeto e criando um novo elemento para cada um
    dadosObjetos.forEach(objeto => {
        // Criando o novo elemento
        const novoElemento = document.createElement("div");

        // Adicionando as classes e atributos desejados
        novoElemento.classList.add("paroquia");
        novoElemento.setAttribute("id", `p${objeto.cod_paroquia}`);

        // Adicionando o conteúdo do objeto no novo elemento
        novoElemento.innerHTML = `
            <h2 class="nome">${objeto.paroquia} Apóstolo</h2>
            <p class="local">${objeto.bairro}</p>
        `;
        novoElemento.style.backgroundImage = `url("${objeto.foto_fachada_final}")`;

        // Adicionando o novo elemento como filho do elemento pai
        elementoPai.appendChild(novoElemento);
});

}


// ativando filtro de busca da página de paróquias

// const searchInput = document.getElementById("search-input");
// const paroquias = document.querySelectorAll(".list-view .paroquia");

// searchInput.addEventListener("input", function() {
//   const searchTerm = searchInput.value.toLowerCase();

//   console.log("opa")

//   paroquias.forEach(function(paroquia) {
//     const nome = paroquia.querySelector(".nome").textContent.toLowerCase();
//     const local = paroquia.querySelector(".local").textContent.toLowerCase();
//     const containsSearchTerm = nome.includes(searchTerm) || local.includes(searchTerm);

//     if (containsSearchTerm) {
//       paroquia.style.display = "block";
      
//     } else {
//       paroquia.style.display = "none";
//       console.log(paroquia)
//     }
//   });
// });

// Função para remover acentos de uma string
function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const input = document.getElementById("search-input");

input.addEventListener("input", () => {

  const filter = removeAccents(input.value.toLowerCase());
  const paroquias = document.querySelectorAll(".list-view .paroquia");

  paroquias.forEach(paroquia => {
    const nome = removeAccents(paroquia.querySelector(".nome").textContent.toLowerCase());
    const local = removeAccents(paroquia.querySelector(".local").textContent.toLowerCase());
    if (nome.includes(filter) || local.includes(filter)) {
      paroquia.style.display = "flex";
    } else {
      paroquia.style.display = "none";
    }
  });
});

