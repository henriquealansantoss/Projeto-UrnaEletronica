let n = '';
const c = (e) => document.querySelector(e);
const cl = (el) => document.querySelectorAll(el);


let seuVotoPara = c('.d-1-1 span');
let cargo = c('.d-1-2 span');
let desc = c('.d-1-4');
let aviso = c('.d-2');
let lateral = c('.d-1-right');
let numeros = c('.d-1-3');
let tela = c('.tela');
let etapaAtual = 0;
let numero = '';
let branco = false;
let votos = [];


cl('.teclado--botao.set').forEach((item, index) => {
    item.addEventListener('click', () => {
        c('.teclado--botao.selected').classList.remove('selected');
        item.classList.add('selected');
        n = c('.teclado--botao.selected').innerText;

        let elNum = c('.numero.pisca');

        if (elNum !== null) {
            elNum.innerHTML = n;
            numero = `${numero}${n}`;

            elNum.classList.remove('pisca');
            if (elNum.nextElementSibling !== null) {
                elNum.nextElementSibling.classList.add('pisca');
            } else {
                atualizaIterface();
                // console.log(numero)
            };
        }
    });
});


function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    branco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    };

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    desc.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
};

function atualizaIterface() {
    let etapa = etapas[etapaAtual];

    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        };
    });


    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        desc.innerHTML = `
        Nome: ${candidato.nome}<br/>
        Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"> <img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="d-1-image"> <img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            }

        }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        desc.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }

}

// c('.teclado--botao').addEventListener('click', () => {
//     n = c('.teclado--botao.selected').innerText;
//     let elNum = c('.numero.pisca');
//     if (elNum !== null) {
//         elNum.innerHTML = n;
//         numero = `${numero}${n}`;

//         elNum.classList.remove('pisca');
//         elNum.nextElementSibling.classList.add('pisca');
//     }
// })

c('.botao--corrige').addEventListener('click', () => {
    comecarEtapa();
});

c('.botao--branco').addEventListener('click', () => {
    branco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    lateral.innerHTML = '';
    desc.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';

});
let votoConfirmado = false;
let fim = false;

c('.botao--confirma').addEventListener('click', () => {
    let etapa = etapas[etapaAtual];


    if (branco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }


    if (votoConfirmado) {
        etapaAtual++;

        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            // c('.tela').innerHTML = '<div class="aviso--giga pisca">FIM!</div>';


            seuVotoPara.style.display = 'none';
            cargo.innerHTML = '';
            desc.innerHTML = '';
            aviso.style.display = 'none';
            lateral.innerHTML = '';
            numeros.innerHTML = '';
            lateral.innerHTML = '';
            desc.innerHTML = '<div class="aviso--giga pisca">FIM!</div>';

            fim = true;
            reload();
            console.log(votos);
            votos=[];
        }
    }
});

comecarEtapa();

function reload() {
    if (fim) {
        setTimeout(() => {
            etapaAtual = 0;
            atualizaIterface();
            comecarEtapa();
        }, 5000);
    }
};


