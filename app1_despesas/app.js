class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia 
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor 
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }

        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return (parseInt(proximoId) +1)
    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id',id)
    }

    recuperarTodosRegistros() {

        //array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        //recuperar todas as despesas cadastradas em localStorage
        for(let i = 1; i <= id; i++) {
            //Recupera a despesa e converte p/ objeto literal
            let despesa = JSON.parse(localStorage.getItem(i))

            //verificar a possibilidade de existir índices que foram pulados/removidos
            if(despesa === null) {
                continue
            }
            
            despesas.push(despesa)
        }

        return (despesas)
    }
}

let bd = new Bd()

function cadastrarDespesa() {

   let ano = document.getElementById('ano')
   let mes = document.getElementById('mes')
   let dia = document.getElementById('dia')
   let tipo = document.getElementById('tipo')
   let descricao = document.getElementById('descricao')
   let valor = document.getElementById('valor')

   let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

   function modificaModalSucesso () {
    document.getElementById('conteudo-modal').innerText = 'Dados registrado com Sucesso!'
    document.getElementById('titulo-modal').className = 'modal-header text-success'
    document.getElementById('titulo-modal').innerText = 'Dados Gravados com Sucesso!'
    document.getElementById('botao-modal').innerText = 'Voltar'
    document.getElementById('botao-modal').className = 'btn btn-success'
}

function modificaModalErro () {
    document.getElementById('conteudo-modal').innerText = 'Dados invalidos, complete os campos.'
    document.getElementById('botao-modal').innerText = 'Voltar e Corrigir'
    document.getElementById('titulo-modal').innerText = 'Erro na Gravação!'
    document.getElementById('titulo-modal').className = 'modal-header text-danger'
    document.getElementById('botao-modal').className = 'btn btn-danger'
}

   if(despesa.validarDados()) {
        bd.gravar(despesa)
        $('#modalRegistraDespesa').modal('show')

        //limpa o campo após o envio dos dados
        let a = ['ano', 'mes', 'dia', 'tipo', 'descricao', 'valor']
        for(let i in a){
           document.getElementById(a[i]).value = ''
        }

        return modificaModalSucesso()
   } else {
       $('#modalRegistraDespesa').modal('show')
       return modificaModalErro()
   } 
   
}

function carregaListaDespesas() {
    let despesas = Array()

   despesas = bd.recuperarTodosRegistros()

   //selecionando o elemento tbody da tabela
   let listaDespesas = document.getElementById('lista-despesas')

   //percorrer o array despesas de forma dinamica
   despesas.forEach(function(d){
       console.log(d)

       //criando a linhas (tr)
       let linha = listaDespesas.insertRow()

       //criar as colunas (td)
       linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
       //ajustar o tipo
       switch (parseInt(d.tipo)) {
            case 1 : d.tipo = 'Alimentação'
                break 
            case 2 : d.tipo = 'Educação'
                break 
            case 3 : d.tipo = 'Lazer'
                break 
            case 4 : d.tipo = 'Saúde'
                break 
            case 5 : d.tipo = 'Transporte'
                break 
       }
       linha.insertCell(1).innerHTML = d.tipo
       linha.insertCell(2).innerHTML = d.descricao
       linha.insertCell(3).innerHTML = d.valor
    


   })
}



