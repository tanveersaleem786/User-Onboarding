import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ errors, touched, values, status }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    status && setUser(users => [...users, status]);
  }, [status]);

  return (
    <div className="container">
      <h1>User Form</h1>
      <Form>
        <Field
          type="text"
          name="name"
          placeholder="name"
          value={values.name}
        />
        {touched.name && errors.name && <p>{errors.name}</p>}

        <Field type="text" name="email" placeholder="email" value={values.email} />
        {touched.email && errors.email && <p>{errors.email}</p>}

        <Field type="password" name="password" placeholder="password" value={values.password} />
        {touched.password && errors.password && <p>{errors.password}</p>}

        <label>
          <Field type="checkbox" name="terms" checked="checked" value={values.terms} />
          Terms of Service
          
        </label>  

        

        

         
  
       

        <button type="submit">Submit</button>

      </Form>

     
    
     <div className="row">
     {user.map(user => (
        <div className="column" key={user.id}>
          <div className="card">
            <h3>Name: {user.name}</h3>
            <p>Email: {user.email}</p>                        
          </div>
        </div>
      ))}
      </div>

    </div>
  );
};

// higher order component
const FormikMyForm = withFormik({
  mapPropsToValues({ name }) {
    return {
      name: name || "",
      email: "",
      password: "",
      terms: false,
      vaccinated: false  
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().max(10, 'Please enter no more than 10 characters')
    .required( 'Please enter your  name' ),
    email: Yup.string().email('Please enter a valid email')
    .required('Please enter an email'),
    password: Yup.string().required('Please enter password.') 
    .min(8, 'Password is too short - should be 8 chars minimum.'),
    //.matches('/[a-zA-Z]/', 'Password can only contain Latin letters.'),
    //term: Yup.bool()
    terms: Yup.bool(),
    vaccinated: Yup.bool()
    //.oneOf([true], 'Must Accept Terms and Conditions'),
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("Submitting form:", values);

    axios
      .post("https://reqres.in/api/users", values)
      // just put in a url you want data from
      .then(res => {
        console.log("Success:", res);
        setStatus(res.data);
        resetForm();
      })
      // do stuff with whatever gets returned
      .catch(err => {
        console.log("Error:", err.response);
      });
    // if there's an error, handle it
  }
})(UserForm);

export default FormikMyForm;
