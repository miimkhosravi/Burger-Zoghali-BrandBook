const content = document.querySelector('.content');
const chapters = [...document.querySelectorAll('.chapter')];
const hero = document.querySelector('.hero');
const closing = document.querySelector('.closing');
document.querySelector('.topbar').remove();
const deck = document.createElement('div');
deck.className = 'slide-deck';
deck.setAttribute('aria-label', 'اسلایدهای برندبوک');
const slides = [];
function addSlide(nodes, chapter, kind = 'detail') {
  const slide = document.createElement('section');
  slide.className = `book-slide ${kind}`;
  slide.dataset.chapter = chapter;
  const canvas = document.createElement('div');
  canvas.className = 'slide-canvas';
  nodes.forEach(node => canvas.append(node));
  slide.append(canvas);
  deck.append(slide);
  slides.push(slide);
  return slide;
}
function sectionBar(number, title, item = '') {
  const bar = document.createElement('div');
  bar.className = 'slide-page-bar section-page-bar';
  bar.innerHTML = `<span class="slide-page-number">${number}</span><span class="slide-page-context"><b>${title}</b>${item ? `<i aria-hidden="true"></i><span>${item}</span>` : ''}</span>`;
  return bar;
}
const frontCover = document.createElement('header');
frontCover.className = 'front-cover';
frontCover.innerHTML = '<div class="cover-heading"><h1>دستورالعمل بصری برگر ذغالی</h1><p lang="en" dir="ltr">Burger Zoghali Visual Guidelines</p></div><div class="cover-checker" aria-hidden="true"></div>';
const checker = frontCover.querySelector('.cover-checker');
for (let row = 0; row < 2; row++) {
  for (let column = 0; column < 32; column++) {
    const square = document.createElement('i');
    square.className = (row + column) % 2 ? 'black' : 'white';
    if ((row === 0 && [5, 18, 27].includes(column)) || (row === 1 && [10, 23, 30].includes(column))) square.className = 'red';
    checker.append(square);
  }
}
hero.remove();
addSlide([frontCover], 'cover', 'cover');
const intro = document.createElement('div');
intro.className = 'intro-copy';
intro.innerHTML = '<div class="eyebrow">BURGER ZOGHALI / INTRODUCTION</div><h1>مقدمه</h1><p class="intro-lead">خوشمزه، مثل گذشته</p><p>این برندبوک، زبان مشترک برگر ذغالی است؛ از نشانه و رنگ تا بسته‌بندی، پوشش پرسنل و فضای شعبه. هدف آن، ساختن تجربه‌ای آشنا، منسجم و قابل تشخیص در تمام نقاط تماس برند است.</p><div class="stripe"></div><p>مشکی، زمینهٔ اصلی هویت است؛ سفید به آن وضوح می‌دهد و قرمز، تأکیدی محدود و به‌یادماندنی است.</p>';
addSlide([sectionBar('00', 'مقدمه'), intro], 'introduction', 'divider');
const introLink = document.createElement('a');
introLink.href = '#introduction';
introLink.innerHTML = '<b>00</b>مقدمه';
document.querySelector('.nav').prepend(introLink);
for (const chapter of chapters) {
  const heading = chapter.querySelector('.chapter-top');
  const title = heading.querySelector('h2').textContent;
  const chapterNumber = heading.querySelector('.no')?.textContent.trim() || '';
  addSlide([sectionBar(chapterNumber, title), heading], chapter.id, 'divider');
  function page(nodes, card = null, detailTitle = '') {
    const bar = document.createElement('div');
    bar.className = 'slide-page-bar';
    const cardLabel = card?.querySelector('.card-label')?.textContent.trim() || card?.querySelector('.mock-caption span')?.textContent.trim() || chapterNumber;
    const cardTitle = detailTitle || card?.querySelector('.mock-caption b')?.textContent.trim() || card?.querySelector('h3')?.textContent.trim() || '';
    bar.innerHTML = `<span class="slide-page-number">${cardLabel}</span><span class="slide-page-context"><b>${title}</b>${cardTitle ? `<i aria-hidden="true"></i><span>${cardTitle}</span>` : ''}</span>`;
    if (card?.classList.contains('mock-card')) bar.classList.add('mock-page-bar');
    if (card?.classList.contains('mock-card')) card.querySelector('.mock-caption')?.remove();
    if (card) {
      const description = [...card.children].find(node => node.tagName === 'P');
      const visual = [...card.children].find(node => !['.card-label', 'h3', 'p'].some(selector => node.matches(selector)));
      if (description && visual) visual.before(description);
    }
    addSlide([bar, ...nodes], chapter.id);
  }
  for (const child of [...chapter.children]) {
    if (child.matches('.board')) {
      for (const card of [...child.children]) page([card], card);
    } else if (child.matches('.mock-group')) {
      const groupTitle = child.querySelector('h3');
      for (const card of [...child.querySelectorAll('.mock-card')]) {
        page([card], card, card.querySelector('.mock-caption b')?.textContent.trim() || '');
      }
    } else page([child]);
  }
  chapter.remove();
}
const endTitle = document.createElement('h1');
endTitle.textContent = 'خوشمزه، مثل گذشته';
addSlide([endTitle, closing], 'closing', 'end-slide');
content.append(deck);
const controls = document.createElement('div');
controls.className = 'slide-controls';
controls.innerHTML = '<button class="slide-prev" aria-label="اسلاید قبلی">→ <span>قبلی</span></button><form class="page-jump" aria-label="رفتن به صفحه"><span class="page-total"></span><span aria-hidden="true">/</span><input aria-label="شماره صفحه" type="text" inputmode="numeric" autocomplete="off" title="شماره صفحه را وارد کنید و اینتر بزنید"></form><button class="slide-next" aria-label="اسلاید بعدی"><span>بعدی</span> ←</button>';
content.append(controls);
const previous = controls.querySelector('.slide-prev');
const next = controls.querySelector('.slide-next');
const jumpForm = controls.querySelector('.page-jump');
const pageInput = jumpForm.querySelector('input');
const pageTotal = jumpForm.querySelector('.page-total');
pageTotal.textContent = slides.length.toLocaleString('fa-IR');
const pdfForm = document.querySelector('.pdf-export');
const pdfStart = pdfForm.querySelector('.pdf-start');
const pdfEnd = pdfForm.querySelector('.pdf-end');
pdfEnd.value = slides.length.toLocaleString('fa-IR', {useGrouping: false});
const links = [...document.querySelectorAll('.nav a')];
let current = 0;
function fit() {
  const slide = slides[current];
  const canvas = slide.firstElementChild;
  const width = 1100;
  const scale = Math.min(slide.clientWidth / width, slide.clientHeight / Math.max(1, canvas.scrollHeight));
  canvas.style.width = `${slide.clientWidth / scale}px`;
  canvas.style.height = `${slide.clientHeight / scale}px`;
  canvas.style.left = '0';
  canvas.style.top = '0';
  canvas.style.transformOrigin = 'top left';
  canvas.style.setProperty('--fit-scale', scale);
  slide.querySelectorAll('.section-page-bar').forEach(bar => { bar.style.width = '100%'; });
  canvas.style.transform = `scale(${scale})`;
}

function show(index) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, i) => { slide.hidden = i !== current; });
  previous.disabled = current === 0;
  next.disabled = current === slides.length - 1;
  pageInput.value = (current + 1).toLocaleString('fa-IR', {useGrouping: false});
  pageInput.setCustomValidity('');
  links.forEach(link => {
    const active = link.hash.slice(1) === slides[current].dataset.chapter;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  fit();
}
jumpForm.addEventListener('submit', event => {
  event.preventDefault();
  const normalized = pageInput.value.trim().replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))).replace(/[٠-٩]/g, digit => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));
  const page = Number(normalized);
  if (!/^\d+$/.test(normalized) || !Number.isInteger(page) || page < 1 || page > slides.length) {
    pageInput.setCustomValidity(`شماره‌ای از ۱ تا ${slides.length.toLocaleString('fa-IR')} وارد کنید.`);
    pageInput.reportValidity();
    return;
  }
  show(page - 1);
});
pdfForm.addEventListener('submit', event => {
  event.preventDefault();
  const toNumber = value => {
    const normalized = value.trim().replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))).replace(/[٠-٩]/g, digit => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));
    return /^\d+$/.test(normalized) ? Number(normalized) : NaN;
  };
  const start = toNumber(pdfStart.value);
  const end = toNumber(pdfEnd.value);
  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start || end > slides.length) {
    window.alert(`بازه‌ای از ۱ تا ${slides.length.toLocaleString('fa-IR')} وارد کنید؛ صفحهٔ شروع باید از پایان کوچک‌تر یا مساوی باشد.`);
    return;
  }
  document.body.dataset.pdfStart = String(start - 1);
  document.body.dataset.pdfEnd = String(end - 1);
  slides.forEach((slide, index) => {
    const included = index >= start - 1 && index <= end - 1;
    slide.hidden = !included;
    if (included) slide.removeAttribute('hidden');
    else slide.setAttribute('hidden', '');
  });
  document.body.offsetHeight;
  window.print();
});
window.addEventListener('afterprint', () => {
  delete document.body.dataset.pdfStart;
  delete document.body.dataset.pdfEnd;
  show(current);
});
pageInput.addEventListener('input', () => pageInput.setCustomValidity(''));
pageInput.addEventListener('focus', () => pageInput.select());
previous.addEventListener('click', () => show(current - 1));
next.addEventListener('click', () => show(current + 1));
links.forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  const index = slides.findIndex(slide => slide.dataset.chapter === link.hash.slice(1));
  if (index >= 0) show(index);
}));
window.addEventListener('resize', fit);
document.fonts.ready.then(fit);
document.querySelectorAll('img').forEach(img => img.addEventListener('load', fit));
show(0);

