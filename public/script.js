const copyButton = document.querySelector('.copy-button');
const toast = document.querySelector('.toast');
const countdown = document.querySelector('#countdown');
const shareButton = document.querySelector('.share-button');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');
const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
const lightboxNext = lightbox?.querySelector('.lightbox-next');
const galleryItems = [...document.querySelectorAll('.gallery-item')];
let currentGalleryIndex = 0;

document.querySelectorAll('img[data-placeholder]').forEach((image) => {
  const markMissing = () => image.classList.add('is-missing');
  image.addEventListener('error', markMissing);
  if (image.complete && image.naturalWidth === 0) markMissing();
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

function closeLightbox() {
  lightbox?.classList.remove('open');
  lightbox?.setAttribute('aria-hidden', 'true');
}

function showGalleryImage(index) {
  const availableItems = galleryItems.filter((item) => {
    const image = item.querySelector('img');
    return image && !image.classList.contains('is-missing');
  });
  if (!availableItems.length) return;

  currentGalleryIndex = (index + availableItems.length) % availableItems.length;
  const image = availableItems[currentGalleryIndex].querySelector('img');
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
}

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const image = item.querySelector('img');
    if (!image || image.classList.contains('is-missing')) return;
    const availableItems = galleryItems.filter((galleryItem) => {
      const galleryImage = galleryItem.querySelector('img');
      return galleryImage && !galleryImage.classList.contains('is-missing');
    });
    showGalleryImage(availableItems.indexOf(item));
    lightbox?.classList.add('open');
    lightbox?.setAttribute('aria-hidden', 'false');
    lightboxClose?.focus();
  });
});

lightboxPrev?.addEventListener('click', () => showGalleryImage(currentGalleryIndex - 1));
lightboxNext?.addEventListener('click', () => showGalleryImage(currentGalleryIndex + 1));
lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
  if (!lightbox?.classList.contains('open')) return;
  if (event.key === 'ArrowLeft') showGalleryImage(currentGalleryIndex - 1);
  if (event.key === 'ArrowRight') showGalleryImage(currentGalleryIndex + 1);
});

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

document.querySelectorAll('.account-copy').forEach((button) => {
  button.addEventListener('click', async () => {
    if (!button.dataset.copy) return;
    await copyText(button.dataset.copy);
    toast.textContent = '계좌번호를 복사했어요!';
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 1800);
  });
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
