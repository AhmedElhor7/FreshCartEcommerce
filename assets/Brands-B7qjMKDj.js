import{r as t,B as m,j as e,H as h}from"./index-B0C_tlBL.js";function u(){const[l,n]=t.useState(!1),[a,i]=t.useState(null),d=s=>{n(!l),i(s)},{getAllBrands:o}=t.useContext(m),[r,c]=t.useState();async function x(){let s=await o();s.statusText==="OK"&&c(s.data.data)}return t.useEffect(()=>{x()},[]),e.jsxs(e.Fragment,{children:[e.jsx(h,{children:e.jsx("title",{children:"Brands"})}),e.jsx("h2",{className:"text-4xl font-bold text-green-600 flex items-center justify-center pb-2  2xl:mt-28",children:"Brands"}),e.jsxs("div",{className:"container mx-auto py-2",children:[e.jsx("div",{className:"row",children:r==null?void 0:r.map(s=>e.jsx("div",{className:"xl:w-1/4 md:w-1/2 w-full p-4",children:e.jsxs("div",{onClick:()=>d(s),className:" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl hover:shadow-green-500 cursor-pointer",children:[e.jsx("div",{children:e.jsx("img",{loading:"lazy",className:"rounded-t-lg w-full",src:s.image,alt:s.name})}),e.jsx("div",{className:"p-5",children:e.jsx("p",{className:"mb-3 font-bold text-2xl text-gray-700 dark:text-gray-400",children:s.name})})]})},s._id))}),l&&a&&e.jsx("div",{id:"showModal",tabIndex:-1,"aria-hidden":"true",className:"fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50",children:e.jsx("div",{className:"relative p-4 w-full max-w-2xl max-h-full",children:e.jsxs("div",{className:"relative bg-white rounded-lg shadow dark:bg-gray-700",children:[e.jsxs("div",{className:"flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-900 dark:text-white",children:a.name}),e.jsxs("button",{onClick:d,className:"text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white",children:[e.jsx("svg",{className:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14",children:e.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})}),e.jsx("span",{className:"sr-only",children:"Close modal"})]})]}),e.jsx("div",{className:"p-4 md:p-5 space-y-4",children:e.jsx("img",{src:a.image,alt:a.name,className:"w-full rounded-lg"})})]})})})]})]})}export{u as default};
