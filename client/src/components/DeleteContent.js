import React from "react";
import moneySVG from "../img/money.svg"
import {useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { deleteExpAction } from "../redux/slices/expenses/expensesSlices";
import { deleteIncomeAction } from "../redux/slices/income/incomeSlices";
import { useNavigate } from "react-router-dom";
import dateFormatter from "../utils/dateFormatter";

const DeleteContent = () => {
  const location = useLocation();
  const itemprops = location.state.item;
  const dateCreated = "Date: " + dateFormatter(itemprops?.createdAt);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //console.log(itemprops)
  //Form validation
  const formSchema = Yup.object({
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
  });
  
  //formik form
  const formik = useFormik({ 
    initialValues:{
      title: "Title: " + itemprops?.title,
      description: "Description: " + itemprops?.description,
      amount: "Amount: " + itemprops?.amount
    },
    onSubmit: values =>{
      const data = {
      id: itemprops?.id,
      };
      if(itemprops?.type === "income" 
        ? dispatch(deleteIncomeAction(data)) & navigate("/income") 
        : dispatch(deleteExpAction(data)) & navigate("/expenses"));
    },
    //Binding Yup with Formik
    validationSchema: formSchema,
  }
  );

  
  return (
    <section className="py-5 bg-secondary vh-100">
      <div className="container text-center">
        <a className="d-inline-block mb-5">
          <img
            className="img-fluid"
            src={moneySVG}
            alt="SVGeXPENSES"
            width="200"
          />
        </a>
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-5 mx-auto">
            <div className="p-4 shadow-sm rounded bg-white">
            <form onSubmit={formik.handleSubmit}>
                <span className="text-muted">
                </span>
                {itemprops?.type === "income" ? <h2>Delete Income</h2> : <h2>Delete Expense</h2>}
                <h2 className="mb-4 fw-light">
                </h2>
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Title"
                    disabled
                  />
                </div>
                <div className="text-danger mb-2">
                  {formik.touched.title && formik.errors.title}
                </div>
                <div className="mb-3 input-group">
                <input
                    value={formik.values.description}
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Description"
                    disabled
                  />
                </div>
                <div className="text-danger mb-2">
                  {formik.touched.description && formik.errors.description}
                </div>
                <div className="mb-3 input-group">
                <input
                    value={formik.values.amount}
                    onChange={formik.handleChange("amount")}
                    onBlur={formik.handleBlur("amount")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Amount"
                    disabled
                  />
                </div>
                <div className="mb-3 input-group">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Amount"
                    value = {dateCreated}
                    disabled
                  />
                </div>
                <div className="text-danger mb-2">
                  {formik.touched.amount && formik.errors.amount}
                </div>
                <button type="submit" className="btn btn-primary mb-4 w-50">
                  Yes
                </button>
              </form>
                <button 
                className="btn btn-danger mb-4 w-50"
                onClick={()=>{
                    if(itemprops?.type === "income") 
                    navigate(-1); 
                    else navigate(-1);
                }}
                >
                 No
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteContent;