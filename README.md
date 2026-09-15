# 박주현 · 김소연 모바일 청첩장

`index.html`을 브라우저에서 열면 바로 확인할 수 있는 정적 웹사이트입니다.

## 사진 넣는 위치

사진은 모두 프로젝트의 `images` 폴더에 넣습니다. 파일명만 아래와 정확히 맞추면 페이지에 자동으로 표시됩니다.

페이지에 사용하는 사진은 모바일 로딩을 위해 긴 변 1800px 이하로 저장합니다. 고해상도 원본은 Git에 포함되지 않는 `photo-originals` 폴더에 보관합니다.

- 메인 사진: `images/hero-main.jpg` (세로 4:5 권장)
- 신랑 어린 시절 사진: `images/groom-childhood.png`
- 신부 어린 시절 사진: `images/bride-childhood.png`
- 오드힐하우스 스케치: `images/odehill-sketch.png`
- 갤러리 좌우 화살표: `images/gallery-arrow.png`
- 갤러리 닫기 아이콘: `images/gallery-close.png`
- 갤러리 사진: `images/gallery-01.jpg`부터 `images/gallery-18.jpg`까지

갤러리는 18장을 한 줄에 세 장씩 정사각형으로 보여 줍니다. 파일이 없으면 해당 위치에 파일명 안내 카드가 표시됩니다.

## 계좌번호 넣기

`index.html`의 `account-info` 두 곳에서 안내 문구를 실제 은행·계좌번호·예금주로 바꾸고, 같은 카드의 `data-copy=""`에 복사할 계좌번호를 입력한 뒤 `disabled`를 삭제합니다.

현재 첨부된 종이 청첩장의 어린 시절 사진은 사용하지 않았습니다.

## 로컬 미리보기

```bash
python3 -m http.server 4173
```

브라우저에서 `http://localhost:4173`을 엽니다.

## 종이 청첩장 QR

- 연결 주소: `https://ancyrine.github.io/wedding_invitation_mobile/`
- 인쇄용 벡터: `print/qr-wedding.svg`
- 고해상도 이미지: `print/qr-wedding.png` (1176 × 1176px)
- 권장 인쇄 크기: 최소 20 × 20mm, 검정색과 흰색 유지
- QR 바깥의 흰 여백을 자르지 않습니다.
