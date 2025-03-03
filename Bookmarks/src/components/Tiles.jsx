import React from 'react'
import Pages from './Pages'

const Tiles = ( params ) => {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8"
  }[params.columns] || "grid-cols-4";

  return (
    <div className={`grid ${gridClass} gap-5`}>
      <Pages onClick={params.onClick} columns={params.columns} />
    </div>
  );
}

export default Tiles;
