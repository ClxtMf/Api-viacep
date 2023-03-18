// Pegando os dados que iremos manipular 
const cep = document.querySelector('#cep');
const end = document.querySelector('#endereco');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');

function limparCampos() {
    end.value = "";
    bairro.value = "";
    cidade.value = "";
    estado.value = "";
}


async function pesquisarCep() {
    limparCampos();

    const url = `https://viacep.com.br/ws/${cep.value}/json/`;
    
    if(validarCep(cep.value)) {
        // Buscando o endereço com fetch
        const dados = await fetch(url);
        // Convertendo a requisição para json
        const endereco = await dados.json();

        // Verificando se o endereço tem
        // a propriedade erro
        if (endereco.hasOwnProperty('erro')) {
            alert('Endereço não encontrado!');
        } 
        else {
            // Passando o objeto com o endereço para a função
            // que irá preencher os campos
            preencherFormulario(endereco);
        }      
        
    }
    else {
        alert('CEP inválido');
    }
}


function preencherFormulario(ende) {
    bairro.value = ende.bairro;
    end.value = ende.logradouro;
    cidade.value = ende.localidade;
    estado.value = ende.uf;
}

// Regex para verificar se uma string tem
// apenas digitos entre 0 e 9
// /^[0-9]+$/

function validarCep(cep) {
    if (cep.length == 8 && /^[0-9]+$/.test(cep)) {
        return true;
    }
    else {
        return false
    }
}


// Adicionando evento ao campo de cep
cep.addEventListener('blur', pesquisarCep);


// Verificando se um objeto tem uma determinada 
//chave
// const obj = {'nome': 'Carlos'};
// console.log(obj.hasOwnProperty('nome'));
