(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[25],{2557:function(e,t,n){Promise.resolve().then(n.t.bind(n,1164,23)),Promise.resolve().then(n.t.bind(n,5964,23)),Promise.resolve().then(n.bind(n,2298))},2298:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return v}});var s=n(9268),l=n(7736),r=n.n(l),i=n(6006),a=n(851),o=n.n(a),c=n(1164),_=n.n(c),u=n(5964),h=n.n(u);function p(e){let{className:t,children:n,highlit:l=!1}=e;return(0,s.jsx)("div",{className:[h().container,t,l?h().highlit:null].filter(Boolean).join(" "),children:n})}var y=n(1634),d=n.n(y);let f=/\r\n|\r|\n/;function m(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)}let g=(e,t)=>{let n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)};function j(e){let{children:t,language:n,highlight:l}=e,r=t.replace(/\n$|^\n/g,""),i=function(e,t){let n=d().languages[e],s={code:t,grammar:n,language:e,tokens:[]};return d().hooks.run("before-tokenize",s),s.tokens=d().tokenize(t,n),d().hooks.run("after-tokenize",s),function(e){let t=[[]],n=[e],s=[0],l=[e.length],r=0,i=0,a=[],o=[a];for(;i>-1;){for(;(r=s[i]++)<l[i];){let e;let c=t[i],_=n[i],u=_[r];if("string"==typeof u?(c=i>0?c:["plain"],e=u):(c=g(c,u.type),u.alias&&(c=g(c,u.alias)),e=u.content),"string"!=typeof e){i++,t.push(c),n.push(e),s.push(0),l.push(e.length);continue}let h=e.split(f),p=h.length;a.push({types:c,content:h[0]});for(let e=1;e<p;e++)m(a),o.push(a=[]),a.push({types:c,content:h[e]})}i--,t.pop(),n.pop(),s.pop(),l.pop()}return m(a),o}(s.tokens)}(n,r),a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(""===e)return()=>!1;let t=e.split(","),n=t.flatMap(e=>{if(!e.includes("-"))return Number(e);{let[t,n]=e.split("-").map(Number);return Array(n-t+1).fill(0).map((e,n)=>n+t)}});return e=>n.includes(e)}(l);return i.map((e,t)=>(0,s.jsx)("div",{className:[h().line,a(t+1)?h().highlight:""].join(" "),children:e.map((e,t)=>(0,s.jsx)("span",{className:e.types.map(e=>h()[e]).join(" "),children:e.content},t))},t))}async function b(e,t){let n=[];async function s(t){for(var s=arguments.length,l=Array(s>1?s-1:0),r=1;r<s;r++)l[r-1]=arguments[r];n.push(...(await e).exec(t.join("?"),l))}let l=Function("query","return (async () => {".concat(t,"})()"));return await l(s),n}let x="\nreturn query`SELECT * FROM users WHERE col1 = ${1}`;\n".replace(/\n/,"");function v(e){let{database:t}=e,n=function(e){let t=(0,i.useRef)(),n=(0,i.useRef)(o()().then(n=>t.current=new n.Database(e)));return(0,i.useEffect)(()=>()=>{var e;return null===(e=t.current)||void 0===e?void 0:e.close()},[e]),n.current}(t),[l,a]=(0,i.useState)(x),[c,u]=(0,i.useState)([]);return(0,i.useEffect)(()=>{b(n,l).then(e=>{u(e)},()=>{})},[n,l]),(0,s.jsxs)("div",{className:_().card,children:[(0,s.jsx)("h1",{className:_().title,children:"QueryX"}),(0,s.jsxs)("h2",{className:_().tagline,children:["A Javascript tool for composing and",(0,s.jsx)("br",{}),"executing SQL queries"]}),(0,s.jsx)("div",{className:_().editor,children:(0,s.jsx)(p,{className:_().codeContainer,children:(0,s.jsx)(r(),{value:l,onValueChange:a,highlight:e=>(0,s.jsx)(j,{language:"javascript",children:e})})})}),(0,s.jsx)("div",{className:_().results,children:c.map((e,t)=>(0,s.jsx)("table",{children:(0,s.jsxs)("tbody",{children:[(0,s.jsx)("tr",{children:e.columns.map((e,t)=>(0,s.jsx)("th",{children:e},t))}),e.values.map((e,t)=>(0,s.jsx)("tr",{children:e.map((e,t)=>(0,s.jsx)("td",{children:e},t))},t))]})},t))})]})}},5964:function(e){e.exports={container:"styles_container__jy1l_",line:"styles_line__aOS_T",highlit:"styles_highlit__JjWSK",highlight:"styles_highlight__lqo_T",comment:"styles_comment__UauEA",string:"styles_string__bCSta",url:"styles_url__fwX6P",symbol:"styles_symbol__PsLb2",variable:"styles_variable__EFBo4",number:"styles_number__dhAtQ",builtin:"styles_builtin__pNr_d",char:"styles_char__xdODs",constant:"styles_constant__YDnmm",function:"styles_function__1eRN9",tag:"styles_tag__0_sqj",operator:"styles_operator__ty4_w",keyword:"styles_keyword__RcxoL",boolean:"styles_boolean__MSjvs",property:"styles_property__BaBI9",namespace:"styles_namespace__KWXQL"}},1164:function(e){e.exports={container:"styles_container__b_OzL",card:"styles_card__khN6p",title:"styles_title__BniAc",tagline:"styles_tagline__eXVB1",editor:"styles_editor__5E3PQ",codeContainer:"styles_codeContainer__Hr1iB",results:"styles_results__aexEs",aside:"styles_aside__NiM4l"}}},function(e){e.O(0,[65,400,667,488,744],function(){return e(e.s=2557)}),_N_E=e.O()}]);