import{r,j as s,a as n,H as m}from"./index-DUIzB5Hw.js";import{S as a}from"./autoprefixer-Dz05pjL7.js";import{R as c}from"./RecentProducts-EQXlGGSs.js";function d(){var t={dots:!0,infinite:!0,speed:500,slidesToShow:6,slidesToScroll:2,autoplay:!0,arrows:!1,responsive:[{breakpoint:1020,settings:{slidesToShow:4,slidesToScroll:2}},{breakpoint:766,settings:{slidesToShow:4,slidesToScroll:2}},{breakpoint:639,settings:{slidesToShow:1,slidesToScroll:1}}]};const[l,o]=r.useState([]);function i(){n.get("https://ecommerce.routemisr.com/api/v1/categories").then(({data:e})=>{o(e.data)}).catch(e=>{})}return r.useEffect(()=>{i()},[]),s.jsx(s.Fragment,{children:s.jsxs("div",{className:"py-6 px-6 w-5/6 md:w-full container mx-auto text-center",children:[s.jsx("h2",{className:"py-4 text-2xl text-center lg:text-left font-bold",children:"Shop Popubler Categorie"}),s.jsx(a,{...t,children:l==null?void 0:l.map(e=>s.jsxs("div",{className:"text-center transform transition hover:-translate-y-6 duration-300 ",children:[s.jsx("img",{className:"w-full h-60 md:w-4/5 rounded-lg",src:e.image,alt:e==null?void 0:e.name}),s.jsx("h2",{className:"py-4 px-4 text-xl  md:text-left  font-bold",children:e==null?void 0:e.name})]},e==null?void 0:e._id))})]})})}const x="/FreshCartEcommerce/assets/slider-image-1-Dh9d2U6G-Dh9d2U6G.jpeg",h="/FreshCartEcommerce/assets/slider-image-2-Xt88XJy9-Xt88XJy9.jpeg",u="/FreshCartEcommerce/assets/slider-image-3-BtMvVf4V-BtMvVf4V.jpeg";function p(){var t={dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,autoplay:!0,arrows:!1};return s.jsx(s.Fragment,{children:s.jsx("div",{className:"w-5/6 md:w-full container mx-auto pt-0 2xl:pt-28",children:s.jsxs(a,{...t,children:[s.jsx("img",{loading:"lazy",src:x,alt:"Fresh Vegetables",className:"w-full sm:h-[15rem] md:h-[35rem]"}),s.jsx("img",{loading:"lazy",src:h,alt:"Chocolate",className:"w-full sm:h-[15rem] md:h-[35rem]"}),s.jsx("img",{loading:"lazy",src:u,alt:"cookies",className:"w-full sm:h-[15rem] md:h-[35rem]"})]})})})}function w(){return s.jsxs(s.Fragment,{children:[s.jsx(m,{children:s.jsx("title",{children:"Home"})}),s.jsx(p,{}),s.jsx(d,{}),s.jsx(c,{})]})}export{w as default};
