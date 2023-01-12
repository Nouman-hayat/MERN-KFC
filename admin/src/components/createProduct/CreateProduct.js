import React, { useState, useEffect } from "react";
import "./CreateProduct.css";
import { useSelector } from "react-redux";
import {useAlert} from 'react-alert'
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CreateJob() {

  const alert = useAlert()
  const [avatarPreview , setAvatarPreview ] = useState("")

  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
      description: "",
      price: "",
      stock: "",
      slug: "everyday-value",
      category: "everyday-value",
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .max(30, "Must be 30 characters or less")
        .min(6, "Must be minimum 6 characters")
        .required("Title is required"),

      image: Yup.string(),

      description: Yup.string()
        .min(5, "Must be minimum 5 characters")
        .required("Description is Required"),

      price: Yup.number("Price must be a number")
        .positive("Price has to be positive")
        .required("Price is required"),

      stock: Yup.number("Stock must be a number")
        .positive("Stock has to be positive")
        .required("Stock is required"),

      slug: Yup.string()
        .min(5, "Must be minimum 5 characters")
        .required("Slug is Required"),

      category: Yup.string()
        .min(5, "Must be minimum 5 characters")
        .required("category is Required"),
    }),

    onSubmit: async (values) => {
        await fetch("https://kfc-backend.herokuapp.com/kfc/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:'include',
        body: JSON.stringify(values),
        })
        .then( resp => {
            if(!resp.ok) throw new Error("Action failed")
        })
        .catch( err => alert(err));
        formik.handleReset()
        alert.success("Product Created")
    },
  });

  let handleImageUpload = (image)=>{
    console.log(image.target.files[0])

    /*if(image.target.files[0].size > 2097152 ) //for 2MB 
    {
      formik.setFieldError("image" , "image size should not exceed 2MB")
      return
    }*/

    let reader = new FileReader()

    reader.readAsDataURL(image.target.files[0])

    reader.onload = () =>{
      if(reader.readyState === 2)
      console.log(reader.result)
      setAvatarPreview(reader.result)
      formik.setFieldValue("image", reader.result)
    }
    
  }

  let isLoggedIn = useSelector((state) => state.adminReducer.isLoggedIn);
  
  useEffect(() => {
    if (!isLoggedIn) window.location.href = "https://kfc-admin.netlify.app";
  }, []);

  return (
    <div className="create-job bg-light ">
      <div className="container">
        <form onSubmit={ formik.handleSubmit}>
          <h1 className="text-primary text-center mb-4">
            Create A New Product
          </h1>
          <div className="row px-5">
            <div className="col-6">
              <h5 className="text-primary">Product Title</h5>
              <input
                {...formik.getFieldProps('title')}
                type="text"
                className="form-control"
                placeholder="Product Title"
                spellCheck="false"
              />
                {formik.touched.title && formik.errors.title ? ( <div className="prod-error">{formik.errors.title}</div>) : null}
            </div>
            <div className="col-6">
              <h5 className="text-primary">Image</h5>
              <input
               
                name = "image"
                onBlur = {formik.handleBlur}
                onChange = {(e)=> handleImageUpload(e)}
                type="file"
                className="form-control"
                placeholder="Image URL"
                spellCheck="false"
              />
              {formik.touched.image && formik.errors.image ? ( <div className="prod-error">{formik.errors.image}</div>) : null}
            </div>
            <div className="col-12">
              <h5 className="text-primary ">Description</h5>
              <textarea
                {...formik.getFieldProps('description')}
                rows="5"
                cols="20"
                type="text"
                className="form-control"
                placeholder="description"
                spellCheck="false"
              ></textarea>
              {formik.touched.description && formik.errors.description ? ( <div className="prod-error">{formik.errors.description}</div>) : null}
            </div>
            <div className="col-6">
              <h5 className="text-primary ">Price</h5>
              <input
                {...formik.getFieldProps('price')}
                type="text"
                className="form-control"
                placeholder="Price"
                spellCheck="false"
              />
              {formik.touched.price && formik.errors.price ? ( <div className="prod-error">{formik.errors.price}</div>) : null}
            </div>
            <div className="col-6">
              <h5 className="text-primary ">Stock</h5>
              <input
                {...formik.getFieldProps('stock')}
                type="text"
                className="form-control"
                placeholder="Stock"
                spellCheck="false"
              />
              {formik.touched.stock && formik.errors.stock ? ( <div className="prod-error">{formik.errors.stock}</div>) : null}
            </div>
            <div className="col-6">
              <h5 className="text-primary ">Slug</h5>
              <select
                {...formik.getFieldProps('slug')}
                id="slug"
                className="form-control">

                <option value="everyday-value">everyday-value</option>
                <option value="make-it-a-meal">make-it-a-meal</option>
                <option value="signature-box">signature-box</option>
                <option value="sharing">sharing</option>
                <option value="promotions">promotions</option>
                <option value="snacks">snacks</option>
                <option value="midnight-deals">midnight-deals</option>
                <option value="featured">featured</option>
              </select>
              {formik.touched.slug && formik.errors.slug ? ( <div className="prod-error">{formik.errors.slug}</div>) : null}
            </div>
            <div className="col-6">
              <h5 className="text-primary ">Category</h5>
              <select
                {...formik.getFieldProps('category')}
                id="category"
                className="form-control">
                <option value="everyday-value">everyday-value</option>
                <option value="make-it-a-meal">make-it-a-meal</option>
                <option value="signature-box">signature-box</option>
                <option value="sharing">sharing</option>
                <option value="promotions">promotions</option>
                <option value="snacks">snacks</option>
                <option value="midnight-deals">midnight-deals</option>
                <option value="featured">featured</option>
              </select>
              {formik.touched.category && formik.errors.category ? ( <div className="prod-error">{formik.errors.category}</div>) : null}
            </div>
          </div>
          <button className="btn-primary mx-auto d-block submit-job mt-4" type="submit"> Submit</button>
        </form>
      </div>
    </div>
  );
}
