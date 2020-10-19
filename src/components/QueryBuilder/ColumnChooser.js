import React, { useState, useEffect } from 'react';
import {Checkbox, Dropdown, DropdownButton, DropdownMenu } from "@folio/stripes/components";
import cloneDeep from 'lodash.clonedeep'

// TODO: ability to remove filters
// <span onClick={onRemove} style={{ cursor: "pointer" }}>❌</span>

const ColumnChooser = ({ possibleColumns, value, onChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [columns, setColumns] = useState([]);
  // const visibleColumns = possibleColumns.filter((col) => {
  //   return columns.includes(col);
  // });

  const updateColumns = (e) => {
    const column = e.target.value;
    let newColumns
    if (e.target.checked) {
      newColumns = [...columns, column];
      setColumns(newColumns);
    } else {
      const columnIndex = columns.findIndex((col) => col === column);
      if (columnIndex !== -1) {
        newColumns = cloneDeep(columns);
        newColumns.splice(columnIndex, 1);
        setColumns(newColumns)
      }
    }
    console.debug('columns', newColumns)
    value = newColumns;
    onChange(newColumns)
  }
  
  return (
  <Dropdown
    id="chooseColumnDropdown"
    open={menuOpen}
    onToggle={() => setMenuOpen(!menuOpen)}
  >
    <DropdownButton
      data-role="toggle"
      open={menuOpen}
    >
      {'Show columns...'}
    </DropdownButton>
    <DropdownMenu
      data-role="menu"
      // aria-label="column menu"
      onToggle={() => setMenuOpen(!menuOpen)}
    >
      <ul>
        { possibleColumns.map((col) => {
          return (
            <li key={col}>
              <Checkbox
                value={col}
                label={col}
                onChange={updateColumns}
                checked={columns.includes(col)}
              />
            </li>
          );
        })}
      </ul>
    </DropdownMenu>
  </Dropdown>
)};

export default ColumnChooser;