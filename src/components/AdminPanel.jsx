import { useState, useEffect, useRef } from 'react';
import { X, Plus, Pencil, Trash2, Check, ChevronDown, ChevronUp, LogOut, Upload } from 'lucide-react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { useData } from '../contexts/DataContext';

// 공통 UI

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-[11px] text-gray-500 uppercase tracking-widest">{label}</label>}
    {children}
  </div>
);

const Input = ({ label, ...props }) => (
  <Field label={label}>
    <input
      className="bg-[#1c1c1c] border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-accent/60 w-full placeholder:text-gray-600"
      {...props}
    />
  </Field>
);

const Textarea = ({ label, rows = 4, ...props }) => (
  <Field label={label}>
    <textarea
      rows={rows}
      className="bg-[#1c1c1c] border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-accent/60 w-full resize-y placeholder:text-gray-600"
      {...props}
    />
  </Field>
);

const Btn = ({ children, onClick, variant = 'default', small, type = 'button' }) => {
  const base = 'inline-flex items-center gap-1 rounded font-medium transition-colors cursor-pointer border-0';
  const size = small ? 'px-2.5 py-1 text-xs' : 'px-4 py-2 text-sm';
  const variants = {
    default: 'bg-white/10 hover:bg-white/20 text-white',
    accent:  'bg-accent hover:bg-amber-300 text-black',
    danger:  'bg-red-950/60 hover:bg-red-900/80 text-red-400',
  };
  return (
    <button type={type} onClick={onClick} className={`${base} ${size} ${variants[variant]}`}>
      {children}
    </button>
  );
};

// 이미지 업로드 (Firebase Storage)
function ImageField({ value, onChange }) {
  const inputRef = useRef();
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.substring(file.name.lastIndexOf('.'));
      const fileRef = storageRef(storage, `assets/${Date.now()}${ext}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      onChange(url);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Field label="이미지">
      <div className="flex items-start gap-3">
        {value && (
          <img src={value} alt="" className="w-14 h-14 object-cover rounded border border-white/10 shrink-0" />
        )}
        <div className="flex flex-col gap-1.5 flex-1">
          <button
            type="button"
            onClick={() => inputRef.current.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
          >
            <Upload size={11} />
            {uploading ? '업로드 중...' : '파일 선택'}
          </button>
          <input
            className="bg-[#1c1c1c] border border-white/10 rounded px-2 py-1 text-xs text-gray-400 outline-none w-full"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            placeholder="https://... 또는 파일 선택"
          />
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>
      </div>
    </Field>
  );
}

// 수정/삭제 버튼 달린 아이템 카드
function ItemCard({ summary, editing, onEdit, onDelete, children }) {
  return (
    <div className={`border rounded-sm overflow-hidden transition-colors ${editing ? 'border-accent/40' : 'border-white/8'}`}>
      {editing ? (
        <div className="p-4 space-y-3 bg-[#111]">{children}</div>
      ) : (
        <div className="flex items-center justify-between px-4 py-3 hover:bg-white/[0.02]">
          <span className="text-sm text-gray-400 truncate mr-4 leading-snug">{summary}</span>
          <div className="flex gap-1.5 shrink-0">
            <Btn small onClick={onEdit}><Pencil size={11} />수정</Btn>
            <Btn small variant="danger" onClick={onDelete}><Trash2 size={11} />삭제</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

const SectionTitle = ({ children }) => (
  <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4 pb-3 border-b border-white/10">{children}</h3>
);

// 섹션 에디터들

// Home
function HomeEditor({ draft, setDraft }) {
  const [editAnn, setEditAnn] = useState(false);
  const [ann, setAnn] = useState({});
  const [editNewsIdx, setEditNewsIdx] = useState(null);
  const [editNews, setEditNews] = useState({});

  const ann0 = draft.HOME_DATA.announcement;
  const news = draft.HOME_DATA.news;

  const saveAnn = () => {
    setDraft(d => ({ ...d, HOME_DATA: { ...d.HOME_DATA, announcement: ann } }));
    setEditAnn(false);
  };

  const addNews = () => { setEditNews({ date: '', text: '' }); setEditNewsIdx('new'); };
  const saveNews = () => {
    const list = [...news];
    if (editNewsIdx === 'new') list.unshift(editNews);
    else list[editNewsIdx] = editNews;
    setDraft(d => ({ ...d, HOME_DATA: { ...d.HOME_DATA, news: list } }));
    setEditNewsIdx(null);
  };
  const delNews = (i) => setDraft(d => ({ ...d, HOME_DATA: { ...d.HOME_DATA, news: news.filter((_, idx) => idx !== i) } }));

  return (
    <div className="space-y-10">
      {/* Announcement */}
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest">공지사항 (Announcement)</h3>
          {!editAnn && <Btn small onClick={() => { setAnn({ ...ann0 }); setEditAnn(true); }}><Pencil size={11} />수정</Btn>}
        </div>
        {editAnn ? (
          <div className="space-y-3 border border-accent/40 rounded-sm p-4 bg-[#111]">
            <Input label="제목" value={ann.title || ''} onChange={e => setAnn(a => ({ ...a, title: e.target.value }))} />
            <Input label="부제목 (예: Opening 2026)" value={ann.subtitle || ''} onChange={e => setAnn(a => ({ ...a, subtitle: e.target.value }))} />
            <Textarea label="본문" rows={5} value={ann.content || ''} onChange={e => setAnn(a => ({ ...a, content: e.target.value }))} />
            <div className="flex gap-2">
              <Btn variant="accent" onClick={saveAnn}><Check size={12} />저장</Btn>
              <Btn onClick={() => setEditAnn(false)}>취소</Btn>
            </div>
          </div>
        ) : (
          <div className="bg-[#161616] rounded-sm p-4 text-sm text-gray-500 space-y-1">
            <p><span className="text-gray-600">제목:</span> {ann0.title}</p>
            <p><span className="text-gray-600">내용:</span> {ann0.content?.substring(0, 80)}...</p>
          </div>
        )}
      </div>

      {/* News */}
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest">뉴스</h3>
          <Btn small variant="accent" onClick={addNews}><Plus size={11} />뉴스 추가</Btn>
        </div>

        {editNewsIdx === 'new' && (
          <div className="border border-accent/40 rounded-sm p-4 space-y-3 mb-3 bg-[#111]">
            <Input label="날짜 (예: 01/2026)" value={editNews.date} onChange={e => setEditNews(n => ({ ...n, date: e.target.value }))} />
            <Textarea label="내용" rows={2} value={editNews.text} onChange={e => setEditNews(n => ({ ...n, text: e.target.value }))} />
            <div className="flex gap-2">
              <Btn variant="accent" onClick={saveNews}><Check size={12} />추가</Btn>
              <Btn onClick={() => setEditNewsIdx(null)}>취소</Btn>
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          {news.map((item, i) => (
            <ItemCard
              key={i}
              summary={`[${item.date}] ${item.text.substring(0, 70)}`}
              editing={editNewsIdx === i}
              onEdit={() => { setEditNews({ ...item }); setEditNewsIdx(i); }}
              onDelete={() => delNews(i)}
            >
              <Input label="날짜" value={editNews.date} onChange={e => setEditNews(n => ({ ...n, date: e.target.value }))} />
              <Textarea label="내용" rows={2} value={editNews.text} onChange={e => setEditNews(n => ({ ...n, text: e.target.value }))} />
              <div className="flex gap-2">
                <Btn variant="accent" onClick={saveNews}><Check size={12} />저장</Btn>
                <Btn onClick={() => setEditNewsIdx(null)}>취소</Btn>
              </div>
            </ItemCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// Students
function StudentsEditor({ draft, setDraft }) {
  const [editIdx, setEditIdx] = useState(null);
  const [editMember, setEditMember] = useState({});
  const members = draft.STUDENTS_DATA.members;
  const EMPTY = { name: '', group: '', image: '', interests: '', publications: null };

  const save = () => {
    const list = [...members];
    if (editIdx === 'new') list.push(editMember);
    else list[editIdx] = editMember;
    setDraft(d => ({ ...d, STUDENTS_DATA: { ...d.STUDENTS_DATA, members: list } }));
    setEditIdx(null);
  };
  const del = (i) => setDraft(d => ({ ...d, STUDENTS_DATA: { ...d.STUDENTS_DATA, members: members.filter((_, idx) => idx !== i) } }));

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white uppercase tracking-widest">구성원 (Members)</h3>
        <Btn small variant="accent" onClick={() => { setEditMember({ ...EMPTY }); setEditIdx('new'); }}>
          <Plus size={11} />구성원 추가
        </Btn>
      </div>

      {editIdx === 'new' && (
        <div className="border border-accent/40 rounded-sm p-4 space-y-3 mb-3 bg-[#111]">
          <Input label="이름" value={editMember.name} onChange={e => setEditMember(m => ({ ...m, name: e.target.value }))} />
          <Input label="그룹 (예: Ph.D. Student, Alumni (홍익대학교))" value={editMember.group} onChange={e => setEditMember(m => ({ ...m, group: e.target.value }))} />
          <ImageField value={editMember.image} onChange={v => setEditMember(m => ({ ...m, image: v }))} />
          <Input label="연구 관심사" value={editMember.interests} onChange={e => setEditMember(m => ({ ...m, interests: e.target.value }))} />
          <Textarea label="논문 (선택, 없으면 비워두기)" rows={2} value={editMember.publications || ''} onChange={e => setEditMember(m => ({ ...m, publications: e.target.value || null }))} />
          <div className="flex gap-2">
            <Btn variant="accent" onClick={save}><Check size={12} />추가</Btn>
            <Btn onClick={() => setEditIdx(null)}>취소</Btn>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        {members.map((m, i) => (
          <ItemCard
            key={i}
            summary={`${m.name} — ${m.group}`}
            editing={editIdx === i}
            onEdit={() => { setEditMember({ ...m }); setEditIdx(i); }}
            onDelete={() => del(i)}
          >
            <Input label="이름" value={editMember.name} onChange={e => setEditMember(x => ({ ...x, name: e.target.value }))} />
            <Input label="그룹" value={editMember.group} onChange={e => setEditMember(x => ({ ...x, group: e.target.value }))} />
            <ImageField value={editMember.image} onChange={v => setEditMember(x => ({ ...x, image: v }))} />
            <Input label="연구 관심사" value={editMember.interests} onChange={e => setEditMember(x => ({ ...x, interests: e.target.value }))} />
            <Textarea label="논문 (선택)" rows={2} value={editMember.publications || ''} onChange={e => setEditMember(x => ({ ...x, publications: e.target.value || null }))} />
            <div className="flex gap-2">
              <Btn variant="accent" onClick={save}><Check size={12} />저장</Btn>
              <Btn onClick={() => setEditIdx(null)}>취소</Btn>
            </div>
          </ItemCard>
        ))}
      </div>
    </div>
  );
}

// Research
function ResearchEditor({ draft, setDraft }) {
  const [editIdx, setEditIdx] = useState(null);
  const [editCard, setEditCard] = useState({});
  const list = draft.RESEARCH_DATA;
  const EMPTY = { title: '', image: '', description: '' };

  const save = () => {
    const next = [...list];
    if (editIdx === 'new') next.push(editCard);
    else next[editIdx] = editCard;
    setDraft(d => ({ ...d, RESEARCH_DATA: next }));
    setEditIdx(null);
  };
  const del = (i) => setDraft(d => ({ ...d, RESEARCH_DATA: list.filter((_, idx) => idx !== i) }));

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white uppercase tracking-widest">연구 주제 카드</h3>
        <Btn small variant="accent" onClick={() => { setEditCard({ ...EMPTY }); setEditIdx('new'); }}>
          <Plus size={11} />카드 추가
        </Btn>
      </div>

      {editIdx === 'new' && (
        <div className="border border-accent/40 rounded-sm p-4 space-y-3 mb-3 bg-[#111]">
          <Input label="제목" value={editCard.title} onChange={e => setEditCard(c => ({ ...c, title: e.target.value }))} />
          <ImageField value={editCard.image} onChange={v => setEditCard(c => ({ ...c, image: v }))} />
          <Textarea label="설명" rows={6} value={editCard.description} onChange={e => setEditCard(c => ({ ...c, description: e.target.value }))} />
          <div className="flex gap-2">
            <Btn variant="accent" onClick={save}><Check size={12} />추가</Btn>
            <Btn onClick={() => setEditIdx(null)}>취소</Btn>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        {list.map((card, i) => (
          <ItemCard
            key={i}
            summary={card.title}
            editing={editIdx === i}
            onEdit={() => { setEditCard({ ...card }); setEditIdx(i); }}
            onDelete={() => del(i)}
          >
            <Input label="제목" value={editCard.title} onChange={e => setEditCard(c => ({ ...c, title: e.target.value }))} />
            <ImageField value={editCard.image} onChange={v => setEditCard(c => ({ ...c, image: v }))} />
            <Textarea label="설명" rows={6} value={editCard.description} onChange={e => setEditCard(c => ({ ...c, description: e.target.value }))} />
            <div className="flex gap-2">
              <Btn variant="accent" onClick={save}><Check size={12} />저장</Btn>
              <Btn onClick={() => setEditIdx(null)}>취소</Btn>
            </div>
          </ItemCard>
        ))}
      </div>
    </div>
  );
}

// Publications
function PubList({ title, items, onChange, ieeeLink }) {
  const [editIdx, setEditIdx] = useState(null);
  const [editItem, setEditItem] = useState({});
  const EMPTY = { text: '', url: '' };

  const save = () => {
    const next = [...items];
    const saved = { ...editItem, url: editItem.url || ieeeLink };
    if (editIdx === 'new') next.push(saved);
    else next[editIdx] = saved;
    onChange(next);
    setEditIdx(null);
  };
  const del = (i) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{title}</h4>
        <Btn small variant="accent" onClick={() => { setEditItem({ ...EMPTY }); setEditIdx('new'); }}>
          <Plus size={11} />추가
        </Btn>
      </div>

      {editIdx === 'new' && (
        <div className="border border-accent/40 rounded-sm p-4 space-y-3 mb-2 bg-[#111]">
          <Textarea label="논문 정보 (인용 형식)" rows={3} value={editItem.text} onChange={e => setEditItem(p => ({ ...p, text: e.target.value }))} />
          <Input
            label="링크 URL (비워두면 IEEE 교수님 페이지로 연결)"
            value={editItem.url}
            onChange={e => setEditItem(p => ({ ...p, url: e.target.value }))}
            placeholder={ieeeLink}
          />
          <div className="flex gap-2">
            <Btn variant="accent" onClick={save}><Check size={12} />추가</Btn>
            <Btn onClick={() => setEditIdx(null)}>취소</Btn>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        {items.map((item, i) => (
          <ItemCard
            key={i}
            summary={(item.text || '').substring(0, 90) + '...'}
            editing={editIdx === i}
            onEdit={() => { setEditItem({ ...item }); setEditIdx(i); }}
            onDelete={() => del(i)}
          >
            <Textarea label="논문 정보 (인용 형식)" rows={3} value={editItem.text} onChange={e => setEditItem(p => ({ ...p, text: e.target.value }))} />
            <Input
              label="링크 URL (비워두면 IEEE 교수님 페이지로 연결)"
              value={editItem.url}
              onChange={e => setEditItem(p => ({ ...p, url: e.target.value }))}
              placeholder={ieeeLink}
            />
            <div className="flex gap-2">
              <Btn variant="accent" onClick={save}><Check size={12} />저장</Btn>
              <Btn onClick={() => setEditIdx(null)}>취소</Btn>
            </div>
          </ItemCard>
        ))}
      </div>
    </div>
  );
}

function PublicationsEditor({ draft, setDraft }) {
  const pub = draft.PUBLICATIONS_DATA;
  const upd = (key, val) => setDraft(d => ({ ...d, PUBLICATIONS_DATA: { ...d.PUBLICATIONS_DATA, [key]: val } }));

  return (
    <div>
      <div className="mb-6 pb-3 border-b border-white/10">
        <Input
          label="IEEE Author Page 기본 링크 (논문 URL 미입력 시 사용)"
          value={pub.ieeeLink}
          onChange={e => upd('ieeeLink', e.target.value)}
        />
      </div>
      <PubList title="Preprints" items={pub.preprints} onChange={v => upd('preprints', v)} ieeeLink={pub.ieeeLink} />
      <PubList title="Journal Papers" items={pub.journals} onChange={v => upd('journals', v)} ieeeLink={pub.ieeeLink} />
      <PubList title="Conference Papers" items={pub.conferences} onChange={v => upd('conferences', v)} ieeeLink={pub.ieeeLink} />
    </div>
  );
}

// Teaching
function TeachingEditor({ draft, setDraft }) {
  const [editSchoolIdx, setEditSchoolIdx] = useState(null);
  const [editSchool, setEditSchool] = useState({});
  const [expandedSchool, setExpandedSchool] = useState(null);
  const [editCourseIdx, setEditCourseIdx] = useState(null);
  const [editCourse, setEditCourse] = useState({});

  const schools = draft.TEACHING_DATA;
  const EMPTY_SCHOOL = { university: '', period: '', courses: [] };
  const EMPTY_COURSE = { name: '', term: '', level: '' };

  const saveSchool = () => {
    const next = [...schools];
    if (editSchoolIdx === 'new') next.push(editSchool);
    else next[editSchoolIdx] = { ...next[editSchoolIdx], university: editSchool.university, period: editSchool.period };
    setDraft(d => ({ ...d, TEACHING_DATA: next }));
    setEditSchoolIdx(null);
  };
  const delSchool = (i) => setDraft(d => ({ ...d, TEACHING_DATA: schools.filter((_, idx) => idx !== i) }));

  const saveCourse = (si) => {
    const next = JSON.parse(JSON.stringify(schools));
    const courses = [...(next[si].courses || [])];
    if (editCourseIdx === 'new') courses.push(editCourse);
    else courses[editCourseIdx] = editCourse;
    next[si].courses = courses;
    setDraft(d => ({ ...d, TEACHING_DATA: next }));
    setEditCourseIdx(null);
  };
  const delCourse = (si, ci) => {
    const next = JSON.parse(JSON.stringify(schools));
    next[si].courses = next[si].courses.filter((_, i) => i !== ci);
    setDraft(d => ({ ...d, TEACHING_DATA: next }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white uppercase tracking-widest">강의 이력</h3>
        <Btn small variant="accent" onClick={() => { setEditSchool({ ...EMPTY_SCHOOL }); setEditSchoolIdx('new'); }}>
          <Plus size={11} />학교 추가
        </Btn>
      </div>

      {editSchoolIdx === 'new' && (
        <div className="border border-accent/40 rounded-sm p-4 space-y-3 mb-3 bg-[#111]">
          <Input label="학교명" value={editSchool.university} onChange={e => setEditSchool(s => ({ ...s, university: e.target.value }))} />
          <Input label="기간 (예: 2025 - Present)" value={editSchool.period} onChange={e => setEditSchool(s => ({ ...s, period: e.target.value }))} />
          <div className="flex gap-2">
            <Btn variant="accent" onClick={saveSchool}><Check size={12} />추가</Btn>
            <Btn onClick={() => setEditSchoolIdx(null)}>취소</Btn>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {schools.map((school, si) => (
          <div key={si} className="border border-white/8 rounded-sm overflow-hidden">
            {editSchoolIdx === si ? (
              <div className="p-4 space-y-3 bg-[#111] border border-accent/40">
                <Input label="학교명" value={editSchool.university} onChange={e => setEditSchool(s => ({ ...s, university: e.target.value }))} />
                <Input label="기간" value={editSchool.period} onChange={e => setEditSchool(s => ({ ...s, period: e.target.value }))} />
                <div className="flex gap-2">
                  <Btn variant="accent" onClick={saveSchool}><Check size={12} />저장</Btn>
                  <Btn onClick={() => setEditSchoolIdx(null)}>취소</Btn>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between px-4 py-3 bg-[#181818]">
                  <button
                    type="button"
                    onClick={() => setExpandedSchool(expandedSchool === si ? null : si)}
                    className="flex items-center gap-2 text-sm text-white font-medium"
                  >
                    {expandedSchool === si ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    {school.university}
                    <span className="text-gray-500 font-normal text-xs">{school.period}</span>
                    <span className="text-gray-600 text-xs">({(school.courses || []).length}과목)</span>
                  </button>
                  <div className="flex gap-1.5">
                    <Btn small onClick={() => { setEditSchool({ university: school.university, period: school.period }); setEditSchoolIdx(si); }}>
                      <Pencil size={11} />수정
                    </Btn>
                    <Btn small variant="danger" onClick={() => delSchool(si)}>
                      <Trash2 size={11} />삭제
                    </Btn>
                  </div>
                </div>

                {expandedSchool === si && (
                  <div className="p-4 border-t border-white/5 space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] text-gray-600 uppercase tracking-widest">강의 목록</span>
                      <Btn small variant="accent" onClick={() => { setEditCourse({ ...EMPTY_COURSE }); setEditCourseIdx('new'); }}>
                        <Plus size={11} />강의 추가
                      </Btn>
                    </div>

                    {editCourseIdx === 'new' && (
                      <div className="border border-accent/40 rounded-sm p-3 space-y-2 bg-[#111]">
                        <Input label="강의명" value={editCourse.name} onChange={e => setEditCourse(c => ({ ...c, name: e.target.value }))} />
                        <Input label="학기 (예: 2026 Spring)" value={editCourse.term} onChange={e => setEditCourse(c => ({ ...c, term: e.target.value }))} />
                        <Input label="수준 (예: undergrad, graduate)" value={editCourse.level} onChange={e => setEditCourse(c => ({ ...c, level: e.target.value }))} />
                        <div className="flex gap-2">
                          <Btn small variant="accent" onClick={() => saveCourse(si)}><Check size={11} />추가</Btn>
                          <Btn small onClick={() => setEditCourseIdx(null)}>취소</Btn>
                        </div>
                      </div>
                    )}

                    {(school.courses || []).map((course, ci) => (
                      editCourseIdx === ci ? (
                        <div key={ci} className="border border-accent/40 rounded-sm p-3 space-y-2 bg-[#111]">
                          <Input label="강의명" value={editCourse.name} onChange={e => setEditCourse(c => ({ ...c, name: e.target.value }))} />
                          <Input label="학기" value={editCourse.term} onChange={e => setEditCourse(c => ({ ...c, term: e.target.value }))} />
                          <Input label="수준" value={editCourse.level} onChange={e => setEditCourse(c => ({ ...c, level: e.target.value }))} />
                          <div className="flex gap-2">
                            <Btn small variant="accent" onClick={() => saveCourse(si)}><Check size={11} />저장</Btn>
                            <Btn small onClick={() => setEditCourseIdx(null)}>취소</Btn>
                          </div>
                        </div>
                      ) : (
                        <div key={ci} className="flex items-center justify-between px-3 py-2 bg-white/[0.02] rounded-sm text-sm hover:bg-white/[0.04]">
                          <span className="text-gray-400">
                            {course.name}
                            {course.term && <span className="text-gray-600 ml-2 text-xs">{course.term}</span>}
                            {course.level && <span className="text-gray-700 ml-1 text-xs italic">{course.level}</span>}
                          </span>
                          <div className="flex gap-1.5">
                            <Btn small onClick={() => { setEditCourse({ ...course }); setEditCourseIdx(ci); }}>
                              <Pencil size={10} />수정
                            </Btn>
                            <Btn small variant="danger" onClick={() => delCourse(si, ci)}>
                              <Trash2 size={10} />삭제
                            </Btn>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Projects
function ProjectList({ title, items, onChange }) {
  const [editIdx, setEditIdx] = useState(null);
  const [editItem, setEditItem] = useState({});
  const EMPTY = { title: '', period: '', role: '' };

  const save = () => {
    const next = [...items];
    if (editIdx === 'new') next.push(editItem);
    else next[editIdx] = editItem;
    onChange(next);
    setEditIdx(null);
  };
  const del = (i) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{title}</h4>
        <Btn small variant="accent" onClick={() => { setEditItem({ ...EMPTY }); setEditIdx('new'); }}>
          <Plus size={11} />추가
        </Btn>
      </div>

      {editIdx === 'new' && (
        <div className="border border-accent/40 rounded-sm p-4 space-y-3 mb-2 bg-[#111]">
          <Textarea label="과제명" rows={2} value={editItem.title} onChange={e => setEditItem(p => ({ ...p, title: e.target.value }))} />
          <Input label="기간 (예: 2024/04 - 2028/03)" value={editItem.period} onChange={e => setEditItem(p => ({ ...p, period: e.target.value }))} />
          <Input label="역할 (예: Principal Investigator)" value={editItem.role || ''} onChange={e => setEditItem(p => ({ ...p, role: e.target.value || null }))} />
          <div className="flex gap-2">
            <Btn variant="accent" onClick={save}><Check size={12} />추가</Btn>
            <Btn onClick={() => setEditIdx(null)}>취소</Btn>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        {items.map((item, i) => (
          <ItemCard
            key={i}
            summary={`[${item.period}] ${item.title.substring(0, 55)}`}
            editing={editIdx === i}
            onEdit={() => { setEditItem({ ...item }); setEditIdx(i); }}
            onDelete={() => del(i)}
          >
            <Textarea label="과제명" rows={2} value={editItem.title} onChange={e => setEditItem(p => ({ ...p, title: e.target.value }))} />
            <Input label="기간" value={editItem.period} onChange={e => setEditItem(p => ({ ...p, period: e.target.value }))} />
            <Input label="역할" value={editItem.role || ''} onChange={e => setEditItem(p => ({ ...p, role: e.target.value || null }))} />
            <div className="flex gap-2">
              <Btn variant="accent" onClick={save}><Check size={12} />저장</Btn>
              <Btn onClick={() => setEditIdx(null)}>취소</Btn>
            </div>
          </ItemCard>
        ))}
      </div>
    </div>
  );
}

function ProjectsEditor({ draft, setDraft }) {
  const upd = (key, val) => setDraft(d => ({ ...d, PROJECTS_DATA: { ...d.PROJECTS_DATA, [key]: val } }));
  return (
    <div>
      <SectionTitle>연구비 과제</SectionTitle>
      <ProjectList title="진행 중인 과제 (Current)" items={draft.PROJECTS_DATA.current} onChange={v => upd('current', v)} />
      <ProjectList title="종료된 과제 (Past)" items={draft.PROJECTS_DATA.past} onChange={v => upd('past', v)} />
    </div>
  );
}

// Professor
function ProfessorEditor({ draft, setDraft }) {
  const prof = draft.PROFESSOR_DATA;
  const upd = (key, val) => setDraft(d => ({ ...d, PROFESSOR_DATA: { ...d.PROFESSOR_DATA, [key]: val } }));

  const [editBioIdx, setEditBioIdx] = useState(null);
  const [editBio, setEditBio] = useState('');

  const [editRiIdx, setEditRiIdx] = useState(null);
  const [editRi, setEditRi] = useState('');

  const [editEduIdx, setEditEduIdx] = useState(null);
  const [editEdu, setEditEdu] = useState({});
  const EMPTY_EDU = { degree: '', institution: '', major: '', year: '' };

  const [editExpIdx, setEditExpIdx] = useState(null);
  const [editExp, setEditExp] = useState({});
  const EMPTY_EXP = { role: '', institution: '', period: '' };

  const [editPubIdx, setEditPubIdx] = useState(null);
  const [editPub, setEditPub] = useState('');

  const saveListItem = (key, list, idx, item) => {
    const next = [...list];
    if (idx === 'new') next.push(item);
    else next[idx] = item;
    upd(key, next);
  };
  const delListItem = (key, list, i) => upd(key, list.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-10">
      {/* 기본 정보 */}
      <div>
        <SectionTitle>기본 정보</SectionTitle>
        <div className="space-y-3">
          <Input label="이름 (영문)" value={prof.name} onChange={e => upd('name', e.target.value)} />
          <Input label="이름 (한글)" value={prof.koreanName} onChange={e => upd('koreanName', e.target.value)} />
          <ImageField value={prof.image} onChange={v => upd('image', v)} />
        </div>
      </div>

      {/* Bio */}
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest">Bio</h3>
          <Btn small variant="accent" onClick={() => { setEditBio(''); setEditBioIdx('new'); }}>
            <Plus size={11} />단락 추가
          </Btn>
        </div>
        {editBioIdx === 'new' && (
          <div className="border border-accent/40 rounded-sm p-4 space-y-3 mb-3 bg-[#111]">
            <Textarea label="내용" rows={4} value={editBio} onChange={e => setEditBio(e.target.value)} />
            <div className="flex gap-2">
              <Btn variant="accent" onClick={() => { saveListItem('bio', prof.bio, 'new', editBio); setEditBioIdx(null); }}><Check size={12} />추가</Btn>
              <Btn onClick={() => setEditBioIdx(null)}>취소</Btn>
            </div>
          </div>
        )}
        <div className="space-y-1.5">
          {prof.bio.map((para, i) => (
            <ItemCard key={i} summary={para.substring(0, 90) + '...'} editing={editBioIdx === i}
              onEdit={() => { setEditBio(para); setEditBioIdx(i); }} onDelete={() => delListItem('bio', prof.bio, i)}>
              <Textarea label="내용" rows={4} value={editBio} onChange={e => setEditBio(e.target.value)} />
              <div className="flex gap-2">
                <Btn variant="accent" onClick={() => { saveListItem('bio', prof.bio, i, editBio); setEditBioIdx(null); }}><Check size={12} />저장</Btn>
                <Btn onClick={() => setEditBioIdx(null)}>취소</Btn>
              </div>
            </ItemCard>
          ))}
        </div>
      </div>

      {/* Research Interests */}
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest">Research Interests</h3>
          <Btn small variant="accent" onClick={() => { setEditRi(''); setEditRiIdx('new'); }}>
            <Plus size={11} />추가
          </Btn>
        </div>
        {editRiIdx === 'new' && (
          <div className="border border-accent/40 rounded-sm p-4 space-y-3 mb-3 bg-[#111]">
            <Textarea label="내용" rows={2} value={editRi} onChange={e => setEditRi(e.target.value)} />
            <div className="flex gap-2">
              <Btn variant="accent" onClick={() => { saveListItem('researchInterests', prof.researchInterests, 'new', editRi); setEditRiIdx(null); }}><Check size={12} />추가</Btn>
              <Btn onClick={() => setEditRiIdx(null)}>취소</Btn>
            </div>
          </div>
        )}
        <div className="space-y-1.5">
          {prof.researchInterests.map((ri, i) => (
            <ItemCard key={i} summary={ri} editing={editRiIdx === i}
              onEdit={() => { setEditRi(ri); setEditRiIdx(i); }} onDelete={() => delListItem('researchInterests', prof.researchInterests, i)}>
              <Textarea label="내용" rows={2} value={editRi} onChange={e => setEditRi(e.target.value)} />
              <div className="flex gap-2">
                <Btn variant="accent" onClick={() => { saveListItem('researchInterests', prof.researchInterests, i, editRi); setEditRiIdx(null); }}><Check size={12} />저장</Btn>
                <Btn onClick={() => setEditRiIdx(null)}>취소</Btn>
              </div>
            </ItemCard>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest">Education</h3>
          <Btn small variant="accent" onClick={() => { setEditEdu({ ...EMPTY_EDU }); setEditEduIdx('new'); }}>
            <Plus size={11} />추가
          </Btn>
        </div>
        {editEduIdx === 'new' && (
          <div className="border border-accent/40 rounded-sm p-4 space-y-3 mb-3 bg-[#111]">
            <Input label="학위 (예: Ph.D.)" value={editEdu.degree} onChange={e => setEditEdu(x => ({ ...x, degree: e.target.value }))} />
            <Input label="전공" value={editEdu.major} onChange={e => setEditEdu(x => ({ ...x, major: e.target.value }))} />
            <Input label="학교명" value={editEdu.institution} onChange={e => setEditEdu(x => ({ ...x, institution: e.target.value }))} />
            <Input label="연도" value={editEdu.year} onChange={e => setEditEdu(x => ({ ...x, year: e.target.value }))} />
            <div className="flex gap-2">
              <Btn variant="accent" onClick={() => { saveListItem('education', prof.education, 'new', editEdu); setEditEduIdx(null); }}><Check size={12} />추가</Btn>
              <Btn onClick={() => setEditEduIdx(null)}>취소</Btn>
            </div>
          </div>
        )}
        <div className="space-y-1.5">
          {prof.education.map((edu, i) => (
            <ItemCard key={i} summary={`${edu.year} ${edu.degree} — ${edu.institution}`} editing={editEduIdx === i}
              onEdit={() => { setEditEdu({ ...edu }); setEditEduIdx(i); }} onDelete={() => delListItem('education', prof.education, i)}>
              <Input label="학위" value={editEdu.degree} onChange={e => setEditEdu(x => ({ ...x, degree: e.target.value }))} />
              <Input label="전공" value={editEdu.major} onChange={e => setEditEdu(x => ({ ...x, major: e.target.value }))} />
              <Input label="학교명" value={editEdu.institution} onChange={e => setEditEdu(x => ({ ...x, institution: e.target.value }))} />
              <Input label="연도" value={editEdu.year} onChange={e => setEditEdu(x => ({ ...x, year: e.target.value }))} />
              <div className="flex gap-2">
                <Btn variant="accent" onClick={() => { saveListItem('education', prof.education, i, editEdu); setEditEduIdx(null); }}><Check size={12} />저장</Btn>
                <Btn onClick={() => setEditEduIdx(null)}>취소</Btn>
              </div>
            </ItemCard>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest">Professional Experience</h3>
          <Btn small variant="accent" onClick={() => { setEditExp({ ...EMPTY_EXP }); setEditExpIdx('new'); }}>
            <Plus size={11} />추가
          </Btn>
        </div>
        {editExpIdx === 'new' && (
          <div className="border border-accent/40 rounded-sm p-4 space-y-3 mb-3 bg-[#111]">
            <Input label="직책" value={editExp.role} onChange={e => setEditExp(x => ({ ...x, role: e.target.value }))} />
            <Input label="기관" value={editExp.institution} onChange={e => setEditExp(x => ({ ...x, institution: e.target.value }))} />
            <Input label="기간 (예: 2021-2024)" value={editExp.period} onChange={e => setEditExp(x => ({ ...x, period: e.target.value }))} />
            <div className="flex gap-2">
              <Btn variant="accent" onClick={() => { saveListItem('experience', prof.experience, 'new', editExp); setEditExpIdx(null); }}><Check size={12} />추가</Btn>
              <Btn onClick={() => setEditExpIdx(null)}>취소</Btn>
            </div>
          </div>
        )}
        <div className="space-y-1.5">
          {prof.experience.map((exp, i) => (
            <ItemCard key={i} summary={`${exp.period} ${exp.role} — ${exp.institution}`} editing={editExpIdx === i}
              onEdit={() => { setEditExp({ ...exp }); setEditExpIdx(i); }} onDelete={() => delListItem('experience', prof.experience, i)}>
              <Input label="직책" value={editExp.role} onChange={e => setEditExp(x => ({ ...x, role: e.target.value }))} />
              <Input label="기관" value={editExp.institution} onChange={e => setEditExp(x => ({ ...x, institution: e.target.value }))} />
              <Input label="기간" value={editExp.period} onChange={e => setEditExp(x => ({ ...x, period: e.target.value }))} />
              <div className="flex gap-2">
                <Btn variant="accent" onClick={() => { saveListItem('experience', prof.experience, i, editExp); setEditExpIdx(null); }}><Check size={12} />저장</Btn>
                <Btn onClick={() => setEditExpIdx(null)}>취소</Btn>
              </div>
            </ItemCard>
          ))}
        </div>
      </div>

      {/* Selected Publications */}
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest">Selected Publications</h3>
          <Btn small variant="accent" onClick={() => { setEditPub(''); setEditPubIdx('new'); }}>
            <Plus size={11} />추가
          </Btn>
        </div>
        {editPubIdx === 'new' && (
          <div className="border border-accent/40 rounded-sm p-4 space-y-3 mb-3 bg-[#111]">
            <Textarea label="논문 정보" rows={3} value={editPub} onChange={e => setEditPub(e.target.value)} />
            <div className="flex gap-2">
              <Btn variant="accent" onClick={() => { saveListItem('selectedPublications', prof.selectedPublications, 'new', editPub); setEditPubIdx(null); }}><Check size={12} />추가</Btn>
              <Btn onClick={() => setEditPubIdx(null)}>취소</Btn>
            </div>
          </div>
        )}
        <div className="space-y-1.5">
          {prof.selectedPublications.map((pub, i) => (
            <ItemCard key={i} summary={pub.substring(0, 90) + '...'} editing={editPubIdx === i}
              onEdit={() => { setEditPub(pub); setEditPubIdx(i); }} onDelete={() => delListItem('selectedPublications', prof.selectedPublications, i)}>
              <Textarea label="논문 정보" rows={3} value={editPub} onChange={e => setEditPub(e.target.value)} />
              <div className="flex gap-2">
                <Btn variant="accent" onClick={() => { saveListItem('selectedPublications', prof.selectedPublications, i, editPub); setEditPubIdx(null); }}><Check size={12} />저장</Btn>
                <Btn onClick={() => setEditPubIdx(null)}>취소</Btn>
              </div>
            </ItemCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// AdminPanel 본체

const SECTIONS = [
  { id: 'home',         label: 'Home' },
  { id: 'professor',    label: 'Professor' },
  { id: 'students',     label: 'Students' },
  { id: 'research',     label: 'Research' },
  { id: 'publications', label: 'Publications' },
  { id: 'teaching',     label: 'Teaching' },
  { id: 'projects',     label: 'Projects' },
];

export default function AdminPanel({ isOpen, onClose }) {
  const { data, setData } = useData();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [draft, setDraft] = useState(null);
  const [section, setSection] = useState('home');
  const [form, setForm] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      if (!user) {
        initialized.current = false;
        setDraft(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isLoggedIn && !initialized.current) {
      initialized.current = true;
      setDraft(JSON.parse(JSON.stringify(data)));
    }
  }, [isLoggedIn, data]);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const email = form.id.includes('@') ? form.id : `${form.id}@connectlab.kaist.ac.kr`;
      await signInWithEmailAndPassword(auth, email, form.password);
    } catch {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleSaveAndLogout = async () => {
    if (!window.confirm('저장 후 로그아웃하시겠습니까?')) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'data', 'content'), draft);
      setData(draft);
      await signOut(auth);
      onClose();
    } catch (err) {
      alert('저장 중 오류가 발생했습니다: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const renderSection = () => {
    if (!draft) return <div className="text-gray-600 text-sm">데이터 불러오는 중...</div>;
    switch (section) {
      case 'home':         return <HomeEditor draft={draft} setDraft={setDraft} />;
      case 'professor':    return <ProfessorEditor draft={draft} setDraft={setDraft} />;
      case 'students':     return <StudentsEditor draft={draft} setDraft={setDraft} />;
      case 'research':     return <ResearchEditor draft={draft} setDraft={setDraft} />;
      case 'publications': return <PublicationsEditor draft={draft} setDraft={setDraft} />;
      case 'teaching':     return <TeachingEditor draft={draft} setDraft={setDraft} />;
      case 'projects':     return <ProjectsEditor draft={draft} setDraft={setDraft} />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col font-sans">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between px-6 h-12 border-b border-white/10 shrink-0">
        <span className="font-serif text-accent text-sm tracking-widest uppercase font-bold">
          CONNECT Lab — Admin
        </span>
        <div className="flex items-center gap-3">
          {isLoggedIn && (
            <button
              onClick={handleSaveAndLogout}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-accent hover:bg-amber-300 text-black font-medium rounded transition-colors disabled:opacity-50"
            >
              <LogOut size={12} />
              {saving ? '저장 중...' : '저장 후 로그아웃'}
            </button>
          )}
          <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors p-1">
            <X size={18} />
          </button>
        </div>
      </div>

      {!isLoggedIn ? (
        // 로그인 화면
        <div className="flex-1 flex items-center justify-center px-6">
          <form onSubmit={handleLogin} className="w-full max-w-xs space-y-5">
            <h2 className="text-lg font-serif text-white text-center">관리자 로그인</h2>
            <Input
              label="아이디"
              type="text"
              value={form.id}
              onChange={e => setForm(f => ({ ...f, id: e.target.value }))}
              autoFocus
            />
            <Input
              label="비밀번호"
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-2.5 bg-accent hover:bg-amber-300 text-black font-medium rounded transition-colors text-sm"
            >
              로그인
            </button>
          </form>
        </div>
      ) : (
        // 편집 화면
        <div className="flex flex-1 overflow-hidden">
          {/* 사이드바 */}
          <aside className="w-44 border-r border-white/8 flex flex-col py-4 shrink-0">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={`text-left px-5 py-3 text-sm transition-colors ${
                  section === s.id
                    ? 'text-accent bg-white/[0.04] border-r-2 border-accent'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </aside>

          {/* 콘텐츠 */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {renderSection()}
          </main>
        </div>
      )}
    </div>
  );
}
