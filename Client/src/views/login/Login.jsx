import React ,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import swal from "sweetalert"
import { useFormik } from "formik";
import axios from "../../service/api"

const Login = () => {
  const [message,setMessage] =useState("")


const validate = (values) => {
const errors = {};
if(!values.password){
    errors.password = "Required";
}if(!values.email){
    errors.email = "Required";
}else if(
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
)
{
    errors.email = "Invalid Email Adrress";
}
return errors
};

const formik = useFormik({
  initialValues :{
    email : "",
    password : ""
  },
  validate,
  onSubmit:(values)=>
  {
    user_login(values)
  },
})

async function user_login(values){
console.log(values)
try{
const response = await axios.post("/user/login",{ 
email : values.email,
password :values.password
})
}catch(err){
console.log(err.response.data)
}
}

    return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={formik.handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <p className="text-danger">{message}</p>
                    <p className="text-warning field_validate_label">{formik.errors.email ? formik.errors.email : null}</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="email" name="email" placeholder="email" autoComplete="email" value={formik.values.email} onChange={formik.handleChange} />
                    </CInputGroup>
                    <p className="text-warning field_validate_label">{formik.errors.password ? formik.errors.password : null}</p>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" name="password" placeholder="Password" autoComplete="current-password" value={formik.values.password} onChange={formik.handleChange}  />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" types="submit">Login</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Welcome</h2>
                    <p>Selamat datang di halaman admin</p>
                    <p>Hanya untuk kalangan internal</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
