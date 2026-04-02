# CONNECT Lab 웹사이트

KAIST CONNECT Lab 공식 홈페이지. React + Vite + Tailwind CSS로 제작.

## 개발 및 배포

```bash
npm run dev      # 로컬 개발 서버 실행 (http://localhost:5173)
npm run build    # 배포용 빌드 → dist/ 폴더에 생성됨
npm run preview  # 빌드 결과 미리보기
```

> 수정 후에는 반드시 `npm run build`를 실행해야 서버에 반영됩니다.

---

## 폴더 구조

```
connect-lab/
├── public/
│   └── assets/          ← 이미지 파일 (교수님 사진, 연구 이미지, 학생 사진)
│
├── src/
│   ├── constants/
│   │   └── data.js      ← ★ 콘텐츠 수정은 여기서 (뉴스, 논문, 연구 주제 등)
│   │
│   ├── pages/           ← 각 페이지 UI
│   │   ├── Home.jsx
│   │   ├── Professor.jsx
│   │   ├── Students.jsx
│   │   ├── Research.jsx
│   │   ├── Publications.jsx
│   │   ├── Teaching.jsx
│   │   └── Projects.jsx
│   │
│   ├── components/
│   │   ├── Layout.jsx   ← 헤더(네비게이션), 푸터, 검색 기능
│   │   └── Hero3D.jsx   ← 홈 배경 3D 파티클 애니메이션
│   │
│   ├── App.jsx          ← 라우팅 설정
│   ├── index.css        ← 전역 스타일 (색상 변수 등)
│   └── main.jsx         ← 앱 진입점
│
├── index.html
├── tailwind.config.js   ← Tailwind 색상/폰트 커스텀 설정
└── vite.config.js
```

---

## 자주 수정하는 것들

### 텍스트/데이터 수정 → `src/constants/data.js`

| 항목 | 변수명 |
|------|--------|
| 홈 공지사항, 뉴스 | `HOME_DATA` |
| 교수님 프로필, 약력 | `PROFESSOR_DATA` |
| 대학원생 모집 공고, 구성원 | `STUDENTS_DATA` |
| 연구 주제 카드 | `RESEARCH_DATA` |
| 논문 목록 (저널/학회) | `PUBLICATIONS_DATA` |
| 강의 이력 | `TEACHING_DATA` |
| 연구비 과제 | `PROJECTS_DATA` |

### 이미지 교체 → `public/assets/`

- 교수님 사진: `professor.jpg`
- 연구 이미지: `research1.png` ~ `research9.png`
- 학생 사진: `이름.jpg` (data.js의 `image` 경로와 일치해야 함)

### 페이지 레이아웃/디자인 수정 → `src/pages/` 또는 `src/components/`

- 특정 페이지 레이아웃은 해당 `pages/*.jsx` 파일
- 헤더, 푸터, 네비게이션은 `components/Layout.jsx`
- 색상이나 폰트 전역 설정은 `src/index.css` 또는 `tailwind.config.js`
