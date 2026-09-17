const botaoMenu = document.getElementById("botaoMenu");
const menu = document.getElementById("menu");

const botaoPesquisa = document.getElementById("botaoPesquisa");
const caixaPesquisa = document.getElementById("caixaPesquisa");
const campoPesquisa = document.getElementById("campoPesquisa");

const modalNoticia = document.getElementById("modalNoticia");
const fecharModal = document.getElementById("fecharModal");

const mensagem = document.getElementById("mensagem");

let temporizadorMensagem;

const noticias = {
    futebol: {
        titulo: "O espaço virou a principal disputa do jogo",
        texto:
            "Linhas compactas e pressão coordenada estão acelerando a recuperação da posse. A principal diferença aparece quando a equipe transforma o roubo de bola em ataque antes que o adversário consiga reorganizar a defesa.",
        numero: "7,8 s",
        legenda: "Tempo médio até a finalização"
    },

    basquete: {
        titulo: "Defesas mais móveis redefinem os playoffs",
        texto:
            "Trocas rápidas, proteção do garrafão e contestação no perímetro reduziram os arremessos livres. Os ataques respondem com circulação mais veloz e bloqueios realizados fora da bola.",
        numero: "42%",
        legenda: "Dos pontos vieram do perímetro"
    },

    atletismo: {
        titulo: "Centésimos revelam uma nova geração",
        texto:
            "Técnica de saída, potência e controle de passada aproximam jovens atletas das melhores marcas. O foco agora é transformar regularidade em resultados internacionais.",
        numero: "0,18 s",
        legenda: "Evolução média na temporada"
    }
};

function mostrarMensagem(texto) {
    clearTimeout(temporizadorMensagem);

    mensagem.textContent = texto;
    mensagem.classList.add("mostrar");

    temporizadorMensagem = setTimeout(() => {
        mensagem.classList.remove("mostrar");
    }, 2500);
}

function fecharMenu() {
    menu.classList.remove("aberto");
    document.body.classList.remove("menu-aberto");
}

botaoMenu.addEventListener("click", () => {
    menu.classList.toggle("aberto");
    document.body.classList.toggle("menu-aberto");
});

document.querySelectorAll(".menu-link").forEach((link) => {
    link.addEventListener("click", () => {
        document.querySelectorAll(".menu-link").forEach((item) => {
            item.classList.remove("ativo");
        });

        link.classList.add("ativo");
        fecharMenu();
    });
});

botaoPesquisa.addEventListener("click", () => {
    caixaPesquisa.classList.toggle("aberta");

    if (caixaPesquisa.classList.contains("aberta")) {
        setTimeout(() => campoPesquisa.focus(), 200);
    }
});

caixaPesquisa.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const pesquisa = campoPesquisa.value.trim().toLowerCase();

    if (pesquisa === "") {
        mostrarMensagem("Digite alguma palavra para pesquisar.");
        return;
    }

    const cards = [...document.querySelectorAll(".noticia")];

    const resultado = cards.find((card) => {
        return card.textContent.toLowerCase().includes(pesquisa);
    });

    if (resultado) {
        resultado.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        resultado.animate(
            [
                { outline: "3px solid transparent" },
                { outline: "3px solid #93c500" },
                { outline: "3px solid transparent" }
            ],
            {
                duration: 1500
            }
        );

        caixaPesquisa.classList.remove("aberta");
        mostrarMensagem("Conteúdo encontrado.");
    } else {
        mostrarMensagem(`Nenhum resultado para "${campoPesquisa.value}".`);
    }
});

document.querySelectorAll(".filtro").forEach((botao) => {
    botao.addEventListener("click", () => {
        document.querySelectorAll(".filtro").forEach((item) => {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        const filtroSelecionado = botao.dataset.filtro;

        document.querySelectorAll(".noticia").forEach((noticia) => {
            const categoria = noticia.dataset.categoria;

            const deveAparecer =
                filtroSelecionado === "todos" ||
                categoria === filtroSelecionado;

            noticia.classList.toggle("oculta", !deveAparecer);
        });
    });
});

document.querySelectorAll(".abrir-noticia").forEach((botao) => {
    botao.addEventListener("click", () => {
        const tipoNoticia = botao.dataset.noticia;
        const noticia = noticias[tipoNoticia];

        document.getElementById("modalTitulo").textContent =
            noticia.titulo;

        document.getElementById("modalTexto").textContent =
            noticia.texto;

        document.getElementById("modalNumero").textContent =
            noticia.numero;

        document.getElementById("modalLegenda").textContent =
            noticia.legenda;

        modalNoticia.showModal();
    });
});

fecharModal.addEventListener("click", () => {
    modalNoticia.close();
});

modalNoticia.addEventListener("click", (evento) => {
    if (evento.target === modalNoticia) {
        modalNoticia.close();
    }
});

document.querySelectorAll(".botao-lembrete").forEach((botao) => {
    botao.addEventListener("click", () => {
        const estaAtivado = botao.classList.toggle("ativado");

        if (estaAtivado) {
            botao.innerHTML = "<span>×</span> Ativado";
            mostrarMensagem("Lembrete ativado.");
        } else {
            botao.innerHTML = "<span>+</span> Lembrar";
            mostrarMensagem("Lembrete removido.");
        }
    });
});

const secoes = document.querySelectorAll("main section[id]");

const observador = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) {
                return;
            }

            document.querySelectorAll(".menu-link").forEach((link) => {
                const linkDaSecao =
                    link.getAttribute("href") === `#${entrada.target.id}`;

                link.classList.toggle("ativo", linkDaSecao);
            });
        });
    },
    {
        threshold: 0.35
    }
);

secoes.forEach((secao) => {
    observador.observe(secao);
});

document.getElementById("anoAtual").textContent =
    new Date().getFullYear();