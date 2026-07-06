(function () {
  const SECTIONS = [
    { id: 'definitions', short: 'Definitions', name: 'Money Concept Definitions', models: [
      { file: 'value.html',       title: 'Value' },
      { file: 'wealth.html',      title: 'Wealth' },
      { file: 'money.html',       title: 'Money' },
      { file: 'capital.html',     title: 'Capital' },
      { file: 'asset.html',       title: 'Asset' },
      { file: 'debt.html',        title: 'Debt' },
      { file: 'credit.html',      title: 'Credit' },
      { file: 'price.html',       title: 'Price' },
      { file: 'connections.html', title: 'How They Connect' },
    ]},
    { id: 'banking', short: 'Banking', name: 'How Banks Create Money', models: [
      { file: 'money-multiplier.html',    title: 'The Money Multiplier' },
      { file: 'debt-copies.html',         title: 'The Debt Copy Problem' },
      { file: 'interest-ratchet.html',    title: 'The Interest Ratchet' },
      { file: 'interest-comparison.html', title: 'The Interest Variable' },
    ]},
    { id: 'rules', short: 'Guardrails', name: 'How the Financial System Is Governed', models: [
      { file: 'capital-requirements.html',  title: 'Three Banking Guardrails' },
      { file: 'risk-modeling.html',         title: 'Risk Models' },
      { file: 'public-private-credit.html', title: 'Public vs. Private Credit' },
      { file: 'ponzi.html',                 title: 'The Ponzi Comparison' },
    ]},
    { id: 'missing', short: 'Missing Costs', name: 'What the Economy Leaves Out', models: [
      { file: 'daly-economy.html',      title: "Daly's Missing Substrate" },
      { file: 'ledger-boundary.html',   title: 'The Incomplete Ledger' },
      { file: 'hidden-foundation.html', title: 'The Hidden Foundation' },
      { file: 'bucket-nomics.html',     title: 'Bucket-nomics' },
    ]},
    { id: 'biophysical', short: 'Biophysical', name: 'How Biophysical Systems Work', models: [
      { file: 'stock-flow.html',         title: 'Stock vs. Flow Systems' },
      { file: 'threshold-failure.html',  title: 'Threshold Failure' },
      { file: 'offsets-problem.html',    title: 'The Offset Problem' },
      { file: 'entropy.html',            title: 'Entropy' },
      { file: 'gravity-atmosphere.html', title: 'Gravity and Atmosphere' },
      { file: 'emergence.html',          title: 'Emergence' },
    ]},
  ];

  const page = window.location.pathname.split('/').pop() || 'index.html';
  const isIndex = (page === 'index.html' || page === '');

  let sec = null, idx = -1;
  if (!isIndex) {
    for (const s of SECTIONS) {
      const i = s.models.findIndex(m => m.file === page);
      if (i >= 0) { sec = s; idx = i; break; }
    }
  }

  // ── Persistent fixed header ───────────────────────────────────────────────

  const HDR_H = 36;

  const hdr = document.createElement('div');
  hdr.style.cssText = [
    'position:fixed', 'top:0', 'left:0', 'right:0', 'z-index:9999',
    'background:#faf8f5', 'border-bottom:1.5px solid #1a1a1a',
    'display:flex', 'align-items:stretch', 'height:' + HDR_H + 'px',
    "font-family:'Georgia',serif"
  ].join(';');

  // "All models" home link
  const home = document.createElement('a');
  home.href = 'index.html';
  home.textContent = 'All models';
  home.style.cssText = [
    'font-size:0.7rem', 'color:#888', 'text-decoration:none',
    'display:flex', 'align-items:center', 'padding:0 0.9rem',
    'border-right:1.5px solid #e0e0e0', 'white-space:nowrap', 'flex-shrink:0'
  ].join(';');
  home.onmouseenter = () => home.style.color = '#1a1a1a';
  home.onmouseleave = () => home.style.color = '#888';
  hdr.appendChild(home);

  // Section tabs
  const tabWrap = document.createElement('div');
  tabWrap.style.cssText = 'display:flex;align-items:stretch;overflow-x:auto;flex:1;';
  // hide scrollbar but allow scroll on mobile
  tabWrap.style.cssText += 'scrollbar-width:none;-ms-overflow-style:none;';

  SECTIONS.forEach(s => {
    const isActive = sec && sec.id === s.id;
    const href = isIndex ? ('#' + s.id) : ('index.html#' + s.id);
    const tab = document.createElement('a');
    tab.href = href;
    tab.textContent = s.short;
    tab.style.cssText = [
      'font-size:0.72rem', 'text-decoration:none', 'white-space:nowrap',
      'display:flex', 'align-items:center', 'padding:0 0.9rem',
      'border-right:1px solid #ececec',
      'color:' + (isActive ? '#1a1a1a' : '#888'),
      'font-weight:' + (isActive ? 'bold' : 'normal'),
      'border-bottom:' + (isActive ? '2.5px solid #1a1a1a' : '2.5px solid transparent'),
      'box-sizing:border-box'
    ].join(';');
    if (!isActive) {
      tab.onmouseenter = () => { tab.style.color = '#1a1a1a'; tab.style.background = '#f0eeeb'; };
      tab.onmouseleave = () => { tab.style.color = '#888'; tab.style.background = ''; };
    }
    tabWrap.appendChild(tab);
  });

  hdr.appendChild(tabWrap);
  document.body.insertBefore(hdr, document.body.firstChild);

  // Push body content below fixed header
  const existingPT = parseInt(getComputedStyle(document.body).paddingTop) || 0;
  document.body.style.paddingTop = (existingPT + HDR_H + 6) + 'px';

  // ── Prev / next within section (model pages only) ─────────────────────────

  if (!sec) return;

  const nav = document.querySelector('nav');
  if (!nav) return;

  const row = document.createElement('div');
  row.style.cssText = [
    'display:flex', 'align-items:center', 'gap:0.5rem', 'flex-wrap:wrap',
    'width:100%', 'padding-top:0.28rem', 'margin-top:0.2rem',
    'border-top:1px solid #efefef', 'font-size:0.76rem'
  ].join(';');

  const lbl = document.createElement('span');
  lbl.textContent = sec.name;
  lbl.style.cssText = 'color:#bbb;flex-grow:1;font-size:0.7rem;';
  row.appendChild(lbl);

  const pos = document.createElement('span');
  pos.textContent = (idx + 1) + ' of ' + sec.models.length;
  pos.style.cssText = 'color:#ccc;font-size:0.7rem;';
  row.appendChild(pos);

  function navLink(file, title, dir) {
    const dot = document.createElement('span');
    dot.textContent = '·'; dot.style.color = '#e0e0e0';
    const a = document.createElement('a');
    a.href = file;
    a.textContent = dir === 'prev' ? ('← ' + title) : (title + ' →');
    a.style.cssText = 'color:#aaa;text-decoration:none;';
    a.onmouseenter = () => a.style.color = '#1a1a1a';
    a.onmouseleave = () => a.style.color = '#aaa';
    row.appendChild(dot);
    row.appendChild(a);
  }

  if (idx > 0) navLink(sec.models[idx - 1].file, sec.models[idx - 1].title, 'prev');
  if (idx < sec.models.length - 1) navLink(sec.models[idx + 1].file, sec.models[idx + 1].title, 'next');

  nav.appendChild(row);

  // ── Section model picker (all models as chips) ────────────────────────────

  const picker = document.createElement('div');
  picker.style.cssText = [
    'display:flex', 'flex-wrap:wrap', 'gap:0.3rem',
    'width:100%', 'padding-top:0.38rem', 'margin-top:0.15rem',
    'border-top:1px solid #f0f0f0'
  ].join(';');

  sec.models.forEach((m, i) => {
    const isCurrent = (i === idx);
    const chip = document.createElement(isCurrent ? 'span' : 'a');
    if (!isCurrent) chip.href = m.file;
    chip.textContent = m.title;
    chip.style.cssText = [
      'font-size:0.68rem', 'text-decoration:none',
      'padding:0.18rem 0.48rem', 'border-radius:3px',
      'white-space:nowrap', "font-family:'Georgia',serif",
      isCurrent
        ? 'background:#1a1a1a;color:#fff;cursor:default;'
        : 'color:#888;border:1px solid #e8e8e8;background:#faf8f5;'
    ].join(';');
    if (!isCurrent) {
      chip.onmouseenter = () => { chip.style.color = '#1a1a1a'; chip.style.borderColor = '#999'; };
      chip.onmouseleave = () => { chip.style.color = '#888'; chip.style.borderColor = '#e8e8e8'; };
    }
    picker.appendChild(chip);
  });

  nav.appendChild(picker);
})();
