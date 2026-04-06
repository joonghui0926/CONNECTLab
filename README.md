# CONNECT Lab 웹사이트

KAIST CONNECT Lab 공식 홈페이지. React + Vite + Tailwind CSS + Firebase로 제작.

## 개발 및 배포

```bash
npm run dev      # 로컬 개발 서버 실행 (http://localhost:5173)
npm run build    # 배포용 빌드 → dist/ 폴더에 생성됨
npm run seed     # data.js + 로컬 이미지 → Firebase에 일괄 업로드
```

배포는 Firebase Hosting 사용:

```bash
npm run build
firebase deploy
```

---

## 폴더 구조

```
connect-lab/
├── public/
│   └── assets/              ← 로컬 이미지 (seed 실행 시 Firebase Storage로 업로드됨)
│
├── src/
│   ├── firebase.js          ← Firebase 초기화 (Firestore, Storage, Auth)
│   │
│   ├── constants/
│   │   └── data.js          ← 기본 콘텐츠 데이터 (Firestore에 없을 때 fallback)
│   │
│   ├── contexts/
│   │   └── DataContext.jsx  ← Firestore 실시간 데이터 구독 (onSnapshot)
│   │
│   ├── pages/               ← 각 페이지 UI
│   │   ├── Home.jsx
│   │   ├── Professor.jsx
│   │   ├── Students.jsx
│   │   ├── Research.jsx
│   │   ├── Publications.jsx
│   │   ├── Teaching.jsx
│   │   └── Projects.jsx
│   │
│   ├── components/
│   │   ├── Layout.jsx       ← 헤더, 푸터, 검색, 테마 토글
│   │   ├── AdminPanel.jsx   ← 관리자 편집 패널
│   │   └── Hero3D.jsx       ← 홈 배경 3D 파티클 애니메이션
│   │
│   ├── App.jsx              ← 라우팅 설정
│   ├── index.css            ← 전역 스타일 (다크/라이트 모드 색상 변수)
│   └── main.jsx             ← 앱 진입점
│
├── seed-firestore.js        ← Firebase seed 스크립트
├── index.html
├── tailwind.config.js
└── vite.config.js
```

---

## 콘텐츠 수정 방법

### 방법 1: 관리자 패널 (권장)

사이트 우측 하단 **Admin** 버튼 → 로그인 후 바로 수정.
저장하면 Firestore에 즉시 반영되고, 모든 접속자 화면에 실시간으로 업데이트됨.

- 수정 가능 항목: Home, Professor, Students, Research, Publications, Teaching, Projects
- 이미지 업로드 시 Firebase Storage에 자동 저장됨
- 로그인 계정은 Firebase Authentication에서 관리

### 방법 2: data.js 직접 수정 후 seed

`src/constants/data.js`를 직접 편집한 후:

```bash
npm run seed     # 변경 내용을 Firestore에 반영 (이미지도 Storage에 업로드)
npm run build    # 코드 변경이 있을 경우 빌드
firebase deploy  # 배포
```

| 항목 | 변수명 |
|------|--------|
| 홈 공지사항, 뉴스 | `HOME_DATA` |
| 교수님 프로필, 약력 | `PROFESSOR_DATA` |
| 대학원생 모집 공고, 구성원 | `STUDENTS_DATA` |
| 연구 주제 카드 | `RESEARCH_DATA` |
| 논문 목록 (저널/학회/프리프린트) | `PUBLICATIONS_DATA` |
| 강의 이력 | `TEACHING_DATA` |
| 연구비 과제 | `PROJECTS_DATA` |

---

## 페이지 레이아웃/디자인 수정

코드를 직접 수정한 경우 빌드 후 배포 필요:

```bash
npm run build && firebase deploy
```

- 특정 페이지 레이아웃 → `src/pages/*.jsx`
- 헤더, 푸터, 네비게이션 → `src/components/Layout.jsx`
- 색상/폰트 전역 설정 → `src/index.css` 또는 `tailwind.config.js`

---

## Firebase 구성

| 서비스 | 용도 |
|--------|------|
| Firestore | 콘텐츠 데이터 저장 (`data/content` 문서) |
| Storage | 이미지 파일 저장 (`assets/` 폴더) |
| Authentication | 관리자 로그인 (Email/Password) |
| Hosting | 정적 사이트 배포 |
