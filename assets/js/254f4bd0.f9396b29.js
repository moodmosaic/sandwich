(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{102:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return b}));var r=n(0),o=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),u=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=u(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},h=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=u(n),h=r,b=p["".concat(a,".").concat(h)]||p[h]||d[h]||i;return n?o.a.createElement(b,s(s({ref:t},l),{},{components:n})):o.a.createElement(b,s({ref:t},l))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=h;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var l=2;l<i;l++)a[l]=n[l];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},103:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return a}));var r=n(16),o=n(105);function i(){const{siteConfig:{baseUrl:e="/",url:t}={}}=Object(r.default)();return{withBaseUrl:(n,r)=>function(e,t,n,{forcePrependBaseUrl:r=!1,absolute:i=!1}={}){if(!n)return n;if(n.startsWith("#"))return n;if(Object(o.b)(n))return n;if(r)return t+n;const a=n.startsWith(t)?n:t+n.replace(/^\//,"");return i?e+a:a}(t,e,n,r)}}function a(e,t={}){const{withBaseUrl:n}=i();return n(e,t)}},105:function(e,t,n){"use strict";function r(e){return!0===/^(\w*:|\/\/)/.test(e)}function o(e){return void 0!==e&&!r(e)}n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return o}))},78:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return p}));var r=n(3),o=n(7),i=(n(0),n(102)),a=n(103),s={id:"tui",title:"Terminal UI Formatter"},c={unversionedId:"formatters/tui",id:"formatters/tui",isDocsHomePage:!1,title:"Terminal UI Formatter",description:"The terminal UI formatter is one of the key features of Sandwich. It uses the awesome Brick library to make an interactive UI for running (or re-running! ) tests and inspecting their results.",source:"@site/docs/formatters/tui.md",slug:"/formatters/tui",permalink:"/sandwich/docs/formatters/tui",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/formatters/tui.md",version:"current",sidebar:"docs",previous:{title:"Test Discovery",permalink:"/sandwich/docs/discovery"},next:{title:"Print Formatter",permalink:"/sandwich/docs/formatters/print"}},l=[{value:"Usage",id:"usage",children:[]},{value:"About the UI",id:"about-the-ui",children:[]},{value:"Opening nodes in your file explorer",id:"opening-nodes-in-your-file-explorer",children:[]},{value:"Jumping to tests, logs, and failures in your editor",id:"jumping-to-tests-logs-and-failures-in-your-editor",children:[]},{value:"Configuration",id:"configuration",children:[]},{value:"Custom exception formatters",id:"custom-exception-formatters",children:[]}],u={toc:l};function p(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"The terminal UI formatter is one of the key features of Sandwich. It uses the awesome ",Object(i.b)("a",{parentName:"p",href:"https://hackage.haskell.org/package/brick"},"Brick")," library to make an interactive UI for running (or re-running! ) tests and inspecting their results."),Object(i.b)("h2",{id:"usage"},"Usage"),Object(i.b)("p",null,"If you're using ",Object(i.b)("a",{parentName:"p",href:"http://hackage.haskell.org/package/sandwich/docs/Test-Sandwich.html#v:runSandwichWithCommandLineArgs"},"runSandwichWithCommandLineArgs"),", you can simply pass ",Object(i.b)("inlineCode",{parentName:"p"},"--tui")," and the terminal UI formatter will be selected."),Object(i.b)("p",null,"If you're using the lower-level ",Object(i.b)("a",{parentName:"p",href:"http://hackage.haskell.org/package/sandwich0.1.0.3/docs/Test-Sandwich.html#v:runSandwich"},"runSandwich"),", simply include the formatter in the ",Object(i.b)("a",{parentName:"p",href:"http://hackage.haskell.org/package/sandwich/docs/Test-Sandwich-Options.html#v:optionsFormatters"},"optionsFormatters")," of your sandwich options."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-haskell"},"import Test.Sandwich.Formatters.TerminalUI\n\nmain :: IO ()\nmain = runSandwich options myTests\n  where\n    options = defaultOptions {\n      optionsFormatters = [SomeFormatter defaultTerminalUIFormatter]\n      }\n")),Object(i.b)("h2",{id:"about-the-ui"},"About the UI"),Object(i.b)("p",null,"Most of the hotkeys are documented at the top of the UI and should be self-explanatory. The UI shows the state of the entire test tree, with each entry color-coded by its status (not started, pending, running, failed, or succeeded). You can use the arrow keys to scroll up and down through the focused nodes."),Object(i.b)("p",null,"Each node of the test tree can be ",Object(i.b)("strong",{parentName:"p"},"opened/closed"),' by pressing enter or tab. Opening a node shows details about what happened when it was executed. In the picture below, the "adding one" node is opened, allowing the test failure to be examined.'),Object(i.b)("p",null,"Once a node is open, its contents can be ",Object(i.b)("strong",{parentName:"p"},"scrolled")," up and down by pressing ",Object(i.b)("inlineCode",{parentName:"p"},"Control-v"),"/",Object(i.b)("inlineCode",{parentName:"p"},"Meta-v"),". This allows you to page through failure results and logs."),Object(i.b)("p",null,"Each node can also be ",Object(i.b)("strong",{parentName:"p"},"folded/unfolded")," by pressing the left and right arrows. This is like folding a tree in your file manager; if a node is folded then its children will be hidden."),Object(i.b)("p",null,"The tree is pruned by ",Object(i.b)("a",{parentName:"p",href:"../node_options#visibility-thresholds"},"visibility threshold"),". If you press the ",Object(i.b)("inlineCode",{parentName:"p"},"v"),' button, it will cycle through different thresholds so you can show or hide the "less important" nodes.'),Object(i.b)("img",{alt:"Terminal UI",src:Object(a.a)("img/tui.png")}),Object(i.b)("p",null,"One less-obvious cool feature is that the colored bar at the bottom can be clicked. If you see a red patch and click on it, the UI will jump to the failure(s) corresponding to that point in the tree."),Object(i.b)("h2",{id:"opening-nodes-in-your-file-explorer"},"Opening nodes in your file explorer"),Object(i.b)("p",null,"Pressing the ",Object(i.b)("inlineCode",{parentName:"p"},"o")," key will open the currently focused node's ",Object(i.b)("a",{parentName:"p",href:"../node_options#folders"},"folder")," in your file explorer. Pressing ",Object(i.b)("inlineCode",{parentName:"p"},"O")," will open the test tree's root folder."),Object(i.b)("h2",{id:"jumping-to-tests-logs-and-failures-in-your-editor"},"Jumping to tests, logs, and failures in your editor"),Object(i.b)("p",null,"If you configure your editor in the ",Object(i.b)("inlineCode",{parentName:"p"},"EDITOR")," environment variable, the UI can jump directly to the test, logs, or failure location corresponding to the focused node. There are a couple tricks to set this up."),Object(i.b)("p",null,"When invoking the ",Object(i.b)("inlineCode",{parentName:"p"},"EDITOR")," command, the strings ",Object(i.b)("inlineCode",{parentName:"p"},"FILE"),", ",Object(i.b)("inlineCode",{parentName:"p"},"LINE"),", and ",Object(i.b)("inlineCode",{parentName:"p"},"COLUMN")," will be replaced with the desired file, line number, and column number respectively. This helps you write custom commands to jump directly to the right location. If the ",Object(i.b)("inlineCode",{parentName:"p"},"EDITOR"),' command doesn\'t contain the string "FILE", the filename will be appended to the end of the command.'),Object(i.b)("p",null,"Thus, you could do"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},'export EDITOR="vim +LINE"')),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},'export EDITOR="vim +LINE FILE"')," (same as previous)"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"export EDITOR=\"emacs -nw --eval '(progn (find-file FILE) (goto-line LINE) (forward-char (- COLUMN 1)) (recenter))'\""),Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"This one recenters the view after jumping to the given location. You can put arbitrary Emacs Lisp here."))),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},'export EDITOR="code -g FILE:LINE:COLUMN"')," (For VSCode)")),Object(i.b)("h2",{id:"configuration"},"Configuration"),Object(i.b)("p",null,"Several aspects of the UI can be configured in your test code when you introduce the formatter. For example, you can set the initial value of the ",Object(i.b)("a",{parentName:"p",href:"http://hackage.haskell.org/package/sandwich/docs/Test-Sandwich-Formatters-TerminalUI.html#v:terminalUIVisibilityThreshold"},"visibility threshold")," or settings like ",Object(i.b)("a",{parentName:"p",href:"http://hackage.haskell.org/package/sandwich-0.1.0.3/docs/Test-Sandwich-Formatters-TerminalUI.html#v:terminalUIShowRunTimes"},"terminalUIShowRunTimes"),"."),Object(i.b)("p",null,"You can also set a default value to use for the ",Object(i.b)("inlineCode",{parentName:"p"},"EDITOR")," command if the variable is not set. If you want even more control over opening editors, you can provide a custom callback which will be used instead of the default to open them."),Object(i.b)("h2",{id:"custom-exception-formatters"},"Custom exception formatters"),Object(i.b)("p",null,"If your tests throw custom exceptions, you can control the way they are formatted."))}p.isMDXComponent=!0}}]);