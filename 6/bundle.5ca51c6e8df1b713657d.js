(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",c="quarter",d="year",u="date",f="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},_=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},m={s:_,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+_(i,2,"0")+":"+_(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,l),r=n-s<0,a=t.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:d,w:o,d:a,D:u,h:r,m:s,s:i,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},b="en",y={};y[b]=v;var g=function(e){return e instanceof D},$=function e(t,n,i){var s;if(!t)return b;if("string"==typeof t){var r=t.toLowerCase();y[r]&&(s=r),n&&(y[r]=n,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var o=t.name;y[o]=t,s=o}return!i&&s&&(b=s),s||!i&&b},M=function(e,t){if(g(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new D(n)},w=m;w.l=$,w.i=g,w.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var D=function(){function v(e){this.$L=$(e.locale,null,!0),this.parse(e)}var _=v.prototype;return _.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(w.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(p);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},_.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},_.$utils=function(){return w},_.isValid=function(){return!(this.$d.toString()===f)},_.isSame=function(e,t){var n=M(e);return this.startOf(t)<=n&&n<=this.endOf(t)},_.isAfter=function(e,t){return M(e)<this.startOf(t)},_.isBefore=function(e,t){return this.endOf(t)<M(e)},_.$g=function(e,t,n){return w.u(e)?this[t]:this.set(n,e)},_.unix=function(){return Math.floor(this.valueOf()/1e3)},_.valueOf=function(){return this.$d.getTime()},_.startOf=function(e,t){var n=this,c=!!w.u(t)||t,f=w.p(e),p=function(e,t){var i=w.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?i:i.endOf(a)},h=function(e,t){return w.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},v=this.$W,_=this.$M,m=this.$D,b="set"+(this.$u?"UTC":"");switch(f){case d:return c?p(1,0):p(31,11);case l:return c?p(1,_):p(0,_+1);case o:var y=this.$locale().weekStart||0,g=(v<y?v+7:v)-y;return p(c?m-g:m+(6-g),_);case a:case u:return h(b+"Hours",0);case r:return h(b+"Minutes",1);case s:return h(b+"Seconds",2);case i:return h(b+"Milliseconds",3);default:return this.clone()}},_.endOf=function(e){return this.startOf(e,!1)},_.$set=function(e,t){var o,c=w.p(e),f="set"+(this.$u?"UTC":""),p=(o={},o[a]=f+"Date",o[u]=f+"Date",o[l]=f+"Month",o[d]=f+"FullYear",o[r]=f+"Hours",o[s]=f+"Minutes",o[i]=f+"Seconds",o[n]=f+"Milliseconds",o)[c],h=c===a?this.$D+(t-this.$W):t;if(c===l||c===d){var v=this.clone().set(u,1);v.$d[p](h),v.init(),this.$d=v.set(u,Math.min(this.$D,v.daysInMonth())).$d}else p&&this.$d[p](h);return this.init(),this},_.set=function(e,t){return this.clone().$set(e,t)},_.get=function(e){return this[w.p(e)]()},_.add=function(n,c){var u,f=this;n=Number(n);var p=w.p(c),h=function(e){var t=M(f);return w.w(t.date(t.date()+Math.round(e*n)),f)};if(p===l)return this.set(l,this.$M+n);if(p===d)return this.set(d,this.$y+n);if(p===a)return h(1);if(p===o)return h(7);var v=(u={},u[s]=e,u[r]=t,u[i]=1e3,u)[p]||1,_=this.$d.getTime()+n*v;return w.w(_,this)},_.subtract=function(e,t){return this.add(-1*e,t)},_.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=w.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,c=n.months,d=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},u=function(e){return w.s(r%12||12,e,"0")},p=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:w.s(o+1,2,"0"),MMM:d(n.monthsShort,o,c,3),MMMM:d(c,o),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,l,2),ddd:d(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:w.s(r,2,"0"),h:u(1),hh:u(2),a:p(r,a,!0),A:p(r,a,!1),m:String(a),mm:w.s(a,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(e,t){return t||v[e]||s.replace(":","")}))},_.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},_.diff=function(n,u,f){var p,h=w.p(u),v=M(n),_=(v.utcOffset()-this.utcOffset())*e,m=this-v,b=w.m(this,v);return b=(p={},p[d]=b/12,p[l]=b,p[c]=b/3,p[o]=(m-_)/6048e5,p[a]=(m-_)/864e5,p[r]=m/t,p[s]=m/e,p[i]=m/1e3,p)[h]||m,f?b:w.a(b)},_.daysInMonth=function(){return this.endOf(l).$D},_.$locale=function(){return y[this.$L]},_.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=$(e,t,!0);return i&&(n.$L=i),n},_.clone=function(){return w.w(this.$d,this)},_.toDate=function(){return new Date(this.valueOf())},_.toJSON=function(){return this.isValid()?this.toISOString():null},_.toISOString=function(){return this.$d.toISOString()},_.toString=function(){return this.$d.toUTCString()},v}(),T=D.prototype;return M.prototype=T,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",d],["$D",u]].forEach((function(e){T[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,D,M),e.$i=!0),M},M.locale=$,M.isDayjs=g,M.unix=function(e){return M(1e3*e)},M.en=y[b],M.Ls=y,M.p={},M}()}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}class i{getTemplate(){return'\n    <form class="trip-filters" action="#" method="get">\n       <div class="trip-filters__filter">\n         <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>\n         <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n       </div>\n\n       <div class="trip-filters__filter">\n         <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n         <label class="trip-filters__filter-label" for="filter-future">Future</label>\n       </div>\n\n       <div class="trip-filters__filter">\n         <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n         <label class="trip-filters__filter-label" for="filter-present">Present</label>\n       </div>\n\n       <div class="trip-filters__filter">\n         <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">\n         <label class="trip-filters__filter-label" for="filter-past">Past</label>\n       </div>\n\n       <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class s{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class r{getTemplate(){return'\n    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n       <div class="trip-sort__item  trip-sort__item--day">\n         <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n         <label class="trip-sort__btn" for="sort-day">Day</label>\n       </div>\n\n       <div class="trip-sort__item  trip-sort__item--event">\n         <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n         <label class="trip-sort__btn" for="sort-event">Event</label>\n       </div>\n\n       <div class="trip-sort__item  trip-sort__item--time">\n         <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n         <label class="trip-sort__btn" for="sort-time">Time</label>\n       </div>\n\n       <div class="trip-sort__item  trip-sort__item--price">\n         <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n         <label class="trip-sort__btn" for="sort-price">Price</label>\n       </div>\n\n       <div class="trip-sort__item  trip-sort__item--offer">\n         <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n         <label class="trip-sort__btn" for="sort-offer">Offers</label>\n       </div>\n    </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const a="DD/MM/YY HH:mm",o="hh:mm",l=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"];var c=n(484),d=n.n(c);function u(e,t){return e?d()(e).format(t):""}function f(e){return`${e[0].toUpperCase()}${e.slice(1)}`}class p{constructor({points:e,offers:t,destinations:n}){this.points=e,this.offers=t,this.destinations=n}getTemplate(){return function(e,t,n){const{type:i,dateFrom:s,dateTo:r,isFavorite:a,basePrice:l}=e,{name:c}=n;return`\n      <li class="trip-events__item">\n        <div class="event">\n          <time class="event__date" datetime="${s}">${u(s,"MMM D")}</time>\n          <div class="event__type">\n            <img class="event__type-icon" width="42" height="42" src="img/icons/${i}.png" alt="Event type icon">\n          </div>\n          <h3 class="event__title">${i} ${c} </h3>\n          <div class="event__schedule">\n            <p class="event__time">\n              <time class="event__start-time" datetime="${s}">${u(s,o)}</time>\n              &mdash;\n              <time class="event__end-time" datetime="${r}">${u(r,o)}</time>\n            </p>\n            <p class="event__duration">${function(e,t){const n=d()(t).diff(e,"minute");if(n<60)return`${n}M`;const i=d()(t).diff(e,"hour");return i<24?`${i}H ${n%60}M`:`${d()(t).diff(e,"day")}D ${i%24}H ${n%60}M`}(s,r)}</p>\n          </div>\n          <p class="event__price">\n            &euro;&nbsp;<span class="event__price-value">${l}</span>\n          </p>\n          <h4 class="visually-hidden">Offers:</h4>\n          <ul class="event__selected-offers">\n            ${t.map((e=>function({title:e,price:t}){return`<li class="event__offer">\n              <span class="event__offer-title">${e}</span>\n              &plus;&euro;&nbsp;\n              <span class="event__offer-price">${t}</span>\n    </li>`}(e))).join("")}\n          </ul>\n          <button class="event__favorite-btn ${a&&"event__favorite-btn--active"}" type="button">\n            <span class="visually-hidden">Add to favorite</span>\n            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n            </svg>\n          </button>\n          <button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>\n        </div>\n       </li>\n    `}(this.points,this.offers,this.destinations)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class h{constructor({points:e,offers:t,checkedOffers:n,destinations:i}){this.points=e,this.offers=t,this.checkedOffers=n,this.destinations=i}getTemplate(){return function(e,t,n,i){const{type:s,dateFrom:r,dateTo:o,basePrice:c}=e,{name:d}=i;return`<form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-1">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="17" height="17" src="img/icons/${s}.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n          <div class="event__type-list">\n            <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n                ${l.map((e=>function(e){return`<div class="event__type-item">\n      <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}">\n      <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${f(e)}</label>\n    </div>`}(e))).join("")}\n            </fieldset>\n          </div>\n        </div>\n\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-1">\n            ${f(s)}\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value='${d}' list="destination-list-1">\n          <datalist id="destination-list-1">\n            ${i}\n          </datalist>\n        </div>\n\n        <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-1">From</label>\n          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${u(r,a)}">\n          &mdash;\n          <label class="visually-hidden" for="event-end-time-1">To</label>\n          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${u(o,a)}">\n        </div>\n\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-1">\n            <span class="visually-hidden">Price</span>\n            &euro;\n          </label>\n          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${c}>\n        </div>\n\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">Delete</button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </header>\n      <section class="event__details">\n        ${function({offers:e},t){return 0!==e.length?`<section class="event__section  event__section--offers">\n        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n        <div class="event__available-offers">\n          ${e.map((e=>function(e,t){const{id:n,title:i,price:s}=e;return`<div class="event__offer-selector">\n      <input class="event__offer-checkbox  visually-hidden" id=${n} type="checkbox" name=${n} ${t.map((e=>e.id)).includes(n)?"checked":""}>\n      <label class="event__offer-label" for=${n}>\n        <span class="event__offer-title">${i}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${s}</span>\n      </label>\n    </div>`}(e,t))).join("")}\n        </div>\n      </section>`:""}(t,n)}\n        ${function(e){const{description:t,pictures:n}=e;if(t>0||n.length>0)return`<section class="event__section  event__section--destination">\n          <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n          <p class="event__destination-description">${t}</p>\n\n          ${function(e){if(e.length>0)return`<div class="event__photos-container">\n        <div class="event__photos-tape">\n          ${e.map((e=>function(e){const{src:t,description:n}=e;return`<img class="event__photo" src=${t} alt=${n}>`}(e))).join("")}\n        </div>\n      </div>`}(n)}\n      </section>`}(i)}\n      </section>\n    </form>`}(this.points,this.offers,this.checkedOffers,this.destinations)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class v{getTemplate(){return'\n    <section class="trip-main__trip-info  trip-info">\n      <div class="trip-info__main">\n        <h1 class="trip-info__title">Belgrade &mdash; Paris &mdash; Budapesht</h1>\n\n        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n      </div>\n\n      <p class="trip-info__cost">\n        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n      </p>\n    </section>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const _=document.querySelector(".page-header").querySelector(".trip-main"),m=[{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcab",description:"Istanbul, is a beautiful city, a true asian pearl, with crowded streets.",name:"Istanbul",pictures:[{src:"https://loremflickr.com/248/152?random=1",description:"Istanbul parliament building"}]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcac",description:"Paris, is a beautiful city, a true asian pearl, with crowded streets.",name:"Paris",pictures:[{src:"https://loremflickr.com/248/152?random=2",description:"Paris parliament building"},{src:"https://loremflickr.com/248/152?random=4",description:"Paris parliament building"}]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcad",description:"Belgrade, is a beautiful city, a true asian pearl, with crowded streets.",name:"Belgrade",pictures:[{src:"https://loremflickr.com/248/152?random=5",description:"Belgrade parliament building"}]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcae",description:"Budapesht, is a beautiful city with crowded streets.",name:"Budapesht",pictures:[{src:"https://loremflickr.com/248/152?random=3",description:"Budapesht parliament building"}]}],b=[{type:"taxi",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa30",title:"Upgrade to a business class",price:120},{id:"b4c3e4e6-9053-42ce-b747-e281314baa31",title:"Order Uber",price:20}]},{type:"bus",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa30",title:"Upgrade to a business class",price:120}]},{type:"train",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa30",title:"Upgrade to a business class",price:120}]},{type:"ship",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa30",title:"Upgrade to a business class",price:120},{id:"b4c3e4e6-9053-42ce-b747-e281314baa50",title:"Individual meeting at port",price:300}]},{type:"drive",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa32",title:"Rent a car",price:200}]},{type:"flight",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa33",title:"Add luggage",price:30},{id:"b4c3e4e6-9053-42ce-b747-e281314baa34",title:"Switch to comfort class",price:100},{id:"b4c3e4e6-9053-42ce-b747-e281314baa35",title:"Add meal",price:15},{id:"b4c3e4e6-9053-42ce-b747-e281314baa36",title:"Choose seats",price:5},{id:"b4c3e4e6-9053-42ce-b747-e281314baa37",title:"Travel by train",price:40}]},{type:"check-in",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa38",title:"Add breakfast",price:50}]},{type:"sightseeing",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa39",title:"Book tickets",price:40},{id:"b4c3e4e6-9053-42ce-b747-e281314baa40",title:"Lunch in city",price:30}]},{type:"restaurant",offers:[]}],y=[{id:"f4b62099-293f-4c3d-a702-94eec4a2808c",basePrice:1100,dateFrom:"2019-07-09T22:55:56.845Z",dateTo:"2019-07-10T11:22:13.375Z",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcab",isFavorite:!1,offers:["b4c3e4e6-9053-42ce-b747-e281314baa30"],type:"taxi"},{id:"f4b62099-293f-4c3d-a702-94eec4a2808d",basePrice:1500,dateFrom:"2019-07-09T20:50:56.845Z",dateTo:"2019-07-11T10:32:13.375Z",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcad",isFavorite:!1,offers:["b4c3e4e6-9053-42ce-b747-e281314baa33","b4c3e4e6-9053-42ce-b747-e281314baa34","b4c3e4e6-9053-42ce-b747-e281314baa35","b4c3e4e6-9053-42ce-b747-e281314baa36"],type:"flight"},{id:"f4b62099-293f-4c3d-a702-94eec4a2808e",basePrice:1e3,dateFrom:"2019-07-11T02:05:56.845Z",dateTo:"2019-07-12T13:42:13.375Z",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcae",isFavorite:!0,offers:["b4c3e4e6-9053-42ce-b747-e281314baa30"],type:"ship"},{id:"f4b62099-293f-4c3d-a702-94eec4a2808f",basePrice:500,dateFrom:"2019-07-12T23:40:56.845Z",dateTo:"2019-07-13T14:20:13.375Z",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcac",isFavorite:!0,offers:[],type:"restaurant"}];function g(){return(e=y)[Math.floor(Math.random()*e.length)];var e}const $=document.querySelector(".trip-events"),M=new class{points=Array.from({length:10},g);offers=b;destinations=m;getPoints(){return this.points}getOffers(){return this.offers}getDestinations(){return this.destinations}getOffersByType(e){return this.getOffers().find((t=>t.type===e))}getOffersById(e,t){return this.getOffersByType(e).offers.filter((e=>t.find((t=>e.id===t))))}getDestinationById(e){return this.getDestinations().find((t=>t.id===e))}},w=new class{sortComponent=new r;filterComponent=new i;tripInfoComponent=new v;eventListComponent=new s;constructor({container:e,eventPointsModel:t}){this.container=e,this.eventPointsModel=t}init(){this.eventPoints=[...this.eventPointsModel.getPoints()],t(this.filterComponent,_),t(this.sortComponent,this.container),t(this.eventListComponent,this.container),t(this.tripInfoComponent,_,"afterbegin"),t(new h({points:this.eventPoints[0],checkedOffers:this.eventPointsModel.getOffersById(this.eventPoints[0].type,this.eventPoints[0].offers),offers:this.eventPointsModel.getOffersByType(this.eventPoints[0].type),destinations:this.eventPointsModel.getDestinationById(this.eventPoints[0].destination)}),this.eventListComponent.getElement());for(let e=1;e<this.eventPoints.length;e++)t(new p({points:this.eventPoints[e],offers:this.eventPointsModel.getOffersById(this.eventPoints[e].type,this.eventPoints[e].offers),destinations:this.eventPointsModel.getDestinationById(this.eventPoints[e].destination)}),this.eventListComponent.getElement())}}({container:$,eventPointsModel:M});w.init()})()})();
//# sourceMappingURL=bundle.5ca51c6e8df1b713657d.js.map