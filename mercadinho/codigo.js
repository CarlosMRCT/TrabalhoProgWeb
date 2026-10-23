const botaoTema = document.getElementById("botao-tema");

botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("modo-escuro");

    if (document.body.classList.contains("modo-escuro")) {
        botaoTema.textContent = "Modo Claro";
    } else {
        botaoTema.textContent = "Modo Escuro";
    }
});

function ativarZoom(el) {
    el.addEventListener("click", () => {
        el.classList.toggle("zoom");
    });
}

const elementosClicaveis = document.querySelectorAll(".clicavel");
elementosClicaveis.forEach((el) => {
    ativarZoom(el);
});

const listaCarrinho = document.getElementById("lista-carrinho");
const textoTotal = document.getElementById("total");
const listaProdutos = document.getElementById("lista-produtos");

function atualizarTotal() {
    const itens = listaCarrinho.getElementsByTagName("li");
    let total = 0;

    for (let i = 0; i < itens.length; i++) {
        total += Number(itens[i].querySelector(".preco-item").textContent);
    }

    textoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function adicionarAoCarrinho(nome, preco) {

    const novoLi = document.createElement("li");
    const texto = document.createElement("span");
    const valorItem = document.createElement("span");
    const botaoRemover = document.createElement("button");


    texto.textContent = `${nome} - R$ `;
    valorItem.textContent = preco.toFixed(2);
    valorItem.classList.add("preco-item");
    botaoRemover.textContent = "Remover";
    botaoRemover.classList.add("botao-remover");

    botaoRemover.addEventListener("click", () => {
        listaCarrinho.removeChild(novoLi);
        atualizarTotal();
    });


    novoLi.appendChild(texto);
    novoLi.appendChild(valorItem);
    novoLi.appendChild(botaoRemover);
    listaCarrinho.appendChild(novoLi);

    atualizarTotal();
}

const botaoLimpar = document.getElementById("botao-limpar");

botaoLimpar.addEventListener("click", () => {
    const itens = listaCarrinho.getElementsByTagName("li");

    while (itens.length > 0) {
        listaCarrinho.removeChild(itens[0]);
    }

    atualizarTotal();
});

function ativarProduto(produto) {
    const botaoAdicionar = produto.querySelector(".botao-adicionar");

    botaoAdicionar.addEventListener("click", () => {
        const nome = produto.querySelector("h3").textContent;
        const preco = Number(produto.querySelector(".preco").textContent);
        adicionarAoCarrinho(nome, preco);
    });

    const botaoRemover = produto.querySelector(".botao-remover");

    botaoRemover.addEventListener("click", () => {
        listaProdutos.removeChild(produto);
    });

    const botaoEditar = produto.querySelector(".botao-editar");
    const titulo = produto.querySelector("h3");
    const valor = produto.querySelector(".preco");
    const imagem = produto.querySelector("img");
    const editarNome = produto.querySelector(".editar-nome");
    const editarPreco = produto.querySelector(".editar-preco");
    const erroEdicao = produto.querySelector(".erro");

    botaoEditar.addEventListener("click", () => {

        if (!produto.classList.contains("editando")) {
            editarNome.value = titulo.textContent;
            editarPreco.value = valor.textContent;
            produto.classList.add("editando");
            botaoEditar.textContent = "Salvar";
            return;
        }

        const nome = editarNome.value.trim();
        const preco = editarPreco.value;

        const erroTextoNome = validaNome(nome);
        if (erroTextoNome) {
            erroEdicao.textContent = erroTextoNome;
            editarNome.classList.add("invalido");
            return;
        }
        editarNome.classList.remove("invalido");
        erroEdicao.textContent = "";

        const erroTextoPreco = validaPreco(preco);
        if (erroTextoPreco) {
            erroEdicao.textContent = erroTextoPreco;
            editarPreco.classList.add("invalido");
            return;
        }
        editarPreco.classList.remove("invalido");
        erroEdicao.textContent = "";

        titulo.textContent = nome;
        valor.textContent = Number(preco).toFixed(2);
        imagem.alt = nome;

        produto.classList.remove("editando");
        botaoEditar.textContent = "Editar";
    });
}

const produtos = document.querySelectorAll(".produto");
produtos.forEach((produto) => {
    ativarProduto(produto);
});

const formulario = document.getElementById("formulario");
const inputNome = document.getElementById("nome");
const inputFoto = document.getElementById("foto");
const inputPreco = document.getElementById("preco");
const erroNome = document.getElementById("erro-nome");
const erroFoto = document.getElementById("erro-foto");
const erroPreco = document.getElementById("erro-preco");

function validaNome(nome) {
    if (nome.length < 3) {
        return "O nome deve ter pelo menos 3 caracteres";
    }

    if (nome.length > 30) {
        return "O nome deve ter no máximo 30 caracteres";
    }
}

function validaFoto(foto) {
    if (foto === "") {
        return "Informe o caminho ou a URL da foto";
    }
}

function validaPreco(preco) {
    if (preco === "" || isNaN(Number(preco)) || Number(preco) <= 0) {
        return "Informe um valor maior que zero";
    }
}

function criarProduto(nome, foto, preco) {
    const artigo = document.createElement("article");
    const imagem = document.createElement("img");
    const titulo = document.createElement("h3");
    const valor = document.createElement("p");
    const valorPreco = document.createElement("span");
    const editarNome = document.createElement("input");
    const editarPreco = document.createElement("input");
    const erroEdicao = document.createElement("span");
    const botao = document.createElement("button");
    const botaoEditar = document.createElement("button");
    const botaoRemover = document.createElement("button");

    artigo.classList.add("produto");

    imagem.src = foto;
    imagem.alt = nome;
    imagem.classList.add("clicavel");

    titulo.textContent = nome;
    valor.textContent = "R$ ";
    valorPreco.textContent = preco.toFixed(2);
    valorPreco.classList.add("preco");

    editarNome.type = "text";
    editarNome.placeholder = "Nome";
    editarNome.classList.add("editar-nome");

    editarPreco.type = "number";
    editarPreco.step = "0.01";
    editarPreco.min = "0";
    editarPreco.placeholder = "Preço";
    editarPreco.classList.add("editar-preco");

    erroEdicao.classList.add("erro");

    botao.textContent = "Adicionar";
    botao.classList.add("botao-adicionar");

    botaoEditar.textContent = "Editar";
    botaoEditar.classList.add("botao-editar");

    botaoRemover.textContent = "Remover";
    botaoRemover.classList.add("botao-remover");

    artigo.appendChild(imagem);
    artigo.appendChild(titulo);
    valor.appendChild(valorPreco);
    artigo.appendChild(valor);
    artigo.appendChild(editarNome);
    artigo.appendChild(editarPreco);
    artigo.appendChild(erroEdicao);
    artigo.appendChild(botao);
    artigo.appendChild(botaoEditar);
    artigo.appendChild(botaoRemover);
    listaProdutos.appendChild(artigo);

    ativarZoom(imagem);
    ativarProduto(artigo);
}

formulario.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const nome = inputNome.value.trim();
    const foto = inputFoto.value.trim();
    const preco = inputPreco.value;

    const erroTextoNome = validaNome(nome);
    if (erroTextoNome) {
        erroNome.textContent = erroTextoNome;
        inputNome.classList.add("invalido");
        return;
    }
    inputNome.classList.remove("invalido");
    erroNome.textContent = "";

    const erroTextoFoto = validaFoto(foto);
    if (erroTextoFoto) {
        erroFoto.textContent = erroTextoFoto;
        inputFoto.classList.add("invalido");
        return;
    }
    inputFoto.classList.remove("invalido");
    erroFoto.textContent = "";

    const erroTextoPreco = validaPreco(preco);
    if (erroTextoPreco) {
        erroPreco.textContent = erroTextoPreco;
        inputPreco.classList.add("invalido");
        return;
    }
    inputPreco.classList.remove("invalido");
    erroPreco.textContent = "";

    criarProduto(nome, foto, Number(preco));

    formulario.reset();
    inputNome.focus();
});
