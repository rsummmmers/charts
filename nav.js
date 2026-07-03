(function () {
  const SECTIONS = [
    { name: 'How Banks Create Money', models: [
      { file: 'money-multiplier.html',    title: 'The Money Multiplier' },
      { file: 'debt-copies.html',         title: 'The Debt Copy Problem' },
      { file: 'interest-ratchet.html',    title: 'The Interest Ratchet' },
      { file: 'interest-comparison.html', title: 'The Interest Variable' },
    ]},
    { name: 'Rules and Alternatives', models: [
      { file: 'capital-requirements.html',  title: 'Three Banking Guardrails' },
      { file: 'risk-modeling.html',         title: 'Risk Models' },
      { file: 'public-private-credit.html', title: 'Public vs. Private Credit' },
      { file: 'ponzi.html',                 title: 'The Ponzi Comparison' },
    ]},
    { name: 'What the Economy Leaves Out', models: [
      { file: 'daly-economy.html',      title: "Daly's Missing Substrate" },
      { file: 'ledger-boundary.html',   title: 'The Incomplete Ledger' },
      { file: 'hidden-foundation.html', title: 'The Hidden Foundation' },
      { file: 'bucket-nomics.html',     title: 'Bucket-nomics' },
    ]},
    { name: 'How Biophysical Systems Work', models: [
      { file: 'stock-flow.html',        title: 'Stock vs. Flow Systems' },
      { file: 'threshold-failure.html', title: 'Threshold Failure' },
      { file: 'offsets-problem.html',   title: 'The Offset Problem' },
      { file: 'entropy.html',           title: 'Entropy' },
      { file: 'gravity-atmosphere.html',title: 'Gravity and Atmosphere' },
      { file: 'emergence.html',         title: 'Emergence' },
    ]},
  ];

  const page = window.location.pathname.split('/').pop() || '';
  let sec = null, idx = -1;
  for (const s of SECTIONS) {
    const i = s.models.findIndex(m => m.file === page);
    if (i >= 0) { sec = s; idx = i; break; }
  }
  if (!sec) return;

  const nav = document.querySelector('nav');
  if (!nav) return;

  const row = document.createElement('div');
  row.style.cssText = [
    'display:flex', 'align-items:center', 'gap:0.55rem', 'flex-wrap:wrap',
    'width:100%', 'padding-top:0.3rem', 'margin-top:0.25rem',
    'border-top:1px solid #ececec', 'font-size:0.78rem'
  ].join(';');

  const lbl = document.createElement('span');
  lbl.textContent = sec.name;
  lbl.style.cssText = 'color:#bbb;flex-grow:1;font-size:0.72rem;';
  row.appendChild(lbl);

  const pos = document.createElement('span');
  pos.textContent = (idx + 1) + ' of ' + sec.models.length;
  pos.style.cssText = 'color:#ccc;font-size:0.72rem;';
  row.appendChild(pos);

  if (idx > 0) {
    const dot = document.createElement('span');
    dot.textContent = '·'; dot.style.color = '#ddd';
    const a = document.createElement('a');
    a.href = sec.models[idx - 1].file;
    a.textContent = '← ' + sec.models[idx - 1].title;
    a.style.cssText = 'color:#999;text-decoration:none;';
    a.onmouseenter = () => a.style.color = '#333';
    a.onmouseleave = () => a.style.color = '#999';
    row.appendChild(dot);
    row.appendChild(a);
  }

  if (idx < sec.models.length - 1) {
    const dot = document.createElement('span');
    dot.textContent = '·'; dot.style.color = '#ddd';
    const a = document.createElement('a');
    a.href = sec.models[idx + 1].file;
    a.textContent = sec.models[idx + 1].title + ' →';
    a.style.cssText = 'color:#999;text-decoration:none;';
    a.onmouseenter = () => a.style.color = '#333';
    a.onmouseleave = () => a.style.color = '#999';
    row.appendChild(dot);
    row.appendChild(a);
  }

  nav.appendChild(row);
})();
