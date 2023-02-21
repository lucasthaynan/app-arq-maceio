

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
    
    })

})


