import{r as n,C as v,u as N,f as S,j as e,H as E,_ as l}from"./index-B8Uf5adZ.js";import{c as P,a as i,u as F}from"./index.esm-C3VSYgkg.js";import O from"./Cart-DqnYa2vK.js";function q(){const f=["Cairo","Alexandria","Giza","Shubra El-Kheima","Port Said","Suez","Mansoura","El-Mahalla El-Kubra","Tanta","Asyut","Fayoum","Zagazig","Ismailia","Kafr El Sheikh","Assuan","Damanhur","Luxor","Qena","Beni Suef","Sohag","Hurghada","Shibin El Kom","Banha","Arish","Mallawi","10th of Ramadan City","6th of October City","Obour City","Sadat City","New Cairo","Sharm El-Sheikh","El Minya","Damietta","Qalyub","Qus","Rosetta","New Valley","Matrouh","North Sinai","South Sinai"],{createOrderForPay:y,cartDataCreateCashOrder:z,cartErrorCreateCashOrder:B}=n.useContext(v),{cartId:c}=N(),[b,d]=n.useState(!1),[s,k]=n.useState(!1),C=S();async function j(){var a,u,h,p,m,x,g;try{let o=`https://ecommerce.routemisr.com/api/v1/orders/${c}`;d(!0),s&&(o=`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${c}?url=https://ahmedelhor7.github.io/FreshCartEcommerce/#`);let t=await y(o,r.values);((a=t==null?void 0:t.data)==null?void 0:a.status)==="success"?(localStorage.removeItem("productIds"),s&&((h=(u=t==null?void 0:t.data)==null?void 0:u.session)!=null&&h.url)?window.location.href=(m=(p=t==null?void 0:t.data)==null?void 0:p.session)==null?void 0:m.url:C("allorders"),l.success("Order created successfully",{duration:5e3,position:window.innerWidth<768?"top-center":"right-top",style:{height:"5rem"}})):l.error(((g=(x=t==null?void 0:t.response)==null?void 0:x.data)==null?void 0:g.message)||"Order creation failed",{duration:5e3,position:window.innerWidth<768?"top-center":"right-top",style:{height:"5rem"}})}catch(o){console.error("Error creating order:",o),l.error("An error occurred while creating the order")}finally{d(!1)}}const w=P().shape({details:i().min(3,"details Atleast 3 Char").max(50,"details Max 50 Char").required("details Is Required"),phone:i().trim().matches(/^01[1250]\d{8}$/,"Must Add Egyptian Number").required("Phone Is Required"),city:i().required("city Is Required")}),r=F({initialValues:{details:"",phone:"",city:""},validationSchema:w,onSubmit:j});return e.jsxs(e.Fragment,{children:[e.jsx(E,{children:e.jsx("title",{children:"Checkout"})}),e.jsxs("div",{className:"container mx-auto py-6",children:[e.jsx("h2",{className:"text-4xl font-bold text-green-600 pb-6 pt-8 2xl:mt-28  text-center",children:"Checkout"}),e.jsxs("form",{onSubmit:r.handleSubmit,children:[e.jsxs("div",{className:"relative z-0 w-2/4 mx-auto pb-4 group",children:[e.jsx("input",{onChange:r.handleChange,onBlur:r.handleBlur,value:r.values.details,type:"text",name:"details",id:"userDetails",className:"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer",placeholder:" "}),e.jsx("label",{htmlFor:"userDetails",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:"details"})]}),r.errors.details&&r.touched.details?e.jsx("div",{className:"mx-auto w-2/4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",role:"alert",children:r.errors.details}):null,e.jsxs("div",{className:"relative z-0 w-2/4 mx-auto pb-4 group",children:[e.jsx("input",{onChange:r.handleChange,onBlur:r.handleBlur,value:r.values.phone,type:"tel",name:"phone",id:"userPhone",className:"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer",placeholder:" "}),e.jsx("label",{htmlFor:"userPhone",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:"Phone"})]}),r.errors.phone&&r.touched.phone?e.jsx("div",{className:"mx-auto w-2/4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",role:"alert",children:r.errors.phone}):null,e.jsxs("div",{className:"relative z-0 w-2/4 mx-auto pb-4 group",children:[e.jsx("input",{list:"egyptianCitiesList",name:"city",id:"userCity",onChange:r.handleChange,onBlur:r.handleBlur,value:r.values.city,className:"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer",placeholder:""}),e.jsx("datalist",{id:"egyptianCitiesList",children:f.map(a=>e.jsx("option",{value:a},a))}),e.jsx("label",{htmlFor:"userCity",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:"city"})]}),r.errors.city&&r.touched.city?e.jsx("div",{className:"mx-auto w-2/4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",role:"alert",children:r.errors.city}):null,e.jsx("div",{className:"flex justify-center items-center py-6 text-2xl font-bold",children:e.jsxs("div",{className:"checkbox-wrapper-19",children:[e.jsx("input",{type:"checkbox",id:"onlinePayment",onChange:()=>k(!s)}),e.jsx("label",{htmlFor:"onlinePayment",className:"check-box"}),e.jsx("span",{className:"ps-2",children:"Online Payment"})]})}),e.jsx("div",{className:"flex justify-center items-center",children:b?e.jsx("i",{className:"fas fa-spinner fa-spin text-3xl text-green-500"}):e.jsx("button",{onClick:O,type:"submit",className:" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm sm:w-1/3 w-2/4 px-10 py-3 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",children:s?e.jsx("span",{children:"Cash Online"}):e.jsx("span",{children:"Cash On Delviry"})})})]})]})]})}export{q as default};
