import { useEffect, useState } from 'react';
import { Workbook } from '@fortune-sheet/react';
import cloneDeep from 'lodash/cloneDeep';

import '@fortune-sheet/react/dist/index.css';

const initializingTableConfig = (data, fields) => {
  if (!data.length) return;

  const titles = fields.map((item, index) => {
    return {
      r: 0,
      c: index,
      v: {
        v: item.toString(),
        m: item.toString(),
      },
    };
  });

  const dataTable = data.flatMap((item, index) =>
    fields.map((field, fieldIndex) => ({
      r: index + 1,
      c: fieldIndex,
      v: {
        v: item[field] ? item[field].toString() : '',
        m: item[field] ? item[field].toString() : '',
      },
    }))
  );

  return [
    {
      name: 'Таблица 1',
      row: data.length,
      column: fields.length,
      defaultRowHeight: 50,
      defaultColWidth: 150,
      showSheetTabs: false,
      celldata: [...titles, ...dataTable],
    },
  ];
};

const EditingTable = ({ data, fields, setData }) => {
  const [tableConfig, setTableConfig] = useState([]);
  const [key, setKey] = useState(0);

  const updateData = (changes) => {
    changes.forEach((itemChange) => {
      const {
        op: operation,
        path: [, row, column],
        value: valueItem,
      } = itemChange;

      let value = typeof valueItem === 'object' ? valueItem.v : valueItem;

      if (operation === 'replace' || operation === 'remove') {
        setData((prevData) => {
          let newData = cloneDeep(prevData);

          if (!newData[row - 1]) {
            newData[row - 1] = {};
            fields.forEach((field) => {
              newData[row - 1][field] = '';
            });
          }

          newData[row - 1][fields[column]] = value;

          return newData;
        });
      }
    });
  };

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [tableConfig]);

  useEffect(() => {
    if (data.length === 0) {
      setTableConfig([]);
      return;
    }

    setTableConfig(initializingTableConfig(data, fields));
  }, [data, fields]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {tableConfig.length > 0 ? (
        <Workbook data={tableConfig} onOp={updateData} key={key} />
      ) : (
        <div className="container">
          <p>Данные отсутствуют</p>
        </div>
      )}
    </div>
  );
};

export default EditingTable;
