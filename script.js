// 시계
const clock = document.getElementById('clock');
const tick = () => clock.textContent = new Date().toLocaleString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short', hour: '2-digit', minute: '2-digit' });
tick(); setInterval(tick, 30000);

// 날씨 (Open-Meteo, API 키 불필요)
const cities = { seoul: [37.5665, 126.9780], jeju: [33.4996, 126.5312] };
const codeMap = c =>
  c === 0 ? ['☀️', '맑음'] :
  c <= 2 ? ['🌤️', '구름 조금'] :
  c === 3 ? ['☁️', '흐림'] :
  c <= 48 ? ['🌫️', '안개'] :
  c <= 57 ? ['🌦️', '이슬비'] :
  c <= 67 ? ['🌧️', '비'] :
  c <= 77 ? ['❄️', '눈'] :
  c <= 82 ? ['🌧️', '소나기'] :
  c <= 86 ? ['🌨️', '눈소나기'] : ['⛈️', '뇌우'];

for (const [id, [lat, lon]] of Object.entries(cities)) {
  const el = document.getElementById(id);
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSeoul&forecast_days=1`)
    .then(r => r.json())
    .then(d => {
      const [icon, desc] = codeMap(d.current.weather_code);
      el.querySelector('.icon').textContent = icon;
      el.querySelector('.temp').textContent = Math.round(d.current.temperature_2m) + '°';
      el.querySelector('.desc').textContent =
        `${desc} · ${Math.round(d.daily.temperature_2m_max[0])}° / ${Math.round(d.daily.temperature_2m_min[0])}°`;
    })
    .catch(() => {
      el.querySelector('.icon').textContent = '⚠️';
      el.querySelector('.desc').textContent = '불러오지 못했습니다';
    });
}

// 명언
const quotes = [
  ['천 리 길도 한 걸음부터.', '노자'],
  ['아는 것을 안다 하고, 모르는 것을 모른다 하는 것이 아는 것이다.', '공자'],
  ['너 자신을 알라.', '소크라테스'],
  ['나는 생각한다, 고로 존재한다.', '데카르트'],
  ['배우고 때때로 익히면 또한 기쁘지 아니한가.', '공자'],
  ['상상력은 지식보다 중요하다.', '아인슈타인'],
  ['행복은 스스로 만족하는 사람의 것이다.', '아리스토텔레스'],
  ['오늘 할 수 있는 일을 내일로 미루지 마라.', '벤저민 프랭클린'],
  ['인생은 가까이서 보면 비극이지만 멀리서 보면 희극이다.', '찰리 채플린'],
  ['실패는 성공의 어머니이다.', '토머스 에디슨'],
  ['나를 죽이지 못하는 것은 나를 더 강하게 만든다.', '니체'],
  ['늦었다고 생각할 때가 가장 빠른 때이다.', '속담']
];
const qEl = document.getElementById('quote');
let last = -1;
const showQuote = () => {
  let i; do { i = Math.floor(Math.random() * quotes.length); } while (i === last);
  last = i;
  qEl.innerHTML = `“${quotes[i][0]}”<span class="who">— ${quotes[i][1]}</span>`;
};
qEl.onclick = showQuote;
showQuote();
