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
        return modificaModalSucesso()
   } else {
       $('#modalRegistraDespesa').modal('show')
       return modificaModalErro()
   } 
   
}



