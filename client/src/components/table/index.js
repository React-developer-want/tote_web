import { useState } from 'react';
import Button from '../button';
import { SortIcon } from '../icons';
import './styles.scss';

const formatTableValue = (cell) => {
  const rowItemFormat = {
    money: (value) => parseInt(value, 10).toLocaleString('en-IN'),
  };

  if (cell.format && rowItemFormat[cell.format]) {
    return rowItemFormat[cell.format](cell.value);
  }
  return cell.value;
};

const TableComponent = (props) => {
  const {
    hideHeaderRow = false, tableAttributes = {}, rowLabels = [], rows = [],
  } = props;
  const [sortColumnIndex, setSortColumnIndex] = useState();
  const [sortAscending, setSortAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(props?.isPagination ? 10 : rows.length);
  const [searchText, setSearchText] = useState('');

  const filteredList = searchText.length ? rows.filter((item) => item.cells.reduce((acc, item) => `${item.value}`.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 || acc, false)) : rows;

  const onClickHeaderItem = (itemIndex) => {
    if (sortColumnIndex === itemIndex) {
      setSortAscending(!sortAscending);
    } else {
      setSortAscending(true);
    }
    setSortColumnIndex(itemIndex);
  };

  const applySorting = (itemA, itemB) => {
    if (typeof itemA.cells[sortColumnIndex].value === 'number') {
      if (sortAscending) {
        return itemA.cells[sortColumnIndex].value - itemB.cells[sortColumnIndex].value;
      }
      return itemB.cells[sortColumnIndex].value - itemA.cells[sortColumnIndex].value;
    }

    if (sortAscending) {
      return itemA.cells[sortColumnIndex].value > itemB.cells[sortColumnIndex].value ? 1 : -1;
    }
    return itemA.cells[sortColumnIndex].value > itemB.cells[sortColumnIndex].value ? -1 : 1;
  };

  return (
    <div className="table-component">
      {props.isFilters && <div className="filters">
        <div className='search'>
          <input value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Search" />
        </div>
        {props?.isPagination && <div className='entries'>
          <span>Entries: </span>
          <select
            value={pageSize}
            onChange={(event) => {
              setPageSize(parseInt(event.target.value, 10));
              setCurrentPage(1);
            }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>}
      </div>}
      <div className="table-wrapper">
        <table {...tableAttributes} cellSpacing="0">
          {hideHeaderRow ? null : (
            <thead>
              <tr>
                {rowLabels.map((label, index) => (
                  <th onClick={() => onClickHeaderItem(index)} key={label}>
                    <span key={index}>{label}</span>
                    {sortColumnIndex === index ? <SortIcon className={sortAscending ? 'ascending' : 'descending'} /> : null}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {filteredList.length ? (typeof sortColumnIndex === 'undefined' ? filteredList : filteredList.sort(applySorting)).slice((currentPage - 1) * pageSize, (currentPage) * pageSize).map((row, rowIndex) => (
              <tr {...(row.attributes || {})} key={`${rowIndex}-tr`}>
                {row.cells.map((cell, index) => <td key={`${index}:${cell.value}`} {...(cell.attributes || {})}>{formatTableValue(cell)}</td>)}
                {row?.action ? <td><Button text={row.action} button="primary" onClickBtn={()=> props.onClickRow(row)}/></td> : null}
              </tr>
            )) : (
              <tr key="empty-row">
                <td colSpan={rowLabels.length}>No data available in table</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {props?.isPagination && <div className="pagination">
        {(new Array(Math.ceil(filteredList.length / pageSize))).fill(0).map((item, index) => <span key={item+index} onClick={() => setCurrentPage(index + 1)} className={`page-count ${index + 1 === currentPage ? 'active' : ''}`}>{index + 1}</span>)}
      </div>}
    </div>
  );
};

export default TableComponent;

// Search
// Page size
// Page count
// onclick page count
// previous next
// No data available
// showing 0 to 0 of 0 entries
