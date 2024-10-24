// Função para validar CPF (apenas se tem 11 dígitos)
function validarCPF(cpf) {
    return cpf.length === 11;
}

// Carregar Funcionários do localStorage
function carregarFuncionarios() {
    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    const funcionarioResponsavel = document.getElementById('funcionario-responsavel');
    funcionarioResponsavel.innerHTML = '<option value="">Selecione um funcionário</option>';
    funcionarios.forEach(funcionario => {
        const option = document.createElement('option');
        option.value = funcionario.nome;
        option.textContent = funcionario.nome;
        funcionarioResponsavel.appendChild(option);
    });
}

// Cadastrar Funcionário
document.getElementById('cadastro-funcionario').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome-funcionario').value;
    const cpf = document.getElementById('cpf-funcionario').value;

    if (nome === '' || !validarCPF(cpf)) {
        alert('Preencha os campos corretamente! O CPF deve ter 11 dígitos.');
        return;
    }

    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    funcionarios.push({ nome, cpf });
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    
    carregarFuncionarios();
    alert('Funcionário cadastrado com sucesso!');
    this.reset();
});

// Cadastrar Pedido
document.getElementById('cadastro-pedido').addEventListener('submit', function(e) {
    e.preventDefault();
    const nomePedido = document.getElementById('nome-pedido').value;
    const descricao = document.getElementById('descricao-pedido').value;
    const responsavel = document.getElementById('funcionario-responsavel').value;
    const status = document.getElementById('status-pedido').value;

    if (nomePedido === '' || descricao === '' || responsavel === '') {
        alert('Preencha todos os campos!');
        return;
    }

    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push({ nomePedido, descricao, responsavel, status });
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    
    listarPedidos();
    alert('Pedido cadastrado com sucesso!');
    this.reset();
});

// Listar Pedidos
function listarPedidos(filtro = '') {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const listaPedidos = document.getElementById('lista-pedidos');
    listaPedidos.innerHTML = '';

    pedidos
        .filter(pedido => filtro === '' || pedido.status === filtro)
        .forEach((pedido, index) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p><strong>Pedido:</strong> ${pedido.nomePedido}</p>
                <p><strong>Descrição:</strong> ${pedido.descricao}</p>
                <p><strong>Responsável:</strong> ${pedido.responsavel}</p>
                <p><strong>Status:</strong> ${pedido.status}</p>
                <button onclick="atualizarStatus(${index})">Atualizar Status</button>
            `;
            listaPedidos.appendChild(div);
        });
}

// Atualizar Status do Pedido
function atualizarStatus(index) {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const statusAtual = pedidos[index].status;
    const proximosStatus = {
        'A Fazer': 'Fazendo',
        'Fazendo': 'Pronto para Entrega',
        'Pronto para Entrega': 'Pronto para Entrega'
    };
    pedidos[index].status = proximosStatus[statusAtual];
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    listarPedidos();
}

// Filtro de Pedidos por Status
document.getElementById('filtro-status').addEventListener('change', function() {
    listarPedidos(this.value);
});

// Inicialização
carregarFuncionarios();
listarPedidos();
