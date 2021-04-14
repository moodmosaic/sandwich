(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{79:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return a})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return c}));var i=n(3),r=(n(0),n(98));const o={id:"node_options",title:"Node Options",sidebar_label:"Node Options"},a={unversionedId:"node_options",id:"node_options",isDocsHomePage:!1,title:"Node Options",description:"Introduction",source:"@site/docs/node_options.md",slug:"/node_options",permalink:"/sandwich/docs/node_options",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/node_options.md",version:"current",sidebar_label:"Node Options",sidebar:"docs",previous:{title:"Contexts",permalink:"/sandwich/docs/contexts"},next:{title:"Timing",permalink:"/sandwich/docs/timing"}},l=[{value:"Introduction",id:"introduction",children:[]},{value:"Visibility thresholds",id:"visibility-thresholds",children:[]},{value:"Folder creation",id:"folder-creation",children:[]}],s={toc:l};function c({components:e,...t}){return Object(r.b)("wrapper",Object(i.a)({},s,t,{components:e,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"introduction"},"Introduction"),Object(r.b)("p",null,"The basic functions like ",Object(r.b)("inlineCode",{parentName:"p"},"describe"),", ",Object(r.b)("inlineCode",{parentName:"p"},"it"),", etc. are aliases to lower-level functions called ",Object(r.b)("inlineCode",{parentName:"p"},"describe'"),", ",Object(r.b)("inlineCode",{parentName:"p"},"it'"),", etc. The lower-level versions accept ",Object(r.b)("strong",{parentName:"p"},"node options")," which you can use to fine-tune how each node behaves."),Object(r.b)("h2",{id:"visibility-thresholds"},"Visibility thresholds"),Object(r.b)("p",null,'In a given test tree, some nodes are usually more "interesting" for reporting purposes than others. Nodes like ',Object(r.b)("inlineCode",{parentName:"p"},"before")," and ",Object(r.b)("inlineCode",{parentName:"p"},"parallel")," are more about controlling setup and semantics, so you may not care about them as much as ",Object(r.b)("inlineCode",{parentName:"p"},"describe")," and ",Object(r.b)("inlineCode",{parentName:"p"},"it")," nodes. (Which is not to say these nodes are never interesting; if a ",Object(r.b)("inlineCode",{parentName:"p"},"before")," node throws an exception, you still want the ability to examine it.)"),Object(r.b)("p",null,"For example, consider some tests that initialize a server and a database, then run some tests in parallel. Which of the following failure reports is more useful?"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},'before (set up server), before (initialize database), describe "server database", parallel, it "tests table 1"'),Object(r.b)("li",{parentName:"ul"},'describe "server database tests", it "tests table 1"')),Object(r.b)("p",null,"The latter makes it easier to quickly pick out which test failed."),Object(r.b)("p",null,"To allow this kind of filtering, every test node has a number associated with it called its ",Object(r.b)("em",{parentName:"p"},"visibility threshold"),". This is a number from ",Object(r.b)("inlineCode",{parentName:"p"},"0")," to ",Object(r.b)("inlineCode",{parentName:"p"},"Infinity"),' representing the visual "priority" of a node. Sandwich formatters are designed so that you can set or toggle a threshold such that only nodes whose value falls under the threshold are displayed. This gives us the ability to have deeply nested and complex test trees, but prune away the complexity when desired.'),Object(r.b)("p",null,"The default visibility thresholds for each node is as follows:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"0"),": ",Object(r.b)("inlineCode",{parentName:"li"},"it")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"50"),": ",Object(r.b)("inlineCode",{parentName:"li"},"describe")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"70"),": ",Object(r.b)("inlineCode",{parentName:"li"},"parallel")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"100"),": ",Object(r.b)("inlineCode",{parentName:"li"},"introduce"),", ",Object(r.b)("inlineCode",{parentName:"li"},"before"),", ",Object(r.b)("inlineCode",{parentName:"li"},"after"),", ",Object(r.b)("inlineCode",{parentName:"li"},"around")," (and their ",Object(r.b)("inlineCode",{parentName:"li"},"*each")," and ",Object(r.b)("inlineCode",{parentName:"li"},"*with")," versions)")),Object(r.b)("p",null,"If you want to set ",Object(r.b)("em",{parentName:"p"},"custom")," visibility thresholds, you can use the primed versions of the node functions to do it. For example:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-haskell"},"-- | A version of 'before' that has a lower visibility threshold\nmyBefore = before' (defaultNodeOptions { nodeOptionsVisibilityThreshold = 50 })\n")),Object(r.b)("h2",{id:"folder-creation"},"Folder creation"),Object(r.b)("p",null,"By default, every node in the test tree will get an associated folder in the ",Object(r.b)("a",{parentName:"p",href:"/docs#on-disk-results"},"on-disk results"),"."))}c.isMDXComponent=!0},98:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return m}));var i=n(0),r=n.n(i);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),b=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=b(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,a=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=b(n),u=i,m=d["".concat(a,".").concat(u)]||d[u]||p[u]||o;return n?r.a.createElement(m,l(l({ref:t},c),{},{components:n})):r.a.createElement(m,l({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var c=2;c<o;c++)a[c]=n[c];return r.a.createElement.apply(null,a)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);