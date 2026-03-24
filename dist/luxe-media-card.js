const L = globalThis, V = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, K = /* @__PURE__ */ Symbol(), tt = /* @__PURE__ */ new WeakMap();
let dt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== K) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (V && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = tt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && tt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Pt = (i) => new dt(typeof i == "string" ? i : i + "", void 0, K), pt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[o + 1], i[0]);
  return new dt(e, i, K);
}, Ot = (i, t) => {
  if (V) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), r = L.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, et = V ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Pt(e);
})(i) : i;
const { is: Mt, defineProperty: Tt, getOwnPropertyDescriptor: Ut, getOwnPropertyNames: Ht, getOwnPropertySymbols: Nt, getPrototypeOf: Rt } = Object, q = globalThis, it = q.trustedTypes, zt = it ? it.emptyScript : "", Lt = q.reactiveElementPolyfillSupport, P = (i, t) => i, j = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? zt : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, X = (i, t) => !Mt(i, t), st = { attribute: !0, type: String, converter: j, reflect: !1, useDefault: !1, hasChanged: X };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), q.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let x = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = st) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && Tt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: o } = Ut(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const c = r?.call(this);
      o?.call(this, n), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? st;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = Rt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, s = [...Ht(e), ...Nt(e)];
      for (const r of s) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, r] of e) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const r = this._$Eu(e, s);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s) e.unshift(et(r));
    } else t !== void 0 && e.push(et(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ot(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : j).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const o = s.getPropertyOptions(r), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : j;
      this._$Em = r;
      const c = n.fromAttribute(e, o.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, r = !1, o) {
    if (t !== void 0) {
      const n = this.constructor;
      if (r === !1 && (o = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? X)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: o }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, o] of s) {
        const { wrapped: n } = o, c = this[r];
        n !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, o, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[P("elementProperties")] = /* @__PURE__ */ new Map(), x[P("finalized")] = /* @__PURE__ */ new Map(), Lt?.({ ReactiveElement: x }), (q.reactiveElementVersions ??= []).push("2.1.2");
const Y = globalThis, rt = (i) => i, I = Y.trustedTypes, ot = I ? I.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, ut = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, ft = "?" + $, Dt = `<${ft}>`, w = document, O = () => w.createComment(""), M = (i) => i === null || typeof i != "object" && typeof i != "function", F = Array.isArray, jt = (i) => F(i) || typeof i?.[Symbol.iterator] == "function", B = `[ 	
\f\r]`, k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, nt = /-->/g, at = />/g, v = RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ct = /'/g, lt = /"/g, _t = /^(?:script|style|textarea|title)$/i, It = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), _ = It(1), E = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), ht = /* @__PURE__ */ new WeakMap(), b = w.createTreeWalker(w, 129);
function gt(i, t) {
  if (!F(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ot !== void 0 ? ot.createHTML(t) : t;
}
const qt = (i, t) => {
  const e = i.length - 1, s = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = k;
  for (let c = 0; c < e; c++) {
    const a = i[c];
    let d, p, l = -1, f = 0;
    for (; f < a.length && (n.lastIndex = f, p = n.exec(a), p !== null); ) f = n.lastIndex, n === k ? p[1] === "!--" ? n = nt : p[1] !== void 0 ? n = at : p[2] !== void 0 ? (_t.test(p[2]) && (r = RegExp("</" + p[2], "g")), n = v) : p[3] !== void 0 && (n = v) : n === v ? p[0] === ">" ? (n = r ?? k, l = -1) : p[1] === void 0 ? l = -2 : (l = n.lastIndex - p[2].length, d = p[1], n = p[3] === void 0 ? v : p[3] === '"' ? lt : ct) : n === lt || n === ct ? n = v : n === nt || n === at ? n = k : (n = v, r = void 0);
    const g = n === v && i[c + 1].startsWith("/>") ? " " : "";
    o += n === k ? a + Dt : l >= 0 ? (s.push(d), a.slice(0, l) + ut + a.slice(l) + $ + g) : a + $ + (l === -2 ? c : g);
  }
  return [gt(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class T {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const c = t.length - 1, a = this.parts, [d, p] = qt(t, e);
    if (this.el = T.createElement(d, s), b.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = b.nextNode()) !== null && a.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(ut)) {
          const f = p[n++], g = r.getAttribute(l).split($), z = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: o, name: z[2], strings: g, ctor: z[1] === "." ? Bt : z[1] === "?" ? Vt : z[1] === "@" ? Kt : W }), r.removeAttribute(l);
        } else l.startsWith($) && (a.push({ type: 6, index: o }), r.removeAttribute(l));
        if (_t.test(r.tagName)) {
          const l = r.textContent.split($), f = l.length - 1;
          if (f > 0) {
            r.textContent = I ? I.emptyScript : "";
            for (let g = 0; g < f; g++) r.append(l[g], O()), b.nextNode(), a.push({ type: 2, index: ++o });
            r.append(l[f], O());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ft) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = r.data.indexOf($, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += $.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = w.createElement("template");
    return s.innerHTML = t, s;
  }
}
function S(i, t, e = i, s) {
  if (t === E) return t;
  let r = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = M(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(i), r._$AT(i, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = r : e._$Cl = r), r !== void 0 && (t = S(i, r._$AS(i, t.values), r, s)), t;
}
class Wt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, r = (t?.creationScope ?? w).importNode(e, !0);
    b.currentNode = r;
    let o = b.nextNode(), n = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new N(o, o.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (d = new Xt(o, this, t)), this._$AV.push(d), a = s[++c];
      }
      n !== a?.index && (o = b.nextNode(), n++);
    }
    return b.currentNode = w, r;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class N {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, r) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = S(this, t, e), M(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : jt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = T.createElement(gt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const o = new Wt(r, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ht.get(t.strings);
    return e === void 0 && ht.set(t.strings, e = new T(t)), e;
  }
  k(t) {
    F(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const o of t) r === e.length ? e.push(s = new N(this.O(O()), this.O(O()), this, this.options)) : s = e[r], s._$AI(o), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = rt(t).nextSibling;
      rt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class W {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, r, o) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = h;
  }
  _$AI(t, e = this, s, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = S(this, t, e, 0), n = !M(t) || t !== this._$AH && t !== E, n && (this._$AH = t);
    else {
      const c = t;
      let a, d;
      for (t = o[0], a = 0; a < o.length - 1; a++) d = S(this, c[s + a], e, a), d === E && (d = this._$AH[a]), n ||= !M(d) || d !== this._$AH[a], d === h ? t = h : t !== h && (t += (d ?? "") + o[a + 1]), this._$AH[a] = d;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Bt extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Vt extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Kt extends W {
  constructor(t, e, s, r, o) {
    super(t, e, s, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? h) === E) return;
    const s = this._$AH, r = t === h && s !== h || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== h && (s === h || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Xt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const Yt = Y.litHtmlPolyfillSupport;
Yt?.(T, N), (Y.litHtmlVersions ??= []).push("3.3.2");
const Ft = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = r = new N(t.insertBefore(O(), o), o, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
const Z = globalThis;
class A extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ft(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return E;
  }
}
A._$litElement$ = !0, A.finalized = !0, Z.litElementHydrateSupport?.({ LitElement: A });
const Zt = Z.litElementPolyfillSupport;
Zt?.({ LitElement: A });
(Z.litElementVersions ??= []).push("4.2.2");
const $t = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
const Gt = { attribute: !0, type: String, converter: j, reflect: !1, hasChanged: X }, Jt = (i = Gt, t, e) => {
  const { kind: s, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(e.name, i), s === "accessor") {
    const { name: n } = e;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(n, a, i, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(n, void 0, i, c), c;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(c) {
      const a = this[n];
      t.call(this, c), this.requestUpdate(n, a, i, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function G(i) {
  return (t, e) => typeof e == "object" ? Jt(i, t, e) : ((s, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(i, t, e);
}
function mt(i) {
  return G({ ...i, state: !0, attribute: !1 });
}
const vt = 16, yt = 32, Qt = ["flat", "compact", "comfortable", "tall"], te = ["truncate", "scroll"], ee = (i) => {
  if (!i?.entity || !i.entity.startsWith("media_player."))
    throw new Error("Luxe Media Card requires a media_player entity.");
  const t = Qt.includes(i.height ?? "compact") ? i.height ?? "compact" : "compact", e = te.includes(i.text_overflow ?? "truncate") ? i.text_overflow ?? "truncate" : "truncate";
  return {
    entity: i.entity,
    height: t,
    show_skip_controls: i.show_skip_controls ?? !0,
    text_overflow: e
  };
}, ie = (i, t) => {
  if (!i)
    return !1;
  const e = (t & vt) !== 0, s = (t & yt) !== 0;
  return e || s;
};
var se = Object.defineProperty, re = Object.getOwnPropertyDescriptor, bt = (i) => {
  throw TypeError(i);
}, J = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? re(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && se(t, e, r), r;
}, oe = (i, t, e) => t.has(i) || bt("Cannot " + e), ne = (i, t, e) => t.has(i) ? bt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), m = (i, t, e) => (oe(i, t, "access private method"), e), u, wt, xt, At, Et, R;
let U = class extends A {
  constructor() {
    super(...arguments), ne(this, u), this._config = { entity: "" };
  }
  setConfig(i) {
    this._config = i;
  }
  render() {
    const i = Object.values(this.hass?.states ?? {}).filter(
      (t) => t.entity_id.startsWith("media_player.")
    );
    return _`
      <div class="editor">
        <label>
          Entity
          <select data-testid="entity-select" .value=${this._config.entity ?? ""} @change=${m(this, u, wt)}>
            <option value="">Select media player</option>
            ${i.map(
      (t) => _`<option value=${t.entity_id}>${t.attributes.friendly_name ?? t.entity_id}</option>`
    )}
          </select>
        </label>

        <label>
          Height
          <select data-testid="height-select" .value=${this._config.height ?? "compact"} @change=${m(this, u, xt)}>
            <option value="flat">Flat</option>
            <option value="compact">Compact</option>
            <option value="comfortable">Comfortable</option>
            <option value="tall">Tall</option>
          </select>
        </label>

        <label>
          Long text
          <select data-testid="text-overflow-select" .value=${this._config.text_overflow ?? "truncate"} @change=${m(this, u, At)}>
            <option value="truncate">Cut off</option>
            <option value="scroll">Scroll</option>
          </select>
        </label>

        <label class="checkbox">
          <input
            data-testid="skip-toggle"
            type="checkbox"
            .checked=${this._config.show_skip_controls ?? !0}
            @change=${m(this, u, Et)}
          />
          Show previous/next buttons when supported
        </label>
      </div>
    `;
  }
};
u = /* @__PURE__ */ new WeakSet();
wt = function(i) {
  m(this, u, R).call(this, { entity: i.target.value });
};
xt = function(i) {
  m(this, u, R).call(this, { height: i.target.value });
};
At = function(i) {
  m(this, u, R).call(this, { text_overflow: i.target.value });
};
Et = function(i) {
  m(this, u, R).call(this, { show_skip_controls: i.target.checked });
};
R = function(i) {
  this._config = {
    ...this._config,
    ...i
  }, this.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: !0,
      composed: !0
    })
  );
};
U.styles = pt`
    .editor {
      display: grid;
      gap: 12px;
      padding: 8px 0;
    }

    label {
      display: grid;
      gap: 6px;
      font-size: 0.95rem;
    }

    select,
    input[type='checkbox'] {
      font: inherit;
    }

    .checkbox {
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: 10px;
    }
  `;
J([
  G({ attribute: !1 })
], U.prototype, "hass", 2);
J([
  mt()
], U.prototype, "_config", 2);
U = J([
  $t("luxe-media-card-editor")
], U);
var ae = Object.defineProperty, ce = Object.getOwnPropertyDescriptor, St = (i) => {
  throw TypeError(i);
}, Q = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? ce(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && ae(t, e, r), r;
}, le = (i, t, e) => t.has(i) || St("Cannot " + e), he = (i, t, e) => t.has(i) ? St("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), C = (i, t, e) => (le(i, t, "access private method"), e), y, D, kt, Ct;
const de = {
  flat: "height-flat",
  compact: "height-compact",
  comfortable: "height-comfortable",
  tall: "height-tall"
};
let H = class extends A {
  constructor() {
    super(...arguments), he(this, y);
  }
  setConfig(i) {
    this._config = ee(i);
  }
  getCardSize() {
    return this._config ? this._config.height === "flat" ? 2 : this._config.height === "compact" ? 3 : this._config.height === "comfortable" ? 4 : 5 : 3;
  }
  static async getConfigElement() {
    return document.createElement("luxe-media-card-editor");
  }
  static getStubConfig() {
    return {
      entity: "media_player.example",
      height: "compact",
      show_skip_controls: !0,
      text_overflow: "truncate"
    };
  }
  render() {
    if (!this._config || !this.hass)
      return h;
    const i = this.hass.states[this._config.entity];
    if (!i)
      return _`<ha-card><div class="missing">Entity not found: ${this._config.entity}</div></ha-card>`;
    const t = C(this, y, kt).call(this, i), e = C(this, y, Ct).call(this, i), s = i.attributes.entity_picture, r = i.state, o = Number(i.attributes.supported_features ?? 0), n = ie(this._config.show_skip_controls, o), c = (o & vt) !== 0, a = (o & yt) !== 0, d = r === "playing" ? "Pause" : "Play", p = r === "playing" ? "mdi:pause" : "mdi:play", l = this._config.text_overflow;
    return _`
      <ha-card>
        <div class="card ${de[this._config.height]} ${l === "scroll" ? "text-scroll" : "text-truncate"}" data-state=${r}>
          <div class="artwork-shell" data-testid="artwork-shell">
            ${s ? _`<img data-testid="artwork" class="artwork" src="${s}" alt="Album artwork" />` : _`<div data-testid="placeholder" class="placeholder" aria-label="No artwork available">
                  <span class="placeholder-icon">♪</span>
                </div>`}
          </div>

          <div class="content">
            <div class="meta">
              <div class="text-row title-row" data-testid="title-row">
                <div data-testid="title" class="title ${l === "scroll" ? "marquee" : "truncate"}" title=${t}>
                  <span>${t}</span>
                </div>
              </div>
              ${e && e !== t ? _`<div class="text-row artist-row" data-testid="artist-row">
                    <div data-testid="artist" class="artist ${l === "scroll" ? "marquee" : "truncate"}" title=${e}>
                      <span>${e}</span>
                    </div>
                  </div>` : h}
            </div>

            <div class="controls" data-testid="controls">
              ${n && c ? _`<button data-testid="previous-button" class="icon-button" @click=${() => C(this, y, D).call(this, "media_previous_track")} aria-label="Previous track" title="Previous track"><ha-icon icon="mdi:skip-previous"></ha-icon></button>` : h}
              <button data-testid="play-pause-button" class="icon-button primary" @click=${() => C(this, y, D).call(this, "media_play_pause")} aria-label=${d} title=${d}><ha-icon icon=${p}></ha-icon></button>
              ${n && a ? _`<button data-testid="next-button" class="icon-button" @click=${() => C(this, y, D).call(this, "media_next_track")} aria-label="Next track" title="Next track"><ha-icon icon="mdi:skip-next"></ha-icon></button>` : h}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
y = /* @__PURE__ */ new WeakSet();
D = function(i) {
  !this.hass || !this._config || this.hass.callService("media_player", i, {
    entity_id: this._config.entity
  });
};
kt = function(i) {
  return i.attributes.media_title || i.attributes.friendly_name || i.entity_id;
};
Ct = function(i) {
  return i.attributes.media_artist || "";
};
H.styles = pt`
    :host {
      display: block;
    }

    ha-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--ha-card-background, var(--card-background-color));
      box-shadow: var(--ha-card-box-shadow, var(--shadow-elevation-2dp_-_box-shadow));
      border: var(--ha-card-border-width, 1px) solid var(--divider-color, rgba(127, 127, 127, 0.16));
    }

    .card {
      --card-padding: 16px;
      --luxe-surface: var(--ha-card-background, var(--card-background-color));
      --luxe-artwork-fallback: color-mix(in srgb, var(--secondary-background-color, var(--card-background-color, #2b2b2b)) 96%, var(--primary-text-color, #fff) 4%);
      --artwork-size: 156px;
      display: grid;
      grid-template-columns: var(--artwork-size) minmax(0, 1fr);
      gap: 0;
      min-width: 0;
      background: var(--luxe-surface);
      color: var(--primary-text-color);
    }

    .height-flat {
      --artwork-size: 120px;
      min-height: 120px;
    }

    .height-compact {
      --artwork-size: 156px;
      min-height: 156px;
    }

    .height-comfortable {
      --artwork-size: 196px;
      min-height: 196px;
    }

    .height-tall {
      --artwork-size: 244px;
      min-height: 244px;
    }

    .artwork-shell {
      position: relative;
      width: var(--artwork-size);
      height: var(--artwork-size);
      background: var(--secondary-background-color, var(--card-background-color));
      overflow: hidden;
      border-inline-end: 1px solid var(--divider-color, rgba(127, 127, 127, 0.16));
    }

    .artwork,
    .placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      object-fit: cover;
      aspect-ratio: 1 / 1;
    }

    .placeholder {
      background: var(--luxe-artwork-fallback);
      color: var(--secondary-text-color);
    }

    .placeholder-icon {
      font-size: clamp(2rem, 4vw, 3.2rem);
      line-height: 1;
    }

    .content {
      display: grid;
      grid-template-rows: 1fr auto;
      min-width: 0;
      padding: var(--card-padding);
      gap: 10px;
      align-items: stretch;
    }

    .meta {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      justify-content: center;
      min-height: 0;
    }

    .text-row {
      position: relative;
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
    }

    .title,
    .artist {
      display: inline-block;
      min-width: 0;
      max-width: 100%;
      text-align: left;
      vertical-align: top;
    }

    .truncate {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .marquee {
      overflow: hidden;
      white-space: nowrap;
    }

    .marquee > span {
      display: inline-block;
      padding-inline-end: 2rem;
      animation: luxe-marquee 12s linear infinite;
    }

    .marquee:hover > span {
      animation-play-state: paused;
    }

    .title {
      font-size: clamp(1.05rem, 2.3vw, 1.28rem);
      font-weight: 700;
      line-height: 1.18;
    }

    .artist {
      font-size: clamp(0.88rem, 1.7vw, 0.98rem);
      color: var(--secondary-text-color);
      line-height: 1.22;
    }

    .controls {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 10px;
      align-self: end;
    }

    .icon-button {
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.22));
      border-radius: 10px;
      width: 42px;
      height: 42px;
      cursor: pointer;
      background: color-mix(in srgb, var(--secondary-background-color, var(--card-background-color)) 96%, var(--primary-text-color) 4%);
      color: var(--primary-text-color);
      font-size: 1.1rem;
      transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
    }

    .icon-button:hover {
      background: color-mix(in srgb, var(--secondary-background-color, var(--card-background-color)) 92%, var(--primary-text-color) 8%);
      border-color: color-mix(in srgb, var(--divider-color, rgba(127, 127, 127, 0.22)) 70%, var(--primary-text-color) 30%);
      transform: translateY(-1px);
    }

    .icon-button:active {
      transform: translateY(0);
    }

    .icon-button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    .icon-button.primary {
      background: color-mix(in srgb, var(--secondary-background-color, var(--card-background-color)) 94%, var(--primary-text-color) 6%);
      border-color: var(--divider-color, rgba(127, 127, 127, 0.22));
      width: 46px;
      height: 46px;
      font-size: 1.2rem;
    }

    .icon-button ha-icon {
      display: inline-flex;
      --mdc-icon-size: 21px;
      color: currentColor;
    }

    .icon-button.primary ha-icon {
      --mdc-icon-size: 23px;
    }

    .missing {
      padding: 16px;
      color: var(--secondary-text-color);
    }

    @keyframes luxe-marquee {
      0%, 10% {
        transform: translateX(0);
      }
      90%, 100% {
        transform: translateX(calc(-100% + var(--artwork-size) * 0));
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .marquee > span {
        animation: none;
      }
    }

    @media (max-width: 420px) {
      .card {
        --artwork-size: 112px;
      }

      .content {
        --card-padding: 14px;
        gap: 8px;
      }

      .meta {
        gap: 1px;
      }

      .icon-button {
        width: 38px;
        height: 38px;
      }

      .icon-button.primary {
        width: 42px;
        height: 42px;
      }
    }
  `;
Q([
  G({ attribute: !1 })
], H.prototype, "hass", 2);
Q([
  mt()
], H.prototype, "_config", 2);
H = Q([
  $t("luxe-media-card")
], H);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "luxe-media-card",
  name: "Luxe Media Card",
  description: "Elegant now-playing card with artwork, metadata, and transport controls."
});
export {
  H as LuxeMediaCard
};
//# sourceMappingURL=luxe-media-card.js.map
