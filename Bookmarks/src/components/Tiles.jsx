import React from 'react'
import Pages from './Pages'

const Tiles = ( params ) => {
  const gridClass = {
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
  }[params.columns] || "grid-cols-4";

  return (
    <div className={`grid ${gridClass} gap-5`}>
      <Pages onClick={params.onClick} columns={params.columns} pages={params.pages} setPages={params.setPages} showEdit={params.showEdit} setShowEdit={params.setShowEdit} deletePage={params.deletePage}/>
    </div>
  );
}

export default Tiles;
