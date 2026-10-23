// ===== Tema claro / escuro =====
const botaoTema = document.getElementById("botao-tema");

botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("modo-escuro");

    if (document.body.classList.contains("modo-escuro")) {
        botaoTema.textContent = "Modo Claro";
    } else {
        botaoTema.textContent = "Modo Escuro";
    }
});

// ===== Zoom ao clicar na foto =====
function ativarZoom(el) {
    el.addEventListener("click", () => {
        el.classList.toggle("zoom");
    });
}

const elementosClicaveis = document.querySelectorAll(".clicavel");
elementosClicaveis.forEach((el) => {
    ativarZoom(el);
});

// ===== Carrinho =====
const listaCarrinho = document.getElementById("lista-carrinho");
const textoTotal = document.getElementById("total");

function atualizarTotal() {
    const itens = listaCarrinho.getElementsByTagName("li");
    let total = 0;

    for (let i = 0; i < itens.length; i++) {
        total += Number(itens[i].dataset.preco);
    }

    textoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function adicionarAoCarrinho(nome, preco) {
    // 1. Fabricar
    const novoLi = document.createElement("li");
    const texto = document.createElement("span");
    const botaoRemover = document.createElement("button");

    // 2. Preencher
    novoLi.dataset.preco = preco;
    texto.textContent = `${nome} - R$ ${preco.toFixed(2)}`;
    botaoRemover.textContent = "Remover";
    botaoRemover.type = "button";
    botaoRemover.classList.add("botao-remover");

    botaoRemover.addEventListener("click", () => {
        listaCarrinho.removeChild(novoLi);
        atualizarTotal();
    });

    // 3. Anexar
    novoLi.appendChild(texto);
    novoLi.appendChild(botaoRemover);
    listaCarrinho.appendChild(novoLi);

    atualizarTotal();
}

// Remove todos os itens do carrinho
const botaoLimpar = document.getElementById("botao-limpar");

botaoLimpar.addEventListener("click", () => {
    const itens = listaCarrinho.getElementsByTagName("li");

    while (itens.length > 0) {
        listaCarrinho.removeChild(itens[0]);
    }

    atualizarTotal();
});

// Liga o botão "Adicionar" de um card de produto ao carrinho
function ativarProduto(produto) {
    const botaoAdicionar = produto.querySelector(".botao-adicionar");

    botaoAdicionar.addEventListener("click", () => {
        const nome = produto.dataset.nome;
        const preco = Number(produto.dataset.preco);
        adicionarAoCarrinho(nome, preco);
    });

    // Remove o card do produto da lista
    const botaoRemover = produto.querySelector(".botao-remover");

    botaoRemover.addEventListener("click", () => {
        listaProdutos.removeChild(produto);
    });

    // Edita nome e preço no próprio card
    const botaoEditar = produto.querySelector(".botao-editar");
    const titulo = produto.querySelector("h3");
    const valor = produto.querySelector("p");
    const editarNome = produto.querySelector(".editar-nome");
    const editarPreco = produto.querySelector(".editar-preco");
    const erroEdicao = produto.querySelector(".erro");

    botaoEditar.addEventListener("click", () => {
        // Primeiro clique: mostra os campos com os valores atuais
        if (!produto.classList.contains("editando")) {
            editarNome.value = produto.dataset.nome;
            editarPreco.value = produto.dataset.preco;
            produto.classList.add("editando");
            botaoEditar.textContent = "Salvar";
            return;
        }

        // Segundo clique: valida e salva
        const nome = editarNome.value.trim();
        const preco = editarPreco.value;

        const temErroNome = mostrarErro(editarNome, erroEdicao, validaNome(nome));
        if (temErroNome) {
            return;
        }

        const temErroPreco = mostrarErro(editarPreco, erroEdicao, validaPreco(preco));
        if (temErroPreco) {
            return;
        }

        produto.dataset.nome = nome;
        produto.dataset.preco = preco;
        titulo.textContent = nome;
        valor.textContent = `R$ ${Number(preco).toFixed(2)}`;

        produto.classList.remove("editando");
        botaoEditar.textContent = "Editar";
    });
}

const produtos = document.querySelectorAll(".produto");
produtos.forEach((produto) => {
    ativarProduto(produto);
});

// ===== Cadastro de produtos =====
const formulario = document.getElementById("formulario");
const inputNome = document.getElementById("nome");
const inputFoto = document.getElementById("foto");
const inputPreco = document.getElementById("preco");
const erroNome = document.getElementById("erro-nome");
const erroFoto = document.getElementById("erro-foto");
const erroPreco = document.getElementById("erro-preco");
const listaProdutos = document.getElementById("lista-produtos");

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
    if (preco === "" || Number(preco) <= 0) {
        return "Informe um valor maior que zero";
    }
}

// Mostra ou limpa a mensagem de erro de um campo
function mostrarErro(input, spanErro, textoErro) {
    if (textoErro) {
        spanErro.textContent = textoErro;
        input.classList.add("invalido");
        return true;
    }

    spanErro.textContent = "";
    input.classList.remove("invalido");
    return false;
}

function criarProduto(nome, foto, preco) {
    // 1. Fabricar
    const artigo = document.createElement("article");
    const imagem = document.createElement("img");
    const titulo = document.createElement("h3");
    const valor = document.createElement("p");
    const editarNome = document.createElement("input");
    const editarPreco = document.createElement("input");
    const erroEdicao = document.createElement("span");
    const botao = document.createElement("button");
    const botaoEditar = document.createElement("button");
    const botaoRemover = document.createElement("button");

    // 2. Preencher
    artigo.classList.add("produto");
    artigo.dataset.nome = nome;
    artigo.dataset.preco = preco;

    imagem.src = foto;
    imagem.alt = nome;
    imagem.classList.add("clicavel");

    titulo.textContent = nome;
    valor.textContent = `R$ ${preco.toFixed(2)}`;

    editarNome.type = "text";
    editarNome.classList.add("editar-nome");

    editarPreco.type = "number";
    editarPreco.step = "0.01";
    editarPreco.min = "0";
    editarPreco.classList.add("editar-preco");

    erroEdicao.classList.add("erro");

    botao.textContent = "Adicionar";
    botao.type = "button";
    botao.classList.add("botao-adicionar");

    botaoEditar.textContent = "Editar";
    botaoEditar.type = "button";
    botaoEditar.classList.add("botao-editar");

    botaoRemover.textContent = "Remover";
    botaoRemover.type = "button";
    botaoRemover.classList.add("botao-remover");

    // 3. Anexar
    artigo.appendChild(imagem);
    artigo.appendChild(titulo);
    artigo.appendChild(valor);
    artigo.appendChild(editarNome);
    artigo.appendChild(editarPreco);
    artigo.appendChild(erroEdicao);
    artigo.appendChild(botao);
    artigo.appendChild(botaoEditar);
    artigo.appendChild(botaoRemover);
    listaProdutos.appendChild(artigo);

    // Elementos criados depois precisam receber os eventos também
    ativarZoom(imagem);
    ativarProduto(artigo);
}

formulario.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const nome = inputNome.value.trim();
    const foto = inputFoto.value.trim();
    const preco = inputPreco.value;

    const temErroNome = mostrarErro(inputNome, erroNome, validaNome(nome));
    const temErroFoto = mostrarErro(inputFoto, erroFoto, validaFoto(foto));
    const temErroPreco = mostrarErro(inputPreco, erroPreco, validaPreco(preco));

    if (temErroNome || temErroFoto || temErroPreco) {
        return;
    }

    criarProduto(nome, foto, Number(preco));

    formulario.reset();
    inputNome.focus();
});
