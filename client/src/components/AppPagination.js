import React from 'react'

const AppPagination = ({pageNumber, setPage}) => {
    const arr = Array.from(Array(pageNumber).keys());
    //console.log(arr);
  return (
<nav aria-label="Page navigation example">
  <ul className="pagination">
    {/*Create array of page number components*/}
    {arr?.map(p =>(
        <li className="page-item">
            <button onClick={(e)=>setPage(e.target.textContent)} className="page-link">
                {++p}
            </button>
            </li>
        ))}
  </ul>
</nav>
  )
}

export default AppPagination
