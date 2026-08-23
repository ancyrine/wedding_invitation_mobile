const scrollButton = document.querySelector('.scroll-cue');
const greeting = document.querySelector('.greeting');
const copyButton = document.querySelector('.copy-button');
const toast = document.querySelector('.toast');
const countdown = document.querySelector('#countdown');
const calendarButton = document.querySelector('.calendar-button');
const shareButton = document.querySelector('.share-button');

scrollButton?.addEventListener('click', () => {
  greeting?.scrollIntoView({ behavior: 'smooth' });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const input = document.createElement('textarea');
    input.value = value;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
  }
}

copyButton?.addEventListener('click', async () => {
  await copyText(copyButton.dataset.copy);
  toast.textContent = '주소를 복사했어요!';
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 1800);
});

function renderCountdown() {
  const wedding = new Date('2026-11-21T10:30:00+09:00');
  const now = new Date();
  const days = Math.ceil((wedding - now) / 86400000);

  if (days > 0) countdown.textContent = `우리의 결혼식까지 D-${days}`;
  else if (days === 0) countdown.textContent = '오늘, 저희 결혼합니다!';
  else countdown.textContent = '함께해 주셔서 감사합니다.';
}

renderCountdown();

calendarButton?.addEventListener('click', () => {
  const calendar = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Juhyeon & Soyeon//Wedding//KO',
    'BEGIN:VEVENT',
    'UID:wedding-20261121-juhyeon-soyeon',
    'DTSTAMP:20260823T113000Z',
    'DTSTART;TZID=Asia/Seoul:20261121T103000',
    'DTEND;TZID=Asia/Seoul:20261121T123000',
    'SUMMARY:박주현 ♥ 김소연 결혼식',
    'LOCATION:오드힐하우스\\, 서울 서초구 방배로 47',
    'DESCRIPTION:박주현과 김소연의 결혼식에 초대합니다.',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([calendar], { type: 'text/calendar;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = '박주현-김소연-결혼식.ics';
  anchor.click();
  URL.revokeObjectURL(url);
});

shareButton?.addEventListener('click', async () => {
  const shareUrl = window.parent !== window ? window.parent.location.href : window.location.href;
  const data = {
    title: '박주현 · 김소연의 결혼식',
    text: '2026년 11월 21일 토요일 오전 10시 30분, 오드힐하우스',
    url: shareUrl
  };

  try {
    if (navigator.share) await navigator.share(data);
    else {
      await copyText(shareUrl);
      toast.textContent = '청첩장 링크를 복사했어요!';
      toast.classList.add('show');
      window.setTimeout(() => toast.classList.remove('show'), 1800);
    }
  } catch (error) {
    if (error.name !== 'AbortError') console.error(error);
  }
});
