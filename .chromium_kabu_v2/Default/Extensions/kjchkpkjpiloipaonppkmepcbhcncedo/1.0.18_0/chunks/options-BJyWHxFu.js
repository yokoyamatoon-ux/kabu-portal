import{a as h,r as v,i as b,h as n,s as p,c as s,x as m,t as u}from"./storage-xiDPc5Q0.js";import{b as w}from"./browser-BXPSLLBm.js";import"./sp-switch-D9cZX_WI.js";import{d as y}from"./options-sQn865RA.js";var g=Object.defineProperty,E=Object.getOwnPropertyDescriptor,l=(t,o,r,i)=>{for(var e=i>1?void 0:i?E(o,r):o,d=t.length-1,c;d>=0;d--)(c=t[d])&&(e=(i?c(o,r,e):c(e))||e);return i&&e&&g(o,r,e),e};let a=class extends b{constructor(){super(...arguments),this.options=y}async firstUpdated(){const t=await n.getValue();t&&(this.options={...this.options,...t}),p("trackEvent",{"event.workflow":"CHROME EXTENSION","event.subcategory":"Options","event.type":"render","event.subtype":"extension-options-modal","ui.view_type":"extension-options-modal"})}render(){return m`<main>
			<div id="list">
				<sp-switch
					?checked=${this.options.persistSidePanelAcrossTabs}
					@change=${()=>{this.options.persistSidePanelAcrossTabs=!this.options.persistSidePanelAcrossTabs,this.requestUpdate(),n.setValue(this.options),p("trackEvent",{"event.workflow":"CHROME EXTENSION","event.subcategory":"Options","event.type":"click","event.subtype":this.options.persistSidePanelAcrossTabs?"enable":"disable","event.value":"persist-side-panel"})}}
					>${s.t("options.persistSidePanel")}</sp-switch
				>
				<sp-switch
					?checked=${this.options.openEditorImmediately}
					@change=${()=>{this.options.openEditorImmediately=!this.options.openEditorImmediately,this.requestUpdate(),n.setValue(this.options),p("trackEvent",{"event.workflow":"CHROME EXTENSION","event.subcategory":"Options","event.type":"click","event.subtype":this.options.openEditorImmediately?"enable":"disable","event.value":"open-image-in-editor"})}}
					>${s.t("options.openEditorImmediately")}</sp-switch
				>
				<sp-switch
					?checked=${this.options.showBadge}
					@change=${()=>{this.options.showBadge=!this.options.showBadge,this.requestUpdate(),n.setValue(this.options),p("trackEvent",{"event.workflow":"CHROME EXTENSION","event.subcategory":"Options","event.type":"click","event.subtype":this.options.showBadge?"enable":"disable","event.value":"add-ps-badge-on-hover"})}}
					>${s.t("options.badgeOnHover")}<span class="subtext"
						>${s.t("options.rightClickToAdd",[s.t("common.addToPsExt")])}</span
					></sp-switch
				>
			</div>
		</main>`}};a.styles=h`
		main {
			box-sizing: border-box;
			padding: 20px;
		}

		#list {
			display: flex;
			flex-direction: column;
		}

		sp-switch .subtext {
			display: block;
			font-size: 12px;
			margin-top: 4px;
		}
	`;l([v()],a.prototype,"options",2);a=l([u("psx-options")],a);w.runtime.connect({name:"psx-options"});
