(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[25],{2906:function(e,t,n){Promise.resolve().then(n.t.bind(n,1164,23)),Promise.resolve().then(n.bind(n,3030)),Promise.resolve().then(n.bind(n,5921)),Promise.resolve().then(n.t.bind(n,5964,23))},9896:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(9268),s=n(5964),i=n.n(s);function a(e){let{children:t,highlit:n=!1}=e;return(0,r.jsx)("div",{className:[i().container,n?i().highlit:null].filter(Boolean).join(" "),children:t})}},8531:function(e,t,n){"use strict";n.d(t,{Z:function(){return u}});var r=n(9268),s=n(1634),i=n.n(s),a=n(5964),l=n.n(a);let o=/\r\n|\r|\n/;function c(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)}let d=(e,t)=>{let n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)};function u(e){let{children:t,language:n,highlight:s}=e,a=t.replace(/\n$|^\n/g,""),u=function(e,t){let n=i().languages[e],r={code:t,grammar:n,language:e,tokens:[]};return i().hooks.run("before-tokenize",r),r.tokens=i().tokenize(t,n),i().hooks.run("after-tokenize",r),function(e){let t=[[]],n=[e],r=[0],s=[e.length],i=0,a=0,l=[],u=[l];for(;a>-1;){for(;(i=r[a]++)<s[a];){let e;let h=t[a],p=n[a],y=p[i];if("string"==typeof y?(h=a>0?h:["plain"],e=y):(h=d(h,y.type),y.alias&&(h=d(h,y.alias)),e=y.content),"string"!=typeof e){a++,t.push(h),n.push(e),r.push(0),s.push(e.length);continue}let f=e.split(o),m=f.length;l.push({types:h,content:f[0]});for(let e=1;e<m;e++)c(l),u.push(l=[]),l.push({types:h,content:f[e]})}a--,t.pop(),n.pop(),r.pop(),s.pop()}return c(l),u}(r.tokens)}(n,a),h=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(""===e)return()=>!1;let t=e.split(","),n=t.flatMap(e=>{if(!e.includes("-"))return Number(e);{let[t,n]=e.split("-").map(Number);return Array(n-t+1).fill(0).map((e,n)=>n+t)}});return e=>n.includes(e)}(s);return u.map((e,t)=>(0,r.jsx)("div",{className:[l().line,h(t+1)?l().highlight:""].join(" "),children:e.map((e,t)=>(0,r.jsx)("span",{className:e.types.map(e=>l()[e]).join(" "),children:e.content},t))},t))}},5921:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return I}});var r,s=n(9268),i=n(6006),a=n(5644),l=n.n(a),o=n(7266),c=n.n(o);function d(e){let{results:t}=e;return(0,s.jsx)("div",{className:c().results,children:(0,s.jsx)("table",{children:(0,s.jsxs)("tbody",{children:[(0,s.jsx)("tr",{children:t.columns.map((e,t)=>(0,s.jsx)("th",{children:e},t))}),t.values.map((e,t)=>(0,s.jsx)("tr",{children:e.map((e,t)=>(0,s.jsx)("td",{children:e},t))},t))]})})})}var u=n(7736),h=n.n(u),p=n(481),y=n.n(p),f=n(9896),m=n(8531);function _(e){let{code:t,setCode:n}=e;return(0,s.jsx)("div",{className:y().editor,children:(0,s.jsx)(f.Z,{children:(0,s.jsx)(h(),{value:t,onValueChange:n,highlight:e=>(0,s.jsx)(m.Z,{language:"javascript",children:e}),className:y().textarea})})})}let g=Symbol();async function x(e){let t=[];for await(let n of e)t.push(n);return t}function*j(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];let[r,s]=t;yield{type:"part",value:r[0]};for(let e=0;e<s.length;e++){let t=s[e];t&&"object"==typeof t&&g in t?yield*j(...t[g]()):yield{type:"bind",value:t},yield{type:"part",value:r[e+1]}}}let b=(r=async function*(){},function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),s=1;s<t;s++)n[s-1]=arguments[s];let i=Array.from(function*(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];let r="";for(let{type:e,value:n}of j(...t))"bind"===e?(yield r,r=""):r+=n;yield r}(e,n)),a=Array.from(function*(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];for(let{type:e,value:n}of j(...t))"bind"===e&&(yield n)}(e,n));return{[g]:()=>[i,a],then(e,t){return x(this).then(e,t)},[Symbol.asyncIterator]:()=>r(i,a)}});function v(e){let t,n,{type:r,value:i}=e;switch(n=i instanceof Error?i.name+": "+i.message:JSON.stringify(i),r){case"js_error":t="Javasript Error";break;case"sql_error":t="SQL Error";break;case"return_error":n="Return a query to see the results"}return(0,s.jsx)("div",{className:l().errorContainer,children:(0,s.jsxs)("div",{className:l().error,children:[t&&(0,s.jsx)("div",{className:l().errorTitle,children:t}),n]})})}function w(){let e="–\\|/",[t,n]=(0,i.useState)(0);return(0,i.useEffect)(()=>{let t=setInterval(()=>{n(t=>(t+1)%e.length)},150);return()=>clearInterval(t)}),e[t]}function q(e){let t,n,{load:r,database:i,setLoad:a}=e;return r&&i?t="✔":r&&!i?(t=(0,s.jsx)(w,{}),n="Loading"):(t=">",n="Load Live Demo"),(0,s.jsx)("button",{onClick:()=>a(!0),disabled:r,className:l().loadContainer,...i&&{"data-database":!0},children:(0,s.jsxs)("div",{className:l().loadButton,children:[(0,s.jsx)("span",{className:l().loadButtonIcon,children:t})," ",n]})})}async function E(e){let t=await n.e(65).then(n.t.bind(n,851,23));e.throwIfAborted();let{Database:r}=await t.default();return r}async function N(e){let t=await fetch("/query/database",{signal:e});e.throwIfAborted();let n=await t.arrayBuffer();return new Uint8Array(n)}async function S(e){let[t,n]=await Promise.all([E(e),N(e)]);e.throwIfAborted();let r=new t(n);return e.addEventListener("abort",()=>r.close()),r}function I(e){let{initialResults:t,initialCode:n}=e,[r,a]=(0,i.useState)(!1),o=function(e){let[t,n]=(0,i.useState)();return(0,i.useEffect)(()=>{if(!e)return;let t=new AbortController;return(async()=>{try{let e=await S(t.signal);t.signal.throwIfAborted(),n(e)}catch(e){}})(),()=>t.abort()},[e]),t}(r),[c,u]=(0,i.useState)(n),[h,p]=(0,i.useState)(t),[y,f]=(0,i.useState)({type:"result",value:t});return(0,i.useEffect)(()=>{if(!o)return;let e=function(e,t){try{let n=Function("query",t),r=n(b);if(!r||"object"!=typeof r||!(g in r))return{type:"return_error",value:r};{let[t,n]=r[g]();try{let r=e.exec(t.join("?"),n)[0];if(!r)return{type:"sql_error",value:Error("No results")};return{type:"result",value:r}}catch(e){return{type:"sql_error",value:e}}}}catch(e){return{type:"js_error",value:e}}}(o,c);f(e),"result"===e.type&&p(e.value)},[o,c]),(0,s.jsx)("section",{id:"Demo",className:l().container,children:(0,s.jsxs)("div",{className:l().card,children:[(0,s.jsxs)("div",{className:l().side,children:[(0,s.jsx)("h1",{className:l().title,children:"QueryX"}),(0,s.jsx)("h2",{className:l().tagline,children:"A Javascript tool for composing and executing SQL queries"})]}),(0,s.jsxs)("div",{className:l().main,children:[(0,s.jsxs)("div",{className:l().editor,children:[(0,s.jsx)(_,{code:c,setCode:u}),(0,s.jsx)(q,{load:r,database:!!o,setLoad:a})]}),(0,s.jsxs)("div",{className:l().results,children:["result"!==y.type&&(0,s.jsx)(v,{...y}),(0,s.jsx)(d,{results:h})]})]})]})})}},3030:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return P}});var r={};n.r(r),n.d(r,{default:function(){return _},title:function(){return m}});var s={};n.r(s),n.d(s,{default:function(){return v},title:function(){return b}});var i={};n.r(i),n.d(i,{default:function(){return q},title:function(){return w}});var a={};n.r(a),n.d(a,{default:function(){return N},title:function(){return E}});var l={};n.r(l),n.d(l,{default:function(){return I},title:function(){return S}});var o={};n.r(o),n.d(o,{default:function(){return C},title:function(){return k}});var c={};n.r(c),n.d(c,{default:function(){return Q},title:function(){return R}});var d=n(9268),u=n(5111),h=n.n(u),p=n(6006),y=n(1164),f=n.n(y);let m="Background";var _=(0,d.jsxs)("section",{id:encodeURIComponent(m),children:[(0,d.jsx)("h2",{children:m}),(0,d.jsxs)("p",{children:["Writing SQL queries is often an inevitable part of software development. SQL is either written by hand or with the help of query builders. Query builders, such as"," ",(0,d.jsx)("a",{href:"https://guides.rubyonrails.org/active_record_basics.html",children:"ActiveRecord"})," ","or ",(0,d.jsx)("a",{href:"https://knexjs.org/guide/query-builder.html#knex",children:"Knex"}),", are tools that help to create queries through an API native to the programming language you're executing the queries from."]})]}),g=n(9896),x=n(8531);function j(e){return(0,d.jsx)(g.Z,{highlit:!!e.highlight,children:(0,d.jsx)(x.Z,{...e})})}let b="Motivation";var v=(0,d.jsxs)("section",{id:encodeURIComponent(b),children:[(0,d.jsx)("h2",{children:b}),(0,d.jsx)("p",{children:"Query builders can be very useful when writing simple queries:"}),(0,d.jsx)("div",{className:f().p,children:(0,d.jsx)(j,{language:"javascript",children:"\nknex('posts').where('category_id', 42).orderBy('created_at');\n"})}),(0,d.jsx)("p",{children:"However, this approach does have some downsides:"}),(0,d.jsxs)("ul",{children:[(0,d.jsx)("li",{children:"Every query feature in your target database needs a corresponding query builder API. The effort to develop, maintain, and learn how to use the query builder is coupled with how many features you want to use."}),(0,d.jsx)("li",{children:"SQL is a standardized, widely-used language that enables developers to share their ability to query databases across projects and teams. The benefits of the widespread familiarity with SQL is lost when each query builder has a unique API."})]})]});let w="Experimentation";var q=(0,d.jsxs)("section",{id:encodeURIComponent(w),children:[(0,d.jsx)("h2",{children:w}),(0,d.jsx)("p",{children:"Writing queries by hand with strings and variable interpolation is not the answer either because of the need to mitigate SQL injestion and correctly serialize the variables."}),(0,d.jsx)("div",{className:f().p,children:(0,d.jsx)(j,{language:"javascript",children:"\n// This is susceptible to SQL injection and wouldn't\n// correctly interpolate string literals.\nconnection.execute(`SELECT * FROM users WHERE id = ${id}`);\n"})}),(0,d.jsx)("p",{children:"Javascript does have a language feature that helps these solves issues. Tagged template literals:"}),(0,d.jsx)("div",{className:f().p,children:(0,d.jsx)(j,{language:"javascript",children:'\nquery`SELECT * FROM users WHERE id = ${id} `;\n// is equivalent to\nquery(["SELECT * FROM users WHERE id = ", ""], [id]);\n'})}),(0,d.jsx)("p",{children:"I wanted to create an interface for writing SQL to work like it was part of the source code instead of just a string parameter. Similar to JSX where building html elements is baked into the language for better ergonomics. The end goal was something like this:"}),(0,d.jsx)("div",{className:f().p,children:(0,d.jsx)(j,{language:"javascript",children:"\nconst [result] = await query`SELECT * FROM users WHERE id = ${id}`;\n"})})]});let E="Implementation";var N=(0,d.jsxs)("section",{id:encodeURIComponent(E),children:[(0,d.jsx)("h2",{children:E}),(0,d.jsxs)("p",{children:["My first step was creating something like"," ",(0,d.jsx)("a",{href:"https://github.com/blakeembrey/sql-template-tag",children:"sql-template-tag"})," ","using"," ",(0,d.jsx)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates",children:"tagged template literals"}),". This single line function already completed about 80% of the API."]}),(0,d.jsx)("div",{className:f().p,children:(0,d.jsx)(j,{language:"javascript",children:'\nfunction query(parts, ...binds) {\n  return connection.execute({ sql: parts.join("$"), binds });\n}\n\nconst [result] = await query`SELECT * FROM users WHERE id = ${id}`;\n'})}),(0,d.jsxs)("p",{children:["The first thing I needed to fix was that a query would execute immediately, right when it was defined. It would be better if it would run only when ",(0,d.jsx)("code",{children:"await"}),'ed. This can be accomplished with "lazy" promises by creating an object with a ',(0,d.jsx)("code",{children:"then"})," ","method."]}),(0,d.jsx)("div",{className:f().p,children:(0,d.jsx)(j,{language:"javascript",highlight:"2-3,6-7",children:'\nfunction query(parts, ...binds) {\n  return {\n    then(...args) {\n      return connection\n        .execute({ sql: parts.join("$"), binds })\n        .then(...args);\n    }\n'})}),(0,d.jsx)("p",{children:"I wanted this tool to be database agnostic so I extracted the execution logic:"}),(0,d.jsx)("div",{className:f().p,children:(0,d.jsx)(j,{language:"javascript",highlight:"1,4,9-11",children:'\nconst makeQuery = execute => function query(parts, ...binds) {\n  return {\n    then(...args) {\n      return execute(parts, binds).then(...args);\n    },\n  }\n}\n\nconst query = makeQuery((parts, binds) =>\n  connection.execute({ sql: parts.join("$"), binds }),\n)\n'})})]});let S="Query Composition";var I=(0,d.jsxs)("section",{id:encodeURIComponent(S),children:[(0,d.jsx)("h2",{children:S}),(0,d.jsx)("p",{children:"There was a key feature that was missing: query composition. So far, the helper supported interpolating variables, but not other subqueries themselves."}),(0,d.jsx)("div",{className:f().p,children:(0,d.jsx)(j,{language:"javascript",children:"\n// Not (yet) supported\nconst lastDay = query`created_at > current_timestamp() - interval '1' day`;\nconst results = await query`SELECT * FROM ads WHERE ${lastDay}`;\n"})}),(0,d.jsx)("p",{children:"Nested queries were more difficult to support. There were two things that needed to be done to support them: determine a nested query from a variable bind and unnesting the nested queries."}),(0,d.jsxs)("p",{children:["We can determine a query from other types with a Javascript idiom where we use a ",(0,d.jsx)("code",{children:"Symbol"})," to allow conversion of a value into another type. This pattern is used by Javascript to implement iteration via"," ",(0,d.jsx)("code",{children:"Symbol.iterator"}),"."]}),(0,d.jsx)("div",{className:f().p,children:(0,d.jsx)(j,{language:"javascript",highlight:"1,5-7",children:"\nconst toQuery = new Symbol();\n\nconst makeQuery = execute => function query(parts, ...binds) {\n  return {\n    [toQuery]() {\n      return [parts, binds];\n    },\n    then(...args) {\n"})}),(0,d.jsx)("p",{children:"To unnest the nested query, we have to iterate over the static parts of the query and the binds. In addition to flattening the top level and nested parts and binds, the first and last parts of each nested query must be concatenated to the surrounding parts in the top level query."}),(0,d.jsx)("div",{className:f().p,children:(0,d.jsx)(j,{language:"javascript",highlight:"3-19,22",children:'\nconst toQuery = new Symbol();\n\nfunction compile([firstPart, ...nestedParts], nestedBinds) {\n  const parts = [firstPart];\n  const binds = [];\n  nestedBinds.forEach((bind, index) => {\n    if (bind && typeof bind === "object" && toQuery in bind) {\n      const [nestedParts, nestedBinds] = bind[toQuery]();\n      parts[parts.length - 1] += nestedParts[0];\n      parts.push(...nestedParts.slice(1));\n      parts[parts.length - 1] += nestedParts[index];\n      binds.push(...nestedBinds);\n    } else {\n      parts.push(nestedParts[index]);\n      binds.push(bind);\n    }\n  });\n  return [parts, binds];\n}\n\nconst makeQuery = execute => function query(inParts, ...inBinds) {\n  const [parts, binds] = compile(inParts, inBinds);\n  return {\n'})})]});let k="Async Iteration";var C=(0,d.jsxs)("section",{id:encodeURIComponent(k),children:[(0,d.jsx)("h2",{children:k}),(0,d.jsx)("p",{children:"One final feature I wanted to add as a performance optimization was async iteration. When I was developing this tool, I was loading a lot of data from the database during jobs, but only needed one record at a time."}),(0,d.jsx)("div",{className:f().p,children:(0,d.jsx)(j,{language:"javascript",highlight:"1-5,13,15-17",children:"\nasync function collect(iterator) {\n  const arr = [];\n  for await (const item of iterator) arr.push(item);\n  return arr;\n}\n\nconst makeQuery = execute => function query(parts, ...binds) {\n  return {\n    [toQuery]() {\n      return [parts, binds];\n    },\n    then(...args) {\n      return collect(this).then(...args);\n    },\n    [Symbol.asyncIterator]() {\n      return execute(parts, binds);\n    },\n  }\n}\n"})}),(0,d.jsx)("p",{children:"This also requires a change to the execute function as well, which will depend greatly on the database library."}),(0,d.jsx)("div",{className:f().p,children:(0,d.jsx)(j,{language:"javascript",children:'\nconst query = makeQuery((parts, binds) => {\n  const result = connection.execute({ sql: parts.join("$"), binds });\n  return result.streamRows();\n})\n'})})]});let R="Conclusion";var Q=(0,d.jsxs)("section",{id:encodeURIComponent(R),children:[(0,d.jsx)("h2",{children:R}),(0,d.jsx)("p",{children:"This tool can be a great help for certain scenarios, particularly those that are using complex SQL queries, probably doing some kind of data analysis. But for more typical transactional workflows, query builders or even an ORM can better suited to the task."})]});let L=[r,s,i,a,l,o,c],T=[{title:"Demo"},...L];function P(){let[e,t]=(0,p.useState)(T[0].title);return(0,p.useEffect)(()=>{let e=new IntersectionObserver(e=>{let n=e.filter(e=>e.isIntersecting),r=h()(n,e=>e.intersectionRect.top);r&&t(r.target.id)},{rootMargin:"0 0 -90% 0"});for(let{title:t}of T){let n=document.getElementById(encodeURIComponent(t));n&&e.observe(n)}return()=>e.disconnect()},[]),T.map(t=>(0,d.jsx)("li",{children:(0,d.jsx)("a",{href:"#"+encodeURIComponent(t.title),className:e===encodeURIComponent(t.title)?f().intersect:void 0,children:t.title})},t.title))}},5964:function(e){e.exports={container:"styles_container__jy1l_",highlit:"styles_highlit__JjWSK",line:"styles_line__aOS_T",highlight:"styles_highlight__lqo_T",comment:"styles_comment__UauEA",string:"styles_string__bCSta",url:"styles_url__fwX6P",symbol:"styles_symbol__PsLb2",variable:"styles_variable__EFBo4",number:"styles_number__dhAtQ",builtin:"styles_builtin__pNr_d",char:"styles_char__xdODs",constant:"styles_constant__YDnmm",function:"styles_function__1eRN9",tag:"styles_tag__0_sqj",operator:"styles_operator__ty4_w",keyword:"styles_keyword__RcxoL",boolean:"styles_boolean__MSjvs",property:"styles_property__BaBI9",namespace:"styles_namespace__KWXQL"}},5644:function(e){e.exports={container:"styles_container__S0Ptr",card:"styles_card__xSmZP",side:"styles_side__fA9nv",main:"styles_main__JNmlP",title:"styles_title__wEJ_p",tagline:"styles_tagline__yu5i4",editor:"styles_editor__vc_fu",loadContainer:"styles_loadContainer__E8vLy",loadButton:"styles_loadButton__PL_ls",loadButtonIcon:"styles_loadButtonIcon__Y7jwQ",results:"styles_results__IX3in",errorContainer:"styles_errorContainer__FOFAe",error:"styles_error__zyKBC",errorTitle:"styles_errorTitle__ERCCx"}},481:function(e){e.exports={editor:"styles_editor__E3lMc",textarea:"styles_textarea__v6lSi"}},7266:function(e){e.exports={results:"styles_results__EXQ9C"}},1164:function(e){e.exports={root:"styles_root__FGv06",container:"styles_container__b_OzL",content:"styles_content__hvl__",toc:"styles_toc__bIATy",intersect:"styles_intersect__XwP0Z",p:"styles_p__HqdKC"}}},function(e){e.O(0,[391,667,488,744],function(){return e(e.s=2906)}),_N_E=e.O()}]);