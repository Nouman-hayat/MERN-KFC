import React , {useState} from 'react'
import './Register.css'
import {useAlert} from 'react-alert'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Link , useHistory } from 'react-router-dom'
import { API_URL } from '../../api';

export default function Register() {

    const history = useHistory()
    const alert = useAlert()

    const formik = useFormik({
        
        initialValues : {
            email : "" ,
            password : "" ,
            repeatPassword : "" ,
            firstName : "" ,
            lastName : "" ,
            address : "" ,
            country : "pakistan" ,
            province : "punjab" ,
            city : "rawalpindi" ,
            prefix : "+92" ,
            phone : '' ,
            zip : ""
        } ,

        validationSchema : Yup.object({
            email : Yup.string()
            .email("Invalid email address")
            .required("Email is requried") ,

            password : Yup.string().required()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
              .required("Password is required") ,
              
            repeatPassword : Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Enter password again"),

            firstName : Yup.string()
            .min(2)
            .max(20)
            .required("First name is required") ,

            lastName : Yup.string()
            .min(2)
            .max(20)
            .required("Last name is required") ,

            address : Yup.string()
            .min(5)
            .max(100)
            .required("Address is required") ,

            country : Yup.string().required().lowercase(),

            province : Yup.string()
            .required("Province is required") ,

            city : Yup.string()
            .required("City is required") ,

            prefix : Yup.string().required() ,

            phone : Yup.string().length(10).matches(/^\d{10}$/ , "Must contain numbers only").required() ,

            zip : Yup.string().required()
        }) ,



        onSubmit: async (values , {setSubmitting}) => {
            
            delete values.repeatPassword
            console.log(values)
            await fetch(`${API_URL}/kfc/users/create` ,
            {method: "POST" ,
            headers: {"Content-Type": "application/json"} ,
            body: JSON.stringify(values)})
            .then(data=> data.json())
            .then(data=> { 
                if(data.error)
                {
                    alert.error(JSON.stringify(data.error))
                }
                else
                {
                    alert.success("Account created")
                    formik.resetForm()
                    history.push("/login")
                }
            })

        } ,


    })

    return (
        <div className="register">
            <div className="custom-container">
                <h1 className="register-main-heading">NEW CUSTOMER</h1>
                <div className="registered">
                    <span className="assistant">Already Registered?</span> <Link to ="/login">Log In</Link>
                </div>
                <div className="social-links">
                    <button className="gmail">Login with gmail</button>
                    <button className="fb">login with fb</button>
                </div>

                <div className="register-form ">
                    <form className="register-form-inner " onSubmit={formik.handleSubmit}>
                        <div className="user-account-form">
                        <h1 className="register-heading">User account</h1>
                            <div className="row">
                                <div className="col-12">
                                    <input type="email" placeholder="Email *" {...formik.getFieldProps('email')}  />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className='error-handler'>{formik.errors.email}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <input {...formik.getFieldProps('password')} type="password" placeholder="Password *" className="mb-0"   />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className='error-handler'>{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="col-lg-6">
                                    <input type="password" placeholder="Repeat Password *" className="mb-0" {...formik.getFieldProps('repeatPassword')}  />
                                    {formik.touched.repeatPassword && formik.errors.repeatPassword ? 
                                    (
                                        <div className='error-handler'>{formik.errors.repeatPassword}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="contact-info-form">
                        <h1 className="register-heading">contact information</h1>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" placeholder="First Name *" {...formik.getFieldProps('firstName')} />
                                    {formik.touched.firstName && formik.errors.firstName ? (
                                        <div className='error-handler'>{formik.errors.firstName}</div>
                                    ) : null}
                                </div>

                                <div className="col-6">
                                    <input {...formik.getFieldProps('lastName')} type="text" placeholder="Last Name *" />
                                    {formik.touched.lastName && formik.errors.lastName ? (
                                        <div className='error-handler'>{formik.errors.lastName}</div>
                                    ) : null}
                                </div>
                                <div className="col-12">
                                    <textarea {...formik.getFieldProps('address')} type="text"  placeholder="Address *"  />
                                    {formik.touched.address && formik.errors.address ? (
                                        <div className='error-handler'>{formik.errors.address}</div>
                                    ) : null}
                                </div>
                                <div className="col-4">
                                    <select {...formik.getFieldProps('country')}  >
                                        <option value="">Country</option>
                                        <option value="pakistan" >pakistan</option> 
                                        <option value="ksa">ksa</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <select {...formik.getFieldProps('province')} placeholder="State/Province *" >
                                        <option value="punjab" >punjab</option> 
                                        <option value="kpk">kpk</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <input {...formik.getFieldProps('city')} type="text" placeholder="City *" />
                                    {formik.touched.city && formik.errors.city ? (
                                        <div className='error-handler'>{formik.errors.city}</div>
                                    ) : null}
                                </div>
                                <div className="col-2">
                                    <select {...formik.getFieldProps('prefix')} type="text" placeholder="Prefix *" >
                                        <option value="+92">+92</option> 
                                        <option value="+002">+002</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <input {...formik.getFieldProps('phone')}  placeholder="Phone *"  />
                                    {formik.touched.phone && formik.errors.phone ? (
                                        <div className='error-handler'>{formik.errors.phone}</div>
                                    ) : null}
                                </div>
                                <div className="col-2 " >
                                    <input {...formik.getFieldProps('zip')} type="text" placeholder="Post/Zip Code *" />
                                    {formik.touched.zip && formik.errors.zip ? (
                                        <div className='error-handler'>{formik.errors.zip}</div>
                                    ) : null}
                                </div>
                                
                                <div className="terms-conditions px-0">
                                    <div className="col-12">
                                        <input type="checkbox" id="checkbox1" /> 
                                        <label htmlFor="checkbox1">I agree with the terms and conditions.</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="checkbox" id="checkbox2" />
                                        <label htmlFor="checkbox2">I wish to receive emails about new promotions/deals/products.</label>
                                    </div>
                                </div>

                                <div className="col-12 mb-5">
                                    <button className="sign-in" type="submit">CREATE ACCOUNT</button>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
                
            </div>
            
        </div>
    )
}
