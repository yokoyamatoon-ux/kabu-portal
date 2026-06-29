import{i as Y,T as Re,E as L,x as u,o as M,n as f,e as O,d as z,_,a as $,S as pe,b as Ie,r as X,t as Q,s as y,c as m,f as Wr,F as Dt,g as Gt}from"./storage-xiDPc5Q0.js";import{R as Vr,p as Nr,v as ne,r as Se,M as ft,m as mr,f as Gr,t as x,s as A,o as ke,n as de,a as fr,b as o,c as ve,C as Ur,d as Ve,e as At,g as Ne,h as Ut,i as Qr,j as gr,k as Qt,l as Zr,q as Xr,F as Yr,P as S,u as Kr,S as Jr,D as ea,w as ta,x as Zt,y as ra}from"./newrelic-B-Cf_x5w.js";import{e as dt,i as br,t as ee,I as E,O as Tt,g as aa,u as ze,s as ia,a as _e,b as Bt,B as na,c as oa,n as sa,P as la,o as ca,d as da,f as ua}from"./sp-popover-CHn70rC8.js";import"./sp-switch-D9cZX_WI.js";import"./sp-card-BCkzVH2E.js";import"./sp-overlay-BkKXGUWC.js";import{b as pa}from"./browser-BXPSLLBm.js";const fe=Symbol("LitMobxRenderReaction"),Xt=Symbol("LitMobxRequestUpdate");function ha(r,e){var t,a;return a=class extends r{constructor(){super(...arguments),this[t]=()=>{this.requestUpdate()}}connectedCallback(){super.connectedCallback();const n=this.constructor.name||this.nodeName;this[fe]=new e(`${n}.update()`,this[Xt]),this.hasUpdated&&this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this[fe]&&(this[fe].dispose(),this[fe]=void 0)}update(n){this[fe]?this[fe].track(super.update.bind(this,n)):super.update(n)}},t=Xt,a}function ma(r){return ha(r,Vr)}class He extends ma(Y){}const Yt=(r,e,t)=>{const a=new Map;for(let i=e;i<=t;i++)a.set(r[i],i);return a},gt=dt(class extends br{constructor(r){if(super(r),r.type!==ee.CHILD)throw Error("repeat() can only be used in text expressions")}dt(r,e,t){let a;t===void 0?t=e:e!==void 0&&(a=e);const i=[],n=[];let s=0;for(const c of r)i[s]=a?a(c,s):s,n[s]=t(c,s),s++;return{values:n,keys:i}}render(r,e,t){return this.dt(r,e,t).values}update(r,[e,t,a]){const i=Nr(r),{values:n,keys:s}=this.dt(e,t,a);if(!Array.isArray(i))return this.ut=s,n;const c=this.ut??=[],l=[];let d,p,h=0,b=i.length-1,g=0,v=n.length-1;for(;h<=b&&g<=v;)if(i[h]===null)h++;else if(i[b]===null)b--;else if(c[h]===s[g])l[g]=ne(i[h],n[g]),h++,g++;else if(c[b]===s[v])l[v]=ne(i[b],n[v]),b--,v--;else if(c[h]===s[v])l[v]=ne(i[h],n[v]),Se(r,l[v+1],i[h]),h++,v--;else if(c[b]===s[g])l[g]=ne(i[b],n[g]),Se(r,i[h],i[b]),b--,g++;else if(d===void 0&&(d=Yt(s,g,v),p=Yt(c,h,b)),d.has(c[h]))if(d.has(c[b])){const w=p.get(s[g]),k=w!==void 0?i[w]:null;if(k===null){const C=Se(r,i[h]);ne(C,n[g]),l[g]=C}else l[g]=ne(k,n[g]),Se(r,i[h],k),i[w]=null;g++}else ft(i[b]),b--;else ft(i[h]),h++;for(;g<=v;){const w=Se(r,l[v+1]);ne(w,n[g]),l[g++]=w}for(;h<=b;){const w=i[h++];w!==null&&ft(w)}return this.ut=s,mr(r,l),Re}});const fa=dt(class extends br{constructor(r){if(super(r),r.type!==ee.PROPERTY&&r.type!==ee.ATTRIBUTE&&r.type!==ee.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Gr(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(r,[e]){if(e===Re||e===L)return e;const t=r.element,a=r.name;if(r.type===ee.PROPERTY){if(e===t[a])return Re}else if(r.type===ee.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(a))return Re}else if(r.type===ee.ATTRIBUTE&&t.getAttribute(a)===e+"")return Re;return mr(r),e}});function*ga(r,e){const t=typeof e=="function";if(r!==void 0){let a=-1;for(const i of r)a>-1&&(yield t?e(a):e),a++,yield i}}class ye{constructor(){this.iconsetMap=new Map}static getInstance(){return ye.instance||(ye.instance=new ye),ye.instance}addIconset(e,t){this.iconsetMap.set(e,t);const a=new CustomEvent("sp-iconset-added",{bubbles:!0,composed:!0,detail:{name:e,iconset:t}});setTimeout(()=>window.dispatchEvent(a),0)}removeIconset(e){this.iconsetMap.delete(e);const t=new CustomEvent("sp-iconset-removed",{bubbles:!0,composed:!0,detail:{name:e}});setTimeout(()=>window.dispatchEvent(t),0)}getIconset(e){return this.iconsetMap.get(e)}}var ba=Object.defineProperty,bt=(r,e,t,a)=>{for(var i=void 0,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=s(e,t,i)||i);return i&&ba(e,t,i),i};class Ge extends E{constructor(){super(...arguments),this.iconsetListener=e=>{if(!this.name)return;const t=this.parseIcon(this.name);e.detail.name===t.iconset&&(this.updateIconPromise=this.updateIcon())}}connectedCallback(){super.connectedCallback(),window.addEventListener("sp-iconset-added",this.iconsetListener)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("sp-iconset-added",this.iconsetListener)}firstUpdated(){this.updateIconPromise=this.updateIcon()}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),this.updateIconPromise=this.updateIcon()}announceIconImageSrcError(){this.dispatchEvent(new Event("error",{cancelable:!1,bubbles:!1,composed:!1}))}render(){return this.name?u`
                <div id="container"></div>
            `:this.src?u`
                <img
                    src="${this.src}"
                    alt=${M(this.label)}
                    @error=${this.announceIconImageSrcError}
                />
            `:super.render()}async updateIcon(){if(this.updateIconPromise&&await this.updateIconPromise,!this.name)return Promise.resolve();const e=this.parseIcon(this.name),t=ye.getInstance().getIconset(e.iconset);return!t||!this.iconContainer?Promise.resolve():(this.iconContainer.innerHTML="",t.applyIconToElement(this.iconContainer,e.icon,this.size||"",this.label?this.label:""))}parseIcon(e){const t=e.split(":");let a="default",i=e;return t.length>1&&(a=t[0],i=t[1]),{iconset:a,icon:i}}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.updateIconPromise,e}}bt([f()],Ge.prototype,"src"),bt([f()],Ge.prototype,"name"),bt([O("#container")],Ge.prototype,"iconContainer");const va=({width:r=24,height:e=24,hidden:t=!1,title:a="Layers"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="m10,13.5c-.43018,0-.85986-.12305-1.23535-.36914l-6.03564-3.96582c-.63525-.41699-1.01465-1.11914-1.01465-1.87891-.00049-.76074.37891-1.46387,1.01416-1.88184l6.03613-3.96582c.75-.49219,1.71973-.49219,2.4707,0l6.03564,3.96582c.63574.41797,1.01514,1.12109,1.01465,1.88184,0,.75977-.37939,1.46191-1.01465,1.87891l-6.03564,3.96582c-.375.24609-.80518.36914-1.23535.36914Zm-.41211-1.62305c.25.16406.57422.16406.82422,0l6.03564-3.96582c.21484-.14062.33789-.36914.33789-.62598s-.12305-.48535-.33838-.62695l-6.03516-3.96582c-.25-.16406-.57422-.16406-.82422,0l-6.03564,3.96582c-.21484.1416-.33789.37012-.33789.62695s.12305.48535.33789.62598l6.03564,3.96582Z"
      fill="currentColor"
    />
    <path
      d="m10,19c-.43018,0-.85986-.12305-1.23535-.36914l-6.03564-3.96582c-.57715-.37891-.94238-.99023-1.00098-1.6748-.05957-.69434.19678-1.36426.70312-1.83887.30225-.28223.77734-.2666,1.06006.03516.2832.30273.26758.77734-.03467,1.06055-.16895.15723-.25391.38184-.23389.61426.01123.13184.06885.37891.32959.5498l6.03564,3.96582c.25.16406.57422.16406.82422,0l6.03564-3.96582c.26074-.1709.31885-.41797.33008-.5498.02002-.23242-.06543-.45605-.23438-.61426-.30225-.2832-.31787-.75781-.03467-1.06055.2832-.30176.7583-.31738,1.06006-.03516.50684.47461.76318,1.14453.70361,1.83887-.05908.68555-.42432,1.2959-1.00146,1.6748l-6.03564,3.96582c-.375.24609-.80518.36914-1.23535.36914Z"
      fill="currentColor"
    />
  </svg>`,ya=({width:r=24,height:e=24,hidden:t=!1,title:a="Layers"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 36 36"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="m28.288 19.938-9.839 6.827a.788.788 0 0 1-.898 0l-9.839-6.827L1.858 24a.25.25 0 0 0 0 .41l15.85 10.999a.512.512 0 0 0 .584 0l15.85-10.998a.25.25 0 0 0 0-.41Z"
    />
    <path
      d="M17.699 22.988 1.858 11.996a.25.25 0 0 1 0-.41L17.698.594a.529.529 0 0 1 .603 0l15.841 10.992a.25.25 0 0 1 0 .41l-15.84 10.992a.529.529 0 0 1-.603 0Z"
    />
  </svg>`;class wa extends E{render(){return A(u),this.spectrumVersion===2?va({hidden:!this.label,title:this.label}):ya({hidden:!this.label,title:this.label})}}z("sp-icon-layers",wa);const ka=({width:r=24,height:e=24,hidden:t=!1,title:a="View Grid"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="m6.75,18h-2.5c-1.24023,0-2.25-1.00977-2.25-2.25v-2.5c0-1.24023,1.00977-2.25,2.25-2.25h2.5c1.24023,0,2.25,1.00977,2.25,2.25v2.5c0,1.24023-1.00977,2.25-2.25,2.25Zm-2.5-5.5c-.41309,0-.75.33691-.75.75v2.5c0,.41309.33691.75.75.75h2.5c.41309,0,.75-.33691.75-.75v-2.5c0-.41309-.33691-.75-.75-.75h-2.5Z"
      fill="currentColor"
    />
    <path
      d="m6.75,9h-2.5c-1.24023,0-2.25-1.00977-2.25-2.25v-2.5c0-1.24023,1.00977-2.25,2.25-2.25h2.5c1.24023,0,2.25,1.00977,2.25,2.25v2.5c0,1.24023-1.00977,2.25-2.25,2.25Zm-2.5-5.5c-.41309,0-.75.33691-.75.75v2.5c0,.41309.33691.75.75.75h2.5c.41309,0,.75-.33691.75-.75v-2.5c0-.41309-.33691-.75-.75-.75h-2.5Z"
      fill="currentColor"
    />
    <path
      d="m15.75,18h-2.5c-1.24023,0-2.25-1.00977-2.25-2.25v-2.5c0-1.24023,1.00977-2.25,2.25-2.25h2.5c1.24023,0,2.25,1.00977,2.25,2.25v2.5c0,1.24023-1.00977,2.25-2.25,2.25Zm-2.5-5.5c-.41309,0-.75.33691-.75.75v2.5c0,.41309.33691.75.75.75h2.5c.41309,0,.75-.33691.75-.75v-2.5c0-.41309-.33691-.75-.75-.75h-2.5Z"
      fill="currentColor"
    />
    <path
      d="m15.75,9h-2.5c-1.24023,0-2.25-1.00977-2.25-2.25v-2.5c0-1.24023,1.00977-2.25,2.25-2.25h2.5c1.24023,0,2.25,1.00977,2.25,2.25v2.5c0,1.24023-1.00977,2.25-2.25,2.25Zm-2.5-5.5c-.41309,0-.75.33691-.75.75v2.5c0,.41309.33691.75.75.75h2.5c.41309,0,.75-.33691.75-.75v-2.5c0-.41309-.33691-.75-.75-.75h-2.5Z"
      fill="currentColor"
    />
  </svg>`,xa=({width:r=24,height:e=24,hidden:t=!1,title:a="Classic Grid View"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${r}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <rect height="14" rx="1" ry="1" width="14" x="2" y="2" />
    <rect height="14" rx="1" ry="1" width="14" x="20" y="2" />
    <rect height="14" rx="1" ry="1" width="14" x="2" y="20" />
    <rect height="14" rx="1" ry="1" width="14" x="20" y="20" />
  </svg>`;class Ca extends E{render(){return A(u),this.spectrumVersion===2?ka({hidden:!this.label,title:this.label}):xa({hidden:!this.label,title:this.label})}}z("sp-icon-view-grid",Ca);const za=()=>{const e=`
		self.wasmUrl = '${new URL("./release/legacy/acr_web.wasm",self.location.href)}'
		self.origin = '${window.location.origin}'
;(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    const loadLegacy = () => {
        const wasmUrl = self.wasmUrl;
        self.Module = {
            locateFile: (file) => {
                return file === 'ic_web.wasm' ? wasmUrl : file;
            },
        };
        ${String.raw`var b;b||(b=typeof Module !== 'undefined' ? Module : {});b.COMPAT_wrapExportedFunctions=function(){function a(h,k,l){h=h.apply(null,l);c&&c(k,h)}for(var c=void 0,d={so:function(h){c=h}},e=b.exportedFunctionNames,f=b.getExportedFunctions(),g=0;g<e.length;g++)d[e[g]]=a.bind(null,f[g]);return d};
b.COMPAT_startMessageQueueHandler=function(a){a.so(function(e,f){self.postMessage({id:e,result:f},f instanceof ArrayBuffer?[f]:void 0)});var c=b.exportedFunctionNames,d=self.onmessage;self.onmessage=function(e){var f=e.data,g=c[f.method];(g=g&&a[g])?g(f.id,f.params):d&&d(e)};self.postMessage({id:0,result:c})};b.COMPAT_postRuntimeWorkerLoaded=function(){var a=b.COMPAT_wrapExportedFunctions();b.COMPAT_startMessageQueueHandler(a)};
b.COMPAT_postRuntimeInitialized=function(a){if(void 0!=a){var c=void 0,d=function(k,l,m){var n=m.filter(function(w){return w instanceof ArrayBuffer}),q={};q.id=l;q.method=k;q.params=m;a.postMessage(q,n)};var e={so:function(k){c=k}};for(var f=b.exportedFunctionNames,g=0;g<f.length;g++)e[f[g]]=d.bind(null,g);var h=a.onmessage;a.onmessage=function(k){var l=k.data;l.cmd?h(k):c&&c(l.id,l.result)}}else e=b.COMPAT_wrapExportedFunctions();b.COMPAT_startMessageQueueHandler(e)};b.exportedFunctionNames="initialize reopen reset getVersion setLocale setTranslations addSettings addCameraProfiles addLensProfiles readImage getImageArea getImageAspect getOriginalArea getFilterAreas renderCurrent renderDefault renderCropped getModelName isMonochrome isWhiteBalanceIncremental isAnyCameraProfileColor hasValidGainMap isModified isProfileModified isCropModified isLensProfileModified isRetouchModified isLocalCorrectionsModified isDefault isCropDefault getProcessVersion setProcessVersion getSupportedProcessVersions setCurrentProcessVersion getOrientation setOrientation getSettings setSettings setAdaptiveProfileSettings getNeedsUpdateAISettings getWhiteBalance getWhiteBalanceDefault getWhiteBalanceMode setWhiteBalance setWhiteBalanceMode setWhiteBalanceFromPoint getCurves setCurves setCurve setMaskCurveRefineSaturation getMaskCurveRefineSaturation getParameterNames getParameterOptions getParameterValues setParameterValue setParameterValues getVignetteStyle setVignetteStyle getAutoTone setAutoTone getAutoGrayscale setAutoGrayscale setAutoCropAngle getGrayscale setGrayscale getCrop setCrop getCropCorners getCropDimensions getCropDefaultDimensions getCropAspect setCropAspect toggleCropAspect getCropAngle setCropAngle dragCropInside dragCropCorner dragCropSide forceCropFit resetCrop hasCrop hasCropDefault isCropOriginal getCropAspectLock setCropAspectLock getCropConstrainToWarp setCropConstrainToWarp normalizeCrop getWarpedPoint getCameraProfileUniqueId isCameraProfileMonochrome loadCameraProfiles loadStyles loadStyleManager isLookGrayscale isLookGrayscaleMixerOverriden isLookGrayscaleMixerValid isLookVignetteOverriden isProfileAmountSupported getProfileAmount setProfileAmount getProfileName getProfileDigest isProfileMissing getProfileDropdownEntryNames getProfileDropdownEntryDigests getProfileDropdownEntryAdaptive getProfileBrowserGroupNames getProfileBrowserEntryNames getProfileBrowserEntryDigests getProfileBrowserEntryAdaptive getProfileBrowserSupportAmounts setProfileBrowserFilter getProfileForDropdown getProfileForBrowser setProfileFromDigest setProfileFromDropdown setProfileFromBrowser startRenderProfileThumbnails renderProfileThumbnail setFavorites computeLookDigest hasAdaptiveProfileBigTable getAdaptiveProfileUpdateStatus isProfileAdaptive isAdaptiveProfileSupported getPresetGroupNames getPresetGroupDigests getPresetGroupPremium getPresetEntryNames getPresetEntryDigests getPresetDeletableDigests getPresetAmountUnsupportedDigests isPresetDuplicateName getPresetMainGroupNames getPreset getPresetSettings setPreset setPresetV2 getPresetMLMaskIds deletePreset getPresetAmount setPresetAmount getCameraName getLensName isLensProfileFound isLensProfileValid isLensProfileEmbedded getLensProfileMakes getLensProfileModels getLensProfileNames getLensProfileOpcodes getLensProfileMake setLensProfileMake getLensProfileModel setLensProfileModel getLensProfileIndex setLensProfileIndex updateLensProfile getLensProfileDigest isLensProfileDistortionSupported isLensProfileVignettingSupported getLensProfileDistortionAmount setLensProfileDistortionAmount getLensProfileVignettingAmount setLensProfileVignettingAmount saveLensProfileSetup restoreLensProfileSetup finishLensProfileSetup getLensProfileAuto setLensProfileAuto getLensBlurActive getLensBlurParameterValue getLensBlurCurrentBokehPreset getBokehPresetsIcons getLensBlurSliderParameters getLensBlurFocalRange getLensBlurNeedsRecompute getLensBlurFocalRangeHistogram setLensBlurParameterValue setLensBlurFocalRange setLensBlurOverlay setLensBlurAmount setLensBlurBokehPreset tempDisableLensBlur reenableLensBlur removeLensBlur hasEmbeddedDepthMap hasBaseDepthMap getDepthMapSourceType getEmbeddedDepthMap getBaseRawDepthMap setBaseRawDepthMap setLayeredDepthMap setFocusRangeOnSubject setFocusRangeOnArea getLbRefinementInfo setLbRefinementAmount refineLensBlurTrackBegin refineLensBlurTrackChange refineLensBlurTrackEnd removeAllRefinements getRetouchInputFingerprint getRetouchAreas getRetouchMasks getRetouchNeedsUpdates getGenerativeRemoveReportedImage addRetouch appendRetouch removeRetouch setRetouchType setRetouchRadius setRetouchFeather setRetouchOpacity setRetouchFillMethod setRetouchVariationIndex updateRetouchSource dragRetouchSource dragRetouchDestination renderObjectSelectionRetouchInput renderRetouchInput setRetouchOutput setRetouchObjectSelectionMask getRetouchOpacities setRetouchOpacities saveRetouchRefinementParams undoRetouchRefinementParams deleteRetouchVariation pushParamState popParamState getPresetSubsetProfileName getPresetSubsetAll getPresetSubsetAllEnabled getPresetSubsetAllChecked getPresetSubsetModified getPresetSubsetExisting getPresetSubsetDefault startPresetSubset savePresetSubset startRecommended renderRecommendedThumbnail setRecommendedSettings setRecommended getLocalCorrectionChannelNames getMaskGroupNames setMaskGroupName duplicateMaskGroup duplicateAndInvertMaskGroup getMaskGroupChannelValues setMaskGroupChannelValue getMaskGroupAmounts setMaskGroupAmount getMaskGroupActiveValues setMaskGroupActiveValues setMaskGroupActiveValue getMaskGroupComponentNames getMaskGroupComponentInputDigests getMaskGroupComponentSyncIDs getMaskGroupComponentTypes getMaskGroupComponentErrors getMaskGroupComponentSubtractModes getMaskGroupComponentActiveValues getMaskGroupComponentInvertedValues getMaskGroupComponentAdditionalParameters setMaskGroupComponentName setMaskGroupComponentActiveValue deleteMaskGroup deleteMaskGroupsInvalid deleteEmptyMaskGroups deleteMaskGroupComponent deleteAllMaskGroups renderMaskGroupThumbnail canInvertMaskGroup invertMaskGroup invertMaskGroupComponent duplicateMaskComponent startGradientMaskTracking updateGradientMaskTrack endGradientMaskTrack getMaskComponentAdditionalParameters modifyRangeMask setMaskGradientFeather setMaskLuminanceRange setMaskColorRangeAmount getSampleColor getHueSliderFill getPointColorParameters getSinglePointColorParameters deletePointColorSwatch samplePointColorFromPoint updatePointColorSwatch getPointColorFieldFill getPointColorFieldFillParameters trackPointColorFieldMovement getPointColorRangeSliderFill setVisualizePointColorRange getUprightMode setUprightMode calculateGuidedUpright getGuidedUprightSegments addGuidedUprightSegment setGuidedUprightSegment deleteGuidedUprightSegment exportJPEG getBigTableDigests getBigTableEntries getBigTables setBigTables getMLMaskInputDigest renderMLMaskInput getMLMaskNeededTypes cacheMLMaskOutput addMLMaskFromCache updateMLMasksFromCache getLandscapeCachedMaskSubcategories updateLandscapeOverlay addLandscapesToCache addLandscapeMasks objectSelectTrackBegin objectSelectTrackChange objectSelectTrackEnd setObjectSelectRect recomputeObjectMask setObjectSelectionOutput beginBrushTracking updateBrushTracking endBrushTracking initializeSelectPeople selectAllPeople setPersonSelected showPersonOverlay setPersonPartTypesSelected createPeopleMask getPersonThumbImage configureRollover clearRollover rolloverMaskGroup rolloverMaskGroupComponent startTracking stopTracking getPreviewSDR setPreviewSDR getVisualizeHDR setVisualizeHDR renderHistogramOutput undoHistory redoHistory recordHistory clearHistory copyClipboard pasteClipboard resetCopySubset getCopySubsetAll getCopySubsetChecked getCopySubsetModified getCopySubsetDefault".split(" ");
b.getExportedFunctions=function(){function a(l,m,n){var q=b["_"+l],w,p=m?c(m):null;p?w=m.startsWith("array")||"string"==m?function(){var z=ba(g(m)),B=r(),D=Array.prototype.slice.call(arguments);D.unshift(B);q.apply(null,D);B=p(B);t(z);return B}:function(){return p(q.apply(null,arguments))}:w=q;if(!(n||[]).every(k)){var x=n.map(function(z){return e(z)}),y=n.map(function(z){return d(z)});return function(){var z=r(),B=Array(n.length),D;for(D in x)B[D]=x[D](arguments[D]);var F=w.apply(null,B);for(D in y)y[D](B[D]);
t(z);return F}}return w}function c(l){if("string"==l)return function(p){p=ea(p+4,"*");if(0==p)return"";var x=u(p);fa(p);return x};if("arraybuffer"==l)return function(p){var x=ea(p,"i32");p=ea(p+4,"*");if(0<x)return x=ha.slice(p,p+x),fa(p),x};if(l.startsWith("array")){var m=h(l),n=g(m),q=c(m),w=k(m)?function(p){return ea(p,m)}:function(p){return p};return function(p){var x=ea(p,"i32");p=ea(p+4,"*");if(0!==x&&0!==p){x/=n;for(var y=Array(x),z=0;z<x;z++)y[z]=q(w(p+z*n));fa(p);return y}return[]}}if("i1"==
l)return function(p){return 1===p}}function d(l){if("string"==l||"arraybuffer"==l)return function(q){q=ea(q+4,"*");fa(q)};if(l.startsWith("array")){l=h(l);var m=g(l),n=d(l);return function(q){var w=ea(q+4,"*");q=ea(q,"i32")/m;for(var p=0;p<q;p++)n(w+p*m);fa(w)}}return function(){}}function e(l){if(l.startsWith("array")||"string"==l){var m=g(l),n=f(l);return function(q){var w=ba(m);n(q,w);return w}}return function(q){return q}}function f(l){if("string"==l)return function(w,p){if(w){var x=ia(w)+1;var y=
ja(x);ka(w,la,y,x)}else x=y=0;ma(p,x,"i32");ma(p+4,y,"*")};if("arraybuffer"==l)return function(w,p){if(w){var x=new Uint8Array(w);w=x.length;var y=ja(w);la.set(x,y)}else w=y=0;ma(p,w,"i32");ma(p+4,y,"*")};if(l.startsWith("array")){var m=h(l),n=g(m),q=f(m);return function(w,p){var x=0,y=0;if(w){x=w.length*n;y=ja(x);for(var z=0;z<w.length;z++)q(w[z],y+z*n)}ma(p,x,"i32");ma(p+4,y,"*")}}return function(w,p){ma(p,w,l)}}function g(l){return l.startsWith("array")||"string"==l?8:pa(l)}function h(l){var m=
l.lastIndexOf(">");return 0>m?l:l.substring(l.indexOf("<")+1,m)}function k(l){return"double"==l||"i32"==l||"i1"==l}return[a("initialize",null,["string","i1","i1","i32","i1"]),a("reopen"),a("reset",null,["i1"]),a("getVersion","string"),a("setLocale",null,["string"]),a("setTranslations",null,["array<array<string>>"]),a("addSettings",null,["string"]),a("addCameraProfiles",null,["string"]),a("addLensProfiles",null,["string"]),a("readImage","i1",["arraybuffer"]),a("getImageArea","arraybuffer"),a("getImageAspect",
"double"),a("getOriginalArea","arraybuffer"),a("getFilterAreas","array<arraybuffer>"),a("renderCurrent","array<arraybuffer>",["i32","i1","i32","i1"]),a("renderDefault","array<arraybuffer>",["i32","i32","i1"]),a("renderCropped","array<arraybuffer>",["i32","i32","i1"]),a("getModelName","string"),a("isMonochrome","i1"),a("isWhiteBalanceIncremental","i1"),a("isAnyCameraProfileColor","i1"),a("hasValidGainMap","i1"),a("isModified","i1"),a("isProfileModified","i1"),a("isCropModified","i1"),a("isLensProfileModified",
"i1"),a("isRetouchModified","i1"),a("isLocalCorrectionsModified","array<i1>"),a("isDefault","i1"),a("isCropDefault","i1",["i1"]),a("getProcessVersion","i32"),a("setProcessVersion",null,["i32"]),a("getSupportedProcessVersions","arraybuffer"),a("setCurrentProcessVersion","i1"),a("getOrientation","i32"),a("setOrientation",null,["i32"]),a("getSettings","string",["i1","i1"]),a("setSettings","i1",["string","i1","i1","i1"]),a("setAdaptiveProfileSettings","i1",["string","i1","i1","i1"]),a("getNeedsUpdateAISettings",
"i1"),a("getWhiteBalance","arraybuffer"),a("getWhiteBalanceDefault","arraybuffer"),a("getWhiteBalanceMode","i32"),a("setWhiteBalance",null,["i32","i32"]),a("setWhiteBalanceMode",null,["i32"]),a("setWhiteBalanceFromPoint","i1",["double","double","i32"]),a("getCurves","array<array<arraybuffer>>",["i32"]),a("setCurves",null,["array<array<arraybuffer>>"]),a("setCurve",null,["i32","array<arraybuffer>","i32"]),a("setMaskCurveRefineSaturation",null,["i32","i32"]),a("getMaskCurveRefineSaturation","i32",["i32"]),
a("getParameterNames","array<string>"),a("getParameterOptions","array<arraybuffer>"),a("getParameterValues","arraybuffer"),a("setParameterValue",null,["i32","i32"]),a("setParameterValues",null,["arraybuffer","arraybuffer"]),a("getVignetteStyle","i32"),a("setVignetteStyle",null,["i32"]),a("getAutoTone","i1"),a("setAutoTone"),a("getAutoGrayscale","i1"),a("setAutoGrayscale"),a("setAutoCropAngle","i1"),a("getGrayscale","i1"),a("setGrayscale",null,["i1"]),a("getCrop","arraybuffer"),a("setCrop","i1",["arraybuffer"]),
a("getCropCorners","arraybuffer"),a("getCropDimensions","arraybuffer"),a("getCropDefaultDimensions","arraybuffer"),a("getCropAspect","double"),a("setCropAspect",null,["double"]),a("toggleCropAspect"),a("getCropAngle","double"),a("setCropAngle",null,["double","i1"]),a("dragCropInside",null,["double","double"]),a("dragCropCorner",null,"i32 double double double i1 i1".split(" ")),a("dragCropSide",null,["i32","double","double","i1","i1"]),a("forceCropFit",null,["i1"]),a("resetCrop"),a("hasCrop","i1"),
a("hasCropDefault","i1"),a("isCropOriginal","i1",["i1"]),a("getCropAspectLock","arraybuffer"),a("setCropAspectLock",null,["double","double"]),a("getCropConstrainToWarp","i1"),a("setCropConstrainToWarp",null,["i1"]),a("normalizeCrop"),a("getWarpedPoint","arraybuffer",["arraybuffer"]),a("getCameraProfileUniqueId","string"),a("isCameraProfileMonochrome","i1"),a("loadCameraProfiles",null,["string"]),a("loadStyles",null,["string","i1"]),a("loadStyleManager"),a("isLookGrayscale","i1"),a("isLookGrayscaleMixerOverriden",
"i1"),a("isLookGrayscaleMixerValid","i1"),a("isLookVignetteOverriden","i1"),a("isProfileAmountSupported","i1"),a("getProfileAmount","double"),a("setProfileAmount",null,["double"]),a("getProfileName","string",["i1","i1"]),a("getProfileDigest","string"),a("isProfileMissing","i1"),a("getProfileDropdownEntryNames","array<string>",["i1"]),a("getProfileDropdownEntryDigests","array<string>"),a("getProfileDropdownEntryAdaptive","array<i1>"),a("getProfileBrowserGroupNames","array<string>"),a("getProfileBrowserEntryNames",
"array<array<string>>"),a("getProfileBrowserEntryDigests","array<array<string>>"),a("getProfileBrowserEntryAdaptive","array<array<i1>>"),a("getProfileBrowserSupportAmounts","array<array<i1>>"),a("setProfileBrowserFilter",null,["i1","i1"]),a("getProfileForDropdown","i32"),a("getProfileForBrowser","arraybuffer",["i1"]),a("setProfileFromDigest",null,["string"]),a("setProfileFromDropdown","array<string>",["i32"]),a("setProfileFromBrowser","array<string>",["i32","i32"]),a("startRenderProfileThumbnails",
null,["i32","i32"]),a("renderProfileThumbnail","arraybuffer",["i32","i32"]),a("setFavorites",null,["i1","array<arraybuffer>","array<i1>"]),a("computeLookDigest","string",["string"]),a("hasAdaptiveProfileBigTable","i1"),a("getAdaptiveProfileUpdateStatus","i1"),a("isProfileAdaptive","i1"),a("isAdaptiveProfileSupported","i1"),a("getPresetGroupNames","array<string>",["i1"]),a("getPresetGroupDigests","array<string>",["i1"]),a("getPresetGroupPremium","array<i1>",["i1"]),a("getPresetEntryNames","array<array<string>>",
["i1","i1"]),a("getPresetEntryDigests","array<array<string>>",["i1"]),a("getPresetDeletableDigests","array<string>"),a("getPresetAmountUnsupportedDigests","array<string>"),a("isPresetDuplicateName","i1",["string","string","string"]),a("getPresetMainGroupNames","array<string>"),a("getPreset","string"),a("getPresetSettings","string",["i32","i32","i1"]),a("setPreset","array<string>",["i32","i32","i1","double"]),a("setPresetV2","array<i1>",["i32","i32","i1","double","i32"]),a("getPresetMLMaskIds","array<string>",
["i32","i32","i1"]),a("deletePreset",null,["i32","i32","i1"]),a("getPresetAmount","double"),a("setPresetAmount",null,["double"]),a("getCameraName","string"),a("getLensName","string"),a("isLensProfileFound","i1"),a("isLensProfileValid","i1"),a("isLensProfileEmbedded","i1"),a("getLensProfileMakes","array<string>"),a("getLensProfileModels","array<string>"),a("getLensProfileNames","array<string>"),a("getLensProfileOpcodes","array<i1>"),a("getLensProfileMake","string"),a("setLensProfileMake",null,["string"]),
a("getLensProfileModel","string"),a("setLensProfileModel",null,["string"]),a("getLensProfileIndex","i32"),a("setLensProfileIndex",null,["i32"]),a("updateLensProfile"),a("getLensProfileDigest","string"),a("isLensProfileDistortionSupported","i1"),a("isLensProfileVignettingSupported","i1"),a("getLensProfileDistortionAmount","i32"),a("setLensProfileDistortionAmount",null,["i32"]),a("getLensProfileVignettingAmount","i32"),a("setLensProfileVignettingAmount",null,["i32"]),a("saveLensProfileSetup"),a("restoreLensProfileSetup"),
a("finishLensProfileSetup","i32"),a("getLensProfileAuto","i1"),a("setLensProfileAuto"),a("getLensBlurActive","i1"),a("getLensBlurParameterValue","i32",["i32"]),a("getLensBlurCurrentBokehPreset","i32"),a("getBokehPresetsIcons","array<arraybuffer>",["i32","i32","float","float","float"]),a("getLensBlurSliderParameters","array<arraybuffer>"),a("getLensBlurFocalRange","arraybuffer"),a("getLensBlurNeedsRecompute","i1"),a("getLensBlurFocalRangeHistogram","array<arraybuffer>",["i32","i32","i1"]),a("setLensBlurParameterValue",
null,["i32","i32"]),a("setLensBlurFocalRange",null,["arraybuffer","i1"]),a("setLensBlurOverlay",null,["i1"]),a("setLensBlurAmount",null,["i32"]),a("setLensBlurBokehPreset",null,["i32"]),a("tempDisableLensBlur"),a("reenableLensBlur"),a("removeLensBlur"),a("hasEmbeddedDepthMap","i1"),a("hasBaseDepthMap","i1"),a("getDepthMapSourceType","i32"),a("getEmbeddedDepthMap","arraybuffer"),a("getBaseRawDepthMap","arraybuffer"),a("setBaseRawDepthMap","i1",["arraybuffer","float","float","i1","i1"]),a("setLayeredDepthMap",
"i1",["arraybuffer","i1"]),a("setFocusRangeOnSubject","arraybuffer"),a("setFocusRangeOnArea","arraybuffer",["arraybuffer","arraybuffer","arraybuffer"]),a("getLbRefinementInfo","arraybuffer"),a("setLbRefinementAmount",null,["i32","i32"]),a("refineLensBlurTrackBegin",null,"i32 i32 i32 i32 i32 i1 i32 arraybuffer arraybuffer arraybuffer i1".split(" ")),a("refineLensBlurTrackChange",null,["arraybuffer","i1"]),a("refineLensBlurTrackEnd"),a("removeAllRefinements"),a("getRetouchInputFingerprint","arraybuffer"),
a("getRetouchAreas","array<arraybuffer>"),a("getRetouchMasks","array<array<arraybuffer>>",["i1","i1"]),a("getRetouchNeedsUpdates","array<i1>"),a("getGenerativeRemoveReportedImage","arraybuffer",["i32"]),a("addRetouch","array<array<arraybuffer>>","i32 i1 double double double double arraybuffer".split(" ")),a("appendRetouch","i32","i32 i1 double double i1 arraybuffer".split(" ")),a("removeRetouch",null,["i32"]),a("setRetouchType","array<arraybuffer>",["i32","i32"]),a("setRetouchRadius","array<array<arraybuffer>>",
["i32","double"]),a("setRetouchFeather",null,["i32","double"]),a("setRetouchOpacity",null,["i32","double"]),a("setRetouchFillMethod",null,["i32","i32"]),a("setRetouchVariationIndex",null,["i32","i32"]),a("updateRetouchSource","array<arraybuffer>",["i32"]),a("dragRetouchSource","array<arraybuffer>",["i32","arraybuffer"]),a("dragRetouchDestination","array<arraybuffer>",["i32","arraybuffer"]),a("renderObjectSelectionRetouchInput","array<arraybuffer>",["i32"]),a("renderRetouchInput","array<arraybuffer>",
["i32","i32","i1","i1"]),a("setRetouchOutput","arraybuffer",["i32","string","arraybuffer","array<arraybuffer>"]),a("setRetouchObjectSelectionMask","array<arraybuffer>",["i32","arraybuffer"]),a("getRetouchOpacities","arraybuffer"),a("setRetouchOpacities",null,["arraybuffer"]),a("saveRetouchRefinementParams"),a("undoRetouchRefinementParams"),a("deleteRetouchVariation",null,["i32"]),a("pushParamState"),a("popParamState"),a("getPresetSubsetProfileName","string"),a("getPresetSubsetAll","array<i1>"),a("getPresetSubsetAllEnabled",
"array<i1>"),a("getPresetSubsetAllChecked","array<i1>"),a("getPresetSubsetModified","array<i1>"),a("getPresetSubsetExisting","array<i1>"),a("getPresetSubsetDefault","array<i1>"),a("startPresetSubset",null,["string","i32","i32","i1"]),a("savePresetSubset","array<string>",["string","string","array<i1>"]),a("startRecommended"),a("renderRecommendedThumbnail","arraybuffer",["i32","i32","i32","i32","i1"]),a("setRecommendedSettings","string",["i32","string","string"]),a("setRecommended",null,["i32"]),a("getLocalCorrectionChannelNames",
"array<string>"),a("getMaskGroupNames","array<string>"),a("setMaskGroupName","string",["i32","string"]),a("duplicateMaskGroup","i1",["i32"]),a("duplicateAndInvertMaskGroup","i1",["i32"]),a("getMaskGroupChannelValues","array<arraybuffer>"),a("setMaskGroupChannelValue",null,["i32","i32","float"]),a("getMaskGroupAmounts","arraybuffer"),a("setMaskGroupAmount",null,["i32","float"]),a("getMaskGroupActiveValues","array<i1>"),a("setMaskGroupActiveValues",null,["array<i1>"]),a("setMaskGroupActiveValue",null,
["i32","i1"]),a("getMaskGroupComponentNames","array<array<string>>"),a("getMaskGroupComponentInputDigests","array<array<string>>"),a("getMaskGroupComponentSyncIDs","array<array<string>>"),a("getMaskGroupComponentTypes","array<arraybuffer>"),a("getMaskGroupComponentErrors","array<arraybuffer>"),a("getMaskGroupComponentSubtractModes","array<array<i1>>"),a("getMaskGroupComponentActiveValues","array<array<i1>>"),a("getMaskGroupComponentInvertedValues","array<array<i1>>"),a("getMaskGroupComponentAdditionalParameters",
"array<array<arraybuffer>>"),a("setMaskGroupComponentName","string",["i32","i32","string"]),a("setMaskGroupComponentActiveValue",null,["i32","i32","i1"]),a("deleteMaskGroup",null,["i32"]),a("deleteMaskGroupsInvalid","i1"),a("deleteEmptyMaskGroups","i1"),a("deleteMaskGroupComponent",null,["i32","i32"]),a("deleteAllMaskGroups"),a("renderMaskGroupThumbnail","arraybuffer",["i32","i32","i1","i32"]),a("canInvertMaskGroup","i1",["i32"]),a("invertMaskGroup","i1",["i32"]),a("invertMaskGroupComponent",null,
["i32","i32"]),a("duplicateMaskComponent","i1",["i32","i32"]),a("startGradientMaskTracking","arraybuffer","i32 i32 i32 arraybuffer arraybuffer arraybuffer i1".split(" ")),a("updateGradientMaskTrack","i1",["arraybuffer"]),a("endGradientMaskTrack","arraybuffer",["i1"]),a("getMaskComponentAdditionalParameters","arraybuffer",["i32","i32"]),a("modifyRangeMask","arraybuffer","i32 i32 i32 arraybuffer arraybuffer arraybuffer i1".split(" ")),a("setMaskGradientFeather",null,["i32","i32","i32"]),a("setMaskLuminanceRange",
null,"i32 i32 float float float float".split(" ")),a("setMaskColorRangeAmount",null,["i32","i32","float"]),a("getSampleColor","arraybuffer",["i32"]),a("getHueSliderFill","array<arraybuffer>",["i32","i32","arraybuffer"]),a("getPointColorParameters","array<arraybuffer>",["i32"]),a("getSinglePointColorParameters","arraybuffer",["i32","i32"]),a("deletePointColorSwatch",null,["i32","i32"]),a("samplePointColorFromPoint","arraybuffer",["double","double","i32"]),a("updatePointColorSwatch",null,"i32 double double double double arraybuffer arraybuffer arraybuffer i32".split(" ")),
a("getPointColorFieldFill","array<arraybuffer>","i32 i32 i32 i32 i1 i1 i32".split(" ")),a("getPointColorFieldFillParameters","arraybuffer",["i32","i32","i32","i32","i32"]),a("trackPointColorFieldMovement","arraybuffer","i32 i32 i32 i32 i32 i32 i32".split(" ")),a("getPointColorRangeSliderFill","array<arraybuffer>","i32 i32 i32 i32 i1 i32".split(" ")),a("setVisualizePointColorRange",null,["i1","i32","i32"]),a("getUprightMode","i32"),a("setUprightMode","i1",["i32","i1"]),a("calculateGuidedUpright","i1",
["i1"]),a("getGuidedUprightSegments","array<array<arraybuffer>>"),a("addGuidedUprightSegment",null,["arraybuffer","arraybuffer"]),a("setGuidedUprightSegment",null,["i32","arraybuffer","arraybuffer"]),a("deleteGuidedUprightSegment",null,["i32"]),a("exportJPEG","arraybuffer",["i32","i32"]),a("getBigTableDigests","array<string>"),a("getBigTableEntries","array<arraybuffer>",["i1"]),a("getBigTables","array<arraybuffer>",["array<string>"]),a("setBigTables",null,["array<string>","array<arraybuffer>","array<string>"]),
a("getMLMaskInputDigest","string"),a("renderMLMaskInput","array<arraybuffer>",["i32"]),a("getMLMaskNeededTypes","arraybuffer",["array<string>"]),a("cacheMLMaskOutput","i1",["i32","array<arraybuffer>","arraybuffer","i32"]),a("addMLMaskFromCache","arraybuffer",["i32","i32","arraybuffer","i32","i1"]),a("updateMLMasksFromCache","arraybuffer",["array<string>"]),a("getLandscapeCachedMaskSubcategories","arraybuffer"),a("updateLandscapeOverlay",null,["i32"]),a("addLandscapesToCache","i1",["array<arraybuffer>",
"arraybuffer","arraybuffer","i32"]),a("addLandscapeMasks","i32",["arraybuffer","i1","i32","i1"]),a("objectSelectTrackBegin",null,"i32 i32 i32 arraybuffer arraybuffer arraybuffer".split(" ")),a("objectSelectTrackChange",null,["arraybuffer"]),a("objectSelectTrackEnd","array<arraybuffer>",["i1"]),a("setObjectSelectRect","array<arraybuffer>",["i32","arraybuffer","arraybuffer","arraybuffer","i1"]),a("recomputeObjectMask","array<arraybuffer>",["i32","i32"]),a("setObjectSelectionOutput","arraybuffer",["i32",
"i32","arraybuffer"]),a("beginBrushTracking",null,"i32 i32 i32 i32 i32 i32 i1 i1 i1 i1 arraybuffer arraybuffer arraybuffer i1".split(" ")),a("updateBrushTracking",null,["arraybuffer","i1"]),a("endBrushTracking","arraybuffer"),a("initializeSelectPeople",null,["array<arraybuffer>","arraybuffer","arraybuffer"]),a("selectAllPeople","arraybuffer",["i1","i1"]),a("setPersonSelected","arraybuffer",["i32","i1","i1"]),a("showPersonOverlay",null,["i32","i1"]),a("setPersonPartTypesSelected",null,["arraybuffer",
"array<i1>","i1"]),a("createPeopleMask",null,["i1","i32","i1"]),a("getPersonThumbImage","array<arraybuffer>",["i32","i32"]),a("configureRollover",null,["i32","i1","double","arraybuffer"]),a("clearRollover"),a("rolloverMaskGroup",null,["i32"]),a("rolloverMaskGroupComponent",null,["i32","i32"]),a("startTracking",null,["i32","i32"]),a("stopTracking"),a("getPreviewSDR","i1"),a("setPreviewSDR",null,["i1"]),a("getVisualizeHDR","i1"),a("setVisualizeHDR",null,["i1"]),a("renderHistogramOutput","array<arraybuffer>",
["i1"]),a("undoHistory"),a("redoHistory"),a("recordHistory"),a("clearHistory"),a("copyClipboard",null,["array<i1>","i1","i1"]),a("pasteClipboard","array<arraybuffer>"),a("resetCopySubset"),a("getCopySubsetAll","array<i1>"),a("getCopySubsetChecked","array<i1>"),a("getCopySubsetModified","array<i1>"),a("getCopySubsetDefault","array<i1>")]};b.getACRWebInterface=function(){for(var a=b.exportedFunctionNames,c=b.getExportedFunctions(),d={},e=0;e<a.length;e++)d[a[e]]=c[e];return d};
var qa=Object.assign({},b),ra="./this.program",sa=(a,c)=>{throw c;},ta="",ua;ta=self.location.href;ta=0!==ta.indexOf("blob:")?ta.substr(0,ta.replace(/[?#].*/,"").lastIndexOf("/")+1):"";ua=a=>{var c=new XMLHttpRequest;c.open("GET",a,!1);c.responseType="arraybuffer";c.send(null);return new Uint8Array(c.response)};var ya=b.print||console.log.bind(console),za=b.printErr||console.warn.bind(console);Object.assign(b,qa);qa=null;b.thisProgram&&(ra=b.thisProgram);b.quit&&(sa=b.quit);var Aa=4;
function pa(a){switch(a){case "i1":case "i8":case "u8":return 1;case "i16":case "u16":return 2;case "i32":case "u32":return 4;case "i64":case "u64":return 8;case "float":return 4;case "double":return 8;default:if("*"===a[a.length-1])return Aa;if("i"===a[0]){const c=Number(a.substr(1));0===c%8||v("getNativeTypeSize invalid bits "+c+", type "+a);return c/8}return 0}}var Ba;b.wasmBinary&&(Ba=b.wasmBinary);var noExitRuntime=b.noExitRuntime||!0;"object"!=typeof WebAssembly&&v("no native wasm support detected");
var Ca,Da=!1,Ea="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;
function Fa(a,c){for(var d=c+NaN,e=c;a[e]&&!(e>=d);)++e;if(16<e-c&&a.buffer&&Ea)return Ea.decode(a.subarray(c,e));for(d="";c<e;){var f=a[c++];if(f&128){var g=a[c++]&63;if(192==(f&224))d+=String.fromCharCode((f&31)<<6|g);else{var h=a[c++]&63;f=224==(f&240)?(f&15)<<12|g<<6|h:(f&7)<<18|g<<12|h<<6|a[c++]&63;65536>f?d+=String.fromCharCode(f):(f-=65536,d+=String.fromCharCode(55296|f>>10,56320|f&1023))}}else d+=String.fromCharCode(f)}return d}function u(a){return a?Fa(la,a):""}
function ka(a,c,d,e){if(!(0<e))return 0;var f=d;e=d+e-1;for(var g=0;g<a.length;++g){var h=a.charCodeAt(g);if(55296<=h&&57343>=h){var k=a.charCodeAt(++g);h=65536+((h&1023)<<10)|k&1023}if(127>=h){if(d>=e)break;c[d++]=h}else{if(2047>=h){if(d+1>=e)break;c[d++]=192|h>>6}else{if(65535>=h){if(d+2>=e)break;c[d++]=224|h>>12}else{if(d+3>=e)break;c[d++]=240|h>>18;c[d++]=128|h>>12&63}c[d++]=128|h>>6&63}c[d++]=128|h&63}}c[d]=0;return d-f}
function ia(a){for(var c=0,d=0;d<a.length;++d){var e=a.charCodeAt(d);127>=e?c++:2047>=e?c+=2:55296<=e&&57343>=e?(c+=4,++d):c+=3}return c}var ha,A,la,Ga,C,E,Ha,Ia;function Ja(){var a=Ca.buffer;ha=a;b.HEAP8=A=new Int8Array(a);b.HEAP16=Ga=new Int16Array(a);b.HEAP32=C=new Int32Array(a);b.HEAPU8=la=new Uint8Array(a);b.HEAPU16=new Uint16Array(a);b.HEAPU32=E=new Uint32Array(a);b.HEAPF32=Ha=new Float32Array(a);b.HEAPF64=Ia=new Float64Array(a)}var Ka,La=[],Ma=[],Na=[],Oa=0,Pa=null,Wa=null;
function Xa(){Oa++;b.monitorRunDependencies&&b.monitorRunDependencies(Oa)}function Ya(){Oa--;b.monitorRunDependencies&&b.monitorRunDependencies(Oa);if(0==Oa&&(null!==Pa&&(clearInterval(Pa),Pa=null),Wa)){var a=Wa;Wa=null;a()}}function v(a){if(b.onAbort)b.onAbort(a);a="Aborted("+a+")";za(a);Da=!0;throw new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info.");}function Za(){return $a.startsWith("data:application/octet-stream;base64,")}var $a;$a="ic_web.wasm";
if(!Za()){var ab=$a;$a=b.locateFile?b.locateFile(ab,ta):ta+ab}function bb(){var a=$a;try{if(a==$a&&Ba)return new Uint8Array(Ba);if(ua)return ua(a);throw"both async and sync fetching of the wasm failed";}catch(c){v(c)}}function cb(){return Ba||"function"!=typeof fetch?Promise.resolve().then(function(){return bb()}):fetch($a,{credentials:"same-origin"}).then(function(a){if(!a.ok)throw"failed to load wasm binary file at '"+$a+"'";return a.arrayBuffer()}).catch(function(){return bb()})}
var H,L,lb={34035360:(a,c)=>{db.zo(u(a),u(c))},34035420:(a,c)=>{a="/persistent"+u(a);c=u(c);var d=N(c);if(d&&d.node)if(40960===(d.node.mode&61440))try{eb(c)}catch(e){}else{try{eb(c+"/Index.dat")}catch(e){}try{fb(c)}catch(e){console.error(e)}}try{gb(a)}catch(e){}try{hb(a,c)}catch(e){try{P(c)}catch(f){}}},34035903:(a,c,d)=>{var e=!1,f=!1;a=u(a);c=u(c);try{P(a)}catch(g){if(g.on==d)try{ib(a),e=!0}catch(h){}}if(""!=c)try{jb(db,{Oo:c},a),f=!0}catch(g){}return e||f?0:1},34036270:()=>{kb(!1,function(){})}};
function mb(a){this.name="ExitStatus";this.message="Program terminated with exit("+a+")";this.status=a}function nb(a){for(;0<a.length;)a.shift()(b)}function ea(a,c="i8"){c.endsWith("*")&&(c="*");switch(c){case "i1":return A[a>>0];case "i8":return A[a>>0];case "i16":return Ga[a>>1];case "i32":return C[a>>2];case "i64":return C[a>>2];case "float":return Ha[a>>2];case "double":return Ia[a>>3];case "*":return E[a>>2];default:v("invalid type for getValue: "+c)}return null}
function ma(a,c,d="i8"){d.endsWith("*")&&(d="*");switch(d){case "i1":A[a>>0]=c;break;case "i8":A[a>>0]=c;break;case "i16":Ga[a>>1]=c;break;case "i32":C[a>>2]=c;break;case "i64":L=[c>>>0,(H=c,1<=+Math.abs(H)?0<H?(Math.min(+Math.floor(H/4294967296),4294967295)|0)>>>0:~~+Math.ceil((H-+(~~H>>>0))/4294967296)>>>0:0)];C[a>>2]=L[0];C[a+4>>2]=L[1];break;case "float":Ha[a>>2]=c;break;case "double":Ia[a>>3]=c;break;case "*":E[a>>2]=c;break;default:v("invalid type for setValue: "+d)}}var ob=[],pb=0,qb=0;
function rb(a){this.Jn=a;this.pn=a-24;this.kp=function(c){E[this.pn+4>>2]=c};this.xn=function(){return E[this.pn+4>>2]};this.bp=function(c){E[this.pn+8>>2]=c};this.Jo=function(){return E[this.pn+8>>2]};this.jp=function(){C[this.pn>>2]=0};this.fo=function(c){A[this.pn+12>>0]=c?1:0};this.To=function(){return 0!=A[this.pn+12>>0]};this.ho=function(c){A[this.pn+13>>0]=c?1:0};this.ro=function(){return 0!=A[this.pn+13>>0]};this.$o=function(c,d){this.Mn(0);this.kp(c);this.bp(d);this.jp();this.fo(!1);this.ho(!1)};
this.Qo=function(){C[this.pn>>2]+=1};this.Wo=function(){var c=C[this.pn>>2];C[this.pn>>2]=c-1;return 1===c};this.Mn=function(c){E[this.pn+16>>2]=c};this.So=function(){return E[this.pn+16>>2]};this.vo=function(){if(sb(this.xn()))return E[this.Jn>>2];var c=this.So();return 0!==c?c:this.Jn}}function tb(a){return fa((new rb(a)).pn)}var ub=[];function Q(a){var c=ub[a];c||(a>=ub.length&&(ub.length=a+1),ub[a]=c=Ka.get(a));return c}
var vb=(a,c)=>{for(var d=0,e=a.length-1;0<=e;e--){var f=a[e];"."===f?a.splice(e,1):".."===f?(a.splice(e,1),d++):d&&(a.splice(e,1),d--)}if(c)for(;d;d--)a.unshift("..");return a},wb=a=>{var c="/"===a.charAt(0),d="/"===a.substr(-1);(a=vb(a.split("/").filter(e=>!!e),!c).join("/"))||c||(a=".");a&&d&&(a+="/");return(c?"/":"")+a},xb=a=>{var c=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);a=c[0];c=c[1];if(!a&&!c)return".";c&&(c=c.substr(0,c.length-1));return a+c},yb=a=>
{if("/"===a)return"/";a=wb(a);a=a.replace(/\/$/,"");var c=a.lastIndexOf("/");return-1===c?a:a.substr(c+1)};function zb(){if("object"==typeof crypto&&"function"==typeof crypto.getRandomValues){var a=new Uint8Array(1);return()=>{crypto.getRandomValues(a);return a[0]}}return()=>v("randomDevice")}
function Ab(){for(var a="",c=!1,d=arguments.length-1;-1<=d&&!c;d--){c=0<=d?arguments[d]:"/";if("string"!=typeof c)throw new TypeError("Arguments to path.resolve must be strings");if(!c)return"";a=c+"/"+a;c="/"===c.charAt(0)}a=vb(a.split("/").filter(e=>!!e),!c).join("/");return(c?"/":"")+a||"."}
var Bb=(a,c)=>{function d(h){for(var k=0;k<h.length&&""===h[k];k++);for(var l=h.length-1;0<=l&&""===h[l];l--);return k>l?[]:h.slice(k,l-k+1)}a=Ab(a).substr(1);c=Ab(c).substr(1);a=d(a.split("/"));c=d(c.split("/"));for(var e=Math.min(a.length,c.length),f=e,g=0;g<e;g++)if(a[g]!==c[g]){f=g;break}e=[];for(g=f;g<a.length;g++)e.push("..");e=e.concat(c.slice(f));return e.join("/")};function Cb(a,c){var d=Array(ia(a)+1);a=ka(a,d,0,d.length);c&&(d.length=a);return d}var Db=[];
function Eb(a,c){Db[a]={input:[],tn:[],In:c};Fb(a,Gb)}
var Gb={open:function(a){var c=Db[a.node.Nn];if(!c)throw new S(43);a.sn=c;a.seekable=!1},close:function(a){a.sn.In.Qn(a.sn)},Qn:function(a){a.sn.In.Qn(a.sn)},read:function(a,c,d,e){if(!a.sn||!a.sn.In.qo)throw new S(60);for(var f=0,g=0;g<e;g++){try{var h=a.sn.In.qo(a.sn)}catch(k){throw new S(29);}if(void 0===h&&0===f)throw new S(6);if(null===h||void 0===h)break;f++;c[d+g]=h}f&&(a.node.timestamp=Date.now());return f},write:function(a,c,d,e){if(!a.sn||!a.sn.In.co)throw new S(60);try{for(var f=0;f<e;f++)a.sn.In.co(a.sn,
c[d+f])}catch(g){throw new S(29);}e&&(a.node.timestamp=Date.now());return f}},Hb={qo:function(a){if(!a.input.length){var c=null;"undefined"!=typeof window&&"function"==typeof window.prompt?(c=window.prompt("Input: "),null!==c&&(c+="\n")):"function"==typeof readline&&(c=readline(),null!==c&&(c+="\n"));if(!c)return null;a.input=Cb(c,!0)}return a.input.shift()},co:function(a,c){null===c||10===c?(ya(Fa(a.tn,0)),a.tn=[]):0!=c&&a.tn.push(c)},Qn:function(a){a.tn&&0<a.tn.length&&(ya(Fa(a.tn,0)),a.tn=[])}},
Ib={co:function(a,c){null===c||10===c?(za(Fa(a.tn,0)),a.tn=[]):0!=c&&a.tn.push(c)},Qn:function(a){a.tn&&0<a.tn.length&&(za(Fa(a.tn,0)),a.tn=[])}},T={yn:null,rn:function(){return T.createNode(null,"/",16895,0)},createNode:function(a,c,d,e){if(24576===(d&61440)||4096===(d&61440))throw new S(63);T.yn||(T.yn={dir:{node:{wn:T.ln.wn,un:T.ln.un,Kn:T.ln.Kn,Ln:T.ln.Ln,Vn:T.ln.Vn,$n:T.ln.$n,Wn:T.ln.Wn,Un:T.ln.Un,Xn:T.ln.Xn},stream:{Dn:T.nn.Dn}},file:{node:{wn:T.ln.wn,un:T.ln.un},stream:{Dn:T.nn.Dn,read:T.nn.read,
write:T.nn.write,jo:T.nn.jo,to:T.nn.to,uo:T.nn.uo}},link:{node:{wn:T.ln.wn,un:T.ln.un,On:T.ln.On},stream:{}},mo:{node:{wn:T.ln.wn,un:T.ln.un},stream:Jb}});d=Kb(a,c,d,e);16384===(d.mode&61440)?(d.ln=T.yn.dir.node,d.nn=T.yn.dir.stream,d.mn={}):32768===(d.mode&61440)?(d.ln=T.yn.file.node,d.nn=T.yn.file.stream,d.qn=0,d.mn=null):40960===(d.mode&61440)?(d.ln=T.yn.link.node,d.nn=T.yn.link.stream):8192===(d.mode&61440)&&(d.ln=T.yn.mo.node,d.nn=T.yn.mo.stream);d.timestamp=Date.now();a&&(a.mn[c]=d,a.timestamp=
d.timestamp);return d},Go:function(a){return a.mn?a.mn.subarray?a.mn.subarray(0,a.qn):new Uint8Array(a.mn):new Uint8Array(0)},po:function(a,c){var d=a.mn?a.mn.length:0;d>=c||(c=Math.max(c,d*(1048576>d?2:1.125)>>>0),0!=d&&(c=Math.max(c,256)),d=a.mn,a.mn=new Uint8Array(c),0<a.qn&&a.mn.set(d.subarray(0,a.qn),0))},Zo:function(a,c){if(a.qn!=c)if(0==c)a.mn=null,a.qn=0;else{var d=a.mn;a.mn=new Uint8Array(c);d&&a.mn.set(d.subarray(0,Math.min(c,a.qn)));a.qn=c}},ln:{wn:function(a){var c={};c.Do=8192===(a.mode&
61440)?a.id:1;c.bo=a.id;c.mode=a.mode;c.Po=1;c.uid=0;c.Ko=0;c.Nn=a.Nn;16384===(a.mode&61440)?c.size=4096:32768===(a.mode&61440)?c.size=a.qn:40960===(a.mode&61440)?c.size=a.link.length:c.size=0;c.ko=new Date(a.timestamp);c.Tn=new Date(a.timestamp);c.oo=new Date(a.timestamp);c.Ao=4096;c.Bo=Math.ceil(c.size/c.Ao);return c},un:function(a,c){void 0!==c.mode&&(a.mode=c.mode);void 0!==c.timestamp&&(a.timestamp=c.timestamp);void 0!==c.size&&T.Zo(a,c.size)},Kn:function(){throw Lb[44];},Ln:function(a,c,d,e){return T.createNode(a,
c,d,e)},Vn:function(a,c,d){if(16384===(a.mode&61440)){try{var e=Nb(c,d)}catch(g){}if(e)for(var f in e.mn)throw new S(55);}delete a.parent.mn[a.name];a.parent.timestamp=Date.now();a.name=d;c.mn[d]=a;c.timestamp=a.parent.timestamp;a.parent=c},$n:function(a,c){delete a.mn[c];a.timestamp=Date.now()},Wn:function(a,c){var d=Nb(a,c),e;for(e in d.mn)throw new S(55);delete a.mn[c];a.timestamp=Date.now()},Un:function(a){var c=[".",".."],d;for(d in a.mn)a.mn.hasOwnProperty(d)&&c.push(d);return c},Xn:function(a,
c,d){a=T.createNode(a,c,41471,0);a.link=d;return a},On:function(a){if(40960!==(a.mode&61440))throw new S(28);return a.link}},nn:{read:function(a,c,d,e,f){var g=a.node.mn;if(f>=a.node.qn)return 0;a=Math.min(a.node.qn-f,e);if(8<a&&g.subarray)c.set(g.subarray(f,f+a),d);else for(e=0;e<a;e++)c[d+e]=g[f+e];return a},write:function(a,c,d,e,f,g){c.buffer===A.buffer&&(g=!1);if(!e)return 0;a=a.node;a.timestamp=Date.now();if(c.subarray&&(!a.mn||a.mn.subarray)){if(g)return a.mn=c.subarray(d,d+e),a.qn=e;if(0===
a.qn&&0===f)return a.mn=c.slice(d,d+e),a.qn=e;if(f+e<=a.qn)return a.mn.set(c.subarray(d,d+e),f),e}T.po(a,f+e);if(a.mn.subarray&&c.subarray)a.mn.set(c.subarray(d,d+e),f);else for(g=0;g<e;g++)a.mn[f+g]=c[d+g];a.qn=Math.max(a.qn,f+e);return e},Dn:function(a,c,d){1===d?c+=a.position:2===d&&32768===(a.node.mode&61440)&&(c+=a.node.qn);if(0>c)throw new S(28);return c},jo:function(a,c,d){T.po(a.node,c+d);a.node.qn=Math.max(a.node.qn,c+d)},to:function(a,c,d,e,f){if(32768!==(a.node.mode&61440))throw new S(43);
a=a.node.mn;if(f&2||a.buffer!==ha){if(0<d||d+c<a.length)a.subarray?a=a.subarray(d,d+c):a=Array.prototype.slice.call(a,d,d+c);d=!0;v();c=void 0;if(!c)throw new S(48);A.set(a,c)}else d=!1,c=a.byteOffset;return{pn:c,mp:d}},uo:function(a,c,d,e){T.nn.write(a,c,0,e,d,!1);return 0}}},U={Pn:{},indexedDB:()=>{if("undefined"!=typeof indexedDB)return indexedDB;var a=null;"object"==typeof window&&(a=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB);a||v("IDBFS used, but indexedDB not supported");
return a},yo:21,Bn:"FILE_DATA",rn:function(a){return T.rn.apply(null,arguments)},xo:(a,c,d)=>{U.Ho(a,(e,f)=>{if(e)return d(e);U.Io(a,(g,h)=>{if(g)return d(g);U.Vo(c?h:f,c?f:h,d)})})},np:()=>{Object.values(U.Pn).forEach(a=>a.close());U.Pn={}},Fo:(a,c)=>{var d=U.Pn[a];if(d)return c(null,d);try{var e=U.indexedDB().open(a,U.yo)}catch(f){return c(f)}if(!e)return c("Unable to connect to IndexedDB");e.onupgradeneeded=f=>{var g=f.target.result;f=f.target.transaction;var h;g.objectStoreNames.contains(U.Bn)?
h=f.objectStore(U.Bn):h=g.createObjectStore(U.Bn);h.indexNames.contains("timestamp")||h.createIndex("timestamp","timestamp",{unique:!1})};e.onsuccess=()=>{d=e.result;U.Pn[a]=d;c(null,d)};e.onerror=f=>{c(this.error);f.preventDefault()}},Ho:function(a,c){function d(g,h){for(var k in g){var l=g[k];l.vn||(k=wb(h+"/"+k),16384===(l.mode&61440)&&d(e(l),k),f[k]={timestamp:new Date(l.timestamp)})}}function e(g){var h={},k;for(k in g.mn)g.mn.hasOwnProperty(k)&&(h[k]=g.mn[k]);return h}var f={};d(e(a.root),a.Rn);
return c(null,{type:"local",entries:f})},Io:(a,c)=>{var d={};U.Fo(a.Rn,(e,f)=>{if(e)return c(e);try{var g=f.transaction([U.Bn],"readonly");g.onerror=h=>{c(this.error);h.preventDefault()};g.objectStore(U.Bn).index("timestamp").openKeyCursor().onsuccess=h=>{h=h.target.result;if(!h)return c(null,{type:"remote",db:f,entries:d});d[h.primaryKey]={timestamp:h.key};h.continue()}}catch(h){return c(h)}})},Mo:(a,c)=>{try{var d=N(a).node;var e=Ob(a)}catch(f){return c(f)}return 16384===(e.mode&61440)?c(null,{timestamp:e.Tn,
mode:e.mode}):32768===(e.mode&61440)?(d.mn=T.Go(d),c(null,{timestamp:e.Tn,mode:e.mode,contents:d.mn})):c(Error("node type not supported"))},cp:(a,c,d)=>{try{if(16384===(c.mode&61440))gb(a,c.mode);else if(32768===(c.mode&61440)){var e=c.contents,f={lo:!0};f.flags=f.flags||577;var g=Pb(a,f.flags,f.mode);if("string"==typeof e){var h=new Uint8Array(ia(e)+1),k=ka(e,h,0,h.length);Qb(g,h,0,k,void 0,f.lo)}else if(ArrayBuffer.isView(e))Qb(g,e,0,e.byteLength,void 0,f.lo);else throw Error("Unsupported data type");
Rb(g)}else return d(Error("node type not supported"));Sb(a,c.mode);var l=c.timestamp,m=c.timestamp,n=N(a,{Hn:!0}).node;n.ln.un(n,{timestamp:Math.max(l,m)})}catch(q){return d(q)}d(null)},Xo:(a,c)=>{try{var d=Ob(a);16384===(d.mode&61440)?fb(a):32768===(d.mode&61440)&&eb(a)}catch(e){return c(e)}c(null)},No:(a,c,d)=>{a=a.get(c);a.onsuccess=e=>{d(null,e.target.result)};a.onerror=e=>{d(this.error);e.preventDefault()}},ep:(a,c,d,e)=>{try{var f=a.put(d,c)}catch(g){e(g);return}f.onsuccess=()=>{e(null)};f.onerror=
g=>{e(this.error);g.preventDefault()}},Yo:(a,c,d)=>{a=a.delete(c);a.onsuccess=()=>{d(null)};a.onerror=e=>{d(this.error);e.preventDefault()}},Vo:(a,c,d)=>{function e(n){if(n&&!k)return k=!0,d(n)}var f=0,g=[];Object.keys(a.entries).forEach(function(n){var q=a.entries[n],w=c.entries[n];w&&q.timestamp.getTime()==w.timestamp.getTime()||(g.push(n),f++)});var h=[];Object.keys(c.entries).forEach(function(n){a.entries[n]||(h.push(n),f++)});if(!f)return d(null);var k=!1,l=("remote"===a.type?a.db:c.db).transaction([U.Bn],
"readwrite"),m=l.objectStore(U.Bn);l.onerror=n=>{e(this.error);n.preventDefault()};l.oncomplete=()=>{k||d(null)};g.sort().forEach(n=>{"local"===c.type?U.No(m,n,(q,w)=>{if(q)return e(q);U.cp(n,w,e)}):U.Mo(n,(q,w)=>{if(q)return e(q);U.ep(m,n,w,e)})});h.sort().reverse().forEach(n=>{"local"===c.type?U.Xo(n,e):U.Yo(m,n,e)})}},Tb=null,Ub={},Vb=[],Wb=1,Xb=null,Yb=!0,S=null,Lb={},Zb=0,N=(a,c={})=>{a=Ab("/",a);if(!a)return{path:"",node:null};c=Object.assign({ao:!0,eo:0},c);if(8<c.eo)throw new S(32);a=vb(a.split("/").filter(h=>
!!h),!1);for(var d=Tb,e="/",f=0;f<a.length;f++){var g=f===a.length-1;if(g&&c.parent)break;d=Nb(d,a[f]);e=wb(e+"/"+a[f]);d.vn&&(!g||g&&c.ao)&&(d=d.vn.root);if(!g||c.Hn)for(g=0;40960===(d.mode&61440);)if(d=$b(e),e=Ab(xb(e),d),d=N(e,{eo:c.eo+1}).node,40<g++)throw new S(32);}return{path:e,node:d}},ac=a=>{for(var c;;){if(a===a.parent)return a=a.rn.Rn,c?"/"!==a[a.length-1]?a+"/"+c:a+c:a;c=c?a.name+"/"+c:a.name;a=a.parent}},bc=(a,c)=>{for(var d=0,e=0;e<c.length;e++)d=(d<<5)-d+c.charCodeAt(e)|0;return(a+
d>>>0)%Xb.length},cc=a=>{var c=bc(a.parent.id,a.name);a.En=Xb[c];Xb[c]=a},dc=a=>{var c=bc(a.parent.id,a.name);if(Xb[c]===a)Xb[c]=a.En;else for(c=Xb[c];c;){if(c.En===a){c.En=a.En;break}c=c.En}},Nb=(a,c)=>{var d;if(d=(d=ec(a,"x"))?d:a.ln.Kn?0:2)throw new S(d,a);for(d=Xb[bc(a.id,c)];d;d=d.En){var e=d.name;if(d.parent.id===a.id&&e===c)return d}return a.ln.Kn(a,c)},Kb=(a,c,d,e)=>{a=new fc(a,c,d,e);cc(a);return a},gc={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090},hc=a=>{var c=["r","w","rw"][a&3];a&512&&(c+=
"w");return c},ec=(a,c)=>{if(Yb)return 0;if(!c.includes("r")||a.mode&292){if(c.includes("w")&&!(a.mode&146)||c.includes("x")&&!(a.mode&73))return 2}else return 2;return 0},ic=(a,c)=>{try{return Nb(a,c),20}catch(d){}return ec(a,"wx")},jc=(a,c,d)=>{try{var e=Nb(a,c)}catch(f){return f.on}if(a=ec(a,"wx"))return a;if(d){if(16384!==(e.mode&61440))return 54;if(e===e.parent||"/"===ac(e))return 10}else if(16384===(e.mode&61440))return 31;return 0},kc=(a=0)=>{for(;4096>=a;a++)if(!Vb[a])return a;throw new S(33);
},mc=(a,c)=>{lc||(lc=function(){this.xn={}},lc.prototype={},Object.defineProperties(lc.prototype,{object:{get:function(){return this.node},set:function(d){this.node=d}},flags:{get:function(){return this.xn.flags},set:function(d){this.xn.flags=d}},position:{get:function(){return this.xn.position},set:function(d){this.xn.position=d}}}));a=Object.assign(new lc,a);c=kc(c);a.An=c;return Vb[c]=a},Jb={open:a=>{a.nn=Ub[a.node.Nn].nn;a.nn.open&&a.nn.open(a)},Dn:()=>{throw new S(70);}},Fb=(a,c)=>{Ub[a]={nn:c}},
nc=a=>{var c=[];for(a=[a];a.length;){var d=a.pop();c.push(d);a.push.apply(a,d.Sn)}return c},kb=(a,c)=>{function d(h){Zb--;return c(h)}function e(h){if(h){if(!e.Eo)return e.Eo=!0,d(h)}else++g>=f.length&&d(null)}"function"==typeof a&&(c=a,a=!1);Zb++;1<Zb&&za("warning: "+Zb+" FS.syncfs operations in flight at once, probably just doing extra work");var f=nc(Tb.rn),g=0;f.forEach(h=>{if(!h.type.xo)return e(null);h.type.xo(h,a,e)})},jb=(a,c,d)=>{var e="/"===d,f=!d;if(e&&Tb)throw new S(10);if(!e&&!f){var g=
N(d,{ao:!1});d=g.path;g=g.node;if(g.vn)throw new S(10);if(16384!==(g.mode&61440))throw new S(54);}c={type:a,Ro:c,Rn:d,Sn:[]};a=a.rn(c);a.rn=c;c.root=a;e?Tb=a:g&&(g.vn=c,g.rn&&g.rn.Sn.push(c))},ib=a=>{a=N(a,{ao:!1});if(!a.node.vn)throw new S(28);a=a.node;var c=a.vn,d=nc(c);Object.keys(Xb).forEach(e=>{for(e=Xb[e];e;){var f=e.En;d.includes(e.rn)&&dc(e);e=f}});a.vn=null;a.rn.Sn.splice(a.rn.Sn.indexOf(c),1)},oc=(a,c,d)=>{var e=N(a,{parent:!0}).node;a=yb(a);if(!a||"."===a||".."===a)throw new S(28);var f=
ic(e,a);if(f)throw new S(f);if(!e.ln.Ln)throw new S(63);return e.ln.Ln(e,a,c,d)},P=(a,c)=>oc(a,(void 0!==c?c:511)&1023|16384,0),gb=(a,c)=>{a=a.split("/");for(var d="",e=0;e<a.length;++e)if(a[e]){d+="/"+a[e];try{P(d,c)}catch(f){if(20!=f.on)throw f;}}},pc=(a,c,d)=>{"undefined"==typeof d&&(d=c,c=438);oc(a,c|8192,d)},hb=(a,c)=>{if(!Ab(a))throw new S(44);var d=N(c,{parent:!0}).node;if(!d)throw new S(44);c=yb(c);var e=ic(d,c);if(e)throw new S(e);if(!d.ln.Xn)throw new S(63);d.ln.Xn(d,c,a)},fb=a=>{var c=
N(a,{parent:!0}).node;a=yb(a);var d=Nb(c,a),e=jc(c,a,!0);if(e)throw new S(e);if(!c.ln.Wn)throw new S(63);if(d.vn)throw new S(10);c.ln.Wn(c,a);dc(d)},eb=a=>{var c=N(a,{parent:!0}).node;if(!c)throw new S(44);a=yb(a);var d=Nb(c,a),e=jc(c,a,!1);if(e)throw new S(e);if(!c.ln.$n)throw new S(63);if(d.vn)throw new S(10);c.ln.$n(c,a);dc(d)},$b=a=>{a=N(a).node;if(!a)throw new S(44);if(!a.ln.On)throw new S(28);return Ab(ac(a.parent),a.ln.On(a))},Ob=(a,c)=>{a=N(a,{Hn:!c}).node;if(!a)throw new S(44);if(!a.ln.wn)throw new S(63);
return a.ln.wn(a)},qc=a=>Ob(a,!0),Sb=(a,c)=>{a="string"==typeof a?N(a,{Hn:!0}).node:a;if(!a.ln.un)throw new S(63);a.ln.un(a,{mode:c&4095|a.mode&-4096,timestamp:Date.now()})},rc=(a,c)=>{if(0>c)throw new S(28);a="string"==typeof a?N(a,{Hn:!0}).node:a;if(!a.ln.un)throw new S(63);if(16384===(a.mode&61440))throw new S(31);if(32768!==(a.mode&61440))throw new S(28);var d=ec(a,"w");if(d)throw new S(d);a.ln.un(a,{size:c,timestamp:Date.now()})},Pb=(a,c,d)=>{if(""===a)throw new S(44);if("string"==typeof c){var e=
gc[c];if("undefined"==typeof e)throw Error("Unknown file open mode: "+c);c=e}d=c&64?("undefined"==typeof d?438:d)&4095|32768:0;if("object"==typeof a)var f=a;else{a=wb(a);try{f=N(a,{Hn:!(c&131072)}).node}catch(g){}}e=!1;if(c&64)if(f){if(c&128)throw new S(20);}else f=oc(a,d,0),e=!0;if(!f)throw new S(44);8192===(f.mode&61440)&&(c&=-513);if(c&65536&&16384!==(f.mode&61440))throw new S(54);if(!e&&(d=f?40960===(f.mode&61440)?32:16384===(f.mode&61440)&&("r"!==hc(c)||c&512)?31:ec(f,hc(c)):44))throw new S(d);
c&512&&!e&&rc(f,0);c&=-131713;f=mc({node:f,path:ac(f),flags:c,seekable:!0,position:0,nn:f.nn,lp:[],error:!1});f.nn.open&&f.nn.open(f);!b.logReadFiles||c&1||(sc||(sc={}),a in sc||(sc[a]=1));return f},Rb=a=>{if(null===a.An)throw new S(8);a.Cn&&(a.Cn=null);try{a.nn.close&&a.nn.close(a)}catch(c){throw c;}finally{Vb[a.An]=null}a.An=null},tc=(a,c,d)=>{if(null===a.An)throw new S(8);if(!a.seekable||!a.nn.Dn)throw new S(70);if(0!=d&&1!=d&&2!=d)throw new S(28);a.position=a.nn.Dn(a,c,d);a.lp=[];return a.position},
Qb=(a,c,d,e,f,g)=>{if(0>e||0>f)throw new S(28);if(null===a.An)throw new S(8);if(0===(a.flags&2097155))throw new S(8);if(16384===(a.node.mode&61440))throw new S(31);if(!a.nn.write)throw new S(28);a.seekable&&a.flags&1024&&tc(a,0,2);var h="undefined"!=typeof f;if(!h)f=a.position;else if(!a.seekable)throw new S(70);c=a.nn.write(a,c,d,e,f,g);h||(a.position+=c);return c},uc=()=>{S||(S=function(a,c){this.node=c;this.ap=function(d){this.on=d};this.ap(a);this.message="FS error"},S.prototype=Error(),S.prototype.constructor=
S,[44].forEach(a=>{Lb[a]=new S(a);Lb[a].stack="<generic error, no stack>"}))},vc,wc=(a,c)=>{var d=0;a&&(d|=365);c&&(d|=146);return d},yc=(a,c,d)=>{a=wb("/dev/"+a);var e=wc(!!c,!!d);xc||(xc=64);var f=xc++<<8|0;Fb(f,{open:g=>{g.seekable=!1},close:()=>{d&&d.buffer&&d.buffer.length&&d(10)},read:(g,h,k,l)=>{for(var m=0,n=0;n<l;n++){try{var q=c()}catch(w){throw new S(29);}if(void 0===q&&0===m)throw new S(6);if(null===q||void 0===q)break;m++;h[k+n]=q}m&&(g.node.timestamp=Date.now());return m},write:(g,h,
k,l)=>{for(var m=0;m<l;m++)try{d(h[k+m])}catch(n){throw new S(29);}l&&(g.node.timestamp=Date.now());return m}});pc(a,e,f)},xc,V={},lc,sc;function zc(a,c,d){if("/"===c.charAt(0))return c;a=-100===a?"/":Ac(a).path;if(0==c.length){if(!d)throw new S(44);return a}return wb(a+"/"+c)}
function Bc(a,c,d){try{var e=a(c)}catch(f){if(f&&f.node&&wb(c)!==wb(ac(f.node)))return-54;throw f;}C[d>>2]=e.Do;C[d+8>>2]=e.bo;C[d+12>>2]=e.mode;E[d+16>>2]=e.Po;C[d+20>>2]=e.uid;C[d+24>>2]=e.Ko;C[d+28>>2]=e.Nn;L=[e.size>>>0,(H=e.size,1<=+Math.abs(H)?0<H?(Math.min(+Math.floor(H/4294967296),4294967295)|0)>>>0:~~+Math.ceil((H-+(~~H>>>0))/4294967296)>>>0:0)];C[d+40>>2]=L[0];C[d+44>>2]=L[1];C[d+48>>2]=4096;C[d+52>>2]=e.Bo;L=[Math.floor(e.ko.getTime()/1E3)>>>0,(H=Math.floor(e.ko.getTime()/1E3),1<=+Math.abs(H)?
0<H?(Math.min(+Math.floor(H/4294967296),4294967295)|0)>>>0:~~+Math.ceil((H-+(~~H>>>0))/4294967296)>>>0:0)];C[d+56>>2]=L[0];C[d+60>>2]=L[1];E[d+64>>2]=0;L=[Math.floor(e.Tn.getTime()/1E3)>>>0,(H=Math.floor(e.Tn.getTime()/1E3),1<=+Math.abs(H)?0<H?(Math.min(+Math.floor(H/4294967296),4294967295)|0)>>>0:~~+Math.ceil((H-+(~~H>>>0))/4294967296)>>>0:0)];C[d+72>>2]=L[0];C[d+76>>2]=L[1];E[d+80>>2]=0;L=[Math.floor(e.oo.getTime()/1E3)>>>0,(H=Math.floor(e.oo.getTime()/1E3),1<=+Math.abs(H)?0<H?(Math.min(+Math.floor(H/
4294967296),4294967295)|0)>>>0:~~+Math.ceil((H-+(~~H>>>0))/4294967296)>>>0:0)];C[d+88>>2]=L[0];C[d+92>>2]=L[1];E[d+96>>2]=0;L=[e.bo>>>0,(H=e.bo,1<=+Math.abs(H)?0<H?(Math.min(+Math.floor(H/4294967296),4294967295)|0)>>>0:~~+Math.ceil((H-+(~~H>>>0))/4294967296)>>>0:0)];C[d+104>>2]=L[0];C[d+108>>2]=L[1];return 0}var Cc=void 0;function Dc(){Cc+=4;return C[Cc-4>>2]}function Ac(a){a=Vb[a];if(!a)throw new S(8);return a}function Ec(a,c){return c+2097152>>>0<4194305-!!a?(a>>>0)+4294967296*c:NaN}
function Fc(a){var c=ia(a)+1,d=ja(c);d&&ka(a,A,d,c);return d}function Gc(a,c,d){function e(l){return(l=l.toTimeString().match(/\(([A-Za-z ]+)\)$/))?l[1]:"GMT"}var f=(new Date).getFullYear(),g=new Date(f,0,1),h=new Date(f,6,1);f=g.getTimezoneOffset();var k=h.getTimezoneOffset();C[a>>2]=60*Math.max(f,k);C[c>>2]=Number(f!=k);a=e(g);c=e(h);a=Fc(a);c=Fc(c);k<f?(E[d>>2]=a,E[d+4>>2]=c):(E[d>>2]=c,E[d+4>>2]=a)}function Hc(a,c,d){Hc.Co||(Hc.Co=!0,Gc(a,c,d))}var Ic=[],Jc={};
function Kc(){if(!Lc){var a={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"==typeof navigator&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:ra||"./this.program"},c;for(c in Jc)void 0===Jc[c]?delete a[c]:a[c]=Jc[c];var d=[];for(c in a)d.push(c+"="+a[c]);Lc=d}return Lc}var Lc;
function Mc(a,c,d,e){for(var f=0,g=0;g<d;g++){var h=E[c>>2],k=E[c+4>>2];c+=8;var l=a;var m=h,n=k,q=e,w=A;if(0>n||0>q)throw new S(28);if(null===l.An)throw new S(8);if(1===(l.flags&2097155))throw new S(8);if(16384===(l.node.mode&61440))throw new S(31);if(!l.nn.read)throw new S(28);h="undefined"!=typeof q;if(!h)q=l.position;else if(!l.seekable)throw new S(70);m=l.nn.read(l,w,m,n,q);h||(l.position+=m);l=m;if(0>l)return-1;f+=l;if(l<k)break}return f}
function Nc(a,c,d,e){for(var f=0,g=0;g<d;g++){var h=E[c>>2],k=E[c+4>>2];c+=8;h=Qb(a,A,h,k,e);if(0>h)return-1;f+=h}return f}function Oc(a){return 0===a%4&&(0!==a%100||0===a%400)}var Pc=[31,29,31,30,31,30,31,31,30,31,30,31],Qc=[31,28,31,30,31,30,31,31,30,31,30,31];
function Rc(a,c,d,e){function f(p,x,y){for(p="number"==typeof p?p.toString():p||"";p.length<x;)p=y[0]+p;return p}function g(p,x){return f(p,x,"0")}function h(p,x){function y(B){return 0>B?-1:0<B?1:0}var z;0===(z=y(p.getFullYear()-x.getFullYear()))&&0===(z=y(p.getMonth()-x.getMonth()))&&(z=y(p.getDate()-x.getDate()));return z}function k(p){switch(p.getDay()){case 0:return new Date(p.getFullYear()-1,11,29);case 1:return p;case 2:return new Date(p.getFullYear(),0,3);case 3:return new Date(p.getFullYear(),
0,2);case 4:return new Date(p.getFullYear(),0,1);case 5:return new Date(p.getFullYear()-1,11,31);case 6:return new Date(p.getFullYear()-1,11,30)}}function l(p){var x=p.Fn;for(p=new Date((new Date(p.Gn+1900,0,1)).getTime());0<x;){var y=p.getMonth(),z=(Oc(p.getFullYear())?Pc:Qc)[y];if(x>z-p.getDate())x-=z-p.getDate()+1,p.setDate(1),11>y?p.setMonth(y+1):(p.setMonth(0),p.setFullYear(p.getFullYear()+1));else{p.setDate(p.getDate()+x);break}}y=new Date(p.getFullYear()+1,0,4);x=k(new Date(p.getFullYear(),
0,4));y=k(y);return 0>=h(x,p)?0>=h(y,p)?p.getFullYear()+1:p.getFullYear():p.getFullYear()-1}var m=C[e+40>>2];e={hp:C[e>>2],gp:C[e+4>>2],Yn:C[e+8>>2],io:C[e+12>>2],Zn:C[e+16>>2],Gn:C[e+20>>2],zn:C[e+24>>2],Fn:C[e+28>>2],op:C[e+32>>2],fp:C[e+36>>2],ip:m?u(m):""};d=u(d);m={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d",
"%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var n in m)d=d.replace(new RegExp(n,"g"),m[n]);var q="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),w="January February March April May June July August September October November December".split(" ");m={"%a":function(p){return q[p.zn].substring(0,3)},"%A":function(p){return q[p.zn]},"%b":function(p){return w[p.Zn].substring(0,3)},"%B":function(p){return w[p.Zn]},
"%C":function(p){return g((p.Gn+1900)/100|0,2)},"%d":function(p){return g(p.io,2)},"%e":function(p){return f(p.io,2," ")},"%g":function(p){return l(p).toString().substring(2)},"%G":function(p){return l(p)},"%H":function(p){return g(p.Yn,2)},"%I":function(p){p=p.Yn;0==p?p=12:12<p&&(p-=12);return g(p,2)},"%j":function(p){for(var x=0,y=0;y<=p.Zn-1;x+=(Oc(p.Gn+1900)?Pc:Qc)[y++]);return g(p.io+x,3)},"%m":function(p){return g(p.Zn+1,2)},"%M":function(p){return g(p.gp,2)},"%n":function(){return"\n"},"%p":function(p){return 0<=
p.Yn&&12>p.Yn?"AM":"PM"},"%S":function(p){return g(p.hp,2)},"%t":function(){return"\t"},"%u":function(p){return p.zn||7},"%U":function(p){return g(Math.floor((p.Fn+7-p.zn)/7),2)},"%V":function(p){var x=Math.floor((p.Fn+7-(p.zn+6)%7)/7);2>=(p.zn+371-p.Fn-2)%7&&x++;if(x)53==x&&(y=(p.zn+371-p.Fn)%7,4==y||3==y&&Oc(p.Gn)||(x=1));else{x=52;var y=(p.zn+7-p.Fn-1)%7;(4==y||5==y&&Oc(p.Gn%400-1))&&x++}return g(x,2)},"%w":function(p){return p.zn},"%W":function(p){return g(Math.floor((p.Fn+7-(p.zn+6)%7)/7),2)},
"%y":function(p){return(p.Gn+1900).toString().substring(2)},"%Y":function(p){return p.Gn+1900},"%z":function(p){p=p.fp;var x=0<=p;p=Math.abs(p)/60;return(x?"+":"-")+String("0000"+(p/60*100+p%60)).slice(-4)},"%Z":function(p){return p.ip},"%%":function(){return"%"}};d=d.replace(/%%/g,"\x00\x00");for(n in m)d.includes(n)&&(d=d.replace(new RegExp(n,"g"),m[n](e)));d=d.replace(/\0\0/g,"%");n=Cb(d,!1);if(n.length>c)return 0;A.set(n,a);return n.length-1}
var db={rn:function(a){var c=T.rn(a);db.wo(c,a.Ro.Oo);return c},no:function(a,c,d,e,f){a=a.ln.Ln(a,c,33279,0);a.nn.read=db.Uo;a.timestamp=f;a.url=d;a.qn=e},Uo:function(a,c,d,e,f){a=a.node;e=Math.min(a.qn-f,e);if(!a.mn){var g=self.origin?self.origin:self.location.origin,h=a.url;"/"==h.charAt(0)&&(h=g+h);a.mn=new Uint8Array(db.request(h,"arraybuffer").response)}a=a.mn;if(f>=a.length)return 0;0<=e||v();if(8<e)c.set(a.subarray(f,f+e),d);else for(g=0;g<e;g++)c[d+g]=a[f+g];return e},zo:function(a,c){c=
c.split("\n");a=N(a);if(!a)throw Error("failed to find node to add external files");a=a.node;for(var d=0;d<c.length;d++){var e=c[d].split("\t");3>e.length||4<e.length||db.no(a,e[0],e[1],parseInt(e[2],10),4==e.length?parseInt(e[3],10):void 0)}},wo:function(a,c){c=db.request(c,"text").responseText.split("\n");for(var d=a,e=0;e<c.length;e++){var f=c[e].split("\t");if(!(3>f.length||4<f.length)){var g=f[0].split("/"),h=g.length-2;if(0==h)d=a;else{for(;0<h&&g[h]!=d.name;)d!=a&&(d=d.parent),h--;for(;h<g.length-
2;)d=T.createNode(d,g[++h],16895,0)}db.no(d,g[g.length-1],f[1],parseInt(f[2],10),4==f.length?parseInt(f[3],10):void 0)}}},request:function(a,c){var d=new XMLHttpRequest;d.open("GET",a,!1);d.responseType=c;d.send();if(!(200<=d.status&&300>d.status||304===d.status))throw Error("Couldn't load "+a+". Status: "+d.status);return d}};function fc(a,c,d,e){a||(a=this);this.parent=a;this.rn=a.rn;this.vn=null;this.id=Wb++;this.name=c;this.mode=d;this.ln={};this.nn={};this.Nn=e}
Object.defineProperties(fc.prototype,{read:{get:function(){return 365===(this.mode&365)},set:function(a){a?this.mode|=365:this.mode&=-366}},write:{get:function(){return 146===(this.mode&146)},set:function(a){a?this.mode|=146:this.mode&=-147}}});uc();Xb=Array(4096);jb(T,{},"/");P("/tmp");P("/home");P("/home/web_user");
(()=>{P("/dev");Fb(259,{read:()=>0,write:(c,d,e,f)=>f});pc("/dev/null",259);Eb(1280,Hb);Eb(1536,Ib);pc("/dev/tty",1280);pc("/dev/tty1",1536);var a=zb();yc("random",a);yc("urandom",a);P("/dev/shm");P("/dev/shm/tmp")})();(()=>{P("/proc");var a=P("/proc/self");P("/proc/self/fd");jb({rn:()=>{var c=Kb(a,"fd",16895,73);c.ln={Kn:(d,e)=>{var f=Vb[+e];if(!f)throw new S(8);d={parent:null,rn:{Rn:"fake"},ln:{On:()=>f.path}};return d.parent=d}};return c}},{},"/proc/self/fd")})();
var Hi={n:function(a){return ja(a+24)+24},o:function(a){a=new rb(a);a.To()||(a.fo(!0),pb--);a.ho(!1);ob.push(a);a.Qo();return a.vo()},ge:function(a){za("Unexpected exception thrown, this is not properly supported - aborting");Da=!0;throw a;},t:function(){W(0);var a=ob.pop();if(a.Wo()&&!a.ro()){var c=a.Jo();c&&Q(c)(a.Jn);tb(a.Jn)}qb=0},a:function(){var a=qb;if(!a)return Z(0),0;var c=new rb(a);c.Mn(a);var d=c.xn();if(!d)return Z(0),a;for(var e=0;e<arguments.length;e++){var f=arguments[e];if(0===f||
f===d)break;if(Sc(f,d,c.pn+16))return Z(f),a}Z(d);return a},h:function(){var a=qb;if(!a)return Z(0),0;var c=new rb(a);c.Mn(a);var d=c.xn();if(!d)return Z(0),a;for(var e=0;e<arguments.length;e++){var f=arguments[e];if(0===f||f===d)break;if(Sc(f,d,c.pn+16))return Z(f),a}Z(d);return a},r:function(){var a=qb;if(!a)return Z(0),0;var c=new rb(a);c.Mn(a);var d=c.xn();if(!d)return Z(0),a;for(var e=0;e<arguments.length;e++){var f=arguments[e];if(0===f||f===d)break;if(Sc(f,d,c.pn+16))return Z(f),a}Z(d);return a},
x:function(){var a=qb;if(!a)return Z(0),0;var c=new rb(a);c.Mn(a);var d=c.xn();if(!d)return Z(0),a;for(var e=0;e<arguments.length;e++){var f=arguments[e];if(0===f||f===d)break;if(Sc(f,d,c.pn+16))return Z(f),a}Z(d);return a},y:tb,Ha:function(a){return(new rb(a)).vo()},Kb:function(){var a=ob.pop();a||v("no exception to throw");var c=a.Jn;a.ro()||(ob.push(a),a.ho(!0),a.fo(!1),pb++);qb=c;throw c;},w:function(a,c,d){(new rb(a)).$o(c,d);qb=a;pb++;throw a;},Ld:function(){return pb},e:function(a){qb||(qb=
a);throw a;},ee:function(a,c){try{return a=u(a),Sb(a,c),0}catch(d){if("undefined"==typeof V||!(d instanceof S))throw d;return-d.on}},Qb:function(a,c,d){Cc=d;try{var e=Ac(a);switch(c){case 0:var f=Dc();return 0>f?-28:mc(e,f).An;case 1:case 2:return 0;case 3:return e.flags;case 4:return f=Dc(),e.flags|=f,0;case 5:return f=Dc(),Ga[f+0>>1]=2,0;case 6:case 7:return 0;case 16:case 8:return-28;case 9:return C[Tc()>>2]=28,-1;default:return-28}}catch(g){if("undefined"==typeof V||!(g instanceof S))throw g;
return-g.on}},Xd:function(a,c){try{var d=Ac(a);return Bc(Ob,d.path,c)}catch(e){if("undefined"==typeof V||!(e instanceof S))throw e;return-e.on}},Wc:function(a,c,d){try{var e=Ec(c,d);if(isNaN(e))return-61;var f=Vb[a];if(!f)throw new S(8);if(0===(f.flags&2097155))throw new S(28);rc(f.node,e);return 0}catch(g){if("undefined"==typeof V||!(g instanceof S))throw g;return-g.on}},Qd:function(a,c,d){try{var e=Ac(a);if(!e.Cn){var f=N(e.path,{Hn:!0}).node;if(!f.ln.Un)throw new S(54);var g=f.ln.Un(f);e.Cn=g}a=
0;for(var h=tc(e,0,1),k=Math.floor(h/280);k<e.Cn.length&&a+280<=d;){var l=e.Cn[k];if("."===l){var m=e.node.id;var n=4}else if(".."===l)m=N(e.path,{parent:!0}).node.id,n=4;else{var q=Nb(e.node,l);m=q.id;n=8192===(q.mode&61440)?2:16384===(q.mode&61440)?4:40960===(q.mode&61440)?10:8}L=[m>>>0,(H=m,1<=+Math.abs(H)?0<H?(Math.min(+Math.floor(H/4294967296),4294967295)|0)>>>0:~~+Math.ceil((H-+(~~H>>>0))/4294967296)>>>0:0)];C[c+a>>2]=L[0];C[c+a+4>>2]=L[1];L=[280*(k+1)>>>0,(H=280*(k+1),1<=+Math.abs(H)?0<H?(Math.min(+Math.floor(H/
4294967296),4294967295)|0)>>>0:~~+Math.ceil((H-+(~~H>>>0))/4294967296)>>>0:0)];C[c+a+8>>2]=L[0];C[c+a+12>>2]=L[1];Ga[c+a+16>>1]=280;A[c+a+18>>0]=n;ka(l,la,c+a+19,256);a+=280;k+=1}tc(e,280*k,0);return a}catch(w){if("undefined"==typeof V||!(w instanceof S))throw w;return-w.on}},fe:function(a,c,d){Cc=d;try{var e=Ac(a);switch(c){case 21509:case 21505:return e.sn?0:-59;case 21510:case 21511:case 21512:case 21506:case 21507:case 21508:return e.sn?0:-59;case 21519:if(!e.sn)return-59;var f=Dc();return C[f>>
2]=0;case 21520:return e.sn?-28:-59;case 21531:a=f=Dc();if(!e.nn.Lo)throw new S(59);return e.nn.Lo(e,c,a);case 21523:return e.sn?0:-59;case 21524:return e.sn?0:-59;default:return-28}}catch(g){if("undefined"==typeof V||!(g instanceof S))throw g;return-g.on}},Ud:function(a,c){try{return a=u(a),Bc(qc,a,c)}catch(d){if("undefined"==typeof V||!(d instanceof S))throw d;return-d.on}},Rd:function(a,c,d){try{return c=u(c),c=zc(a,c),c=wb(c),"/"===c[c.length-1]&&(c=c.substr(0,c.length-1)),P(c,d),0}catch(e){if("undefined"==
typeof V||!(e instanceof S))throw e;return-e.on}},Vd:function(a,c,d,e){try{c=u(c);var f=e&256;c=zc(a,c,e&4096);return Bc(f?qc:Ob,c,d)}catch(g){if("undefined"==typeof V||!(g instanceof S))throw g;return-g.on}},Nb:function(a,c,d,e){Cc=e;try{c=u(c);c=zc(a,c);var f=e?Dc():0;return Pb(c,d,f).An}catch(g){if("undefined"==typeof V||!(g instanceof S))throw g;return-g.on}},Od:function(a,c,d,e){try{c=u(c);e=u(e);c=zc(a,c);e=zc(d,e);a=c;var f=xb(a),g=xb(e),h=yb(a),k=yb(e);var l=N(a,{parent:!0});var m=l.node;
l=N(e,{parent:!0});var n=l.node;if(!m||!n)throw new S(44);if(m.rn!==n.rn)throw new S(75);var q=Nb(m,h),w=Bb(a,g);if("."!==w.charAt(0))throw new S(28);w=Bb(e,f);if("."!==w.charAt(0))throw new S(55);try{var p=Nb(n,k)}catch(z){}if(q!==p){var x=16384===(q.mode&61440),y=jc(m,h,x);if(y)throw new S(y);if(y=p?jc(n,k,x):ic(n,k))throw new S(y);if(!m.ln.Vn)throw new S(63);if(q.vn||p&&p.vn)throw new S(10);if(n!==m&&(y=ec(m,"w")))throw new S(y);dc(q);try{m.ln.Vn(q,n,k)}catch(z){throw z;}finally{cc(q)}}return 0}catch(z){if("undefined"==
typeof V||!(z instanceof S))throw z;return-z.on}},Pd:function(a){try{return a=u(a),fb(a),0}catch(c){if("undefined"==typeof V||!(c instanceof S))throw c;return-c.on}},Wd:function(a,c){try{return a=u(a),Bc(Ob,a,c)}catch(d){if("undefined"==typeof V||!(d instanceof S))throw d;return-d.on}},Mb:function(a,c,d){try{return c=u(c),c=zc(a,c),0===d?eb(c):512===d?fb(c):v("Invalid flags passed to unlinkat"),0}catch(e){if("undefined"==typeof V||!(e instanceof S))throw e;return-e.on}},Zd:function(){return!0},$d:function(a,
c){a=new Date(1E3*(E[a>>2]+4294967296*C[a+4>>2]));C[c>>2]=a.getUTCSeconds();C[c+4>>2]=a.getUTCMinutes();C[c+8>>2]=a.getUTCHours();C[c+12>>2]=a.getUTCDate();C[c+16>>2]=a.getUTCMonth();C[c+20>>2]=a.getUTCFullYear()-1900;C[c+24>>2]=a.getUTCDay();C[c+28>>2]=(a.getTime()-Date.UTC(a.getUTCFullYear(),0,1,0,0,0,0))/864E5|0},ae:function(a,c){a=new Date(1E3*(E[a>>2]+4294967296*C[a+4>>2]));C[c>>2]=a.getSeconds();C[c+4>>2]=a.getMinutes();C[c+8>>2]=a.getHours();C[c+12>>2]=a.getDate();C[c+16>>2]=a.getMonth();C[c+
20>>2]=a.getFullYear()-1900;C[c+24>>2]=a.getDay();var d=new Date(a.getFullYear(),0,1);C[c+28>>2]=(a.getTime()-d.getTime())/864E5|0;C[c+36>>2]=-(60*a.getTimezoneOffset());var e=(new Date(a.getFullYear(),6,1)).getTimezoneOffset();d=d.getTimezoneOffset();C[c+32>>2]=(e!=d&&a.getTimezoneOffset()==Math.min(d,e))|0},be:function(a){var c=new Date(C[a+20>>2]+1900,C[a+16>>2],C[a+12>>2],C[a+8>>2],C[a+4>>2],C[a>>2],0),d=C[a+32>>2],e=c.getTimezoneOffset(),f=new Date(c.getFullYear(),0,1),g=(new Date(c.getFullYear(),
6,1)).getTimezoneOffset(),h=f.getTimezoneOffset(),k=Math.min(h,g);0>d?C[a+32>>2]=Number(g!=h&&k==e):0<d!=(k==e)&&(g=Math.max(h,g),c.setTime(c.getTime()+6E4*((0<d?k:g)-e)));C[a+24>>2]=c.getDay();C[a+28>>2]=(c.getTime()-f.getTime())/864E5|0;C[a>>2]=c.getSeconds();C[a+4>>2]=c.getMinutes();C[a+8>>2]=c.getHours();C[a+12>>2]=c.getDate();C[a+16>>2]=c.getMonth();C[a+20>>2]=c.getYear();return c.getTime()/1E3|0},ce:Hc,nb:function(){v("")},Sa:function(a,c,d){Ic.length=0;var e;for(d>>=2;e=la[c++];)d+=105!=e&
d,Ic.push(105==e?C[d]:Ia[d++>>1]),++d;return lb[a].apply(null,Ic)},Ua:function(){return Date.now()},Nd:function(){return 2147483648},Yd:()=>performance.now(),de:function(a,c,d){la.copyWithin(a,c,c+d)},Md:function(a){var c=la.length;a>>>=0;if(2147483648<a)return!1;for(var d=1;4>=d;d*=2){var e=c*(1+.2/d);e=Math.min(e,a+100663296);var f=Math;e=Math.max(a,e);f=f.min.call(f,2147483648,e+(65536-e%65536)%65536);a:{try{Ca.grow(f-ha.byteLength+65535>>>16);Ja();var g=1;break a}catch(h){}g=void 0}if(g)return!0}return!1},
Sd:function(a,c){var d=0;Kc().forEach(function(e,f){var g=c+d;f=E[a+4*f>>2]=g;for(g=0;g<e.length;++g)A[f++>>0]=e.charCodeAt(g);A[f>>0]=0;d+=e.length+1});return 0},Td:function(a,c){var d=Kc();E[a>>2]=d.length;var e=0;d.forEach(function(f){e+=f.length+1});E[c>>2]=e;return 0},_a:function(a){if(!noExitRuntime){if(b.onExit)b.onExit(a);Da=!0}sa(a,new mb(a))},Va:function(a){try{var c=Ac(a);Rb(c);return 0}catch(d){if("undefined"==typeof V||!(d instanceof S))throw d;return d.on}},Uc:function(a,c,d,e,f,g){try{var h=
Ec(e,f);if(isNaN(h))return 61;var k=Ac(a),l=Mc(k,c,d,h);E[g>>2]=l;return 0}catch(m){if("undefined"==typeof V||!(m instanceof S))throw m;return m.on}},Tc:function(a,c,d,e,f,g){try{var h=Ec(e,f);if(isNaN(h))return 61;var k=Ac(a),l=Nc(k,c,d,h);E[g>>2]=l;return 0}catch(m){if("undefined"==typeof V||!(m instanceof S))throw m;return m.on}},Pb:function(a,c,d,e){try{var f=Ac(a),g=Mc(f,c,d);E[e>>2]=g;return 0}catch(h){if("undefined"==typeof V||!(h instanceof S))throw h;return h.on}},Vc:function(a,c,d,e,f){try{var g=
Ec(c,d);if(isNaN(g))return 61;var h=Ac(a);tc(h,g,e);L=[h.position>>>0,(H=h.position,1<=+Math.abs(H)?0<H?(Math.min(+Math.floor(H/4294967296),4294967295)|0)>>>0:~~+Math.ceil((H-+(~~H>>>0))/4294967296)>>>0:0)];C[f>>2]=L[0];C[f+4>>2]=L[1];h.Cn&&0===g&&0===e&&(h.Cn=null);return 0}catch(k){if("undefined"==typeof V||!(k instanceof S))throw k;return k.on}},Ob:function(a,c,d,e){try{var f=Ac(a),g=Nc(f,c,d);E[e>>2]=g;return 0}catch(h){if("undefined"==typeof V||!(h instanceof S))throw h;return h.on}},ja:Uc,yc:Vc,
W:Wc,I:Xc,D:Yc,Be:Zc,F:$c,Ee:ad,Qa:bd,ra:cd,zb:dd,Ff:ed,ua:fd,ta:gd,Ab:hd,R:jd,Re:kd,wc:ld,Jb:md,ab:nd,he:od,A:pd,aa:qd,ec:rd,Cf:sd,xf:td,Ac:ud,pf:vd,b:wd,ib:xd,Qc:yd,xc:zd,Da:Ad,yb:Bd,oa:Cd,jb:Dd,ba:Ed,jc:Fd,ub:Gd,ke:Hd,wa:Id,ne:Jd,oe:Kd,c:Ld,L:Md,Fc:Nd,Lb:Od,Cc:Pd,ef:Qd,kf:Rd,Dc:Sd,N:Td,hb:Ud,kb:Vd,Ef:Wd,ic:Xd,jd:Yd,Ec:Zd,Ya:$d,Ce:ae,j:be,ya:ce,mf:de,Gc:ee,df:fe,la:ge,U:he,$a:ie,je,Ue:ke,Xc:le,Za:me,Sb:ne,k:oe,qa:pe,We:qe,Le:re,Db:se,vf:te,hf:ue,Bb:ve,Ze:we,ob:xe,q:ye,Fb:ze,db:Ae,fc:Be,tc:Ce,$e:De,
nc:Ee,s:Fe,dc:Ge,Rc:He,bc:Ie,cf:Je,qe:Ke,z:Le,Xa:Me,Nc:Ne,pe:Oe,J:Pe,le:Qe,Wb:Re,cb:Se,qb:Te,Q:Ue,ea:Ve,gb:We,bf:Xe,Y:Ye,na:Ze,va:$e,Fa:af,O:bf,eb:cf,ed:df,kd:ef,zd:ff,Hd:gf,Gd:hf,yd:jf,gd:kf,ud:lf,Ad:mf,nd:nf,Zc:of,_c:pf,sd:qf,Jd:rf,rd:sf,md:tf,$c:uf,cd:vf,l:wf,wb:xf,_b:yf,ve:zf,i:Af,G:Bf,B:Cf,sc:Df,Ia:Ef,Df:Ff,Pe:Gf,fb:Hf,sb:If,Pc:Jf,H:Kf,Oa:Lf,Na:Mf,Ea:Nf,T:Of,cc:Pf,Hb:Qf,Ae:Rf,$b:Sf,Rb:Tf,me:Uf,te:Vf,d:Wf,C:Xf,za:Yf,pc:Zf,_e:$f,lf:ag,Ib:bg,ka:cg,ze:dg,Wa:eg,ha:fg,Qe:gg,P:hg,Sc:ig,S:jg,Xb:kg,uf:lg,
ue:mg,f:ng,Aa:og,Ja:pg,rb:qg,vb:rg,_:sg,rc:tg,Ba:ug,fa:vg,Me:wg,Oe:xg,ga:yg,ie:zg,pa:Ag,De:Bg,Eb:Cg,g:Dg,X:Eg,qc:Fg,Ne:Gg,Ve:Hg,Ra:Ig,Ga:Jg,_d:Kg,Oc:Lg,ca:Mg,Yb:Ng,ac:Og,tb:Pg,Zb:Qg,m:Rg,Z:Sg,$:Tg,Bc:Ug,se:Vg,mb:Wg,bb:Xg,Je:Yg,wf:Zg,p:$g,Ta:ah,Pa:bh,Ca:ch,Ka:dh,Vb:eh,oc:fh,Af:gh,yf:hh,v:ih,zc:jh,Ub:kh,gf:lh,ff:mh,xb:nh,Tb:oh,Xe:ph,kc:qh,E:rh,hc:sh,xe:th,we:uh,ia:vh,La:wh,qf:xh,Ma:yh,nf:zh,Bf:Ah,zf:Bh,K:Ch,gc:Dh,He:Eh,M:Fh,Te:Gh,vc:Hh,uc:Ih,mc:Jh,lc:Kh,Mc:Lh,V:Mh,Ie:Nh,tf:Oh,Jc:Ph,ma:Qh,af:Rh,ye:Sh,
da:Th,jf:Uh,sa:Vh,of:Wh,Kc:Xh,Lc:Yh,xa:Zh,Ye:$h,Hc:ai,Cb:bi,Ic:ci,sf:di,Se:ei,Fe:fi,re:gi,lb:hi,Ge:ii,pb:ji,rf:ki,Gb:li,xd:mi,Ed:ni,td:oi,wd:pi,dd:qi,Bd:ri,bd:si,fd:ti,hd:ui,pd:vi,ad:wi,Dd:xi,qd:yi,Id:zi,vd:Ai,Yc:Bi,od:Ci,Fd:Di,id:Ei,ld:Fi,Cd:Gi,u:function(a){return a},Kd:function(a,c,d,e){return Rc(a,c,d,e)},Ke:function(a){var c=null;if(!c){c=Array(16);for(var d=(new Date).getTime(),e=0;16>e;e++){var f=(d+256*Math.random())%256|0;d=d/256|0;c[e]=f}}c[6]=c[6]&15|64;c[8]=c[8]&63|128;A.set(c,a)}};
(function(){function a(f){b.asm=f.exports;Ca=b.asm.Gf;Ja();Ka=b.asm.Kf;Ma.unshift(b.asm.Hf);Ya()}function c(f){a(f.instance)}function d(f){return cb().then(function(g){return WebAssembly.instantiate(g,e)}).then(function(g){return g}).then(f,function(g){za("failed to asynchronously prepare wasm: "+g);v(g)})}var e={a:Hi};Xa();if(b.instantiateWasm)try{return b.instantiateWasm(e,a)}catch(f){return za("Module.instantiateWasm callback failed with error: "+f),!1}(function(){return Ba||"function"!=typeof WebAssembly.instantiateStreaming||
Za()||"function"!=typeof fetch?d(c):fetch($a,{credentials:"same-origin"}).then(function(f){return WebAssembly.instantiateStreaming(f,e).then(c,function(g){za("wasm streaming compile failed: "+g);za("falling back to ArrayBuffer instantiation");return d(c)})})})();return{}})();b.___wasm_call_ctors=function(){return(b.___wasm_call_ctors=b.asm.Hf).apply(null,arguments)};
var ja=b._malloc=function(){return(ja=b._malloc=b.asm.If).apply(null,arguments)},fa=b._free=function(){return(fa=b._free=b.asm.Jf).apply(null,arguments)};b._renderRecommendedThumbnail=function(){return(b._renderRecommendedThumbnail=b.asm.Lf).apply(null,arguments)};b._startRecommended=function(){return(b._startRecommended=b.asm.Mf).apply(null,arguments)};b._setRecommendedSettings=function(){return(b._setRecommendedSettings=b.asm.Nf).apply(null,arguments)};
b._setRecommended=function(){return(b._setRecommended=b.asm.Of).apply(null,arguments)};b._renderCurrent=function(){return(b._renderCurrent=b.asm.Pf).apply(null,arguments)};b._renderDefault=function(){return(b._renderDefault=b.asm.Qf).apply(null,arguments)};b._renderCropped=function(){return(b._renderCropped=b.asm.Rf).apply(null,arguments)};b._getParameterNames=function(){return(b._getParameterNames=b.asm.Sf).apply(null,arguments)};
b._getParameterOptions=function(){return(b._getParameterOptions=b.asm.Tf).apply(null,arguments)};b._getParameterValues=function(){return(b._getParameterValues=b.asm.Uf).apply(null,arguments)};b._setParameterValue=function(){return(b._setParameterValue=b.asm.Vf).apply(null,arguments)};b._setParameterValues=function(){return(b._setParameterValues=b.asm.Wf).apply(null,arguments)};b._getAutoTone=function(){return(b._getAutoTone=b.asm.Xf).apply(null,arguments)};
b._getAutoGrayscale=function(){return(b._getAutoGrayscale=b.asm.Yf).apply(null,arguments)};b._setAutoTone=function(){return(b._setAutoTone=b.asm.Zf).apply(null,arguments)};b._setAutoGrayscale=function(){return(b._setAutoGrayscale=b.asm._f).apply(null,arguments)};b._getGrayscale=function(){return(b._getGrayscale=b.asm.$f).apply(null,arguments)};b._setGrayscale=function(){return(b._setGrayscale=b.asm.ag).apply(null,arguments)};
b._getProcessVersion=function(){return(b._getProcessVersion=b.asm.bg).apply(null,arguments)};b._setProcessVersion=function(){return(b._setProcessVersion=b.asm.cg).apply(null,arguments)};b._getSupportedProcessVersions=function(){return(b._getSupportedProcessVersions=b.asm.dg).apply(null,arguments)};b._setCurrentProcessVersion=function(){return(b._setCurrentProcessVersion=b.asm.eg).apply(null,arguments)};b._getWhiteBalance=function(){return(b._getWhiteBalance=b.asm.fg).apply(null,arguments)};
b._getWhiteBalanceDefault=function(){return(b._getWhiteBalanceDefault=b.asm.gg).apply(null,arguments)};b._isWhiteBalanceIncremental=function(){return(b._isWhiteBalanceIncremental=b.asm.hg).apply(null,arguments)};b._setWhiteBalance=function(){return(b._setWhiteBalance=b.asm.ig).apply(null,arguments)};b._setWhiteBalanceFromPoint=function(){return(b._setWhiteBalanceFromPoint=b.asm.jg).apply(null,arguments)};b._getWhiteBalanceMode=function(){return(b._getWhiteBalanceMode=b.asm.kg).apply(null,arguments)};
b._setWhiteBalanceMode=function(){return(b._setWhiteBalanceMode=b.asm.lg).apply(null,arguments)};b._getCameraProfileUniqueId=function(){return(b._getCameraProfileUniqueId=b.asm.mg).apply(null,arguments)};b._getVignetteStyle=function(){return(b._getVignetteStyle=b.asm.ng).apply(null,arguments)};b._setVignetteStyle=function(){return(b._setVignetteStyle=b.asm.og).apply(null,arguments)};b._isLookGrayscale=function(){return(b._isLookGrayscale=b.asm.pg).apply(null,arguments)};
b._isLookGrayscaleMixerOverriden=function(){return(b._isLookGrayscaleMixerOverriden=b.asm.qg).apply(null,arguments)};b._isLookGrayscaleMixerValid=function(){return(b._isLookGrayscaleMixerValid=b.asm.rg).apply(null,arguments)};b._isLookVignetteOverriden=function(){return(b._isLookVignetteOverriden=b.asm.sg).apply(null,arguments)};b._isProfileAmountSupported=function(){return(b._isProfileAmountSupported=b.asm.tg).apply(null,arguments)};
b._getProfileAmount=function(){return(b._getProfileAmount=b.asm.ug).apply(null,arguments)};b._setProfileAmount=function(){return(b._setProfileAmount=b.asm.vg).apply(null,arguments)};b._isProfileMissing=function(){return(b._isProfileMissing=b.asm.wg).apply(null,arguments)};b._copyClipboard=function(){return(b._copyClipboard=b.asm.xg).apply(null,arguments)};b._pasteClipboard=function(){return(b._pasteClipboard=b.asm.yg).apply(null,arguments)};
b._resetCopySubset=function(){return(b._resetCopySubset=b.asm.zg).apply(null,arguments)};b._getCopySubsetAll=function(){return(b._getCopySubsetAll=b.asm.Ag).apply(null,arguments)};b._getCopySubsetChecked=function(){return(b._getCopySubsetChecked=b.asm.Bg).apply(null,arguments)};b._getCopySubsetModified=function(){return(b._getCopySubsetModified=b.asm.Cg).apply(null,arguments)};b._getCopySubsetDefault=function(){return(b._getCopySubsetDefault=b.asm.Dg).apply(null,arguments)};
b._getSettings=function(){return(b._getSettings=b.asm.Eg).apply(null,arguments)};b._setSettings=function(){return(b._setSettings=b.asm.Fg).apply(null,arguments)};b._clearHistory=function(){return(b._clearHistory=b.asm.Gg).apply(null,arguments)};b._recordHistory=function(){return(b._recordHistory=b.asm.Hg).apply(null,arguments)};b._setAdaptiveProfileSettings=function(){return(b._setAdaptiveProfileSettings=b.asm.Ig).apply(null,arguments)};
b._getNeedsUpdateAISettings=function(){return(b._getNeedsUpdateAISettings=b.asm.Jg).apply(null,arguments)};b._configureRollover=function(){return(b._configureRollover=b.asm.Kg).apply(null,arguments)};b._rolloverMaskGroup=function(){return(b._rolloverMaskGroup=b.asm.Lg).apply(null,arguments)};b._rolloverMaskGroupComponent=function(){return(b._rolloverMaskGroupComponent=b.asm.Mg).apply(null,arguments)};b._clearRollover=function(){return(b._clearRollover=b.asm.Ng).apply(null,arguments)};
b._getPreviewSDR=function(){return(b._getPreviewSDR=b.asm.Og).apply(null,arguments)};b._setPreviewSDR=function(){return(b._setPreviewSDR=b.asm.Pg).apply(null,arguments)};b._getVisualizeHDR=function(){return(b._getVisualizeHDR=b.asm.Qg).apply(null,arguments)};b._setVisualizeHDR=function(){return(b._setVisualizeHDR=b.asm.Rg).apply(null,arguments)};b._undoHistory=function(){return(b._undoHistory=b.asm.Sg).apply(null,arguments)};b._redoHistory=function(){return(b._redoHistory=b.asm.Tg).apply(null,arguments)};
b._initializeSelectPeople=function(){return(b._initializeSelectPeople=b.asm.Ug).apply(null,arguments)};b._showPersonOverlay=function(){return(b._showPersonOverlay=b.asm.Vg).apply(null,arguments)};b._setPersonPartTypesSelected=function(){return(b._setPersonPartTypesSelected=b.asm.Wg).apply(null,arguments)};b._selectAllPeople=function(){return(b._selectAllPeople=b.asm.Xg).apply(null,arguments)};b._setPersonSelected=function(){return(b._setPersonSelected=b.asm.Yg).apply(null,arguments)};
b._createPeopleMask=function(){return(b._createPeopleMask=b.asm.Zg).apply(null,arguments)};b._getPersonThumbImage=function(){return(b._getPersonThumbImage=b.asm._g).apply(null,arguments)};b._getMLMaskInputDigest=function(){return(b._getMLMaskInputDigest=b.asm.$g).apply(null,arguments)};b._addMLMaskFromCache=function(){return(b._addMLMaskFromCache=b.asm.ah).apply(null,arguments)};b._getLandscapeCachedMaskSubcategories=function(){return(b._getLandscapeCachedMaskSubcategories=b.asm.bh).apply(null,arguments)};
b._updateLandscapeOverlay=function(){return(b._updateLandscapeOverlay=b.asm.ch).apply(null,arguments)};b._addLandscapeMasks=function(){return(b._addLandscapeMasks=b.asm.dh).apply(null,arguments)};b._addLandscapesToCache=function(){return(b._addLandscapesToCache=b.asm.eh).apply(null,arguments)};b._renderMLMaskInput=function(){return(b._renderMLMaskInput=b.asm.fh).apply(null,arguments)};b._getOrientation=function(){return(b._getOrientation=b.asm.gh).apply(null,arguments)};
b._cacheMLMaskOutput=function(){return(b._cacheMLMaskOutput=b.asm.hh).apply(null,arguments)};b._getMLMaskNeededTypes=function(){return(b._getMLMaskNeededTypes=b.asm.ih).apply(null,arguments)};b._updateMLMasksFromCache=function(){return(b._updateMLMasksFromCache=b.asm.jh).apply(null,arguments)};b._renderHistogramOutput=function(){return(b._renderHistogramOutput=b.asm.kh).apply(null,arguments)};b._getFilterAreas=function(){return(b._getFilterAreas=b.asm.lh).apply(null,arguments)};
b._initialize=function(){return(b._initialize=b.asm.mh).apply(null,arguments)};b._getVersion=function(){return(b._getVersion=b.asm.nh).apply(null,arguments)};b._readImage=function(){return(b._readImage=b.asm.oh).apply(null,arguments)};b._reopen=function(){return(b._reopen=b.asm.ph).apply(null,arguments)};b._reset=function(){return(b._reset=b.asm.qh).apply(null,arguments)};b._isMonochrome=function(){return(b._isMonochrome=b.asm.rh).apply(null,arguments)};
b._isCameraProfileMonochrome=function(){return(b._isCameraProfileMonochrome=b.asm.sh).apply(null,arguments)};b._isAnyCameraProfileColor=function(){return(b._isAnyCameraProfileColor=b.asm.th).apply(null,arguments)};b._getImageArea=function(){return(b._getImageArea=b.asm.uh).apply(null,arguments)};b._getImageAspect=function(){return(b._getImageAspect=b.asm.vh).apply(null,arguments)};b._getOriginalArea=function(){return(b._getOriginalArea=b.asm.wh).apply(null,arguments)};
b._getWarpedPoint=function(){return(b._getWarpedPoint=b.asm.xh).apply(null,arguments)};b._setLocale=function(){return(b._setLocale=b.asm.yh).apply(null,arguments)};b._setTranslations=function(){return(b._setTranslations=b.asm.zh).apply(null,arguments)};b._getModelName=function(){return(b._getModelName=b.asm.Ah).apply(null,arguments)};b._hasValidGainMap=function(){return(b._hasValidGainMap=b.asm.Bh).apply(null,arguments)};b._getCrop=function(){return(b._getCrop=b.asm.Ch).apply(null,arguments)};
b._setCrop=function(){return(b._setCrop=b.asm.Dh).apply(null,arguments)};b._getCropAspect=function(){return(b._getCropAspect=b.asm.Eh).apply(null,arguments)};b._setCropAspect=function(){return(b._setCropAspect=b.asm.Fh).apply(null,arguments)};b._setCropAngle=function(){return(b._setCropAngle=b.asm.Gh).apply(null,arguments)};b._forceCropFit=function(){return(b._forceCropFit=b.asm.Hh).apply(null,arguments)};b._toggleCropAspect=function(){return(b._toggleCropAspect=b.asm.Ih).apply(null,arguments)};
b._getCropAngle=function(){return(b._getCropAngle=b.asm.Jh).apply(null,arguments)};b._getCropCorners=function(){return(b._getCropCorners=b.asm.Kh).apply(null,arguments)};b._getCropDimensions=function(){return(b._getCropDimensions=b.asm.Lh).apply(null,arguments)};b._getCropDefaultDimensions=function(){return(b._getCropDefaultDimensions=b.asm.Mh).apply(null,arguments)};b._dragCropInside=function(){return(b._dragCropInside=b.asm.Nh).apply(null,arguments)};
b._dragCropSide=function(){return(b._dragCropSide=b.asm.Oh).apply(null,arguments)};b._dragCropCorner=function(){return(b._dragCropCorner=b.asm.Ph).apply(null,arguments)};b._setAutoCropAngle=function(){return(b._setAutoCropAngle=b.asm.Qh).apply(null,arguments)};b._resetCrop=function(){return(b._resetCrop=b.asm.Rh).apply(null,arguments)};b._hasCrop=function(){return(b._hasCrop=b.asm.Sh).apply(null,arguments)};b._isCropOriginal=function(){return(b._isCropOriginal=b.asm.Th).apply(null,arguments)};
b._getCropAspectLock=function(){return(b._getCropAspectLock=b.asm.Uh).apply(null,arguments)};b._setCropAspectLock=function(){return(b._setCropAspectLock=b.asm.Vh).apply(null,arguments)};b._getCropConstrainToWarp=function(){return(b._getCropConstrainToWarp=b.asm.Wh).apply(null,arguments)};b._setCropConstrainToWarp=function(){return(b._setCropConstrainToWarp=b.asm.Xh).apply(null,arguments)};b._normalizeCrop=function(){return(b._normalizeCrop=b.asm.Yh).apply(null,arguments)};
b._addSettings=function(){return(b._addSettings=b.asm.Zh).apply(null,arguments)};b._addCameraProfiles=function(){return(b._addCameraProfiles=b.asm._h).apply(null,arguments)};b._addLensProfiles=function(){return(b._addLensProfiles=b.asm.$h).apply(null,arguments)};b._loadCameraProfiles=function(){return(b._loadCameraProfiles=b.asm.ai).apply(null,arguments)};b._loadStyles=function(){return(b._loadStyles=b.asm.bi).apply(null,arguments)};
b._loadStyleManager=function(){return(b._loadStyleManager=b.asm.ci).apply(null,arguments)};b._getProfileName=function(){return(b._getProfileName=b.asm.di).apply(null,arguments)};b._getProfileDigest=function(){return(b._getProfileDigest=b.asm.ei).apply(null,arguments)};b._setProfileBrowserFilter=function(){return(b._setProfileBrowserFilter=b.asm.fi).apply(null,arguments)};b._getProfileForDropdown=function(){return(b._getProfileForDropdown=b.asm.gi).apply(null,arguments)};
b._getProfileDropdownEntryNames=function(){return(b._getProfileDropdownEntryNames=b.asm.hi).apply(null,arguments)};b._getProfileDropdownEntryDigests=function(){return(b._getProfileDropdownEntryDigests=b.asm.ii).apply(null,arguments)};b._getProfileDropdownEntryAdaptive=function(){return(b._getProfileDropdownEntryAdaptive=b.asm.ji).apply(null,arguments)};b._getProfileBrowserGroupNames=function(){return(b._getProfileBrowserGroupNames=b.asm.ki).apply(null,arguments)};
b._getProfileBrowserEntryNames=function(){return(b._getProfileBrowserEntryNames=b.asm.li).apply(null,arguments)};b._getProfileBrowserEntryDigests=function(){return(b._getProfileBrowserEntryDigests=b.asm.mi).apply(null,arguments)};b._getProfileBrowserEntryAdaptive=function(){return(b._getProfileBrowserEntryAdaptive=b.asm.ni).apply(null,arguments)};b._getProfileBrowserSupportAmounts=function(){return(b._getProfileBrowserSupportAmounts=b.asm.oi).apply(null,arguments)};
b._getProfileForBrowser=function(){return(b._getProfileForBrowser=b.asm.pi).apply(null,arguments)};b._setProfileFromDigest=function(){return(b._setProfileFromDigest=b.asm.qi).apply(null,arguments)};b._setProfileFromDropdown=function(){return(b._setProfileFromDropdown=b.asm.ri).apply(null,arguments)};b._setProfileFromBrowser=function(){return(b._setProfileFromBrowser=b.asm.si).apply(null,arguments)};
b._startRenderProfileThumbnails=function(){return(b._startRenderProfileThumbnails=b.asm.ti).apply(null,arguments)};b._renderProfileThumbnail=function(){return(b._renderProfileThumbnail=b.asm.ui).apply(null,arguments)};b._getPresetGroupNames=function(){return(b._getPresetGroupNames=b.asm.vi).apply(null,arguments)};b._getPresetGroupDigests=function(){return(b._getPresetGroupDigests=b.asm.wi).apply(null,arguments)};
b._getPresetGroupPremium=function(){return(b._getPresetGroupPremium=b.asm.xi).apply(null,arguments)};b._getPresetEntryNames=function(){return(b._getPresetEntryNames=b.asm.yi).apply(null,arguments)};b._getPresetEntryDigests=function(){return(b._getPresetEntryDigests=b.asm.zi).apply(null,arguments)};b._setFavorites=function(){return(b._setFavorites=b.asm.Ai).apply(null,arguments)};b._computeLookDigest=function(){return(b._computeLookDigest=b.asm.Bi).apply(null,arguments)};
b._hasAdaptiveProfileBigTable=function(){return(b._hasAdaptiveProfileBigTable=b.asm.Ci).apply(null,arguments)};b._getAdaptiveProfileUpdateStatus=function(){return(b._getAdaptiveProfileUpdateStatus=b.asm.Di).apply(null,arguments)};b._isProfileAdaptive=function(){return(b._isProfileAdaptive=b.asm.Ei).apply(null,arguments)};b._isAdaptiveProfileSupported=function(){return(b._isAdaptiveProfileSupported=b.asm.Fi).apply(null,arguments)};
b._exportJPEG=function(){return(b._exportJPEG=b.asm.Gi).apply(null,arguments)};b._startTracking=function(){return(b._startTracking=b.asm.Hi).apply(null,arguments)};b._stopTracking=function(){return(b._stopTracking=b.asm.Ii).apply(null,arguments)};b._startGradientMaskTracking=function(){return(b._startGradientMaskTracking=b.asm.Ji).apply(null,arguments)};b._updateGradientMaskTrack=function(){return(b._updateGradientMaskTrack=b.asm.Ki).apply(null,arguments)};
b._endGradientMaskTrack=function(){return(b._endGradientMaskTrack=b.asm.Li).apply(null,arguments)};b._refineLensBlurTrackBegin=function(){return(b._refineLensBlurTrackBegin=b.asm.Mi).apply(null,arguments)};b._refineLensBlurTrackChange=function(){return(b._refineLensBlurTrackChange=b.asm.Ni).apply(null,arguments)};b._refineLensBlurTrackEnd=function(){return(b._refineLensBlurTrackEnd=b.asm.Oi).apply(null,arguments)};
b._objectSelectTrackBegin=function(){return(b._objectSelectTrackBegin=b.asm.Pi).apply(null,arguments)};b._objectSelectTrackChange=function(){return(b._objectSelectTrackChange=b.asm.Qi).apply(null,arguments)};b._objectSelectTrackEnd=function(){return(b._objectSelectTrackEnd=b.asm.Ri).apply(null,arguments)};b._beginBrushTracking=function(){return(b._beginBrushTracking=b.asm.Si).apply(null,arguments)};b._updateBrushTracking=function(){return(b._updateBrushTracking=b.asm.Ti).apply(null,arguments)};
b._endBrushTracking=function(){return(b._endBrushTracking=b.asm.Ui).apply(null,arguments)};b._getLensBlurParameterValue=function(){return(b._getLensBlurParameterValue=b.asm.Vi).apply(null,arguments)};b._setLensBlurParameterValue=function(){return(b._setLensBlurParameterValue=b.asm.Wi).apply(null,arguments)};b._getLensBlurCurrentBokehPreset=function(){return(b._getLensBlurCurrentBokehPreset=b.asm.Xi).apply(null,arguments)};
b._getLensBlurNeedsRecompute=function(){return(b._getLensBlurNeedsRecompute=b.asm.Yi).apply(null,arguments)};b._getLensBlurActive=function(){return(b._getLensBlurActive=b.asm.Zi).apply(null,arguments)};b._getLensBlurSliderParameters=function(){return(b._getLensBlurSliderParameters=b.asm._i).apply(null,arguments)};b._getLensBlurFocalRange=function(){return(b._getLensBlurFocalRange=b.asm.$i).apply(null,arguments)};
b._getLensBlurFocalRangeHistogram=function(){return(b._getLensBlurFocalRangeHistogram=b.asm.aj).apply(null,arguments)};b._setLensBlurFocalRange=function(){return(b._setLensBlurFocalRange=b.asm.bj).apply(null,arguments)};b._hasEmbeddedDepthMap=function(){return(b._hasEmbeddedDepthMap=b.asm.cj).apply(null,arguments)};b._hasBaseDepthMap=function(){return(b._hasBaseDepthMap=b.asm.dj).apply(null,arguments)};b._getDepthMapSourceType=function(){return(b._getDepthMapSourceType=b.asm.ej).apply(null,arguments)};
b._getEmbeddedDepthMap=function(){return(b._getEmbeddedDepthMap=b.asm.fj).apply(null,arguments)};b._getBaseRawDepthMap=function(){return(b._getBaseRawDepthMap=b.asm.gj).apply(null,arguments)};b._setBaseRawDepthMap=function(){return(b._setBaseRawDepthMap=b.asm.hj).apply(null,arguments)};b._setLayeredDepthMap=function(){return(b._setLayeredDepthMap=b.asm.ij).apply(null,arguments)};b._setLensBlurBokehPreset=function(){return(b._setLensBlurBokehPreset=b.asm.jj).apply(null,arguments)};
b._setLensBlurOverlay=function(){return(b._setLensBlurOverlay=b.asm.kj).apply(null,arguments)};b._removeLensBlur=function(){return(b._removeLensBlur=b.asm.lj).apply(null,arguments)};b._setLensBlurAmount=function(){return(b._setLensBlurAmount=b.asm.mj).apply(null,arguments)};b._setFocusRangeOnSubject=function(){return(b._setFocusRangeOnSubject=b.asm.nj).apply(null,arguments)};b._setFocusRangeOnArea=function(){return(b._setFocusRangeOnArea=b.asm.oj).apply(null,arguments)};
b._tempDisableLensBlur=function(){return(b._tempDisableLensBlur=b.asm.pj).apply(null,arguments)};b._reenableLensBlur=function(){return(b._reenableLensBlur=b.asm.qj).apply(null,arguments)};b._getBokehPresetsIcons=function(){return(b._getBokehPresetsIcons=b.asm.rj).apply(null,arguments)};b._getLocalCorrectionChannelNames=function(){return(b._getLocalCorrectionChannelNames=b.asm.sj).apply(null,arguments)};b._getMaskGroupNames=function(){return(b._getMaskGroupNames=b.asm.tj).apply(null,arguments)};
b._setMaskGroupName=function(){return(b._setMaskGroupName=b.asm.uj).apply(null,arguments)};b._renderMaskGroupThumbnail=function(){return(b._renderMaskGroupThumbnail=b.asm.vj).apply(null,arguments)};b._getMaskGroupChannelValues=function(){return(b._getMaskGroupChannelValues=b.asm.wj).apply(null,arguments)};b._setMaskGroupChannelValue=function(){return(b._setMaskGroupChannelValue=b.asm.xj).apply(null,arguments)};b._getMaskGroupAmounts=function(){return(b._getMaskGroupAmounts=b.asm.yj).apply(null,arguments)};
b._setMaskGroupAmount=function(){return(b._setMaskGroupAmount=b.asm.zj).apply(null,arguments)};b._getMaskGroupActiveValues=function(){return(b._getMaskGroupActiveValues=b.asm.Aj).apply(null,arguments)};b._setMaskGroupActiveValues=function(){return(b._setMaskGroupActiveValues=b.asm.Bj).apply(null,arguments)};b._setMaskGroupActiveValue=function(){return(b._setMaskGroupActiveValue=b.asm.Cj).apply(null,arguments)};b._duplicateMaskGroup=function(){return(b._duplicateMaskGroup=b.asm.Dj).apply(null,arguments)};
b._duplicateAndInvertMaskGroup=function(){return(b._duplicateAndInvertMaskGroup=b.asm.Ej).apply(null,arguments)};b._deleteMaskGroup=function(){return(b._deleteMaskGroup=b.asm.Fj).apply(null,arguments)};b._deleteMaskGroupComponent=function(){return(b._deleteMaskGroupComponent=b.asm.Gj).apply(null,arguments)};b._deleteEmptyMaskGroups=function(){return(b._deleteEmptyMaskGroups=b.asm.Hj).apply(null,arguments)};
b._deleteMaskGroupsInvalid=function(){return(b._deleteMaskGroupsInvalid=b.asm.Ij).apply(null,arguments)};b._deleteAllMaskGroups=function(){return(b._deleteAllMaskGroups=b.asm.Jj).apply(null,arguments)};b._canInvertMaskGroup=function(){return(b._canInvertMaskGroup=b.asm.Kj).apply(null,arguments)};b._invertMaskGroup=function(){return(b._invertMaskGroup=b.asm.Lj).apply(null,arguments)};b._invertMaskGroupComponent=function(){return(b._invertMaskGroupComponent=b.asm.Mj).apply(null,arguments)};
b._getMaskGroupComponentInvertedValues=function(){return(b._getMaskGroupComponentInvertedValues=b.asm.Nj).apply(null,arguments)};b._getMaskGroupComponentNames=function(){return(b._getMaskGroupComponentNames=b.asm.Oj).apply(null,arguments)};b._getMaskGroupComponentInputDigests=function(){return(b._getMaskGroupComponentInputDigests=b.asm.Pj).apply(null,arguments)};b._getMaskGroupComponentSyncIDs=function(){return(b._getMaskGroupComponentSyncIDs=b.asm.Qj).apply(null,arguments)};
b._setMaskGroupComponentName=function(){return(b._setMaskGroupComponentName=b.asm.Rj).apply(null,arguments)};b._getMaskGroupComponentTypes=function(){return(b._getMaskGroupComponentTypes=b.asm.Sj).apply(null,arguments)};b._getMaskGroupComponentSubtractModes=function(){return(b._getMaskGroupComponentSubtractModes=b.asm.Tj).apply(null,arguments)};b._getMaskGroupComponentActiveValues=function(){return(b._getMaskGroupComponentActiveValues=b.asm.Uj).apply(null,arguments)};
b._getMaskGroupComponentErrors=function(){return(b._getMaskGroupComponentErrors=b.asm.Vj).apply(null,arguments)};b._setMaskGroupComponentActiveValue=function(){return(b._setMaskGroupComponentActiveValue=b.asm.Wj).apply(null,arguments)};b._duplicateMaskComponent=function(){return(b._duplicateMaskComponent=b.asm.Xj).apply(null,arguments)};b._modifyRangeMask=function(){return(b._modifyRangeMask=b.asm.Yj).apply(null,arguments)};
b._setMaskGradientFeather=function(){return(b._setMaskGradientFeather=b.asm.Zj).apply(null,arguments)};b._setMaskLuminanceRange=function(){return(b._setMaskLuminanceRange=b.asm._j).apply(null,arguments)};b._setMaskColorRangeAmount=function(){return(b._setMaskColorRangeAmount=b.asm.$j).apply(null,arguments)};b._getMaskGroupComponentAdditionalParameters=function(){return(b._getMaskGroupComponentAdditionalParameters=b.asm.ak).apply(null,arguments)};
b._getMaskComponentAdditionalParameters=function(){return(b._getMaskComponentAdditionalParameters=b.asm.bk).apply(null,arguments)};b._setObjectSelectionOutput=function(){return(b._setObjectSelectionOutput=b.asm.ck).apply(null,arguments)};b._setObjectSelectRect=function(){return(b._setObjectSelectRect=b.asm.dk).apply(null,arguments)};b._recomputeObjectMask=function(){return(b._recomputeObjectMask=b.asm.ek).apply(null,arguments)};
b._getUprightMode=function(){return(b._getUprightMode=b.asm.fk).apply(null,arguments)};b._setUprightMode=function(){return(b._setUprightMode=b.asm.gk).apply(null,arguments)};b._calculateGuidedUpright=function(){return(b._calculateGuidedUpright=b.asm.hk).apply(null,arguments)};b._getGuidedUprightSegments=function(){return(b._getGuidedUprightSegments=b.asm.ik).apply(null,arguments)};b._addGuidedUprightSegment=function(){return(b._addGuidedUprightSegment=b.asm.jk).apply(null,arguments)};
b._setGuidedUprightSegment=function(){return(b._setGuidedUprightSegment=b.asm.kk).apply(null,arguments)};b._deleteGuidedUprightSegment=function(){return(b._deleteGuidedUprightSegment=b.asm.lk).apply(null,arguments)};b._setOrientation=function(){return(b._setOrientation=b.asm.mk).apply(null,arguments)};b._getSampleColor=function(){return(b._getSampleColor=b.asm.nk).apply(null,arguments)};b._getHueSliderFill=function(){return(b._getHueSliderFill=b.asm.ok).apply(null,arguments)};
b._getCurves=function(){return(b._getCurves=b.asm.pk).apply(null,arguments)};b._setCurves=function(){return(b._setCurves=b.asm.qk).apply(null,arguments)};b._setCurve=function(){return(b._setCurve=b.asm.rk).apply(null,arguments)};b._setMaskCurveRefineSaturation=function(){return(b._setMaskCurveRefineSaturation=b.asm.sk).apply(null,arguments)};b._getMaskCurveRefineSaturation=function(){return(b._getMaskCurveRefineSaturation=b.asm.tk).apply(null,arguments)};
b._getRetouchInputFingerprint=function(){return(b._getRetouchInputFingerprint=b.asm.uk).apply(null,arguments)};b._getRetouchAreas=function(){return(b._getRetouchAreas=b.asm.vk).apply(null,arguments)};b._getRetouchMasks=function(){return(b._getRetouchMasks=b.asm.wk).apply(null,arguments)};b._getRetouchNeedsUpdates=function(){return(b._getRetouchNeedsUpdates=b.asm.xk).apply(null,arguments)};
b._getGenerativeRemoveReportedImage=function(){return(b._getGenerativeRemoveReportedImage=b.asm.yk).apply(null,arguments)};b._addRetouch=function(){return(b._addRetouch=b.asm.zk).apply(null,arguments)};b._appendRetouch=function(){return(b._appendRetouch=b.asm.Ak).apply(null,arguments)};b._removeRetouch=function(){return(b._removeRetouch=b.asm.Bk).apply(null,arguments)};b._setRetouchRadius=function(){return(b._setRetouchRadius=b.asm.Ck).apply(null,arguments)};
b._setRetouchFeather=function(){return(b._setRetouchFeather=b.asm.Dk).apply(null,arguments)};b._setRetouchOpacity=function(){return(b._setRetouchOpacity=b.asm.Ek).apply(null,arguments)};b._setRetouchFillMethod=function(){return(b._setRetouchFillMethod=b.asm.Fk).apply(null,arguments)};b._setRetouchVariationIndex=function(){return(b._setRetouchVariationIndex=b.asm.Gk).apply(null,arguments)};b._setRetouchType=function(){return(b._setRetouchType=b.asm.Hk).apply(null,arguments)};
b._updateRetouchSource=function(){return(b._updateRetouchSource=b.asm.Ik).apply(null,arguments)};b._dragRetouchSource=function(){return(b._dragRetouchSource=b.asm.Jk).apply(null,arguments)};b._dragRetouchDestination=function(){return(b._dragRetouchDestination=b.asm.Kk).apply(null,arguments)};b._getRetouchOpacities=function(){return(b._getRetouchOpacities=b.asm.Lk).apply(null,arguments)};b._setRetouchOpacities=function(){return(b._setRetouchOpacities=b.asm.Mk).apply(null,arguments)};
b._renderObjectSelectionRetouchInput=function(){return(b._renderObjectSelectionRetouchInput=b.asm.Nk).apply(null,arguments)};b._renderRetouchInput=function(){return(b._renderRetouchInput=b.asm.Ok).apply(null,arguments)};b._setRetouchOutput=function(){return(b._setRetouchOutput=b.asm.Pk).apply(null,arguments)};b._setRetouchObjectSelectionMask=function(){return(b._setRetouchObjectSelectionMask=b.asm.Qk).apply(null,arguments)};
b._saveRetouchRefinementParams=function(){return(b._saveRetouchRefinementParams=b.asm.Rk).apply(null,arguments)};b._undoRetouchRefinementParams=function(){return(b._undoRetouchRefinementParams=b.asm.Sk).apply(null,arguments)};b._deleteRetouchVariation=function(){return(b._deleteRetouchVariation=b.asm.Tk).apply(null,arguments)};b._setVisualizePointColorRange=function(){return(b._setVisualizePointColorRange=b.asm.Uk).apply(null,arguments)};
b._getPointColorParameters=function(){return(b._getPointColorParameters=b.asm.Vk).apply(null,arguments)};b._getSinglePointColorParameters=function(){return(b._getSinglePointColorParameters=b.asm.Wk).apply(null,arguments)};b._deletePointColorSwatch=function(){return(b._deletePointColorSwatch=b.asm.Xk).apply(null,arguments)};b._samplePointColorFromPoint=function(){return(b._samplePointColorFromPoint=b.asm.Yk).apply(null,arguments)};
b._updatePointColorSwatch=function(){return(b._updatePointColorSwatch=b.asm.Zk).apply(null,arguments)};b._getPointColorRangeSliderFill=function(){return(b._getPointColorRangeSliderFill=b.asm._k).apply(null,arguments)};b._getPointColorFieldFill=function(){return(b._getPointColorFieldFill=b.asm.$k).apply(null,arguments)};b._getPointColorFieldFillParameters=function(){return(b._getPointColorFieldFillParameters=b.asm.al).apply(null,arguments)};
b._trackPointColorFieldMovement=function(){return(b._trackPointColorFieldMovement=b.asm.bl).apply(null,arguments)};b._isModified=function(){return(b._isModified=b.asm.cl).apply(null,arguments)};b._isProfileModified=function(){return(b._isProfileModified=b.asm.dl).apply(null,arguments)};b._isCropModified=function(){return(b._isCropModified=b.asm.el).apply(null,arguments)};b._isLensProfileModified=function(){return(b._isLensProfileModified=b.asm.fl).apply(null,arguments)};
b._isRetouchModified=function(){return(b._isRetouchModified=b.asm.gl).apply(null,arguments)};b._isLocalCorrectionsModified=function(){return(b._isLocalCorrectionsModified=b.asm.hl).apply(null,arguments)};b._pushParamState=function(){return(b._pushParamState=b.asm.il).apply(null,arguments)};b._popParamState=function(){return(b._popParamState=b.asm.jl).apply(null,arguments)};b._getLbRefinementInfo=function(){return(b._getLbRefinementInfo=b.asm.kl).apply(null,arguments)};
b._setLbRefinementAmount=function(){return(b._setLbRefinementAmount=b.asm.ll).apply(null,arguments)};b._removeAllRefinements=function(){return(b._removeAllRefinements=b.asm.ml).apply(null,arguments)};b._savePresetSubset=function(){return(b._savePresetSubset=b.asm.nl).apply(null,arguments)};b._startPresetSubset=function(){return(b._startPresetSubset=b.asm.ol).apply(null,arguments)};b._getPresetSubsetProfileName=function(){return(b._getPresetSubsetProfileName=b.asm.pl).apply(null,arguments)};
b._getPresetSubsetAll=function(){return(b._getPresetSubsetAll=b.asm.ql).apply(null,arguments)};b._getPresetSubsetAllEnabled=function(){return(b._getPresetSubsetAllEnabled=b.asm.rl).apply(null,arguments)};b._getPresetSubsetAllChecked=function(){return(b._getPresetSubsetAllChecked=b.asm.sl).apply(null,arguments)};b._getPresetSubsetModified=function(){return(b._getPresetSubsetModified=b.asm.tl).apply(null,arguments)};
b._getPresetSubsetExisting=function(){return(b._getPresetSubsetExisting=b.asm.ul).apply(null,arguments)};b._getPresetSubsetDefault=function(){return(b._getPresetSubsetDefault=b.asm.vl).apply(null,arguments)};b._getLensProfileMakes=function(){return(b._getLensProfileMakes=b.asm.wl).apply(null,arguments)};b._getLensProfileModels=function(){return(b._getLensProfileModels=b.asm.xl).apply(null,arguments)};b._getLensProfileNames=function(){return(b._getLensProfileNames=b.asm.yl).apply(null,arguments)};
b._getLensProfileMake=function(){return(b._getLensProfileMake=b.asm.zl).apply(null,arguments)};b._getLensProfileModel=function(){return(b._getLensProfileModel=b.asm.Al).apply(null,arguments)};b._setLensProfileMake=function(){return(b._setLensProfileMake=b.asm.Bl).apply(null,arguments)};b._setLensProfileModel=function(){return(b._setLensProfileModel=b.asm.Cl).apply(null,arguments)};b._getLensProfileIndex=function(){return(b._getLensProfileIndex=b.asm.Dl).apply(null,arguments)};
b._setLensProfileIndex=function(){return(b._setLensProfileIndex=b.asm.El).apply(null,arguments)};b._updateLensProfile=function(){return(b._updateLensProfile=b.asm.Fl).apply(null,arguments)};b._isLensProfileFound=function(){return(b._isLensProfileFound=b.asm.Gl).apply(null,arguments)};b._isLensProfileValid=function(){return(b._isLensProfileValid=b.asm.Hl).apply(null,arguments)};b._isLensProfileEmbedded=function(){return(b._isLensProfileEmbedded=b.asm.Il).apply(null,arguments)};
b._getLensProfileOpcodes=function(){return(b._getLensProfileOpcodes=b.asm.Jl).apply(null,arguments)};b._getCameraName=function(){return(b._getCameraName=b.asm.Kl).apply(null,arguments)};b._getLensName=function(){return(b._getLensName=b.asm.Ll).apply(null,arguments)};b._getLensProfileDigest=function(){return(b._getLensProfileDigest=b.asm.Ml).apply(null,arguments)};b._isLensProfileDistortionSupported=function(){return(b._isLensProfileDistortionSupported=b.asm.Nl).apply(null,arguments)};
b._isLensProfileVignettingSupported=function(){return(b._isLensProfileVignettingSupported=b.asm.Ol).apply(null,arguments)};b._getLensProfileDistortionAmount=function(){return(b._getLensProfileDistortionAmount=b.asm.Pl).apply(null,arguments)};b._getLensProfileVignettingAmount=function(){return(b._getLensProfileVignettingAmount=b.asm.Ql).apply(null,arguments)};b._setLensProfileDistortionAmount=function(){return(b._setLensProfileDistortionAmount=b.asm.Rl).apply(null,arguments)};
b._setLensProfileVignettingAmount=function(){return(b._setLensProfileVignettingAmount=b.asm.Sl).apply(null,arguments)};b._saveLensProfileSetup=function(){return(b._saveLensProfileSetup=b.asm.Tl).apply(null,arguments)};b._restoreLensProfileSetup=function(){return(b._restoreLensProfileSetup=b.asm.Ul).apply(null,arguments)};b._finishLensProfileSetup=function(){return(b._finishLensProfileSetup=b.asm.Vl).apply(null,arguments)};
b._getLensProfileAuto=function(){return(b._getLensProfileAuto=b.asm.Wl).apply(null,arguments)};b._setLensProfileAuto=function(){return(b._setLensProfileAuto=b.asm.Xl).apply(null,arguments)};b._isDefault=function(){return(b._isDefault=b.asm.Yl).apply(null,arguments)};b._isCropDefault=function(){return(b._isCropDefault=b.asm.Zl).apply(null,arguments)};b._hasCropDefault=function(){return(b._hasCropDefault=b.asm._l).apply(null,arguments)};
b._getBigTables=function(){return(b._getBigTables=b.asm.$l).apply(null,arguments)};b._setBigTables=function(){return(b._setBigTables=b.asm.am).apply(null,arguments)};b._getBigTableDigests=function(){return(b._getBigTableDigests=b.asm.bm).apply(null,arguments)};b._getBigTableEntries=function(){return(b._getBigTableEntries=b.asm.cm).apply(null,arguments)};b._getPreset=function(){return(b._getPreset=b.asm.dm).apply(null,arguments)};
b._getPresetSettings=function(){return(b._getPresetSettings=b.asm.em).apply(null,arguments)};b._setPreset=function(){return(b._setPreset=b.asm.fm).apply(null,arguments)};b._setPresetV2=function(){return(b._setPresetV2=b.asm.gm).apply(null,arguments)};b._getPresetMLMaskIds=function(){return(b._getPresetMLMaskIds=b.asm.hm).apply(null,arguments)};b._deletePreset=function(){return(b._deletePreset=b.asm.im).apply(null,arguments)};
b._isPresetDuplicateName=function(){return(b._isPresetDuplicateName=b.asm.jm).apply(null,arguments)};b._getPresetMainGroupNames=function(){return(b._getPresetMainGroupNames=b.asm.km).apply(null,arguments)};b._getPresetDeletableDigests=function(){return(b._getPresetDeletableDigests=b.asm.lm).apply(null,arguments)};b._getPresetAmountUnsupportedDigests=function(){return(b._getPresetAmountUnsupportedDigests=b.asm.mm).apply(null,arguments)};
b._getPresetAmount=function(){return(b._getPresetAmount=b.asm.nm).apply(null,arguments)};b._setPresetAmount=function(){return(b._setPresetAmount=b.asm.om).apply(null,arguments)};
var Tc=b.___errno_location=function(){return(Tc=b.___errno_location=b.asm.pm).apply(null,arguments)},W=b._setThrew=function(){return(W=b._setThrew=b.asm.qm).apply(null,arguments)},Z=b.setTempRet0=function(){return(Z=b.setTempRet0=b.asm.rm).apply(null,arguments)},r=b.stackSave=function(){return(r=b.stackSave=b.asm.sm).apply(null,arguments)},t=b.stackRestore=function(){return(t=b.stackRestore=b.asm.tm).apply(null,arguments)},ba=b.stackAlloc=function(){return(ba=b.stackAlloc=b.asm.um).apply(null,arguments)},
Sc=b.___cxa_can_catch=function(){return(Sc=b.___cxa_can_catch=b.asm.vm).apply(null,arguments)},sb=b.___cxa_is_pointer_type=function(){return(sb=b.___cxa_is_pointer_type=b.asm.wm).apply(null,arguments)},Ii=b.dynCall_vij=function(){return(Ii=b.dynCall_vij=b.asm.xm).apply(null,arguments)},Ji=b.dynCall_iiiij=function(){return(Ji=b.dynCall_iiiij=b.asm.ym).apply(null,arguments)},Ki=b.dynCall_ji=function(){return(Ki=b.dynCall_ji=b.asm.zm).apply(null,arguments)},Li=b.dynCall_viiij=function(){return(Li=b.dynCall_viiij=
b.asm.Am).apply(null,arguments)},Mi=b.dynCall_viij=function(){return(Mi=b.dynCall_viij=b.asm.Bm).apply(null,arguments)},Ni=b.dynCall_iiiijj=function(){return(Ni=b.dynCall_iiiijj=b.asm.Cm).apply(null,arguments)},Oi=b.dynCall_vijiiiiii=function(){return(Oi=b.dynCall_vijiiiiii=b.asm.Dm).apply(null,arguments)},Pi=b.dynCall_jii=function(){return(Pi=b.dynCall_jii=b.asm.Em).apply(null,arguments)},Qi=b.dynCall_viiiiiiiiijjii=function(){return(Qi=b.dynCall_viiiiiiiiijjii=b.asm.Fm).apply(null,arguments)},Ri=
b.dynCall_vijji=function(){return(Ri=b.dynCall_vijji=b.asm.Gm).apply(null,arguments)},Si=b.dynCall_viiiij=function(){return(Si=b.dynCall_viiiij=b.asm.Hm).apply(null,arguments)},Ti=b.dynCall_iijjjiiii=function(){return(Ti=b.dynCall_iijjjiiii=b.asm.Im).apply(null,arguments)},Ui=b.dynCall_iiiiij=function(){return(Ui=b.dynCall_iiiiij=b.asm.Jm).apply(null,arguments)},Vi=b.dynCall_viji=function(){return(Vi=b.dynCall_viji=b.asm.Km).apply(null,arguments)},Wi=b.dynCall_viiiiiiiiiijj=function(){return(Wi=b.dynCall_viiiiiiiiiijj=
b.asm.Lm).apply(null,arguments)},Xi=b.dynCall_viiiiiijji=function(){return(Xi=b.dynCall_viiiiiijji=b.asm.Mm).apply(null,arguments)},Yi=b.dynCall_iiiijjjjji=function(){return(Yi=b.dynCall_iiiijjjjji=b.asm.Nm).apply(null,arguments)},Zi=b.dynCall_viiiijjjj=function(){return(Zi=b.dynCall_viiiijjjj=b.asm.Om).apply(null,arguments)},$i=b.dynCall_viiijjj=function(){return($i=b.dynCall_viiijjj=b.asm.Pm).apply(null,arguments)},aj=b.dynCall_iij=function(){return(aj=b.dynCall_iij=b.asm.Qm).apply(null,arguments)},
bj=b.dynCall_viiiiiij=function(){return(bj=b.dynCall_viiiiiij=b.asm.Rm).apply(null,arguments)},cj=b.dynCall_j=function(){return(cj=b.dynCall_j=b.asm.Sm).apply(null,arguments)},dj=b.dynCall_viiijj=function(){return(dj=b.dynCall_viiijj=b.asm.Tm).apply(null,arguments)},ej=b.dynCall_vijiiii=function(){return(ej=b.dynCall_vijiiii=b.asm.Um).apply(null,arguments)},fj=b.dynCall_ij=function(){return(fj=b.dynCall_ij=b.asm.Vm).apply(null,arguments)},gj=b.dynCall_jiii=function(){return(gj=b.dynCall_jiii=b.asm.Wm).apply(null,
arguments)},hj=b.dynCall_iiiiiiji=function(){return(hj=b.dynCall_iiiiiiji=b.asm.Xm).apply(null,arguments)},ij=b.dynCall_vijj=function(){return(ij=b.dynCall_vijj=b.asm.Ym).apply(null,arguments)},jj=b.dynCall_iiij=function(){return(jj=b.dynCall_iiij=b.asm.Zm).apply(null,arguments)},kj=b.dynCall_viiji=function(){return(kj=b.dynCall_viiji=b.asm._m).apply(null,arguments)},lj=b.dynCall_iiidij=function(){return(lj=b.dynCall_iiidij=b.asm.$m).apply(null,arguments)},mj=b.dynCall_vijiiiiiii=function(){return(mj=
b.dynCall_vijiiiiiii=b.asm.an).apply(null,arguments)},nj=b.dynCall_iiiiiiij=function(){return(nj=b.dynCall_iiiiiiij=b.asm.bn).apply(null,arguments)},oj=b.dynCall_jjj=function(){return(oj=b.dynCall_jjj=b.asm.cn).apply(null,arguments)},pj=b.dynCall_viiiijjjjii=function(){return(pj=b.dynCall_viiiijjjjii=b.asm.dn).apply(null,arguments)},qj=b.dynCall_viiiiij=function(){return(qj=b.dynCall_viiiiij=b.asm.en).apply(null,arguments)},rj=b.dynCall_jiiii=function(){return(rj=b.dynCall_jiiii=b.asm.fn).apply(null,
arguments)},sj=b.dynCall_ijjj=function(){return(sj=b.dynCall_ijjj=b.asm.gn).apply(null,arguments)},tj=b.dynCall_iji=function(){return(tj=b.dynCall_iji=b.asm.hn).apply(null,arguments)},uj=b.dynCall_vijii=function(){return(uj=b.dynCall_vijii=b.asm.jn).apply(null,arguments)},vj=b.dynCall_iiiiffjii=function(){return(vj=b.dynCall_iiiiffjii=b.asm.kn).apply(null,arguments)};function wd(a,c){var d=r();try{return Q(a)(c)}catch(e){t(d);if(e!==e+0)throw e;W(1,0)}}
function Wf(a,c,d){var e=r();try{Q(a)(c,d)}catch(f){t(e);if(f!==f+0)throw f;W(1,0)}}function oe(a,c,d,e,f){var g=r();try{return Q(a)(c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function Ld(a,c,d){var e=r();try{return Q(a)(c,d)}catch(f){t(e);if(f!==f+0)throw f;W(1,0)}}function $g(a,c,d,e,f,g,h){var k=r();try{Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function ng(a,c,d,e){var f=r();try{Q(a)(c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}
function Af(a,c){var d=r();try{Q(a)(c)}catch(e){t(d);if(e!==e+0)throw e;W(1,0)}}function wf(a){var c=r();try{Q(a)()}catch(d){t(c);if(d!==d+0)throw d;W(1,0)}}function Sg(a,c,d,e,f,g,h){var k=r();try{Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function be(a,c,d,e){var f=r();try{return Q(a)(c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}function Xf(a,c,d,e){var f=r();try{Q(a)(c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}
function Fe(a,c,d,e,f,g,h){var k=r();try{return Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function Dg(a,c,d,e,f){var g=r();try{Q(a)(c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function Rg(a,c,d,e,f,g){var h=r();try{Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function Xc(a,c){var d=r();try{return Q(a)(c)}catch(e){t(d);if(e!==e+0)throw e;W(1,0)}}function hg(a,c,d,e,f,g,h){var k=r();try{Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}
function Ch(a,c,d,e,f,g,h,k,l,m){var n=r();try{Q(a)(c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}function ih(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function Th(a,c,d,e,f,g,h,k,l,m,n,q,w,p){var x=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p)}catch(y){t(x);if(y!==y+0)throw y;W(1,0)}}function Le(a,c,d,e,f,g,h,k){var l=r();try{return Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}
function Kg(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function Ed(a,c,d,e,f,g){var h=r();try{return Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function Tg(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function pd(a){var c=r();try{return Q(a)()}catch(d){t(c);if(d!==d+0)throw d;W(1,0)}}
function Fh(a,c,d,e,f,g,h,k,l,m,n){var q=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n)}catch(w){t(q);if(w!==w+0)throw w;W(1,0)}}function ye(a,c,d,e,f,g){var h=r();try{return Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function jg(a,c,d,e){var f=r();try{Q(a)(c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}function rh(a,c,d,e,f,g,h,k,l){var m=r();try{Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function Bf(a,c,d){var e=r();try{Q(a)(c,d)}catch(f){t(e);if(f!==f+0)throw f;W(1,0)}}
function Od(a,c,d,e,f,g,h){var k=r();try{return Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function Jg(a,c,d,e,f,g,h){var k=r();try{Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function Ue(a,c,d,e,f,g,h,k,l,m){var n=r();try{return Q(a)(c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}function Md(a,c,d,e){var f=r();try{return Q(a)(c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}
function Wg(a,c,d,e,f,g,h,k,l){var m=r();try{Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function ug(a,c,d,e,f,g,h){var k=r();try{Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function ig(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function He(a,c,d,e,f,g,h,k,l,m){var n=r();try{return Q(a)(c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}
function hi(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F){var G=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F)}catch(I){t(G);if(I!==I+0)throw I;W(1,0)}}function yd(a,c,d,e,f){var g=r();try{return Q(a)(c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function bf(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y){var z=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y)}catch(B){t(z);if(B!==B+0)throw B;W(1,0)}}function md(a,c,d){var e=r();try{return Q(a)(c,d)}catch(f){t(e);if(f!==f+0)throw f;W(1,0)}}
function Jf(a,c,d,e,f,g,h,k,l,m){var n=r();try{Q(a)(c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}function bg(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function Vd(a,c,d,e,f,g){var h=r();try{return Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function Lg(a,c,d,e,f,g,h,k,l,m){var n=r();try{Q(a)(c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}
function Pe(a,c,d,e,f,g,h,k,l){var m=r();try{return Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function cg(a,c,d,e,f){var g=r();try{Q(a)(c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function vg(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function Qf(a,c,d,e,f,g,h,k,l,m,n){var q=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n)}catch(w){t(q);if(w!==w+0)throw w;W(1,0)}}
function og(a,c,d,e,f){var g=r();try{Q(a)(c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function Cf(a,c,d,e){var f=r();try{Q(a)(c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}function Yc(a,c,d){var e=r();try{return Q(a)(c,d)}catch(f){t(e);if(f!==f+0)throw f;W(1,0)}}function Cd(a,c,d,e,f,g,h,k,l){var m=r();try{return Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function $c(a,c,d){var e=r();try{return Q(a)(c,d)}catch(f){t(e);if(f!==f+0)throw f;W(1,0)}}
function li(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J){var K=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J)}catch(M){t(K);if(M!==M+0)throw M;W(1,0)}}function Ne(a,c,d,e,f,g,h,k,l,m){var n=r();try{return Q(a)(c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}function ah(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function Dd(a,c,d,e){var f=r();try{return Q(a)(c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}
function he(a,c,d,e,f,g,h){var k=r();try{return Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function xd(a,c,d){var e=r();try{return Q(a)(c,d)}catch(f){t(e);if(f!==f+0)throw f;W(1,0)}}function Lh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M){var R=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M)}catch(O){t(R);if(O!==O+0)throw O;W(1,0)}}
function Yh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M){var R=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M)}catch(O){t(R);if(O!==O+0)throw O;W(1,0)}}function Xh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M,R,O,X,Y,ca,aa,na,da,va){var wa=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M,R,O,X,Y,ca,aa,na,da,va)}catch(oa){t(wa);if(oa!==oa+0)throw oa;W(1,0)}}
function Ph(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M,R,O,X,Y,ca,aa){var na=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M,R,O,X,Y,ca,aa)}catch(da){t(na);if(da!==da+0)throw da;W(1,0)}}function ci(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M,R,O,X,Y){var ca=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M,R,O,X,Y)}catch(aa){t(ca);if(aa!==aa+0)throw aa;W(1,0)}}
function ai(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M,R,O,X,Y,ca,aa,na,da,va,wa,oa,Qa,Ra,Sa,Ta,Ua){var xa=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M,R,O,X,Y,ca,aa,na,da,va,wa,oa,Qa,Ra,Sa,Ta,Ua)}catch(Va){t(xa);if(Va!==Va+0)throw Va;W(1,0)}}function jd(a,c){var d=r();try{return Q(a)(c)}catch(e){t(d);if(e!==e+0)throw e;W(1,0)}}function ee(a,c,d,e,f,g,h,k,l,m,n,q,w){var p=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q,w)}catch(x){t(p);if(x!==x+0)throw x;W(1,0)}}
function Mh(a,c,d,e,f,g,h,k,l,m,n,q){var w=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q)}catch(p){t(w);if(p!==p+0)throw p;W(1,0)}}function Ig(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function Nd(a,c,d,e,f){var g=r();try{return Q(a)(c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function Td(a,c,d,e,f,g){var h=r();try{return Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}
function ze(a,c,d,e,f,g,h){var k=r();try{return Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function af(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x){var y=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x)}catch(z){t(y);if(z!==z+0)throw z;W(1,0)}}function Vh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x){var y=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x)}catch(z){t(y);if(z!==z+0)throw z;W(1,0)}}function Cg(a,c,d,e,f,g,h,k,l){var m=r();try{Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}
function Nf(a,c,d,e,f,g){var h=r();try{Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function se(a,c,d,e,f,g,h,k,l){var m=r();try{return Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function bi(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z){var B=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z)}catch(D){t(B);if(D!==D+0)throw D;W(1,0)}}function Ye(a,c,d,e,f,g,h,k,l,m,n,q){var w=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q)}catch(p){t(w);if(p!==p+0)throw p;W(1,0)}}
function Zd(a,c,d,e){var f=r();try{return Q(a)(c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}function Kf(a,c,d,e){var f=r();try{Q(a)(c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}function Of(a,c,d){var e=r();try{Q(a)(c,d)}catch(f){t(e);if(f!==f+0)throw f;W(1,0)}}function ve(a,c,d,e,f,g,h,k){var l=r();try{return Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function Uc(a){var c=r();try{return Q(a)()}catch(d){t(c);if(d!==d+0)throw d;W(1,0)}}
function Sd(a,c,d,e,f,g,h,k,l){var m=r();try{return Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function Pd(a,c,d,e,f,g,h,k,l,m,n,q){var w=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q)}catch(p){t(w);if(p!==p+0)throw p;W(1,0)}}function Ad(a,c,d,e,f,g,h,k){var l=r();try{return Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function bd(a,c,d,e){var f=r();try{return Q(a)(c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}
function $e(a,c,d,e,f,g,h,k,l,m,n,q,w,p){var x=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p)}catch(y){t(x);if(y!==y+0)throw y;W(1,0)}}function Ze(a,c,d,e,f,g,h,k,l,m,n,q,w){var p=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q,w)}catch(x){t(p);if(x!==x+0)throw x;W(1,0)}}function Ud(a,c,d,e,f){var g=r();try{return Q(a)(c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function fd(a,c,d,e,f,g){var h=r();try{return Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}
function qd(a,c){var d=r();try{return Q(a)(c)}catch(e){t(d);if(e!==e+0)throw e;W(1,0)}}function We(a,c,d,e,f,g,h,k,l,m,n,q,w){var p=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q,w)}catch(x){t(p);if(x!==x+0)throw x;W(1,0)}}function vh(a,c,d,e,f,g,h,k,l,m,n){var q=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n)}catch(w){t(q);if(w!==w+0)throw w;W(1,0)}}function Ug(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}
function ed(a,c,d,e,f){var g=r();try{return Q(a)(c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function Eg(a,c,d,e,f,g){var h=r();try{Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function ud(a,c,d){var e=r();try{return Q(a)(c,d)}catch(f){t(e);if(f!==f+0)throw f;W(1,0)}}function jh(a,c,d,e,f,g,h,k,l){var m=r();try{Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function Hf(a,c,d,e,f){var g=r();try{Q(a)(c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}
function Qh(a,c,d,e,f,g,h,k,l,m,n,q,w){var p=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w)}catch(x){t(p);if(x!==x+0)throw x;W(1,0)}}function Ve(a,c,d,e,f,g,h,k,l,m,n){var q=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n)}catch(w){t(q);if(w!==w+0)throw w;W(1,0)}}function Wc(a,c,d){var e=r();try{return Q(a)(c,d)}catch(f){t(e);if(f!==f+0)throw f;W(1,0)}}function Wd(a,c,d,e,f,g,h){var k=r();try{return Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}
function Ff(a,c,d,e,f,g){var h=r();try{Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function hd(a,c,d){var e=r();try{return Q(a)(c,d)}catch(f){t(e);if(f!==f+0)throw f;W(1,0)}}function ch(a,c,d,e,f,g,h,k,l,m){var n=r();try{Q(a)(c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}function cd(a,c,d,e,f,g,h){var k=r();try{return Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}
function dd(a,c,d,e,f,g){var h=r();try{return Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function bh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z){var B=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z)}catch(D){t(B);if(D!==D+0)throw D;W(1,0)}}function Yf(a,c,d,e,f){var g=r();try{Q(a)(c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function sg(a,c,d,e,f,g,h,k,l){var m=r();try{Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}
function sd(a,c,d,e){var f=r();try{return Q(a)(c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}function Vc(a,c,d,e,f,g){var h=r();try{return Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function Ah(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z){var B=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z)}catch(D){t(B);if(D!==D+0)throw D;W(1,0)}}function gh(a,c,d,e,f,g,h,k,l,m,n,q){var w=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q)}catch(p){t(w);if(p!==p+0)throw p;W(1,0)}}
function Bh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G){var I=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G)}catch(J){t(I);if(J!==J+0)throw J;W(1,0)}}function hh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D){var F=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D)}catch(G){t(F);if(G!==G+0)throw G;W(1,0)}}function Lf(a,c,d,e,f){var g=r();try{Q(a)(c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}
function td(a,c,d,e,f,g,h,k){var l=r();try{return Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function Zg(a,c,d,e,f,g,h,k,l,m,n,q){var w=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q)}catch(p){t(w);if(p!==p+0)throw p;W(1,0)}}function Mf(a,c,d,e,f,g,h){var k=r();try{Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function fg(a,c,d,e,f,g){var h=r();try{Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}
function cf(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z){var B=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z)}catch(D){t(B);if(D!==D+0)throw D;W(1,0)}}function Bd(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x){var y=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x)}catch(z){t(y);if(z!==z+0)throw z;W(1,0)}}function zd(a,c,d,e,f,g,h){var k=r();try{return Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}
function te(a,c,d,e,f,g,h,k,l,m,n){var q=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n)}catch(w){t(q);if(w!==w+0)throw w;W(1,0)}}function lg(a,c,d,e,f,g,h,k,l,m,n){var q=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n)}catch(w){t(q);if(w!==w+0)throw w;W(1,0)}}function Oh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M,R,O,X,Y,ca,aa,na,da,va,wa,oa,Qa,Ra,Sa,Ta){var Ua=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M,R,O,X,Y,ca,aa,na,da,va,wa,oa,Qa,Ra,Sa,Ta)}catch(xa){t(Ua);if(xa!==xa+0)throw xa;W(1,0)}}
function ld(a,c,d,e,f,g,h){var k=r();try{return Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function di(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M,R,O,X,Y,ca,aa,na,da,va,wa,oa,Qa,Ra,Sa,Ta,Ua,xa,Va,yj,zj){var Aj=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M,R,O,X,Y,ca,aa,na,da,va,wa,oa,Qa,Ra,Sa,Ta,Ua,xa,Va,yj,zj)}catch(Mb){t(Aj);if(Mb!==Mb+0)throw Mb;W(1,0)}}
function ki(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I){var J=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I)}catch(K){t(J);if(K!==K+0)throw K;W(1,0)}}function xh(a,c,d,e,f,g,h,k,l,m,n,q){var w=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q)}catch(p){t(w);if(p!==p+0)throw p;W(1,0)}}function vd(a,c,d,e){var f=r();try{return Q(a)(c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}
function yh(a,c,d,e,f,g,h,k,l,m,n,q,w,p){var x=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p)}catch(y){t(x);if(y!==y+0)throw y;W(1,0)}}function Ae(a,c,d,e,f,g,h,k,l){var m=r();try{return Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function Wh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D){var F=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D)}catch(G){t(F);if(G!==G+0)throw G;W(1,0)}}
function Hh(a,c,d,e,f,g,h,k,l,m,n,q,w){var p=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w)}catch(x){t(p);if(x!==x+0)throw x;W(1,0)}}function zh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x){var y=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x)}catch(z){t(y);if(z!==z+0)throw z;W(1,0)}}function pe(a,c,d,e,f,g){var h=r();try{return Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function de(a,c,d,e,f,g){var h=r();try{return Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}
function ag(a,c,d,e,f,g){var h=r();try{Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function Ih(a,c,d,e,f,g,h,k,l,m,n,q,w,p){var x=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p)}catch(y){t(x);if(y!==y+0)throw y;W(1,0)}}function ce(a,c,d,e,f){var g=r();try{return Q(a)(c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function yg(a,c,d,e,f){var g=r();try{Q(a)(c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}
function Rd(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z){var B=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z)}catch(D){t(B);if(D!==D+0)throw D;W(1,0)}}function wh(a,c,d,e,f,g,h,k,l,m){var n=r();try{Q(a)(c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}function Uh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M){var R=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M)}catch(O){t(R);if(O!==O+0)throw O;W(1,0)}}
function nh(a,c,d,e,f,g,h,k,l){var m=r();try{Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function Ce(a,c,d,e,f,g,h,k,l){var m=r();try{return Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function ue(a,c,d,e,f,g,h){var k=r();try{return Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function Ag(a,c,d,e,f,g){var h=r();try{Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}
function Df(a,c,d,e,f,g){var h=r();try{Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function xf(a,c,d,e,f,g){var h=r();try{Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function lh(a,c,d,e,f,g,h,k,l,m){var n=r();try{Q(a)(c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}function rg(a,c,d,e,f,g,h){var k=r();try{Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}
function mh(a,c,d,e,f,g,h,k,l,m,n){var q=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n)}catch(w){t(q);if(w!==w+0)throw w;W(1,0)}}function Se(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y){var z=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y)}catch(B){t(z);if(B!==B+0)throw B;W(1,0)}}function Mg(a,c,d,e,f,g){var h=r();try{Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function Qd(a,c,d,e,f,g,h,k,l,m,n){var q=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n)}catch(w){t(q);if(w!==w+0)throw w;W(1,0)}}
function tg(a,c,d,e,f,g){var h=r();try{Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function Fg(a,c,d,e,f,g,h){var k=r();try{Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function Zf(a,c,d,e,f,g){var h=r();try{Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function Xg(a,c,d,e,f,g,h){var k=r();try{Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function nd(a,c,d,e){var f=r();try{return Q(a)(c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}
function fe(a,c,d,e,f,g,h,k){var l=r();try{return Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function Je(a,c,d,e,f,g,h,k,l){var m=r();try{return Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function Xe(a,c,d,e,f,g,h,k,l,m,n,q,w){var p=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q,w)}catch(x){t(p);if(x!==x+0)throw x;W(1,0)}}function Zh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y){var z=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y)}catch(B){t(z);if(B!==B+0)throw B;W(1,0)}}
function ie(a,c,d,e,f){var g=r();try{return Q(a)(c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function fh(a,c,d,e,f,g,h,k,l){var m=r();try{Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function Id(a,c,d,e,f,g){var h=r();try{return Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function dh(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}
function Rh(a,c,d,e,f,g,h,k,l,m,n,q,w,p){var x=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p)}catch(y){t(x);if(y!==y+0)throw y;W(1,0)}}function Gd(a,c,d,e,f){var g=r();try{return Q(a)(c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function Ee(a,c,d,e,f,g,h,k,l,m,n){var q=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n)}catch(w){t(q);if(w!==w+0)throw w;W(1,0)}}function De(a,c,d,e,f,g,h,k,l){var m=r();try{return Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}
function $f(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function me(a,c,d,e,f,g){var h=r();try{return Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function we(a,c,d,e,f,g,h,k,l){var m=r();try{return Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function $h(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B){var D=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B)}catch(F){t(D);if(F!==F+0)throw F;W(1,0)}}
function pg(a,c,d,e,f,g){var h=r();try{Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function ph(a,c,d,e,f,g,h,k,l,m,n){var q=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n)}catch(w){t(q);if(w!==w+0)throw w;W(1,0)}}function Jh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x){var y=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x)}catch(z){t(y);if(z!==z+0)throw z;W(1,0)}}function Kh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y){var z=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y)}catch(B){t(z);if(B!==B+0)throw B;W(1,0)}}
function qh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B){var D=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B)}catch(F){t(D);if(F!==F+0)throw F;W(1,0)}}function qe(a,c,d,e,f,g,h,k){var l=r();try{return Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function Hg(a,c,d,e,f,g,h,k,l){var m=r();try{Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}
function $d(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y){var z=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y)}catch(B){t(z);if(B!==B+0)throw B;W(1,0)}}function ke(a,c,d,e,f,g,h,k,l,m,n,q){var w=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q)}catch(p){t(w);if(p!==p+0)throw p;W(1,0)}}function Pg(a,c,d,e,f,g,h){var k=r();try{Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function Fd(a,c,d,e,f,g,h,k,l){var m=r();try{return Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}
function Gh(a,c,d,e,f,g,h,k,l,m,n,q){var w=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q)}catch(p){t(w);if(p!==p+0)throw p;W(1,0)}}function ei(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J){var K=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J)}catch(M){t(K);if(M!==M+0)throw M;W(1,0)}}function Xd(a,c,d,e,f,g,h,k,l){var m=r();try{return Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}
function sh(a,c,d,e,f,g,h,k,l,m){var n=r();try{Q(a)(c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}function kd(a,c,d){var e=r();try{return Q(a)(c,d)}catch(f){t(e);if(f!==f+0)throw f;W(1,0)}}function gg(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function Gf(a,c,d,e,f,g,h,k,l){var m=r();try{Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}
function If(a,c,d,e,f,g,h){var k=r();try{Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function xg(a,c,d,e,f,g,h,k,l,m){var n=r();try{Q(a)(c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}function Dh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y){var z=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y)}catch(B){t(z);if(B!==B+0)throw B;W(1,0)}}function Gg(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}
function Be(a,c,d,e,f,g,h,k){var l=r();try{return Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function wg(a,c,d,e,f,g,h,k,l){var m=r();try{Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function re(a,c,d,e,f,g,h,k,l){var m=r();try{return Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function Ef(a,c,d,e,f,g,h){var k=r();try{Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}
function rd(a,c,d){var e=r();try{return Q(a)(c,d)}catch(f){t(e);if(f!==f+0)throw f;W(1,0)}}function Yg(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function Nh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F){var G=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F)}catch(I){t(G);if(I!==I+0)throw I;W(1,0)}}
function Eh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I){var J=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I)}catch(K){t(J);if(K!==K+0)throw K;W(1,0)}}function ii(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M,R,O){var X=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M,R,O)}catch(Y){t(X);if(Y!==Y+0)throw Y;W(1,0)}}
function fi(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M,R){var O=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G,I,J,K,M,R)}catch(X){t(O);if(X!==X+0)throw X;W(1,0)}}function ad(a,c,d,e){var f=r();try{return Q(a)(c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}function Ge(a,c,d,e,f,g,h,k,l,m){var n=r();try{return Q(a)(c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}
function Me(a,c,d,e,f,g,h,k,l,m,n){var q=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n)}catch(w){t(q);if(w!==w+0)throw w;W(1,0)}}function Pf(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function Bg(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function Ie(a,c,d,e,f,g,h,k,l,m,n,q){var w=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q)}catch(p){t(w);if(p!==p+0)throw p;W(1,0)}}
function Og(a,c,d,e,f,g,h,k,l,m,n,q){var w=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q)}catch(p){t(w);if(p!==p+0)throw p;W(1,0)}}function Sf(a,c,d,e){var f=r();try{Q(a)(c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}function ae(a,c,d,e,f,g,h){var k=r();try{return Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function qg(a,c,d,e,f,g,h){var k=r();try{Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}
function Zc(a,c,d,e){var f=r();try{return Q(a)(c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}function yf(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function Qg(a,c,d,e,f,g,h,k){var l=r();try{Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function ge(a,c,d,e,f,g,h){var k=r();try{return Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}
function Rf(a,c,d,e,f,g,h,k,l){var m=r();try{Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function dg(a,c,d,e,f,g){var h=r();try{Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function Sh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x){var y=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x)}catch(z){t(y);if(z!==z+0)throw z;W(1,0)}}function th(a,c,d,e,f,g,h,k,l,m,n,q,w){var p=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w)}catch(x){t(p);if(x!==x+0)throw x;W(1,0)}}
function uh(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y){var z=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y)}catch(B){t(z);if(B!==B+0)throw B;W(1,0)}}function eg(a,c,d,e,f,g,h){var k=r();try{Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function Ng(a,c,d,e,f,g,h,k,l){var m=r();try{Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function zf(a,c,d,e,f,g,h,k,l){var m=r();try{Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}
function mg(a,c,d,e,f,g,h,k,l,m,n,q){var w=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q)}catch(p){t(w);if(p!==p+0)throw p;W(1,0)}}function gd(a,c){var d=r();try{return Q(a)(c)}catch(e){t(d);if(e!==e+0)throw e;W(1,0)}}function Vf(a,c,d,e,f,g,h){var k=r();try{Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function kg(a,c,d,e,f){var g=r();try{Q(a)(c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}
function Re(a,c,d,e,f,g,h,k,l,m,n){var q=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n)}catch(w){t(q);if(w!==w+0)throw w;W(1,0)}}function eh(a,c,d,e,f,g,h,k,l,m,n,q,w){var p=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w)}catch(x){t(p);if(x!==x+0)throw x;W(1,0)}}function kh(a,c,d,e,f,g,h,k,l,m,n){var q=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n)}catch(w){t(q);if(w!==w+0)throw w;W(1,0)}}function oh(a,c,d,e,f,g,h,k,l,m){var n=r();try{Q(a)(c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}
function Vg(a,c,d,e,f,g,h,k,l){var m=r();try{Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function Te(a,c,d,e,f,g,h,k,l,m,n,q){var w=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q)}catch(p){t(w);if(p!==p+0)throw p;W(1,0)}}function gi(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G){var I=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G)}catch(J){t(I);if(J!==J+0)throw J;W(1,0)}}
function Ke(a,c,d,e,f,g,h,k,l,m){var n=r();try{return Q(a)(c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}function Oe(a,c,d,e,f,g,h,k,l,m,n,q){var w=r();try{return Q(a)(c,d,e,f,g,h,k,l,m,n,q)}catch(p){t(w);if(p!==p+0)throw p;W(1,0)}}function ji(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G){var I=r();try{Q(a)(c,d,e,f,g,h,k,l,m,n,q,w,p,x,y,z,B,D,F,G)}catch(J){t(I);if(J!==J+0)throw J;W(1,0)}}
function xe(a,c,d,e,f,g,h,k){var l=r();try{return Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function ne(a,c,d,e,f,g,h){var k=r();try{return Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function Kd(a,c,d,e,f,g,h,k,l,m){var n=r();try{return Q(a)(c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}function Jd(a,c,d,e,f,g,h,k){var l=r();try{return Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}
function Tf(a,c,d,e,f,g){var h=r();try{Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function Uf(a,c,d,e,f,g,h,k,l){var m=r();try{Q(a)(c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function Qe(a,c,d,e,f,g,h,k,l,m){var n=r();try{return Q(a)(c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}function Hd(a,c,d,e,f,g,h){var k=r();try{return Q(a)(c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}
function je(a,c,d,e,f,g,h,k){var l=r();try{return Q(a)(c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function zg(a,c,d,e,f,g){var h=r();try{Q(a)(c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function od(a,c,d,e,f){var g=r();try{return Q(a)(c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function rf(a,c){var d=r();try{return Ki(a,c)}catch(e){t(d);if(e!==e+0)throw e;W(1,0)}}function zi(a,c,d,e){var f=r();try{Ii(a,c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}
function gf(a,c,d,e,f,g){var h=r();try{return Ji(a,c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function hf(a,c,d,e,f,g,h,k){var l=r();try{return Ni(a,c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function Di(a,c,d,e,f,g,h,k,l,m){var n=r();try{Oi(a,c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}function ni(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y){var z=r();try{Qi(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x,y)}catch(B){t(z);if(B!==B+0)throw B;W(1,0)}}
function xi(a,c,d,e,f){var g=r();try{Mi(a,c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function Gi(a,c,d,e,f,g,h){var k=r();try{Ri(a,c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function ri(a,c,d,e,f,g,h){var k=r();try{Si(a,c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function mf(a,c,d,e,f,g,h,k,l,m,n,q){var w=r();try{return Ti(a,c,d,e,f,g,h,k,l,m,n,q)}catch(p){t(w);if(p!==p+0)throw p;W(1,0)}}
function ff(a,c,d,e,f,g,h){var k=r();try{return Ui(a,c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function jf(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x){var y=r();try{return Yi(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x)}catch(z){t(y);if(z!==z+0)throw z;W(1,0)}}function mi(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x){var y=r();try{Wi(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x)}catch(z){t(y);if(z!==z+0)throw z;W(1,0)}}function pi(a,c,d,e,f,g,h,k,l,m,n,q){var w=r();try{Xi(a,c,d,e,f,g,h,k,l,m,n,q)}catch(p){t(w);if(p!==p+0)throw p;W(1,0)}}
function Ai(a,c,d,e,f){var g=r();try{Vi(a,c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function lf(a,c,d,e){var f=r();try{return aj(a,c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}function oi(a,c,d,e,f,g,h,k,l){var m=r();try{bj(a,c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function qf(a){var c=r();try{return cj(a)}catch(d){t(c);if(d!==d+0)throw d;W(1,0)}}function sf(a,c,d){var e=r();try{return Pi(a,c,d)}catch(f){t(e);if(f!==f+0)throw f;W(1,0)}}
function yi(a,c,d,e,f,g){var h=r();try{kj(a,c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function vi(a,c,d,e,f,g,h,k){var l=r();try{dj(a,c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function Ci(a,c,d,e,f,g,h,k){var l=r();try{ej(a,c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function nf(a,c,d){var e=r();try{return fj(a,c,d)}catch(f){t(e);if(f!==f+0)throw f;W(1,0)}}function tf(a,c,d,e){var f=r();try{return gj(a,c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}
function Fi(a,c,d,e,f,g){var h=r();try{ij(a,c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function ef(a,c,d,e,f,g,h,k,l){var m=r();try{return hj(a,c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}function Yd(a,c,d,e,f,g,h){var k=r();try{return lj(a,c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function Ei(a,c,d,e,f,g,h,k,l,m,n){var q=r();try{mj(a,c,d,e,f,g,h,k,l,m,n)}catch(w){t(q);if(w!==w+0)throw w;W(1,0)}}
function ui(a,c,d,e,f,g){var h=r();try{Li(a,c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}function kf(a,c,d,e,f){var g=r();try{return jj(a,c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function ti(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x){var y=r();try{pj(a,c,d,e,f,g,h,k,l,m,n,q,w,p,x)}catch(z){t(y);if(z!==z+0)throw z;W(1,0)}}function df(a,c,d,e,f,g,h,k,l){var m=r();try{return nj(a,c,d,e,f,g,h,k,l)}catch(n){t(m);if(n!==n+0)throw n;W(1,0)}}
function qi(a,c,d,e,f,g,h,k){var l=r();try{qj(a,c,d,e,f,g,h,k)}catch(m){t(l);if(m!==m+0)throw m;W(1,0)}}function vf(a,c,d,e,f){var g=r();try{return oj(a,c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function si(a,c,d,e,f,g,h,k,l,m,n,q,w){var p=r();try{Zi(a,c,d,e,f,g,h,k,l,m,n,q,w)}catch(x){t(p);if(x!==x+0)throw x;W(1,0)}}function wi(a,c,d,e,f,g,h,k,l,m){var n=r();try{$i(a,c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}
function uf(a,c,d,e,f){var g=r();try{return rj(a,c,d,e,f)}catch(h){t(g);if(h!==h+0)throw h;W(1,0)}}function pf(a,c,d,e,f,g,h){var k=r();try{return sj(a,c,d,e,f,g,h)}catch(l){t(k);if(l!==l+0)throw l;W(1,0)}}function of(a,c,d,e){var f=r();try{return tj(a,c,d,e)}catch(g){t(f);if(g!==g+0)throw g;W(1,0)}}function Bi(a,c,d,e,f,g){var h=r();try{uj(a,c,d,e,f,g)}catch(k){t(h);if(k!==k+0)throw k;W(1,0)}}
function le(a,c,d,e,f,g,h,k,l,m){var n=r();try{return vj(a,c,d,e,f,g,h,k,l,m)}catch(q){t(n);if(q!==q+0)throw q;W(1,0)}}var wj;Wa=function xj(){wj||Bj();wj||(Wa=xj)};
function Bj(){function a(){if(!wj&&(wj=!0,b.calledRun=!0,!Da)){b.noFSInit||vc||(vc=!0,uc(),b.stdin=b.stdin,b.stdout=b.stdout,b.stderr=b.stderr,b.stdin?yc("stdin",b.stdin):hb("/dev/tty","/dev/stdin"),b.stdout?yc("stdout",null,b.stdout):hb("/dev/tty","/dev/stdout"),b.stderr?yc("stderr",null,b.stderr):hb("/dev/tty1","/dev/stderr"),Pb("/dev/stdin",0),Pb("/dev/stdout",1),Pb("/dev/stderr",1));Yb=!1;nb(Ma);if(b.onRuntimeInitialized)b.onRuntimeInitialized();if(b.postRun)for("function"==typeof b.postRun&&
(b.postRun=[b.postRun]);b.postRun.length;){var c=b.postRun.shift();Na.unshift(c)}nb(Na)}}if(!(0<Oa)){if(b.preRun)for("function"==typeof b.preRun&&(b.preRun=[b.preRun]);b.preRun.length;)La.unshift(b.preRun.shift());nb(La);0<Oa||(b.setStatus?(b.setStatus("Running..."),setTimeout(function(){setTimeout(function(){b.setStatus("")},1);a()},1)):a())}}if(b.preInit)for("function"==typeof b.preInit&&(b.preInit=[b.preInit]);0<b.preInit.length;)b.preInit.pop()();Bj();
b.onRuntimeInitialized=function(){var a=b.postRuntimeInitialized;if(void 0!=a)return a(b);b.COMPAT_postRuntimeInitialized()};
"undefined"!==typeof ENVIRONMENT_IS_PTHREAD&&ENVIRONMENT_IS_PTHREAD||La.unshift(function(){P("/usr");P("/support");P("/support/Adobe");var a=P("/support/Adobe/CameraRaw"),c=self.appManifest;c?db.wo(a,c):(P("/support/Adobe/CameraRaw/Settings"),P("/support/Adobe/CameraRaw/CameraProfiles"),P("/support/Adobe/CameraRaw/LensProfiles"));P("/persistent");jb(U,{},"/persistent");Xa();kb(!0,function(){Ya()})});
`}
    };
    const load = (target) => {
        return loadLegacy() ;
    };

    load();

}));

	`,t=new Blob([e],{type:"text/javascript"});return new Worker(URL.createObjectURL(t))},_a=()=>{const r=new URL("./release/modern/acr_web.min.js",self.location.href),e=new URL("./release/modern/acr_web.wasm",self.location.href),t=new URL("./release/modern/acr_web.worker.min.js",self.location.href),a=new URL("./worker-modern-bundled.js",self.location.href),i=`
		self.wasmJsUrl = '${r}'
		self.wasmUrl = '${e}'
		self.wasmWorkerUrl = '${t}'
		self.origin = '${window.location.origin}'
		importScripts('${a}')
	`,n=new Blob([i],{type:"text/javascript"});return new Worker(URL.createObjectURL(n))},Pa={create:r=>r==="legacy"?za():_a()},$a=async(r,e)=>{const t=await new Promise((c,l)=>{const d={},p=new Map;let h=1;const b=g=>(...v)=>{const w=new Promise(k=>p.set(h,k));return r.postMessage({id:h,method:g,params:v}),h++,w};p.set(0,g=>{for(let v=0;v<g.length;v++){const w=g[v];d[w]=b(v)}c(d)}),r.addEventListener("message",g=>{const{data:v}=g,w=p.get(v.id);w!=null&&(w.call(d,v.result),p.delete(v.id))}),r.addEventListener("error",l)}),{automation:a,supportsEclipse:i,historySize:n,supportsAdaptiveProfile:s=!1}=e;return await t.initialize("0".repeat(32),a,i,n,s),t},Ma={load:r=>{const e=Pa.create(r.target);return $a(e,r)}},vr=r=>({create:()=>new Promise((e,t)=>{const a=new Map;let i=1;const n=l=>(...d)=>{const p=new Promise(h=>a.set(i,h));return r.postMessage({id:i,method:l,params:d}),i++,p},s={},c=l=>{for(let d=0;d<l.length;d++){const p=l[d];s[p]=n(p)}e(s)};r.addEventListener("message",l=>{const{data:d}=l;if(d.expose)return c(d.expose.keys);const p=a.get(d.id);p&&(p.call(s,d.result),a.delete(d.id))}),r.addEventListener("error",t),r.postMessage({request:"wrap"})})}),Sa=()=>{const r=new URL("./release/legacy/acr_web.min.js",self.location.href),e=new URL("./release/legacy/acr_web.wasm",self.location.href),t=new URL("./worker-legacy-bundled.js",self.location.href),a=`
		self.wasmJsUrl = '${r}'
		self.wasmUrl = '${e}'
		self.origin = '${window.location.origin}'
		importScripts('${t}')
	`,i=new Blob([a],{type:"text/javascript"});return new Worker(URL.createObjectURL(i))},Ea={create:()=>{const r=Sa();return vr(r).create()}},ja=()=>{const r=new URL("./release/modern/acr_web.min.js",self.location.href),e=new URL("./release/modern/acr_web.wasm",self.location.href),t=new URL("./release/modern/acr_web.worker.min.js",self.location.href),a=new URL("./worker-modern-bundled.js",self.location.href),i=`
		self.wasmJsUrl = '${r}'
		self.wasmUrl = '${e}'
		self.wasmWorkerUrl = '${t}'
		self.origin = '${window.location.origin}'
		importScripts('${a}')
	`,n=new Blob([i],{type:"text/javascript"});return new Worker(URL.createObjectURL(n))},Ra={create:()=>{const r=ja();return vr(r).create()}},Da={load:async r=>{const e=await(r.target==="legacy"?Ea.create():Ra.create()),{automation:t,supportsEclipse:a,historySize:i,supportsAdaptiveProfile:n=!1}=r;return await e.initialize("0".repeat(32),t,a,i,n),e}},Aa=async r=>{let e;switch(r){case"next":e=await _(()=>import("./manifest-C36aho_f.js"),[]);break;case"stage":e=await _(()=>import("./manifest-xN5T-fkS.js"),[]);break;case"prod":e=await _(()=>import("./manifest-Civv61zE.js"),[]);break}if(!e)throw new Error("missing manifest");return e.default},Ta=async r=>{let e;switch(r){case"next":e=await _(()=>import("./manifest-VSB2G-EU.js"),[]);break;case"stage":e=await _(()=>import("./manifest-C2kfw2_-.js"),[]);break;case"prod":e=await _(()=>import("./manifest-Blo5MsID.js"),[]);break}if(!e)throw new Error("missing manifest");return e.default},Kt={camera:r=>Aa(r),lens:r=>Ta(r)},Ba={load:async r=>{let e;switch(r){case"cs-CZ":e=await _(()=>import("./cs-CZ-Du539ELU.js"),[]);break;case"da-DK":e=await _(()=>import("./da-DK-5sbO8t7Q.js"),[]);break;case"de-DE":e=await _(()=>import("./de-DE-CdxDQ-oN.js"),[]);break;case"es-ES":e=await _(()=>import("./es-ES-BU4nABD1.js"),[]);break;case"es-MX":e=await _(()=>import("./es-MX-BU4nABD1.js"),[]);break;case"fi-FI":e=await _(()=>import("./fi-FI-B21PzlYD.js"),[]);break;case"fr-CA":e=await _(()=>import("./fr-CA-CitGlVta.js"),[]);break;case"hi-IN":e=await _(()=>import("./hi-IN--01D8zPa.js"),[]);break;case"hu-HU":e=await _(()=>import("./hu-HU-J_yAiOiE.js"),[]);break;case"id-ID":e=await _(()=>import("./id-ID-DEiNI-dd.js"),[]);break;case"it-IT":e=await _(()=>import("./it-IT-CtfedC0S.js"),[]);break;case"ja-JP":e=await _(()=>import("./ja-JP-Ct_ooWqj.js"),[]);break;case"ko-KR":e=await _(()=>import("./ko-KR-C7WvNMEG.js"),[]);break;case"nb-NO":e=await _(()=>import("./nb-NO-JbcwAD6k.js"),[]);break;case"nl-NL":e=await _(()=>import("./nl-NL-HEdELlyJ.js"),[]);break;case"pl-PL":e=await _(()=>import("./pl-PL-Do5MsvIp.js"),[]);break;case"pt-BR":e=await _(()=>import("./pt-BR-BXPsq85F.js"),[]);break;case"ru-RU":e=await _(()=>import("./ru-RU-DTbafHGa.js"),[]);break;case"sv-SE":e=await _(()=>import("./sv-SE-BJf38KNY.js"),[]);break;case"th-TH":e=await _(()=>import("./th-TH-8WWEEdYG.js"),[]);break;case"tr-TR":e=await _(()=>import("./tr-TR-Blgit5XE.js"),[]);break;case"uk-UA":e=await _(()=>import("./uk-UA-DdYaDbDg.js"),[]);break;case"vi-VN":e=await _(()=>import("./vi-VN-CLc1jZRo.js"),[]);break;case"zh-CN":e=await _(()=>import("./zh-CN-CPSybkAM.js"),[]);break;case"zh-TW":e=await _(()=>import("./zh-TW-BcLdVLHA.js"),[]);break}if(e)return Object.entries(e.default)}},La={load:async()=>(await _(()=>import("./settings-manifest-DekX8KbI.js"),[])).default},Ia=async r=>{let e;r.useRPC?e=await Da.load(r):e=await Ma.load(r);const t=await La.load(),a=Object.entries(t).map(([l,d])=>`${l}	${d.url.toString()}	${String(d.size)}`).join(`
`);await e.addSettings(a);const i=await Kt.camera(r.stack||"stage"),n=Object.entries(i).map(([l,d])=>{if(d.path)return`${l}	${d.path}	${String(d.size)}`;if(d.url)return`${l}	${d.url.toString()}	${String(d.size)}`;throw new Error("bad camera profile table")}).join(`
`);await e.addCameraProfiles(n);const s=await Kt.lens(r.stack||"stage"),c=Object.entries(s).map(([l,d])=>{if(d.path)return`${l}	${d.path}	${String(d.size)}`;if(d.url)return`${l}	${d.url.toString()}	${String(d.size)}`;throw new Error("bad lens profile table")}).join(`
`);return await e.addLensProfiles(c),new Proxy(e,{get:(l,d)=>d==="setLocale"?async p=>{const h=await Ba.load(p);if(h)return l.setTranslations(h)}:Reflect.get(l,d)})};let vt;const Ha={create:r=>(vt||(vt=Ia(r)),vt)},De=r=>"pointerId"in r,Ue=r=>"changedTouches"in r,Jt=()=>{};var ce;(function(r){r[r.None=0]="None",r[r.LeftMouseOrTouchOrPenDown=1]="LeftMouseOrTouchOrPenDown",r[r.RightMouse=2]="RightMouse",r[r.MiddleMouse=4]="MiddleMouse"})(ce||(ce={}));class te{constructor(e){this.id=-1,this.nativePointer=e,this.pageX=e.pageX,this.pageY=e.pageY,this.clientX=e.clientX,this.clientY=e.clientY,self.Touch&&e instanceof Touch?this.id=e.identifier:De(e)&&(this.id=e.pointerId)}getCoalesced(){if("getCoalescedEvents"in this.nativePointer){const e=this.nativePointer.getCoalescedEvents().map(t=>new te(t));if(e.length>0)return e}return[this]}}function Qe(r){if(!r)return!1;const{nativePointer:e}=r;return e instanceof PointerEvent||e instanceof MouseEvent?!!(e.buttons&ce.MiddleMouse):!1}class tt{constructor(e,{useCapture:t=!1,start:a=()=>!0,move:i=Jt,end:n=Jt,rawUpdates:s=!1,avoidPointerEvents:c=!1}={}){this._element=e,this.startPointers=[],this.currentPointers=[],this._excludeFromButtonsCheck=new Set,this._pointerStart=l=>{if(De(l)&&l.buttons===0)this._excludeFromButtonsCheck.add(l.pointerId);else if(!(l.buttons&ce.LeftMouseOrTouchOrPenDown)&&!(l.buttons&ce.MiddleMouse))return;const d=new te(l);this.currentPointers.some(p=>p.id===d.id)||this._triggerPointerStart(d,l)&&(De(l)?((l.target&&"setPointerCapture"in l.target?l.target:this._element).setPointerCapture(l.pointerId),this._element.addEventListener("pointermove",this._move,{capture:this._useCapture}),this._element.addEventListener("pointerup",this._pointerEnd,this._useCapture),this._element.addEventListener("pointercancel",this._pointerEnd,this._useCapture)):(window.addEventListener("mousemove",this._move,this._useCapture),window.addEventListener("mouseup",this._pointerEnd,this._useCapture)))},this._touchStart=l=>{for(const d of Array.from(l.changedTouches))this._triggerPointerStart(new te(d),l)},this._move=l=>{if(!Ue(l)&&(!De(l)||!this._excludeFromButtonsCheck.has(l.pointerId))&&l.buttons===ce.None){this._pointerEnd(l);return}const d=this.currentPointers.slice(),p=Ue(l)?Array.from(l.changedTouches).map(b=>new te(b)):[new te(l)],h=[];for(const b of p){const g=this.currentPointers.findIndex(v=>v.id===b.id);g!==-1&&(h.push(b),this.currentPointers[g]=b)}h.length!==0&&this._moveCallback(d,h,l)},this._triggerPointerEnd=(l,d)=>{if(!Ue(d)&&d.buttons&ce.LeftMouseOrTouchOrPenDown)return!1;const p=this.currentPointers.findIndex(b=>b.id===l.id);if(p===-1)return!1;this.currentPointers.splice(p,1),this.startPointers.splice(p,1),this._excludeFromButtonsCheck.delete(l.id);const h=!(d.type==="mouseup"||d.type==="touchend"||d.type==="pointerup");return this._endCallback(l,d,h),!0},this._pointerEnd=l=>{if(this._triggerPointerEnd(new te(l),l))if(De(l)){if(this.currentPointers.length)return;this._element.removeEventListener("pointermove",this._move,{capture:this._useCapture}),this._element.removeEventListener("pointerup",this._pointerEnd,this._useCapture),this._element.removeEventListener("pointercancel",this._pointerEnd,this._useCapture)}else window.removeEventListener("mousemove",this._move,this._useCapture),window.removeEventListener("mouseup",this._pointerEnd,this._useCapture)},this._touchEnd=l=>{for(const d of Array.from(l.changedTouches))this._triggerPointerEnd(new te(d),l)},this._startCallback=a,this._moveCallback=i,this._endCallback=n,this._useCapture=t,this._rawUpdates=s&&"onpointerrawupdate"in window,self.PointerEvent&&!c?this._element.addEventListener("pointerdown",this._pointerStart,this._useCapture):(this._element.addEventListener("mousedown",this._pointerStart,this._useCapture),this._element.addEventListener("touchstart",this._touchStart,this._useCapture),this._element.addEventListener("touchmove",this._move,this._useCapture),this._element.addEventListener("touchend",this._touchEnd,this._useCapture),this._element.addEventListener("touchcancel",this._touchEnd,this._useCapture))}stop(){this._element.removeEventListener("pointerdown",this._pointerStart,this._useCapture),this._element.removeEventListener("mousedown",this._pointerStart,this._useCapture),this._element.removeEventListener("touchstart",this._touchStart,this._useCapture),this._element.removeEventListener("touchmove",this._move,this._useCapture),this._element.removeEventListener("touchend",this._touchEnd,this._useCapture),this._element.removeEventListener("touchcancel",this._touchEnd,this._useCapture),this._element.removeEventListener("pointermove",this._move,this._useCapture),this._element.removeEventListener("pointerup",this._pointerEnd,this._useCapture),this._element.removeEventListener("pointercancel",this._pointerEnd,this._useCapture),window.removeEventListener("mousemove",this._move,this._useCapture),window.removeEventListener("mouseup",this._pointerEnd,this._useCapture)}_triggerPointerStart(e,t){return this._startCallback(e,t)?(this.currentPointers.push(e),this.startPointers.push(e),!0):!1}}function er(r){r.stopPropagation(),r.preventDefault()}var Oa=function(r,e,t,a){var i=arguments.length,n=i<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(r,e,t,a);else for(var c=r.length-1;c>=0;c--)(s=r[c])&&(n=(i<3?s(n):i>3?s(e,t,n):s(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};class yr extends Y{constructor(){super(...arguments),this.panning=!1}static{this.styles=$`
		:host {
			display: block;
			position: absolute;
			inset: 0;
		}

		#wrapper {
			position: relative;
			overflow: hidden;
			width: 100%;
			height: 100%;
		}

		#container {
			/* width: 100%;
    height: 100%;
    position: absolute; */
			inset: 0;
			touch-action: none;
		}

		::slotted(*) {
			position: absolute;
		}
	`}render(){return u`
			<div id="wrapper">
				<div
					id="container"
					@dragenter=${er}
					@dragover=${er}
				>
					<slot></slot>
				</div>
				<slot name="cursor"></slot>
			</div>
		`}}Oa([f({type:Boolean,reflect:!0})],yr.prototype,"panning",void 0);customElements.define("diwi-stage",yr);let wr=class extends Event{constructor(e,t,a,i){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=a,this.subscribe=i??!1}};let tr=class{constructor(e,t,a,i){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(n,s)=>{this.unsubscribe&&(this.unsubscribe!==s&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=n,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(n,s)),this.unsubscribe=s},this.host=e,t.context!==void 0){const n=t;this.context=n.context,this.callback=n.callback,this.subscribe=n.subscribe??!1}else this.context=t,this.callback=a,this.subscribe=i??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new wr(this.context,this.host,this.t,this.subscribe))}};let qa=class{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){const a=t||!Object.is(e,this.o);this.o=e,a&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(const[t,{disposer:a}]of this.subscriptions)t(this.o,a)},e!==void 0&&(this.value=e)}addCallback(e,t,a){if(!a)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});const{disposer:i}=this.subscriptions.get(e);e(this.value,i)}clearCallbacks(){this.subscriptions.clear()}};let Fa=class extends Event{constructor(e,t){super("context-provider",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}},Wa=class extends qa{constructor(e,t,a){super(t.context!==void 0?t.initialValue:a),this.onContextRequest=i=>{if(i.context!==this.context)return;const n=i.contextTarget??i.composedPath()[0];n!==this.host&&(i.stopPropagation(),this.addCallback(i.callback,n,i.subscribe))},this.onProviderRequest=i=>{if(i.context!==this.context||(i.contextTarget??i.composedPath()[0])===this.host)return;const n=new Set;for(const[s,{consumerHost:c}]of this.subscriptions)n.has(s)||(n.add(s),c.dispatchEvent(new wr(this.context,c,s,!0)));i.stopPropagation()},this.host=e,t.context!==void 0?this.context=t.context:this.context=t,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new Fa(this.context,this.host))}};function Va({context:r,subscribe:e}){return(t,a)=>{typeof a=="object"?a.addInitializer((function(){new tr(this,{context:r,callback:i=>{t.set.call(this,i)},subscribe:e})})):t.constructor.addInitializer((i=>{new tr(i,{context:r,callback:n=>{i[a]=n},subscribe:e})}))}}var xe=typeof Float32Array<"u"?Float32Array:Array;function Na(r){xe=r}Math.hypot||(Math.hypot=function(){for(var r=0,e=arguments.length;e--;)r+=arguments[e]*arguments[e];return Math.sqrt(r)});function qe(){var r=new xe(9);return xe!=Float32Array&&(r[1]=0,r[2]=0,r[3]=0,r[5]=0,r[6]=0,r[7]=0),r[0]=1,r[4]=1,r[8]=1,r}function rr(r,e){var t=e[0],a=e[1],i=e[2],n=e[3],s=e[4],c=e[5],l=e[6],d=e[7],p=e[8],h=p*s-c*d,b=-p*n+c*l,g=d*n-s*l,v=t*h+a*b+i*g;return v?(v=1/v,r[0]=h*v,r[1]=(-p*a+i*d)*v,r[2]=(c*a-i*s)*v,r[3]=b*v,r[4]=(p*t-i*l)*v,r[5]=(-c*t+i*n)*v,r[6]=g*v,r[7]=(-d*t+a*l)*v,r[8]=(s*t-a*n)*v,r):null}function Ga(r,e,t){var a=e[0],i=e[1],n=e[2],s=e[3],c=e[4],l=e[5],d=e[6],p=e[7],h=e[8],b=t[0],g=t[1],v=t[2],w=t[3],k=t[4],C=t[5],$e=t[6],Me=t[7],me=t[8];return r[0]=b*a+g*s+v*d,r[1]=b*i+g*c+v*p,r[2]=b*n+g*l+v*h,r[3]=w*a+k*s+C*d,r[4]=w*i+k*c+C*p,r[5]=w*n+k*l+C*h,r[6]=$e*a+Me*s+me*d,r[7]=$e*i+Me*c+me*p,r[8]=$e*n+Me*l+me*h,r}function Ua(r,e,t){var a=e[0],i=e[1],n=e[2],s=e[3],c=e[4],l=e[5],d=e[6],p=e[7],h=e[8],b=Math.sin(t),g=Math.cos(t);return r[0]=g*a+b*s,r[1]=g*i+b*c,r[2]=g*n+b*l,r[3]=g*s-b*a,r[4]=g*c-b*i,r[5]=g*l-b*n,r[6]=d,r[7]=p,r[8]=h,r}function Qa(r,e,t){var a=t[0],i=t[1];return r[0]=a*e[0],r[1]=a*e[1],r[2]=a*e[2],r[3]=i*e[3],r[4]=i*e[4],r[5]=i*e[5],r[6]=e[6],r[7]=e[7],r[8]=e[8],r}function Za(r,e){return r[0]=1,r[1]=0,r[2]=0,r[3]=0,r[4]=1,r[5]=0,r[6]=e[0],r[7]=e[1],r[8]=1,r}function Ae(){var r=new xe(2);return xe!=Float32Array&&(r[0]=0,r[1]=0),r}function j(r,e){var t=new xe(2);return t[0]=r,t[1]=e,t}function Xa(r,e,t){return r[0]=e,r[1]=t,r}function Ya(r,e,t){var a=e[0],i=e[1];return r[0]=t[0]*a+t[3]*i+t[6],r[1]=t[1]*a+t[4]*i+t[7],r}function yt(r,e,t,a){var i=e[0]-t[0],n=e[1]-t[1],s=Math.sin(a),c=Math.cos(a);return r[0]=i*c-n*s+t[0],r[1]=i*s+n*c+t[1],r}(function(){var r=Ae();return function(e,t,a,i,n,s){var c,l;for(t||(t=2),a||(a=0),i?l=Math.min(i*t+a,e.length):l=e.length,c=a;c<l;c+=t)r[0]=e[c],r[1]=e[c+1],n(r,r,s),e[c]=r[0],e[c+1]=r[1];return e}})();function ar(r,e,t){return Ya(r,e,t),r}Na(Array);function Ka(r,e){r.setTransform(e[0],e[1],e[3],e[4],e[6],e[7])}function Ja(r){return`matrix(${[r[0],r[1],r[3],r[4],r[6],r[7]]})`}class ei{constructor(){this.localPosition=j(0,0),this.localScale=j(1,1),this.localRotation=0,this.skew=j(0,0),this.parent=void 0,this.localOrigin=j(0,0)}get globalRotation(){return this.parent?this.parent.globalScale[0]<0?this.parent.globalRotation-this.localRotation:this.parent.globalRotation+this.localRotation:this.localRotation}setGlobalRotation(e){this.parent?this.parent.globalScale[0]<0?this.localRotation=-e+this.parent.globalRotation:this.localRotation=e-this.parent.globalRotation:this.localRotation=e}get globalPosition(){if(this.parent){const e=j(this.localPosition[0]*this.parent.globalScale[0],this.localPosition[1]*this.parent.globalScale[1]);return yt(e,e,this.localOrigin,this.parent.globalRotation),j(e[0]+this.parent.globalPosition[0],e[1]+this.parent.globalPosition[1])}return this.localPosition}setGlobalPosition(e,t){if(this.parent){const a=j(e-this.parent.globalPosition[0],t-this.parent.globalPosition[1]);yt(a,a,this.localOrigin,-this.parent.globalRotation),this.localPosition=j(a[0]/this.parent.globalScale[0],a[1]/this.parent.globalScale[1])}else this.localPosition=j(e,t)}get globalScale(){return this.parent?j(this.parent.globalScale[0]*this.localScale[0],this.parent.globalScale[1]*this.localScale[1]):this.localScale}setGlobalScale(e,t){this.parent?this.localScale=j(e/this.parent.globalScale[0],t/this.parent.globalScale[1]):this.localScale=j(e,t)}get localMatrix(){const e=qe();return Za(e,this.localPosition),Ua(e,e,this.localRotation),Qa(e,e,this.localScale),e}set localMatrix(e){const t=e[0],a=e[1],i=e[3],n=e[4],s=e[6],c=e[7],l=-Math.atan2(-i,n),d=Math.atan2(a,t),p=Math.abs(l+d),h=1e-5;p<h||Math.abs(Math.PI*2-p)<h?this.localRotation=d:this.localRotation=0,this.localScale=j(Math.sqrt(t*t+a*a),Math.sqrt(i*i+n*n)),this.localPosition=j(s,c)}get globalMatrix(){const e=qe();return this.parent?Ga(e,this.parent.globalMatrix,this.localMatrix):this.localMatrix}get inverseLocalMatrix(){const e=qe();return rr(e,this.localMatrix),e}get inverseGlobalMatrix(){const e=qe();return rr(e,this.globalMatrix),e}rotate(e){this.localRotation+=e,this.localRotation%=Math.PI*2}translate(e,t){this.localPosition=j(this.localPosition[0]+e,this.localPosition[1]+t)}scale(e,t){this.localScale=j(this.localScale[0]*e,this.localScale[1]*t)}setRotation(e){this.localRotation=e%(Math.PI*2)}setPosition(e,t){this.localPosition=j(e,t)}setScale(e,t){this.localScale=j(e,t)}setParent(e,t=!0){if(e!==this.parent){if(e){t&&this.updateLocalProperties(e),this.parent=e;return}t&&(this.localPosition=j(this.globalPosition[0],this.globalPosition[1]),this.localRotation=this.globalRotation,this.localScale=j(this.globalScale[0],this.globalScale[1])),this.parent=void 0}}updateLocalProperties(e){const t=j(this.globalPosition[0]-e.globalPosition[0],this.globalPosition[1]-e.globalPosition[1]);yt(t,t,this.localOrigin,-e.globalRotation),this.localPosition=j(t[0]/e.globalScale[0],t[1]/e.globalScale[1]),e.globalScale[0]<0?this.localRotation=-this.globalRotation+e.globalRotation:this.localRotation=this.globalRotation-e.globalRotation,this.localScale=j(this.globalScale[0]/e.globalScale[0],this.globalScale[1]/e.globalScale[1])}localHorizontalFlip(){this.localScale=j(-this.localScale[0],this.localScale[1])}resetLocalProperties(){this.setPosition(0,0),this.setRotation(0),this.setScale(1,1)}asDOMMatrix(){const e=this.globalMatrix;return new DOMMatrix([e[0],e[1],e[3],e[4],e[6],e[7]])}applyTransform(e){Ka(e,this.globalMatrix)}asStyleMatrix(){return Ja(this.globalMatrix)}}const kr=Symbol("camera"),ti=.05,ri=32,ai=[.05,.1,.25,.5,1,1.5,2,3,4,8,16,32];class ii{get globalToCamera(){return this.transform.globalMatrix}get cameraToGlobal(){return this.transform.inverseGlobalMatrix}get x(){return this.transform.globalPosition[0]}get y(){return this.transform.globalPosition[1]}get scale(){return this.transform.globalScale[0]}get viewCenterInGlobalSpace(){return j(-this.x/this.scale,-this.y/this.scale)}zoomStep(e){return e?(this.zoomInToNextStep(),this.maxLimit):(this.zoomOutToNextStep(),this.minLimit)}get maxLimit(){return this.maxScale===this.scale}get minLimit(){return this.minScale===this.scale}_internal_lookAtNoNotify(e,t,a){this.transform.setPosition(-e,-t),a!==void 0&&this.transform.setScale(a,a)}lookAt(e,t,a){this._internal_lookAtNoNotify(e,t,a),this.notify()}pan(e,t){this.transform.translate(-e,-t),this.notify()}bounded(e){return e>this.maxScale?this.maxScale:e<this.minScale?this.minScale:e}zoom(e){const t=this.bounded(e);this.transform.setScale(t,t),this.notify()}zoomBy(e){this.zoom(this.scale*e)}zoomByAt(e,t,a,i){const n=Ae(),s=Ae(),c=Ae();return Xa(s,t-i.width/2-i.left,a-i.height/2-i.top),ar(n,s,this.cameraToGlobal),this.zoom(this.scale*e),ar(c,n,this.globalToCamera),this.pan(c[0]-s[0],c[1]-s[1]),{lookAt:[n[0],n[1]],change:e}}zoomToFit(e,t,a){if(!a||a.width===0||a.height===0){console.warn("invalid boundingClientRect",a);return}const i=e,n=t,s=a.width/i,c=a.height/n;this.lookAt(0,0,Math.min(s,c))}zoomToFill(e,t,a){if(!a||a.width===0||a.height===0){console.warn("invalid boundingClientRect",a);return}const i=e,n=t,s=a.width/i,c=a.height/n;this.lookAt(0,0,Math.max(s,c))}setZoomSteps(e){if(!e.length)throw new Error("zoomStepValues empty");this.zoomStepValues=e.sort((t,a)=>t-a),this.minScale=this.zoomStepValues[0],this.maxScale=this.zoomStepValues[this.zoomStepValues.length-1]}zoomOutToNextStep(){let e=0,t=this.zoomStepValues[0];for(;this.zoomStepValues[e]<this.scale;)t=this.zoomStepValues[e++];this.zoom(t)}zoomInToNextStep(){let e=this.zoomStepValues.length-1,t=this.zoomStepValues[e];for(;this.zoomStepValues[e]>this.scale;)t=this.zoomStepValues[e--];this.zoom(t)}reset({x:e=0,y:t=0}={}){this.transform.setPosition(e,t),this.transform.setScale(1,1),this.notify()}notify(){this.notifyCallback&&this.notifyCallback()}constructor(e){this.globalCenter=Ae(),this.transform=new ei,this.minScale=ti,this.maxScale=ri,this.zoomStepValues=ai,this.notifyCallback=e}}var xr=function(r,e,t,a){var i=arguments.length,n=i<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(r,e,t,a);else for(var c=r.length-1;c>=0;c--)(s=r[c])&&(n=(i<3?s(n):i>3?s(e,t,n):s(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};class Lt extends Y{static{this.styles=$`
		:host {
			display: block;
			position: absolute;
			inset: 0;
		}
	`}render(){const e=this.contentEl?.clientWidth||0,t=this.contentEl?.clientHeight||0;let a=-e/2,i=-t/2,n=1;this.camera&&(a+=this.camera.x,i+=this.camera.y,n=this.camera.scale);const s={transform:`translate(${a}px, ${i}px) scale(${n})`};return u`
			<div id="origin-offset" style="position: absolute; top: 50%; left: 50%;">
				<div id="content" style=${ke(s)}>
					<slot name="background"></slot>
					<slot></slot>
				</div>
			</div>
		`}firstUpdated(){this.requestUpdate()}}xr([Va({context:kr,subscribe:!0}),f({type:Object})],Lt.prototype,"camera",void 0);xr([O("#content")],Lt.prototype,"contentEl",void 0);customElements.define("diwi-dom-renderer",Lt);const ni=!!navigator.userAgent.match(/Version\/[\d.]+.*Safari/);function Cr(){const{userAgent:r,platform:e}=window.navigator,t=["Macintosh","MacIntel","MacPPC","Mac68K"],a=["Win32","Win64","Windows","WinCE"],i=["iPhone","iPad","iPod"];let n="Unknown";return t.indexOf(e)!==-1?n="Mac OS":i.indexOf(e)!==-1?n="iOS":a.indexOf(e)!==-1?n="Windows":/Android/.test(r)?n="Android":!n&&/Linux/.test(e)&&(n="Linux"),n}const oi=Cr()==="iOS";Cr();var Pe=function(r,e,t,a){var i=arguments.length,n=i<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(r,e,t,a);else for(var c=r.length-1;c>=0;c--)(s=r[c])&&(n=(i<3?s(n):i>3?s(e,t,n):s(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};const si=r=>{const e=r.deltaY*window.devicePixelRatio,t=Math.round(e),i=Math.abs(t-e)<=Number.EPSILON*Math.abs(t);return!r.ctrlKey&&!i?"mouse":"trackpad"},ir={"mousewheel-zoom-speed":15,"trackpad-zoom-speed":15};function nr(r,e,t){return Math.min(Math.max(r,e),t)}class he extends Y{static{this.styles=$`
		:host {
			display: block;
			inset: 0;
			overflow: hidden;
			touch-action: none;
			flex: 1;
		}

		:host(:not([disabled], [hold-space-to-pan])),
		:host([hold-space-to-pan][space-down]) {
			cursor: grab;
		}

		:host([panning]),
		:host([panning]):not([disabled]) {
			cursor: grabbing !important;
		}

		#container {
			width: 100%;
			height: 100%;
			overflow: hidden;
			touch-action: none;
		}

		#container > * {
			transform-origin: 0 0;
		}
	`}get x(){return this.camera.x}get y(){return this.camera.y}get scale(){return this.camera.scale}lookAt(e,t,a){this.camera.lookAt(e,t,a)}pan(e,t){this.camera.pan(e,t)}zoom(e){this.camera.zoom(e)}zoomBy(e){this.camera.zoomBy(e)}zoomByAt(e,t,a,i){return this.camera.zoomByAt(e,t,a,i)}zoomToFit(e,t,a){this.camera.zoomToFit(e,t,a)}zoomToFill(e,t,a){this.camera.zoomToFill(e,t,a)}zoomInToNextStep(){this.camera.zoomInToNextStep()}zoomOutToNextStep(){this.camera.zoomOutToNextStep()}setZoomSteps(e){this.camera.setZoomSteps(e)}setPanningConstraints(e,t,a,i){this.documentWidth=e,this.documentHeight=t,this.cameraInsetWidth=a??0,this.cameraInsetHeight=i??0}constructor(){super(),this.disabled=!1,this.panning=!1,this.documentWidth=0,this.documentHeight=0,this.cameraInsetWidth=0,this.cameraInsetHeight=0,this.zoomPercent=.1,this.holdSpaceToPan=!1,this.panEventDebouncer=0,this.prevTouchDistance=0,this.spaceDown=!1,this.gesturePrevScale=0,this.gesturePrevX=0,this.gesturePrevY=0;const e=()=>{this.constrain();const t={x:this.camera.x,y:this.camera.y,scale:this.camera.scale};this.dispatchEvent(new CustomEvent("pan-zoom:update",{composed:!0,bubbles:!0,cancelable:!0,detail:t})),this._cameraProvider.setValue(this.camera,!0)};this.camera=new ii(e),this._cameraProvider=new Wa(this,{context:kr,initialValue:this.camera}),(ni||oi)&&this.installGestureHandlers()}connectedCallback(){super.connectedCallback(),this.holdSpaceToPan&&(this._eventListenerAbortController=new AbortController,window.addEventListener("keydown",e=>{e.key===" "&&(this.spaceDown=!0)},{signal:this._eventListenerAbortController.signal}),window.addEventListener("keyup",e=>{e.key===" "&&(this.spaceDown=!1,this.onPanEnd())},{signal:this._eventListenerAbortController.signal}))}disconnectedCallback(){this._eventListenerAbortController?.abort(),super.disconnectedCallback()}firstUpdated(){this.container&&(this.pointerTracker=new tt(this.container,{start:(e,t)=>this.onPointerStart(e,t),move:(e,t,a)=>this.onPointerMove(e,t,a),end:(e,t)=>this.onPointerEnd(e,t),avoidPointerEvents:this.holdSpaceToPan})),new ResizeObserver(this._resize.bind(this)).observe(this)}onPointerStart(e,t){return this.disabled||this.holdSpaceToPan&&!this.spaceDown&&!Qe(e)||t.defaultPrevented?!1:(t.stopPropagation(),this.onPanStart(),!0)}onPointerMove(e,t,a){if(a.defaultPrevented||!this.pointerTracker||this.disabled&&this.pointerTracker.currentPointers.length<2&&!Qe(e[0])||this.holdSpaceToPan&&!this.spaceDown&&!Qe(e[0])&&!Ue(a))return;a.stopPropagation(),a.preventDefault(),this.panning||(this.panning=!0,this.onPanStart(),t.length>1&&this.onZoomStart());const i=this.pointerTracker.currentPointers[0],n=e.find(s=>s.id===i.id);if(n)if(this.pointerTracker.currentPointers.length===2){const s=this.pointerTracker.currentPointers[1],c=e.find(g=>g.id===s.id);if(!c)return;const l=(i.clientX+s.clientX)/2,d=(i.clientY+s.clientY)/2,p=(n.clientX+c.clientX)/2,h=(n.clientY+c.clientY)/2,b=this.distanceBetweenTouches;if(this.prevTouchDistance!==0){const g=this.normalizeZoomDelta(this.prevTouchDistance-b,0,"touch",a.ctrlKey);this.onZoomChange(l,d,g)}this.onPanChange(p-l,h-d),this.prevTouchDistance=b}else this.onPanChange(n.clientX-i.clientX,n.clientY-i.clientY)}onPointerEnd(e,t){t.defaultPrevented||(this.onPanEnd(),this.pointerTracker&&this.pointerTracker.currentPointers.length===0&&(this.prevTouchDistance=0))}_resize(e){const[t]=e,a=t.contentBoxSize[0].inlineSize,i=t.contentBoxSize[0].blockSize;this._constraints={cameraFrameWidth:a,cameraFrameHeight:i},this.constrain()}constrain(){if(!this._constraints)return;let[e,t]=this.camera.viewCenterInGlobalSpace;const a=((this._constraints.cameraFrameWidth-this.cameraInsetWidth)/this.scale+this.documentWidth)/2,i=((this._constraints.cameraFrameHeight-this.cameraInsetHeight)/this.scale+this.documentHeight)/2,n=a<0?0:nr(e,-a,a),s=i<0?0:nr(t,-i,i),c=n*this.scale,l=s*this.scale;this.camera._internal_lookAtNoNotify(c,l)}render(){return u`
			<div id="container" draggable="false" @wheel=${this.onWheel}>
				<slot></slot>
			</div>
		`}onPanStart(){this.panning=!0,this.dispatchEvent(new CustomEvent("pan-zoom:pan-start",{bubbles:!0,composed:!0}))}onPanChange(e,t){this.camera.pan(e,t)}onPanEnd(){this.panning&&(this.panning=!1,this.dispatchEvent(new CustomEvent("pan-zoom:pan-end",{bubbles:!0,composed:!0})))}onZoomStart(){this.dispatchEvent(new CustomEvent("pan-zoom:zoom-start",{bubbles:!0,composed:!0}))}onZoomChange(e,t,a){const i=this.getBoundingClientRect(),n=this.camera.zoomByAt(a,e,t,i);this.dispatchEvent(new CustomEvent("pan-zoom:zoom-change",{bubbles:!0,composed:!0,detail:n}))}onZoomEnd(){this.dispatchEvent(new CustomEvent("pan-zoom:zoom-end",{bubbles:!0,composed:!0}))}onWheel(e){if(this.disabled)return;const t=si(e);e.preventDefault(),e.stopImmediatePropagation();const{deltaY:a}=e,{ctrlKey:i,deltaMode:n}=e,s=this.normalizeZoomDelta(a,n,t,i);i||t==="mouse"?(this.onZoomStart(),this.onZoomChange(e.clientX,e.clientY,s),this.onZoomEnd()):(this.panning||this.onPanStart(),this.debouncePanEvents(),this.onPanChange(e.deltaX,e.deltaY))}get distanceBetweenTouches(){if(!this.pointerTracker||this.pointerTracker.currentPointers.length!==2)return 0;const e=this.pointerTracker.currentPointers[0],t=this.pointerTracker.currentPointers[1],a=e.clientX-t.clientX,i=e.clientY-t.clientY;return Math.sqrt(a*a+i*i)}debouncePanEvents(){this.panning&&(clearTimeout(this.panEventDebouncer),this.panEventDebouncer=window.setTimeout(this.onPanEnd.bind(this),100))}installGestureHandlers(){this.addEventListener("gesturestart",(e=>{e.preventDefault(),e.stopPropagation(),this.gesturePrevScale=1,this.gesturePrevX=e.clientX,this.gesturePrevY=e.clientY,this.panning||this.onPanStart(),this.onZoomStart()})),this.addEventListener("gesturechange",(e=>{e.preventDefault(),e.stopPropagation();const t=e.clientX,a=e.clientY;this.onZoomChange(t,a,e.scale-this.gesturePrevScale+1),this.onPanChange(this.gesturePrevX-t,this.gesturePrevY-a),this.gesturePrevX=t,this.gesturePrevY=a,this.gesturePrevScale=e.scale})),this.addEventListener("gestureend",(e=>{e.preventDefault(),e.stopPropagation(),this.onZoomEnd(),this.onPanEnd()}))}normalizeZoomDelta(e,t,a,i){let n=e/333;return t===1&&(n*=15),(a==="trackpad"||a==="touch"||i)&&(a==="mouse"?n*=ir["mousewheel-zoom-speed"]:n*=ir["trackpad-zoom-speed"]),n<0?1+this.zoomPercent*Math.abs(n):1-this.zoomPercent*n}}Pe([f({type:Boolean})],he.prototype,"disabled",void 0);Pe([f({type:Boolean,reflect:!0})],he.prototype,"panning",void 0);Pe([f({type:Number})],he.prototype,"zoomPercent",void 0);Pe([f({type:Boolean,attribute:"hold-space-to-pan"})],he.prototype,"holdSpaceToPan",void 0);Pe([O("#container")],he.prototype,"container",void 0);Pe([f({type:Boolean,attribute:"space-down",reflect:!0})],he.prototype,"spaceDown",void 0);customElements.define("diwi-pan-zoom",he);const It=Symbol("language resolver updated");class Ht{constructor(e){this.language=document.documentElement.lang||navigator.language,this.host=e,this.host.addController(this)}hostConnected(){this.resolveLanguage()}hostDisconnected(){var e;(e=this.unsubscribe)==null||e.call(this)}resolveLanguage(){const e=new CustomEvent("sp-language-context",{bubbles:!0,composed:!0,detail:{callback:(t,a)=>{const i=this.language;this.language=t,this.unsubscribe=a,this.host.requestUpdate(It,i)}},cancelable:!0});this.host.dispatchEvent(e)}}const li=$`
    :host{font-size:var(--mod-progressbar-font-size,var(--spectrum-progressbar-font-size));vertical-align:top;inline-size:var(--mod-progressbar-size-default,var(--spectrum-progressbar-size-default));max-inline-size:var(--mod-progressbar-max-size,var(--spectrum-progressbar-max-size));min-inline-size:var(--mod-progressbar-min-size,var(--spectrum-progressbar-min-size));flex-flow:wrap;justify-content:space-between;align-items:center;display:inline-flex;position:relative}.label,.percentage{text-align:start;line-height:var(--mod-progressbar-line-height,var(--spectrum-progressbar-line-height));color:var(--mod-progressbar-text-color,var(--spectrum-progressbar-text-color));margin-block-start:var(--mod-progressbar-spacing-top-to-text,var(--spectrum-progressbar-spacing-top-to-text));margin-block-end:var(--mod-progressbar-spacing-label-to-progressbar,var(--spectrum-progressbar-spacing-label-to-progressbar))}.label:lang(ja),.label:lang(ko),.label:lang(zh),.percentage:lang(ja),.percentage:lang(ko),.percentage:lang(zh){line-height:var(--mod-progressbar-line-height-cjk,var(--spectrum-progressbar-line-height-cjk))}.label{flex:1}.percentage{align-self:flex-start;margin-inline-start:var(--mod-progressbar-spacing-label-to-text,var(--spectrum-progressbar-spacing-label-to-text))}.track{inline-size:100%;block-size:var(--mod-progressbar-thickness,var(--spectrum-progressbar-thickness));border-radius:var(--spectrum-progressbar-corner-radius);background:var(--highcontrast-progressbar-track-color,var(--mod-progressbar-track-color,var(--spectrum-progressbar-track-color)));overflow:hidden}.fill{block-size:var(--mod-progressbar-thickness,var(--spectrum-progressbar-thickness));background:var(--highcontrast-progressbar-fill-color,var(--mod-progressbar-fill-color,var(--spectrum-progressbar-fill-color)));border:none;transition:width 1s}:host([indeterminate]) .fill{inline-size:var(--mod-progressbar-fill-size-indeterminate,var(--spectrum-progressbar-fill-size-indeterminate));animation-timing-function:var(--mod-progressbar-animation-ease-in-out-indeterminate,var(--spectrum-progressbar-animation-ease-in-out-indeterminate));will-change:transform;animation-name:indeterminate-loop-ltr;animation-duration:var(--mod-progressbar-animation-duration-indeterminate,var(--spectrum-progressbar-animation-duration-indeterminate));animation-iteration-count:infinite;position:relative}:host([indeterminate]) .fill:dir(rtl),:host([dir=rtl][indeterminate]) .fill{animation-name:indeterminate-loop-rtl}:host([side-label]){flex-flow:row;justify-content:space-between;display:inline-flex}:host([side-label]) .track{flex:1 1 var(--mod-progressbar-size-default,var(--spectrum-progressbar-size-default))}:host([side-label]) .label{flex-grow:0;margin-block-end:0;margin-inline-end:var(--mod-progressbar-spacing-label-to-text,var(--spectrum-progressbar-spacing-label-to-text))}:host([side-label]) .percentage{text-align:end;order:3;margin-block-end:0;margin-inline-start:var(--mod-spacing-progressbar-label-to-text,var(--spectrum-progressbar-spacing-label-to-text))}:host([static-color=white]) .fill{background:var(--mod-progressbar-fill-color-white,var(--spectrum-progressbar-fill-color-white))}:host([static-color=white]) .fill,:host([static-color=white]) .label,:host([static-color=white]) .percentage{color:var(--mod-progressbar-label-and-value-white,var(--spectrum-progressbar-label-and-value-white))}:host([static-color=white]) .track{background:var(--spectrum-progressbar-track-color-white)}@keyframes indeterminate-loop-ltr{0%{transform:translate(calc(var(--mod-progressbar-fill-size-indeterminate,var(--spectrum-progressbar-fill-size-indeterminate))*-1))}to{transform:translate(var(--mod-progressbar-size-default,var(--spectrum-progressbar-size-default)))}}@keyframes indeterminate-loop-rtl{0%{transform:translate(var(--mod-progressbar-size-default,var(--spectrum-progressbar-fill-size-indeterminate)))}to{transform:translate(calc(var(--mod-progressbar-size-default,var(--spectrum-progressbar-size-default))*-1))}}@media (forced-colors:active){.track{--highcontrast-progressbar-fill-color:ButtonText;--highcontrast-progressbar-track-color:ButtonFace;forced-color-adjust:none;border:1px solid ButtonText}}:host{--spectrum-progressbar-animation-ease-in-out-indeterminate:var(--system-progress-bar-animation-ease-in-out-indeterminate);--spectrum-progressbar-animation-duration-indeterminate:var(--system-progress-bar-animation-duration-indeterminate);--spectrum-progressbar-corner-radius:var(--system-progress-bar-corner-radius);--spectrum-progressbar-fill-size-indeterminate:var(--system-progress-bar-fill-size-indeterminate);--spectrum-progressbar-size-2400:var(--system-progress-bar-size-2400);--spectrum-progressbar-size-2500:var(--system-progress-bar-size-2500);--spectrum-progressbar-size-2800:var(--system-progress-bar-size-2800);--spectrum-progressbar-line-height-cjk:var(--system-progress-bar-line-height-cjk);--spectrum-progressbar-min-size:var(--system-progress-bar-min-size);--spectrum-progressbar-max-size:var(--system-progress-bar-max-size);--spectrum-progressbar-line-height:var(--system-progress-bar-line-height);--spectrum-progressbar-spacing-label-to-progressbar:var(--system-progress-bar-spacing-label-to);--spectrum-progressbar-spacing-label-to-text:var(--system-progress-bar-spacing-label-to-text);--spectrum-progressbar-text-color:var(--system-progress-bar-text-color);--spectrum-progressbar-track-color:var(--system-progress-bar-track-color);--spectrum-progressbar-fill-color:var(--system-progress-bar-fill-color);--spectrum-progressbar-label-and-value-white:var(--system-progress-bar-label-and-value-white);--spectrum-progressbar-track-color-white:var(--system-progress-bar-track-color-white);--spectrum-progressbar-fill-color-white:var(--system-progress-bar-fill-color-white);--spectrum-progressbar-size-default:var(--system-progress-bar-size-default);--spectrum-progressbar-font-size:var(--system-progress-bar-font-size);--spectrum-progressbar-thickness:var(--system-progress-bar-thickness);--spectrum-progressbar-spacing-top-to-text:var(--system-progress-bar-spacing-top-to-text)}:host{--spectrum-progressbar-size-default:var(--system-progress-bar-size-m-size-default);--spectrum-progressbar-font-size:var(--system-progress-bar-size-m-font-size);--spectrum-progressbar-thickness:var(--system-progress-bar-size-m-thickness);--spectrum-progressbar-spacing-top-to-text:var(--system-progress-bar-size-m-spacing-top-to-text)}:host([size=s]){--spectrum-progressbar-size-default:var(--system-progress-bar-size-s-size-default);--spectrum-progressbar-font-size:var(--system-progress-bar-size-s-font-size);--spectrum-progressbar-thickness:var(--system-progress-bar-size-s-thickness);--spectrum-progressbar-spacing-top-to-text:var(--system-progress-bar-size-s-spacing-top-to-text)}:host([size=l]){--spectrum-progressbar-size-default:var(--system-progress-bar-size-l-size-default);--spectrum-progressbar-font-size:var(--system-progress-bar-size-l-font-size);--spectrum-progressbar-thickness:var(--system-progress-bar-size-l-thickness);--spectrum-progressbar-spacing-top-to-text:var(--system-progress-bar-size-l-spacing-top-to-text)}:host([size=xl]){--spectrum-progressbar-size-default:var(--system-progress-bar-size-xl-size-default);--spectrum-progressbar-font-size:var(--system-progress-bar-size-xl-font-size);--spectrum-progressbar-thickness:var(--system-progress-bar-size-xl-thickness);--spectrum-progressbar-spacing-top-to-text:var(--system-progress-bar-size-xl-spacing-top-to-text)}.fill{width:100%;transform-origin:0}:host([dir=rtl]) .fill{transform-origin:100%}@keyframes indeterminate-loop-ltr{0%{transform:translate(-100%)}to{transform:translate(var(--spectrum-progressbar-size-default))}}@keyframes indeterminate-loop-rtl{0%{transform:translate(100%)}to{transform:translate(calc(var(--spectrum-progressbar-size-default)*-1))}}
`;var ci=Object.defineProperty,di=Object.getOwnPropertyDescriptor,oe=(r,e,t,a)=>{for(var i=a>1?void 0:a?di(e,t):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=(a?s(e,t,i):s(i))||i);return a&&i&&ci(e,t,i),i};class K extends pe(Tt(Ie,""),{noDefaultSize:!0}){constructor(){super(...arguments),this.indeterminate=!1,this.label="",this.languageResolver=new Ht(this),this._overBackground=!1,this.sideLabel=!1,this.progress=0}static get styles(){return[li]}get overBackground(){return this._overBackground?"over-background":""}set overBackground(e){e===!0&&(this.removeAttribute("over-background"),this.staticColor="white")}render(){return u`
            ${this.slotHasContent||this.label?u`
                      <sp-field-label size=${this.size} class="label">
                          ${this.slotHasContent?u``:this.label}

                          <slot @slotchange=${this.handleSlotchange}></slot>
                      </sp-field-label>
                  `:u``}
            ${this.label?u`
                      ${this.indeterminate?L:u`
                                <sp-field-label
                                    size=${this.size}
                                    class="percentage"
                                >
                                    ${new Intl.NumberFormat(this.languageResolver.language,{style:"percent",unitDisplay:"narrow"}).format(this.progress/100)}
                                </sp-field-label>
                            `}
                  `:L}
            <div class="track">
                <div
                    class="fill"
                    style="transform: scaleX(calc(${this.progress} / 100));"
                ></div>
            </div>
        `}handleSlotchange(){const e=aa(this.label,this.slotEl);e&&(this.label=e)}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("role")||this.setAttribute("role","progressbar")}updated(e){super.updated(e),e.has("indeterminate")&&(this.indeterminate?(this.removeAttribute("aria-valuemin"),this.removeAttribute("aria-valuemax"),this.removeAttribute("aria-valuenow")):(this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax","100"))),!this.indeterminate&&e.has("progress")&&this.setAttribute("aria-valuenow",""+this.progress),e.has("label")&&(this.label.length?this.setAttribute("aria-label",this.label):e.get("label")===this.getAttribute("aria-label")&&this.removeAttribute("aria-label"))}}oe([f({type:Boolean,reflect:!0})],K.prototype,"indeterminate",2),oe([f({type:String,reflect:!0})],K.prototype,"label",2),oe([f({type:Boolean,attribute:"over-background"})],K.prototype,"overBackground",1),oe([f({type:Boolean,reflect:!0,attribute:"side-label"})],K.prototype,"sideLabel",2),oe([f({type:Number})],K.prototype,"progress",2),oe([f({reflect:!0,attribute:"static-color"})],K.prototype,"staticColor",2),oe([O("slot")],K.prototype,"slotEl",2);z("sp-progress-bar",K);async function ui(r,e){const t=await createImageBitmap(r),a=document.createElement("canvas"),{width:i,height:n}=t;a.width=i,a.height=n;const s=a.getContext("2d");s.drawImage(t,0,0);const c=s.getImageData(0,0,i,n);return e(c.data,i,n),s.putImageData(c,0,0),new Promise(l=>{a.toBlob(d=>{if(d)return l(d);throw new Error("failed to create mask")})})}function pi(r){return ui(r,(e,t,a)=>{for(let i=0;i<t*a*4;i+=4)e[i+3]=Math.ceil((e[i]+e[i+1]+e[i+2])/3)})}const hi="https://sensei.adobe.io/anonymous/v2/predict";async function mi({source:r,signal:e}){const t={"dc:format":r.type,"sensei:multipart_field_name":"input_image"},a={"sensei:name":"ImageCutout V4 on Sensei","sensei:invocation_mode":"synchronous","sensei:invocation_batch":!1,"sensei:in_response":!1,"sensei:engines":[{"sensei:execution_info":{"sensei:engine":"Feature:autocrop:Service-e4c2aec8002943a797840574eab514eb"},"sensei:inputs":{image_in:t},"sensei:params":{mode:"mask",mask_format:"image/png"},"sensei:outputs":{masks_out:{"dc:format":"image/png","sensei:multipart_field_name":"outfile"},metadata_out:{"dc:format":"application/json","sensei:multipart_field_name":"metadata"}}}]},i=new FormData;return i.append("contentAnalyzerRequests",JSON.stringify(a)),i.append("input_image",r),(await(await fetch(hi,{method:"POST",headers:{"x-api-key":"photoshop-extension",Prefer:"respond-sync, wait=10",Accept:"multipart/form-data","x-analyzer-id":"h"},body:i,signal:e})).formData()).get("outfile0")}const se=navigator.userAgentData.platform==="macOS",fi=new Set(["number","text","search","email","tel","url","password"]);function zr(r){const e=(r??document).activeElement;return e?.shadowRoot?zr(e.shadowRoot):e}function gi(){const r=zr();return!!(r instanceof HTMLTextAreaElement||r instanceof HTMLInputElement&&fi.has(r.type))}const Ee=(r=!1,e=!0)=>se?`⌘${r?" + ":""}`:`Ctrl${e?" + ":""}`;class bi extends EventTarget{constructor(e,t,a){super(),this.rendering=!1,this.queue=!1,this.width=0,this.height=0,this.bridge=e,this.supportedParams=new Map,this.supportedParams.set("Exposure2012",{offset:0}),this.supportedParams.set("Saturation",{offset:8}),this.supportedParams.set("Dehaze",{offset:73}),this.width=t,this.height=a}async doRender(){this.rendering=!0;const e=await this.render();this.dispatchEvent(new CustomEvent("pixels",{detail:e})),this.rendering=!1}queueRender(){this.rendering?this.queue=!0:(this.queue=!1,this.doRender().then(()=>{this.queue&&(this.queue=!1,this.doRender())}))}final(){this.queue=!1,this.doRender()}setParameter(e,t){const a=this.supportedParams.get(e);if(!a)throw new Error("bad name");this.bridge.setParameterValue(a.offset,t)}async reset(){await this.bridge.reset(!1),this.final()}async setAutoTone(){await this.bridge.setAutoTone(),this.final()}async readNewImage(e){const t=await this.bridge.getParameterValues(),a=new Int32Array(t);if(!await this.bridge.readImage(e))throw new Error("failed to open image");await this.bridge.setSettings("");const[n,s]=new Int32Array(await this.bridge.getImageArea());this.width=n,this.height=s,await this.bridge.setParameterValues(a.map((c,l)=>l).buffer,a.buffer),this.final()}async setAutoCropAngle(){await this.bridge.setAutoCropAngle();const[e,t]=new Float64Array(await this.bridge.getCropDimensions());this.width=e,this.height=t,this.final()}async setAutoGeometry(){await this.bridge.setUprightMode(1),await this.bridge.setCropConstrainToWarp(!0);const[e,t]=new Float64Array(await this.bridge.getCropDimensions());this.width=e,this.height=t,this.final()}handleParameterInput(e,t){this.setParameter(e,t),this.queueRender()}handleParameterChange(e,t){this.setParameter(e,t),this.final()}async render(){const t=await this.bridge.renderCurrent(0,!1,0,!1);if(t.length===0)throw new Error("empty render");const a=t[0],i=new ImageData(this.width,this.height);return i.data.set(new Uint8ClampedArray(a)),createImageBitmap(i)}}const vi=$`
    slot[name=longpress-describedby-descriptor]{display:none}
`;var yi=Object.defineProperty,W=(r,e,t,a)=>{for(var i=void 0,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=s(e,t,i)||i);return i&&yi(e,t,i),i};class q extends Ie{constructor(){super(...arguments),this.offset=6,this.disabled=!1,this.receivesFocus="auto",this.clickContent=[],this.longpressContent=[],this.hoverContent=[],this.targetContent=[]}static get styles(){return[vi]}getAssignedElementsFromSlot(e){return e.assignedElements({flatten:!0})}handleTriggerContent(e){this.targetContent=this.getAssignedElementsFromSlot(e.target)}handleSlotContent(e){switch(e.target.name){case"click-content":this.clickContent=this.getAssignedElementsFromSlot(e.target);break;case"longpress-content":this.longpressContent=this.getAssignedElementsFromSlot(e.target);break;case"hover-content":this.hoverContent=this.getAssignedElementsFromSlot(e.target);break}}handleBeforetoggle(e){const{target:t}=e;let a;if(t===this.clickOverlayElement)a="click";else if(t===this.longpressOverlayElement)a="longpress";else if(t===this.hoverOverlayElement)a="hover";else return;e.newState==="open"?this.open=a:this.open===a&&(this.open=void 0)}update(e){var t,a,i,n,s,c;e.has("clickContent")&&(this.clickPlacement=((t=this.clickContent[0])==null?void 0:t.getAttribute("placement"))||((a=this.clickContent[0])==null?void 0:a.getAttribute("direction"))||void 0),e.has("hoverContent")&&(this.hoverPlacement=((i=this.hoverContent[0])==null?void 0:i.getAttribute("placement"))||((n=this.hoverContent[0])==null?void 0:n.getAttribute("direction"))||void 0),e.has("longpressContent")&&(this.longpressPlacement=((s=this.longpressContent[0])==null?void 0:s.getAttribute("placement"))||((c=this.longpressContent[0])==null?void 0:c.getAttribute("direction"))||void 0),super.update(e)}renderSlot(e){return u`
            <slot name=${e} @slotchange=${this.handleSlotContent}></slot>
        `}renderClickOverlay(){var e;const t=this.renderSlot("click-content"),a=u`
            <sp-overlay
                id="click-overlay"
                ?disabled=${this.disabled||!this.clickContent.length}
                ?open=${this.open==="click"&&!!this.clickContent.length}
                .offset=${this.offset}
                .placement=${this.clickPlacement||this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${"click"}
                .type=${this.type!=="modal"?"auto":"modal"}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${t}
            </sp-overlay>
        `;return(e=this.triggeredBy)!=null&&e.includes("click")||this.clickContent.length?a:t}renderHoverOverlay(){var e;const t=this.renderSlot("hover-content"),a=u`
            <sp-overlay
                id="hover-overlay"
                ?open=${this.open==="hover"&&!!this.hoverContent.length}
                ?disabled=${this.disabled||!this.hoverContent.length||!!this.open&&this.open!=="hover"}
                .offset=${this.offset}
                .placement=${this.hoverPlacement||this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${"hover"}
                .type=${"hint"}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${t}
            </sp-overlay>
        `;return(e=this.triggeredBy)!=null&&e.includes("hover")||this.hoverContent.length?a:t}renderLongpressOverlay(){var e;const t=this.renderSlot("longpress-content"),a=u`
            <sp-overlay
                id="longpress-overlay"
                ?disabled=${this.disabled||!this.longpressContent.length}
                ?open=${this.open==="longpress"&&!!this.longpressContent.length}
                .offset=${this.offset}
                .placement=${this.longpressPlacement||this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${"longpress"}
                .type=${"auto"}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${t}
            </sp-overlay>
            <slot name="longpress-describedby-descriptor"></slot>
        `;return(e=this.triggeredBy)!=null&&e.includes("longpress")||this.longpressContent.length?a:t}render(){return u`
            <slot
                id="trigger"
                name="trigger"
                @slotchange=${this.handleTriggerContent}
            ></slot>
            ${[this.renderClickOverlay(),this.renderHoverOverlay(),this.renderLongpressOverlay()]}
        `}updated(e){if(super.updated(e),this.disabled&&e.has("disabled")){this.open=void 0;return}}async getUpdateComplete(){return await super.getUpdateComplete()}}W([f({attribute:"triggered-by"})],q.prototype,"triggeredBy"),W([f({reflect:!0})],q.prototype,"placement"),W([f()],q.prototype,"type"),W([f({type:Number})],q.prototype,"offset"),W([f({reflect:!0})],q.prototype,"open"),W([f({type:Boolean,reflect:!0})],q.prototype,"disabled"),W([f({attribute:"receives-focus"})],q.prototype,"receivesFocus"),W([X()],q.prototype,"clickContent"),W([X()],q.prototype,"longpressContent"),W([X()],q.prototype,"hoverContent"),W([X()],q.prototype,"targetContent"),W([O("#click-overlay",!0)],q.prototype,"clickOverlayElement"),W([O("#longpress-overlay",!0)],q.prototype,"longpressOverlayElement"),W([O("#hover-overlay",!0)],q.prototype,"hoverOverlayElement");const _r=Symbol("Comlink.proxy"),wi=Symbol("Comlink.endpoint"),ki=Symbol("Comlink.releaseProxy"),wt=Symbol("Comlink.finalizer"),Ze=Symbol("Comlink.thrown"),Pr=r=>typeof r=="object"&&r!==null||typeof r=="function",xi={canHandle:r=>Pr(r)&&r[_r],serialize(r){const{port1:e,port2:t}=new MessageChannel;return Mr(r,e),[t,[t]]},deserialize(r){return r.start(),Er(r)}},Ci={canHandle:r=>Pr(r)&&Ze in r,serialize({value:r}){let e;return r instanceof Error?e={isError:!0,value:{message:r.message,name:r.name,stack:r.stack}}:e={isError:!1,value:r},[e,[]]},deserialize(r){throw r.isError?Object.assign(new Error(r.value.message),r.value):r.value}},$r=new Map([["proxy",xi],["throw",Ci]]);function zi(r,e){for(const t of r)if(e===t||t==="*"||t instanceof RegExp&&t.test(e))return!0;return!1}function Mr(r,e=globalThis,t=["*"]){e.addEventListener("message",function a(i){if(!i||!i.data)return;if(!zi(t,i.origin)){console.warn(`Invalid origin '${i.origin}' for comlink proxy`);return}const{id:n,type:s,path:c}=Object.assign({path:[]},i.data),l=(i.data.argumentList||[]).map(le);let d;try{const p=c.slice(0,-1).reduce((b,g)=>b[g],r),h=c.reduce((b,g)=>b[g],r);switch(s){case"GET":d=h;break;case"SET":p[c.slice(-1)[0]]=le(i.data.value),d=!0;break;case"APPLY":d=h.apply(p,l);break;case"CONSTRUCT":{const b=new h(...l);d=Ei(b)}break;case"ENDPOINT":{const{port1:b,port2:g}=new MessageChannel;Mr(r,g),d=Si(b,[b])}break;case"RELEASE":d=void 0;break;default:return}}catch(p){d={value:p,[Ze]:0}}Promise.resolve(d).catch(p=>({value:p,[Ze]:0})).then(p=>{const[h,b]=it(p);e.postMessage(Object.assign(Object.assign({},h),{id:n}),b),s==="RELEASE"&&(e.removeEventListener("message",a),Sr(e),wt in r&&typeof r[wt]=="function"&&r[wt]())}).catch(p=>{const[h,b]=it({value:new TypeError("Unserializable return value"),[Ze]:0});e.postMessage(Object.assign(Object.assign({},h),{id:n}),b)})}),e.start&&e.start()}function _i(r){return r.constructor.name==="MessagePort"}function Sr(r){_i(r)&&r.close()}function Er(r,e){const t=new Map;return r.addEventListener("message",function(i){const{data:n}=i;if(!n||!n.id)return;const s=t.get(n.id);if(s)try{s(n)}finally{t.delete(n.id)}}),$t(r,t,[],e)}function Fe(r){if(r)throw new Error("Proxy has been released and is not useable")}function jr(r){return be(r,new Map,{type:"RELEASE"}).then(()=>{Sr(r)})}const rt=new WeakMap,at="FinalizationRegistry"in globalThis&&new FinalizationRegistry(r=>{const e=(rt.get(r)||0)-1;rt.set(r,e),e===0&&jr(r)});function Pi(r,e){const t=(rt.get(e)||0)+1;rt.set(e,t),at&&at.register(r,e,r)}function $i(r){at&&at.unregister(r)}function $t(r,e,t=[],a=function(){}){let i=!1;const n=new Proxy(a,{get(s,c){if(Fe(i),c===ki)return()=>{$i(n),jr(r),e.clear(),i=!0};if(c==="then"){if(t.length===0)return{then:()=>n};const l=be(r,e,{type:"GET",path:t.map(d=>d.toString())}).then(le);return l.then.bind(l)}return $t(r,e,[...t,c])},set(s,c,l){Fe(i);const[d,p]=it(l);return be(r,e,{type:"SET",path:[...t,c].map(h=>h.toString()),value:d},p).then(le)},apply(s,c,l){Fe(i);const d=t[t.length-1];if(d===wi)return be(r,e,{type:"ENDPOINT"}).then(le);if(d==="bind")return $t(r,e,t.slice(0,-1));const[p,h]=or(l);return be(r,e,{type:"APPLY",path:t.map(b=>b.toString()),argumentList:p},h).then(le)},construct(s,c){Fe(i);const[l,d]=or(c);return be(r,e,{type:"CONSTRUCT",path:t.map(p=>p.toString()),argumentList:l},d).then(le)}});return Pi(n,r),n}function Mi(r){return Array.prototype.concat.apply([],r)}function or(r){const e=r.map(it);return[e.map(t=>t[0]),Mi(e.map(t=>t[1]))]}const Rr=new WeakMap;function Si(r,e){return Rr.set(r,e),r}function Ei(r){return Object.assign(r,{[_r]:!0})}function ji(r,e=globalThis,t="*"){return{postMessage:(a,i)=>r.postMessage(a,t,i),addEventListener:e.addEventListener.bind(e),removeEventListener:e.removeEventListener.bind(e)}}function it(r){for(const[e,t]of $r)if(t.canHandle(r)){const[a,i]=t.serialize(r);return[{type:"HANDLER",name:e,value:a},i]}return[{type:"RAW",value:r},Rr.get(r)||[]]}function le(r){switch(r.type){case"HANDLER":return $r.get(r.name).deserialize(r.value);case"RAW":return r.value}}function be(r,e,t,a){return new Promise(i=>{const n=Ri();e.set(n,i),r.start&&r.start(),r.postMessage(Object.assign({id:n},t),a)})}function Ri(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}function Di(r,e,t){return Er(ji(r,e,t))}function Ai(r,e,t,a,i,n){return new Promise((s,c)=>{const l=b=>{c(new Error(b))},d=new URL(r);d.searchParams.append("origin",document.location.origin);const p=document.createElement("iframe");if(!p){l("could not create proxy iframe");return}p.style.display="none";const h=new AbortController;window.addEventListener("message",async b=>{if(b.source!==p.contentWindow)return;if(b.data===t){l("proxy denied"),h.abort();return}if(b.data!==a)return;if(!p.contentWindow){l("proxyFrame.contentWindow null"),h.abort();return}const g=Di(p.contentWindow,window,d.origin),v=crypto.randomUUID();await g.set(v,i);const{analytics:w}=ze(),k=new URL(e);k.pathname="id",k.searchParams.append("docSource","browser-extension"),k.searchParams.append("method","image-handoff"),k.searchParams.append("docid",v),k.searchParams.append("sdid",w.sdid),k.searchParams.append("mv",w.mv),n?.workflow&&k.searchParams.append("extWorkflow",n.workflow),(n?.removeProxyFrame??!0)&&p.remove(),s(k),h.abort()},{signal:h.signal}),p.src=d.href,document.body.appendChild(p)})}async function Ti(r,e){const t="https://photoshop.adobe.com",a=`${t}/embed-content-proxy.html`;return await Ai(a,t,"psweb-embed-content-proxy-denied","psweb-embed-content-proxy-ready",r,{...e?.workflow&&{workflow:e.workflow}})}const Bi=ze();async function Li(r){const e=new FormData;e.append("file",r);const t=await fetch(`${Bi.pylon.host}/upload/image`,{method:"POST",body:e});if(!t.ok)throw new Error(`Failed to upload image: ${t.statusText}`);return(await t.json()).signedUrl}z("sp-icon",Ge);var Ii=Object.defineProperty,Hi=Object.getOwnPropertyDescriptor,Ot=(r,e,t,a)=>{for(var i=a>1?void 0:a?Hi(e,t):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=(a?s(e,t,i):s(i))||i);return a&&i&&Ii(e,t,i),i};const Oi=({width:r=25,height:e=25,hidden:t=!0,title:a=""}={})=>u`<svg
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="${t?"true":"false"}"
		aria-label="${a}"
		role="img"
		width="${r}"
		height="${e}"
		viewBox="0 0 25 25"
	>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M0.0812658 3.19386C0.0279822 3.45425 0 3.72386 0 4V21C0 23.2091 1.79086 25 4 25V4L25 4C25 1.79086 23.2091 0 21 0H4C2.067 0 0.454251 1.37113 0.0812658 3.19386Z"
			fill="currentColor"
		/>
	</svg>`;let nt=class extends Y{constructor(){super(...arguments),this.corner="tl",this.hidden=!1}static get styles(){return[$`
				:host {
					display: block;
					color: white; // var(--spectrum-gray-50);
				}
				/* add padding for touch targets */
				#container {
					padding: 3px;
					position: relative;
				}
				sp-icon {
					position: relative;
				}
				:host([corner='tr']),
				:host([corner='bl']) {
					cursor: nesw-resize;
				}
				:host([corner='tl']),
				:host([corner='br']) {
					cursor: nwse-resize;
				}
				:host([corner='tl']) {
					transform-origin: top left;
				}
				:host([corner='bl']) {
					transform-origin: bottom left;
				}
				:host([corner='tr']) {
					transform-origin: top right;
				}
				:host([corner='br']) {
					transform-origin: bottom right;
				}
				:host([corner='tl']) .corner-handle {
					top: var(--corner-offset);
					left: var(--corner-offset);
				}
				:host([corner='tr']) .corner-handle {
					transform: scale(-1, 1);
					top: var(--corner-offset);
					right: var(--corner-offset);
				}
				:host([corner='bl']) .corner-handle {
					transform: scale(1, -1);
					bottom: var(--corner-offset);
					left: var(--corner-offset);
				}
				:host([corner='br']) .corner-handle {
					transform: scale(-1, -1);
					bottom: var(--corner-offset);
					right: var(--corner-offset);
				}
				.mini-handle {
					width: 10px;
					height: 10px;
					border-radius: 100%;
					border: solid 2px white;
					background: white;
				}
			`]}render(){return u`<div class="corner-handle" id="container">
			${de(!this.hidden,()=>u`${Oi({width:30,height:30})}`)}
		</div>`}};Ot([f({type:String,reflect:!0})],nt.prototype,"corner",2);Ot([f({type:Boolean})],nt.prototype,"hidden",2);nt=Ot([Q("corner-handle")],nt);var qi=Object.defineProperty,Fi=Object.getOwnPropertyDescriptor,qt=(r,e,t,a)=>{for(var i=a>1?void 0:a?Fi(e,t):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=(a?s(e,t,i):s(i))||i);return a&&i&&qi(e,t,i),i};const Wi=({width:r=25,height:e=4,hidden:t=!0,title:a=""}={})=>u`<svg
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="${t?"true":"false"}"
		aria-label="${a}"
		role="img"
		width="${r}"
		height="${e}"
		viewBox="0 0 25 4"
	>
		<path
			d="M21 -1.74846e-07C23.2091 -7.82811e-08 25 1.79086 25 4V4L-1.74846e-07 4V4C-7.8281e-08 1.79086 1.79086 -1.0145e-06 4 -9.17939e-07L21 -1.74846e-07Z"
			fill="currentColor"
		/>
	</svg> `;let ot=class extends Y{constructor(){super(...arguments),this.side="t",this.hidden=!1}static get styles(){return[$`
				:host {
					display: block;
					color: white; // var(--spectrum-gray-50);
				}
				/* add padding for touch targets */
				#container {
					padding: 3px;
					position: relative;
				}
				sp-icon {
					position: relative;
				}
				:host([side='t']),
				:host([side='b']) {
					cursor: ns-resize;
				}
				:host([side='l']),
				:host([side='r']) {
					cursor: ew-resize;
				}
				:host([side='t']) .container {
					transform: translate(0px, -12.5px);
				}
				:host([side='r']) .container {
					transform: rotate(90deg) translate(0px, -10.5px);
				}
				:host([side='b']) .container {
					bottom: var(--bottom-offset);
					transform: scale(1, -1) translate(0px, -12.5px);
				}
				:host([side='l']) .container {
					transform: rotate(-90deg) translate(0px, -10.5px);
				}
			`]}render(){return u`<div class="container" id="container">
			${de(!this.hidden,()=>u`${Wi({width:30,height:30})}`)}
		</div>`}};qt([f({type:String,reflect:!0})],ot.prototype,"side",2);qt([f({type:Boolean})],ot.prototype,"hidden",2);ot=qt([Q("side-handle")],ot);class Vi extends fr{constructor(e){if(super(e),this.start=(t,a)=>this.options.disabled||this.startPointer?!1:(a.preventDefault(),a.stopPropagation(),this.options.onStart?.({draggable:this,target:a.target||void 0,element:this.element,clientX0:t.clientX,clientY0:t.clientY,x0:t.pageX,y0:t.pageY},this.options.data),this.startPointer=t,!0),this.move=(t,a,i)=>{if(!(!this.element||!this.startPointer)){i.preventDefault(),i.stopPropagation();for(const n of a){const s=t.find(c=>c.id===n.id);s&&this.options.onMove?.({draggable:this,target:i.target||void 0,element:this.element,clientX0:this.startPointer.clientX,clientY0:this.startPointer.clientY,x0:this.startPointer.pageX,y0:this.startPointer.pageY,dx0:n.pageX-this.startPointer.pageX,dy0:n.pageY-this.startPointer.pageY,dx:n.pageX-s.pageX,dy:n.pageY-s.pageY,shiftKey:i.shiftKey},this.options.data)}}},this.end=(t,a,i)=>{this.startPointer&&(this.options.onEnd?.({draggable:this,target:a.target||void 0,element:this.element,clientX0:this.startPointer.clientX,clientY0:this.startPointer.clientY,x0:this.startPointer.pageX,y0:this.startPointer.pageY,dx0:t.pageX-this.startPointer.pageX,dy0:t.pageY-this.startPointer.pageY,cancelled:i},this.options.data),this.startPointer=void 0)},e.type!==ee.ELEMENT)throw new Error("The `draggable` directive must be used in element position.")}render(e){return this.options=e,L}update(e,[t]){return this.element===void 0&&(this.element=e.element,this.tracker=new tt(this.element,{start:this.start,move:this.move,end:this.end})),this.render(t)}reconnected(){this.tracker=new tt(this.element,{start:this.start,move:this.move,end:this.end})}disconnected(){this.tracker?.stop()}}const Ni=dt(Vi);var Gi=Object.defineProperty,Ui=Object.getOwnPropertyDescriptor,ut=(r,e,t,a)=>{for(var i=a>1?void 0:a?Ui(e,t):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=(a?s(e,t,i):s(i))||i);return a&&i&&Gi(e,t,i),i};class Qi extends Event{constructor(e){super("resize-start",{bubbles:!0,composed:!0}),this.handle=e}}class Zi extends Event{constructor(e){super("resize-end",{bubbles:!0,composed:!0}),this.handle=e}}class Xi extends Event{constructor(e,t,a,i){super("resize",{bubbles:!0,composed:!0}),this.delta=e,this.deltaOrigin=t,this.shiftKey=a,this.handle=i}}let Te=class extends Y{constructor(){super(...arguments),this.dragging=!1,this.cornerDraggable=Ni({onStart:r=>{this.dispatchEvent(new Qi(this.getHandleId(r))),this.dragging=!0},onMove:r=>{const e={x1:0,y1:0,x2:0,y2:0},t={x1:0,y1:0,x2:0,y2:0},a=this.getHandleId(r);switch(a){case"t":e.y1=r.dy,t.y1=r.dy0;break;case"r":e.x2=r.dx,t.x2=r.dx0;break;case"b":e.y2=r.dy,t.y2=r.dy0;break;case"l":e.x1=r.dx,t.x1=r.dx0;break;case"tl":e.x1=r.dx,e.y1=r.dy,t.x1=r.dx0,t.y1=r.dy0;break;case"tr":e.x2=r.dx,e.y1=r.dy,t.x2=r.dx0,t.y1=r.dy0;break;case"bl":e.x1=r.dx,e.y2=r.dy,t.x1=r.dx0,t.y2=r.dy0;break;case"br":e.x2=r.dx,e.y2=r.dy,t.x2=r.dx0,t.y2=r.dy0;break}this.dispatchEvent(new Xi(e,t,r.shiftKey,a))},onEnd:r=>{this.dispatchEvent(new Zi(this.getHandleId(r))),this.dragging=!1}}),this.width=0,this.height=0}static get styles(){return[$`
				:host {
					--handle-px-size: 15px;
					--handle-size: calc(var(--handle-px-size) / var(--camera-scale));
					--handle-offset: calc(
						-1 * (var(--handle-px-size) / 2 + 1px) / var(--camera-scale)
					); /* 1px for border */
				}
			`,$`
				:host {
					--border-width: 0.75px;
					--outline-width: 0.25px;
					display: grid;
					box-sizing: border-box;
					pointer-events: none;
					grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
					grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
					grid-template-areas:
						'top-left . top . top-right'
						'. . . . .'
						'left . . . right'
						'. . . . .'
						'bottom-left . bottom . bottom-right';
					box-shadow:
						0 0 0 calc(var(--border-width) / var(--camera-scale)) white,
						0 0 0
							calc(
								(var(--border-width) + var(--outline-width)) /
									var(--camera-scale)
							)
							rgba(0, 0, 0, 0.8),
						0 0 0 calc(400vh / var(--camera-scale))
							var(--spectrum-transparent-black-300);
				}
				side-handle,
				corner-handle {
					position: absolute;
					pointer-events: all;
				}
				#handleT {
					grid-area: top;
					align-self: start;
					justify-self: center;
					transform: scale(calc(1 / var(--camera-scale)));
					transform-origin: top center;
				}
				#handleR {
					grid-area: right;
					align-self: center;
					justify-self: end;
					transform: scale(calc(1 / var(--camera-scale)));
					transform-origin: center right;
				}
				#handleB {
					grid-area: bottom;
					align-self: end;
					justify-self: center;
					transform: scale(calc(1 / var(--camera-scale)));
					transform-origin: bottom center;
				}
				#handleL {
					grid-area: left;
					align-self: center;
					justify-self: start;
					transform: scale(calc(1 / var(--camera-scale)));
					transform-origin: center left;
				}
				#handleTL {
					grid-area: top-left;
					align-self: start;
					justify-self: start;
					transform: scale(calc(1 / var(--camera-scale)));
				}
				#handleTR {
					grid-area: top-right;
					align-self: start;
					justify-self: end;
					transform: scale(calc(1 / var(--camera-scale)));
				}
				#handleBL {
					grid-area: bottom-left;
					align-self: end;
					justify-self: start;
					transform: scale(calc(1 / var(--camera-scale)));
				}
				#handleBR {
					grid-area: bottom-right;
					align-self: end;
					justify-self: end;
					transform: scale(calc(1 / var(--camera-scale)));
				}
				side-handle[side='t'] {
					top: calc(var(--handle-offset));
				}
				side-handle[side='r'] {
					right: calc(var(--handle-offset));
				}
				side-handle[side='b'] {
					bottom: calc(var(--handle-offset));
				}
				side-handle[side='l'] {
					left: calc(var(--handle-offset));
				}
				corner-handle[corner='tr'] {
					top: var(--handle-offset);
					right: var(--handle-offset);
				}
				corner-handle[corner='tl'] {
					top: var(--handle-offset);
					left: var(--handle-offset);
				}
				corner-handle[corner='br'] {
					bottom: var(--handle-offset);
					right: var(--handle-offset);
				}
				corner-handle[corner='bl'] {
					bottom: var(--handle-offset);
					left: var(--handle-offset);
				}
				.grid {
					width: calc(100%);
					height: calc(100%);
					display: grid;
					position: absolute;
					grid-template-rows: 1fr 1fr 1fr;
					grid-template-columns: 1fr 1fr 1fr;
					min-width: 0;
					min-height: 0;
					transition: 0.3s ease;
				}
				.box {
					outline-offset: calc(
						calc(var(--border-width) + var(--outline-width)) * -1 /
							var(--camera-scale)
					);
					outline: calc(var(--outline-width) / var(--camera-scale)) solid
						rgba(0, 0, 0, 0.8);
					border: calc(var(--border-width) / var(--camera-scale)) solid white;
				}
			`,$`
				:host {
					outline: 99999px solid rgba(0, 0, 0, 0.3);
				}
			`]}getHandleId(r){return{handleT:"t",handleR:"r",handleB:"b",handleL:"l",handleTL:"tl",handleTR:"tr",handleBL:"bl",handleBR:"br"}[r.element.id]}render(){const r=this.width<80||this.height<80,e=this.height<40,t=this.width<40,a=this.width>2&&this.height>2;return u`
			<div class="grid" style=${a?"opacity: 1;":"opacity: 0;"}>
				${Array(9).fill(u`<div class="box"></div>`)}
			</div>
			<corner-handle
				?hidden=${r}
				id="handleTL"
				${this.cornerDraggable}
				corner="tl"
			></corner-handle>
			<side-handle
				?hidden=${t}
				id="handleT"
				${this.cornerDraggable}
				side="t"
			></side-handle>
			<corner-handle
				?hidden=${r}
				id="handleTR"
				${this.cornerDraggable}
				corner="tr"
			></corner-handle>
			<side-handle
				?hidden=${e}
				id="handleR"
				${this.cornerDraggable}
				side="r"
			></side-handle>
			<corner-handle
				?hidden=${r}
				id="handleBR"
				${this.cornerDraggable}
				corner="br"
			></corner-handle>
			<side-handle
				?hidden=${t}
				id="handleB"
				${this.cornerDraggable}
				side="b"
			></side-handle>
			<corner-handle
				?hidden=${r}
				id="handleBL"
				${this.cornerDraggable}
				corner="bl"
			></corner-handle>
			<side-handle
				?hidden=${e}
				id="handleL"
				${this.cornerDraggable}
				side="l"
			></side-handle>
		`}};ut([X()],Te.prototype,"dragging",2);ut([f({type:Number})],Te.prototype,"width",2);ut([f({type:Number})],Te.prototype,"height",2);Te=ut([Q("resize-overlay")],Te);var Yi=Object.defineProperty,Ki=Object.getOwnPropertyDescriptor,Ft=(r,e,t,a)=>{for(var i=a>1?void 0:a?Ki(e,t):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=(a?s(e,t,i):s(i))||i);return a&&i&&Yi(e,t,i),i};let Be=class extends He{constructor(){super(...arguments),this.isResizing=!1,this.startingOutpaintRect=null}onOutpaintResizeStart(){this.isResizing=!0,this.startingOutpaintRect={x:o.canvas.outpaintRect.x,y:o.canvas.outpaintRect.y,w:o.canvas.outpaintRect.w,h:o.canvas.outpaintRect.h}}onOutpaintResize(r){const{x:e,y:t,w:a,h:i}=o.canvas.outpaintRect,n=Ji({event:r,cameraScale:o.zoom}),s=en({event:r,cameraScale:o.zoom}),{newOutpaintRect:c}=tn({originDelta:s,outpaintRect:{x:e,y:t},originOutpaintRect:this.startingOutpaintRect,lockAspectRatio:r.shiftKey||o.cropPreserveAspectRatio,handle:r.handle,minSize:1,documentRect:o.canvas.documentRect,snapThreshold:10/o.zoom});this.setCropRegion({desiredX:c.x,desiredY:c.y,desiredW:c.w,desiredH:c.h,keepViewportPosition:!1},n)}onOutpaintResizeEnd(){y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"success","event.subtype":"width","event.value":"updated-value","ui.view_type":"toolbar-properties"}),y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"success","event.subtype":"height","event.value":"updated-value","ui.view_type":"toolbar-properties"}),this.isResizing=!1}setCropRegion({desiredX:r,desiredY:e,desiredW:t,desiredH:a,keepViewportPosition:i=!1},n){const s=Math.round(r),c=Math.round(e),l=Math.round(t),d=Math.round(a),p=s-o.canvas.outpaintRect.x,h=c-o.canvas.outpaintRect.y;o.canvas.outpaintRect.w=l,o.canvas.outpaintRect.h=d,o.canvas.outpaintRect.x=s,o.canvas.outpaintRect.y=c,i?this.camera.pan(p,h):this.camera.pan((n.x+n.w)/2*o.zoom,(n.y+n.h)/2*o.zoom)}render(){const r=ke({width:`${o.canvas.outpaintRect.w}px`,height:`${o.canvas.outpaintRect.h}px`,transform:`translate(${o.canvas.outpaintRect.x}px, ${o.canvas.outpaintRect.y}px)`});return u`<resize-overlay
			style=${r}
			@resize-start=${()=>this.onOutpaintResizeStart()}
			@resize=${e=>this.onOutpaintResize(e)}
			@resize-end=${()=>this.onOutpaintResizeEnd()}
			.width=${o.canvas.outpaintRect.w*o.zoom}
			.height=${o.canvas.outpaintRect.h*o.zoom}
		></resize-overlay>`}};Be.styles=$`
		:host {
			display: contents;
		}

		resize-overlay {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1000;
		}
	`;Ft([f({type:Boolean})],Be.prototype,"isResizing",2);Ft([f({attribute:!1})],Be.prototype,"camera",2);Be=Ft([Q("psx-crop-tool")],Be);function Ji({event:r,cameraScale:e}){const t=r.delta.x1*2/e,a=r.delta.y1*2/e,i=r.delta.x2*2/e,n=r.delta.y2*2/e;return{x:t,y:a,w:i,h:n}}function en({event:r,cameraScale:e}){const t=r.deltaOrigin.x1*2/e,a=r.deltaOrigin.y1*2/e,i=r.deltaOrigin.x2*2/e,n=r.deltaOrigin.y2*2/e;return{x:t,y:a,w:i,h:n}}function tn({originDelta:r,outpaintRect:e,originOutpaintRect:t,lockAspectRatio:a,handle:i,minSize:n=50,documentRect:s,snapThreshold:c=0}){let l=t.x+r.x,d=t.y+r.y,p=t.w+r.w-r.x,h=t.h+r.h-r.y;if(Math.abs(l)<c&&l!==0){const g=l;l=0,p+=g}if(Math.abs(d)<c){const g=d;d=0,h+=g}if(Math.abs(l+p-s.w)<c){const g=s.w-(l+p);p+=g}if(Math.abs(d+h-s.h)<c){const g=s.h-(d+h);h+=g}if(a){const g=t.w/t.h;if(i==="tl"){const v=r.x*((r.x+r.y)/(r.x+r.x/g))||0,w=v/g;if(l=t.x+v,d=t.y+w,p=t.w-v,h=t.h-w,Math.abs(l)<c){const k=l;l=0,p+=k;const C=p/g-h;h+=C,d-=C}else if(Math.abs(d)<c){const k=d;d=0,h+=k;const C=h*g-p;p+=C,l-=C}}else if(i==="tr"){const v=-r.w*(-r.w+r.y)/(-r.w+-r.w/g)||0,w=v/g;if(l=t.x,d=t.y+w,p=t.w-v,h=t.h-w,Math.abs(l+p-s.w)<c){const k=s.w-(l+p);p+=k;const C=p/g-h;h+=C,d-=C}else if(Math.abs(d)<c){const k=d;d=0,h+=k;const C=h*g-p;p+=C}}else if(i==="bl"){const v=r.x*((r.x-r.h)/(r.x+r.x/g))||0,w=v/g;if(l=t.x+v,d=t.y,p=t.w-v,h=t.h-w,Math.abs(l)<c){const k=l;l=0,p+=k;const C=p/g-h;h+=C}else if(Math.abs(d+h-s.h)<c){const k=s.h-(d+h);h+=k;const C=h*g-p;p+=C,l-=C}}else if(i==="br"){const v=-r.w*(-r.w-r.h)/(-r.w+-r.w/g)||0,w=v/g;if(l=t.x,d=t.y,p=t.w-v,h=t.h-w,Math.abs(l+p-s.w)<c){const k=s.w-(l+p);p+=k;const C=p/g-h;h+=C}else if(Math.abs(d+h-s.h)<c){const k=s.h-(d+h);h+=k;const C=h*g-p;p+=C}}else if(i==="t"){const v=r.y,w=r.y*g;if(l=t.x+w/2,d=t.y+v,p=t.w-w,h=t.h-v,Math.abs(d)<c){const k=d;d=0,h+=k;const C=h*g-p;p+=C,l-=C/2}}else if(i==="b"){const v=-r.h,w=v*g;if(l=t.x+w/2,d=t.y,p=t.w-w,h=t.h-v,Math.abs(d+h-s.h)<c){const k=s.h-(d+h);h+=k;const C=h*g-p;p+=C,l-=C/2}}else if(i==="l"){const v=r.x,w=r.x/g;if(l=t.x+v,d=t.y+w/2,p=t.w-v,h=t.h-w,Math.abs(l)<c){const k=l;l=0,p+=k;const C=p/g-h;h+=C,d-=C/2}}else if(i==="r"){const v=-r.w,w=v/g;if(l=t.x,d=t.y+w/2,p=t.w-v,h=t.h-w,Math.abs(l+p-s.w)<c){const k=s.w-(l+p);p+=k;const C=p/g-h;h+=C,d-=C/2}}}return p<=n&&(l=e.x,p=n),h<=n&&(d=e.y,h=n),{newOutpaintRect:{x:l,y:d,w:p,h}}}var rn=Object.defineProperty,an=Object.getOwnPropertyDescriptor,Wt=(r,e,t,a)=>{for(var i=a>1?void 0:a?an(e,t):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=(a?s(e,t,i):s(i))||i);return a&&i&&rn(e,t,i),i};let Le=class extends Y{constructor(){super(...arguments),this.label="",this.hideCancel=!1}close(){this.dispatchEvent(new Event("close",{bubbles:!0}))}render(){return u`<sp-dialog-base open underlay>
			<sp-dialog no-divider>
				<div id="content">
					<sp-progress-bar
						size="l"
						static-color="white"
						label=${this.label}
						over-background
						indeterminate
					></sp-progress-bar>
					${de(!this.hideCancel,()=>u`
							<sp-button
								treatment="outline"
								static-color="white"
								@click=${this.close}
								>${m.t("common.cancel")}</sp-button
							>
						`)}
				</div>
			</sp-dialog>
		</sp-dialog-base>`}};Le.styles=$`
		:host {
			display: contents;
			--mod-modal-background-color: var(--spectrum-gray-600);
			--mod-dialog-confirm-padding-grid: 16px;
		}

		sp-dialog-base {
			align-items: flex-start;
			margin-top: 10%;
		}

		sp-button {
			margin-top: 20px;
		}

		#content {
			margin-top: -20px;
			display: flex;
			align-items: center;
			gap: 16px;
		}
	`;Wt([f()],Le.prototype,"label",2);Wt([f({type:Boolean,attribute:"hide-cancel"})],Le.prototype,"hideCancel",2);Le=Wt([Q("psx-progress-dialog")],Le);const nn=({width:r=20,height:e=20,ariaHidden:t=!0,title:a="",id:i="-icon",focusable:n=!1}={})=>u`<svg id=${i} width=${r} height=${e} aria-hidden=${t?"true":"false"} role="img" fill="currentColor" aria-label=${a} focusable=${n?"true":"false"} viewBox="0 0 20 20"><path d="m6.75,18h-2.5c-1.24023,0-2.25-1.00977-2.25-2.25v-2.5c0-1.24023,1.00977-2.25,2.25-2.25h2.5c1.24023,0,2.25,1.00977,2.25,2.25v2.5c0,1.24023-1.00977,2.25-2.25,2.25Zm-2.5-5.5c-.41309,0-.75.33691-.75.75v2.5c0,.41309.33691.75.75.75h2.5c.41309,0,.75-.33691.75-.75v-2.5c0-.41309-.33691-.75-.75-.75h-2.5Z" stroke-width="0"/><path d="m6.75,9h-2.5c-1.24023,0-2.25-1.00977-2.25-2.25v-2.5c0-1.24023,1.00977-2.25,2.25-2.25h2.5c1.24023,0,2.25,1.00977,2.25,2.25v2.5c0,1.24023-1.00977,2.25-2.25,2.25Zm-2.5-5.5c-.41309,0-.75.33691-.75.75v2.5c0,.41309.33691.75.75.75h2.5c.41309,0,.75-.33691.75-.75v-2.5c0-.41309-.33691-.75-.75-.75h-2.5Z" stroke-width="0"/><rect x="4.5" y="13.5" width="2" height="2" rx="1" ry="1" stroke-width="0"/><path d="m12.5,2h.8v2.3h-2.3v-.8c0-.82787.67213-1.5,1.5-1.5Z" stroke-width="0"/><rect x="13.375" y="4.375" width="2.25" height="2.25" stroke-width="0"/><path d="m15.7,2h.8c.82787,0,1.5.67213,1.5,1.5v.8h-2.3V2h0Z" stroke-width="0"/><path d="m11,6.7h2.3v2.3h-.8c-.82787,0-1.5-.67213-1.5-1.5v-.8h0Z" stroke-width="0"/><path d="m15.7,6.7h2.3v.8c0,.82787-.67213,1.5-1.5,1.5h-.8v-2.3h0Z" stroke-width="0"/><path d="m15.75,11h-2.5c-1.24023,0-2.25,1.00977-2.25,2.25v2.5c0,1.24023,1.00977,2.25,2.25,2.25h2.5c1.24023,0,2.25-1.00977,2.25-2.25v-2.5c0-1.24023-1.00977-2.25-2.25-2.25Zm-2.5,1.5h2.5c.41309,0,.75.33691.75.75v1.75h-4v-1.75c0-.41309.33691-.75.75-.75Z" stroke-width="0"/></svg>`,on=({width:r=20,height:e=20,ariaHidden:t=!0,title:a="",id:i="-icon",focusable:n=!1}={})=>u`<svg id=${i} width=${r} height=${e} aria-hidden=${t?"true":"false"} role="img" fill="currentColor" aria-label=${a} focusable=${n?"true":"false"} viewBox="0 0 20 20"><path d="M15.75,18H4.25c-1.24023,0-2.25-1.00977-2.25-2.25v-3.03809c0-.41406.33594-.75.75-.75s.75.33594.75.75v3.03809c0,.41309.33691.75.75.75h11.5c.41309,0,.75-.33691.75-.75v-6.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v6.75c0,1.24023-1.00977,2.25-2.25,2.25Z"/><path d="M17.25,2h-3.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h1.43945l-3.61719,3.61719c-.29297.29297-.29297.76758,0,1.06055.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973l3.61719-3.61719v1.43945c0,.41406.33594.75.75.75s.75-.33594.75-.75v-3.25c0-.41406-.33594-.75-.75-.75Z"/><circle cx="12.5" cy="14.82353" r=".75"/><circle cx="12.5" cy="12.48529" r=".75"/><circle cx="12.5" cy="10.14706" r=".75"/><circle cx="7.15407" cy="8.13235" r=".75"/><circle cx="9.54412" cy="8.13235" r=".75"/><path d="M2.05566,9.8125c-.12891,0-.25781-.0332-.375-.10059-.28223-.16309-.42676-.48926-.3584-.80762l.20312-.93945-.64551-.71191c-.21875-.24121-.25684-.59668-.09375-.87891s.49121-.42188.80762-.3584l.93945.20312.71191-.64551c.24121-.21875.59668-.25684.87891-.09375s.42676.48926.3584.80762l-.20312.93945.64551.71191c.21875.24219.25684.59668.09375.87891s-.49219.42188-.80762.3584l-.93945-.20312-.71191.64551c-.1416.12793-.32227.19434-.50391.19434Z"/><path d="M6.23828,6.58594c-.16992,0-.34082-.04297-.49609-.13281-.37695-.21582-.56934-.64648-.47852-1.07129l.33008-1.52441-1.0459-1.15332c-.29102-.31934-.34277-.78809-.12598-1.16406.21484-.37793.65039-.56738,1.07129-.47852l1.52441.33008,1.15332-1.0459c.31934-.29102.78809-.34277,1.16406-.12598.37695.21582.56934.64648.47852,1.07129l-.33008,1.52441,1.0459,1.15332c.29102.31934.34277.78809.12598,1.16406-.21582.37695-.65234.56348-1.07129.47852l-1.52441-.33008-1.15332,1.0459c-.1875.1709-.42676.25879-.66797.25879ZM5.89941,5.21582c-.00098,0-.00195.00098-.00195.00098l.00195-.00098ZM9.41797,4.97559c0,.00098.00098.00195.00098.00195l-.00098-.00195ZM6.79395,2.94824c.26758.29492.37793.7041.29395,1.0957l-.02539.11719.08789-.08008c.29395-.26758.69824-.37891,1.0957-.29395l.11719.02539-.08008-.08789c-.26758-.29492-.37793-.7041-.29395-1.0957l.02539-.11719-.08789.08008c-.29785.26758-.70508.37695-1.0957.29395l-.11719-.02539.08008.08789ZM5.68164,3.95508q.00098.00098.00195.00098h-.00098l-.00098-.00098ZM5.6582,1.69531l.00098.00195c0-.00098-.00098-.00195-.00098-.00195ZM9.17969,1.45605l-.00195.00098c.00098,0,.00195-.00098.00195-.00098Z"/></svg>`,sn=({width:r=20,height:e=20,ariaHidden:t=!0,title:a="",id:i="-icon",focusable:n=!1}={})=>u`<svg id=${i} width=${r} height=${e} aria-hidden=${t?"true":"false"} role="img" fill="currentColor" aria-label=${a} focusable=${n?"true":"false"} viewBox="0 0 20 20"><polygon points="9.5 16.39363 5.87691 14.21977 9.5 12.04592 13.12309 14.21977 9.5 16.39363" opacity=".7"/><polygon points="9.5 13.58221 5.87691 11.40836 9.5 9.2345 13.12309 11.40836 9.5 13.58221" opacity=".4"/><path d="M9.5,19.21875c-.3623,0-.72461-.09766-1.04688-.29297l-5.25195-3.1709c-.54883-.33203-.87598-.91211-.87598-1.55273.00098-.63965.32812-1.21973.87598-1.55078l1.76562-1.06543v-.17188l-1.76562-1.06641c-.54785-.33008-.875-.91016-.87598-1.5498,0-.64062.32715-1.2207.87598-1.55273l5.25195-3.1709c.64453-.39062,1.44922-.39062,2.09375,0,.35449.21387.46875.67578.25391,1.0293-.21387.35449-.6748.46777-1.0293.25391-.16797-.10156-.375-.10156-.54297,0l-5.25195,3.1709c-.13184.08008-.15137.20215-.15137.26855,0,.06543.01953.1875.15137.2666l1.76562,1.06738c.48438.29102.77344.80371.77344,1.36914s-.28906,1.07812-.77441,1.37012l-1.76465,1.06543c-.13184.08008-.15137.20215-.15137.26758,0,.06641.01953.18848.15137.26855l5.25195,3.1709c.16797.10156.375.10156.54297,0l5.25195-3.1709c.13184-.08008.15137-.20215.15137-.26855,0-.06543-.01953-.1875-.15137-.2666l-1.76562-1.06738c-.48438-.29102-.77344-.80371-.77344-1.36914s.28906-1.07812.77441-1.37012l1.76465-1.06543c.16211-.09863.1543-.26367.14746-.31152-.05371-.41113.23633-.78711.64648-.8418.41504-.05762.78711.23633.8418.64648.09277.71582-.24414,1.41797-.86035,1.79004l-1.76562,1.06641v.17188l1.76562,1.06641c.54785.33008.875.91016.87598,1.5498,0,.64062-.32715,1.2207-.87598,1.55273l-5.25195,3.1709c-.32227.19531-.68457.29297-1.04688.29297Z"/><path d="M9.99512,7.90137c-.32104-.41577-.44849-.92505-.41602-1.43066l-.0791-.04761-3.62305,2.17383,3.62305,2.17383,1.4126-.84766c-.66309-.45239-1.02539-1.2251-.91748-2.02173Z" opacity=".2"/><path d="M12.10144,8.80753c-.10742,0-.21484-.02734-.3125-.0835-.23535-.13574-.35596-.4082-.29834-.67334l.12598-.58398-.40088-.44238c-.18213-.20117-.21387-.49707-.07764-.73193.13477-.23535.40625-.35889.67285-.29834l.5835.12598.44238-.40088c.20068-.18262.49756-.21533.73193-.07764.23535.13574.35596.40771.29834.67285l-.12598.58301.40088.44238c.18262.20117.21436.49707.07861.73242-.13623.23486-.40723.35596-.67334.29834l-.5835-.12598-.44238.40088c-.11816.10693-.26855.16211-.41991.16211Z"/><path d="M15.20984,5.59318c-.10742,0-.21484-.02734-.3125-.0835-.23535-.13574-.35596-.4082-.29834-.67334l.30127-1.39551-.9585-1.05762c-.18262-.20117-.21436-.49707-.07812-.73242.13525-.23535.40479-.35889.67334-.29834l1.39502.30176,1.05762-.95898c.20166-.18311.49756-.21533.73242-.07812.23535.13574.35596.40771.29834.67334l-.30176,1.39502.95898,1.05762c.18262.20117.21436.49707.07861.73242-.13574.23486-.40674.35596-.67334.29834l-1.39551-.30127-1.05762.9585c-.11816.10693-.26855.16211-.41992.16211h0Z"/></svg>`,ln=({width:r=20,height:e=20,ariaHidden:t=!0,title:a="",id:i="-icon",focusable:n=!1}={})=>u`<svg id=${i} width=${r} height=${e} aria-hidden=${t?"true":"false"} role="img" fill="currentColor" aria-label=${a} focusable=${n?"true":"false"} viewBox="0 0 20 20"><path d="M10,1.0622C5.02935,1.0622,1,5.09166,1,10.0622c0,4.22078,2.90566,7.76234,6.82581,8.73495v-5.98469h-1.85603v-2.75026h1.85603v-1.1851c0-3.06326,1.38625-4.48314,4.39365-4.48314.57019,0,1.55413.11179,1.95645.22357v2.49318c-.21248-.02241-.5814-.03356-1.03975-.03356-1.47568,0-2.04587.55898-2.04587,2.01237v.97267h2.93972l-.50515,2.75026h-2.43457v6.18387c4.45627-.53833,7.90972-4.33268,7.90972-8.93414,0-4.97054-4.02957-9-9-9Z"/></svg>`,sr=({width:r=20,height:e=20,ariaHidden:t=!0,title:a="",id:i="-icon",focusable:n=!1}={})=>u`<svg id=${i} width=${r} height=${e} aria-hidden=${t?"true":"false"} role="img" fill="currentColor" aria-label=${a} focusable=${n?"true":"false"} viewBox="0 0 20 20"><path d="m14.5,7.52114c0,.82843-.67157,1.5-1.5,1.5-.82843,0-1.5-.67157-1.5-1.5,0-.82843.67157-1.5,1.5-1.5s1.5.67157,1.5,1.5h0"/><path d="m16.75,3H3.25c-1.24023,0-2.25,1.00977-2.25,2.25v9.5c0,1.24023,1.00977,2.25,2.25,2.25h13.5c1.24023,0,2.25-1.00977,2.25-2.25V5.25c0-1.24023-1.00977-2.25-2.25-2.25Zm-13.5,1.5h13.5c.41309,0,.75.33691.75.75v8.21094l-1.90918-1.90918c-.87695-.87695-2.30469-.87695-3.18164,0l-1.23145,1.23145c-.09961.09766-.25684.09668-.35449.00098l-3.23242-3.23242c-.84961-.84961-2.33203-.84961-3.18164,0l-1.90918,1.90918v-6.21094c0-.41309.33691-.75.75-.75Zm0,11c-.41309,0-.75-.33691-.75-.75v-1.16797l2.96973-2.96973c.29297-.29297.76758-.29297,1.06055,0l3.2334,3.2334c.68164.67969,1.79199.68066,2.47363-.00098l1.23242-1.23242c.29297-.29297.76758-.29297,1.06055,0l2.70068,2.70068c-.1311.11206-.29565.18701-.48096.18701H3.25Z"/></svg>`,cn=({width:r=20,height:e=20,ariaHidden:t=!0,title:a="",id:i="-icon",focusable:n=!1}={})=>u`<svg id=${i} width=${r} height=${e} aria-hidden=${t?"true":"false"} role="img" fill="currentColor" aria-label=${a} focusable=${n?"true":"false"} viewBox="0 0 20 20"><path d="m10,3.441c2.136,0,2.389.009,3.233.047.50717.00609,1.00951.09946,1.485.276.34778.12848.66221.33354.92.6.26646.25779.47152.57222.6.92.17654.47549.26991.97783.276,1.485.038.844.047,1.1.047,3.233s-.009,2.389-.047,3.233c-.00609.50717-.09946,1.00951-.276,1.485-.26857.6979-.8201,1.24943-1.518,1.518-.47549.17654-.97783.26991-1.485.276-.844.038-1.1.047-3.233.047s-2.389-.009-3.233-.047c-.50717-.00609-1.00951-.09946-1.485-.276-.34778-.12848-.66221-.33354-.92-.6-.26646-.25779-.47152-.57222-.6-.92-.17654-.47549-.26991-.97783-.276-1.485-.038-.844-.047-1.1-.047-3.233s.009-2.389.047-3.233c.00609-.50717.09946-1.00951.276-1.485.12848-.34778.33354-.66221.6-.92.25779-.26646.57222-.47152.92-.6.47549-.17654.97783-.26991,1.485-.276.842-.036,1.095-.045,3.231-.045Zm0-1.441c-2.173,0-2.445.009-3.3.048-.66304.01348-1.319.13927-1.94.372-.53404.20056-1.01769.5156-1.417.923-.4074.39931-.72244.88296-.923,1.417-.23273.621-.35852,1.27696-.372,1.94-.039.855-.048,1.127-.048,3.3s.009,2.445.048,3.3c.01348.66304.13927,1.319.372,1.94.20056.53404.5156,1.01769.923,1.417.39931.4074.88296.72244,1.417.923.62163.23296,1.27828.35874,1.942.372.853.039,1.125.048,3.298.048s2.445-.009,3.3-.048c.66372-.01326,1.32037-.13904,1.942-.372,1.07454-.41595,1.92405-1.26546,2.34-2.34.23296-.62163.35874-1.27829.372-1.942.039-.853.048-1.125.048-3.3s-.009-2.445-.048-3.3c-.01435-.66248-.1408-1.31775-.374-1.938-.20056-.53404-.5156-1.01769-.923-1.417-.39931-.4074-.88296-.72244-1.417-.923-.621-.23273-1.27696-.35852-1.94-.372-.855-.039-1.127-.048-3.3-.048Z" stroke-width="0"/><path d="m10,5.892c-2.26879,0-4.108,1.83921-4.108,4.108s1.83921,4.108,4.108,4.108,4.108-1.83921,4.108-4.108-1.83921-4.108-4.108-4.108h0Zm0,6.775c-1.47294,0-2.667-1.19406-2.667-2.667s1.19406-2.667,2.667-2.667,2.667,1.19406,2.667,2.667h0c0,1.47294-1.19406,2.667-2.667,2.667Z" stroke-width="0"/><circle cx="14.27" cy="5.73" r=".96" stroke-width="0"/></svg>`,dn=({width:r=20,height:e=20,ariaHidden:t=!0,title:a="",id:i="-icon",focusable:n=!1}={})=>u`<svg id=${i} width=${r} height=${e} aria-hidden=${t?"true":"false"} role="img" fill="currentColor" aria-label=${a} focusable=${n?"true":"false"} viewBox="0 0 20 20"><path d="M16.81566,2.00023H3.18091c-.65154,0-1.18091.51646-1.18091,1.15291v13.69223c0,.63714.52937,1.1544,1.18091,1.1544h13.63474c.65269,0,1.18434-.51726,1.18434-1.1544V3.15314c0-.63646-.53166-1.15291-1.18434-1.15291ZM6.74537,15.63394h-2.37314v-7.63554h2.37314v7.63554ZM5.55931,6.95463c-.76057,0-1.37623-.61657-1.37623-1.37611,0-.75897.61566-1.37554,1.37623-1.37554.75874,0,1.3752.61657,1.3752,1.37554,0,.75954-.61646,1.37611-1.3752,1.37611ZM15.63383,15.63394h-2.37143v-3.71326c0-.88537-.01623-2.02434-1.23314-2.02434-1.23474,0-1.42434.96457-1.42434,1.96034v3.77726h-2.37097v-7.63554h2.276v1.04331h.03177c.31691-.60023,1.09097-1.23314,2.24537-1.23314,2.40309,0,2.84674,1.5816,2.84674,3.63726v4.18812Z" stroke-width="0"/></svg>`,un=({width:r=20,height:e=20,ariaHidden:t=!0,title:a="",id:i="-icon",focusable:n=!1}={})=>u`<svg id=${i} width=${r} height=${e} aria-hidden=${t?"true":"false"} role="img" fill="currentColor" aria-label=${a} focusable=${n?"true":"false"} viewBox="0 0 20 20"><path d="M17.50001,5.47179c-1.07895-.03254-2.05642-.54947-2.79363-1.24037-.40289-.38385-.7221-.84684-.93746-1.3599-.21535-.51307-.32234-1.06514-.31425-1.62152h-3.00392v11.57015c0,1.89002-1.13274,3.00402-2.52457,3.00402-.36906.00399-.73452-.0729-1.07065-.22539-.33614-.15238-.63478-.37658-.87493-.65686-.24015-.28028-.41595-.60985-.51504-.96528-.09909-.35555-.11905-.72846-.0585-1.09254.06055-.36418.20016-.71056.40901-1.01483.20884-.30432.48184-.55916.79977-.74662.31794-.18745.67308-.30294,1.04046-.33835s.73806.01012,1.08595.13339v-3.05526c-.26798-.05893-.5417-.08789-.81607-.08636-1.09299-.00025-2.16151.32363-3.07043.93069-.90891.60706-1.61739,1.47002-2.03583,2.47974-.41845,1.00968-.52805,2.12088-.31497,3.19293.21308,1.07194.73928,2.05675,1.51206,2.82965.77278.77301,1.75741,1.29937,2.82939,1.51279,1.07197.21331,2.18314.10396,3.19295-.31425,1.00981-.41832,1.87293-1.12651,2.48019-2.03528.60726-.90877.93135-1.97726.93135-3.07024v-6.22694c1.16404.80481,2.55464,1.1853,4.03908,1.21159l.01003-2.81495h-.00001Z" stroke-width="0"/></svg>`,pn=({width:r=20,height:e=20,ariaHidden:t=!0,title:a="",id:i="-icon",focusable:n=!1}={})=>u`<svg id=${i} width=${r} height=${e} aria-hidden=${t?"true":"false"} role="img" fill="currentColor" aria-label=${a} focusable=${n?"true":"false"} viewBox="0 0 20 20"><path d="m11.48944,8.77491l5.82828-6.77491h-1.38112l-5.0607,5.88256L6.83395,2H2.17202l6.11224,8.89547-6.11224,7.10453h1.38119l5.34423-6.21218,4.26861,6.21218h4.66193l-6.33888-9.22509h.00034Zm-1.89174,2.19893l-.6193-.88579L4.05088,3.03974h2.12143l3.97657,5.68821.6193.88579,5.16908,7.3938h-2.12143l-4.21812-6.03336s0-.00034,0-.00034Z" stroke-width="0"/></svg>`,hn=({width:r=20,height:e=20,ariaHidden:t=!0,title:a="",id:i="-icon",focusable:n=!1}={})=>u`<svg id=${i} width=${r} height=${e} aria-hidden=${t?"true":"false"} role="img" fill="currentColor" aria-label=${a} focusable=${n?"true":"false"} viewBox="0 0 20 20"><path d="m18.08546,6.70092c-.07822-.59219-.30389-1.15526-.65631-1.63756-.43741-.44154-1.03129-.69277-1.65277-.69918-2.30954-.16684-5.7727-.16684-5.7727-.16684h-.00737s-3.46316,0-5.7727.16684c-.62146.00651-1.2153.25772-1.65277.69918-.35236.48228-.57789,1.04537-.65585,1.63756-.10281.88747-.15788,1.77982-.165,2.67318v1.25133c.00722.8926.06229,1.78418.165,2.67088.07834.59137.30385,1.15364.65585,1.63525.50203.44588,1.14776.69619,1.81915.70517,1.32046.12675,5.61.16592,5.61.16592,0,0,3.46684-.00553,5.77638-.17237.62149-.00594,1.21549-.25705,1.65276-.69872.35242-.4823.57809-1.04536.65631-1.63756.10242-.88672.15734-1.77829.16454-2.67088v-1.25133c-.00717-.89259-.0621-1.78416-.16454-2.67088Zm-9.92904,5.67775v-4.88824l4.87764,2.45242-4.87764,2.43582Z" stroke-width="0"/></svg>`;var mn=Object.defineProperty,fn=Object.getOwnPropertyDescriptor,pt=(r,e,t,a)=>{for(var i=a>1?void 0:a?fn(e,t):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=(a?s(e,t,i):s(i))||i);return a&&i&&mn(e,t,i),i};class Vt extends Event{static{this.type="crop-preset-select"}constructor(e){super(Vt.type),this.props=e}}const re=[{id:"instagram",title:m.t("cropPresets.instagram"),presets:[{id:"square",title:m.t("cropPresets.presets.square"),sizex:1080,sizey:1080},{id:"story",title:m.t("cropPresets.presets.story"),sizex:1080,sizey:1920},{id:"portrait",title:m.t("cropPresets.presets.portrait"),sizex:1080,sizey:1350},{id:"landscape",title:m.t("cropPresets.presets.landscape"),sizex:1080,sizey:566},{id:"profile-photo",title:m.t("cropPresets.presets.profilePhoto"),sizex:320,sizey:320}]},{id:"facebook",title:m.t("cropPresets.facebook"),presets:[{id:"story",title:m.t("cropPresets.presets.story"),sizex:1080,sizey:1920},{id:"post",title:m.t("cropPresets.presets.post"),sizex:1200,sizey:630},{id:"profile-photo",title:m.t("cropPresets.presets.profilePhoto"),sizex:170,sizey:170}]},{id:"tiktok",title:m.t("cropPresets.tiktok"),presets:[{id:"clip",title:m.t("cropPresets.presets.clip"),sizex:1080,sizey:1920}]},{id:"youtube",title:m.t("cropPresets.youtube"),presets:[{id:"thumbnail",title:m.t("cropPresets.presets.thumbnail"),sizex:1280,sizey:720}]},{id:"linkedin",title:m.t("cropPresets.linkedin"),presets:[{id:"linkedin",title:m.t("cropPresets.presets.linkedin"),sizex:1200,sizey:627},{id:"profile-photo",title:m.t("cropPresets.presets.profilePhoto"),sizex:400,sizey:400}]},{id:"x",title:m.t("cropPresets.x"),presets:[{id:"cover-photo",title:m.t("cropPresets.presets.coverPhoto"),sizex:1500,sizey:500},{id:"landscape",title:m.t("cropPresets.presets.landscape"),sizex:1024,sizey:512},{id:"profile-photo",title:m.t("cropPresets.presets.profilePhoto"),sizex:400,sizey:400}]},{id:"photos",title:m.t("cropPresets.photos"),presets:[{id:"square",title:m.t("cropPresets.presets.square"),sizex:1,sizey:1},{id:"2:1",title:"2:1",sizex:2,sizey:1},{id:"3:2",title:"3:2",sizex:3,sizey:2},{id:"4:3",title:"4:3",sizex:4,sizey:3},{id:"5:4",title:"5:4",sizex:5,sizey:4},{id:"16:9",title:"16:9",sizex:16,sizey:9}]}];let Ce=class extends Y{constructor(){super(...arguments),this.selected=!1}get cropPresetCategory(){return re[this.categoryIndex]}get cropPreset(){return re[this.categoryIndex].presets[this.presetIndex]}getCategoryIcon(){switch(this.cropPresetCategory.id){case"instagram":return cn();case"facebook":return ln();case"tiktok":return un();case"youtube":return hn();case"linkedin":return dn();case"x":return pn();case"photos":return sr();default:return this.cropPresetCategory,sr()}}selectCard(){if(!this.selected){const r=new Vt({categoryIndex:this.categoryIndex,presetIndex:this.presetIndex});this.dispatchEvent(r)}}renderCropPreset(){const r=this.cropPreset.sizex,e=this.cropPreset.sizey,t=60,a=Math.round(t*(r>=e?1:r/e)),i=Math.round(t*(e>=r?1:e/r));return u`
			<div
				class="aspect-item-box"
				style="width: ${a}px; height: ${i}px;"
			>
				${this.getCategoryIcon()}
			</div>
		`}render(){return u`
			<button
				class="card"
				@click=${this.selectCard}
				aria-labelledby="heading subheading"
			>
				<div class="item-container">${this.renderCropPreset()}</div>
				<div id="heading">${this.cropPreset.title}</div>
				<div id="subheading">
					${this.cropPreset.sizex} × ${this.cropPreset.sizey}
				</div>
			</button>
		`}};Ce.styles=$`
		:host {
			display: block;
		}

		.card {
			--border-color: var(--spectrum-gray-500);
			--border-color-hover: var(--spectrum-gray-600);
			--border-color-selected: var(--spectrum-blue-500);
			--border-color-selected-hover: var(--spectrum-blue-600);

			background: none;
			border: none;
			padding: 0;
			margin: 0;
			font-family: inherit;
			font-size: inherit;
			line-height: inherit;
			text-align: inherit;
			outline: none;

			color: var(--spectrum-gray-800);
			position: relative;
			cursor: pointer;
			width: 100%;
			display: block;
		}

		.card:hover {
			cursor: pointer;
		}

		.card:focus-visible {
			outline: 2px solid var(--spectrum-blue-500);
			outline-offset: 2px;
		}

		#heading {
			width: 100%;
			font-size: var(--spectrum-global-dimension-font-size-75);
			overflow: hidden;
			text-overflow: ellipsis;
			padding: var(--spectrum-global-dimension-size-75)
				var(--spectrum-global-dimension-size-25) 0
				var(--spectrum-global-dimension-size-25);
			white-space: nowrap;
		}

		#subheading {
			width: 100%;
			font-size: var(--spectrum-global-dimension-font-size-75);
			font-weight: var(--spectrum-global-font-weight-light);
			overflow: hidden;
			text-overflow: ellipsis;
			padding: var(--spectrum-global-dimension-size-50)
				var(--spectrum-global-dimension-size-25) 0
				var(--spectrum-global-dimension-size-25);
			white-space: nowrap;
		}

		.item-container {
			display: flex;
			justify-content: center;
			align-items: center;
			height: var(--spectrum-global-dimension-size-1200);
			aspect-ratio: 1 / 1;
			background-color: var(--spectrum-gray-100);
			border: 1px solid var(--border-color);
			border-radius: var(--spectrum-corner-radius-100);
			outline-offset: calc(-1 * var(--spectrum-global-dimension-size-25));
		}

		.card:hover .item-container {
			border-color: var(--border-color-hover);
			outline: var(--border-color-hover) solid 1px;
		}

		:host([selected]) .item-container {
			border-color: var(--border-color-selected);
			outline: var(--border-color-selected) solid 1px;
		}

		:host([selected]) .card:hover .item-container {
			border-color: var(--border-color-selected-hover);
			outline: var(--border-color-selected-hover) solid 1px;
		}

		.aspect-item-box {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: var(--spectrum-gray-25);
			color: var(--spectrum-gray-900);
			border: 1px solid var(--border-color);
			font-size: 14px;
			border-width: var(--spectrum-global-dimension-size-10);
			border-style: solid;
			border-color: var(--border-color);
		}
	`;pt([f({type:Boolean,reflect:!0})],Ce.prototype,"selected",2);pt([f({type:Number})],Ce.prototype,"categoryIndex",2);pt([f({type:Number})],Ce.prototype,"presetIndex",2);Ce=pt([Q("psx-crop-preset-card")],Ce);var gn=Object.defineProperty,bn=Object.getOwnPropertyDescriptor,Oe=(r,e,t,a)=>{for(var i=a>1?void 0:a?bn(e,t):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=(a?s(e,t,i):s(i))||i);return a&&i&&gn(e,t,i),i};const Xe=[.05,.13,.25,.33,.5,.67,1,2,3,4,5,6,7,8,12,16,32];class ht extends Event{static{this.type="download-image"}constructor(e){super(ht.type),this.props=e}}class U extends Event{static{this.type="psx-zoom-control"}constructor(e){super(U.type),this.action=e}}class P extends Event{static{this.type="psx-canvas-edit"}constructor(e){super(P.type),this.action=e}}class ae extends Event{static{this.type="psx-open-in-psweb"}constructor(e){super(ae.type),this.props=e}}class mt extends Event{static{this.type="psx-open-in-lrweb"}constructor(){super(mt.type)}}const vn=ze();let ue=class extends He{constructor(){super(...arguments),this.reactionDisposers=[],this.tempOutpaintRect=null,this.downloadImageHandler=async r=>{const e=r.props?.format??"png",t=r.props?.quality??1;try{const i=await(await this.prepareCanvas(!0)).convertToBlob({type:`image/${e}`,quality:t}),n=`${m.t("common.downloadFilename")}.${i.type.split("/")[1]}`,s=document.createElement("a");s.style.display="none",s.href=URL.createObjectURL(i),s.download=n,s.click(),URL.revokeObjectURL(s.href),y("trackEvent",{"event.workflow":"EXPORT","event.subcategory":"Export","event.type":"success","event.subtype":"export","event.value":e})}catch{y("trackEvent",{"event.workflow":"EXPORT","event.subcategory":"Export","event.type":"error","event.subtype":"export","event.value":e})}},this.pointerTracker=null,this.isDragging=!1}connectedCallback(){super.connectedCallback(),this.reactionDisposers.push(ve(()=>o.zoom,()=>{this.panZoom.scale!==o.zoom&&this.panZoom.zoom(o.zoom)})),this.reactionDisposers.push(ve(()=>(o.canvas.outpaintRect.w,o.canvas.outpaintRect.h),()=>{this.panZoom.setPanningConstraints(o.canvas.outpaintRect.w,o.canvas.outpaintRect.h,100,100)})),this.reactionDisposers.push(ve(()=>o.canvas.isAutoTone,()=>{o.canvas.isAutoTone?this.acrWebContext?.setAutoTone():this.acrWebContext?.reset()})),this.reactionDisposers.push(ve(()=>o.cropMode,()=>{o.cropMode?this.enterCropMode():this.exitCropMode()})),this.eventsAbortController=new AbortController,window.addEventListener(ht.type,this.downloadImageHandler,{signal:this.eventsAbortController.signal}),window.addEventListener(U.type,r=>{switch(r.action){case"fit":this.panZoom.zoomToFit(o.canvas.outpaintRect.w,o.canvas.outpaintRect.h,this.stage.getBoundingClientRect()),o.zoom=this.panZoom.scale;break;case"fill":this.panZoom.zoomToFill(o.canvas.outpaintRect.w,o.canvas.outpaintRect.h,this.stage.getBoundingClientRect()),o.zoom=this.panZoom.scale;break;case"zoom-in":this.panZoom.zoomInToNextStep(),o.zoom=this.panZoom.scale;break;case"zoom-out":this.panZoom.zoomOutToNextStep(),o.zoom=this.panZoom.scale;break;case"center":this.panZoom.lookAt(0,0);break;default:r.action}},{signal:this.eventsAbortController.signal}),window.addEventListener(P.type,async r=>{switch(r.action.type){case"update-canvas":this.updateCanvas();break;case"persist-image-data":this.persistImageData();break;case"apply-rotation":this.applyRotation(r.action.payload);break;case"remove-background":this.removeBackground();break;case"reset-image":{const e=o.canvas;o.canvas=new Ur({width:this.offscreenCanvas.width,height:this.offscreenCanvas.height});const t=this.offscreenCanvas.getContext("2d");t.globalCompositeOperation="source-over",t.clearRect(0,0,this.offscreenCanvas.width,this.offscreenCanvas.height);const a=await createImageBitmap(this.sourceBlob);t.drawImage(a,0,0),await this.updateCanvas(),this.panZoom.lookAt(0,0),this.persistImageData(),o.addCommand({name:"Revert image",undo:i=>{o.canvas=i,this.updateCanvas()},undoArg:e,redo:i=>{o.canvas=i,this.updateCanvas()},redoArg:o.canvas});break}default:throw r.action,new Error(`Unexpected canvas edit action: ${r.action}`)}},{signal:this.eventsAbortController.signal}),window.addEventListener(ae.type,async r=>{y("closeSidePanel",void 0);const t=await(await this.prepareCanvas(!0)).convertToBlob(),a=await Ti(t,{workflow:r?.props?.workflow});window.open(a,"_self")},{signal:this.eventsAbortController.signal}),window.addEventListener(mt.type,async()=>{y("closeSidePanel",void 0);const e=await(await this.prepareCanvas(!0)).convertToBlob(),t=await Li(new File([e],`image.${e.type.split("/")[1]}`)),a=new URL("/home/presets",vn.lrWeb.host);a.searchParams.append("asseturl",t),window.open(a,"_self")},{signal:this.eventsAbortController.signal}),document.addEventListener("keydown",r=>{switch(r.key){case"z":if(gi())return;r.preventDefault(),r.stopPropagation(),(se?r.metaKey:r.ctrlKey)&&(r.shiftKey?(o.redo(),y("trackEvent",{"event.workflow":"HISTORY","event.subcategory":"Step","event.type":"shortcut","event.subtype":"redo","ui.view_type":"top-menu-bar"})):(o.undo(),y("trackEvent",{"event.workflow":"HISTORY","event.subcategory":"Step","event.type":"shortcut","event.subtype":"undo","ui.view_type":"top-menu-bar"})));break;case"Escape":{o.cropMode&&(o.cropMode=!1,y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"shortcut","event.subtype":"cancel","ui.view_type":"commit-dialog"}));break}case"+":case"=":{(se?r.metaKey:r.ctrlKey)&&(r.preventDefault(),r.stopPropagation(),window.dispatchEvent(new U("zoom-in")));break}case"-":{(se?r.metaKey:r.ctrlKey)&&(r.preventDefault(),r.stopPropagation(),window.dispatchEvent(new U("zoom-out")));break}case"0":{(se?r.metaKey:r.ctrlKey)&&(r.preventDefault(),r.stopPropagation(),window.dispatchEvent(new U("fit")));break}case"1":{(se?r.metaKey:r.ctrlKey)&&(r.preventDefault(),r.stopPropagation(),o.zoom=1);break}case"2":(se?r.metaKey:r.ctrlKey)&&(r.preventDefault(),r.stopPropagation(),o.zoom=2)}},{signal:this.eventsAbortController.signal}),Wr("dbImageChanged",async r=>{if(r.data===this.imageId){const e=await Ve.get(this.imageId);if(!e)throw new Error("Image not found");this.image=e,await this.setupCanvasFromImage()}})}disconnectedCallback(){o.clearUndoStack(),this.reactionDisposers.forEach(r=>r()),this.eventsAbortController?.abort(),super.disconnectedCallback()}firstUpdated(){this.panZoom.setZoomSteps(Xe)}async renderImageBitmapToOffscreenCanvas(r){const e=this.offscreenCanvas.getContext("2d");if(o.canvas.mask){const t=await createImageBitmap(o.canvas.mask);e.clearRect(0,0,this.offscreenCanvas.width,this.offscreenCanvas.height),e.drawImage(t,0,0),e.globalCompositeOperation="source-in"}e.drawImage(r,0,0,this.offscreenCanvas.width,this.offscreenCanvas.height),e.globalCompositeOperation="source-over",this.updateCanvas()}async setupCanvasFromImage(){const r=this.image.blob,e=await createImageBitmap(r);this.offscreenCanvas=new OffscreenCanvas(e.width,e.height),this.offscreenCanvas.getContext("2d").drawImage(e,0,0),this.sourceBlob=await this.offscreenCanvas.convertToBlob(),this.image.imageData?(o.canvas.reset({w:this.image.imageData.documentRect.w,h:this.image.imageData.documentRect.h}),o.canvas.documentRect.x=this.image.imageData.documentRect.x,o.canvas.documentRect.y=this.image.imageData.documentRect.y,o.canvas.documentRect.w=this.image.imageData.documentRect.w,o.canvas.documentRect.h=this.image.imageData.documentRect.h,o.canvas.outpaintRect.x=this.image.imageData.outpaintRect.x,o.canvas.outpaintRect.y=this.image.imageData.outpaintRect.y,o.canvas.outpaintRect.w=this.image.imageData.outpaintRect.w,o.canvas.outpaintRect.h=this.image.imageData.outpaintRect.h,o.canvas.rotation=this.image.imageData.rotation,o.canvas.brightness=this.image.imageData.brightness,o.canvas.contrast=this.image.imageData.contrast,o.canvas.hue=this.image.imageData.hue,o.canvas.saturation=this.image.imageData.saturation,o.canvas.isAutoTone=this.image.imageData.isAutoTone,o.canvas.mask=this.image.imageData.mask):this.resetImageProperties({w:e.width,h:e.height}),await this.updateCanvas(),this.zoomToFit();const a=await this.sourceBlob.arrayBuffer(),i={target:"legacy",automation:!1,supportsEclipse:!0,historySize:20,stack:"stage",supportsAdaptiveProfile:!0,useRPC:!1},n=await Ha.create(i);if(!await n.readImage(a))throw new Error("failed to open image");n.setSettings("");const[c,l]=new Int32Array(await n.getImageArea());o.canvas.isAutoTone&&await n.setAutoTone(),this.acrWebContext=new bi(n,c,l),this.acrAbortController=new AbortController,this.acrWebContext.addEventListener("pixels",async p=>{if(this.acrAbortController?.signal.aborted)return;const b=p.detail;await this.renderImageBitmapToOffscreenCanvas(b),this.persistImageData()},{signal:this.acrAbortController.signal});const d=await this.acrWebContext.render();this.acrAbortController?.signal.aborted||(await this.renderImageBitmapToOffscreenCanvas(d),y("trackEvent",{"event.workflow":"LAUNCH","event.subcategory":"Load Document","event.type":"render","event.subtype":"start","event.value":"editable","ps.dg_params":{document_id:this.image.guid}}))}async willUpdate(r){if(r.has("imageId")){this.acrAbortController?.abort();try{o.cropMode=!1,o.clearUndoStack(),o.cropPreserveAspectRatio=!1;const e=await Ve.get(this.imageId);if(!e)throw new Error("Image not found");this.image=e,e.ready&&await this.setupCanvasFromImage()}catch(e){throw y("trackEvent",{"event.workflow":"LAUNCH","event.subcategory":"Load Document","event.type":"error","event.subtype":"start","event.value":"editable","ps.dg_params":{document_id:this.image?.guid}}),e}}}resetImageProperties(r){o.cropMode=!1,o.canvas.reset(r)}async persistImageData(){const r={documentRect:o.canvas.documentRect.toRect(),outpaintRect:o.canvas.outpaintRect.toRect(),rotation:o.canvas.rotation,brightness:o.canvas.brightness,contrast:o.canvas.contrast,hue:o.canvas.hue,saturation:o.canvas.saturation,isAutoTone:o.canvas.isAutoTone,mask:o.canvas.mask},t=await(await this.prepareCanvas(!0)).convertToBlob();await Ve.patch(this.image.id,{imageData:r,editedBlob:t,modified:o.canvas.modified}),y("dbImageChanged",this.image.id)}attachCropModePointerTracker(){this.pointerTracker=new tt(this.renderRoot.querySelector("#canvas-container"),{start:(r,e)=>this.onPointerStart(r,e),move:(r,e,t)=>this.onPointerMove(r,e,t),end:r=>this.onPointerEnd(r)})}detachCropModePointerTracker(){this.pointerTracker?.stop(),this.pointerTracker=null}onPointerStart(r,e){return Qe(r)||e.composedPath().includes(this.renderRoot.querySelector("psx-crop-tool"))?!1:this.activePointer?(e.preventDefault(),e.stopPropagation(),!0):(this.activePointer=r,this.beginDragging(r),!0)}onPointerMove(r,e,t){if(!this.activePointer)return;const a=e.find(i=>i.id===this.activePointer.id);a&&(t.preventDefault(),t.stopPropagation(),this.isDragging&&this.continueDragging(a))}onPointerEnd(r){r.id===this.activePointer?.id&&this.cancelDragging()}beginDragging(r){this.isDragging=!0,this.style.cursor="grabbing",this.requestUpdate(),this.pointerOrigin=[r.clientX,r.clientY],this.offsetOrigin=[o.canvas.outpaintRect.x,o.canvas.outpaintRect.y]}continueDragging(r){if(!this.pointerOrigin||!o.canvas.outpaintRect||!this.offsetOrigin)return;const e=10/o.zoom,[t,a]=this.pointerOrigin,[i,n]=[r.clientX,r.clientY],s=t-i,c=a-n,l=o.canvas.outpaintRect.x,d=o.canvas.outpaintRect.y,[p,h]=this.offsetOrigin;if(o.canvas.outpaintRect.x=p+s/o.zoom,o.canvas.outpaintRect.y=h+c/o.zoom,Math.abs(o.canvas.outpaintRect.x)<e&&(o.canvas.outpaintRect.x=0),Math.abs(o.canvas.outpaintRect.y)<e&&(o.canvas.outpaintRect.y=0),Math.abs(o.canvas.outpaintRect.x+o.canvas.outpaintRect.w-o.canvas.documentRect.w)<e){const b=o.canvas.documentRect.w-(o.canvas.outpaintRect.x+o.canvas.outpaintRect.w);o.canvas.outpaintRect.x+=b}if(Math.abs(o.canvas.outpaintRect.y+o.canvas.outpaintRect.h-o.canvas.documentRect.h)<e){const b=o.canvas.documentRect.h-(o.canvas.outpaintRect.y+o.canvas.outpaintRect.h);o.canvas.outpaintRect.y+=b}this.panZoom.camera.pan((o.canvas.outpaintRect.x-l)*o.zoom,(o.canvas.outpaintRect.y-d)*o.zoom)}cancelDragging(){this.isDragging=!1,this.activePointer=void 0,this.style.cursor="auto",this.requestUpdate(),this.pointerOrigin=void 0,this.offsetOrigin=void 0}zoomToFit(){const r=this.stage.getBoundingClientRect();o.canvas.outpaintRect.w>r.width-200||o.canvas.outpaintRect.h>r.height-200?this.panZoom.zoomToFit(o.canvas.outpaintRect.w,o.canvas.outpaintRect.h,{width:r.width-200,height:r.height-200}):(this.panZoom.zoom(1),this.panZoom.lookAt(0,0)),o.zoom=this.panZoom.scale}prepareRotatedCanvas(r){const e=o.canvas.rotation;if(e===0)return r;const t=e===90||e===270,a=t?r.height:r.width,i=t?r.width:r.height,n=new OffscreenCanvas(a,i),s=n.getContext("2d");return s.translate(a/2,i/2),s.rotate(e*Math.PI/180),s.drawImage(r,-r.width/2,-r.height/2),s.translate(0,0),n}async prepareMaskedCanvas(){if(!o.canvas.mask)return this.offscreenCanvas;const r=await createImageBitmap(o.canvas.mask),e=new OffscreenCanvas(this.offscreenCanvas.width,this.offscreenCanvas.height),t=e.getContext("2d");return t.drawImage(r,0,0),t.globalCompositeOperation="source-in",t.drawImage(this.offscreenCanvas,0,0),t.globalCompositeOperation="source-over",e}async prepareCanvas(r=!1){const e=await this.prepareMaskedCanvas(),t=this.prepareRotatedCanvas(e),a=new OffscreenCanvas(o.canvas.outpaintRect.w,o.canvas.outpaintRect.h),i=a.getContext("2d");return r&&(i.filter=`brightness(${o.canvas.brightnessCss}%) contrast(${o.canvas.contrastCss}%) hue-rotate(${o.canvas.hueCss}deg) saturate(${o.canvas.saturationCss}%)`),i.drawImage(t,o.canvas.outpaintRect.x,o.canvas.outpaintRect.y,o.canvas.outpaintRect.w,o.canvas.outpaintRect.h,0,0,o.canvas.outpaintRect.w,o.canvas.outpaintRect.h),a}async updateCanvas(){const r=await this.prepareCanvas();this.canvas.width=r.width,this.canvas.height=r.height;const e=this.canvas.getContext("2d");e.globalCompositeOperation="source-over",e.clearRect(0,0,this.canvas.width,this.canvas.height),e.drawImage(r,0,0)}async applyRotation(r){r==="clockwise"?o.canvas.rotation=(o.canvas.rotation+90)%360:r==="counterclockwise"&&(o.canvas.rotation=(o.canvas.rotation+270)%360);const e=o.canvas.rotation,t=e===90||e===270,a=t?this.offscreenCanvas.height:this.offscreenCanvas.width,i=t?this.offscreenCanvas.width:this.offscreenCanvas.height;o.canvas.documentRect.w=a,o.canvas.documentRect.h=i;const{x:n,y:s,w:c,h:l}=o.canvas.outpaintRect;r==="clockwise"?(o.canvas.outpaintRect.x=a-s-l,o.canvas.outpaintRect.y=n,o.canvas.outpaintRect.w=l,o.canvas.outpaintRect.h=c):r==="counterclockwise"&&(o.canvas.outpaintRect.x=s,o.canvas.outpaintRect.y=i-n-c,o.canvas.outpaintRect.w=l,o.canvas.outpaintRect.h=c),await this.updateCanvas(),this.panZoom.lookAt(0,0),this.persistImageData()}async applyCrop(){await this.updateCanvas(),this.panZoom.lookAt(0,0),this.detachCropModePointerTracker(),this.persistImageData(),o.addCommand({name:"Crop",undo:async r=>{o.canvas.outpaintRect.x=r.x,o.canvas.outpaintRect.y=r.y,o.canvas.outpaintRect.w=r.w,o.canvas.outpaintRect.h=r.h,await this.updateCanvas(),this.panZoom.lookAt(0,0),this.persistImageData()},undoArg:{...this.tempOutpaintRect},redo:async r=>{o.canvas.outpaintRect.x=r.x,o.canvas.outpaintRect.y=r.y,o.canvas.outpaintRect.w=r.w,o.canvas.outpaintRect.h=r.h,await this.updateCanvas(),this.panZoom.lookAt(0,0),this.persistImageData()},redoArg:o.canvas.outpaintRect.toRect()}),this.tempOutpaintRect=null,o.cropMode=!1,y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"click","event.subtype":"done","event.value":o.selectedCropPresetCategoryIndex===null||o.selectedCropPresetIndex===null?"freeform":`${re[o.selectedCropPresetCategoryIndex].id}-${re[o.selectedCropPresetCategoryIndex].presets[o.selectedCropPresetIndex].id}`,"ui.view_type":"commit-dialog"})}async enterCropMode(){this.attachCropModePointerTracker();const r=this.prepareRotatedCanvas(await this.prepareMaskedCanvas());this.canvas.width=o.canvas.documentRect.w,this.canvas.height=o.canvas.documentRect.h;const e=this.canvas.getContext("2d");e.clearRect(0,0,this.canvas.width,this.canvas.height),e.drawImage(r,0,0),this.tempOutpaintRect={x:o.canvas.outpaintRect.x,y:o.canvas.outpaintRect.y,w:o.canvas.outpaintRect.w,h:o.canvas.outpaintRect.h},this.panZoom.lookAt(0,0)}async exitCropMode(){if(this.detachCropModePointerTracker(),this.tempOutpaintRect){const{x:r,y:e,w:t,h:a}=this.tempOutpaintRect;o.canvas.outpaintRect.x=r,o.canvas.outpaintRect.y=e,o.canvas.outpaintRect.w=t,o.canvas.outpaintRect.h=a,this.tempOutpaintRect=null}await this.updateCanvas(),this.panZoom.lookAt(0,0)}async removeBackground(){if(!this.sourceBlob)throw new Error("No source blob");this.removeBackgroundAbortController=new AbortController;const{closeOverlay:r}=await At(u`<psx-progress-dialog
				label="${m.t("canvas.removingBackground")}"
				@sp-closed=${()=>{this.removeBackgroundAbortController?.abort("cancel")}}
			></psx-progress-dialog>`,{type:"modal"},{coverSidePanel:!0});try{const e=await mi({source:this.sourceBlob,signal:this.removeBackgroundAbortController.signal});o.canvas.mask=await pi(e),this.updateCanvas(),this.persistImageData(),o.addCommand({name:"Remove background",undo:()=>{o.canvas.mask=null,this.updateCanvas(),this.persistImageData()},redo:t=>{o.canvas.mask=t,this.updateCanvas(),this.persistImageData()},redoArg:o.canvas.mask})}catch(e){if(e!=="cancel")throw e}finally{r()}}render(){const r=ke({filter:`brightness(${o.canvas.brightnessCss}%) contrast(${o.canvas.contrastCss}%) hue-rotate(${o.canvas.hueCss}deg) saturate(${o.canvas.saturationCss}%)`});return this.style.setProperty("--camera-scale",o.zoom.toString()),u`<div id="container">
			<div id="stage">
				<diwi-stage>
					<diwi-pan-zoom
						@pan-zoom:zoom-change=${()=>{o.zoom=this.panZoom.scale}}
					>
						<diwi-dom-renderer>
							<div id="canvas-container">
								<canvas id="canvas" style=${r}></canvas>
								${de(o.cropMode,()=>u`<!-- @ts-ignore lit-plugin(no-incompatible-type-binding) -->
											<psx-crop-tool
												.camera=${this.panZoom.camera}
											></psx-crop-tool>`)}
							</div>
						</diwi-dom-renderer>
					</diwi-pan-zoom>
				</diwi-stage>
			</div>
			${de(o.cropMode,()=>u`<div id="action-bar-container">
						<div id="action-bar" class="popover">
							<sp-button
								variant="secondary"
								treatment="outline"
								@click=${()=>{o.cropMode=!1,o.selectedCropPresetCategoryIndex=null,o.selectedCropPresetIndex=null,y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"click","event.subtype":"cancel","ui.view_type":"commit-dialog"})}}
								>${m.t("common.cancel")}</sp-button
							>
							<sp-button @click=${this.applyCrop}
								>${m.t("common.done")}</sp-button
							>
						</div>
					</div>`)}
		</div>`}};ue.styles=$`
		:host {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 100%;
		}

		label[for='auto-tone'] {
			color: var(--spectrum-neutral-subdued-content-color-default);
		}

		#container {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 8px;
			position: relative;
		}

		.popover {
			border-radius: 10px;
			padding: 8px;
			background: var(--spectrum-background-layer-2-color);
			box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.16);
		}

		#action-bar-container {
			position: absolute;
			pointer-events: none;
			bottom: 80px;
			width: 100%;
			display: flex;
			justify-content: center;
		}

		#action-bar {
			position: relative;
			display: flex;
			gap: 8px;
			pointer-events: auto;
		}

		#stage {
			box-sizing: border-box;
			position: relative;
			height: 100%;
			width: 100%;
			border: 1px solid #e0e0e0;
			border-radius: 4px;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		}

		#canvas-container {
			display: flex;
			position: relative;
			transition: transform 0.3s ease-in-out;

			/** checkerboard grid */
			background: repeating-conic-gradient(#ffffff 0 25%, #cccccc 0 50%) 0 /
				max(calc(8px / var(--camera-scale) * 2), 2px)
				max(calc(8px / var(--camera-scale) * 2), 2px);
			/** hack to fix aliasing at edges when zooming/panned */
			box-shadow: inset 0 0 0 calc(1px / var(--camera-scale))
				var(--spectrum-gray-100);
		}

		#canvas {
			image-rendering: pixelated;
		}

		diwi-dom-renderer {
			background-color: var(--spectrum-gray-100);
		}
	`;Oe([f({type:Number})],ue.prototype,"imageId",2);Oe([O("diwi-pan-zoom")],ue.prototype,"panZoom",2);Oe([O("#stage")],ue.prototype,"stage",2);Oe([O("canvas")],ue.prototype,"canvas",2);ue=Oe([Q("psx-canvas")],ue);const yn=u`<svg
	width="20"
	height="20"
	viewBox="0 0 20 20"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M15.7852 0.969727H4.27533C2.48315 0.969727 1.03027 2.42261 1.03027 4.21485V15.7246C1.03027 17.5169 2.48315 18.9697 4.27533 18.9697H15.7852C17.5774 18.9697 19.0303 17.5169 19.0303 15.7246V4.21485C19.0303 2.42261 17.5774 0.969727 15.7852 0.969727ZM10.9802 14.222H4.88709V5.95814H7.18122V12.261H10.9802V14.222ZM15.4945 9.4734C15.3464 9.43641 15.0629 9.41175 14.8285 9.41175C14.3721 9.41175 14.113 9.44874 13.8787 9.53504V14.222H11.7201V8.21534C12.4971 7.86988 13.2743 7.67262 14.3967 7.67262C14.9024 7.67262 15.3095 7.73427 15.4945 7.79591V9.4734Z"
		fill="#292929"
	/>
</svg> `;let kt=new Map,Mt=!1;try{Mt=new Intl.NumberFormat("de-DE",{signDisplay:"exceptZero"}).resolvedOptions().signDisplay==="exceptZero"}catch{}let st=!1;try{st=new Intl.NumberFormat("de-DE",{style:"unit",unit:"degree"}).resolvedOptions().style==="unit"}catch{}const Dr={degree:{narrow:{default:"°","ja-JP":" 度","zh-TW":"度","sl-SI":" °"}}};class we{format(e){let t="";if(!Mt&&this.options.signDisplay!=null?t=kn(this.numberFormatter,this.options.signDisplay,e):t=this.numberFormatter.format(e),this.options.style==="unit"&&!st){var a;let{unit:i,unitDisplay:n="short",locale:s}=this.resolvedOptions();if(!i)return t;let c=(a=Dr[i])===null||a===void 0?void 0:a[n];t+=c[s]||c.default}return t}formatToParts(e){return this.numberFormatter.formatToParts(e)}formatRange(e,t){if(typeof this.numberFormatter.formatRange=="function")return this.numberFormatter.formatRange(e,t);if(t<e)throw new RangeError("End date must be >= start date");return`${this.format(e)} – ${this.format(t)}`}formatRangeToParts(e,t){if(typeof this.numberFormatter.formatRangeToParts=="function")return this.numberFormatter.formatRangeToParts(e,t);if(t<e)throw new RangeError("End date must be >= start date");let a=this.numberFormatter.formatToParts(e),i=this.numberFormatter.formatToParts(t);return[...a.map(n=>({...n,source:"startRange"})),{type:"literal",value:" – ",source:"shared"},...i.map(n=>({...n,source:"endRange"}))]}resolvedOptions(){let e=this.numberFormatter.resolvedOptions();return!Mt&&this.options.signDisplay!=null&&(e={...e,signDisplay:this.options.signDisplay}),!st&&this.options.style==="unit"&&(e={...e,style:"unit",unit:this.options.unit,unitDisplay:this.options.unitDisplay}),e}constructor(e,t={}){this.numberFormatter=wn(e,t),this.options=t}}function wn(r,e={}){let{numberingSystem:t}=e;if(t&&r.includes("-nu-")&&(r.includes("-u-")||(r+="-u-"),r+=`-nu-${t}`),e.style==="unit"&&!st){var a;let{unit:s,unitDisplay:c="short"}=e;if(!s)throw new Error('unit option must be provided with style: "unit"');if(!(!((a=Dr[s])===null||a===void 0)&&a[c]))throw new Error(`Unsupported unit ${s} with unitDisplay = ${c}`);e={...e,style:"decimal"}}let i=r+(e?Object.entries(e).sort((s,c)=>s[0]<c[0]?-1:1).join():"");if(kt.has(i))return kt.get(i);let n=new Intl.NumberFormat(r,e);return kt.set(i,n),n}function kn(r,e,t){if(e==="auto")return r.format(t);if(e==="never")return r.format(Math.abs(t));{let a=!1;if(e==="always"?a=t>0||Object.is(t,0):e==="exceptZero"&&(Object.is(t,-0)||Object.is(t,0)?t=Math.abs(t):a=t>0),a){let i=r.format(-t),n=r.format(t),s=i.replace(n,"").replace(/\u200e|\u061C/,"");return[...s].length!==1&&console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case"),i.replace(n,"!!!").replace(s,"+").replace("!!!",n)}else return r.format(t)}}const xn=new RegExp("^.*\\(.*\\).*$"),Cn=["latn","arab","hanidec","deva","beng"];class St{parse(e){return xt(this.locale,this.options,e).parse(e)}isValidPartialNumber(e,t,a){return xt(this.locale,this.options,e).isValidPartialNumber(e,t,a)}getNumberingSystem(e){return xt(this.locale,this.options,e).options.numberingSystem}constructor(e,t={}){this.locale=e,this.options=t}}const lr=new Map;function xt(r,e,t){let a=cr(r,e);if(!r.includes("-nu-")&&!a.isValidPartialNumber(t)){for(let i of Cn)if(i!==a.options.numberingSystem){let n=cr(r+(r.includes("-u-")?"-nu-":"-u-nu-")+i,e);if(n.isValidPartialNumber(t))return n}}return a}function cr(r,e){let t=r+(e?Object.entries(e).sort((i,n)=>i[0]<n[0]?-1:1).join():""),a=lr.get(t);return a||(a=new zn(r,e),lr.set(t,a)),a}class zn{parse(e){let t=this.sanitize(e);if(this.symbols.group&&(t=je(t,this.symbols.group,"")),this.symbols.decimal&&(t=t.replace(this.symbols.decimal,".")),this.symbols.minusSign&&(t=t.replace(this.symbols.minusSign,"-")),t=t.replace(this.symbols.numeral,this.symbols.index),this.options.style==="percent"){let s=t.indexOf("-");t=t.replace("-",""),t=t.replace("+","");let c=t.indexOf(".");c===-1&&(c=t.length),t=t.replace(".",""),c-2===0?t=`0.${t}`:c-2===-1?t=`0.0${t}`:c-2===-2?t="0.00":t=`${t.slice(0,c-2)}.${t.slice(c-2)}`,s>-1&&(t=`-${t}`)}let a=t?+t:NaN;if(isNaN(a))return NaN;if(this.options.style==="percent"){var i,n;let s={...this.options,style:"decimal",minimumFractionDigits:Math.min(((i=this.options.minimumFractionDigits)!==null&&i!==void 0?i:0)+2,20),maximumFractionDigits:Math.min(((n=this.options.maximumFractionDigits)!==null&&n!==void 0?n:0)+2,20)};return new St(this.locale,s).parse(new we(this.locale,s).format(a))}return this.options.currencySign==="accounting"&&xn.test(e)&&(a=-1*a),a}sanitize(e){return e=e.replace(this.symbols.literals,""),this.symbols.minusSign&&(e=e.replace("-",this.symbols.minusSign)),this.options.numberingSystem==="arab"&&(this.symbols.decimal&&(e=e.replace(",",this.symbols.decimal),e=e.replace("،",this.symbols.decimal)),this.symbols.group&&(e=je(e,".",this.symbols.group))),this.options.locale==="fr-FR"&&this.symbols.group&&(e=je(e," ",this.symbols.group),e=je(e,/\u00A0/g,this.symbols.group)),e}isValidPartialNumber(e,t=-1/0,a=1/0){return e=this.sanitize(e),this.symbols.minusSign&&e.startsWith(this.symbols.minusSign)&&t<0?e=e.slice(this.symbols.minusSign.length):this.symbols.plusSign&&e.startsWith(this.symbols.plusSign)&&a>0&&(e=e.slice(this.symbols.plusSign.length)),this.symbols.group&&e.startsWith(this.symbols.group)||this.symbols.decimal&&e.indexOf(this.symbols.decimal)>-1&&this.options.maximumFractionDigits===0?!1:(this.symbols.group&&(e=je(e,this.symbols.group,"")),e=e.replace(this.symbols.numeral,""),this.symbols.decimal&&(e=e.replace(this.symbols.decimal,"")),e.length===0)}constructor(e,t={}){this.locale=e,t.roundingIncrement!==1&&t.roundingIncrement!=null&&(t.maximumFractionDigits==null&&t.minimumFractionDigits==null?(t.maximumFractionDigits=0,t.minimumFractionDigits=0):t.maximumFractionDigits==null?t.maximumFractionDigits=t.minimumFractionDigits:t.minimumFractionDigits==null&&(t.minimumFractionDigits=t.maximumFractionDigits)),this.formatter=new Intl.NumberFormat(e,t),this.options=this.formatter.resolvedOptions(),this.symbols=Pn(e,this.formatter,this.options,t);var a,i;this.options.style==="percent"&&(((a=this.options.minimumFractionDigits)!==null&&a!==void 0?a:0)>18||((i=this.options.maximumFractionDigits)!==null&&i!==void 0?i:0)>18)&&console.warn("NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.")}}const dr=new Set(["decimal","fraction","integer","minusSign","plusSign","group"]),_n=[0,4,2,1,11,20,3,7,100,21,.1,1.1];function Pn(r,e,t,a){var i,n,s,c;let l=new Intl.NumberFormat(r,{...t,minimumSignificantDigits:1,maximumSignificantDigits:21,roundingIncrement:1,roundingPriority:"auto",roundingMode:"halfExpand"}),d=l.formatToParts(-10000.111),p=l.formatToParts(10000.111),h=_n.map(T=>l.formatToParts(T));var b;let g=(b=(i=d.find(T=>T.type==="minusSign"))===null||i===void 0?void 0:i.value)!==null&&b!==void 0?b:"-",v=(n=p.find(T=>T.type==="plusSign"))===null||n===void 0?void 0:n.value;!v&&(a?.signDisplay==="exceptZero"||a?.signDisplay==="always")&&(v="+");let k=(s=new Intl.NumberFormat(r,{...t,minimumFractionDigits:2,maximumFractionDigits:2}).formatToParts(.001).find(T=>T.type==="decimal"))===null||s===void 0?void 0:s.value,C=(c=d.find(T=>T.type==="group"))===null||c===void 0?void 0:c.value,$e=d.filter(T=>!dr.has(T.type)).map(T=>ur(T.value)),Me=h.flatMap(T=>T.filter(ie=>!dr.has(ie.type)).map(ie=>ur(ie.value))),me=[...new Set([...$e,...Me])].sort((T,ie)=>ie.length-T.length),Or=me.length===0?new RegExp("[\\p{White_Space}]","gu"):new RegExp(`${me.join("|")}|[\\p{White_Space}]`,"gu"),Nt=[...new Intl.NumberFormat(t.locale,{useGrouping:!1}).format(9876543210)].reverse(),qr=new Map(Nt.map((T,ie)=>[T,ie])),Fr=new RegExp(`[${Nt.join("")}]`,"g");return{minusSign:g,plusSign:v,decimal:k,group:C,literals:Or,numeral:Fr,index:T=>String(qr.get(T))}}function je(r,e,t){return r.replaceAll?r.replaceAll(e,t):r.split(e).join(t)}function ur(r){return r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}var $n=Object.defineProperty,V=(r,e,t,a)=>{for(var i=void 0,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=s(e,t,i)||i);return i&&$n(e,t,i),i};const Mn={toNormalized(r,e,t){return(r-e)/(t-e)},fromNormalized(r,e,t){return r*(t-e)+e}},Sn={fromAttribute:r=>r==="previous"?r:parseFloat(r),toAttribute:r=>r.toString()},En={fromAttribute:r=>r==="next"?r:parseFloat(r),toAttribute:r=>r.toString()};class F extends Dt{constructor(){super(...arguments),this._forcedUnit="",this.dragging=!1,this.highlight=!1,this.name="",this.label="",this.getAriaHandleText=(e,t)=>t.format(e),this.languageResolver=new Ht(this),this.normalization=Mn}get handleName(){return this.name}get focusElement(){var e,t;return(t=(e=this.handleController)==null?void 0:e.inputForHandle(this))!=null?t:this}update(e){var t,a;if(!this.hasUpdated){const{max:i,min:n}=this;this.value==null&&!isNaN(i)&&!isNaN(n)&&(this.value=i<n?n:n+(i-n)/2,(t=this.handleController)==null||t.hostUpdate())}(e.has("formatOptions")||e.has(It))&&delete this._numberFormatCache,e.has("value")&&e.get("value")!=null&&this.updateComplete.then(()=>{var i;(i=this.handleController)==null||i.setValueFromHandle(this)}),(a=this.handleController)==null||a.handleHasChanged(this),super.update(e)}firstUpdated(e){super.firstUpdated(e),this.dispatchEvent(new CustomEvent("sp-slider-handle-ready"))}dispatchInputEvent(){const e=new Event("input",{bubbles:!0,composed:!0});this.dispatchEvent(e)}getNumberFormat(){var e;if(!this._numberFormatCache||this.languageResolver.language!==this._numberFormatCache.language){let t;try{t=new we(this.languageResolver.language,this.formatOptions),this._forcedUnit=""}catch{const{style:i,unit:n,unitDisplay:s,...c}=this.formatOptions||{};i==="unit"&&(this._forcedUnit=n),t=new we(this.languageResolver.language,c)}this._numberFormatCache={language:this.languageResolver.language,numberFormat:t}}return(e=this._numberFormatCache)==null?void 0:e.numberFormat}get numberFormat(){if(this.formatOptions)return this.getNumberFormat()}}V([f({type:Number})],F.prototype,"value"),V([f({type:Number,attribute:"default-value"})],F.prototype,"defaultValue"),V([f({type:Boolean,reflect:!0})],F.prototype,"dragging"),V([f({type:Boolean})],F.prototype,"highlight"),V([f({type:String})],F.prototype,"name"),V([f({reflect:!0,converter:Sn})],F.prototype,"min"),V([f({reflect:!0,converter:En})],F.prototype,"max"),V([f({type:Number,reflect:!0})],F.prototype,"step"),V([f({type:Object,attribute:"format-options"})],F.prototype,"formatOptions"),V([f({type:String})],F.prototype,"label"),V([f({attribute:!1})],F.prototype,"getAriaHandleText"),V([f({attribute:!1})],F.prototype,"normalization");z("sp-slider-handle",F);const jn=$`
    :host{--spectrum-slider-font-size:var(--spectrum-font-size-75);--spectrum-slider-handle-size:var(--spectrum-slider-handle-size-medium);--spectrum-slider-control-height:var(--spectrum-component-height-100);--spectrum-slider-handle-border-width-down:var(--spectrum-slider-handle-border-width-down-medium);--spectrum-slider-label-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-slider-control-to-field-label:var(--spectrum-slider-control-to-field-label-medium);--spectrum-slider-value-side-padding-inline:var(--spectrum-spacing-200);--spectrum-slider-value-inline-size:18px;--spectrum-slider-cjk-line-height:var(--spectrum-cjk-line-height-100);--spectrum-slider-min-size:var(--spectrum-spacing-900);--spectrum-slider-label-margin-start:var(--spectrum-spacing-300);--spectrum-slider-handle-border-width:var(--spectrum-border-width-200);--spectrum-slider-handle-margin-left:calc(var(--spectrum-slider-handle-size)/-2);--spectrum-slider-controls-margin:calc(var(--spectrum-slider-handle-size)/2);--spectrum-slider-track-margin-offset:calc(var(--spectrum-slider-controls-margin)*-1);--spectrum-slider-track-middle-handleoffset:calc(var(--spectrum-slider-handle-gap) + var(--spectrum-slider-handle-size)/2);--spectrum-slider-input-top-size:calc(var(--spectrum-slider-handle-size)/-2/4);--spectrum-slider-track-fill-thickness:var(--spectrum-slider-track-thickness);--spectrum-slider-tick-mark-width:var(--spectrum-border-width-200);--spectrum-slider-tick-mark-border-radius:2px;--spectrum-slider-tick-handle-background-color:var(--spectrum-gray-100);--spectrum-slider-track-color-disabled:var(--spectrum-disabled-background-color);--spectrum-slider-track-fill-color-disabled:var(--spectrum-disabled-background-color);--spectrum-slider-handle-border-color-disabled:var(--spectrum-disabled-border-color);--spectrum-slider-label-text-color:var(--spectrum-neutral-content-color-default);--spectrum-slider-tick-label-color:var(--spectrum-neutral-content-color-default);--spectrum-slider-label-text-color-disabled:var(--spectrum-disabled-content-color);--spectrum-slider-tick-mark-color-disabled:var(--spectrum-disabled-background-color);--spectrum-slider-ramp-handle-border-color-active:var(--spectrum-gray-100);--spectrum-slider-input-left:calc(var(--spectrum-slider-handle-margin-left)/4);--spectrum-slider-track-handleoffset:var(--spectrum-slider-handle-gap);--spectrum-slider-range-track-reset:0;z-index:0;min-inline-size:var(--mod-slider-min-size,var(--spectrum-slider-min-size));-webkit-user-select:none;user-select:none;display:block;position:relative}:host:dir(rtl),:host([dir=rtl]){--spectrum-logical-rotation:matrix(-1,0,0,1,0,0)}:host:not(.spectrum-Slider--sideLabel) #label-container+#track:has(.spectrum-Slider-ramp){margin-block-start:calc(var(--mod-slider-ramp-track-height,var(--spectrum-slider-ramp-track-height))/2)}:host([size=s]){--spectrum-slider-font-size:var(--spectrum-font-size-75);--spectrum-slider-handle-size:var(--spectrum-slider-handle-size-small);--spectrum-slider-control-height:var(--spectrum-component-height-75);--spectrum-slider-handle-border-width-down:var(--spectrum-slider-handle-border-width-down-small);--spectrum-slider-label-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-slider-control-to-field-label:var(--spectrum-slider-control-to-field-label-small);--spectrum-slider-value-side-padding-inline:var(--spectrum-spacing-100)}:host([size=l]){--spectrum-slider-font-size:var(--spectrum-font-size-100);--spectrum-slider-handle-size:var(--spectrum-slider-handle-size-large);--spectrum-slider-control-height:var(--spectrum-component-height-200);--spectrum-slider-handle-border-width-down:var(--spectrum-slider-handle-border-width-down-large);--spectrum-slider-label-top-to-text:var(--spectrum-component-top-to-text-100);--spectrum-slider-control-to-field-label:var(--spectrum-slider-control-to-field-label-large);--spectrum-slider-value-side-padding-inline:var(--spectrum-spacing-200);--spectrum-slider-value-inline-size:18px}:host([size=xl]){--spectrum-slider-font-size:var(--spectrum-font-size-200);--spectrum-slider-handle-size:var(--spectrum-slider-handle-size-extra-large);--spectrum-slider-control-height:var(--spectrum-component-height-300);--spectrum-slider-handle-border-width-down:var(--spectrum-slider-handle-border-width-down-extra-large);--spectrum-slider-label-top-to-text:var(--spectrum-component-top-to-text-200);--spectrum-slider-control-to-field-label:var(--spectrum-slider-control-to-field-label-extra-large);--spectrum-slider-value-side-padding-inline:var(--spectrum-spacing-200);--spectrum-slider-value-inline-size:22px}.spectrum-Slider--sideLabel{align-items:center;display:flex}.spectrum-Slider--sideLabel #label-container{margin-block-start:0}.spectrum-Slider--sideLabel #label-container #label{margin-inline-end:var(--mod-slider-value-side-padding-inline,var(--spectrum-slider-value-side-padding-inline))}.spectrum-Slider--sideLabel #label-container+#track{margin-block-start:0}.spectrum-Slider--sideLabel #controls{margin-inline-end:var(--mod-slider-controls-margin,var(--spectrum-slider-controls-margin))}.spectrum-Slider--sideLabel #value{inline-size:var(--mod-slider-value-inline-size,var(--spectrum-slider-value-inline-size));text-align:start;margin-inline-start:var(--mod-slider-value-side-padding-inline,var(--spectrum-slider-value-side-padding-inline))}#controls{box-sizing:border-box;cursor:pointer;z-index:auto;inline-size:calc(100% - var(--mod-slider-controls-margin,var(--spectrum-slider-controls-margin))*2);block-size:var(--mod-slider-control-height,var(--spectrum-slider-control-height));vertical-align:top;margin-inline-start:var(--mod-slider-controls-margin,var(--spectrum-slider-controls-margin));display:inline-block;position:relative}#controls:not(:has(.ticks)){align-items:center;display:flex}#label-container+#track{margin-block-start:calc(var(--spectrum-slider-control-to-field-label)*-1)}:host([tick-labels]){margin-block-end:var(--mod-slider-control-height,var(--spectrum-slider-control-height))}.fill,.track{block-size:var(--mod-slider-track-fill-thickness,var(--spectrum-slider-track-fill-thickness));box-sizing:border-box;z-index:1;pointer-events:none;margin-inline-start:var(--mod-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset));padding-block:0;padding-inline-start:0;padding-inline-end:var(--mod-slider-handle-gap,var(--spectrum-slider-handle-gap));position:absolute;inset-block-start:calc(var(--mod-slider-control-height,var(--spectrum-slider-control-height))/2 - var(--mod-slider-track-fill-thickness,var(--spectrum-slider-track-fill-thickness))/2);inset-inline:0 auto}.fill:before,.track:before{content:"";block-size:100%;border-start-start-radius:0;border-start-end-radius:0;border-end-end-radius:0;border-end-start-radius:0;display:block}.track:first-of-type:before{border-start-start-radius:var(--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius));border-end-start-radius:var(--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius))}.track:last-of-type:before{border-start-end-radius:var(--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius));border-end-end-radius:var(--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius))}.track~.track{margin-inline-start:var(--mod-slider-range-track-reset,var(--spectrum-slider-range-track-reset));margin-inline-end:var(--mod-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset));padding-block:0;padding-inline-start:var(--mod-slider-track-handleoffset,var(--spectrum-slider-track-handleoffset));padding-inline-end:0;inset-inline-start:auto;inset-inline-end:var(--mod-slider-range-track-reset,var(--spectrum-slider-range-track-reset))}:host([variant=range]) .track~.track{padding-inline:var(--mod-slider-track-middle-handleoffset,var(--spectrum-slider-track-middle-handleoffset))var(--mod-slider-track-middle-handleoffset,var(--spectrum-slider-track-middle-handleoffset));margin-inline:var(--mod-slider-range-track-reset,var(--spectrum-slider-range-track-reset));inset-inline:auto}.fill{margin-inline-start:0;padding-block:0;padding-inline-start:calc(var(--mod-slider-controls-margin,var(--spectrum-slider-controls-margin)) + var(--spectrum-slider-handle-gap,var(--spectrum-slider-handle-gap)));padding-inline-end:0}.offset{padding-block:0;padding-inline-start:0;padding-inline-end:calc(var(--mod-slider-controls-margin,var(--spectrum-slider-controls-margin)) + var(--spectrum-slider-handle-gap,var(--spectrum-slider-handle-gap)))}:host([variant=range]) #value{-webkit-user-select:text;user-select:text}:host([variant=range]) .track:first-of-type{margin-inline-start:var(--mod-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset));padding-inline-start:0;padding-inline-end:var(--mod-slider-track-handleoffset,var(--spectrum-slider-track-handleoffset));inset-inline-start:var(--mod-slider-range-track-reset,var(--spectrum-slider-range-track-reset));inset-inline-end:auto}:host([variant=range]) .track:first-of-type:before{border-start-start-radius:var(--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius));border-end-start-radius:var(--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius))}:host([variant=range]) .track:last-of-type{margin-inline-end:var(--mod-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset));padding-inline-start:var(--spectrum-slider-track-handleoffset);padding-inline-end:0;inset-inline-start:auto;inset-inline-end:var(--mod-slider-range-track-reset,var(--spectrum-slider-range-track-reset))}:host([variant=range]) .track:last-of-type:before{border-start-end-radius:var(--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius));border-end-end-radius:var(--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius))}#ramp{block-size:var(--mod-slider-ramp-track-height,var(--spectrum-slider-ramp-track-height));position:absolute;inset-inline-start:var(--spectrum-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset));inset-inline-end:var(--spectrum-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset))}#ramp svg{inline-size:100%;block-size:100%;transform:var(--spectrum-logical-rotation,)}.handle{z-index:2;box-sizing:border-box;inline-size:var(--mod-slider-handle-size,var(--spectrum-slider-handle-size));block-size:var(--mod-slider-handle-size,var(--spectrum-slider-handle-size));margin-block:0;margin-inline:calc(var(--mod-slider-handle-size,var(--spectrum-slider-handle-size))/-2)0;border-width:var(--mod-slider-handle-border-width,var(--spectrum-slider-handle-border-width));border-radius:var(--mod-slider-handle-border-radius,var(--spectrum-slider-handle-border-radius));transition:border-width var(--mod-animation-duration-100,var(--spectrum-animation-duration-100))ease-in-out;border-style:solid;outline:none;display:inline-block;position:absolute;inset-block-start:calc(var(--mod-slider-control-height,var(--spectrum-slider-control-height))/2 - var(--mod-slider-handle-size,var(--spectrum-slider-handle-size))/2);inset-inline-start:0}.handle.dragging,.handle:active{border-width:var(--mod-slider-handle-border-width-down,var(--spectrum-slider-handle-border-width-down))}.handle.dragging,.handle.handle-highlight,.handle.is-tophandle,.handle:active{z-index:3}.handle:before{content:"";transition:box-shadow var(--mod-animation-duration-100,var(--spectrum-animation-duration-100))ease-out,inline-size var(--mod-animation-duration-100,var(--spectrum-animation-duration-100))ease-out,block-size var(--mod-animation-duration-100,var(--spectrum-animation-duration-100))ease-out;inline-size:var(--mod-slider-handle-size,var(--spectrum-slider-handle-size));block-size:var(--mod-slider-handle-size,var(--spectrum-slider-handle-size));border-radius:100%;display:block;position:absolute;inset-block-start:50%;inset-inline-start:50%;transform:translate(-50%,-50%)}:host:dir(rtl) .handle:before,:host([dir=rtl]) .handle:before{transform:translate(50%,-50%)}.handle.handle-highlight:before{inline-size:calc(var(--mod-slider-handle-size,var(--spectrum-slider-handle-size)) + var(--mod-focus-indicator-gap,var(--spectrum-focus-indicator-gap))*2);block-size:calc(var(--mod-slider-handle-size,var(--spectrum-slider-handle-size)) + var(--mod-focus-indicator-gap,var(--spectrum-focus-indicator-gap))*2)}.input{inline-size:var(--mod-slider-handle-size,var(--spectrum-slider-handle-size));block-size:var(--mod-slider-handle-size,var(--spectrum-slider-handle-size));opacity:0;cursor:default;appearance:none;pointer-events:none;border:0;margin:0;padding:0;position:absolute;inset-block-start:var(--mod-slider-input-top-size,var(--spectrum-slider-input-top-size));inset-inline-start:var(--mod-slider-input-left,var(--spectrum-slider-input-left));overflow:hidden}.input:focus{outline:none}#label-container{inline-size:auto;font-size:var(--mod-slider-font-size,var(--spectrum-slider-font-size));line-height:var(--mod-line-height-100,var(--spectrum-line-height-100));justify-content:space-between;align-items:center;margin-block-start:var(--mod-slider-label-top-to-text,var(--spectrum-slider-label-top-to-text));display:flex;position:relative}#label-container:lang(ja),#label-container:lang(ko),#label-container:lang(zh){line-height:var(--mod-slider-cjk-line-height,var(--spectrum-slider-cjk-line-height))}#label{font-size:var(--mod-slider-font-size,var(--spectrum-slider-font-size));padding-inline-start:0}#value{cursor:default;font-feature-settings:"tnum";text-align:end;flex-grow:0;margin-inline-start:var(--mod-slider-label-margin-start,var(--spectrum-slider-label-margin-start));padding-inline-end:0}:host([variant=tick]) .handle{background-color:var(--mod-slider-tick-handle-background-color,var(--spectrum-slider-tick-handle-background-color))}:host([variant=tick]) #controls{margin-block-start:calc(var(--spectrum-text-to-visual-75) - var(--mod-slider-tick-mark-height,var(--spectrum-slider-tick-mark-height))/2 - var(--mod-slider-track-thickness,var(--spectrum-slider-track-thickness))/2)}:host([variant=tick]) .tickLabel{margin-block-start:calc(var(--mod-slider-tick-mark-height,var(--spectrum-slider-tick-mark-height)) + var(--spectrum-text-to-visual-75))}.ticks{z-index:0;margin-inline:var(--mod-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset));justify-content:space-between;display:flex}.ticks~.handleContainer .handle{background:var(--mod-slider-ticks-handle-background-color,var(--spectrum-slider-ticks-handle-background-color))}.tick{position:relative;inset-block-start:calc(var(--mod-slider-track-thickness,var(--spectrum-slider-control-height))/2 - var(--mod-slider-tick-mark-height,var(--spectrum-slider-tick-mark-height))/2)}.tick,.tick:after{inline-size:var(--mod-slider-tick-mark-width,var(--spectrum-slider-tick-mark-width))}.tick:after{content:"";block-size:var(--mod-slider-tick-mark-height,var(--spectrum-slider-tick-mark-height));border-radius:var(--mod-slider-tick-mark-border-radius,var(--spectrum-slider-tick-mark-border-radius));display:block;position:absolute;inset-block-start:0;inset-inline-start:calc(50% - var(--mod-slider-tick-mark-width,var(--spectrum-slider-tick-mark-width))/2)}.tick .tickLabel{font-size:var(--mod-font-size-75,var(--spectrum-font-size-75));line-height:var(--mod-line-height-100,var(--spectrum-line-height-100));color:var(--highcontrast-slider-label-text-color,var(--mod-slider-tick-label-color,var(--spectrum-slider-tick-label-color)));justify-content:center;align-items:center;display:flex}.tick:first-of-type .tickLabel,.tick:last-of-type .tickLabel{margin-inline:0;display:block;position:absolute}.tick:first-of-type{inset-inline-start:calc(var(--mod-slider-tick-mark-width,var(--spectrum-slider-tick-mark-width))/-2)}.tick:first-of-type .tickLabel{inset-inline-start:0}.tick:last-of-type{inset-inline-end:calc(var(--mod-slider-tick-mark-width,var(--spectrum-slider-tick-mark-width))/-2)}.tick:last-of-type .tickLabel{inset-inline-end:0}.handleContainer,.trackContainer{inline-size:calc(100% + var(--spectrum-slider-handle-size));margin-inline-start:calc(var(--spectrum-slider-handle-size)/2*-1);position:absolute;inset-block-start:0}.trackContainer{block-size:var(--mod-slider-control-height,var(--spectrum-slider-control-height));overflow:hidden}.track:before{background:var(--highcontrast-slider-track-color-static,var(--mod-slider-track-color,var(--spectrum-slider-track-color)))}.track~.track:before{border-start-end-radius:var(--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius));border-end-end-radius:var(--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius))}.track:not(:has(~.spectrum-Slider-fill)):before{background:var(--highcontrast-slider-track-color,var(--mod-slider-track-color,var(--spectrum-slider-track-color)))}#label-container{color:var(--highcontrast-slider-label-text-color,var(--mod-slider-label-text-color,var(--spectrum-slider-label-text-color)))}:host([variant=filled]) .track:first-child:before,.fill:before{background:var(--highcontrast-slider-filled-track-fill-color,var(--mod-slider-track-fill-color,var(--spectrum-slider-track-fill-color)))}#ramp path{fill:var(--highcontrast-slider-ramp-track-color,var(--mod-slider-ramp-track-color,var(--spectrum-slider-ramp-track-color)))}.handle{border-color:var(--highcontrast-slider-handle-border-color,var(--mod-slider-handle-border-color,var(--spectrum-slider-handle-border-color)));background:var(--highcontrast-slider-handle-background-color,var(--mod-slider-handle-background-color,var(--spectrum-slider-handle-background-color)))}.handle.handle-highlight{border-color:var(--highcontrast-slider-handle-border-color-key-focus,var(--mod-slider-handle-border-color-key-focus,var(--spectrum-slider-handle-border-color-key-focus)))}.handle.handle-highlight:before{box-shadow:0 0 0 var(--spectrum-focus-indicator-thickness)var(--highcontrast-slider-handle-focus-ring-color-key-focus,var(--mod-slider-handle-focus-ring-color-key-focus,var(--spectrum-slider-handle-focus-ring-color-key-focus)))}.handle.dragging,.handle:active{border-color:var(--highcontrast-slider-handle-border-color-down,var(--mod-slider-handle-border-color-down,var(--spectrum-slider-handle-border-color-down)))}:host([variant=ramp]) .handle{box-shadow:0 0 0 var(--spectrum-slider-handle-gap)var(--highcontrast-slider-ramp-handle-border-color-active,var(--mod-sectrum-slider-ramp-handle-border-color-active,var(--spectrum-slider-ramp-handle-border-color-active)));background:var(--mod-slider-ramp-handle-background-color,var(--highcontrast-slider-ramp-handle-background-color,var(--spectrum-slider-ramp-handle-background-color)))}.input{background:0 0}.tick:after{background-color:var(--highcontrast-slider-tick-mark-color,var(--mod-slider-tick-mark-color,var(--spectrum-slider-tick-mark-color)))}.handle.dragging{border-color:var(--highcontrast-slider-handle-border-color-down,var(--mod-slider-handle-border-color-down,var(--spectrum-slider-handle-border-color-down)));background:var(--highcontrast-slider-handle-background-color,var(--mod-slider-handle-background-color,var(--spectrum-slider-handle-background-color)))}:host([variant=range]) .track:not(:first-of-type,:last-of-type):before{background:var(--highcontrast-slider-filled-track-fill-color,var(--mod-slider-track-fill-color,var(--spectrum-slider-track-fill-color)));border-start-end-radius:0;border-end-end-radius:0}:host([disabled]),:host([disabled]) #controls{cursor:default}:host([disabled]) #label-container,:host([disabled]) .tickLabel{color:var(--highcontrast-slider-label-text-color-disabled,var(--mod-slider-label-text-color-disabled,var(--spectrum-slider-label-text-color-disabled)))}:host([disabled]) .handle{border-color:var(--highcontrast-slider-handle-border-color-disabled,var(--mod-slider-handle-border-color-disabled,var(--spectrum-slider-handle-border-color-disabled)));background:var(--highcontrast-slider-handle-disabled-background-color,var(--mod-slider-handle-disabled-background-color,var(--spectrum-slider-handle-disabled-background-color)));cursor:default;pointer-events:none}:host([disabled]) .handle:active{border-color:var(--mod-disabled-border-color,var(--spectrum-disabled-border-color));background:var(--highcontrast-slider-handle-background-color-disabled,var(--mod-slider-handle-background-color-disabled,var(--spectrum-slider-handle-background-color-disabled)))}@media (hover:hover){.handle:hover{border-color:var(--highcontrast-slider-handle-border-color-hover,var(--mod-slider-handle-border-color-hover,var(--spectrum-slider-handle-border-color-hover)))}:host([disabled]) .handle:hover{border-color:var(--mod-disabled-border-color,var(--spectrum-disabled-border-color));background:var(--highcontrast-slider-handle-background-color-disabled,var(--mod-slider-handle-background-color-disabled,var(--spectrum-slider-handle-background-color-disabled)))}}:host([disabled]) .track:before{background:var(--highcontrast-slider-track-color-disabled,var(--mod-slider-track-color-disabled,var(--spectrum-slider-track-color-disabled)))}:host([disabled]) .fill:before,:host([disabled][variant=filled]) .track:first-child:before{background:var(--highcontrast-slider-track-fill-color-disabled,var(--mod-slider-track-fill-color-disabled,var(--spectrum-slider-track-fill-color-disabled)))}:host([disabled]) #ramp path{fill:var(--highcontrast-slider-ramp-track-color-disabled,var(--mod-slider-ramp-track-color-disabled,var(--spectrum-slider-ramp-track-color-disabled)))}:host([disabled]) .tick:after{background-color:var(--highcontrast-slider-tick-mark-color-disabled,var(--mod-slider-tick-mark-color-disabled,var(--spectrum-slider-tick-mark-color-disabled)))}:host([disabled][variant=range]) .track:not(:first-of-type,:last-of-type):before{background:var(--highcontrast-slider-track-color-disabled,var(--mod-slider-track-color-disabled,var(--spectrum-slider-track-color-disabled)))}@media (forced-colors:active){:host{--highcontrast-slider-track-color:ButtonText;--highcontrast-slider-track-color-disabled:GrayText;--highcontrast-slider-track-color-static:ButtonText;--highcontrast-slider-track-fill-color-disabled:GrayText;--highcontrast-slider-filled-track-fill-color:Highlight;--highcontrast-slider-ramp-track-color:ButtonText;--highcontrast-slider-ramp-track-color-disabled:GrayText;--highcontrast-slider-tick-mark-color:ButtonText;--highcontrast-slider-tick-mark-color-disabled:GrayText;--highcontrast-slider-handle-border-color:ButtonText;--highcontrast-slider-handle-border-color-hover:Highlight;--highcontrast-slider-handle-border-color-down:Highlight;--highcontrast-slider-handle-border-color-key-focus:Highlight;--highcontrast-slider-handle-border-color-disabled:GrayText;--highcontrast-slider-handle-focus-ring-color-key-focus:CanvasText;--highcontrast-slider-handle-background-color:ButtonFace;--highcontrast-slider-handle-background-color-disabled:GrayText;--highcontrast-slider-handle-disabled-background-color:GrayText;--highcontrast-slider-ramp-handle-border-color-active:ButtonFace;--highcontrast-slider-ramp-handle-background-color:ButtonFace;--highcontrast-slider-label-text-color:CanvasText;--highcontrast-slider-label-text-color-disabled:GrayText}.handle.handle-highlight:before,:host([variant=ramp]) .handle{forced-color-adjust:none}:host:not(.is-disabled,.spectrum-Slider--filled,.spectrum-Slider--range) #controls.handle-highlight,:host:not(.is-disabled,.spectrum-Slider--filled,.spectrum-Slider--range) #controls:active,:host:not(.is-disabled,.spectrum-Slider--filled,.spectrum-Slider--range) #controls:focus-within{--highcontrast-slider-track-color:Highlight;--highcontrast-slider-handle-border-color:Highlight;--highcontrast-slider-ramp-track-color:Highlight;--highcontrast-slider-tick-mark-color:Highlight}@media (hover:hover){:host:not(.is-disabled,.spectrum-Slider--filled,.spectrum-Slider--range) #controls:hover{--highcontrast-slider-track-color:Highlight;--highcontrast-slider-handle-border-color:Highlight;--highcontrast-slider-ramp-track-color:Highlight;--highcontrast-slider-tick-mark-color:Highlight}}:host([disabled]) #ramp+.handle{fill:ButtonFace;background-color:ButtonFace}}:host{--spectrum-slider-track-color:var(--system-slider-track-color);--spectrum-slider-track-fill-color:var(--system-slider-track-fill-color);--spectrum-slider-ramp-track-color:var(--system-slider-ramp-track-color);--spectrum-slider-ramp-track-color-disabled:var(--system-slider-ramp-track-color-disabled);--spectrum-slider-handle-background-color:var(--system-slider-handle-background-color);--spectrum-slider-handle-background-color-disabled:var(--system-slider-handle-background-color-disabled);--spectrum-slider-ramp-handle-background-color:var(--system-slider-ramp-handle-background-color);--spectrum-slider-ticks-handle-background-color:var(--system-slider-ticks-handle-background-color);--spectrum-slider-handle-border-color:var(--system-slider-handle-border-color);--spectrum-slider-handle-disabled-background-color:var(--system-slider-handle-disabled-background-color);--spectrum-slider-tick-mark-color:var(--system-slider-tick-mark-color);--spectrum-slider-handle-border-color-hover:var(--system-slider-handle-border-color-hover);--spectrum-slider-handle-border-color-down:var(--system-slider-handle-border-color-down);--spectrum-slider-handle-border-color-key-focus:var(--system-slider-handle-border-color-key-focus);--spectrum-slider-handle-focus-ring-color-key-focus:var(--system-slider-handle-focus-ring-color-key-focus);--spectrum-slider-track-corner-radius:var(--system-slider-track-corner-radius);--spectrum-slider-handle-border-radius:var(--system-slider-handle-border-radius)}:host{--spectrum-slider-handle-border-radius:var(--system-slider-size-m-handle-border-radius)}:host([size=s]){--spectrum-slider-handle-border-radius:var(--system-slider-size-s-handle-border-radius)}:host([size=l]){--spectrum-slider-handle-border-radius:var(--system-slider-size-l-handle-border-radius)}:host([size=xl]){--spectrum-slider-handle-border-radius:var(--system-slider-size-xl-handle-border-radius)}:host(:focus){outline:0}:host([editable]){grid-template-columns:1fr auto;grid-template-areas:"label number""slider number";display:grid}:host([editable]) #label-container{grid-area:label}:host([editable]) #label-container+div{grid-area:slider}:host([editable]) sp-number-field{grid-area:number;align-self:flex-end;margin-inline-start:calc(var(--swc-scale-factor)*16px)}:host([editable]) output{clip:rect(0,0,0,0);clip-path:inset(50%);height:1px;width:1px;white-space:nowrap;border:0;margin:0 -1px -1px 0;padding:0;position:absolute;overflow:hidden}:host([disabled]){pointer-events:none}:host([dragging]),#track{touch-action:none;user-select:none}.not-exact.ticks{justify-content:start}:host([dir=ltr]) .not-exact .tick{padding-right:var(--sp-slider-tick-offset)}:host([dir=rtl]) .not-exact .tick{padding-left:var(--sp-slider-tick-offset)}:host([dir=ltr]) .not-exact .tick:after{left:auto;transform:translate(-50%)}:host([dir=rtl]) .not-exact .tick:after{right:auto;transform:translate(50%)}:host([dir=rtl]) .handle:before{transform:translate(50%,-50%)}.track:before{background-size:var(--spectrum-slider-track-background-size)!important}:host([dir=ltr]) .track:last-of-type:before{background-position:100%}:host([dir=rtl]) .track:first-of-type:before{background-position:100%}:host([dir=ltr]) .track:not(:first-of-type,:last-of-type){left:var(--spectrum-slider-track-segment-position)}:host([dir=rtl]) .track:not(:first-of-type,:last-of-type){right:var(--spectrum-slider-track-segment-position)}.visually-hidden{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;white-space:nowrap;width:1px;position:absolute;overflow:hidden}:host([label-visibility=value][dir=ltr]) #value{margin-left:auto}:host([label-visibility=value][dir=rtl]) #value{margin-right:auto}:host([label-visibility=none]) #label-container{margin:0;padding:0}:host([label-visibility=none]) #track{align-self:flex-end}.fill{z-index:2}#slider-description{display:none}:host([label-visibility=none]) #label-container+#track{margin-block-start:0}
`;class Rn{constructor(e){this.handles=new Map,this.model=[],this.handleOrder=[],this.handleOrientation=()=>{this.updateBoundingRect()},this.extractModelFromLightDom=()=>{let t=[...this.host.querySelectorAll('[slot="handle"]')];t.length===0&&(t=[this.host]),!t.some(a=>this.waitForUpgrade(a))&&(this.handles=new Map,this.handleOrder=[],t.forEach((a,i)=>{var n;(n=a.handleName)!=null&&n.length||(a.name=`handle${i+1}`),this.handles.set(a.handleName,a),this.handleOrder.push(a.handleName),a.handleController=this}),this.requestUpdate())},this.onInputChange=t=>{const a=t.target;a.model.handle.value=a.valueAsNumber,this.requestUpdate(),this.dispatchChangeEvent(a,a.model.handle)},this.onInputFocus=t=>{const a=t.target;let i;try{i=a.matches(":focus-visible")||this.host.matches(".focus-visible")}catch{i=this.host.matches(".focus-visible")}a.model.handle.highlight=i,this.requestUpdate()},this.onInputBlur=t=>{const a=t.target;a.model.handle.highlight=!1,this.requestUpdate()},this.onInputKeydown=t=>{var a;if(t.key=="Escape"){const n=t.target;((a=n.model.handle)==null?void 0:a.defaultValue)!==void 0&&n.model.handle.value!==n.model.handle.defaultValue&&(n.model.handle.value=n.model.handle.defaultValue,n.model.handle.dispatchInputEvent(),this.dispatchChangeEvent(n,n.model.handle),this.requestUpdate(),t.preventDefault(),t.stopPropagation());return}const i=t.target;i.model.handle.highlight=!0,this.requestUpdate()},this.host=e,new ia(this.host,{config:{subtree:!0,childList:!0},callback:()=>{this.extractModelFromLightDom()}}),this.extractModelFromLightDom()}get values(){const e={};for(const t of this.handles.values())e[t.handleName]=t.value;return e}get size(){return this.handles.size}inputForHandle(e){if(this.handles.has(e.handleName)){const{input:t}=this.getHandleElements(e)||{};return t}throw new Error(`No input for handle "${e.name}"`)}requestUpdate(){this.host.hasUpdated&&this.host.requestUpdate()}setValueFromHandle(e){const t=this.getHandleElements(e);if(!t)return;const{input:a}=t;a.valueAsNumber=e.value,this.requestUpdate(),e.value=a.valueAsNumber,e.dragging&&e.dispatchInputEvent()}handleHasChanged(e){e!==this.host&&this.requestUpdate()}formattedValueForHandle(e){var t;const{handle:a}=e,i=(t=a.numberFormat)!=null?t:this.host.numberFormat,n=a._forcedUnit===""?this.host._forcedUnit:a._forcedUnit;return a.getAriaHandleText(e.value,i)+n}get formattedValues(){const e=new Map;for(const t of this.model)e.set(t.name,this.formattedValueForHandle(t));return e}get focusElement(){const{input:e}=this.getActiveHandleElements();return!e||this.host.editable&&!e.model.handle.dragging?this.host.numberField:e}hostConnected(){"orientation"in screen?screen.orientation.addEventListener("change",this.handleOrientation):window.addEventListener("orientationchange",this.handleOrientation)}hostDisconnected(){"orientation"in screen?screen.orientation.removeEventListener("change",this.handleOrientation):window.removeEventListener("orientationchange",this.handleOrientation)}hostUpdate(){this.updateModel()}waitForUpgrade(e){return e instanceof F?!1:(e.addEventListener("sp-slider-handle-ready",()=>this.extractModelFromLightDom(),{once:!0,passive:!0}),!0)}get activeHandle(){return this.handleOrder[this.handleOrder.length-1]}get activeHandleInputId(){const e=this.activeHandle;return`input-${this.model.findIndex(t=>t.name===e)}`}activateHandle(e){const t=this.handleOrder.findIndex(a=>a===e);t>=0&&this.handleOrder.splice(t,1),this.handleOrder.push(e)}get activeHandleModel(){const e=this.activeHandle;return this.model.find(t=>t.name===e)}getActiveHandleElements(){const e=this.activeHandle,t=this.handles.get(e),a=this.getHandleElements(t);return{model:t,...a}}getHandleElements(e){if(!this.handleRefMap){this.handleRefMap=new WeakMap;const t=this.host.shadowRoot.querySelectorAll(".handle > input");for(const a of t){const i=a,n=i.parentElement,s=this.handles.get(n.getAttribute("name"));s&&this.handleRefMap.set(s,{input:i,handle:n})}}return this.handleRefMap.get(e)}clearHandleComponentCache(){delete this.handleRefMap}get boundingClientRect(){return this._boundingClientRect||(this._boundingClientRect=this.host.track.getBoundingClientRect()),this._boundingClientRect}updateBoundingRect(){delete this._boundingClientRect}extractDataFromEvent(e){if(!this._activePointerEventData){let t=e.target.querySelector(":scope > .input");const a=!t,i=t?t.model:this.model.find(n=>n.name===this.activeHandle);!t&&i&&(t=i.handle.focusElement),this._activePointerEventData={input:t,model:i,resolvedInput:a}}return this._activePointerEventData}handleDoubleClick(e){var t;const a=e.target.querySelector(".input");((t=a.model)==null?void 0:t.handle.defaultValue)!==void 0&&(a.model.handle.value=a.model.handle.defaultValue,this.dispatchChangeEvent(a,a.model.handle),a.model.handle.dispatchInputEvent(),this.requestUpdate())}handlePointerdown(e){const{resolvedInput:t,model:a}=this.extractDataFromEvent(e);if(!a||this.host.disabled||e.button!==0){e.preventDefault();return}this.host.track.setPointerCapture(e.pointerId),this.updateBoundingRect(),e.pointerType==="mouse"&&this.host.labelEl.click(),this.draggingHandle=a.handle,a.handle.dragging=!0,this.activateHandle(a.name),t&&this.handlePointermove(e),this.requestUpdate()}handlePointerup(e){const{input:t,model:a}=this.extractDataFromEvent(e);delete this._activePointerEventData,a&&(e.pointerType==="mouse"&&this.host.labelEl.click(),this.cancelDrag(a),this.requestUpdate(),this.host.track.releasePointerCapture(e.pointerId),this.dispatchChangeEvent(t,a.handle))}handlePointermove(e){const{input:t,model:a}=this.extractDataFromEvent(e);a&&this.draggingHandle&&(t.value=this.calculateHandlePosition(e,a).toString(),a.handle.value=parseFloat(t.value),this.host.indeterminate=!1,this.requestUpdate())}cancelDrag(e){e=e||this.model.find(t=>t.name===this.activeHandle),e&&(e.handle.highlight=!1,delete this.draggingHandle,e.handle.dragging=!1)}dispatchChangeEvent(e,t){e.valueAsNumber=t.value;const a=new Event("change",{bubbles:!0,composed:!0});t.dispatchEvent(a)}calculateHandlePosition(e,t){const a=this.boundingClientRect,i=a.left,n=e.clientX,s=a.width,c=(this.host.isLTR?n-i:s-(n-i))/s;return t.normalization.fromNormalized(c,t.range.min,t.range.max)}renderHandle(e,t,a,i){var n;const s={handle:!0,dragging:((n=this.draggingHandle)==null?void 0:n.handleName)===e.name,"handle-highlight":e.highlight},c={[this.host.isLTR?"left":"right"]:`${e.normalizedValue*100}%`,"z-index":a.toString(),...i&&{"background-color":`var(--spectrum-slider-handle-background-color-${t}, var(--spectrum-slider-handle-background-color))`,"border-color":`var(--spectrum-slider-handle-border-color-${t}, var(--spectrum-slider-handle-border-color))`}},l=i?`label input-${t}`:"label";return u`
            <div
                class=${Ne(s)}
                name=${e.name}
                style=${ke(c)}
                role="presentation"
            >
                <input
                    type="range"
                    class="input"
                    id="input-${t}"
                    min=${e.clamp.min}
                    max=${e.clamp.max}
                    step=${e.step}
                    value=${e.value}
                    aria-disabled=${M(this.host.disabled?"true":void 0)}
                    tabindex=${M(this.host.editable?-1:void 0)}
                    aria-label=${M(e.ariaLabel)}
                    aria-labelledby=${l}
                    aria-valuetext=${this.formattedValueForHandle(e)}
                    aria-describedby="slider-description"
                    @change=${this.onInputChange}
                    @focus=${this.onInputFocus}
                    @blur=${this.onInputBlur}
                    @keydown=${this.onInputKeydown}
                    .model=${e}
                />
                <span id="slider-description">
                    Press escape or double click to reset the slider to its
                    default value.
                </span>
            </div>
        `}render(){return this.clearHandleComponentCache(),this.model.map((e,t)=>{const a=this.handleOrder.indexOf(e.name)+2;return this.renderHandle(e,t,a,this.model.length>1)})}trackSegments(){const e=this.model.map(t=>t.normalizedValue);return e.sort((t,a)=>t-a),e.unshift(0),e.map((t,a,i)=>{var n;return[t,(n=i[a+1])!=null?n:1]})}updateModel(){const e=[...this.handles.values()],t=i=>{const n=e[i],s=e[i-1],c=e[i+1],l=typeof n.min=="number"?n.min:this.host.min,d=typeof n.max=="number"?n.max:this.host.max,p={range:{min:l,max:d},clamp:{min:l,max:d}};if(n.min==="previous"&&s){for(let h=i-1;h>=0;h--){const b=e[h];if(typeof b.min=="number"){p.range.min=b.min;break}}p.clamp.min=Math.max(s.value,p.range.min)}if(n.max==="next"&&c){for(let h=i+1;h<e.length;h++){const b=e[h];if(typeof b.max=="number"){p.range.max=b.max;break}}p.clamp.max=Math.min(c.value,p.range.max)}return p},a=e.map((i,n)=>{var s;const c=t(n),{toNormalized:l}=i.normalization,d=Math.max(Math.min(i.value,c.clamp.max),c.clamp.min),p=l(d,c.range.min,c.range.max);return{name:i.handleName,value:d,normalizedValue:p,highlight:i.highlight,step:(s=i.step)!=null?s:this.host.step,normalization:i.normalization,handle:i,ariaLabel:i!==this.host&&i?.label.length>0?i.label:void 0,...c}});this.model=a}async handleUpdatesComplete(){const e=[...this.handles.values()].filter(t=>t!==this.host).map(t=>t.updateComplete);await Promise.all(e)}}const ge=["",()=>{}];let Dn=class extends fr{constructor(){super(...arguments),this.start=ge,this.streamInside=ge,this.end=ge,this.streamOutside=ge,this.state="off",this.handleStart=e=>{this.clearStream(),this.callHandler(this.start[1],e),!e.defaultPrevented&&(this.removeListeners(),this.addListeners("on"))},this.handleInside=e=>{this.handleStream(this.streamInside[1],e)},this.handleEnd=e=>{this.clearStream(),this.callHandler(this.end[1],e),this.removeListeners(),this.addListeners("off")},this.handleOutside=e=>{this.handleStream(this.streamOutside[1],e)}}render(e){return L}update(e,[{start:t,end:a,streamInside:i=ge,streamOutside:n=ge}]){var s;this.element!==e.element&&(this.element=e.element,this.removeListeners()),this.host=((s=e.options)==null?void 0:s.host)||this.element,this.start=t,this.end=a,this.streamInside=i,this.streamOutside=n,this.addListeners()}addListeners(e){this.state=e||this.state,this.state==="off"?(this.addListener(this.streamOutside[0],this.handleOutside),this.addListener(this.start[0],this.handleStart)):this.state==="on"&&(this.addListener(this.streamInside[0],this.handleInside),this.addListener(this.end[0],this.handleEnd))}callHandler(e,t){typeof e=="function"?e.call(this.host,t):e.handleEvent(t)}handleStream(e,t){this.stream||(this.callHandler(e,t),this.stream=requestAnimationFrame(()=>{this.stream=void 0}))}clearStream(){this.stream!=null&&(cancelAnimationFrame(this.stream),this.stream=void 0)}addListener(e,t){Array.isArray(e)?e.map(a=>{this.element.addEventListener(a,t)}):this.element.addEventListener(e,t)}removeListener(e,t){Array.isArray(e)?e.map(a=>{this.element.removeEventListener(a,t)}):this.element.removeEventListener(e,t)}removeListeners(){this.removeListener(this.start[0],this.handleStart),this.removeListener(this.streamInside[0],this.handleInside),this.removeListener(this.end[0],this.handleEnd),this.removeListener(this.streamOutside[0],this.handleOutside)}disconnected(){this.removeListeners()}reconnected(){this.addListeners()}};const Ar=dt(Dn);var An=Object.defineProperty,Tn=Object.getOwnPropertyDescriptor,I=(r,e,t,a)=>{for(var i=a>1?void 0:a?Tn(e,t):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=(a?s(e,t,i):s(i))||i);return a&&i&&An(e,t,i),i};const Bn=["filled","ramp","range","tick"];class B extends pe(Tt(F,""),{noDefaultSize:!0,validSizes:["s","m","l","xl"]}){constructor(){super(...arguments),this.handleController=new Rn(this),this._editable=!1,this.hideStepper=!1,this.type="",this._variant="",this.getAriaValueText=e=>{const t=[...e.values()];return t.length===2?`${t[0]} - ${t[1]}`:t.join(", ")},this.min=0,this.max=100,this.step=1,this.tickStep=0,this.tickLabels=!1,this.disabled=!1,this.quiet=!1,this.indeterminate=!1,this._numberFieldInput=Promise.resolve()}static get styles(){return[jn]}get editable(){return this._editable}set editable(e){if(e===this.editable)return;const t=this.editable;this._editable=this.handleController.size<2?e:!1,this.editable&&(this._numberFieldInput=_(()=>Promise.resolve().then(()=>Uo),void 0)),t!==this.editable&&this.requestUpdate("editable",t)}set variant(e){const t=this.variant;e!==this.variant&&(Bn.includes(e)&&this.fillStart===void 0?(this._variant=e,this.setAttribute("variant",e)):(this._variant="",this.removeAttribute("variant")),this.requestUpdate("variant",t))}get variant(){return this._variant}get values(){return this.handleController.values}get handleName(){return"value"}get ariaValueText(){return this.getAriaValueText?this.getAriaValueText(this.handleController.formattedValues):`${this.value}${this._forcedUnit}`}get numberFormat(){return this.getNumberFormat()}get focusElement(){return this.handleController.focusElement}handleLabelClick(e){this.editable&&(e.preventDefault(),this.focus())}render(){return u`
            ${this.renderLabel()} ${this.renderTrack()}
            ${this.editable?u`
                      <sp-number-field
                          .formatOptions=${this.formatOptions||{}}
                          id="number-field"
                          min=${this.min}
                          max=${this.max}
                          step=${this.step}
                          size=${this.size}
                          value=${this.value}
                          ?hide-stepper=${this.hideStepper}
                          ?disabled=${this.disabled}
                          ?quiet=${this.quiet}
                          ?indeterminate=${this.indeterminate}
                          @input=${this.handleNumberInput}
                          @change=${this.handleNumberChange}
                      ></sp-number-field>
                  `:L}
        `}connectedCallback(){super.connectedCallback(),this.handleController.hostConnected()}disconnectedCallback(){super.disconnectedCallback(),this.handleController.hostDisconnected()}update(e){this.handleController.hostUpdate(),e.has("disabled")&&this.disabled&&this.handleController.cancelDrag(),super.update(e)}renderLabel(){const e=this.labelVisibility==="none"||this.labelVisibility==="value",t=this.labelVisibility==="none"||this.labelVisibility==="text";return u`
            <div id="label-container">
                <sp-field-label
                    class=${Ne({"visually-hidden":e})}
                    ?disabled=${this.disabled}
                    id="label"
                    for=${this.editable?"number-field":this.handleController.activeHandleInputId}
                    @click=${this.handleLabelClick}
                    size=${this.size}
                >
                    ${this.slotHasContent?L:u`
                              <span>${this.label}</span>
                          `}
                    <slot></slot>
                </sp-field-label>
                <sp-field-label
                    class=${Ne({"visually-hidden":t})}
                    ?disabled=${this.disabled}
                    for=${this.editable?"number-field":this.handleController.activeHandleInputId}
                    size=${this.size}
                >
                    <output id="value" aria-live="off" for="input">
                        ${this.ariaValueText}
                    </output>
                </sp-field-label>
            </div>
        `}renderRamp(){return this.variant!=="ramp"?u``:u`
            <div id="ramp">
                <svg
                    viewBox="0 0 240 16"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path
                        d="M240,4v8c0,2.3-1.9,4.1-4.2,4L1,9C0.4,9,0,8.5,0,8c0-0.5,0.4-1,1-1l234.8-7C238.1-0.1,240,1.7,240,4z"
                    ></path>
                </svg>
            </div>
        `}renderTicks(){if(this.variant!=="tick")return u``;const e=this.tickStep||this.step,t=(this.max-this.min)/e,a=t%1!==0,i=new Array(Math.floor(t+1));return i.fill(0,0,t+1),u`
            <div
                class="${a?"not-exact ":""}ticks"
                style=${M(a?`--sp-slider-tick-offset: calc(100% / ${this.max} * ${this.tickStep}`:void 0)}
            >
                ${i.map((n,s)=>u`
                        <div class="tick">
                            ${this.tickLabels?u`
                                      <div class="tickLabel">
                                          ${s*e+this.min}
                                      </div>
                                  `:L}
                        </div>
                    `)}
            </div>
        `}renderTrackSegment(e,t){return this.variant==="ramp"?u``:u`
            <div
                class="track"
                style=${ke(this.trackSegmentStyles(e,t))}
                role="presentation"
            ></div>
        `}getOffsetWidth(e,t){return Math.abs(t-e)*100}fillStyles(e){const t=this.handleController.activeHandleModel,a=t.normalization.toNormalized(e,this.min,this.max),i=this.dir==="rtl"?"right":"left",n=(this.value>e?a:t.normalizedValue)*100,s=this.getOffsetWidth(a,t.normalizedValue);return{[i]:`${n}%`,width:`${s}%`}}renderFillOffset(){return this._cachedValue===void 0||this.centerPoint===void 0?u``:u`
            <div
                class=${Ne({fill:!0,offset:this.value>this.centerPoint})}
                style=${ke(this.fillStyles(this.centerPoint))}
            ></div>
        `}renderHandle(){return this.variant==="tick"?u``:u`
            ${this.handleController.render()}
        `}renderTrack(){const e=this.handleController.trackSegments(),t=[{id:"handles",html:this.handleController.render()}],a=[{id:"track0",html:this.renderTrackSegment(...e[0])},{id:"fill",html:this.renderFillOffset()},{id:"ramp",html:this.renderRamp()},{id:"handles",html:this.renderHandle()},...e.slice(1).map(([i,n],s)=>({id:`track${s+1}`,html:this.renderTrackSegment(i,n)}))];return u`
            <div
                id="track"
                ${Ar({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup],streamOutside:["dblclick",this.handleDoubleClick]})}
            >
                <div id="controls">
                    ${this.variant==="tick"?u`
                              ${this.renderTicks()}
                              <div class="trackContainer">
                                  ${gt(a,i=>i.id,i=>i.html)}
                              </div>
                              <div class="handleContainer">
                                  ${gt(t,i=>i.id,i=>i.html)}
                              </div>
                          `:u`
                              ${gt(a,i=>i.id,i=>i.html)}
                          `}
                </div>
            </div>
        `}handleDoubleClick(e){this.handleController.handleDoubleClick(e)}handlePointerdown(e){this.handleController.handlePointerdown(e)}handlePointermove(e){this.handleController.handlePointermove(e)}handlePointerup(e){this.handleController.handlePointerup(e)}handleNumberInput(e){var t;const{value:a}=e.target;if((t=e.target)!=null&&t.managedInput&&!isNaN(a)){this.value=a;return}e.stopPropagation()}handleNumberChange(e){var t;const{value:a}=e.target;isNaN(a)?(e.target.value=this.value,e.stopPropagation()):(this.value=a,(t=e.target)!=null&&t.managedInput||this.dispatchInputEvent()),this.indeterminate=!1}trackSegmentStyles(e,t){const a=t-e;return{width:`${a*100}%`,"--spectrum-slider-track-background-size":`${1/a*100}%`,"--spectrum-slider-track-segment-position":`${e*100}%`}}async getUpdateComplete(){const e=await super.getUpdateComplete();return this.editable&&(await this._numberFieldInput,await this.numberField.updateComplete),await this.handleController.handleUpdatesComplete(),e}willUpdate(e){e.has("value")&&e.has("fillStart")&&(this._cachedValue=Number(this.value),this.getAttribute("fill-start")===""?this.centerPoint=(Number(this.max)-Number(this.min))/2+Number(this.min):Number.isNaN(Number(this.fillStart))||(this.centerPoint=Number(this.fillStart)))}}I([f({type:Boolean,reflect:!0})],B.prototype,"editable",1),I([f({type:Boolean,reflect:!0,attribute:"hide-stepper"})],B.prototype,"hideStepper",2),I([f()],B.prototype,"type",2),I([f({reflect:!0})],B.prototype,"dir",2),I([f({type:String})],B.prototype,"variant",1),I([f({attribute:!1})],B.prototype,"getAriaValueText",2),I([f({type:String,reflect:!0,attribute:"label-visibility"})],B.prototype,"labelVisibility",2),I([f({type:Number,reflect:!0})],B.prototype,"min",2),I([f({type:Number,reflect:!0})],B.prototype,"max",2),I([f({type:Number})],B.prototype,"step",2),I([f({type:Number,attribute:"tick-step"})],B.prototype,"tickStep",2),I([f({type:Boolean,attribute:"tick-labels"})],B.prototype,"tickLabels",2),I([f({type:Boolean,reflect:!0})],B.prototype,"disabled",2),I([f({type:Number,reflect:!0,attribute:"fill-start"})],B.prototype,"fillStart",2),I([f({type:Boolean})],B.prototype,"quiet",2),I([f({type:Boolean})],B.prototype,"indeterminate",2),I([O("#label")],B.prototype,"labelEl",2),I([O("#number-field")],B.prototype,"numberField",2),I([O("#track")],B.prototype,"track",2);z("sp-slider",B);const Ln=({width:r=24,height:e=24,hidden:t=!1,title:a="Contrast"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="m10,18.7793c-4.8252,0-8.75-3.9248-8.75-8.75S5.1748,1.2793,10,1.2793s8.75,3.9248,8.75,8.75-3.9248,8.75-8.75,8.75Zm0-16c-3.99805,0-7.25,3.25195-7.25,7.25s3.25195,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25195-7.25-7.25-7.25Z"
      fill="currentColor"
    />
    <path
      d="m10.00001,14.38357c0,.65333.61464,1.12149,1.25098.97349,2.43486-.5663,4.24901-2.74982,4.24901-5.35705s-1.81415-4.79075-4.24901-5.35705c-.63635-.148-1.25098.32016-1.25098.97349v8.76713Z"
      fill="currentColor"
    />
  </svg>`,In=({width:r=24,height:e=24,hidden:t=!1,title:a="Contrast"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${r}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M18 2.1A15.9 15.9 0 1 0 33.9 18 15.9 15.9 0 0 0 18 2.1Zm0 29.813A13.913 13.913 0 1 1 31.913 18 13.912 13.912 0 0 1 18 31.913Z"
    />
    <path d="M18 6.2v23.6a11.8 11.8 0 0 0 0-23.6Z" />
  </svg>`;class Hn extends E{render(){return A(u),this.spectrumVersion===2?Ln({hidden:!this.label,title:this.label}):In({hidden:!this.label,title:this.label})}}z("sp-icon-contrast",Hn);const On=({width:r=24,height:e=24,hidden:t=!1,title:a="Revert"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="m18,15.5H3c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h15c.41406,0,.75.33594.75.75s-.33594.75-.75.75ZM11,3.25c-3.77661,0-6.92633,2.81616-7.6087,6.52832l-.85858-1.43994c-.21143-.35596-.67236-.47119-1.02832-.25977-.35547.21191-.47217.67236-.25977,1.02832l1.79541,3.01172c.10352.17383.27344.29834.47021.34521.05762.01367.11572.02051.17383.02051.14111,0,.28076-.04004.40186-.1167l2.91943-1.85254c.34961-.22217.45312-.68555.23145-1.03516-.22217-.3501-.68604-.45312-1.03516-.23145l-1.34387.85291c.53448-3.03955,3.0827-5.35144,6.14221-5.35144,3.44629,0,6.25,2.93115,6.25,6.53418,0,.41406.33594.75.75.75s.75-.33594.75-.75c0-4.43018-3.47656-8.03418-7.75-8.03418Z"
      fill="currentColor"
    />
  </svg>`,qn=({width:r=24,height:e=24,hidden:t=!1,title:a="Revert"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${r}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <rect height="4" rx="1" ry="1" width="32" x="2" y="26" />
    <path
      d="M2.5 20h10.75a.8.8 0 0 0 .75-.8.784.784 0 0 0-.235-.56L9.81 14.681l.692-.693a11.447 11.447 0 0 1 19.116 5.074A1.215 1.215 0 0 0 30.78 20h1.894a1 1 0 0 0 .991-1.17A15.43 15.43 0 0 0 14.621 7.165 16.181 16.181 0 0 0 7.337 11.5l-.356.357-3.617-3.621A.781.781 0 0 0 2.8 8a.8.8 0 0 0-.8.754V19.5a.5.5 0 0 0 .5.5Z"
    />
  </svg>`;class Fn extends E{render(){return A(u),this.spectrumVersion===2?On({hidden:!this.label,title:this.label}):qn({hidden:!this.label,title:this.label})}}z("sp-icon-revert",Fn);const Wn=({width:r=24,height:e=24,hidden:t=!1,title:a="Image Background Remove"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <rect x="2" y="4" width="4" height="4" fill="currentColor" opacity=".35" />
    <polygon points="10 12 9.30741 12 6 9 6 8 10 8 10 12" fill="currentColor" opacity=".35" />
    <rect x="10" y="4" width="4" height="4" fill="currentColor" opacity=".35" />
    <rect x="14" y="8" width="4" height="4" fill="currentColor" opacity=".35" />
    <polygon
      points="14 12.28454 10 13.45999 10 12 14 12 14 12.28454"
      fill="currentColor"
      opacity=".35"
    />
    <path
      d="m14.5,7.52114c0,.82843-.67157,1.5-1.5,1.5-.82843,0-1.5-.67157-1.5-1.5,0-.82843.67157-1.5,1.5-1.5s1.5.67157,1.5,1.5h0"
      fill="currentColor"
    />
    <path
      d="m16.75,3H3.25c-1.24072,0-2.25,1.00977-2.25,2.25v9.5c0,1.24023,1.00928,2.25,2.25,2.25h13.5c1.24072,0,2.25-1.00977,2.25-2.25V5.25c0-1.24023-1.00928-2.25-2.25-2.25Zm-13.5,1.5h13.5c.41357,0,.75.33691.75.75v8.21069l-1.90869-1.90894c-.84961-.84961-2.3335-.84961-3.18213,0l-1.23193,1.23145c-.09717.09766-.25684.09668-.354.00098l-3.23193-3.23242c-.84961-.84961-2.3335-.84961-3.18213,0l-1.90918,1.90918v-6.21094c0-.41309.33643-.75.75-.75Zm0,11c-.41357,0-.75-.33691-.75-.75v-1.16797l2.97021-2.96973c.28223-.2832.77686-.2832,1.06006,0l3.23291,3.2334c.68164.67969,1.7915.68262,2.47412-.00098l1.23291-1.23242c.28223-.2832.77686-.2832,1.06006,0l2.70074,2.70068c-.1311.11206-.29553.18701-.48102.18701H3.25Z"
      fill="currentColor"
    />
  </svg>`,Tr=({width:r=24,height:e=24,hidden:t=!1,title:a="Default"}={})=>x`
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            role="img"
            fill="currentColor"
            width=${r}
            height=${e}
            aria-hidden=${t?"true":"false"}
            aria-label=${t?void 0:a}
        >
            <path
                d="m10,18.75c-4.82471,0-8.75-3.9248-8.75-8.75S5.17529,1.25,10,1.25s8.75,3.9248,8.75,8.75-3.92529,8.75-8.75,8.75Zm0-16c-3.99756,0-7.25,3.25195-7.25,7.25s3.25244,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25244-7.25-7.25-7.25Z"
                fill="currentColor"
                stroke-width="0"
            ></path>
        </svg>
    `;class Vn extends E{render(){return A(u),this.spectrumVersion===2?Wn({hidden:!this.label,title:this.label}):Tr({hidden:!this.label,title:this.label})}}z("sp-icon-image-background-remove",Vn);const Nn=({width:r=24,height:e=24,hidden:t=!1,title:a="Crop"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="m15.25,13.19141c-.41406,0-.75-.33594-.75-.75v-6.19141c0-.41309-.33691-.75-.75-.75h-6.2373c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h6.2373c1.24023,0,2.25,1.00977,2.25,2.25v6.19141c0,.41406-.33594.75-.75.75Z"
      fill="currentColor"
    />
    <path
      d="m18.60156,14.5H6.25c-.41309,0-.75-.33691-.75-.75V1.39844c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v2.60156H1.39844c-.41406,0-.75.33594-.75.75s.33594.75.75.75h2.60156v8.25c0,1.24023,1.00977,2.25,2.25,2.25h8.25v2.62305c0,.41406.33594.75.75.75s.75-.33594.75-.75v-2.62305h2.60156c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
      fill="currentColor"
    />
  </svg>`,Gn=({width:r=24,height:e=24,hidden:t=!1,title:a="Crop"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${r}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path d="M24 22h4V9a1 1 0 0 0-1-1H14v4h10Z" />
    <path
      d="M12 24V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v5H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h5v15a1 1 0 0 0 1 1h15v5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-5h5a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z"
    />
  </svg>`;class Un extends E{render(){return A(u),this.spectrumVersion===2?Nn({hidden:!this.label,title:this.label}):Gn({hidden:!this.label,title:this.label})}}z("sp-icon-crop",Un);const Qn=({width:r=24,height:e=24,hidden:t=!1,title:a="Rotate CC W"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="m1.72949,3.72896c.39209-.12061.81494.10059.93701.49658l.53143,1.73016c1.43658-2.33026,3.99622-3.82538,6.80206-3.82538,4.41113,0,8,3.58887,8,8s-3.58887,8-8,8c-2.66162,0-5.1416-1.31836-6.6333-3.52686-.23193-.34326-.1416-.80957.20166-1.0415.34375-.23145.80957-.14062,1.0415.20166,1.2124,1.79492,3.22754,2.8667,5.39014,2.8667,3.58398,0,6.5-2.91602,6.5-6.5,0-3.58398-2.91602-6.5-6.5-6.5-2.20074,0-4.21191,1.13434-5.3999,2.91516l1.54736-.47522c.39258-.11914.81543.1001.93701.49658.12158.396-.10059.81543-.49658.93701l-3.37988,1.03809c-.07324.02246-.14746.0332-.2207.0332-.32031,0-.61719-.20703-.71631-.52979l-1.03809-3.37939c-.12158-.396.10059-.81543.49658-.93701Z"
      fill="currentColor"
    />
  </svg>`,Zn=({width:r=24,height:e=24,hidden:t=!1,title:a="Rotate CC W"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${r}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <circle cx="26.747" cy="29.988" r="1.1" />
    <circle cx="30.347" cy="26.121" r="1.1" />
    <circle cx="21.992" cy="32.269" r="1.1" />
    <circle cx="16.796" cy="32.756" r="1.1" />
    <circle cx="11.712" cy="31.419" r="1.1" />
    <circle cx="7.367" cy="28.392" r="1.1" />
    <circle cx="4.454" cy="24.202" r="1.1" />
    <path
      d="M18 1.8A15.948 15.948 0 0 0 6.727 6.461L3.3 4.1a.5.5 0 0 0-.781.463l1.048 10.221 9.9-2.679a.5.5 0 0 0 .153-.894l-3.346-2.3a13.533 13.533 0 0 1 8.7-3.1c7.18 0 13.019 5.457 13.019 12.084v.028a14.832 14.832 0 0 1-.344 3.006 1.005 1.005 0 1 0 1.963.4A16 16 0 0 0 18 1.8Z"
    />
  </svg>`;class Xn extends E{render(){return A(u),this.spectrumVersion===2?Qn({hidden:!this.label,title:this.label}):Zn({hidden:!this.label,title:this.label})}}z("sp-icon-rotate-cc-w",Xn);const Yn=({width:r=24,height:e=24,hidden:t=!1,title:a="Rotate C W"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="m18.27051,3.72896c-.39209-.12061-.81494.10059-.93701.49658l-.53143,1.73016c-1.43658-2.33026-3.99622-3.82538-6.80206-3.82538C5.58887,2.13033,2,5.7192,2,10.13033s3.58887,8,8,8c2.66162,0,5.1416-1.31836,6.6333-3.52686.23193-.34326.1416-.80957-.20166-1.0415-.34375-.23145-.80957-.14062-1.0415.20166-1.2124,1.79492-3.22754,2.8667-5.39014,2.8667-3.58398,0-6.5-2.91602-6.5-6.5s2.91602-6.5,6.5-6.5c2.20074,0,4.21191,1.13434,5.3999,2.91516l-1.54736-.47522c-.39258-.11914-.81543.1001-.93701.49658-.12158.396.10059.81543.49658.93701l3.37988,1.03809c.07324.02246.14746.0332.2207.0332.32031,0,.61719-.20703.71631-.52979l1.03809-3.37939c.12158-.396-.10059-.81543-.49658-.93701Z"
      fill="currentColor"
    />
  </svg>`,Kn=({width:r=24,height:e=24,hidden:t=!1,title:a="Rotate C W"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${r}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <circle cx="9.253" cy="29.988" r="1.1" />
    <circle cx="5.653" cy="26.121" r="1.1" />
    <circle cx="14.008" cy="32.269" r="1.1" />
    <circle cx="19.204" cy="32.756" r="1.1" />
    <circle cx="24.288" cy="31.419" r="1.1" />
    <circle cx="28.633" cy="28.392" r="1.1" />
    <circle cx="31.546" cy="24.202" r="1.1" />
    <path
      d="M18 1.8a15.948 15.948 0 0 1 11.273 4.66L32.7 4.1a.5.5 0 0 1 .781.463l-1.048 10.221-9.9-2.679a.5.5 0 0 1-.153-.894l3.346-2.3a13.533 13.533 0 0 0-8.7-3.1c-7.18 0-13.019 5.457-13.019 12.084v.028a14.832 14.832 0 0 0 .344 3.006 1.072 1.072 0 0 1-.7 1.254 1.08 1.08 0 0 1-1.262-.856A16 16 0 0 1 18 1.8Z"
    />
  </svg>`;class Jn extends E{render(){return A(u),this.spectrumVersion===2?Yn({hidden:!this.label,title:this.label}):Kn({hidden:!this.label,title:this.label})}}z("sp-icon-rotate-c-w",Jn);const eo=({width:r=24,height:e=24,hidden:t=!1,title:a="Close"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="m11.06061,10l5.20648-5.20605c.29297-.29297.29297-.76758,0-1.06055s-.76758-.29297-1.06055,0l-5.20654,5.20605L4.79346,3.7334c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l5.20648,5.20605-5.20648,5.20605c-.29297.29297-.29297.76758,0,1.06055.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973l5.20654-5.20605,5.20654,5.20605c.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758,0-1.06055l-5.20648-5.20605Z"
      fill="currentColor"
    />
  </svg>`,to=({width:r=24,height:e=24,hidden:t=!1,title:a="Close"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 36 36"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M26.485 6.686 18 15.172 9.515 6.686a1 1 0 0 0-1.414 0L6.686 8.101a1 1 0 0 0 0 1.414L15.172 18l-8.486 8.485a1 1 0 0 0 0 1.414l1.415 1.415a1 1 0 0 0 1.414 0L18 20.828l8.485 8.486a1 1 0 0 0 1.414 0l1.415-1.415a1 1 0 0 0 0-1.414L20.828 18l8.486-8.485a1 1 0 0 0 0-1.414l-1.415-1.415a1 1 0 0 0-1.414 0Z"
    />
  </svg>`;class ro extends E{render(){return A(u),this.spectrumVersion===2?eo({hidden:!this.label,title:this.label}):to({hidden:!this.label,title:this.label})}}z("sp-icon-close",ro);const ao=({width:r=24,height:e=24,hidden:t=!1,title:a="Edit"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="m17.78076,1.75684c-1.27197-1.04102-3.22705-.89844-4.4502.32324L3.07764,12.33398c-.32031.31934-.55859.7168-.68896,1.15039l-1.38428,4.58398c-.08008.26465-.00781.55176.1875.74707.14258.14258.33447.21973.53027.21973.07227,0,.14551-.01074.2168-.03223l4.58252-1.38379c.43359-.12988.83154-.36816,1.15088-.68848,0,0,10.16846-10.16797,10.35547-10.35547.64795-.64746.99316-1.54492.94775-2.45996-.0459-.91504-.48145-1.77539-1.19482-2.3584ZM2.84473,17.16309l.97998-3.24609c.02716-.09033.06714-.17578.11377-.25732l2.40869,2.40918c-.08154.04639-.16718.08643-.25781.11377l-3.24463.98047Zm14.12158-11.64746c-.15472.15552-7.09985,7.1001-9.52545,9.52588l-2.47461-2.4751L14.39111,3.14062c.38623-.38672.896-.58594,1.38965-.58594.38086,0,.75244.11914,1.05029.3623.3916.32129.62109.77246.646,1.27246.0249.49316-.16113.97656-.51074,1.32617Z"
      fill="currentColor"
    />
  </svg>`,io=({width:r=24,height:e=24,hidden:t=!1,title:a="Edit"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${r}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M33.567 8.2 27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945ZM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73Z"
    />
  </svg>`;class no extends E{render(){return A(u),this.spectrumVersion===2?ao({hidden:!this.label,title:this.label}):io({hidden:!this.label,title:this.label})}}z("sp-icon-edit",no);const oo=({width:r=24,height:e=24,hidden:t=!1,title:a="Lock"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M11.25,11.5c0-.68945-.56055-1.25-1.25-1.25s-1.25.56055-1.25,1.25c0,.40259.20361.74487.5.97363v.77637c0,.41406.33594.75.75.75s.75-.33594.75-.75v-.77637c.29639-.22876.5-.57104.5-.97363Z"
      fill="currentColor"
    />
    <path
      d="M15,7.02539v-.52539c0-2.75684-2.24316-5-5-5s-5,2.24316-5,5v.52539c-1.12158.12622-2,1.07007-2,2.22461v6.5c0,1.24023,1.00977,2.25,2.25,2.25h9.5c1.24023,0,2.25-1.00977,2.25-2.25v-6.5c0-1.15454-.87842-2.09839-2-2.22461ZM10,3c1.92969,0,3.5,1.57031,3.5,3.5v.5h-7v-.5c0-1.92969,1.57031-3.5,3.5-3.5ZM15.5,15.75c0,.41309-.33691.75-.75.75H5.25c-.41309,0-.75-.33691-.75-.75v-6.5c0-.41309.33691-.75.75-.75h9.5c.41309,0,.75.33691.75.75v6.5Z"
      fill="currentColor"
    />
  </svg>`,so=({width:r=24,height:e=24,hidden:t=!1,title:a="Lock Closed"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 36 36"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M29 16h-1v-2a10 10 0 0 0-20 0v2H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1V17a1 1 0 0 0-1-1Zm-17-2a6 6 0 0 1 12 0v2H12Zm8 12.222V29a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2.778a3 3 0 1 1 4 0Z"
    />
  </svg>`;class lo extends E{render(){return A(u),this.spectrumVersion===2?oo({hidden:!this.label,title:this.label}):so({hidden:!this.label,title:this.label})}}z("sp-icon-lock",lo);const co=({width:r=24,height:e=24,hidden:t=!1,title:a="Lock Open"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M11.25,12.5c0-.68945-.56055-1.25-1.25-1.25s-1.25.56055-1.25,1.25c0,.40259.20361.74487.5.97363v.77637c0,.41406.33594.75.75.75s.75-.33594.75-.75v-.77637c.29639-.22876.5-.57104.5-.97363Z"
      fill="currentColor"
    />
    <path
      d="M14.75,8H6.5v-2.75c0-1.92969,1.57031-3.5,3.5-3.5.86523,0,1.69629.31836,2.33887.89551.30664.27734.7832.25293,1.05859-.05664.27734-.30762.25195-.78223-.05664-1.05859-.91797-.8252-2.10449-1.28027-3.34082-1.28027-2.75684,0-5,2.24316-5,5v2.77539c-1.12158.12622-2,1.07007-2,2.22461v6.5c0,1.24023,1.00977,2.25,2.25,2.25h9.5c1.24023,0,2.25-1.00977,2.25-2.25v-6.5c0-1.24023-1.00977-2.25-2.25-2.25ZM15.5,16.75c0,.41309-.33691.75-.75.75H5.25c-.41309,0-.75-.33691-.75-.75v-6.5c0-.41309.33691-.75.75-.75h9.5c.41309,0,.75.33691.75.75v6.5Z"
      fill="currentColor"
    />
  </svg>`,uo=({width:r=24,height:e=24,hidden:t=!1,title:a="Lock Open"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 36 36"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M29 16H11.9v-5.648A6.213 6.213 0 0 1 18 4a6.142 6.142 0 0 1 5.507 3.419c.31.639.266 1.146.777 1.146a.508.508 0 0 0 .186-.036l2.682-1.069a.514.514 0 0 0 .322-.471C27.474 5.513 24.167.2 18 .2 11.143.2 8 6.505 8 10.292V16H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1V17a1 1 0 0 0-1-1Zm-9 10.222V29a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2.778a3 3 0 1 1 4 0Z"
    />
  </svg>`;class po extends E{render(){return A(u),this.spectrumVersion===2?co({hidden:!this.label,title:this.label}):uo({hidden:!this.label,title:this.label})}}z("sp-icon-lock-open",po);const ho=({width:r=24,height:e=24,hidden:t=!1,title:a="Switch Vertical"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="m9.53027,4.46973l-3-3c-.29297-.29297-.76758-.29297-1.06055,0l-3,3c-.29297.29297-.29297.76758,0,1.06055s.76758.29297,1.06055,0l1.71973-1.71973v12.18945c0,.41406.33594.75.75.75s.75-.33594.75-.75V3.81055l1.71973,1.71973c.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758,0-1.06055Z"
      fill="currentColor"
    />
    <path
      d="m17.53027,14.46973c-.29297-.29297-.76758-.29297-1.06055,0l-1.71973,1.71973V4c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v12.18945l-1.71973-1.71973c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l3,3c.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973l3-3c.29297-.29297.29297-.76758,0-1.06055Z"
      fill="currentColor"
    />
  </svg>`;class mo extends E{render(){return A(u),this.spectrumVersion===2?ho({hidden:!this.label,title:this.label}):Tr({hidden:!this.label,title:this.label})}}z("sp-icon-switch-vertical",mo);const fo=({width:r=24,height:e=24,hidden:t=!1,title:a="Image Add"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="m14.5,7.52114c0,.82843-.67157,1.5-1.5,1.5-.82843,0-1.5-.67157-1.5-1.5,0-.82843.67157-1.5,1.5-1.5s1.5.67157,1.5,1.5h0"
      fill="currentColor"
    />
    <path
      d="m15,10.5c-2.48529,0-4.5,2.01471-4.5,4.5s2.01471,4.5,4.5,4.5,4.5-2.01471,4.5-4.5-2.01471-4.5-4.5-4.5Zm2.5,5.125h-1.875v1.875c0,.34473-.28027.625-.625.625s-.625-.28027-.625-.625v-1.875h-1.875c-.34473,0-.625-.28027-.625-.625s.28027-.625.625-.625h1.875v-1.875c0-.34473.28027-.625.625-.625s.625.28027.625.625v1.875h1.875c.34473,0,.625.28027.625.625s-.28027.625-.625.625Z"
      fill="currentColor"
    />
    <path
      d="m16.75,3H3.25c-1.24023,0-2.25,1.00977-2.25,2.25v9.5c0,1.24023,1.00977,2.25,2.25,2.25h5.08984c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75H3.25c-.41309,0-.75-.33691-.75-.75v-1.16895l2.96973-2.96875c.29297-.29297.76758-.29297,1.06055,0l1.91504,1.91504c.29297.29297.76758.29297,1.06055,0s.29297-.76758,0-1.06055l-1.91504-1.91504c-.87695-.87695-2.30469-.87695-3.18164,0l-1.90918,1.90869v-6.21045c0-.41309.33691-.75.75-.75h13.5c.41309,0,.75.33691.75.75v3.84668c0,.41406.33594.75.75.75s.75-.33594.75-.75v-3.84668c0-1.24023-1.00977-2.25-2.25-2.25Z"
      fill="currentColor"
    />
  </svg>`,go=({width:r=24,height:e=24,hidden:t=!1,title:a="Image Add"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 36 36"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <circle cx="24.7" cy="9.3" r="2.7" />
    <path
      d="m20.199 17.512-6.927-6.926a2 2 0 0 0-2.828 0L4 17.029V4h26v11.808c.697.205 1.365.475 2 .804V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v22a1 1 0 0 0 1 1h12.558a11.28 11.28 0 0 1 4.64-8.488Z"
    />
    <path
      d="M26.826 17.746a8.9 8.9 0 1 0 0 17.8 8.9 8.9 0 0 0 0-17.8Zm5 9.4a.5.5 0 0 1-.5.5h-3.5v3.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-3.5h-3.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3.5v-3.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.5h3.5a.5.5 0 0 1 .5.5v1Z"
    />
  </svg>`;class bo extends E{render(){return A(u),this.spectrumVersion===2?fo({hidden:!this.label,title:this.label}):go({hidden:!this.label,title:this.label})}}z("sp-icon-image-add",bo);const vo=({width:r=24,height:e=24,hidden:t=!1,title:a="Open In"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="m18,15.75V4.25c0-1.24072-1.00928-2.25-2.25-2.25H4.25c-1.24072,0-2.25,1.00928-2.25,2.25v3.71777c0,.41406.33594.75.75.75s.75-.33594.75-.75v-3.71777c0-.41357.33643-.75.75-.75h11.5c.41357,0,.75.33643.75.75v11.5c0,.41357-.33643.75-.75.75h-3.81104c-.41406,0-.75.33594-.75.75s.33594.75.75.75h3.81104c1.24072,0,2.25-1.00928,2.25-2.25Z"
      fill="currentColor"
    />
    <path
      d="m11,9.75v4.24268c0,.41406-.33594.75-.75.75s-.75-.33594-.75-.75v-2.43213l-6.46973,6.46973c-.14648.14648-.33838.21973-.53027.21973s-.38379-.07324-.53027-.21973c-.29297-.29297-.29297-.76758,0-1.06055l6.46973-6.46973h-2.43213c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h4.24268c.41406,0,.75.33594.75.75Z"
      fill="currentColor"
    />
  </svg>`,yo=({width:r=24,height:e=24,hidden:t=!1,title:a="Open In"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 36 36"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M33 2H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V6h24v24H19a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"
    />
    <path
      d="M18.636 27.764a.784.784 0 0 0 .56.236.803.803 0 0 0 .804-.754v-10.75a.497.497 0 0 0-.496-.496H8.754a.803.803 0 0 0-.754.804.785.785 0 0 0 .235.56l3.786 3.786-9.042 9.042a1 1 0 0 0 0 1.415l1.414 1.414a1 1 0 0 0 1.414 0l9.043-9.042Z"
    />
  </svg>`;class wo extends E{render(){return A(u),this.spectrumVersion===2?vo({hidden:!this.label,title:this.label}):yo({hidden:!this.label,title:this.label})}}z("sp-icon-open-in",wo);const ko=({width:r=24,height:e=24,hidden:t=!1,title:a="People Group"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M13.01758,13.27148c-1.97949,0-3.58984-1.69043-3.58984-3.76758s1.61035-3.76758,3.58984-3.76758,3.58984,1.69043,3.58984,3.76758-1.61035,3.76758-3.58984,3.76758ZM13.01758,7.23633c-1.15234,0-2.08984,1.01758-2.08984,2.26758s.9375,2.26758,2.08984,2.26758,2.08984-1.01758,2.08984-2.26758-.9375-2.26758-2.08984-2.26758Z"
      fill="currentColor"
    />
    <path
      d="M7.87109,18.97266c-.02734,0-.05469-.00098-.08203-.00391-.41113-.04492-.70898-.41504-.66504-.82715.26074-2.40527,2.79395-4.21973,5.89355-4.21973,3.07617,0,5.66504,1.85742,5.89355,4.22852.04004.41211-.26172.7793-.67383.81836-.4082.04688-.7793-.26172-.81836-.67383-.15332-1.58398-2.12793-2.87305-4.40137-2.87305-2.29395,0-4.22656,1.26562-4.40137,2.88184-.04199.38379-.36719.66895-.74512.66895Z"
      fill="currentColor"
    />
    <path
      d="M3.83301,16.33887c-.02734,0-.05371-.00098-.08105-.00391-.41211-.04492-.70996-.41504-.66602-.82617.23047-2.13672,2.2832-3.85059,4.99219-4.16797.4043-.0459.7832.24707.83203.6582.04785.41113-.24609.7832-.6582.83203-1.97656.23145-3.52148,1.4248-3.67383,2.83789-.04199.38477-.36719.66992-.74512.66992Z"
      fill="currentColor"
    />
    <path
      d="M.82031,13.44336c-.02734,0-.05371-.00098-.08105-.00391-.41211-.04492-.70996-.41504-.66602-.82617.21387-1.97949,2.10938-3.56543,4.60938-3.8584.40332-.04688.7832.24707.83203.6582.04785.41113-.24609.78418-.6582.83203-1.77148.20703-3.15527,1.27051-3.29102,2.52832-.04199.38477-.36719.66992-.74512.66992Z"
      fill="currentColor"
    />
    <path
      d="M7.56543,9.64844c-.20703,0-.41309-.08496-.56055-.25195-.58398-.6582-.92578-1.51465-.96289-2.41211-.08691-2.0752,1.45215-3.83105,3.42969-3.91309.4502-.02148.89062.0498,1.31445.20215.38965.13965.59082.57031.4502.95996-.13965.38867-.56836.58887-.95996.4502-.23828-.08496-.49023-.12109-.74316-.11426-1.15039.04883-2.04492,1.10352-1.99316,2.35254.02344.55371.23145,1.0791.58594,1.47852.27539.30957.24707.78418-.0625,1.05859-.14258.12695-.32031.18945-.49805.18945Z"
      fill="currentColor"
    />
    <path
      d="M3.95117,7.25391c-.19141,0-.38281-.07227-.52832-.21777-.87109-.86523-1.20898-2.31445-.82324-3.52539.54785-1.71875,2.28809-2.74902,3.95996-2.34668.40234.09766.65039.50293.55371.90527-.09766.40332-.50684.64746-.90527.55371-.91602-.2207-1.86816.37109-2.17871,1.34375-.21191.66309-.01367,1.54395.4502,2.00488.29395.29199.2959.76758.00391,1.06055-.14648.14746-.33984.22168-.53223.22168Z"
      fill="currentColor"
    />
  </svg>`,xo=({width:r=24,height:e=24,hidden:t=!1,title:a="People Group"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${r}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M13.974 6.752a3.947 3.947 0 1 0-.008-5.6 5.872 5.872 0 0 1 .731 2.8 5.886 5.886 0 0 1-.723 2.8Zm3 2.248h-.449a9.833 9.833 0 0 0-1.352.093 6.961 6.961 0 0 1 2.326 5.36v9.412a2.567 2.567 0 0 1-2.562 2.563h-.371l-.818 8.743.032.34a.562.562 0 0 0 .558.489h4.812a.562.562 0 0 0 .558-.489l1.038-11.082h2.192a.563.563 0 0 0 .563-.562v-9.415C23.5 10.813 20.579 9 16.975 9Z"
    />
    <path
      d="M22.474 6.752a3.947 3.947 0 1 0-.008-5.6 5.872 5.872 0 0 1 .731 2.8 5.886 5.886 0 0 1-.723 2.8Zm3 2.248h-.449a9.833 9.833 0 0 0-1.352.093A6.961 6.961 0 0 1 26 14.453v9.412a2.567 2.567 0 0 1-2.562 2.563h-.371l-.818 8.743.032.34a.562.562 0 0 0 .558.489h4.812a.562.562 0 0 0 .558-.489l1.038-11.082h2.192a.563.563 0 0 0 .561-.563v-9.414C32 10.813 29.079 9 25.475 9ZM12.7 3.948A3.948 3.948 0 1 1 8.75 0a3.948 3.948 0 0 1 3.95 3.948ZM8.975 9h-.45C4.921 9 2 10.814 2 14.453v9.413a.562.562 0 0 0 .563.563h2.185L5.78 35.51a.563.563 0 0 0 .558.49h4.812a.562.562 0 0 0 .558-.489l1.038-11.082h2.192a.562.562 0 0 0 .562-.563v-9.413C15.5 10.814 12.579 9 8.975 9Z"
    />
  </svg>`;class Co extends E{render(){return A(u),this.spectrumVersion===2?ko({hidden:!this.label,title:this.label}):xo({hidden:!this.label,title:this.label})}}z("sp-icon-people-group",Co);const zo=({width:r=24,height:e=24,hidden:t=!1,title:a="Chevron200"}={})=>_e`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
    width="${r}"
    height="${e}"
  >
    <path
      d="M9.034 5.356 4.343.663a.911.911 0 0 0-1.29 1.289L7.102 6l-4.047 4.047a.911.911 0 1 0 1.289 1.29l4.691-4.692a.91.91 0 0 0 0-1.29z"
    />
  </svg>`,_o=({width:r=24,height:e=24,hidden:t=!1,title:a="Chevron200"}={})=>_e`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
    width="${r}"
    height="${e}"
  >
    <path
      d="M9.034 5.356 4.343.663a.911.911 0 0 0-1.29 1.289L7.102 6l-4.047 4.047a.911.911 0 1 0 1.289 1.29l4.691-4.692a.91.91 0 0 0 0-1.29z"
    />
  </svg>`;class Po extends E{render(){return Bt(u),this.spectrumVersion===2?zo({hidden:!this.label,title:this.label}):_o({hidden:!this.label,title:this.label})}}z("sp-icon-chevron200",Po);const $o=({width:r=24,height:e=24,hidden:t=!1,title:a="Chevron50"}={})=>_e`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M1.985 5.961a.695.695 0 0 1-.7-.704.7.7 0 0 1 .209-.493L3.279 3 1.51 1.251A.7.7 0 0 1 1.3.757.696.696 0 0 1 2.492.255l2.275 2.247a.7.7 0 0 1 0 .996L2.477 5.76a.7.7 0 0 1-.492.201"
    />
  </svg>`,Mo=({width:r=24,height:e=24,hidden:t=!1,title:a="Chevron50"}={})=>_e`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M1.985 5.961a.695.695 0 0 1-.7-.704.7.7 0 0 1 .209-.493L3.279 3 1.51 1.251A.7.7 0 0 1 1.3.757.696.696 0 0 1 2.492.255l2.275 2.247a.7.7 0 0 1 0 .996L2.477 5.76a.7.7 0 0 1-.492.201"
    />
  </svg>`;class So extends E{render(){return Bt(u),this.spectrumVersion===2?$o({hidden:!this.label,title:this.label}):Mo({hidden:!this.label,title:this.label})}}z("sp-icon-chevron50",So);const Eo=({width:r=24,height:e=24,hidden:t=!1,title:a="Chevron75"}={})=>_e`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
    width="${r}"
    height="${e}"
  >
    <path
      d="m7.482 4.406-.001-.001L3.86.783a.84.84 0 0 0-1.188 1.188L5.702 5l-3.03 3.03A.84.84 0 0 0 3.86 9.216l3.621-3.622h.001a.84.84 0 0 0 0-1.19z"
    />
  </svg>`,jo=({width:r=24,height:e=24,hidden:t=!1,title:a="Chevron75"}={})=>_e`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
    width="${r}"
    height="${e}"
  >
    <path
      d="m7.482 4.406-.001-.001L3.86.783a.84.84 0 0 0-1.188 1.188L5.702 5l-3.03 3.03A.84.84 0 0 0 3.86 9.216l3.621-3.622h.001a.84.84 0 0 0 0-1.19z"
    />
  </svg>`;class Ro extends E{render(){return Bt(u),this.spectrumVersion===2?Eo({hidden:!this.label,title:this.label}):jo({hidden:!this.label,title:this.label})}}z("sp-icon-chevron75",Ro);const Do=$`
    :host{--spectrum-infield-button-height:var(--spectrum-component-height-100);--spectrum-infield-button-width:var(--spectrum-component-height-100);--spectrum-infield-button-stacked-border-radius-reset:var(--spectrum-in-field-button-fill-stacked-inner-border-rounding);--spectrum-infield-button-edge-to-fill:var(--spectrum-in-field-button-edge-to-fill);--spectrum-infield-button-inner-edge-to-fill:var(--spectrum-in-field-button-stacked-inner-edge-to-fill);--spectrum-infield-button-fill-padding:0px;--spectrum-infield-button-stacked-fill-padding-inline:var(--spectrum-in-field-button-edge-to-disclosure-icon-stacked-medium);--spectrum-infield-button-stacked-fill-padding-outer:var(--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-medium);--spectrum-infield-button-stacked-fill-padding-inner:var(--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-medium);--spectrum-infield-button-icon-color:var(--spectrum-neutral-content-color-default);--spectrum-infield-button-icon-color-hover:var(--spectrum-neutral-content-color-hover);--spectrum-infield-button-icon-color-down:var(--spectrum-neutral-content-color-down);--spectrum-infield-button-icon-color-key-focus:var(--spectrum-neutral-content-color-key-focus);--spectrum-infield-button-fill-justify-content:center}:host([disabled]){--mod-infield-button-background-color:var(--mod-infield-button-background-color-disabled,var(--spectrum-disabled-background-color));--mod-infield-button-background-color-hover:var(--mod-infield-button-background-color-hover-disabled,var(--spectrum-disabled-background-color));--mod-infield-button-background-color-down:var(--mod-infield-button-background-color-down-disabled,var(--spectrum-disabled-background-color));--mod-infield-button-border-color:var(--mod-infield-button-border-color-disabled,var(--spectrum-infield-button-border-color));--mod-infield-button-icon-color:var(--mod-infield-button-icon-color-disabled,var(--spectrum-disabled-content-color));--mod-infield-button-icon-color-hover:var(--mod-infield-button-icon-color-hover-disabled,var(--spectrum-disabled-content-color));--mod-infield-button-icon-color-down:var(--mod-infield-button-icon-color-down-disabled,var(--spectrum-disabled-content-color));--mod-infield-button-icon-color-key-focus:var(--mod-infield-button-icon-color-key-focus-disabled,var(--spectrum-disabled-content-color))}:host([size=s]){--spectrum-infield-button-height:var(--spectrum-component-height-75);--spectrum-infield-button-width:var(--spectrum-component-height-75);--spectrum-infield-button-stacked-fill-padding-inline:var(--spectrum-in-field-button-edge-to-disclosure-icon-stacked-small);--spectrum-infield-button-stacked-fill-padding-outer:var(--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-small);--spectrum-infield-button-stacked-fill-padding-inner:var(--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-small)}:host([size=l]){--spectrum-infield-button-height:var(--spectrum-component-height-200);--spectrum-infield-button-width:var(--spectrum-component-height-200);--spectrum-infield-button-stacked-fill-padding-inline:var(--spectrum-in-field-button-edge-to-disclosure-icon-stacked-large);--spectrum-infield-button-stacked-fill-padding-outer:var(--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-large);--spectrum-infield-button-stacked-fill-padding-inner:var(--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-large)}:host([size=xl]){--spectrum-infield-button-height:var(--spectrum-component-height-300);--spectrum-infield-button-width:var(--spectrum-component-height-300);--spectrum-infield-button-stacked-fill-padding-inline:var(--spectrum-in-field-button-edge-to-disclosure-icon-stacked-extra-large);--spectrum-infield-button-stacked-fill-padding-outer:var(--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-extra-large);--spectrum-infield-button-stacked-fill-padding-inner:var(--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-extra-large)}:host([block=end]),:host([block=start]){--mod-infield-button-width:var(--mod-infield-button-width-stacked,var(--spectrum-in-field-button-width-stacked-medium))}:host([block=end][size=s]),:host([block=start][size=s]){--mod-infield-button-width:var(--mod-infield-button-width-stacked,var(--spectrum-in-field-button-width-stacked-small))}:host([block=end][size=l]),:host([block=start][size=l]){--mod-infield-button-width:var(--mod-infield-button-width-stacked,var(--spectrum-in-field-button-width-stacked-large))}:host([block=end][size=xl]),:host([block=start][size=xl]){--mod-infield-button-width:var(--mod-infield-button-width-stacked,var(--spectrum-in-field-button-width-stacked-extra-large))}:host([quiet]){--mod-infield-button-background-color:var(--mod-infield-button-background-color-quiet,transparent);--mod-infield-button-background-color-hover:var(--mod-infield-button-background-color-hover-quiet,transparent);--mod-infield-button-background-color-down:var(--mod-infield-button-background-color-down-quiet,transparent);--mod-infield-button-background-color-key-focus:var(--mod-infield-button-background-color-key-focus-quiet,transparent);--mod-infield-border-color:var(--mod-infield-border-color-quiet,transparent);--mod-infield-button-border-width:var(--mod-infield-button-border-width-quiet,0)}:host([quiet][disabled]){--mod-infield-button-background-color:var(--mod-infield-button-background-color-quiet-disabled,transparent);--mod-infield-button-border-color:var(--mod-infield-button-border-color-quiet-disabled,transparent)}@media (hover:hover){:host(:hover){--mod-infield-button-background-color:var(--mod-infield-button-background-color-hover,var(--spectrum-infield-button-background-color-hover));--mod-infield-button-icon-color:var(--mod-infield-button-icon-color-hover,var(--spectrum-infield-button-icon-color-hover))}}:host(:is(:active,[active])){--mod-infield-button-background-color:var(--mod-infield-button-background-color-down,var(--spectrum-infield-button-background-color-down));--mod-infield-button-icon-color:var(--mod-infield-button-icon-color-down,var(--spectrum-infield-button-icon-color-down))}:host(:focus-visible){--mod-infield-button-background-color:var(--mod-infield-button-background-color-key-focus,var(--spectrum-infield-button-background-color-key-focus));--mod-infield-button-icon-color:var(--mod-infield-button-icon-color-key-focus,var(--spectrum-infield-button-icon-color-key-focus))}@media (forced-colors:active){:host{--highcontrast-infield-button-border-color:ButtonText;--highcontrast-infield-button-border-color-active:Highlight}:host([disabled]){--highcontrast-infield-button-border-color:inherit}:host(:is(:active,[active])):not(:disabled),:host:not(:disabled):focus-visible{--highcontrast-infield-button-border-color:var(--highcontrast-infield-button-border-color-active)}@media (hover:hover){:host:not(:disabled):hover{--highcontrast-infield-button-border-color:var(--highcontrast-infield-button-border-color-active)}}}:host{background-color:initial;cursor:pointer;block-size:var(--mod-infield-button-height,var(--spectrum-infield-button-height));inline-size:var(--mod-infield-button-width,var(--spectrum-infield-button-width));padding:var(--mod-infield-button-edge-to-fill,var(--spectrum-infield-button-edge-to-fill));border-style:none;justify-content:center;align-items:center;display:flex}:host([disabled]){cursor:auto}:host(:focus-visible){outline:none}:host([block=end]),:host([block=start]){block-size:calc(var(--mod-infield-button-height,var(--spectrum-infield-button-height))/2)}:host([block=start]){padding-block-end:var(--mod-infield-button-inner-edge-to-fill,var(--spectrum-infield-button-inner-edge-to-fill))}:host([block=end]){padding-block-start:var(--mod-infield-button-inner-edge-to-fill,var(--spectrum-infield-button-inner-edge-to-fill))}.fill{block-size:100%;inline-size:100%;background-color:var(--mod-infield-button-background-color,var(--spectrum-infield-button-background-color));border-width:var(--mod-infield-button-border-width,var(--spectrum-infield-button-border-width));border-style:solid;border-color:var(--highcontrast-infield-button-border-color,var(--mod-infield-button-border-color,var(--spectrum-infield-button-border-color)));padding:var(--mod-infield-button-fill-padding,var(--spectrum-infield-button-fill-padding));align-items:center;justify-content:var(--mod-infield-button-fill-justify-content,var(--spectrum-infield-button-fill-justify-content));transition:border-color var(--spectrum-animation-duration-100)ease-in-out;border-start-start-radius:var(--mod-infield-button-border-radius,var(--spectrum-infield-button-border-radius));border-start-end-radius:var(--mod-infield-button-border-radius,var(--spectrum-infield-button-border-radius));border-end-end-radius:var(--mod-infield-button-border-radius,var(--spectrum-infield-button-border-radius));border-end-start-radius:var(--mod-infield-button-border-radius,var(--spectrum-infield-button-border-radius));display:flex}:host([inline=end]) .fill{border-start-start-radius:var(--mod-infield-button-border-radius-reset,var(--spectrum-infield-button-border-radius-reset));border-end-start-radius:var(--mod-infield-button-border-radius-reset,var(--spectrum-infield-button-border-radius-reset))}:host([inline=start]) .fill{border-start-end-radius:var(--mod-infield-button-border-radius-reset,var(--spectrum-infield-button-border-radius-reset));border-end-end-radius:var(--mod-infield-button-border-radius-reset,var(--spectrum-infield-button-border-radius-reset))}:host([block=end]) .fill,:host([block=start]) .fill{box-sizing:border-box;padding-inline-start:calc(var(--mod-infield-button-stacked-fill-padding-inline,var(--spectrum-infield-button-stacked-fill-padding-inline)) - var(--mod-infield-button-edge-to-fill,var(--spectrum-infield-button-edge-to-fill)) - var(--mod-infield-button-border-width,var(--spectrum-infield-button-border-width)));padding-inline-end:calc(var(--mod-infield-button-stacked-fill-padding-inline,var(--spectrum-infield-button-stacked-fill-padding-inline)) - var(--mod-infield-button-edge-to-fill,var(--spectrum-infield-button-edge-to-fill)) - var(--mod-infield-button-border-width,var(--spectrum-infield-button-border-width)))}:host([block=start]) .fill{border-block-end:none;border-start-start-radius:var(--mod-infield-button-stacked-top-border-radius-start-start,var(--spectrum-infield-button-stacked-top-border-radius-start-start));border-end-end-radius:var(--mod-infield-button-stacked-border-radius-reset,var(--spectrum-infield-button-stacked-border-radius-reset));border-end-start-radius:var(--mod-infield-button-stacked-border-radius-reset,var(--spectrum-infield-button-stacked-border-radius-reset));padding-block-start:calc(var(--mod-infield-button-stacked-fill-padding-outer,var(--spectrum-infield-button-stacked-fill-padding-outer)) - var(--mod-infield-button-edge-to-fill,var(--spectrum-infield-button-edge-to-fill)) - var(--mod-infield-button-border-width,var(--spectrum-infield-button-border-width)));padding-block-end:calc(var(--mod-infield-button-stacked-fill-padding-inner,var(--spectrum-infield-button-stacked-fill-padding-inner)) - var(--mod-infield-button-inner-edge-to-fill,var(--spectrum-infield-button-inner-edge-to-fill)))}:host([block=end]) .fill{border-block-end-width:var(--mod-infield-button-stacked-bottom-border-block-end-width,var(--mod-infield-button-border-width,var(--spectrum-infield-button-border-width)));border-start-start-radius:var(--mod-infield-button-stacked-border-radius-reset,var(--spectrum-infield-button-stacked-border-radius-reset));border-start-end-radius:var(--mod-infield-button-stacked-border-radius-reset,var(--spectrum-infield-button-stacked-border-radius-reset));border-end-end-radius:var(--mod-infield-button-stacked-bottom-border-radius-end-end,var(--mod-infield-button-border-radius,var(--spectrum-infield-button-border-radius)));border-end-start-radius:var(--mod-infield-button-stacked-bottom-border-radius-end-start,var(--spectrum-infield-button-stacked-bottom-border-radius-end-start));padding-block-start:calc(var(--mod-infield-button-stacked-fill-padding-inner,var(--spectrum-infield-button-stacked-fill-padding-inner)) - var(--mod-infield-button-edge-to-fill,var(--spectrum-infield-button-edge-to-fill)) - var(--mod-infield-button-border-width,var(--spectrum-infield-button-border-width)));padding-block-end:calc(var(--mod-infield-button-stacked-fill-padding-outer,var(--spectrum-infield-button-stacked-fill-padding-outer)) - var(--mod-infield-button-inner-edge-to-fill,var(--spectrum-infield-button-inner-edge-to-fill)) - var(--mod-infield-button-border-width,var(--spectrum-infield-button-border-width)))}::slotted(*){display:initial;color:var(--mod-infield-button-icon-color,var(--spectrum-infield-button-icon-color));flex-shrink:0;margin:0!important}:host{--spectrum-infield-button-border-width:var(--system-infield-button-border-width);--spectrum-infield-button-border-color:var(--system-infield-button-border-color);--spectrum-infield-button-border-radius:var(--system-infield-button-border-radius);--spectrum-infield-button-border-radius-reset:var(--system-infield-button-border-radius-reset);--spectrum-infield-button-stacked-top-border-radius-start-start:var(--system-infield-button-stacked-top-border-radius-start-start);--spectrum-infield-button-stacked-bottom-border-radius-end-start:var(--system-infield-button-stacked-bottom-border-radius-end-start);--spectrum-infield-button-background-color:var(--system-infield-button-background-color);--spectrum-infield-button-background-color-hover:var(--system-infield-button-background-color-hover);--spectrum-infield-button-background-color-down:var(--system-infield-button-background-color-down);--spectrum-infield-button-background-color-key-focus:var(--system-infield-button-background-color-key-focus)}:host([disabled]){--spectrum-infield-button-border-color:var(--system-infield-button-disabled-border-color)}:host{box-sizing:border-box;user-select:none}::slotted(*){--spectrum-icon-size:inherit}
`;var Ao=Object.defineProperty,Ct=(r,e,t,a)=>{for(var i=void 0,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=s(e,t,i)||i);return i&&Ao(e,t,i),i};class Ye extends pe(na,{noDefaultSize:!0,validSizes:["s","m","l","xl"]}){constructor(){super(...arguments),this.quiet=!1}static get styles(){return[...super.styles,Do]}get buttonContent(){return[u`
            <div class="fill">
                <slot></slot>
            </div>
        `]}}Ct([f()],Ye.prototype,"block"),Ct([f()],Ye.prototype,"inline"),Ct([f({type:Boolean,reflect:!0})],Ye.prototype,"quiet");customElements.define("sp-infield-button",Ye);class To{constructor(e,{mode:t}={mode:"internal"}){this.mode="internal",this.handleSlotchange=({target:a})=>{this.handleHelpText(a),this.handleNegativeHelpText(a)},this.host=e,this.id=`sp-help-text-${Ut()}`,this.mode=t}get isInternal(){return this.mode==="internal"}render(e){return u`
            <div
                id=${M(this.isInternal?this.id:void 0)}
                aria-live="assertive"
            >
                <slot
                    name=${e?"negative-help-text":`pass-through-help-text-${Ut()}`}
                    @slotchange=${this.handleSlotchange}
                >
                    <slot name="help-text"></slot>
                </slot>
            </div>
        `}addId(){const e=this.helpTextElement?this.helpTextElement.id:this.id;this.conditionId=Qr(this.host,"aria-describedby",e),this.host.hasAttribute("tabindex")&&(this.previousTabindex=parseFloat(this.host.getAttribute("tabindex"))),this.host.tabIndex=0}removeId(){this.conditionId&&(this.conditionId(),delete this.conditionId),!this.helpTextElement&&(this.previousTabindex?this.host.tabIndex=this.previousTabindex:this.host.removeAttribute("tabindex"))}handleHelpText(e){if(this.isInternal)return;this.helpTextElement&&this.helpTextElement.id===this.id&&this.helpTextElement.removeAttribute("id"),this.removeId();const t=e.assignedElements()[0];this.helpTextElement=t,t&&(t.id||(t.id=this.id),this.addId())}handleNegativeHelpText(e){e.name==="negative-help-text"&&e.assignedElements().forEach(t=>t.variant="negative")}}function Bo(r,{mode:e}={mode:"internal"}){class t extends r{constructor(){super(...arguments),this.helpTextManager=new To(this,{mode:e})}get helpTextId(){return this.helpTextManager.id}renderHelpText(i){return this.helpTextManager.render(i)}}return t}const Lo=$`
    :host{--spectrum-textfield-input-line-height:var(--spectrum-textfield-height);--spectrum-texfield-animation-duration:var(--spectrum-animation-duration-100);--spectrum-textfield-width:240px;--spectrum-textfield-min-width:var(--spectrum-text-field-minimum-width-multiplier);--spectrum-textfield-corner-radius:var(--spectrum-corner-radius-100);--spectrum-textfield-spacing-inline-quiet:var(--spectrum-field-edge-to-text-quiet);--spectrum-textfield-spacing-block-start:var(--spectrum-component-top-to-text-100);--spectrum-textfield-spacing-block-end:var(--spectrum-component-bottom-to-text-100);--spectrum-textfield-spacing-block-quiet:var(--spectrum-field-edge-to-border-quiet);--spectrum-textfield-label-spacing-block:var(--spectrum-field-label-to-component);--spectrum-textfield-helptext-spacing-block:var(--spectrum-help-text-to-component);--spectrum-textfield-icon-spacing-inline-end-quiet-invalid:var(--spectrum-field-edge-to-alert-icon-quiet);--spectrum-textfield-icon-spacing-inline-end-quiet-valid:var(--spectrum-field-edge-to-validation-icon-quiet);--spectrum-textfield-font-family:var(--spectrum-sans-font-family-stack);--spectrum-textfield-font-weight:var(--spectrum-regular-font-weight);--spectrum-textfield-character-count-font-family:var(--spectrum-sans-font-family-stack);--spectrum-textfield-character-count-font-weight:var(--spectrum-regular-font-weight);--spectrum-textfield-character-count-spacing-inline:var(--spectrum-spacing-200);--spectrum-textfield-character-count-spacing-inline-side:var(--spectrum-side-label-character-count-to-field);--spectrum-textfield-focus-indicator-width:var(--spectrum-focus-indicator-thickness);--spectrum-textfield-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-textfield-text-color-default:var(--spectrum-neutral-content-color-default);--spectrum-textfield-text-color-hover:var(--spectrum-neutral-content-color-hover);--spectrum-textfield-text-color-focus:var(--spectrum-neutral-content-color-focus);--spectrum-textfield-text-color-focus-hover:var(--spectrum-neutral-content-color-focus-hover);--spectrum-textfield-text-color-keyboard-focus:var(--spectrum-neutral-content-color-key-focus);--spectrum-textfield-text-color-readonly:var(--spectrum-neutral-content-color-default);--spectrum-textfield-text-color-disabled:var(--spectrum-disabled-content-color);--spectrum-textfield-border-color-invalid-default:var(--spectrum-negative-border-color-default);--spectrum-textfield-border-color-invalid-hover:var(--spectrum-negative-border-color-hover);--spectrum-textfield-border-color-invalid-focus:var(--spectrum-negative-border-color-focus);--spectrum-textfield-border-color-invalid-focus-hover:var(--spectrum-negative-border-color-focus-hover);--spectrum-textfield-border-color-invalid-keyboard-focus:var(--spectrum-negative-border-color-key-focus);--spectrum-textfield-icon-color-invalid:var(--spectrum-negative-visual-color);--spectrum-textfield-text-color-invalid:var(--spectrum-neutral-content-color-default);--spectrum-textfield-text-color-valid:var(--spectrum-neutral-content-color-default);--spectrum-textfield-icon-color-valid:var(--spectrum-positive-visual-color);--spectrum-textfield-focus-indicator-color:var(--spectrum-focus-indicator-color);--spectrum-text-area-min-inline-size:var(--spectrum-text-area-minimum-width);--spectrum-text-area-min-block-size:var(--spectrum-text-area-minimum-height);--spectrum-textfield-height:var(--spectrum-component-height-100);--spectrum-textfield-label-spacing-block-quiet:var(--spectrum-field-label-to-component-quiet-medium);--spectrum-textfield-label-spacing-inline-side-label:var(--spectrum-spacing-200);--spectrum-textfield-placeholder-font-size:var(--spectrum-font-size-100);--spectrum-textfield-spacing-inline:var(--spectrum-component-edge-to-text-100);--spectrum-textfield-icon-size-invalid:var(--spectrum-workflow-icon-size-100);--spectrum-textfield-icon-size-valid:var(--spectrum-checkmark-icon-size-100);--spectrum-textfield-icon-spacing-inline-end-invalid:var(--spectrum-field-edge-to-alert-icon-medium);--spectrum-textfield-icon-spacing-inline-end-valid:var(--spectrum-field-edge-to-validation-icon-medium);--spectrum-textfield-icon-spacing-block-valid:var(--spectrum-field-top-to-validation-icon-medium);--spectrum-textfield-icon-spacing-inline-start-invalid:var(--spectrum-field-text-to-alert-icon-medium);--spectrum-textfield-icon-spacing-inline-start-valid:var(--spectrum-field-text-to-validation-icon-medium);--spectrum-textfield-character-count-font-size:var(--spectrum-font-size-75);--spectrum-textfield-character-count-spacing-block:var(--spectrum-component-bottom-to-text-75);--spectrum-textfield-character-count-spacing-block-quiet:var(--spectrum-character-count-to-field-quiet-medium);--spectrum-textfield-character-count-spacing-block-side:var(--spectrum-side-label-character-count-top-margin-medium);--spectrum-text-area-min-block-size-quiet:var(--spectrum-component-height-100)}:host([size=s]) #textfield{--spectrum-textfield-height:var(--spectrum-component-height-75);--spectrum-textfield-label-spacing-block-quiet:var(--spectrum-field-label-to-component-quiet-small);--spectrum-textfield-label-spacing-inline-side-label:var(--spectrum-spacing-100);--spectrum-textfield-placeholder-font-size:var(--spectrum-font-size-75);--spectrum-textfield-spacing-inline:var(--spectrum-component-edge-to-text-75);--spectrum-textfield-icon-size-invalid:var(--spectrum-workflow-icon-size-75);--spectrum-textfield-icon-size-valid:var(--spectrum-checkmark-icon-size-75);--spectrum-textfield-icon-spacing-inline-end-invalid:var(--spectrum-field-edge-to-alert-icon-small);--spectrum-textfield-icon-spacing-inline-end-valid:var(--spectrum-field-edge-to-validation-icon-small);--spectrum-textfield-icon-spacing-block-valid:var(--spectrum-field-top-to-validation-icon-small);--spectrum-textfield-icon-spacing-inline-start-invalid:var(--spectrum-field-text-to-alert-icon-small);--spectrum-textfield-icon-spacing-inline-start-valid:var(--spectrum-field-text-to-validation-icon-small);--spectrum-textfield-character-count-font-size:var(--spectrum-font-size-75);--spectrum-textfield-character-count-spacing-block:var(--spectrum-component-bottom-to-text-75);--spectrum-textfield-character-count-spacing-block-quiet:var(--spectrum-character-count-to-field-quiet-small);--spectrum-textfield-character-count-spacing-block-side:var(--spectrum-side-label-character-count-top-margin-small);--spectrum-text-area-min-block-size-quiet:var(--spectrum-component-height-75)}:host([size=l]) #textfield{--spectrum-textfield-height:var(--spectrum-component-height-200);--spectrum-textfield-label-spacing-block-quiet:var(--spectrum-field-label-to-component-quiet-large);--spectrum-textfield-label-spacing-inline-side-label:var(--spectrum-spacing-200);--spectrum-textfield-placeholder-font-size:var(--spectrum-font-size-200);--spectrum-textfield-spacing-inline:var(--spectrum-component-edge-to-text-200);--spectrum-textfield-icon-size-invalid:var(--spectrum-workflow-icon-size-200);--spectrum-textfield-icon-size-valid:var(--spectrum-checkmark-icon-size-200);--spectrum-textfield-icon-spacing-inline-end-invalid:var(--spectrum-field-edge-to-alert-icon-large);--spectrum-textfield-icon-spacing-inline-end-valid:var(--spectrum-field-edge-to-validation-icon-large);--spectrum-textfield-icon-spacing-block-valid:var(--spectrum-field-top-to-validation-icon-large);--spectrum-textfield-icon-spacing-inline-start-invalid:var(--spectrum-field-text-to-alert-icon-large);--spectrum-textfield-icon-spacing-inline-start-valid:var(--spectrum-field-text-to-validation-icon-large);--spectrum-textfield-character-count-font-size:var(--spectrum-font-size-100);--spectrum-textfield-character-count-spacing-block:var(--spectrum-component-bottom-to-text-100);--spectrum-textfield-character-count-spacing-block-quiet:var(--spectrum-character-count-to-field-quiet-large);--spectrum-textfield-character-count-spacing-block-side:var(--spectrum-side-label-character-count-top-margin-large);--spectrum-text-area-min-block-size-quiet:var(--spectrum-component-height-200)}:host([size=xl]) #textfield{--spectrum-textfield-height:var(--spectrum-component-height-300);--spectrum-textfield-label-spacing-block-quiet:var(--spectrum-field-label-to-component-quiet-extra-large);--spectrum-textfield-label-spacing-inline-side-label:var(--spectrum-spacing-200);--spectrum-textfield-placeholder-font-size:var(--spectrum-font-size-300);--spectrum-textfield-spacing-inline:var(--spectrum-component-edge-to-text-200);--spectrum-textfield-icon-size-invalid:var(--spectrum-workflow-icon-size-300);--spectrum-textfield-icon-size-valid:var(--spectrum-checkmark-icon-size-300);--spectrum-textfield-icon-spacing-inline-end-invalid:var(--spectrum-field-edge-to-alert-icon-extra-large);--spectrum-textfield-icon-spacing-inline-end-valid:var(--spectrum-field-edge-to-validation-icon-extra-large);--spectrum-textfield-icon-spacing-block-valid:var(--spectrum-field-top-to-validation-icon-extra-large);--spectrum-textfield-icon-spacing-inline-start-invalid:var(--spectrum-field-text-to-alert-icon-extra-large);--spectrum-textfield-icon-spacing-inline-start-valid:var(--spectrum-field-text-to-validation-icon-extra-large);--spectrum-textfield-character-count-font-size:var(--spectrum-font-size-200);--spectrum-textfield-character-count-spacing-block:var(--spectrum-component-bottom-to-text-200);--spectrum-textfield-character-count-spacing-block-quiet:var(--spectrum-character-count-to-field-quiet-extra-large);--spectrum-textfield-character-count-spacing-block-side:var(--spectrum-side-label-character-count-top-margin-extra-large);--spectrum-text-area-min-block-size-quiet:var(--spectrum-component-height-300)}#textfield{text-overflow:ellipsis;inline-size:var(--mod-textfield-width,var(--spectrum-textfield-width));grid-template-rows:auto auto auto;grid-template-columns:auto auto;margin:0;display:inline-grid;position:relative;overflow:visible}:host([invalid]) #textfield .icon,:host([valid]) #textfield .icon{pointer-events:all;grid-area:2/2;margin-inline-start:auto;position:absolute;inset-block-start:0}#textfield.spectrum-Textfield--sideLabel .icon{grid-area:1/2/span 1/span 1}:host([valid]) #textfield .icon{color:var(--mod-textfield-icon-color-valid,var(--spectrum-textfield-icon-color-valid));inset-block-start:var(--mod-textfield-icon-spacing-block-valid,var(--spectrum-textfield-icon-spacing-block-valid));inset-block-end:var(--mod-textfield-icon-spacing-block-valid,var(--spectrum-textfield-icon-spacing-block-valid));inset-inline-end:var(--mod-textfield-icon-spacing-inline-end-valid,var(--spectrum-textfield-icon-spacing-inline-end-valid))}:host([invalid]) #textfield .icon{block-size:var(--mod-textfield-icon-size-invalid,var(--spectrum-textfield-icon-size-invalid));inline-size:var(--mod-textfield-icon-size-invalid,var(--spectrum-textfield-icon-size-invalid));color:var(--mod-textfield-icon-color-invalid,var(--spectrum-textfield-icon-color-invalid));inset-block-start:var(--mod-textfield-icon-spacing-block-invalid,var(--spectrum-textfield-icon-spacing-block-invalid));inset-block-end:var(--mod-textfield-icon-spacing-block-invalid,var(--spectrum-textfield-icon-spacing-block-invalid));inset-inline-end:var(--mod-textfield-icon-spacing-inline-end-invalid,var(--spectrum-textfield-icon-spacing-inline-end-invalid))}:host([disabled]) #textfield .icon,:host([readonly]) #textfield .icon{color:#0000}:host([quiet]) .icon{padding-inline-end:0}:host([quiet][valid]) .icon{inset-inline-end:var(--mod-textfield-icon-spacing-inline-end-quiet-valid,var(--spectrum-textfield-icon-spacing-inline-end-quiet-valid))}:host([quiet][invalid]) .icon{inset-inline-end:var(--mod-textfield-icon-spacing-inline-end-quiet-invalid,var(--spectrum-textfield-icon-spacing-inline-end-quiet-invalid))}#textfield .spectrum-FieldLabel{grid-area:1/1/auto/span 1;margin-block-end:var(--mod-textfield-label-spacing-block,var(--spectrum-textfield-label-spacing-block))}:host([quiet]) .spectrum-FieldLabel{margin-block-end:var(--mod-textfield-label-spacing-block-quiet,var(--spectrum-textfield-label-spacing-block-quiet))}:host([disabled]) #textfield .spectrum-FieldLabel{color:var(--spectrum-textfield-text-color-disabled)}#textfield .spectrum-HelpText{grid-area:3/1/auto/span 2;margin-block-start:var(--mod-textfield-helptext-spacing-block,var(--spectrum-textfield-helptext-spacing-block))}.spectrum-Textfield-characterCount{inline-size:auto;font-size:var(--mod-textfield-character-count-font-size,var(--spectrum-textfield-character-count-font-size));font-family:var(--mod-textfield-character-count-font-family,var(--spectrum-textfield-character-count-font-family));font-weight:var(--mod-textfield-character-count-font-weight,var(--spectrum-textfield-character-count-font-weight));grid-area:1/2/auto/span 1;justify-content:flex-end;align-items:flex-end;margin-block-end:var(--mod-textfield-character-count-spacing-block,var(--spectrum-textfield-character-count-spacing-block));margin-inline-start:var(--mod-textfield-character-count-spacing-inline,var(--spectrum-textfield-character-count-spacing-inline));margin-inline-end:0;padding-inline-end:calc(var(--mod-textfield-corner-radius,var(--spectrum-textfield-corner-radius))/2);display:inline-flex}:host([quiet]) .spectrum-Textfield-characterCount{margin-block-end:var(--mod-textfield-character-count-spacing-block-quiet,var(--spectrum-textfield-character-count-spacing-block-quiet))}.input{line-height:var(--spectrum-textfield-input-line-height);box-sizing:border-box;inline-size:100%;min-inline-size:var(--mod-textfield-min-width,var(--spectrum-textfield-min-width));block-size:var(--mod-textfield-height,var(--spectrum-textfield-height));padding-block-start:calc(var(--mod-textfield-spacing-block-start,var(--spectrum-textfield-spacing-block-start)) - var(--mod-textfield-border-width,var(--spectrum-textfield-border-width)));padding-block-end:calc(var(--mod-textfield-spacing-block-end,var(--spectrum-textfield-spacing-block-end)) - var(--mod-textfield-border-width,var(--spectrum-textfield-border-width)));padding-inline:calc(var(--mod-textfield-spacing-inline,var(--spectrum-textfield-spacing-inline)) - var(--mod-textfield-border-width,var(--spectrum-textfield-border-width)));vertical-align:top;background-color:var(--mod-textfield-background-color,var(--spectrum-textfield-background-color));border-width:var(--mod-textfield-border-width,var(--spectrum-textfield-border-width));border-style:solid;border-color:var(--highcontrast-textfield-border-color,var(--mod-textfield-border-color,var(--spectrum-textfield-border-color)));border-radius:var(--mod-textfield-corner-radius,var(--spectrum-textfield-corner-radius));transition:border-color var(--mod-texfield-animation-duration,var(--spectrum-texfield-animation-duration))ease-in-out;font-size:var(--mod-textfield-placeholder-font-size,var(--spectrum-textfield-placeholder-font-size));font-family:var(--mod-textfield-font-family,var(--spectrum-textfield-font-family));font-weight:var(--mod-textfield-font-weight,var(--spectrum-textfield-font-weight));color:var(--highcontrast-textfield-text-color-default,var(--mod-textfield-text-color-default,var(--spectrum-textfield-text-color-default)));text-overflow:ellipsis;appearance:none;outline:none;grid-area:2/1/auto/span 2;margin:0}:host([type=number]) .input{-moz-appearance:textfield}:host([type=number]) .input::-webkit-inner-spin-button,:host([type=number]) .input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.input:-moz-ui-invalid{box-shadow:none}.input::placeholder{opacity:1;font-size:var(--mod-textfield-placeholder-font-size,var(--spectrum-textfield-placeholder-font-size));font-family:var(--mod-textfield-font-family,var(--spectrum-textfield-font-family));font-weight:var(--mod-textfield-font-weight,var(--spectrum-textfield-font-weight));color:var(--highcontrast-textfield-text-color-default,var(--mod-textfield-text-color-default,var(--spectrum-textfield-text-color-default)));transition:color var(--mod-texfield-animation-duration,var(--spectrum-texfield-animation-duration))ease-in-out}.input:lang(ja)::placeholder,.input:lang(ko)::placeholder,.input:lang(zh)::placeholder{font-style:normal}:host([focused]) .input,.input:focus{border-color:var(--highcontrast-textfield-border-color-focus,var(--mod-textfield-border-color-focus,var(--spectrum-textfield-border-color-focus)))}:host([focused]) .input,:host([focused]) .input::placeholder,.input:focus,.input:focus::placeholder{color:var(--mod-textfield-text-color-focus,var(--spectrum-textfield-text-color-focus))}:host([focused]) .input{border-color:var(--highcontrast-textfield-border-color-keyboard-focus,var(--mod-textfield-border-color-keyboard-focus,var(--spectrum-textfield-border-color-keyboard-focus)));outline:var(--mod-textfield-focus-indicator-width,var(--spectrum-textfield-focus-indicator-width))solid;outline-color:var(--highcontrast-textfield-focus-indicator-color,var(--mod-textfield-focus-indicator-color,var(--spectrum-textfield-focus-indicator-color)));outline-offset:var(--mod-textfield-focus-indicator-gap,var(--spectrum-textfield-focus-indicator-gap))}:host([focused]) .input,:host([focused]) .input::placeholder{color:var(--highcontrast-textfield-text-color-keyboard-focus,var(--mod-textfield-text-color-keyboard-focus,var(--spectrum-textfield-text-color-keyboard-focus)))}:host([valid]) .input{color:var(--highcontrast-textfield-text-color-valid,var(--mod-textfield-text-color-valid,var(--spectrum-textfield-text-color-valid)));padding-inline-end:calc(var(--mod-textfield-icon-spacing-inline-start-valid,var(--spectrum-textfield-icon-spacing-inline-start-valid)) + var(--mod-textfield-icon-size-valid,var(--spectrum-textfield-icon-size-valid)) + var(--mod-textfield-icon-spacing-inline-end-valid,var(--spectrum-textfield-icon-spacing-inline-end-valid)) - var(--mod-textfield-border-width,var(--spectrum-textfield-border-width)))}:host([invalid]) .input{color:var(--highcontrast-textfield-text-color-invalid,var(--mod-textfield-text-color-invalid,var(--spectrum-textfield-text-color-invalid)));border-color:var(--highcontrast-textfield-border-color-invalid-default,var(--mod-textfield-border-color-invalid-default,var(--spectrum-textfield-border-color-invalid-default)));padding-inline-end:calc(var(--mod-textfield-icon-spacing-inline-start-invalid,var(--spectrum-textfield-icon-spacing-inline-start-invalid)) + var(--mod-textfield-icon-size-invalid,var(--spectrum-textfield-icon-size-invalid)) + var(--mod-textfield-icon-spacing-inline-end-invalid,var(--spectrum-textfield-icon-spacing-inline-end-invalid)) - var(--mod-textfield-border-width,var(--spectrum-textfield-border-width)))}:host([invalid]) .input:focus,:host([invalid][focused]) .input,:host([invalid]:focus) .input{border-color:var(--highcontrast-textfield-border-color-invalid-focus,var(--mod-textfield-border-color-invalid-focus,var(--spectrum-textfield-border-color-invalid-focus)))}:host([invalid]) .input:focus-visible,:host([invalid][focused]) .input{border-color:var(--highcontrast-textfield-border-color-invalid-keyboard-focus,var(--mod-textfield-border-color-invalid-keyboard-focus,var(--spectrum-textfield-border-color-invalid-keyboard-focus)))}.input:disabled,:host([disabled]) #textfield .input{background-color:var(--mod-textfield-background-color-disabled,var(--spectrum-textfield-background-color-disabled));border-color:var(--mod-textfield-border-color-disabled,var(--spectrum-textfield-border-color-disabled));resize:none;opacity:1}.input:disabled,.input:disabled::placeholder,:host([disabled]) #textfield .input,:host([disabled]) #textfield .input::placeholder{color:var(--highcontrast-textfield-text-color-disabled,var(--mod-textfield-text-color-disabled,var(--spectrum-textfield-text-color-disabled)))}:host([quiet]) .input{padding-block-start:var(--mod-textfield-spacing-block-start,var(--spectrum-textfield-spacing-block-start));padding-inline:var(--mod-textfield-spacing-inline-quiet,var(--spectrum-textfield-spacing-inline-quiet));background-color:initial;resize:none;border-block-start-width:0;border-inline-width:0;border-radius:0;outline:none;margin-block-end:var(--mod-textfield-spacing-block-quiet,var(--spectrum-textfield-spacing-block-quiet));overflow-y:hidden}:host([quiet][disabled]) .input,.input:disabled{background-color:initial;border-color:var(--mod-textfield-border-color-disabled,var(--spectrum-textfield-border-color-disabled))}:host([quiet][disabled]) .input,:host([quiet][disabled]) .input::placeholder,.input:disabled,.input:disabled::placeholder{color:var(--highcontrast-textfield-text-color-disabled,var(--mod-textfield-text-color-disabled,var(--spectrum-textfield-text-color-disabled)))}.input:read-only,:host([readonly]) #textfield .input{background-color:initial;color:var(--highcontrast-textfield-text-color-readonly,var(--mod-textfield-text-color-readonly,var(--spectrum-textfield-text-color-readonly)));border-color:#0000;outline:none}.input:read-only::placeholder,:host([readonly]) #textfield .input::placeholder{color:var(--highcontrast-textfield-text-color-readonly,var(--mod-textfield-text-color-readonly,var(--spectrum-textfield-text-color-readonly)));background-color:initial}@media (hover:hover){.input:hover,#textfield:hover .input{border-color:var(--highcontrast-textfield-border-color-hover,var(--mod-textfield-border-color-hover,var(--spectrum-textfield-border-color-hover)))}.input:hover,.input:hover::placeholder,#textfield:hover .input,#textfield:hover .input::placeholder{color:var(--highcontrast-textfield-text-color-hover,var(--mod-textfield-text-color-hover,var(--spectrum-textfield-text-color-hover)))}:host([focused]) .input:hover,.input:focus:hover{border-color:var(--mod-textfield-border-color-focus-hover,var(--spectrum-textfield-border-color-focus-hover))}:host([focused]) .input:hover,:host([focused]) .input:hover::placeholder,.input:focus:hover,.input:focus:hover::placeholder{color:var(--mod-textfield-text-color-focus-hover,var(--spectrum-textfield-text-color-focus-hover))}:host([invalid]) .input:hover:not(.is-disabled),:host([invalid]:hover):not(.is-disabled) .input{border-color:var(--highcontrast-textfield-border-color-invalid-hover,var(--mod-textfield-border-color-invalid-hover,var(--spectrum-textfield-border-color-invalid-hover)))}:host([invalid]) .input:focus:hover,:host([invalid][focused]) .input:hover,:host([invalid]:focus) .input:hover{border-color:var(--mod-textfield-border-color-invalid-focus-hover,var(--spectrum-textfield-border-color-invalid-focus-hover))}:host([disabled]) #textfield:hover .input{background-color:var(--mod-textfield-background-color-disabled,var(--spectrum-textfield-background-color-disabled));border-color:var(--mod-textfield-border-color-disabled,var(--spectrum-textfield-border-color-disabled));resize:none;opacity:1}:host([quiet][disabled]:hover) .input,:host([disabled]) #textfield:hover .input,:host([disabled]) #textfield:hover .input::placeholder{color:var(--highcontrast-textfield-text-color-disabled,var(--mod-textfield-text-color-disabled,var(--spectrum-textfield-text-color-disabled)))}:host([quiet][disabled]:hover) .input{background-color:initial;border-color:var(--mod-textfield-border-color-disabled,var(--spectrum-textfield-border-color-disabled))}:host([quiet][disabled]:hover) .input::placeholder{color:var(--highcontrast-textfield-text-color-disabled,var(--mod-textfield-text-color-disabled,var(--spectrum-textfield-text-color-disabled)))}:host([readonly]) #textfield:hover .input{border-color:#0000;outline:none}:host([readonly]) #textfield:hover .input,:host([readonly]) #textfield:hover .input::placeholder{background-color:initial;color:var(--highcontrast-textfield-text-color-readonly,var(--mod-textfield-text-color-readonly,var(--spectrum-textfield-text-color-readonly)))}}.spectrum-Textfield--sideLabel{grid-template-rows:auto auto;grid-template-columns:auto auto auto}.spectrum-Textfield--sideLabel:after{grid-area:1/2/span 1/span 1}.spectrum-Textfield--sideLabel .spectrum-FieldLabel{grid-area:1/1/span 2/span 1;margin-inline-end:var(--mod-textfield-label-spacing-inline-side-label,var(--spectrum-textfield-label-spacing-inline-side-label))}.spectrum-Textfield--sideLabel .spectrum-Textfield-characterCount{grid-area:1/3/auto/span 1;align-items:flex-start;margin-block-start:var(--mod-textfield-character-count-spacing-block-side,var(--spectrum-textfield-character-count-spacing-block-side));margin-inline-start:var(--mod-textfield-character-count-spacing-inline-side,var(--spectrum-textfield-character-count-spacing-inline-side))}.spectrum-Textfield--sideLabel .spectrum-HelpText{grid-area:2/2/auto/span 1}.spectrum-Textfield--sideLabel .input,.spectrum-Textfield--sideLabel .icon{grid-area:1/2/span 1/span 1}:host([multiline]){--spectrum-textfield-input-line-height:normal}:host([multiline]) .input{min-inline-size:var(--mod-text-area-min-inline-size,var(--spectrum-text-area-min-inline-size));min-block-size:var(--mod-text-area-min-block-size,var(--spectrum-text-area-min-block-size));resize:inherit}:host([multiline][grows]) .input{grid-row:2}:host([multiline][grows]) .spectrum-Textfield--sideLabel .input{grid-row:1}:host([multiline][quiet]) .input{min-block-size:var(--mod-text-area-min-block-size-quiet,var(--spectrum-text-area-min-block-size-quiet));resize:none;overflow-y:hidden}:host([quiet]) #textfield:after{content:"";pointer-events:none;inline-size:100%;block-size:var(--mod-textfield-focus-indicator-width,var(--spectrum-textfield-focus-indicator-width));position:absolute;inset-block-end:calc((var(--mod-textfield-focus-indicator-gap,var(--spectrum-textfield-focus-indicator-gap)) + var(--mod-textfield-focus-indicator-width,var(--spectrum-textfield-focus-indicator-width)))*-1);inset-inline-start:0}:host([quiet][focused]) #textfield:after{background-color:var(--highcontrast-textfield-focus-indicator-color,var(--mod-textfield-focus-indicator-color,var(--spectrum-textfield-focus-indicator-color)))}:host([quiet][invalid]) .input{padding-inline-end:calc(var(--mod-textfield-icon-spacing-inline-start-invalid,var(--spectrum-textfield-icon-spacing-inline-start-invalid)) + var(--mod-textfield-icon-size-invalid,var(--spectrum-textfield-icon-size-invalid)))}:host([quiet][valid]) .input{padding-inline-end:calc(var(--mod-textfield-icon-spacing-inline-start-valid,var(--spectrum-textfield-icon-spacing-inline-start-valid)) + var(--mod-textfield-icon-size-valid,var(--spectrum-textfield-icon-size-valid)))}@media (forced-colors:active){:host{--highcontrast-textfield-border-color:CanvasText;--highcontrast-textfield-border-color-hover:Highlight;--highcontrast-textfield-border-color-focus:Highlight;--highcontrast-textfield-border-color-keyboard-focus:CanvasText;--highcontrast-textfield-focus-indicator-color:Highlight;--highcontrast-textfield-border-color-invalid-default:Highlight;--highcontrast-textfield-border-color-invalid-hover:Highlight;--highcontrast-textfield-border-color-invalid-focus:Highlight;--highcontrast-textfield-border-color-invalid-keyboard-focus:Highlight;--highcontrast-textfield-text-color-valid:CanvasText;--highcontrast-textfield-text-color-invalid:CanvasText}#textfield .input{--highcontrast-textfield-text-color-default:CanvasText;--highcontrast-textfield-text-color-hover:CanvasText;--highcontrast-textfield-text-color-keyboard-focus:CanvasText;--highcontrast-textfield-text-color-disabled:GrayText;--highcontrast-textfield-text-color-readonly:CanvasText}#textfield .input::placeholder{--highcontrast-textfield-text-color-default:GrayText;--highcontrast-textfield-text-color-hover:GrayText;--highcontrast-textfield-text-color-keyboard-focus:GrayText;--highcontrast-textfield-text-color-disabled:GrayText;--highcontrast-textfield-text-color-readonly:CanvasText}}:host{--spectrum-textfield-background-color:var(--system-textfield-background-color);--spectrum-textfield-background-color-disabled:var(--system-textfield-background-color-disabled);--spectrum-textfield-border-color:var(--system-textfield-border-color);--spectrum-textfield-border-color-hover:var(--system-textfield-border-color-hover);--spectrum-textfield-border-color-focus:var(--system-textfield-border-color-focus);--spectrum-textfield-border-color-focus-hover:var(--system-textfield-border-color-focus-hover);--spectrum-textfield-border-color-keyboard-focus:var(--system-textfield-border-color-keyboard-focus);--spectrum-textfield-border-color-disabled:var(--system-textfield-border-color-disabled);--spectrum-textfield-border-width:var(--system-textfield-border-width);--spectrum-textfield-icon-spacing-block-invalid:var(--system-textfield-icon-spacing-block-invalid)}:host([size=s]) #textfield#textfield{--spectrum-textfield-icon-spacing-block-invalid:var(--system-textfield-size-s-icon-spacing-block-invalid)}:host([size=l]) #textfield#textfield{--spectrum-textfield-icon-spacing-block-invalid:var(--system-textfield-size-l-icon-spacing-block-invalid)}:host([size=xl]) #textfield#textfield{--spectrum-textfield-icon-spacing-block-invalid:var(--system-textfield-size-xl-icon-spacing-block-invalid)}:host([quiet]) #textfield{--spectrum-textfield-border-color-disabled:var(--system-textfield-quiet-border-color-disabled)}:host{inline-size:var(--mod-textfield-width,var(--spectrum-textfield-width));flex-direction:column;display:inline-flex}:host([multiline]){resize:both}:host([multiline][readonly]){resize:none}:host([disabled]:focus-visible){outline:none}#textfield{inline-size:100%}#textfield,textarea{resize:inherit}.input{min-inline-size:var(--spectrum-textfield-min-width)}:host([focused]) .input{caret-color:var(--swc-test-caret-color);forced-color-adjust:var(--swc-test-forced-color-adjust)}:host([focused]) #textfield:hover .input,:host([focused]) .input:hover{border-color:var(--mod-textfield-border-color-focus-hover,var(--spectrum-textfield-border-color-focus-hover))}#sizer{block-size:auto;overflow-wrap:break-word;opacity:0;white-space:pre-line}.icon,.icon-workflow{pointer-events:none}:host([multiline]) #textfield{--spectrum-textfield-input-line-height:normal;display:inline-grid}:host([multiline]) textarea{transition:box-shadow var(--spectrum-animation-duration-100,.13s)ease-in-out,border-color var(--spectrum-animation-duration-100,.13s)ease-in-out}:host([multiline]:not([quiet])) #textfield:after{box-shadow:none}:host([multiline][rows]) .input{block-size:auto;resize:none}:host([multiline][rows="1"]) .input{min-block-size:auto}:host([disabled][quiet]) #textfield .input,:host([disabled][quiet]) #textfield:hover .input,:host([quiet]) .input :disabled{border-color:var(--mod-textfield-border-color-disabled,var(--spectrum-textfield-border-color-disabled));color:var(--highcontrast-textfield-text-color-disabled,var(--mod-textfield-text-color-disabled,var(--spectrum-textfield-text-color-disabled)));background-color:#0000}:host([disabled]) #textfield .icon.icon-search,:host([readonly]) #textfield .icon.icon-search{color:var(--highcontrast-textfield-text-color-disabled,var(--mod-textfield-text-color-disabled,var(--spectrum-textfield-text-color-disabled)))}:host([focused]) #textfield .icon.icon-search{--spectrum-search-color:var(--highcontrast-search-color-focus,var(--mod-search-color-focus,var(--spectrum-search-color-focus)))}:host([multiline][grows]:not([quiet])) #textfield:after{grid-area:unset;min-block-size:calc(var(--mod-text-area-min-block-size,var(--spectrum-text-area-min-block-size)) + var(--mod-textfield-focus-indicator-gap,var(--spectrum-textfield-focus-indicator-gap))*2)}:host([multiline][grows]:not([rows])) .input:not(#sizer){height:100%;resize:none;position:absolute;top:0;left:0;overflow:hidden}
`;var Io=Object.defineProperty,Ho=Object.getOwnPropertyDescriptor,D=(r,e,t,a)=>{for(var i=a>1?void 0:a?Ho(e,t):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=(a?s(e,t,i):s(i))||i);return a&&i&&Io(e,t,i),i};const Oo=["text","url","tel","email","password"];class R extends Bo(pe(Dt,{noDefaultSize:!0})){constructor(){super(...arguments),this.allowedKeys="",this.focused=!1,this.invalid=!1,this.label="",this.placeholder="",this._type="text",this.grows=!1,this.maxlength=-1,this.minlength=-1,this.multiline=!1,this.readonly=!1,this.rows=-1,this.valid=!1,this._value="",this.quiet=!1,this.required=!1}static get styles(){return[Lo,oa]}set type(e){const t=this._type;this._type=e,this.requestUpdate("type",t)}get type(){var e;return(e=Oo.find(t=>t===this._type))!=null?e:"text"}set value(e){if(e===this.value)return;const t=this._value;this._value=e,this.requestUpdate("value",t)}get value(){return this._value}get focusElement(){return this.inputElement}setSelectionRange(e,t,a="none"){this.inputElement.setSelectionRange(e,t,a)}select(){this.inputElement.select()}handleInput(e){if(this.allowedKeys&&this.inputElement.value&&!new RegExp(`^[${this.allowedKeys}]*$`,"u").test(this.inputElement.value)){const t=this.inputElement.selectionStart-1;this.inputElement.value=this.value.toString(),this.inputElement.setSelectionRange(t,t);return}this.value=this.inputElement.value}handleChange(){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}onFocus(){this.focused=!this.readonly&&!0}onBlur(e){this.focused=!this.readonly&&!1}handleInputElementPointerdown(){}renderStateIcons(){return this.invalid?u`
                <sp-icon-alert id="invalid" class="icon"></sp-icon-alert>
            `:this.valid?u`
                <sp-icon-checkmark100
                    id="valid"
                    class="icon spectrum-UIIcon-Checkmark100"
                ></sp-icon-checkmark100>
            `:L}get displayValue(){return this.value.toString()}get renderMultiline(){return u`
            ${this.multiline&&this.grows&&this.rows===-1?u`
                      <div id="sizer" class="input" aria-hidden="true">${this.value}&#8203;
                      </div>
                  `:L}
            <!-- @ts-ignore -->
            <textarea
                name=${M(this.name||void 0)}
                aria-describedby=${this.helpTextId}
                aria-label=${this.label||this.appliedLabel||this.placeholder}
                aria-invalid=${M(this.invalid||void 0)}
                class="input"
                maxlength=${M(this.maxlength>-1?this.maxlength:void 0)}
                minlength=${M(this.minlength>-1?this.minlength:void 0)}
                title=${this.invalid?"":L}
                pattern=${M(this.pattern)}
                placeholder=${this.placeholder}
                .value=${this.displayValue}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
                rows=${M(this.rows>-1?this.rows:void 0)}
                autocomplete=${M(this.autocomplete)}
            ></textarea>
        `}get renderInput(){return u`
            <!-- @ts-ignore -->
            <input
                name=${M(this.name||void 0)}
                type=${this.type}
                aria-describedby=${this.helpTextId}
                aria-label=${this.label||this.appliedLabel||this.placeholder}
                aria-invalid=${M(this.invalid||void 0)}
                class="input"
                title=${this.invalid?"":L}
                maxlength=${M(this.maxlength>-1?this.maxlength:void 0)}
                minlength=${M(this.minlength>-1?this.minlength:void 0)}
                pattern=${M(this.pattern)}
                placeholder=${this.placeholder}
                .value=${fa(this.displayValue)}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @pointerdown=${this.handleInputElementPointerdown}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
                autocomplete=${M(this.autocomplete)}
            />
        `}renderField(){return u`
            ${this.renderStateIcons()}
            ${this.multiline?this.renderMultiline:this.renderInput}
        `}render(){return u`
            <div id="textfield">${this.renderField()}</div>
            ${this.renderHelpText(this.invalid)}
        `}update(e){(e.has("value")||e.has("required")&&this.required)&&this.updateComplete.then(()=>{this.checkValidity()}),super.update(e)}checkValidity(){let e=this.inputElement.checkValidity();return(this.required||this.value&&this.pattern)&&((this.disabled||this.multiline)&&this.pattern&&(e=new RegExp(`^${this.pattern}$`,"u").test(this.value.toString())),typeof this.minlength<"u"&&(e=e&&this.value.toString().length>=this.minlength),this.valid=e,this.invalid=!e),e}}D([X()],R.prototype,"appliedLabel",2),D([f({attribute:"allowed-keys"})],R.prototype,"allowedKeys",2),D([f({type:Boolean,reflect:!0})],R.prototype,"focused",2),D([O(".input:not(#sizer)")],R.prototype,"inputElement",2),D([f({type:Boolean,reflect:!0})],R.prototype,"invalid",2),D([f()],R.prototype,"label",2),D([f({type:String,reflect:!0})],R.prototype,"name",2),D([f()],R.prototype,"placeholder",2),D([X()],R.prototype,"type",1),D([f({attribute:"type",reflect:!0})],R.prototype,"_type",2),D([f()],R.prototype,"pattern",2),D([f({type:Boolean,reflect:!0})],R.prototype,"grows",2),D([f({type:Number})],R.prototype,"maxlength",2),D([f({type:Number})],R.prototype,"minlength",2),D([f({type:Boolean,reflect:!0})],R.prototype,"multiline",2),D([f({type:Boolean,reflect:!0})],R.prototype,"readonly",2),D([f({type:Number})],R.prototype,"rows",2),D([f({type:Boolean,reflect:!0})],R.prototype,"valid",2),D([f({type:String})],R.prototype,"value",1),D([f({type:Boolean,reflect:!0})],R.prototype,"quiet",2),D([f({type:Boolean,reflect:!0})],R.prototype,"required",2),D([f({type:String,reflect:!0})],R.prototype,"autocomplete",2);class qo extends R{constructor(){super(...arguments),this._value=""}set value(e){if(e===this.value)return;const t=this._value;this._value=e,this.requestUpdate("value",t)}get value(){return this._value}}D([f({type:String})],qo.prototype,"value",1);const Fo=$`
    @media (forced-colors:active){:host{--highcontrast-stepper-border-color:CanvasText;--highcontrast-stepper-border-color-hover:Highlight;--highcontrast-stepper-border-color-focus:Highlight;--highcontrast-stepper-border-color-focus-hover:Highlight;--highcontrast-stepper-border-color-keyboard-focus:CanvasText;--highcontrast-stepper-focus-indicator-color:Highlight}:host([invalid]) #textfield{--highcontrast-stepper-border-color:Highlight;--highcontrast-stepper-border-color-hover:Highlight;--highcontrast-stepper-border-color-focus:Highlight;--highcontrast-stepper-border-color-focus-hover:Highlight;--highcontrast-stepper-border-color-keyboard-focus:Highlight}:host([disabled]) #textfield{--highcontrast-stepper-border-color:GrayText;--highcontrast-stepper-buttons-border-width:var(--mod-stepper-border-width,var(--spectrum-stepper-border-width))}:host([focused]:not([disabled])) #textfield,:host(:not([disabled])) #textfield:focus{--highcontrast-stepper-border-color:var(--highcontrast-stepper-border-color-focus)}@media (hover:hover){:host(:not([disabled]):hover) #textfield{--highcontrast-stepper-border-color:var(--highcontrast-stepper-border-color-hover)}:host([focused]:not([disabled]):hover) #textfield,:host(:not([disabled]):hover) #textfield:focus{--highcontrast-stepper-border-color:var(--highcontrast-stepper-border-color-focus-hover)}}:host([keyboard-focused]:not([disabled])) #textfield,:host(:not([disabled])) #textfield:focus-visible{--highcontrast-stepper-border-color:var(--highcontrast-stepper-border-color-keyboard-focus)}.input{--highcontrast-textfield-border-color:var(--highcontrast-stepper-border-color)}.button{--highcontrast-infield-button-border-color:var(--highcontrast-stepper-border-color);--highcontrast-infield-button-border-color-active:var(--highcontrast-stepper-border-color)}}:host{--spectrum-stepper-border-color:var(--highcontrast-stepper-border-color,var(--mod-stepper-border-color,var(--spectrum-stepper-border-color-default)));--spectrum-stepper-border-radius:var(--mod-stepper-border-radius,var(--spectrum-corner-radius-100));--spectrum-stepper-focus-indicator-width:var(--mod-stepper-focus-indicator-width,var(--spectrum-focus-indicator-thickness));--spectrum-stepper-focus-indicator-gap:var(--mod-stepper-focus-indicator-gap,var(--spectrum-focus-indicator-gap));--spectrum-stepper-focus-indicator-color:var(--highcontrast-stepper-focus-indicator-color,var(--mod-stepper-focus-indicator-color,var(--spectrum-focus-indicator-color)));--spectrum-stepper-animation-duration:var(--mod-stepper-animation-duration,var(--spectrum-animation-duration-100))}#textfield,:host([size=m]) #textfield{--spectrum-stepper-button-width:var(--mod-stepper-button-width,var(--spectrum-in-field-button-width-stacked-medium));--spectrum-stepper-height:var(--mod-stepper-height,var(--spectrum-component-height-100))}:host([size=s]) #textfield{--spectrum-stepper-button-width:var(--mod-stepper-button-width,var(--spectrum-in-field-button-width-stacked-small));--spectrum-stepper-height:var(--mod-stepper-height,var(--spectrum-component-height-75))}:host([size=l]) #textfield{--spectrum-stepper-button-width:var(--mod-stepper-button-width,var(--spectrum-in-field-button-width-stacked-large));--spectrum-stepper-height:var(--mod-stepper-height,var(--spectrum-component-height-200))}:host([size=xl]) #textfield{--spectrum-stepper-button-width:var(--mod-stepper-button-width,var(--spectrum-in-field-button-width-stacked-extra-large));--spectrum-stepper-height:var(--mod-stepper-height,var(--spectrum-component-height-300))}:host([disabled]) #textfield{--spectrum-stepper-buttons-border-width:var(--spectrum-stepper-button-border-width-disabled);--spectrum-stepper-buttons-background-color:var(--spectrum-stepper-buttons-background-color-disabled)}:host([invalid]) #textfield{--mod-stepper-border-color:var(--mod-stepper-border-color-invalid,var(--spectrum-negative-border-color-default));--mod-stepper-border-color-hover:var(--mod-stepper-border-color-hover-invalid,var(--spectrum-negative-border-color-hover));--mod-stepper-border-color-focus:var(--mod-stepper-border-color-focus-invalid,var(--spectrum-negative-border-color-focus));--mod-stepper-border-color-focus-hover:var(--mod-stepper-border-color-focus-hover-invalid,var(--spectrum-negative-border-color-focus-hover));--mod-stepper-border-color-keyboard-focus:var(--mod-stepper-border-color-keyboard-focus-invalid,var(--spectrum-negative-border-color-key-focus))}:host([focused]:not([disabled])) #textfield,:host(:not([disabled])) #textfield:focus{--mod-stepper-border-color:var(--highcontrast-stepper-border-color-focus,var(--mod-stepper-border-color-focus,var(--spectrum-stepper-border-color-focus)));--mod-stepper-buttons-border-color:var(--highcontrast-stepper-border-color-focus,var(--mod-stepper-border-color-focus,var(--spectrum-stepper-border-color-focus)))}:host([keyboard-focused]:not([disabled])) #textfield{--mod-stepper-border-color:var(--highcontrast-stepper-border-color-focus,var(--mod-stepper-border-color-focus,var(--spectrum-stepper-border-color-keyboard-focus)))}:host([quiet]) #textfield{--mod-stepper-buttons-background-color:transparent}:host([quiet][keyboard-focused]:not([disabled])) #textfield{--mod-stepper-focus-indicator-visibility:visible}:host([quiet][invalid]) #textfield{--mod-stepper-border-color:var(--mod-stepper-border-color-invalid,var(--spectrum-negative-border-color-default))}:host{--mod-infield-button-border-color:var(--mod-stepper-buttons-border-color,var(--spectrum-stepper-buttons-border-color));--mod-infield-button-border-color-quiet-disabled:var(--spectrum-disabled-border-color);--mod-infield-button-border-width:var(--mod-stepper-button-border-width,var(--spectrum-stepper-button-border-width));--mod-textfield-border-width:var(--mod-stepper-border-width,var(--spectrum-stepper-border-width));--mod-textfield-border-color:var(--spectrum-stepper-border-color)}#textfield:not(.spectrum-Stepper--quiet){--mod-textfield-border-color-disabled:var(--spectrum-stepper-border-color-disabled)}:host(:not([disabled])[focused]) #textfield,:host(:not([disabled])) #textfield:focus{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color-focus,var(--mod-stepper-buttons-border-color-focus,var(--spectrum-stepper-buttons-border-color-focus)));--mod-textfield-focus-indicator-width:0}:host([keyboard-focused]:not([disabled])) #textfield,:host(:not([disabled])) #textfield:focus-visible{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color-keyboard-focus,var(--mod-stepper-buttons-border-color-keyboard-focus,var(--spectrum-stepper-buttons-border-color-keyboard-focus)));--mod-textfield-focus-indicator-width:0;--mod-textfield-border-color:var(--highcontrast-stepper-border-color-keyboard-focus,var(--mod-stepper-border-color-keyboard-focus,var(--spectrum-stepper-border-color-keyboard-focus)));outline:var(--spectrum-stepper-focus-indicator-width)solid;outline-color:var(--spectrum-stepper-focus-indicator-color);outline-offset:var(--spectrum-stepper-focus-indicator-gap)}:host([invalid]) #textfield{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color,var(--mod-stepper-border-color-invalid,var(--spectrum-stepper-border-color-invalid)));--mod-textfield-icon-spacing-inline-start-invalid:0}:host([invalid][focused]) #textfield,:host([invalid]) #textfield:focus{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color,var(--mod-stepper-border-color-focus-invalid,var(--spectrum-stepper-border-color-focus-invalid)))}:host([invalid][keyboard-focused]) #textfield,:host([invalid]) #textfield:focus-visible{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color,var(--mod-stepper-border-color-keyboard-focus-invalid,var(--spectrum-stepper-border-color-keyboard-focus-invalid)))}:host([quiet]) #textfield{--mod-infield-button-width-stacked:var(--mod-stepper-button-width-quiet,var(--spectrum-stepper-button-width));--mod-infield-button-border-color:var(--spectrum-stepper-border-color);--mod-infield-button-border-color-quiet:var(--spectrum-stepper-border-color);--mod-infield-button-border-block-end-width:var(--mod-stepper-border-width,var(--spectrum-stepper-border-width));--mod-infield-button-stacked-bottom-border-block-end-width:var(--mod-stepper-border-width,var(--spectrum-stepper-border-width));--mod-infield-button-stacked-bottom-border-radius-end-end:0;--mod-infield-button-stacked-bottom-border-radius-end-start:0;--mod-infield-button-fill-justify-content:flex-end;--mod-infield-button-inner-edge-to-fill:var(--spectrum-stepper-button-edge-to-fill);--mod-infield-button-edge-to-fill:var(--spectrum-stepper-button-edge-to-fill);--mod-textfield-focus-indicator-color:transparent;--mod-textfield-background-color:transparent;--mod-textfield-border-color-hover:var(--highcontrast-stepper-border-color,var(--mod-stepper-border-color-hover,var(--spectrum-stepper-border-color-hover)))}:host([quiet][focused]:not([disabled])) #textfield,:host([quiet]:not([disabled])) #textfield:focus{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color,var(--mod-stepper-border-color-focus,var(--spectrum-stepper-border-color-focus)))}:host([quiet][keyboard-focused]:not([disabled])) #textfield{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color,var(--mod-stepper-border-color-keyboard-focus,var(--spectrum-stepper-border-color-keyboard-focus)))}@media (hover:hover){:host(:not([disabled]):hover) #textfield{--mod-stepper-border-color:var(--highcontrast-stepper-border-color-hover,var(--mod-stepper-border-color-hover,var(--spectrum-stepper-border-color-hover)))}:host([focused]:not([disabled]):hover) #textfield,:host(:not([disabled]):hover) #textfield:focus{--mod-stepper-border-color:var(--highcontrast-stepper-border-color-focus-hover,var(--mod-stepper-border-color-focus-hover,var(--spectrum-stepper-border-color-focus-hover)));--mod-stepper-buttons-border-color:var(--highcontrast-stepper-border-color-focus-hover,var(--mod-stepper-border-color-focus-hover,var(--spectrum-stepper-border-color-focus-hover)))}:host([quiet]:not([disabled]):hover) #textfield{--mod-stepper-buttons-background-color:transparent}:host(:hover) #textfield:not(.is-invalid,.is-disabled,.is-focused){--mod-infield-button-border-color:var(--mod-stepper-buttons-border-color-hover,var(--spectrum-stepper-buttons-border-color-hover))}:host(:not([disabled])[focused]:hover) #textfield,:host(:not([disabled]):hover) #textfield:focus{--mod-infield-button-border-color:var(--mod-stepper-buttons-border-color-focus-hover,var(--spectrum-stepper-buttons-border-color-focus-hover));--mod-textfield-focus-indicator-width:0;--mod-textfield-border-color:var(--highcontrast-stepper-border-color-focus-hover,var(--mod-stepper-border-color-focus-hover,var(--spectrum-stepper-border-color-focus-hover)))}:host([invalid]:hover) #textfield{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color,var(--mod-stepper-border-color-hover-invalid,var(--spectrum-negative-border-color-hover)))}:host([invalid][focused]:hover) #textfield,:host([invalid]:hover) #textfield:focus{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color,var(--mod-stepper-border-color-focus-hover-invalid,var(--spectrum-stepper-border-color-focus-hover-invalid)))}:host([quiet]:not([disabled]):hover) #textfield{--mod-textfield-border-color-hover:var(--highcontrast-stepper-border-color,var(--mod-stepper-border-color-hover,var(--spectrum-stepper-border-color-hover)));--mod-infield-button-border-color:var(--highcontrast-stepper-border-color,var(--mod-stepper-border-color-hover,var(--spectrum-stepper-border-color-hover)))}:host([quiet][focused]:not([disabled]):hover) #textfield,:host([quiet]:not([disabled]):hover) #textfield:focus{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color,var(--mod-stepper-border-color-focus-hover,var(--spectrum-stepper-border-color-focus-hover)))}:host([quiet][keyboard-focused]:not([disabled]):hover) #textfield{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color,var(--mod-stepper-border-color-hover,var(--spectrum-stepper-border-color-hover)))}}#textfield{--spectrum-stepper-width:var(--mod-stepper-width,calc(var(--spectrum-stepper-height)*var(--mod-stepper-min-width-multiplier,var(--spectrum-text-field-minimum-width-multiplier)) + var(--spectrum-stepper-button-width) + var(--mod-stepper-border-width,var(--spectrum-stepper-border-width))*2));inline-size:var(--spectrum-stepper-width);block-size:var(--spectrum-stepper-height);border-radius:var(--spectrum-stepper-border-radius);flex-flow:row;display:inline-flex;position:relative}#textfield:before{content:""}.input{border-inline-end-width:0;border-start-end-radius:0;border-end-end-radius:0}.buttons{box-sizing:border-box;block-size:var(--spectrum-stepper-height);inline-size:var(--spectrum-stepper-button-width);border-color:var(--spectrum-stepper-border-color);border-style:var(--mod-stepper-buttons-border-style,var(--spectrum-stepper-buttons-border-style));border-width:var(--highcontrast-stepper-buttons-border-width,var(--mod-stepper-buttons-border-width,var(--spectrum-stepper-buttons-border-width)));background-color:var(--mod-stepper-buttons-background-color,var(--spectrum-stepper-buttons-background-color));transition:border-color var(--spectrum-stepper-animation-duration)ease-in-out;border-inline-start-width:0;flex-direction:column;justify-content:center;display:flex}.buttons,#textfield.hide-stepper .input{border-start-end-radius:var(--spectrum-stepper-border-radius);border-end-end-radius:var(--spectrum-stepper-border-radius)}#textfield.hide-stepper .input{border-inline-end-width:var(--mod-stepper-border-width,var(--spectrum-stepper-border-width))}:host([quiet]) #textfield{border-start-start-radius:0;border-start-end-radius:0;border-end-end-radius:0;border-end-start-radius:0}:host([quiet]) .hide-stepper .input{border-inline-end-width:0;border-end-end-radius:0}:host([quiet]):after{visibility:hidden;visibility:var(--mod-stepper-focus-indicator-visibility,hidden);content:"";inline-size:100%;block-size:var(--spectrum-stepper-focus-indicator-width);background-color:var(--spectrum-stepper-focus-indicator-color);position:absolute;inset-block-end:calc((var(--spectrum-stepper-focus-indicator-gap) + var(--spectrum-stepper-focus-indicator-width))*-1);inset-inline-start:0}:host([quiet][keyboard-focused]:not([disabled])){outline:none}:host{--spectrum-stepper-border-width:var(--system-stepper-border-width);--spectrum-stepper-border-color-default:var(--system-stepper-border-color-default);--spectrum-stepper-border-color-hover:var(--system-stepper-border-color-hover);--spectrum-stepper-border-color-focus:var(--system-stepper-border-color-focus);--spectrum-stepper-border-color-focus-hover:var(--system-stepper-border-color-focus-hover);--spectrum-stepper-border-color-keyboard-focus:var(--system-stepper-border-color-keyboard-focus);--spectrum-stepper-buttons-border-style:var(--system-stepper-buttons-border-style);--spectrum-stepper-buttons-border-width:var(--system-stepper-buttons-border-width);--spectrum-stepper-buttons-border-color:var(--system-stepper-buttons-border-color);--spectrum-stepper-buttons-background-color:var(--system-stepper-buttons-background-color);--spectrum-stepper-buttons-border-color-hover:var(--system-stepper-buttons-border-color-hover);--spectrum-stepper-buttons-border-color-focus:var(--system-stepper-buttons-border-color-focus);--spectrum-stepper-buttons-border-color-keyboard-focus:var(--system-stepper-buttons-border-color-keyboard-focus);--spectrum-stepper-button-border-width:var(--system-stepper-button-border-width);--spectrum-stepper-border-color-invalid:var(--system-stepper-border-color-invalid);--spectrum-stepper-border-color-focus-invalid:var(--system-stepper-border-color-focus-invalid);--spectrum-stepper-border-color-focus-hover-invalid:var(--system-stepper-border-color-focus-hover-invalid);--spectrum-stepper-border-color-keyboard-focus-invalid:var(--system-stepper-border-color-keyboard-focus-invalid);--spectrum-stepper-border-color-disabled:var(--system-stepper-border-color-disabled);--spectrum-stepper-button-border-width-disabled:var(--system-stepper-button-border-width-disabled);--spectrum-stepper-buttons-background-color-disabled:var(--system-stepper-buttons-background-color-disabled)}:host([quiet]) #textfield{--spectrum-stepper-buttons-border-style:var(--system-stepper-quiet-buttons-border-style);--spectrum-stepper-button-edge-to-fill:var(--system-stepper-quiet-button-edge-to-fill)}:host,:host([size=m]){--spectrum-stepper-button-width:var(--mod-stepper-button-width,var(--spectrum-in-field-button-width-stacked-medium));--spectrum-stepper-height:var(--mod-stepper-height,var(--spectrum-component-height-100))}:host([size=s]){--spectrum-stepper-button-width:var(--mod-stepper-button-width,var(--spectrum-in-field-button-width-stacked-small));--spectrum-stepper-height:var(--mod-stepper-height,var(--spectrum-component-height-75))}:host([size=l]){--spectrum-stepper-button-width:var(--mod-stepper-button-width,var(--spectrum-in-field-button-width-stacked-large));--spectrum-stepper-height:var(--mod-stepper-height,var(--spectrum-component-height-200))}:host([size=xl]){--spectrum-stepper-button-width:var(--mod-stepper-button-width,var(--spectrum-in-field-button-width-stacked-extra-large));--spectrum-stepper-height:var(--mod-stepper-height,var(--spectrum-component-height-300))}:host{--spectrum-stepper-width:calc(var(--mod-stepper-height,var(--spectrum-stepper-height))*var(--mod-stepper-min-width-multiplier,var(--spectrum-text-field-minimum-width-multiplier)) + var(--mod-stepper-button-width,var(--spectrum-stepper-button-width))*2 + var(--mod-stepper-border-width,var(--spectrum-stepper-border-width))*2);inline-size:var(--mod-stepper-width,var(--spectrum-stepper-width))}:host([hide-stepper]){--spectrum-stepper-width:calc(var(--mod-stepper-height,var(--spectrum-stepper-height))*var(--mod-stepper-min-width-multiplier,var(--spectrum-text-field-minimum-width-multiplier)) + var(--mod-stepper-button-width,var(--spectrum-stepper-button-width)) + var(--mod-stepper-border-width,var(--spectrum-stepper-border-width))*2)}#textfield{inline-size:100%}.input{font-variant-numeric:tabular-nums}:host([readonly]) .buttons{pointer-events:none;visibility:hidden}:host([readonly]:not([disabled],[invalid],[focused],[keyboard-focused])) #textfield:hover .input{border-color:#0000}:host([hide-stepper]:not([quiet])) #textfield input{border:var(--mod-textfield-border-width,var(--spectrum-textfield-border-width))solid var(--mod-textfield-border-color,var(--spectrum-textfield-border-color));border-radius:var(--spectrum-textfield-corner-radius)}:host([quiet]) #textfield .button{--mod-infield-button-border-color:var(--mod-infield-border-color-quiet,transparent);--mod-infield-button-edge-to-fill:0;--mod-infield-button-border-width:var(--mod-infield-button-border-width-quiet,0)}:host([focused]:not([disabled])) #textfield:hover{--mod-stepper-buttons-border-color-focus-hover:var(--mod-stepper-border-color-focus-hover,var(--spectrum-stepper-border-color-focus-hover))}:host([invalid]:not([hide-stepper])) #textfield .icon,:host([valid]:not([hide-stepper])) #textfield .icon{inset-inline-end:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-icon-spacing-inline-end-invalid))}:host([invalid]) .input{padding-inline-end:calc(var(--mod-textfield-icon-spacing-inline-start-valid,var(--spectrum-textfield-icon-spacing-inline-start-valid)) + var(--mod-textfield-icon-size-valid,var(--spectrum-textfield-icon-size-valid)) + var(--mod-textfield-icon-spacing-inline-end-valid,var(--spectrum-textfield-icon-spacing-inline-end-valid)) - var(--mod-textfield-border-width,var(--spectrum-textfield-border-width)))}
`;var Wo=Object.defineProperty,Vo=Object.getOwnPropertyDescriptor,Z=(r,e,t,a)=>{for(var i=a>1?void 0:a?Vo(e,t):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=(a?s(e,t,i):s(i))||i);return a&&i&&Wo(e,t,i),i};const No=5,Go=100,We="-",pr={"１":"1","２":"2","３":"3","４":"4","５":"5","６":"6","７":"7","８":"8","９":"9","０":"0","、":",","，":",","。":".","．":".","％":"%","＋":"+",ー:"-",一:"1",二:"2",三:"3",四:"4",五:"5",六:"6",七:"7",八:"8",九:"9",零:"0"},hr={s:r=>u`
        <sp-icon-chevron50
            class="stepper-icon spectrum-UIIcon-Chevron${r}50"
        ></sp-icon-chevron50>
    `,m:r=>u`
        <sp-icon-chevron75
            class="stepper-icon spectrum-UIIcon-Chevron${r}75"
        ></sp-icon-chevron75>
    `,l:r=>u`
        <sp-icon-chevron100
            class="stepper-icon spectrum-UIIcon-Chevron${r}100"
        ></sp-icon-chevron100>
    `,xl:r=>u`
        <sp-icon-chevron200
            class="stepper-icon spectrum-UIIcon-Chevron${r}200"
        ></sp-icon-chevron200>
    `};class G extends R{constructor(){super(...arguments),this.focused=!1,this._forcedUnit="",this.formatOptions={},this.hideStepper=!1,this.indeterminate=!1,this.keyboardFocused=!1,this.managedInput=!1,this.stepModifier=10,this._value=NaN,this._trackingValue="",this.decimalsChars=new Set([".",","]),this.valueBeforeFocus="",this.isIntentDecimal=!1,this.changeCount=0,this.languageResolver=new Ht(this),this.wasIndeterminate=!1,this.hasRecentlyReceivedPointerDown=!1,this.applyFocusElementLabel=e=>{this.appliedLabel=e},this.isComposing=!1}static get styles(){return[...super.styles,Fo,gr]}set value(e){const t=this.validateInput(e);if(t===this.value)return;this.lastCommitedValue=t;const a=this._value;this._value=t,this.requestUpdate("value",a)}get value(){return this._value}get inputValue(){return this.indeterminate?this.formattedValue:this.inputElement.value}setValue(e=this.value){const t=this.lastCommitedValue;this.value=e,!(typeof t>"u"||t===this.value)&&(this.lastCommitedValue=this.value,this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}get valueAsString(){return this._value.toString()}set valueAsString(e){this.value=this.numberParser.parse(e)}get formattedValue(){return isNaN(this.value)?"":this.numberFormatter.format(this.value)+(this.focused?"":this._forcedUnit)}convertValueToNumber(e){let t=e.split("").map(n=>pr[n]||n).join("");const a=this.valueBeforeFocus.split("").filter(n=>this.decimalsChars.has(n)),i=new Set(a);if(Qt()&&this.inputElement.inputMode==="decimal"&&t!==this.valueBeforeFocus){const n=this.numberFormatter.formatToParts(1000.1).find(l=>l.type==="decimal").value;for(const l of i)l!==n&&!this.isIntentDecimal&&(t=t.replace(new RegExp(l,"g"),""));let s=!1;const c=t.split("");for(let l=c.length-1;l>=0;l--){const d=c[l];this.decimalsChars.has(d)&&(s?c[l]="":(c[l]=n,s=!0))}t=c.join("")}return this.numberParser.parse(t)}get _step(){var e;return typeof this.step<"u"?this.step:((e=this.formatOptions)==null?void 0:e.style)==="percent"?.01:1}handlePointerdown(e){if(e.button!==0){e.preventDefault();return}this.managedInput=!0,this.buttons.setPointerCapture(e.pointerId);const t=this.buttons.children[0].getBoundingClientRect(),a=this.buttons.children[1].getBoundingClientRect();this.findChange=i=>{i.clientX>=t.x&&i.clientY>=t.y&&i.clientX<=t.x+t.width&&i.clientY<=t.y+t.height?this.change=n=>this.increment(n.shiftKey?this.stepModifier:1):i.clientX>=a.x&&i.clientY>=a.y&&i.clientX<=a.x+a.width&&i.clientY<=a.y+a.height&&(this.change=n=>this.decrement(n.shiftKey?this.stepModifier:1))},this.findChange(e),this.startChange(e)}startChange(e){this.changeCount=0,this.doChange(e),this.safty=setTimeout(()=>{this.doNextChange(e)},400)}doChange(e){this.change(e)}handlePointermove(e){this.findChange(e)}handlePointerup(e){this.buttons.releasePointerCapture(e.pointerId),cancelAnimationFrame(this.nextChange),clearTimeout(this.safty),this.managedInput=!1,this.setValue()}doNextChange(e){return this.changeCount+=1,this.changeCount%No===0&&this.doChange(e),requestAnimationFrame(()=>{this.nextChange=this.doNextChange(e)})}stepBy(e){if(this.disabled||this.readonly)return;const t=typeof this.min<"u"?this.min:0;let a=this.value;a+=e*this._step,isNaN(this.value)&&(a=t),a=this.valueWithLimits(a),this.requestUpdate(),this._value=this.validateInput(a),this.inputElement.value=this.numberFormatter.format(a);const i=new Event("input",{bubbles:!0,composed:!0});this.inputElement.readOnly=!0,this.inputElement.dispatchEvent(i),this.indeterminate=!1,this.focus(),this.inputElement.readOnly=!1}increment(e=1){this.stepBy(1*e)}decrement(e=1){this.stepBy(-1*e)}handleKeydown(e){if(!this.isComposing)switch(e.code){case"ArrowUp":e.preventDefault(),this.increment(e.shiftKey?this.stepModifier:1),this.setValue();break;case"ArrowDown":e.preventDefault(),this.decrement(e.shiftKey?this.stepModifier:1),this.setValue();break}}onScroll(e){e.preventDefault(),this.managedInput=!0;const t=e.shiftKey?e.deltaX/Math.abs(e.deltaX):e.deltaY/Math.abs(e.deltaY);t!==0&&!isNaN(t)&&(this.stepBy(t*(e.shiftKey?this.stepModifier:1)),clearTimeout(this.queuedChangeEvent),this.queuedChangeEvent=setTimeout(()=>{this.setValue()},Go)),this.managedInput=!1}onFocus(){super.onFocus(),this._trackingValue=this.inputValue,this.keyboardFocused=!this.readonly&&!0,this.addEventListener("wheel",this.onScroll,{passive:!1}),this.valueBeforeFocus=this.inputElement.value}onBlur(e){super.onBlur(e),this.keyboardFocused=!this.readonly&&!1,this.removeEventListener("wheel",this.onScroll),this.isIntentDecimal=!1}handleFocusin(){this.focused=!this.readonly&&!0,this.keyboardFocused=!this.readonly&&!0}handleFocusout(){this.focused=!this.readonly&&!1,this.keyboardFocused=!this.readonly&&!1}handleChange(){const e=this.convertValueToNumber(this.inputValue);if(this.wasIndeterminate&&(this.wasIndeterminate=!1,this.indeterminateValue=void 0,isNaN(e))){this.indeterminate=!0;return}this.setValue(e),this.inputElement.value=this.formattedValue}handleCompositionStart(){this.isComposing=!0}handleCompositionEnd(){this.isComposing=!1,requestAnimationFrame(()=>{this.inputElement.dispatchEvent(new Event("input",{composed:!0,bubbles:!0}))})}handleInputElementPointerdown(){this.hasRecentlyReceivedPointerDown=!0,this.updateComplete.then(()=>{requestAnimationFrame(()=>{this.hasRecentlyReceivedPointerDown=!1})})}handleInput(e){var t;if(this.isComposing){if(e.data){const d=this.convertValueToNumber(e.data);Number.isNaN(d)&&(this.inputElement.value=this.indeterminate?We:this._trackingValue,this.isComposing=!1)}e.stopPropagation();return}this.indeterminate&&(this.wasIndeterminate=!0,this.indeterminateValue=this.value,this.inputElement.value=this.inputElement.value.replace(We,"")),e.data&&this.decimalsChars.has(e.data)&&(this.isIntentDecimal=!0);const{value:a,selectionStart:i}=this.inputElement,n=a.split("").map(d=>pr[d]||d).join("");if(this.numberParser.isValidPartialNumber(n)){this.lastCommitedValue=(t=this.lastCommitedValue)!=null?t:this.value;const d=this.convertValueToNumber(n);!n&&this.indeterminateValue?(this.indeterminate=!0,this._value=this.indeterminateValue):(this.indeterminate=!1,this._value=this.validateInput(d)),this._trackingValue=n,this.inputElement.value=n,this.inputElement.setSelectionRange(i,i);return}else this.inputElement.value=this.indeterminate?We:this._trackingValue,e.stopPropagation();const s=n.length,c=this._trackingValue.length,l=(i||s)-(s-c);this.inputElement.setSelectionRange(l,l)}valueWithLimits(e){let t=e;return typeof this.min<"u"&&(t=Math.max(this.min,t)),typeof this.max<"u"&&(t=Math.min(this.max,t)),t}validateInput(e){e=this.valueWithLimits(e);const t=e<0?-1:1;if(e*=t,this.step){const a=typeof this.min<"u"?this.min:0,i=parseFloat(this.valueFormatter.format((e-a)%this.step));if(i===0||(Math.round(i/this.step)===1?e+=this.step-i:e-=i),typeof this.max<"u")for(;e>this.max;)e-=this.step;e=parseFloat(this.valueFormatter.format(e))}return e*=t,e}get displayValue(){const e=this.focused?"":We;return this.indeterminate?e:this.formattedValue}clearNumberFormatterCache(){this._numberFormatter=void 0,this._numberParser=void 0}get numberFormatter(){if(!this._numberFormatter||!this._numberFormatterFocused){const{style:e,unit:t,unitDisplay:a,...i}=this.formatOptions;e!=="unit"&&(i.style=e),this._numberFormatterFocused=new we(this.languageResolver.language,i);try{this._numberFormatter=new we(this.languageResolver.language,this.formatOptions),this._forcedUnit="",this._numberFormatter.format(1)}catch{e==="unit"&&(this._forcedUnit=t),this._numberFormatter=this._numberFormatterFocused}}return this.focused?this._numberFormatterFocused:this._numberFormatter}clearValueFormatterCache(){this._valueFormatter=void 0}get valueFormatter(){if(!this._valueFormatter){const e=this.step&&this.step!=Math.floor(this.step)?this.step.toString().split(".")[1].length:0;this._valueFormatter=new we("en",{useGrouping:!1,maximumFractionDigits:e})}return this._valueFormatter}get numberParser(){if(!this._numberParser||!this._numberParserFocused){const{style:e,unit:t,unitDisplay:a,...i}=this.formatOptions;e!=="unit"&&(i.style=e),this._numberParserFocused=new St(this.languageResolver.language,i);try{this._numberParser=new St(this.languageResolver.language,this.formatOptions),this._forcedUnit="",this._numberParser.parse("0")}catch{e==="unit"&&(this._forcedUnit=t),this._numberParser=this._numberParserFocused}}return this.focused?this._numberParserFocused:this._numberParser}renderField(){return this.autocomplete="off",u`
            ${super.renderField()}
            ${this.hideStepper?L:u`
                      <span
                          class="buttons"
                          @focusin=${this.handleFocusin}
                          @focusout=${this.handleFocusout}
                          ${Ar({start:["pointerdown",this.handlePointerdown],streamInside:[["pointermove","pointerenter","pointerleave","pointerover","pointerout"],this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup]})}
                      >
                          <sp-infield-button
                              inline="end"
                              block="start"
                              class="button step-up"
                              aria-hidden="true"
                              label=${"Increase "+this.appliedLabel}
                              size=${this.size}
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled||this.readonly||typeof this.max<"u"&&this.value===this.max}
                              ?quiet=${this.quiet}
                          >
                              ${hr[this.size]("Up")}
                          </sp-infield-button>
                          <sp-infield-button
                              inline="end"
                              block="end"
                              class="button step-down"
                              aria-hidden="true"
                              label=${"Decrease "+this.appliedLabel}
                              size=${this.size}
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled||this.readonly||typeof this.min<"u"&&this.value===this.min}
                              ?quiet=${this.quiet}
                          >
                              ${hr[this.size]("Down")}
                          </sp-infield-button>
                      </span>
                  `}
        `}update(e){if((e.has("formatOptions")||e.has("resolvedLanguage"))&&this.clearNumberFormatterCache(),e.has("value")||e.has("max")||e.has("min")||e.has("step")){const t=this.numberParser.parse(this.formattedValue.replace(this._forcedUnit,""));this.value=t,this.clearValueFormatterCache()}super.update(e)}willUpdate(e){this.multiline=!1,e.has(It)&&this.clearNumberFormatterCache()}firstUpdated(e){super.firstUpdated(e),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("compositionstart",this.handleCompositionStart),this.addEventListener("compositionend",this.handleCompositionEnd)}updated(e){if(!(!this.inputElement||!this.isConnected)){if(e.has("min")||e.has("formatOptions")){const t=typeof this.min<"u"&&this.min>=0,{maximumFractionDigits:a}=this.numberFormatter.resolvedOptions(),i=a&&a>0;let n="numeric";Zr()&&!t?n="text":(Qt()&&i||Xr()&&i&&t)&&(n="decimal"),this.inputElement.inputMode=n}e.has("focused")&&this.focused&&!this.hasRecentlyReceivedPointerDown&&this.formatOptions.unit&&this.setSelectionRange(0,this.displayValue.length)}}}Z([O(".buttons")],G.prototype,"buttons",2),Z([f({type:Boolean,reflect:!0})],G.prototype,"focused",2),Z([f({type:Object,attribute:"format-options"})],G.prototype,"formatOptions",2),Z([f({type:Boolean,reflect:!0,attribute:"hide-stepper"})],G.prototype,"hideStepper",2),Z([f({type:Boolean,reflect:!0})],G.prototype,"indeterminate",2),Z([f({type:Boolean,reflect:!0,attribute:"keyboard-focused"})],G.prototype,"keyboardFocused",2),Z([f({type:Number})],G.prototype,"max",2),Z([f({type:Number})],G.prototype,"min",2),Z([f({type:Number})],G.prototype,"step",2),Z([f({type:Number,reflect:!0,attribute:"step-modifier"})],G.prototype,"stepModifier",2),Z([f({type:Number})],G.prototype,"value",1);z("sp-number-field",G);const Uo=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),Qo=$`
    :host{--spectrum-accordion-item-height:var(--spectrum-component-height-200);--spectrum-accordion-item-width:var(--spectrum-accordion-minimum-width);--spectrum-accordion-disclosure-indicator-height:var(--spectrum-component-height-100);--spectrum-accordion-disclosure-indicator-to-text-space:var(--spectrum-accordion-disclosure-indicator-to-text);--spectrum-accordion-edge-to-disclosure-indicator-space:var(--spectrum-accordion-edge-to-disclosure-indicator);--spectrum-accordion-edge-to-text-space:var(--spectrum-accordion-edge-to-text);--spectrum-accordion-item-header-top-to-text-space:var(--spectrum-accordion-top-to-text-regular-medium);--spectrum-accordion-item-header-bottom-to-text-space:var(--spectrum-accordion-bottom-to-text-regular-medium);--spectrum-accordion-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-accordion-focus-indicator-thickness:var(--spectrum-focus-indicator-thickness);--spectrum-accordion-corner-radius:var(--spectrum-corner-radius-100);--spectrum-accordion-item-content-area-top-to-content:var(--spectrum-accordion-content-area-top-to-content);--spectrum-accordion-item-content-area-bottom-to-content:var(--spectrum-accordion-content-area-bottom-to-content);--spectrum-accordion-component-edge-to-text:var(--spectrum-component-edge-to-text-75);--spectrum-accordion-item-header-font:var(--spectrum-sans-font-family-stack);--spectrum-accordion-item-header-font-weight:var(--spectrum-bold-font-weight);--spectrum-accordion-item-header-font-style:var(--spectrum-default-font-style);--spectrum-accordion-item-header-font-size:var(--spectrum-font-size-300);--spectrum-accordion-item-header-line-height:1.25;--spectrum-accordion-item-content-font:var(--spectrum-sans-font-family-stack);--spectrum-accordion-item-content-font-weight:var(--spectrum-body-sans-serif-font-weight);--spectrum-accordion-item-content-font-style:var(--spectrum-body-sans-serif-font-style);--spectrum-accordion-item-content-font-size:var(--spectrum-body-size-s);--spectrum-accordion-item-content-line-height:var(--spectrum-line-height-100);--spectrum-accordion-background-color-default:rgba(var(--spectrum-gray-900-rgb),var(--spectrum-background-opacity-default));--spectrum-accordion-background-color-hover:rgba(var(--spectrum-gray-900-rgb),var(--spectrum-background-opacity-hover));--spectrum-accordion-background-color-down:rgba(var(--spectrum-gray-900-rgb),var(--spectrum-background-opacity-down));--spectrum-accordion-background-color-key-focus:rgba(var(--spectrum-gray-900-rgb),var(--spectrum-background-opacity-key-focus));--spectrum-accordion-item-header-color-default:var(--spectrum-neutral-content-color-default);--spectrum-accordion-item-header-color-hover:var(--spectrum-neutral-content-color-hover);--spectrum-accordion-item-header-color-down:var(--spectrum-neutral-content-color-down);--spectrum-accordion-item-header-color-key-focus:var(--spectrum-neutral-content-color-key-focus);--spectrum-accordion-item-header-disabled-color:var(--spectrum-disabled-content-color);--spectrum-accordion-focus-indicator-color:var(--spectrum-focus-indicator-color);--spectrum-accordion-min-block-size:max(var(--mod-accordion-item-height,var(--spectrum-accordion-item-height)),calc(var(--mod-accordion-item-header-top-to-text-space,var(--spectrum-accordion-item-header-top-to-text-space)) + var(--mod-accordion-item-header-bottom-to-text-space,var(--spectrum-accordion-item-header-bottom-to-text-space)) + var(--mod-accordion-item-header-font-size,var(--spectrum-accordion-item-header-font-size))*var(--mod-accordion-item-header-line-height,var(--spectrum-accordion-item-header-line-height))))}:host:dir(rtl),:host([dir=rtl]){--spectrum-logical-rotation:matrix(-1,0,0,1,0,0)}:host:lang(ja),:host:lang(ko),:host:lang(zh){--spectrum-accordion-item-header-line-height:var(--spectrum-cjk-line-height-100);--spectrum-accordion-item-content-line-height:var(--spectrum-cjk-line-height-100)}:host([density=compact]){--spectrum-accordion-item-height:var(--spectrum-component-height-100);--spectrum-accordion-item-header-top-to-text-space:var(--spectrum-accordion-top-to-text-compact-medium);--spectrum-accordion-item-header-bottom-to-text-space:var(--spectrum-accordion-bottom-to-text-compact-medium)}:host([density=compact][size=s]){--spectrum-accordion-item-height:var(--spectrum-component-height-75);--spectrum-accordion-item-header-top-to-text-space:var(--spectrum-accordion-top-to-text-compact-small);--spectrum-accordion-item-header-bottom-to-text-space:var(--spectrum-accordion-bottom-to-text-compact-small)}:host([density=compact][size=l]){--spectrum-accordion-item-height:var(--spectrum-component-height-200);--spectrum-accordion-item-header-top-to-text-space:var(--spectrum-accordion-top-to-text-compact-large);--spectrum-accordion-item-header-bottom-to-text-space:var(--spectrum-accordion-bottom-to-text-compact-large)}:host([density=compact][size=xl]){--spectrum-accordion-item-height:var(--spectrum-component-height-300);--spectrum-accordion-item-header-top-to-text-space:var(--spectrum-accordion-top-to-text-compact-extra-large);--spectrum-accordion-item-header-bottom-to-text-space:var(--spectrum-accordion-bottom-to-text-compact-extra-large)}:host([density=spacious]){--spectrum-accordion-item-header-line-height:1.278;--spectrum-accordion-item-header-top-to-text-space:var(--spectrum-accordion-top-to-text-spacious-medium);--spectrum-accordion-item-header-bottom-to-text-space:var(--spectrum-accordion-bottom-to-text-spacious-medium)}:host([density=spacious][size=s]){--spectrum-accordion-item-header-line-height:1.25;--spectrum-accordion-item-header-top-to-text-space:var(--spectrum-accordion-small-top-to-text-spacious);--spectrum-accordion-item-header-bottom-to-text-space:var(--spectrum-accordion-bottom-to-text-spacious-small)}:host([density=spacious][size=l]){--spectrum-accordion-item-header-line-height:1.273;--spectrum-accordion-item-header-top-to-text-space:var(--spectrum-accordion-top-to-text-spacious-large);--spectrum-accordion-item-header-bottom-to-text-space:var(--spectrum-accordion-bottom-to-text-spacious-large)}:host([density=spacious][size=xl]){--spectrum-accordion-item-header-line-height:1.25;--spectrum-accordion-item-header-top-to-text-space:var(--spectrum-accordion-top-to-text-spacious-extra-large);--spectrum-accordion-item-header-bottom-to-text-space:var(--spectrum-accordion-bottom-to-text-spacious-extra-large)}:host([size=s]){--spectrum-accordion-item-height:var(--spectrum-component-height-100);--spectrum-accordion-disclosure-indicator-height:var(--spectrum-component-height-75);--spectrum-accordion-component-edge-to-text:var(--spectrum-component-edge-to-text-50);--spectrum-accordion-item-header-font-size:var(--spectrum-font-size-200);--spectrum-accordion-item-content-font-size:var(--spectrum-body-size-xs);--spectrum-accordion-item-header-top-to-text-space:var(--spectrum-accordion-top-to-text-regular-small);--spectrum-accordion-item-header-bottom-to-text-space:var(--spectrum-accordion-bottom-to-text-regular-small)}:host([size=l]){--spectrum-accordion-item-height:var(--spectrum-component-height-300);--spectrum-accordion-disclosure-indicator-height:var(--spectrum-component-height-200);--spectrum-accordion-component-edge-to-text:var(--spectrum-component-edge-to-text-100);--spectrum-accordion-item-header-font-size:var(--spectrum-font-size-500);--spectrum-accordion-item-content-font-size:var(--spectrum-body-size-m);--spectrum-accordion-item-header-top-to-text-space:var(--spectrum-accordion-top-to-text-regular-large);--spectrum-accordion-item-header-bottom-to-text-space:var(--spectrum-accordion-bottom-to-text-regular-large)}:host([size=xl]){--spectrum-accordion-item-height:var(--spectrum-component-height-400);--spectrum-accordion-disclosure-indicator-height:var(--spectrum-component-height-300);--spectrum-accordion-component-edge-to-text:var(--spectrum-component-edge-to-text-200);--spectrum-accordion-item-header-font-size:var(--spectrum-font-size-700);--spectrum-accordion-item-content-font-size:var(--spectrum-body-size-l);--spectrum-accordion-item-header-top-to-text-space:var(--spectrum-accordion-top-to-text-regular-extra-large);--spectrum-accordion-item-header-bottom-to-text-space:var(--spectrum-accordion-bottom-to-text-regular-extra-large)}:host{margin:0;padding:0;list-style:none;display:block}:host{--spectrum-accordion-divider-color:var(--system-accordion-divider-color);--spectrum-accordion-item-content-disabled-color:var(--system-accordion-item-content-disabled-color);--spectrum-accordion-item-content-color:var(--system-accordion-item-content-color)}:host{--spectrum-logical-rotation: }
`;var Zo=Object.defineProperty,zt=(r,e,t,a)=>{for(var i=void 0,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=s(e,t,i)||i);return i&&Zo(e,t,i),i};class Ke extends pe(Ie,{noDefaultSize:!0}){constructor(){super(...arguments),this.allowMultiple=!1,this.focusGroupController=new Yr(this,{direction:"vertical",elements:()=>this.items,isFocusableElement:e=>!e.disabled})}static get styles(){return[Qo]}get items(){return[...this.defaultNodes||[]].filter(e=>typeof e.tagName<"u")}focus(){this.focusGroupController.focus()}async onToggle(e){const t=e.target;if(await 0,this.allowMultiple||e.defaultPrevented)return;const a=[...this.items];a&&!a.length||a.forEach(i=>{i!==t&&(i.open=!1)})}handleSlotchange(){this.focusGroupController.clearElementCache(),this.items.forEach(e=>{e.size=this.size})}updated(e){super.updated(e),e.has("size")&&(e.get("size")||this.size!=="m")&&this.items.forEach(t=>{t.size=this.size})}render(){return u`
            <slot
                @slotchange=${this.handleSlotchange}
                @sp-accordion-item-toggle=${this.onToggle}
            ></slot>
        `}}zt([f({type:Boolean,reflect:!0,attribute:"allow-multiple"})],Ke.prototype,"allowMultiple"),zt([f({type:String,reflect:!0})],Ke.prototype,"density"),zt([sa()],Ke.prototype,"defaultNodes");z("sp-accordion",Ke);const Xo=$`
    :host{z-index:inherit;min-block-size:var(--mod-accordion-item-height,var(--spectrum-accordion-item-height));min-inline-size:var(--mod-accordion-item-width,var(--spectrum-accordion-item-width));border-block-end:1px solid #0000;border-color:var(--mod-accordion-divider-color,var(--spectrum-accordion-divider-color));border-width:var(--mod-accordion-divider-thickness,var(--spectrum-divider-thickness-small));margin:0;position:relative}:host(:first-child){border-block-start:1px solid #0000;border-color:var(--mod-accordion-divider-color,var(--spectrum-accordion-divider-color));border-width:var(--mod-accordion-divider-thickness,var(--spectrum-divider-thickness-small))}#heading{box-sizing:border-box;margin:0;position:relative}.iconContainer{inline-size:var(--mod-accordion-disclosure-indicator-height,var(--spectrum-accordion-disclosure-indicator-height));block-size:var(--mod-accordion-disclosure-indicator-height,var(--spectrum-accordion-disclosure-indicator-height));color:var(--mod-accordion-item-header-color-default,var(--spectrum-accordion-item-header-color-default));justify-content:center;align-items:center;padding-inline-start:var(--mod-accordion-edge-to-disclosure-indicator-space,var(--spectrum-accordion-edge-to-disclosure-indicator-space));display:flex;position:absolute;inset-block-start:max(0px,calc((var(--mod-accordion-min-block-size,var(--spectrum-accordion-min-block-size)) - var(--mod-accordion-disclosure-indicator-height,var(--spectrum-accordion-disclosure-indicator-height)))/2))}.iconContainer:dir(rtl),:host([dir=rtl]) .iconContainer{transform:scaleX(-1)}#content{padding-block:var(--mod-accordion-item-content-area-top-to-content,var(--spectrum-accordion-item-content-area-top-to-content))var(--mod-accordion-item-content-area-bottom-to-content,var(--spectrum-accordion-item-content-area-bottom-to-content));padding-inline:var(--mod-accordion-component-edge-to-text,var(--spectrum-accordion-component-edge-to-text))var(--mod-accordion-component-edge-to-text,var(--spectrum-accordion-component-edge-to-text));color:var(--mod-accordion-item-content-color,var(--spectrum-accordion-item-content-color));font-weight:var(--mod-accordion-item-content-font-weight,var(--spectrum-accordion-item-content-font-weight));font-style:var(--mod-accordion-item-content-font-style,var(--spectrum-accordion-item-content-font-style));font-size:var(--mod-accordion-item-content-font-size,var(--spectrum-accordion-item-content-font-size));font-family:var(--mod-accordion-item-content-font,var(--spectrum-accordion-item-content-font));line-height:var(--mod-accordion-item-content-line-height,var(--spectrum-accordion-item-content-line-height));display:none}#header{box-sizing:border-box;padding-block:var(--mod-accordion-item-header-top-to-text-space,var(--spectrum-accordion-item-header-top-to-text-space))var(--mod-accordion-item-header-bottom-to-text-space,var(--spectrum-accordion-item-header-bottom-to-text-space));min-block-size:var(--mod-accordion-min-block-size,var(--spectrum-accordion-min-block-size));line-height:var(--mod-accordion-item-header-line-height,var(--spectrum-accordion-item-header-line-height));text-overflow:ellipsis;cursor:pointer;font-size:var(--mod-accordion-item-header-font-size,var(--spectrum-accordion-item-header-font-size));font-weight:var(--mod-accordion-item-header-font-weight,var(--spectrum-accordion-item-header-font-weight));font-style:var(--mod-accordion-item-header-font-style,var(--spectrum-accordion-item-header-font-style));font-family:var(--mod-accordion-item-header-font,var(--spectrum-accordion-item-header-font));appearance:none;text-align:start;inline-size:100%;color:var(--mod-accordion-item-header-color-default,var(--spectrum-accordion-item-header-color-default));background-color:var(--mod-accordion-background-color-default,var(--spectrum-accordion-background-color-default));border:0;justify-content:flex-start;align-items:center;padding-inline-start:calc(var(--mod-accordion-disclosure-indicator-to-text-space,var(--spectrum-accordion-disclosure-indicator-to-text-space)) + var(--mod-accordion-disclosure-indicator-height,var(--spectrum-accordion-disclosure-indicator-height)));padding-inline-end:var(--mod-accordion-edge-to-text-space,var(--spectrum-accordion-edge-to-text-space));display:flex;position:relative}#header:focus{outline:none}#header:focus:after{content:"";position:absolute;inset-inline-start:0}#header:focus-visible{border-radius:var(--mod-accordion-corner-radius,var(--spectrum-accordion-corner-radius));outline:var(--mod-accordion-focus-indicator-thickness,var(--spectrum-accordion-focus-indicator-thickness))solid var(--mod-accordion-focus-indicator-color,var(--spectrum-accordion-focus-indicator-color));background-color:var(--mod-accordion-background-color-key-focus,var(--spectrum-accordion-background-color-key-focus));color:var(--mod-accordion-item-header-color-key-focus,var(--spectrum-accordion-item-header-color-key-focus));outline-offset:calc(var(--mod-accordion-focus-indicator-gap,var(--spectrum-accordion-focus-indicator-gap))*-1)}#header:active{background-color:var(--mod-accordion-background-color-down,var(--spectrum-accordion-background-color-down));color:var(--mod-accordion-item-header-color-down,var(--spectrum-accordion-item-header-color-down))}:host([disabled]) #header,:host([disabled]) #header:focus-visible{color:var(--mod-accordion-item-header-disabled-color,var(--spectrum-accordion-item-header-disabled-color));background-color:initial}@media (hover:hover){#header:hover{background-color:var(--mod-accordion-background-color-hover,var(--spectrum-accordion-background-color-hover))}#header:hover,#header:hover+.iconContainer{color:var(--mod-accordion-item-header-color-hover,var(--spectrum-accordion-item-header-color-hover))}:host([open]) #header:hover{background-color:var(--mod-accordion-background-color-hover,var(--spectrum-accordion-background-color-hover))}:host([disabled]) #header:hover{color:var(--mod-accordion-item-header-disabled-color,var(--spectrum-accordion-item-header-disabled-color));background-color:initial}}:host([disabled]) #header+.iconContainer{color:var(--mod-accordion-item-header-disabled-color,var(--spectrum-accordion-item-header-disabled-color))}:host([disabled]) #content{color:var(--mod-accordion-item-content-disabled-color,var(--spectrum-accordion-item-content-disabled-color))}@media (forced-colors:active){#header:after{forced-color-adjust:none;content:"";position:absolute;inset-inline-start:0}}:host([open])>#heading>.iconContainer>.indicator,:host([open])>.iconContainer>.indicator{transform:rotate(90deg);transform:var(--spectrum-logical-rotation,)rotate(90deg)}:host([open])>#content{display:block}:host([disabled]) #header{cursor:default}:host{display:block}#heading{height:auto;position:relative}:host([disabled]) #heading .indicator{color:var(--mod-accordion-item-header-disabled-color,var(--spectrum-accordion-item-header-disabled-color))}
`;var Yo=Object.defineProperty,_t=(r,e,t,a)=>{for(var i=void 0,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=s(e,t,i)||i);return i&&Yo(e,t,i),i};const Ko={s:()=>u`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight75"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,m:()=>u`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight100"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,l:()=>u`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight200"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,xl:()=>u`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight300"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `};class Je extends pe(Dt,{noDefaultSize:!0}){constructor(){super(...arguments),this.open=!1,this.label="",this.disabled=!1,this.renderChevronIcon=()=>Ko[this.size||"m"]()}static get styles(){return[Xo,gr]}get focusElement(){return this.shadowRoot.querySelector("#header")}onClick(){this.disabled||this.toggle()}toggle(){this.open=!this.open,this.dispatchEvent(new CustomEvent("sp-accordion-item-toggle",{bubbles:!0,composed:!0,cancelable:!0}))||(this.open=!this.open)}render(){return u`
            <h3 id="heading">
                ${de(this.size,this.renderChevronIcon)}
                <button
                    id="header"
                    @click=${this.onClick}
                    aria-expanded=${this.open}
                    aria-controls="content"
                    ?disabled=${this.disabled}
                >
                    ${this.label}
                </button>
            </h3>
            <div id="content" role="region" aria-labelledby="header">
                <slot></slot>
            </div>
        `}updated(e){super.updated(e),e.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}_t([f({type:Boolean,reflect:!0})],Je.prototype,"open"),_t([f({type:String,reflect:!0})],Je.prototype,"label"),_t([f({type:Boolean,reflect:!0})],Je.prototype,"disabled");z("sp-accordion-item",Je);var Jo=(r=>(r.WEBM="video/webm",r.MP4="video/mp4",r))(Jo||{}),Et=(r=>(r.IMAGE="image",r.VIDEO="video",r))(Et||{});const Br=$`
    .spectrum{color:var(--spectrum-body-m-text-color,var(--spectrum-alias-text-color));font-family:var(--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base));font-size:var(--spectrum-alias-font-size-default,var(--spectrum-global-dimension-font-size-100))}
`,Lr=$`
    .spectrum-Typography:lang(ar){font-family:var(--spectrum-font-family-ar)}.spectrum-Typography:lang(he){font-family:var(--spectrum-font-family-he)}.spectrum-Heading:lang(ja),.spectrum-Heading:lang(ko),.spectrum-Heading:lang(zh){font-family:var(--mod-heading-cjk-font-family,var(--spectrum-heading-cjk-font-family));font-style:var(--mod-heading-cjk-font-style,var(--spectrum-heading-cjk-font-style));font-weight:var(--mod-heading-cjk-font-weight,var(--spectrum-heading-cjk-font-weight));font-size:var(--mod-heading-cjk-font-size,var(--spectrum-heading-cjk-font-size));line-height:var(--mod-heading-cjk-line-height,var(--spectrum-heading-cjk-line-height));letter-spacing:var(--mod-heading-cjk-letter-spacing,var(--spectrum-heading-cjk-letter-spacing))}.spectrum-Heading:lang(ja) .spectrum-Heading-emphasized,.spectrum-Heading:lang(ja) em,.spectrum-Heading:lang(ko) .spectrum-Heading-emphasized,.spectrum-Heading:lang(ko) em,.spectrum-Heading:lang(zh) .spectrum-Heading-emphasized,.spectrum-Heading:lang(zh) em{font-style:var(--mod-heading-cjk-emphasized-font-style,var(--spectrum-heading-cjk-emphasized-font-style));font-weight:var(--mod-heading-cjk-emphasized-font-weight,var(--spectrum-heading-cjk-emphasized-font-weight))}.spectrum-Heading:lang(ja) .spectrum-Heading-strong,.spectrum-Heading:lang(ja) strong,.spectrum-Heading:lang(ko) .spectrum-Heading-strong,.spectrum-Heading:lang(ko) strong,.spectrum-Heading:lang(zh) .spectrum-Heading-strong,.spectrum-Heading:lang(zh) strong{font-style:var(--mod-heading-cjk-strong-font-style,var(--spectrum-heading-cjk-strong-font-style));font-weight:var(--mod-heading-cjk-strong-font-weight,var(--spectrum-heading-cjk-strong-font-weight))}.spectrum-Heading:lang(ja) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading:lang(ja) em strong,.spectrum-Heading:lang(ja) strong em,.spectrum-Heading:lang(ko) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading:lang(ko) em strong,.spectrum-Heading:lang(ko) strong em,.spectrum-Heading:lang(zh) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading:lang(zh) em strong,.spectrum-Heading:lang(zh) strong em{font-style:var(--mod-heading-cjk-strong-emphasized-font-style,var(--spectrum-heading-cjk-strong-emphasized-font-style));font-weight:var(--mod-heading-cjk-strong-emphasized-font-weight,var(--spectrum-heading-cjk-strong-emphasized-font-weight))}.spectrum-Heading--heavy:lang(ja),.spectrum-Heading--heavy:lang(ko),.spectrum-Heading--heavy:lang(zh){font-style:var(--mod-heading-cjk-heavy-font-style,var(--spectrum-heading-cjk-heavy-font-style));font-weight:var(--mod-heading-cjk-heavy-font-weight,var(--spectrum-heading-cjk-heavy-font-weight))}.spectrum-Heading--heavy:lang(ja) .spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(ja) em,.spectrum-Heading--heavy:lang(ko) .spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(ko) em,.spectrum-Heading--heavy:lang(zh) .spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(zh) em{font-style:var(--mod-heading-cjk-heavy-emphasized-font-style,var(--spectrum-heading-cjk-heavy-emphasized-font-style));font-weight:var(--mod-heading-cjk-heavy-emphasized-font-weight,var(--spectrum-heading-cjk-heavy-emphasized-font-weight))}.spectrum-Heading--heavy:lang(ja) .spectrum-Heading-strong,.spectrum-Heading--heavy:lang(ja) strong,.spectrum-Heading--heavy:lang(ko) .spectrum-Heading-strong,.spectrum-Heading--heavy:lang(ko) strong,.spectrum-Heading--heavy:lang(zh) .spectrum-Heading-strong,.spectrum-Heading--heavy:lang(zh) strong{font-style:var(--mod-heading-cjk-heavy-strong-font-style,var(--spectrum-heading-cjk-heavy-strong-font-style));font-weight:var(--mod-heading-cjk-heavy-strong-font-weight,var(--spectrum-heading-cjk-heavy-strong-font-weight))}.spectrum-Heading--heavy:lang(ja) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(ja) em strong,.spectrum-Heading--heavy:lang(ja) strong em,.spectrum-Heading--heavy:lang(ko) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(ko) em strong,.spectrum-Heading--heavy:lang(ko) strong em,.spectrum-Heading--heavy:lang(zh) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(zh) em strong,.spectrum-Heading--heavy:lang(zh) strong em{font-style:var(--mod-heading-cjk-heavy-strong-emphasized-font-style,var(--spectrum-heading-cjk-heavy-strong-emphasized-font-style));font-weight:var(--mod-heading-cjk-heavy-strong-emphasized-font-weight,var(--spectrum-heading-cjk-heavy-strong-emphasized-font-weight))}.spectrum-Heading--light:lang(ja),.spectrum-Heading--light:lang(ko),.spectrum-Heading--light:lang(zh){font-style:var(--mod-heading-cjk-light-font-style,var(--spectrum-heading-cjk-light-font-style));font-weight:var(--mod-heading-cjk-light-font-weight,var(--spectrum-heading-cjk-light-font-weight))}.spectrum-Heading--light:lang(ja) .spectrum-Heading-strong,.spectrum-Heading--light:lang(ja) strong,.spectrum-Heading--light:lang(ko) .spectrum-Heading-strong,.spectrum-Heading--light:lang(ko) strong,.spectrum-Heading--light:lang(zh) .spectrum-Heading-strong,.spectrum-Heading--light:lang(zh) strong{font-style:var(--mod-heading-cjk-light-strong-font-style,var(--spectrum-heading-cjk-light-strong-font-style));font-weight:var(--mod-heading-cjk-light-strong-font-weight,var(--spectrum-heading-cjk-light-strong-font-weight))}.spectrum-Heading--light:lang(ja) .spectrum-Heading-emphasized,.spectrum-Heading--light:lang(ja) em,.spectrum-Heading--light:lang(ko) .spectrum-Heading-emphasized,.spectrum-Heading--light:lang(ko) em,.spectrum-Heading--light:lang(zh) .spectrum-Heading-emphasized,.spectrum-Heading--light:lang(zh) em{font-style:var(--mod-heading-cjk-light-emphasized-font-style,var(--spectrum-heading-cjk-light-emphasized-font-style));font-weight:var(--mod-heading-cjk-light-emphasized-font-weight,var(--spectrum-heading-cjk-light-emphasized-font-weight))}.spectrum-Heading--light:lang(ja) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--light:lang(ja) em strong,.spectrum-Heading--light:lang(ja) strong em,.spectrum-Heading--light:lang(ko) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--light:lang(ko) em strong,.spectrum-Heading--light:lang(ko) strong em,.spectrum-Heading--light:lang(zh) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--light:lang(zh) em strong,.spectrum-Heading--light:lang(zh) strong em{font-style:var(--mod-heading-cjk-light-strong-emphasized-font-style,var(--spectrum-heading-cjk-light-strong-emphasized-font-style));font-weight:var(--mod-heading-cjk-light-strong-emphasized-font-weight,var(--spectrum-heading-cjk-light-strong-emphasized-font-weight))}.spectrum-Body:lang(ja),.spectrum-Body:lang(ko),.spectrum-Body:lang(zh){font-family:var(--mod-body-cjk-font-family,var(--spectrum-body-cjk-font-family));font-style:var(--mod-body-cjk-font-style,var(--spectrum-body-cjk-font-style));font-weight:var(--mod-body-cjk-font-weight,var(--spectrum-body-cjk-font-weight));line-height:var(--mod-body-cjk-line-height,var(--spectrum-body-cjk-line-height));letter-spacing:var(--mod-body-cjk-letter-spacing,var(--spectrum-body-cjk-letter-spacing))}.spectrum-Body:lang(ja) .spectrum-Body-strong,.spectrum-Body:lang(ja) strong,.spectrum-Body:lang(ko) .spectrum-Body-strong,.spectrum-Body:lang(ko) strong,.spectrum-Body:lang(zh) .spectrum-Body-strong,.spectrum-Body:lang(zh) strong{font-style:var(--mod-body-cjk-strong-font-style,var(--spectrum-body-cjk-strong-font-style));font-weight:var(--mod-body-cjk-strong-font-weight,var(--spectrum-body-cjk-strong-font-weight))}.spectrum-Body:lang(ja) .spectrum-Body-emphasized,.spectrum-Body:lang(ja) em,.spectrum-Body:lang(ko) .spectrum-Body-emphasized,.spectrum-Body:lang(ko) em,.spectrum-Body:lang(zh) .spectrum-Body-emphasized,.spectrum-Body:lang(zh) em{font-style:var(--mod-body-cjk-emphasized-font-style,var(--spectrum-body-cjk-emphasized-font-style));font-weight:var(--mod-body-cjk-emphasized-font-weight,var(--spectrum-body-cjk-emphasized-font-weight))}.spectrum-Body:lang(ja) .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body:lang(ja) em strong,.spectrum-Body:lang(ja) strong em,.spectrum-Body:lang(ko) .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body:lang(ko) em strong,.spectrum-Body:lang(ko) strong em,.spectrum-Body:lang(zh) .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body:lang(zh) em strong,.spectrum-Body:lang(zh) strong em{font-style:var(--mod-body-cjk-strong-emphasized-font-style,var(--spectrum-body-cjk-strong-emphasized-font-style));font-weight:var(--mod-body-cjk-strong-emphasized-font-weight,var(--spectrum-body-cjk-strong-emphasized-font-weight))}.spectrum-Detail:lang(ja),.spectrum-Detail:lang(ko),.spectrum-Detail:lang(zh){font-family:var(--mod-detail-cjk-font-family,var(--spectrum-detail-cjk-font-family));font-style:var(--mod-detail-cjk-font-style,var(--spectrum-detail-cjk-font-style));font-weight:var(--mod-detail-cjk-font-weight,var(--spectrum-detail-cjk-font-weight));line-height:var(--mod-detail-cjk-line-height,var(--spectrum-detail-cjk-line-height))}.spectrum-Detail:lang(ja) .spectrum-Detail-strong,.spectrum-Detail:lang(ja) strong,.spectrum-Detail:lang(ko) .spectrum-Detail-strong,.spectrum-Detail:lang(ko) strong,.spectrum-Detail:lang(zh) .spectrum-Detail-strong,.spectrum-Detail:lang(zh) strong{font-style:var(--mod-detail-cjk-strong-font-style,var(--spectrum-detail-cjk-strong-font-style));font-weight:var(--mod-detail-cjk-strong-font-weight,var(--spectrum-detail-cjk-strong-font-weight))}.spectrum-Detail:lang(ja) .spectrum-Detail-emphasized,.spectrum-Detail:lang(ja) em,.spectrum-Detail:lang(ko) .spectrum-Detail-emphasized,.spectrum-Detail:lang(ko) em,.spectrum-Detail:lang(zh) .spectrum-Detail-emphasized,.spectrum-Detail:lang(zh) em{font-style:var(--mod-detail-cjk-emphasized-font-style,var(--spectrum-detail-cjk-emphasized-font-style));font-weight:var(--mod-detail-cjk-emphasized-font-weight,var(--spectrum-detail-cjk-emphasized-font-weight))}.spectrum-Detail:lang(ja) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail:lang(ja) em strong,.spectrum-Detail:lang(ja) strong em,.spectrum-Detail:lang(ko) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail:lang(ko) em strong,.spectrum-Detail:lang(ko) strong em,.spectrum-Detail:lang(zh) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail:lang(zh) em strong,.spectrum-Detail:lang(zh) strong em{font-style:var(--mod-detail-cjk-strong-emphasized-font-style,var(--spectrum-detail-cjk-strong-emphasized-font-style));font-weight:var(--mod-detail-cjk-strong-emphasized-font-weight,var(--spectrum-detail-cjk-strong-emphasized-font-weight))}.spectrum-Detail--light:lang(ja),.spectrum-Detail--light:lang(ko),.spectrum-Detail--light:lang(zh){font-style:var(--mod-detail-cjk-light-font-style,var(--spectrum-detail-cjk-light-font-style));font-weight:var(--mod-detail-cjk-light-font-weight,var(--spectrum-detail-cjk-light-font-weight))}.spectrum-Detail--light:lang(ja) .spectrum-Detail-strong,.spectrum-Detail--light:lang(ja) strong,.spectrum-Detail--light:lang(ko) .spectrum-Detail-strong,.spectrum-Detail--light:lang(ko) strong,.spectrum-Detail--light:lang(zh) .spectrum-Detail-strong,.spectrum-Detail--light:lang(zh) strong{font-style:var(--mod-detail-cjk-light-strong-font-style,var(--spectrum-detail-cjk-light-strong-font-style));font-weight:var(--mod-detail-cjk-light-strong-font-weight,var(--spectrum-detail-cjk-light-strong-font-weight))}.spectrum-Detail--light:lang(ja) .spectrum-Detail-emphasized,.spectrum-Detail--light:lang(ja) em,.spectrum-Detail--light:lang(ko) .spectrum-Detail-emphasized,.spectrum-Detail--light:lang(ko) em,.spectrum-Detail--light:lang(zh) .spectrum-Detail-emphasized,.spectrum-Detail--light:lang(zh) em{font-style:var(--mod-detail-cjk-light-emphasized-font-style,var(--spectrum-detail-cjk-light-emphasized-font-style));font-weight:var(--mod-detail-cjk-light-emphasized-font-weight,var(--spectrum-detail-cjk-light-emphasized-font-weight))}.spectrum-Detail--light:lang(ja) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail--light:lang(ko) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail--light:lang(zh) .spectrum-Detail-strong.spectrum-Detail-emphasized{font-style:var(--mod-detail-cjk-light-strong-emphasized-font-style,var(--spectrum-detail-cjk-light-strong-emphasized-font-style));font-weight:var(--mod-detail-cjk-light-strong-emphasized-font-weight,var(--spectrum-detail-cjk-light-strong-emphasized-font-weight))}.spectrum-Code:lang(ja),.spectrum-Code:lang(ko),.spectrum-Code:lang(zh){font-family:var(--mod-code-cjk-font-family,var(--spectrum-code-cjk-font-family));font-style:var(--mod-code-cjk-font-style,var(--spectrum-code-cjk-font-style));font-weight:var(--mod-code-cjk-font-weight,var(--spectrum-code-cjk-font-weight));line-height:var(--mod-code-cjk-line-height,var(--spectrum-code-cjk-line-height));letter-spacing:var(--mod-code-cjk-letter-spacing,var(--spectrum-code-cjk-letter-spacing))}.spectrum-Code:lang(ja) .spectrum-Code-strong,.spectrum-Code:lang(ja) strong,.spectrum-Code:lang(ko) .spectrum-Code-strong,.spectrum-Code:lang(ko) strong,.spectrum-Code:lang(zh) .spectrum-Code-strong,.spectrum-Code:lang(zh) strong{font-style:var(--mod-code-cjk-strong-font-style,var(--spectrum-code-cjk-strong-font-style));font-weight:var(--mod-code-cjk-strong-font-weight,var(--spectrum-code-cjk-strong-font-weight))}.spectrum-Code:lang(ja) .spectrum-Code-emphasized,.spectrum-Code:lang(ja) em,.spectrum-Code:lang(ko) .spectrum-Code-emphasized,.spectrum-Code:lang(ko) em,.spectrum-Code:lang(zh) .spectrum-Code-emphasized,.spectrum-Code:lang(zh) em{font-style:var(--mod-code-cjk-emphasized-font-style,var(--spectrum-code-cjk-emphasized-font-style));font-weight:var(--mod-code-cjk-emphasized-font-weight,var(--spectrum-code-cjk-emphasized-font-weight))}.spectrum-Code:lang(ja) .spectrum-Code-strong.spectrum-Code-emphasized,.spectrum-Code:lang(ja) em strong,.spectrum-Code:lang(ja) strong em,.spectrum-Code:lang(ko) .spectrum-Code-strong.spectrum-Code-emphasized,.spectrum-Code:lang(ko) em strong,.spectrum-Code:lang(ko) strong em,.spectrum-Code:lang(zh) .spectrum-Code-strong.spectrum-Code-emphasized,.spectrum-Code:lang(zh) em strong,.spectrum-Code:lang(zh) strong em{font-style:var(--mod-code-cjk-strong-emphasized-font-style,var(--spectrum-code-cjk-strong-emphasized-font-style));font-weight:var(--mod-code-cjk-strong-emphasized-font-weight,var(--spectrum-code-cjk-strong-emphasized-font-weight))}
`,es=$`
    .spectrum-Typography .spectrum-Body{--spectrum-body-margin-end:calc(var(--mod-body-font-size,var(--spectrum-body-font-size))*var(--spectrum-body-margin-multiplier))}@media (forced-colors:active){.spectrum-Body{--highcontrast-body-font-color:Text}}.spectrum-Body,.spectrum-Body--sizeM{--spectrum-body-font-size:var(--spectrum-body-size-m)}.spectrum-Body--sizeXS{--spectrum-body-font-size:var(--spectrum-body-size-xs)}.spectrum-Body--sizeS{--spectrum-body-font-size:var(--spectrum-body-size-s)}.spectrum-Body--sizeL{--spectrum-body-font-size:var(--spectrum-body-size-l)}.spectrum-Body--sizeXL{--spectrum-body-font-size:var(--spectrum-body-size-xl)}.spectrum-Body--sizeXXL{--spectrum-body-font-size:var(--spectrum-body-size-xxl)}.spectrum-Body--sizeXXXL{--spectrum-body-font-size:var(--spectrum-body-size-xxxl)}.spectrum-Body{--spectrum-body-sans-serif-font-family:var(--spectrum-sans-font-family-stack);--spectrum-body-serif-font-family:var(--spectrum-serif-font-family-stack);--spectrum-body-cjk-font-family:var(--spectrum-cjk-font-family-stack);--spectrum-body-cjk-letter-spacing:var(--spectrum-cjk-letter-spacing);--spectrum-body-font-color:var(--spectrum-body-color);font-family:var(--mod-body-sans-serif-font-family,var(--spectrum-body-sans-serif-font-family));font-style:var(--mod-body-sans-serif-font-style,var(--spectrum-body-sans-serif-font-style));font-weight:var(--mod-body-sans-serif-font-weight,var(--spectrum-body-sans-serif-font-weight));font-size:var(--mod-body-font-size,var(--spectrum-body-font-size));color:var(--highcontrast-body-font-color,var(--mod-body-font-color,var(--spectrum-body-font-color)));line-height:var(--mod-body-line-height,var(--spectrum-body-line-height));margin-block-start:var(--mod-body-margin-start,var(--mod-body-margin,0));margin-block-end:var(--mod-body-margin-end,var(--mod-body-margin,var(--spectrum-body-margin-end,0)))}.spectrum-Body .spectrum-Body-strong,.spectrum-Body strong{font-style:var(--mod-body-sans-serif-strong-font-style,var(--spectrum-body-sans-serif-strong-font-style));font-weight:var(--mod-body-sans-serif-strong-font-weight,var(--spectrum-body-sans-serif-strong-font-weight))}.spectrum-Body .spectrum-Body-emphasized,.spectrum-Body em{font-style:var(--mod-body-sans-serif-emphasized-font-style,var(--spectrum-body-sans-serif-emphasized-font-style));font-weight:var(--mod-body-sans-serif-emphasized-font-weight,var(--spectrum-body-sans-serif-emphasized-font-weight))}.spectrum-Body .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body em strong,.spectrum-Body strong em{font-style:var(--mod-body-sans-serif-strong-emphasized-font-style,var(--spectrum-body-sans-serif-strong-emphasized-font-style));font-weight:var(--mod-body-sans-serif-strong-emphasized-font-weight,var(--spectrum-body-sans-serif-strong-emphasized-font-weight))}.spectrum-Body:lang(ja),.spectrum-Body:lang(ko),.spectrum-Body:lang(zh){font-family:var(--mod-body-cjk-font-family,var(--spectrum-body-cjk-font-family));font-style:var(--mod-body-cjk-font-style,var(--spectrum-body-cjk-font-style));font-weight:var(--mod-body-cjk-font-weight,var(--spectrum-body-cjk-font-weight));line-height:var(--mod-body-cjk-line-height,var(--spectrum-body-cjk-line-height));letter-spacing:var(--mod-body-cjk-letter-spacing,var(--spectrum-body-cjk-letter-spacing))}.spectrum-Body:lang(ja) .spectrum-Body-strong,.spectrum-Body:lang(ja) strong,.spectrum-Body:lang(ko) .spectrum-Body-strong,.spectrum-Body:lang(ko) strong,.spectrum-Body:lang(zh) .spectrum-Body-strong,.spectrum-Body:lang(zh) strong{font-style:var(--mod-body-cjk-strong-font-style,var(--spectrum-body-cjk-strong-font-style));font-weight:var(--mod-body-cjk-strong-font-weight,var(--spectrum-body-cjk-strong-font-weight))}.spectrum-Body:lang(ja) .spectrum-Body-emphasized,.spectrum-Body:lang(ja) em,.spectrum-Body:lang(ko) .spectrum-Body-emphasized,.spectrum-Body:lang(ko) em,.spectrum-Body:lang(zh) .spectrum-Body-emphasized,.spectrum-Body:lang(zh) em{font-style:var(--mod-body-cjk-emphasized-font-style,var(--spectrum-body-cjk-emphasized-font-style));font-weight:var(--mod-body-cjk-emphasized-font-weight,var(--spectrum-body-cjk-emphasized-font-weight))}.spectrum-Body:lang(ja) .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body:lang(ja) em strong,.spectrum-Body:lang(ja) strong em,.spectrum-Body:lang(ko) .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body:lang(ko) em strong,.spectrum-Body:lang(ko) strong em,.spectrum-Body:lang(zh) .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body:lang(zh) em strong,.spectrum-Body:lang(zh) strong em{font-style:var(--mod-body-cjk-strong-emphasized-font-style,var(--spectrum-body-cjk-strong-emphasized-font-style));font-weight:var(--mod-body-cjk-strong-emphasized-font-weight,var(--spectrum-body-cjk-strong-emphasized-font-weight))}.spectrum-Body--serif{font-family:var(--mod-body-serif-font-family,var(--spectrum-body-serif-font-family));font-weight:var(--mod-body-serif-font-weight,var(--spectrum-body-serif-font-weight));font-style:var(--mod-body-serif-font-style,var(--spectrum-body-serif-font-style))}.spectrum-Body--serif .spectrum-Body-strong,.spectrum-Body--serif strong{font-style:var(--mod-body-serif-strong-font-style,var(--spectrum-body-serif-strong-font-style));font-weight:var(--mod-body-serif-strong-font-weight,var(--spectrum-body-serif-strong-font-weight))}.spectrum-Body--serif .spectrum-Body-emphasized,.spectrum-Body--serif em{font-style:var(--mod-body-serif-emphasized-font-style,var(--spectrum-body-serif-emphasized-font-style));font-weight:var(--mod-body-serif-emphasized-font-weight,var(--spectrum-body-serif-emphasized-font-weight))}.spectrum-Body--serif .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body--serif em strong,.spectrum-Body--serif strong em{font-style:var(--mod-body-serif-strong-emphasized-font-style,var(--spectrum-body-serif-strong-emphasized-font-style));font-weight:var(--mod-body-serif-strong-emphasized-font-weight,var(--spectrum-body-serif-strong-emphasized-font-weight))}.spectrum-Detail--light .spectrum-Detail-strong.spectrum-Body-emphasized{font-style:var(--mod-detail-sans-serif-light-strong-emphasized-font-style,var(--spectrum-detail-sans-serif-light-strong-emphasized-font-style));font-weight:var(--mod-detail-sans-serif-light-strong-emphasized-font-weight,var(--spectrum-detail-sans-serif-light-strong-emphasized-font-weight))}.spectrum-Detail--serif.spectrum-Detail--light .spectrum-Detail-strong.spectrum-Body-emphasized{font-style:var(--mod-detail-serif-light-strong-emphasized-font-style,var(--spectrum-detail-serif-light-strong-emphasized-font-style));font-weight:var(--mod-detail-serif-light-strong-emphasized-font-weight,var(--spectrum-detail-serif-light-strong-emphasized-font-weight))}
`,ts=[Br,Lr,es],rs=$`
    .spectrum-Typography .spectrum-Heading{--spectrum-heading-margin-start:calc(var(--mod-heading-font-size,var(--spectrum-heading-font-size))*var(--spectrum-heading-margin-top-multiplier));--spectrum-heading-margin-end:calc(var(--mod-heading-font-size,var(--spectrum-heading-font-size))*var(--spectrum-heading-margin-bottom-multiplier))}@media (forced-colors:active){.spectrum-Heading{--highcontrast-heading-font-color:Text}}.spectrum-Heading,.spectrum-Heading--sizeM{--spectrum-heading-font-size:var(--spectrum-heading-size-m);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-m)}.spectrum-Heading--sizeXXS{--spectrum-heading-font-size:var(--spectrum-heading-size-xxs);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-xxs)}.spectrum-Heading--sizeXS{--spectrum-heading-font-size:var(--spectrum-heading-size-xs);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-xs)}.spectrum-Heading--sizeS{--spectrum-heading-font-size:var(--spectrum-heading-size-s);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-s)}.spectrum-Heading--sizeL{--spectrum-heading-font-size:var(--spectrum-heading-size-l);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-l)}.spectrum-Heading--sizeXL{--spectrum-heading-font-size:var(--spectrum-heading-size-xl);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-xl)}.spectrum-Heading--sizeXXL{--spectrum-heading-font-size:var(--spectrum-heading-size-xxl);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-xxl)}.spectrum-Heading--sizeXXXL{--spectrum-heading-font-size:var(--spectrum-heading-size-xxxl);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-xxxl)}.spectrum-Heading{--spectrum-heading-sans-serif-font-family:var(--spectrum-sans-font-family-stack);--spectrum-heading-serif-font-family:var(--spectrum-serif-font-family-stack);--spectrum-heading-cjk-font-family:var(--spectrum-cjk-font-family-stack);--spectrum-heading-cjk-letter-spacing:var(--spectrum-cjk-letter-spacing);--spectrum-heading-font-color:var(--spectrum-heading-color);font-family:var(--mod-heading-sans-serif-font-family,var(--spectrum-heading-sans-serif-font-family));font-style:var(--mod-heading-sans-serif-font-style,var(--spectrum-heading-sans-serif-font-style));font-weight:var(--mod-heading-sans-serif-font-weight,var(--spectrum-heading-sans-serif-font-weight));font-size:var(--mod-heading-font-size,var(--spectrum-heading-font-size));color:var(--highcontrast-heading-font-color,var(--mod-heading-font-color,var(--spectrum-heading-font-color)));line-height:var(--mod-heading-line-height,var(--spectrum-heading-line-height));margin-block-start:var(--mod-heading-margin-start,var(--spectrum-heading-margin-start,0));margin-block-end:var(--mod-heading-margin-end,var(--spectrum-heading-margin-end,0))}.spectrum-Heading .spectrum-Heading-strong,.spectrum-Heading strong{font-style:var(--mod-heading-sans-serif-strong-font-style,var(--spectrum-heading-sans-serif-strong-font-style));font-weight:var(--mod-heading-sans-serif-strong-font-weight,var(--spectrum-heading-sans-serif-strong-font-weight))}.spectrum-Heading .spectrum-Heading-emphasized,.spectrum-Heading em{font-style:var(--mod-heading-sans-serif-emphasized-font-style,var(--spectrum-heading-sans-serif-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-emphasized-font-weight,var(--spectrum-heading-sans-serif-emphasized-font-weight))}.spectrum-Heading .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading em strong,.spectrum-Heading strong em{font-style:var(--mod-heading-sans-serif-strong-emphasized-font-style,var(--spectrum-heading-sans-serif-strong-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-strong-emphasized-font-weight,var(--spectrum-heading-sans-serif-strong-emphasized-font-weight))}.spectrum-Heading:lang(ja),.spectrum-Heading:lang(ko),.spectrum-Heading:lang(zh){font-family:var(--mod-heading-cjk-font-family,var(--spectrum-heading-cjk-font-family));font-style:var(--mod-heading-cjk-font-style,var(--spectrum-heading-cjk-font-style));font-weight:var(--mod-heading-cjk-font-weight,var(--spectrum-heading-cjk-font-weight));font-size:var(--mod-heading-cjk-font-size,var(--spectrum-heading-cjk-font-size));line-height:var(--mod-heading-cjk-line-height,var(--spectrum-heading-cjk-line-height));letter-spacing:var(--mod-heading-cjk-letter-spacing,var(--spectrum-heading-cjk-letter-spacing))}.spectrum-Heading:lang(ja) .spectrum-Heading-emphasized,.spectrum-Heading:lang(ja) em,.spectrum-Heading:lang(ko) .spectrum-Heading-emphasized,.spectrum-Heading:lang(ko) em,.spectrum-Heading:lang(zh) .spectrum-Heading-emphasized,.spectrum-Heading:lang(zh) em{font-style:var(--mod-heading-cjk-emphasized-font-style,var(--spectrum-heading-cjk-emphasized-font-style));font-weight:var(--mod-heading-cjk-emphasized-font-weight,var(--spectrum-heading-cjk-emphasized-font-weight))}.spectrum-Heading:lang(ja) .spectrum-Heading-strong,.spectrum-Heading:lang(ja) strong,.spectrum-Heading:lang(ko) .spectrum-Heading-strong,.spectrum-Heading:lang(ko) strong,.spectrum-Heading:lang(zh) .spectrum-Heading-strong,.spectrum-Heading:lang(zh) strong{font-style:var(--mod-heading-cjk-strong-font-style,var(--spectrum-heading-cjk-strong-font-style));font-weight:var(--mod-heading-cjk-strong-font-weight,var(--spectrum-heading-cjk-strong-font-weight))}.spectrum-Heading:lang(ja) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading:lang(ja) em strong,.spectrum-Heading:lang(ja) strong em,.spectrum-Heading:lang(ko) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading:lang(ko) em strong,.spectrum-Heading:lang(ko) strong em,.spectrum-Heading:lang(zh) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading:lang(zh) em strong,.spectrum-Heading:lang(zh) strong em{font-style:var(--mod-heading-cjk-strong-emphasized-font-style,var(--spectrum-heading-cjk-strong-emphasized-font-style));font-weight:var(--mod-heading-cjk-strong-emphasized-font-weight,var(--spectrum-heading-cjk-strong-emphasized-font-weight))}.spectrum-Heading--heavy{font-style:var(--mod-heading-sans-serif-heavy-font-style,var(--spectrum-heading-sans-serif-heavy-font-style));font-weight:var(--mod-heading-sans-serif-heavy-font-weight,var(--spectrum-heading-sans-serif-heavy-font-weight))}.spectrum-Heading--heavy .spectrum-Heading-strong,.spectrum-Heading--heavy strong{font-style:var(--mod-heading-sans-serif-heavy-strong-font-style,var(--spectrum-heading-sans-serif-heavy-strong-font-style));font-weight:var(--mod-heading-sans-serif-heavy-strong-font-weight,var(--spectrum-heading-sans-serif-heavy-strong-font-weight))}.spectrum-Heading--heavy .spectrum-Heading-emphasized,.spectrum-Heading--heavy em{font-style:var(--mod-heading-sans-serif-heavy-emphasized-font-style,var(--spectrum-heading-sans-serif-heavy-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-heavy-emphasized-font-weight,var(--spectrum-heading-sans-serif-heavy-emphasized-font-weight))}.spectrum-Heading--heavy .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--heavy em strong,.spectrum-Heading--heavy strong em{font-style:var(--mod-heading-sans-serif-heavy-strong-emphasized-font-style,var(--spectrum-heading-sans-serif-heavy-strong-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-heavy-strong-emphasized-font-weight,var(--spectrum-heading-sans-serif-heavy-strong-emphasized-font-weight))}.spectrum-Heading--heavy:lang(ja),.spectrum-Heading--heavy:lang(ko),.spectrum-Heading--heavy:lang(zh){font-style:var(--mod-heading-cjk-heavy-font-style,var(--spectrum-heading-cjk-heavy-font-style));font-weight:var(--mod-heading-cjk-heavy-font-weight,var(--spectrum-heading-cjk-heavy-font-weight))}.spectrum-Heading--heavy:lang(ja) .spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(ja) em,.spectrum-Heading--heavy:lang(ko) .spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(ko) em,.spectrum-Heading--heavy:lang(zh) .spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(zh) em{font-style:var(--mod-heading-cjk-heavy-emphasized-font-style,var(--spectrum-heading-cjk-heavy-emphasized-font-style));font-weight:var(--mod-heading-cjk-heavy-emphasized-font-weight,var(--spectrum-heading-cjk-heavy-emphasized-font-weight))}.spectrum-Heading--heavy:lang(ja) .spectrum-Heading-strong,.spectrum-Heading--heavy:lang(ja) strong,.spectrum-Heading--heavy:lang(ko) .spectrum-Heading-strong,.spectrum-Heading--heavy:lang(ko) strong,.spectrum-Heading--heavy:lang(zh) .spectrum-Heading-strong,.spectrum-Heading--heavy:lang(zh) strong{font-style:var(--mod-heading-cjk-heavy-strong-font-style,var(--spectrum-heading-cjk-heavy-strong-font-style));font-weight:var(--mod-heading-cjk-heavy-strong-font-weight,var(--spectrum-heading-cjk-heavy-strong-font-weight))}.spectrum-Heading--heavy:lang(ja) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(ja) em strong,.spectrum-Heading--heavy:lang(ja) strong em,.spectrum-Heading--heavy:lang(ko) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(ko) em strong,.spectrum-Heading--heavy:lang(ko) strong em,.spectrum-Heading--heavy:lang(zh) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(zh) em strong,.spectrum-Heading--heavy:lang(zh) strong em{font-style:var(--mod-heading-cjk-heavy-strong-emphasized-font-style,var(--spectrum-heading-cjk-heavy-strong-emphasized-font-style));font-weight:var(--mod-heading-cjk-heavy-strong-emphasized-font-weight,var(--spectrum-heading-cjk-heavy-strong-emphasized-font-weight))}.spectrum-Heading--light{font-style:var(--mod-heading-sans-serif-light-font-style,var(--spectrum-heading-sans-serif-light-font-style));font-weight:var(--mod-heading-sans-serif-light-font-weight,var(--spectrum-heading-sans-serif-light-font-weight))}.spectrum-Heading--light .spectrum-Heading-emphasized,.spectrum-Heading--light em{font-style:var(--mod-heading-sans-serif-light-emphasized-font-style,var(--spectrum-heading-sans-serif-light-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-light-emphasized-font-weight,var(--spectrum-heading-sans-serif-light-emphasized-font-weight))}.spectrum-Heading--light .spectrum-Heading-strong,.spectrum-Heading--light strong{font-style:var(--mod-heading-sans-serif-light-strong-font-style,var(--spectrum-heading-sans-serif-light-strong-font-style));font-weight:var(--mod-heading-sans-serif-light-strong-font-weight,var(--spectrum-heading-sans-serif-light-strong-font-weight))}.spectrum-Heading--light .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--light em strong,.spectrum-Heading--light strong em{font-style:var(--mod-heading-sans-serif-light-strong-emphasized-font-style,var(--spectrum-heading-sans-serif-light-strong-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-light-strong-emphasized-font-weight,var(--spectrum-heading-sans-serif-light-strong-emphasized-font-weight))}.spectrum-Heading--light:lang(ja),.spectrum-Heading--light:lang(ko),.spectrum-Heading--light:lang(zh){font-style:var(--mod-heading-cjk-light-font-style,var(--spectrum-heading-cjk-light-font-style));font-weight:var(--mod-heading-cjk-light-font-weight,var(--spectrum-heading-cjk-light-font-weight))}.spectrum-Heading--light:lang(ja) .spectrum-Heading-strong,.spectrum-Heading--light:lang(ja) strong,.spectrum-Heading--light:lang(ko) .spectrum-Heading-strong,.spectrum-Heading--light:lang(ko) strong,.spectrum-Heading--light:lang(zh) .spectrum-Heading-strong,.spectrum-Heading--light:lang(zh) strong{font-style:var(--mod-heading-cjk-light-strong-font-style,var(--spectrum-heading-cjk-light-strong-font-style));font-weight:var(--mod-heading-cjk-light-strong-font-weight,var(--spectrum-heading-cjk-light-strong-font-weight))}.spectrum-Heading--light:lang(ja) .spectrum-Heading-emphasized,.spectrum-Heading--light:lang(ja) em,.spectrum-Heading--light:lang(ko) .spectrum-Heading-emphasized,.spectrum-Heading--light:lang(ko) em,.spectrum-Heading--light:lang(zh) .spectrum-Heading-emphasized,.spectrum-Heading--light:lang(zh) em{font-style:var(--mod-heading-cjk-light-emphasized-font-style,var(--spectrum-heading-cjk-light-emphasized-font-style));font-weight:var(--mod-heading-cjk-light-emphasized-font-weight,var(--spectrum-heading-cjk-light-emphasized-font-weight))}.spectrum-Heading--light:lang(ja) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--light:lang(ja) em strong,.spectrum-Heading--light:lang(ja) strong em,.spectrum-Heading--light:lang(ko) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--light:lang(ko) em strong,.spectrum-Heading--light:lang(ko) strong em,.spectrum-Heading--light:lang(zh) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--light:lang(zh) em strong,.spectrum-Heading--light:lang(zh) strong em{font-style:var(--mod-heading-cjk-light-strong-emphasized-font-style,var(--spectrum-heading-cjk-light-strong-emphasized-font-style));font-weight:var(--mod-heading-cjk-light-strong-emphasized-font-weight,var(--spectrum-heading-cjk-light-strong-emphasized-font-weight))}.spectrum-Heading--serif{font-family:var(--mod-heading-serif-font-family,var(--spectrum-heading-serif-font-family));font-style:var(--mod-heading-serif-font-style,var(--spectrum-heading-serif-font-style));font-weight:var(--mod-heading-serif-font-weight,var(--spectrum-heading-serif-font-weight))}.spectrum-Heading--serif .spectrum-Heading-emphasized,.spectrum-Heading--serif em{font-style:var(--mod-heading-serif-emphasized-font-style,var(--spectrum-heading-serif-emphasized-font-style));font-weight:var(--mod-heading-serif-emphasized-font-weight,var(--spectrum-heading-serif-emphasized-font-weight))}.spectrum-Heading--serif .spectrum-Heading-strong,.spectrum-Heading--serif strong{font-style:var(--mod-heading-serif-strong-font-style,var(--spectrum-heading-serif-strong-font-style));font-weight:var(--mod-heading-serif-strong-font-weight,var(--spectrum-heading-serif-strong-font-weight))}.spectrum-Heading--serif .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--serif em strong,.spectrum-Heading--serif strong em{font-style:var(--mod-heading-serif-strong-emphasized-font-style,var(--spectrum-heading-serif-strong-emphasized-font-style));font-weight:var(--mod-heading-serif-strong-emphasized-font-weight,var(--spectrum-heading-serif-strong-emphasized-font-weight))}.spectrum-Heading--serif.spectrum-Heading--heavy{font-style:var(--mod-heading-serif-heavy-font-style,var(--spectrum-heading-serif-heavy-font-style));font-weight:var(--mod-heading-serif-heavy-font-weight,var(--spectrum-heading-serif-heavy-font-weight))}.spectrum-Heading--serif.spectrum-Heading--heavy .spectrum-Heading-strong,.spectrum-Heading--serif.spectrum-Heading--heavy strong{font-style:var(--mod-heading-serif-heavy-strong-font-style,var(--spectrum-heading-serif-heavy-strong-font-style));font-weight:var(--mod-heading-serif-heavy-strong-font-weight,var(--spectrum-heading-serif-heavy-strong-font-weight))}.spectrum-Heading--serif.spectrum-Heading--heavy .spectrum-Heading-emphasized,.spectrum-Heading--serif.spectrum-Heading--heavy em{font-style:var(--mod-heading-serif-heavy-emphasized-font-style,var(--spectrum-heading-serif-heavy-emphasized-font-style));font-weight:var(--mod-heading-serif-heavy-emphasized-font-weight,var(--spectrum-heading-serif-heavy-emphasized-font-weight))}.spectrum-Heading--serif.spectrum-Heading--heavy .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--serif.spectrum-Heading--heavy em strong,.spectrum-Heading--serif.spectrum-Heading--heavy strong em{font-style:var(--mod-heading-serif-heavy-strong-emphasized-font-style,var(--spectrum-heading-serif-heavy-strong-emphasized-font-style));font-weight:var(--mod-heading-serif-heavy-strong-emphasized-font-weight,var(--spectrum-heading-serif-heavy-strong-emphasized-font-weight))}.spectrum-Heading--serif.spectrum-Heading--light{font-style:var(--mod-heading-serif-light-font-style,var(--spectrum-heading-serif-light-font-style));font-weight:var(--mod-heading-serif-light-font-weight,var(--spectrum-heading-serif-light-font-weight))}.spectrum-Heading--serif.spectrum-Heading--light .spectrum-Heading-emphasized,.spectrum-Heading--serif.spectrum-Heading--light em{font-style:var(--mod-heading-serif-light-emphasized-font-style,var(--spectrum-heading-serif-light-emphasized-font-style));font-weight:var(--mod-heading-serif-light-emphasized-font-weight,var(--spectrum-heading-serif-light-emphasized-font-weight))}.spectrum-Heading--serif.spectrum-Heading--light .spectrum-Heading-strong,.spectrum-Heading--serif.spectrum-Heading--light strong{font-style:var(--mod-heading-serif-light-strong-font-style,var(--spectrum-heading-serif-light-strong-font-style));font-weight:var(--mod-heading-serif-light-strong-font-weight,var(--spectrum-heading-serif-light-strong-font-weight))}.spectrum-Heading--serif.spectrum-Heading--light .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--serif.spectrum-Heading--light em strong,.spectrum-Heading--serif.spectrum-Heading--light strong em{font-style:var(--mod-heading-serif-light-strong-emphasized-font-style,var(--spectrum-heading-serif-light-strong-emphasized-font-style));font-weight:var(--mod-heading-serif-light-strong-emphasized-font-weight,var(--spectrum-heading-serif-light-strong-emphasized-font-weight))}
`,as=[Br,Lr,rs],is=$`
:host{--spectrum-popover-dialog-min-width:0;--spectrum-popover-dialog-padding:0;--mod-popover-content-area-spacing-vertical:0;overflow:hidden;padding:var(--mod-popover-content-area-spacing-vertical);position:relative;width:calc(var(--swc-scale-factor)*240px + var(--swc-scale-factor)*16px + var(--swc-scale-factor)*2px)}.header{--spectrum-alias-heading-text-color:var(--spectrum-gray-900);:host([size=s]) &{--spectrum-card-quiet-body-header-margin-top:var(
--spectrum-card-s-quiet-body-header-margin-top,calc(var(--swc-scale-factor)*14px)
);--spectrum-card-body-header-height:calc(var(--swc-scale-factor)*12px)}}.header h3{margin-block-end:0;margin-block-start:0}.card-wrapper{box-sizing:border-box;display:inline-flex;flex-direction:column;gap:calc(var(--swc-scale-factor)*16px);max-width:calc(var(--swc-scale-factor)*240px + var(--swc-scale-factor)*40px);min-width:var(--spectrum-card-min-width,calc(var(--swc-scale-factor)*200px));padding-block:calc(var(--swc-scale-factor)*24px);padding-inline:calc(var(--swc-scale-factor)*24px)}.asset{background-color:var(--spectrum-card-m-coverphoto-background-color,var(--spectrum-gray-200));border-bottom:var(--spectrum-card-border-size,var(--spectrum-alias-border-size-thin)) solid var(--spectrum-card-border-color,var(--spectrum-alias-border-color-dark));margin-block-end:calc(var(--swc-scale-factor)*24px - var(--swc-scale-factor)*16px);margin-block-start:calc((var(--swc-scale-factor)*20px + var(--spectrum-popover-border-radius, var(--spectrum-alias-border-radius-regular)))*-1);margin-inline:calc(var(--swc-scale-factor)*24px*-1);max-height:calc(var(--swc-scale-factor)*192px);min-height:calc(var(--swc-scale-factor)*136px + var(--swc-scale-factor)*8px);width:calc(100% + var(--swc-scale-factor)*24px*2)}img,video{display:block;height:100%;object-fit:cover;width:100%}.content{display:flex;flex-direction:column;gap:calc(var(--swc-scale-factor)*16px)}:host(:not([has-asset])) .header{margin-right:calc(var(--swc-scale-factor)*16px)}.header,.keys{align-items:center;column-gap:calc(var(--swc-scale-factor)*16px);display:flex;flex-flow:row wrap;row-gap:calc(var(--swc-scale-factor)*14px)}.keys{column-gap:calc(var(--swc-scale-factor)*4px);cursor:default}.keys>*{min-height:calc(var(--swc-scale-factor)*18px)}.keyboard-shortcut{align-items:center;background-color:var(--spectrum-gray-200);border:var(--spectrum-alias-border-size-thin) solid var(--spectrum-gray-200);border-radius:var(--spectrum-alias-border-radius-regular);color:var(--spectrum-gray-800);display:inline-flex;flex-flow:row nowrap;justify-content:center;min-width:var(--spectrum-badge-min-width,calc(var(--swc-scale-factor)*18px));padding-block:calc(var(--swc-scale-factor)*4px);padding-inline:calc(var(--swc-scale-factor)*8px)}.keyboard-shortcut[type=shortcut]{text-transform:uppercase}.footer{align-content:baseline;align-self:flex-end;display:flex;justify-content:flex-end}
`;z("overlay-trigger",q);var ns=Object.defineProperty,os=Object.getOwnPropertyDescriptor,H=(r,e,t,a)=>{for(var i=a>1?void 0:a?os(e,t):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=(a?s(e,t,i):s(i))||i);return a&&i&&ns(e,t,i),i};class J extends Ie{constructor(){super(...arguments),this.placement="right",this.offset=0,this.open=!1,this.delayed=!1,this.disabled=!1}get canPlay(){return this.open}onSlotChange(e){const t=e.target;this.parseTriggerButton(t)}parseTriggerButton(e){const t=e.assignedElements({flatten:!0});t.length!==0&&(this.triggerElement=t[0])}handleBeforeToggle(e){e.composedPath()[0]===e.target&&(this.open=e.newState=="open")}render(){return u`
            <slot name="trigger" id="trigger" @slotchange=${this.onSlotChange}> </slot>
            <sp-overlay
                .triggerElement=${this.triggerElement}
                .triggerInteraction=${"hover"}
                type="hint"
                placement=${this.placement}
                .offset=${this.offset}
                @beforetoggle=${this.handleBeforeToggle}
                ?open=${this.open}
                ?delayed=${this.delayed}
                ?disabled=${this.disabled}>
                ${this.item&&!this.disabled?u` <ue-rich-tooltip-popover
                          id="richtooltip"
                          .content=${{title:this.item.heading,description:this.item.content,imageAlt:this.item.imageAlt}}
                          .source=${this.item.src}
                          media-type=${M(this.item.mediaType)}
                          video-type=${M(this.item.videoType)}
                          shortcut-key=${M(this.item.shortcutKey)}
                          .modifierKeys=${this.item.modifierKeys}
                          ?can-play="${this.canPlay}"
                          .footerContent=${this.item.footerContent}>
                      </ue-rich-tooltip-popover>`:L}
            </sp-overlay>
        `}}H([f({type:String})],J.prototype,"placement",2),H([f({type:Number})],J.prototype,"offset",2),H([f({type:Object})],J.prototype,"item",2),H([f({type:Boolean,reflect:!0})],J.prototype,"open",2),H([f({type:Boolean,reflect:!0})],J.prototype,"delayed",2),H([f({type:Boolean,reflect:!0})],J.prototype,"disabled",2),H([X()],J.prototype,"triggerElement",2);let N=class extends la{constructor(){super(...arguments),this.modifierKeys=[],this.hasAsset=!1,this.canPlay=!1}static get styles(){return[...super.styles,...as,...ts,is]}manageVideoAsset(r){this.canPlay?(this.videoPlayPromise=r.play(),this.videoPlayPromise.catch(e=>{console.error(e)})):this.pauseVideo()}pauseVideo(){this.videoPlayPromise!==void 0&&this.videoPlayPromise.then(()=>{this.videoAsset?.pause()})}renderMedia(){const r=this.mediaType===Et.VIDEO,e=this.mediaType===Et.IMAGE;return!r&&!e?u``:r?u`
                <sp-asset class="asset">
                    <video loop muted preload="auto">
                        <source src="${M(this.source)}" type="${M(this.videoType)}" />
                    </video>
                </sp-asset>
            `:u`
            <sp-asset class="asset">
                <img loading="lazy" src="${M(this.source)}" alt="${M(this.content?.imageAlt)}" />
            </sp-asset>
        `}renderModifier(r,e="modifier"){return u` <span type="${e}" class="keyboard-shortcut"> ${r} </span> `}renderJoiner(){return u`<span class="plus">&plus;</span>`}renderHeader(){const r=this.modifierKeys&&this.modifierKeys.length>0,e=!!this.shortcutKey,t=!!this.content?.title;return u`
            <div class="header">
                ${t?u` <h3 class="spectrum-Heading spectrum-Heading--sizeXS">${this.content.title}</h3>`:L}
                ${r||e?u`<kbd class="keys spectrum-Body spectrum-Body--sizeS">
                          ${r?ga(this.modifierKeys?.map(a=>this.renderModifier(a)),this.renderJoiner()):L}
                          ${e&&r?this.renderJoiner():L}
                          ${e?this.renderModifier(this.shortcutKey,"shortcut"):L}
                      </kbd>`:L}
            </div>
        `}renderContent(){return u` <p class="spectrum-Body spectrum-Body--sizeS">${ca(this.content.description)}</p> `}renderFooter(){return u` ${this.footerContent?u`<div class="footer">${this.footerContent}</div>`:L} `}render(){return u`
            <div class="card-wrapper">
                ${this.renderMedia()}
                <div class="content">${this.renderHeader()} ${this.renderContent()}</div>
                ${this.renderFooter()}
            </div>
        `}updated(r){super.updated(r),this.videoAsset&&(r.has("source")&&this.videoAsset.load(),r.has("canPlay")&&this.manageVideoAsset(this.videoAsset))}};H([f({type:Object,attribute:!1})],N.prototype,"content",2),H([f({attribute:"shortcut-key"})],N.prototype,"shortcutKey",2),H([f({type:Array})],N.prototype,"modifierKeys",2),H([f({attribute:"src"})],N.prototype,"source",2),H([f({attribute:"media-type"})],N.prototype,"mediaType",2),H([f({attribute:"video-type"})],N.prototype,"videoType",2),H([f({attribute:!1})],N.prototype,"footerContent",2),H([f({type:Boolean,attribute:"has-asset",reflect:!0})],N.prototype,"hasAsset",2),H([f({type:Boolean,attribute:"can-play"})],N.prototype,"canPlay",2),H([O("video")],N.prototype,"videoAsset",2),N=H([Q("ue-rich-tooltip-popover")],N);customElements.define("ue-rich-tooltip",J);var ss=Object.defineProperty,ls=Object.getOwnPropertyDescriptor,Ir=(r,e,t,a)=>{for(var i=a>1?void 0:a?ls(e,t):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=(a?s(e,t,i):s(i))||i);return a&&i&&ss(e,t,i),i};const cs=ze();let lt=class extends He{constructor(){super(...arguments),this.tempProperty=null,this.openSection=null,this.reactionDisposers=[],this.handleCropPresetSelected=r=>{const{categoryIndex:e,presetIndex:t}=r.props,a=re[e].presets[t],i=a.sizex/a.sizey;o.selectedCropPresetCategoryIndex=e,o.selectedCropPresetIndex=t,o.cropPreserveAspectRatio=!0;const n=o.canvas.documentRect.w,s=o.canvas.documentRect.h;let c,l;const d=Math.round(s*i),p=Math.round(n/i);d<=n?(c=d,l=s):(c=n,l=p);const h=Math.round((n-c)/2),b=Math.round((s-l)/2);o.canvas.outpaintRect.w=c,o.canvas.outpaintRect.h=l,o.canvas.outpaintRect.x=h,o.canvas.outpaintRect.y=b,window.dispatchEvent(new U("center")),y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"click","event.subtype":"resize-preset","event.value":`${re[e].id}-${re[e].presets[t].id}`,"ui.view_type":"toolbar-properties"})}}connectedCallback(){super.connectedCallback(),this.reactionDisposers.push(ve(()=>o.cropMode,()=>{this.openSection=o.cropMode?"crop":null})),this.reactionDisposers.push(ve(()=>o.editPanelDisabled,()=>{o.editPanelDisabled&&(this.openSection=null)}))}disconnectedCallback(){this.reactionDisposers.forEach(r=>r()),super.disconnectedCallback()}get canResetAdjust(){return o.canvas.brightness!==S.brightness.zero||o.canvas.contrast!==S.contrast.zero||o.canvas.hue!==S.hue.zero||o.canvas.saturation!==S.saturation.zero||o.canvas.isAutoTone}resetAdjust(){const r={brightness:o.canvas.brightness,contrast:o.canvas.contrast,hue:o.canvas.hue,saturation:o.canvas.saturation,isAutoTone:o.canvas.isAutoTone};o.canvas.brightness=S.brightness.zero,o.canvas.contrast=S.contrast.zero,o.canvas.hue=S.hue.zero,o.canvas.saturation=S.saturation.zero,o.canvas.isAutoTone=!1,window.dispatchEvent(new P({type:"update-canvas"})),window.dispatchEvent(new P({type:"persist-image-data"})),o.addCommand({name:"Reset adjustments",undo:e=>{o.canvas.brightness=e.brightness,o.canvas.contrast=e.contrast,o.canvas.hue=e.hue,o.canvas.saturation=e.saturation,o.canvas.isAutoTone=e.isAutoTone,window.dispatchEvent(new P({type:"update-canvas"})),window.dispatchEvent(new P({type:"persist-image-data"}))},undoArg:r,redo:()=>{o.canvas.brightness=S.brightness.zero,o.canvas.contrast=S.contrast.zero,o.canvas.hue=S.hue.zero,o.canvas.saturation=S.saturation.zero,o.canvas.isAutoTone=!1,window.dispatchEvent(new P({type:"update-canvas"})),window.dispatchEvent(new P({type:"persist-image-data"}))}}),y("trackEvent",{"event.workflow":"ADJUSTMENT","event.subcategory":"Operation","event.type":"click","event.subtype":"reset","ui.view_type":"toolbar-properties"})}get canResetCrop(){return o.canvas.outpaintRect.w!==o.canvas.documentRect.w||o.canvas.outpaintRect.h!==o.canvas.documentRect.h||o.canvas.outpaintRect.x!==0||o.canvas.outpaintRect.y!==0}resetCrop(){this.resetCropPresets(),o.canvas.outpaintRect.w=o.canvas.documentRect.w,o.canvas.outpaintRect.h=o.canvas.documentRect.h,o.canvas.outpaintRect.x=0,o.canvas.outpaintRect.y=0,window.dispatchEvent(new U("center")),y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"click","event.subtype":"reset","ui.view_type":"toolbar-properties"})}resetCropPresets(){o.selectedCropPresetCategoryIndex=null,o.selectedCropPresetIndex=null}render(){return u`
			<sp-action-button
				id="edit-toggle"
				size="xl"
				quiet
				label=${m.t("editPanel.show")}
				aria-expanded=${o.editPanelOpen}
				aria-controls="edit-panel"
				?hidden=${o.editPanelOpen}
				@click=${async()=>{o.editPanelOpen=!0,await this.updateComplete,this.shadowRoot?.querySelector("#close-edit")?.focus(),y("trackEvent",{"event.workflow":"OPERATIONS","event.subcategory":"Toolbar","event.type":"click","event.subtype":"edit","ui.view_type":"toolbar"})}}
			>
				<sp-icon-edit slot="icon"></sp-icon-edit>
				<sp-tooltip self-managed placement="bottom"
					>${m.t("editPanel.show")}</sp-tooltip
				>
			</sp-action-button>
			<div id="edit-panel" ?hidden=${!o.editPanelOpen}>
				<div id="header">
					<h2>${m.t("editPanel.title")}</h2>
					<sp-action-button
						id="close-edit"
						quiet
						label=${m.t("editPanel.hide")}
						@click=${async()=>{o.editPanelOpen=!1,o.cropMode&&(o.cropMode=!1,this.resetCropPresets()),await this.updateComplete,this.shadowRoot?.querySelector("#edit-toggle")?.focus(),y("trackEvent",{"event.workflow":"OPERATIONS","event.subcategory":"Toolbar","event.type":"click","event.subtype":"close","ui.view_type":"toolbar"})}}
					>
						<sp-icon-close slot="icon"></sp-icon-close>
						<sp-tooltip self-managed placement="bottom"
							>${m.t("editPanel.hide")}</sp-tooltip
						>
					</sp-action-button>
				</div>
				<div id="scrollable-content">
					<div id="content">
						<section
							class="collapsible-section"
							?open=${this.openSection==="adjust"}
						>
							<ue-rich-tooltip
								.item=${{heading:m.t("editPanel.richTooltips.adjust.heading"),content:m.t("editPanel.richTooltips.adjust.content"),src:"/assets/make_adjustments.webm",mediaType:"video",videoType:"video/webm"}}
							>
								<sp-action-button
									slot="trigger"
									class="summary-button"
									quiet
									?selected=${this.openSection==="adjust"}
									?disabled=${o.editPanelDisabled}
									aria-controls="adjust"
									aria-expanded=${this.openSection==="adjust"}
									@click=${()=>{o.cropMode&&(o.cropMode=!1),this.openSection=this.openSection==="adjust"?null:"adjust",y("trackEvent",{"event.workflow":"ADJUSTMENT","event.subcategory":"Operation","event.type":"click","event.subtype":"adjust","ui.view_type":"toolbar"})}}
								>
									<sp-icon-contrast slot="icon"></sp-icon-contrast>
									${m.t("editPanel.adjust.title")}
								</sp-action-button>
							</ue-rich-tooltip>
							<div
								id="adjust"
								class="collapsible-content"
								?hidden=${this.openSection!=="adjust"}
							>
								<div class="flex-between">
									<label for="auto-tone"
										>${m.t("editPanel.adjust.autoLightColor")}</label
									>
									<sp-switch
										id="auto-tone"
										.checked=${o.canvas.isAutoTone}
										@change=${r=>{o.canvas.isAutoTone=r.target.checked,o.canvas.isAutoTone?(o.addCommand({name:"Enable auto light & color",undo:()=>{o.canvas.isAutoTone=!1},redo:()=>{o.canvas.isAutoTone=!0}}),y("trackEvent",{"event.workflow":"ADJUSTMENT","event.subcategory":"Operation","event.type":"click","event.subtype":"auto-tone","event.value":"disabled","ui.view_type":"toolbar-properties"})):(o.addCommand({name:"Disable auto light & color",undo:()=>{o.canvas.isAutoTone=!0,window.dispatchEvent(new P({type:"persist-image-data"}))},redo:()=>{o.canvas.isAutoTone=!1,window.dispatchEvent(new P({type:"persist-image-data"}))}}),y("trackEvent",{"event.workflow":"ADJUSTMENT","event.subcategory":"Operation","event.type":"click","event.subtype":"auto-tone","event.value":"enabled","ui.view_type":"toolbar-properties"})),window.dispatchEvent(new P({type:"persist-image-data"}))}}
									></sp-switch>
								</div>
								<sp-slider
									size="l"
									label=${m.t("editPanel.adjust.brightness")}
									editable
									hide-stepper
									min=${S.brightness.min}
									max=${S.brightness.max}
									default-value=${S.brightness.zero}
									.value=${String(o.canvas.brightness)}
									step="1"
									@input=${r=>{this.tempProperty=this.tempProperty??o.canvas.brightness;const e=r.target;o.canvas.brightness=parseFloat(e.value)}}
									@change=${r=>{const e=o.canvas.brightness,t=r.target;o.canvas.brightness=parseFloat(t.value),window.dispatchEvent(new P({type:"persist-image-data"})),o.addCommand({name:"Edit brightness",undo:i=>{o.canvas.brightness=i,window.dispatchEvent(new P({type:"persist-image-data"}))},undoArg:this.tempProperty??e,redo:i=>{o.canvas.brightness=i,window.dispatchEvent(new P({type:"persist-image-data"}))},redoArg:o.canvas.brightness}),this.tempProperty=null;const a=r.composedPath()[0]?.tagName==="SP-NUMBER-FIELD";y("trackEvent",{"event.workflow":"ADJUSTMENT","event.subcategory":"Brightness/Contrast","event.type":a?"update":"drag","event.subtype":"brightness","event.value":"updated-value","ui.view_type":"toolbar-properties"})}}
								></sp-slider>
								<sp-slider
									size="l"
									label=${m.t("editPanel.adjust.contrast")}
									editable
									hide-stepper
									min=${S.contrast.min}
									max=${S.contrast.max}
									default-value=${S.contrast.zero}
									.value=${String(o.canvas.contrast)}
									.normalization=${{toNormalized:r=>r===0?.5:r<0?.5-r/S.contrast.min*.5:.5+r/S.contrast.max*.5,fromNormalized:r=>r===.5?0:r<.5?(1-r/.5)*S.contrast.min:(r-.5)/.5*S.contrast.max}}
									step="1"
									@input=${r=>{this.tempProperty=this.tempProperty??o.canvas.contrast;const e=r.target;o.canvas.contrast=parseFloat(e.value)}}
									@change=${r=>{const e=o.canvas.contrast,t=r.target;o.canvas.contrast=parseFloat(t.value),window.dispatchEvent(new P({type:"persist-image-data"})),o.addCommand({name:"Edit contrast",undo:i=>{o.canvas.contrast=i,window.dispatchEvent(new P({type:"persist-image-data"}))},undoArg:this.tempProperty??e,redo:i=>{o.canvas.contrast=i,window.dispatchEvent(new P({type:"persist-image-data"}))},redoArg:o.canvas.contrast}),this.tempProperty=null;const a=r.composedPath()[0]?.tagName==="SP-NUMBER-FIELD";y("trackEvent",{"event.workflow":"ADJUSTMENT","event.subcategory":"Brightness/Contrast","event.type":a?"update":"drag","event.subtype":"contrast","event.value":"updated-value","ui.view_type":"toolbar-properties"})}}
								></sp-slider>
								<sp-slider
									id="hue-slider"
									size="l"
									label=${m.t("editPanel.adjust.hue")}
									editable
									hide-stepper
									min=${S.hue.min}
									max=${S.hue.max}
									default-value=${S.hue.zero}
									.value=${String(o.canvas.hue)}
									step="1"
									@input=${r=>{this.tempProperty=this.tempProperty??o.canvas.hue;const e=r.target;o.canvas.hue=parseFloat(e.value)}}
									@change=${r=>{const e=o.canvas.hue,t=r.target;o.canvas.hue=parseFloat(t.value),window.dispatchEvent(new P({type:"persist-image-data"})),o.addCommand({name:"Edit hue",undo:i=>{o.canvas.hue=i,window.dispatchEvent(new P({type:"persist-image-data"}))},undoArg:this.tempProperty??e,redo:i=>{o.canvas.hue=i,window.dispatchEvent(new P({type:"persist-image-data"}))},redoArg:o.canvas.hue}),this.tempProperty=null;const a=r.composedPath()[0]?.tagName==="SP-NUMBER-FIELD";y("trackEvent",{"event.workflow":"ADJUSTMENT","event.subcategory":"Hue/Saturation","event.type":a?"update":"drag","event.subtype":"hue","event.value":"updated-value","ui.view_type":"toolbar-properties"})}}
								></sp-slider>
								<sp-slider
									id="saturation-slider"
									size="l"
									label=${m.t("editPanel.adjust.saturation")}
									editable
									hide-stepper
									min=${S.saturation.min}
									max=${S.saturation.max}
									default-value=${S.saturation.zero}
									.value=${String(o.canvas.saturation)}
									step="1"
									@input=${r=>{this.tempProperty=this.tempProperty??o.canvas.saturation;const e=r.target;o.canvas.saturation=parseFloat(e.value)}}
									@change=${r=>{const e=o.canvas.saturation,t=r.target;o.canvas.saturation=parseFloat(t.value),window.dispatchEvent(new P({type:"persist-image-data"})),o.addCommand({name:"Edit saturation",undo:i=>{o.canvas.saturation=i,window.dispatchEvent(new P({type:"persist-image-data"}))},undoArg:this.tempProperty??e,redo:i=>{o.canvas.saturation=i,window.dispatchEvent(new P({type:"persist-image-data"}))},redoArg:o.canvas.saturation}),this.tempProperty=null;const a=r.composedPath()[0]?.tagName==="SP-NUMBER-FIELD";y("trackEvent",{"event.workflow":"ADJUSTMENT","event.subcategory":"Hue/Saturation","event.type":a?"update":"drag","event.subtype":"saturation","event.value":"updated-value","ui.view_type":"toolbar-properties"})}}
								></sp-slider>
								<sp-action-button
									?disabled=${!this.canResetAdjust}
									@click=${this.resetAdjust}
									><sp-icon-revert slot="icon"></sp-icon-revert>${m.t("editPanel.adjust.reset")}</sp-action-button
								>
							</div>
						</section>
						<section
							class="collapsible-section"
							?open=${this.openSection==="crop"}
						>
							<ue-rich-tooltip
								.item=${{heading:m.t("editPanel.richTooltips.crop.heading"),content:m.t("editPanel.richTooltips.crop.content"),src:"/assets/crop.webm",mediaType:"video",videoType:"video/webm"}}
							>
								<sp-action-button
									slot="trigger"
									class="summary-button"
									quiet
									?selected=${this.openSection==="crop"}
									?disabled=${o.editPanelDisabled}
									aria-controls="crop"
									aria-expanded=${this.openSection==="crop"}
									@click=${()=>{this.openSection==="crop"?(o.cropMode=!1,this.openSection=null):(o.cropMode=!0,this.openSection="crop"),y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"click","event.subtype":"crop","ui.view_type":"toolbar"})}}
								>
									<sp-icon-crop slot="icon"></sp-icon-crop>
									${m.t("editPanel.crop.title")}
								</sp-action-button>
							</ue-rich-tooltip>
							<div
								id="crop"
								class="collapsible-content"
								?hidden=${this.openSection!=="crop"}
							>
								<div id="crop-controls">
									<sp-field-label for="crop-width" side-aligned="start" size="l"
										>${m.t("editPanel.crop.width")}</sp-field-label
									>
									<sp-number-field
										id="crop-width"
										class="crop-field"
										size="l"
										hide-stepper
										min="1"
										.formatOptions=${{useGrouping:!1}}
										.value=${o.canvas.outpaintRect.w}
										@change=${r=>{const e=o.canvas.outpaintRect.w/o.canvas.outpaintRect.h,t=r.target,a=o.canvas.outpaintRect.w,i=Number(t.value)||1,n=Math.round((i-a)/2);if(o.canvas.outpaintRect.w=Number(t.value)||1,o.canvas.outpaintRect.x-=n,y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"success","event.subtype":"width","event.value":"updated-value","ui.view_type":"toolbar-properties"}),o.cropPreserveAspectRatio){const s=Math.round(i/e),c=o.canvas.outpaintRect.h,l=Math.round((s-c)/2);o.canvas.outpaintRect.h=s,o.canvas.outpaintRect.y-=l,y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"success","event.subtype":"height","event.value":"updated-value","ui.view_type":"toolbar-properties"})}}}
									></sp-number-field>
									<sp-field-label
										for="crop-height"
										side-aligned="start"
										size="l"
										>${m.t("editPanel.crop.height")}</sp-field-label
									>
									<sp-number-field
										id="crop-height"
										class="crop-field"
										size="l"
										hide-stepper
										min="1"
										.formatOptions=${{useGrouping:!1}}
										.value=${o.canvas.outpaintRect.h}
										@change=${r=>{const e=o.canvas.outpaintRect.w/o.canvas.outpaintRect.h,t=r.target,a=o.canvas.outpaintRect.h,i=Number(t.value)||1,n=Math.round((i-a)/2);if(o.canvas.outpaintRect.h=Number(t.value)||1,o.canvas.outpaintRect.y-=n,y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"success","event.subtype":"height","event.value":"updated-value","ui.view_type":"toolbar-properties"}),o.cropPreserveAspectRatio){const s=Math.round(i*e),c=o.canvas.outpaintRect.w,l=Math.round((s-c)/2);o.canvas.outpaintRect.w=s,o.canvas.outpaintRect.x-=l,y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"success","event.subtype":"width","event.value":"updated-value","ui.view_type":"toolbar-properties"})}}}
									></sp-number-field>
									<div id="crop-lock">
										<sp-icon class="lock-icon-bg-top" aria-hidden="true">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 19 4.5"
											>
												<defs>
													<style>
														.lock {
															fill: none;
															stroke: var(--spectrum-gray-500);
															stroke-miterlimit: 10;
														}
													</style>
												</defs>
												<line class="lock" y1="0.5" x2="16.5" y2="0.5" />
												<line class="lock" x1="16.5" x2="16.5" y2="4.5" />
											</svg>
										</sp-icon>
										<sp-action-button
											quiet
											label=${o.cropPreserveAspectRatio?m.t("editPanel.crop.constrainAspectRatio"):m.t("editPanel.crop.doNotConstrainAspectRatio")}
											@click=${()=>{o.cropPreserveAspectRatio=!o.cropPreserveAspectRatio,this.resetCropPresets(),y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"click","event.subtype":"constrain-aspect-ratio","event.value":o.cropPreserveAspectRatio?"on":"off","ui.view_type":"toolbar-properties"})}}
										>
											${o.cropPreserveAspectRatio?u`<sp-icon-lock slot="icon"></sp-icon-lock>`:u`<sp-icon-lock-open
														slot="icon"
													></sp-icon-lock-open>`}
											<sp-tooltip self-managed placement="bottom"
												>${o.cropPreserveAspectRatio?m.t("editPanel.crop.constrainAspectRatio"):m.t("editPanel.crop.doNotConstrainAspectRatio")}</sp-tooltip
											>
										</sp-action-button>
										<sp-icon class="lock-icon-bg-bottom" aria-hidden="true">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 19 7"
											>
												<defs>
													<style>
														.lock {
															fill: none;
															stroke: var(--spectrum-gray-500);
															stroke-miterlimit: 10;
														}
													</style>
												</defs>
												<line class="lock" y1="4.5" x2="17" y2="4.5" />
												<line class="lock" x1="16.5" x2="16.5" y2="4.5" />
											</svg>
										</sp-icon>
									</div>
									<div id="crop-swap">
										<sp-action-button
											quiet
											label=${m.t("editPanel.crop.swapWidthHeight")}
											@click=${()=>{const r=o.canvas.outpaintRect.w,e=o.canvas.outpaintRect.h,t=Math.round((e-r)/2),a=Math.round((r-e)/2);o.canvas.outpaintRect.w=e,o.canvas.outpaintRect.h=r,o.canvas.outpaintRect.x-=t,o.canvas.outpaintRect.y-=a,r!==e&&this.resetCropPresets(),y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"click","event.subtype":"swap-width-and-height","ui.view_type":"toolbar-properties"}),y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"success","event.subtype":"width","event.value":"updated-value","ui.view_type":"toolbar-properties"}),y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"success","event.subtype":"height","event.value":"updated-value","ui.view_type":"toolbar-properties"})}}
										>
											<sp-icon-switch-vertical
												slot="icon"
											></sp-icon-switch-vertical>
											<sp-tooltip self-managed placement="bottom"
												>${m.t("editPanel.crop.swapWidthHeight")}</sp-tooltip
											>
										</sp-action-button>
									</div>
								</div>
								<sp-action-button
									?disabled=${!this.canResetCrop}
									@click=${this.resetCrop}
									><sp-icon-revert slot="icon"></sp-icon-revert>${m.t("editPanel.crop.reset")}</sp-action-button
								>
								<sp-accordion
									class="preset-accordion"
									allow-multiple
									density="compact"
									size="m"
								>
									<sp-accordion-item
										label=${m.t("editPanel.crop.presets")}
										@sp-accordion-item-toggle=${r=>{const e=r.target;y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"click","event.subtype":"preset","event.value":e.open?"expand":"collapse","ui.view_type":"toolbar-properties"})}}
									>
										<sp-accordion
											class="preset-category-accordion"
											density="compact"
											size="m"
										>
											${re.map((r,e)=>u`
													<sp-accordion-item
														label=${r.title}
														@sp-accordion-item-toggle=${t=>{t.stopPropagation();const a=t.target;y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"click","event.subtype":r.id,"event.value":a.open?"expand":"collapse","ui.view_type":"toolbar-properties"})}}
													>
														<div class="crop-presets">
															${r.presets.map((t,a)=>u`
																	<psx-crop-preset-card
																		.categoryIndex=${e}
																		.presetIndex=${a}
																		.selected=${o.selectedCropPresetCategoryIndex===e&&o.selectedCropPresetIndex===a}
																		@crop-preset-select=${this.handleCropPresetSelected}
																	></psx-crop-preset-card>
																`)}
														</div>
													</sp-accordion-item>
												`)}
										</sp-accordion>
									</sp-accordion-item>
								</sp-accordion>
							</div>
						</section>
						<ue-rich-tooltip
							.item=${{heading:m.t("editPanel.richTooltips.removeBackground.heading"),content:m.t("editPanel.richTooltips.removeBackground.content"),src:"/assets/remove_bg.webm",mediaType:"video",videoType:"video/webm"}}
						>
							<sp-action-button
								slot="trigger"
								?disabled=${o.editPanelDisabled||o.cropMode||!!o.canvas.mask}
								class="summary-button"
								quiet
								@click=${()=>{window.dispatchEvent(new P({type:"remove-background"})),y("trackEvent",{"event.workflow":"COMPOSITING","event.subcategory":"Remove Background","event.type":"click","event.subtype":"remove-background","ui.view_type":"toolbar"})}}
							>
								<sp-icon-image-background-remove
									slot="icon"
								></sp-icon-image-background-remove>
								${m.t("editPanel.removeBackground")}
							</sp-action-button>
						</ue-rich-tooltip>
						<div id="rotate-controls">
							<sp-field-label
								side-aligned="start"
								size="l"
								?disabled=${o.editPanelDisabled||o.cropMode}
								>${m.t("editPanel.rotate.title")}</sp-field-label
							>
							<sp-action-group id="rotate-buttons">
								<sp-action-button
									label=${m.t("editPanel.rotate.counterclockwise")}
									quiet
									?disabled=${o.editPanelDisabled||o.cropMode}
									@click=${()=>{window.dispatchEvent(new P({type:"apply-rotation",payload:"counterclockwise"})),o.addCommand({name:"Rotate counterclockwise",undo:()=>{window.dispatchEvent(new P({type:"apply-rotation",payload:"clockwise"}))},redo:()=>{window.dispatchEvent(new P({type:"apply-rotation",payload:"counterclockwise"}))}}),y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"click","event.subtype":"rotate","event.value":"counter-clockwise","ui.view_type":"toolbar"})}}
								>
									<sp-icon-rotate-cc-w slot="icon"></sp-icon-rotate-cc-w>
									<sp-tooltip self-managed placement="bottom"
										>${m.t("editPanel.rotate.counterclockwise")}</sp-tooltip
									>
								</sp-action-button>
								<sp-action-button
									label=${m.t("editPanel.rotate.clockwise")}
									quiet
									?disabled=${o.editPanelDisabled||o.cropMode}
									@click=${()=>{window.dispatchEvent(new P({type:"apply-rotation",payload:"clockwise"})),o.addCommand({name:"Rotate clockwise",undo:()=>{window.dispatchEvent(new P({type:"apply-rotation",payload:"counterclockwise"}))},redo:()=>{window.dispatchEvent(new P({type:"apply-rotation",payload:"clockwise"}))}}),y("trackEvent",{"event.workflow":"CROP","event.subcategory":"Crop","event.type":"click","event.subtype":"rotate","event.value":"clockwise","ui.view_type":"toolbar"})}}
								>
									<sp-icon-rotate-c-w slot="icon"></sp-icon-rotate-c-w>
									<sp-tooltip self-managed placement="bottom"
										>${m.t("editPanel.rotate.clockwise")}</sp-tooltip
									>
								</sp-action-button>
							</sp-action-group>
						</div>
					</div>
					<div id="footer">
						<h3>${m.t("editPanel.doMoreInPsWeb")}</h3>
						<ue-rich-tooltip
							.item=${{heading:m.t("editPanel.richTooltips.removePeopleDistractions.heading"),content:"",src:"/assets/remove_people_distractions.webm",mediaType:"video",videoType:"video/webm"}}
						>
							<sp-action-button
								slot="trigger"
								?disabled=${o.editPanelDisabled}
								class="summary-button"
								static-color="black"
								@click=${()=>{y("trackEvent",{"event.workflow":"CHROME EXTENSION","event.subcategory":"Edit","event.type":"click","event.subtype":"remove-distractions","ui.view_type":"toolbar"}),window.dispatchEvent(new ae({workflow:"remove-distractions"}))}}
								@mouseenter=${()=>{y("trackEvent",{"event.workflow":"CHROME EXTENSION","event.subcategory":"Edit","event.type":"render","event.subtype":"remove-distractions","ui.view_type":"toolbar"})}}
							>
								<sp-icon-people-group slot="icon"></sp-icon-people-group>
								<span class="do-more-button-content">
									${m.t("editPanel.removePeopleDistractions")}
									<sp-icon-open-in
										class="do-more-button-icon"
										label=${m.t("editPanel.externalLink")}
									></sp-icon-open-in>
								</span>
							</sp-action-button>
						</ue-rich-tooltip>
						<ue-rich-tooltip
							.item=${{heading:m.t("editPanel.richTooltips.uploadImage.heading"),content:m.t("editPanel.richTooltips.uploadImage.content"),src:"/assets/add_image.webm",mediaType:"video",videoType:"video/webm"}}
						>
							<sp-action-button
								slot="trigger"
								class="summary-button"
								static-color="black"
								@click=${()=>{y("trackEvent",{"event.workflow":"CHROME EXTENSION","event.subcategory":"Edit","event.type":"click","event.subtype":"upload-file","ui.view_type":"toolbar:do-more-psw"}),y("closeSidePanel",void 0);const{analytics:r}=cs;window.open(`https://photoshop.adobe.com/id?fid=1&sdid=${r.sdid}&mv=${r.mv}`,"_blank")}}
								@mouseenter=${()=>{y("trackEvent",{"event.workflow":"CHROME EXTENSION","event.subcategory":"Edit","event.type":"render","event.subtype":"upload-file","ui.view_type":"toolbar:do-more-psw"})}}
							>
								<sp-icon-image-add slot="icon"></sp-icon-image-add>
								<span class="do-more-button-content">
									${m.t("editPanel.uploadOwnImage")}
									<sp-icon-open-in
										class="do-more-button-icon"
										label=${m.t("editPanel.externalLink")}
									></sp-icon-open-in>
								</span>
							</sp-action-button>
						</ue-rich-tooltip>
						<ue-rich-tooltip
							.item=${{heading:m.t("editPanel.richTooltips.effects.heading"),content:m.t("editPanel.richTooltips.effects.content"),src:"/assets/effects.webm",mediaType:"video",videoType:"video/webm"}}
						>
							<sp-action-button
								slot="trigger"
								?disabled=${o.editPanelDisabled}
								class="summary-button"
								static-color="black"
								@click=${()=>{y("trackEvent",{"event.workflow":"CHROME EXTENSION","event.subcategory":"Edit","event.type":"click","event.subtype":"apply-effect","ui.view_type":"toolbar:do-more-psw"}),window.dispatchEvent(new ae({workflow:"effects"}))}}
								@mouseenter=${()=>{y("trackEvent",{"event.workflow":"CHROME EXTENSION","event.subcategory":"Edit","event.type":"render","event.subtype":"apply-effect","ui.view_type":"toolbar:do-more-psw"})}}
							>
								<sp-icon slot="icon">${nn()}</sp-icon>
								<span class="do-more-button-content">
									${m.t("editPanel.applyEffect")}
									<sp-icon-open-in
										class="do-more-button-icon"
										label=${m.t("editPanel.externalLink")}
									></sp-icon-open-in>
								</span>
							</sp-action-button>
						</ue-rich-tooltip>
						<ue-rich-tooltip
							.item=${{heading:m.t("editPanel.richTooltips.harmonize.heading"),content:m.t("editPanel.richTooltips.harmonize.content"),src:"/assets/harmonize.webm",mediaType:"video",videoType:"video/webm"}}
						>
							<sp-action-button
								slot="trigger"
								?disabled=${o.editPanelDisabled}
								class="summary-button"
								static-color="black"
								@click=${()=>{y("trackEvent",{"event.workflow":"CHROME EXTENSION","event.subcategory":"Edit","event.type":"click","event.subtype":"blend-images","ui.view_type":"toolbar:do-more-psw"}),window.dispatchEvent(new ae({workflow:"blend-images"}))}}
								@mouseenter=${()=>{y("trackEvent",{"event.workflow":"CHROME EXTENSION","event.subcategory":"Edit","event.type":"render","event.subtype":"blend-images","ui.view_type":"toolbar:do-more-psw"})}}
							>
								<sp-icon slot="icon">${sn()}</sp-icon>
								<span class="do-more-button-content">
									${m.t("editPanel.blendTwoImages")}
									<sp-icon-open-in
										class="do-more-button-icon"
										label=${m.t("editPanel.externalLink")}
									></sp-icon-open-in>
								</span>
							</sp-action-button>
						</ue-rich-tooltip>
						<ue-rich-tooltip
							.item=${{heading:m.t("editPanel.richTooltips.upscale.heading"),content:m.t("editPanel.richTooltips.upscale.content"),src:"/assets/upscale.mp4",mediaType:"video",videoType:"video/mp4"}}
						>
							<sp-action-button
								slot="trigger"
								?disabled=${o.editPanelDisabled}
								class="summary-button"
								static-color="black"
								@click=${()=>{y("trackEvent",{"event.workflow":"CHROME EXTENSION","event.subcategory":"Edit","event.type":"click","event.subtype":"upscale","ui.view_type":"toolbar:do-more-psw"}),window.dispatchEvent(new ae({workflow:"upscale"}))}}
								@mouseenter=${()=>{y("trackEvent",{"event.workflow":"CHROME EXTENSION","event.subcategory":"Edit","event.type":"render","event.subtype":"upscale","ui.view_type":"toolbar:do-more-psw"})}}
							>
								<sp-icon slot="icon">${on()}</sp-icon>
								<span class="do-more-button-content">
									${m.t("editPanel.upscale")}
									<sp-icon-open-in
										class="do-more-button-icon"
										label=${m.t("editPanel.externalLink")}
									></sp-icon-open-in>
								</span>
							</sp-action-button>
						</ue-rich-tooltip>
						<h3>${m.t("editPanel.doMoreInLrWeb")}</h3>
						<ue-rich-tooltip
							.item=${{heading:m.t("editPanel.richTooltips.applyPresets.heading"),content:m.t("editPanel.richTooltips.applyPresets.content"),src:"/assets/presets.mp4",mediaType:"video",videoType:"video/mp4"}}
						>
							<sp-action-button
								slot="trigger"
								?disabled=${o.editPanelDisabled}
								class="summary-button"
								static-color="black"
								@click=${async()=>{y("trackEvent",{"event.workflow":"CHROME EXTENSION","event.subcategory":"Edit","event.type":"click","event.subtype":"apply-presets","ui.view_type":"toolbar:do-more-lrw"}),window.dispatchEvent(new mt)}}
							>
								<sp-icon slot="icon">${yn}</sp-icon>
								<span class="do-more-button-content">
									${m.t("editPanel.applyPresets")}
									<sp-icon-open-in
										class="do-more-button-icon"
										label=${m.t("editPanel.externalLink")}
									></sp-icon-open-in>
								</span>
							</sp-action-button>
						</ue-rich-tooltip>
					</div>
					<div id="psweb-cta">
						<p>
							${m.t("editPanel.offerCard.subtext",[6])}
							<em>${m.t("editPanel.offerCard.noCreditCard")}</em>
						</p>
						<div class="cta-button-container">
							<sp-button
								treatment="outline"
								static-color="white"
								@click=${async()=>{y("trackEvent",{"event.workflow":"CHROME EXTENSION","event.subcategory":"Edit","event.type":"click","event.subtype":"start-free-offer","ui.view_type":"toolbar"});const{analytics:r}=ze();window.open(`https://photoshop.adobe.com/?sdid=${r.sdid}&mv=${r.mv}&ext_offer=1`,"_blank")}}
								>${m.t("editPanel.offerCard.button")}</sp-button
							>
						</div>
					</div>
				</div>
			</div>
		`}};lt.styles=$`
		:host {
			max-height: calc(100% - 8px);
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			position: absolute;
			top: 4px;
			left: 4px;
			--psx-premium-background-color: linear-gradient(
				135deg,
				#b539c8 0%,
				#7155fa 66%,
				#3b63fb 100%
			);
		}

		#edit-toggle {
			display: block;
			border-radius: 10px;
			padding: 12px;
			background: var(--spectrum-background-layer-2-color);
			box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.16);
			text-align: center;
		}

		#edit-panel[hidden],
		#edit-toggle[hidden] {
			display: none;
		}

		#edit-panel {
			display: flex;
			flex-direction: column;
			width: 292px;
			min-height: 0;
			border-radius: 10px;
			background: var(--spectrum-background-layer-2-color);
			box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.16);

			/* to shrink the number field next to sliders */
			--mod-stepper-width: 62px;
		}

		#header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 12px;
			padding: 12px 12px 0 12px;
		}

		h2 {
			margin: 0;
			font-size: 16px;
			font-weight: 700;
		}

		#scrollable-content {
			overflow-y: auto;
		}

		#content {
			min-height: 0;
			display: flex;
			flex-direction: column;
			gap: 8px;
			padding: 0 12px 12px 12px;
		}

		.collapsible-section {
			display: flex;
			flex-direction: column;
			min-height: 32px;
		}

		.collapsible-section[open] {
			background: var(--spectrum-gray-50);
			border-radius: 8px;
		}

		.collapsible-content {
			padding: 12px;
			display: flex;
			flex-direction: column;
			gap: 8px;
			min-height: 0;
		}

		.collapsible-content[hidden] {
			display: none;
		}

		sp-slider {
			--mod-slider-track-fill-thickness: 4px;
		}

		#hue-slider {
			--mod-slider-track-color: linear-gradient(
				to right,
				red,
				yellow,
				lime,
				cyan,
				blue,
				fuchsia,
				red 100%
			);
		}

		#saturation-slider {
			--mod-slider-track-color: linear-gradient(to right, grey, red 100%);
		}

		#rotate-controls {
			padding: 0 12px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.flex-between {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.summary-button {
			width: 100%;
			justify-content: flex-start;
			--spectrum-actionbutton-label-flex-grow: 1;
			position: sticky;
			top: 0;
			z-index: 1;
		}

		#crop-controls {
			display: grid;
			grid-template-columns: auto 80px auto auto 1fr;
			grid-template-areas:
				'width-label  width-field  lock swap .'
				'height-label height-field lock swap .';
			gap: 8px 0;
		}

		sp-field-label[for='crop-width'] {
			grid-area: width-label;
		}

		#crop-width {
			grid-area: width-field;
		}

		sp-field-label[for='crop-height'] {
			grid-area: height-label;
		}

		#crop-height {
			grid-area: height-field;
		}

		.crop-field {
			width: 100%;
		}

		#crop-lock {
			margin-left: 8px;
			grid-area: lock;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		#crop-lock > sp-action-button {
			margin-left: 2px;
		}

		#crop-swap {
			margin-left: 4px;
			grid-area: swap;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		.crop-presets {
			display: inline-flex;
			flex-wrap: wrap;
			gap: var(--spectrum-global-dimension-size-200);
			width: calc(
				var(--spectrum-global-dimension-size-2500) +
					var(--spectrum-global-dimension-size-300)
			);
			margin: var(--spectrum-spacing-200) 0;
		}

		sp-accordion {
			--mod-accordion-item-header-font-size: var(--spectrum-font-size-100);
			--mod-accordion-component-edge-to-text: 0;
			--mod-accordion-item-content-area-top-to-content: 0;
			--mod-accordion-item-content-area-bottom-to-content: 0;
			--mod-accordion-divider-thickness: 0;
		}

		.preset-accordion {
			margin: 0 -8px;
		}

		.preset-category-accordion {
			--mod-accordion-item-header-font-weight: var(
				--spectrum-global-font-weight-light
			);
			--mod-accordion-component-edge-to-text: 12px;
		}

		#footer {
			background: var(--spectrum-gray-50);
			padding: 12px;
			border-radius: 0 0 10px 10px;
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		#footer h3 {
			margin: 0;
			font-size: 14px;
		}

		#footer sp-action-button {
			--spectrum-actionbutton-background-color-default: var(--spectrum-white);
		}

		.do-more-button-content {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.do-more-button-icon {
			opacity: 0;
		}

		#footer sp-action-button:hover .do-more-button-icon {
			opacity: 1;
		}

		ue-rich-tooltip {
			--mod-heading-font-size: 14px;
			--mod-popover-border-width: 0;
			--spectrum-card-border-size: 0;
		}

		#psweb-cta {
			background: var(--psx-premium-background-color);
			border-radius: 0 0 10px 10px;
			padding: 16px;
			color: var(--spectrum-white);
			font-size: 16px;
		}

		#psweb-cta p {
			margin: 0 0 20px 0;
		}

		#psweb-cta em {
			font-weight: 400;
		}

		.cta-button-container {
			display: flex;
			justify-content: flex-end;
		}
	`;Ir([X()],lt.prototype,"openSection",2);lt=Ir([Q("psx-edit-panel")],lt);const ds=({width:r=24,height:e=24,hidden:t=!1,title:a="More"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <circle cx="10" cy="10.02114" r="1.5" fill="currentColor" />
    <path
      d="m10,8.5c-.82843,0-1.5.67157-1.5,1.5s.67157,1.5,1.5,1.5,1.5-.67157,1.5-1.5-.67157-1.5-1.5-1.5Z"
      fill="currentColor"
    />
    <circle cx="4" cy="10.02114" r="1.5" fill="currentColor" />
    <circle cx="4" cy="10" r="1.5" fill="currentColor" />
    <circle cx="16" cy="10.02114" r="1.5" fill="currentColor" />
    <circle cx="16" cy="10" r="1.5" fill="currentColor" />
  </svg>`,us=({width:r=24,height:e=24,hidden:t=!1,title:a="More"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 36 36"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <circle cx="17.8" cy="18.2" r="3.4" />
    <circle cx="29.5" cy="18.2" r="3.4" />
    <circle cx="6.1" cy="18.2" r="3.4" />
  </svg>`;class ps extends E{render(){return A(u),this.spectrumVersion===2?ds({hidden:!this.label,title:this.label}):us({hidden:!this.label,title:this.label})}}z("sp-icon-more",ps);const hs=$`
    :host{display:inline-flex}:host([quiet]){min-width:0}:host>sp-menu{display:none}::slotted([slot=icon]){flex-shrink:0}.icon{flex-shrink:0}#popover{max-width:none}:host([dir=ltr]) ::slotted([slot=icon]),:host([dir=ltr]) .icon{margin-left:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir=rtl]) ::slotted([slot=icon]),:host([dir=rtl]) .icon{margin-right:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir]) slot[icon-only]::slotted([slot=icon]),:host([dir]) slot[icon-only] .icon{margin-inline:calc((var(--custom-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)) - var(--custom-actionbutton-edge-to-visual-only,var(--spectrum-actionbutton-edge-to-visual-only)))*-1)}sp-overlay:not(:defined){display:none}
`;var ms=Object.defineProperty,fs=Object.getOwnPropertyDescriptor,Pt=(r,e,t,a)=>{for(var i=a>1?void 0:a?fs(e,t):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=(a?s(e,t,i):s(i))||i);return a&&i&&ms(e,t,i),i};class et extends da(Tt(Kr,"label"),'[slot="label-only"]'){constructor(){super(...arguments),this.selects=void 0,this.listRole="menu",this.itemRole="menuitem",this.handleSlottableRequest=e=>{this.dispatchEvent(new Jr(e.name,e.data))}}static get styles(){return[hs]}get hasLabel(){return this.slotHasContent}get labelOnly(){return this.slotContentIsPresent}get buttonContent(){return[u`
                ${this.labelOnly?u``:u`
                          <slot
                              name="icon"
                              slot="icon"
                              ?icon-only=${!this.hasLabel}
                              ?hidden=${this.labelOnly}
                          >
                              <sp-icon-more
                                  class="icon"
                                  size=${this.size}
                              ></sp-icon-more>
                          </slot>
                      `}
                <slot name="label" ?hidden=${!this.hasLabel}></slot>
                <slot name="label-only"></slot>
            `]}render(){return this.tooltipEl&&(this.tooltipEl.disabled=this.open),u`
            <sp-action-button
                aria-describedby=${ea}
                ?quiet=${this.quiet}
                ?selected=${this.open}
                static-color=${M(this.staticColor)}
                aria-haspopup="true"
                aria-controls=${M(this.open?"menu":void 0)}
                aria-expanded=${this.open?"true":"false"}
                aria-label=${M(this.label||void 0)}
                id="button"
                class="button"
                size=${this.size}
                @blur=${this.handleButtonBlur}
                @focus=${this.handleButtonFocus}
                @keydown=${{handleEvent:this.handleEnterKeydown,capture:!0}}
                ?disabled=${this.disabled}
            >
                ${this.buttonContent}
            </sp-action-button>
            <slot
                name="tooltip"
                @slotchange=${this.handleTooltipSlotchange}
            ></slot>
            ${this.renderMenu} ${this.renderDescriptionSlot}
        `}update(e){e.has("invalid")&&(this.invalid=!1),super.update(e)}hasAccessibleLabel(){return!!this.label||!!this.getAttribute("aria-label")||!!this.getAttribute("aria-labelledby")||!!this.appliedLabel||this.hasLabel||this.labelOnly}warnNoLabel(){window.__swc.warn(this,`<${this.localName}> needs one of the following to be accessible:`,"https://opensource.adobe.com/spectrum-web-components/components/action-menu/#accessibility",{type:"accessibility",issues:[`an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,'value supplied to the "label" attribute, which will be displayed visually as placeholder text','text content supplied in a <span> with slot="label", or, text content supplied in a <span> with slot="label-only"',"which will also be displayed visually as placeholder text."]})}}Pt([f({type:String})],et.prototype,"selects",2),Pt([f({reflect:!0,attribute:"static-color"})],et.prototype,"staticColor",2),Pt([X()],et.prototype,"labelOnly",1);z("sp-action-menu",et);const gs=$`
    :host{--spectrum-menu-divider-thickness:var(--spectrum-divider-thickness-medium);inline-size:auto;margin-block:var(--mod-menu-section-divider-margin-block,max(0px,(var(--spectrum-menu-item-section-divider-height) - var(--spectrum-menu-divider-thickness))/2));margin-inline:var(--mod-menu-item-label-inline-edge-to-content,var(--spectrum-menu-item-label-inline-edge-to-content));overflow:visible}.spectrum-Menu-back:focus-visible{box-shadow:var(--spectrum-menu-item-focus-indicator-shadow)var(--spectrum-menu-item-focus-indicator-border-width)0 0 0 var(--spectrum-menu-item-focus-indicator-color-default);outline:var(--spectrum-menu-item-focus-indicator-width)var(--spectrum-menu-item-focus-indicator-outline-style)var(--spectrum-menu-item-focus-indicator-color-default);outline-offset:var(--spectrum-menu-item-focus-indicator-offset);border-radius:var(--spectrum-menu-item-corner-radius)}.spectrum-Menu-back{padding-inline:var(--mod-menu-back-padding-inline-start,0)var(--mod-menu-back-padding-inline-end,var(--spectrum-menu-item-label-inline-edge-to-content));padding-block:var(--mod-menu-back-padding-block-start,0)var(--mod-menu-back-padding-block-end,0);flex-flow:wrap;align-items:center;display:flex}.spectrum-Menu-backButton{cursor:pointer;background:0 0;border:0;margin:0;padding:0;display:inline-flex}.spectrum-Menu-backButton:focus-visible{outline:var(--spectrum-focus-indicator-thickness)solid var(--spectrum-focus-indicator-color);outline-offset:calc((var(--spectrum-focus-indicator-thickness) + 1px)*-1)}.spectrum-Menu-backHeading{color:var(--highcontrast-menu-item-color-default,var(--mod-menu-back-heading-color,var(--spectrum-menu-section-header-color)));font-size:var(--mod-menu-section-header-font-size,var(--spectrum-menu-section-header-font-size));font-weight:var(--mod-menu-section-header-font-weight,var(--spectrum-menu-section-header-font-weight));line-height:var(--mod-menu-section-header-line-height,var(--spectrum-menu-section-header-line-height));display:block}:host{flex-shrink:0;display:block}
`;class bs extends pe(Ie,{validSizes:["s","m","l"]}){static get styles(){return[ua,gs]}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","separator")}}z("sp-menu-divider",bs);const vs=({width:r=24,height:e=24,hidden:t=!1,title:a="Chevron Down"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M3.75488,7.24316c.28711-.29883.76172-.3086,1.05957-.02051l5.18359,4.98633,5.19727-4.99902c.29785-.28808.77246-.27832,1.05957.02051.28711.29687.27832.77246-.02051,1.05957l-5.7168,5.5c-.29004.28027-.74902.28027-1.03906,0l-5.70312-5.4873c-.15332-.14649-.23047-.34375-.23047-.54004,0-.18751.06934-.37501.20996-.51954Z"
      fill="currentColor"
    />
  </svg>`,ys=({width:r=24,height:e=24,hidden:t=!1,title:a="Chevron Down"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${r}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M8 14.02a2 2 0 0 1 3.411-1.411l6.578 6.572 6.578-6.572a2 2 0 0 1 2.874 2.773l-.049.049-7.992 7.984a2 2 0 0 1-2.825 0l-7.989-7.983A1.989 1.989 0 0 1 8 14.02Z"
    />
  </svg>`;class ws extends E{render(){return A(u),this.spectrumVersion===2?vs({hidden:!this.label,title:this.label}):ys({hidden:!this.label,title:this.label})}}z("sp-icon-chevron-down",ws);const ks=({width:r=24,height:e=24,hidden:t=!1,title:a="Undo"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="m12.25732,5H3.80811l1.71973-1.71973c.29297-.29297.29297-.76758,0-1.06055s-.76758-.29297-1.06055,0l-2.99756,2.99756c-.29297.29248-.29297.76709-.00049,1.06006l2.99756,3.00244c.14648.14697.33838.22021.53076.22021.19189,0,.3833-.07324.52979-.21924.29346-.29248.29346-.76758.00098-1.06055l-1.71747-1.72021h8.44647c2.48145,0,4.50049,2.01855,4.50049,4.5s-2.01904,4.5-4.50049,4.5h-3.73779c-.41406,0-.75.33594-.75.75s.33594.75.75.75h3.73779c3.30859,0,6.00049-2.69141,6.00049-6s-2.69189-6-6.00049-6Z"
      fill="currentColor"
    />
  </svg>`,xs=({width:r=24,height:e=24,hidden:t=!1,title:a="Undo"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${r}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M30.663 12.542A10.391 10.391 0 0 0 23.671 10H11V4.8a.8.8 0 0 0-.8-.8.787.787 0 0 0-.527.2l-7.529 7.449a.5.5 0 0 0 0 .7L9.668 19.8a.787.787 0 0 0 .527.2.8.8 0 0 0 .8-.8V14h12.882a6.139 6.139 0 0 1 6.223 5.8A5.889 5.889 0 0 1 24 26h-7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6.526a10.335 10.335 0 0 0 10.426-9.013 9.947 9.947 0 0 0-3.289-8.445Z"
    />
  </svg>`;class Cs extends E{render(){return A(u),this.spectrumVersion===2?ks({hidden:!this.label,title:this.label}):xs({hidden:!this.label,title:this.label})}}z("sp-icon-undo",Cs);const zs=({width:r=24,height:e=24,hidden:t=!1,title:a="Redo"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="m7.74268,5h8.44922s-1.71973-1.71973-1.71973-1.71973c-.29297-.29297-.29297-.76758,0-1.06055s.76758-.29297,1.06055,0l2.99756,2.99756c.29297.29248.29297.76709.00049,1.06006l-2.99756,3.00244c-.14648.14697-.33838.22021-.53076.22021-.19189,0-.3833-.07324-.52979-.21924-.29346-.29248-.29346-.76758-.00098-1.06055l1.71747-1.72021H7.74268c-2.48145,0-4.50049,2.01855-4.50049,4.5s2.01904,4.5,4.50049,4.5h3.73779c.41406,0,.75.33594.75.75,0,.41406-.33594.75-.75.75h-3.73779c-3.30859,0-6.00049-2.69141-6.00049-6s2.69189-6,6.00049-6Z"
      fill="currentColor"
    />
  </svg>`,_s=({width:r=24,height:e=24,hidden:t=!1,title:a="Redo"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${r}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M5.337 12.542A10.391 10.391 0 0 1 12.329 10H25V4.8a.8.8 0 0 1 .8-.8.787.787 0 0 1 .527.2l7.524 7.445a.5.5 0 0 1 0 .7L26.332 19.8a.787.787 0 0 1-.527.2.8.8 0 0 1-.8-.8V14H12.123A6.139 6.139 0 0 0 5.9 19.8 5.889 5.889 0 0 0 12 26h7a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6.526a10.335 10.335 0 0 1-10.426-9.013 9.947 9.947 0 0 1 3.289-8.445Z"
    />
  </svg>`;class Ps extends E{render(){return A(u),this.spectrumVersion===2?zs({hidden:!this.label,title:this.label}):_s({hidden:!this.label,title:this.label})}}z("sp-icon-redo",Ps);const $s=({width:r=24,height:e=24,hidden:t=!1,title:a="Lightbulb"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="m10,2.24121c-.41406,0-.75-.33594-.75-.75v-.7002c0-.41406.33594-.75.75-.75s.75.33594.75.75v.7002c0,.41406-.33594.75-.75.75Z"
      fill="currentColor"
    />
    <path
      d="m18.4541,10.02148h-.7002c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h.7002c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
      fill="currentColor"
    />
    <path
      d="m2.23242,10.02148h-.7002c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h.7002c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
      fill="currentColor"
    />
    <path
      d="m4.51074,4.53906c-.19238,0-.38379-.07324-.53027-.21973l-.49512-.49512c-.29297-.29297-.29297-.76758,0-1.06055s.76758-.29297,1.06055,0l.49512.49512c.29297.29297.29297.76758,0,1.06055-.14648.14648-.33789.21973-.53027.21973Z"
      fill="currentColor"
    />
    <path
      d="m15.47559,4.53906c-.19238,0-.38379-.07324-.53027-.21973-.29297-.29297-.29297-.76758,0-1.06055l.49512-.49512c.29297-.29297.76758-.29297,1.06055,0s.29297.76758,0,1.06055l-.49512.49512c-.14648.14648-.33789.21973-.53027.21973Z"
      fill="currentColor"
    />
    <path
      d="m16,9.5c0-3.30859-2.69141-6-6-6s-6,2.69141-6,6c0,2.2157,1.21021,4.1499,3.00122,5.18896,0,.00232-.00122.00415-.00122.00635v1.80469c0,1.6543,1.3457,3,3,3s3-1.3457,3-3v-1.81177c1.79041-1.03931,3-2.97314,3-5.18823Zm-4.5,7c0,.82715-.67285,1.5-1.5,1.5s-1.5-.67285-1.5-1.5v-1.19751c.48047.12439.9812.19751,1.5.19751s1.01953-.07312,1.5-.19751v1.19751Zm-1.5-2.5c-2.48145,0-4.5-2.01855-4.5-4.5s2.01855-4.5,4.5-4.5,4.5,2.01855,4.5,4.5-2.01855,4.5-4.5,4.5Z"
      fill="currentColor"
    />
  </svg>`,Ms=({width:r=24,height:e=24,hidden:t=!1,title:a="Tips"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${r}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M28.8 10.613A10.572 10.572 0 0 0 17.986.3a11.349 11.349 0 0 0-2.169.21A11.033 11.033 0 0 0 7.2 10.69C7.2 16.148 12 19.044 12 24v2h12v-2c0-5 4.8-8.048 4.8-13.387ZM12 28v2.367a1.5 1.5 0 0 0 .359.973l3.524 4.133a1.5 1.5 0 0 0 1.142.527h1.951a1.5 1.5 0 0 0 1.141-.527l3.525-4.133a1.5 1.5 0 0 0 .358-.973V28Z"
    />
  </svg>`;class Ss extends E{render(){return A(u),this.spectrumVersion===2?$s({hidden:!this.label,title:this.label}):Ms({hidden:!this.label,title:this.label})}}z("sp-icon-lightbulb",Ss);const Es=({width:r=24,height:e=24,hidden:t=!1,title:a="Settings"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M10.00391,12.58887c-.88818,0-1.75293-.45996-2.22803-1.2832h0c-.70801-1.22754-.28613-2.80078.93994-3.50879.59326-.34375,1.28516-.43359,1.94922-.25684.6626.17773,1.21631.60352,1.55908,1.19727.34326.59375.43408,1.28613.25684,1.94824-.17773.66309-.60254,1.2168-1.19678,1.55957-.40332.2334-.84473.34375-1.28027.34375ZM9.07471,10.55566c.29443.50879.94824.68359,1.45947.39062.24707-.14258.42383-.37305.49756-.64844s.03613-.56348-.10645-.81055c-.14307-.24707-.37305-.42383-.64893-.49805-.2749-.07324-.56299-.03516-.81055.10645-.51025.29492-.68555.94922-.39111,1.45996h0Z"
      fill="currentColor"
    />
    <path
      d="M6.90674,18.31836c-.33936,0-.68213-.08496-.99219-.26465l-.81982-.47266c-.89307-.51367-1.25-1.64941-.81104-2.58301l.58008-1.2334c-.26514-.36328-.48975-.75098-.67188-1.16113l-1.35693-.1123c-1.02881-.08496-1.83447-.95996-1.83447-1.99121l-.00098-.94629c0-1.0332.80518-1.90918,1.8335-1.99414l1.35449-.11426c.0918-.20898.19238-.40918.30176-.59961.10986-.19141.2334-.37891.36914-.56445l-.58057-1.22949c-.44092-.93262-.08643-2.06836.80713-2.58496l.82031-.47363c.89258-.5166,2.05371-.25879,2.64258.58984l.77734,1.11816c.44385-.0498.89209-.04785,1.34082,0l.77539-1.11914c.58887-.84961,1.75098-1.10938,2.64355-.59375l.81982.47266c.89404.51562,1.24951,1.65137.81055,2.58398l-.58008,1.23242c.26562.36426.49023.75195.67188,1.16113l1.35693.1123c1.02832.08496,1.83398.95996,1.83496,1.99121l.00049.94727c.00098,1.03125-.80371,1.90723-1.83203,1.99414l-1.35547.11426c-.09131.20898-.19189.4082-.30273.59961h0c-.10938.18945-.23242.37793-.36816.56348l.58057,1.22949c.44043.93164.08643,2.06738-.80664,2.58496l-.8208.47461c-.89355.51855-2.05371.25781-2.64258-.59082l-.77734-1.11816c-.4458.04883-.89404.04785-1.34082.00098l-.77637,1.12012c-.38379.55371-1.01172.85645-1.65039.85645ZM6.9043,3.22461c-.08496,0-.17041.02148-.24805.06641l-.8208.47461c-.22266.12891-.31152.41211-.20117.64551l.77881,1.65039c.12598.2666.08398.58203-.10742.80664-.2041.23926-.37305.47656-.5166.72559-.14111.24609-.26514.51855-.36816.80957-.09814.27832-.3501.47266-.64404.49707l-1.81885.15332c-.26172.02246-.4585.23633-.4585.49902l.00098.94629c0,.25781.20117.47656.4585.49805l1.81934.15039c.29395.02441.54639.21875.64502.49707.19873.56055.49707,1.07617.88672,1.53223.19189.22363.23438.54004.10889.80664l-.77783,1.65234c-.10938.2334-.021.51758.20264.64551l.82031.47363c.22412.12988.51416.06348.66016-.14746l1.04102-1.50195c.16748-.24219.45898-.36914.75244-.30957.58838.10742,1.18457.1084,1.77002-.00098.28955-.05469.58496.06641.75342.30957l1.04199,1.49902c.14648.20996.43848.27637.66064.14746l.82031-.47363c.22607-.13086.31348-.40918.20117-.64648l-.77881-1.65039c-.12598-.2666-.08398-.58203.10742-.80664.2041-.24023.37305-.47656.51562-.72461l.00049-.00098c.14258-.24707.26318-.51172.36865-.80957.09863-.27832.35059-.47266.64453-.49707l1.81885-.15234c.25635-.02246.45752-.24121.45752-.49902l-.00049-.94727c0-.26172-.19727-.47559-.45898-.49805l-1.81885-.15039c-.29395-.02441-.54639-.21875-.64502-.49707-.19775-.55957-.49658-1.0752-.88721-1.53223-.19141-.22461-.23389-.54004-.1084-.80664l.77734-1.65234c.10986-.2334.021-.51758-.20264-.64648l-.81982-.47266c-.22461-.12695-.51416-.06152-.66113.14941l-1.03955,1.5c-.16797.24316-.45898.36816-.75293.31055-.59131-.10938-1.1875-.10938-1.77002,0-.29199.05176-.58545-.06738-.75342-.30957l-1.04199-1.49902c-.09619-.1377-.25293-.21387-.41211-.21387Z"
      fill="currentColor"
    />
  </svg>`,js=({width:r=24,height:e=24,hidden:t=!1,title:a="Settings"}={})=>x`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${r}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M32.9 15.793h-3.111a11.953 11.953 0 0 0-1.842-4.507l2.205-2.206a1.1 1.1 0 0 0 0-1.56l-1.673-1.672a1.1 1.1 0 0 0-1.56 0l-2.205 2.205a11.925 11.925 0 0 0-4.507-1.841V3.1A1.1 1.1 0 0 0 19.1 2h-2.2a1.1 1.1 0 0 0-1.1 1.1v3.112a11.925 11.925 0 0 0-4.507 1.841l-2.2-2.205a1.1 1.1 0 0 0-1.56 0L5.848 7.52a1.1 1.1 0 0 0 0 1.56l2.205 2.206a11.953 11.953 0 0 0-1.842 4.507H3.1A1.1 1.1 0 0 0 2 16.9v2.2a1.1 1.1 0 0 0 1.1 1.1h3.111a11.934 11.934 0 0 0 1.842 4.507l-2.205 2.212a1.1 1.1 0 0 0 0 1.56l1.673 1.673a1.1 1.1 0 0 0 1.56 0l2.205-2.205a11.925 11.925 0 0 0 4.507 1.841V32.9A1.1 1.1 0 0 0 16.9 34h2.2a1.1 1.1 0 0 0 1.1-1.1v-3.112a11.925 11.925 0 0 0 4.507-1.841l2.205 2.205a1.1 1.1 0 0 0 1.56 0l1.673-1.673a1.1 1.1 0 0 0 0-1.56l-2.205-2.205a11.934 11.934 0 0 0 1.842-4.507H32.9A1.1 1.1 0 0 0 34 19.1v-2.2a1.1 1.1 0 0 0-1.1-1.107ZM22.414 18A4.414 4.414 0 1 1 18 13.586 4.414 4.414 0 0 1 22.414 18Z"
    />
  </svg>`;class Rs extends E{render(){return A(u),this.spectrumVersion===2?Es({hidden:!this.label,title:this.label}):js({hidden:!this.label,title:this.label})}}z("sp-icon-settings",Rs);const Ds=u`<svg
	viewBox="0 0 54 54"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M44.26 0H9.74C4.36075 0 0 4.36075 0 9.74V44.26C0 49.6393 4.36075 54 9.74 54H44.26C49.6393 54 54 49.6393 54 44.26V9.74C54 4.36075 49.6393 0 44.26 0Z"
		fill="#001E36"
	/>
	<path
		d="M18.7398 14.4297C25.7698 14.4297 29.7298 17.7197 29.7298 23.2397C29.7298 29.6797 24.3598 32.2697 19.3298 32.2697H15.9298V39.2297H9.0498V14.4297H18.7498H18.7398ZM15.9298 20.3097V26.3797H18.9598C21.0698 26.3797 22.5498 25.5297 22.5498 23.3797C22.5498 21.4197 21.2898 20.3097 19.1098 20.3097H15.9298Z"
		fill="#31A8FF"
	/>
	<path
		d="M31.4299 37.9995L31.4699 32.2595C33.4299 33.5595 36.1699 34.3695 38.0599 34.3695C39.3499 34.3695 39.9499 33.9995 39.9499 33.3295C39.9499 32.5895 39.1399 32.2895 37.5799 31.8095C34.5799 30.9195 31.2899 29.6995 31.2899 25.7795C31.2899 21.8595 34.5799 19.5595 39.3599 19.5595C41.6199 19.5595 43.4699 19.8895 45.0999 20.5995L45.0599 26.0795C43.7699 25.2995 41.2099 24.5995 39.5499 24.5995C38.3299 24.5995 37.8499 24.9695 37.8499 25.5295C37.8499 26.1995 38.4399 26.3795 40.2199 26.9395C43.6599 27.9795 46.5499 29.0895 46.5499 33.1195C46.5499 37.1495 43.3999 39.5595 38.4799 39.5595C35.8899 39.5595 33.4499 39.1195 31.4499 38.0095L31.4299 37.9995Z"
		fill="#31A8FF"
	/>
</svg>`;var As=Object.getOwnPropertyDescriptor,Ts=(r,e,t,a)=>{for(var i=a>1?void 0:a?As(e,t):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=s(i)||i);return i};let jt=class extends He{render(){return u`<div id="start">
				<sp-icon size="xl" aria-hidden="true">${Ds}</sp-icon>
				<span id="brand">${m.t("extTitle")}</span>
			</div>
			<div id="end">
				${de(!o.editPanelDisabled,()=>u`<sp-action-button
								label="${m.t("header.undo")}"
								quiet
								?disabled=${!o.canUndo}
								@click=${()=>{o.undo(),y("trackEvent",{"event.workflow":"HISTORY","event.subcategory":"Step","event.type":"click","event.subtype":"undo","ui.view_type":"top-menu-bar"})}}
							>
								<sp-icon-undo slot="icon"></sp-icon-undo>
								<sp-tooltip self-managed placement="bottom"
									>${m.t("header.undo")}</sp-tooltip
								>
							</sp-action-button>
							<sp-action-button
								label="${m.t("header.redo")}"
								quiet
								?disabled=${!o.canRedo}
								@click=${()=>{o.redo(),y("trackEvent",{"event.workflow":"HISTORY","event.subcategory":"Step","event.type":"click","event.subtype":"redo","ui.view_type":"top-menu-bar"})}}
							>
								<sp-icon-redo slot="icon"></sp-icon-redo>
								<sp-tooltip self-managed placement="bottom"
									>${m.t("header.redo")}</sp-tooltip
								>
							</sp-action-button>
							<sp-action-button
								label="${m.t("header.resetToOriginal")}"
								quiet
								?disabled=${!o.canvas.modified||o.cropMode}
								@click=${()=>{window.dispatchEvent(new P({type:"reset-image"})),y("trackEvent",{"event.workflow":"HISTORY","event.subcategory":"Step","event.type":"click","event.subtype":"reset","ui.view_type":"top-menu-bar"})}}
							>
								<sp-icon-revert slot="icon"></sp-icon-revert>
								<sp-tooltip self-managed placement="bottom"
									>${m.t("header.resetToOriginal")}</sp-tooltip
								>
							</sp-action-button>
							<sp-action-menu
								label="${m.t("header.zoomControls")}"
								placement="bottom-start"
								quiet
							>
								<span id="zoom-controls-label" slot="label-only"
									>${`${Math.round(o.zoom*100)}%`}<sp-icon-chevron-down
										size="s"
									></sp-icon-chevron-down
								></span>
								<sp-menu-item
									@click=${()=>{window.dispatchEvent(new U("zoom-in"))}}
									?disabled=${o.zoom===Xe[Xe.length-1]}
									>${m.t("header.zoomIn")}
									<kbd slot="value"
										>${`${Ee()}+`}</kbd
									></sp-menu-item
								>
								<sp-menu-item
									@click=${()=>{window.dispatchEvent(new U("zoom-out"))}}
									?disabled=${o.zoom===Xe[0]}
									>${m.t("header.zoomOut")}
									<kbd slot="value"
										>${`${Ee()}−`}</kbd
									></sp-menu-item
								>
								<sp-menu-divider></sp-menu-divider>
								<sp-menu-item
									@click=${()=>{o.zoom=1}}
									>100%<kbd slot="value"
										>${`${Ee()}1`}</kbd
									></sp-menu-item
								>
								<sp-menu-item
									@click=${()=>{o.zoom=2}}
									>200%<kbd slot="value"
										>${`${Ee()}2`}</kbd
									></sp-menu-item
								>
								<sp-menu-item
									@click=${()=>{window.dispatchEvent(new U("fit"))}}
									>${m.t("header.fitToScreen")}<kbd slot="value"
										>${`${Ee()}0`}</kbd
									></sp-menu-item
								>
								<sp-menu-item
									@click=${()=>{window.dispatchEvent(new U("fill"))}}
									>${m.t("header.fillScreen")}</sp-menu-item
								>
							</sp-action-menu>
							<sp-button
								variant="secondary"
								treatment="outline"
								@click=${async()=>{At(u`<psx-download-modal
											@download-click=${r=>{window.dispatchEvent(new ht({format:r.fileType}))}}
										></psx-download-modal>`,{type:"modal"},{coverSidePanel:!0}),y("trackEvent",{"event.workflow":"EXPORT","event.subcategory":"Export","event.type":"click","event.subtype":"export","event.value":"single","ui.view_type":"top-menu-bar"})}}
								>${m.t("header.downloadImage")}</sp-button
							>`)}
				<sp-button
					class=${o.editPanelDisabled?"":"premium"}
					@click=${()=>{if(o.editPanelDisabled){y("closeSidePanel",void 0);const{analytics:r}=ze();window.open(`https://photoshop.adobe.com/?sdid=${r.sdid}&mv=${r.mv}`,"_blank"),y("trackEvent",{"event.workflow":"INTEROPERABILITY","event.subcategory":"Photoshop Web","event.type":"click","event.subtype":"open-in-photoshop-web","ui.view_type":"top-menu-bar"})}else window.dispatchEvent(new ae),y("trackEvent",{"event.workflow":"INTEROPERABILITY","event.subcategory":"Photoshop Web","event.type":"click","event.subtype":"edit-in-photoshop-web","ui.view_type":"top-menu-bar"})}}
					>${o.editPanelDisabled?m.t("header.openPsWeb"):m.t("header.editInPsWeb")}</sp-button
				>
				<sp-divider vertical></sp-divider>
				<sp-action-button
					label="${m.t("header.learn")}"
					quiet
					@click=${()=>{window.open("https://helpx.adobe.com/photoshop/web/get-set-up/learn-the-basics/install-photoshop-browser-extension-and-open-image.html","_blank")}}
				>
					<sp-tooltip self-managed placement="bottom"
						>${m.t("header.learnTooltip")}</sp-tooltip
					>
					<sp-icon-lightbulb slot="icon"></sp-icon-lightbulb>
				</sp-action-button>
				<sp-action-button
					label="${m.t("header.options")}"
					quiet
					@click=${()=>{pa.runtime.openOptionsPage()}}
				>
					<sp-tooltip self-managed placement="bottom"
						>${m.t("header.optionsTooltip")}</sp-tooltip
					>
					<sp-icon-settings slot="icon"></sp-icon-settings>
				</sp-action-button>
			</div> `}};jt.styles=$`
		:host {
			display: flex;
			height: 56px;
			padding: 12px;
			box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
			box-sizing: border-box;

			--psx-premium-background-color: linear-gradient(
				135deg,
				#b539c8 0%,
				#7155fa 66%,
				#3b63fb 100%
			);
		}

		.premium {
			background: var(--psx-premium-background-color);
			background-origin: border-box;
		}

		#start {
			display: flex;
			align-items: center;
			gap: 8px;
			flex: 1;
		}

		#end {
			justify-self: flex-end;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			gap: 8px;
		}

		#brand {
			font-size: 16px;
			font-weight: 700;
		}

		#zoom-controls-label {
			display: flex;
			align-items: center;
			gap: 4px;
		}

		sp-action-menu {
			font-variant-numeric: tabular-nums;
		}

		kbd {
			font-family: var(--spectrum-default-font-family);
			letter-spacing: 0.2em;
		}
	`;jt=Ts([Q("psx-header")],jt);var Bs=Object.getOwnPropertyDescriptor,Ls=(r,e,t,a)=>{for(var i=a>1?void 0:a?Bs(e,t):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=s(i)||i);return i};let Rt=class extends Y{render(){return u`<sp-dialog-base open underlay>
			<div id="content">
				<sp-icon-layers size="xxl"></sp-icon-layers>
				<h1>${m.t("multiSelectOverlay.heading")}</h1>
				<p>${m.t("multiSelectOverlay.description")}</p>
			</div>
		</sp-dialog-base>`}};Rt.styles=$`
		:host {
			display: contents;
			--mod-underlay-background-color: rgba(255, 255, 255, 0.9);
			--mod-modal-background-color: transparent;
		}

		#content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	`;Rt=Ls([Q("psx-multi-select-overlay")],Rt);var Is=Object.defineProperty,Hs=Object.getOwnPropertyDescriptor,Hr=(r,e,t,a)=>{for(var i=a>1?void 0:a?Hs(e,t):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(i=(a?s(e,t,i):s(i))||i);return a&&i&&Is(e,t,i),i};let ct=class extends He{constructor(){super(...arguments),this.selectedImageId=null}async firstUpdated(){y("trackEvent",{"event.workflow":"LAUNCH","event.subcategory":"Load Page","event.type":"render","event.subtype":"chrome-extension-editor","event.value":"start"});const r=await Ve.count(),e=await Gt.getValue();this.selectedImageId=e??null,o.editPanelDisabled=r===0;let t;ta.watch(async a=>{a?{closeOverlay:t}=await At(u`<psx-multi-select-overlay></psx-multi-select-overlay>`,{type:"page"}):t?.()}),Gt.watch(a=>{this.selectedImageId=a,o.editPanelDisabled=this.selectedImageId===null}),o.sidePanelOpen=!!await Zt.getValue(),Zt.watch(a=>{o.sidePanelOpen=!!a,a||t?.()})}render(){return u`<psx-header></psx-header>
			<main>
				${this.selectedImageId===null?u`<div class="empty-state">
							<svg
								width="80"
								height="80"
								viewBox="0 0 54 54"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									d="M44.26 0H9.74C4.36075 0 0 4.36075 0 9.74V44.26C0 49.6393 4.36075 54 9.74 54H44.26C49.6393 54 54 49.6393 54 44.26V9.74C54 4.36075 49.6393 0 44.26 0Z"
									fill="#292929"
								/>
								<path
									d="M18.7398 14.4297C25.7698 14.4297 29.7298 17.7197 29.7298 23.2397C29.7298 29.6797 24.3598 32.2697 19.3298 32.2697H15.9298V39.2297H9.0498V14.4297H18.7498H18.7398ZM15.9298 20.3097V26.3797H18.9598C21.0698 26.3797 22.5498 25.5297 22.5498 23.3797C22.5498 21.4197 21.2898 20.3097 19.1098 20.3097H15.9298Z"
									fill="white"
								/>
								<path
									d="M31.4299 37.9995L31.4699 32.2595C33.4299 33.5595 36.1699 34.3695 38.0599 34.3695C39.3499 34.3695 39.9499 33.9995 39.9499 33.3295C39.9499 32.5895 39.1399 32.2895 37.5799 31.8095C34.5799 30.9195 31.2899 29.6995 31.2899 25.7795C31.2899 21.8595 34.5799 19.5595 39.3599 19.5595C41.6199 19.5595 43.4699 19.8895 45.0999 20.5995L45.0599 26.0795C43.7699 25.2995 41.2099 24.5995 39.5499 24.5995C38.3299 24.5995 37.8499 24.9695 37.8499 25.5295C37.8499 26.1995 38.4399 26.3795 40.2199 26.9395C43.6599 27.9795 46.5499 29.0895 46.5499 33.1195C46.5499 37.1495 43.3999 39.5595 38.4799 39.5595C35.8899 39.5595 33.4499 39.1195 31.4499 38.0095L31.4299 37.9995Z"
									fill="white"
								/>
							</svg>
							<h3>${m.t("emptyState.heading")}</h3>
							<p>${m.t("emptyState.hoverInstruction")}</p>
							<p>
								${m.t("emptyState.rightClickInstruction",[m.t("common.addToPsExt")])}
							</p>
						</div>`:u`<psx-canvas .imageId=${this.selectedImageId}></psx-canvas>`}
				<psx-edit-panel></psx-edit-panel>
				<div id="meta" class="popover">
					<sp-action-button
						quiet
						?selected=${o.sidePanelOpen}
						label=${o.sidePanelOpen?m.t("editor.closeSidePanel"):m.t("editor.openSidePanel")}
						@click=${()=>{o.sidePanelOpen?(o.sidePanelOpen=!1,y("closeSidePanel",void 0),y("trackEvent",{"event.workflow":"OPERATIONS","event.subcategory":"Side Panel","event.type":"click","event.subtype":"collapse","ui.view_type":"side-panel"})):(o.sidePanelOpen=!0,y("openSidePanel",void 0),y("trackEvent",{"event.workflow":"OPERATIONS","event.subcategory":"Side Panel","event.type":"click","event.subtype":"expand","ui.view_type":"side-panel"}))}}
						><sp-icon-view-grid slot="icon"></sp-icon-view-grid>
						<sp-tooltip self-managed placement="bottom"
							>${o.sidePanelOpen?m.t("editor.closeSidePanel"):m.t("editor.openSidePanel")}</sp-tooltip
						>
					</sp-action-button>
				</div>
			</main>
			<psx-toast></psx-toast>`}};ct.styles=$`
		:host {
			display: block;
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;

			--ue-header-background-color: white;
			--ue-header-padding-vertical: 8px;
			--ue-header-padding-horizontal: 8px;
			--ue-header-min-height-desktop: 56px;
		}

		main {
			flex: 1;
			display: flex;
			flex-direction: column;
			position: relative;
		}

		#thumbnails {
			box-sizing: border-box;
			display: flex;
			gap: 8px;
			background-color: var(--spectrum-gray-100);
			padding: 16px;
			overflow-x: auto;
			flex-shrink: 0;
		}

		.thumbnail-container {
			position: relative;
			height: 100px;
			width: 100px;
			user-select: none;
		}

		.thumbnail {
			box-sizing: border-box;
			object-fit: cover;
			height: 100px;
			width: 100px;
			border: 2px solid transparent;
			cursor: pointer;
		}

		.thumbnail-container:hover .thumbnail {
			border-color: grey;
		}

		.thumbnail.selected {
			border-color: black;
		}

		.remove {
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

		.popover {
			border-radius: 10px;
			padding: 8px;
			background: var(--spectrum-background-layer-2-color);
			box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.16);
		}

		#meta {
			position: absolute;
			top: 4px;
			right: 4px;
		}

		.empty-state {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100%;
			gap: 8px;
			text-align: center;
			color: var(--spectrum-neutral-content-color-default);
		}

		.empty-state svg {
			opacity: 0.4;
		}

		.empty-state h3 {
			margin: 8px 0;
			font-size: 18px;
			font-weight: 700;
		}

		.empty-state p {
			margin: 0;
			font-size: 16px;
			line-height: 1.5;
			max-width: 460px;
		}
	`;Hr([X()],ct.prototype,"selectedImageId",2);ct=Hr([Q("psx-editor")],ct);ra();
