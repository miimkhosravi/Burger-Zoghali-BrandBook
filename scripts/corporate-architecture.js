/* Additional brandbook chapters; loaded after the existing slide sequence. */
window.appendCorporateArchitecture = () => {
  try {
    document.body.dataset.corporateStarted = 'yes';
  const whiteLogo = './assets/reference/new-version/Logo%20BZ-10.svg';
  const darkLogo = './assets/reference/new-version/Logo%20BZ-10-Dark.svg';
  const logo = (dark = false, className = '') => `<img class="brand-mark ${className}" src="${dark ? darkLogo : whiteLogo}" alt="برگر ذغالی / Burger Zoghali">`;
  const paper = (size, content = '') => `<div class="office-paper ${size}"><div class="paper-head">${logo(true)}</div><div class="paper-body">${content}</div><div class="paper-footer"><span>www.burgerzoghali.ir</span></div></div>`;
  const lines = '<i></i><i></i><i></i><i></i>';
  const items = [
    ['کارت تجاری', `<div class="business-pair"><div class="business-card dark">${logo()}<span>www.burgerzoghali.ir</span></div><div class="business-card light">${logo(true)}<div class="card-lines"><b>نام و نام خانوادگی</b><small>عنوان شغلی / JOB TITLE</small><hr><small>۰۲۱ ۰۰۰۰ ۰۰۰۰</small><small>www.burgerzoghali.ir</small></div><div class="checker-band"></div></div></div>`],
    ['کارت شناسایی', `<div class="id-pair"><div class="id-card"><div class="id-top">${logo()}</div><div class="id-photo"></div><b>نام و نام خانوادگی</b><span>عنوان شغلی</span><div class="checker-band"></div></div><div class="id-card id-back">${logo()}<div class="id-rule"></div><span>کارت شناسایی پرسنل</span><small>www.burgerzoghali.ir</small><div class="checker-band"></div></div></div>`],
    ['سربرگ A4', paper('a4', `<div class="paper-meta">شماره: ۰۰۰۰<br>تاریخ: ۰۰/۰۰/۰۰</div><div class="paper-lines">${lines}</div>`) ],
    ['سربرگ A5', paper('a5', `<div class="paper-meta">شماره: ۰۰۰۰<br>تاریخ: ۰۰/۰۰/۰۰</div><div class="paper-lines">${lines}</div>`) ],
    ['پاکت نامه ملخی', `<div class="envelope dl"><div class="envelope-top">${logo()}<span>www.burgerzoghali.ir</span></div><div class="envelope-fold"></div><div class="checker-band"></div></div><div class="envelope envelope-back dl"><div class="flap"></div><div class="checker-band"></div></div>`],
    ['پاکت A4', `<div class="envelope c4"><div class="envelope-top">${logo()}<span>www.burgerzoghali.ir</span></div><div class="envelope-fold"></div><div class="checker-band"></div></div>`],
    ['فولدر سازمانی', `<div class="folder"><div class="folder-spine"></div>${logo()}<span>www.burgerzoghali.ir</span><div class="folder-bottom"><div class="checker-band"></div></div></div><div class="folder folder-inside"><div class="folder-pocket"><div class="checker-band"></div></div><div class="folder-pocket"><div class="checker-band"></div></div></div>`],
    ['لیبل زونکن', `<div class="label-board"><div class="binder binder-black"><div class="binder-top"></div>${logo()}<div class="binder-label">عنوان پرونده <small>ARCHIVE / 001</small></div><div class="checker-band"></div></div><div class="binder binder-white"><div class="binder-top"></div>${logo(true)}<div class="binder-label">عنوان پرونده <small>ARCHIVE / 002</small></div><div class="checker-band"></div></div></div>`],
    ['برچسب اموال و تجهیزات', `<div class="asset-labels"><div class="asset-label">${logo()}<b>برچسب اموال</b><span>کد دارایی ۰۰۰۱</span><div class="asset-code"></div></div><div class="asset-label">${logo()}<b>برچسب اموال</b><span>کد دارایی ۰۰۰۲</span><div class="asset-code"></div></div><div class="asset-label">${logo()}<b>برچسب اموال</b><span>کد دارایی ۰۰۰۳</span><div class="asset-code"></div></div></div>`],
    ['ماوس پد و ماگ', `<div class="desk-set"><div class="mouse-pad">${logo()}<div class="checker-band"></div></div><div class="mug"><div class="mug-handle"></div>${logo()}</div></div>`],
    ['لیوان کاغذی اداری', `<div class="cup-set"><div class="paper-cup cup-black"><div class="cup-lid"></div>${logo()}<div class="checker-band"></div></div><div class="paper-cup cup-white"><div class="cup-lid"></div>${logo(true)}<div class="checker-band"></div></div></div>`],
    ['دفترچه و برگه یادداشت', `<div class="notepad-set">${paper('notepad', '<div class="paper-lines"><i></i><i></i><i></i></div>')}<div class="note-stack"><div class="sticky red"></div><div class="sticky black">${logo()}</div><div class="sticky white">${logo(true)}</div></div></div>`],
    ['کاغذ کادو و ربان', `<div class="gift-scene"><div class="gift-box"><div class="gift-lid"></div><div class="gift-ribbon vertical"></div><div class="gift-ribbon horizontal"></div>${logo()}</div><div class="wrap-sheet"><div class="wrap-pattern"></div></div><div class="ribbon-roll"></div></div>`],
    ['نوار چسب و لیبل هدیه', `<div class="gift-extras"><div class="tape-roll"></div><div class="gift-tag">${logo()}<div class="checker-band"></div></div><div class="seal-sheet"><span>${logo()}</span><span>${logo()}</span><span>${logo()}</span><span>${logo()}</span></div></div>`]
  ];
  const architecture = [
    ['نمای بیرونی و تابلوی چنلیوم', 'architecture-01.webp', 'exterior'],
    ['سالن شعبه / نمای کلی', 'architecture-02.webp'],
    ['تابلوی بالای پیشخوان سفارش', 'architecture-03.webp', 'counter'],
    ['چیدمان میز و صندلی', 'architecture-04.webp'],
    ['نشیمن و جزئیات مبلمان', 'architecture-05.webp'],
    ['نورپردازی سالن', 'architecture-06.webp'],
    ['آشپزخانهٔ سفید و بهداشتی', 'architecture-07.webp'],
    ['فضای دفتر و تجهیزات اداری', 'architecture-08.webp'],
    ['علائم رهیاب شعبه', 'architecture-09.webp', 'wayfinding'],
    ['دید تکمیلی سالن', 'architecture-10.webp']
  ];
  function chapterDivider(chapter, no, fa, en, topics) {
    const heading = packagingDivider.querySelector('.chapter-top').cloneNode(true);
    heading.querySelector('.no').textContent = no;
    heading.querySelector('h2').textContent = fa;
    heading.querySelector('.slug').textContent = en;
    heading.querySelector('.slug').setAttribute('lang', 'en');
    const bar = sectionBar(no, fa); bar.classList.add('divider-page-bar');
    const slide = addSlide([bar, heading], chapter, 'divider');
    slide.firstElementChild.append(checkerRail());
    const list = document.createElement('ul');
    list.className = `divider-topic-list ${chapter}-topic-list`;
    slide.firstElementChild.append(list);
    return list;
  }
  function listItem(list, title, slide) {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = title;
    button.addEventListener('click', () => show(slides.indexOf(slide)));
    item.append(button); list.append(item);
  }
  const stationeryList = chapterDivider('stationery', '07', 'کاربردهای سازمانی', 'Corporate Applications');
  for (const [title, markup] of items) {
    const stage = document.createElement('article');
    stage.className = 'corporate-stage'; stage.innerHTML = markup;
    const bar = sectionBar('', 'کاربردهای سازمانی', title); bar.classList.add('mock-page-bar');
    const slide = addSlide([bar, stage], 'stationery');
    listItem(stationeryList, title, slide);
  }
  const architectureList = chapterDivider('space', '08', 'معماری شعبه', 'Restaurant Architecture');
  for (const [title, filename, variant] of architecture) {
    const card = document.createElement('article'); card.className = `mock-card architecture-card ${variant || ''}`;
    const photo = document.createElement('img'); photo.className = 'mock-photo';
    photo.src = `./assets/mockups/${filename}`; photo.alt = title; photo.loading = 'lazy'; card.append(photo);
    if (variant === 'exterior' || variant === 'counter') {
      const sign = document.createElement('div'); sign.className = `architecture-sign ${variant}`;
      sign.innerHTML = logo(); card.append(sign);
    }
    if (variant === 'wayfinding') {
      const signs = document.createElement('div'); signs.className = 'wayfinding-copy';
      signs.innerHTML = '<span>سالن</span><span>پیشخوان سفارش</span><span>دریافت سفارش</span><span>سرویس بهداشتی</span>';
      card.append(signs);
    }
    const bar = sectionBar('', 'معماری شعبه', title); bar.classList.add('mock-page-bar');
    const slide = addSlide([bar, card], 'space'); listItem(architectureList, title, slide);
  }
  slides.forEach((slide, index) => {
    if (index) slide.querySelector('.slide-page-number')?.replaceChildren(document.createTextNode(String(index).padStart(3, '0')));
  });
  document.querySelector('.page-total').textContent = slides.length.toLocaleString('fa-IR');
  document.querySelector('[aria-label="صفحهٔ انتهایی"]').value = String(slides.length).toLocaleString('fa-IR');
  show(current);
  } catch (error) {
    document.body.dataset.corporateError = String(error.stack || error);
    console.error('Corporate and architecture slides:', error);
  }
};
