var PRS$0=function(e,t){return e.__proto__={a:t},e.a===t}({},{}),DP$0=Object.defineProperty,GOPD$0=Object.getOwnPropertyDescriptor,MIXIN$0=function(e,t){for(var o in t)t.hasOwnProperty(o)&&DP$0(e,o,GOPD$0(t,o));return e},SP$0=Object.setPrototypeOf||function(e,t){return PRS$0?e.__proto__=t:DP$0(e,"__proto__",{value:t,configurable:!0,enumerable:!1,writable:!0}),e},OC$0=Object.create,Script=function(){"use strict";function e(e,t,o){this.name=e,this.path=t,this.dom=null,this.defaultEnabled=o}var t={};return DP$0(e,"prototype",{configurable:!1,enumerable:!1,writable:!1}),t.checkPath=function(){var e=document.location.pathname;return e.match(this.path)},t.initialize=function(){this.dom="undefined"==typeof unsafeWindow?window:unsafeWindow,this.defaultEnabled||"null"!=GM_getValue("onescript-"+this.name,"null")||GM_setValue("onescript-"+this.name,"false"),this.checkPath()&&"true"==GM_getValue("onescript-"+this.name,"true")&&(console.log("[KongOne] Adding Script: "+this.name),this.run(),this.added=!0)},MIXIN$0(e.prototype,t),t=void 0,e}(),ShowScriptOptions=function(e){"use strict";function t(){e.prototype.constructor.call(this,"this","accounts",!0),this.scripts=[]}PRS$0||MIXIN$0(t,e);var o={};return null!==e&&SP$0(t,e),t.prototype=OC$0(null!==e?e.prototype:null,{constructor:{value:t,configurable:!0,writable:!0}}),DP$0(t,"prototype",{configurable:!1,enumerable:!1,writable:!1}),o.run=function(){var e=(this.dom,new Element("div",{style:"background-color:#FFF;padding: 8px;"}).update("<h2>Scripts</h2>Enable - Script Name<p></p>"));$("profile_aside").down().insert(e),this.scripts.each(function(t){var o=this;if("this"==t.name)return!0;var r=new Element("span",{style:"margin-top: 5px !important;display: block;"});e.insert(r);var i=new Element("input",{type:"checkbox",id:"onescript-"+t.name,style:"margin-top:2px;vertical-align:top;margin-right:8px;"}),n=new Element("label",{class:"pls"});i.checked="true"==GM_getValue(i.id,t.defaultEnabled?"true":"false"),n.update(t.name),r.insert(i),r.insert(n),i.addEventListener("change",function(e){console.log("[KongOne] Toggled script"),GM_setValue(o.id,o.checked)})})},MIXIN$0(t.prototype,o),o=void 0,t}(Script),HolodeckScript=function(e){"use strict";function t(t,o,r){e.prototype.constructor.call(this,t,o,r),this.holodeckCheckCounter=0}PRS$0||MIXIN$0(t,e);var o={};return null!==e&&SP$0(t,e),t.prototype=OC$0(null!==e?e.prototype:null,{constructor:{value:t,configurable:!0,writable:!0}}),DP$0(t,"prototype",{configurable:!1,enumerable:!1,writable:!1}),o.initialize=function(){var o=this;return this.holodeckCheckCounter++,"undefined"!=typeof holodeck&&holodeck.ready?void e.prototype.initialize.call(this):this.holodeckCheckCounter>t.COUNTER_LIMIT?void console.log("[KongOne] "+this.name+" failed to load holodeck"):void setTimeout(function(){return o.initialize()},100)},MIXIN$0(t.prototype,o),o=void 0,t}(Script);HolodeckScript.COUNTER_LIMIT=100;var WhisperCatch=function(e){"use strict";function t(){e.prototype.constructor.call(this,"Whisper Catch","games",!0)}PRS$0||MIXIN$0(t,e);var o={};return null!==e&&SP$0(t,e),t.prototype=OC$0(null!==e?e.prototype:null,{constructor:{value:t,configurable:!0,writable:!0}}),DP$0(t,"prototype",{configurable:!1,enumerable:!1,writable:!1}),o.run=function(){var e=this.dom,o=e.ChatDialogue;holodeck.__wc_whisperCount=0,o.prototype.__wc_receivedPrivateMessage=o.prototype.receivedPrivateMessage,o.prototype.receivedPrivateMessage=function(e){this.__wc_receivedPrivateMessage(e),e.id=holodeck.__wc_whisperCount;var o=JSON.parse(localStorage.getItem(t.WHISPERS_SAVED_KEY))||[];o.push(e),localStorage.setItem(t.WHISPERS_SAVED_KEY,JSON.stringify(o)),setTimeout(this.removeWhisper,t.WHISPER_WAIT_TIME,e)},this.__wc_interval=setInterval(restoreWhispers,t.CHAT_DIALOGUE_RETRY),holodeck.addChatCommand("wctime",function(e,o){var r=o.split(" ").slice(1),i=parseInt(r[0]);return isNaN(i)||(localStorage.setItem(t.WHISPER_WAIT_TIME_KEY,i),e.activeDialogue().displayUnsanitizedMessage("Kong Bot","Whisper save time set to "+i+" seconds.",{class:"whisper received_whisper"},{non_user:!0})),!1})},o.restoreWhispers=function(){var e=holodeck.activeDialogue(),o=JSON.parse(localStorage.getItem(t.WHISPERS_SAVED_KEY))||[];if(e){for(;o.length>0;){var r=o.shift();e.receivedPrivateMessage(r)}clearInterval(this.__wc_interval)}},o.removeWhisper=function(e){var o=(JSON.parse(localStorage.getItem(t.WHISPERS_SAVED_KEY))||[]).filter(function(t){return t.id!=e.id});localStorage.setItem(t.WHISPERS_SAVED_KEY,JSON.stringify(o))},MIXIN$0(t.prototype,o),o=void 0,t}(HolodeckScript);WhisperCatch.WHISPERS_SAVED_KEY="wc-whispers_saved",WhisperCatch.WHISPER_WAIT_TIME_KEY="wc-whisper_wait_time_key",WhisperCatch.WHISPER_WAIT_TIME=1e3*parseInt(localStorage.getItem(WhisperCatch.WHISPER_WAIT_TIME_KEY)||15),WhisperCatch.CHAT_DIALOGUE_RETRY=100,function(){console.log("KongOne Script running."),"undefined"==typeof GM_setValue&&(window.GM_setValue=function(e,t){localStorage.setItem(e,t)},window.GM_getValue=function(e,t){var o=localStorage.getItem(e);return null===o?t:o},window.GM_deleteValue=function(e){localStorage.removeItem(e)});var e=new ShowScriptOptions,t=[e,new WhisperCatch];e.scripts=t,t.each(function(e){return e.initialize()})}();