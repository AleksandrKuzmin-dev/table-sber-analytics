import { v4 as uniqueId } from 'uuid';
import { useMemo, useState } from 'react';

import { sortData } from './utils';
import Filters from '../filters/Filters';

import './ViewingTable.css';

const ViewingTable = ({ data, fields }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return sortData(data, sortConfig);
  }, [data, sortConfig]);

  const changeSortConfig = (field) => {
    let direction = 'ascending';

    if (sortConfig.key === field && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: field, direction });
  };

  const renderTable = () => {
    if (filteredData.length === 0) {
      return (
        <div className="container">
          <p>Данные отсутствуют</p>
        </div>
      );
    }

    return (
      <table>
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={uniqueId()} onClick={() => changeSortConfig(field)}>
                {field}
                {sortConfig.key === field
                  ? sortConfig.direction === 'ascending'
                    ? ' 🔼'
                    : ' 🔽'
                  : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={uniqueId()}>
              {fields.map((field) => (
                <td key={uniqueId()}>{item[field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <Filters
        setFilteredData={setFilteredData}
        data={sortedData}
        fields={fields}
      />
      <div className="viewing-table">
        <div className="viewing-table__container">
          <div className="viewing-table__wrapper">{renderTable()}</div>
        </div>
      </div>
    </>
  );
};

export default ViewingTable;
