const z = globalThis, q = z.ShadowRoot && (z.ShadyCSS === void 0 || z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, K = /* @__PURE__ */ Symbol(), tt = /* @__PURE__ */ new WeakMap();
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
const Ct = (i) => new dt(typeof i == "string" ? i : i + "", void 0, K), pt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[o + 1], i[0]);
  return new dt(e, i, K);
}, Pt = (i, t) => {
  if (q) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), r = z.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, et = q ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Ct(e);
})(i) : i;
const { is: Ot, defineProperty: Mt, getOwnPropertyDescriptor: Ut, getOwnPropertyNames: Tt, getOwnPropertySymbols: Ht, getPrototypeOf: Nt } = Object, I = globalThis, it = I.trustedTypes, Rt = it ? it.emptyScript : "", zt = I.reactiveElementPolyfillSupport, P = (i, t) => i, D = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Rt : null;
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
} }, Y = (i, t) => !Ot(i, t), st = { attribute: !0, type: String, converter: D, reflect: !1, useDefault: !1, hasChanged: Y };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), I.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
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
      r !== void 0 && Mt(this.prototype, t, r);
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
    const t = Nt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, s = [...Tt(e), ...Ht(e)];
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
    return Pt(t, this.constructor.elementStyles), t;
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : D).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const o = s.getPropertyOptions(r), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : D;
      this._$Em = r;
      const c = n.fromAttribute(e, o.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, r = !1, o) {
    if (t !== void 0) {
      const n = this.constructor;
      if (r === !1 && (o = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? Y)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
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
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[P("elementProperties")] = /* @__PURE__ */ new Map(), x[P("finalized")] = /* @__PURE__ */ new Map(), zt?.({ ReactiveElement: x }), (I.reactiveElementVersions ??= []).push("2.1.2");
const Z = globalThis, rt = (i) => i, j = Z.trustedTypes, ot = j ? j.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, ut = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, ft = "?" + g, Lt = `<${ft}>`, b = document, O = () => b.createComment(""), M = (i) => i === null || typeof i != "object" && typeof i != "function", F = Array.isArray, Dt = (i) => F(i) || typeof i?.[Symbol.iterator] == "function", V = `[ 	
\f\r]`, k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, nt = /-->/g, at = />/g, m = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ct = /'/g, lt = /"/g, _t = /^(?:script|style|textarea|title)$/i, jt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), f = jt(1), E = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), ht = /* @__PURE__ */ new WeakMap(), y = b.createTreeWalker(b, 129);
function gt(i, t) {
  if (!F(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ot !== void 0 ? ot.createHTML(t) : t;
}
const It = (i, t) => {
  const e = i.length - 1, s = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = k;
  for (let c = 0; c < e; c++) {
    const a = i[c];
    let d, p, l = -1, u = 0;
    for (; u < a.length && (n.lastIndex = u, p = n.exec(a), p !== null); ) u = n.lastIndex, n === k ? p[1] === "!--" ? n = nt : p[1] !== void 0 ? n = at : p[2] !== void 0 ? (_t.test(p[2]) && (r = RegExp("</" + p[2], "g")), n = m) : p[3] !== void 0 && (n = m) : n === m ? p[0] === ">" ? (n = r ?? k, l = -1) : p[1] === void 0 ? l = -2 : (l = n.lastIndex - p[2].length, d = p[1], n = p[3] === void 0 ? m : p[3] === '"' ? lt : ct) : n === lt || n === ct ? n = m : n === nt || n === at ? n = k : (n = m, r = void 0);
    const _ = n === m && i[c + 1].startsWith("/>") ? " " : "";
    o += n === k ? a + Lt : l >= 0 ? (s.push(d), a.slice(0, l) + ut + a.slice(l) + g + _) : a + g + (l === -2 ? c : _);
  }
  return [gt(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class U {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const c = t.length - 1, a = this.parts, [d, p] = It(t, e);
    if (this.el = U.createElement(d, s), y.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = y.nextNode()) !== null && a.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(ut)) {
          const u = p[n++], _ = r.getAttribute(l).split(g), R = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: o, name: R[2], strings: _, ctor: R[1] === "." ? Bt : R[1] === "?" ? Vt : R[1] === "@" ? qt : W }), r.removeAttribute(l);
        } else l.startsWith(g) && (a.push({ type: 6, index: o }), r.removeAttribute(l));
        if (_t.test(r.tagName)) {
          const l = r.textContent.split(g), u = l.length - 1;
          if (u > 0) {
            r.textContent = j ? j.emptyScript : "";
            for (let _ = 0; _ < u; _++) r.append(l[_], O()), y.nextNode(), a.push({ type: 2, index: ++o });
            r.append(l[u], O());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ft) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = r.data.indexOf(g, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += g.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = b.createElement("template");
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
    const { el: { content: e }, parts: s } = this._$AD, r = (t?.creationScope ?? b).importNode(e, !0);
    y.currentNode = r;
    let o = y.nextNode(), n = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new N(o, o.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (d = new Kt(o, this, t)), this._$AV.push(d), a = s[++c];
      }
      n !== a?.index && (o = y.nextNode(), n++);
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
    t = S(this, t, e), M(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Dt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(b.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = U.createElement(gt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const o = new Wt(r, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ht.get(t.strings);
    return e === void 0 && ht.set(t.strings, e = new U(t)), e;
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
class qt extends W {
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
class Kt {
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
const Yt = Z.litHtmlPolyfillSupport;
Yt?.(U, N), (Z.litHtmlVersions ??= []).push("3.3.2");
const Zt = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = r = new N(t.insertBefore(O(), o), o, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
const G = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Zt(e, this.renderRoot, this.renderOptions);
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
A._$litElement$ = !0, A.finalized = !0, G.litElementHydrateSupport?.({ LitElement: A });
const Ft = G.litElementPolyfillSupport;
Ft?.({ LitElement: A });
(G.litElementVersions ??= []).push("4.2.2");
const $t = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
const Gt = { attribute: !0, type: String, converter: D, reflect: !1, hasChanged: Y }, Jt = (i = Gt, t, e) => {
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
function J(i) {
  return (t, e) => typeof e == "object" ? Jt(i, t, e) : ((s, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(i, t, e);
}
function mt(i) {
  return J({ ...i, state: !0, attribute: !1 });
}
const vt = 16, yt = 32, Xt = ["flat", "compact", "comfortable", "tall"], Qt = (i) => {
  if (!i?.entity || !i.entity.startsWith("media_player."))
    throw new Error("Luxe Media Card requires a media_player entity.");
  const t = Xt.includes(i.height ?? "compact") ? i.height ?? "compact" : "compact";
  return {
    entity: i.entity,
    height: t,
    show_skip_controls: i.show_skip_controls ?? !0
  };
}, te = (i, t) => {
  if (!i)
    return !1;
  const e = (t & vt) !== 0, s = (t & yt) !== 0;
  return e || s;
};
var ee = Object.defineProperty, ie = Object.getOwnPropertyDescriptor, bt = (i) => {
  throw TypeError(i);
}, X = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? ie(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && ee(t, e, r), r;
}, se = (i, t, e) => t.has(i) || bt("Cannot " + e), re = (i, t, e) => t.has(i) ? bt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), w = (i, t, e) => (se(i, t, "access private method"), e), $, xt, At, wt, B;
let T = class extends A {
  constructor() {
    super(...arguments), re(this, $), this._config = { entity: "" };
  }
  setConfig(i) {
    this._config = i;
  }
  render() {
    const i = Object.values(this.hass?.states ?? {}).filter(
      (t) => t.entity_id.startsWith("media_player.")
    );
    return f`
      <div class="editor">
        <label>
          Entity
          <select data-testid="entity-select" .value=${this._config.entity ?? ""} @change=${w(this, $, xt)}>
            <option value="">Select media player</option>
            ${i.map(
      (t) => f`<option value=${t.entity_id}>${t.attributes.friendly_name ?? t.entity_id}</option>`
    )}
          </select>
        </label>

        <label>
          Height
          <select data-testid="height-select" .value=${this._config.height ?? "compact"} @change=${w(this, $, At)}>
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
            @change=${w(this, $, wt)}
          />
          Show previous/next buttons when supported
        </label>
      </div>
    `;
  }
};
$ = /* @__PURE__ */ new WeakSet();
xt = function(i) {
  w(this, $, B).call(this, { entity: i.target.value });
};
At = function(i) {
  w(this, $, B).call(this, { height: i.target.value });
};
wt = function(i) {
  w(this, $, B).call(this, { show_skip_controls: i.target.checked });
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
var oe = Object.defineProperty, ne = Object.getOwnPropertyDescriptor, Et = (i) => {
  throw TypeError(i);
}, Q = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? ne(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && oe(t, e, r), r;
}, ae = (i, t, e) => t.has(i) || Et("Cannot " + e), ce = (i, t, e) => t.has(i) ? Et("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), C = (i, t, e) => (ae(i, t, "access private method"), e), v, L, St, kt;
const le = {
  flat: "height-flat",
  compact: "height-compact",
  comfortable: "height-comfortable",
  tall: "height-tall"
};
let H = class extends A {
  constructor() {
    super(...arguments), ce(this, v);
  }
  setConfig(i) {
    this._config = Qt(i);
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
      return h;
    const i = this.hass.states[this._config.entity];
    if (!i)
      return f`<ha-card><div class="missing">Entity not found: ${this._config.entity}</div></ha-card>`;
    const t = C(this, v, St).call(this, i), e = C(this, v, kt).call(this, i), s = i.attributes.entity_picture, r = i.state, o = Number(i.attributes.supported_features ?? 0), n = te(this._config.show_skip_controls, o), c = (o & vt) !== 0, a = (o & yt) !== 0, d = r === "playing" ? "Pause" : "Play", p = r === "playing" ? "mdi:pause" : "mdi:play";
    return f`
      <ha-card>
        <div class="card ${le[this._config.height]}" data-state=${r}>
          <div class="artwork-shell" data-testid="artwork-shell">
            ${s ? f`<img data-testid="artwork" class="artwork" src="${s}" alt="Album artwork" />` : f`<div data-testid="placeholder" class="placeholder" aria-label="No artwork available">
                  <span class="placeholder-icon">♪</span>
                </div>`}
          </div>

          <div class="content">
            <div class="meta">
              <div data-testid="title" class="title" title=${t}>${t}</div>
              ${e && e !== t ? f`<div data-testid="artist" class="artist" title=${e}>${e}</div>` : h}
            </div>

            <div class="controls" data-testid="controls">
              ${n && c ? f`<button data-testid="previous-button" class="icon-button" @click=${() => C(this, v, L).call(this, "media_previous_track")} aria-label="Previous track" title="Previous track"><ha-icon icon="mdi:skip-previous"></ha-icon></button>` : h}
              <button data-testid="play-pause-button" class="icon-button primary" @click=${() => C(this, v, L).call(this, "media_play_pause")} aria-label=${d} title=${d}><ha-icon icon=${p}></ha-icon></button>
              ${n && a ? f`<button data-testid="next-button" class="icon-button" @click=${() => C(this, v, L).call(this, "media_next_track")} aria-label="Next track" title="Next track"><ha-icon icon="mdi:skip-next"></ha-icon></button>` : h}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
v = /* @__PURE__ */ new WeakSet();
L = function(i) {
  !this.hass || !this._config || this.hass.callService("media_player", i, {
    entity_id: this._config.entity
  });
};
St = function(i) {
  return i.attributes.media_title || i.attributes.friendly_name || i.entity_id;
};
kt = function(i) {
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
      --luxe-surface-playing: color-mix(in srgb, var(--ha-card-background, var(--card-background-color)) 90%, var(--state-icon-active-color, var(--primary-color, #03a9f4)) 10%);
      --luxe-artwork-fallback: color-mix(in srgb, var(--secondary-background-color, var(--card-background-color, #2b2b2b)) 92%, var(--primary-color, #03a9f4) 8%);
      --artwork-size: 156px;
      display: grid;
      grid-template-columns: var(--artwork-size) minmax(0, 1fr);
      gap: 0;
      min-width: 0;
      background: var(--luxe-surface);
      color: var(--primary-text-color);
    }

    .card[data-state='playing'] {
      background: var(--luxe-surface-playing);
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
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-width: 0;
      padding: var(--card-padding);
      gap: 12px;
    }

    .meta {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
      margin-top: auto;
      justify-content: center;
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
      font-size: clamp(1.05rem, 2.3vw, 1.28rem);
      font-weight: 700;
      line-height: 1.18;
      -webkit-line-clamp: 2;
    }

    .artist {
      font-size: clamp(0.88rem, 1.7vw, 0.98rem);
      color: var(--secondary-text-color);
      line-height: 1.22;
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
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.22));
      border-radius: 10px;
      width: 40px;
      height: 40px;
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
      background: color-mix(in srgb, var(--primary-color, #03a9f4) 14%, var(--secondary-background-color, var(--card-background-color)) 86%);
      border-color: color-mix(in srgb, var(--primary-color, #03a9f4) 40%, var(--divider-color, rgba(127, 127, 127, 0.22)) 60%);
      width: 44px;
      height: 44px;
      font-size: 1.2rem;
    }

    .icon-button ha-icon {
      display: inline-flex;
      --mdc-icon-size: 20px;
      color: currentColor;
    }

    .icon-button.primary ha-icon {
      --mdc-icon-size: 22px;
    }

    .missing {
      padding: 16px;
      color: var(--secondary-text-color);
    }

    @media (max-width: 420px) {
      .card {
        --artwork-size: 112px;
      }

      .content {
        --card-padding: 14px;
        gap: 10px;
      }

      .icon-button {
        width: 36px;
        height: 36px;
      }

      .icon-button.primary {
        width: 40px;
        height: 40px;
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
