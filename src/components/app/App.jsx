import { useEffect, useState } from 'react';

import Header from '../header/Header';
import ViewingTable from '../viewingTable/ViewingTable';
import EditingTable from '../editingTable/EditingTable';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import './App.css';

function App() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState([]);
  const [fieldsTable, setFieldsTable] = useState([]);

  useEffect(() => {
    try {
      const jsonLocalStorageData = localStorage.getItem('data');
      if (!jsonLocalStorageData) return;

      const localStorageData = JSON.parse(jsonLocalStorageData);
      console.log('Данные загружены из LocalStorage');
      setData(localStorageData);
    } catch (error) {
      console.error('Ошибка при загрузке данных из LocalStorage:', error);
    }
  }, []);

  useEffect(() => {
    if (data.length === 0) {
      setFieldsTable([]);
      return;
    }

    const jsonData = JSON.stringify(data);

    if (localStorage.getItem('data') !== jsonData) {
      localStorage.setItem('data', jsonData);
    }

    const newFieldsTable = Object.keys(data[0]);
    setFieldsTable(newFieldsTable);
  }, [data]);

  return (
    <>
      <Header
        setData={setData}
        isEditMode={isEditMode}
        toggleMode={() => setIsEditMode((state) => !state)}
      />
      {isEditMode ? (
        <ErrorBoundary>
          <EditingTable data={data} fields={fieldsTable} setData={setData} />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <ViewingTable data={data} fields={fieldsTable} />
        </ErrorBoundary>
      )}
    </>
  );
}

export default App;
