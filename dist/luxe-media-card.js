const L = globalThis, q = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, K = /* @__PURE__ */ Symbol(), tt = /* @__PURE__ */ new WeakMap();
let dt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== K) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (q && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = tt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && tt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const kt = (i) => new dt(typeof i == "string" ? i : i + "", void 0, K), pt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[n + 1], i[0]);
  return new dt(e, i, K);
}, Ot = (i, t) => {
  if (q) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), r = L.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, et = q ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return kt(e);
})(i) : i;
const { is: Mt, defineProperty: Ut, getOwnPropertyDescriptor: Tt, getOwnPropertyNames: Ht, getOwnPropertySymbols: Nt, getPrototypeOf: Rt } = Object, I = globalThis, it = I.trustedTypes, Lt = it ? it.emptyScript : "", zt = I.reactiveElementPolyfillSupport, k = (i, t) => i, D = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Lt : null;
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
} }, Y = (i, t) => !Mt(i, t), st = { attribute: !0, type: String, converter: D, reflect: !1, useDefault: !1, hasChanged: Y };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), I.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let w = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = st) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && Ut(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: n } = Tt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: r, set(o) {
      const h = r?.call(this);
      n?.call(this, o), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? st;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const t = Rt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
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
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : D).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : D;
      this._$Em = r;
      const h = o.fromAttribute(e, n.type);
      this[r] = h ?? this._$Ej?.get(r) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, r = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? Y)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: o } = n, h = this[r];
        o !== !0 || this._$AL.has(r) || h === void 0 || this.C(r, void 0, n, h);
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[k("elementProperties")] = /* @__PURE__ */ new Map(), w[k("finalized")] = /* @__PURE__ */ new Map(), zt?.({ ReactiveElement: w }), (I.reactiveElementVersions ??= []).push("2.1.2");
const Z = globalThis, rt = (i) => i, j = Z.trustedTypes, nt = j ? j.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, ut = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, ft = "?" + $, Dt = `<${ft}>`, b = document, O = () => b.createComment(""), M = (i) => i === null || typeof i != "object" && typeof i != "function", F = Array.isArray, jt = (i) => F(i) || typeof i?.[Symbol.iterator] == "function", V = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ot = /-->/g, at = />/g, v = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ht = /'/g, lt = /"/g, _t = /^(?:script|style|textarea|title)$/i, It = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), g = It(1), S = /* @__PURE__ */ Symbol.for("lit-noChange"), d = /* @__PURE__ */ Symbol.for("lit-nothing"), ct = /* @__PURE__ */ new WeakMap(), y = b.createTreeWalker(b, 129);
function gt(i, t) {
  if (!F(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return nt !== void 0 ? nt.createHTML(t) : t;
}
const Wt = (i, t) => {
  const e = i.length - 1, s = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = P;
  for (let h = 0; h < e; h++) {
    const a = i[h];
    let c, p, l = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, p = o.exec(a), p !== null); ) u = o.lastIndex, o === P ? p[1] === "!--" ? o = ot : p[1] !== void 0 ? o = at : p[2] !== void 0 ? (_t.test(p[2]) && (r = RegExp("</" + p[2], "g")), o = v) : p[3] !== void 0 && (o = v) : o === v ? p[0] === ">" ? (o = r ?? P, l = -1) : p[1] === void 0 ? l = -2 : (l = o.lastIndex - p[2].length, c = p[1], o = p[3] === void 0 ? v : p[3] === '"' ? lt : ht) : o === lt || o === ht ? o = v : o === ot || o === at ? o = P : (o = v, r = void 0);
    const f = o === v && i[h + 1].startsWith("/>") ? " " : "";
    n += o === P ? a + Dt : l >= 0 ? (s.push(c), a.slice(0, l) + ut + a.slice(l) + $ + f) : a + $ + (l === -2 ? h : f);
  }
  return [gt(i, n + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class U {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const h = t.length - 1, a = this.parts, [c, p] = Wt(t, e);
    if (this.el = U.createElement(c, s), y.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = y.nextNode()) !== null && a.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(ut)) {
          const u = p[o++], f = r.getAttribute(l).split($), R = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: n, name: R[2], strings: f, ctor: R[1] === "." ? Vt : R[1] === "?" ? qt : R[1] === "@" ? Kt : W }), r.removeAttribute(l);
        } else l.startsWith($) && (a.push({ type: 6, index: n }), r.removeAttribute(l));
        if (_t.test(r.tagName)) {
          const l = r.textContent.split($), u = l.length - 1;
          if (u > 0) {
            r.textContent = j ? j.emptyScript : "";
            for (let f = 0; f < u; f++) r.append(l[f], O()), y.nextNode(), a.push({ type: 2, index: ++n });
            r.append(l[u], O());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ft) a.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = r.data.indexOf($, l + 1)) !== -1; ) a.push({ type: 7, index: n }), l += $.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = b.createElement("template");
    return s.innerHTML = t, s;
  }
}
function C(i, t, e = i, s) {
  if (t === S) return t;
  let r = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = M(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(i), r._$AT(i, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = r : e._$Cl = r), r !== void 0 && (t = C(i, r._$AS(i, t.values), r, s)), t;
}
class Bt {
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
    const { el: { content: e }, parts: s } = this._$AD, r = (t?.creationScope ?? b).importNode(e, !0);
    y.currentNode = r;
    let n = y.nextNode(), o = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new N(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new Yt(n, this, t)), this._$AV.push(c), a = s[++h];
      }
      o !== a?.index && (n = y.nextNode(), o++);
    }
    return y.currentNode = b, r;
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
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = C(this, t, e), M(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : jt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(b.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = U.createElement(gt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const n = new Bt(r, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ct.get(t.strings);
    return e === void 0 && ct.set(t.strings, e = new U(t)), e;
  }
  k(t) {
    F(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const n of t) r === e.length ? e.push(s = new N(this.O(O()), this.O(O()), this, this.options)) : s = e[r], s._$AI(n), r++;
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
  constructor(t, e, s, r, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = C(this, t, e, 0), o = !M(t) || t !== this._$AH && t !== S, o && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = C(this, h[s + a], e, a), c === S && (c = this._$AH[a]), o ||= !M(c) || c !== this._$AH[a], c === d ? t = d : t !== d && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Vt extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class qt extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Kt extends W {
  constructor(t, e, s, r, n) {
    super(t, e, s, r, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? d) === S) return;
    const s = this._$AH, r = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== d && (s === d || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Yt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const Zt = Z.litHtmlPolyfillSupport;
Zt?.(U, N), (Z.litHtmlVersions ??= []).push("3.3.2");
const Ft = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = r = new N(t.insertBefore(O(), n), n, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
const G = globalThis;
class x extends w {
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
    return S;
  }
}
x._$litElement$ = !0, x.finalized = !0, G.litElementHydrateSupport?.({ LitElement: x });
const Gt = G.litElementPolyfillSupport;
Gt?.({ LitElement: x });
(G.litElementVersions ??= []).push("4.2.2");
const $t = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
const Jt = { attribute: !0, type: String, converter: D, reflect: !1, hasChanged: Y }, Xt = (i = Jt, t, e) => {
  const { kind: s, metadata: r } = e;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), n.set(e.name, i), s === "accessor") {
    const { name: o } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(o, a, i, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(o, void 0, i, h), h;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(h) {
      const a = this[o];
      t.call(this, h), this.requestUpdate(o, a, i, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function J(i) {
  return (t, e) => typeof e == "object" ? Xt(i, t, e) : ((s, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(i, t, e);
}
function mt(i) {
  return J({ ...i, state: !0, attribute: !1 });
}
const vt = 16, yt = 32, Qt = ["flat", "compact", "comfortable", "tall"], te = (i) => {
  if (!i?.entity || !i.entity.startsWith("media_player."))
    throw new Error("Luxe Media Card requires a media_player entity.");
  const t = Qt.includes(i.height ?? "compact") ? i.height ?? "compact" : "compact";
  return {
    entity: i.entity,
    height: t,
    show_skip_controls: i.show_skip_controls ?? !0
  };
}, ee = (i, t) => {
  if (!i)
    return !1;
  const e = (t & vt) !== 0, s = (t & yt) !== 0;
  return e || s;
};
var ie = Object.defineProperty, se = Object.getOwnPropertyDescriptor, bt = (i) => {
  throw TypeError(i);
}, X = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? se(t, e) : t, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = (s ? o(t, e, r) : o(r)) || r);
  return s && r && ie(t, e, r), r;
}, re = (i, t, e) => t.has(i) || bt("Cannot " + e), ne = (i, t, e) => t.has(i) ? bt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), E = (i, t, e) => (re(i, t, "access private method"), e), m, At, wt, xt, B;
let T = class extends x {
  constructor() {
    super(...arguments), ne(this, m), this._config = { entity: "" };
  }
  setConfig(i) {
    this._config = i;
  }
  render() {
    const i = Object.values(this.hass?.states ?? {}).filter(
      (t) => t.entity_id.startsWith("media_player.")
    );
    return g`
      <div class="editor">
        <label>
          Entity
          <select data-testid="entity-select" .value=${this._config.entity ?? ""} @change=${E(this, m, At)}>
            <option value="">Select media player</option>
            ${i.map(
      (t) => g`<option value=${t.entity_id}>${t.attributes.friendly_name ?? t.entity_id}</option>`
    )}
          </select>
        </label>

        <label>
          Height
          <select data-testid="height-select" .value=${this._config.height ?? "compact"} @change=${E(this, m, wt)}>
            <option value="flat">Flat</option>
            <option value="compact">Compact</option>
            <option value="comfortable">Comfortable</option>
            <option value="tall">Tall</option>
          </select>
        </label>

        <label class="checkbox">
          <input
            data-testid="skip-toggle"
            type="checkbox"
            .checked=${this._config.show_skip_controls ?? !0}
            @change=${E(this, m, xt)}
          />
          Show previous/next buttons when supported
        </label>
      </div>
    `;
  }
};
m = /* @__PURE__ */ new WeakSet();
At = function(i) {
  E(this, m, B).call(this, { entity: i.target.value });
};
wt = function(i) {
  E(this, m, B).call(this, { height: i.target.value });
};
xt = function(i) {
  E(this, m, B).call(this, { show_skip_controls: i.target.checked });
};
B = function(i) {
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
T.styles = pt`
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
X([
  J({ attribute: !1 })
], T.prototype, "hass", 2);
X([
  mt()
], T.prototype, "_config", 2);
T = X([
  $t("luxe-media-card-editor")
], T);
var oe = Object.defineProperty, ae = Object.getOwnPropertyDescriptor, Et = (i) => {
  throw TypeError(i);
}, Q = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? ae(t, e) : t, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = (s ? o(t, e, r) : o(r)) || r);
  return s && r && oe(t, e, r), r;
}, he = (i, t, e) => t.has(i) || Et("Cannot " + e), le = (i, t, e) => t.has(i) ? Et("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), A = (i, t, e) => (he(i, t, "access private method"), e), _, z, St, Ct, Pt;
const ce = {
  flat: "height-flat",
  compact: "height-compact",
  comfortable: "height-comfortable",
  tall: "height-tall"
};
let H = class extends x {
  constructor() {
    super(...arguments), le(this, _);
  }
  setConfig(i) {
    this._config = te(i);
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
      show_skip_controls: !0
    };
  }
  render() {
    if (!this._config || !this.hass)
      return d;
    const i = this.hass.states[this._config.entity];
    if (!i)
      return g`<ha-card><div class="missing">Entity not found: ${this._config.entity}</div></ha-card>`;
    const t = A(this, _, St).call(this, i), e = A(this, _, Ct).call(this, i), s = i.attributes.entity_picture, r = i.state, n = Number(i.attributes.supported_features ?? 0), o = ee(this._config.show_skip_controls, n), h = (n & vt) !== 0, a = (n & yt) !== 0, c = r === "playing" ? "Pause" : "Play";
    return g`
      <ha-card>
        <div class="card ${ce[this._config.height]}" data-state=${r}>
          <div class="artwork-shell" data-testid="artwork-shell">
            ${s ? g`<img data-testid="artwork" class="artwork" src="${s}" alt="Album artwork" />` : g`<div data-testid="placeholder" class="placeholder" aria-label="No artwork available">
                  <span class="placeholder-icon">♪</span>
                </div>`}
          </div>

          <div class="content">
            <div class="meta">
              <div class="eyebrow">${A(this, _, Pt).call(this, r)}</div>
              <div data-testid="title" class="title" title=${t}>${t}</div>
              <div data-testid="artist" class="artist" title=${e}>${e}</div>
            </div>

            <div class="controls" data-testid="controls">
              ${o && h ? g`<button data-testid="previous-button" class="icon-button" @click=${() => A(this, _, z).call(this, "media_previous_track")} aria-label="Previous track" title="Previous track">⏮</button>` : d}
              <button data-testid="play-pause-button" class="icon-button primary" @click=${() => A(this, _, z).call(this, "media_play_pause")} aria-label=${c} title=${c}>${r === "playing" ? "⏸" : "▶"}</button>
              ${o && a ? g`<button data-testid="next-button" class="icon-button" @click=${() => A(this, _, z).call(this, "media_next_track")} aria-label="Next track" title="Next track">⏭</button>` : d}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
_ = /* @__PURE__ */ new WeakSet();
z = function(i) {
  !this.hass || !this._config || this.hass.callService("media_player", i, {
    entity_id: this._config.entity
  });
};
St = function(i) {
  return i.attributes.media_title || i.attributes.friendly_name || i.entity_id;
};
Ct = function(i) {
  return i.attributes.media_artist || i.state;
};
Pt = function(i) {
  return i.replace(/_/g, " ");
};
H.styles = pt`
    :host {
      display: block;
    }

    ha-card {
      overflow: hidden;
      border-radius: 20px;
      background: var(--ha-card-background, var(--card-background-color, #1f2430));
      box-shadow: var(--ha-card-box-shadow, none);
    }

    .card {
      --card-padding: 18px;
      display: grid;
      grid-template-columns: clamp(108px, 32%, 168px) minmax(0, 1fr);
      gap: 0;
      min-width: 0;
      background:
        radial-gradient(circle at top left, rgba(255, 255, 255, 0.08), transparent 42%),
        linear-gradient(135deg, rgba(20, 24, 32, 0.96), rgba(36, 44, 58, 0.96));
      color: var(--primary-text-color, white);
    }

    .card[data-state='playing'] {
      background:
        radial-gradient(circle at top left, rgba(120, 180, 255, 0.18), transparent 40%),
        linear-gradient(135deg, rgba(20, 24, 32, 0.96), rgba(36, 44, 58, 0.98));
    }

    .height-flat { min-height: 120px; }
    .height-compact { min-height: 156px; }
    .height-comfortable { min-height: 196px; }
    .height-tall { min-height: 244px; }

    .artwork-shell {
      position: relative;
      min-height: 100%;
      background: rgba(255, 255, 255, 0.06);
      overflow: hidden;
    }

    .artwork-shell::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent 70%, rgba(0, 0, 0, 0.18));
      pointer-events: none;
    }

    .artwork,
    .placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      object-fit: cover;
      min-height: inherit;
    }

    .placeholder {
      background:
        radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.16), transparent 20%),
        linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.14));
      color: rgba(255, 255, 255, 0.82);
    }

    .placeholder-icon {
      font-size: clamp(2rem, 4vw, 3.2rem);
      line-height: 1;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-width: 0;
      padding: var(--card-padding) var(--card-padding) 14px var(--card-padding);
      gap: 14px;
    }

    .meta {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
      margin-top: auto;
    }

    .eyebrow {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
      opacity: 0.92;
    }

    .title,
    .artist {
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      word-break: break-word;
    }

    .title {
      font-size: clamp(1rem, 2.2vw, 1.2rem);
      font-weight: 700;
      line-height: 1.2;
      -webkit-line-clamp: 2;
    }

    .artist {
      font-size: clamp(0.9rem, 1.8vw, 1rem);
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.76));
      line-height: 1.25;
      -webkit-line-clamp: 2;
    }

    .controls {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: auto;
    }

    .icon-button {
      border: 0;
      border-radius: 999px;
      width: 42px;
      height: 42px;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.12);
      color: inherit;
      font-size: 1.1rem;
      backdrop-filter: blur(8px);
      transition: transform 120ms ease, background 120ms ease, opacity 120ms ease;
    }

    .icon-button:hover {
      background: rgba(255, 255, 255, 0.18);
      transform: translateY(-1px);
    }

    .icon-button:active {
      transform: translateY(0);
    }

    .icon-button:focus-visible {
      outline: 2px solid rgba(255, 255, 255, 0.72);
      outline-offset: 2px;
    }

    .icon-button.primary {
      background: rgba(255, 255, 255, 0.24);
      width: 48px;
      height: 48px;
      font-size: 1.2rem;
    }

    .missing {
      padding: 16px;
      color: var(--secondary-text-color);
    }

    @media (max-width: 420px) {
      .card {
        grid-template-columns: 112px minmax(0, 1fr);
      }

      .content {
        --card-padding: 14px;
        gap: 10px;
      }

      .icon-button {
        width: 38px;
        height: 38px;
      }

      .icon-button.primary {
        width: 44px;
        height: 44px;
      }
    }
  `;
Q([
  J({ attribute: !1 })
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
