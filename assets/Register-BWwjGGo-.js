import{r as t,i as g,f as h,j as e,H as f,L as b,a as w}from"./index-B3N55BAO.js";import{c as y,a as s,b as k,u as N}from"./index.esm-CsjVfDq7.js";function P(){const{setUserLogin:l,userLogin:d}=t.useContext(g),u=y().shape({name:s().min(3,"Name Atleast 3 Char").max(10,"Name Max 10 Char").required("Name Is Required"),email:s().email("Email Is Not Valid").required("Email Is Required"),phone:s().trim().matches(/^01[1250]\d{8}$/,"Must Add Egyptian Number").required("Phone Is Required"),password:s().matches(/^(?=.*[A-Z])[A-Za-z0-9.@*]{6,11}$/,"Password must contain at least one uppercase letter and be between 6 to 11 characters long.").required("Password Is Required"),rePassword:s().oneOf([k("password")],"Repassword Must Same Password").required("Repassword Is Required")}),c=h(),[m,o]=t.useState(!1),[n,i]=t.useState("");function p(x){o(!0),w.post("https://ecommerce.routemisr.com/api/v1/auth/signup",x).then(a=>{a.data.message==="success"&&(localStorage.setItem("userToken",a.data.token),l(a.data.token),o(!1),c("/"),window.location.reload())}).catch(a=>{i(a.response.data.message),o(!1)})}const r=N({initialValues:{name:"",phone:"",email:"",password:"",rePassword:""},validationSchema:u,onSubmit:p});return t.useEffect(()=>{l(null)},[d]),e.jsxs(e.Fragment,{children:[e.jsx(f,{children:e.jsx("title",{children:"Register"})}),e.jsxs("div",{className:"container mx-auto md:w-1/2",children:[e.jsx("h2",{className:"text-3xl font-bold mb-6 green-color text-center md:text-start  2xl:mt-28",children:"Register Now"}),n?e.jsx("div",{className:"p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",role:"alert",children:n}):"",e.jsxs("form",{onSubmit:r.handleSubmit,children:[e.jsxs("div",{className:"relative z-0 w-3/4 md:w-full mx-auto mb-5 group",children:[e.jsx("input",{onChange:r.handleChange,onBlur:r.handleBlur,value:r.values.name,type:"text",name:"name",id:"userName",className:"block py-2.5 px-0 w-full text-sm text-gray-900  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer",placeholder:" "}),e.jsxs("label",{htmlFor:"userName",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:["Name"," "]})]}),r.errors.name&&r.touched.name?e.jsx("div",{className:"p-4 mb-4 text-sm text-red-800  w-3/4 md:w-full mx-auto rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",role:"alert",children:r.errors.name}):null,e.jsxs("div",{className:"relative z-0 w-3/4 md:w-full mx-auto mb-5 group",children:[e.jsx("input",{onChange:r.handleChange,onBlur:r.handleBlur,value:r.values.phone,type:"text",name:"phone",id:"userPhone",className:"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer",placeholder:" "}),e.jsx("label",{htmlFor:"userPhone",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:"Phone"})]}),r.errors.phone&&r.touched.phone?e.jsx("div",{className:"p-4 mb-4 text-sm text-red-800 w-3/4 md:w-full mx-auto rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",role:"alert",children:r.errors.phone}):null,e.jsxs("div",{className:"relative z-0 w-3/4 md:w-full mx-auto mb-5 group",children:[e.jsx("input",{onChange:r.handleChange,onBlur:r.handleBlur,value:r.values.email,type:"email",name:"email",id:"userEmail",className:"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer",placeholder:" "}),e.jsx("label",{htmlFor:"userEmail",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:"Email address"})]}),r.errors.email&&r.touched.email?e.jsx("div",{className:"p-4 mb-4 text-sm text-red-800 w-3/4 md:w-full mx-auto rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",role:"alert",children:r.errors.email}):null,e.jsxs("div",{className:"relative z-0 w-3/4 md:w-full mx-auto mb-5 group",children:[e.jsx("input",{onChange:r.handleChange,onBlur:r.handleBlur,value:r.values.password,type:"password",name:"password",id:"userPassword",className:"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer",placeholder:" "}),e.jsx("label",{htmlFor:"userPassword",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:"Password"})]}),r.errors.password&&r.touched.password?e.jsx("div",{className:"p-4 mb-4 text-sm text-red-800 w-3/4 md:w-full mx-auto rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",role:"alert",children:r.errors.password}):null,e.jsxs("div",{className:"relative z-0 w-3/4 md:w-full mx-auto mb-5 group",children:[e.jsx("input",{onChange:r.handleChange,onBlur:r.handleBlur,value:r.values.rePassword,type:"password",name:"rePassword",id:"userRepassword",className:"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer",placeholder:" "}),e.jsx("label",{htmlFor:"userRepassword",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:"Re Password"})]}),r.errors.rePassword&&r.touched.rePassword?e.jsx("div",{className:"p-4 mb-4 text-sm text-red-800 w-3/4 md:w-full mx-auto rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",role:"alert",children:r.errors.rePassword}):null,e.jsx("div",{className:"text-center md:text-start",children:e.jsx("button",{type:"submit",className:"btn btn-primary  font-medium rounded-lg text-sm w-3/4 md:w-full mx-auto  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",children:m?e.jsx("i",{className:"fas fa-spinner fa-spin"}):"Submit"})}),e.jsx("div",{className:"text-center md:text-start py-2",children:e.jsxs("p",{children:["Have an account?",e.jsx("span",{className:"text-xl px-2 cursor-pointer green-color",children:e.jsx(b,{to:"/Login",children:"Login Now"})})]})})]})]})]})}export{P as default};