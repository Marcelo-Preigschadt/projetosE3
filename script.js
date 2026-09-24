const tema = document.querySelector('#tema');
const publico = document.querySelector('#publico');
const formato = document.querySelector('#formato');
const textoPrompt = document.querySelector('#textoPrompt');
const copiar = document.querySelector('#copiarPrompt');

function atualizarPrompt() {
  const assunto = tema.value.trim() || '[tema do projeto]';
  const destinatarios = publico.value.trim() || '[público]';
  textoPrompt.textContent = `Quero criar ${assunto} para ${destinatarios}. Proponha ${formato.value}. Use linguagem clara, indique o que precisa ser verificado e organize a resposta em etapas que eu possa revisar e adaptar.`;
  copiar.textContent = 'Copiar ↗';
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
