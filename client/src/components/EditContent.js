import React from "react";
import moneySVG from "../img/money.svg"
import {useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateExpAction } from "../redux/slices/expenses/expensesSlices";
import { updateIncomeAction } from "../redux/slices/income/incomeSlices";
import { useNavigate } from "react-router-dom";

//import DisabledButton from "./DisabledButton";

const EditContent = () => {
  const location = useLocation();
  const itemprops = location.state.item;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Form validation
  const formSchema = Yup.object({
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
    amount: Yup.number().required("Amount is required"),
  });
  
  //formik form
  const formik = useFormik({ 
    initialValues:{
      title: itemprops?.title,
      description: itemprops?.description,
      amount: itemprops?.amount
    },
    onSubmit: values =>{
      const data = {
      ...values,
      id: itemprops?.id,
      };
      if(itemprops?.type === "income" 
        ? dispatch(updateIncomeAction(data)) & navigate("/user-income") 
        : dispatch(updateExpAction(data)) & navigate("/user-expenses"));
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
                {itemprops?.type === "income" ? <h2>Update Income</h2> : <h2>Update Expense</h2>}
                <h2 className="mb-4 fw-light">
                </h2>
                {/* Display Err */}
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Title"
                  />
                </div>
                {/* Err */}
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
                  />
                </div>
                {/* Err */}
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
                  />
                </div>
                <div className="text-danger mb-2">
                  {formik.touched.amount && formik.errors.amount}
                </div>

                <button type="submit" className="btn btn-primary mb-4 w-100">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditContent;