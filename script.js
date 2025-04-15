function salvarDados(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}
function carregarDados(chave) {
    return JSON.parse(localStorage.getItem(chave)) || [];
}
function cadastrarFuncionario() {
    const nome = document.getElementById("nome").value;
    const cargo = document.getElementById("cargo").value;
    const id = document.getElementById("id").value;
    if (!nome || !cargo || !id) return alert("Preencha todos os campos.");
    const funcionarios = carregarDados("funcionarios");
    funcionarios.push({ nome, cargo, id });
    salvarDados("funcionarios", funcionarios);
    listarFuncionarios();
}
function listarFuncionarios() {
    const lista = document.getElementById("listaFuncionarios");
    if (!lista) return;
    lista.innerHTML = "";
    const funcionarios = carregarDados("funcionarios");
    funcionarios.forEach(f => {
        const li = document.createElement("li");
        li.textContent = `${f.nome} - ${f.cargo} (ID: ${f.id})`;
        lista.appendChild(li);
    });
}
function adicionarProduto() {
    const nome = document.getElementById("produtoNome").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const preco = parseFloat(document.getElementById("preco").value);
    if (!nome || isNaN(quantidade) || isNaN(preco)) return alert("Preencha todos os campos.");
    const produtos = carregarDados("produtos");
    produtos.push({ nome, quantidade, preco });
    salvarDados("produtos", produtos);
    listarProdutos();
}
function listarProdutos() {
    const lista = document.getElementById("listaProdutos");
    if (!lista) return;
    lista.innerHTML = "";
    const produtos = carregarDados("produtos")
    produtos.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.nome} - ${p.quantidade} unidades - R$ ${p.preco.toFixed(2)}`;
        lista.appendChild(li);
    });

}
function carregarSelectsVenda() {
    const funcionarios = carregarDados("funcionarios");
    const produtos = carregarDados("produtos");
    const selectFuncionario = document.getElementById("selectFuncionario");
    const selectProduto = document.getElementById("selectProduto");
    funcionarios.forEach(f => {
        const opt = document.createElement("option");
        opt.value = f.id;
        opt.textContent = f.nome;
        selectFuncionario.appendChild(opt);
    });
    produtos.forEach((p, index) => {
        const opt = document.createElement("option");
        opt.value = index;
        opt.textContent = p.nome;
        selectProduto.appendChild(opt);
    });
}
function registrarVenda() {
    const funcionarioId = document.getElementById("selectFuncionario").value;
    const produtoIndex = document.getElementById("selectProduto").value;
    const quantidadeVendida = parseInt(document.getElementById("qtdVenda").value);
    const produtos = carregarDados("produtos");
    if (produtos[produtoIndex].quantidade < quantidadeVendida) {
        return alert("Estoque insuficiente!");
    }
    produtos[produtoIndex].quantidade -= quantidadeVendida;
    salvarDados("produtos", produtos);
    alert("Venda registrada!");
}
window.onload = () => {
    listarFuncionarios();
    listarProdutos();
    if (document.getElementById("selectFuncionario")) {
        carregarSelectsVenda();
    }
};