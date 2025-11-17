const mapData = [
  {
    id: 'brand',
    title: '全球化品牌战略阶段',
    desc: '以质量为品牌起点，树立“真诚到永远”的全球化品牌价值主张。',
    focus: '品牌出海 · 质量基因',
    showcase: '砸冰箱事件、三包服务升级',
    category: 'brand'
  },
  {
    id: 'international',
    title: '国际化战略阶段',
    desc: '从走出去到融进去，打造跨文化的本地化组织与产品力。',
    focus: '本土研发 · 海外并购',
    showcase: '收购利勃海尔意大利工厂、海外设计中心',
    category: 'global'
  },
  {
    id: 'diversified',
    title: '多元化战略阶段',
    desc: '以用户需求为起点拓展多元产业，持续提升品牌黏性。',
    focus: '家电矩阵 · 服务延展',
    showcase: '热水器、空调等品类快速扩张',
    category: 'brand'
  },
  {
    id: 'core',
    title: '主业战略阶段',
    desc: '回归主航道，聚焦主业效率与全球竞争力。',
    focus: '流程再造 · 精益品质',
    showcase: 'OEC 管理、日清日高',
    category: 'global'
  },
  {
    id: 'network',
    title: '网络化战略阶段',
    desc: '以互联工厂和用户交互平台，构建网络化制造与服务。',
    focus: '用户零距离 · 互联工厂',
    showcase: 'COSMOPlat、用户交互中心',
    category: 'network'
  },
  {
    id: 'eco',
    title: '生态品牌战略阶段',
    desc: '以场景替代产品、生态替代产业，构建共赢共生的生态品牌。',
    focus: '场景品牌 · 生态引领',
    showcase: '智家场景、生态合作伙伴体系',
    category: 'eco'
  },
  {
    id: 'moon',
    title: '月印万川',
    desc: '以数字化、智能化为支点，连接无数“万川”用户与生态方。',
    focus: '数字孪生 · 生态连接',
    showcase: '数字展厅、iHaier 开放接口',
    category: 'eco'
  }
];

const roamNodes = Array.from(document.querySelectorAll('.roam__node'));
const roamCursor = document.getElementById('roamCursor');
const roamStatus = document.getElementById('roamStatus');
const playStop = document.getElementById('playStop');
let roamIndex = 0;

function renderMap() {
  const grid = document.getElementById('mapGrid');
  grid.innerHTML = '';
  mapData.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'map__card';
    card.innerHTML = `
      <div class="voice-pin" aria-hidden="true"></div>
      <p class="eyebrow">语音点 ${index + 1}</p>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    `;
    card.addEventListener('click', () => selectArea(item.id));
    grid.appendChild(card);
  });
}

function selectArea(id) {
  const detailTitle = document.getElementById('detailTitle');
  const detailDesc = document.getElementById('detailDesc');
  const detailFocus = document.getElementById('detailFocus');
  const detailCase = document.getElementById('detailCase');
  const cards = document.querySelectorAll('.map__card');

  cards.forEach((card, idx) => {
    const active = mapData[idx].id === id;
    card.classList.toggle('active', active);
  });

  const target = mapData.find((item) => item.id === id);
  if (!target) return;
  detailTitle.textContent = target.title;
  detailDesc.textContent = target.desc;
  detailFocus.textContent = target.focus;
  detailCase.textContent = target.showcase;
}

function renderAreas(filter = 'all') {
  const container = document.getElementById('areaCards');
  container.innerHTML = '';
  mapData
    .filter((item) => filter === 'all' || item.category === filter)
    .forEach((item) => {
      const card = document.createElement('article');
      card.className = 'area-card';
      card.innerHTML = `
        <p class="eyebrow">${item.title}</p>
        <h3>${item.desc}</h3>
        <div class="area-card__tags">
          <span>阶段定位：${item.focus}</span>
          <span>代表案例：${item.showcase}</span>
        </div>
      `;
      card.addEventListener('click', () => selectArea(item.id));
      container.appendChild(card);
    });
}

function bindFilters() {
  const chips = document.querySelectorAll('.chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      renderAreas(chip.dataset.filter);
    });
  });
}

function updateRoam(step) {
  roamIndex = Math.max(0, Math.min(step, roamNodes.length - 1));
  roamNodes.forEach((node, idx) => {
    node.classList.toggle('active', idx === roamIndex);
  });
  const percentage = 100 / roamNodes.length;
  roamCursor.style.transform = `translateX(${percentage * roamIndex}%)`;
  const current = mapData[roamIndex] || { title: '入口' };
  roamStatus.textContent = `当前站点：${current.title || '入口'} · 点击进入播放故事/案例`;
}

function bindRoam() {
  const roamTrack = document.getElementById('roamTrack');
  const handleKey = (event) => {
    if (event.key === 'ArrowRight') updateRoam(roamIndex + 1);
    if (event.key === 'ArrowLeft') updateRoam(roamIndex - 1);
  };
  window.addEventListener('keydown', handleKey);

  let touchStartX = null;
  roamTrack.addEventListener('touchstart', (e) => (touchStartX = e.changedTouches[0].clientX));
  roamTrack.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta > 40) updateRoam(roamIndex - 1);
    if (delta < -40) updateRoam(roamIndex + 1);
    touchStartX = null;
  });

  playStop.addEventListener('click', () => {
    const current = mapData[roamIndex] || { title: '入口' };
    roamStatus.textContent = `播放中：${current.title} 的动画与案例短片…`;
    playStop.textContent = '暂停播放';
    setTimeout(() => {
      playStop.textContent = '播放动画';
      roamStatus.textContent = `已准备播放：${current.title}`;
    }, 1800);
  });

  const startRoamBtn = document.getElementById('startRoam');
  if (startRoamBtn) {
    startRoamBtn.addEventListener('click', () => {
      document.getElementById('interactions').scrollIntoView({ behavior: 'smooth' });
      roamTrack.focus();
    });
  }
}

function bindHeroActions() {
  const exploreMap = document.getElementById('exploreMap');
  exploreMap.addEventListener('click', () => {
    document.getElementById('overview').scrollIntoView({ behavior: 'smooth' });
  });
}

function handleAssessment() {
  const form = document.getElementById('assessmentForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const focus = formData.get('focus');
    const style = formData.get('style');
    const value = formData.get('value');

    const title = `${focus} · ${style}`;
    const desc = `你的文化画像倾向于“${focus}”，擅长以“${style}”方式驱动，共创期望集中在“${value}”。推荐与 iHaier 接口绑定个人行为数据，形成持续沉淀。`;

    document.getElementById('profileTitle').textContent = title;
    document.getElementById('profileDesc').textContent = desc;

    const tags = [focus, style, value, 'iHaier 对接'];
    const tagContainer = document.getElementById('profileTags');
    tagContainer.innerHTML = '';
    tags.forEach((tag) => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tag;
      tagContainer.appendChild(span);
    });
  });
}

const cases = [
  { title: '砸冰箱：质量即品牌', tags: ['品牌', '质量', '品牌出海'], summary: '以零缺陷标准定义品牌承诺，形成全球化口碑。', category: 'brand' },
  { title: 'OEC 管理法', tags: ['主业', '流程', '效率'], summary: '日清日高，构建可复制的主业运营体系。', category: 'global' },
  { title: 'COSMOPlat 用户零距离', tags: ['网络', '互联工厂', '用户共创'], summary: '以用户需求驱动生产，提供定制化与共创体验。', category: 'network' },
  { title: '智家场景生态', tags: ['生态', '场景品牌', '开放连接'], summary: '以场景替代产品，打造生态品牌共赢模式。', category: 'eco' },
  { title: '月印万川数字孪生', tags: ['数字化', '未来', '生态'], summary: '用数字孪生连接用户与生态伙伴，沉淀数据资产。', category: 'eco' },
];

function renderCaseResults(keyword = '') {
  const results = document.getElementById('searchResults');
  results.innerHTML = '';
  const lower = keyword.toLowerCase();
  const filtered = cases.filter((item) =>
    item.title.toLowerCase().includes(lower) ||
    item.summary.toLowerCase().includes(lower) ||
    item.tags.some((tag) => tag.toLowerCase().includes(lower))
  );
  if (!filtered.length) {
    results.innerHTML = '<p class="muted">未找到匹配案例，请尝试新的关键词。</p>';
    return;
  }
  filtered.forEach((item) => {
    const el = document.createElement('div');
    el.className = 'result-item';
    el.innerHTML = `
      <h4>${item.title}</h4>
      <p>${item.summary}</p>
      <p class="area-card__tags">${item.tags.join(' · ')}</p>
    `;
    results.appendChild(el);
  });
}

function renderTagCloud() {
  const container = document.getElementById('tagCloud');
  const uniqueTags = Array.from(new Set(cases.flatMap((c) => c.tags)));
  uniqueTags.forEach((tag) => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    span.addEventListener('click', () => {
      document.getElementById('searchInput').value = tag;
      renderCaseResults(tag);
    });
    container.appendChild(span);
  });
}

function bindSearch() {
  const input = document.getElementById('searchInput');
  input.addEventListener('input', (event) => renderCaseResults(event.target.value));
}

function init() {
  renderMap();
  renderAreas();
  bindFilters();
  bindRoam();
  bindHeroActions();
  handleAssessment();
  renderCaseResults();
  renderTagCloud();
  bindSearch();
  updateRoam(0);
  selectArea(mapData[0].id);
}

document.addEventListener('DOMContentLoaded', init);
