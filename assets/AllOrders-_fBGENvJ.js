import{r as s,i as h,C as o,j as t,H as m,L as y}from"./index-BXFzO-2a.js";function j(){const{userId:l}=s.useContext(h),{getUserOrders:c,cartDataUpdate:x,cartData:i,setCartItemsNo:d}=s.useContext(o);s.useState(!1),s.useState(!1),s.useState();const[r,n]=s.useState();async function p(e){let a=await c(e);a.statusText==="OK"&&n(a.data)}return s.useEffect(()=>{p(l)},[x]),i.data.numOfCartItems===0&&d(0),t.jsxs(t.Fragment,{children:[t.jsx(m,{children:t.jsx("title",{children:"All Orders"})}),t.jsx("h2",{className:"text-4xl font-bold text-green-600 flex items-center justify-center pb-8  2xl:mt-28",children:"All Orders"}),t.jsx("div",{className:"relative overflow-x-auto",children:t.jsxs("table",{className:"w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center",children:[t.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",children:t.jsxs("tr",{children:[t.jsx("th",{scope:"col",className:"px-6 py-3 text-lg",children:"Counters"}),t.jsx("th",{scope:"col",className:"px-6 py-3 text-lg",children:"Details"}),t.jsx("th",{scope:"col",className:"px-6 py-3 text-lg",children:"Phone"}),t.jsx("th",{scope:"col",className:"px-6 py-3 text-lg",children:"City"}),t.jsx("th",{scope:"col",className:"px-6 py-3 text-lg",children:"Date"}),t.jsx("th",{scope:"col",className:"px-6 py-3 text-lg",children:"Payment Method"}),t.jsx("th",{scope:"col",className:"px-6 py-3 text-lg",children:"Quntity"}),t.jsx("th",{scope:"col",className:"px-6 py-3 text-lg",children:"Total"})]})}),t.jsx("tbody",{className:"font-medium text-gray-900",children:r==null?void 0:r.map((e,a)=>t.jsxs("tr",{className:`border-b dark:border-gray-700 ${a%2===0?"bg-white dark:bg-gray-800":"bg-gray-200 dark:bg-gray-700"}`,children:[t.jsx("th",{scope:"row",className:"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white",children:a+1}),t.jsx("th",{scope:"row",className:"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white",children:e.shippingAddress.details}),t.jsx("td",{className:"px-6 py-4 dark:text-gray-400",children:e.shippingAddress.phone}),t.jsx("td",{className:"px-6 py-4 dark:text-gray-400",children:e.shippingAddress.city}),t.jsx("td",{className:"px-6 py-4 dark:text-gray-400",children:e.createdAt.slice(0,10)}),t.jsx("td",{className:"px-6 py-4 dark:text-gray-400",children:e.paymentMethodType}),t.jsx(y,{to:`/detailsOrders/${l}/${e.id}`,children:t.jsx("td",{title:`You have ${e.cartItems.length} items in your cart. Click To Show.`,className:"px-6 py-4 mt-2 btn btn-primary cursor-pointer",children:e.cartItems.length})}),t.jsx("td",{className:"px-6 py-4 dark:text-gray-400",children:e.totalOrderPrice})]},e.id))})]})})]})}export{j as default};