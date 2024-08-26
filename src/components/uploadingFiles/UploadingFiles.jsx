import './UploadingFiles.css';
import { useState } from 'react';

const reorganizeData = (data) => {
  const dataInNewFormat = [];

  for (let key in data) {
    for (let index in data[key]) {
      if (!dataInNewFormat[+index]) {
        dataInNewFormat[+index] = {};
      }
      dataInNewFormat[+index][key] = data[key][index];
    }
  }

  return dataInNewFormat;
};

const UploadingFiles = ({ setData }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadingFiles = (e) => {
    setError(null);

    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/json') {
      setError('Можно загружать только файлы в формате JSON!');
      return;
    }

    const reader = new FileReader();

    reader.onloadstart = () => setLoading(true);

    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        setData(reorganizeData(data));
      } catch (error) {
        setError('Произошла ошибка при чтении json-файла.');
        console.error(`Ошибка при чтении файла: ${error}`);
      }
    };

    reader.onerror = (error) => {
      setError('Произошла ошибка при чтении json-файла.');
      console.error(`Ошибка при чтении файла: ${error}`);
    };

    reader.onloadend = () => setLoading(false);

    reader.readAsText(file);
  };

  return (
    <div className="uploading-files">
      <h2 className="uploading-files__title">Загрузить даннные</h2>
      <form className="uploading-files__form">
        <input
          className="uploading-files__form-input"
          type="file"
          accept="application/json"
          onChange={loadingFiles}
        />
      </form>
      {loading && (
        <p className="uploading-files__loading-message">Загрузка...</p>
      )}
      {error && <p className="uploading-files__type-error">{error}</p>}
    </div>
  );
};

export default UploadingFiles;
