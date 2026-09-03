/* =====================================================
   EMPREGA ANGOLA 
   JAVASCRIPT PRINCIPAL
===================================================== */


/* ==========================================
   FALA ÚNICA DO ROBÔ
========================================== */

const textoInicial = `
Olá, e seja muito bem-vindo ao Emprega Angola.

Vamos usar a tecnologia para melhorar as condiçõesdo nosso país e ajudar a sociedade.

Esta plataforma foi criada para aproximartalentos, empresas e instituições em Angola.

Aqui encontrará oportunidades nas áreas detecnologia, saúde e educação.

Faça a sua candidatura, participe nas avaliações,acompanhe os resultados e consulte as oportunidades.

A tecnologia pode transformar vidas,criar oportunidades e contribuir para o desenvolvimentode Angola.

Sua oportunidade de se integrar no mercado de trabalho está no Emprega Angola.
Obrigado.
`;


/* ==========================================
   FALAR
========================================== */

function falar(texto) {

    if (!("speechSynthesis" in window)) {
        return;
    }

    // Cancela qualquer fala anterior
    window.speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "pt-PT";

    voz.rate = 0.92;

    voz.pitch = 1.05;

    voz.volume = 1;


    // Procurar uma voz portuguesa
    const vozes =
        window.speechSynthesis.getVoices();

    const vozPortuguesa =
        vozes.find(function(voice) {

            return voice.lang
                .toLowerCase()
                .startsWith("pt");

        });


    if (vozPortuguesa) {

        voz.voice = vozPortuguesa;

    }


    window.speechSynthesis.speak(voz);

}


/* ==========================================
   FALAR SOMENTE UMA VEZ
========================================== */

let roboJaFalou = false;


function falarMensagemInicial() {

    if (roboJaFalou) {

        return;

    }


    roboJaFalou = true;


    const mensagem =
        document.getElementById(
            "robotSpeech"
        );


    if (mensagem) {

        mensagem.textContent =
            "Vamos usar a tecnologia para melhorar as condições do nosso país e ajudar a sociedade.";

    }


    falar(textoInicial);

}


/* ==========================================
   INICIALIZAÇÃO
========================================== */

window.addEventListener(
    "load",
    function() {

        setTimeout(function() {

            falarMensagemInicial();

        }, 700);

    }
);


/* ==========================================
   ENTRAR NO SITE
========================================== */

function entrarNoSite() {

    const intro =
        document.getElementById("introIA");

    const site =
        document.getElementById("sitePrincipal");


    // Para completamente qualquer fala
    if ("speechSynthesis" in window) {

        window.speechSynthesis.cancel();

    }


    if (intro) {

        intro.classList.add("hide");

    }


    if (site) {

        site.classList.remove(
            "site-escondido"
        );

    }

}

function fecharVozPrioritaria() {

    const vozPrioritaria =
        document.getElementById(
            "vozPrioritaria"
        );


    if (vozPrioritaria) {

        vozPrioritaria.classList.add(
            "removido"
        );

    }

}


function falarFuncionamento() {

    const texto = `
    O funcionamento do Emprega Angola é simples.

    Primeiro escolha uma área profissional.

    Depois selecione uma oportunidade.

    Preencha os seus dados pessoais e profissionais.

    O sistema realiza uma avaliação automática
    com base nas informações fornecidas.

    Os candidatos com melhor classificação
    podem avançar para a fase de verificação.

    Na fase de verificação, o candidato selecionado
    deve apresentar documentação académica
    e profissional válida.

    A decisão final de contratação deve ser feita
    pela instituição ou empresa responsável pela vaga.
    `;

    falar(texto);

}


/* =====================================================
   CARROSSEL
===================================================== */

let slideAtual = 0;

function moverSlide(direcao) {

    const track =
        document.getElementById("carouselTrack");

    if (!track) return;

    const slides =
        track.querySelectorAll(".slide");

    if (!slides.length) return;

    slideAtual += direcao;

    if (slideAtual < 0) {

        slideAtual = slides.length - 1;

    }

    if (slideAtual >= slides.length) {

        slideAtual = 0;

    }

    const largura =
        slides[0].offsetWidth + 20;

    track.style.transform =
        `translateX(-${slideAtual * largura}px)`;

}


/* Carrossel automático */

setInterval(function() {

    if (document.getElementById("carouselTrack")) {

        moverSlide(1);

    }

}, 5000);


/* =====================================================
   CANDIDATURA
===================================================== */

function abrirCandidatura(vaga, area) {

    localStorage.setItem(
        "vagaSelecionada",
        vaga
    );

    localStorage.setItem(
        "areaSelecionada",
        area
    );

    window.location.href =
        "candidatura.html";

}


/* Preencher automaticamente a vaga */

document.addEventListener("DOMContentLoaded", function() {

    const vaga =
        localStorage.getItem("vagaSelecionada");

    const area =
        localStorage.getItem("areaSelecionada");

    const especialidade =
        document.getElementById("especialidade");

    const areaInput =
        document.getElementById("area");

    if (vaga && especialidade) {

        especialidade.value = vaga;

    }

    if (area && areaInput) {

        areaInput.value = area;

    }

});


/* =====================================================
   AVALIAÇÃO AUTOMÁTICA
===================================================== */

function calcularPontuacao() {

    const formacao =
        document.getElementById("formacao").value;

    const experiencia =
        Number(
            document.getElementById("experiencia").value
        );

    const teste =
        Number(
            document.getElementById("teste").value
        );

    let pontosFormacao = 0;


    switch(formacao) {

        case "medio":
            pontosFormacao = 45;
            break;

        case "tecnico":
            pontosFormacao = 60;
            break;

        case "licenciatura":
            pontosFormacao = 80;
            break;

        case "mestrado":
            pontosFormacao = 90;
            break;

        case "doutoramento":
            pontosFormacao = 100;
            break;

    }


    /*
       Experiência:

       máximo de 100 pontos,
       limitada a 10 anos para este protótipo.
    */

    let pontosExperiencia =
        Math.min(experiencia * 10, 100);


    /*
       Peso dos critérios:
       Formação: 30%
       Experiência: 30%
       Teste: 40%
    */

    const pontuacao = Math.round(

        pontosFormacao * 0.30 +

        pontosExperiencia * 0.30 +

        teste * 0.40

    );

    return pontuacao;

}


/* =====================================================
   GUARDAR CANDIDATURA
===================================================== */

const formCandidatura =
    document.getElementById("formCandidatura");


if (formCandidatura) {

    formCandidatura.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const pontuacao =
                calcularPontuacao();


            const candidato = {

                id:
                    Date.now(),

                nome:
                    document.getElementById("nome").value,

                email:
                    document.getElementById("email").value,

                telefone:
                    document.getElementById("telefone").value,

                area:
                    document.getElementById("area").value,

                especialidade:
                    document.getElementById("especialidade").value,

                formacao:
                    document.getElementById("formacao").value,

                experiencia:
                    document.getElementById("experiencia").value,

                teste:
                    document.getElementById("teste").value,

                competencias:
                    document.getElementById("competencias").value,

                pontuacao:
                    pontuacao,

                certificado:
                    document.getElementById("certificado").files.length > 0,

                data:
                    new Date().toLocaleString("pt-AO"),

                status:
                    pontuacao >= 70
                    ? "Selecionado para verificação"
                    : "Em análise"

            };


            let candidatos =
                JSON.parse(
                    localStorage.getItem("candidatos")
                ) || [];


            candidatos.push(candidato);


            localStorage.setItem(
                "candidatos",
                JSON.stringify(candidatos)
            );


            const resultado =
                document.getElementById(
                    "resultadoCandidatura"
                );


            resultado.innerHTML = `

                <div class="resultado">

                    <h2>
                        Candidatura enviada!
                    </h2>

                    <div class="nota-score">
                        ${pontuacao}/100
                    </div>

                    <p>
                        A sua candidatura foi registada
                        no sistema.
                    </p>

                    <p>
                        Estado:
                        <strong>
                        ${candidato.status}
                        </strong>
                    </p>

                    ${
                        pontuacao >= 70
                        ?
                        `
                        <p>
                        Parabéns! O seu perfil atingiu
                        a pontuação mínima para avançar
                        para a etapa de verificação.
                        </p>
                        `
                        :
                        `
                        <p>
                        A sua candidatura permanecerá
                        registada para análise.
                        </p>
                        `
                    }

                </div>

            `;


            formCandidatura.reset();


            localStorage.removeItem(
                "vagaSelecionada"
            );

            localStorage.removeItem(
                "areaSelecionada"
            );

        }
    );

}


/* =====================================================
   ADMINISTRADOR
===================================================== */

const adminForm =
    document.getElementById("adminForm");


if (adminForm) {

    adminForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const pass =
                document.getElementById(
                    "adminPass"
                ).value;

            const senha =
                document.getElementById(
                    "adminSenha"
                ).value;


            /*
               DEMONSTRAÇÃO FRONTEND.

               NÃO utilize isto em produção.
            */

            const PASS_ADMIN =
                "946997926";

            const SENHA_ADMIN =
                "Cândida";


            if (
                pass === PASS_ADMIN &&
                senha === SENHA_ADMIN
            ) {

                document.getElementById(
                    "loginAdmin"
                ).style.display = "none";


                document.getElementById(
                    "painelAdmin"
                ).classList.remove("escondido");


                carregarPainel();

            } else {

                document.getElementById(
                    "erroAdmin"
                ).textContent =
                    "Passe ou senha incorretos.";

            }

        }
    );

}


/* =====================================================
   CARREGAR PAINEL
===================================================== */

function carregarPainel() {

    mostrarCandidatos();

}


/* =====================================================
   MOSTRAR CANDIDATOS
===================================================== */

function mostrarCandidatos() {

    const lista =
        document.getElementById(
            "listaCandidatos"
        );

    if (!lista) return;


    let candidatos =
        JSON.parse(
            localStorage.getItem("candidatos")
        ) || [];


    const filtro =
        document.getElementById(
            "filtroArea"
        )?.value || "Todos";


    if (filtro !== "Todos") {

        candidatos =
            candidatos.filter(
                candidato =>
                    candidato.area === filtro
            );

    }


    candidatos.sort(
        (a,b) =>
            b.pontuacao - a.pontuacao
    );


    lista.innerHTML = "";


    if (!candidatos.length) {

        lista.innerHTML = `

            <div class="resultado">

                <h3>
                    Ainda não existem candidatos.
                </h3>

                <p>
                    As candidaturas aparecerão aqui
                    quando forem enviadas.
                </p>

            </div>

        `;

    }


    candidatos.forEach(function(candidato) {

        const card =
            document.createElement("div");

        card.className =
            "candidato-card";


        card.innerHTML = `

            <div>

                <h3>
                    ${escaparHTML(candidato.nome)}
                </h3>

                <p>
                    Área:
                    ${escaparHTML(candidato.area)}
                </p>

                <p>
                    Especialidade:
                    ${escaparHTML(candidato.especialidade)}
                </p>

                <p>
                    Formação:
                    ${escaparHTML(candidato.formacao)}
                </p>

                <p>
                    Experiência:
                    ${candidato.experiencia} anos
                </p>

                <span class="status ${
                    candidato.pontuacao >= 70
                    ? "aprovado"
                    : "analise"
                }">

                    ${escaparHTML(candidato.status)}

                </span>

            </div>


            <div>

                <div class="candidato-score">

                    ${candidato.pontuacao}/100

                </div>

                <small>

                    ${candidato.data}

                </small>

            </div>

        `;


        lista.appendChild(card);

    });


    atualizarEstatisticas();

    mostrarVerificacao();

}


/* =====================================================
   ESTATÍSTICAS
===================================================== */

function atualizarEstatisticas() {

    const candidatos =
        JSON.parse(
            localStorage.getItem("candidatos")
        ) || [];


    const selecionados =
        candidatos.filter(
            c => c.pontuacao >= 70
        );


    const verificacao =
        selecionados.filter(
            c => c.certificado
        );


    const total =
        document.getElementById(
            "totalCandidatos"
        );

    const totalSelecionados =
        document.getElementById(
            "totalSelecionados"
        );

    const totalVerificacao =
        document.getElementById(
            "totalVerificacao"
        );


    if (total) {

        total.textContent =
            candidatos.length;

    }


    if (totalSelecionados) {

        totalSelecionados.textContent =
            selecionados.length;

    }


    if (totalVerificacao) {

        totalVerificacao.textContent =
            verificacao.length;

    }

}


/* =====================================================
   VERIFICAÇÃO
===================================================== */

function mostrarVerificacao() {

    const container =
        document.getElementById(
            "listaVerificacao"
        );

    if (!container) return;


    const candidatos =
        JSON.parse(
            localStorage.getItem("candidatos")
        ) || [];


    const vencedores =
        candidatos.filter(
            candidato =>
                candidato.pontuacao >= 70
        );


    container.innerHTML = "";


    if (!vencedores.length) {

        container.innerHTML = `

            <div class="resultado">

                <p>
                    Ainda não existem candidatos
                    selecionados para verificação.
                </p>

            </div>

        `;

        return;

    }


    vencedores.forEach(function(candidato) {

        const div =
            document.createElement("div");

        div.className =
            "verificacao-card";


        div.innerHTML = `

            <h3>
                ${escaparHTML(candidato.nome)}
            </h3>

            <p>
                Área:
                ${escaparHTML(candidato.area)}
            </p>

            <p>
                Especialidade:
                ${escaparHTML(candidato.especialidade)}
            </p>

            <p>
                Pontuação:
                <strong>
                    ${candidato.pontuacao}/100
                </strong>
            </p>

            <p>

                Certificado:

                <strong>

                    ${
                        candidato.certificado
                        ? "Documento enviado"
                        : "Documento pendente"
                    }

                </strong>

            </p>

            ${
                candidato.certificado
                ?
                `
                <button
                    onclick="verificarCandidato(${candidato.id})"
                >
                    ✓ Marcar como verificado
                </button>
                `
                :
                `
                <p style="color:#c47b00;">
                    Solicitar certificado académico
                    antes da contratação.
                </p>
                `
            }

        `;


        container.appendChild(div);

    });

}


/* =====================================================
   VERIFICAR CANDIDATO
===================================================== */

function verificarCandidato(id) {

    let candidatos =
        JSON.parse(
            localStorage.getItem("candidatos")
        ) || [];


    candidatos =
        candidatos.map(
            candidato => {

                if (candidato.id === id) {

                    candidato.status =
                        "Documentação verificada";

                    candidato.verificado =
                        true;

                }

                return candidato;

            }
        );


    localStorage.setItem(
        "candidatos",
        JSON.stringify(candidatos)
    );


    mostrarCandidatos();

    alert(
        "Candidato marcado como verificado."
    );

}


/* =====================================================
   SAIR
===================================================== */

function sairAdmin() {

    window.location.href =
        "index.html";

}


/* =====================================================
   PROTEÇÃO CONTRA HTML INJETADO
===================================================== */

function escaparHTML(texto) {

    if (texto === undefined || texto === null) {

        return "";

    }


    return String(texto)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* ==========================================
   SISTEMA DE VENCEDORES
========================================== */

function obterVencedores() {

    return JSON.parse(
        localStorage.getItem("vencedoresEmpregaAngola")
    ) || [];

}


/* ==========================================
   PUBLICAR VENCEDOR
========================================== */

const formularioVencedor =
    document.getElementById("formVencedor");


if (formularioVencedor) {

    formularioVencedor.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nome =
                document.getElementById(
                    "nomeVencedor"
                ).value.trim();


            const area =
                document.getElementById(
                    "areaVencedor"
                ).value;


            const especialidade =
                document.getElementById(
                    "especialidadeVencedor"
                ).value.trim();


            const pontuacao =
                document.getElementById(
                    "pontuacaoVencedor"
                ).value;


            const codigo =
                document.getElementById(
                    "codigoCandidato"
                ).value.trim();


            const data =
                document.getElementById(
                    "dataResultado"
                ).value;


            const vencedor = {

                id: Date.now(),

                nome: nome,

                area: area,

                especialidade:
                    especialidade,

                pontuacao:
                    Number(pontuacao),

                codigo: codigo,

                data: data

            };


            const vencedores =
                obterVencedores();


            vencedores.push(vencedor);


            localStorage.setItem(

                "vencedoresEmpregaAngola",

                JSON.stringify(vencedores)

            );


            alert(
                "Vencedor publicado com sucesso!"
            );


            formularioVencedor.reset();


            mostrarVencedoresAdmin();

        }

    );

}


/* ==========================================
   MOSTRAR NO ADMINISTRADOR
========================================== */

function mostrarVencedoresAdmin() {

    const lista =
        document.getElementById(
            "listaAdminVencedores"
        );


    if (!lista) return;


    const vencedores =
        obterVencedores();


    lista.innerHTML = "";


    if (vencedores.length === 0) {

        lista.innerHTML = `

            <p style="
                color:#71838d;
                padding:20px 0;
            ">

                Nenhum vencedor publicado ainda.

            </p>

        `;

        return;

    }


    vencedores.forEach(function(vencedor) {

        const elemento =
            document.createElement("div");


        elemento.className =
            "admin-vencedor";


        elemento.innerHTML = `

            <div class="admin-vencedor-info">

                <h4>
                    ${escaparHTML(vencedor.nome)}
                </h4>

                <p>
                    Área:
                    ${escaparHTML(vencedor.area)}
                </p>

                <p>
                    Especialidade:
                    ${escaparHTML(vencedor.especialidade)}
                </p>

                <p>
                    Pontuação:
                    <strong>
                        ${vencedor.pontuacao}/100
                    </strong>
                </p>

                <p>
                    Código:
                    ${escaparHTML(vencedor.codigo)}
                </p>

            </div>


            <button
                class="btn-remover"
                onclick="removerVencedor(${vencedor.id})"
            >

                Remover

            </button>

        `;


        lista.appendChild(elemento);

    });

}


/* ==========================================
   REMOVER VENCEDOR
========================================== */

function removerVencedor(id) {

    const confirmar =
        confirm(
            "Tem certeza que deseja remover este vencedor?"
        );


    if (!confirmar) return;


    let vencedores =
        obterVencedores();


    vencedores =
        vencedores.filter(
            function(vencedor) {

                return vencedor.id !== id;

            }
        );


    localStorage.setItem(

        "vencedoresEmpregaAngola",

        JSON.stringify(vencedores)

    );


    mostrarVencedoresAdmin();

}


/* ==========================================
   LIMPAR TODOS
========================================== */

function limparTodosVencedores() {

    const confirmar =
        confirm(
            "Deseja realmente apagar todos os vencedores publicados?"
        );


    if (!confirmar) return;


    localStorage.removeItem(
        "vencedoresEmpregaAngola"
    );


    mostrarVencedoresAdmin();

}


/* ==========================================
   PROTEÇÃO CONTRA HTML INJETADO
========================================== */

function escaparHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;

}


/* ==========================================
   CARREGAR LISTA NO ADMIN
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        mostrarVencedoresAdmin();

    }
);

/* ==========================================
   MOSTRAR VENCEDORES NA PÁGINA PÚBLICA
========================================== */

function mostrarVencedoresPublicos() {

    const container =
        document.getElementById(
            "vencedoresPublicados"
        );


    if (!container) return;


    const vencedores =
        obterVencedores();


    container.innerHTML = "";


    if (vencedores.length === 0) {

        container.innerHTML = `

            <div class="nenhum-resultado">

                <div>
                    📋
                </div>

                <h3>
                    Resultados ainda não publicados
                </h3>

                <p>
                    Os resultados dos concursos serão
                    disponibilizados nesta página após
                    a publicação oficial.
                </p>

            </div>

        `;

        return;

    }


    vencedores.forEach(function(vencedor, index) {

        const card =
            document.createElement("div");


        card.className =
            "vencedor-publicado";


        card.innerHTML = `

            <div class="vencedor-publicado-numero">

                ${String(index + 1).padStart(2, "0")}

            </div>


            <div class="vencedor-publicado-info">

                <span class="vencedor-area">

                    ${escaparHTML(vencedor.area)}

                </span>


                <h3>

                    ${escaparHTML(vencedor.nome)}

                </h3>


                <p>

                    ${escaparHTML(
                        vencedor.especialidade
                    )}

                </p>


                <small>

                    Código:
                    ${escaparHTML(vencedor.codigo)}

                </small>

            </div>


            <div class="vencedor-publicado-pontuacao">

                <strong>
                    ${vencedor.pontuacao}
                </strong>

                <span>
                    /100
                </span>

            </div>


            <div class="vencedor-verificacao">

                ✓ Selecionado

            </div>

        `;


        container.appendChild(card);

    });

}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        mostrarVencedoresPublicos();

    }
);

/* =========================================================
   CARTEIRA PROFISSIONAL
========================================================= */

const especialidades = {

    Tecnologia: [

        "Programação Front-end",

        "Programação Back-end",

        "Full Stack",

        "Desenvolvimento Mobile",

        "Redes de Computadores",

        "Cibersegurança",

        "Suporte Técnico",

        "Banco de Dados",

        "Inteligência Artificial"

    ],


    Saúde: [

        "Enfermagem",

        "Medicina",

        "Farmácia",

        "Análises Clínicas",

        "Radiologia",

        "Fisioterapia",

        "Nutrição",

        "Técnico de Saúde"

    ],


    Educação: [

        "Professor do Ensino Geral",

        "Educação Infantil",

        "Matemática",

        "Língua Portuguesa",

        "Informática",

        "Formação Profissional",

        "Gestão Escolar"

    ],


    Administração: [

        "Administração Pública",

        "Gestão Administrativa",

        "Recursos Humanos",

        "Contabilidade",

        "Finanças",

        "Gestão de Projetos"

    ]

};


function atualizarEspecialidades() {

    const area =
        document.getElementById("area");

    const especialidade =
        document.getElementById(
            "especialidade"
        );


    if (!area || !especialidade) {

        return;

    }


    especialidade.innerHTML =
        `<option value="">
            Selecionar especialidade
        </option>`;


    if (!especialidades[area.value]) {

        return;

    }


    especialidades[area.value]
        .forEach(function(item) {

            const option =
                document.createElement(
                    "option"
                );

            option.value = item;

            option.textContent = item;

            especialidade.appendChild(
                option
            );

        });

}


/* =========================================================
   PRÉ-VISUALIZAÇÃO DA FOTO
========================================================= */

const campoFoto =
    document.getElementById("foto");


if (campoFoto) {

    campoFoto.addEventListener(
        "change",
        function(event) {

            const arquivo =
                event.target.files[0];


            if (!arquivo) {

                return;

            }


            const leitor =
                new FileReader();


            leitor.onload =
                function(e) {

                    const preview =
                        document.getElementById(
                            "fotoPreview"
                        );


                    preview.innerHTML = `

                        <img
                            src="${e.target.result}"
                            alt="Foto do candidato"
                        >

                    `;

                };


            leitor.readAsDataURL(arquivo);

        }
    );

}


/* =========================================================
   CRIAÇÃO DA CARTEIRA
========================================================= */

const formCarteira =
    document.getElementById(
        "formCarteira"
    );


if (formCarteira) {

    formCarteira.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const mensagem =
                document.getElementById(
                    "mensagemCarteira"
                );


            const candidato = {

                id:
                    "EA-" +
                    Date.now(),

                nome:
                    document.getElementById(
                        "nome"
                    ).value.trim(),

                bi:
                    document.getElementById(
                        "bi"
                    ).value.trim(),

                nascimento:
                    document.getElementById(
                        "nascimento"
                    ).value,

                sexo:
                    document.getElementById(
                        "sexo"
                    ).value,

                telefone:
                    document.getElementById(
                        "telefone"
                    ).value.trim(),

                email:
                    document.getElementById(
                        "email"
                    ).value.trim(),

                provincia:
                    document.getElementById(
                        "provincia"
                    ).value,

                municipio:
                    document.getElementById(
                        "municipio"
                    ).value.trim(),

                nivel:
                    document.getElementById(
                        "nivel"
                    ).value,

                curso:
                    document.getElementById(
                        "curso"
                    ).value.trim(),

                instituicao:
                    document.getElementById(
                        "instituicao"
                    ).value.trim(),

                area:
                    document.getElementById(
                        "area"
                    ).value,

                especialidade:
                    document.getElementById(
                        "especialidade"
                    ).value,

                experiencia:
                    document.getElementById(
                        "experiencia"
                    ).value.trim(),

                dataCriacao:
                    new Date().toISOString()

            };


            const candidatos =
                JSON.parse(
                    localStorage.getItem(
                        "candidatosEmpregaAngola"
                    )
                ) || [];


            candidatos.push(candidato);


            localStorage.setItem(

                "candidatosEmpregaAngola",

                JSON.stringify(candidatos)

            );


           mensagem.style.color = "#23603d";

mensagem.innerHTML = `

    <div class="carteira-sucesso">

        <div class="sucesso-icone">
            ✓
        </div>

        <h3>
            Carteira criada com sucesso!
        </h3>

        <p>
            Parabéns, <strong>${candidato.nome}</strong>.
        </p>

        <p>
            A sua carteira profissional foi criada
            e você está agora
            <strong>APTO PARA SE CANDIDATAR</strong>
            às oportunidades disponíveis.
        </p>

        <div class="codigo-candidato">

            Código do candidato:

            <strong>
                ${candidato.id}
            </strong>

        </div>

        <p>
            As informações sobre a sua candidatura
            serão enviadas para:
        </p>

        <strong>
            ${candidato.email}
        </strong>

        <br><br>

        <a
            href="candidatura.html"
            class="btn-candidatar"
        >
            CANDIDATAR-ME AGORA
        </a>

    </div>

`;


            formCarteira.reset();


            document.getElementById(
                "fotoPreview"
            ).innerHTML = `
                <span>👤</span>
            `;

        }
    );

}

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const bloqueio =
            document.getElementById(
                "bloqueioCarteira"
            );

        const area =
            document.getElementById(
                "areaCandidatura"
            );


        // Só executa na página de candidatura
        if (!bloqueio || !area) {

            return;

        }


        const candidatos =
            JSON.parse(
                localStorage.getItem(
                    "candidatosEmpregaAngola"
                )
            ) || [];


        /*
         * Se não existe carteira:
         * candidatura continua bloqueada.
         */

        if (candidatos.length === 0) {

            bloqueio.style.display =
                "block";

            area.classList.remove(
                "liberada"
            );

            return;

        }


        /*
         * Se já existe carteira:
         * libera a candidatura.
         */

        bloqueio.style.display =
            "none";

        area.classList.add(
            "liberada"
        );

    }
);