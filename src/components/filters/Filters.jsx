
import { useEffect, useState } from 'react';
import './Filters.css';

const filterData = (data, filters) => {
  return data.filter((item) => {
    return Object.keys(filters).every(
      (key) => !filters[key] || item[key].toString().includes(filters[key])
    );
  });
};

const Filters = ({ setFilteredData, data, fields }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterSettings, setFilterSettings] = useState({});

  useEffect(() => {
    const filteredData = filterData(data, filterSettings);
    setFilteredData(filteredData);
  }, [filterSettings, setFilteredData, data]);

  const renderFilters = () => {
    if (fields.length === 0) {
      return <p>Фильтры отсутствуют</p>;
    }

    return fields.map((field) => (
      <label key={field} className="filters__label">
        {field}
        <input
          onChange={(e) =>
            setFilterSettings((state) => ({
              ...state,
              [field]: e.target.value,
            }))
          }
          value={filterSettings[field] || ''}
        />
      </label>
    ));
  };

  return (
    <div className="filters">
      <div className="container">
        <div className="filters__title-wrapper">
          <h2 className="filters__title">Панель фильтров</h2>
          <button
            className="filters__button-hide"
            onClick={() => setShowFilters((state) => !state)}
          >
            {showFilters ? 'скрыть' : 'показать'}
          </button>
        </div>
        <div className="filters__wrapper">
          {showFilters && (
            <form className="filters__form">{renderFilters()}</form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
