(this["webpackJsonppokedex-react"]=this["webpackJsonppokedex-react"]||[]).push([[0],{24:function(e,t,a){},38:function(e,t,a){},39:function(e,t,a){},40:function(e,t,a){},49:function(e,t,a){},50:function(e,t,a){},51:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),c=a(26),r=a.n(c),i=(a(38),a(39),a(40),a.p+"static/media/logo.2b9a0803.svg"),s=a(1),l=function(){return Object(s.jsx)(o.a.Fragment,{children:Object(s.jsx)("div",{className:"logo-container",children:Object(s.jsx)("a",{href:"/home",children:Object(s.jsx)("img",{className:"logo",src:i,alt:"pokedex"})})})})},u=a(9),p=(a(24),a(3)),d=a.n(p),m=a(8),h=function(){var e=Object(m.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:if((a=e.sent).ok){e.next=5;break}throw new Error("API Error");case 5:return e.abrupt("return",a.json());case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),j={searchPokemon:function(e){return h(e||"https://pokeapi.co/api/v2/pokemon?offset=0&limit=9000")},getEachPokemonData:function(e){return h(e)},getPokemonById:function(e){return h("https://pokeapi.co/api/v2/pokemon/".concat(e))}},b=a(5);function f(e,t){return k.apply(this,arguments)}function k(){return(k=Object(m.a)(d.a.mark((function e(t,a){var n,o,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=[],o=0;case 2:if(!(o<a.types.length)){e.next=10;break}return e.next=5,t(a.types[o].type.url);case 5:c=e.sent,n.push(c);case 7:o++,e.next=2;break;case 10:return e.abrupt("return",n);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e,t){return x.apply(this,arguments)}function x(){return(x=Object(m.a)(d.a.mark((function e(t,a){var n,o,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=[],o=0;case 2:if(!(o<a.abilities.length)){e.next=10;break}return e.next=5,t(a.abilities[o].ability.url);case 5:c=e.sent,n.push(c);case 7:o++,e.next=2;break;case 10:return e.abrupt("return",n);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(e,t){return v.apply(this,arguments)}function v(){return(v=Object(m.a)(d.a.mark((function e(t,a){var n,o,c,r,i,s;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t(a.species.url);case 2:return n=e.sent,e.next=5,t(n.evolution_chain.url);case 5:return o=e.sent,c=[],e.next=9,t("https://pokeapi.co/api/v2/pokemon/".concat(o.chain.species.name));case 9:if(r=e.sent,i=[],s=[],c.push(r),!(o.chain.evolves_to.length>0)){e.next=23;break}return e.next=16,t("https://pokeapi.co/api/v2/pokemon/".concat(o.chain.evolves_to[0].species.name));case 16:if(i=e.sent,c.push(i),!(o.chain.evolves_to[0].evolves_to.length>0)){e.next=23;break}return e.next=21,t("https://pokeapi.co/api/v2/pokemon/".concat(o.chain.evolves_to[0].evolves_to[0].species.name));case 21:s=e.sent,c.push(s);case 23:return e.abrupt("return",c);case 24:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var w={loading:!1,data:null,error:null},y=function(e,t){var a=t.type,n=t.payload;switch(a){case"INITIAL":return Object(b.a)(Object(b.a)({},e),{},{loading:!1,data:null,error:null});case"LOAD":return Object(b.a)(Object(b.a)({},e),{},{loading:!0,data:null,error:null});case"SUCCESS":return Object(b.a)(Object(b.a)({},e),{},{loading:!1,data:n,error:null});case"FAILURE":return Object(b.a)(Object(b.a)({},e),{},{loading:!1,data:null,error:n});default:return e}},N=a(18),_=Object(n.createContext)();_.displayName="Cache";var C=function(e,t){var a=t.type,n=t.payload;switch(a){case"SET_CACHE":return Object(b.a)(Object(b.a)({},e),{},Object(N.a)({},n.key,n.value));default:return e}};function T(e){var t=e.children,a=Object(n.useReducer)(C,JSON.parse(localStorage.getItem("POKEAPI_CACHE"))||{}),o=Object(u.a)(a,2),c=o[0],r=o[1];return Object(n.useEffect)((function(){var e=JSON.stringify(c);localStorage.setItem("POKEAPI_CACHE",e)}),[c]),Object(s.jsx)(_.Provider,{value:{state:c,dispatch:r},children:t})}var E={loading:!1,data:null,error:null},A=function(e,t){var a=t.type,n=t.payload;switch(a){case"INITIAL":return Object(b.a)(Object(b.a)({},e),{},{loading:!1,data:null,error:null});case"LOAD":return Object(b.a)(Object(b.a)({},e),{},{loading:!0,data:null,error:null});case"SUCCESS":return Object(b.a)(Object(b.a)({},e),{},{loading:!1,data:n,error:null});case"FAILURE":return Object(b.a)(Object(b.a)({},e),{},{loading:!1,data:null,error:n});default:return e}};var I=a(27),S=a(13),P=a(28),L=function(e){return Object(s.jsx)("input",{className:"search-bar",type:"text",name:"searchBar",id:"search-bar",onChange:e.onChange})},F=function(){var e=Object(n.useState)(""),t=Object(u.a)(e,2),a=t[0],c=t[1],r=function(e,t,a,o){var c=Object(n.useContext)(_),r=Object(n.useReducer)(A,E),i=Object(u.a)(r,2),s=i[0],l=i[1];return Object(n.useEffect)((function(){if(!c.state[a]){var n=setTimeout(Object(m.a)(d.a.mark((function n(){var o,r,i,s,u;return d.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!a){n.next=28;break}return l({type:"LOAD"}),n.prev=2,o=[],n.next=6,e();case 6:r=n.sent,i=r.results.filter((function(e){return e.name.includes(a)})),s=i.slice(0,15),u=0;case 10:if(!(u<s.length)){n.next=19;break}return n.t0=o,n.next=14,t(i[u].url);case 14:n.t1=n.sent,n.t0.push.call(n.t0,n.t1);case 16:u++,n.next=10;break;case 19:l({type:"SUCCESS",payload:o}),c.dispatch({type:"SET_CACHE",payload:{key:a,value:o}}),n.next=26;break;case 23:n.prev=23,n.t2=n.catch(2),l({type:"FAILURE",payload:n.t2});case 26:n.next=29;break;case 28:l({type:"INITIAL"});case 29:case"end":return n.stop()}}),n,null,[[2,23]])}))),o);return function(){clearTimeout(n)}}l({type:"SUCCESS",payload:c.state[a]})}),[e,c,t,a,o]),s}(j.searchPokemon,j.getEachPokemonData,a,500),i=r.data,l=r.error,p=r.loading,h=0;return Object(s.jsxs)(o.a.Fragment,{children:[Object(s.jsxs)("div",{className:"search-bar-container",children:[Object(s.jsx)(I.a,{icon:P.a,className:"icon"}),Object(s.jsx)(L,{onChange:function(e){return c(e.target.value.toLowerCase().match(/^[A-Za-z\-]+/))},value:a})]}),p&&Object(s.jsx)("p",{children:"Cargando"}),i&&Object(s.jsx)("div",{className:"wrapper search-results-container",children:i.map((function(e){return Object(s.jsxs)("div",{className:"pokemon-"+ ++h+" result-pokemon-container",children:[Object(s.jsx)("img",{src:e.sprites.other["official-artwork"].front_default||e.sprites.front_default,alt:e.name,width:"100%",height:"100%"}),Object(s.jsx)("div",{className:"result-pokemon-caption",children:Object(s.jsx)(S.b,{to:"/pokemon/".concat(e.id),children:Object(s.jsx)("p",{children:e.name})})})]},e.order)}))}),l&&Object(s.jsx)("div",{children:l})]})},D=a(4),U=a(30),H=(a(49),{Acero:"https://static.wikia.nocookie.net/espokemon/images/d/d9/Tipo_acero.gif",Agua:"https://static.wikia.nocookie.net/espokemon/images/9/94/Tipo_agua.gif",Bicho:"https://static.wikia.nocookie.net/espokemon/images/f/fe/Tipo_bicho.gif",Dragon:"https://static.wikia.nocookie.net/espokemon/images/0/01/Tipo_drag%C3%B3n.gif","El\xe9ctrico":"https://static.wikia.nocookie.net/espokemon/images/1/1b/Tipo_el%C3%A9ctrico.gif",Fantasma:"https://static.wikia.nocookie.net/espokemon/images/4/47/Tipo_fantasma.gif",Fuego:"https://static.wikia.nocookie.net/espokemon/images/c/ce/Tipo_fuego.gif",Hada:"https://static.wikia.nocookie.net/espokemon/images/b/bc/Tipo_hada.gif",Hielo:"https://static.wikia.nocookie.net/espokemon/images/4/40/Tipo_hielo.gif",Lucha:"https://static.wikia.nocookie.net/espokemon/images/b/b7/Tipo_lucha.gif",Normal:"https://static.wikia.nocookie.net/espokemon/images/3/32/Tipo_normal.gif",Planta:"https://static.wikia.nocookie.net/espokemon/images/d/d6/Tipo_planta.gif","Ps\xedquico":"https://static.wikia.nocookie.net/espokemon/images/1/15/Tipo_ps%C3%ADquico.gif",Roca:"https://static.wikia.nocookie.net/espokemon/images/e/e0/Tipo_roca.gif",Siniestro:"https://static.wikia.nocookie.net/espokemon/images/8/82/Tipo_siniestro.gif",Tierra:"https://static.wikia.nocookie.net/espokemon/images/1/1d/Tipo_tierra.gif",Veneno:"https://static.wikia.nocookie.net/espokemon/images/1/10/Tipo_veneno.gif",Volador:"https://static.wikia.nocookie.net/espokemon/images/e/e1/Tipo_volador.gif","???":"https://static.wikia.nocookie.net/espokemon/images/5/5d/Tipo_%3F%3F%3F.gif"});function R(e){return(e/10).toFixed(1)}var B=function(){var e=Object(D.f)().id,t=function(e,t,a,o){var c=Object(n.useReducer)(y,w),r=Object(u.a)(c,2),i=r[0],s=r[1];return Object(n.useEffect)((function(){var n=setTimeout(Object(m.a)(d.a.mark((function n(){var o,c;return d.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!a){n.next=25;break}return s({type:"LOAD"}),n.prev=2,n.next=5,t(a);case 5:return o=n.sent,n.t0=o,n.next=9,f(e,o);case 9:return n.t1=n.sent,n.next=12,O(e,o);case 12:return n.t2=n.sent,n.next=15,g(e,o);case 15:n.t3=n.sent,c={resource:n.t0,tipos:n.t1,habilidades:n.t2,evoluciones:n.t3},s({type:"SUCCESS",payload:c}),n.next=23;break;case 20:n.prev=20,n.t4=n.catch(2),s({type:"FAILURE",payload:n.t4});case 23:n.next=26;break;case 25:s({type:"INITIAL"});case 26:case"end":return n.stop()}}),n,null,[[2,20]])}))),o);return function(){clearTimeout(n)}}),[e,t,a,o]),i}(j.searchPokemon,j.getPokemonById,e,500),a=t.data,o=t.error;return t.loading?Object(s.jsx)("p",{children:"Cargando"}):o?"Something went wrong":a?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsxs)("div",{className:"results-container",children:[Object(s.jsx)("div",{className:"pokemon-div",children:Object(s.jsxs)("div",{className:"result-pokemon-container pokemon-photo-container",children:[Object(s.jsx)("img",{className:"pokemon-img",src:a.resource.sprites.other["official-artwork"].front_default||a.resource.sprites.front_default,alt:a.resource.name}),Object(s.jsx)("div",{className:"result-pokemon-caption",children:Object(s.jsxs)("p",{children:[a.resource.name," N\xb0",a.resource.id]})})]})}),Object(s.jsxs)("div",{className:"pokemon-divtwo",children:[Object(s.jsxs)("div",{className:"result-pokemon-container pokemon-data-container",children:[Object(s.jsx)("div",{className:" pokemon-body-container",children:Object(s.jsxs)("div",{className:"pokemon-info pokemon-body-info",children:[Object(s.jsxs)("span",{children:["Altura: ",R(a.resource.height)," m"]}),Object(s.jsxs)("span",{children:["Peso: ",R(a.resource.weight)," kg"]})]})}),Object(s.jsx)("div",{className:"pokemon-types-container",children:Object(s.jsx)("div",{className:"pokemon-types",children:a.tipos.map((function(e){return Object(s.jsx)("img",{className:"type-img",src:H[e.names[4].name],alt:e.names[4].name},e.id)}))})})]}),Object(s.jsxs)("div",{className:"result-pokemon-container pokemon-data-container",children:[Object(s.jsx)("h2",{className:"section-title",children:"Habilidades"}),Object(s.jsx)("div",{className:"pokemon-body-container",children:Object(s.jsx)("div",{className:"pokemon-info pokemon-body-info",children:a.habilidades.map((function(e){return Object(s.jsx)("span",{children:e.names[5].name},e.id)}))})})]})]})]}),Object(s.jsx)("h1",{className:"section-title",children:"Evoluciones"}),Object(s.jsx)("div",{className:"result-pokemon-container slide-container",children:Object(s.jsx)(U.a,{activeIndex:0,threshHold:100,transition:.5,scaleOnDrag:!1,children:a.evoluciones.map((function(e){return Object(s.jsx)("div",{className:"slide-caption-image",children:Object(s.jsx)("img",{src:e.sprites.other["official-artwork"].front_default||e.sprites.front_default,alt:e.name},e.id)},e.id)}))})}),Object(s.jsx)("div",{className:"evolutions-container",children:a.evoluciones.map((function(e){return Object(s.jsx)("div",{className:"result-pokemon-container",children:Object(s.jsx)("img",{className:"evolution-img",src:e.sprites.other["official-artwork"].front_default||e.sprites.front_default,alt:e.name},e.id)},e.id)}))})]}):null};a(50);var J=function(){return Object(s.jsx)(T,{children:Object(s.jsx)(S.a,{children:Object(s.jsxs)("div",{className:"container",children:[Object(s.jsx)(l,{}),Object(s.jsxs)(D.c,{children:[Object(s.jsx)(D.a,{path:["/home","/"],exact:!0,children:Object(s.jsx)(F,{})}),Object(s.jsx)(D.a,{path:"/pokemon/:id",children:Object(s.jsx)(B,{})})]})]})})})};r.a.render(Object(s.jsx)(J,{}),document.getElementById("root"))}},[[51,1,2]]]);
//# sourceMappingURL=main.393f9d06.chunk.js.map