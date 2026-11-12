// The Illustrator paths are the source of truth. Measurements are taken from
// their rendered bounds, then the intact paths are scaled uniformly.
(async () => {
  const ns = 'http://www.w3.org/2000/svg';
  const unit = 24;
  const svgNode = (name, attributes = {}) => {
    const node = document.createElementNS(ns, name);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, String(value)));
    return node;
  };
  const cache = new Map();
  async function artwork(number, symbolOnly = false) {
    const key = `${number}:${symbolOnly}`;
    if (cache.has(key)) return cache.get(key);
    const file = `./assets/reference/new-version/Logo BZ-${String(number).padStart(2, '0')}.svg`;
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Logo SVG unavailable: ${file}`);
    const source = (await response.text()).replaceAll('cls-', `bz${number}-cls-`);
    const root = new DOMParser().parseFromString(source, 'image/svg+xml').documentElement;
    if (root.localName !== 'svg' || root.querySelector('parsererror')) throw new Error(`Invalid logo SVG: ${file}`);
    const graphic = symbolOnly ? root.querySelector(':scope > g > g:first-child') : root.querySelector(':scope > g');
    if (!graphic) throw new Error(`Missing logo paths: ${file}`);
    const probe = svgNode('svg', {width: 1000, height: 1000});
    probe.style.cssText = 'position:absolute;left:-10000px;top:0;opacity:0;pointer-events:none';
    const defs = root.querySelector('defs')?.cloneNode(true);
    if (defs) probe.append(defs);
    const paths = graphic.cloneNode(true);
    probe.append(paths);
    document.body.append(probe);
    let bounds;
    try { bounds = paths.getBBox({stroke: true}); }
    catch { bounds = paths.getBBox(); }
    // SVG getBBox omits stroke in some browsers. The red frame has a 3–6 px
    // stroke, so reserve its outer edge in every nested viewport.
    const strokePad = 4;
    const box = {
      x: bounds.x - strokePad,
      y: bounds.y - strokePad,
      width: bounds.width + 2 * strokePad,
      height: bounds.height + 2 * strokePad
    };
    probe.remove();
    if (!box.width || !box.height) throw new Error(`Empty logo artwork: ${file}`);
    const result = {box, defs, paths: graphic.cloneNode(true)};
    cache.set(key, result);
    return result;
  }
  const grid = () => {
    const stage = svgNode('svg', {viewBox: '0 0 960 492', preserveAspectRatio: 'none', class: 'new-logo-grid', role: 'img'});
    const defs = svgNode('defs');
    const pattern = svgNode('pattern', {id: `logo-grid-${Math.random().toString(36).slice(2)}`, width: unit, height: unit, patternUnits: 'userSpaceOnUse'});
    pattern.append(svgNode('path', {d: `M${unit} 0H0V${unit}`, fill: 'none', stroke: '#414145', 'stroke-width': '.8'}));
    const arrow = svgNode('marker', {id: `logo-arrow-${Math.random().toString(36).slice(2)}`, viewBox: '0 0 10 10', refX: 5, refY: 5, markerWidth: 5, markerHeight: 5, orient: 'auto-start-reverse'});
    arrow.append(svgNode('path', {d: 'M0 0L10 5L0 10Z', fill: '#A3121B'}));
    defs.append(pattern, arrow);
    stage.append(defs, svgNode('rect', {width: 960, height: 492, fill: '#171717'}), svgNode('rect', {width: 960, height: 492, fill: `url(#${pattern.id})`}));
    stage.dataset.arrow = arrow.id;
    return stage;
  };
  const line = (stage, d, kind = 'measure') => {
    const path = svgNode('path', {d, class: kind});
    if (kind === 'measure') {
      path.setAttribute('marker-start', `url(#${stage.dataset.arrow})`);
      path.setAttribute('marker-end', `url(#${stage.dataset.arrow})`);
    }
    stage.append(path);
  };
  const label = (stage, x, y, value) => {
    const text = svgNode('text', {x, y, class: 'measurement-label'});
    text.textContent = value;
    stage.append(text);
  };
  const units = px => `${Number((px / unit).toFixed(2))}x`;
  function place(stage, source, area, options = {}) {
    const {box, defs, paths} = source;
    let columns = Math.floor(area.maxWidth / unit);
    while (columns > 1 && box.height * (columns * unit / box.width) > area.maxHeight) columns--;
    const width = columns * unit;
    const height = box.height * width / box.width;
    const x = Math.round((area.x + (area.width - width) / 2) / unit) * unit;
    const y = Math.round((area.y + (area.height - height) / 2) / unit) * unit;
    const viewport = svgNode('svg', {x, y, width, height, viewBox: `${box.x} ${box.y} ${box.width} ${box.height}`, preserveAspectRatio: 'none', class: 'measured-artwork'});
    viewport.style.opacity = options.opacity ?? '.5';
    if (defs) viewport.append(defs.cloneNode(true));
    viewport.append(paths.cloneNode(true));
    stage.append(viewport);
    return {x, y, width, height};
  }
  function dimensions(stage, box, {horizontal = true, vertical = true} = {}) {
    const {x, y, width, height} = box;
    if (horizontal) {
      const measureY = y - 20;
      line(stage, `M${x} ${measureY}H${x + width}`);
      line(stage, `M${x} ${measureY}V${y}M${x + width} ${measureY}V${y}`, 'extension');
      label(stage, x + width / 2, measureY - 8, units(width));
    }
    if (vertical) {
      const measureX = x + width + 20;
      line(stage, `M${measureX} ${y}V${y + height}`);
      line(stage, `M${x + width} ${y}H${measureX}M${x + width} ${y + height}H${measureX}`, 'extension');
      label(stage, measureX + 24, y + height / 2 + 5, units(height));
    }
  }
  const makeCard = stage => {
    const card = document.createElement('article');
    card.className = 'card bilingual-composition-card new-logo-card';
    card.append(stage);
    return card;
  };
  const updateSlide = (slide, title, stage) => {
    slide.querySelector('.slide-page-context span').textContent = title;
    slide.querySelector('.bilingual-composition-card').replaceWith(makeCard(stage));
  };
  const source = await Promise.all([5, 6, 7, 8, 9, 10].map(n => artwork(n)));
  const byNumber = n => source[[5, 6, 7, 8, 9, 10].indexOf(n)];

  // Each dimension in slide 6 needs its own path: SVG markers attach to the
  // start and end of the whole path, not to every subpath in a combined d.
  const englishGrid = slides[5]?.querySelector('.manshoor-reference');
  const englishMeasure = englishGrid?.querySelector('path.dimension');
  if (englishMeasure) {
    englishMeasure.setAttribute('d', 'M180 55H780');
    const verticalMeasure = englishMeasure.cloneNode(false);
    verticalMeasure.setAttribute('d', 'M815 90V186');
    englishMeasure.after(verticalMeasure);
  }

  // Slide 4: the revised framed symbol, its true overall dimensions, and 1x clear space.
  const architecture = slides[3].querySelector('.identity-stage');
  const symbol = await artwork(5, true);
  const stage4 = grid();
  stage4.setAttribute('aria-label', 'ساختار نشانهٔ قاب‌دار و حریم امن آن با اندازه‌گذاری واقعی');
  line(stage4, 'M480 0V492', 'divider');
  const right = place(stage4, symbol, {x: 500, y: 76, width: 430, height: 328, maxWidth: 216, maxHeight: 250});
  const left = place(stage4, symbol, {x: 24, y: 76, width: 430, height: 328, maxWidth: 216, maxHeight: 250});
  dimensions(stage4, right);
  const safe = svgNode('rect', {x: left.x - unit, y: left.y - unit, width: left.width + 2 * unit, height: left.height + 2 * unit, class: 'safe-outline'});
  stage4.append(safe, svgNode('rect', {x: left.x + left.width, y: left.y - unit, width: unit, height: unit, class: 'safe-unit'}));
  label(stage4, left.x + left.width + unit / 2, left.y - unit / 2 + 5, '1x');
  architecture.replaceChildren(stage4);

  // Slide 7: Persian above English, each beside the same approved symbol.
  const stage7 = grid();
  stage7.setAttribute('aria-label', 'چیدمان افقی فارسی و انگلیسی، هرکدام با نشانه و اندازه‌های واقعی');
  line(stage7, 'M0 246H960', 'divider');
  const top7 = place(stage7, byNumber(9), {x: 72, y: 35, width: 816, height: 188, maxWidth: 624, maxHeight: 116});
  const bottom7 = place(stage7, byNumber(8), {x: 72, y: 281, width: 816, height: 188, maxWidth: 624, maxHeight: 116});
  dimensions(stage7, top7);
  dimensions(stage7, bottom7);
  updateSlide(slides[6], 'ترکیب افقی نشانه و نشانه‌نوشته‌ها', stage7);

  // Slide 8: two vertical lockups side by side, Persian on the right.
  const stage8 = grid();
  stage8.setAttribute('aria-label', 'چیدمان عمودی فارسی در سمت راست و انگلیسی در سمت چپ');
  line(stage8, 'M480 0V492', 'divider');
  const right8 = place(stage8, byNumber(6), {x: 510, y: 82, width: 420, height: 338, maxWidth: 336, maxHeight: 272});
  const left8 = place(stage8, byNumber(5), {x: 30, y: 82, width: 420, height: 338, maxWidth: 336, maxHeight: 272});
  dimensions(stage8, right8);
  dimensions(stage8, left8);
  updateSlide(slides[7], 'ترکیب عمودی نشانه و نشانه‌نوشته‌ها', stage8);

  // Slide 9: symbol beside stacked Persian and English wordmarks.
  const stage9 = grid();
  stage9.setAttribute('aria-label', 'ترکیب دو‌زبانهٔ افقی با نشانه در کنار نوشته‌ها');
  const box9 = place(stage9, byNumber(10), {x: 74, y: 70, width: 812, height: 352, maxWidth: 672, maxHeight: 304});
  dimensions(stage9, box9);
  const slide9 = addSlide([sectionBar('', 'المان‌های پایه', 'ترکیب دوزبانهٔ افقی'), makeCard(stage9)], 'essentials');
  slides.pop(); slides.splice(8, 0, slide9);
  deck.insertBefore(slide9, slides[9]);

  // Slide 10: symbol above the stacked Persian and English wordmarks.
  const stage10 = grid();
  stage10.setAttribute('aria-label', 'ترکیب دو‌زبانهٔ عمودی با نشانه بالای نوشته‌ها');
  const box10 = place(stage10, byNumber(7), {x: 120, y: 52, width: 720, height: 386, maxWidth: 480, maxHeight: 340});
  dimensions(stage10, box10);
  const slide10 = addSlide([sectionBar('', 'المان‌های پایه', 'ترکیب دوزبانهٔ عمودی'), makeCard(stage10)], 'essentials');
  slides.pop(); slides.splice(9, 0, slide10);
  deck.insertBefore(slide10, slides[10]);

  // Slides 11 and 12 use the new collaboration images from the mockup manifest.
  // Keep the source assets for 13 and 14, but remove those pages from the deck.
  for (const slide of slides.slice(12, 14)) {
    slide.remove();
    slides.splice(slides.indexOf(slide), 1);
  }
  // Remove the requested color pages by their current presentation numbers.
  const removedColorSlides = [16, 18, 19, 22, 23].map(page => slides[page - 1]).filter(Boolean);
  const removedColorTopics = new Set(removedColorSlides.map(slide => slide.querySelector('.slide-page-context span')?.textContent).filter(Boolean));
  removedColorSlides.forEach(slide => { slide.remove(); slides.splice(slides.indexOf(slide), 1); });
  document.querySelectorAll('.color-topic-list button').forEach(button => {
    if (removedColorTopics.has(button.textContent)) button.closest('li')?.remove();
  });

  // Place the two-tone display sheet directly after the approved logo layouts.
  const displayImage = document.createElement('img');
  displayImage.className = 'colorway-sheet';
  displayImage.src = './assets/reference/bz-glass-two-tone-board.webp';
  displayImage.alt = 'شش حالت نمایش نشانه و نشانه‌نوشته روی تابلوهای شیشه‌ای مشکی، سفید و قرمز';
  const displaySlide = addSlide([sectionBar('', 'المان‌های پایه', 'حالت‌های نمایش نشانه'), displayImage], 'essentials');
  slides.pop();
  slides.splice(10, 0, displaySlide);
  deck.insertBefore(displaySlide, slides[11]);

  const topics = [...deck.querySelectorAll('.divider-topic-list button')];
  const anchor = topics.find(button => button.textContent === 'ترکیب عمودی نشانه و لوگوتایپ‌ها');
  if (anchor) {
    let after = anchor.closest('li');
    for (const [title, slide] of [['ترکیب دوزبانهٔ افقی', slide9], ['ترکیب دوزبانهٔ عمودی', slide10], ['حالت‌های نمایش نشانه', displaySlide]]) {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button'; button.textContent = title;
      button.addEventListener('click', () => show(slides.indexOf(slide)));
      item.append(button); after.after(item); after = item;
    }
  }
  // Remove the current monochrome colorway page (slide 18) and its divider link.
  const removedSlide18 = slides[17];
  if (removedSlide18?.dataset.chapter === 'colors') {
    const removedTitle = removedSlide18.querySelector('.slide-page-context span')?.textContent;
    removedSlide18.remove();
    slides.splice(17, 1);
    document.querySelectorAll('.color-topic-list button').forEach(button => {
      if (button.textContent === removedTitle) button.closest('li')?.remove();
    });
  }
  slides.forEach((slide, index) => {
    if (index) slide.querySelector('.slide-page-number')?.replaceChildren(document.createTextNode(String(index).padStart(3, '0')));
  });
  document.querySelector('.page-total').textContent = slides.length.toLocaleString('fa-IR');
  document.querySelector('[aria-label="صفحهٔ انتهایی"]').value = String(slides.length).toLocaleString('fa-IR');
  show(current);
})().catch(error => console.error('New logo layout:', error));
