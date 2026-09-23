const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

const hospitais = [

    {
        id: 1,
        nome: "Hospital Geral de Luanda",
        provincia: "Luanda",
        municipio: "Luanda",
        tipo: "Hospital Geral",
        emergencia: true,
        status: "Ativo"
    },

    {
        id: 2,
        nome: "Hospital Geral do Huambo",
        provincia: "Huambo",
        municipio: "Huambo",
        tipo: "Hospital Geral",
        emergencia: true,
        status: "Ativo"
    },

    {
        id: 3,
        nome: "Hospital Geral de Benguela",
        provincia: "Benguela",
        municipio: "Benguela",
        tipo: "Hospital Geral",
        emergencia: true,
        status: "Ativo"
    },

    {
        id: 4,
        nome: "Hospital Provincial da Huíla",
        provincia: "Huíla",
        municipio: "Lubango",
        tipo: "Hospital Provincial",
        emergencia: true,
        status: "Ativo"
    },

    {
        id: 5,
        nome: "Hospital Provincial do Bié",
        provincia: "Bié",
        municipio: "Kuito",
        tipo: "Hospital Provincial",
        emergencia: true,
        status: "Ativo"
    }

];

const doencas = [

    {
        id: 1,
        nome: "HIV",
        categoria: "Infecciosa",
        pagina: "/paginas/hiv.html"
    },

    {
        id: 2,
        nome: "Diabetes",
        categoria: "Crónica",
        pagina: "/simuladores/diabetes.html"
    },

    {
        id: 3,
        nome: "Hipertensão",
        categoria: "Crónica",
        pagina: "/simuladores/hipertensao.html"
    },

    {
        id: 4,
        nome: "Hepatites virais",
        categoria: "Infecciosa",
        pagina: "/simuladores/hepatites.html"
    },

    {
        id: 5,
        nome: "Tuberculose",
        categoria: "Infecciosa",
        pagina: "#"
    },

    {
        id: 6,
        nome: "Malária",
        categoria: "Infecciosa",
        pagina: "#"
    }

];

const noticias = [

    {
        id: 1,
        titulo: "Saúde digital",
        resumo: "A tecnologia pode ajudar a aproximar informação e serviços de saúde.",
        data: "2026-09-01"
    },

    {
        id: 2,
        titulo: "Educação em saúde",
        resumo: "Informação de qualidade pode contribuir para prevenção e procura adequada de cuidados.",
        data: "2026-09-02"
    },

    {
        id: 3,
        titulo: "Inovação hospitalar",
        resumo: "Soluções digitais podem apoiar processos hospitalares quando implementadas com segurança.",
        data: "2026-09-03"
    }

];

app.get("/api/health", (req, res) => {

    res.json({

        status: "online",

        projeto: "SaúdeAngola",

        versao: "2.0.0",

        data: new Date()

    });

});

app.get("/api/hospitais", (req, res) => {

    const q =
        String(req.query.q || "")
        .toLowerCase();

    const provincia =
        String(req.query.provincia || "")
        .toLowerCase();

    const resultado =
        hospitais.filter(hospital => {

            const correspondeNome =
                hospital.nome
                .toLowerCase()
                .includes(q);

            const correspondeProvincia =
                !provincia ||
                hospital.provincia
                .toLowerCase()
                .includes(provincia);

            return
                correspondeNome &&
                correspondeProvincia;

        });

    res.json(resultado);

});

app.get("/api/doencas", (req, res) => {

    res.json(doencas);

});

app.get("/api/noticias", (req, res) => {

    res.json(noticias);

});

app.post("/api/contacto", (req, res) => {

    const {
        nome,
        email,
        mensagem
    } = req.body;

    if (
        !nome ||
        !email ||
        !mensagem
    ) {

        return res.status(400).json({

            sucesso: false,

            mensagem:
                "Preencha todos os campos."

        });

    }

    console.log(
        "Nova mensagem:",
        {
            nome,
            email,
            mensagem
        }
    );

    res.json({

        sucesso: true,

        mensagem:
            "Mensagem recebida com sucesso."

    });

});

app.get("*", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "public",
            "index.html"
        )
    );

});

app.listen(PORT, () => {

    console.log(
        `SaúdeAngola disponível em http://localhost:${PORT}`
    );

});