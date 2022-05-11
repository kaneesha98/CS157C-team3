import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AppPagination from "../../components/AppPagination";
import ContentDetails from "../../components/ContentDetails";
import { fetchAllIncomeAction } from "../../redux/slices/income/incomeSlices";

const IncomeList = () => {
//Not admin
const navigate = useNavigate();
const isAdmin = useSelector(state => state?.users?.userAuth?.isAdmin);
useEffect(() => {
  if(!isAdmin)navigate("/user-income");
});

//dispatch
const dispatch = useDispatch();
const [page, setPage] = useState(1)

useEffect(() => {
  dispatch(fetchAllIncomeAction(page));
}, [dispatch, page, setPage]);

//get all expenses 
const allIncome = useSelector(state => state?.income);
const {loading, appErr, serverErr, incomeList} = allIncome;
//console.log(page);
  return (
    <>
      <section className="py-6">
        <div className="container-fluid">
          <div className="position-relative border rounded-2">
            <a className="position-absolute top-0 end-0 mt-4 me-4" href="#"></a>
            <div className="pt-8 px-8 mb-8">
              <h6 className="mb-0 fs-3">Recent Expense transactions</h6>
              <p className="mb-0">
                Below is the history of your expense transactions records
              </p>
              <Link to="/add-income" className="btn  btn-outline-success me-2 m-2">
                New Income
              </Link>
            </div>
            <table className="table">
              <thead>
                <tr className="table-active">
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Withdrawed By</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Title</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Description</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Amount</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Date</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Action</small>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>{loading ? (
                    <h1>Loading...</h1>
                  ) : appErr || serverErr ? (
                    <div>Err</div>
                  ) : incomeList?.docs?.length <= 0 ? (
                    <h1>No Income Found</h1>
                  ) : (
                    incomeList?.docs?.map(exp => (
                      <ContentDetails item={exp} key={exp?._id} />
                    ))
                  )}</tbody>
            </table>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
        <AppPagination 
        setPage = {setPage}
        pageNumber={incomeList?.totalPages}/>
        </div>
      </section>
    </>
  );
};

export default IncomeList;