const content = document.querySelector('.content');
const chapters = [...document.querySelectorAll('.chapter')];
const hero = document.querySelector('.hero');
const closing = document.querySelector('.closing');
document.querySelector('.topbar').remove();
const burgerSymbolPaths = `<g transform="translate(0 540) scale(1 -1)" fill="currentColor"><g transform="translate(212.7117 349.1739)"><path d="M0 0C-30.333-.006-60.67.308-90.995-.174C-101.803-.346-105.3 6.59-103.473 15.156C-98.011 40.754-83.304 59.717-61.689 73.702C-18.622 101.566 42.076 95.545 78.714 59.695C91.038 47.637 99.277 33.116 102.625 16.116C103.3 12.686 103.274 8.698 102.174 5.44C100.696 1.066 96.62-.073 91.998-.056C61.332.063 30.666.006 0 0Z"/></g><g transform="translate(212.2409 288.5017)"><path d="M0 0C-29.833-.005-59.666-.013-89.499-.001C-99.164.003-104.051 4.613-104.303 14.165C-104.448 19.659-104.498 25.174-104.197 30.658C-103.75 38.795-98.716 43.346-90.56 43.351C-66.727 43.364-42.883 42.921-19.064 43.501C-2.917 43.894 11.472 39.665 24.862 31.013C30.174 27.58 35.656 24.406 41.118 21.213C46.834 17.871 50.662 18.232 55.59 22.777C60.487 27.294 65.346 31.872 69.951 36.683C77.219 44.276 86.297 44.235 95.521 42.8C100.355 42.048 104.118 36.215 104.363 30.139C104.591 24.481 104.648 18.797 104.377 13.144C103.989 5.047 98.533.017 90.499.013C60.333-.005 30.166.005 0 0Z"/></g><g transform="translate(212.3261 271.2192)"><path d="M0-.017C-30.987-.017-61.973-.089-92.959.053C-98.093.077-101.745-1.636-103.672-6.355C-108.375-17.873-103.503-31.95-92.755-38.109C-83.013-43.692-72.22-46-61.293-47.271C-21.438-51.906 18.49-51.704 58.372-47.734C70.628-46.514 82.801-44.159 93.69-37.726C99.233-34.452 103.444-30.02 104.403-23.452C104.952-19.691 104.755-15.806 104.718-11.978C104.634-3.37 101.14-.001 92.46-.001C61.64.001 30.82 0 0-.017Z"/></g></g>`;
function createBurgerSymbol(className, label = '') {
  const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  symbol.setAttribute('viewBox', '103.95 89.26 213.33 231.43');
  symbol.setAttribute('class', className);
  symbol.setAttribute('role', label ? 'img' : 'presentation');
  if (label) symbol.setAttribute('aria-label', label);
  else symbol.setAttribute('aria-hidden', 'true');
  symbol.innerHTML = burgerSymbolPaths;
  return symbol;
}
const sidebarSymbol = document.querySelector('.sidebar-brand-symbol');
if (sidebarSymbol) {
  const replacement = createBurgerSymbol('sidebar-brand-symbol');
  sidebarSymbol.replaceWith(replacement);
}
document.querySelectorAll('.identity-art.symbol').forEach(symbol => {
  const replacement = createBurgerSymbol(symbol.getAttribute('class') || 'identity-art symbol', 'نماد سه‌تکهٔ برگر ذغالی');
  symbol.replaceWith(replacement);
});
const deck = document.createElement('div');
deck.className = 'slide-deck';
deck.setAttribute('aria-label', 'اسلایدهای برندبوک');
const slides = [];
function positionComposition(svg, vertical = false) {
  const wordmarks = svg.querySelectorAll('svg');
  const boxes = vertical ? [[300, 330, 360, 85], [300, 445, 360, 58]] : [[90, 159, 480, 114], [90, 299, 480, 77]];
  wordmarks.forEach((mark, index) => {
    ['x', 'y', 'width', 'height'].forEach((key, i) => mark.setAttribute(key, boxes[index][i]));
    mark.querySelector('image')?.setAttribute('opacity', '.5');
  });
  const symbol = svg.querySelector('image[href$="burger-symbol.svg"]');
  // The source SVG has internal vertical whitespace; these viewports place its visible silhouette on square grid bounds.
  const symbolBox = vertical ? [360, 47.43, 240, 260.57] : [600, 137, 240, 260];
  ['x', 'y', 'width', 'height'].forEach((key, i) => symbol.setAttribute(key, symbolBox[i]));
  symbol.setAttribute('preserveAspectRatio', 'none');
  symbol.setAttribute('opacity', '.5');
  // One path per measurement ensures that both arrowheads attach to the actual endpoints.
  svg.querySelectorAll('.composition-measure-extra').forEach((path) => path.remove());
  const measure = svg.querySelector('.composition-measure');
  const measurements = vertical ? ['M360 47H600', 'M675 60V300', 'M690 415V445', 'M300 516H660'] : ['M90 118H570', 'M885 150V390', 'M600 440H840'];
  measure.setAttribute('d', measurements[0]);
  measurements.slice(1).forEach((d) => {
    const path = measure.cloneNode(false);
    path.classList.add('composition-measure-extra');
    path.setAttribute('d', d);
    measure.after(path);
  });
  svg.querySelector('.composition-extension').setAttribute('d', vertical ? 'M360 60V47M600 60V47M600 60H675M600 300H675M660 415H690M660 445H690M300 506V516M660 506V516' : 'M90 159V118M570 159V118M840 150H885M840 390H885M600 390V440M840 390V440');
  let clearZone = svg.querySelector('.composition-clear-zone');
  if (!clearZone) {
    clearZone = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    clearZone.setAttribute('class', 'composition-clear-zone');
    wordmarks[0].before(clearZone);
  }
  const zone = vertical ? [330, 30, 300, 300] : [570, 120, 300, 300];
  ['x', 'y', 'width', 'height'].forEach((key, i) => clearZone.setAttribute(key, zone[i]));
  const extraLabel = svg.querySelector('.composition-symbol-width');
  if (vertical) extraLabel?.remove();
  else if (!extraLabel) {
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('class', 'composition-symbol-width');
    label.setAttribute('x', '720'); label.setAttribute('y', '460'); label.textContent = '8x';
    svg.append(label);
  }
  if (vertical && !svg.querySelector('.composition-wordmark-gap')) {
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('class', 'composition-wordmark-gap');
    svg.append(label);
  }
  if (vertical && !svg.querySelector('.composition-wordmark-width')) {
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('class', 'composition-wordmark-width');
    svg.append(label);
  }
  const labels = svg.querySelectorAll('text');
  labels.forEach((label, index) => {
    const values = vertical ? [[480, 36, '8x'], [705, 185, '8x'], [715, 435, '1x'], [480, 533, '12x']] : [[330, 106, '16x'], [910, 270, '8x'], [720, 460, '8x']];
    labels[index].setAttribute('x', values[index][0]); labels[index].setAttribute('y', values[index][1]); labels[index].textContent = values[index][2];
  });
  if (vertical) {
    // Scale the artwork and its grid together so one unit remains square and aligned.
    const artwork = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    artwork.setAttribute('class', 'composition-artwork');
    artwork.setAttribute('transform', 'translate(48 27) scale(.9)');
    [...svg.children].filter((child) => child.localName !== 'defs' && (child.localName !== 'rect' || child.classList.contains('composition-clear-zone'))).forEach((child) => artwork.append(child));
    svg.append(artwork);
    svg.querySelector('pattern').setAttribute('patternTransform', 'translate(48 27) scale(.9)');
  }
  svg.setAttribute('aria-label', vertical ? 'ترکیب عمودی دو لوگوتایپ با فاصلهٔ یک واحد و نشانهٔ مربعی هشت در هشت واحد با حریم امن یک واحدی روی گرید' : 'ترکیب افقی دو لوگوتایپ با عرض ۱۶ واحد، حریم امن یک واحدی دور نشانه و نشانهٔ مربعی هشت در هشت واحد');
}
let documentPageNumber = 0;
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
  if (kind !== 'cover') {
    documentPageNumber += 1;
    const pageNumber = String(documentPageNumber).padStart(3, '0');
    canvas.querySelector('.slide-page-number')?.replaceChildren(document.createTextNode(pageNumber));
  }
  return slide;
}
function sectionBar(number, title, item = '') {
  const bar = document.createElement('div');
  bar.className = 'slide-page-bar section-page-bar';
  bar.innerHTML = `<span class="slide-page-number">${number}</span><span class="slide-page-context"><b>${title}</b>${item ? `<i aria-hidden="true"></i><span>${item}</span>` : ''}</span>`;
  return bar;
}
function checkerRail() {
  const rail = document.createElement('div');
  rail.className = 'checker-rail';
  for (let row = 0; row < 2; row++) {
    for (let column = 0; column < 100; column++) {
      const cell = document.createElement('i');
      cell.className = (row + column) % 2 ? 'black' : 'white';
      // قانون پترن: خانه‌های قرمز نه افقی و نه عمودی مجاور نیستند و حداقل یک خانه فاصله دارند.
      const redColumn = row === 0 ? column % 13 === 3 : column % 13 === 9;
      if (redColumn) cell.className = 'red';
      rail.append(cell);
    }
  }
  return rail;
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
intro.innerHTML = '<p class="intro-lead">مثل همیشه، خوشمزه</p><p>این سند برای یکپارچه‌سازی هویت بصری برگر ذغالی تدوین شده است؛ از المان‌های پایه مانند نشانه، لوگوتایپ، رنگ و تایپوگرافی، تا المان‌های کاربردی در بسته‌بندی، لباس پرسنل و فضای شعبه، و المان‌های توسعه‌یافته در خودروهای ارسال، تجربهٔ دیجیتال و دیگر نقاط تماس برند. این چارچوب با تکیه بر تجربه‌ای که از ۱۹۶۹ تا امروز «مثل همیشه، خوشمزه» باقی مانده، استانداردهایی روشن و قابل‌اجرا برای حضوری منسجم، قابل‌تشخیص و هماهنگ تعریف می‌کند.</p><p>استانداردهای این سند، نسخهٔ اولیهٔ نظام هویت برند هستند و پس از ارزیابی‌های تکمیلی نهایی خواهند شد. برگر ذغالی به‌عنوان نقطهٔ اتکای یک اکوسیستم در حال توسعه، هویت اصلی و نقش مرجع خود را حفظ می‌کند و این چارچوب، زبان مشترک برندهای مکمل و زیرساخت انسجام این شبکه خواهد بود.</p><p>برای بیان این منطق، یک الگوی بصری شطرنجی به‌عنوان کد گرافیکی اکوسیستم انتخاب شده است. خانه‌های هم‌اندازه و رابطهٔ منظم میان آن‌ها، استعاره‌ای از نقش‌های متمایز اما مکمل در یک سیستم واحد هستند؛ هر برند، مانند یک مهره در صفحهٔ شطرنج، مأموریت، قلمرو و حرکت ویژهٔ خود را دارد، اما ارزش واقعی آن زمانی شکل می‌گیرد که در هماهنگی با سایر اجزا عمل کند. این الگو بر استقلال عملکردی، نظم شبکه‌ای و همکاری راهبردی میان برندها تأکید می‌کند؛ به‌گونه‌ای که مجموعه، به‌جای چند حضور پراکنده، یک تیم منسجم و قابل‌توسعه را شکل دهد.</p>';
const introSlide = addSlide([sectionBar('00', 'مقدمه'), intro], 'introduction', 'divider');
introSlide.classList.add('intro-slide');
const introLink = document.createElement('a');
introLink.href = '#introduction';
introLink.classList.add('nav-intro');
introLink.innerHTML = 'مقدمه';
document.querySelector('.nav').prepend(introLink);
for (const chapter of chapters) {
  const heading = chapter.querySelector('.chapter-top');
  let title = heading.querySelector('h2').textContent;
  const chapterNumber = heading.querySelector('.no')?.textContent.trim() || '';
  if (chapter.id === 'essentials') {
    title = 'ساختار عناصر بصری پایه';
    heading.querySelector('h2').textContent = title;
    heading.querySelector('.slug').textContent = 'Visual Basic Elements';
    heading.querySelector('.chapter-sub')?.remove();
  }
  const dividerBar = sectionBar(chapterNumber, title);
  dividerBar.classList.add('divider-page-bar');
  const dividerSlide = addSlide([dividerBar, heading], chapter.id, 'divider');
  dividerSlide.firstElementChild.append(checkerRail());
  const dividerEntries = [];
  let architectureSlide = null;
  function page(nodes, card = null, detailTitle = '') {
    const bar = document.createElement('div');
    bar.className = 'slide-page-bar';
    const cardLabel = card?.querySelector('.card-label')?.textContent.trim() || card?.querySelector('.mock-caption span')?.textContent.trim() || chapterNumber;
    const rawCardTitle = detailTitle || card?.querySelector('.mock-caption b')?.textContent.trim() || card?.querySelector('h3')?.textContent.trim() || '';
    const cardTitle = rawCardTitle === 'ترکیب نماد، فارسی، انگلیسی و 1969' ? 'ترکیب افقی نشانه و لوگوتایپ‌ها' : rawCardTitle;
    const baseSection = ['01', '02', '03', '04'].includes(chapterNumber) ? 'المان‌های پایه' : title;
    bar.innerHTML = `<span class="slide-page-number">${cardLabel}</span><span class="slide-page-context"><b>${baseSection}</b>${cardTitle ? `<i aria-hidden="true"></i><span>${cardTitle}</span>` : ''}</span>`;
    if (card?.classList.contains('mock-card')) bar.classList.add('mock-page-bar');
    const originalCardTitle = card?.querySelector('h3')?.textContent.trim() || '';
    if (originalCardTitle === 'ساختار و معماری نشانه') {
      card.classList.add('architecture-card');
      card.querySelector('.card-label')?.remove();
      card.querySelector('h3')?.remove();
      [...card.children].find(node => node.tagName === 'P')?.remove();
      const architectureStage = card.querySelector('.identity-stage');
      if (architectureStage) architectureStage.innerHTML = `<svg class="symbol-construction" viewBox="0 0 960 540" role="img" aria-label="ساختار اندازه‌گذاری‌شدهٔ نماد برگر روی شبکهٔ کامل"><defs><pattern id="symbol-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" fill="none" stroke="#4a4a4e" stroke-width="1"/></pattern><marker id="measure-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#d9232e"/></marker></defs><rect width="960" height="540" fill="url(#symbol-grid)"/><svg x="300" y="60" width="360" height="360" viewBox="632 23 270 270" preserveAspectRatio="none"><image href="./assets/reference/logo-reference.jpg" width="1536" height="1024" opacity=".34"/></svg><g class="construction-guides"><circle cx="480" cy="145" r="136"/><circle cx="480" cy="260" r="88"/><circle cx="480" cy="350" r="58"/><path d="M390 258L480 330L570 258"/><path d="M300 60V420M360 60V420M420 60V420M480 60V420M540 60V420M600 60V420M660 60V420M300 60H660M300 120H660M300 180H660M300 240H660M300 300H660M300 360H660M300 420H660"/></g><g class="construction-measures"><path marker-start="url(#measure-arrow)" marker-end="url(#measure-arrow)" d="M300 462H660"/><path marker-start="url(#measure-arrow)" marker-end="url(#measure-arrow)" d="M718 60V420"/><path marker-start="url(#measure-arrow)" marker-end="url(#measure-arrow)" d="M248 60V120"/><path marker-start="url(#measure-arrow)" marker-end="url(#measure-arrow)" d="M712 236V266"/><path d="M396 366A74 74 0 0 1 448 332"/></g><g class="measure-labels"><g transform="translate(450 478)"><rect width="60" height="30" rx="3"/><text x="30" y="20">6x</text></g><g transform="translate(734 224)"><rect width="60" height="30" rx="3"/><text x="30" y="20">6x</text></g><g transform="translate(174 75)"><rect width="60" height="30" rx="3"/><text x="30" y="20">x</text></g><g transform="translate(744 238)"><rect width="72" height="30" rx="3"/><text x="36" y="20">x/2</text></g><g transform="translate(352 374)"><rect width="72" height="30" rx="3"/><text x="36" y="20">45°</text></g><g transform="translate(744 98)"><rect width="82" height="30" rx="3"/><text x="41" y="20">7x/8</text></g></g></svg>`;
      if (architectureStage) architectureStage.innerHTML = `<svg class="symbol-construction new-symbol-construction" viewBox="0 0 960 540" role="img" aria-label="ابعاد کلی و فاصلهٔ اجزای نماد سه‌تکهٔ برگر"><defs><pattern id="new-symbol-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" fill="none" stroke="#3b3b3f" stroke-width="1"/></pattern><marker id="new-measure-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#d9232e"/></marker></defs><rect width="960" height="540" fill="url(#new-symbol-grid)"/><image href="./assets/reference/burger-symbol.svg" x="330" y="70" width="300" height="333"/><g class="construction-measures"><path marker-start="url(#new-measure-arrow)" marker-end="url(#new-measure-arrow)" d="M330 448H630"/><path marker-start="url(#new-measure-arrow)" marker-end="url(#new-measure-arrow)" d="M690 70V403"/><path marker-start="url(#new-measure-arrow)" marker-end="url(#new-measure-arrow)" d="M305 218V242"/><path marker-start="url(#new-measure-arrow)" marker-end="url(#new-measure-arrow)" d="M305 302V327"/></g><g class="measure-labels"><g transform="translate(438 462)"><rect width="84" height="32" rx="4"/><text x="42" y="21">7.2x</text></g><g transform="translate(710 220)"><rect width="70" height="32" rx="4"/><text x="35" y="21">8x</text></g><g transform="translate(220 205)"><rect width="70" height="32" rx="4"/><text x="35" y="21">x/2</text></g><g transform="translate(220 292)"><rect width="70" height="32" rx="4"/><text x="35" y="21">x/2</text></g></g></svg>`;
      if (architectureStage) {
        const sourceImage = architectureStage.querySelector('image[href$="burger-symbol.svg"]');
        if (sourceImage) {
          const embedded = createBurgerSymbol('embedded-burger-symbol', 'نماد سه‌تکهٔ برگر ذغالی');
          embedded.setAttribute('x', '330');
          embedded.setAttribute('y', '70');
          embedded.setAttribute('width', '300');
          embedded.setAttribute('height', '333');
          sourceImage.replaceWith(embedded);
        }
      }
      if (architectureStage) architectureStage.innerHTML = `<div class="architecture-panels"><section class="architecture-panel architecture-main"><svg class="panel-geometry" viewBox="0 0 480 420" aria-label="ساختار و معماری نشانه"><defs><pattern id="panel-grid-main" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#3b3b3f" stroke-width="1"/></pattern><marker id="panel-arrow-main" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#d9232e"/></marker></defs><rect width="480" height="420" fill="url(#panel-grid-main)"/><svg x="120" y="140" width="240" height="260" viewBox="103.95 89.26 213.33 231.43">${burgerSymbolPaths}</svg><path class="panel-measure" marker-start="url(#panel-arrow-main)" marker-end="url(#panel-arrow-main)" d="M120 410H360"/><path class="panel-measure" marker-start="url(#panel-arrow-main)" marker-end="url(#panel-arrow-main)" d="M386 140V400"/><g class="panel-label"><text x="240" y="405">6x</text><text x="402" y="275">8x</text></g></svg></section><section class="architecture-panel architecture-safety"><svg class="panel-geometry" viewBox="0 0 480 420" aria-label="حریم امن نشانه"><defs><pattern id="panel-grid-safe" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#3b3b3f" stroke-width="1"/></pattern></defs><rect width="480" height="420" fill="url(#panel-grid-safe)"/><svg x="120" y="140" width="240" height="260" viewBox="103.95 89.26 213.33 231.43">${burgerSymbolPaths}</svg><rect class="safe-cell" x="80" y="100" width="320" height="320"/><path class="safe-guide" d="M80 100V420M400 100V420M80 100H400M80 420H400"/><text class="safe-label" x="240" y="88">1x</text></svg></section></div>`;
      const mainSvg = architectureStage?.querySelector('.architecture-main .panel-geometry');
      if (mainSvg) {
        const mainSymbol = mainSvg.querySelector('svg');
        mainSymbol?.setAttribute('x', '120'); mainSymbol?.setAttribute('y', '130'); mainSymbol?.setAttribute('width', '240'); mainSymbol?.setAttribute('height', '240'); mainSymbol?.setAttribute('preserveAspectRatio', 'none');
        const mainLabel = mainSvg.querySelector('.panel-label');
        if (mainLabel) mainLabel.innerHTML = '<text x="240" y="405">6x</text><text x="402" y="255">6x</text><text x="108" y="314">0.5x</text><text x="108" y="234">0.5x</text>';
        const guideGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        guideGroup.classList.add('main-horizontal-guides');
        guideGroup.innerHTML = '<path d="M120 370H360M120 310H360M120 290H360M120 250H360M120 230H360M120 130H360"/>';
        mainSvg.querySelector('.panel-label')?.after(guideGroup);
      }
      const safetySvg = architectureStage?.querySelector('.architecture-safety .panel-geometry');
      if (safetySvg) {
        const safetySymbol = safetySvg.querySelector('svg');
        safetySymbol?.setAttribute('x', '120');
        safetySymbol?.setAttribute('y', '130');
        safetySymbol?.setAttribute('width', '240');
        safetySymbol?.setAttribute('height', '240');
        safetySymbol?.setAttribute('preserveAspectRatio', 'none');
        const safeCell = safetySvg.querySelector('.safe-cell');
        safeCell?.setAttribute('x', '80'); safeCell?.setAttribute('y', '50'); safeCell?.setAttribute('width', '320'); safeCell?.setAttribute('height', '320');
        const safeGuide = safetySvg.querySelector('.safe-guide');
        safeGuide?.setAttribute('d', 'M80 50V370M400 50V370M80 50H400M80 370H400');
        safetySvg.querySelector('.safe-label')?.remove();
        safetySvg.querySelector('.safe-horizontal-guides')?.remove();
        const safeLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        safeLabel.setAttribute('class', 'safe-label'); safeLabel.setAttribute('x', '390'); safeLabel.setAttribute('y', '70'); safeLabel.textContent = '1x';
        safetySvg.append(safeLabel);
      }
      // The approved Illustrator layout defines the actual geometry: a 36-unit
      // module, a 216×216 symbol and a 288×288 clear-space square.
      if (architectureStage) {
        fetch('./assets/reference/burger-symbol-slide4-layout.svg')
          .then(response => { if (!response.ok) throw new Error('Slide 4 SVG unavailable'); return response.text(); })
          .then(source => {
            const svg = new DOMParser().parseFromString(source, 'image/svg+xml').documentElement;
            if (svg.localName !== 'svg' || svg.querySelector('parsererror')) throw new Error('Invalid slide 4 SVG');
            svg.querySelector('defs')?.remove();
            svg.removeAttribute('id');
            svg.setAttribute('class', 'architecture-reference');
            svg.setAttribute('viewBox', '0 20 960 500');
            svg.setAttribute('preserveAspectRatio', 'none');
            const ns = 'http://www.w3.org/2000/svg';
            const defs = document.createElementNS(ns, 'defs');
            defs.innerHTML = '<pattern id="approved-grid" x="12" y="0" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" fill="none" stroke="#38383c" stroke-width=".7"/></pattern><marker id="approved-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#d9232e"/></marker></defs>';
            svg.prepend(defs);
            const background = document.createElementNS(ns, 'rect');
            background.setAttribute('x', '0'); background.setAttribute('y', '20'); background.setAttribute('width', '960'); background.setAttribute('height', '500'); background.setAttribute('fill', 'url(#approved-grid)');
            defs.after(background);
            const annotations = document.createElementNS(ns, 'g');
            annotations.setAttribute('class', 'approved-annotations');
            annotations.innerHTML = '<path class="measure" marker-start="url(#approved-arrow)" marker-end="url(#approved-arrow)" d="M624 448H840"/><path class="measure" marker-start="url(#approved-arrow)" marker-end="url(#approved-arrow)" d="M880 180V396"/><path class="extension" d="M624 396V448M840 396V448M840 180H880M840 396H880"/><text x="732" y="468">6x</text><text x="897" y="291">6x</text><path class="measure" marker-start="url(#approved-arrow)" marker-end="url(#approved-arrow)" d="M600 270V288"/><path class="measure" marker-start="url(#approved-arrow)" marker-end="url(#approved-arrow)" d="M600 324V342"/><text x="578" y="282">0.5x</text><text x="578" y="336">0.5x</text><rect class="clear-module" x="336" y="144" width="36" height="36"/><text x="354" y="166">1x</text>';
            svg.querySelectorAll(':scope > g').forEach(symbol => symbol.setAttribute('transform', 'translate(0 -36)'));
            svg.querySelector(':scope > rect.cls-3')?.setAttribute('y', '108');
            for (const ordinate of [270, 342]) {
              const guide = svg.querySelector(`line.cls-2[x1="480"][y1="${ordinate}"]`);
              if (guide) { guide.setAttribute('y1', String(ordinate - 36)); guide.setAttribute('y2', String(ordinate - 36)); }
            }
            annotations.setAttribute('transform', 'translate(0 -36)');
            svg.append(annotations);
            architectureStage.replaceChildren(svg);
          })
          .catch(error => console.error(error));
      }
    }
    if (card?.querySelector('h3')?.textContent.trim() === 'حاشیه امنیت نشانه') {
      if (chapter.id === 'essentials' && architectureSlide) dividerEntries.push({title: 'حاشیه امنیت نشانه', slide: architectureSlide});
      return;
    }
    if (card?.classList.contains('mock-card')) card.querySelector('.mock-caption')?.remove();
    if (originalCardTitle === 'ترکیب نماد، فارسی، انگلیسی و 1969') {
      card.classList.add('bilingual-composition-card');
      card.replaceChildren();
      card.innerHTML = `<svg class="composition-grid" viewBox="0 0 960 540" preserveAspectRatio="none" role="img" aria-label="ترکیب اندازه‌گذاری‌شدهٔ لوگوتایپ فارسی و انگلیسی با نماد برگر"><defs><pattern id="composition-grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#38383c" stroke-width=".7"/></pattern><marker id="composition-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#d9232e"/></marker><clipPath id="composition-fa-crop"><rect x="145" y="300" width="1245" height="265"/><rect x="145" y="270" width="485" height="30"/><rect x="905" y="270" width="485" height="30"/></clipPath></defs><rect width="960" height="540" fill="#0b0b0c"/><rect width="960" height="540" fill="url(#composition-grid-pattern)"/><svg x="175" y="158" width="540" height="126" viewBox="145 270 1245 295" preserveAspectRatio="none"><image href="./assets/reference/logo-reference.jpg" width="1536" height="1024" clip-path="url(#composition-fa-crop)" style="filter:invert(1);mix-blend-mode:screen"/></svg><svg x="175" y="302" width="540" height="86" viewBox="170 576 1200 192" preserveAspectRatio="none"><image href="./assets/reference/logo-reference.jpg" width="1536" height="1024" style="filter:invert(1);mix-blend-mode:screen"/></svg><image href="./assets/reference/burger-symbol.svg" x="735" y="158" width="212" height="230"/><path class="composition-measure" marker-start="url(#composition-arrow)" marker-end="url(#composition-arrow)" d="M175 126H715M958 158V388"/><path class="composition-extension" d="M175 158V126M715 158V126M947 158H958M947 388H958M175 284H715M175 302H715"/><text x="445" y="114">18x</text><text x="930" y="278">7.7x</text></svg>`;
      const composition = card.querySelector('.composition-grid');
      composition.setAttribute('viewBox', '0 20 960 500');
      positionComposition(composition);
    }
    if (card) {
      const description = [...card.children].find(node => node.tagName === 'P');
      const visual = [...card.children].find(node => !['.card-label', 'h3', 'p'].some(selector => node.matches(selector)));
      if (description && visual) visual.before(description);
    }
    const detailSlide = addSlide([bar, ...nodes], chapter.id);
    if (originalCardTitle === 'ساختار و معماری نشانه') {
      architectureSlide = detailSlide;
      if (chapter.id === 'essentials' && !dividerEntries.some(entry => entry.title === 'ساختار و معماری نشانه')) {
        dividerEntries.push({title: 'ساختار و معماری نشانه', slide: detailSlide});
      }
    }
    if (chapter.id === 'essentials' && card?.classList.contains('identity-card') && !card.classList.contains('combined-wordmark-card')) {
      const firstTitle = card.querySelector('h3')?.textContent.trim();
      if (firstTitle && !dividerEntries.some(entry => entry.title === firstTitle)) dividerEntries.push({title: firstTitle, slide: detailSlide});
    }
    return detailSlide;
  }
  for (const child of [...chapter.children]) {
    if (child.matches('.board')) {
      const cards = [...child.children];
      for (let index = 0; index < cards.length; index++) {
        const card = cards[index];
        const title = card.querySelector('h3')?.textContent.trim();
        if (chapter.id === 'essentials' && (title === 'ساختار نشانه‌نوشتهٔ فارسی' || title === 'ساختار نشانه‌نوشتهٔ انگلیسی')) {
          const safetyCard = cards[index + 1];
          const safetyTitle = safetyCard?.querySelector('h3')?.textContent.trim();
          const expected = title.replace('ساختار ', 'حاشیه امنیت ');
          if (safetyTitle === expected) {
            card.classList.add('combined-wordmark-card');
            card.querySelector('h3').textContent = title.replace('ساختار ', 'ساختار و حاشیه امنیت ');
            const topFigure = card.querySelector('.identity-stage');
            const bottomFigure = safetyCard.querySelector('.identity-stage');
            const combined = document.createElement('div');
            combined.className = 'combined-wordmark-views';
            for (const [figure, label] of [[topFigure, 'ساختار نشانه‌نوشته'], [bottomFigure, 'حاشیه امنیت نشانه‌نوشته']]) {
              const panel = document.createElement('div');
              panel.className = 'combined-wordmark-panel';
              const heading = document.createElement('span');
              heading.className = 'combined-wordmark-label';
              heading.textContent = label;
              panel.append(heading, figure);
              combined.append(panel);
            }
            if (title === 'ساختار نشانه‌نوشتهٔ فارسی') {
              card.classList.add('manshoor-slide');
              for (const [figure, kind] of [[topFigure, 'construction'], [bottomFigure, 'safety']]) {
                const grid = document.createElement('div');
                grid.className = `manshoor-grid manshoor-${kind}`;
                grid.innerHTML = `<div class="manshoor-core"><span class="manshoor-wordmark" lang="fa" dir="rtl">برگر ذغالی</span></div>${kind === 'construction' ? '<span class="manshoor-width">W</span><span class="manshoor-height">H</span>' : '<span class="manshoor-unit">1x</span>'}`;
                figure.replaceChildren(grid);
                figure.classList.remove('construction');
              }
            }
            card.querySelector('p')?.remove();
            safetyCard.querySelector('p')?.remove();
            card.append(combined);
            if (title === 'ساختار نشانه‌نوشتهٔ انگلیسی') {
              card.classList.add('manshoor-slide');
              card.innerHTML = `<svg class="manshoor-reference" viewBox="0 0 960 540" preserveAspectRatio="none" role="img" aria-label="ساختار و حریم امن لوگوتایپ انگلیسی"><defs><pattern id="english-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#38383c" stroke-width=".7"/></pattern><marker id="english-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#d9232e"/></marker></defs><rect width="960" height="540" fill="#0b0b0c"/><rect width="960" height="540" fill="url(#english-grid)"/><line x1="0" y1="270" x2="960" y2="270" stroke="#55545a" stroke-width="2"/><svg x="180" y="90" width="600" height="96" viewBox="170 576 1200 192" preserveAspectRatio="none"><image href="./assets/reference/logo-reference.jpg" width="1536" height="1024" style="filter:invert(1);mix-blend-mode:screen;opacity:.5"/></svg><path class="dimension" marker-start="url(#english-arrow)" marker-end="url(#english-arrow)" d="M180 55H780M815 90V186"/><path class="dimension-extension" d="M180 90V55M780 90V55M780 90H815M780 186H815"/><text x="480" y="45">20x</text><text x="835" y="143">3.2x</text><rect x="150" y="330" width="660" height="156" fill="none" stroke="#d9232e" stroke-width="1" stroke-dasharray="6 6"/><svg x="180" y="360" width="600" height="96" viewBox="170 576 1200 192" preserveAspectRatio="none"><image href="./assets/reference/logo-reference.jpg" width="1536" height="1024" style="filter:invert(1);mix-blend-mode:screen;opacity:.5"/></svg><rect x="780" y="330" width="30" height="30" fill="none" stroke="#d9232e" stroke-dasharray="5 5"/><text x="795" y="349">1x</text></svg>`;
            }
            if (title === 'ساختار نشانه‌نوشتهٔ فارسی') {
              fetch('./assets/reference/logotype-farsi-layout.svg')
                .then(response => response.text())
                .then(source => {
                  const reference = new DOMParser().parseFromString(source, 'image/svg+xml').documentElement;
                  if (reference.localName !== 'svg' || reference.querySelector('parsererror')) throw new Error('Invalid Persian logotype SVG');
                  reference.removeAttribute('id');
                  reference.setAttribute('class', 'manshoor-reference');
                  reference.setAttribute('preserveAspectRatio', 'none');
                  const defs = reference.querySelector('defs');
                  defs?.remove();
                  // Replace the temporary wordmark with the approved Persian artwork used on slide 26.
                  reference.querySelectorAll('g.cls-6,.cls-7').forEach(node => node.remove());
                  const logoNs = 'http://www.w3.org/2000/svg';
                  for (const y of [60, 330]) {
                    const logo = document.createElementNS(logoNs, 'svg');
                    logo.setAttribute('x', '210'); logo.setAttribute('y', String(y));
                    logo.setAttribute('width', '540'); logo.setAttribute('height', '150');
                    logo.setAttribute('viewBox', '145 270 1245 295');
                    logo.setAttribute('preserveAspectRatio', 'none');
                    const clip = document.createElementNS(logoNs, 'clipPath');
                    clip.setAttribute('id', `slide26-logotype-crop-${y}`);
                    for (const attrs of [
                      ['x', '145', 'y', '300', 'width', '1245', 'height', '265'],
                      ['x', '145', 'y', '270', 'width', '485', 'height', '30'],
                      ['x', '905', 'y', '270', 'width', '485', 'height', '30']
                    ]) {
                      const clipRect = document.createElementNS(logoNs, 'rect');
                      for (let i = 0; i < attrs.length; i += 2) clipRect.setAttribute(attrs[i], attrs[i + 1]);
                      clip.append(clipRect);
                    }
                    logo.append(clip);
                    const image = document.createElementNS(logoNs, 'image');
                    image.setAttribute('href', './assets/reference/logo-reference.jpg');
                    image.setAttribute('x', '0'); image.setAttribute('y', '0');
                    image.setAttribute('width', '1536'); image.setAttribute('height', '1024');
                    image.setAttribute('clip-path', `url(#slide26-logotype-crop-${y})`);
                    image.style.filter = 'invert(1)'; image.style.opacity = '.5'; image.style.mixBlendMode = 'screen';
                    logo.append(image); reference.append(logo);
                  }
                  reference.querySelectorAll('.cls-1').forEach(node => { node.style.stroke = '#38383c'; node.style.strokeWidth = '.7px'; });
                  reference.querySelectorAll('.cls-2,.cls-3,.cls-4').forEach(node => { node.style.stroke = '#d9232e'; });
                  reference.querySelectorAll('.cls-5').forEach(node => { node.style.stroke = '#55545a'; });
                  reference.querySelectorAll('.cls-6').forEach(node => { node.style.opacity = '.5'; });
                  reference.querySelectorAll('.cls-7').forEach(node => { node.style.fill = '#d9232e'; });
                  reference.querySelectorAll('polygon').forEach(node => { node.style.fill = '#f5f4f1'; });
                  // Remove the source's unheaded guide lines; the measured arrows below are the only dimensions shown.
                  reference.querySelectorAll('g').forEach(group => {
                    const lines = [...group.querySelectorAll('line')];
                    if (lines.length && lines.every(line => /(?:cls-2|cls-3|cls-4)/.test(line.getAttribute('class') || ''))) group.remove();
                  });
                  const ns = 'http://www.w3.org/2000/svg';
                  const refDefs = document.createElementNS(ns, 'defs');
                  refDefs.innerHTML = '<marker id="manshoor-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#d9232e"/></marker>';
                  reference.prepend(refDefs);
                  const dimensions = document.createElementNS(ns, 'g');
                  dimensions.setAttribute('class', 'manshoor-reference-dimensions');
                  dimensions.innerHTML = '<path class="dimension" marker-start="url(#manshoor-arrow)" marker-end="url(#manshoor-arrow)" d="M210 42H750"/><path class="dimension" marker-start="url(#manshoor-arrow)" marker-end="url(#manshoor-arrow)" d="M780 60V210"/><path class="dimension-extension" d="M210 60V42M750 60V42M750 60H780M750 210H780"/><text x="480" y="32">18x</text><text x="800" y="140">5x</text><rect class="safety-clearance" x="750" y="300" width="30" height="30"/><text class="safety-label" x="765" y="319">1x</text>';
                  reference.append(dimensions);
                  card.replaceChildren(reference);
                })
                .catch(error => console.error(error));
            }
            const mergedSlide = page([card], card, title.replace('ساختار ', 'ساختار و حاشیه امنیت '));
            dividerEntries.push({title, slide: mergedSlide}, {title: safetyTitle, slide: mergedSlide});
            index++;
            continue;
          }
        }
        page([card], card);
      }
    } else if (child.matches('.mock-group')) {
      const groupTitle = child.querySelector('h3');
      for (const card of [...child.querySelectorAll('.mock-card')]) {
        page([card], card, card.querySelector('.mock-caption b')?.textContent.trim() || '');
      }
    } else page([child]);
  }
  if (chapter.id === 'essentials') {
    const sizeIndex = dividerEntries.findIndex(entry => entry.title === 'اندازه‌های نشانه');
    const safetyIndex = dividerEntries.findIndex(entry => entry.title === 'حاشیه امنیت نشانه');
    if (sizeIndex >= 0 && safetyIndex >= 0) {
      const [sizeEntry] = dividerEntries.splice(sizeIndex, 1);
      dividerEntries.splice(dividerEntries.findIndex(entry => entry.title === 'حاشیه امنیت نشانه') + 1, 0, sizeEntry);
    }
    const list = document.createElement('ul');
    list.className = 'divider-topic-list';
    dividerEntries.forEach(entry => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = entry.title === 'حاشیه امنیت شعار / اندازه' ? 'حاشیه امنیت و اندازه شعار' : entry.title;
      button.addEventListener('click', () => { const target = slides.indexOf(entry.slide); if (target >= 0) show(target); });
      item.append(button);
      list.append(item);
    });
    dividerSlide.firstElementChild.append(list);
  }
  chapter.remove();
}
// صفحهٔ چهارمِ فعلی در نسخهٔ ارائه، از جریان نمایش حذف شده است.
if (slides[3]) {
  slides[3].remove();
  slides.splice(3, 1);
}
const endTitle = document.createElement('h1');
endTitle.textContent = 'خوشمزه، مثل گذشته';
addSlide([endTitle, closing], 'closing', 'end-slide');
const omittedPageNumbers = [8, 9, 10, 11, 15, 16];
const omittedSlides = omittedPageNumbers.map(number => slides[number - 1]).filter(Boolean);
const omittedTitles = new Set(omittedSlides.map(slide => slide.querySelector('.slide-page-context span')?.textContent).filter(Boolean));
omittedSlides.forEach(slide => { slide.remove(); slides.splice(slides.indexOf(slide), 1); });
const removedCurrentSlides = [8, 9, 10].map(number => slides[number - 1]).filter(Boolean);
removedCurrentSlides.forEach(slide => {
  const title = slide.querySelector('.slide-page-context span')?.textContent;
  if (title) omittedTitles.add(title);
  slide.remove();
  slides.splice(slides.indexOf(slide), 1);
});
const horizontalSlide = slides[6];
if (horizontalSlide?.querySelector('.bilingual-composition-card')) {
  const verticalCard = horizontalSlide.querySelector('.bilingual-composition-card').cloneNode(true);
  const verticalSvg = verticalCard.querySelector('.composition-grid');
  verticalSvg.innerHTML = verticalSvg.innerHTML.replaceAll('composition-arrow', 'composition-arrow-vertical').replaceAll('composition-grid-pattern', 'composition-grid-pattern-vertical').replaceAll('composition-fa-crop', 'composition-fa-crop-vertical');
  positionComposition(verticalSvg, true);
  const verticalSlide = addSlide([sectionBar('', 'المان‌های پایه', 'ترکیب عمودی نشانه و لوگوتایپ‌ها'), verticalCard], 'essentials');
  slides.pop();
  slides.splice(7, 0, verticalSlide);
  deck.insertBefore(verticalSlide, horizontalSlide.nextSibling);
  const horizontalTopic = [...deck.querySelectorAll('.divider-topic-list button')].find(button => button.textContent === 'ترکیب نماد، فارسی، انگلیسی و 1969');
  if (horizontalTopic) {
    horizontalTopic.textContent = 'ترکیب افقی نشانه و لوگوتایپ‌ها';
    const verticalTopic = document.createElement('li');
    const verticalButton = document.createElement('button');
    verticalButton.type = 'button';
    verticalButton.textContent = 'ترکیب عمودی نشانه و لوگوتایپ‌ها';
    verticalButton.addEventListener('click', () => show(slides.indexOf(verticalSlide)));
    verticalTopic.append(verticalButton);
    horizontalTopic.closest('li').after(verticalTopic);
  }
}
slides.forEach((slide, index) => {
  if (index) slide.querySelector('.slide-page-number')?.replaceChildren(document.createTextNode(String(index).padStart(3, '0')));
});
deck.querySelectorAll('.divider-topic-list button').forEach(button => {
  if (omittedTitles.has(button.textContent) || [
    'قوانین نمایش نشانهٔ انگلیسی در وضعیت افقی و عمودی',
    'حاشیه امنیت نشانهٔ انگلیسی در وضعیت افقی و عمودی',
    'قوانین نمایش نشانهٔ فارسی در وضعیت افقی و عمودی',
    'حاشیه امنیت نشانهٔ فارسی در وضعیت افقی و عمودی'
  ].includes(button.textContent)) button.closest('li')?.remove();
});
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
const navSections = [...document.querySelectorAll('.nav-section')];
navSections.forEach(section => {
  const toggle = section.querySelector('.nav-section-toggle');
  if (!toggle || toggle.disabled) return;
  toggle.addEventListener('click', () => {
    const willOpen = !section.classList.contains('is-open');
    navSections.forEach(other => {
      if (other === section || other.classList.contains('is-disabled')) return;
      other.classList.toggle('is-open', willOpen ? false : other === section);
      const otherToggle = other.querySelector('.nav-section-toggle');
      if (otherToggle) {
        otherToggle.setAttribute('aria-expanded', String(willOpen ? false : other === section));
        otherToggle.querySelector('span').textContent = willOpen ? '+' : (other === section ? '−' : '+');
      }
    });
    section.classList.toggle('is-open', willOpen);
    toggle.setAttribute('aria-expanded', String(willOpen));
    toggle.querySelector('span').textContent = willOpen ? '−' : '+';
  });
});
let current = 0;
function fit() {
  const slide = slides[current];
  const canvas = slide.firstElementChild;
  const width = 1100;
  const height = width * 9 / 16;
  const scale = Math.min(slide.clientWidth / width, slide.clientHeight / height);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.style.left = '0';
  canvas.style.top = '0';
  canvas.style.transformOrigin = 'top left';
  canvas.style.setProperty('--fit-scale', scale);
  slide.querySelectorAll('.section-page-bar').forEach(bar => { bar.style.width = '100%'; });
  canvas.style.transform = `scale(${scale})`;
  document.querySelectorAll('.checker-rail').forEach(rail => {
    if (!rail.offsetParent) return;
    const columns = Math.max(12, Math.floor(rail.clientWidth / 20));
    rail.style.setProperty('grid-template-columns', `repeat(${columns}, 1fr)`, 'important');
    rail.style.setProperty('grid-template-rows', 'repeat(2, 1fr)', 'important');
    rail.style.setProperty('height', `${(rail.clientWidth / columns) * 2}px`, 'important');
    [...rail.children].forEach((cell, index) => {
      const visible = index < columns * 2;
      cell.style.display = visible ? 'block' : 'none';
      if (!visible) return;
      const row = Math.floor(index / columns);
      const column = index % columns;
      cell.className = (row + column) % 2 ? 'black' : 'white';
      if ((row === 0 && column % 13 === 3) || (row === 1 && column % 13 === 9)) cell.className = 'red';
    });
  });
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

