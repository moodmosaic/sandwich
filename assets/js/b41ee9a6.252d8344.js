(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{102:function(e,t,a){"use strict";a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return d}));var n=a(0),r=a.n(n);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=r.a.createContext({}),u=function(e){var t=r.a.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=u(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=u(a),m=n,d=p["".concat(s,".").concat(m)]||p[m]||h[m]||o;return a?r.a.createElement(d,i(i({ref:t},l),{},{components:a})):r.a.createElement(d,i({ref:t},l))}));function d(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,s=new Array(o);s[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:n,s[1]=i;for(var l=2;l<o;l++)s[l]=a[l];return r.a.createElement.apply(null,s)}return r.a.createElement.apply(null,a)}m.displayName="MDXCreateElement"},103:function(e,t,a){"use strict";a.d(t,"b",(function(){return o})),a.d(t,"a",(function(){return s}));var n=a(16),r=a(105);function o(){const{siteConfig:{baseUrl:e="/",url:t}={}}=Object(n.default)();return{withBaseUrl:(a,n)=>function(e,t,a,{forcePrependBaseUrl:n=!1,absolute:o=!1}={}){if(!a)return a;if(a.startsWith("#"))return a;if(Object(r.b)(a))return a;if(n)return t+a;const s=a.startsWith(t)?a:t+a.replace(/^\//,"");return o?e+s:s}(t,e,a,n)}}function s(e,t={}){const{withBaseUrl:a}=o();return a(e,t)}},105:function(e,t,a){"use strict";function n(e){return!0===/^(\w*:|\/\/)/.test(e)}function r(e){return void 0!==e&&!n(e)}a.d(t,"b",(function(){return n})),a.d(t,"a",(function(){return r}))},94:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return i})),a.d(t,"metadata",(function(){return c})),a.d(t,"toc",(function(){return l})),a.d(t,"default",(function(){return p}));var n=a(3),r=a(7),o=(a(0),a(102)),s=a(103),i={id:"slack",title:"Slack Formatter"},c={unversionedId:"formatters/slack",id:"formatters/slack",isDocsHomePage:!1,title:"Slack Formatter",description:"The Slack formatter allows you to send live test results to a Slack channel. It shows the overall progress through the tests as a progress bar, and also shows failures as they occur.",source:"@site/docs/formatters/slack.md",slug:"/formatters/slack",permalink:"/sandwich/docs/formatters/slack",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/formatters/slack.md",version:"current",sidebar:"docs",previous:{title:"Silent Formatter",permalink:"/sandwich/docs/formatters/silent"},next:{title:"Selenium integration",permalink:"/sandwich/docs/extensions/sandwich-webdriver"}},l=[{value:"Usage",id:"usage",children:[]},{value:"Customizing the message",id:"customizing-the-message",children:[]},{value:"Limiting output",id:"limiting-output",children:[]},{value:"Visibility thresholds",id:"visibility-thresholds",children:[]}],u={toc:l};function p(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},u,a,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"The ",Object(o.b)("a",{parentName:"p",href:"http://hackage.haskell.org/package/sandwich-slack"},"Slack formatter")," allows you to send live test results to a Slack channel. It shows the overall progress through the tests as a progress bar, and also shows failures as they occur."),Object(o.b)("p",null,"When applied to the arithmetic example from the landing page, it looks like this:"),Object(o.b)("img",{alt:"Simple timing example",src:Object(s.a)("img/slack.gif")}),Object(o.b)("h2",{id:"usage"},"Usage"),Object(o.b)("p",null,"To enable it, add ",Object(o.b)("inlineCode",{parentName:"p"},"sandwich-slack")," to your project and add the formatter to the ",Object(o.b)("a",{parentName:"p",href:"http://hackage.haskell.org/package/sandwich/docs/Test-Sandwich-Options.html#v:optionsFormatters"},"optionsFormatters")," of your Sandwich options."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-haskell"},'import Test.Sandwich.Formatters.Slack\n\nmain :: IO ()\nmain = runSandwich options myTests\n  where\n    options = defaultOptions {\n      optionsFormatters = [SomeFormatter $ defaultSlackFormatter {\n        slackFormatterSlackConfig = SlackConfig "MY-SLACK-TOKEN"\n        , slackFormatterChannel = "my-channel"\n        }]\n      }\n')),Object(o.b)("p",null,"If you're using ",Object(o.b)("a",{parentName:"p",href:"http://hackage.haskell.org/package/sandwich/docs/Test-Sandwich.html#v:runSandwichWithCommandLineArgs"},"runSandwichWithCommandLineArgs"),", you can control the Slack formatter settings using command line args. For example, you can pass ",Object(o.b)("inlineCode",{parentName:"p"},"--slack-token $SLACK_TOKEN"),", which makes it easy to inject a token from a secret within your CI system. Pass ",Object(o.b)("inlineCode",{parentName:"p"},"--print-slack-flags")," to see all the command line options."),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Note that you need to set up a Slack token first. Nowadays this is done by creating a ",Object(o.b)("a",{parentName:"p",href:"https://api.slack.com/apps"},"Slack App"),'. Make sure your app has "bot" permissions to interact in channels, and permission to make Slack API requests. To allow your app to send messages to a private channel, you\'ll want to add the app to the channel by typing ',Object(o.b)("inlineCode",{parentName:"p"},"/invite app-name")," in the channel.")),Object(o.b)("h2",{id:"customizing-the-message"},"Customizing the message"),Object(o.b)("p",null,"Several options exist to configure the output."),Object(o.b)("p",null,"First of all, you'll probably want to set  ",Object(o.b)("a",{parentName:"p",href:"http://hackage.haskell.org/package/sandwich-slack/docs/Test-Sandwich-Formatters-Slack.html#v:slackFormatterTopMessage"},"slackFormatterTopMessage"),", which allows you to control the message that appears above the progress bar. This is a useful place to put the name of the test suite and/or a link to the CI job where it's running."),Object(o.b)("h2",{id:"limiting-output"},"Limiting output"),Object(o.b)("p",null,"Most of the other options have to do with controlling how much information appears in the Slack message. We don't want to show an overwhelming amount of output in Slack if your test suite has a large number of failures, or if some failures produce large amounts of text. You can cap the total number of failures reported and the total number of bytes used in the message sent to the Slack API."),Object(o.b)("p",null,"Each failure reported in the message consists of two parts: the failure reason and the callstack. You can cap the number of lines that will be devoted to each of these."),Object(o.b)("h2",{id:"visibility-thresholds"},"Visibility thresholds"),Object(o.b)("p",null,"One other interesting option is  ",Object(o.b)("a",{parentName:"p",href:"http://hackage.haskell.org/package/sandwich-slack/docs/Test-Sandwich-Formatters-Slack.html#v:slackFormatterVisibilityThreshold"},"slackFormatterVisibilityThreshold"),". This option allows you to set a visibility threshold for which nodes are reported in failures. See the ",Object(o.b)("a",{parentName:"p",href:"../node_options#visibility-thresholds"},"visibility threshold")," docs for more."))}p.isMDXComponent=!0}}]);