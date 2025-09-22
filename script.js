const dots = document.querySelectorAll('.dot');
const pages = document.querySelectorAll('.page');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const pageNum = document.getElementById('pageNum');
const btnLearn = document.getElementById('btn-learn');
const btnShare = document.getElementById('btn-share');
let idx = 0;

// mostrar página
function show(i) {
  pages.forEach(p => p.classList.remove('show'));
  dots.forEach(d => d.classList.remove('active'));
  pages[i].classList.add('show');
  dots[i].classList.add('active');
  pageNum.textContent = `${i + 1} / ${pages.length}`;
}

// dots (bolinhas)
dots.forEach((d, i) => {
  d.addEventListener('click', () => {
    idx = i;
    show(idx);
  });
});

// botões
prev.addEventListener('click', () => {
  idx = (idx - 1 + pages.length) % pages.length;
  show(idx);
});

next.addEventListener('click', () => {
  idx = (idx + 1) % pages.length;
  show(idx);
});

// teclado
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') next.click();
  if (e.key === 'ArrowLeft') prev.click();
});

// baixar PDF
btnLearn.addEventListener('click', () => {
  const printWindow = window.open('', '_blank');
  const content = `
    <html><head><title>Docker - Guia</title>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <style>body{font-family:Arial;padding:24px;color:#041021} h1{color:#0b1220}</style>
    </head><body>` +
    Array.from(pages).map(p =>
      `<h2>${p.querySelector('h2').innerText}</h2>
       <p>${p.querySelector('.lead').innerText}</p>`
    ).join('<hr/>') +
    `</body></html>`;
  printWindow.document.write(content);
  printWindow.document.close();
  printWindow.print();
});

// compartilhar
btnShare.addEventListener('click', () => {
  if (navigator.share) {
    navigator.share({
      title: 'Mini Guia Docker',
      text: 'Resumo rápido sobre Docker — veja as 3 páginas.',
      url: location.href
    }).catch(() => {});
  } else {
    navigator.clipboard && navigator.clipboard.writeText(location.href);
    alert('Link copiado para a área de transferência');
  }
});

// mostrar primeira página
show(idx);
