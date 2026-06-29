import{T as E,E as P,a as L,j as A,b as G,o as U,x as c,n as x,d as O,r as f,i as q,g,f as $,k as F,s as h,c as n,t as X,h as H}from"./storage-xiDPc5Q0.js";import{b as p}from"./browser-BXPSLLBm.js";import{d as R}from"./options-sQn865RA.js";import{a as B,z as K,t as I,s as j,d as w,A as M,w as N,O as Y,e as J,g as C,n as T,y as Q,x as V}from"./newrelic-B-Cf_x5w.js";import{e as W,I as Z,o as ee}from"./sp-popover-CHn70rC8.js";import{zip as te}from"./browser-DGnb96R2.js";import"./sp-tray-SJtayx-h.js";class ae{constructor(e){this.G=e}disconnect(){this.G=void 0}reconnect(e){this.G=e}deref(){return this.G}}class ie{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise((e=>this.Z=e))}resume(){this.Z?.(),this.Y=this.Z=void 0}}const _=t=>!K(t)&&typeof t.then=="function",D=1073741823;let oe=class extends B{constructor(){super(...arguments),this._$Cwt=D,this._$Cbt=[],this._$CK=new ae(this),this._$CX=new ie}render(...e){return e.find((a=>!_(a)))??E}update(e,a){const o=this._$Cbt;let i=o.length;this._$Cbt=a;const s=this._$CK,r=this._$CX;this.isConnected||this.disconnected();for(let l=0;l<a.length&&!(l>this._$Cwt);l++){const d=a[l];if(!_(d))return this._$Cwt=l,d;l<i&&d===o[l]||(this._$Cwt=D,i=0,Promise.resolve(d).then((async b=>{for(;r.get();)await r.get();const u=s.deref();if(u!==void 0){const S=u._$Cbt.indexOf(d);S>-1&&S<u._$Cwt&&(u._$Cwt=S,u.setValue(b))}})))}return E}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}};const se=W(oe),z=new WeakMap,ne=W(class extends B{render(t){return P}update(t,[e]){const a=e!==this.G;return a&&this.G!==void 0&&this.rt(void 0),(a||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),P}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let a=z.get(e);a===void 0&&(a=new WeakMap,z.set(e,a)),a.get(this.G)!==void 0&&this.G.call(this.ht,void 0),a.set(this.G,t),t!==void 0&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return typeof this.G=="function"?z.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});function*re(t,e){if(t!==void 0){let a=0;for(const o of t)yield e(o,a++)}}const ce=L`
    :host{--spectrum-actionbar-height:var(--spectrum-action-bar-height);--spectrum-actionbar-corner-radius:var(--spectrum-corner-radius-100);--spectrum-actionbar-item-counter-font-size:var(--spectrum-font-size-100);--spectrum-actionbar-item-counter-line-height:var(--spectrum-line-height-100);--spectrum-actionbar-item-counter-color:var(--spectrum-neutral-content-color-default);--spectrum-actionbar-emphasized-background-color:var(--spectrum-informative-background-color-default);--spectrum-actionbar-emphasized-item-counter-color:var(--spectrum-white);--spectrum-actionbar-spacing-outer-edge:var(--spectrum-spacing-300);--spectrum-actionbar-spacing-close-button-top:var(--spectrum-spacing-100);--spectrum-actionbar-spacing-close-button-start:var(--spectrum-spacing-100);--spectrum-actionbar-spacing-close-button-end:var(--spectrum-spacing-75);--spectrum-actionbar-spacing-item-counter-top:var(--spectrum-action-bar-top-to-item-counter);--spectrum-actionbar-spacing-item-counter-end:var(--spectrum-spacing-400);--spectrum-actionbar-spacing-action-group-top:var(--spectrum-spacing-100);--spectrum-actionbar-spacing-action-group-end:var(--spectrum-spacing-100);--spectrum-actionbar-shadow-horizontal:var(--spectrum-drop-shadow-x);--spectrum-actionbar-shadow-vertical:var(--spectrum-drop-shadow-y);--spectrum-actionbar-shadow-blur:var(--spectrum-drop-shadow-blur);--spectrum-actionbar-shadow-color:var(--spectrum-drop-shadow-color)}:host:lang(ja),:host:lang(ko),:host:lang(zh){--spectrum-actionbar-item-counter-line-height-cjk:var(--spectrum-cjk-line-height-100)}@media (forced-colors:active){:host,:host([emphasized]) #popover{--highcontrast-actionbar-popover-border-color:CanvasText}}:host{padding:0 var(--mod-actionbar-spacing-outer-edge,var(--spectrum-actionbar-spacing-outer-edge));z-index:1;box-sizing:border-box;pointer-events:none;block-size:0;opacity:0;inset-block-end:0}:host([open]){block-size:calc(var(--mod-actionbar-spacing-outer-edge,var(--spectrum-actionbar-spacing-outer-edge)) + var(--mod-actionbar-height,var(--spectrum-actionbar-height)));opacity:1}#popover{block-size:var(--mod-actionbar-height,var(--spectrum-actionbar-height));box-sizing:border-box;inline-size:100%;border-radius:var(--mod-actionbar-corner-radius,var(--spectrum-actionbar-corner-radius));border-color:var(--highcontrast-actionbar-popover-border-color,var(--mod-actionbar-popover-border-color,var(--spectrum-actionbar-popover-border-color)));background-color:var(--mod-actionbar-popover-background-color,var(--spectrum-actionbar-popover-background-color));filter:drop-shadow(var(--mod-actionbar-shadow-horizontal,var(--spectrum-actionbar-shadow-horizontal))var(--mod-actionbar-shadow-vertical,var(--spectrum-actionbar-shadow-vertical))var(--mod-actionbar-shadow-blur,var(--spectrum-actionbar-shadow-blur))var(--mod-actionbar-shadow-color,var(--spectrum-actionbar-shadow-color)));pointer-events:auto;flex-direction:row;margin:auto;padding-block:0;display:flex;position:relative}.close-button{flex-shrink:0;margin-block-start:var(--mod-actionbar-spacing-close-button-top,var(--spectrum-actionbar-spacing-close-button-top));margin-inline-start:var(--mod-actionbar-spacing-close-button-start,var(--spectrum-actionbar-spacing-close-button-start));margin-inline-end:var(--mod-actionbar-spacing-close-button-end,var(--spectrum-actionbar-spacing-close-button-end))}.field-label{font-size:var(--mod-actionbar-item-counter-font-size,var(--spectrum-actionbar-item-counter-font-size));color:var(--mod-actionbar-item-counter-color,var(--spectrum-actionbar-item-counter-color));line-height:var(--mod-actionbar-item-counter-line-height,var(--spectrum-actionbar-item-counter-line-height));margin-block-start:var(--mod-actionbar-spacing-item-counter-top,var(--spectrum-actionbar-spacing-item-counter-top));margin-inline-end:var(--mod-actionbar-spacing-item-counter-end,var(--spectrum-actionbar-spacing-item-counter-end));padding:0}.field-label:lang(ja),.field-label:lang(ko),.field-label:lang(zh){line-height:var(--mod-actionbar-item-counter-line-height-cjk,var(--spectrum-actionbar-item-counter-line-height-cjk))}.action-group{margin-block-start:var(--mod-actionbar-spacing-action-group-top,var(--spectrum-actionbar-spacing-action-group-top));margin-inline-start:auto;margin-inline-end:var(--mod-actionbar-spacing-action-group-end,var(--spectrum-actionbar-spacing-action-group-end))}:host([emphasized]) #popover{filter:none;background-color:var(--mod-actionbar-emphasized-background-color,var(--spectrum-actionbar-emphasized-background-color));border-color:#0000}:host([emphasized]) .field-label{color:var(--mod-actionbar-emphasized-item-counter-color,var(--spectrum-actionbar-emphasized-item-counter-color))}:host([variant=sticky]){position:sticky;inset-inline:0}:host([variant=fixed]){position:fixed}:host([flexible]) #popover{inline-size:auto}:host{--spectrum-actionbar-popover-background-color:var(--system-action-bar-popover-background-color);--spectrum-actionbar-popover-border-color:var(--system-action-bar-popover-border-color)}:host{display:block}:host([flexible]){display:inline-block}
`;var le=Object.defineProperty,de=Object.getOwnPropertyDescriptor,k=(t,e,a,o)=>{for(var i=o>1?void 0:o?de(e,a):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(i=(o?r(e,a,i):r(i))||i);return o&&i&&le(e,a,i),i};const pe=["sticky","fixed"];class y extends A(G){constructor(){super(...arguments),this.emphasized=!1,this.flexible=!1,this.open=!1,this._variant=""}static get styles(){return[ce]}set variant(e){if(e!==this.variant){if(pe.includes(e)){this.setAttribute("variant",e),this._variant=e;return}this.removeAttribute("variant"),this._variant=""}}get variant(){return this._variant}handleClick(){this.open=!1,this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0,cancelable:!0}))||(this.open=!0)}render(){return c`
            <sp-popover ?open=${this.open} id="popover">
                <slot name="override">
                    <sp-close-button
                        static-color=${U(this.emphasized?"white":void 0)}
                        class="close-button"
                        label="Clear selection"
                        @click=${this.handleClick}
                    ></sp-close-button>
                    <sp-field-label class="field-label">
                        <slot></slot>
                    </sp-field-label>
                    <sp-action-group
                        class="action-group"
                        quiet
                        static-color=${U(this.emphasized?"white":void 0)}
                    >
                        <slot name="buttons"></slot>
                    </sp-action-group>
                </slot>
            </sp-popover>
        `}}k([x({type:Boolean,reflect:!0})],y.prototype,"emphasized",2),k([x({type:Boolean,reflect:!0})],y.prototype,"flexible",2),k([x({type:Boolean,reflect:!0})],y.prototype,"open",2),k([x({type:String})],y.prototype,"variant",1);O("sp-action-bar",y);const he=({width:t=24,height:e=24,hidden:a=!1,title:o="Delete"}={})=>I`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${t}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${o}"
  >
    <path
      d="m8.24902,15.02148c-.40039,0-.7334-.31738-.74805-.7207l-.25-6.5c-.0166-.41406.30664-.7627.71973-.77832.01074-.00098.02051-.00098.03027-.00098.40039,0,.7334.31738.74805.7207l.25,6.5c.0166.41406-.30664.7627-.71973.77832-.01074.00098-.02051.00098-.03027.00098Z"
      fill="currentColor"
    />
    <path
      d="m11.75098,15.02148c-.00977,0-.01953,0-.03027-.00098-.41309-.01562-.73633-.36426-.71973-.77832l.25-6.5c.01465-.40332.34766-.7207.74805-.7207.00977,0,.01953,0,.03027.00098.41309.01562.73633.36426.71973.77832l-.25,6.5c-.01465.40332-.34766.7207-.74805.7207Z"
      fill="currentColor"
    />
    <path
      d="m17,4h-3.5v-.75c0-1.24023-1.00977-2.25-2.25-2.25h-2.5c-1.24023,0-2.25,1.00977-2.25,2.25v.75h-3.5c-.41406,0-.75.33594-.75.75s.33594.75.75.75h.52002l.42236,10.3418c.04785,1.20996,1.03613,2.1582,2.24805,2.1582h7.61914c1.21191,0,2.2002-.94824,2.24805-2.1582l.42236-10.3418h.52002c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Zm-9-.75c0-.41309.33691-.75.75-.75h2.5c.41309,0,.75.33691.75.75v.75h-4v-.75Zm6.55957,12.53125c-.0166.40332-.3457.71875-.75.71875h-7.61914c-.4043,0-.7334-.31543-.75-.71875l-.41968-10.28125h9.9585l-.41968,10.28125Z"
      fill="currentColor"
    />
  </svg>`,ue=({width:t=24,height:e=24,hidden:a=!1,title:o="Delete"}={})=>I`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${t}"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${o}"
  >
    <path
      d="M31.5 6H24V4a2 2 0 0 0-2-2H12a2 2 0 0 0-2 2v2H2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2l2.413 25.1a1 1 0 0 0 1 .9h18.179a1 1 0 0 0 1-.9L29.5 8h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5ZM11.065 29A1 1 0 0 1 10 28.068l-1.071-16a1 1 0 1 1 2-.134l1.071 16A1 1 0 0 1 11.065 29ZM18 28a1 1 0 0 1-2 0V12a1 1 0 0 1 2 0Zm4-22H12V4h10Zm2 22.068a1 1 0 1 1-2-.134l1.071-16a1 1 0 1 1 2 .134Z"
    />
  </svg>`;class me extends Z{render(){return j(c),this.spectrumVersion===2?he({hidden:!this.label,title:this.label}):ue({hidden:!this.label,title:this.label})}}O("sp-icon-delete",me);const be=({width:t=24,height:e=24,hidden:a=!1,title:o="Download"}={})=>I`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${t}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${o}"
  >
    <path
      d="m13.53027,9.42676c-.29199-.29199-.7666-.29395-1.06055,0l-1.7168,1.71411V2.75c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v8.39941l-1.72266-1.72266c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l2.99805,2.99805c.14648.14648.33789.21973.53027.21973.19141,0,.38379-.07324.53027-.21973l3.00195-2.99805c.29297-.29199.29297-.76758,0-1.06055Z"
      fill="currentColor"
    />
    <path
      d="m15.75,18H4.25c-1.24023,0-2.25-1.00977-2.25-2.25v-2.02148c0-.41406.33594-.75.75-.75s.75.33594.75.75v2.02148c0,.41309.33691.75.75.75h11.5c.41309,0,.75-.33691.75-.75v-2.02148c0-.41406.33594-.75.75-.75s.75.33594.75.75v2.02148c0,1.24023-1.00977,2.25-2.25,2.25Z"
      fill="currentColor"
    />
  </svg>`,ge=({width:t=24,height:e=24,hidden:a=!1,title:o="Save To"}={})=>I`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${t}"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${o}"
  >
    <path
      d="M33 10h-6a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3v16H6V14h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v22a1 1 0 0 0 1 1h30a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1Z"
    />
    <path
      d="m10.2 17.331 7.445 7.525a.5.5 0 0 0 .7 0l7.455-7.525a.782.782 0 0 0 .2-.526.8.8 0 0 0-.8-.8H20V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v13h-5.2a.8.8 0 0 0-.8.8.782.782 0 0 0 .2.531Z"
    />
  </svg>`;class ve extends Z{render(){return j(c),this.spectrumVersion===2?be({hidden:!this.label,title:this.label}):ge({hidden:!this.label,title:this.label})}}O("sp-icon-download",ve);const fe=1e4;var we=Object.defineProperty,ye=Object.getOwnPropertyDescriptor,v=(t,e,a,o)=>{for(var i=o>1?void 0:o?ye(e,a):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(i=(o?r(e,a,i):r(i))||i);return o&&i&&we(e,a,i),i};async function xe(t){const e=await createImageBitmap(t.blob);return`${e.width} x ${e.height}`}let m=class extends q{constructor(){super(...arguments),this.images=new Map,this.prevImages=null,this.selectedImageId=null,this.prevSelectedImageId=null,this.checkedSet=new Set,this.overlayOpen=!1,this.psWebOpen=!1,this.isEditorTab=!1,this.isLoading=!0,this.lastClickedPivotId=null}async firstUpdated(){const t=await w.getAllNotMarkedForDeletion(),e=await g.getValue();t&&(this.images=new Map(t.map(i=>[i.id,i])),this.selectedImageId=e??null,this.isLoading=!1);const a=await M.getValue();if(this.psWebOpen=!!a,M.watch(i=>{this.psWebOpen=!!i}),$("dbImageChanged",async i=>{const{data:s}=i,r=await w.get(s);r?this.images.set(s,r):this.images.delete(s),this.requestUpdate()}),$("dbImagesChanged",async()=>{const i=await w.getAllNotMarkedForDeletion(),s=new Map(i.map(r=>[r.id,r]));this.images=s,this.isLoading=!1}),$("toggleSidePanelOverlay",i=>{this.overlayOpen=i.data}),(await F.getItem("sync:options")??R).persistSidePanelAcrossTabs)this.isEditorTab=!0;else{const i=await p.tabs.query({active:!0,currentWindow:!0});this.isEditorTab=i[0].url===p.runtime.getURL("/editor.html")}g.watch(i=>{this.selectedImageId=i}),h("trackEvent",{"event.workflow":"LAUNCH","event.subcategory":"Load Page","event.type":"render","event.subtype":"chrome-extension-side-panel"})}updated(t){if(t.has("images")&&this.selectedImageId!==null){const e=this.shadowRoot?.querySelector(`[data-image-id="${this.selectedImageId}"]`);e&&e.scrollIntoView({behavior:"smooth",block:"nearest"})}}async openEditor(){await g.setValue(this.selectedImageId);const t=p.runtime.getURL("/editor.html"),e=await p.tabs.query({url:t});if(e.length===0){const a=await p.tabs.query({active:!0,currentWindow:!0});p.tabs.create({url:t,active:!0,index:a[0].index+1})}else e[0].windowId!==p.windows.WINDOW_ID_CURRENT&&p.windows.update(e[0].windowId,{focused:!0}),p.tabs.update(e[0].id,{active:!0})}async prepareBlob(t,e,a=1){const o=await createImageBitmap(t),i=new OffscreenCanvas(o.width,o.height);return i.getContext("2d").drawImage(o,0,0),await i.convertToBlob({type:`image/${e}`,quality:a})}async download(t,e=1){if(this.selectedImageId!==null)try{const a=this.images.get(this.selectedImageId),o=a.editedBlob??a.blob,i=await this.prepareBlob(o,t,e),s=document.createElement("a");s.style.display="none",s.href=URL.createObjectURL(i),s.download=`${n.t("common.downloadFilename")}.${i.type.split("/")[1]}`,s.click(),URL.revokeObjectURL(s.href),h("trackEvent",{"event.workflow":"EXPORT","event.subcategory":"Export","event.type":"success","event.subtype":"export","event.value":t})}catch{h("trackEvent",{"event.workflow":"EXPORT","event.subcategory":"Export","event.type":"error","event.subtype":"export","event.value":t})}}async batchDownload(t,e=1){try{if(this.checkedSet.size===1){const[a]=[...this.checkedSet],o=this.images.get(a),i=await this.prepareBlob(o.editedBlob??o.blob,t,e),s=document.createElement("a");s.style.display="none",s.href=URL.createObjectURL(i),s.download=`${n.t("common.downloadFilename")}.${i.type.split("/")[1]}`,s.click(),URL.revokeObjectURL(s.href)}else{const a=await this.checkedSet.values().map(s=>this.images.get(s).editedBlob??this.images.get(s).blob).reduce(async(s,r,l)=>{const d=await s,b=await this.prepareBlob(r,t,e);return d[`${n.t("common.downloadFilename")}_${l+1}.${b.type.split("/")[1]}`]=new Uint8Array(await b.arrayBuffer()),s},Promise.resolve({})),o=await new Promise((s,r)=>{te(a,(l,d)=>{l&&r(l),s(new File([d],`${n.t("common.downloadZipFilename")}.zip`,{type:"application/zip"}))})}),i=document.createElement("a");i.style.display="none",i.href=URL.createObjectURL(o),i.download=`${n.t("common.downloadZipFilename")}.zip`,i.click(),URL.revokeObjectURL(i.href)}h("trackEvent",{"event.workflow":"EXPORT","event.subcategory":"Export","event.type":"success","event.subtype":"export","event.value":t})}catch{h("trackEvent",{"event.workflow":"EXPORT","event.subcategory":"Export","event.type":"error","event.subtype":"export","event.value":t})}}setSidePanelMultiSelect(t){this.isEditorTab&&N.setValue(t)}deleteImagesWithUndo(t,e){if(this.selectedImageId!==null&&t.includes(this.selectedImageId)){const a=[...this.images.keys()],o=a.indexOf(this.selectedImageId),i=a.filter(s=>!t.includes(s));this.prevSelectedImageId=this.selectedImageId,this.selectedImageId=i[o]??i.at(-1)??null,g.setValue(this.selectedImageId)}this.prevImages=new Map(this.images);for(const a of t)this.images.delete(a);this.requestUpdate(),w.patchMany(Object.fromEntries(t.map(a=>[a,{markedForDeletion:1}]))),h("deleteTimeout",{ids:t,deletionType:e}),h("dbImagesChanged",void 0),window.dispatchEvent(new Y({variant:"info",content:c`
					${n.t("sidePanel.imagesDeleted",t.length)}
					<sp-button
						slot="action"
						quiet
						static-color="white"
						variant="secondary"
						@click=${a=>this.undoDelete(a,t)}
					>
						${n.t("header.undo")}
					</sp-button>
				`,timeout:fe}))}async undoDelete(t,e){if(h("clearDeleteTimeout",e),t.target.dispatchEvent(new Event("close",{bubbles:!0})),await w.patchMany(Object.fromEntries(e.map(a=>[a,{markedForDeletion:0}]))),this.images=this.prevImages,this.prevImages=null,this.prevSelectedImageId&&(this.selectedImageId=this.prevSelectedImageId,g.setValue(this.selectedImageId),this.prevSelectedImageId=null),h("dbImagesChanged",void 0),this.requestUpdate(),this.checkedSet.clear(),this.setSidePanelMultiSelect(!1),this.selectedImageId===null&&this.images.size>0){const a=Array.from(this.images.values())[0];this.selectedImageId=a.id,g.setValue(this.selectedImageId)}}openDownloadModal(t=!1){J(c`<psx-download-modal
				?batch=${t}
				@download-click=${e=>{t?this.batchDownload(e.fileType):this.download(e.fileType)}}
			></psx-download-modal>`,{type:"modal"})}removeContiguousSelectedItems(t,e,a){for(let o=e;a>0?o<t.length:o>=0;o+=a)if(this.checkedSet.has(t[o]))this.checkedSet.delete(t[o]);else return}handleShiftSelectClick(t){if(this.lastClickedPivotId===null){this.checkedSet.add(t),this.lastClickedPivotId=t;return}const e=Array.from(this.images.keys()),a=e.indexOf(this.lastClickedPivotId),o=e.indexOf(t);if(a===-1||o===-1)return;const i=Math.min(a,o),s=Math.max(a,o),r=o>a?1:-1,l=!this.checkedSet.has(t)&&this.checkedSet.has(e[o+r]);for(let d=i;d<=s;d++)this.checkedSet.add(e[d]);l||(this.removeContiguousSelectedItems(e,i-1,-1),this.removeContiguousSelectedItems(e,s+1,1))}handleMultiSelectClick(t){const e=t.target,a=Number(e.dataset.imageId);t.shiftKey?(e.tagName==="SP-CHECKBOX"&&this.checkedSet.has(a)&&t.preventDefault(),this.checkedSet.size===0?(this.checkedSet.add(a),this.lastClickedPivotId=a,this.setSidePanelMultiSelect(!0)):this.handleShiftSelectClick(a)):this.checkedSet.has(a)?(this.checkedSet.delete(a),this.checkedSet.size===0&&(this.checkedSet.clear(),this.setSidePanelMultiSelect(!1),this.lastClickedPivotId=null)):(this.checkedSet.add(a),this.setSidePanelMultiSelect(!0),this.lastClickedPivotId=a),this.requestUpdate()}render(){const t=this.selectedImageId!==null&&this.checkedSet.size===0;return this.psWebOpen?c`<div id="ps-web-container">
				<div id="ps-web-message">
					${ee(n.t("sidePanel.psWebOpen.message"))}
				</div>
				<div id="ps-web-footer">
					<i>${n.t("sidePanel.psWebOpen.footer")}</i>
				</div>
			</div>`:c`<header>
				<h1>${n.t("sidePanel.title")}</h1>
			</header>
			<main>
				<div
					id="thumbnails"
					class=${C({"batch-selected":this.checkedSet.size>0})}
				>
					${this.isLoading?P:this.images.size===0?c`
									<div class="thumbnail-container placeholder">
										<img
											class="thumbnail"
											src="${p.runtime.getURL("/samples/placeholder.webp")}"
											alt=""
										/>
									</div>
									<div class="thumbnail-container placeholder">
										<div class="thumbnail"></div>
									</div>
									<div class="thumbnail-container placeholder">
										<div class="thumbnail"></div>
									</div>
									<div class="empty-state">
										<h3>${n.t("emptyState.heading")}</h3>
										<p>${n.t("emptyState.hoverInstruction")}</p>
										<p>
											${n.t("emptyState.rightClickInstruction",[n.t("common.addToPsExt")])}
										</p>
									</div>
								`:re(this.images,([e,a])=>{const o=e===this.selectedImageId,i=this.checkedSet.has(e),{blob:s,editedBlob:r}=a,l=C({"thumbnail-container":!0,selected:o,checked:i}),d=C({"checkbox-container":!0,checked:i});if(!s)return c`<div class="thumbnail-container loading">
											<sp-progress-circle
												size="l"
												label=${n.t("common.loading")}
												indeterminate
											></sp-progress-circle>
										</div>`;const b=r?URL.createObjectURL(r):URL.createObjectURL(s);return c`<div class=${l}>
										<img
											draggable="false"
											class="thumbnail"
											src=${b}
											data-image-id=${e}
											@click=${async u=>{!u.shiftKey&&this.checkedSet.size===0?(this.selectedImageId=e,await g.setValue(e),this.openEditor(),this.checkedSet.clear(),this.setSidePanelMultiSelect(!1)):this.handleMultiSelectClick(u),this.requestUpdate()}}
											ref=${ne(u=>{u||URL.revokeObjectURL(b)})}
										/>
										<div class=${d}>
											<sp-checkbox
												size="l"
												.checked=${i}
												data-image-id=${e}
												@click=${this.handleMultiSelectClick}
											></sp-checkbox>
										</div>
									</div> `})}
				</div>
				<sp-action-bar
					variant="fixed"
					emphasized
					?open=${this.checkedSet.size>0}
					@close=${()=>{this.checkedSet.clear(),this.setSidePanelMultiSelect(!1),this.lastClickedPivotId=null,this.requestUpdate()}}
				>
					${n.t("sidePanel.selected",[this.checkedSet.size])}
					<sp-action-button
						slot="buttons"
						label=${n.t("common.download")}
						@click=${()=>{this.openDownloadModal(!0),h("trackEvent",{"event.workflow":"EXPORT","event.subcategory":"Export","event.type":"click","event.subtype":"export","event.value":"batch","event.count":String(this.checkedSet.size),"ui.view_type":"side-panel"})}}
					>
						<sp-icon-download slot="icon"></sp-icon-download>
						<sp-tooltip self-managed placement="top"
							>${n.t("common.download")}</sp-tooltip
						>
					</sp-action-button>
					<sp-action-button
						slot="buttons"
						label=${n.t("common.delete")}
						@click=${async()=>{const e=[...this.checkedSet];this.deleteImagesWithUndo(e,"batch"),this.setSidePanelMultiSelect(!1),this.checkedSet.clear(),this.lastClickedPivotId=null,this.requestUpdate()}}
					>
						<sp-icon-delete slot="icon"></sp-icon-delete>
						<sp-tooltip self-managed placement="top"
							>${n.t("common.delete")}</sp-tooltip
						>
					</sp-action-button>
				</sp-action-bar>
			</main>
			<psx-toast
				style="bottom: ${t?"238px":this.checkedSet.size>0?"72px":"12px"}"
			></psx-toast>

			${T(t,()=>{const e=this.images.get(this.selectedImageId),a=[{label:n.t("sidePanel.details.source"),get value(){return e.originalSrc.startsWith("data:")?c`<span>${e.originalSrc}</span>`:c`<a
								title=${e.originalSrc}
								href=${e.originalSrc}
								target="_blank"
								rel="noopener noreferrer"
								>${e.originalSrc}</a
							>`},cssClass:"source"},{label:n.t("sidePanel.details.dimensions"),get value(){return e.imageData?`${e.imageData.outpaintRect.w} x ${e.imageData.outpaintRect.h}`:se(xe(e),c`<span class="skeleton-loader"></span>`)}},{label:n.t("sidePanel.details.type"),get value(){return e.modified?n.t("sidePanel.details.modifiedValue"):e.type}},{label:n.t("sidePanel.details.size"),get value(){return e.modified?n.t("sidePanel.details.modifiedValue"):`${Math.round(e.originalSize/1024)} KB`}},{label:n.t("sidePanel.details.added"),get value(){return e.addedAt.toLocaleString()}},{label:n.t("sidePanel.details.modified"),get value(){return e.updatedAt.toLocaleString()}}];return c`<footer>
					<div id="details">
						${a.map(o=>c`
								<span class="details-label">${o.label}</span>
								<span class="details-value ${o.cssClass||""}">
									${e?.ready?o.value:c`<span class="skeleton-loader"></span>`}
								</span>
							`)}
					</div>
					<div id="footer-buttons">
						<sp-action-button
							label=${n.t("common.delete")}
							quiet
							?disabled=${!e?.ready}
							@click=${()=>{this.deleteImagesWithUndo([e.id],"single")}}
						>
							<sp-icon-delete slot="icon"></sp-icon-delete>
							<sp-tooltip self-managed placement="top"
								>${n.t("common.delete")}</sp-tooltip
							>
						</sp-action-button>
						<sp-action-button
							label=${n.t("common.download")}
							quiet
							?disabled=${!e?.ready}
							@click=${()=>{this.openDownloadModal(),h("trackEvent",{"event.workflow":"EXPORT","event.subcategory":"Export","event.type":"click","event.subtype":"export","event.value":"single","ui.view_type":"side-panel"})}}
						>
							<sp-icon-download slot="icon"></sp-icon-download>
							<sp-tooltip self-managed placement="top"
								>${n.t("common.download")}</sp-tooltip
							>
						</sp-action-button>
					</div>
				</footer>`})}
			${T(this.overlayOpen,()=>c`<sp-underlay open></sp-underlay>`)} `}};m.styles=L`
		:host {
			display: flex;
			flex-direction: column;
			gap: 8px;
			height: 100%;
			background-color: var(--spectrum-gray-50);
		}

		h1 {
			margin: 0;
			font-size: 16px;
			font-weight: 700;
		}

		header {
			box-sizing: border-box;
			padding: 16px 16px 0;
		}

		main {
			flex: 1;
			padding: 16px;
			box-sizing: border-box;
			overflow-y: auto;
			position: relative;
		}

		#thumbnails {
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;
			gap: 8px;
		}

		#thumbnails.batch-selected {
			margin-bottom: 64px;
		}

		.thumbnail-container {
			position: relative;
			height: 98px;
			width: 98px;
			user-select: none;
			border: 2px solid var(--spectrum-gray-100);
			border-radius: 4px;
			padding: 2px;
			box-sizing: border-box;
		}

		.thumbnail-container.loading {
			display: grid;
			place-items: center;
		}

		.thumbnail {
			box-sizing: border-box;
			object-fit: cover;
			height: 100%;
			width: 100%;
			border: 2px solid white;
			cursor: pointer;
			border-radius: 4px;
			/** checkerboard grid */
			background: repeating-conic-gradient(#ffffff 0 25%, #cccccc 0 50%) 0 /
				16px 16px;
		}

		.thumbnail-container:hover {
			border-color: var(--spectrum-gray-500);
		}

		.thumbnail-container.selected {
			border-color: var(--spectrum-gray-1000);
		}

		.thumbnail-container.checked {
			border-color: var(--spectrum-accent-content-color-selected);
		}

		.thumbnail-container:hover .checkbox-container {
			opacity: 1;
		}

		.thumbnail-container.placeholder:first-of-type {
			border: none;
			padding: 0;
		}

		.thumbnail-container.placeholder:hover {
			border-color: var(--spectrum-gray-100);
		}

		.thumbnail-container.placeholder .thumbnail {
			background: transparent;
			cursor: default;
			border: none;
		}

		.empty-state h3 {
			margin: 8px 0;
			font-size: 16px;
			font-weight: 700;
		}

		.empty-state p {
			margin: 8px 0;
			font-size: 14px;
			line-height: 1.5;
		}

		.checkbox-container {
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 24px;
			height: 24px;
			top: 8px;
			right: 8px;
			background: rgba(255, 255, 255, 0.5);
			opacity: 0;
			border-radius: 4px;
			transition: opacity 0.1s ease-in-out;

			--mod-checkbox-height: 24px;
		}

		.checkbox-container:hover {
			background: rgba(255, 255, 255, 0.8);
		}

		.checkbox-container.checked {
			opacity: 1;
			background: rgba(255, 255, 255, 0.8);
		}

		.remove {
			box-sizing: border-box;
			visibility: hidden;
			position: absolute;
			top: 4px;
			right: 4px;
			width: 20px;
			height: 20px;
			cursor: pointer;
			background: rgba(0, 0, 0, 0.5);
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			font-size: 12px;
		}

		.thumbnail-container:hover .remove {
			visibility: visible;
		}

		footer {
			border-top: 1px solid var(--spectrum-gray-400);
			background-color: var(--spectrum-background-layer-2-color);
			padding: 16px;
			display: flex;
			flex-direction: column;
			gap: 16px;
		}

		#details {
			display: grid;
			grid-template-columns: 1fr 3fr;
			gap: 8px 16px;
		}

		#footer-buttons {
			display: flex;
			justify-content: space-between;
		}

		.details-label {
			font-size: 14px;
			font-weight: 400;
			color: var(--spectrum-gray-700);
		}

		.details-value.source {
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

		.details-value .skeleton-loader {
			height: 12px;
			display: inline-block;
			width: 120px;
		}

		sp-action-bar {
			width: 90%;
			--mod-actionbar-emphasized-background-color: var(
				--spectrum-neutral-content-color-default
			);
		}

		sp-underlay {
			--mod-underlay-background-color: rgba(255, 255, 255, 0.7);
		}

		.skeleton-loader {
			background: linear-gradient(
				90deg,
				transparent 0%,
				var(--spectrum-gray-100) 50%,
				transparent 100%
			);
			background-color: var(--spectrum-gray-200);
			background-size: 200% 100%;
			animation: skeleton-shimmer 1.5s ease-in-out infinite;
			border-radius: 4px;
		}

		@keyframes skeleton-shimmer {
			0% {
				background-position: 200% 0;
			}
			100% {
				background-position: -200% 0;
			}
		}

		#ps-web-container {
			padding: 16px;
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			gap: 16px;
		}

		#ps-web-message {
			font-size: 16px;
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}

		#ps-web-footer {
			font-size: 14px;
			font-style: italic;
			text-align: center;
		}

		psx-toast {
			position: absolute;
			top: initial;
			left: 0;
			bottom: 12px;
		}
	`;v([f()],m.prototype,"images",2);v([f()],m.prototype,"selectedImageId",2);v([f()],m.prototype,"checkedSet",2);v([f()],m.prototype,"overlayOpen",2);v([f()],m.prototype,"psWebOpen",2);v([f()],m.prototype,"isLoading",2);m=v([X("psx-sidepanel")],m);Q();$("closeSidePanel",async()=>{await V.setValue(!1),window.close()});const[ke]=await p.tabs.query({active:!0,currentWindow:!0}),$e={...R,...await H.getValue()};($e?.persistSidePanelAcrossTabs||ke.url?.includes(p.runtime.getURL("/editor.html")))&&(p.runtime.connect({name:"psx-sidepanel"}),V.setValue(!0));
