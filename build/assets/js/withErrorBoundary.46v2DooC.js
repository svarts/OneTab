var i=Object.defineProperty;var u=(t,r,e)=>r in t?i(t,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[r]=e;var o=(t,r,e)=>(u(t,typeof r!="symbol"?r+"":r,e),e);import{j as n,r as a}from"./client.IMDuGZmW.js";function l(t,r){return function(s){return n.jsx(a.Suspense,{fallback:r,children:n.jsx(t,{...s})})}}class c extends a.Component{constructor(){super(...arguments);o(this,"state",{hasError:!1})}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e,s){console.error(e,s)}render(){return this.state.hasError?this.props.fallback:this.props.children}}function d(t,r){return function(s){return n.jsx(c,{fallback:r,children:n.jsx(t,{...s})})}}export{l as a,d as w};
