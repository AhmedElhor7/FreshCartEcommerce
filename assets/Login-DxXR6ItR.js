import{r as a,i as p,f as g,j as e,H as h,L as f,a as b}from"./index-C8nNN9xT.js";import{c as w,a as i,u as j}from"./index.esm-DEJQRl3R.js";function k(){const{userLogin:y,setUserLogin:t}=a.useContext(p),d=g(),[c,o]=a.useState(!1),[n,l]=a.useState("");a.useEffect(()=>{t(null)},[]);async function m(x){o(!0);try{const s=await b.post("https://ecommerce.routemisr.com/api/v1/auth/signin",x);console.log(s),s.data.message==="success"&&(localStorage.setItem("userToken",s.data.token),t(s.data.token),d("/"),window.location.reload())}catch(s){s.response?l(s.response.data.message):l("An unexpected error occurred.")}finally{o(!1)}}const u=w().shape({email:i().email("Email Is Not Valid").required("Email Is Required"),password:i().matches(/^(?=.*[A-Z])[A-Za-z0-9.@*]{6,11}$/,"Password must contain at least one uppercase letter and be between 6 to 11 characters long.").required("Password Is Required")}),r=j({initialValues:{email:"",password:""},validationSchema:u,onSubmit:m});return e.jsxs(e.Fragment,{children:[e.jsx(h,{children:e.jsx("title",{children:"Login "})}),e.jsxs("div",{className:"container mx-auto md:w-1/2",children:[e.jsx("h2",{className:"text-3xl font-bold mb-6 green-color text-center md:text-start 2xl:mt-28",children:"Login Now"}),n&&e.jsx("div",{className:"p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50",role:"alert",children:n}),e.jsxs("form",{onSubmit:r.handleSubmit,children:[e.jsxs("div",{className:"relative z-0 w-3/4 md:w-full mx-auto mb-5 group",children:[e.jsx("input",{onChange:r.handleChange,onBlur:r.handleBlur,value:r.values.email,type:"email",name:"email",id:"userEmail",className:"block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer",placeholder:" "}),e.jsx("label",{htmlFor:"userEmail",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600",children:"Email address"})]}),r.errors.email&&r.touched.email&&e.jsx("div",{className:"p-4 mb-4 text-sm w-3/4 md:w-full mx-auto text-red-800 rounded-lg bg-red-50",role:"alert",children:r.errors.email}),e.jsxs("div",{className:"relative z-0 w-3/4 md:w-full mx-auto mb-5 group",children:[e.jsx("input",{onChange:r.handleChange,onBlur:r.handleBlur,value:r.values.password,type:"password",name:"password",id:"userPassword",className:"block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer",placeholder:" "}),e.jsx("label",{htmlFor:"userPassword",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600",children:"Password"})]}),r.errors.password&&r.touched.password&&e.jsx("div",{className:"p-4 mb-4 text-sm w-3/4 md:w-full mx-auto text-red-800 rounded-lg bg-red-50",role:"alert",children:r.errors.password}),e.jsx("div",{className:"text-center md:text-start",children:e.jsx("button",{type:"submit",className:"btn btn-primary  font-medium rounded-lg text-sm w-3/4 md:w-full mx-auto  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",children:c?e.jsx("i",{className:"fas fa-spinner fa-spin"}):"Login"})}),e.jsx("div",{className:"text-center md:text-start py-2",children:e.jsxs("p",{children:["Don't have an account?",e.jsx("span",{className:"text-xl px-2 cursor-pointer green-color",children:e.jsx(f,{to:"/Register",children:"Register Now"})})]})})]})]})]})}export{k as default};