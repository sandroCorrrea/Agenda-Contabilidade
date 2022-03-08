const bcrtpt = require('bcryptjs');
const data = new Date();
var dia = new Date();
var mes = new Date();
var ano = new Date();
class Agenda {
    constructor() {
        this.nome = ""
        this.sobrenome = "";
        this.cpf = "";
        this.rg = "";
        this.cep = "";
        this.rua = "";
        this.bairro = "";
        this.cidade = "";
        this.estado = "";
        this.dataNascimento = "";
        this.email = "";
        this.tipoUsuario = "";
        this.celular = "";
    }

    TrataData(dataBanco) {
        var data = dataBanco.toString();

        var retiraCaracteres = data.substring(0, 10);
        //DIA DA SEMANA
        var retiraDiaDaSemana = retiraCaracteres.substring(0, 3);
        var diaDaSemana = this.TratamentoDiaDaSemana(retiraDiaDaSemana);
        //MÊS
        var retiraMes = retiraCaracteres.substring(4, 7);
        var mes = this.TratamentoMes(retiraMes);
        //DIA
        var dia = retiraCaracteres.substring(8, 10);

        var ano = data.substring(10, 15);

        return dia + " / " + mes + " / " + ano;
    }

    TratamentoDiaDaSemana(diaSemana) {
        switch (diaSemana) {
            case "Sun":
                return "Domingo";
            case "Mon":
                return "Segunda-Feira";
            case "Tue":
                return "Terça-Feira";
            case "Wed":
                return "Quarta-Feira";
            case "Thu":
                return "Quinta-Feira";
            case "Fri":
                return "Sexta-Feira";
            case "Sat":
                return "Sábado";
            default:
                return "Data indefinidade";
        }
    }

    TratamentoMes(mes) {
        switch (mes) {
            case "Jan":
                //return "Janeiro";
                return "01";
            case "Feb":
                //return "Fevereiro";
                return "02";
            case "Mar":
                return "03";
                //return "Março";
            case "Apr":
                return "04";
                //return "Abril";
            case "May":
                return "05";
                //return "Maio";
            case "Jun":
                return "06";
                //return "Junho";
            case "Jul":
                return "07";
                //return "Julho";
            case "Aug":
                return "08";
                //return "Agosto";
            case "Sep":
                return "09";
                //return "Setembro";
            case "Oct":
                return "10";
                //return "Outubro";
            case "Nov":
                return "11";
                //return "Novembro";
            case "Dec":
                return "12";
                //return "Dezembro";
            default:
                return "Data indefinidade";
        }
    }
    TrataHora(hora) {
        var converteHora = hora.toString();
        var horaFinal = converteHora.substring(16, 21);
        return horaFinal;
    }

    GeraHashDaSenha(senha) {
        // Hash da Senha Salva no Banco
        var salt = bcrtpt.genSaltSync(10);
        var hash = bcrtpt.hashSync(senha, salt);

        return hash;
    }

    TrataDataBanco(data) {
        data = data.split('-');
        return data[2] + " / " + data[1] + " / " + data[0];
    }

    OcultaCpf(cpf) {
        cpf = cpf.substring(0, 5);

        return cpf + "**.***-**";
    }

    OcultaRg(rg) {
        rg = rg.substring(0, 7);

        return rg + "**.***-*";
    }

    RetornaDataParaComparacao(adate) {
        var splitArray = new Array();

        splitArray = adate.split("-");

        var year = splitArray[0];

        var month = splitArray[1] - 1;

        var day = splitArray[2];

        return new Date(year, month, day);
    }

    RetornaDataAtual() {
        var data = new Date().toLocaleString().substr(0, 10)

        data = data.split('/');

        var ano = data[2];
        var mes = data[1];
        var dia = data[0];

        var data = ano + "-" + mes + "-" + dia;

        data = this.RetornaDataParaComparacao(data);

        return data;
    }

    VerificaNumeroImparPar(numero) {
        if (numero % 2 === 0) {
            return "par";
        } else {
            return "impar";
        }
    }

    TrataNomeUsuario(nomeUsuario) {
        nome = nomeUsuario.split(" ");
        nome = nome[0];

        return nome;
    }

    DataBanco(data) {
        var data = data.split("-");
        return data[2] + " / " + data[1] + " / " + data[0];
    }

}

module.exports = Agenda;