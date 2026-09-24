// Adicione os projetos publicados nesta lista. Exemplo:
// { titulo: 'Nome do projeto', descricao: 'Descrição real do trabalho', url: 'https://...', categoria: 'Site' }
const projetos = [];

const listaProjetos = document.querySelector('#listaProjetos');
const estadoVazio = document.querySelector('#estadoVazio');

if (projetos.length) {
  estadoVazio.hidden = true;
  for (const projeto of projetos) {
    const card = document.createElement('article');
    card.className = 'project-card';
    const tag = document.createElement('span');
    tag.className = 'project-type';
    tag.textContent = projeto.categoria;
    const title = document.createElement('h3');
    title.textContent = projeto.titulo;
    const description = document.createElement('p');
    description.textContent = projeto.descricao;
    const link = document.createElement('a');
    link.href = projeto.url;
    link.textContent = 'Conhecer projeto ↗';
    link.setAttribute('aria-label', `Conhecer o projeto ${projeto.titulo}`);
    card.append(tag, title, description, link);
    listaProjetos.append(card);
  }
}

const tema = document.querySelector('#tema');
const publico = document.querySelector('#publico');
const formato = document.querySelector('#formato');
const textoPrompt = document.querySelector('#textoPrompt');
const copiar = document.querySelector('#copiarPrompt');

function atualizarPrompt() {
  const assunto = tema.value.trim() || '[descreva sua ideia]';
  const destinatarios = publico.value.trim() || '[defina o público]';
  textoPrompt.textContent = `Quero criar ${assunto} para ${destinatarios}. Ajude-me com ${formato.value}. Organize a resposta em etapas, use linguagem clara e indique os pontos que devo conferir e adaptar antes de usar.`;
  copiar.textContent = 'Copiar texto';
}

[tema, publico, formato].forEach(campo => campo.addEventListener('input', atualizarPrompt));

copiar.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(textoPrompt.textContent);
    copiar.textContent = 'Copiado ✓';
  } catch {
    const selecao = window.getSelection();
    const intervalo = document.createRange();
    intervalo.selectNodeContents(textoPrompt);
    selecao.removeAllRanges();
    selecao.addRange(intervalo);
    copiar.textContent = 'Selecione e copie';
  }
});

atualizarPrompt();
