idatual = 0;

const modal = new bootstrap.Modal(document.getElementById('modalAlterar'));
const modalExcluir = new bootstrap.Modal(document.getElementById('modalExcluir'));
const modalTitle = document.getElementById("exampleModalLabel");





function novo() {
    idatual = -1;
    const txtNome = document.getElementById("txtNome");
    const txtTelefone = document.getElementById("txtTelefone");
    const txtEmail = document.getElementById("txtEmail");
    const txtSenha = document.getElementById("txtSenha");
    modalTitle.innerHTML = '<i class="bi bi-person-fill-add"></i>&nbsp;&nbsp;Cadastrar novo usuário'

    
    
    //Limpa Campo
    txtNome.value = "";
    txtTelefone.value = "";
    txtEmail.value = "";
    txtSenha.value = "";
    
    modal.show();
}

function alterar(id) {
    idatual = id;
    //carregar os dados do id passado por parâmetro
    fetch("http://127.0.0.1:3333/usuario/"+ id)
        .then(response => response.json())
        .then(dados => {
            const txtNome = document.getElementById("txtNome");
            const txtTelefone = document.getElementById("txtTelefone");
            const txtEmail = document.getElementById("txtEmail");
            const txtSenha = document.getElementById("txtSenha");
           
            txtNome.value = dados.nome;
            txtTelefone.value = dados.telefone;
            txtEmail.value = dados.email;
            txtSenha.value = dados.senha;

            //mostra a dialog para alterar
                modalTitle.innerHTML = '<i class="bi bi-pencil-fill"></i>&nbsp;&nbsp;Editar usuário'
            modal.show();
        });
}

function listar() {
    const lista = document.getElementById("lista");
    lista.innerHTML='<tr><td colspan="5" ><div style="display: flex;flex-direction: row;">  <img src="https://i.gifer.com/ZKZg.gif" alt="" srcset="" height="30px">  <h3 style="margin-left: 10px;">Carregando</h3></tr></td>'
    console.log('aqui')
    txtpesquisa = document.getElementById("txtpesquisa");


    fetch("http://127.0.0.1:3333/usuario?pesquisa=" + txtpesquisa.value)
        .then(response => response.json())
       .then(dados => mostrar(dados));
    
}

function mostrar(dados) {
    console.log(dados)
    const lista = document.getElementById("lista");
    //limpa lista
    lista.innerHTML = "";
    // percorre dados
    for (var i in dados) {
        let id = dados[i].idusuario;
        console.log(dados[i])
        lista.innerHTML += "<tr>"
            + "<td>" + dados[i].idusuario + "</td>"
            + "<td>" + dados[i].nome + "</td>"
            + "<td>" + dados[i].telefone + "</td>"
            + "<td>" + dados[i].email + "</td>"
            + '<td>' 
            +'<button class="btn btn-outline-success" onclick="alterar('+id+')"> <i class="bi bi-pencil"></i></button > '
            + '<button class="btn btn-outline-danger" onclick="excluir('+id+')"><i class="bi bi-trash"></i></button>'
            +'</td > '
            + "</tr>";
    }
}

function excluir(id) {
    idatual = id;
    modalExcluir.show()
}

function excluirSim() {
        fetch( "http://127.0.0.1:3333/usuario/" + idatual,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "DELETE",
                body: ""
            }
        ).then(() => {
            //abre a dialog
            modalExcluir.hide();
            //recarrega a lista
            listar();
        })
}

function salvar() {
    const txtNome = document.getElementById("txtNome");
    const txtTelefone = document.getElementById("txtTelefone");
    const txtEmail = document.getElementById("txtEmail");
    const txtSenha = document.getElementById("txtSenha");

    const dados = {
        nome: txtNome.value,
        telefone: txtTelefone.value,
        email: txtEmail.value,
        senha: txtSenha.value
    }
    var url;
    var metodo;
    if (idatual < 0) {
        //inserir
        url = "http://127.0.0.1:3333/usuario";
        metodo = "POST";
    } else {
        //alterar
        url = "http://127.0.0.1:3333/usuario/" + idatual;
        metodo = "PUT"
    }

        fetch(url,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: metodo,
                body: JSON.stringify(dados)
            }
        ).then(() => {
            //abre a dialog
            modal.hide();
            //recarrega a lista
            listar();
        })
    
}

listar();
