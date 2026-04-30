import { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import {
  HOME_DATA,
  PROFESSOR_DATA,
  STUDENTS_DATA,
  RESEARCH_DATA,
  PUBLICATIONS_DATA,
  TEACHING_DATA,
  PROJECTS_DATA,
} from '../constants/data';

const DataContext = createContext(null);

const DEFAULTS = { HOME_DATA, PROFESSOR_DATA, STUDENTS_DATA, RESEARCH_DATA, PUBLICATIONS_DATA, TEACHING_DATA, PROJECTS_DATA };

export function DataProvider({ children }) {
  const [data, setData] = useState(DEFAULTS);

  useEffect(() => {
    const ref = doc(db, 'data', 'content');
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) setData({ ...DEFAULTS, ...snap.data() });
    }, () => {});
    return unsubscribe;
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
