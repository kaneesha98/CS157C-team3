import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation} from "react-router-dom";
import { updateProfileAction } from "../../redux/slices/users/usersSlices";

//form validations
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
});

const UpdateProfile = () => {

    const location = useLocation();
    const state = location.state;
    console.log(state);
    
  //Navigate
  const navigate = useNavigate();
  //get data from store
  const user = useSelector(state => state?.users);
  const { isEdited } = user;

  //dispatch
  const dispatch = useDispatch();
  //formik form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: state?.user?.email,
      firstname: state?.user?.firstname,
      lastname: state?.user?.lastname,
    },

    onSubmit: values => {
      dispatch(updateProfileAction(values));
    },
    validationSchema: formSchema,
  });
  //redirect
  useEffect(() => {
    if (isEdited) navigate("/profile");
  }, [isEdited, dispatch]);
  return (
    <>
        <section className="py-5 bg-success vh-100">
          <div className="container text-center">
            <div className="row mb-4">
              <div className="col-12 col-md-8 col-lg-5 mx-auto">
                <div className="p-4 shadow-sm rounded bg-white">
                  <form onSubmit={formik.handleSubmit}>
                    <span className="text-muted">Update Profile</span>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.firstname}
                        onBlur={formik.handleBlur("firstname")}
                        onChange={formik.handleChange("firstname")}
                        className="form-control"
                        type="text"
                        placeholder="Enter firstname"
                      />
                    </div>
                    <div className="text-danger mb-2">
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.lastname}
                        onBlur={formik.handleBlur("lastname")}
                        onChange={formik.handleChange("lastname")}
                        className="form-control"
                        type="text"
                        placeholder="Enter lastname"
                      />
                    </div>
                    <div className="text-danger mb-2">
                      {formik.touched.lastname && formik.errors.lastname}
                    </div>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.email}
                        onBlur={formik.handleBlur("email")}
                        onChange={formik.handleChange("email")}
                        className="form-control"
                        type="email"
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="text-danger mb-2">
                      {formik.touched.email && formik.errors.email}
                    </div>

                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                        <button type="submit" class="btn btn-warning">
                          Update
                        </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};

export default UpdateProfile;