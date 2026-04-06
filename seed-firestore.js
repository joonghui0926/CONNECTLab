// data.js 내용과 public/assets/ 이미지를 Firebase에 올리는 스크립트
// 사용: npm run seed

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  HOME_DATA,
  PROFESSOR_DATA,
  STUDENTS_DATA,
  RESEARCH_DATA,
  PUBLICATIONS_DATA,
  TEACHING_DATA,
  PROJECTS_DATA,
} from './src/constants/data.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const firebaseConfig = {
  apiKey: "AIzaSyCimcn_AIdabTPHPf8Z0-xMPHIJumpbxPk",
  authDomain: "connectlabkaist.firebaseapp.com",
  projectId: "connectlabkaist",
  storageBucket: "connectlabkaist.firebasestorage.app",
  messagingSenderId: "756631164879",
  appId: "1:756631164379:web:331c22f112f74a4991a4ba"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

const EMAIL = 'professor@connectlab.kaist.ac.kr';
const PASSWORD = 'connectlab';

async function uploadImages() {
  const assetsDir = path.join(__dirname, 'public', 'assets');
  const urlMap = {};

  let files;
  try {
    files = readdirSync(assetsDir);
  } catch {
    console.log('public/assets 디렉토리가 없습니다. 이미지 업로드 건너뜁니다.');
    return urlMap;
  }

  for (const filename of files) {
    if (!/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(filename)) continue;
    const localPath = path.join(assetsDir, filename);
    const fileBuffer = readFileSync(localPath);
    const fileRef = ref(storage, `assets/${filename}`);

    try {
      await uploadBytes(fileRef, fileBuffer);
      const url = await getDownloadURL(fileRef);
      urlMap[`/assets/${filename}`] = url;
      console.log(`  ✓ ${filename} → Storage 업로드 완료`);
    } catch (err) {
      console.warn(`  ✗ ${filename} 업로드 실패: ${err.message}`);
    }
  }

  return urlMap;
}

function replaceImagePaths(data, urlMap) {
  const str = JSON.stringify(data);
  const replaced = str.replace(/\/assets\/[^"]+/g, (match) => urlMap[match] || match);
  return JSON.parse(replaced);
}

async function main() {
  console.log('seed 시작...\n');

  console.log('로그인 중...');
  await signInWithEmailAndPassword(auth, EMAIL, PASSWORD);
  console.log('완료\n');

  console.log('이미지 업로드 중...');
  const urlMap = await uploadImages();
  const imageCount = Object.keys(urlMap).length;
  console.log(`${imageCount}개 완료\n`);

  console.log('Firestore 저장 중...');
  const rawData = { HOME_DATA, PROFESSOR_DATA, STUDENTS_DATA, RESEARCH_DATA, PUBLICATIONS_DATA, TEACHING_DATA, PROJECTS_DATA };
  const finalData = imageCount > 0 ? replaceImagePaths(rawData, urlMap) : rawData;

  await setDoc(doc(db, 'data', 'content'), finalData);
  console.log('   Firestore 저장 완료\n');

  console.log('✅ 완료! 사이트가 Firestore 데이터를 사용합니다.');
  process.exit(0);
}

main().catch(err => {
  console.error('오류 발생:', err.message);
  process.exit(1);
});
