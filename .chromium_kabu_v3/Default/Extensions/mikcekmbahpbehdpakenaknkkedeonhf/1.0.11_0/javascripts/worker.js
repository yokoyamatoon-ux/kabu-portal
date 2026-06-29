/*! For license information please see worker.js.LICENSE.txt */
(() => {
    "use strict";
    var e = {
        17: (e, t, n) => {
            var a = n(408), i = Object.freeze({
                Text: "Text",
                NumericLiteral: "NumericLiteral",
                StringLiteral: "StringLiteral",
                Identifier: "Identifier",
                Equals: "Equals",
                OpenParen: "OpenParen",
                CloseParen: "CloseParen",
                OpenStatement: "OpenStatement",
                CloseStatement: "CloseStatement",
                OpenExpression: "OpenExpression",
                CloseExpression: "CloseExpression",
                OpenSquareBracket: "OpenSquareBracket",
                CloseSquareBracket: "CloseSquareBracket",
                OpenCurlyBracket: "OpenCurlyBracket",
                CloseCurlyBracket: "CloseCurlyBracket",
                Comma: "Comma",
                Dot: "Dot",
                Colon: "Colon",
                Pipe: "Pipe",
                CallOperator: "CallOperator",
                AdditiveBinaryOperator: "AdditiveBinaryOperator",
                MultiplicativeBinaryOperator: "MultiplicativeBinaryOperator",
                ComparisonBinaryOperator: "ComparisonBinaryOperator",
                UnaryOperator: "UnaryOperator",
                Comment: "Comment"
            }), o = class {
                constructor(e, t) {
                    this.value = e, this.type = t;
                }
            };
            function r(e) {
                return /\w/.test(e);
            }
            function s(e) {
                return /[0-9]/.test(e);
            }
            function l(e) {
                return /\s/.test(e);
            }
            var c = [ [ "{%", i.OpenStatement ], [ "%}", i.CloseStatement ], [ "{{", i.OpenExpression ], [ "}}", i.CloseExpression ], [ "(", i.OpenParen ], [ ")", i.CloseParen ], [ "{", i.OpenCurlyBracket ], [ "}", i.CloseCurlyBracket ], [ "[", i.OpenSquareBracket ], [ "]", i.CloseSquareBracket ], [ ",", i.Comma ], [ ".", i.Dot ], [ ":", i.Colon ], [ "|", i.Pipe ], [ "<=", i.ComparisonBinaryOperator ], [ ">=", i.ComparisonBinaryOperator ], [ "==", i.ComparisonBinaryOperator ], [ "!=", i.ComparisonBinaryOperator ], [ "<", i.ComparisonBinaryOperator ], [ ">", i.ComparisonBinaryOperator ], [ "+", i.AdditiveBinaryOperator ], [ "-", i.AdditiveBinaryOperator ], [ "~", i.AdditiveBinaryOperator ], [ "*", i.MultiplicativeBinaryOperator ], [ "/", i.MultiplicativeBinaryOperator ], [ "%", i.MultiplicativeBinaryOperator ], [ "=", i.Equals ] ], p = new Map([ [ "n", "\n" ], [ "t", "\t" ], [ "r", "\r" ], [ "b", "\b" ], [ "f", "\f" ], [ "v", "\v" ], [ "'", "'" ], [ '"', '"' ], [ "\\", "\\" ] ]), d = class {
                type="Statement";
            }, u = class extends d {
                constructor(e) {
                    super(), this.body = e;
                }
                type="Program";
            }, m = class extends d {
                constructor(e, t, n) {
                    super(), this.test = e, this.body = t, this.alternate = n;
                }
                type="If";
            }, f = class extends d {
                constructor(e, t, n, a) {
                    super(), this.loopvar = e, this.iterable = t, this.body = n, this.defaultBlock = a;
                }
                type="For";
            }, h = class extends d {
                type="Break";
            }, g = class extends d {
                type="Continue";
            }, y = class extends d {
                constructor(e, t, n) {
                    super(), this.assignee = e, this.value = t, this.body = n;
                }
                type="Set";
            }, b = class extends d {
                constructor(e, t, n) {
                    super(), this.name = e, this.args = t, this.body = n;
                }
                type="Macro";
            }, w = class extends d {
                constructor(e) {
                    super(), this.value = e;
                }
                type="Comment";
            }, v = class extends d {
                type="Expression";
            }, x = class extends v {
                constructor(e, t, n) {
                    super(), this.object = e, this.property = t, this.computed = n;
                }
                type="MemberExpression";
            }, _ = class extends v {
                constructor(e, t) {
                    super(), this.callee = e, this.args = t;
                }
                type="CallExpression";
            }, k = class extends v {
                constructor(e) {
                    super(), this.value = e;
                }
                type="Identifier";
            }, A = class extends v {
                constructor(e) {
                    super(), this.value = e;
                }
                type="Literal";
            }, S = class extends A {
                type="IntegerLiteral";
            }, T = class extends A {
                type="FloatLiteral";
            }, I = class extends A {
                type="StringLiteral";
            }, E = class extends A {
                type="ArrayLiteral";
            }, M = class extends A {
                type="TupleLiteral";
            }, C = class extends A {
                type="ObjectLiteral";
            }, j = class extends v {
                constructor(e, t, n) {
                    super(), this.operator = e, this.left = t, this.right = n;
                }
                type="BinaryExpression";
            }, L = class extends v {
                constructor(e, t) {
                    super(), this.operand = e, this.filter = t;
                }
                type="FilterExpression";
            }, U = class extends d {
                constructor(e, t) {
                    super(), this.filter = e, this.body = t;
                }
                type="FilterStatement";
            }, O = class extends v {
                constructor(e, t) {
                    super(), this.lhs = e, this.test = t;
                }
                type="SelectExpression";
            }, $ = class extends v {
                constructor(e, t, n) {
                    super(), this.operand = e, this.negate = t, this.test = n;
                }
                type="TestExpression";
            }, P = class extends v {
                constructor(e, t) {
                    super(), this.operator = e, this.argument = t;
                }
                type="UnaryExpression";
            }, R = class extends v {
                constructor(e, t, n) {
                    super(), this.start = e, this.stop = t, this.step = n;
                }
                type="SliceExpression";
            }, D = class extends v {
                constructor(e, t) {
                    super(), this.key = e, this.value = t;
                }
                type="KeywordArgumentExpression";
            }, N = class extends v {
                constructor(e) {
                    super(), this.argument = e;
                }
                type="SpreadExpression";
            }, q = class extends d {
                constructor(e, t, n) {
                    super(), this.call = e, this.callerArgs = t, this.body = n;
                }
                type="CallStatement";
            }, z = class extends v {
                constructor(e, t, n) {
                    super(), this.condition = e, this.trueExpr = t, this.falseExpr = n;
                }
                type="Ternary";
            };
            function B(e) {
                const t = new u([]);
                let n = 0;
                function a(t, a) {
                    const i = e[n++];
                    if (!i || i.type !== t) throw new Error(`Parser Error: ${a}. ${i.type} !== ${t}.`);
                    return i;
                }
                function r(e) {
                    if (!p(e)) throw new SyntaxError(`Expected ${e}`);
                    ++n;
                }
                function s() {
                    switch (e[n].type) {
                      case i.Comment:
                        return new w(e[n++].value);

                      case i.Text:
                        return new I(a(i.Text, "Expected text token").value);

                      case i.OpenStatement:
                        return function() {
                            if (a(i.OpenStatement, "Expected opening statement token"), e[n].type !== i.Identifier) throw new SyntaxError(`Unknown statement, got ${e[n].type}`);
                            const t = e[n].value;
                            let o;
                            switch (t) {
                              case "set":
                                ++n, o = function() {
                                    const e = v();
                                    let t = null;
                                    const o = [];
                                    if (l(i.Equals)) ++n, t = v(); else {
                                        for (a(i.CloseStatement, "Expected %} token"); !c("endset"); ) o.push(s());
                                        a(i.OpenStatement, "Expected {% token"), r("endset");
                                    }
                                    return a(i.CloseStatement, "Expected closing statement token"), new y(e, t, o);
                                }();
                                break;

                              case "if":
                                ++n, o = d(), a(i.OpenStatement, "Expected {% token"), r("endif"), a(i.CloseStatement, "Expected %} token");
                                break;

                              case "macro":
                                ++n, o = function() {
                                    const e = Z();
                                    if ("Identifier" !== e.type) throw new SyntaxError("Expected identifier following macro statement");
                                    const t = W();
                                    a(i.CloseStatement, "Expected closing statement token");
                                    const n = [];
                                    for (;!c("endmacro"); ) n.push(s());
                                    return new b(e, t, n);
                                }(), a(i.OpenStatement, "Expected {% token"), r("endmacro"), a(i.CloseStatement, "Expected %} token");
                                break;

                              case "for":
                                ++n, o = function() {
                                    const e = v(!0);
                                    if (!(e instanceof k || e instanceof M)) throw new SyntaxError(`Expected identifier/tuple for the loop variable, got ${e.type} instead`);
                                    if (!p("in")) throw new SyntaxError("Expected `in` keyword following loop variable");
                                    ++n;
                                    const t = A();
                                    a(i.CloseStatement, "Expected closing statement token");
                                    const o = [];
                                    for (;!c("endfor", "else"); ) o.push(s());
                                    const r = [];
                                    if (c("else")) for (++n, ++n, a(i.CloseStatement, "Expected closing statement token"); !c("endfor"); ) r.push(s());
                                    return new f(e, t, o, r);
                                }(), a(i.OpenStatement, "Expected {% token"), r("endfor"), a(i.CloseStatement, "Expected %} token");
                                break;

                              case "call":
                                {
                                    ++n;
                                    let e = null;
                                    l(i.OpenParen) && (e = W());
                                    const t = Z();
                                    if ("Identifier" !== t.type) throw new SyntaxError("Expected identifier following call statement");
                                    const p = W();
                                    a(i.CloseStatement, "Expected closing statement token");
                                    const d = [];
                                    for (;!c("endcall"); ) d.push(s());
                                    a(i.OpenStatement, "Expected '{%'"), r("endcall"), a(i.CloseStatement, "Expected closing statement token");
                                    const u = new _(t, p);
                                    o = new q(u, e, d);
                                    break;
                                }

                              case "break":
                                ++n, a(i.CloseStatement, "Expected closing statement token"), o = new h;
                                break;

                              case "continue":
                                ++n, a(i.CloseStatement, "Expected closing statement token"), o = new g;
                                break;

                              case "filter":
                                {
                                    ++n;
                                    let e = Z();
                                    e instanceof k && l(i.OpenParen) && (e = G(e)), a(i.CloseStatement, "Expected closing statement token");
                                    const t = [];
                                    for (;!c("endfilter"); ) t.push(s());
                                    a(i.OpenStatement, "Expected '{%'"), r("endfilter"), a(i.CloseStatement, "Expected '%}'"), 
                                    o = new U(e, t);
                                    break;
                                }

                              default:
                                throw new SyntaxError(`Unknown statement type: ${t}`);
                            }
                            return o;
                        }();

                      case i.OpenExpression:
                        return function() {
                            a(i.OpenExpression, "Expected opening expression token");
                            const e = A();
                            return a(i.CloseExpression, "Expected closing expression token"), e;
                        }();

                      default:
                        throw new SyntaxError(`Unexpected token type: ${e[n].type}`);
                    }
                }
                function l(...t) {
                    return n + t.length <= e.length && t.every(((t, a) => t === e[n + a].type));
                }
                function c(...t) {
                    return e[n]?.type === i.OpenStatement && e[n + 1]?.type === i.Identifier && t.includes(e[n + 1]?.value);
                }
                function p(...t) {
                    return n + t.length <= e.length && t.every(((t, a) => "Identifier" === e[n + a].type && t === e[n + a].value));
                }
                function d() {
                    const e = A();
                    a(i.CloseStatement, "Expected closing statement token");
                    const t = [], o = [];
                    for (;!c("elif", "else", "endif"); ) t.push(s());
                    if (c("elif")) {
                        ++n, ++n;
                        const e = d();
                        o.push(e);
                    } else if (c("else")) for (++n, ++n, a(i.CloseStatement, "Expected closing statement token"); !c("endif"); ) o.push(s());
                    return new m(e, t, o);
                }
                function v(e = !1) {
                    const t = e ? Z : A, a = [ t() ], o = l(i.Comma);
                    for (;o && (++n, a.push(t()), l(i.Comma)); ) ;
                    return o ? new M(a) : a[0];
                }
                function A() {
                    return B();
                }
                function B() {
                    const e = F();
                    if (p("if")) {
                        ++n;
                        const t = F();
                        if (p("else")) {
                            ++n;
                            const a = B();
                            return new z(t, e, a);
                        }
                        return new O(e, t);
                    }
                    return e;
                }
                function F() {
                    let t = Q();
                    for (;p("or"); ) {
                        const a = e[n];
                        ++n;
                        const i = Q();
                        t = new j(a, t, i);
                    }
                    return t;
                }
                function Q() {
                    let t = V();
                    for (;p("and"); ) {
                        const a = e[n];
                        ++n;
                        const i = V();
                        t = new j(a, t, i);
                    }
                    return t;
                }
                function V() {
                    let t;
                    for (;p("not"); ) {
                        const a = e[n];
                        ++n;
                        const i = V();
                        t = new P(a, i);
                    }
                    return t ?? function() {
                        let t = H();
                        for (;;) {
                            let a;
                            if (p("not", "in")) a = new o("not in", i.Identifier), n += 2; else if (p("in")) a = e[n++]; else {
                                if (!l(i.ComparisonBinaryOperator)) break;
                                a = e[n++];
                            }
                            const r = H();
                            t = new j(a, t, r);
                        }
                        return t;
                    }();
                }
                function H() {
                    let t = X();
                    for (;l(i.AdditiveBinaryOperator); ) {
                        const a = e[n];
                        ++n;
                        const i = X();
                        t = new j(a, t, i);
                    }
                    return t;
                }
                function G(e) {
                    let t = new _(e, W());
                    return t = J(t), l(i.OpenParen) && (t = G(t)), t;
                }
                function W() {
                    a(i.OpenParen, "Expected opening parenthesis for arguments list");
                    const t = function() {
                        const t = [];
                        for (;!l(i.CloseParen); ) {
                            let a;
                            if (e[n].type === i.MultiplicativeBinaryOperator && "*" === e[n].value) {
                                ++n;
                                const e = A();
                                a = new N(e);
                            } else if (a = A(), l(i.Equals)) {
                                if (++n, !(a instanceof k)) throw new SyntaxError("Expected identifier for keyword argument");
                                const e = A();
                                a = new D(a, e);
                            }
                            t.push(a), l(i.Comma) && ++n;
                        }
                        return t;
                    }();
                    return a(i.CloseParen, "Expected closing parenthesis for arguments list"), t;
                }
                function K() {
                    const e = [];
                    let t = !1;
                    for (;!l(i.CloseSquareBracket); ) l(i.Colon) ? (e.push(void 0), ++n, t = !0) : (e.push(A()), 
                    l(i.Colon) && (++n, t = !0));
                    if (0 === e.length) throw new SyntaxError("Expected at least one argument for member/slice expression");
                    if (t) {
                        if (e.length > 3) throw new SyntaxError("Expected 0-3 arguments for slice expression");
                        return new R(...e);
                    }
                    return e[0];
                }
                function J(t) {
                    for (;l(i.Dot) || l(i.OpenSquareBracket); ) {
                        const o = e[n];
                        let r;
                        ++n;
                        const s = o.type === i.OpenSquareBracket;
                        if (s) r = K(), a(i.CloseSquareBracket, "Expected closing square bracket"); else if (r = Z(), 
                        "Identifier" !== r.type) throw new SyntaxError("Expected identifier following dot operator");
                        t = new x(t, r, s);
                    }
                    return t;
                }
                function X() {
                    let t = Y();
                    for (;l(i.MultiplicativeBinaryOperator); ) {
                        const a = e[n++], i = Y();
                        t = new j(a, t, i);
                    }
                    return t;
                }
                function Y() {
                    let e = function() {
                        let e = function() {
                            const e = J(Z());
                            return l(i.OpenParen) ? G(e) : e;
                        }();
                        for (;l(i.Pipe); ) {
                            ++n;
                            let t = Z();
                            if (!(t instanceof k)) throw new SyntaxError("Expected identifier for the filter");
                            l(i.OpenParen) && (t = G(t)), e = new L(e, t);
                        }
                        return e;
                    }();
                    for (;p("is"); ) {
                        ++n;
                        const t = p("not");
                        t && ++n;
                        const a = Z();
                        if (!(a instanceof k)) throw new SyntaxError("Expected identifier for the test");
                        e = new $(e, t, a);
                    }
                    return e;
                }
                function Z() {
                    const t = e[n++];
                    switch (t.type) {
                      case i.NumericLiteral:
                        {
                            const e = t.value;
                            return e.includes(".") ? new T(Number(e)) : new S(Number(e));
                        }

                      case i.StringLiteral:
                        {
                            let a = t.value;
                            for (;l(i.StringLiteral); ) a += e[n++].value;
                            return new I(a);
                        }

                      case i.Identifier:
                        return new k(t.value);

                      case i.OpenParen:
                        {
                            const e = v();
                            return a(i.CloseParen, "Expected closing parenthesis, got ${tokens[current].type} instead."), 
                            e;
                        }

                      case i.OpenSquareBracket:
                        {
                            const e = [];
                            for (;!l(i.CloseSquareBracket); ) e.push(A()), l(i.Comma) && ++n;
                            return ++n, new E(e);
                        }

                      case i.OpenCurlyBracket:
                        {
                            const e = new Map;
                            for (;!l(i.CloseCurlyBracket); ) {
                                const t = A();
                                a(i.Colon, "Expected colon between key and value in object literal");
                                const o = A();
                                e.set(t, o), l(i.Comma) && ++n;
                            }
                            return ++n, new C(e);
                        }

                      default:
                        throw new SyntaxError(`Unexpected token: ${t.type}`);
                    }
                }
                for (;n < e.length; ) t.body.push(s());
                return t;
            }
            function F(e, t, n = 1) {
                if (void 0 === t && (t = e, e = 0), 0 === n) throw new Error("range() step must not be zero");
                const a = [];
                if (n > 0) for (let i = e; i < t; i += n) a.push(i); else for (let i = e; i > t; i += n) a.push(i);
                return a;
            }
            function Q(e, t, n, a = 1) {
                const i = Math.sign(a);
                i >= 0 ? (t = (t ??= 0) < 0 ? Math.max(e.length + t, 0) : Math.min(t, e.length), 
                n = (n ??= e.length) < 0 ? Math.max(e.length + n, 0) : Math.min(n, e.length)) : (t = (t ??= e.length - 1) < 0 ? Math.max(e.length + t, -1) : Math.min(t, e.length - 1), 
                n = (n ??= -1) < -1 ? Math.max(e.length + n, -1) : Math.min(n, e.length - 1));
                const o = [];
                for (let r = t; i * r < i * n; r += a) o.push(e[r]);
                return o;
            }
            function V(e) {
                return function(e, t) {
                    const n = new Intl.DateTimeFormat(void 0, {
                        month: "long"
                    }), a = new Intl.DateTimeFormat(void 0, {
                        month: "short"
                    }), i = e => e < 10 ? "0" + e : e.toString();
                    return t.replace(/%[YmdbBHM%]/g, (t => {
                        switch (t) {
                          case "%Y":
                            return e.getFullYear().toString();

                          case "%m":
                            return i(e.getMonth() + 1);

                          case "%d":
                            return i(e.getDate());

                          case "%b":
                            return a.format(e);

                          case "%B":
                            return n.format(e);

                          case "%H":
                            return i(e.getHours());

                          case "%M":
                            return i(e.getMinutes());

                          case "%%":
                            return "%";

                          default:
                            return t;
                        }
                    }));
                }(new Date, e);
            }
            var H = class extends Error {}, G = class extends Error {}, W = class {
                type="RuntimeValue";
                value;
                builtins=new Map;
                constructor(e) {
                    this.value = e;
                }
                __bool__() {
                    return new Y(!!this.value);
                }
                toString() {
                    return String(this.value);
                }
            }, K = class extends W {
                type="IntegerValue";
            }, J = class extends W {
                type="FloatValue";
                toString() {
                    return this.value % 1 == 0 ? this.value.toFixed(1) : this.value.toString();
                }
            }, X = class extends W {
                type="StringValue";
                builtins=new Map([ [ "upper", new re((() => new X(this.value.toUpperCase()))) ], [ "lower", new re((() => new X(this.value.toLowerCase()))) ], [ "strip", new re((() => new X(this.value.trim()))) ], [ "title", new re((() => new X(this.value.replace(/\b\w/g, (e => e.toUpperCase()))))) ], [ "capitalize", new re((() => new X(this.value.charAt(0).toUpperCase() + this.value.slice(1)))) ], [ "length", new K(this.value.length) ], [ "rstrip", new re((() => new X(this.value.trimEnd()))) ], [ "lstrip", new re((() => new X(this.value.trimStart()))) ], [ "startswith", new re((e => {
                    if (0 === e.length) throw new Error("startswith() requires at least one argument");
                    const t = e[0];
                    if (t instanceof X) return new Y(this.value.startsWith(t.value));
                    if (t instanceof ie) {
                        for (const e of t.value) {
                            if (!(e instanceof X)) throw new Error("startswith() tuple elements must be strings");
                            if (this.value.startsWith(e.value)) return new Y(!0);
                        }
                        return new Y(!1);
                    }
                    throw new Error("startswith() argument must be a string or tuple of strings");
                })) ], [ "endswith", new re((e => {
                    if (0 === e.length) throw new Error("endswith() requires at least one argument");
                    const t = e[0];
                    if (t instanceof X) return new Y(this.value.endsWith(t.value));
                    if (t instanceof ie) {
                        for (const e of t.value) {
                            if (!(e instanceof X)) throw new Error("endswith() tuple elements must be strings");
                            if (this.value.endsWith(e.value)) return new Y(!0);
                        }
                        return new Y(!1);
                    }
                    throw new Error("endswith() argument must be a string or tuple of strings");
                })) ], [ "split", new re((e => {
                    const t = e[0] ?? new se;
                    if (!(t instanceof X || t instanceof se)) throw new Error("sep argument must be a string or null");
                    const n = e[1] ?? new K(-1);
                    if (!(n instanceof K)) throw new Error("maxsplit argument must be a number");
                    let a = [];
                    if (t instanceof se) {
                        const e = this.value.trimStart();
                        for (const {0: t, index: i} of e.matchAll(/\S+/g)) {
                            if (-1 !== n.value && a.length >= n.value && void 0 !== i) {
                                a.push(t + e.slice(i + t.length));
                                break;
                            }
                            a.push(t);
                        }
                    } else {
                        if ("" === t.value) throw new Error("empty separator");
                        a = this.value.split(t.value), -1 !== n.value && a.length > n.value && a.push(a.splice(n.value).join(t.value));
                    }
                    return new ie(a.map((e => new X(e))));
                })) ], [ "replace", new re((e => {
                    if (e.length < 2) throw new Error("replace() requires at least two arguments");
                    const t = e[0], n = e[1];
                    if (!(t instanceof X && n instanceof X)) throw new Error("replace() arguments must be strings");
                    let a;
                    if (a = e.length > 2 ? "KeywordArgumentsValue" === e[2].type ? e[2].value.get("count") ?? new se : e[2] : new se, 
                    !(a instanceof K || a instanceof se)) throw new Error("replace() count argument must be a number or null");
                    return new X(function(e, t, n, a) {
                        if (0 === a) return e;
                        let i = null == a || a < 0 ? 1 / 0 : a;
                        const o = 0 === t.length ? new RegExp("(?=)", "gu") : new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gu");
                        return e.replaceAll(o, (e => i > 0 ? (--i, n) : e));
                    }(this.value, t.value, n.value, a.value));
                })) ] ]);
            }, Y = class extends W {
                type="BooleanValue";
            }, Z = /[\x7f-\uffff]/g;
            function ee(e) {
                return e.replace(Z, (e => "\\u" + e.charCodeAt(0).toString(16).padStart(4, "0")));
            }
            function te(e, t = {}, n = 0, a = !0) {
                const {indent: i = null, ensureAscii: o = !1, separators: r = null, sortKeys: s = !1} = t;
                let l, c;
                switch (r ? [l, c] = r : i ? (l = ",", c = ": ") : (l = ", ", c = ": "), e.type) {
                  case "NullValue":
                    return "null";

                  case "UndefinedValue":
                    return a ? "null" : "undefined";

                  case "IntegerValue":
                  case "FloatValue":
                  case "BooleanValue":
                    return JSON.stringify(e.value);

                  case "StringValue":
                    {
                        let t = JSON.stringify(e.value);
                        return o && (t = ee(t)), t;
                    }

                  case "ArrayValue":
                  case "ObjectValue":
                    {
                        const r = i ? " ".repeat(i) : "", p = "\n" + r.repeat(n), d = p + r;
                        if ("ArrayValue" === e.type) {
                            const o = e.value.map((e => te(e, t, n + 1, a)));
                            return i ? `[${d}${o.join(`${l}${d}`)}${p}]` : `[${o.join(l)}]`;
                        }
                        {
                            let r = Array.from(e.value.entries());
                            s && (r = r.sort((([e], [t]) => e.localeCompare(t))));
                            const u = r.map((([e, r]) => {
                                let s = JSON.stringify(e);
                                o && (s = ee(s));
                                const l = `${s}${c}${te(r, t, n + 1, a)}`;
                                return i ? `${d}${l}` : l;
                            }));
                            return i ? `{${u.join(l)}${p}}` : `{${u.join(l)}}`;
                        }
                    }

                  default:
                    throw new Error(`Cannot convert to JSON: ${e.type}`);
                }
            }
            var ne = class extends W {
                type="ObjectValue";
                __bool__() {
                    return new Y(this.value.size > 0);
                }
                builtins=new Map([ [ "get", new re((([e, t]) => {
                    if (!(e instanceof X)) throw new Error(`Object key must be a string: got ${e.type}`);
                    return this.value.get(e.value) ?? t ?? new se;
                })) ], [ "items", new re((() => this.items())) ], [ "keys", new re((() => this.keys())) ], [ "values", new re((() => this.values())) ], [ "dictsort", new re((e => {
                    let t = new Map;
                    const n = e.filter((e => !(e instanceof ae && (t = e.value, 1)))), a = n.at(0) ?? t.get("case_sensitive") ?? new Y(!1);
                    if (!(a instanceof Y)) throw new Error("case_sensitive must be a boolean");
                    const i = n.at(1) ?? t.get("by") ?? new X("key");
                    if (!(i instanceof X)) throw new Error("by must be a string");
                    if (![ "key", "value" ].includes(i.value)) throw new Error("by must be either 'key' or 'value'");
                    const o = n.at(2) ?? t.get("reverse") ?? new Y(!1);
                    if (!(o instanceof Y)) throw new Error("reverse must be a boolean");
                    const r = Array.from(this.value.entries()).map((([e, t]) => new ie([ new X(e), t ]))).sort(((e, t) => {
                        const n = "key" === i.value ? 0 : 1, r = de(e.value[n], t.value[n], a.value);
                        return o.value ? -r : r;
                    }));
                    return new ie(r);
                })) ] ]);
                items() {
                    return new ie(Array.from(this.value.entries()).map((([e, t]) => new ie([ new X(e), t ]))));
                }
                keys() {
                    return new ie(Array.from(this.value.keys()).map((e => new X(e))));
                }
                values() {
                    return new ie(Array.from(this.value.values()));
                }
                toString() {
                    return te(this, {}, 0, !1);
                }
            }, ae = class extends ne {
                type="KeywordArgumentsValue";
            }, ie = class extends W {
                type="ArrayValue";
                builtins=new Map([ [ "length", new K(this.value.length) ] ]);
                __bool__() {
                    return new Y(this.value.length > 0);
                }
                toString() {
                    return te(this, {}, 0, !1);
                }
            }, oe = class extends ie {
                type="TupleValue";
            }, re = class extends W {
                type="FunctionValue";
            }, se = class extends W {
                type="NullValue";
            }, le = class extends W {
                type="UndefinedValue";
            }, ce = class {
                constructor(e) {
                    this.parent = e;
                }
                variables=new Map([ [ "namespace", new re((e => {
                    if (0 === e.length) return new ne(new Map);
                    if (1 !== e.length || !(e[0] instanceof ne)) throw new Error("`namespace` expects either zero arguments or a single object argument");
                    return e[0];
                })) ] ]);
                tests=new Map([ [ "boolean", e => "BooleanValue" === e.type ], [ "callable", e => e instanceof re ], [ "odd", e => {
                    if (!(e instanceof K)) throw new Error(`cannot odd on ${e.type}`);
                    return e.value % 2 != 0;
                } ], [ "even", e => {
                    if (!(e instanceof K)) throw new Error(`cannot even on ${e.type}`);
                    return e.value % 2 == 0;
                } ], [ "false", e => "BooleanValue" === e.type && !e.value ], [ "true", e => "BooleanValue" === e.type && e.value ], [ "none", e => "NullValue" === e.type ], [ "string", e => "StringValue" === e.type ], [ "number", e => e instanceof K || e instanceof J ], [ "integer", e => e instanceof K ], [ "iterable", e => "ArrayValue" === e.type || "StringValue" === e.type ], [ "mapping", e => e instanceof ne ], [ "sequence", e => e instanceof ie || e instanceof ne || e instanceof X ], [ "lower", e => {
                    const t = e.value;
                    return "StringValue" === e.type && t === t.toLowerCase();
                } ], [ "upper", e => {
                    const t = e.value;
                    return "StringValue" === e.type && t === t.toUpperCase();
                } ], [ "none", e => "NullValue" === e.type ], [ "defined", e => "UndefinedValue" !== e.type ], [ "undefined", e => "UndefinedValue" === e.type ], [ "equalto", (e, t) => e.value === t.value ], [ "eq", (e, t) => e.value === t.value ] ]);
                set(e, t) {
                    return this.declareVariable(e, me(t));
                }
                declareVariable(e, t) {
                    if (this.variables.has(e)) throw new SyntaxError(`Variable already declared: ${e}`);
                    return this.variables.set(e, t), t;
                }
                setVariable(e, t) {
                    return this.variables.set(e, t), t;
                }
                resolve(e) {
                    if (this.variables.has(e)) return this;
                    if (this.parent) return this.parent.resolve(e);
                    throw new Error(`Unknown variable: ${e}`);
                }
                lookupVariable(e) {
                    try {
                        return this.resolve(e).variables.get(e) ?? new le;
                    } catch {
                        return new le;
                    }
                }
            };
            function pe(e, t) {
                const n = t.split(".");
                let a = e;
                for (const e of n) if (a instanceof ne) a = a.value.get(e) ?? new le; else {
                    if (!(a instanceof ie)) return new le;
                    {
                        const t = parseInt(e, 10);
                        if (!(!isNaN(t) && t >= 0 && t < a.value.length)) return new le;
                        a = a.value[t];
                    }
                }
                return a;
            }
            function de(e, t, n = !1) {
                if (e instanceof se && t instanceof se) return 0;
                if (e instanceof se || t instanceof se) throw new Error(`Cannot compare ${e.type} with ${t.type}`);
                if (e instanceof le && t instanceof le) return 0;
                if (e instanceof le || t instanceof le) throw new Error(`Cannot compare ${e.type} with ${t.type}`);
                const a = e => e instanceof K || e instanceof J || e instanceof Y, i = e => e instanceof Y ? e.value ? 1 : 0 : e.value;
                if (a(e) && a(t)) {
                    const n = i(e), a = i(t);
                    return n < a ? -1 : n > a ? 1 : 0;
                }
                if (e.type !== t.type) throw new Error(`Cannot compare different types: ${e.type} and ${t.type}`);
                if ("StringValue" === e.type) {
                    let a = e.value, i = t.value;
                    return n || (a = a.toLowerCase(), i = i.toLowerCase()), a < i ? -1 : a > i ? 1 : 0;
                }
                throw new Error(`Cannot compare type: ${e.type}`);
            }
            function me(e) {
                switch (typeof e) {
                  case "number":
                    return Number.isInteger(e) ? new K(e) : new J(e);

                  case "string":
                    return new X(e);

                  case "boolean":
                    return new Y(e);

                  case "undefined":
                    return new le;

                  case "object":
                    return null === e ? new se : Array.isArray(e) ? new ie(e.map(me)) : new ne(new Map(Object.entries(e).map((([e, t]) => [ e, me(t) ]))));

                  case "function":
                    return new re(((t, n) => me(e(...t.map((e => e.value))) ?? null)));

                  default:
                    throw new Error(`Cannot convert to runtime value: ${e}`);
                }
            }
            var fe = "\n";
            function ye(...e) {
                return "{%- " + e.join(" ") + " -%}";
            }
            function be(e, t, n) {
                return e.map((e => function(e, t, n) {
                    const a = n.repeat(t);
                    switch (e.type) {
                      case "Program":
                        return be(e.body, t, n);

                      case "If":
                        return function(e, t, n) {
                            const a = n.repeat(t), i = [];
                            let o = e;
                            for (;o && (i.push({
                                test: o.test,
                                body: o.body
                            }), 1 === o.alternate.length && "If" === o.alternate[0].type); ) o = o.alternate[0];
                            let r = a + ye("if", we(i[0].test)) + fe + be(i[0].body, t + 1, n);
                            for (let e = 1; e < i.length; ++e) r += fe + a + ye("elif", we(i[e].test)) + fe + be(i[e].body, t + 1, n);
                            return o && o.alternate.length > 0 && (r += fe + a + ye("else") + fe + be(o.alternate, t + 1, n)), 
                            r += fe + a + ye("endif"), r;
                        }(e, t, n);

                      case "For":
                        return function(e, t, n) {
                            const a = n.repeat(t);
                            let i = "";
                            if ("SelectExpression" === e.iterable.type) {
                                const t = e.iterable;
                                i = `${we(t.lhs)} if ${we(t.test)}`;
                            } else i = we(e.iterable);
                            let o = a + ye("for", we(e.loopvar), "in", i) + fe + be(e.body, t + 1, n);
                            return e.defaultBlock.length > 0 && (o += fe + a + ye("else") + fe + be(e.defaultBlock, t + 1, n)), 
                            o += fe + a + ye("endfor"), o;
                        }(e, t, n);

                      case "Set":
                        return function(e, t, n) {
                            const a = n.repeat(t), i = we(e.assignee), o = e.value ? we(e.value) : "", r = a + ye("set", `${i}${e.value ? " = " + o : ""}`);
                            return 0 === e.body.length ? r : r + fe + be(e.body, t + 1, n) + fe + a + ye("endset");
                        }(e, t, n);

                      case "Macro":
                        return function(e, t, n) {
                            const a = n.repeat(t), i = e.args.map(we).join(", ");
                            return a + ye("macro", `${e.name.value}(${i})`) + fe + be(e.body, t + 1, n) + fe + a + ye("endmacro");
                        }(e, t, n);

                      case "Break":
                        return a + ye("break");

                      case "Continue":
                        return a + ye("continue");

                      case "CallStatement":
                        return function(e, t, n) {
                            const a = n.repeat(t);
                            let r = a + ye(`call${e.callerArgs && e.callerArgs.length > 0 ? `(${e.callerArgs.map(we).join(", ")})` : ""}`, we(e.call)) + fe;
                            return r += be(e.body, t + 1, n) + fe, r += a + ye("endcall"), r;
                        }(e, t, n);

                      case "FilterStatement":
                        return function(e, t, n) {
                            const a = n.repeat(t);
                            let o = a + ye("filter", "Identifier" === e.filter.type ? e.filter.value : we(e.filter)) + fe;
                            return o += be(e.body, t + 1, n) + fe, o += a + ye("endfilter"), o;
                        }(e, t, n);

                      case "Comment":
                        return a + "{# " + e.value + " #}";

                      default:
                        return a + "{{- " + we(e) + " -}}";
                    }
                }(e, t, n))).join(fe);
            }
            function we(e, t = -1) {
                switch (e.type) {
                  case "SpreadExpression":
                    return `*${we(e.argument)}`;

                  case "Identifier":
                    return e.value;

                  case "IntegerLiteral":
                  case "FloatLiteral":
                    return `${e.value}`;

                  case "StringLiteral":
                    return JSON.stringify(e.value);

                  case "BinaryExpression":
                    {
                        const n = e, a = function(e) {
                            switch (e.operator.type) {
                              case "MultiplicativeBinaryOperator":
                                return 4;

                              case "AdditiveBinaryOperator":
                                return 3;

                              case "ComparisonBinaryOperator":
                                return 2;

                              case "Identifier":
                                return "and" === e.operator.value ? 1 : "in" === e.operator.value || "not in" === e.operator.value ? 2 : 0;
                            }
                            return 0;
                        }(n), i = we(n.left, a), o = we(n.right, a + 1), r = `${i} ${n.operator.value} ${o}`;
                        return a < t ? `(${r})` : r;
                    }

                  case "UnaryExpression":
                    {
                        const t = e;
                        return t.operator.value + ("not" === t.operator.value ? " " : "") + we(t.argument, 1 / 0);
                    }

                  case "CallExpression":
                    {
                        const t = e, n = t.args.map(we).join(", ");
                        return `${we(t.callee)}(${n})`;
                    }

                  case "MemberExpression":
                    {
                        const t = e;
                        let n = we(t.object);
                        [ "Identifier", "MemberExpression", "CallExpression", "StringLiteral", "IntegerLiteral", "FloatLiteral", "ArrayLiteral", "TupleLiteral", "ObjectLiteral" ].includes(t.object.type) || (n = `(${n})`);
                        let a = we(t.property);
                        return t.computed || "Identifier" === t.property.type || (a = `(${a})`), t.computed ? `${n}[${a}]` : `${n}.${a}`;
                    }

                  case "FilterExpression":
                    {
                        const t = e, n = we(t.operand, 1 / 0);
                        return "CallExpression" === t.filter.type ? `${n} | ${we(t.filter)}` : `${n} | ${t.filter.value}`;
                    }

                  case "SelectExpression":
                    {
                        const t = e;
                        return `${we(t.lhs)} if ${we(t.test)}`;
                    }

                  case "TestExpression":
                    {
                        const t = e;
                        return `${we(t.operand)} is${t.negate ? " not" : ""} ${t.test.value}`;
                    }

                  case "ArrayLiteral":
                  case "TupleLiteral":
                    {
                        const t = e.value.map(we), n = "ArrayLiteral" === e.type ? "[]" : "()";
                        return `${n[0]}${t.join(", ")}${n[1]}`;
                    }

                  case "ObjectLiteral":
                    return `{${Array.from(e.value.entries()).map((([e, t]) => `${we(e)}: ${we(t)}`)).join(", ")}}`;

                  case "SliceExpression":
                    {
                        const t = e;
                        return `${t.start ? we(t.start) : ""}:${t.stop ? we(t.stop) : ""}${t.step ? `:${we(t.step)}` : ""}`;
                    }

                  case "KeywordArgumentExpression":
                    {
                        const t = e;
                        return `${t.key.value}=${we(t.value)}`;
                    }

                  case "Ternary":
                    {
                        const n = e, a = `${we(n.trueExpr)} if ${we(n.condition, 0)} else ${we(n.falseExpr)}`;
                        return t > -1 ? `(${a})` : a;
                    }

                  default:
                    throw new Error(`Unknown expression type: ${e.type}`);
                }
            }
            const xe = {
                "adapter-transformers": [ "question-answering", "text-classification", "token-classification" ],
                allennlp: [ "question-answering" ],
                asteroid: [ "audio-to-audio" ],
                bertopic: [ "text-classification" ],
                diffusers: [ "image-to-image", "text-to-image" ],
                doctr: [ "object-detection" ],
                espnet: [ "text-to-speech", "automatic-speech-recognition" ],
                fairseq: [ "text-to-speech", "audio-to-audio" ],
                fastai: [ "image-classification" ],
                fasttext: [ "feature-extraction", "text-classification" ],
                flair: [ "token-classification" ],
                k2: [ "automatic-speech-recognition" ],
                keras: [ "image-classification" ],
                nemo: [ "automatic-speech-recognition" ],
                open_clip: [ "zero-shot-classification", "zero-shot-image-classification" ],
                paddlenlp: [ "fill-mask", "summarization", "zero-shot-classification" ],
                peft: [ "text-generation" ],
                "pyannote-audio": [ "automatic-speech-recognition" ],
                "sentence-transformers": [ "feature-extraction", "sentence-similarity" ],
                setfit: [ "text-classification" ],
                sklearn: [ "tabular-classification", "tabular-regression", "text-classification" ],
                spacy: [ "token-classification", "text-classification", "sentence-similarity" ],
                "span-marker": [ "token-classification" ],
                speechbrain: [ "audio-classification", "audio-to-audio", "automatic-speech-recognition", "text-to-speech", "text2text-generation" ],
                stanza: [ "token-classification" ],
                timm: [ "image-classification", "image-feature-extraction" ],
                transformers: [ "audio-classification", "automatic-speech-recognition", "depth-estimation", "document-question-answering", "feature-extraction", "fill-mask", "image-classification", "image-feature-extraction", "image-segmentation", "image-to-image", "image-to-text", "image-text-to-text", "mask-generation", "object-detection", "question-answering", "summarization", "table-question-answering", "text2text-generation", "text-classification", "text-generation", "text-to-audio", "text-to-speech", "token-classification", "translation", "video-classification", "visual-question-answering", "zero-shot-classification", "zero-shot-image-classification", "zero-shot-object-detection" ],
                mindspore: [ "image-classification" ]
            }, _e = new Map([ [ "text-classification", [ "I like you. I love you" ] ], [ "token-classification", [ "My name is Wolfgang and I live in Berlin", "My name is Sarah and I live in London", "My name is Clara and I live in Berkeley, California." ] ], [ "table-question-answering", [ {
                text: "How many stars does the transformers repository have?",
                table: {
                    Repository: [ "Transformers", "Datasets", "Tokenizers" ],
                    Stars: [ 36542, 4512, 3934 ],
                    Contributors: [ 651, 77, 34 ],
                    "Programming language": [ "Python", "Python", "Rust, Python and NodeJS" ]
                }
            } ] ], [ "question-answering", [ {
                text: "Where do I live?",
                context: "My name is Wolfgang and I live in Berlin"
            }, {
                text: "Where do I live?",
                context: "My name is Sarah and I live in London"
            }, {
                text: "What's my name?",
                context: "My name is Clara and I live in Berkeley."
            }, {
                text: "Which name is also used to describe the Amazon rainforest in English?",
                context: 'The Amazon rainforest (Portuguese: Floresta Amazônica or Amazônia; Spanish: Selva Amazónica, Amazonía or usually Amazonia; French: Forêt amazonienne; Dutch: Amazoneregenwoud), also known in English as Amazonia or the Amazon Jungle, is a moist broadleaf forest that covers most of the Amazon basin of South America. This basin encompasses 7,000,000 square kilometres (2,700,000 sq mi), of which 5,500,000 square kilometres (2,100,000 sq mi) are covered by the rainforest. This region includes territory belonging to nine nations. The majority of the forest is contained within Brazil, with 60% of the rainforest, followed by Peru with 13%, Colombia with 10%, and with minor amounts in Venezuela, Ecuador, Bolivia, Guyana, Suriname and French Guiana. States or departments in four nations contain "Amazonas" in their names. The Amazon represents over half of the planet\'s remaining rainforests, and comprises the largest and most biodiverse tract of tropical rainforest in the world, with an estimated 390 billion individual trees divided into 16,000 species.'
            } ] ], [ "zero-shot-classification", [ {
                text: "I have a problem with my iphone that needs to be resolved asap!",
                candidate_labels: "urgent, not urgent, phone, tablet, computer",
                multi_class: !0
            }, {
                text: "Last week I upgraded my iOS version and ever since then my phone has been overheating whenever I use your app.",
                candidate_labels: "mobile, website, billing, account access",
                multi_class: !1
            }, {
                text: "A new model offers an explanation for how the Galilean satellites formed around the solar system’s largest world. Konstantin Batygin did not set out to solve one of the solar system’s most puzzling mysteries when he went for a run up a hill in Nice, France. Dr. Batygin, a Caltech researcher, best known for his contributions to the search for the solar system’s missing “Planet Nine,” spotted a beer bottle. At a steep, 20 degree grade, he wondered why it wasn’t rolling down the hill. He realized there was a breeze at his back holding the bottle in place. Then he had a thought that would only pop into the mind of a theoretical astrophysicist: “Oh! This is how Europa formed.” Europa is one of Jupiter’s four large Galilean moons. And in a paper published Monday in the Astrophysical Journal, Dr. Batygin and a co-author, Alessandro Morbidelli, a planetary scientist at the Côte d’Azur Observatory in France, present a theory explaining how some moons form around gas giants like Jupiter and Saturn, suggesting that millimeter-sized grains of hail produced during the solar system’s formation became trapped around these massive worlds, taking shape one at a time into the potentially habitable moons we know today.",
                candidate_labels: "space & cosmos, scientific discovery, microbiology, robots, archeology",
                multi_class: !0
            } ] ], [ "translation", [ "My name is Wolfgang and I live in Berlin", "My name is Sarah and I live in London" ] ], [ "summarization", [ "The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct." ] ], [ "conversational", [ "Hi, what can you help me with?", "What is 84 * 3 / 2?", "Tell me an interesting fact about the universe!", "Explain quantum computing in simple terms." ] ], [ "text-generation", [ "My name is Julien and I like to", "I like traveling by train because", "Paris is an amazing place to visit,", "Once upon a time," ] ], [ "fill-mask", [ "Paris is the <mask> of France.", "The goal of life is <mask>." ] ], [ "sentence-similarity", [ {
                source_sentence: "That is a happy person",
                sentences: [ "That is a happy dog", "That is a very happy person", "Today is a sunny day" ]
            } ] ] ]), ke = new Map([ [ "text-classification", [ "我喜欢你。 我爱你" ] ], [ "token-classification", [ "我叫沃尔夫冈，我住在柏林。", "我叫萨拉，我住在伦敦。", "我叫克拉拉，我住在加州伯克利。" ] ], [ "question-answering", [ {
                text: "我住在哪里？",
                context: "我叫沃尔夫冈，我住在柏林。"
            }, {
                text: "我住在哪里？",
                context: "我叫萨拉，我住在伦敦。"
            }, {
                text: "我的名字是什么？",
                context: "我叫克拉拉，我住在伯克利。"
            } ] ], [ "translation", [ "我叫沃尔夫冈，我住在柏林。", "我叫萨拉，我住在伦敦。" ] ], [ "zero-shot-classification", [ {
                text: "房间干净明亮，非常不错",
                candidate_labels: "这是一条差评, 这是一条好评"
            } ] ], [ "summarization", [ "该塔高324米（1063英尺），与一幢81层的建筑物一样高，是巴黎最高的建筑物。 它的底座是方形的，每边长125米（410英尺）。 在建造过程中，艾菲尔铁塔超过了华盛顿纪念碑，成为世界上最高的人造结构，它保持了41年的头衔，直到1930年纽约市的克莱斯勒大楼竣工。这是第一个到达300米高度的结构。 由于1957年在塔顶增加了广播天线，因此它现在比克莱斯勒大厦高5.2米（17英尺）。 除发射器外，艾菲尔铁塔是法国第二高的独立式建筑，仅次于米劳高架桥。" ] ], [ "text-generation", [ "我叫朱利安，我喜欢", "我叫托马斯，我的主要", "我叫玛丽亚，我最喜欢的", "我叫克拉拉，我是", "从前，" ] ], [ "fill-mask", [ "巴黎是<mask>国的首都。", "生活的真谛是<mask>。" ] ], [ "sentence-similarity", [ {
                source_sentence: "那是 個快樂的人",
                sentences: [ "那是 條快樂的狗", "那是 個非常幸福的人", "今天是晴天" ]
            } ] ] ]), Ae = new Map([ [ "text-classification", [ "Je t'apprécie beaucoup. Je t'aime." ] ], [ "token-classification", [ "Mon nom est Wolfgang et je vis à Berlin" ] ], [ "question-answering", [ {
                text: "Où est-ce que je vis?",
                context: "Mon nom est Wolfgang et je vis à Berlin"
            } ] ], [ "translation", [ "Mon nom est Wolfgang et je vis à Berlin" ] ], [ "summarization", [ "La tour fait 324 mètres (1,063 pieds) de haut, environ la même hauteur qu'un immeuble de 81 étages, et est la plus haute structure de Paris. Sa base est carrée, mesurant 125 mètres (410 pieds) sur chaque côté. Durant sa construction, la tour Eiffel surpassa le Washington Monument pour devenir la plus haute structure construite par l'homme dans le monde, un titre qu'elle conserva pendant 41 ans jusqu'à l'achèvement du Chrysler Building à New-York City en 1930. Ce fut la première structure à atteindre une hauteur de 300 mètres. Avec l'ajout d'une antenne de radiodiffusion au sommet de la tour Eiffel en 1957, celle-ci redevint plus haute que le Chrysler Building de 5,2 mètres (17 pieds). En excluant les transmetteurs, elle est la seconde plus haute stucture autoportante de France après le viaduc de Millau." ] ], [ "text-generation", [ "Mon nom est Julien et j'aime", "Mon nom est Thomas et mon principal", "Il était une fois" ] ], [ "fill-mask", [ "Paris est la <mask> de la France." ] ], [ "sentence-similarity", [ {
                source_sentence: "C'est une personne heureuse",
                sentences: [ "C'est un chien heureux", "C'est une personne très heureuse", "Aujourd'hui est une journée ensoleillée" ]
            } ] ] ]), Se = new Map([ [ "text-classification", [ "Te quiero. Te amo." ] ], [ "token-classification", [ "Me llamo Wolfgang y vivo en Berlin" ] ], [ "question-answering", [ {
                text: "¿Dónde vivo?",
                context: "Me llamo Wolfgang y vivo en Berlin"
            }, {
                text: "¿Quién inventó el submarino?",
                context: "Isaac Peral fue un murciano que inventó el submarino"
            }, {
                text: "¿Cuántas personas hablan español?",
                context: "El español es el segundo idioma más hablado del mundo con más de 442 millones de hablantes"
            } ] ], [ "translation", [ "Me llamo Wolfgang y vivo en Berlin", "Los ingredientes de una tortilla de patatas son: huevos, patatas y cebolla" ] ], [ "summarization", [ "La torre tiene 324 metros (1.063 pies) de altura, aproximadamente la misma altura que un edificio de 81 pisos y la estructura más alta de París. Su base es cuadrada, mide 125 metros (410 pies) a cada lado. Durante su construcción, la Torre Eiffel superó al Washington Monument para convertirse en la estructura artificial más alta del mundo, un título que mantuvo durante 41 años hasta que el Chrysler Building en la ciudad de Nueva York se terminó en 1930. Fue la primera estructura en llegar Una altura de 300 metros. Debido a la adición de una antena de transmisión en la parte superior de la torre en 1957, ahora es más alta que el Chrysler Building en 5,2 metros (17 pies). Excluyendo los transmisores, la Torre Eiffel es la segunda estructura independiente más alta de Francia después del Viaducto de Millau." ] ], [ "text-generation", [ "Me llamo Julien y me gusta", "Me llamo Thomas y mi principal", "Me llamo Manuel y trabajo en", "Érase una vez,", "Si tú me dices ven, " ] ], [ "fill-mask", [ "Mi nombre es <mask> y vivo en Nueva York.", "El español es un idioma muy <mask> en el mundo." ] ], [ "sentence-similarity", [ {
                source_sentence: "Esa es una persona feliz",
                sentences: [ "Ese es un perro feliz", "Esa es una persona muy feliz", "Hoy es un día soleado" ]
            } ] ] ]), Te = new Map([ [ "text-classification", [ "Ты мне нравишься. Я тебя люблю" ] ], [ "token-classification", [ "Меня зовут Вольфганг и я живу в Берлине" ] ], [ "question-answering", [ {
                text: "Где живу?",
                context: "Меня зовут Вольфганг и я живу в Берлине"
            } ] ], [ "translation", [ "Меня зовут Вольфганг и я живу в Берлине" ] ], [ "summarization", [ "Высота башни составляет 324 метра (1063 фута), примерно такая же высота, как у 81-этажного здания, и самое высокое сооружение в Париже. Его основание квадратно, размером 125 метров (410 футов) с любой стороны. Во время строительства Эйфелева башня превзошла монумент Вашингтона, став самым высоким искусственным сооружением в мире, и этот титул она удерживала в течение 41 года до завершения строительство здания Крайслер в Нью-Йорке в 1930 году. Это первое сооружение которое достигло высоты 300 метров. Из-за добавления вещательной антенны на вершине башни в 1957 году она сейчас выше здания Крайслер на 5,2 метра (17 футов). За исключением передатчиков, Эйфелева башня является второй самой высокой отдельно стоящей структурой во Франции после виадука Мийо." ] ], [ "text-generation", [ "Меня зовут Жюльен и", "Меня зовут Томас и мой основной", "Однажды" ] ], [ "fill-mask", [ "Меня зовут <mask> и я инженер живущий в Нью-Йорке." ] ], [ "sentence-similarity", [ {
                source_sentence: "Это счастливый человек",
                sentences: [ "Это счастливая собака", "Это очень счастливый человек", "Сегодня солнечный день" ]
            } ] ] ]), Ie = new Map([ [ "translation", [ "Мене звати Вольфґанґ і я живу в Берліні." ] ], [ "fill-mask", [ "Мене звати <mask>." ] ] ]), Ee = new Map([ [ "text-classification", [ "Mi piaci. Ti amo" ] ], [ "token-classification", [ "Mi chiamo Wolfgang e vivo a Berlino", "Mi chiamo Sarah e vivo a Londra", "Mi chiamo Clara e vivo a Berkeley in California." ] ], [ "question-answering", [ {
                text: "Dove vivo?",
                context: "Mi chiamo Wolfgang e vivo a Berlino"
            }, {
                text: "Dove vivo?",
                context: "Mi chiamo Sarah e vivo a Londra"
            }, {
                text: "Come mio chiamo?",
                context: "Mi chiamo Clara e vivo a Berkeley."
            } ] ], [ "translation", [ "Mi chiamo Wolfgang e vivo a Berlino", "Mi chiamo Sarah e vivo a Londra" ] ], [ "summarization", [ "La torre degli Asinelli è una delle cosiddette due torri di Bologna, simbolo della città, situate in piazza di porta Ravegnana, all'incrocio tra le antiche strade San Donato (ora via Zamboni), San Vitale, Maggiore e Castiglione. Eretta, secondo la tradizione, fra il 1109 e il 1119 dal nobile Gherardo Asinelli, la torre è alta 97,20 metri, pende verso ovest per 2,23 metri e presenta all'interno una scalinata composta da 498 gradini. Ancora non si può dire con certezza quando e da chi fu costruita la torre degli Asinelli. Si presume che la torre debba il proprio nome a Gherardo Asinelli, il nobile cavaliere di fazione ghibellina al quale se ne attribuisce la costruzione, iniziata secondo una consolidata tradizione l'11 ottobre 1109 e terminata dieci anni dopo, nel 1119." ] ], [ "text-generation", [ "Mi chiamo Loreto e mi piace", "Mi chiamo Thomas e il mio principale", "Mi chiamo Marianna, la mia cosa preferita", "Mi chiamo Clara e sono", "C'era una volta" ] ], [ "fill-mask", [ "Roma è la <mask> d'Italia.", "Lo scopo della vita è <mask>." ] ], [ "sentence-similarity", [ {
                source_sentence: "Questa è una persona felice",
                sentences: [ "Questo è un cane felice", "Questa è una persona molto felice", "Oggi è una giornata di sole" ]
            } ] ] ]), Me = new Map([ [ "text-classification", [ "پروژه به موقع تحویل شد و همه چیز خوب بود.", "سیب‌زمینی بی‌کیفیت بود.", "قیمت و کیفیت عالی", "خوب نبود اصلا" ] ], [ "token-classification", [ "این سریال به صورت رسمی در تاریخ دهم می ۲۰۱۱ توسط شبکه فاکس برای پخش رزرو شد.", "دفتر مرکزی شرکت پارس‌مینو در شهر اراک در استان مرکزی قرار دارد.", "وی در سال ۲۰۱۳ درگذشت و مسئول خاکسپاری و اقوامش برای او مراسم یادبود گرفتند." ] ], [ "question-answering", [ {
                text: "من کجا زندگی میکنم؟",
                context: "نام من پژمان است و در گرگان زندگی میکنم."
            }, {
                text: "نامم چیست و کجا زندگی می‌کنم؟",
                context: "اسمم سارا است و در آفریقای جنوبی زندگی میکنم."
            }, {
                text: "نام من چیست؟",
                context: "من مریم هستم و در تبریز زندگی می‌کنم."
            }, {
                text: "بیشترین مساحت جنگل آمازون در کدام کشور است؟",
                context: [ "آمازون نام بزرگ‌ترین جنگل بارانی جهان است که در شمال آمریکای جنوبی قرار گرفته و بیشتر آن در خاک برزیل و پرو", "جای دارد. بیش از نیمی از همه جنگل‌های بارانی باقی‌مانده در جهان در آمازون قرار دارد.", "مساحت جنگل‌های آمازون ۵٫۵ میلیون کیلومتر مربع است که بین ۹ کشور تقسیم شده‌است." ].join("\n")
            } ] ], [ "translation", [ "بیشتر مساحت جنگل‌های آمازون در حوضه آبریز رود آمازون و ۱۱۰۰ شاخه آن واقع شده‌است.", "مردمان نَبَطی از هزاره‌های یکم و دوم پیش از میلاد در این منطقه زندگی می‌کردند." ] ], [ "summarization", [ [ "شاهنامه اثر حکیم ابوالقاسم فردوسی توسی، حماسه‌ای منظوم، بر حسب دست نوشته‌های ", "موجود دربرگیرنده نزدیک به ۵۰٬۰۰۰ بیت تا نزدیک به ۶۱٬۰۰۰ بیت و یکی از ", "بزرگ‌ترین و برجسته‌ترین سروده‌های حماسی جهان است که سرایش آن دست‌آوردِ ", "دست‌کم سی سال کارِ پیوستهٔ این سخن‌سرای نامدار ایرانی است. موضوع این شاهکار ادبی،", " افسانه‌ها و تاریخ ایران از آغاز تا حملهٔ عرب‌ها به ایران در سدهٔ هفتم میلادی است", "  (شاهنامه از سه بخش اسطوره، پهلوانی و تاریخی تشکیل شده‌است) که در چهار", "   دودمان پادشاهیِ پیشدادیان، کیانیان، اشکانیان و ساسانیان گنجانده می‌شود.", "    شاهنامه بر وزن «فَعولُن فعولن فعولن فَعَلْ»، در بحرِ مُتَقارِبِ مثمَّنِ محذوف نگاشته شده‌است.", "هنگامی که زبان دانش و ادبیات در ایران زبان عربی بود، فردوسی، با سرودن شاهنامه", " با ویژگی‌های هدف‌مندی که داشت، زبان پارسی را زنده و پایدار کرد. یکی از ", " بن‌مایه‌های مهمی که فردوسی برای سرودن شاهنامه از آن استفاده کرد،", "  شاهنامهٔ ابومنصوری بود. شاهنامه نفوذ بسیاری در جهت‌گیری ", "  فرهنگ فارسی و نیز بازتاب‌های شکوه‌مندی در ادبیات جهان داشته‌است و شاعران ", "  بزرگی مانند گوته و ویکتور هوگو از آن به نیکی یاد کرده‌اند." ].join("\n") ] ], [ "text-generation", [ "اسم من نازنین است و من", "روزی روزگاری" ] ], [ "fill-mask", [ "زندگی یک سوال است و این که چگونه <mask> کنیم پاسخ این سوال!", "زندگی از مرگ پرسید: چرا همه من را <mask> دارند اما از تو متنفرند؟" ] ] ]), Ce = new Map([ [ "text-classification", [ "أحبك. أهواك" ] ], [ "token-classification", [ "إسمي محمد وأسكن في برلين", "إسمي ساره وأسكن في لندن", "إسمي سامي وأسكن في القدس في فلسطين." ] ], [ "question-answering", [ {
                text: "أين أسكن؟",
                context: "إسمي محمد وأسكن في بيروت"
            }, {
                text: "أين أسكن؟",
                context: "إسمي ساره وأسكن في لندن"
            }, {
                text: "ما اسمي؟",
                context: "اسمي سعيد وأسكن في حيفا."
            }, {
                text: "ما لقب خالد بن الوليد بالعربية؟",
                context: "خالد بن الوليد من أبطال وقادة الفتح الإسلامي وقد تحدثت عنه اللغات الإنجليزية والفرنسية والإسبانية ولقب بسيف الله المسلول."
            } ] ], [ "translation", [ "إسمي محمد وأسكن في برلين", "إسمي ساره وأسكن في لندن" ] ], [ "summarization", [ "تقع الأهرامات في الجيزة قرب القاهرة في مصر وقد بنيت منذ عدة قرون، وقيل إنها كانت قبورا للفراعنة وتم بناؤها بعملية هندسية رائعة واستقدمت حجارتها من جبل المقطم وتم نقلها بالسفن أو على الرمل، وما تزال شامخة ويقصدها السياح من كافة أرجاء المعمورة." ] ], [ "text-generation", [ "إسمي محمد وأحب أن", "دع المكارم لا ترحل لبغيتها - واقعد فإنك أنت الطاعم الكاسي.", "لماذا نحن هنا؟", "القدس مدينة تاريخية، بناها الكنعانيون في", "كان يا ما كان في قديم الزمان" ] ], [ "fill-mask", [ "باريس <mask> فرنسا.", "فلسفة الحياة هي <mask>." ] ], [ "sentence-similarity", [ {
                source_sentence: "هذا شخص سعيد",
                sentences: [ "هذا كلب سعيد", "هذا شخص سعيد جدا", "اليوم هو يوم مشمس" ]
            } ] ] ]), je = new Map([ [ "text-classification", [ "বাঙালির ঘরে ঘরে আজ নবান্ন উৎসব।" ] ], [ "token-classification", [ "আমার নাম জাহিদ এবং আমি ঢাকায় বাস করি।", "তিনি গুগলে চাকরী করেন।", "আমার নাম সুস্মিতা এবং আমি কলকাতায় বাস করি।" ] ], [ "translation", [ "আমার নাম জাহিদ, আমি রংপুরে বাস করি।", "আপনি কী আজকে বাসায় আসবেন?" ] ], [ "summarization", [ "‘ইকোনমিস্ট’ লিখেছে, অ্যান্টিবডির চার মাস স্থায়ী হওয়ার খবরটি দুই কারণে আনন্দের। অ্যান্টিবডি যত দিন পর্যন্ত শরীরে টিকবে, তত দিন সংক্রমণ থেকে সুরক্ষিত থাকা সম্ভব। অর্থাৎ, এমন এক টিকার প্রয়োজন হবে, যা অ্যান্টিবডির উত্পাদনকে প্ররোচিত করতে পারে এবং দীর্ঘস্থায়ী সুরক্ষা দিতে পারে। এগুলো খুঁজে বের করাও সহজ। এটি আভাস দেয়, ব্যাপক হারে অ্যান্টিবডি শনাক্তকরণ ফলাফল মোটামুটি নির্ভুল হওয়া উচিত। দ্বিতীয় আরেকটি গবেষণার নেতৃত্ব দিয়েছেন যুক্তরাজ্যের মেডিকেল রিসার্চ কাউন্সিলের (এমআরসি) ইমিউনোলজিস্ট তাও দং। তিনি টি-সেল শনাক্তকরণে কাজ করেছেন। টি-সেল শনাক্তকরণের প্রক্রিয়া অবশ্য অ্যান্টিবডির মতো এত আলোচিত নয়। তবে সংক্রমণের বিরুদ্ধে লড়াই এবং দীর্ঘমেয়াদি সুরক্ষায় সমান গুরুত্বপূর্ণ ভূমিকা পালন করে। গবেষণাসংক্রান্ত নিবন্ধ প্রকাশিত হয়েছে ‘নেচার ইমিউনোলজি’ সাময়িকীতে। তাঁরা বলছেন, গবেষণার ক্ষেত্রে কোভিড-১৯ মৃদু সংক্রমণের শিকার ২৮ ব্যক্তির রক্তের নমুনা, ১৪ জন গুরুতর অসুস্থ ও ১৬ জন সুস্থ ব্যক্তির রক্তের নমুনা পরীক্ষা করেছেন। গবেষণা নিবন্ধে বলা হয়, সংক্রমিত ব্যক্তিদের ক্ষেত্রে টি-সেলের তীব্র প্রতিক্রিয়া তাঁরা দেখেছেন। এ ক্ষেত্রে মৃদু ও গুরুতর অসুস্থ ব্যক্তিদের ক্ষেত্রে প্রতিক্রিয়ার ভিন্নতা পাওয়া গেছে।" ] ], [ "text-generation", [ "আমি রতন এবং আমি", "তুমি যদি চাও তবে", "মিথিলা আজকে বড্ড" ] ], [ "fill-mask", [ "আমি বাংলায় <mask> গাই।", "আমি <mask> খুব ভালোবাসি। " ] ], [ "question-answering", [ {
                text: "প্রথম এশিয়া কাপ ক্রিকেট টুর্নামেন্ট কোথায় অনুষ্ঠিত হয় ?",
                context: "প্রথম টুর্নামেন্ট অনুষ্ঠিত হয় ১৯৮৪ সালে সংযুক্ত আরব আমিরাত এর শারজাহ তে যেখানে কাউন্সিলের মূল অফিস ছিল (১৯৯৫ পর্যন্ত)। ভারত শ্রীলঙ্কার সাথে আন্তরিকতাহীন ক্রিকেট সম্পর্কের কারণে ১৯৮৬ সালের টুর্নামেন্ট বর্জন করে। ১৯৯৩ সালে ভারত ও পাকিস্তান এর মধ্যে রাজনৈতিক অস্থিরতার কারণে এটি বাতিল হয়ে যায়। শ্রীলঙ্কা এশিয়া কাপ শুরু থেকে অংশ গ্রহণ করে আসছে। আন্তর্জাতিক ক্রিকেট কাউন্সিল নিয়ম করে দিয়েছে যে এশিয়া কাপের সকল খেলা অনুষ্ঠিত হবে অফিসিয়াল একদিনের আন্তর্জাতিক ক্রিকেট হিসেবে। এসিসি ঘোষনা অনুযায়ী প্রতি দুই বছর পর পর টুর্নামেন্ট অনুষ্ঠিত হয় ২০০৮ সাল থেকে।"
            }, {
                text: "ভারতীয় বাঙালি কথাসাহিত্যিক মহাশ্বেতা দেবীর মৃত্যু কবে হয় ?",
                context: "২০১৬ সালের ২৩ জুলাই হৃদরোগে আক্রান্ত হয়ে মহাশ্বেতা দেবী কলকাতার বেল ভিউ ক্লিনিকে ভর্তি হন। সেই বছরই ২৮ জুলাই একাধিক অঙ্গ বিকল হয়ে তাঁর মৃত্যু ঘটে। তিনি মধুমেহ, সেপ্টিসেমিয়া ও মূত্র সংক্রমণ রোগেও ভুগছিলেন।"
            }, {
                text: "মাস্টারদা সূর্যকুমার সেনের বাবার নাম কী ছিল ?",
                context: "সূর্য সেন ১৮৯৪ সালের ২২ মার্চ চট্টগ্রামের রাউজান থানার নোয়াপাড়ায় অর্থনৈতিক ভাবে অস্বচ্ছল পরিবারে জন্মগ্রহণ করেন। তাঁর পিতার নাম রাজমনি সেন এবং মাতার নাম শশী বালা সেন। রাজমনি সেনের দুই ছেলে আর চার মেয়ে। সূর্য সেন তাঁদের পরিবারের চতুর্থ সন্তান। দুই ছেলের নাম সূর্য ও কমল। চার মেয়ের নাম বরদাসুন্দরী, সাবিত্রী, ভানুমতী ও প্রমিলা। শৈশবে পিতা মাতাকে হারানো সূর্য সেন কাকা গৌরমনি সেনের কাছে মানুষ হয়েছেন। সূর্য সেন ছেলেবেলা থেকেই খুব মনোযোগী ভাল ছাত্র ছিলেন এবং ধর্মভাবাপন্ন গম্ভীর প্রকৃতির ছিলেন।"
            } ] ], [ "sentence-similarity", [ {
                source_sentence: "সে একজন সুখী ব্যক্তি",
                sentences: [ "সে হ্যাপি কুকুর", "সে খুব সুখী মানুষ", "আজ একটি রৌদ্রোজ্জ্বল দিন" ]
            } ] ] ]), Le = new Map([ [ "text-classification", [ "Би чамд хайртай" ] ], [ "token-classification", [ "Намайг Дорж гэдэг. Би Улаанбаатарт амьдардаг.", "Намайг Ганбат гэдэг. Би Увс аймагт төрсөн.", "Манай улс таван хошуу малтай." ] ], [ "question-answering", [ {
                text: "Та хаана амьдардаг вэ?",
                context: "Намайг Дорж гэдэг. Би Улаанбаатарт амьдардаг."
            }, {
                text: "Таныг хэн гэдэг вэ?",
                context: "Намайг Дорж гэдэг. Би Улаанбаатарт амьдардаг."
            }, {
                text: "Миний нэрийг хэн гэдэг вэ?",
                context: "Намайг Ганбат гэдэг. Би Увс аймагт төрсөн."
            } ] ], [ "translation", [ "Намайг Дорж гэдэг. Би Улаанбаатарт амьдардаг.", "Намайг Ганбат гэдэг. Би Увс аймагт төрсөн." ] ], [ "summarization", [ "Монгол Улс (1992 оноос хойш) — дорно болон төв Азид оршдог бүрэн эрхт улс. Хойд талаараа Орос, бусад талаараа Хятад улстай хиллэдэг далайд гарцгүй орон. Нийслэл — Улаанбаатар хот. Алтайн нуруунаас Хянган, Соёноос Говь хүрсэн 1 сая 566 мянган км2 уудам нутагтай, дэлхийд нутаг дэвсгэрийн хэмжээгээр 19-рт жагсдаг. 2015 оны эхэнд Монгол Улсын хүн ам 3 сая хүрсэн (135-р олон). Үндсэндээ монгол үндэстэн (95 хувь), мөн хасаг, тува хүн байна. 16-р зуунаас хойш буддын шашин, 20-р зуунаас шашингүй байдал дэлгэрсэн ба албан хэрэгт монгол хэлээр харилцана." ] ], [ "text-generation", [ "Намайг Дорж гэдэг. Би", "Хамгийн сайн дуучин бол", "Миний дуртай хамтлаг бол", "Эрт урьдын цагт" ] ], [ "fill-mask", [ "Монгол улсын <mask> Улаанбаатар хотоос ярьж байна.", "Миний амьдралын зорилго бол <mask>." ] ], [ "automatic-speech-recognition", [ {
                label: "Common Voice Train Example",
                src: "https://cdn-media.huggingface.co/common_voice/train/common_voice_mn_18577472.wav"
            }, {
                label: "Common Voice Test Example",
                src: "https://cdn-media.huggingface.co/common_voice/test/common_voice_mn_18577346.wav"
            } ] ], [ "text-to-speech", [ "Би Монгол улсын иргэн.", "Энэхүү жишээ нь цаанаа ямар ч утга агуулаагүй болно", "Сар шинэдээ сайхан шинэлэж байна уу?" ] ], [ "sentence-similarity", [ {
                source_sentence: "Энэ бол аз жаргалтай хүн юм",
                sentences: [ "Энэ бол аз жаргалтай нохой юм", "Энэ бол маш их аз жаргалтай хүн юм", "Өнөөдөр нарлаг өдөр байна" ]
            } ] ] ]), Ue = new Map([ [ "translation", [ "සිංහල ඉතා අලංකාර භාෂාවකි.", "මෙම තාක්ෂණය භාවිතා කරන ඔබට ස්තූතියි." ] ], [ "fill-mask", [ "මම ගෙදර <mask>.", "<mask> ඉගෙනීමට ගියාය." ] ] ]), Oe = new Map([ [ "question-answering", [ {
                text: "Wo wohne ich?",
                context: "Mein Name ist Wolfgang und ich lebe in Berlin"
            }, {
                text: "Welcher Name wird auch verwendet, um den Amazonas-Regenwald auf Englisch zu beschreiben?",
                context: 'Der Amazonas-Regenwald, auf Englisch auch als Amazonien oder Amazonas-Dschungel bekannt, ist ein feuchter Laubwald, der den größten Teil des Amazonas-Beckens Südamerikas bedeckt. Dieses Becken umfasst 7.000.000 Quadratkilometer (2.700.000 Quadratmeilen), von denen 5.500.000 Quadratkilometer (2.100.000 Quadratmeilen) vom Regenwald bedeckt sind. Diese Region umfasst Gebiete von neun Nationen. Der größte Teil des Waldes befindet sich in Brasilien mit 60% des Regenwaldes, gefolgt von Peru mit 13%, Kolumbien mit 10% und geringen Mengen in Venezuela, Ecuador, Bolivien, Guyana, Suriname und Französisch-Guayana. Staaten oder Abteilungen in vier Nationen enthalten "Amazonas" in ihren Namen. Der Amazonas repräsentiert mehr als die Hälfte der verbleibenden Regenwälder des Planeten und umfasst den größten und artenreichsten tropischen Regenwald der Welt mit geschätzten 390 Milliarden Einzelbäumen, die in 16.000 Arten unterteilt sind.'
            } ] ], [ "sentence-similarity", [ {
                source_sentence: "Das ist eine glückliche Person",
                sentences: [ "Das ist ein glücklicher Hund", "Das ist eine sehr glückliche Person", "Heute ist ein sonniger Tag" ]
            } ] ] ]), $e = new Map([ [ "text-classification", [ "އަހަރެން ގަޔާވޭ. އަހަރެން ލޯބިވޭ" ] ], [ "token-classification", [ "އަހަރެންގެ ނަމަކީ އަހުމަދު އަދި އަހަރެން ދިރިއުޅެނީ މާލޭގަ", "އަހަރެންގެ ނަމަކީ ސާރާ އަދި އަހަރެން ދިރިއުޅެނީ އުތީމުގަ", "އަހަރެންގެ ނަމަކީ އައިޝާ އަދި އަހަރެން ދިރިއުޅެނީ ފޭދޫ، އައްޑޫގަ" ] ], [ "question-answering", [ {
                text: "އަހަރެން ދިރިއުޅެނީ ކޮންތާކު؟",
                context: "އަހަރެންގެ ނަމަކީ އަހުމަދު އަދި އަހަރެން ދިރިއުޅެނީ މާލޭގަ"
            }, {
                text: "އަހަރެން ދިރިއުޅެނީ ކޮންތާކު؟",
                context: "އަހަރެންގެ ނަމަކީ ސާރާ އަދި އަހަރެން ދިރިއުޅެނީ އުތީމުގަ"
            }, {
                text: "އަހަރެންގެ ނަމަކީ ކޮބާ؟",
                context: "އަހަރެންގެ ނަމަކީ އައިޝާ އަދި އަހަރެން ދިރިއުޅެނީ ފޭދޫގަ"
            }, {
                text: "އެމޭޒަން ރެއިންފޮރެސްޓް ސިފަކޮށްދިނުމަށް އިނގިރޭސި ބަހުން ބޭނުންކުރާނީ ކޮންނަމެއް؟",
                context: 'އެމޭޒަން ރެއިންފޮރެސްޓް (ޕޯޗުޖީޒް: ފްލޮރެސްޓާ އެމަސޮނިކާ ނުވަތަ އެމަސޮނިއާ؛ ސްޕެނިޝް: ސެލްވާ އެމަސޮނިކާ, އެމަސޮނިއާ ނޫނީ އާންމުކޮށް އެމަޒޯނިއާ؛ ފްރެންޗް: ފޮރޭ އެމެޒޮނިއެން؛ ޑަޗް: އެމެޒޯންރޭގެވައުޑް)، އިގިރޭސި ބަހުން ބުނާ އެމެޒޯނިއާ ނުވަތަ ދަ އެމޭޒަން ޖަންގަލް އަކީ, ސައުތު އެމެރިކާގެ އެމޭޒަން ބޭސިން ސަރަހައްދުގެ ބޮޑުބައެއްގައި ހިމެނޭ މޮއިސްޓް ބޮރޯޑްލީފް ފޮރެސްޓެއެކެވެ. އެމޭޒަން ބޭސިން ސަރަހައްދުގެ ބޮޑު މިނަކީ 7 މިލިއަން އަކަ ކިލޯމީޓަރ (2.7 މިލިއަން އަކަ މައިލް(. މީގެ ތެރެއިން 5.5 މިލިއަން އަކަ ކިލޯމީޓަރ (2.1 މިލިއަން އަކަ މައިލް) އަކީ މި ފޮރެސްޓެވެ. މި ސަރަހައްދުގައި 9 ގައުމަކަށް ނިސްބަތްވާ ޓެރިޓަރީ ހިމެނެއެވެ.  60% އާއިއެކެ އެންމެ ބޮޑު ބައެއް ނިސްބަތްވަނީ ބްރެޒިލްއަށެވެ. އޭގެ ފަހުތުން 13% އާއެކު ޕެރޫ އާއި 10% އާއެކު ކޮލަމްބިއާ އަދި ކުޑަ ބައެއް ހިމެނޭ ގޮތުން ވެނެޒުއެލާ, އެކްއަޑޯ, ބޮލިވިއާ, ގުޔާނާ, ސުރިނާމް އަދި ފްރެންޗް ގްއާނާ އަށް ވެސް ނިސްބަތްވެއެވެ. މީގެ ތެރެއިން 4 ގައުމެއްގައި "އެމެޒޮނާސް" ހިމަނައިގެން ސްޓޭޓް ނުވަތަ ޑިޕާޓްމަންޓް އަކަށް ނަންދީފައިވެއެވެ. މުޅި ދުނިޔޭގައި ބާކީ ހުރި ރެއިންފޮރެސްޓްގެ ތެރެއިން ދެބައިކުޅަ އެއްބަޔަށްވުރެބޮޑުވަރެއް އެމޭޒޮން ރެއިންފޮރެސްޓް ހިއްސާކުރެއެވެ. މިއީ މުޅި ދުނިޔެއިން އެންމޮ ބޮޑު އަދި އެންމެ ބައޮޑައިވަރސް ރެއިންފޮރެސްޓް ޓްރެކްޓެވެ. ލަފާކުރެވޭ ގޮތުން 16 ހާސް ސްޕީޝީސްއަށް ބެހިގެންވާ 390 މިލިއަން ވައްތަރުގެ ގަސް މިތާގައި ހިމެނެއެވެ'
            } ] ], [ "translation", [ "އަހަރެންގެ ނަމަކީ އަހުމަދު އަދި އަހަރެން ދިރިއުޅެނީ މާލޭގަ", "އަހަރެންގެ ނަމަކީ ސާރާ އަދި އަހަރެން ދިރިއުޅެނީ އުތީމުގަ" ] ], [ "summarization", [ "ޓަވަރުގެ އުސްމިނަކީ 324 މީޓަރު، އެއީ ގާތްގަނޑަކަށް 81 ބުރީގެ އިމާރާތަކާއި އެއްވަރެވެ. އެއީ ޕެރިސްގައި ހުރި އެންމެ އުސް އިމާރާތެވެ. އޭގެ ހަތަރެސްކަނަށް ހުރި ބުޑުގެ ދިގުމިނަކީ ކޮންމެ ފަރާތަކުން 125 މީޓަރެވެ. (410 ފޫޓު) އައިފިލް ޓަވަރު ބިނާކުރި އިރު، ވޮޝިންގްޓަން މޮނިއުމެންޓްގެ އުސްމިން ފަހަނައަޅާ ގޮސް، ދުނިޔޭގައި މީހުން އުފެއްދި ތަންތަނުގެ ތެރެއިން އެންމެ އުސް ތަނުގެ ލަގަބު ލިބުނެވެ. އަދި 1930 ގައި ނިއު ޔޯކްގެ ކްރައިސްލަރ ބިލްޑިންގް ބިނާކުރުމާއި ހަމައަށް 41 އަހަރު ވަންދެން މިލަގަބު ހިފެހެއްޓިއެވެ. މިއީ 300 މީޓަރަށް ވުރެ އުސްކޮށް އިމާރާތްކުރެވުނު ފުރަތަމަ ތަނެވެ. 1957 ގައި ޓަވަރުގެ އެންމެ މަތީގައި ހަރުކުރެވުނު ބްރޯޑްކާސްޓިންގ އޭރިއަލްގެ ސަބަބުން މިހާރު މި ޓަވަރު ކްރައިސްލަރ ބިލްޑިންގއަށް ވުރެ 5.2 މީޓަރ (17 ފޫޓު) އުހެވެ. މި ޓްރާންސްމިޓަރު ނުލާ، އައިފިލް ޓަވަރަކީ، މިލާއު ވިއާޑަކްޓަށް ފަހު ފްރާންސްގައި ހުރި 2 ވަނައަށް އެންމެ އުސް ފްރީސްޓޭންޑިންގ އިމާރާތެވެ" ] ], [ "text-generation", [ "އަހަރެންގެ ނަމަކީ ޔޫސުފް އަދި އަހަރެންގެ މައިގަނޑު", "އަހަރެންގެ ނަމަކީ މަރިއަމް، އަހަރެން އެންމެ ގަޔާވާ", "އަހަރެންގެ ނަމަކީ ފާތުމަތު އަދި އަހަރެން", "،އެއް ޒަމާނެއްގައި" ] ], [ "fill-mask", [ ".<mask> މާލެ އަކީ ދިވެހިރާއްޖޭގެ", "ގަރުދިޔައަކީ ދިވެހިންގެ މެދުގައި <mask> ކެއުމެއް." ] ] ]), Pe = (new Map([ [ "en", _e ], [ "zh", ke ], [ "fr", Ae ], [ "es", Se ], [ "ru", Te ], [ "uk", Ie ], [ "it", Ee ], [ "fa", Me ], [ "ar", Ce ], [ "bn", je ], [ "mn", Le ], [ "si", Ue ], [ "de", Oe ], [ "dv", $e ] ]), 
            {
                "text-classification": {
                    name: "Text Classification",
                    subtasks: [ {
                        type: "acceptability-classification",
                        name: "Acceptability Classification"
                    }, {
                        type: "entity-linking-classification",
                        name: "Entity Linking Classification"
                    }, {
                        type: "fact-checking",
                        name: "Fact Checking"
                    }, {
                        type: "intent-classification",
                        name: "Intent Classification"
                    }, {
                        type: "language-identification",
                        name: "Language Identification"
                    }, {
                        type: "multi-class-classification",
                        name: "Multi Class Classification"
                    }, {
                        type: "multi-label-classification",
                        name: "Multi Label Classification"
                    }, {
                        type: "multi-input-text-classification",
                        name: "Multi-input Text Classification"
                    }, {
                        type: "natural-language-inference",
                        name: "Natural Language Inference"
                    }, {
                        type: "semantic-similarity-classification",
                        name: "Semantic Similarity Classification"
                    }, {
                        type: "sentiment-classification",
                        name: "Sentiment Classification"
                    }, {
                        type: "topic-classification",
                        name: "Topic Classification"
                    }, {
                        type: "semantic-similarity-scoring",
                        name: "Semantic Similarity Scoring"
                    }, {
                        type: "sentiment-scoring",
                        name: "Sentiment Scoring"
                    }, {
                        type: "sentiment-analysis",
                        name: "Sentiment Analysis"
                    }, {
                        type: "hate-speech-detection",
                        name: "Hate Speech Detection"
                    }, {
                        type: "text-scoring",
                        name: "Text Scoring"
                    } ],
                    modality: "nlp",
                    color: "orange"
                },
                "token-classification": {
                    name: "Token Classification",
                    subtasks: [ {
                        type: "named-entity-recognition",
                        name: "Named Entity Recognition"
                    }, {
                        type: "part-of-speech",
                        name: "Part of Speech"
                    }, {
                        type: "parsing",
                        name: "Parsing"
                    }, {
                        type: "lemmatization",
                        name: "Lemmatization"
                    }, {
                        type: "word-sense-disambiguation",
                        name: "Word Sense Disambiguation"
                    }, {
                        type: "coreference-resolution",
                        name: "Coreference-resolution"
                    } ],
                    modality: "nlp",
                    color: "blue"
                },
                "table-question-answering": {
                    name: "Table Question Answering",
                    modality: "nlp",
                    color: "green"
                },
                "question-answering": {
                    name: "Question Answering",
                    subtasks: [ {
                        type: "extractive-qa",
                        name: "Extractive QA"
                    }, {
                        type: "open-domain-qa",
                        name: "Open Domain QA"
                    }, {
                        type: "closed-domain-qa",
                        name: "Closed Domain QA"
                    } ],
                    modality: "nlp",
                    color: "blue"
                },
                "zero-shot-classification": {
                    name: "Zero-Shot Classification",
                    modality: "nlp",
                    color: "yellow"
                },
                translation: {
                    name: "Translation",
                    modality: "nlp",
                    color: "green"
                },
                summarization: {
                    name: "Summarization",
                    subtasks: [ {
                        type: "news-articles-summarization",
                        name: "News Articles Summarization"
                    }, {
                        type: "news-articles-headline-generation",
                        name: "News Articles Headline Generation"
                    } ],
                    modality: "nlp",
                    color: "indigo"
                },
                "feature-extraction": {
                    name: "Feature Extraction",
                    modality: "nlp",
                    color: "red"
                },
                "text-generation": {
                    name: "Text Generation",
                    subtasks: [ {
                        type: "dialogue-modeling",
                        name: "Dialogue Modeling"
                    }, {
                        type: "dialogue-generation",
                        name: "Dialogue Generation"
                    }, {
                        type: "conversational",
                        name: "Conversational"
                    }, {
                        type: "language-modeling",
                        name: "Language Modeling"
                    } ],
                    modality: "nlp",
                    color: "indigo"
                },
                "text2text-generation": {
                    name: "Text2Text Generation",
                    subtasks: [ {
                        type: "text-simplification",
                        name: "Text simplification"
                    }, {
                        type: "explanation-generation",
                        name: "Explanation Generation"
                    }, {
                        type: "abstractive-qa",
                        name: "Abstractive QA"
                    }, {
                        type: "open-domain-abstractive-qa",
                        name: "Open Domain Abstractive QA"
                    }, {
                        type: "closed-domain-qa",
                        name: "Closed Domain QA"
                    }, {
                        type: "open-book-qa",
                        name: "Open Book QA"
                    }, {
                        type: "closed-book-qa",
                        name: "Closed Book QA"
                    } ],
                    modality: "nlp",
                    color: "indigo"
                },
                "fill-mask": {
                    name: "Fill-Mask",
                    subtasks: [ {
                        type: "slot-filling",
                        name: "Slot Filling"
                    }, {
                        type: "masked-language-modeling",
                        name: "Masked Language Modeling"
                    } ],
                    modality: "nlp",
                    color: "red"
                },
                "sentence-similarity": {
                    name: "Sentence Similarity",
                    modality: "nlp",
                    color: "yellow"
                },
                "text-to-speech": {
                    name: "Text-to-Speech",
                    modality: "audio",
                    color: "yellow"
                },
                "text-to-audio": {
                    name: "Text-to-Audio",
                    modality: "audio",
                    color: "yellow"
                },
                "automatic-speech-recognition": {
                    name: "Automatic Speech Recognition",
                    modality: "audio",
                    color: "yellow"
                },
                "audio-to-audio": {
                    name: "Audio-to-Audio",
                    modality: "audio",
                    color: "blue"
                },
                "audio-classification": {
                    name: "Audio Classification",
                    subtasks: [ {
                        type: "keyword-spotting",
                        name: "Keyword Spotting"
                    }, {
                        type: "speaker-identification",
                        name: "Speaker Identification"
                    }, {
                        type: "audio-intent-classification",
                        name: "Audio Intent Classification"
                    }, {
                        type: "audio-emotion-recognition",
                        name: "Audio Emotion Recognition"
                    }, {
                        type: "audio-language-identification",
                        name: "Audio Language Identification"
                    } ],
                    modality: "audio",
                    color: "green"
                },
                "audio-text-to-text": {
                    name: "Audio-Text-to-Text",
                    modality: "multimodal",
                    color: "red",
                    hideInDatasets: !0
                },
                "voice-activity-detection": {
                    name: "Voice Activity Detection",
                    modality: "audio",
                    color: "red"
                },
                "depth-estimation": {
                    name: "Depth Estimation",
                    modality: "cv",
                    color: "yellow"
                },
                "image-classification": {
                    name: "Image Classification",
                    subtasks: [ {
                        type: "multi-label-image-classification",
                        name: "Multi Label Image Classification"
                    }, {
                        type: "multi-class-image-classification",
                        name: "Multi Class Image Classification"
                    } ],
                    modality: "cv",
                    color: "blue"
                },
                "object-detection": {
                    name: "Object Detection",
                    subtasks: [ {
                        type: "face-detection",
                        name: "Face Detection"
                    }, {
                        type: "vehicle-detection",
                        name: "Vehicle Detection"
                    } ],
                    modality: "cv",
                    color: "yellow"
                },
                "image-segmentation": {
                    name: "Image Segmentation",
                    subtasks: [ {
                        type: "instance-segmentation",
                        name: "Instance Segmentation"
                    }, {
                        type: "semantic-segmentation",
                        name: "Semantic Segmentation"
                    }, {
                        type: "panoptic-segmentation",
                        name: "Panoptic Segmentation"
                    } ],
                    modality: "cv",
                    color: "green"
                },
                "text-to-image": {
                    name: "Text-to-Image",
                    modality: "cv",
                    color: "yellow"
                },
                "image-to-text": {
                    name: "Image-to-Text",
                    subtasks: [ {
                        type: "image-captioning",
                        name: "Image Captioning"
                    } ],
                    modality: "cv",
                    color: "red"
                },
                "image-to-image": {
                    name: "Image-to-Image",
                    subtasks: [ {
                        type: "image-inpainting",
                        name: "Image Inpainting"
                    }, {
                        type: "image-colorization",
                        name: "Image Colorization"
                    }, {
                        type: "super-resolution",
                        name: "Super Resolution"
                    } ],
                    modality: "cv",
                    color: "indigo"
                },
                "image-to-video": {
                    name: "Image-to-Video",
                    modality: "cv",
                    color: "indigo"
                },
                "unconditional-image-generation": {
                    name: "Unconditional Image Generation",
                    modality: "cv",
                    color: "green"
                },
                "video-classification": {
                    name: "Video Classification",
                    modality: "cv",
                    color: "blue"
                },
                "reinforcement-learning": {
                    name: "Reinforcement Learning",
                    modality: "rl",
                    color: "red"
                },
                robotics: {
                    name: "Robotics",
                    modality: "rl",
                    subtasks: [ {
                        type: "grasping",
                        name: "Grasping"
                    }, {
                        type: "task-planning",
                        name: "Task Planning"
                    } ],
                    color: "blue"
                },
                "tabular-classification": {
                    name: "Tabular Classification",
                    modality: "tabular",
                    subtasks: [ {
                        type: "tabular-multi-class-classification",
                        name: "Tabular Multi Class Classification"
                    }, {
                        type: "tabular-multi-label-classification",
                        name: "Tabular Multi Label Classification"
                    } ],
                    color: "blue"
                },
                "tabular-regression": {
                    name: "Tabular Regression",
                    modality: "tabular",
                    subtasks: [ {
                        type: "tabular-single-column-regression",
                        name: "Tabular Single Column Regression"
                    } ],
                    color: "blue"
                },
                "tabular-to-text": {
                    name: "Tabular to Text",
                    modality: "tabular",
                    subtasks: [ {
                        type: "rdf-to-text",
                        name: "RDF to text"
                    } ],
                    color: "blue",
                    hideInModels: !0
                },
                "table-to-text": {
                    name: "Table to Text",
                    modality: "nlp",
                    color: "blue",
                    hideInModels: !0
                },
                "multiple-choice": {
                    name: "Multiple Choice",
                    subtasks: [ {
                        type: "multiple-choice-qa",
                        name: "Multiple Choice QA"
                    }, {
                        type: "multiple-choice-coreference-resolution",
                        name: "Multiple Choice Coreference Resolution"
                    } ],
                    modality: "nlp",
                    color: "blue",
                    hideInModels: !0
                },
                "text-ranking": {
                    name: "Text Ranking",
                    modality: "nlp",
                    color: "red"
                },
                "text-retrieval": {
                    name: "Text Retrieval",
                    subtasks: [ {
                        type: "document-retrieval",
                        name: "Document Retrieval"
                    }, {
                        type: "utterance-retrieval",
                        name: "Utterance Retrieval"
                    }, {
                        type: "entity-linking-retrieval",
                        name: "Entity Linking Retrieval"
                    }, {
                        type: "fact-checking-retrieval",
                        name: "Fact Checking Retrieval"
                    } ],
                    modality: "nlp",
                    color: "indigo",
                    hideInModels: !0
                },
                "time-series-forecasting": {
                    name: "Time Series Forecasting",
                    modality: "tabular",
                    subtasks: [ {
                        type: "univariate-time-series-forecasting",
                        name: "Univariate Time Series Forecasting"
                    }, {
                        type: "multivariate-time-series-forecasting",
                        name: "Multivariate Time Series Forecasting"
                    } ],
                    color: "blue"
                },
                "text-to-video": {
                    name: "Text-to-Video",
                    modality: "cv",
                    color: "green"
                },
                "image-text-to-text": {
                    name: "Image-Text-to-Text",
                    modality: "multimodal",
                    color: "red",
                    hideInDatasets: !0
                },
                "visual-question-answering": {
                    name: "Visual Question Answering",
                    subtasks: [ {
                        type: "visual-question-answering",
                        name: "Visual Question Answering"
                    } ],
                    modality: "multimodal",
                    color: "red"
                },
                "document-question-answering": {
                    name: "Document Question Answering",
                    subtasks: [ {
                        type: "document-question-answering",
                        name: "Document Question Answering"
                    } ],
                    modality: "multimodal",
                    color: "blue",
                    hideInDatasets: !0
                },
                "zero-shot-image-classification": {
                    name: "Zero-Shot Image Classification",
                    modality: "cv",
                    color: "yellow"
                },
                "graph-ml": {
                    name: "Graph Machine Learning",
                    modality: "other",
                    color: "green"
                },
                "mask-generation": {
                    name: "Mask Generation",
                    modality: "cv",
                    color: "indigo"
                },
                "zero-shot-object-detection": {
                    name: "Zero-Shot Object Detection",
                    modality: "cv",
                    color: "yellow"
                },
                "text-to-3d": {
                    name: "Text-to-3D",
                    modality: "cv",
                    color: "yellow"
                },
                "image-to-3d": {
                    name: "Image-to-3D",
                    modality: "cv",
                    color: "green"
                },
                "image-feature-extraction": {
                    name: "Image Feature Extraction",
                    modality: "cv",
                    color: "indigo"
                },
                "video-text-to-text": {
                    name: "Video-Text-to-Text",
                    modality: "multimodal",
                    color: "blue",
                    hideInDatasets: !1
                },
                "keypoint-detection": {
                    name: "Keypoint Detection",
                    subtasks: [ {
                        type: "pose-estimation",
                        name: "Pose Estimation"
                    } ],
                    modality: "cv",
                    color: "red",
                    hideInDatasets: !0
                },
                "visual-document-retrieval": {
                    name: "Visual Document Retrieval",
                    modality: "multimodal",
                    color: "yellow",
                    hideInDatasets: !0
                },
                "any-to-any": {
                    name: "Any-to-Any",
                    modality: "multimodal",
                    color: "yellow",
                    hideInDatasets: !0
                },
                other: {
                    name: "Other",
                    modality: "other",
                    color: "blue",
                    hideInModels: !0,
                    hideInDatasets: !0
                }
            }), Re = Object.keys(Pe), De = (Object.values(Pe).flatMap((e => "subtasks" in e ? e.subtasks : [])).map((e => e.type)), 
            new Set(Re), {
                datasets: [ {
                    description: "A benchmark of 10 different audio tasks.",
                    id: "s3prl/superb"
                }, {
                    description: "A dataset of YouTube clips and their sound categories.",
                    id: "agkphysics/AudioSet"
                } ],
                demo: {
                    inputs: [ {
                        filename: "audio.wav",
                        type: "audio"
                    } ],
                    outputs: [ {
                        data: [ {
                            label: "Up",
                            score: .2
                        }, {
                            label: "Down",
                            score: .8
                        } ],
                        type: "chart"
                    } ]
                },
                metrics: [ {
                    description: "",
                    id: "accuracy"
                }, {
                    description: "",
                    id: "recall"
                }, {
                    description: "",
                    id: "precision"
                }, {
                    description: "",
                    id: "f1"
                } ],
                models: [ {
                    description: "An easy-to-use model for command recognition.",
                    id: "speechbrain/google_speech_command_xvector"
                }, {
                    description: "An emotion recognition model.",
                    id: "ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition"
                }, {
                    description: "A language identification model.",
                    id: "facebook/mms-lid-126"
                } ],
                spaces: [ {
                    description: "An application that can classify music into different genre.",
                    id: "kurianbenoy/audioclassification"
                } ],
                summary: "Audio classification is the task of assigning a label or class to a given audio. It can be used for recognizing which command a user is giving or the emotion of a statement, as well as identifying a speaker.",
                widgetModels: [ "MIT/ast-finetuned-audioset-10-10-0.4593" ],
                youtubeId: "KWwzcmG98Ds"
            }), Ze = {
                datasets: [],
                demo: {
                    inputs: [],
                    outputs: []
                },
                isPlaceholder: !0,
                metrics: [],
                models: [],
                spaces: [],
                summary: "",
                widgetModels: [],
                youtubeId: void 0,
                canonicalId: void 0
            }, Tt = {
                "audio-classification": [ "speechbrain", "transformers", "transformers.js" ],
                "audio-to-audio": [ "asteroid", "fairseq", "speechbrain" ],
                "automatic-speech-recognition": [ "espnet", "nemo", "speechbrain", "transformers", "transformers.js" ],
                "audio-text-to-text": [],
                "depth-estimation": [ "transformers", "transformers.js" ],
                "document-question-answering": [ "transformers", "transformers.js" ],
                "feature-extraction": [ "sentence-transformers", "transformers", "transformers.js" ],
                "fill-mask": [ "transformers", "transformers.js" ],
                "graph-ml": [ "transformers" ],
                "image-classification": [ "keras", "timm", "transformers", "transformers.js" ],
                "image-feature-extraction": [ "timm", "transformers" ],
                "image-segmentation": [ "transformers", "transformers.js" ],
                "image-text-to-text": [ "transformers" ],
                "image-to-image": [ "diffusers", "transformers", "transformers.js" ],
                "image-to-text": [ "transformers", "transformers.js" ],
                "image-to-video": [ "diffusers" ],
                "keypoint-detection": [ "transformers" ],
                "video-classification": [ "transformers" ],
                "mask-generation": [ "transformers" ],
                "multiple-choice": [ "transformers" ],
                "object-detection": [ "transformers", "transformers.js", "ultralytics" ],
                other: [],
                "question-answering": [ "adapter-transformers", "allennlp", "transformers", "transformers.js" ],
                robotics: [],
                "reinforcement-learning": [ "transformers", "stable-baselines3", "ml-agents", "sample-factory" ],
                "sentence-similarity": [ "sentence-transformers", "spacy", "transformers.js" ],
                summarization: [ "transformers", "transformers.js" ],
                "table-question-answering": [ "transformers" ],
                "table-to-text": [ "transformers" ],
                "tabular-classification": [ "sklearn" ],
                "tabular-regression": [ "sklearn" ],
                "tabular-to-text": [ "transformers" ],
                "text-classification": [ "adapter-transformers", "setfit", "spacy", "transformers", "transformers.js" ],
                "text-generation": [ "transformers", "transformers.js" ],
                "text-ranking": [ "sentence-transformers", "transformers" ],
                "text-retrieval": [],
                "text-to-image": [ "diffusers" ],
                "text-to-speech": [ "espnet", "tensorflowtts", "transformers", "transformers.js" ],
                "text-to-audio": [ "transformers", "transformers.js" ],
                "text-to-video": [ "diffusers" ],
                "text2text-generation": [ "transformers", "transformers.js" ],
                "time-series-forecasting": [],
                "token-classification": [ "adapter-transformers", "flair", "spacy", "span-marker", "stanza", "transformers", "transformers.js" ],
                translation: [ "transformers", "transformers.js" ],
                "unconditional-image-generation": [ "diffusers" ],
                "video-text-to-text": [ "transformers" ],
                "visual-question-answering": [ "transformers", "transformers.js" ],
                "voice-activity-detection": [],
                "zero-shot-classification": [ "transformers", "transformers.js" ],
                "zero-shot-image-classification": [ "transformers", "transformers.js" ],
                "zero-shot-object-detection": [ "transformers", "transformers.js" ],
                "text-to-3d": [ "diffusers" ],
                "image-to-3d": [ "diffusers" ],
                "any-to-any": [ "transformers" ],
                "visual-document-retrieval": [ "transformers" ]
            };
            function It(e, t = Ze) {
                return {
                    ...t,
                    id: e,
                    label: Pe[e].name,
                    libraries: Tt[e]
                };
            }
            It("any-to-any", {
                datasets: [ {
                    description: "A dataset with multiple modality input and output pairs.",
                    id: "PKU-Alignment/align-anything"
                } ],
                demo: {
                    inputs: [ {
                        filename: "any-to-any-input.jpg",
                        type: "img"
                    }, {
                        label: "Text Prompt",
                        content: "What is the significance of this place?",
                        type: "text"
                    } ],
                    outputs: [ {
                        label: "Generated Text",
                        content: "The place in the picture is Osaka Castle, located in Osaka, Japan. Osaka Castle is a historic castle that was originally built in the 16th century by Toyotomi Hideyoshi, a powerful warlord of the time. It is one of the most famous landmarks in Osaka and is known for its distinctive white walls and black roof tiles. The castle has been rebuilt several times over the centuries and is now a popular tourist attraction, offering visitors a glimpse into Japan's rich history and culture.",
                        type: "text"
                    }, {
                        filename: "any-to-any-output.wav",
                        type: "audio"
                    } ]
                },
                metrics: [],
                models: [ {
                    description: "Strong model that can take in video, audio, image, text and output text and natural speech.",
                    id: "Qwen/Qwen2.5-Omni-7B"
                }, {
                    description: "Robust model that can take in image and text and generate image and text.",
                    id: "deepseek-ai/Janus-Pro-7B"
                }, {
                    description: "Any-to-any model with speech, video, audio, image and text understanding capabilities.",
                    id: "openbmb/MiniCPM-o-2_6"
                }, {
                    description: "A model that can understand image and text and generate image and text.",
                    id: "EPFL-VILAB/4M-21_XL"
                } ],
                spaces: [ {
                    description: "An application to chat with an any-to-any (image & text) model.",
                    id: "deepseek-ai/Janus-Pro-7B"
                } ],
                summary: "Any-to-any models can understand two or more modalities and output two or more modalities.",
                widgetModels: [],
                youtubeId: ""
            }), It("audio-classification", De), It("audio-to-audio", {
                datasets: [ {
                    description: "512-element X-vector embeddings of speakers from CMU ARCTIC dataset.",
                    id: "Matthijs/cmu-arctic-xvectors"
                } ],
                demo: {
                    inputs: [ {
                        filename: "input.wav",
                        type: "audio"
                    } ],
                    outputs: [ {
                        filename: "label-0.wav",
                        type: "audio"
                    }, {
                        filename: "label-1.wav",
                        type: "audio"
                    } ]
                },
                metrics: [ {
                    description: "The Signal-to-Noise ratio is the relationship between the target signal level and the background noise level. It is calculated as the logarithm of the target signal divided by the background noise, in decibels.",
                    id: "snri"
                }, {
                    description: "The Signal-to-Distortion ratio is the relationship between the target signal and the sum of noise, interference, and artifact errors",
                    id: "sdri"
                } ],
                models: [ {
                    description: "A speech enhancement model.",
                    id: "ResembleAI/resemble-enhance"
                }, {
                    description: "A model that can change the voice in a speech recording.",
                    id: "microsoft/speecht5_vc"
                } ],
                spaces: [ {
                    description: "An application for speech separation.",
                    id: "younver/speechbrain-speech-separation"
                }, {
                    description: "An application for audio style transfer.",
                    id: "nakas/audio-diffusion_style_transfer"
                } ],
                summary: "Audio-to-Audio is a family of tasks in which the input is an audio and the output is one or multiple generated audios. Some example tasks are speech enhancement and source separation.",
                widgetModels: [ "speechbrain/sepformer-wham" ],
                youtubeId: "iohj7nCCYoM"
            }), It("audio-text-to-text", Ze), It("automatic-speech-recognition", {
                datasets: [ {
                    description: "31,175 hours of multilingual audio-text dataset in 108 languages.",
                    id: "mozilla-foundation/common_voice_17_0"
                }, {
                    description: "Multilingual and diverse audio dataset with 101k hours of audio.",
                    id: "amphion/Emilia-Dataset"
                }, {
                    description: "A dataset with 44.6k hours of English speaker data and 6k hours of other language speakers.",
                    id: "parler-tts/mls_eng"
                }, {
                    description: "A multilingual audio dataset with 370K hours of audio.",
                    id: "espnet/yodas"
                } ],
                demo: {
                    inputs: [ {
                        filename: "input.flac",
                        type: "audio"
                    } ],
                    outputs: [ {
                        label: "Transcript",
                        content: "Going along slushy country roads and speaking to damp audiences in...",
                        type: "text"
                    } ]
                },
                metrics: [ {
                    description: "",
                    id: "wer"
                }, {
                    description: "",
                    id: "cer"
                } ],
                models: [ {
                    description: "A powerful ASR model by OpenAI.",
                    id: "openai/whisper-large-v3"
                }, {
                    description: "A good generic speech model by MetaAI for fine-tuning.",
                    id: "facebook/w2v-bert-2.0"
                }, {
                    description: "An end-to-end model that performs ASR and Speech Translation by MetaAI.",
                    id: "facebook/seamless-m4t-v2-large"
                }, {
                    description: "A powerful multilingual ASR and Speech Translation model by Nvidia.",
                    id: "nvidia/canary-1b"
                }, {
                    description: "Powerful speaker diarization model.",
                    id: "pyannote/speaker-diarization-3.1"
                } ],
                spaces: [ {
                    description: "A powerful general-purpose speech recognition application.",
                    id: "hf-audio/whisper-large-v3"
                }, {
                    description: "Latest ASR model from Useful Sensors.",
                    id: "mrfakename/Moonshinex"
                }, {
                    description: "A high quality speech and text translation model by Meta.",
                    id: "facebook/seamless_m4t"
                }, {
                    description: "A powerful multilingual ASR and Speech Translation model by Nvidia",
                    id: "nvidia/canary-1b"
                } ],
                summary: "Automatic Speech Recognition (ASR), also known as Speech to Text (STT), is the task of transcribing a given audio to text. It has many applications, such as voice user interfaces.",
                widgetModels: [ "openai/whisper-large-v3" ],
                youtubeId: "TksaY_FDgnk"
            }), It("depth-estimation", {
                datasets: [ {
                    description: "NYU Depth V2 Dataset: Video dataset containing both RGB and depth sensor data.",
                    id: "sayakpaul/nyu_depth_v2"
                }, {
                    description: "Monocular depth estimation benchmark based without noise and errors.",
                    id: "depth-anything/DA-2K"
                } ],
                demo: {
                    inputs: [ {
                        filename: "depth-estimation-input.jpg",
                        type: "img"
                    } ],
                    outputs: [ {
                        filename: "depth-estimation-output.png",
                        type: "img"
                    } ]
                },
                metrics: [],
                models: [ {
                    description: "Cutting-edge depth estimation model.",
                    id: "depth-anything/Depth-Anything-V2-Large"
                }, {
                    description: "A strong monocular depth estimation model.",
                    id: "jingheya/lotus-depth-g-v1-0"
                }, {
                    description: "A depth estimation model that predicts depth in videos.",
                    id: "tencent/DepthCrafter"
                }, {
                    description: "A robust depth estimation model.",
                    id: "apple/DepthPro-hf"
                } ],
                spaces: [ {
                    description: "An application that predicts the depth of an image and then reconstruct the 3D model as voxels.",
                    id: "radames/dpt-depth-estimation-3d-voxels"
                }, {
                    description: "An application for bleeding-edge depth estimation.",
                    id: "akhaliq/depth-pro"
                }, {
                    description: "An application on cutting-edge depth estimation in videos.",
                    id: "tencent/DepthCrafter"
                }, {
                    description: "A human-centric depth estimation application.",
                    id: "facebook/sapiens-depth"
                } ],
                summary: "Depth estimation is the task of predicting depth of the objects present in an image.",
                widgetModels: [ "" ],
                youtubeId: ""
            }), It("document-question-answering", {
                datasets: [ {
                    description: "Largest document understanding dataset.",
                    id: "HuggingFaceM4/Docmatix"
                }, {
                    description: "Dataset from the 2020 DocVQA challenge. The documents are taken from the UCSF Industry Documents Library.",
                    id: "eliolio/docvqa"
                } ],
                demo: {
                    inputs: [ {
                        label: "Question",
                        content: "What is the idea behind the consumer relations efficiency team?",
                        type: "text"
                    }, {
                        filename: "document-question-answering-input.png",
                        type: "img"
                    } ],
                    outputs: [ {
                        label: "Answer",
                        content: "Balance cost efficiency with quality customer service",
                        type: "text"
                    } ]
                },
                metrics: [ {
                    description: "The evaluation metric for the DocVQA challenge is the Average Normalized Levenshtein Similarity (ANLS). This metric is flexible to character regognition errors and compares the predicted answer with the ground truth answer.",
                    id: "anls"
                }, {
                    description: "Exact Match is a metric based on the strict character match of the predicted answer and the right answer. For answers predicted correctly, the Exact Match will be 1. Even if only one character is different, Exact Match will be 0",
                    id: "exact-match"
                } ],
                models: [ {
                    description: "A robust document question answering model.",
                    id: "impira/layoutlm-document-qa"
                }, {
                    description: "A document question answering model specialized in invoices.",
                    id: "impira/layoutlm-invoices"
                }, {
                    description: "A special model for OCR-free document question answering.",
                    id: "microsoft/udop-large"
                }, {
                    description: "A powerful model for document question answering.",
                    id: "google/pix2struct-docvqa-large"
                } ],
                spaces: [ {
                    description: "A robust document question answering application.",
                    id: "impira/docquery"
                }, {
                    description: "An application that can answer questions from invoices.",
                    id: "impira/invoices"
                }, {
                    description: "An application to compare different document question answering models.",
                    id: "merve/compare_docvqa_models"
                } ],
                summary: "Document Question Answering (also known as Document Visual Question Answering) is the task of answering questions on document images. Document question answering models take a (document, question) pair as input and return an answer in natural language. Models usually rely on multi-modal features, combining text, position of words (bounding-boxes) and image.",
                widgetModels: [ "impira/layoutlm-invoices" ],
                youtubeId: ""
            }), It("visual-document-retrieval", {
                datasets: [ {
                    description: "A large dataset used to train visual document retrieval models.",
                    id: "vidore/colpali_train_set"
                } ],
                demo: {
                    inputs: [ {
                        filename: "input.png",
                        type: "img"
                    }, {
                        label: "Question",
                        content: "Is the model in this paper the fastest for inference?",
                        type: "text"
                    } ],
                    outputs: [ {
                        type: "chart",
                        data: [ {
                            label: "Page 10",
                            score: .7
                        }, {
                            label: "Page 11",
                            score: .06
                        }, {
                            label: "Page 9",
                            score: .003
                        } ]
                    } ]
                },
                isPlaceholder: !1,
                metrics: [ {
                    description: "NDCG@k scores ranked recommendation lists for top-k results. 0 is the worst, 1 is the best.",
                    id: "Normalized Discounted Cumulative Gain at K"
                } ],
                models: [ {
                    description: "Very accurate visual document retrieval model for multilingual queries and documents.",
                    id: "vidore/colqwen2-v1.0"
                }, {
                    description: "Very fast and efficient visual document retrieval model that works on five languages.",
                    id: "marco/mcdse-2b-v1"
                } ],
                spaces: [ {
                    description: "A leaderboard of visual document retrieval models.",
                    id: "vidore/vidore-leaderboard"
                } ],
                summary: "Visual document retrieval is the task of searching for relevant image-based documents, such as PDFs. These models take a text query and multiple documents as input and return the top-most relevant documents and relevancy scores as output.",
                widgetModels: [ "" ],
                youtubeId: ""
            }), It("feature-extraction", {
                datasets: [ {
                    description: "Wikipedia dataset containing cleaned articles of all languages. Can be used to train `feature-extraction` models.",
                    id: "wikipedia"
                } ],
                demo: {
                    inputs: [ {
                        label: "Input",
                        content: "India, officially the Republic of India, is a country in South Asia.",
                        type: "text"
                    } ],
                    outputs: [ {
                        table: [ [ "Dimension 1", "Dimension 2", "Dimension 3" ], [ "2.583383083343506", "2.757075071334839", "0.9023529887199402" ], [ "8.29393482208252", "1.1071064472198486", "2.03399395942688" ], [ "-0.7754912972450256", "-1.647324562072754", "-0.6113331913948059" ], [ "0.07087723910808563", "1.5942802429199219", "1.4610432386398315" ] ],
                        type: "tabular"
                    } ]
                },
                metrics: [],
                models: [ {
                    description: "A powerful feature extraction model for natural language processing tasks.",
                    id: "thenlper/gte-large"
                }, {
                    description: "A strong feature extraction model for retrieval.",
                    id: "Alibaba-NLP/gte-Qwen1.5-7B-instruct"
                } ],
                spaces: [ {
                    description: "A leaderboard to rank text feature extraction models based on a benchmark.",
                    id: "mteb/leaderboard"
                }, {
                    description: "A leaderboard to rank best feature extraction models based on human feedback.",
                    id: "mteb/arena"
                } ],
                summary: "Feature extraction is the task of extracting features learnt in a model.",
                widgetModels: [ "facebook/bart-base" ]
            }), It("fill-mask", {
                datasets: [ {
                    description: "A common dataset that is used to train models for many languages.",
                    id: "wikipedia"
                }, {
                    description: "A large English dataset with text crawled from the web.",
                    id: "c4"
                } ],
                demo: {
                    inputs: [ {
                        label: "Input",
                        content: "The <mask> barked at me",
                        type: "text"
                    } ],
                    outputs: [ {
                        type: "chart",
                        data: [ {
                            label: "wolf",
                            score: .487
                        }, {
                            label: "dog",
                            score: .061
                        }, {
                            label: "cat",
                            score: .058
                        }, {
                            label: "fox",
                            score: .047
                        }, {
                            label: "squirrel",
                            score: .025
                        } ]
                    } ]
                },
                metrics: [ {
                    description: "Cross Entropy is a metric that calculates the difference between two probability distributions. Each probability distribution is the distribution of predicted words",
                    id: "cross_entropy"
                }, {
                    description: "Perplexity is the exponential of the cross-entropy loss. It evaluates the probabilities assigned to the next word by the model. Lower perplexity indicates better performance",
                    id: "perplexity"
                } ],
                models: [ {
                    description: "State-of-the-art masked language model.",
                    id: "answerdotai/ModernBERT-large"
                }, {
                    description: "A multilingual model trained on 100 languages.",
                    id: "FacebookAI/xlm-roberta-base"
                } ],
                spaces: [],
                summary: "Masked language modeling is the task of masking some of the words in a sentence and predicting which words should replace those masks. These models are useful when we want to get a statistical understanding of the language in which the model is trained in.",
                widgetModels: [ "distilroberta-base" ],
                youtubeId: "mqElG5QJWUg"
            }), It("image-classification", {
                datasets: [ {
                    description: "Benchmark dataset used for image classification with images that belong to 100 classes.",
                    id: "cifar100"
                }, {
                    description: "Dataset consisting of images of garments.",
                    id: "fashion_mnist"
                } ],
                demo: {
                    inputs: [ {
                        filename: "image-classification-input.jpeg",
                        type: "img"
                    } ],
                    outputs: [ {
                        type: "chart",
                        data: [ {
                            label: "Egyptian cat",
                            score: .514
                        }, {
                            label: "Tabby cat",
                            score: .193
                        }, {
                            label: "Tiger cat",
                            score: .068
                        } ]
                    } ]
                },
                metrics: [ {
                    description: "",
                    id: "accuracy"
                }, {
                    description: "",
                    id: "recall"
                }, {
                    description: "",
                    id: "precision"
                }, {
                    description: "",
                    id: "f1"
                } ],
                models: [ {
                    description: "A strong image classification model.",
                    id: "google/vit-base-patch16-224"
                }, {
                    description: "A robust image classification model.",
                    id: "facebook/deit-base-distilled-patch16-224"
                }, {
                    description: "A strong image classification model.",
                    id: "facebook/convnext-large-224"
                } ],
                spaces: [ {
                    description: "A leaderboard to evaluate different image classification models.",
                    id: "timm/leaderboard"
                } ],
                summary: "Image classification is the task of assigning a label or class to an entire image. Images are expected to have only one class for each image. Image classification models take an image as input and return a prediction about which class the image belongs to.",
                widgetModels: [ "google/vit-base-patch16-224" ],
                youtubeId: "tjAIM7BOYhw"
            }), It("image-feature-extraction", {
                datasets: [ {
                    description: "ImageNet-1K is a image classification dataset in which images are used to train image-feature-extraction models.",
                    id: "imagenet-1k"
                } ],
                demo: {
                    inputs: [ {
                        filename: "mask-generation-input.png",
                        type: "img"
                    } ],
                    outputs: [ {
                        table: [ [ "Dimension 1", "Dimension 2", "Dimension 3" ], [ "0.21236686408519745", "1.0919708013534546", "0.8512550592422485" ], [ "0.809657871723175", "-0.18544459342956543", "-0.7851548194885254" ], [ "1.3103108406066895", "-0.2479034662246704", "-0.9107287526130676" ], [ "1.8536205291748047", "-0.36419737339019775", "0.09717650711536407" ] ],
                        type: "tabular"
                    } ]
                },
                metrics: [],
                models: [ {
                    description: "A powerful image feature extraction model.",
                    id: "timm/vit_large_patch14_dinov2.lvd142m"
                }, {
                    description: "A strong image feature extraction model.",
                    id: "nvidia/MambaVision-T-1K"
                }, {
                    description: "A robust image feature extraction model.",
                    id: "facebook/dino-vitb16"
                }, {
                    description: "Cutting-edge image feature extraction model.",
                    id: "apple/aimv2-large-patch14-336-distilled"
                }, {
                    description: "Strong image feature extraction model that can be used on images and documents.",
                    id: "OpenGVLab/InternViT-6B-448px-V1-2"
                } ],
                spaces: [ {
                    description: "A leaderboard to evaluate different image-feature-extraction models on classification performances",
                    id: "timm/leaderboard"
                } ],
                summary: "Image feature extraction is the task of extracting features learnt in a computer vision model.",
                widgetModels: []
            }), It("image-segmentation", {
                datasets: [ {
                    description: "Scene segmentation dataset.",
                    id: "scene_parse_150"
                } ],
                demo: {
                    inputs: [ {
                        filename: "image-segmentation-input.jpeg",
                        type: "img"
                    } ],
                    outputs: [ {
                        filename: "image-segmentation-output.png",
                        type: "img"
                    } ]
                },
                metrics: [ {
                    description: "Average Precision (AP) is the Area Under the PR Curve (AUC-PR). It is calculated for each semantic class separately",
                    id: "Average Precision"
                }, {
                    description: "Mean Average Precision (mAP) is the overall average of the AP values",
                    id: "Mean Average Precision"
                }, {
                    description: "Intersection over Union (IoU) is the overlap of segmentation masks. Mean IoU is the average of the IoU of all semantic classes",
                    id: "Mean Intersection over Union"
                }, {
                    description: "APα is the Average Precision at the IoU threshold of a α value, for example, AP50 and AP75",
                    id: "APα"
                } ],
                models: [ {
                    description: "Solid semantic segmentation model trained on ADE20k.",
                    id: "openmmlab/upernet-convnext-small"
                }, {
                    description: "Background removal model.",
                    id: "briaai/RMBG-1.4"
                }, {
                    description: "A multipurpose image segmentation model for high resolution images.",
                    id: "ZhengPeng7/BiRefNet"
                }, {
                    description: "Powerful human-centric image segmentation model.",
                    id: "facebook/sapiens-seg-1b"
                }, {
                    description: "Panoptic segmentation model trained on the COCO (common objects) dataset.",
                    id: "facebook/mask2former-swin-large-coco-panoptic"
                } ],
                spaces: [ {
                    description: "A semantic segmentation application that can predict unseen instances out of the box.",
                    id: "facebook/ov-seg"
                }, {
                    description: "One of the strongest segmentation applications.",
                    id: "jbrinkma/segment-anything"
                }, {
                    description: "A human-centric segmentation model.",
                    id: "facebook/sapiens-pose"
                }, {
                    description: "An instance segmentation application to predict neuronal cell types from microscopy images.",
                    id: "rashmi/sartorius-cell-instance-segmentation"
                }, {
                    description: "An application that segments videos.",
                    id: "ArtGAN/Segment-Anything-Video"
                }, {
                    description: "An panoptic segmentation application built for outdoor environments.",
                    id: "segments/panoptic-segment-anything"
                } ],
                summary: "Image Segmentation divides an image into segments where each pixel in the image is mapped to an object. This task has multiple variants such as instance segmentation, panoptic segmentation and semantic segmentation.",
                widgetModels: [ "nvidia/segformer-b0-finetuned-ade-512-512" ],
                youtubeId: "dKE8SIt9C-w"
            }), It("image-to-image", {
                datasets: [ {
                    description: "Synthetic dataset, for image relighting",
                    id: "VIDIT"
                }, {
                    description: "Multiple images of celebrities, used for facial expression translation",
                    id: "huggan/CelebA-faces"
                }, {
                    description: "12M image-caption pairs.",
                    id: "Spawning/PD12M"
                } ],
                demo: {
                    inputs: [ {
                        filename: "image-to-image-input.jpeg",
                        type: "img"
                    } ],
                    outputs: [ {
                        filename: "image-to-image-output.png",
                        type: "img"
                    } ]
                },
                isPlaceholder: !1,
                metrics: [ {
                    description: "Peak Signal to Noise Ratio (PSNR) is an approximation of the human perception, considering the ratio of the absolute intensity with respect to the variations. Measured in dB, a high value indicates a high fidelity.",
                    id: "PSNR"
                }, {
                    description: "Structural Similarity Index (SSIM) is a perceptual metric which compares the luminance, contrast and structure of two images. The values of SSIM range between -1 and 1, and higher values indicate closer resemblance to the original image.",
                    id: "SSIM"
                }, {
                    description: "Inception Score (IS) is an analysis of the labels predicted by an image classification model when presented with a sample of the generated images.",
                    id: "IS"
                } ],
                models: [ {
                    description: "An image-to-image model to improve image resolution.",
                    id: "fal/AuraSR-v2"
                }, {
                    description: "A model that increases the resolution of an image.",
                    id: "keras-io/super-resolution"
                }, {
                    description: "A model for applying edits to images through image controls.",
                    id: "Yuanshi/OminiControl"
                }, {
                    description: "A model that generates images based on segments in the input image and the text prompt.",
                    id: "mfidabel/controlnet-segment-anything"
                }, {
                    description: "Strong model for inpainting and outpainting.",
                    id: "black-forest-labs/FLUX.1-Fill-dev"
                }, {
                    description: "Strong model for image editing using depth maps.",
                    id: "black-forest-labs/FLUX.1-Depth-dev-lora"
                } ],
                spaces: [ {
                    description: "Image enhancer application for low light.",
                    id: "keras-io/low-light-image-enhancement"
                }, {
                    description: "Style transfer application.",
                    id: "keras-io/neural-style-transfer"
                }, {
                    description: "An application that generates images based on segment control.",
                    id: "mfidabel/controlnet-segment-anything"
                }, {
                    description: "Image generation application that takes image control and text prompt.",
                    id: "hysts/ControlNet"
                }, {
                    description: "Colorize any image using this app.",
                    id: "ioclab/brightness-controlnet"
                }, {
                    description: "Edit images with instructions.",
                    id: "timbrooks/instruct-pix2pix"
                } ],
                summary: "Image-to-image is the task of transforming an input image through a variety of possible manipulations and enhancements, such as super-resolution, image inpainting, colorization, and more.",
                widgetModels: [ "stabilityai/stable-diffusion-2-inpainting" ],
                youtubeId: ""
            }), It("image-text-to-text", {
                datasets: [ {
                    description: "Instructions composed of image and text.",
                    id: "liuhaotian/LLaVA-Instruct-150K"
                }, {
                    description: "Collection of image-text pairs on scientific topics.",
                    id: "DAMO-NLP-SG/multimodal_textbook"
                }, {
                    description: "A collection of datasets made for model fine-tuning.",
                    id: "HuggingFaceM4/the_cauldron"
                }, {
                    description: "Screenshots of websites with their HTML/CSS codes.",
                    id: "HuggingFaceM4/WebSight"
                } ],
                demo: {
                    inputs: [ {
                        filename: "image-text-to-text-input.png",
                        type: "img"
                    }, {
                        label: "Text Prompt",
                        content: "Describe the position of the bee in detail.",
                        type: "text"
                    } ],
                    outputs: [ {
                        label: "Answer",
                        content: "The bee is sitting on a pink flower, surrounded by other flowers. The bee is positioned in the center of the flower, with its head and front legs sticking out.",
                        type: "text"
                    } ]
                },
                metrics: [],
                models: [ {
                    description: "Small and efficient yet powerful vision language model.",
                    id: "HuggingFaceTB/SmolVLM-Instruct"
                }, {
                    description: "A screenshot understanding model used to control computers.",
                    id: "microsoft/OmniParser-v2.0"
                }, {
                    description: "Cutting-edge vision language model.",
                    id: "allenai/Molmo-7B-D-0924"
                }, {
                    description: "Small yet powerful model.",
                    id: "vikhyatk/moondream2"
                }, {
                    description: "Strong image-text-to-text model.",
                    id: "Qwen/Qwen2.5-VL-7B-Instruct"
                }, {
                    description: "Image-text-to-text model with agentic capabilities.",
                    id: "microsoft/Magma-8B"
                }, {
                    description: "Strong image-text-to-text model focused on documents.",
                    id: "allenai/olmOCR-7B-0225-preview"
                }, {
                    description: "Small yet strong image-text-to-text model.",
                    id: "ibm-granite/granite-vision-3.2-2b"
                } ],
                spaces: [ {
                    description: "Leaderboard to evaluate vision language models.",
                    id: "opencompass/open_vlm_leaderboard"
                }, {
                    description: "Vision language models arena, where models are ranked by votes of users.",
                    id: "WildVision/vision-arena"
                }, {
                    description: "Powerful vision-language model assistant.",
                    id: "akhaliq/Molmo-7B-D-0924"
                }, {
                    description: "Powerful vision language assistant that can understand multiple images.",
                    id: "HuggingFaceTB/SmolVLM2"
                }, {
                    description: "An application for chatting with an image-text-to-text model.",
                    id: "GanymedeNil/Qwen2-VL-7B"
                }, {
                    description: "An application that parses screenshots into actions.",
                    id: "showlab/ShowUI"
                }, {
                    description: "An application that detects gaze.",
                    id: "moondream/gaze-demo"
                } ],
                summary: "Image-text-to-text models take in an image and text prompt and output text. These models are also called vision-language models, or VLMs. The difference from image-to-text models is that these models take an additional text input, not restricting the model to certain use cases like image captioning, and may also be trained to accept a conversation as input.",
                widgetModels: [ "Qwen/Qwen2-VL-7B-Instruct" ],
                youtubeId: "IoGaGfU1CIg"
            }), It("image-to-text", {
                datasets: [ {
                    description: "Dataset from 12M image-text of Reddit",
                    id: "red_caps"
                }, {
                    description: "Dataset from 3.3M images of Google",
                    id: "datasets/conceptual_captions"
                } ],
                demo: {
                    inputs: [ {
                        filename: "savanna.jpg",
                        type: "img"
                    } ],
                    outputs: [ {
                        label: "Detailed description",
                        content: "a herd of giraffes and zebras grazing in a field",
                        type: "text"
                    } ]
                },
                metrics: [],
                models: [ {
                    description: "A robust image captioning model.",
                    id: "Salesforce/blip2-opt-2.7b"
                }, {
                    description: "A powerful and accurate image-to-text model that can also localize concepts in images.",
                    id: "microsoft/kosmos-2-patch14-224"
                }, {
                    description: "A strong optical character recognition model.",
                    id: "facebook/nougat-base"
                }, {
                    description: "A powerful model that lets you have a conversation with the image.",
                    id: "llava-hf/llava-1.5-7b-hf"
                } ],
                spaces: [ {
                    description: "An application that compares various image captioning models.",
                    id: "nielsr/comparing-captioning-models"
                }, {
                    description: "A robust image captioning application.",
                    id: "flax-community/image-captioning"
                }, {
                    description: "An application that transcribes handwritings into text.",
                    id: "nielsr/TrOCR-handwritten"
                }, {
                    description: "An application that can caption images and answer questions about a given image.",
                    id: "Salesforce/BLIP"
                }, {
                    description: "An application that can caption images and answer questions with a conversational agent.",
                    id: "Salesforce/BLIP2"
                }, {
                    description: "An image captioning application that demonstrates the effect of noise on captions.",
                    id: "johko/capdec-image-captioning"
                } ],
                summary: "Image to text models output a text from a given image. Image captioning or optical character recognition can be considered as the most common applications of image to text.",
                widgetModels: [ "Salesforce/blip-image-captioning-large" ],
                youtubeId: ""
            }), It("keypoint-detection", {
                datasets: [ {
                    description: "A dataset of hand keypoints of over 500k examples.",
                    id: "Vincent-luo/hagrid-mediapipe-hands"
                } ],
                demo: {
                    inputs: [ {
                        filename: "keypoint-detection-input.png",
                        type: "img"
                    } ],
                    outputs: [ {
                        filename: "keypoint-detection-output.png",
                        type: "img"
                    } ]
                },
                metrics: [],
                models: [ {
                    description: "A robust keypoint detection model.",
                    id: "magic-leap-community/superpoint"
                }, {
                    description: "A robust keypoint matching model.",
                    id: "magic-leap-community/superglue_outdoor"
                }, {
                    description: "Strong keypoint detection model used to detect human pose.",
                    id: "facebook/sapiens-pose-1b"
                }, {
                    description: "Powerful keypoint detection model used to detect human pose.",
                    id: "usyd-community/vitpose-plus-base"
                } ],
                spaces: [ {
                    description: "An application that detects hand keypoints in real-time.",
                    id: "datasciencedojo/Hand-Keypoint-Detection-Realtime"
                }, {
                    description: "An application to try a universal keypoint detection model.",
                    id: "merve/SuperPoint"
                } ],
                summary: "Keypoint detection is the task of identifying meaningful distinctive points or features in an image.",
                widgetModels: [],
                youtubeId: ""
            }), It("mask-generation", {
                datasets: [ {
                    description: "Widely used benchmark dataset for multiple Vision tasks.",
                    id: "merve/coco2017"
                }, {
                    description: "Medical Imaging dataset of the Human Brain for segmentation and mask generating tasks",
                    id: "rocky93/BraTS_segmentation"
                } ],
                demo: {
                    inputs: [ {
                        filename: "mask-generation-input.png",
                        type: "img"
                    } ],
                    outputs: [ {
                        filename: "mask-generation-output.png",
                        type: "img"
                    } ]
                },
                metrics: [ {
                    description: "IoU is used to measure the overlap between predicted mask and the ground truth mask.",
                    id: "Intersection over Union (IoU)"
                } ],
                models: [ {
                    description: "Small yet powerful mask generation model.",
                    id: "Zigeng/SlimSAM-uniform-50"
                }, {
                    description: "Very strong mask generation model.",
                    id: "facebook/sam2-hiera-large"
                } ],
                spaces: [ {
                    description: "An application that combines a mask generation model with a zero-shot object detection model for text-guided image segmentation.",
                    id: "merve/OWLSAM2"
                }, {
                    description: "An application that compares the performance of a large and a small mask generation model.",
                    id: "merve/slimsam"
                }, {
                    description: "An application based on an improved mask generation model.",
                    id: "SkalskiP/segment-anything-model-2"
                }, {
                    description: "An application to remove objects from videos using mask generation models.",
                    id: "SkalskiP/SAM_and_ProPainter"
                } ],
                summary: "Mask generation is the task of generating masks that identify a specific object or region of interest in a given image. Masks are often used in segmentation tasks, where they provide a precise way to isolate the object of interest for further processing or analysis.",
                widgetModels: [],
                youtubeId: ""
            }), It("object-detection", {
                datasets: [ {
                    description: "Widely used benchmark dataset for multiple vision tasks.",
                    id: "merve/coco2017"
                }, {
                    description: "Multi-task computer vision benchmark.",
                    id: "merve/pascal-voc"
                } ],
                demo: {
                    inputs: [ {
                        filename: "object-detection-input.jpg",
                        type: "img"
                    } ],
                    outputs: [ {
                        filename: "object-detection-output.jpg",
                        type: "img"
                    } ]
                },
                metrics: [ {
                    description: "The Average Precision (AP) metric is the Area Under the PR Curve (AUC-PR). It is calculated for each class separately",
                    id: "Average Precision"
                }, {
                    description: "The Mean Average Precision (mAP) metric is the overall average of the AP values",
                    id: "Mean Average Precision"
                }, {
                    description: "The APα metric is the Average Precision at the IoU threshold of a α value, for example, AP50 and AP75",
                    id: "APα"
                } ],
                models: [ {
                    description: "Solid object detection model pre-trained on the COCO 2017 dataset.",
                    id: "facebook/detr-resnet-50"
                }, {
                    description: "Accurate object detection model.",
                    id: "IDEA-Research/dab-detr-resnet-50"
                }, {
                    description: "Fast and accurate object detection model.",
                    id: "PekingU/rtdetr_v2_r50vd"
                }, {
                    description: "Object detection model for low-lying objects.",
                    id: "StephanST/WALDO30"
                } ],
                spaces: [ {
                    description: "Leaderboard to compare various object detection models across several metrics.",
                    id: "hf-vision/object_detection_leaderboard"
                }, {
                    description: "An application that contains various object detection models to try from.",
                    id: "Gradio-Blocks/Object-Detection-With-DETR-and-YOLOS"
                }, {
                    description: "A cutting-edge object detection application.",
                    id: "sunsmarterjieleaf/yolov12"
                }, {
                    description: "An object tracking, segmentation and inpainting application.",
                    id: "VIPLab/Track-Anything"
                }, {
                    description: "Very fast object tracking application based on object detection.",
                    id: "merve/RT-DETR-tracking-coco"
                } ],
                summary: "Object Detection models allow users to identify objects of certain defined classes. Object detection models receive an image as input and output the images with bounding boxes and labels on detected objects.",
                widgetModels: [ "facebook/detr-resnet-50" ],
                youtubeId: "WdAeKSOpxhw"
            }), It("video-classification", {
                datasets: [ {
                    description: "Benchmark dataset used for video classification with videos that belong to 400 classes.",
                    id: "kinetics400"
                } ],
                demo: {
                    inputs: [ {
                        filename: "video-classification-input.gif",
                        type: "img"
                    } ],
                    outputs: [ {
                        type: "chart",
                        data: [ {
                            label: "Playing Guitar",
                            score: .514
                        }, {
                            label: "Playing Tennis",
                            score: .193
                        }, {
                            label: "Cooking",
                            score: .068
                        } ]
                    } ]
                },
                metrics: [ {
                    description: "",
                    id: "accuracy"
                }, {
                    description: "",
                    id: "recall"
                }, {
                    description: "",
                    id: "precision"
                }, {
                    description: "",
                    id: "f1"
                } ],
                models: [ {
                    description: "Strong Video Classification model trained on the Kinetics 400 dataset.",
                    id: "google/vivit-b-16x2-kinetics400"
                }, {
                    description: "Strong Video Classification model trained on the Kinetics 400 dataset.",
                    id: "microsoft/xclip-base-patch32"
                } ],
                spaces: [ {
                    description: "An application that classifies video at different timestamps.",
                    id: "nateraw/lavila"
                }, {
                    description: "An application that classifies video.",
                    id: "fcakyon/video-classification"
                } ],
                summary: "Video classification is the task of assigning a label or class to an entire video. Videos are expected to have only one class for each video. Video classification models take a video as input and return a prediction about which class the video belongs to.",
                widgetModels: [],
                youtubeId: ""
            }), It("question-answering", {
                datasets: [ {
                    description: "A famous question answering dataset based on English articles from Wikipedia.",
                    id: "squad_v2"
                }, {
                    description: "A dataset of aggregated anonymized actual queries issued to the Google search engine.",
                    id: "natural_questions"
                } ],
                demo: {
                    inputs: [ {
                        label: "Question",
                        content: "Which name is also used to describe the Amazon rainforest in English?",
                        type: "text"
                    }, {
                        label: "Context",
                        content: "The Amazon rainforest, also known in English as Amazonia or the Amazon Jungle",
                        type: "text"
                    } ],
                    outputs: [ {
                        label: "Answer",
                        content: "Amazonia",
                        type: "text"
                    } ]
                },
                metrics: [ {
                    description: "Exact Match is a metric based on the strict character match of the predicted answer and the right answer. For answers predicted correctly, the Exact Match will be 1. Even if only one character is different, Exact Match will be 0",
                    id: "exact-match"
                }, {
                    description: " The F1-Score metric is useful if we value both false positives and false negatives equally. The F1-Score is calculated on each word in the predicted sequence against the correct answer",
                    id: "f1"
                } ],
                models: [ {
                    description: "A robust baseline model for most question answering domains.",
                    id: "deepset/roberta-base-squad2"
                }, {
                    description: "Small yet robust model that can answer questions.",
                    id: "distilbert/distilbert-base-cased-distilled-squad"
                }, {
                    description: "A special model that can answer questions from tables.",
                    id: "google/tapas-base-finetuned-wtq"
                } ],
                spaces: [ {
                    description: "An application that can answer a long question from Wikipedia.",
                    id: "deepset/wikipedia-assistant"
                } ],
                summary: "Question Answering models can retrieve the answer to a question from a given text, which is useful for searching for an answer in a document. Some question answering models can generate answers without context!",
                widgetModels: [ "deepset/roberta-base-squad2" ],
                youtubeId: "ajPx5LwJD-I"
            }), It("reinforcement-learning", {
                datasets: [ {
                    description: "A curation of widely used datasets for Data Driven Deep Reinforcement Learning (D4RL)",
                    id: "edbeeching/decision_transformer_gym_replay"
                } ],
                demo: {
                    inputs: [ {
                        label: "State",
                        content: "Red traffic light, pedestrians are about to pass.",
                        type: "text"
                    } ],
                    outputs: [ {
                        label: "Action",
                        content: "Stop the car.",
                        type: "text"
                    }, {
                        label: "Next State",
                        content: "Yellow light, pedestrians have crossed.",
                        type: "text"
                    } ]
                },
                metrics: [ {
                    description: "Accumulated reward across all time steps discounted by a factor that ranges between 0 and 1 and determines how much the agent optimizes for future relative to immediate rewards. Measures how good is the policy ultimately found by a given algorithm considering uncertainty over the future.",
                    id: "Discounted Total Reward"
                }, {
                    description: "Average return obtained after running the policy for a certain number of evaluation episodes. As opposed to total reward, mean reward considers how much reward a given algorithm receives while learning.",
                    id: "Mean Reward"
                }, {
                    description: "Measures how good a given algorithm is after a predefined time. Some algorithms may be guaranteed to converge to optimal behavior across many time steps. However, an agent that reaches an acceptable level of optimality after a given time horizon may be preferable to one that ultimately reaches optimality but takes a long time.",
                    id: "Level of Performance After Some Time"
                } ],
                models: [ {
                    description: "A Reinforcement Learning model trained on expert data from the Gym Hopper environment",
                    id: "edbeeching/decision-transformer-gym-hopper-expert"
                }, {
                    description: "A PPO agent playing seals/CartPole-v0 using the stable-baselines3 library and the RL Zoo.",
                    id: "HumanCompatibleAI/ppo-seals-CartPole-v0"
                } ],
                spaces: [ {
                    description: "An application for a cute puppy agent learning to catch a stick.",
                    id: "ThomasSimonini/Huggy"
                }, {
                    description: "An application to play Snowball Fight with a reinforcement learning agent.",
                    id: "ThomasSimonini/SnowballFight"
                } ],
                summary: "Reinforcement learning is the computational approach of learning from action by interacting with an environment through trial and error and receiving rewards (negative or positive) as feedback",
                widgetModels: [],
                youtubeId: "q0BiUn5LiBc"
            }), It("sentence-similarity", {
                datasets: [ {
                    description: "Bing queries with relevant passages from various web sources.",
                    id: "microsoft/ms_marco"
                } ],
                demo: {
                    inputs: [ {
                        label: "Source sentence",
                        content: "Machine learning is so easy.",
                        type: "text"
                    }, {
                        label: "Sentences to compare to",
                        content: "Deep learning is so straightforward.",
                        type: "text"
                    }, {
                        label: "",
                        content: "This is so difficult, like rocket science.",
                        type: "text"
                    }, {
                        label: "",
                        content: "I can't believe how much I struggled with this.",
                        type: "text"
                    } ],
                    outputs: [ {
                        type: "chart",
                        data: [ {
                            label: "Deep learning is so straightforward.",
                            score: .623
                        }, {
                            label: "This is so difficult, like rocket science.",
                            score: .413
                        }, {
                            label: "I can't believe how much I struggled with this.",
                            score: .256
                        } ]
                    } ]
                },
                metrics: [ {
                    description: "Reciprocal Rank is a measure used to rank the relevancy of documents given a set of documents. Reciprocal Rank is the reciprocal of the rank of the document retrieved, meaning, if the rank is 3, the Reciprocal Rank is 0.33. If the rank is 1, the Reciprocal Rank is 1",
                    id: "Mean Reciprocal Rank"
                }, {
                    description: "The similarity of the embeddings is evaluated mainly on cosine similarity. It is calculated as the cosine of the angle between two vectors. It is particularly useful when your texts are not the same length",
                    id: "Cosine Similarity"
                } ],
                models: [ {
                    description: "This model works well for sentences and paragraphs and can be used for clustering/grouping and semantic searches.",
                    id: "sentence-transformers/all-mpnet-base-v2"
                }, {
                    description: "A multilingual robust sentence similarity model.",
                    id: "BAAI/bge-m3"
                }, {
                    description: "A robust sentence similarity model.",
                    id: "HIT-TMG/KaLM-embedding-multilingual-mini-instruct-v1.5"
                } ],
                spaces: [ {
                    description: "An application that leverages sentence similarity to answer questions from YouTube videos.",
                    id: "Gradio-Blocks/Ask_Questions_To_YouTube_Videos"
                }, {
                    description: "An application that retrieves relevant PubMed abstracts for a given online article which can be used as further references.",
                    id: "Gradio-Blocks/pubmed-abstract-retriever"
                }, {
                    description: "An application that leverages sentence similarity to summarize text.",
                    id: "nickmuchi/article-text-summarizer"
                }, {
                    description: "A guide that explains how Sentence Transformers can be used for semantic search.",
                    id: "sentence-transformers/Sentence_Transformers_for_semantic_search"
                } ],
                summary: "Sentence Similarity is the task of determining how similar two texts are. Sentence similarity models convert input texts into vectors (embeddings) that capture semantic information and calculate how close (similar) they are between them. This task is particularly useful for information retrieval and clustering/grouping.",
                widgetModels: [ "BAAI/bge-small-en-v1.5" ],
                youtubeId: "VCZq5AkbNEU"
            }), It("summarization", {
                canonicalId: "text2text-generation",
                datasets: [ {
                    description: "News articles in five different languages along with their summaries. Widely used for benchmarking multilingual summarization models.",
                    id: "mlsum"
                }, {
                    description: "English conversations and their summaries. Useful for benchmarking conversational agents.",
                    id: "samsum"
                } ],
                demo: {
                    inputs: [ {
                        label: "Input",
                        content: "The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. It was the first structure to reach a height of 300 metres. Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.",
                        type: "text"
                    } ],
                    outputs: [ {
                        label: "Output",
                        content: "The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building. It was the first structure to reach a height of 300 metres.",
                        type: "text"
                    } ]
                },
                metrics: [ {
                    description: "The generated sequence is compared against its summary, and the overlap of tokens are counted. ROUGE-N refers to overlap of N subsequent tokens, ROUGE-1 refers to overlap of single tokens and ROUGE-2 is the overlap of two subsequent tokens.",
                    id: "rouge"
                } ],
                models: [ {
                    description: "A strong summarization model trained on English news articles. Excels at generating factual summaries.",
                    id: "facebook/bart-large-cnn"
                }, {
                    description: "A summarization model trained on medical articles.",
                    id: "Falconsai/medical_summarization"
                } ],
                spaces: [ {
                    description: "An application that can summarize long paragraphs.",
                    id: "pszemraj/summarize-long-text"
                }, {
                    description: "A much needed summarization application for terms and conditions.",
                    id: "ml6team/distilbart-tos-summarizer-tosdr"
                }, {
                    description: "An application that summarizes long documents.",
                    id: "pszemraj/document-summarization"
                }, {
                    description: "An application that can detect errors in abstractive summarization.",
                    id: "ml6team/post-processing-summarization"
                } ],
                summary: "Summarization is the task of producing a shorter version of a document while preserving its important information. Some models can extract text from the original input, while other models can generate entirely new text.",
                widgetModels: [ "facebook/bart-large-cnn" ],
                youtubeId: "yHnr5Dk2zCI"
            }), It("table-question-answering", {
                datasets: [ {
                    description: "The WikiTableQuestions dataset is a large-scale dataset for the task of question answering on semi-structured tables.",
                    id: "wikitablequestions"
                }, {
                    description: "WikiSQL is a dataset of 80654 hand-annotated examples of questions and SQL queries distributed across 24241 tables from Wikipedia.",
                    id: "wikisql"
                } ],
                demo: {
                    inputs: [ {
                        table: [ [ "Rank", "Name", "No.of reigns", "Combined days" ], [ "1", "lou Thesz", "3", "3749" ], [ "2", "Ric Flair", "8", "3103" ], [ "3", "Harley Race", "7", "1799" ] ],
                        type: "tabular"
                    }, {
                        label: "Question",
                        content: "What is the number of reigns for Harley Race?",
                        type: "text"
                    } ],
                    outputs: [ {
                        label: "Result",
                        content: "7",
                        type: "text"
                    } ]
                },
                metrics: [ {
                    description: "Checks whether the predicted answer(s) is the same as the ground-truth answer(s).",
                    id: "Denotation Accuracy"
                } ],
                models: [ {
                    description: "A table question answering model that is capable of neural SQL execution, i.e., employ TAPEX to execute a SQL query on a given table.",
                    id: "microsoft/tapex-base"
                }, {
                    description: "A robust table question answering model.",
                    id: "google/tapas-base-finetuned-wtq"
                } ],
                spaces: [ {
                    description: "An application that answers questions based on table CSV files.",
                    id: "katanaml/table-query"
                } ],
                summary: "Table Question Answering (Table QA) is the answering a question about an information on a given table.",
                widgetModels: [ "google/tapas-base-finetuned-wtq" ]
            }), It("tabular-classification", {
                datasets: [ {
                    description: "A comprehensive curation of datasets covering all benchmarks.",
                    id: "inria-soda/tabular-benchmark"
                } ],
                demo: {
                    inputs: [ {
                        table: [ [ "Glucose", "Blood Pressure ", "Skin Thickness", "Insulin", "BMI" ], [ "148", "72", "35", "0", "33.6" ], [ "150", "50", "30", "0", "35.1" ], [ "141", "60", "29", "1", "39.2" ] ],
                        type: "tabular"
                    } ],
                    outputs: [ {
                        table: [ [ "Diabetes" ], [ "1" ], [ "1" ], [ "0" ] ],
                        type: "tabular"
                    } ]
                },
                metrics: [ {
                    description: "",
                    id: "accuracy"
                }, {
                    description: "",
                    id: "recall"
                }, {
                    description: "",
                    id: "precision"
                }, {
                    description: "",
                    id: "f1"
                } ],
                models: [ {
                    description: "Breast cancer prediction model based on decision trees.",
                    id: "scikit-learn/cancer-prediction-trees"
                } ],
                spaces: [ {
                    description: "An application that can predict defective products on a production line.",
                    id: "scikit-learn/tabular-playground"
                }, {
                    description: "An application that compares various tabular classification techniques on different datasets.",
                    id: "scikit-learn/classification"
                } ],
                summary: "Tabular classification is the task of classifying a target category (a group) based on set of attributes.",
                widgetModels: [ "scikit-learn/tabular-playground" ],
                youtubeId: ""
            }), It("tabular-regression", {
                datasets: [ {
                    description: "A comprehensive curation of datasets covering all benchmarks.",
                    id: "inria-soda/tabular-benchmark"
                } ],
                demo: {
                    inputs: [ {
                        table: [ [ "Car Name", "Horsepower", "Weight" ], [ "ford torino", "140", "3,449" ], [ "amc hornet", "97", "2,774" ], [ "toyota corolla", "65", "1,773" ] ],
                        type: "tabular"
                    } ],
                    outputs: [ {
                        table: [ [ "MPG (miles per gallon)" ], [ "17" ], [ "18" ], [ "31" ] ],
                        type: "tabular"
                    } ]
                },
                metrics: [ {
                    description: "",
                    id: "mse"
                }, {
                    description: "Coefficient of determination (or R-squared) is a measure of how well the model fits the data. Higher R-squared is considered a better fit.",
                    id: "r-squared"
                } ],
                models: [ {
                    description: "Fish weight prediction based on length measurements and species.",
                    id: "scikit-learn/Fish-Weight"
                } ],
                spaces: [ {
                    description: "An application that can predict weight of a fish based on set of attributes.",
                    id: "scikit-learn/fish-weight-prediction"
                } ],
                summary: "Tabular regression is the task of predicting a numerical value given a set of attributes.",
                widgetModels: [ "scikit-learn/Fish-Weight" ],
                youtubeId: ""
            }), It("text-classification", {
                datasets: [ {
                    description: "A widely used dataset used to benchmark multiple variants of text classification.",
                    id: "nyu-mll/glue"
                }, {
                    description: "A text classification dataset used to benchmark natural language inference models",
                    id: "stanfordnlp/snli"
                } ],
                demo: {
                    inputs: [ {
                        label: "Input",
                        content: "I love Hugging Face!",
                        type: "text"
                    } ],
                    outputs: [ {
                        type: "chart",
                        data: [ {
                            label: "POSITIVE",
                            score: .9
                        }, {
                            label: "NEUTRAL",
                            score: .1
                        }, {
                            label: "NEGATIVE",
                            score: 0
                        } ]
                    } ]
                },
                metrics: [ {
                    description: "",
                    id: "accuracy"
                }, {
                    description: "",
                    id: "recall"
                }, {
                    description: "",
                    id: "precision"
                }, {
                    description: "The F1 metric is the harmonic mean of the precision and recall. It can be calculated as: F1 = 2 * (precision * recall) / (precision + recall)",
                    id: "f1"
                } ],
                models: [ {
                    description: "A robust model trained for sentiment analysis.",
                    id: "distilbert/distilbert-base-uncased-finetuned-sst-2-english"
                }, {
                    description: "A sentiment analysis model specialized in financial sentiment.",
                    id: "ProsusAI/finbert"
                }, {
                    description: "A sentiment analysis model specialized in analyzing tweets.",
                    id: "cardiffnlp/twitter-roberta-base-sentiment-latest"
                }, {
                    description: "A model that can classify languages.",
                    id: "papluca/xlm-roberta-base-language-detection"
                }, {
                    description: "A model that can classify text generation attacks.",
                    id: "meta-llama/Prompt-Guard-86M"
                } ],
                spaces: [ {
                    description: "An application that can classify financial sentiment.",
                    id: "IoannisTr/Tech_Stocks_Trading_Assistant"
                }, {
                    description: "A dashboard that contains various text classification tasks.",
                    id: "miesnerjacob/Multi-task-NLP"
                }, {
                    description: "An application that analyzes user reviews in healthcare.",
                    id: "spacy/healthsea-demo"
                } ],
                summary: "Text Classification is the task of assigning a label or class to a given text. Some use cases are sentiment analysis, natural language inference, and assessing grammatical correctness.",
                widgetModels: [ "distilbert/distilbert-base-uncased-finetuned-sst-2-english" ],
                youtubeId: "leNG9fN9FQU"
            }), It("text-generation", {
                datasets: [ {
                    description: "Multilingual dataset used to evaluate text generation models.",
                    id: "CohereForAI/Global-MMLU"
                }, {
                    description: "High quality multilingual data used to train text-generation models.",
                    id: "HuggingFaceFW/fineweb-2"
                }, {
                    description: "Truly open-source, curated and cleaned dialogue dataset.",
                    id: "HuggingFaceH4/ultrachat_200k"
                }, {
                    description: "A reasoning dataset.",
                    id: "open-r1/OpenThoughts-114k-math"
                }, {
                    description: "A multilingual instruction dataset with preference ratings on responses.",
                    id: "allenai/tulu-3-sft-mixture"
                }, {
                    description: "A large synthetic dataset for alignment of text generation models.",
                    id: "HuggingFaceTB/smoltalk"
                }, {
                    description: "A dataset made for training text generation models solving math questions.",
                    id: "HuggingFaceTB/finemath"
                } ],
                demo: {
                    inputs: [ {
                        label: "Input",
                        content: "Once upon a time,",
                        type: "text"
                    } ],
                    outputs: [ {
                        label: "Output",
                        content: "Once upon a time, we knew that our ancestors were on the verge of extinction. The great explorers and poets of the Old World, from Alexander the Great to Chaucer, are dead and gone. A good many of our ancient explorers and poets have",
                        type: "text"
                    } ]
                },
                metrics: [ {
                    description: "Cross Entropy is a metric that calculates the difference between two probability distributions. Each probability distribution is the distribution of predicted words",
                    id: "Cross Entropy"
                }, {
                    description: "The Perplexity metric is the exponential of the cross-entropy loss. It evaluates the probabilities assigned to the next word by the model. Lower perplexity indicates better performance",
                    id: "Perplexity"
                } ],
                models: [ {
                    description: "A text-generation model trained to follow instructions.",
                    id: "google/gemma-2-2b-it"
                }, {
                    description: "Smaller variant of one of the most powerful models.",
                    id: "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B"
                }, {
                    description: "Very powerful text generation model trained to follow instructions.",
                    id: "meta-llama/Meta-Llama-3.1-8B-Instruct"
                }, {
                    description: "Powerful text generation model by Microsoft.",
                    id: "microsoft/phi-4"
                }, {
                    description: "A very powerful model with reasoning capabilities.",
                    id: "simplescaling/s1.1-32B"
                }, {
                    description: "Strong conversational model that supports very long instructions.",
                    id: "Qwen/Qwen2.5-7B-Instruct-1M"
                }, {
                    description: "Text generation model used to write code.",
                    id: "Qwen/Qwen2.5-Coder-32B-Instruct"
                }, {
                    description: "Powerful reasoning based open large language model.",
                    id: "deepseek-ai/DeepSeek-R1"
                } ],
                spaces: [ {
                    description: "A leaderboard to compare different open-source text generation models based on various benchmarks.",
                    id: "open-llm-leaderboard/open_llm_leaderboard"
                }, {
                    description: "A leaderboard for comparing chain-of-thought performance of models.",
                    id: "logikon/open_cot_leaderboard"
                }, {
                    description: "An text generation based application based on a very powerful LLaMA2 model.",
                    id: "ysharma/Explore_llamav2_with_TGI"
                }, {
                    description: "An text generation based application to converse with Zephyr model.",
                    id: "HuggingFaceH4/zephyr-chat"
                }, {
                    description: "A leaderboard that ranks text generation models based on blind votes from people.",
                    id: "lmsys/chatbot-arena-leaderboard"
                }, {
                    description: "An chatbot to converse with a very powerful text generation model.",
                    id: "mlabonne/phixtral-chat"
                } ],
                summary: "Generating text is the task of generating new text given another text. These models can, for example, fill in incomplete text or paraphrase.",
                widgetModels: [ "mistralai/Mistral-Nemo-Instruct-2407" ],
                youtubeId: "e9gNEAlsOvU"
            }), It("text-ranking", {
                datasets: [ {
                    description: "Bing queries with relevant passages from various web sources.",
                    id: "microsoft/ms_marco"
                } ],
                demo: {
                    inputs: [ {
                        label: "Source sentence",
                        content: "Machine learning is so easy.",
                        type: "text"
                    }, {
                        label: "Sentences to compare to",
                        content: "Deep learning is so straightforward.",
                        type: "text"
                    }, {
                        label: "",
                        content: "This is so difficult, like rocket science.",
                        type: "text"
                    }, {
                        label: "",
                        content: "I can't believe how much I struggled with this.",
                        type: "text"
                    } ],
                    outputs: [ {
                        type: "chart",
                        data: [ {
                            label: "Deep learning is so straightforward.",
                            score: 2.2006407
                        }, {
                            label: "This is so difficult, like rocket science.",
                            score: -6.2634873
                        }, {
                            label: "I can't believe how much I struggled with this.",
                            score: -10.251488
                        } ]
                    } ]
                },
                metrics: [ {
                    description: "Discounted Cumulative Gain (DCG) measures the gain, or usefulness, of search results discounted by their position. The normalization is done by dividing the DCG by the ideal DCG, which is the DCG of the perfect ranking.",
                    id: "Normalized Discounted Cumulative Gain"
                }, {
                    description: "Reciprocal Rank is a measure used to rank the relevancy of documents given a set of documents. Reciprocal Rank is the reciprocal of the rank of the document retrieved, meaning, if the rank is 3, the Reciprocal Rank is 0.33. If the rank is 1, the Reciprocal Rank is 1",
                    id: "Mean Reciprocal Rank"
                }, {
                    description: "Mean Average Precision (mAP) is the overall average of the Average Precision (AP) values, where AP is the Area Under the PR Curve (AUC-PR)",
                    id: "Mean Average Precision"
                } ],
                models: [ {
                    description: "An extremely efficient text ranking model trained on a web search dataset.",
                    id: "cross-encoder/ms-marco-MiniLM-L6-v2"
                }, {
                    description: "A strong multilingual text reranker model.",
                    id: "Alibaba-NLP/gte-multilingual-reranker-base"
                }, {
                    description: "An efficient text ranking model that punches above its weight.",
                    id: "Alibaba-NLP/gte-reranker-modernbert-base"
                } ],
                spaces: [],
                summary: "Text Ranking is the task of ranking a set of texts based on their relevance to a query. Text ranking models are trained on large datasets of queries and relevant documents to learn how to rank documents based on their relevance to the query. This task is particularly useful for search engines and information retrieval systems.",
                widgetModels: [ "cross-encoder/ms-marco-MiniLM-L6-v2" ],
                youtubeId: ""
            }), It("text-to-image", {
                datasets: [ {
                    description: "RedCaps is a large-scale dataset of 12M image-text pairs collected from Reddit.",
                    id: "red_caps"
                }, {
                    description: "Conceptual Captions is a dataset consisting of ~3.3M images annotated with captions.",
                    id: "conceptual_captions"
                }, {
                    description: "12M image-caption pairs.",
                    id: "Spawning/PD12M"
                } ],
                demo: {
                    inputs: [ {
                        label: "Input",
                        content: "A city above clouds, pastel colors, Victorian style",
                        type: "text"
                    } ],
                    outputs: [ {
                        filename: "image.jpeg",
                        type: "img"
                    } ]
                },
                metrics: [ {
                    description: "The Inception Score (IS) measure assesses diversity and meaningfulness. It uses a generated image sample to predict its label. A higher score signifies more diverse and meaningful images.",
                    id: "IS"
                }, {
                    description: "The Fréchet Inception Distance (FID) calculates the distance between distributions between synthetic and real samples. A lower FID score indicates better similarity between the distributions of real and generated images.",
                    id: "FID"
                }, {
                    description: "R-precision assesses how the generated image aligns with the provided text description. It uses the generated images as queries to retrieve relevant text descriptions. The top 'r' relevant descriptions are selected and used to calculate R-precision as r/R, where 'R' is the number of ground truth descriptions associated with the generated images. A higher R-precision value indicates a better model.",
                    id: "R-Precision"
                } ],
                models: [ {
                    description: "One of the most powerful image generation models that can generate realistic outputs.",
                    id: "black-forest-labs/FLUX.1-dev"
                }, {
                    description: "A powerful yet fast image generation model.",
                    id: "latent-consistency/lcm-lora-sdxl"
                }, {
                    description: "Text-to-image model for photorealistic generation.",
                    id: "Kwai-Kolors/Kolors"
                }, {
                    description: "A powerful text-to-image model.",
                    id: "stabilityai/stable-diffusion-3-medium-diffusers"
                } ],
                spaces: [ {
                    description: "A powerful text-to-image application.",
                    id: "stabilityai/stable-diffusion-3-medium"
                }, {
                    description: "A text-to-image application to generate comics.",
                    id: "jbilcke-hf/ai-comic-factory"
                }, {
                    description: "An application to match multiple custom image generation models.",
                    id: "multimodalart/flux-lora-lab"
                }, {
                    description: "A powerful yet very fast image generation application.",
                    id: "latent-consistency/lcm-lora-for-sdxl"
                }, {
                    description: "A gallery to explore various text-to-image models.",
                    id: "multimodalart/LoraTheExplorer"
                }, {
                    description: "An application for `text-to-image`, `image-to-image` and image inpainting.",
                    id: "ArtGAN/Stable-Diffusion-ControlNet-WebUI"
                }, {
                    description: "An application to generate realistic images given photos of a person and a prompt.",
                    id: "InstantX/InstantID"
                } ],
                summary: "Text-to-image is the task of generating images from input text. These pipelines can also be used to modify and edit images based on text prompts.",
                widgetModels: [ "black-forest-labs/FLUX.1-dev" ],
                youtubeId: ""
            }), It("text-to-speech", {
                canonicalId: "text-to-audio",
                datasets: [ {
                    description: "10K hours of multi-speaker English dataset.",
                    id: "parler-tts/mls_eng_10k"
                }, {
                    description: "Multi-speaker English dataset.",
                    id: "mythicinfinity/libritts_r"
                }, {
                    description: "Multi-lingual dataset.",
                    id: "facebook/multilingual_librispeech"
                } ],
                demo: {
                    inputs: [ {
                        label: "Input",
                        content: "I love audio models on the Hub!",
                        type: "text"
                    } ],
                    outputs: [ {
                        filename: "audio.wav",
                        type: "audio"
                    } ]
                },
                metrics: [ {
                    description: "The Mel Cepstral Distortion (MCD) metric is used to calculate the quality of generated speech.",
                    id: "mel cepstral distortion"
                } ],
                models: [ {
                    description: "A prompt based, powerful TTS model.",
                    id: "parler-tts/parler-tts-large-v1"
                }, {
                    description: "A powerful TTS model that supports English and Chinese.",
                    id: "SWivid/F5-TTS"
                }, {
                    description: "A massively multi-lingual TTS model.",
                    id: "fishaudio/fish-speech-1.5"
                }, {
                    description: "A powerful TTS model.",
                    id: "OuteAI/OuteTTS-0.1-350M"
                }, {
                    description: "Small yet powerful TTS model.",
                    id: "hexgrad/Kokoro-82M"
                } ],
                spaces: [ {
                    description: "An application for generate high quality speech in different languages.",
                    id: "hexgrad/Kokoro-TTS"
                }, {
                    description: "A multilingual text-to-speech application.",
                    id: "fishaudio/fish-speech-1"
                }, {
                    description: "An application that generates speech in different styles in English and Chinese.",
                    id: "mrfakename/E2-F5-TTS"
                }, {
                    description: "An application that synthesizes emotional speech for diverse speaker prompts.",
                    id: "parler-tts/parler-tts-expresso"
                }, {
                    description: "An application that generates podcast episodes.",
                    id: "ngxson/kokoro-podcast-generator"
                } ],
                summary: "Text-to-Speech (TTS) is the task of generating natural sounding speech given text input. TTS models can be extended to have a single model that generates speech for multiple speakers and multiple languages.",
                widgetModels: [ "suno/bark" ],
                youtubeId: "NW62DpzJ274"
            }), It("text-to-video", {
                datasets: [ {
                    description: "Microsoft Research Video to Text is a large-scale dataset for open domain video captioning",
                    id: "iejMac/CLIP-MSR-VTT"
                }, {
                    description: "UCF101 Human Actions dataset consists of 13,320 video clips from YouTube, with 101 classes.",
                    id: "quchenyuan/UCF101-ZIP"
                }, {
                    description: "A high-quality dataset for human action recognition in YouTube videos.",
                    id: "nateraw/kinetics"
                }, {
                    description: "A dataset of video clips of humans performing pre-defined basic actions with everyday objects.",
                    id: "HuggingFaceM4/something_something_v2"
                }, {
                    description: "This dataset consists of text-video pairs and contains noisy samples with irrelevant video descriptions",
                    id: "HuggingFaceM4/webvid"
                }, {
                    description: "A dataset of short Flickr videos for the temporal localization of events with descriptions.",
                    id: "iejMac/CLIP-DiDeMo"
                } ],
                demo: {
                    inputs: [ {
                        label: "Input",
                        content: "Darth Vader is surfing on the waves.",
                        type: "text"
                    } ],
                    outputs: [ {
                        filename: "text-to-video-output.gif",
                        type: "img"
                    } ]
                },
                metrics: [ {
                    description: "Inception Score uses an image classification model that predicts class labels and evaluates how distinct and diverse the images are. A higher score indicates better video generation.",
                    id: "is"
                }, {
                    description: "Frechet Inception Distance uses an image classification model to obtain image embeddings. The metric compares mean and standard deviation of the embeddings of real and generated images. A smaller score indicates better video generation.",
                    id: "fid"
                }, {
                    description: "Frechet Video Distance uses a model that captures coherence for changes in frames and the quality of each frame. A smaller score indicates better video generation.",
                    id: "fvd"
                }, {
                    description: "CLIPSIM measures similarity between video frames and text using an image-text similarity model. A higher score indicates better video generation.",
                    id: "clipsim"
                } ],
                models: [ {
                    description: "A strong model for consistent video generation.",
                    id: "tencent/HunyuanVideo"
                }, {
                    description: "A text-to-video model with high fidelity motion and strong prompt adherence.",
                    id: "Lightricks/LTX-Video"
                }, {
                    description: "A text-to-video model focusing on physics-aware applications like robotics.",
                    id: "nvidia/Cosmos-1.0-Diffusion-7B-Text2World"
                }, {
                    description: "A robust model for video generation.",
                    id: "Wan-AI/Wan2.1-T2V-1.3B"
                } ],
                spaces: [ {
                    description: "An application that generates video from text.",
                    id: "VideoCrafter/VideoCrafter"
                }, {
                    description: "Consistent video generation application.",
                    id: "Wan-AI/Wan2.1"
                }, {
                    description: "A cutting edge video generation application.",
                    id: "Pyramid-Flow/pyramid-flow"
                } ],
                summary: "Text-to-video models can be used in any application that requires generating consistent sequence of images from text. ",
                widgetModels: [ "Wan-AI/Wan2.1-T2V-14B" ],
                youtubeId: void 0
            }), It("token-classification", {
                datasets: [ {
                    description: "A widely used dataset useful to benchmark named entity recognition models.",
                    id: "eriktks/conll2003"
                }, {
                    description: "A multilingual dataset of Wikipedia articles annotated for named entity recognition in over 150 different languages.",
                    id: "unimelb-nlp/wikiann"
                } ],
                demo: {
                    inputs: [ {
                        label: "Input",
                        content: "My name is Omar and I live in Zürich.",
                        type: "text"
                    } ],
                    outputs: [ {
                        text: "My name is Omar and I live in Zürich.",
                        tokens: [ {
                            type: "PERSON",
                            start: 11,
                            end: 15
                        }, {
                            type: "GPE",
                            start: 30,
                            end: 36
                        } ],
                        type: "text-with-tokens"
                    } ]
                },
                metrics: [ {
                    description: "",
                    id: "accuracy"
                }, {
                    description: "",
                    id: "recall"
                }, {
                    description: "",
                    id: "precision"
                }, {
                    description: "",
                    id: "f1"
                } ],
                models: [ {
                    description: "A robust performance model to identify people, locations, organizations and names of miscellaneous entities.",
                    id: "dslim/bert-base-NER"
                }, {
                    description: "A strong model to identify people, locations, organizations and names in multiple languages.",
                    id: "FacebookAI/xlm-roberta-large-finetuned-conll03-english"
                }, {
                    description: "A token classification model specialized on medical entity recognition.",
                    id: "blaze999/Medical-NER"
                }, {
                    description: "Flair models are typically the state of the art in named entity recognition tasks.",
                    id: "flair/ner-english"
                } ],
                spaces: [ {
                    description: "An application that can recognizes entities, extracts noun chunks and recognizes various linguistic features of each token.",
                    id: "spacy/gradio_pipeline_visualizer"
                } ],
                summary: "Token classification is a natural language understanding task in which a label is assigned to some tokens in a text. Some popular token classification subtasks are Named Entity Recognition (NER) and Part-of-Speech (PoS) tagging. NER models could be trained to identify specific entities in a text, such as dates, individuals and places; and PoS tagging would identify, for example, which words in a text are verbs, nouns, and punctuation marks.",
                widgetModels: [ "FacebookAI/xlm-roberta-large-finetuned-conll03-english" ],
                youtubeId: "wVHdVlPScxA"
            }), It("translation", {
                canonicalId: "text2text-generation",
                datasets: [ {
                    description: "A dataset of copyright-free books translated into 16 different languages.",
                    id: "Helsinki-NLP/opus_books"
                }, {
                    description: "An example of translation between programming languages. This dataset consists of functions in Java and C#.",
                    id: "google/code_x_glue_cc_code_to_code_trans"
                } ],
                demo: {
                    inputs: [ {
                        label: "Input",
                        content: "My name is Omar and I live in Zürich.",
                        type: "text"
                    } ],
                    outputs: [ {
                        label: "Output",
                        content: "Mein Name ist Omar und ich wohne in Zürich.",
                        type: "text"
                    } ]
                },
                metrics: [ {
                    description: "BLEU score is calculated by counting the number of shared single or subsequent tokens between the generated sequence and the reference. Subsequent n tokens are called “n-grams”. Unigram refers to a single token while bi-gram refers to token pairs and n-grams refer to n subsequent tokens. The score ranges from 0 to 1, where 1 means the translation perfectly matched and 0 did not match at all",
                    id: "bleu"
                }, {
                    description: "",
                    id: "sacrebleu"
                } ],
                models: [ {
                    description: "Very powerful model that can translate many languages between each other, especially low-resource languages.",
                    id: "facebook/nllb-200-1.3B"
                }, {
                    description: "A general-purpose Transformer that can be used to translate from English to German, French, or Romanian.",
                    id: "google-t5/t5-base"
                } ],
                spaces: [ {
                    description: "An application that can translate between 100 languages.",
                    id: "Iker/Translate-100-languages"
                }, {
                    description: "An application that can translate between many languages.",
                    id: "Geonmo/nllb-translation-demo"
                } ],
                summary: "Translation is the task of converting text from one language to another.",
                widgetModels: [ "facebook/mbart-large-50-many-to-many-mmt" ],
                youtubeId: "1JvfrvZgi6c"
            }), It("unconditional-image-generation", {
                datasets: [ {
                    description: "The CIFAR-100 dataset consists of 60000 32x32 colour images in 100 classes, with 600 images per class.",
                    id: "cifar100"
                }, {
                    description: "Multiple images of celebrities, used for facial expression translation.",
                    id: "CelebA"
                } ],
                demo: {
                    inputs: [ {
                        label: "Seed",
                        content: "42",
                        type: "text"
                    }, {
                        label: "Number of images to generate:",
                        content: "4",
                        type: "text"
                    } ],
                    outputs: [ {
                        filename: "unconditional-image-generation-output.jpeg",
                        type: "img"
                    } ]
                },
                metrics: [ {
                    description: "The inception score (IS) evaluates the quality of generated images. It measures the diversity of the generated images (the model predictions are evenly distributed across all possible labels) and their 'distinction' or 'sharpness' (the model confidently predicts a single label for each image).",
                    id: "Inception score (IS)"
                }, {
                    description: "The Fréchet Inception Distance (FID) evaluates the quality of images created by a generative model by calculating the distance between feature vectors for real and generated images.",
                    id: "Frećhet Inception Distance (FID)"
                } ],
                models: [ {
                    description: "High-quality image generation model trained on the CIFAR-10 dataset. It synthesizes images of the ten classes presented in the dataset using diffusion probabilistic models, a class of latent variable models inspired by considerations from nonequilibrium thermodynamics.",
                    id: "google/ddpm-cifar10-32"
                }, {
                    description: "High-quality image generation model trained on the 256x256 CelebA-HQ dataset. It synthesizes images of faces using diffusion probabilistic models, a class of latent variable models inspired by considerations from nonequilibrium thermodynamics.",
                    id: "google/ddpm-celebahq-256"
                } ],
                spaces: [ {
                    description: "An application that can generate realistic faces.",
                    id: "CompVis/celeba-latent-diffusion"
                } ],
                summary: "Unconditional image generation is the task of generating images with no condition in any context (like a prompt text or another image). Once trained, the model will create images that resemble its training data distribution.",
                widgetModels: [ "" ],
                youtubeId: ""
            }), It("video-text-to-text", {
                datasets: [ {
                    description: "Multiple-choice questions and answers about videos.",
                    id: "lmms-lab/Video-MME"
                }, {
                    description: "A dataset of instructions and question-answer pairs about videos.",
                    id: "lmms-lab/VideoChatGPT"
                }, {
                    description: "Large video understanding dataset.",
                    id: "HuggingFaceFV/finevideo"
                } ],
                demo: {
                    inputs: [ {
                        filename: "video-text-to-text-input.gif",
                        type: "img"
                    }, {
                        label: "Text Prompt",
                        content: "What is happening in this video?",
                        type: "text"
                    } ],
                    outputs: [ {
                        label: "Answer",
                        content: "The video shows a series of images showing a fountain with water jets and a variety of colorful flowers and butterflies in the background.",
                        type: "text"
                    } ]
                },
                metrics: [],
                models: [ {
                    description: "A robust video-text-to-text model.",
                    id: "Vision-CAIR/LongVU_Qwen2_7B"
                }, {
                    description: "Strong video-text-to-text model with reasoning capabilities.",
                    id: "GoodiesHere/Apollo-LMMs-Apollo-7B-t32"
                }, {
                    description: "Strong video-text-to-text model.",
                    id: "HuggingFaceTB/SmolVLM2-2.2B-Instruct"
                } ],
                spaces: [ {
                    description: "An application to chat with a video-text-to-text model.",
                    id: "llava-hf/video-llava"
                }, {
                    description: "A leaderboard for various video-text-to-text models.",
                    id: "opencompass/openvlm_video_leaderboard"
                }, {
                    description: "An application to generate highlights from a video.",
                    id: "HuggingFaceTB/SmolVLM2-HighlightGenerator"
                } ],
                summary: "Video-text-to-text models take in a video and a text prompt and output text. These models are also called video-language models.",
                widgetModels: [ "" ],
                youtubeId: ""
            }), It("visual-question-answering", {
                datasets: [ {
                    description: "A widely used dataset containing questions (with answers) about images.",
                    id: "Graphcore/vqa"
                }, {
                    description: "A dataset to benchmark visual reasoning based on text in images.",
                    id: "facebook/textvqa"
                } ],
                demo: {
                    inputs: [ {
                        filename: "elephant.jpeg",
                        type: "img"
                    }, {
                        label: "Question",
                        content: "What is in this image?",
                        type: "text"
                    } ],
                    outputs: [ {
                        type: "chart",
                        data: [ {
                            label: "elephant",
                            score: .97
                        }, {
                            label: "elephants",
                            score: .06
                        }, {
                            label: "animal",
                            score: .003
                        } ]
                    } ]
                },
                isPlaceholder: !1,
                metrics: [ {
                    description: "",
                    id: "accuracy"
                }, {
                    description: "Measures how much a predicted answer differs from the ground truth based on the difference in their semantic meaning.",
                    id: "wu-palmer similarity"
                } ],
                models: [ {
                    description: "A visual question answering model trained to convert charts and plots to text.",
                    id: "google/deplot"
                }, {
                    description: "A visual question answering model trained for mathematical reasoning and chart derendering from images.",
                    id: "google/matcha-base"
                }, {
                    description: "A strong visual question answering that answers questions from book covers.",
                    id: "google/pix2struct-ocrvqa-large"
                } ],
                spaces: [ {
                    description: "An application that compares visual question answering models across different tasks.",
                    id: "merve/pix2struct"
                }, {
                    description: "An application that can answer questions based on images.",
                    id: "nielsr/vilt-vqa"
                }, {
                    description: "An application that can caption images and answer questions about a given image. ",
                    id: "Salesforce/BLIP"
                }, {
                    description: "An application that can caption images and answer questions about a given image. ",
                    id: "vumichien/Img2Prompt"
                } ],
                summary: "Visual Question Answering is the task of answering open-ended questions based on an image. They output natural language responses to natural language questions.",
                widgetModels: [ "dandelin/vilt-b32-finetuned-vqa" ],
                youtubeId: ""
            }), It("zero-shot-classification", {
                datasets: [ {
                    description: "A widely used dataset used to benchmark multiple variants of text classification.",
                    id: "nyu-mll/glue"
                }, {
                    description: "The Multi-Genre Natural Language Inference (MultiNLI) corpus is a crowd-sourced collection of 433k sentence pairs annotated with textual entailment information.",
                    id: "nyu-mll/multi_nli"
                }, {
                    description: "FEVER is a publicly available dataset for fact extraction and verification against textual sources.",
                    id: "fever/fever"
                } ],
                demo: {
                    inputs: [ {
                        label: "Text Input",
                        content: "Dune is the best movie ever.",
                        type: "text"
                    }, {
                        label: "Candidate Labels",
                        content: "CINEMA, ART, MUSIC",
                        type: "text"
                    } ],
                    outputs: [ {
                        type: "chart",
                        data: [ {
                            label: "CINEMA",
                            score: .9
                        }, {
                            label: "ART",
                            score: .1
                        }, {
                            label: "MUSIC",
                            score: 0
                        } ]
                    } ]
                },
                metrics: [],
                models: [ {
                    description: "Powerful zero-shot text classification model.",
                    id: "facebook/bart-large-mnli"
                }, {
                    description: "Cutting-edge zero-shot multilingual text classification model.",
                    id: "MoritzLaurer/ModernBERT-large-zeroshot-v2.0"
                }, {
                    description: "Zero-shot text classification model that can be used for topic and sentiment classification.",
                    id: "knowledgator/gliclass-modern-base-v2.0-init"
                } ],
                spaces: [],
                summary: "Zero-shot text classification is a task in natural language processing where a model is trained on a set of labeled examples but is then able to classify new examples from previously unseen classes.",
                widgetModels: [ "facebook/bart-large-mnli" ]
            }), It("zero-shot-image-classification", {
                datasets: [ {
                    description: "",
                    id: ""
                } ],
                demo: {
                    inputs: [ {
                        filename: "image-classification-input.jpeg",
                        type: "img"
                    }, {
                        label: "Classes",
                        content: "cat, dog, bird",
                        type: "text"
                    } ],
                    outputs: [ {
                        type: "chart",
                        data: [ {
                            label: "Cat",
                            score: .664
                        }, {
                            label: "Dog",
                            score: .329
                        }, {
                            label: "Bird",
                            score: .008
                        } ]
                    } ]
                },
                metrics: [ {
                    description: "Computes the number of times the correct label appears in top K labels predicted",
                    id: "top-K accuracy"
                } ],
                models: [ {
                    description: "Multilingual image classification model for 80 languages.",
                    id: "visheratin/mexma-siglip"
                }, {
                    description: "Strong zero-shot image classification model.",
                    id: "google/siglip2-base-patch16-224"
                }, {
                    description: "Robust zero-shot image classification model.",
                    id: "intfloat/mmE5-mllama-11b-instruct"
                }, {
                    description: "Powerful zero-shot image classification model supporting 94 languages.",
                    id: "jinaai/jina-clip-v2"
                }, {
                    description: "Strong image classification model for biomedical domain.",
                    id: "microsoft/BiomedCLIP-PubMedBERT_256-vit_base_patch16_224"
                } ],
                spaces: [ {
                    description: "An application that leverages zero-shot image classification to find best captions to generate an image. ",
                    id: "pharma/CLIP-Interrogator"
                }, {
                    description: "An application to compare different zero-shot image classification models. ",
                    id: "merve/compare_clip_siglip"
                } ],
                summary: "Zero-shot image classification is the task of classifying previously unseen classes during training of a model.",
                widgetModels: [ "google/siglip-so400m-patch14-224" ],
                youtubeId: ""
            }), It("zero-shot-object-detection", {
                datasets: [],
                demo: {
                    inputs: [ {
                        filename: "zero-shot-object-detection-input.jpg",
                        type: "img"
                    }, {
                        label: "Classes",
                        content: "cat, dog, bird",
                        type: "text"
                    } ],
                    outputs: [ {
                        filename: "zero-shot-object-detection-output.jpg",
                        type: "img"
                    } ]
                },
                metrics: [ {
                    description: "The Average Precision (AP) metric is the Area Under the PR Curve (AUC-PR). It is calculated for each class separately",
                    id: "Average Precision"
                }, {
                    description: "The Mean Average Precision (mAP) metric is the overall average of the AP values",
                    id: "Mean Average Precision"
                }, {
                    description: "The APα metric is the Average Precision at the IoU threshold of a α value, for example, AP50 and AP75",
                    id: "APα"
                } ],
                models: [ {
                    description: "Solid zero-shot object detection model.",
                    id: "IDEA-Research/grounding-dino-base"
                }, {
                    description: "Cutting-edge zero-shot object detection model.",
                    id: "google/owlv2-base-patch16-ensemble"
                } ],
                spaces: [ {
                    description: "A demo to try the state-of-the-art zero-shot object detection model, OWLv2.",
                    id: "merve/owlv2"
                }, {
                    description: "A demo that combines a zero-shot object detection and mask generation model for zero-shot segmentation.",
                    id: "merve/OWLSAM"
                } ],
                summary: "Zero-shot object detection is a computer vision task to detect objects and their classes in images, without any prior training or knowledge of the classes. Zero-shot object detection models receive an image as input, as well as a list of candidate classes, and output the bounding boxes and labels where the objects have been detected.",
                widgetModels: [],
                youtubeId: ""
            }), It("text-to-3d", {
                datasets: [ {
                    description: "A large dataset of over 10 million 3D objects.",
                    id: "allenai/objaverse-xl"
                }, {
                    description: "Descriptive captions for 3D objects in Objaverse.",
                    id: "tiange/Cap3D"
                } ],
                demo: {
                    inputs: [ {
                        label: "Prompt",
                        content: "a cat statue",
                        type: "text"
                    } ],
                    outputs: [ {
                        label: "Result",
                        content: "text-to-3d-3d-output-filename.glb",
                        type: "text"
                    } ]
                },
                metrics: [],
                models: [ {
                    description: "Text-to-3D mesh model by OpenAI",
                    id: "openai/shap-e"
                }, {
                    description: "Generative 3D gaussian splatting model.",
                    id: "ashawkey/LGM"
                } ],
                spaces: [ {
                    description: "Text-to-3D demo with mesh outputs.",
                    id: "hysts/Shap-E"
                }, {
                    description: "Text/image-to-3D demo with splat outputs.",
                    id: "ashawkey/LGM"
                } ],
                summary: "Text-to-3D models take in text input and produce 3D output.",
                widgetModels: [],
                youtubeId: ""
            }), It("image-to-3d", {
                datasets: [ {
                    description: "A large dataset of over 10 million 3D objects.",
                    id: "allenai/objaverse-xl"
                }, {
                    description: "A dataset of isolated object images for evaluating image-to-3D models.",
                    id: "dylanebert/iso3d"
                } ],
                demo: {
                    inputs: [ {
                        filename: "image-to-3d-image-input.png",
                        type: "img"
                    } ],
                    outputs: [ {
                        label: "Result",
                        content: "image-to-3d-3d-output-filename.glb",
                        type: "text"
                    } ]
                },
                metrics: [],
                models: [ {
                    description: "Fast image-to-3D mesh model by Tencent.",
                    id: "TencentARC/InstantMesh"
                }, {
                    description: "Fast image-to-3D mesh model by StabilityAI",
                    id: "stabilityai/TripoSR"
                }, {
                    description: "A scaled up image-to-3D mesh model derived from TripoSR.",
                    id: "hwjiang/Real3D"
                }, {
                    description: "Consistent image-to-3d generation model.",
                    id: "stabilityai/stable-point-aware-3d"
                } ],
                spaces: [ {
                    description: "Leaderboard to evaluate image-to-3D models.",
                    id: "dylanebert/3d-arena"
                }, {
                    description: "Image-to-3D demo with mesh outputs.",
                    id: "TencentARC/InstantMesh"
                }, {
                    description: "Image-to-3D demo.",
                    id: "stabilityai/stable-point-aware-3d"
                }, {
                    description: "Image-to-3D demo with mesh outputs.",
                    id: "hwjiang/Real3D"
                }, {
                    description: "Image-to-3D demo with splat outputs.",
                    id: "dylanebert/LGM-mini"
                } ],
                summary: "Image-to-3D models take in image input and produce 3D output.",
                widgetModels: [],
                youtubeId: ""
            });
            const Et = e => e.tags.includes("conversational") ? "text-generation" === e.pipeline_tag ? [ {
                role: "user",
                content: "What is the capital of France?"
            } ] : [ {
                role: "user",
                content: [ {
                    type: "text",
                    text: "Describe this image in one sentence."
                }, {
                    type: "image_url",
                    image_url: {
                        url: "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg"
                    }
                } ]
            } ] : '"Can you please let us know more details about your "', Mt = () => '\'{"Height":[11.52,12.48],"Length1":[23.2,24.0],"Length2":[25.4,26.3],"Species": ["Bream","Bream"]}\'', Ct = {
                "audio-to-audio": () => '"sample1.flac"',
                "audio-classification": () => '"sample1.flac"',
                "automatic-speech-recognition": () => '"sample1.flac"',
                "document-question-answering": () => '{\n        "image": "cat.png",\n        "question": "What is in this image?"\n    }',
                "feature-extraction": () => '"Today is a sunny day and I will get some ice cream."',
                "fill-mask": e => `"The answer to the universe is ${e.mask_token}."`,
                "image-classification": () => '"cats.jpg"',
                "image-to-text": () => '"cats.jpg"',
                "image-to-image": () => '{\n    "image": "cat.png",\n    "prompt": "Turn the cat into a tiger."\n}',
                "image-segmentation": () => '"cats.jpg"',
                "object-detection": () => '"cats.jpg"',
                "question-answering": () => '{\n    "question": "What is my name?",\n    "context": "My name is Clara and I live in Berkeley."\n}',
                "sentence-similarity": () => '{\n    "source_sentence": "That is a happy person",\n    "sentences": [\n        "That is a happy dog",\n        "That is a very happy person",\n        "Today is a sunny day"\n    ]\n}',
                summarization: () => '"The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct."',
                "table-question-answering": () => '{\n    "query": "How many stars does the transformers repository have?",\n    "table": {\n        "Repository": ["Transformers", "Datasets", "Tokenizers"],\n        "Stars": ["36542", "4512", "3934"],\n        "Contributors": ["651", "77", "34"],\n        "Programming language": [\n            "Python",\n            "Python",\n            "Rust, Python and NodeJS"\n        ]\n    }\n}',
                "tabular-regression": Mt,
                "tabular-classification": Mt,
                "text-classification": () => '"I like you. I love you"',
                "text-generation": Et,
                "image-text-to-text": Et,
                "text-to-image": () => '"Astronaut riding a horse"',
                "text-to-video": () => '"A young man walking on the street"',
                "text-to-speech": () => '"The answer to the universe is 42"',
                "text-to-audio": () => '"liquid drum and bass, atmospheric synths, airy sounds"',
                "text2text-generation": () => '"The answer to the universe is"',
                "token-classification": () => '"My name is Sarah Jessica Parker but you can call me Jessica"',
                translation: () => '"Меня зовут Вольфганг и я живу в Берлине"',
                "zero-shot-classification": () => '"Hi, I recently bought a device from your company but it is not working as advertised and I would like to get reimbursed!"',
                "zero-shot-image-classification": () => '"cats.jpg"'
            };
            function jt(e, t = !1, n = !1) {
                if (e.pipeline_tag) {
                    const a = Ct[e.pipeline_tag];
                    if (a) {
                        let i = a(e);
                        if ("string" == typeof i && (t && (i = i.replace(/(?:(?:\r?\n|\r)\t*)|\t+/g, " ")), 
                        n)) {
                            const e = /^"(.+)"$/s, t = i.match(e);
                            i = t ? t[1] : i;
                        }
                        return i;
                    }
                }
                return "No input example has been defined for this model task.";
            }
            const Ut = "custom_code";
            function Ot(e) {
                const t = e.split("/");
                return 1 === t.length ? t[0] : t[1];
            }
            function $t(e) {
                return e.cardData?.base_model?.toString() ?? "fill-in-base-model";
            }
            function Pt(e) {
                const t = e.widgetData?.[0]?.text ?? e.cardData?.instance_prompt;
                if (t) return n = t, JSON.stringify(n).slice(1, -1);
                var n;
            }
            const Rt = "Astronaut in a jungle, cold color palette, muted colors, detailed, 8k", Dt = {
                CausalLM: e => `\nimport keras_hub\n\n# Load CausalLM model (optional: use half precision for inference)\ncausal_lm = keras_hub.models.CausalLM.from_preset("hf://${e}", dtype="bfloat16")\ncausal_lm.compile(sampler="greedy")  # (optional) specify a sampler\n\n# Generate text\ncausal_lm.generate("Keras: deep learning for", max_length=64)\n`,
                TextToImage: e => `\nimport keras_hub\n\n# Load TextToImage model (optional: use half precision for inference)\ntext_to_image = keras_hub.models.TextToImage.from_preset("hf://${e}", dtype="bfloat16")\n\n# Generate images with a TextToImage model.\ntext_to_image.generate("Astronaut in a jungle")\n`,
                TextClassifier: e => `\nimport keras_hub\n\n# Load TextClassifier model\ntext_classifier = keras_hub.models.TextClassifier.from_preset(\n    "hf://${e}",\n    num_classes=2,\n)\n# Fine-tune\ntext_classifier.fit(x=["Thilling adventure!", "Total snoozefest."], y=[1, 0])\n# Classify text\ntext_classifier.predict(["Not my cup of tea."])\n`,
                ImageClassifier: e => `\nimport keras_hub\nimport keras\n\n# Load ImageClassifier model\nimage_classifier = keras_hub.models.ImageClassifier.from_preset(\n    "hf://${e}",\n    num_classes=2,\n)\n# Fine-tune\nimage_classifier.fit(\n    x=keras.random.randint((32, 64, 64, 3), 0, 256),\n    y=keras.random.randint((32, 1), 0, 2),\n)\n# Classify image\nimage_classifier.predict(keras.random.randint((1, 64, 64, 3), 0, 256))\n`
            }, Nt = (e, t) => `\nimport keras_hub\n\n# Create a ${e} model\ntask = keras_hub.models.${e}.from_preset("hf://${t}")\n`, qt = e => {
                const t = e.tags.find((e => e.match(/^yolov\d+$/))), n = t ? `YOLOv${t.slice(4)}` : "YOLOvXX";
                return [ (t ? "" : "# Couldn't find a valid YOLO version tag.\n# Replace XX with the correct version.\n") + `from ultralytics import ${n}\n\nmodel = ${n}.from_pretrained("${e.id}")\nsource = 'http://images.cocodataset.org/val2017/000000039769.jpg'\nmodel.predict(source=source, save=True)` ];
            }, zt = {
                "adapter-transformers": {
                    prettyLabel: "Adapters",
                    repoName: "adapters",
                    repoUrl: "https://github.com/Adapter-Hub/adapters",
                    docsUrl: "https://huggingface.co/docs/hub/adapters",
                    snippets: e => [ `from adapters import AutoAdapterModel\n\nmodel = AutoAdapterModel.from_pretrained("${e.config?.adapter_transformers?.model_name}")\nmodel.load_adapter("${e.id}", set_active=True)` ],
                    filter: !0,
                    countDownloads: 'path:"adapter_config.json"'
                },
                allennlp: {
                    prettyLabel: "AllenNLP",
                    repoName: "AllenNLP",
                    repoUrl: "https://github.com/allenai/allennlp",
                    docsUrl: "https://huggingface.co/docs/hub/allennlp",
                    snippets: e => e.tags.includes("question-answering") ? (e => [ `import allennlp_models\nfrom allennlp.predictors.predictor import Predictor\n\npredictor = Predictor.from_path("hf://${e.id}")\npredictor_input = {"passage": "My name is Wolfgang and I live in Berlin", "question": "Where do I live?"}\npredictions = predictor.predict_json(predictor_input)` ])(e) : (e => [ `import allennlp_models\nfrom allennlp.predictors.predictor import Predictor\n\npredictor = Predictor.from_path("hf://${e.id}")` ])(e),
                    filter: !0
                },
                anemoi: {
                    prettyLabel: "AnemoI",
                    repoName: "AnemoI",
                    repoUrl: "https://github.com/ecmwf/anemoi-inference",
                    docsUrl: "https://anemoi-docs.readthedocs.io/en/latest/",
                    filter: !1,
                    countDownloads: 'path_extension:"ckpt"',
                    snippets: e => [ `from anemoi.inference.runners.default import DefaultRunner\nfrom anemoi.inference.config import Configuration\n# Create Configuration\nconfig = Configuration(checkpoint = {"huggingface":{"repo_id":"${e.id}"}})\n# Load Runner\nrunner = DefaultRunner(config)` ]
                },
                araclip: {
                    prettyLabel: "AraClip",
                    repoName: "AraClip",
                    repoUrl: "https://huggingface.co/Arabic-Clip/araclip",
                    filter: !1,
                    snippets: e => [ `from araclip import AraClip\n\nmodel = AraClip.from_pretrained("${e.id}")` ]
                },
                asteroid: {
                    prettyLabel: "Asteroid",
                    repoName: "Asteroid",
                    repoUrl: "https://github.com/asteroid-team/asteroid",
                    docsUrl: "https://huggingface.co/docs/hub/asteroid",
                    snippets: e => [ `from asteroid.models import BaseModel\n\nmodel = BaseModel.from_pretrained("${e.id}")` ],
                    filter: !0,
                    countDownloads: 'path:"pytorch_model.bin"'
                },
                audiocraft: {
                    prettyLabel: "Audiocraft",
                    repoName: "audiocraft",
                    repoUrl: "https://github.com/facebookresearch/audiocraft",
                    snippets: e => e.tags.includes("musicgen") ? (e => [ `from audiocraft.models import MusicGen\n\nmodel = MusicGen.get_pretrained("${e.id}")\n\ndescriptions = ['happy rock', 'energetic EDM', 'sad jazz']\nwav = model.generate(descriptions)  # generates 3 samples.` ])(e) : e.tags.includes("audiogen") ? (e => [ `from audiocraft.models import AudioGen\n\t\nmodel = AudioGen.get_pretrained("${e.id}")\nmodel.set_generation_params(duration=5)  # generate 5 seconds.\ndescriptions = ['dog barking', 'sirene of an emergency vehicle', 'footsteps in a corridor']\nwav = model.generate(descriptions)  # generates 3 samples.` ])(e) : e.tags.includes("magnet") ? (e => [ `from audiocraft.models import MAGNeT\n\t\nmodel = MAGNeT.get_pretrained("${e.id}")\n\ndescriptions = ['disco beat', 'energetic EDM', 'funky groove']\nwav = model.generate(descriptions)  # generates 3 samples.` ])(e) : [ "# Type of model unknown." ],
                    filter: !1,
                    countDownloads: 'path:"state_dict.bin"'
                },
                audioseal: {
                    prettyLabel: "AudioSeal",
                    repoName: "audioseal",
                    repoUrl: "https://github.com/facebookresearch/audioseal",
                    filter: !1,
                    countDownloads: 'path_extension:"pth"',
                    snippets: e => [ `# Watermark Generator\nfrom audioseal import AudioSeal\n\nmodel = AudioSeal.load_generator("${e.id}")\n# pass a tensor (tensor_wav) of shape (batch, channels, samples) and a sample rate\nwav, sr = tensor_wav, 16000\n\t\nwatermark = model.get_watermark(wav, sr)\nwatermarked_audio = wav + watermark`, `# Watermark Detector\nfrom audioseal import AudioSeal\n\ndetector = AudioSeal.load_detector("${e.id}")\n\t\nresult, message = detector.detect_watermark(watermarked_audio, sr)` ]
                },
                ben2: {
                    prettyLabel: "BEN2",
                    repoName: "BEN2",
                    repoUrl: "https://github.com/PramaLLC/BEN2",
                    snippets: e => [ `import requests\nfrom PIL import Image\nfrom ben2 import AutoModel\n\nurl = "https://huggingface.co/datasets/mishig/sample_images/resolve/main/teapot.jpg"\nimage = Image.open(requests.get(url, stream=True).raw)\n\nmodel = AutoModel.from_pretrained("${e.id}")\nmodel.to("cuda").eval()\nforeground = model.inference(image)\n` ],
                    filter: !1
                },
                bertopic: {
                    prettyLabel: "BERTopic",
                    repoName: "BERTopic",
                    repoUrl: "https://github.com/MaartenGr/BERTopic",
                    snippets: e => [ `from bertopic import BERTopic\n\nmodel = BERTopic.load("${e.id}")` ],
                    filter: !0
                },
                big_vision: {
                    prettyLabel: "Big Vision",
                    repoName: "big_vision",
                    repoUrl: "https://github.com/google-research/big_vision",
                    filter: !1,
                    countDownloads: 'path_extension:"npz"'
                },
                birder: {
                    prettyLabel: "Birder",
                    repoName: "Birder",
                    repoUrl: "https://gitlab.com/birder/birder",
                    filter: !1,
                    countDownloads: 'path_extension:"pt"'
                },
                birefnet: {
                    prettyLabel: "BiRefNet",
                    repoName: "BiRefNet",
                    repoUrl: "https://github.com/ZhengPeng7/BiRefNet",
                    snippets: e => [ `# Option 1: use with transformers\n\nfrom transformers import AutoModelForImageSegmentation\nbirefnet = AutoModelForImageSegmentation.from_pretrained("${e.id}", trust_remote_code=True)\n`, `# Option 2: use with BiRefNet\n\n# Install from https://github.com/ZhengPeng7/BiRefNet\n\nfrom models.birefnet import BiRefNet\nmodel = BiRefNet.from_pretrained("${e.id}")` ],
                    filter: !1
                },
                bm25s: {
                    prettyLabel: "BM25S",
                    repoName: "bm25s",
                    repoUrl: "https://github.com/xhluca/bm25s",
                    snippets: e => [ `from bm25s.hf import BM25HF\n\nretriever = BM25HF.load_from_hub("${e.id}")` ],
                    filter: !1,
                    countDownloads: 'path:"params.index.json"'
                },
                champ: {
                    prettyLabel: "Champ",
                    repoName: "Champ",
                    repoUrl: "https://github.com/fudan-generative-vision/champ",
                    countDownloads: 'path:"champ/motion_module.pth"'
                },
                chat_tts: {
                    prettyLabel: "ChatTTS",
                    repoName: "ChatTTS",
                    repoUrl: "https://github.com/2noise/ChatTTS.git",
                    snippets: () => [ 'import ChatTTS\nimport torchaudio\n\nchat = ChatTTS.Chat()\nchat.load_models(compile=False) # Set to True for better performance\n\ntexts = ["PUT YOUR TEXT HERE",]\n\nwavs = chat.infer(texts, )\n\ntorchaudio.save("output1.wav", torch.from_numpy(wavs[0]), 24000)' ],
                    filter: !1,
                    countDownloads: 'path:"asset/GPT.pt"'
                },
                colpali: {
                    prettyLabel: "ColPali",
                    repoName: "ColPali",
                    repoUrl: "https://github.com/ManuelFay/colpali",
                    filter: !1,
                    countDownloads: 'path:"adapter_config.json"'
                },
                comet: {
                    prettyLabel: "COMET",
                    repoName: "COMET",
                    repoUrl: "https://github.com/Unbabel/COMET/",
                    countDownloads: 'path:"hparams.yaml"'
                },
                cosmos: {
                    prettyLabel: "Cosmos",
                    repoName: "Cosmos",
                    repoUrl: "https://github.com/NVIDIA/Cosmos",
                    countDownloads: 'path:"config.json" OR path_extension:"pt"'
                },
                "cxr-foundation": {
                    prettyLabel: "CXR Foundation",
                    repoName: "cxr-foundation",
                    repoUrl: "https://github.com/google-health/cxr-foundation",
                    snippets: () => [ "# pip install git+https://github.com/Google-Health/cxr-foundation.git#subdirectory=python\n\n# Load image as grayscale (Stillwaterising, CC0, via Wikimedia Commons)\nimport requests\nfrom PIL import Image\nfrom io import BytesIO\nimage_url = \"https://upload.wikimedia.org/wikipedia/commons/c/c8/Chest_Xray_PA_3-8-2010.png\"\nimg = Image.open(requests.get(image_url, headers={'User-Agent': 'Demo'}, stream=True).raw).convert('L')\n\n# Run inference\nfrom clientside.clients import make_hugging_face_client\ncxr_client = make_hugging_face_client('cxr_model')\nprint(cxr_client.get_image_embeddings_from_images([img]))" ],
                    filter: !1,
                    countDownloads: 'path:"precomputed_embeddings/embeddings.npz" OR path:"pax-elixr-b-text/saved_model.pb"'
                },
                deepforest: {
                    prettyLabel: "DeepForest",
                    repoName: "deepforest",
                    docsUrl: "https://deepforest.readthedocs.io/en/latest/",
                    repoUrl: "https://github.com/weecology/DeepForest"
                },
                "depth-anything-v2": {
                    prettyLabel: "DepthAnythingV2",
                    repoName: "Depth Anything V2",
                    repoUrl: "https://github.com/DepthAnything/Depth-Anything-V2",
                    snippets: e => {
                        let t, n, a;
                        return t = "<ENCODER>", n = "<NUMBER_OF_FEATURES>", a = "<OUT_CHANNELS>", "depth-anything/Depth-Anything-V2-Small" === e.id ? (t = "vits", 
                        n = "64", a = "[48, 96, 192, 384]") : "depth-anything/Depth-Anything-V2-Base" === e.id ? (t = "vitb", 
                        n = "128", a = "[96, 192, 384, 768]") : "depth-anything/Depth-Anything-V2-Large" === e.id && (t = "vitl", 
                        n = "256", a = "[256, 512, 1024, 1024"), [ `\n# Install from https://github.com/DepthAnything/Depth-Anything-V2\n\n# Load the model and infer depth from an image\nimport cv2\nimport torch\n\nfrom depth_anything_v2.dpt import DepthAnythingV2\n\n# instantiate the model\nmodel = DepthAnythingV2(encoder="${t}", features=${n}, out_channels=${a})\n\n# load the weights\nfilepath = hf_hub_download(repo_id="${e.id}", filename="depth_anything_v2_${t}.pth", repo_type="model")\nstate_dict = torch.load(filepath, map_location="cpu")\nmodel.load_state_dict(state_dict).eval()\n\nraw_img = cv2.imread("your/image/path")\ndepth = model.infer_image(raw_img) # HxW raw depth map in numpy\n    ` ];
                    },
                    filter: !1,
                    countDownloads: 'path_extension:"pth"'
                },
                "depth-pro": {
                    prettyLabel: "Depth Pro",
                    repoName: "Depth Pro",
                    repoUrl: "https://github.com/apple/ml-depth-pro",
                    countDownloads: 'path_extension:"pt"',
                    snippets: e => [ `# Download checkpoint\npip install huggingface-hub\nhuggingface-cli download --local-dir checkpoints ${e.id}`, 'import depth_pro\n\n# Load model and preprocessing transform\nmodel, transform = depth_pro.create_model_and_transforms()\nmodel.eval()\n\n# Load and preprocess an image.\nimage, _, f_px = depth_pro.load_rgb("example.png")\nimage = transform(image)\n\n# Run inference.\nprediction = model.infer(image, f_px=f_px)\n\n# Results: 1. Depth in meters\ndepth = prediction["depth"]\n# Results: 2. Focal length in pixels\nfocallength_px = prediction["focallength_px"]' ],
                    filter: !1
                },
                "derm-foundation": {
                    prettyLabel: "Derm Foundation",
                    repoName: "derm-foundation",
                    repoUrl: "https://github.com/google-health/derm-foundation",
                    snippets: () => [ 'from huggingface_hub import from_pretrained_keras\nimport tensorflow as tf, requests\n\n# Load and format input\nIMAGE_URL = "https://storage.googleapis.com/dx-scin-public-data/dataset/images/3445096909671059178.png"\ninput_tensor = tf.train.Example(\n    features=tf.train.Features(\n        feature={\n            "image/encoded": tf.train.Feature(\n                bytes_list=tf.train.BytesList(value=[requests.get(IMAGE_URL, stream=True).content])\n            )\n        }\n    )\n).SerializeToString()\n\n# Load model and run inference\nloaded_model = from_pretrained_keras("google/derm-foundation")\ninfer = loaded_model.signatures["serving_default"]\nprint(infer(inputs=tf.constant([input_tensor])))' ],
                    filter: !1,
                    countDownloads: 'path:"scin_dataset_precomputed_embeddings.npz" OR path:"saved_model.pb"'
                },
                "describe-anything": {
                    prettyLabel: "Describe Anything",
                    repoName: "Describe Anything",
                    repoUrl: "https://github.com/NVlabs/describe-anything",
                    snippets: e => [ `# pip install git+https://github.com/NVlabs/describe-anything\nfrom huggingface_hub import snapshot_download\nfrom dam import DescribeAnythingModel\n\nsnapshot_download(${e.id}, local_dir="checkpoints")\n\ndam = DescribeAnythingModel(\n\tmodel_path="checkpoints",\n\tconv_mode="v1",\n\tprompt_mode="focal_prompt",\n)` ],
                    filter: !1
                },
                "dia-tts": {
                    prettyLabel: "Dia",
                    repoName: "Dia",
                    repoUrl: "https://github.com/nari-labs/dia",
                    snippets: e => [ `import soundfile as sf\nfrom dia.model import Dia\n\nmodel = Dia.from_pretrained("${e.id}")\ntext = "[S1] Dia is an open weights text to dialogue model. [S2] You get full control over scripts and voices. [S1] Wow. Amazing. (laughs) [S2] Try it now on Git hub or Hugging Face."\noutput = model.generate(text)\n\nsf.write("simple.mp3", output, 44100)` ],
                    filter: !1
                },
                diffree: {
                    prettyLabel: "Diffree",
                    repoName: "Diffree",
                    repoUrl: "https://github.com/OpenGVLab/Diffree",
                    filter: !1,
                    countDownloads: 'path:"diffree-step=000010999.ckpt"'
                },
                diffusers: {
                    prettyLabel: "Diffusers",
                    repoName: "🤗/diffusers",
                    repoUrl: "https://github.com/huggingface/diffusers",
                    docsUrl: "https://huggingface.co/docs/hub/diffusers",
                    snippets: e => e.tags.includes("controlnet") ? (e => [ `from diffusers import ControlNetModel, StableDiffusionControlNetPipeline\n\ncontrolnet = ControlNetModel.from_pretrained("${e.id}")\npipe = StableDiffusionControlNetPipeline.from_pretrained(\n\t"${$t(e)}", controlnet=controlnet\n)` ])(e) : e.tags.includes("lora") ? (e => [ `from diffusers import DiffusionPipeline\n\npipe = DiffusionPipeline.from_pretrained("${$t(e)}")\npipe.load_lora_weights("${e.id}")\n\nprompt = "${Pt(e) ?? Rt}"\nimage = pipe(prompt).images[0]` ])(e) : e.tags.includes("textual_inversion") ? (e => [ `from diffusers import DiffusionPipeline\n\npipe = DiffusionPipeline.from_pretrained("${$t(e)}")\npipe.load_textual_inversion("${e.id}")` ])(e) : (e => [ `from diffusers import DiffusionPipeline\n\npipe = DiffusionPipeline.from_pretrained("${e.id}")\n\nprompt = "${Pt(e) ?? Rt}"\nimage = pipe(prompt).images[0]` ])(e),
                    filter: !0
                },
                diffusionkit: {
                    prettyLabel: "DiffusionKit",
                    repoName: "DiffusionKit",
                    repoUrl: "https://github.com/argmaxinc/DiffusionKit",
                    snippets: e => {
                        const t = `# Pipeline for Stable Diffusion 3\nfrom diffusionkit.mlx import DiffusionPipeline\n\npipeline = DiffusionPipeline(\n\tshift=3.0,\n\tuse_t5=False,\n\tmodel_version=${e.id},\n\tlow_memory_mode=True,\n\ta16=True,\n\tw16=True,\n)`, n = `# Pipeline for Flux\nfrom diffusionkit.mlx import FluxPipeline\n\npipeline = FluxPipeline(\n  shift=1.0,\n  model_version=${e.id},\n  low_memory_mode=True,\n  a16=True,\n  w16=True,\n)`, a = `# Image Generation\nHEIGHT = 512\nWIDTH = 512\nNUM_STEPS = ${e.tags.includes("flux") ? 4 : 50}\nCFG_WEIGHT = ${e.tags.includes("flux") ? 0 : 5}\n\nimage, _ = pipeline.generate_image(\n  "a photo of a cat",\n  cfg_weight=CFG_WEIGHT,\n  num_steps=NUM_STEPS,\n  latent_size=(HEIGHT // 8, WIDTH // 8),\n)`;
                        return [ e.tags.includes("flux") ? n : t, a ];
                    }
                },
                doctr: {
                    prettyLabel: "docTR",
                    repoName: "doctr",
                    repoUrl: "https://github.com/mindee/doctr"
                },
                cartesia_pytorch: {
                    prettyLabel: "Cartesia Pytorch",
                    repoName: "Cartesia Pytorch",
                    repoUrl: "https://github.com/cartesia-ai/cartesia_pytorch",
                    snippets: e => [ `# pip install --no-binary :all: cartesia-pytorch\nfrom cartesia_pytorch import ReneLMHeadModel\nfrom transformers import AutoTokenizer\n\nmodel = ReneLMHeadModel.from_pretrained("${e.id}")\ntokenizer = AutoTokenizer.from_pretrained("allenai/OLMo-1B-hf")\n\nin_message = ["Rene Descartes was"]\ninputs = tokenizer(in_message, return_tensors="pt")\n\noutputs = model.generate(inputs.input_ids, max_length=50, top_k=100, top_p=0.99)\nout_message = tokenizer.batch_decode(outputs, skip_special_tokens=True)[0]\n\nprint(out_message)\n)` ]
                },
                cartesia_mlx: {
                    prettyLabel: "Cartesia MLX",
                    repoName: "Cartesia MLX",
                    repoUrl: "https://github.com/cartesia-ai/cartesia_mlx",
                    snippets: e => [ `import mlx.core as mx\nimport cartesia_mlx as cmx\n\nmodel = cmx.from_pretrained("${e.id}")\nmodel.set_dtype(mx.float32)   \n\nprompt = "Rene Descartes was"\n\nfor text in model.generate(\n    prompt,\n    max_tokens=500,\n    eval_every_n=5,\n    verbose=True,\n    top_p=0.99,\n    temperature=0.85,\n):\n    print(text, end="", flush=True)\n` ]
                },
                clipscope: {
                    prettyLabel: "clipscope",
                    repoName: "clipscope",
                    repoUrl: "https://github.com/Lewington-pitsos/clipscope",
                    filter: !1,
                    countDownloads: 'path_extension:"pt"'
                },
                cosyvoice: {
                    prettyLabel: "CosyVoice",
                    repoName: "CosyVoice",
                    repoUrl: "https://github.com/FunAudioLLM/CosyVoice",
                    filter: !1,
                    countDownloads: 'path_extension:"onnx" OR path_extension:"pt"'
                },
                cotracker: {
                    prettyLabel: "CoTracker",
                    repoName: "CoTracker",
                    repoUrl: "https://github.com/facebookresearch/co-tracker",
                    filter: !1,
                    countDownloads: 'path_extension:"pth"'
                },
                edsnlp: {
                    prettyLabel: "EDS-NLP",
                    repoName: "edsnlp",
                    repoUrl: "https://github.com/aphp/edsnlp",
                    docsUrl: "https://aphp.github.io/edsnlp/latest/",
                    filter: !1,
                    snippets: e => {
                        const t = Ot(e.id).replaceAll("-", "_");
                        return [ `# Load it from the Hub directly\nimport edsnlp\nnlp = edsnlp.load("${e.id}")\n`, `# Or install it as a package\n!pip install git+https://huggingface.co/${e.id}\n\n# and import it as a module\nimport ${t}\n\nnlp = ${t}.load()  # or edsnlp.load("${t}")\n` ];
                    },
                    countDownloads: 'path_filename:"config" AND path_extension:"cfg"'
                },
                elm: {
                    prettyLabel: "ELM",
                    repoName: "elm",
                    repoUrl: "https://github.com/slicex-ai/elm",
                    filter: !1,
                    countDownloads: 'path_filename:"slicex_elm_config" AND path_extension:"json"'
                },
                espnet: {
                    prettyLabel: "ESPnet",
                    repoName: "ESPnet",
                    repoUrl: "https://github.com/espnet/espnet",
                    docsUrl: "https://huggingface.co/docs/hub/espnet",
                    snippets: e => e.tags.includes("text-to-speech") ? (e => [ `from espnet2.bin.tts_inference import Text2Speech\n\nmodel = Text2Speech.from_pretrained("${e.id}")\n\nspeech, *_ = model("text to generate speech from")` ])(e) : e.tags.includes("automatic-speech-recognition") ? (e => [ `from espnet2.bin.asr_inference import Speech2Text\n\nmodel = Speech2Text.from_pretrained(\n  "${e.id}"\n)\n\nspeech, rate = soundfile.read("speech.wav")\ntext, *_ = model(speech)[0]` ])(e) : [ "unknown model type (must be text-to-speech or automatic-speech-recognition)" ],
                    filter: !0
                },
                fairseq: {
                    prettyLabel: "Fairseq",
                    repoName: "fairseq",
                    repoUrl: "https://github.com/pytorch/fairseq",
                    snippets: e => [ `from fairseq.checkpoint_utils import load_model_ensemble_and_task_from_hf_hub\n\nmodels, cfg, task = load_model_ensemble_and_task_from_hf_hub(\n    "${e.id}"\n)` ],
                    filter: !0
                },
                fastai: {
                    prettyLabel: "fastai",
                    repoName: "fastai",
                    repoUrl: "https://github.com/fastai/fastai",
                    docsUrl: "https://huggingface.co/docs/hub/fastai",
                    snippets: e => [ `from huggingface_hub import from_pretrained_fastai\n\nlearn = from_pretrained_fastai("${e.id}")` ],
                    filter: !0
                },
                fasttext: {
                    prettyLabel: "fastText",
                    repoName: "fastText",
                    repoUrl: "https://fasttext.cc/",
                    snippets: e => [ `from huggingface_hub import hf_hub_download\nimport fasttext\n\nmodel = fasttext.load_model(hf_hub_download("${e.id}", "model.bin"))` ],
                    filter: !0,
                    countDownloads: 'path_extension:"bin"'
                },
                flair: {
                    prettyLabel: "Flair",
                    repoName: "Flair",
                    repoUrl: "https://github.com/flairNLP/flair",
                    docsUrl: "https://huggingface.co/docs/hub/flair",
                    snippets: e => [ `from flair.models import SequenceTagger\n\ntagger = SequenceTagger.load("${e.id}")` ],
                    filter: !0,
                    countDownloads: 'path:"pytorch_model.bin"'
                },
                "gemma.cpp": {
                    prettyLabel: "gemma.cpp",
                    repoName: "gemma.cpp",
                    repoUrl: "https://github.com/google/gemma.cpp",
                    filter: !1,
                    countDownloads: 'path_extension:"sbs"'
                },
                "geometry-crafter": {
                    prettyLabel: "GeometryCrafter",
                    repoName: "GeometryCrafter",
                    repoUrl: "https://github.com/TencentARC/GeometryCrafter",
                    countDownloads: 'path:"point_map_vae/diffusion_pytorch_model.safetensors"'
                },
                gliner: {
                    prettyLabel: "GLiNER",
                    repoName: "GLiNER",
                    repoUrl: "https://github.com/urchade/GLiNER",
                    snippets: e => [ `from gliner import GLiNER\n\nmodel = GLiNER.from_pretrained("${e.id}")` ],
                    filter: !1,
                    countDownloads: 'path:"gliner_config.json"'
                },
                "glyph-byt5": {
                    prettyLabel: "Glyph-ByT5",
                    repoName: "Glyph-ByT5",
                    repoUrl: "https://github.com/AIGText/Glyph-ByT5",
                    filter: !1,
                    countDownloads: 'path:"checkpoints/byt5_model.pt"'
                },
                grok: {
                    prettyLabel: "Grok",
                    repoName: "Grok",
                    repoUrl: "https://github.com/xai-org/grok-1",
                    filter: !1,
                    countDownloads: 'path:"ckpt/tensor00000_000" OR path:"ckpt-0/tensor00000_000"'
                },
                hallo: {
                    prettyLabel: "Hallo",
                    repoName: "Hallo",
                    repoUrl: "https://github.com/fudan-generative-vision/hallo",
                    countDownloads: 'path:"hallo/net.pth"'
                },
                hezar: {
                    prettyLabel: "Hezar",
                    repoName: "Hezar",
                    repoUrl: "https://github.com/hezarai/hezar",
                    docsUrl: "https://hezarai.github.io/hezar",
                    countDownloads: 'path:"model_config.yaml" OR path:"embedding/embedding_config.yaml"'
                },
                htrflow: {
                    prettyLabel: "HTRflow",
                    repoName: "HTRflow",
                    repoUrl: "https://github.com/AI-Riksarkivet/htrflow",
                    docsUrl: "https://ai-riksarkivet.github.io/htrflow",
                    snippets: e => [ "# CLI usage\n# see docs: https://ai-riksarkivet.github.io/htrflow/latest/getting_started/quick_start.html\nhtrflow pipeline <path/to/pipeline.yaml> <path/to/image>", `# Python usage\nfrom htrflow.pipeline.pipeline import Pipeline\nfrom htrflow.pipeline.steps import Task\nfrom htrflow.models.framework.model import ModelClass\n\npipeline = Pipeline(\n    [\n        Task(\n            ModelClass, {"model": "${e.id}"}, {}\n        ),\n    ])` ]
                },
                "hunyuan-dit": {
                    prettyLabel: "HunyuanDiT",
                    repoName: "HunyuanDiT",
                    repoUrl: "https://github.com/Tencent/HunyuanDiT",
                    countDownloads: 'path:"pytorch_model_ema.pt" OR path:"pytorch_model_distill.pt"'
                },
                "hunyuan3d-2": {
                    prettyLabel: "Hunyuan3D-2",
                    repoName: "Hunyuan3D-2",
                    repoUrl: "https://github.com/Tencent/Hunyuan3D-2",
                    countDownloads: 'path_filename:"model_index" OR path_filename:"config"'
                },
                imstoucan: {
                    prettyLabel: "IMS Toucan",
                    repoName: "IMS-Toucan",
                    repoUrl: "https://github.com/DigitalPhonetics/IMS-Toucan",
                    countDownloads: 'path:"embedding_gan.pt" OR path:"Vocoder.pt" OR path:"ToucanTTS.pt"'
                },
                "index-tts": {
                    prettyLabel: "IndexTTS",
                    repoName: "IndexTTS",
                    repoUrl: "https://github.com/index-tts/index-tts",
                    snippets: e => [ `# Download model\nfrom huggingface_hub import snapshot_download\n\nsnapshot_download(${e.id}, local_dir="checkpoints")\n\nfrom indextts.infer import IndexTTS\n\n# Ensure config.yaml is present in the checkpoints directory\ntts = IndexTTS(model_dir="checkpoints", cfg_path="checkpoints/config.yaml")\n\nvoice = "path/to/your/reference_voice.wav"  # Path to the voice reference audio file\ntext = "Hello, how are you?"\noutput_path = "output_index.wav"\n\ntts.infer(voice, text, output_path)` ],
                    filter: !1
                },
                "infinite-you": {
                    prettyLabel: "InfiniteYou",
                    repoName: "InfiniteYou",
                    repoUrl: "https://github.com/bytedance/InfiniteYou",
                    filter: !1,
                    countDownloads: 'path:"infu_flux_v1.0/sim_stage1/image_proj_model.bin" OR path:"infu_flux_v1.0/aes_stage2/image_proj_model.bin"'
                },
                keras: {
                    prettyLabel: "Keras",
                    repoName: "Keras",
                    repoUrl: "https://github.com/keras-team/keras",
                    docsUrl: "https://huggingface.co/docs/hub/keras",
                    snippets: e => [ `# Available backend options are: "jax", "torch", "tensorflow".\nimport os\nos.environ["KERAS_BACKEND"] = "jax"\n\t\nimport keras\n\nmodel = keras.saving.load_model("hf://${e.id}")\n` ],
                    filter: !0,
                    countDownloads: 'path:"config.json" OR path_extension:"keras"'
                },
                "tf-keras": {
                    prettyLabel: "TF-Keras",
                    repoName: "TF-Keras",
                    repoUrl: "https://github.com/keras-team/tf-keras",
                    docsUrl: "https://huggingface.co/docs/hub/tf-keras",
                    snippets: e => [ `# Note: 'keras<3.x' or 'tf_keras' must be installed (legacy)\n# See https://github.com/keras-team/tf-keras for more details.\nfrom huggingface_hub import from_pretrained_keras\n\nmodel = from_pretrained_keras("${e.id}")\n` ],
                    countDownloads: 'path:"saved_model.pb"'
                },
                "keras-hub": {
                    prettyLabel: "KerasHub",
                    repoName: "KerasHub",
                    repoUrl: "https://github.com/keras-team/keras-hub",
                    docsUrl: "https://keras.io/keras_hub/",
                    snippets: e => {
                        const t = e.id, n = e.config?.keras_hub?.tasks ?? [], a = [];
                        for (const [e, i] of Object.entries(Dt)) n.includes(e) && a.push(i(t));
                        for (const e of n) Object.keys(Dt).includes(e) || a.push(Nt(e, t));
                        return a.push((e => `\nimport keras_hub\n\n# Create a Backbone model unspecialized for any task\nbackbone = keras_hub.models.Backbone.from_preset("hf://${e}")\n`)(t)), 
                        a;
                    },
                    filter: !0
                },
                k2: {
                    prettyLabel: "K2",
                    repoName: "k2",
                    repoUrl: "https://github.com/k2-fsa/k2"
                },
                "lightning-ir": {
                    prettyLabel: "Lightning IR",
                    repoName: "Lightning IR",
                    repoUrl: "https://github.com/webis-de/lightning-ir",
                    snippets: e => e.tags.includes("bi-encoder") ? [ `#install from https://github.com/webis-de/lightning-ir\n\nfrom lightning_ir import BiEncoderModule\nmodel = BiEncoderModule("${e.id}")\n\nmodel.score("query", ["doc1", "doc2", "doc3"])` ] : e.tags.includes("cross-encoder") ? [ `#install from https://github.com/webis-de/lightning-ir\n\nfrom lightning_ir import CrossEncoderModule\nmodel = CrossEncoderModule("${e.id}")\n\nmodel.score("query", ["doc1", "doc2", "doc3"])` ] : [ `#install from https://github.com/webis-de/lightning-ir\n\nfrom lightning_ir import BiEncoderModule, CrossEncoderModule\n\n# depending on the model type, use either BiEncoderModule or CrossEncoderModule\nmodel = BiEncoderModule("${e.id}") \n# model = CrossEncoderModule("${e.id}")\n\nmodel.score("query", ["doc1", "doc2", "doc3"])` ]
                },
                liveportrait: {
                    prettyLabel: "LivePortrait",
                    repoName: "LivePortrait",
                    repoUrl: "https://github.com/KwaiVGI/LivePortrait",
                    filter: !1,
                    countDownloads: 'path:"liveportrait/landmark.onnx"'
                },
                "llama-cpp-python": {
                    prettyLabel: "llama-cpp-python",
                    repoName: "llama-cpp-python",
                    repoUrl: "https://github.com/abetlen/llama-cpp-python",
                    snippets: e => {
                        const t = [ `from llama_cpp import Llama\n\nllm = Llama.from_pretrained(\n\trepo_id="${e.id}",\n\tfilename="{{GGUF_FILE}}",\n)\n` ];
                        if (e.tags.includes("conversational")) {
                            const n = jt(e);
                            t.push(`llm.create_chat_completion(\n\tmessages = ${function(e, t) {
                                let n = JSON.stringify(e, null, "\t");
                                return t?.indent && (n = n.replaceAll("\n", `\n${t.indent}`)), t?.attributeKeyQuotes || (n = n.replace(/"([^"]+)":/g, "$1:")), 
                                t?.customContentEscaper && (n = t.customContentEscaper(n)), n;
                            }(n, {
                                attributeKeyQuotes: !0,
                                indent: "\t"
                            })}\n)`);
                        } else t.push('output = llm(\n\t"Once upon a time,",\n\tmax_tokens=512,\n\techo=True\n)\nprint(output)');
                        return t;
                    }
                },
                "mini-omni2": {
                    prettyLabel: "Mini-Omni2",
                    repoName: "Mini-Omni2",
                    repoUrl: "https://github.com/gpt-omni/mini-omni2",
                    countDownloads: 'path:"model_config.yaml"'
                },
                mindspore: {
                    prettyLabel: "MindSpore",
                    repoName: "mindspore",
                    repoUrl: "https://github.com/mindspore-ai/mindspore"
                },
                "mamba-ssm": {
                    prettyLabel: "MambaSSM",
                    repoName: "MambaSSM",
                    repoUrl: "https://github.com/state-spaces/mamba",
                    filter: !1,
                    snippets: e => [ `from mamba_ssm import MambaLMHeadModel\n\nmodel = MambaLMHeadModel.from_pretrained("${e.id}")` ]
                },
                "mars5-tts": {
                    prettyLabel: "MARS5-TTS",
                    repoName: "MARS5-TTS",
                    repoUrl: "https://github.com/Camb-ai/MARS5-TTS",
                    filter: !1,
                    countDownloads: 'path:"mars5_ar.safetensors"',
                    snippets: e => [ `# Install from https://github.com/Camb-ai/MARS5-TTS\n\nfrom inference import Mars5TTS\nmars5 = Mars5TTS.from_pretrained("${e.id}")` ]
                },
                matanyone: {
                    prettyLabel: "MatAnyone",
                    repoName: "MatAnyone",
                    repoUrl: "https://github.com/pq-yang/MatAnyone",
                    snippets: e => [ `# Install from https://github.com/pq-yang/MatAnyone.git\n\nfrom matanyone.model.matanyone import MatAnyone\nmodel = MatAnyone.from_pretrained("${e.id}")` ],
                    filter: !1
                },
                "mesh-anything": {
                    prettyLabel: "MeshAnything",
                    repoName: "MeshAnything",
                    repoUrl: "https://github.com/buaacyw/MeshAnything",
                    filter: !1,
                    countDownloads: 'path:"MeshAnything_350m.pth"',
                    snippets: () => [ "# Install from https://github.com/buaacyw/MeshAnything.git\n\nfrom MeshAnything.models.meshanything import MeshAnything\n\n# refer to https://github.com/buaacyw/MeshAnything/blob/main/main.py#L91 on how to define args\n# and https://github.com/buaacyw/MeshAnything/blob/main/app.py regarding usage\nmodel = MeshAnything(args)" ]
                },
                merlin: {
                    prettyLabel: "Merlin",
                    repoName: "Merlin",
                    repoUrl: "https://github.com/StanfordMIMI/Merlin",
                    filter: !1,
                    countDownloads: 'path_extension:"pt"'
                },
                medvae: {
                    prettyLabel: "MedVAE",
                    repoName: "MedVAE",
                    repoUrl: "https://github.com/StanfordMIMI/MedVAE",
                    filter: !1,
                    countDownloads: 'path_extension:"ckpt"'
                },
                mitie: {
                    prettyLabel: "MITIE",
                    repoName: "MITIE",
                    repoUrl: "https://github.com/mit-nlp/MITIE",
                    countDownloads: 'path_filename:"total_word_feature_extractor"'
                },
                "ml-agents": {
                    prettyLabel: "ml-agents",
                    repoName: "ml-agents",
                    repoUrl: "https://github.com/Unity-Technologies/ml-agents",
                    docsUrl: "https://huggingface.co/docs/hub/ml-agents",
                    snippets: e => [ `mlagents-load-from-hf --repo-id="${e.id}" --local-dir="./download: string[]s"` ],
                    filter: !0,
                    countDownloads: 'path_extension:"onnx"'
                },
                mlx: {
                    prettyLabel: "MLX",
                    repoName: "MLX",
                    repoUrl: "https://github.com/ml-explore/mlx-examples/tree/main",
                    snippets: e => "image-text-to-text" === e.pipeline_tag ? (e => [ `Make sure mlx-vlm is installed\nfrom mlx_vlm import load, generate\nfrom mlx_vlm.prompt_utils import apply_chat_template\nfrom mlx_vlm.utils import load_config\n\n# Load the model\nmodel, processor = load("${e.id}")\nconfig = load_config("${e.id}")\n\n# Prepare input\nimage = ["http://images.cocodataset.org/val2017/000000039769.jpg"]\nprompt = "Describe this image."\n\n# Apply chat template\nformatted_prompt = apply_chat_template(\n    processor, config, prompt, num_images=1\n)\n\n# Generate output\noutput = generate(model, processor, formatted_prompt, image)\nprint(output)` ])(e) : "text-generation" === e.pipeline_tag ? e.tags.includes("conversational") ? (e => [ `# Make sure mlx-lm is installed\npip install --upgrade mlx-lm\n\n# Generate text with mlx-lm\nfrom mlx_lm import load, generate\n\nmodel, tokenizer = load("${e.id}")\n\nprompt = "Write a story about Einstein"\nmessages = [{"role": "user", "content": prompt}]\nprompt = tokenizer.apply_chat_template(\n    messages, add_generation_prompt=True\n)\n\ntext = generate(model, tokenizer, prompt=prompt, verbose=True)` ])(e) : (e => [ `# Make sure mlx-lm is installed\npip install --upgrade mlx-lm\n\n# Generate text with mlx-lm\nfrom mlx_lm import load, generate\n\nmodel, tokenizer = load("${e.id}")\n\nprompt = "Once upon a time in"\ntext = generate(model, tokenizer, prompt=prompt, verbose=True)` ])(e) : (e => [ `# Download the model from the Hub\npip install huggingface_hub hf_transfer\n\nexport HF_HUB_ENABLE_HF_TRANSFER=1\nhuggingface-cli download --local-dir ${Ot(e.id)} ${e.id}` ])(e),
                    filter: !0
                },
                "mlx-image": {
                    prettyLabel: "mlx-image",
                    repoName: "mlx-image",
                    repoUrl: "https://github.com/riccardomusmeci/mlx-image",
                    docsUrl: "https://huggingface.co/docs/hub/mlx-image",
                    snippets: e => [ `from mlxim.model import create_model\n\nmodel = create_model(${e.id})` ],
                    filter: !1,
                    countDownloads: 'path:"model.safetensors"'
                },
                "mlc-llm": {
                    prettyLabel: "MLC-LLM",
                    repoName: "MLC-LLM",
                    repoUrl: "https://github.com/mlc-ai/mlc-llm",
                    docsUrl: "https://llm.mlc.ai/docs/",
                    filter: !1,
                    countDownloads: 'path:"mlc-chat-config.json"'
                },
                model2vec: {
                    prettyLabel: "Model2Vec",
                    repoName: "model2vec",
                    repoUrl: "https://github.com/MinishLab/model2vec",
                    snippets: e => [ `from model2vec import StaticModel\n\nmodel = StaticModel.from_pretrained("${e.id}")` ],
                    filter: !1
                },
                moshi: {
                    prettyLabel: "Moshi",
                    repoName: "Moshi",
                    repoUrl: "https://github.com/kyutai-labs/moshi",
                    filter: !1,
                    countDownloads: 'path:"tokenizer-e351c8d8-checkpoint125.safetensors"'
                },
                nemo: {
                    prettyLabel: "NeMo",
                    repoName: "NeMo",
                    repoUrl: "https://github.com/NVIDIA/NeMo",
                    snippets: e => {
                        let t;
                        return e.tags.includes("automatic-speech-recognition") && (t = ((e, t) => [ `import nemo.collections.asr as nemo_asr\nasr_model = nemo_asr.models.ASRModel.from_pretrained("${t.id}")\n\ntranscriptions = asr_model.transcribe(["file.wav"])` ])(0, e)), 
                        t ?? [ "# tag did not correspond to a valid NeMo domain." ];
                    },
                    filter: !0,
                    countDownloads: 'path_extension:"nemo" OR path:"model_config.yaml"'
                },
                "open-oasis": {
                    prettyLabel: "open-oasis",
                    repoName: "open-oasis",
                    repoUrl: "https://github.com/etched-ai/open-oasis",
                    countDownloads: 'path:"oasis500m.safetensors"'
                },
                open_clip: {
                    prettyLabel: "OpenCLIP",
                    repoName: "OpenCLIP",
                    repoUrl: "https://github.com/mlfoundations/open_clip",
                    snippets: e => [ `import open_clip\n\nmodel, preprocess_train, preprocess_val = open_clip.create_model_and_transforms('hf-hub:${e.id}')\ntokenizer = open_clip.get_tokenizer('hf-hub:${e.id}')` ],
                    filter: !0,
                    countDownloads: 'path:"open_clip_model.safetensors"\n\t\t\tOR path:"model.safetensors"\n\t\t\tOR path:"open_clip_pytorch_model.bin"\n\t\t\tOR path:"pytorch_model.bin"'
                },
                "open-sora": {
                    prettyLabel: "Open-Sora",
                    repoName: "Open-Sora",
                    repoUrl: "https://github.com/hpcaitech/Open-Sora",
                    filter: !1,
                    countDownloads: 'path:"Open_Sora_v2.safetensors"'
                },
                outetts: {
                    prettyLabel: "OuteTTS",
                    repoName: "OuteTTS",
                    repoUrl: "https://github.com/edwko/OuteTTS",
                    snippets: e => {
                        const t = e.tags ?? [];
                        return t.includes("gguf") || t.includes("onnx") ? [] : [ `\n  import outetts\n  \n  enum = outetts.Models("${e.id}".split("/", 1)[1])       # VERSION_1_0_SIZE_1B\n  cfg  = outetts.ModelConfig.auto_config(enum, outetts.Backend.HF)\n  tts  = outetts.Interface(cfg)\n  \n  speaker = tts.load_default_speaker("EN-FEMALE-1-NEUTRAL")\n  tts.generate(\n\t  outetts.GenerationConfig(\n\t\t  text="Hello there, how are you doing?",\n\t\t  speaker=speaker,\n\t  )\n  ).save("output.wav")\n  ` ];
                    },
                    filter: !1
                },
                paddlenlp: {
                    prettyLabel: "paddlenlp",
                    repoName: "PaddleNLP",
                    repoUrl: "https://github.com/PaddlePaddle/PaddleNLP",
                    docsUrl: "https://huggingface.co/docs/hub/paddlenlp",
                    snippets: e => {
                        if (e.config?.architectures?.[0]) {
                            const t = e.config.architectures[0];
                            return [ [ `from paddlenlp.transformers import AutoTokenizer, ${t}`, "", `tokenizer = AutoTokenizer.from_pretrained("${e.id}", from_hf_hub=True)`, `model = ${t}.from_pretrained("${e.id}", from_hf_hub=True)` ].join("\n") ];
                        }
                        return [ [ "# ⚠️ Type of model unknown", "from paddlenlp.transformers import AutoTokenizer, AutoModel", "", `tokenizer = AutoTokenizer.from_pretrained("${e.id}", from_hf_hub=True)`, `model = AutoModel.from_pretrained("${e.id}", from_hf_hub=True)` ].join("\n") ];
                    },
                    filter: !0,
                    countDownloads: 'path:"model_config.json"'
                },
                peft: {
                    prettyLabel: "PEFT",
                    repoName: "PEFT",
                    repoUrl: "https://github.com/huggingface/peft",
                    snippets: e => {
                        const {base_model_name_or_path: t, task_type: n} = e.config?.peft ?? {}, a = (e => {
                            switch (e) {
                              case "CAUSAL_LM":
                                return "CausalLM";

                              case "SEQ_2_SEQ_LM":
                                return "Seq2SeqLM";

                              case "TOKEN_CLS":
                                return "TokenClassification";

                              case "SEQ_CLS":
                                return "SequenceClassification";

                              default:
                                return;
                            }
                        })(n);
                        return a ? t ? [ `from peft import PeftModel\nfrom transformers import AutoModelFor${a}\n\nbase_model = AutoModelFor${a}.from_pretrained("${t}")\nmodel = PeftModel.from_pretrained(base_model, "${e.id}")` ] : [ "Base model is not found." ] : [ "Task type is invalid." ];
                    },
                    filter: !0,
                    countDownloads: 'path:"adapter_config.json"'
                },
                "perception-encoder": {
                    prettyLabel: "PerceptionEncoder",
                    repoName: "PerceptionModels",
                    repoUrl: "https://github.com/facebookresearch/perception_models",
                    filter: !1,
                    snippets: e => {
                        const t = `# Use PE-Core models as CLIP models\nimport core.vision_encoder.pe as pe\n\nmodel = pe.CLIP.from_config("${e.id}", pretrained=True)`, n = `# Use any PE model as a vision encoder\nimport core.vision_encoder.pe as pe\n\nmodel = pe.VisionTransformer.from_config("${e.id}", pretrained=True)`;
                        return e.id.includes("Core") ? [ t, n ] : [ n ];
                    },
                    countDownloads: 'path_extension:"pt"'
                },
                "phantom-wan": {
                    prettyLabel: "Phantom",
                    repoName: "Phantom",
                    repoUrl: "https://github.com/Phantom-video/Phantom",
                    snippets: e => [ `from huggingface_hub import snapshot_download\nfrom phantom_wan import WANI2V, configs\n\ncheckpoint_dir = snapshot_download("${e.id}")\nwan_i2v = WanI2V(\n            config=configs.WAN_CONFIGS['i2v-14B'],\n            checkpoint_dir=checkpoint_dir,\n        )\n video = wan_i2v.generate(text_prompt, image_prompt)` ],
                    filter: !1,
                    countDownloads: 'path_extension:"pth"'
                },
                pxia: {
                    prettyLabel: "pxia",
                    repoName: "pxia",
                    repoUrl: "https://github.com/not-lain/pxia",
                    snippets: e => [ `from pxia import AutoModel\n\nmodel = AutoModel.from_pretrained("${e.id}")` ],
                    filter: !1
                },
                "pyannote-audio": {
                    prettyLabel: "pyannote.audio",
                    repoName: "pyannote-audio",
                    repoUrl: "https://github.com/pyannote/pyannote-audio",
                    snippets: e => e.tags.includes("pyannote-audio-pipeline") ? (e => [ `from pyannote.audio import Pipeline\n  \npipeline = Pipeline.from_pretrained("${e.id}")\n\n# inference on the whole file\npipeline("file.wav")\n\n# inference on an excerpt\nfrom pyannote.core import Segment\nexcerpt = Segment(start=2.0, end=5.0)\n\nfrom pyannote.audio import Audio\nwaveform, sample_rate = Audio().crop("file.wav", excerpt)\npipeline({"waveform": waveform, "sample_rate": sample_rate})` ])(e) : (e => [ `from pyannote.audio import Model, Inference\n\nmodel = Model.from_pretrained("${e.id}")\ninference = Inference(model)\n\n# inference on the whole file\ninference("file.wav")\n\n# inference on an excerpt\nfrom pyannote.core import Segment\nexcerpt = Segment(start=2.0, end=5.0)\ninference.crop("file.wav", excerpt)` ])(e),
                    filter: !0
                },
                "py-feat": {
                    prettyLabel: "Py-Feat",
                    repoName: "Py-Feat",
                    repoUrl: "https://github.com/cosanlab/py-feat",
                    docsUrl: "https://py-feat.org/",
                    filter: !1
                },
                pythae: {
                    prettyLabel: "pythae",
                    repoName: "pythae",
                    repoUrl: "https://github.com/clementchadebec/benchmark_VAE",
                    snippets: e => [ `from pythae.models import AutoModel\n\nmodel = AutoModel.load_from_hf_hub("${e.id}")` ],
                    filter: !1
                },
                recurrentgemma: {
                    prettyLabel: "RecurrentGemma",
                    repoName: "recurrentgemma",
                    repoUrl: "https://github.com/google-deepmind/recurrentgemma",
                    filter: !1,
                    countDownloads: 'path:"tokenizer.model"'
                },
                relik: {
                    prettyLabel: "Relik",
                    repoName: "Relik",
                    repoUrl: "https://github.com/SapienzaNLP/relik",
                    snippets: e => [ `from relik import Relik\n \nrelik = Relik.from_pretrained("${e.id}")` ],
                    filter: !1
                },
                refiners: {
                    prettyLabel: "Refiners",
                    repoName: "Refiners",
                    repoUrl: "https://github.com/finegrain-ai/refiners",
                    docsUrl: "https://refine.rs/",
                    filter: !1,
                    countDownloads: 'path:"model.safetensors"'
                },
                reverb: {
                    prettyLabel: "Reverb",
                    repoName: "Reverb",
                    repoUrl: "https://github.com/revdotcom/reverb",
                    filter: !1
                },
                saelens: {
                    prettyLabel: "SAELens",
                    repoName: "SAELens",
                    repoUrl: "https://github.com/jbloomAus/SAELens",
                    snippets: () => [ '# pip install sae-lens\nfrom sae_lens import SAE\n\nsae, cfg_dict, sparsity = SAE.from_pretrained(\n    release = "RELEASE_ID", # e.g., "gpt2-small-res-jb". See other options in https://github.com/jbloomAus/SAELens/blob/main/sae_lens/pretrained_saes.yaml\n    sae_id = "SAE_ID", # e.g., "blocks.8.hook_resid_pre". Won\'t always be a hook point\n)' ],
                    filter: !1
                },
                sam2: {
                    prettyLabel: "sam2",
                    repoName: "sam2",
                    repoUrl: "https://github.com/facebookresearch/segment-anything-2",
                    filter: !1,
                    snippets: e => [ `# Use SAM2 with images\nimport torch\nfrom sam2.sam2_image_predictor import SAM2ImagePredictor\n\npredictor = SAM2ImagePredictor.from_pretrained(${e.id})\n\nwith torch.inference_mode(), torch.autocast("cuda", dtype=torch.bfloat16):\n    predictor.set_image(<your_image>)\n    masks, _, _ = predictor.predict(<input_prompts>)`, `# Use SAM2 with videos\nimport torch\nfrom sam2.sam2_video_predictor import SAM2VideoPredictor\n\t\npredictor = SAM2VideoPredictor.from_pretrained(${e.id})\n\nwith torch.inference_mode(), torch.autocast("cuda", dtype=torch.bfloat16):\n    state = predictor.init_state(<your_video>)\n\n    # add new prompts and instantly get the output on the same frame\n    frame_idx, object_ids, masks = predictor.add_new_points(state, <your_prompts>):\n\n    # propagate the prompts to get masklets throughout the video\n    for frame_idx, object_ids, masks in predictor.propagate_in_video(state):\n        ...` ],
                    countDownloads: 'path_extension:"pt"'
                },
                "sample-factory": {
                    prettyLabel: "sample-factory",
                    repoName: "sample-factory",
                    repoUrl: "https://github.com/alex-petrenko/sample-factory",
                    docsUrl: "https://huggingface.co/docs/hub/sample-factory",
                    snippets: e => [ `python -m sample_factory.huggingface.load_from_hub -r ${e.id} -d ./train_dir` ],
                    filter: !0,
                    countDownloads: 'path:"cfg.json"'
                },
                sapiens: {
                    prettyLabel: "sapiens",
                    repoName: "sapiens",
                    repoUrl: "https://github.com/facebookresearch/sapiens",
                    filter: !1,
                    countDownloads: 'path_extension:"pt2" OR path_extension:"pth" OR path_extension:"onnx"'
                },
                "sentence-transformers": {
                    prettyLabel: "sentence-transformers",
                    repoName: "sentence-transformers",
                    repoUrl: "https://github.com/UKPLab/sentence-transformers",
                    docsUrl: "https://huggingface.co/docs/hub/sentence-transformers",
                    snippets: e => {
                        const t = e.tags.includes(Ut) ? ", trust_remote_code=True" : "";
                        if (e.tags.includes("cross-encoder") || "text-ranking" == e.pipeline_tag) return [ `from sentence_transformers import CrossEncoder\n\nmodel = CrossEncoder("${e.id}"${t})\n\nquery = "Which planet is known as the Red Planet?"\npassages = [\n\t"Venus is often called Earth's twin because of its similar size and proximity.",\n\t"Mars, known for its reddish appearance, is often referred to as the Red Planet.",\n\t"Jupiter, the largest planet in our solar system, has a prominent red spot.",\n\t"Saturn, famous for its rings, is sometimes mistaken for the Red Planet."\n]\n\nscores = model.predict([(query, passage) for passage in passages])\nprint(scores)` ];
                        const n = function(e) {
                            const t = e.widgetData?.[0];
                            if (t?.source_sentence && t?.sentences?.length) return [ t.source_sentence, ...t.sentences ];
                        }(e) ?? [ "The weather is lovely today.", "It's so sunny outside!", "He drove to the stadium." ];
                        return [ `from sentence_transformers import SentenceTransformer\n\nmodel = SentenceTransformer("${e.id}"${t})\n\nsentences = ${JSON.stringify(n, null, 4)}\nembeddings = model.encode(sentences)\n\nsimilarities = model.similarity(embeddings, embeddings)\nprint(similarities.shape)\n# [${n.length}, ${n.length}]` ];
                    },
                    filter: !0
                },
                setfit: {
                    prettyLabel: "setfit",
                    repoName: "setfit",
                    repoUrl: "https://github.com/huggingface/setfit",
                    docsUrl: "https://huggingface.co/docs/hub/setfit",
                    snippets: e => [ `from setfit import SetFitModel\n\nmodel = SetFitModel.from_pretrained("${e.id}")` ],
                    filter: !0
                },
                sklearn: {
                    prettyLabel: "Scikit-learn",
                    repoName: "Scikit-learn",
                    repoUrl: "https://github.com/scikit-learn/scikit-learn",
                    snippets: e => {
                        if (e.tags.includes("skops")) {
                            const t = e.config?.sklearn?.model?.file, n = e.config?.sklearn?.model_format;
                            return t ? "pickle" === n ? ((e, t) => [ `import joblib\nfrom skops.hub_utils import download\ndownload("${e.id}", "path_to_folder")\nmodel = joblib.load(\n\t"${t}"\n)\n# only load pickle files from sources you trust\n# read more about it here https://skops.readthedocs.io/en/stable/persistence.html` ])(e, t) : ((e, t) => [ `from skops.hub_utils import download\nfrom skops.io import load\ndownload("${e.id}", "path_to_folder")\n# make sure model file is in skops format\n# if model is a pickle file, make sure it's from a source you trust\nmodel = load("path_to_folder/${t}")` ])(e, t) : [ "# ⚠️ Model filename not specified in config.json" ];
                        }
                        return (e => [ `from huggingface_hub import hf_hub_download\nimport joblib\nmodel = joblib.load(\n\thf_hub_download("${e.id}", "sklearn_model.joblib")\n)\n# only load pickle files from sources you trust\n# read more about it here https://skops.readthedocs.io/en/stable/persistence.html` ])(e);
                    },
                    filter: !0,
                    countDownloads: 'path:"sklearn_model.joblib"'
                },
                spacy: {
                    prettyLabel: "spaCy",
                    repoName: "spaCy",
                    repoUrl: "https://github.com/explosion/spaCy",
                    docsUrl: "https://huggingface.co/docs/hub/spacy",
                    snippets: e => [ `!pip install https://huggingface.co/${e.id}/resolve/main/${Ot(e.id)}-any-py3-none-any.whl\n\n# Using spacy.load().\nimport spacy\nnlp = spacy.load("${Ot(e.id)}")\n\n# Importing as module.\nimport ${Ot(e.id)}\nnlp = ${Ot(e.id)}.load()` ],
                    filter: !0,
                    countDownloads: 'path_extension:"whl"'
                },
                "span-marker": {
                    prettyLabel: "SpanMarker",
                    repoName: "SpanMarkerNER",
                    repoUrl: "https://github.com/tomaarsen/SpanMarkerNER",
                    docsUrl: "https://huggingface.co/docs/hub/span_marker",
                    snippets: e => [ `from span_marker import SpanMarkerModel\n\nmodel = SpanMarkerModel.from_pretrained("${e.id}")` ],
                    filter: !0
                },
                speechbrain: {
                    prettyLabel: "speechbrain",
                    repoName: "speechbrain",
                    repoUrl: "https://github.com/speechbrain/speechbrain",
                    docsUrl: "https://huggingface.co/docs/hub/speechbrain",
                    snippets: e => {
                        const t = e.config?.speechbrain?.speechbrain_interface;
                        if (void 0 === t) return [ "# interface not specified in config.json" ];
                        const n = (e => {
                            switch (e) {
                              case "EncoderClassifier":
                                return "classify_file";

                              case "EncoderDecoderASR":
                              case "EncoderASR":
                                return "transcribe_file";

                              case "SpectralMaskEnhancement":
                                return "enhance_file";

                              case "SepformerSeparation":
                                return "separate_file";

                              default:
                                return;
                            }
                        })(t);
                        return void 0 === n ? [ "# interface in config.json invalid" ] : [ `from speechbrain.pretrained import ${t}\nmodel = ${t}.from_hparams(\n  "${e.id}"\n)\nmodel.${n}("file.wav")` ];
                    },
                    filter: !0,
                    countDownloads: 'path:"hyperparams.yaml"'
                },
                "ssr-speech": {
                    prettyLabel: "SSR-Speech",
                    repoName: "SSR-Speech",
                    repoUrl: "https://github.com/WangHelin1997/SSR-Speech",
                    filter: !1,
                    countDownloads: 'path_extension:".pth"'
                },
                "stable-audio-tools": {
                    prettyLabel: "Stable Audio Tools",
                    repoName: "stable-audio-tools",
                    repoUrl: "https://github.com/Stability-AI/stable-audio-tools.git",
                    filter: !1,
                    countDownloads: 'path:"model.safetensors"',
                    snippets: e => [ `import torch\nimport torchaudio\nfrom einops import rearrange\nfrom stable_audio_tools import get_pretrained_model\nfrom stable_audio_tools.inference.generation import generate_diffusion_cond\n\ndevice = "cuda" if torch.cuda.is_available() else "cpu"\n\n# Download model\nmodel, model_config = get_pretrained_model("${e.id}")\nsample_rate = model_config["sample_rate"]\nsample_size = model_config["sample_size"]\n\nmodel = model.to(device)\n\n# Set up text and timing conditioning\nconditioning = [{\n\t"prompt": "128 BPM tech house drum loop",\n}]\n\n# Generate stereo audio\noutput = generate_diffusion_cond(\n\tmodel,\n\tconditioning=conditioning,\n\tsample_size=sample_size,\n\tdevice=device\n)\n\n# Rearrange audio batch to a single sequence\noutput = rearrange(output, "b d n -> d (b n)")\n\n# Peak normalize, clip, convert to int16, and save to file\noutput = output.to(torch.float32).div(torch.max(torch.abs(output))).clamp(-1, 1).mul(32767).to(torch.int16).cpu()\ntorchaudio.save("output.wav", output, sample_rate)` ]
                },
                "diffusion-single-file": {
                    prettyLabel: "Diffusion Single File",
                    repoName: "diffusion-single-file",
                    repoUrl: "https://github.com/comfyanonymous/ComfyUI",
                    filter: !1,
                    countDownloads: 'path_extension:"safetensors"'
                },
                "seed-story": {
                    prettyLabel: "SEED-Story",
                    repoName: "SEED-Story",
                    repoUrl: "https://github.com/TencentARC/SEED-Story",
                    filter: !1,
                    countDownloads: 'path:"cvlm_llama2_tokenizer/tokenizer.model"',
                    snippets: () => [ "# seed_story_cfg_path refers to 'https://github.com/TencentARC/SEED-Story/blob/master/configs/clm_models/agent_7b_sft.yaml'\n# llm_cfg_path refers to 'https://github.com/TencentARC/SEED-Story/blob/master/configs/clm_models/llama2chat7b_lora.yaml'\nfrom omegaconf import OmegaConf\nimport hydra\n\n# load Llama2\nllm_cfg = OmegaConf.load(llm_cfg_path)\nllm = hydra.utils.instantiate(llm_cfg, torch_dtype=\"fp16\")\n\n# initialize seed_story\nseed_story_cfg = OmegaConf.load(seed_story_cfg_path)\nseed_story = hydra.utils.instantiate(seed_story_cfg, llm=llm) " ]
                },
                soloaudio: {
                    prettyLabel: "SoloAudio",
                    repoName: "SoloAudio",
                    repoUrl: "https://github.com/WangHelin1997/SoloAudio",
                    filter: !1,
                    countDownloads: 'path:"soloaudio_v2.pt"'
                },
                "stable-baselines3": {
                    prettyLabel: "stable-baselines3",
                    repoName: "stable-baselines3",
                    repoUrl: "https://github.com/huggingface/huggingface_sb3",
                    docsUrl: "https://huggingface.co/docs/hub/stable-baselines3",
                    snippets: e => [ `from huggingface_sb3 import load_from_hub\ncheckpoint = load_from_hub(\n\trepo_id="${e.id}",\n\tfilename="{MODEL FILENAME}.zip",\n)` ],
                    filter: !0,
                    countDownloads: 'path_extension:"zip"'
                },
                stanza: {
                    prettyLabel: "Stanza",
                    repoName: "stanza",
                    repoUrl: "https://github.com/stanfordnlp/stanza",
                    docsUrl: "https://huggingface.co/docs/hub/stanza",
                    snippets: e => [ `import stanza\n\nstanza.download("${Ot(e.id).replace("stanza-", "")}")\nnlp = stanza.Pipeline("${Ot(e.id).replace("stanza-", "")}")` ],
                    filter: !0,
                    countDownloads: 'path:"models/default.zip"'
                },
                swarmformer: {
                    prettyLabel: "SwarmFormer",
                    repoName: "SwarmFormer",
                    repoUrl: "https://github.com/takara-ai/SwarmFormer",
                    snippets: e => [ `from swarmformer import SwarmFormerModel\n\nmodel = SwarmFormerModel.from_pretrained("${e.id}")\n` ],
                    filter: !1
                },
                "f5-tts": {
                    prettyLabel: "F5-TTS",
                    repoName: "F5-TTS",
                    repoUrl: "https://github.com/SWivid/F5-TTS",
                    filter: !1,
                    countDownloads: 'path_extension:"safetensors" OR path_extension:"pt"'
                },
                genmo: {
                    prettyLabel: "Genmo",
                    repoName: "Genmo",
                    repoUrl: "https://github.com/genmoai/models",
                    filter: !1,
                    countDownloads: 'path:"vae_stats.json"'
                },
                tensorflowtts: {
                    prettyLabel: "TensorFlowTTS",
                    repoName: "TensorFlowTTS",
                    repoUrl: "https://github.com/TensorSpeech/TensorFlowTTS",
                    snippets: e => e.tags.includes("text-to-mel") ? (e => [ `from tensorflow_tts.inference import AutoProcessor, TFAutoModel\n\nprocessor = AutoProcessor.from_pretrained("${e.id}")\nmodel = TFAutoModel.from_pretrained("${e.id}")\n` ])(e) : e.tags.includes("mel-to-wav") ? (e => [ `from tensorflow_tts.inference import TFAutoModel\n\nmodel = TFAutoModel.from_pretrained("${e.id}")\naudios = model.inference(mels)\n` ])(e) : (e => [ `from tensorflow_tts.inference import TFAutoModel\n\nmodel = TFAutoModel.from_pretrained("${e.id}")\n` ])(e)
                },
                tabpfn: {
                    prettyLabel: "TabPFN",
                    repoName: "TabPFN",
                    repoUrl: "https://github.com/PriorLabs/TabPFN"
                },
                terratorch: {
                    prettyLabel: "TerraTorch",
                    repoName: "TerraTorch",
                    repoUrl: "https://github.com/IBM/terratorch",
                    docsUrl: "https://ibm.github.io/terratorch/",
                    filter: !1,
                    countDownloads: 'path_extension:"pt"',
                    snippets: e => [ `from terratorch.registry import BACKBONE_REGISTRY\n\nmodel = BACKBONE_REGISTRY.build("${e.id}")` ]
                },
                "tic-clip": {
                    prettyLabel: "TiC-CLIP",
                    repoName: "TiC-CLIP",
                    repoUrl: "https://github.com/apple/ml-tic-clip",
                    filter: !1,
                    countDownloads: 'path_extension:"pt" AND path_prefix:"checkpoints/"'
                },
                timesfm: {
                    prettyLabel: "TimesFM",
                    repoName: "timesfm",
                    repoUrl: "https://github.com/google-research/timesfm",
                    filter: !1,
                    countDownloads: 'path:"checkpoints/checkpoint_1100000/state/checkpoint"'
                },
                timm: {
                    prettyLabel: "timm",
                    repoName: "pytorch-image-models",
                    repoUrl: "https://github.com/rwightman/pytorch-image-models",
                    docsUrl: "https://huggingface.co/docs/hub/timm",
                    snippets: e => [ `import timm\n\nmodel = timm.create_model("hf_hub:${e.id}", pretrained=True)` ],
                    filter: !0,
                    countDownloads: 'path:"pytorch_model.bin" OR path:"model.safetensors"'
                },
                transformers: {
                    prettyLabel: "Transformers",
                    repoName: "🤗/transformers",
                    repoUrl: "https://github.com/huggingface/transformers",
                    docsUrl: "https://huggingface.co/docs/hub/transformers",
                    snippets: e => {
                        const t = e.transformersInfo;
                        if (!t) return [ "# ⚠️ Type of model unknown" ];
                        const n = e.tags.includes(Ut) ? ", trust_remote_code=True" : "";
                        let a;
                        if (t.processor) {
                            const i = "AutoTokenizer" === t.processor ? "tokenizer" : "AutoFeatureExtractor" === t.processor ? "extractor" : "processor";
                            a = [ "# Load model directly", `from transformers import ${t.processor}, ${t.auto_model}`, "", `${i} = ${t.processor}.from_pretrained("${e.id}"` + n + ")", `model = ${t.auto_model}.from_pretrained("${e.id}"` + n + ")" ].join("\n");
                        } else a = [ "# Load model directly", `from transformers import ${t.auto_model}`, `model = ${t.auto_model}.from_pretrained("${e.id}"` + n + ")" ].join("\n");
                        if (e.pipeline_tag && xe.transformers?.includes(e.pipeline_tag)) {
                            const t = [ "# Use a pipeline as a high-level helper", "from transformers import pipeline", "", `pipe = pipeline("${e.pipeline_tag}", model="${e.id}"` + n + ")" ];
                            return e.tags.includes("conversational") && (e.tags.includes("image-text-to-text") ? t.push("messages = [", [ "    {", '        "role": "user",', '        "content": [', '            {"type": "image", "url": "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/p-blog/candy.JPG"},', '            {"type": "text", "text": "What animal is on the candy?"}', "        ]", "    }," ].join("\n"), "]") : t.push("messages = [", '    {"role": "user", "content": "Who are you?"},', "]"), 
                            t.push("pipe(messages)")), [ t.join("\n"), a ];
                        }
                        return [ a ];
                    },
                    filter: !0
                },
                "transformers.js": {
                    prettyLabel: "Transformers.js",
                    repoName: "transformers.js",
                    repoUrl: "https://github.com/huggingface/transformers.js",
                    docsUrl: "https://huggingface.co/docs/hub/transformers-js",
                    snippets: e => {
                        if (!e.pipeline_tag) return [ "// ⚠️ Unknown pipeline tag" ];
                        const t = "@huggingface/transformers";
                        return [ `// npm i ${t}\nimport { pipeline } from '${t}';\n\n// Allocate pipeline\nconst pipe = await pipeline('${e.pipeline_tag}', '${e.id}');` ];
                    },
                    filter: !0
                },
                trellis: {
                    prettyLabel: "Trellis",
                    repoName: "Trellis",
                    repoUrl: "https://github.com/microsoft/TRELLIS",
                    countDownloads: 'path_extension:"safetensors"'
                },
                ultralytics: {
                    prettyLabel: "ultralytics",
                    repoName: "ultralytics",
                    repoUrl: "https://github.com/ultralytics/ultralytics",
                    docsUrl: "https://github.com/ultralytics/ultralytics",
                    filter: !1,
                    countDownloads: 'path_extension:"pt"',
                    snippets: qt
                },
                "uni-3dar": {
                    prettyLabel: "Uni-3DAR",
                    repoName: "Uni-3DAR",
                    repoUrl: "https://github.com/dptech-corp/Uni-3DAR",
                    docsUrl: "https://github.com/dptech-corp/Uni-3DAR",
                    countDownloads: 'path_extension:"pt"'
                },
                "unity-sentis": {
                    prettyLabel: "unity-sentis",
                    repoName: "unity-sentis",
                    repoUrl: "https://github.com/Unity-Technologies/sentis-samples",
                    snippets: () => [ 'string modelName = "[Your model name here].sentis";\nModel model = ModelLoader.Load(Application.streamingAssetsPath + "/" + modelName);\nIWorker engine = WorkerFactory.CreateWorker(BackendType.GPUCompute, model);\n// Please see provided C# file for more details\n' ],
                    filter: !0,
                    countDownloads: 'path_extension:"sentis"'
                },
                sana: {
                    prettyLabel: "Sana",
                    repoName: "Sana",
                    repoUrl: "https://github.com/NVlabs/Sana",
                    countDownloads: 'path_extension:"pth"',
                    snippets: e => [ `\n# Load the model and infer image from text\nimport torch\nfrom app.sana_pipeline import SanaPipeline\nfrom torchvision.utils import save_image\n\nsana = SanaPipeline("configs/sana_config/1024ms/Sana_1600M_img1024.yaml")\nsana.from_pretrained("hf://${e.id}")\n\nimage = sana(\n    prompt='a cyberpunk cat with a neon sign that says "Sana"',\n    height=1024,\n    width=1024,\n    guidance_scale=5.0,\n    pag_guidance_scale=2.0,\n    num_inference_steps=18,\n) ` ]
                },
                "vfi-mamba": {
                    prettyLabel: "VFIMamba",
                    repoName: "VFIMamba",
                    repoUrl: "https://github.com/MCG-NJU/VFIMamba",
                    countDownloads: 'path_extension:"pkl"',
                    snippets: e => [ `from Trainer_finetune import Model\n\nmodel = Model.from_pretrained("${e.id}")` ]
                },
                voicecraft: {
                    prettyLabel: "VoiceCraft",
                    repoName: "VoiceCraft",
                    repoUrl: "https://github.com/jasonppy/VoiceCraft",
                    docsUrl: "https://github.com/jasonppy/VoiceCraft",
                    snippets: e => [ `from voicecraft import VoiceCraft\n\nmodel = VoiceCraft.from_pretrained("${e.id}")` ]
                },
                wham: {
                    prettyLabel: "WHAM",
                    repoName: "wham",
                    repoUrl: "https://huggingface.co/microsoft/wham",
                    docsUrl: "https://huggingface.co/microsoft/wham/blob/main/README.md",
                    countDownloads: 'path_extension:"ckpt"'
                },
                whisperkit: {
                    prettyLabel: "WhisperKit",
                    repoName: "WhisperKit",
                    repoUrl: "https://github.com/argmaxinc/WhisperKit",
                    docsUrl: "https://github.com/argmaxinc/WhisperKit?tab=readme-ov-file#homebrew",
                    snippets: () => [ '# Install CLI with Homebrew on macOS device\nbrew install whisperkit-cli\n\n# View all available inference options\nwhisperkit-cli transcribe --help\n\t\n# Download and run inference using whisper base model\nwhisperkit-cli transcribe --audio-path /path/to/audio.mp3\n\n# Or use your preferred model variant\nwhisperkit-cli transcribe --model "large-v3" --model-prefix "distil" --audio-path /path/to/audio.mp3 --verbose' ],
                    countDownloads: 'path_filename:"model" AND path_extension:"mil" AND _exists_:"path_prefix"'
                },
                yolov10: {
                    prettyLabel: "YOLOv10",
                    repoName: "YOLOv10",
                    repoUrl: "https://github.com/THU-MIG/yolov10",
                    docsUrl: "https://github.com/THU-MIG/yolov10",
                    countDownloads: 'path_extension:"pt" OR path_extension:"safetensors"',
                    snippets: qt
                },
                zonos: {
                    prettyLabel: "Zonos",
                    repoName: "Zonos",
                    repoUrl: "https://github.com/Zyphra/Zonos",
                    docsUrl: "https://github.com/Zyphra/Zonos",
                    snippets: e => [ `# pip install git+https://github.com/Zyphra/Zonos.git\nimport torchaudio\nfrom zonos.model import Zonos\nfrom zonos.conditioning import make_cond_dict\n\nmodel = Zonos.from_pretrained("${e.id}", device="cuda")\n\nwav, sr = torchaudio.load("speaker.wav")           # 5-10s reference clip\nspeaker = model.make_speaker_embedding(wav, sr)\n\ncond  = make_cond_dict(text="Hello, world!", speaker=speaker, language="en-us")\ncodes = model.generate(model.prepare_conditioning(cond))\n\naudio = model.autoencoder.decode(codes)[0].cpu()\ntorchaudio.save("sample.wav", audio, model.autoencoder.sampling_rate)\n` ],
                    filter: !1
                },
                "3dtopia-xl": {
                    prettyLabel: "3DTopia-XL",
                    repoName: "3DTopia-XL",
                    repoUrl: "https://github.com/3DTopia/3DTopia-XL",
                    filter: !1,
                    countDownloads: 'path:"model_vae_fp16.pt"',
                    snippets: e => [ `from threedtopia_xl.models import threedtopia_xl\n\nmodel = threedtopia_xl.from_pretrained("${e.id}")\nmodel.generate(cond="path/to/image.png")` ]
                }
            };
            var Bt;
            Object.keys(zt), Object.entries(zt).filter((([e, t]) => t.filter)).map((([e]) => e)), 
            function(e) {
                e[e.F32 = 0] = "F32", e[e.F16 = 1] = "F16", e[e.Q4_0 = 2] = "Q4_0", e[e.Q4_1 = 3] = "Q4_1", 
                e[e.Q4_1_SOME_F16 = 4] = "Q4_1_SOME_F16", e[e.Q4_2 = 5] = "Q4_2", e[e.Q4_3 = 6] = "Q4_3", 
                e[e.Q8_0 = 7] = "Q8_0", e[e.Q5_0 = 8] = "Q5_0", e[e.Q5_1 = 9] = "Q5_1", e[e.Q2_K = 10] = "Q2_K", 
                e[e.Q3_K_S = 11] = "Q3_K_S", e[e.Q3_K_M = 12] = "Q3_K_M", e[e.Q3_K_L = 13] = "Q3_K_L", 
                e[e.Q4_K_S = 14] = "Q4_K_S", e[e.Q4_K_M = 15] = "Q4_K_M", e[e.Q5_K_S = 16] = "Q5_K_S", 
                e[e.Q5_K_M = 17] = "Q5_K_M", e[e.Q6_K = 18] = "Q6_K", e[e.IQ2_XXS = 19] = "IQ2_XXS", 
                e[e.IQ2_XS = 20] = "IQ2_XS", e[e.Q2_K_S = 21] = "Q2_K_S", e[e.IQ3_XS = 22] = "IQ3_XS", 
                e[e.IQ3_XXS = 23] = "IQ3_XXS", e[e.IQ1_S = 24] = "IQ1_S", e[e.IQ4_NL = 25] = "IQ4_NL", 
                e[e.IQ3_S = 26] = "IQ3_S", e[e.IQ3_M = 27] = "IQ3_M", e[e.IQ2_S = 28] = "IQ2_S", 
                e[e.IQ2_M = 29] = "IQ2_M", e[e.IQ4_XS = 30] = "IQ4_XS", e[e.IQ1_M = 31] = "IQ1_M", 
                e[e.BF16 = 32] = "BF16", e[e.Q4_0_4_4 = 33] = "Q4_0_4_4", e[e.Q4_0_4_8 = 34] = "Q4_0_4_8", 
                e[e.Q4_0_8_8 = 35] = "Q4_0_8_8", e[e.TQ1_0 = 36] = "TQ1_0", e[e.TQ2_0 = 37] = "TQ2_0", 
                e[e.Q2_K_XL = 1e3] = "Q2_K_XL", e[e.Q3_K_XL = 1001] = "Q3_K_XL", e[e.Q4_K_XL = 1002] = "Q4_K_XL", 
                e[e.Q5_K_XL = 1003] = "Q5_K_XL", e[e.Q6_K_XL = 1004] = "Q6_K_XL", e[e.Q8_K_XL = 1005] = "Q8_K_XL";
            }(Bt || (Bt = {}));
            const Ft = Object.values(Bt).filter((e => "string" == typeof e)), Qt = new RegExp(`(?<quant>${Ft.join("|")})(_(?<sizeVariation>[A-Z]+))?`);
            var Vt;
            new RegExp(Qt, "g"), Bt.F32, Bt.BF16, Bt.F16, Bt.Q8_K_XL, Bt.Q8_0, Bt.Q6_K_XL, Bt.Q6_K, 
            Bt.Q5_K_XL, Bt.Q5_K_M, Bt.Q5_K_S, Bt.Q5_0, Bt.Q5_1, Bt.Q4_K_XL, Bt.Q4_K_M, Bt.Q4_K_S, 
            Bt.IQ4_NL, Bt.IQ4_XS, Bt.Q4_0_4_4, Bt.Q4_0_4_8, Bt.Q4_0_8_8, Bt.Q4_1_SOME_F16, Bt.Q4_0, 
            Bt.Q4_1, Bt.Q4_2, Bt.Q4_3, Bt.Q3_K_XL, Bt.Q3_K_L, Bt.Q3_K_M, Bt.Q3_K_S, Bt.IQ3_M, 
            Bt.IQ3_S, Bt.IQ3_XS, Bt.IQ3_XXS, Bt.Q2_K_XL, Bt.Q2_K, Bt.Q2_K_S, Bt.IQ2_M, Bt.IQ2_S, 
            Bt.IQ2_XS, Bt.IQ2_XXS, Bt.IQ1_S, Bt.IQ1_M, Bt.TQ1_0, Bt.TQ2_0, function(e) {
                e[e.F32 = 0] = "F32", e[e.F16 = 1] = "F16", e[e.Q4_0 = 2] = "Q4_0", e[e.Q4_1 = 3] = "Q4_1", 
                e[e.Q5_0 = 6] = "Q5_0", e[e.Q5_1 = 7] = "Q5_1", e[e.Q8_0 = 8] = "Q8_0", e[e.Q8_1 = 9] = "Q8_1", 
                e[e.Q2_K = 10] = "Q2_K", e[e.Q3_K = 11] = "Q3_K", e[e.Q4_K = 12] = "Q4_K", e[e.Q5_K = 13] = "Q5_K", 
                e[e.Q6_K = 14] = "Q6_K", e[e.Q8_K = 15] = "Q8_K", e[e.IQ2_XXS = 16] = "IQ2_XXS", 
                e[e.IQ2_XS = 17] = "IQ2_XS", e[e.IQ3_XXS = 18] = "IQ3_XXS", e[e.IQ1_S = 19] = "IQ1_S", 
                e[e.IQ4_NL = 20] = "IQ4_NL", e[e.IQ3_S = 21] = "IQ3_S", e[e.IQ2_S = 22] = "IQ2_S", 
                e[e.IQ4_XS = 23] = "IQ4_XS", e[e.I8 = 24] = "I8", e[e.I16 = 25] = "I16", e[e.I32 = 26] = "I32", 
                e[e.I64 = 27] = "I64", e[e.F64 = 28] = "F64", e[e.IQ1_M = 29] = "IQ1_M", e[e.BF16 = 30] = "BF16", 
                e[e.TQ1_0 = 34] = "TQ1_0", e[e.TQ2_0 = 35] = "TQ2_0";
            }(Vt || (Vt = {}));
            const Ht = [ "python", "js", "sh" ];
            var Gt = Object.defineProperty, Wt = (e, t) => {
                for (var n in t) Gt(e, n, {
                    get: t[n],
                    enumerable: !0
                });
            };
            Wt({}, {
                audioClassification: () => Bn,
                audioToAudio: () => Fn,
                automaticSpeechRecognition: () => Qn,
                chatCompletion: () => ta,
                chatCompletionStream: () => na,
                documentQuestionAnswering: () => ha,
                featureExtraction: () => aa,
                fillMask: () => ia,
                imageClassification: () => Gn,
                imageSegmentation: () => Wn,
                imageToImage: () => Kn,
                imageToText: () => Jn,
                objectDetection: () => Xn,
                questionAnswering: () => oa,
                request: () => Nn,
                sentenceSimilarity: () => ra,
                streamingRequest: () => qn,
                summarization: () => sa,
                tableQuestionAnswering: () => la,
                tabularClassification: () => ya,
                tabularRegression: () => ba,
                textClassification: () => ca,
                textGeneration: () => pa,
                textGenerationStream: () => da,
                textToImage: () => Yn,
                textToSpeech: () => Vn,
                textToVideo: () => Zn,
                tokenClassification: () => ua,
                translation: () => ma,
                visualQuestionAnswering: () => ga,
                zeroShotClassification: () => fa,
                zeroShotImageClassification: () => ea
            });
            var Jt = "https://huggingface.co", Xt = "https://router.huggingface.co", Zt = {
                "black-forest-labs": {},
                cerebras: {},
                cohere: {},
                "fal-ai": {},
                "featherless-ai": {},
                "fireworks-ai": {},
                groq: {},
                "hf-inference": {},
                hyperbolic: {},
                nebius: {},
                novita: {},
                nscale: {},
                openai: {},
                ovhcloud: {},
                replicate: {},
                sambanova: {},
                together: {}
            }, en = class extends TypeError {
                constructor(e) {
                    super(`Invalid inference output: ${e}. Use the 'request' method with the same parameters to do a custom call with no type checking.`), 
                    this.name = "InferenceOutputError";
                }
            };
            function tn(e) {
                return Array.isArray(e) ? e : [ e ];
            }
            var nn = class {
                constructor(e, t, n = !1) {
                    this.provider = e, this.baseUrl = t, this.clientSideRoutingOnly = n;
                }
                makeBaseUrl(e) {
                    return "provider-key" !== e.authMethod ? `${Xt}/${this.provider}` : this.baseUrl;
                }
                makeBody(e) {
                    return "data" in e.args && e.args.data ? e.args.data : JSON.stringify(this.preparePayload(e));
                }
                makeUrl(e) {
                    return `${this.makeBaseUrl(e)}/${this.makeRoute(e).replace(/^\/+/, "")}`;
                }
                prepareHeaders(e, t) {
                    const n = {
                        Authorization: `Bearer ${e.accessToken}`
                    };
                    return t || (n["Content-Type"] = "application/json"), n;
                }
            }, an = class extends nn {
                constructor(e, t, n = !1) {
                    super(e, t, n);
                }
                makeRoute() {
                    return "v1/chat/completions";
                }
                preparePayload(e) {
                    return {
                        ...e.args,
                        model: e.model
                    };
                }
                async getResponse(e) {
                    if ("object" == typeof e && Array.isArray(e?.choices) && "number" == typeof e?.created && "string" == typeof e?.id && "string" == typeof e?.model && (void 0 === e.system_fingerprint || null === e.system_fingerprint || "string" == typeof e.system_fingerprint) && "object" == typeof e?.usage) return e;
                    throw new en("Expected ChatCompletionOutput");
                }
            }, on = class extends nn {
                constructor(e, t, n = !1) {
                    super(e, t, n);
                }
                preparePayload(e) {
                    return {
                        ...e.args,
                        model: e.model
                    };
                }
                makeRoute() {
                    return "v1/completions";
                }
                async getResponse(e) {
                    const t = tn(e);
                    if (Array.isArray(t) && t.length > 0 && t.every((e => "object" == typeof e && !!e && "generated_text" in e && "string" == typeof e.generated_text))) return t[0];
                    throw new en("Expected Array<{generated_text: string}>");
                }
            };
            function rn(e) {
                if (globalThis.Buffer) return globalThis.Buffer.from(e).toString("base64");
                {
                    const t = [];
                    return e.forEach((e => {
                        t.push(String.fromCharCode(e));
                    })), globalThis.btoa(t.join(""));
                }
            }
            function sn(e, t) {
                return e.includes(t);
            }
            function ln(e, t) {
                const n = Array.isArray(t) ? t : [ t ];
                return function(e, t) {
                    return Object.assign({}, ...t.map((t => {
                        if (void 0 !== e[t]) return {
                            [t]: e[t]
                        };
                    })));
                }(e, Object.keys(e).filter((e => !sn(n, e))));
            }
            var cn = [ "feature-extraction", "sentence-similarity" ], pn = class extends nn {
                constructor() {
                    super("hf-inference", `${Xt}/hf-inference`);
                }
                preparePayload(e) {
                    return e.args;
                }
                makeUrl(e) {
                    return e.model.startsWith("http://") || e.model.startsWith("https://") ? e.model : super.makeUrl(e);
                }
                makeRoute(e) {
                    return e.task && [ "feature-extraction", "sentence-similarity" ].includes(e.task) ? `models/${e.model}/pipeline/${e.task}` : `models/${e.model}`;
                }
                async getResponse(e) {
                    return e;
                }
            }, dn = class extends pn {
                static validate(e) {
                    return "object" == typeof e && !!e && "aggregator" in e && "string" == typeof e.aggregator && "answer" in e && "string" == typeof e.answer && "cells" in e && Array.isArray(e.cells) && e.cells.every((e => "string" == typeof e)) && "coordinates" in e && Array.isArray(e.coordinates) && e.coordinates.every((e => Array.isArray(e) && e.every((e => "number" == typeof e))));
                }
                async getResponse(e) {
                    if (Array.isArray(e) && Array.isArray(e) ? e.every((e => dn.validate(e))) : dn.validate(e)) return Array.isArray(e) ? e[0] : e;
                    throw new en("Expected {aggregator: string, answer: string, cells: string[], coordinates: number[][]}");
                }
            }, un = new Map;
            async function mn(e, t, n) {
                let a;
                if (un.has(e)) a = un.get(e); else {
                    const i = await (n?.fetch ?? fetch)(`${Jt}/api/models/${e}?expand[]=inferenceProviderMapping`, {
                        headers: t?.startsWith("hf_") ? {
                            Authorization: `Bearer ${t}`
                        } : {}
                    });
                    if (404 === i.status) throw new Error(`Model ${e} does not exist`);
                    a = await i.json().then((e => e.inferenceProviderMapping)).catch((() => null)), 
                    a && un.set(e, a);
                }
                if (!a) throw new Error(`We have not been able to find inference provider information for model ${e}.`);
                return a;
            }
            async function fn(e, t, n) {
                if (n) {
                    if (e) throw new Error("Specifying both endpointUrl and provider is not supported.");
                    return "hf-inference";
                }
                if (e || (e = "auto"), "auto" === e) {
                    if (!t) throw new Error("Specifying a model is required when provider is 'auto'");
                    const n = await mn(t);
                    e = Object.keys(n)[0];
                }
                if (!e) throw new Error(`No Inference Provider available for model ${t}.`);
                return e;
            }
            function hn(e) {
                return new Promise((t => {
                    setTimeout((() => t()), e);
                }));
            }
            function gn(e) {
                return /^http(s?):/.test(e) || e.startsWith("/");
            }
            var yn = [ "audio/mpeg", "audio/mp4", "audio/wav", "audio/x-wav" ], bn = class extends nn {
                constructor(e) {
                    super("fal-ai", e || "https://fal.run");
                }
                preparePayload(e) {
                    return e.args;
                }
                makeRoute(e) {
                    return `/${e.model}`;
                }
                prepareHeaders(e, t) {
                    const n = {
                        Authorization: "provider-key" !== e.authMethod ? `Bearer ${e.accessToken}` : `Key ${e.accessToken}`
                    };
                    return t || (n["Content-Type"] = "application/json"), n;
                }
            }, wn = "https://api.featherless.ai", vn = "https://api.groq.com", xn = "https://api.hyperbolic.xyz", _n = "https://api.studio.nebius.ai", kn = "https://api.novita.ai", An = "https://inference.api.nscale.com", Sn = "https://oai.endpoints.kepler.ai.cloud.ovh.net", Tn = class extends nn {
                constructor(e) {
                    super("replicate", e || "https://api.replicate.com");
                }
                makeRoute(e) {
                    return e.model.includes(":") ? "v1/predictions" : `v1/models/${e.model}/predictions`;
                }
                preparePayload(e) {
                    return {
                        input: {
                            ...ln(e.args, [ "inputs", "parameters" ]),
                            ...e.args.parameters,
                            prompt: e.args.inputs
                        },
                        version: e.model.includes(":") ? e.model.split(":")[1] : void 0
                    };
                }
                prepareHeaders(e, t) {
                    const n = {
                        Authorization: `Bearer ${e.accessToken}`,
                        Prefer: "wait"
                    };
                    return t || (n["Content-Type"] = "application/json"), n;
                }
                makeUrl(e) {
                    const t = this.makeBaseUrl(e);
                    return e.model.includes(":") ? `${t}/v1/predictions` : `${t}/v1/models/${e.model}/predictions`;
                }
            }, In = "https://api.together.xyz", En = {
                "black-forest-labs": {
                    "text-to-image": new class extends nn {
                        constructor() {
                            super("black-forest-labs", "https://api.us1.bfl.ai");
                        }
                        preparePayload(e) {
                            return {
                                ...ln(e.args, [ "inputs", "parameters" ]),
                                ...e.args.parameters,
                                prompt: e.args.inputs
                            };
                        }
                        prepareHeaders(e, t) {
                            const n = {
                                Authorization: "provider-key" !== e.authMethod ? `Bearer ${e.accessToken}` : `X-Key ${e.accessToken}`
                            };
                            return t || (n["Content-Type"] = "application/json"), n;
                        }
                        makeRoute(e) {
                            if (!e) throw new Error("Params are required");
                            return `/v1/${e.model}`;
                        }
                        async getResponse(e, t, n, a) {
                            const i = new URL(e.polling_url);
                            for (let e = 0; e < 5; e++) {
                                await hn(1e3), i.searchParams.set("attempt", e.toString(10));
                                const t = await fetch(i, {
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                });
                                if (!t.ok) throw new en("Failed to fetch result from black forest labs API");
                                const n = await t.json();
                                if ("object" == typeof n && n && "status" in n && "string" == typeof n.status && "Ready" === n.status && "result" in n && "object" == typeof n.result && n.result && "sample" in n.result && "string" == typeof n.result.sample) {
                                    if ("url" === a) return n.result.sample;
                                    const e = await fetch(n.result.sample);
                                    return await e.blob();
                                }
                            }
                            throw new en("Failed to fetch result from black forest labs API");
                        }
                    }
                },
                cerebras: {
                    conversational: new class extends an {
                        constructor() {
                            super("cerebras", "https://api.cerebras.ai");
                        }
                    }
                },
                cohere: {
                    conversational: new class extends an {
                        constructor() {
                            super("cohere", "https://api.cohere.com");
                        }
                        makeRoute() {
                            return "/compatibility/v1/chat/completions";
                        }
                    }
                },
                "fal-ai": {
                    "text-to-image": new class extends bn {
                        preparePayload(e) {
                            const t = {
                                ...ln(e.args, [ "inputs", "parameters" ]),
                                ...e.args.parameters,
                                sync_mode: !0,
                                prompt: e.args.inputs
                            };
                            var n, a;
                            return "lora" === e.mapping?.adapter && e.mapping.adapterWeightsPath && (t.loras = [ {
                                path: (n = e.mapping.hfModelId, a = e.mapping.adapterWeightsPath, `${Jt}/${n}/resolve/main/${a}`),
                                scale: 1
                            } ], "fal-ai/lora" === e.mapping.providerId && (t.model_name = "stabilityai/stable-diffusion-xl-base-1.0")), 
                            t;
                        }
                        async getResponse(e, t) {
                            if ("object" == typeof e && "images" in e && Array.isArray(e.images) && e.images.length > 0 && "url" in e.images[0] && "string" == typeof e.images[0].url) {
                                if ("url" === t) return e.images[0].url;
                                const n = await fetch(e.images[0].url);
                                return await n.blob();
                            }
                            throw new en("Expected Fal.ai text-to-image response format");
                        }
                    },
                    "text-to-speech": new class extends bn {
                        preparePayload(e) {
                            return {
                                ...ln(e.args, [ "inputs", "parameters" ]),
                                ...e.args.parameters,
                                text: e.args.inputs
                            };
                        }
                        async getResponse(e) {
                            const t = e;
                            if ("string" != typeof t?.audio?.url) throw new en(`Expected { audio: { url: string } } format from Fal.ai Text-to-Speech, got: ${JSON.stringify(e)}`);
                            try {
                                const e = await fetch(t.audio.url);
                                if (!e.ok) throw new Error(`Failed to fetch audio from ${t.audio.url}: ${e.statusText}`);
                                return await e.blob();
                            } catch (e) {
                                throw new en(`Error fetching or processing audio from Fal.ai Text-to-Speech URL: ${t.audio.url}. ${e instanceof Error ? e.message : String(e)}`);
                            }
                        }
                    },
                    "text-to-video": new class extends bn {
                        constructor() {
                            super("https://queue.fal.run");
                        }
                        makeRoute(e) {
                            return "provider-key" !== e.authMethod ? `/${e.model}?_subdomain=queue` : `/${e.model}`;
                        }
                        preparePayload(e) {
                            return {
                                ...ln(e.args, [ "inputs", "parameters" ]),
                                ...e.args.parameters,
                                prompt: e.args.inputs
                            };
                        }
                        async getResponse(e, t, n) {
                            if (!t || !n) throw new en("URL and headers are required for text-to-video task");
                            if (!e.request_id) throw new en("No request ID found in the response");
                            let a = e.status;
                            const i = new URL(t), o = `${i.protocol}//${i.host}${"router.huggingface.co" === i.host ? "/fal-ai" : ""}`, r = new URL(e.response_url).pathname, s = i.search, l = `${o}${r}/status${s}`, c = `${o}${r}${s}`;
                            for (;"COMPLETED" !== a; ) {
                                await hn(500);
                                const e = await fetch(l, {
                                    headers: n
                                });
                                if (!e.ok) throw new en("Failed to fetch response status from fal-ai API");
                                try {
                                    a = (await e.json()).status;
                                } catch (e) {
                                    throw new en("Failed to parse status response from fal-ai API");
                                }
                            }
                            const p = await fetch(c, {
                                headers: n
                            });
                            let d;
                            try {
                                d = await p.json();
                            } catch (e) {
                                throw new en("Failed to parse result response from fal-ai API");
                            }
                            if ("object" == typeof d && d && "video" in d && "object" == typeof d.video && d.video && "url" in d.video && "string" == typeof d.video.url && gn(d.video.url)) {
                                const e = await fetch(d.video.url);
                                return await e.blob();
                            }
                            throw new en("Expected { video: { url: string } } result format, got instead: " + JSON.stringify(d));
                        }
                    },
                    "automatic-speech-recognition": new class extends bn {
                        prepareHeaders(e, t) {
                            const n = super.prepareHeaders(e, t);
                            return n["Content-Type"] = "application/json", n;
                        }
                        async getResponse(e) {
                            const t = e;
                            if ("string" != typeof t?.text) throw new en(`Expected { text: string } format from Fal.ai Automatic Speech Recognition, got: ${JSON.stringify(e)}`);
                            return {
                                text: t.text
                            };
                        }
                        async preparePayloadAsync(e) {
                            const t = "data" in e && e.data instanceof Blob ? e.data : "inputs" in e ? e.inputs : void 0, n = t?.type;
                            if (!n) throw new Error("Unable to determine the input's content-type. Make sure your are passing a Blob when using provider fal-ai.");
                            if (!yn.includes(n)) throw new Error(`Provider fal-ai does not support blob type ${n} - supported content types are: ${yn.join(", ")}`);
                            const a = rn(new Uint8Array(await t.arrayBuffer()));
                            return {
                                ...ln(e, "data" in e ? "data" : "inputs"),
                                audio_url: `data:${n};base64,${a}`
                            };
                        }
                    }
                },
                "featherless-ai": {
                    conversational: new class extends an {
                        constructor() {
                            super("featherless-ai", wn);
                        }
                    },
                    "text-generation": new class extends on {
                        constructor() {
                            super("featherless-ai", wn);
                        }
                        preparePayload(e) {
                            return {
                                ...e.args,
                                ...e.args.parameters,
                                model: e.model,
                                prompt: e.args.inputs
                            };
                        }
                        async getResponse(e) {
                            if ("object" == typeof e && "choices" in e && Array.isArray(e?.choices) && "string" == typeof e?.model) return {
                                generated_text: e.choices[0].text
                            };
                            throw new en("Expected Featherless AI text generation response format");
                        }
                    }
                },
                "hf-inference": {
                    "text-to-image": new class extends pn {
                        async getResponse(e, t, n, a) {
                            if (!e) throw new en("response is undefined");
                            if ("object" == typeof e) {
                                if ("data" in e && Array.isArray(e.data) && e.data[0].b64_json) {
                                    const t = e.data[0].b64_json;
                                    if ("url" === a) return `data:image/jpeg;base64,${t}`;
                                    const n = await fetch(`data:image/jpeg;base64,${t}`);
                                    return await n.blob();
                                }
                                if ("output" in e && Array.isArray(e.output)) {
                                    if ("url" === a) return e.output[0];
                                    const t = await fetch(e.output[0]);
                                    return await t.blob();
                                }
                            }
                            if (e instanceof Blob) return "url" === a ? `data:image/jpeg;base64,${await e.arrayBuffer().then((e => Buffer.from(e).toString("base64")))}` : e;
                            throw new en("Expected a Blob ");
                        }
                    },
                    conversational: new class extends pn {
                        makeUrl(e) {
                            let t;
                            return t = e.model.startsWith("http://") || e.model.startsWith("https://") ? e.model.trim() : `${this.makeBaseUrl(e)}/models/${e.model}`, 
                            t = t.replace(/\/+$/, ""), t.endsWith("/v1") ? t += "/chat/completions" : t.endsWith("/chat/completions") || (t += "/v1/chat/completions"), 
                            t;
                        }
                        preparePayload(e) {
                            return {
                                ...e.args,
                                model: e.model
                            };
                        }
                        async getResponse(e) {
                            return e;
                        }
                    },
                    "text-generation": new class extends pn {
                        async getResponse(e) {
                            const t = tn(e);
                            if (Array.isArray(t) && t.every((e => "generated_text" in e && "string" == typeof e?.generated_text))) return t?.[0];
                            throw new en("Expected Array<{generated_text: string}>");
                        }
                    },
                    "text-classification": new class extends pn {
                        async getResponse(e) {
                            const t = e?.[0];
                            if (Array.isArray(t) && t.every((e => "string" == typeof e?.label && "number" == typeof e.score))) return t;
                            throw new en("Expected Array<{label: string, score: number}>");
                        }
                    },
                    "question-answering": new class extends pn {
                        async getResponse(e) {
                            if (Array.isArray(e) ? e.every((e => "object" == typeof e && !!e && "string" == typeof e.answer && "number" == typeof e.end && "number" == typeof e.score && "number" == typeof e.start)) : "object" == typeof e && e && "string" == typeof e.answer && "number" == typeof e.end && "number" == typeof e.score && "number" == typeof e.start) return Array.isArray(e) ? e[0] : e;
                            throw new en("Expected Array<{answer: string, end: number, score: number, start: number}>");
                        }
                    },
                    "audio-classification": new class extends pn {
                        async getResponse(e) {
                            if (Array.isArray(e) && e.every((e => "object" == typeof e && null !== e && "string" == typeof e.label && "number" == typeof e.score))) return e;
                            throw new en("Expected Array<{label: string, score: number}> but received different format");
                        }
                    },
                    "automatic-speech-recognition": new class extends pn {
                        async getResponse(e) {
                            return e;
                        }
                        async preparePayloadAsync(e) {
                            return "data" in e ? e : {
                                ...ln(e, "inputs"),
                                data: e.inputs
                            };
                        }
                    },
                    "fill-mask": new class extends pn {
                        async getResponse(e) {
                            if (Array.isArray(e) && e.every((e => "number" == typeof e.score && "string" == typeof e.sequence && "number" == typeof e.token && "string" == typeof e.token_str))) return e;
                            throw new en("Expected Array<{score: number, sequence: string, token: number, token_str: string}>");
                        }
                    },
                    "feature-extraction": new class extends pn {
                        async getResponse(e) {
                            const t = (e, n, a = 0) => !(a > n) && (e.every((e => Array.isArray(e))) ? e.every((e => t(e, n, a + 1))) : e.every((e => "number" == typeof e)));
                            if (Array.isArray(e) && t(e, 3, 0)) return e;
                            throw new en("Expected Array<number[][][] | number[][] | number[] | number>");
                        }
                    },
                    "image-classification": new class extends pn {
                        async getResponse(e) {
                            if (Array.isArray(e) && e.every((e => "string" == typeof e.label && "number" == typeof e.score))) return e;
                            throw new en("Expected Array<{label: string, score: number}>");
                        }
                    },
                    "image-segmentation": new class extends pn {
                        async getResponse(e) {
                            if (Array.isArray(e) && e.every((e => "string" == typeof e.label && "string" == typeof e.mask && (void 0 === e.score || "number" == typeof e.score)))) return e;
                            throw new en("Expected Array<{label: string, mask: string, score: number}>");
                        }
                    },
                    "document-question-answering": new class extends pn {
                        async getResponse(e) {
                            if (Array.isArray(e) && e.every((e => !("object" != typeof e || !e || "string" != typeof e?.answer || "number" != typeof e.end && void 0 !== e.end || "number" != typeof e.score && void 0 !== e.score || "number" != typeof e.start && void 0 !== e.start)))) return e[0];
                            throw new en("Expected Array<{answer: string, end: number, score: number, start: number}>");
                        }
                    },
                    "image-to-text": new class extends pn {
                        async getResponse(e) {
                            if ("string" != typeof e?.generated_text) throw new en("Expected {generated_text: string}");
                            return e;
                        }
                    },
                    "object-detection": new class extends pn {
                        async getResponse(e) {
                            if (Array.isArray(e) && e.every((e => "string" == typeof e.label && "number" == typeof e.score && "number" == typeof e.box.xmin && "number" == typeof e.box.ymin && "number" == typeof e.box.xmax && "number" == typeof e.box.ymax))) return e;
                            throw new en("Expected Array<{label: string, score: number, box: {xmin: number, ymin: number, xmax: number, ymax: number}}>");
                        }
                    },
                    "audio-to-audio": new class extends pn {
                        async getResponse(e) {
                            if (!Array.isArray(e)) throw new en("Expected Array");
                            if (!e.every((e => "object" == typeof e && e && "label" in e && "string" == typeof e.label && "content-type" in e && "string" == typeof e["content-type"] && "blob" in e && "string" == typeof e.blob))) throw new en("Expected Array<{label: string, audio: Blob}>");
                            return e;
                        }
                    },
                    "zero-shot-image-classification": new class extends pn {
                        async getResponse(e) {
                            if (Array.isArray(e) && e.every((e => "string" == typeof e.label && "number" == typeof e.score))) return e;
                            throw new en("Expected Array<{label: string, score: number}>");
                        }
                    },
                    "zero-shot-classification": new class extends pn {
                        async getResponse(e) {
                            if (Array.isArray(e) && e.every((e => Array.isArray(e.labels) && e.labels.every((e => "string" == typeof e)) && Array.isArray(e.scores) && e.scores.every((e => "number" == typeof e)) && "string" == typeof e.sequence))) return e;
                            throw new en("Expected Array<{labels: string[], scores: number[], sequence: string}>");
                        }
                    },
                    "image-to-image": new class extends pn {
                        async preparePayloadAsync(e) {
                            return e.parameters ? {
                                ...e,
                                inputs: rn(new Uint8Array(e.inputs instanceof ArrayBuffer ? e.inputs : await e.inputs.arrayBuffer()))
                            } : {
                                ...e,
                                model: e.model,
                                data: e.inputs
                            };
                        }
                        async getResponse(e) {
                            if (e instanceof Blob) return e;
                            throw new en("Expected Blob");
                        }
                    },
                    "sentence-similarity": new class extends pn {
                        async getResponse(e) {
                            if (Array.isArray(e) && e.every((e => "number" == typeof e))) return e;
                            throw new en("Expected Array<number>");
                        }
                    },
                    "table-question-answering": new dn,
                    "tabular-classification": new class extends pn {
                        async getResponse(e) {
                            if (Array.isArray(e) && e.every((e => "number" == typeof e))) return e;
                            throw new en("Expected Array<number>");
                        }
                    },
                    "text-to-speech": new class extends pn {
                        async getResponse(e) {
                            return e;
                        }
                    },
                    "token-classification": new class extends pn {
                        async getResponse(e) {
                            if (Array.isArray(e) && e.every((e => "number" == typeof e.end && "string" == typeof e.entity_group && "number" == typeof e.score && "number" == typeof e.start && "string" == typeof e.word))) return e;
                            throw new en("Expected Array<{end: number, entity_group: string, score: number, start: number, word: string}>");
                        }
                    },
                    translation: new class extends pn {
                        async getResponse(e) {
                            if (Array.isArray(e) && e.every((e => "string" == typeof e?.translation_text))) return 1 === e?.length ? e?.[0] : e;
                            throw new en("Expected Array<{translation_text: string}>");
                        }
                    },
                    summarization: new class extends pn {
                        async getResponse(e) {
                            if (Array.isArray(e) && e.every((e => "string" == typeof e?.summary_text))) return e?.[0];
                            throw new en("Expected Array<{summary_text: string}>");
                        }
                    },
                    "visual-question-answering": new class extends pn {
                        async getResponse(e) {
                            if (Array.isArray(e) && e.every((e => "object" == typeof e && !!e && "string" == typeof e?.answer && "number" == typeof e.score))) return e[0];
                            throw new en("Expected Array<{answer: string, score: number}>");
                        }
                    },
                    "tabular-regression": new class extends pn {
                        async getResponse(e) {
                            if (Array.isArray(e) && e.every((e => "number" == typeof e))) return e;
                            throw new en("Expected Array<number>");
                        }
                    },
                    "text-to-audio": new class extends pn {
                        async getResponse(e) {
                            return e;
                        }
                    }
                },
                "fireworks-ai": {
                    conversational: new class extends an {
                        constructor() {
                            super("fireworks-ai", "https://api.fireworks.ai");
                        }
                        makeRoute() {
                            return "/inference/v1/chat/completions";
                        }
                    }
                },
                groq: {
                    conversational: new class extends an {
                        constructor() {
                            super("groq", vn);
                        }
                        makeRoute() {
                            return "/openai/v1/chat/completions";
                        }
                    },
                    "text-generation": new class extends on {
                        constructor() {
                            super("groq", vn);
                        }
                        makeRoute() {
                            return "/openai/v1/chat/completions";
                        }
                    }
                },
                hyperbolic: {
                    "text-to-image": new class extends nn {
                        constructor() {
                            super("hyperbolic", xn);
                        }
                        makeRoute(e) {
                            return "/v1/images/generations";
                        }
                        preparePayload(e) {
                            return {
                                ...ln(e.args, [ "inputs", "parameters" ]),
                                ...e.args.parameters,
                                prompt: e.args.inputs,
                                model_name: e.model
                            };
                        }
                        async getResponse(e, t, n, a) {
                            if ("object" == typeof e && "images" in e && Array.isArray(e.images) && e.images[0] && "string" == typeof e.images[0].image) return "url" === a ? `data:image/jpeg;base64,${e.images[0].image}` : fetch(`data:image/jpeg;base64,${e.images[0].image}`).then((e => e.blob()));
                            throw new en("Expected Hyperbolic text-to-image response format");
                        }
                    },
                    conversational: new class extends an {
                        constructor() {
                            super("hyperbolic", xn);
                        }
                    },
                    "text-generation": new class extends on {
                        constructor() {
                            super("hyperbolic", xn);
                        }
                        makeRoute() {
                            return "v1/chat/completions";
                        }
                        preparePayload(e) {
                            return {
                                messages: [ {
                                    content: e.args.inputs,
                                    role: "user"
                                } ],
                                ...e.args.parameters ? {
                                    max_tokens: e.args.parameters.max_new_tokens,
                                    ...ln(e.args.parameters, "max_new_tokens")
                                } : void 0,
                                ...ln(e.args, [ "inputs", "parameters" ]),
                                model: e.model
                            };
                        }
                        async getResponse(e) {
                            if ("object" == typeof e && "choices" in e && Array.isArray(e?.choices) && "string" == typeof e?.model) return {
                                generated_text: e.choices[0].message.content
                            };
                            throw new en("Expected Hyperbolic text generation response format");
                        }
                    }
                },
                nebius: {
                    "text-to-image": new class extends nn {
                        constructor() {
                            super("nebius", _n);
                        }
                        preparePayload(e) {
                            return {
                                ...ln(e.args, [ "inputs", "parameters" ]),
                                ...e.args.parameters,
                                response_format: "b64_json",
                                prompt: e.args.inputs,
                                model: e.model
                            };
                        }
                        makeRoute() {
                            return "v1/images/generations";
                        }
                        async getResponse(e, t, n, a) {
                            if ("object" == typeof e && "data" in e && Array.isArray(e.data) && e.data.length > 0 && "b64_json" in e.data[0] && "string" == typeof e.data[0].b64_json) {
                                const t = e.data[0].b64_json;
                                return "url" === a ? `data:image/jpeg;base64,${t}` : fetch(`data:image/jpeg;base64,${t}`).then((e => e.blob()));
                            }
                            throw new en("Expected Nebius text-to-image response format");
                        }
                    },
                    conversational: new class extends an {
                        constructor() {
                            super("nebius", _n);
                        }
                    },
                    "text-generation": new class extends on {
                        constructor() {
                            super("nebius", _n);
                        }
                    },
                    "feature-extraction": new class extends nn {
                        constructor() {
                            super("nebius", _n);
                        }
                        preparePayload(e) {
                            return {
                                input: e.args.inputs,
                                model: e.model
                            };
                        }
                        makeRoute() {
                            return "v1/embeddings";
                        }
                        async getResponse(e) {
                            return e.data.map((e => e.embedding));
                        }
                    }
                },
                novita: {
                    conversational: new class extends an {
                        constructor() {
                            super("novita", kn);
                        }
                        makeRoute() {
                            return "/v3/openai/chat/completions";
                        }
                    },
                    "text-generation": new class extends on {
                        constructor() {
                            super("novita", kn);
                        }
                        makeRoute() {
                            return "/v3/openai/chat/completions";
                        }
                    }
                },
                nscale: {
                    "text-to-image": new class extends nn {
                        constructor() {
                            super("nscale", An);
                        }
                        preparePayload(e) {
                            return {
                                ...ln(e.args, [ "inputs", "parameters" ]),
                                ...e.args.parameters,
                                response_format: "b64_json",
                                prompt: e.args.inputs,
                                model: e.model
                            };
                        }
                        makeRoute() {
                            return "v1/images/generations";
                        }
                        async getResponse(e, t, n, a) {
                            if ("object" == typeof e && "data" in e && Array.isArray(e.data) && e.data.length > 0 && "b64_json" in e.data[0] && "string" == typeof e.data[0].b64_json) {
                                const t = e.data[0].b64_json;
                                return "url" === a ? `data:image/jpeg;base64,${t}` : fetch(`data:image/jpeg;base64,${t}`).then((e => e.blob()));
                            }
                            throw new en("Expected Nscale text-to-image response format");
                        }
                    },
                    conversational: new class extends an {
                        constructor() {
                            super("nscale", An);
                        }
                    }
                },
                openai: {
                    conversational: new class extends an {
                        constructor() {
                            super("openai", "https://api.openai.com", !0);
                        }
                    }
                },
                ovhcloud: {
                    conversational: new class extends an {
                        constructor() {
                            super("ovhcloud", Sn);
                        }
                    },
                    "text-generation": new class extends on {
                        constructor() {
                            super("ovhcloud", Sn);
                        }
                        preparePayload(e) {
                            return {
                                model: e.model,
                                ...ln(e.args, [ "inputs", "parameters" ]),
                                ...e.args.parameters ? {
                                    max_tokens: e.args.parameters.max_new_tokens,
                                    ...ln(e.args.parameters, "max_new_tokens")
                                } : void 0,
                                prompt: e.args.inputs
                            };
                        }
                        async getResponse(e) {
                            if ("object" == typeof e && "choices" in e && Array.isArray(e?.choices) && "string" == typeof e?.model) return {
                                generated_text: e.choices[0].text
                            };
                            throw new en("Expected OVHcloud text generation response format");
                        }
                    }
                },
                replicate: {
                    "text-to-image": new class extends Tn {
                        preparePayload(e) {
                            return {
                                input: {
                                    ...ln(e.args, [ "inputs", "parameters" ]),
                                    ...e.args.parameters,
                                    prompt: e.args.inputs,
                                    lora_weights: "lora" === e.mapping?.adapter && e.mapping.adapterWeightsPath ? `https://huggingface.co/${e.mapping.hfModelId}` : void 0
                                },
                                version: e.model.includes(":") ? e.model.split(":")[1] : void 0
                            };
                        }
                        async getResponse(e, t, n, a) {
                            if ("object" == typeof e && "output" in e && Array.isArray(e.output) && e.output.length > 0 && "string" == typeof e.output[0]) {
                                if ("url" === a) return e.output[0];
                                const t = await fetch(e.output[0]);
                                return await t.blob();
                            }
                            throw new en("Expected Replicate text-to-image response format");
                        }
                    },
                    "text-to-speech": new class extends Tn {
                        preparePayload(e) {
                            const t = super.preparePayload(e), n = t.input;
                            if ("object" == typeof n && null !== n && "prompt" in n) {
                                const e = n;
                                e.text = e.prompt, delete e.prompt;
                            }
                            return t;
                        }
                        async getResponse(e) {
                            if (e instanceof Blob) return e;
                            if (e && "object" == typeof e && "output" in e) {
                                if ("string" == typeof e.output) {
                                    const t = await fetch(e.output);
                                    return await t.blob();
                                }
                                if (Array.isArray(e.output)) {
                                    const t = await fetch(e.output[0]);
                                    return await t.blob();
                                }
                            }
                            throw new en("Expected Blob or object with output");
                        }
                    },
                    "text-to-video": new class extends Tn {
                        async getResponse(e) {
                            if ("object" == typeof e && e && "output" in e && "string" == typeof e.output && gn(e.output)) {
                                const t = await fetch(e.output);
                                return await t.blob();
                            }
                            throw new en("Expected { output: string }");
                        }
                    }
                },
                sambanova: {
                    conversational: new class extends an {
                        constructor() {
                            super("sambanova", "https://api.sambanova.ai");
                        }
                    },
                    "feature-extraction": new class extends nn {
                        constructor() {
                            super("sambanova", "https://api.sambanova.ai");
                        }
                        makeRoute() {
                            return "/v1/embeddings";
                        }
                        async getResponse(e) {
                            if ("object" == typeof e && "data" in e && Array.isArray(e.data)) return e.data.map((e => e.embedding));
                            throw new en("Expected Sambanova feature-extraction (embeddings) response format to be {'data' : list of {'embedding' : number[]}}");
                        }
                        preparePayload(e) {
                            return {
                                model: e.model,
                                input: e.args.inputs,
                                ...e.args
                            };
                        }
                    }
                },
                together: {
                    "text-to-image": new class extends nn {
                        constructor() {
                            super("together", In);
                        }
                        makeRoute() {
                            return "v1/images/generations";
                        }
                        preparePayload(e) {
                            return {
                                ...ln(e.args, [ "inputs", "parameters" ]),
                                ...e.args.parameters,
                                prompt: e.args.inputs,
                                response_format: "base64",
                                model: e.model
                            };
                        }
                        async getResponse(e, t) {
                            if ("object" == typeof e && "data" in e && Array.isArray(e.data) && e.data.length > 0 && "b64_json" in e.data[0] && "string" == typeof e.data[0].b64_json) {
                                const n = e.data[0].b64_json;
                                return "url" === t ? `data:image/jpeg;base64,${n}` : fetch(`data:image/jpeg;base64,${n}`).then((e => e.blob()));
                            }
                            throw new en("Expected Together text-to-image response format");
                        }
                    },
                    conversational: new class extends an {
                        constructor() {
                            super("together", In);
                        }
                    },
                    "text-generation": new class extends on {
                        constructor() {
                            super("together", In);
                        }
                        preparePayload(e) {
                            return {
                                model: e.model,
                                ...e.args,
                                prompt: e.args.inputs
                            };
                        }
                        async getResponse(e) {
                            if ("object" == typeof e && "choices" in e && Array.isArray(e?.choices) && "string" == typeof e?.model) return {
                                generated_text: e.choices[0].text
                            };
                            throw new en("Expected Together text generation response format");
                        }
                    }
                }
            };
            function Mn(e, t) {
                if ("hf-inference" === e && !t) return new pn;
                if (!t) throw new Error("you need to provide a task name when using an external provider, e.g. 'text-to-image'");
                if (!(e in En)) throw new Error(`Provider '${e}' not supported. Available providers: ${Object.keys(En)}`);
                const n = En[e];
                if (!n || !(t in n)) throw new Error(`Task '${t}' not supported for provider '${e}'. Available tasks: ${Object.keys(n ?? {})}`);
                return n[t];
            }
            var Ln = null;
            async function Un(e, t, n) {
                const {model: a} = e, i = t.provider, {task: o} = n ?? {};
                if (e.endpointUrl && "hf-inference" !== i) throw new Error("Cannot use endpointUrl with a third-party provider.");
                if (a && gn(a)) throw new Error("Model URLs are no longer supported. Use endpointUrl instead.");
                if (e.endpointUrl) return On(a ?? e.endpointUrl, t, e, void 0, n);
                if (!a && !o) throw new Error("No model provided, and no task has been specified.");
                const r = a ?? await async function(e) {
                    Ln || (Ln = await async function() {
                        const e = await fetch(`${Jt}/api/tasks`);
                        if (!e.ok) throw new Error("Failed to load tasks definitions from Hugging Face Hub.");
                        return await e.json();
                    }());
                    const t = Ln[e];
                    if ((t?.models.length ?? 0) <= 0) throw new Error(`No default model defined for task ${e}, please define the model explicitly.`);
                    return t.models[0].id;
                }(o);
                if (t.clientSideRoutingOnly && !a) throw new Error(`Provider ${i} requires a model ID to be passed directly.`);
                const s = t.clientSideRoutingOnly ? {
                    providerId: $n(a, i),
                    hfModelId: a,
                    status: "live",
                    task: o
                } : await async function(e, t) {
                    if (Zt[e.provider][e.modelId]) return Zt[e.provider][e.modelId];
                    const n = (await mn(e.modelId, e.accessToken, t))[e.provider];
                    if (n) {
                        const t = "hf-inference" === e.provider && sn(cn, e.task) ? cn : [ e.task ];
                        if (!sn(t, n.task)) throw new Error(`Model ${e.modelId} is not supported for task ${e.task} and provider ${e.provider}. Supported task: ${n.task}.`);
                        return n.status, {
                            ...n,
                            hfModelId: e.modelId
                        };
                    }
                    return null;
                }({
                    modelId: r,
                    task: o,
                    provider: i,
                    accessToken: e.accessToken
                }, {
                    fetch: n?.fetch
                });
                if (!s) throw new Error(`We have not been able to find inference provider information for model ${r}.`);
                return On(s.providerId, t, e, s, n);
            }
            function On(e, t, n, a, i) {
                const {accessToken: o, endpointUrl: r, provider: s, model: l, ...c} = n, p = t.provider, {includeCredentials: d, task: u, signal: m, billTo: f} = i ?? {}, h = (() => {
                    if (t.clientSideRoutingOnly) {
                        if (o && o.startsWith("hf_")) throw new Error(`Provider ${p} is closed-source and does not support HF tokens.`);
                        return "provider-key";
                    }
                    return o ? o.startsWith("hf_") ? "hf-token" : "provider-key" : "include" === d ? "credentials-include" : "none";
                })(), g = r ?? e, y = t.makeUrl({
                    authMethod: h,
                    model: g,
                    task: u
                }), b = t.prepareHeaders({
                    accessToken: o,
                    authMethod: h
                }, "data" in n && !!n.data);
                f && (b["X-HF-Bill-To"] = f);
                const w = [ "@huggingface/inference/3.13.1", "undefined" != typeof navigator ? navigator.userAgent : void 0 ].filter((e => void 0 !== e)).join(" ");
                b["User-Agent"] = w;
                const v = t.makeBody({
                    args: c,
                    model: e,
                    task: u,
                    mapping: a
                });
                let x;
                return "string" == typeof d ? x = d : !0 === d && (x = "include"), {
                    url: y,
                    info: {
                        headers: b,
                        method: "POST",
                        body: v,
                        ...x ? {
                            credentials: x
                        } : void 0,
                        signal: m
                    }
                };
            }
            function $n(e, t) {
                if (!e.startsWith(`${t}/`)) throw new Error(`Models from ${t} must be prefixed by "${t}/". Got "${e}".`);
                return e.slice(t.length + 1);
            }
            async function Rn(e, t, n) {
                const {url: a, info: i} = await Un(e, t, n), o = await (n?.fetch ?? fetch)(a, i), r = {
                    url: a,
                    info: i
                };
                if (!1 !== n?.retry_on_error && 503 === o.status) return Rn(e, t, n);
                if (!o.ok) {
                    const t = o.headers.get("Content-Type");
                    if ([ "application/json", "application/problem+json" ].some((e => t?.startsWith(e)))) {
                        const t = await o.json();
                        if ([ 400, 422, 404, 500 ].includes(o.status) && n?.chatCompletion) throw new Error(`Server ${e.model} does not seem to support chat completion. Error: ${JSON.stringify(t.error)}`);
                        throw t.error || t.detail ? new Error(JSON.stringify(t.error ?? t.detail)) : new Error(t);
                    }
                    const a = t?.startsWith("text/plain;") ? await o.text() : void 0;
                    throw new Error(a ?? "An error occurred while fetching the blob");
                }
                return o.headers.get("Content-Type")?.startsWith("application/json") ? {
                    data: await o.json(),
                    requestContext: r
                } : {
                    data: await o.blob(),
                    requestContext: r
                };
            }
            async function* Dn(e, t, n) {
                const {url: a, info: i} = await Un({
                    ...e,
                    stream: !0
                }, t, n), o = await (n?.fetch ?? fetch)(a, i);
                if (!1 !== n?.retry_on_error && 503 === o.status) return yield* Dn(e, t, n);
                if (!o.ok) {
                    if (o.headers.get("Content-Type")?.startsWith("application/json")) {
                        const t = await o.json();
                        if ([ 400, 422, 404, 500 ].includes(o.status) && n?.chatCompletion) throw new Error(`Server ${e.model} does not seem to support chat completion. Error: ${t.error}`);
                        if ("string" == typeof t.error) throw new Error(t.error);
                        if (t.error && "message" in t.error && "string" == typeof t.error.message) throw new Error(t.error.message);
                        if ("string" == typeof t.message) throw new Error(t.message);
                    }
                    throw new Error(`Server response contains error: ${o.status}`);
                }
                if (!o.headers.get("content-type")?.startsWith("text/event-stream")) throw new Error("Server does not support event stream content type, it returned " + o.headers.get("content-type"));
                if (!o.body) return;
                const r = o.body.getReader();
                let s = [];
                const l = function(e) {
                    let t, n, a, i = !1;
                    return function(o) {
                        void 0 === t ? (t = o, n = 0, a = -1) : t = function(e, t) {
                            const n = new Uint8Array(e.length + t.length);
                            return n.set(e), n.set(t, e.length), n;
                        }(t, o);
                        const r = t.length;
                        let s = 0;
                        for (;n < r; ) {
                            i && (10 === t[n] && (s = ++n), i = !1);
                            let o = -1;
                            for (;n < r && -1 === o; ++n) switch (t[n]) {
                              case 58:
                                -1 === a && (a = n - s);
                                break;

                              case 13:
                                i = !0;

                              case 10:
                                o = n;
                            }
                            if (-1 === o) break;
                            e(t.subarray(s, o), a), s = n, a = -1;
                        }
                        s === r ? t = void 0 : 0 !== s && (t = t.subarray(s), n -= s);
                    };
                }(function(e, t, n) {
                    let a = {
                        data: "",
                        event: "",
                        id: "",
                        retry: void 0
                    };
                    const i = new TextDecoder;
                    return function(o, r) {
                        if (0 === o.length) (e => {
                            s.push(e);
                        })?.(a), a = {
                            data: "",
                            event: "",
                            id: "",
                            retry: void 0
                        }; else if (r > 0) {
                            const n = i.decode(o.subarray(0, r)), s = r + (32 === o[r + 1] ? 2 : 1), l = i.decode(o.subarray(s));
                            switch (n) {
                              case "data":
                                a.data = a.data ? a.data + "\n" + l : l;
                                break;

                              case "event":
                                a.event = l;
                                break;

                              case "id":
                                a.id = l;
                                break;

                              case "retry":
                                const n = parseInt(l, 10);
                                isNaN(n) || (a.retry = n);
                            }
                        }
                    };
                }());
                try {
                    for (;;) {
                        const {done: e, value: t} = await r.read();
                        if (e) return;
                        l(t);
                        for (const e of s) if (e.data.length > 0) {
                            if ("[DONE]" === e.data) return;
                            const t = JSON.parse(e.data);
                            if ("object" == typeof t && null !== t && "error" in t) {
                                const e = "string" == typeof t.error ? t.error : "object" == typeof t.error && t.error && "message" in t.error && "string" == typeof t.error.message ? t.error.message : JSON.stringify(t.error);
                                throw new Error("Error forwarded from backend: " + e);
                            }
                            yield t;
                        }
                        s = [];
                    }
                } finally {
                    r.releaseLock();
                }
            }
            async function Nn(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), t?.task);
                return (await Rn(e, n, t)).data;
            }
            async function* qn(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), t?.task);
                yield* Dn(e, n, t);
            }
            function zn(e) {
                return "data" in e ? e : {
                    ...ln(e, "inputs"),
                    data: e.inputs
                };
            }
            async function Bn(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "audio-classification"), a = zn(e), {data: i} = await Rn(a, n, {
                    ...t,
                    task: "audio-classification"
                });
                return n.getResponse(i);
            }
            async function Fn(e, t) {
                const n = "inputs" in e ? e.model : void 0, a = Mn(await fn(e.provider, n), "audio-to-audio"), i = zn(e), {data: o} = await Rn(i, a, {
                    ...t,
                    task: "audio-to-audio"
                });
                return a.getResponse(o);
            }
            async function Qn(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "automatic-speech-recognition"), a = await n.preparePayloadAsync(e), {data: i} = await Rn(a, n, {
                    ...t,
                    task: "automatic-speech-recognition"
                });
                if ("string" != typeof i?.text) throw new en("Expected {text: string}");
                return n.getResponse(i);
            }
            async function Vn(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "text-to-speech"), {data: a} = await Rn(e, n, {
                    ...t,
                    task: "text-to-speech"
                });
                return n.getResponse(a);
            }
            function Hn(e) {
                return "data" in e ? e : {
                    ...ln(e, "inputs"),
                    data: e.inputs
                };
            }
            async function Gn(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "image-classification"), a = Hn(e), {data: i} = await Rn(a, n, {
                    ...t,
                    task: "image-classification"
                });
                return n.getResponse(i);
            }
            async function Wn(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "image-segmentation"), a = Hn(e), {data: i} = await Rn(a, n, {
                    ...t,
                    task: "image-segmentation"
                });
                return n.getResponse(i);
            }
            async function Kn(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "image-to-image"), a = await n.preparePayloadAsync(e), {data: i} = await Rn(a, n, {
                    ...t,
                    task: "image-to-image"
                });
                return n.getResponse(i);
            }
            async function Jn(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "image-to-text"), a = Hn(e), {data: i} = await Rn(a, n, {
                    ...t,
                    task: "image-to-text"
                });
                return n.getResponse(i[0]);
            }
            async function Xn(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "object-detection"), a = Hn(e), {data: i} = await Rn(a, n, {
                    ...t,
                    task: "object-detection"
                });
                return n.getResponse(i);
            }
            async function Yn(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "text-to-image"), {data: a} = await Rn(e, n, {
                    ...t,
                    task: "text-to-image"
                }), {url: i, info: o} = await Un(e, n, {
                    ...t,
                    task: "text-to-image"
                });
                return n.getResponse(a, i, o.headers, t?.outputType);
            }
            async function Zn(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "text-to-video"), {data: a} = await Rn(e, n, {
                    ...t,
                    task: "text-to-video"
                }), {url: i, info: o} = await Un(e, n, {
                    ...t,
                    task: "text-to-video"
                });
                return n.getResponse(a, i, o.headers);
            }
            async function ea(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "zero-shot-image-classification"), a = await async function(e) {
                    return e.inputs instanceof Blob ? {
                        ...e,
                        inputs: {
                            image: rn(new Uint8Array(await e.inputs.arrayBuffer()))
                        }
                    } : {
                        ...e,
                        inputs: {
                            image: rn(new Uint8Array(e.inputs.image instanceof ArrayBuffer ? e.inputs.image : await e.inputs.image.arrayBuffer()))
                        }
                    };
                }(e), {data: i} = await Rn(a, n, {
                    ...t,
                    task: "zero-shot-image-classification"
                });
                return n.getResponse(i);
            }
            async function ta(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "conversational"), {data: a} = await Rn(e, n, {
                    ...t,
                    task: "conversational"
                });
                return n.getResponse(a);
            }
            async function* na(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "conversational");
                yield* Dn(e, n, {
                    ...t,
                    task: "conversational"
                });
            }
            async function aa(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "feature-extraction"), {data: a} = await Rn(e, n, {
                    ...t,
                    task: "feature-extraction"
                });
                return n.getResponse(a);
            }
            async function ia(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "fill-mask"), {data: a} = await Rn(e, n, {
                    ...t,
                    task: "fill-mask"
                });
                return n.getResponse(a);
            }
            async function oa(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "question-answering"), {data: a} = await Rn(e, n, {
                    ...t,
                    task: "question-answering"
                });
                return n.getResponse(a);
            }
            async function ra(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "sentence-similarity"), {data: a} = await Rn(e, n, {
                    ...t,
                    task: "sentence-similarity"
                });
                return n.getResponse(a);
            }
            async function sa(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "summarization"), {data: a} = await Rn(e, n, {
                    ...t,
                    task: "summarization"
                });
                return n.getResponse(a);
            }
            async function la(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "table-question-answering"), {data: a} = await Rn(e, n, {
                    ...t,
                    task: "table-question-answering"
                });
                return n.getResponse(a);
            }
            async function ca(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "text-classification"), {data: a} = await Rn(e, n, {
                    ...t,
                    task: "text-classification"
                });
                return n.getResponse(a);
            }
            async function pa(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "text-generation"), {data: a} = await Rn(e, n, {
                    ...t,
                    task: "text-generation"
                });
                return n.getResponse(a);
            }
            async function* da(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "text-generation");
                yield* Dn(e, n, {
                    ...t,
                    task: "text-generation"
                });
            }
            async function ua(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "token-classification"), {data: a} = await Rn(e, n, {
                    ...t,
                    task: "token-classification"
                });
                return n.getResponse(a);
            }
            async function ma(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "translation"), {data: a} = await Rn(e, n, {
                    ...t,
                    task: "translation"
                });
                return n.getResponse(a);
            }
            async function fa(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "zero-shot-classification"), {data: a} = await Rn(e, n, {
                    ...t,
                    task: "zero-shot-classification"
                });
                return n.getResponse(a);
            }
            async function ha(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "document-question-answering"), a = {
                    ...e,
                    inputs: {
                        question: e.inputs.question,
                        image: rn(new Uint8Array(await e.inputs.image.arrayBuffer()))
                    }
                }, {data: i} = await Rn(a, n, {
                    ...t,
                    task: "document-question-answering"
                });
                return n.getResponse(i);
            }
            async function ga(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "visual-question-answering"), a = {
                    ...e,
                    inputs: {
                        question: e.inputs.question,
                        image: rn(new Uint8Array(await e.inputs.image.arrayBuffer()))
                    }
                }, {data: i} = await Rn(a, n, {
                    ...t,
                    task: "visual-question-answering"
                });
                return n.getResponse(i);
            }
            async function ya(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "tabular-classification"), {data: a} = await Rn(e, n, {
                    ...t,
                    task: "tabular-classification"
                });
                return n.getResponse(a);
            }
            async function ba(e, t) {
                const n = Mn(await fn(e.provider, e.model, e.endpointUrl), "tabular-regression"), {data: a} = await Rn(e, n, {
                    ...t,
                    task: "tabular-regression"
                });
                return n.getResponse(a);
            }
            Wt({}, {
                getInferenceSnippets: () => Ca
            });
            var wa = {
                js: {
                    fetch: {
                        basic: 'async function query(data) {\n\tconst response = await fetch(\n\t\t"{{ fullUrl }}",\n\t\t{\n\t\t\theaders: {\n\t\t\t\tAuthorization: "{{ authorizationHeader }}",\n\t\t\t\t"Content-Type": "application/json",\n{% if billTo %}\n\t\t\t\t"X-HF-Bill-To": "{{ billTo }}",\n{% endif %}\t\t\t},\n\t\t\tmethod: "POST",\n\t\t\tbody: JSON.stringify(data),\n\t\t}\n\t);\n\tconst result = await response.json();\n\treturn result;\n}\n\nquery({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {\n    console.log(JSON.stringify(response));\n});',
                        basicAudio: 'async function query(data) {\n\tconst response = await fetch(\n\t\t"{{ fullUrl }}",\n\t\t{\n\t\t\theaders: {\n\t\t\t\tAuthorization: "{{ authorizationHeader }}",\n\t\t\t\t"Content-Type": "audio/flac",\n{% if billTo %}\n\t\t\t\t"X-HF-Bill-To": "{{ billTo }}",\n{% endif %}\t\t\t},\n\t\t\tmethod: "POST",\n\t\t\tbody: JSON.stringify(data),\n\t\t}\n\t);\n\tconst result = await response.json();\n\treturn result;\n}\n\nquery({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {\n    console.log(JSON.stringify(response));\n});',
                        basicImage: 'async function query(data) {\n\tconst response = await fetch(\n\t\t"{{ fullUrl }}",\n\t\t{\n\t\t\theaders: {\n\t\t\t\tAuthorization: "{{ authorizationHeader }}",\n\t\t\t\t"Content-Type": "image/jpeg",\n{% if billTo %}\n\t\t\t\t"X-HF-Bill-To": "{{ billTo }}",\n{% endif %}\t\t\t},\n\t\t\tmethod: "POST",\n\t\t\tbody: JSON.stringify(data),\n\t\t}\n\t);\n\tconst result = await response.json();\n\treturn result;\n}\n\nquery({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {\n    console.log(JSON.stringify(response));\n});',
                        textToAudio: '{% if model.library_name == "transformers" %}\nasync function query(data) {\n\tconst response = await fetch(\n\t\t"{{ fullUrl }}",\n\t\t{\n\t\t\theaders: {\n\t\t\t\tAuthorization: "{{ authorizationHeader }}",\n\t\t\t\t"Content-Type": "application/json",\n{% if billTo %}\n\t\t\t\t"X-HF-Bill-To": "{{ billTo }}",\n{% endif %}\t\t\t},\n\t\t\tmethod: "POST",\n\t\t\tbody: JSON.stringify(data),\n\t\t}\n\t);\n\tconst result = await response.blob();\n    return result;\n}\n\nquery({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {\n    // Returns a byte object of the Audio wavform. Use it directly!\n});\n{% else %}\nasync function query(data) {\n\tconst response = await fetch(\n\t\t"{{ fullUrl }}",\n\t\t{\n\t\t\theaders: {\n\t\t\t\tAuthorization: "{{ authorizationHeader }}",\n\t\t\t\t"Content-Type": "application/json",\n\t\t\t},\n\t\t\tmethod: "POST",\n\t\t\tbody: JSON.stringify(data),\n\t\t}\n\t);\n    const result = await response.json();\n    return result;\n}\n\nquery({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {\n    console.log(JSON.stringify(response));\n});\n{% endif %} ',
                        textToImage: 'async function query(data) {\n\tconst response = await fetch(\n\t\t"{{ fullUrl }}",\n\t\t{\n\t\t\theaders: {\n\t\t\t\tAuthorization: "{{ authorizationHeader }}",\n\t\t\t\t"Content-Type": "application/json",\n{% if billTo %}\n\t\t\t\t"X-HF-Bill-To": "{{ billTo }}",\n{% endif %}\t\t\t},\n\t\t\tmethod: "POST",\n\t\t\tbody: JSON.stringify(data),\n\t\t}\n\t);\n\tconst result = await response.blob();\n\treturn result;\n}\n\n\nquery({ {{ providerInputs.asTsString }} }).then((response) => {\n    // Use image\n});',
                        textToSpeech: '{% if model.library_name == "transformers" %}\nasync function query(data) {\n\tconst response = await fetch(\n\t\t"{{ fullUrl }}",\n\t\t{\n\t\t\theaders: {\n\t\t\t\tAuthorization: "{{ authorizationHeader }}",\n\t\t\t\t"Content-Type": "application/json",\n{% if billTo %}\n\t\t\t\t"X-HF-Bill-To": "{{ billTo }}",\n{% endif %}\t\t\t},\n\t\t\tmethod: "POST",\n\t\t\tbody: JSON.stringify(data),\n\t\t}\n\t);\n\tconst result = await response.blob();\n    return result;\n}\n\nquery({ text: {{ inputs.asObj.inputs }} }).then((response) => {\n    // Returns a byte object of the Audio wavform. Use it directly!\n});\n{% else %}\nasync function query(data) {\n\tconst response = await fetch(\n\t\t"{{ fullUrl }}",\n\t\t{\n\t\t\theaders: {\n\t\t\t\tAuthorization: "{{ authorizationHeader }}",\n\t\t\t\t"Content-Type": "application/json",\n\t\t\t},\n\t\t\tmethod: "POST",\n\t\t\tbody: JSON.stringify(data),\n\t\t}\n\t);\n    const result = await response.json();\n    return result;\n}\n\nquery({ text: {{ inputs.asObj.inputs }} }).then((response) => {\n    console.log(JSON.stringify(response));\n});\n{% endif %} ',
                        zeroShotClassification: 'async function query(data) {\n    const response = await fetch(\n\t\t"{{ fullUrl }}",\n        {\n            headers: {\n\t\t\t\tAuthorization: "{{ authorizationHeader }}",\n                "Content-Type": "application/json",\n{% if billTo %}\n                "X-HF-Bill-To": "{{ billTo }}",\n{% endif %}         },\n            method: "POST",\n            body: JSON.stringify(data),\n        }\n    );\n    const result = await response.json();\n    return result;\n}\n\nquery({\n    inputs: {{ providerInputs.asObj.inputs }},\n    parameters: { candidate_labels: ["refund", "legal", "faq"] }\n}).then((response) => {\n    console.log(JSON.stringify(response));\n});'
                    },
                    "huggingface.js": {
                        basic: 'import { InferenceClient } from "@huggingface/inference";\n\nconst client = new InferenceClient("{{ accessToken }}");\n\nconst output = await client.{{ methodName }}({\n\tmodel: "{{ model.id }}",\n\tinputs: {{ inputs.asObj.inputs }},\n\tprovider: "{{ provider }}",\n}{% if billTo %}, {\n\tbillTo: "{{ billTo }}",\n}{% endif %});\n\nconsole.log(output);',
                        basicAudio: 'import { InferenceClient } from "@huggingface/inference";\n\nconst client = new InferenceClient("{{ accessToken }}");\n\nconst data = fs.readFileSync({{inputs.asObj.inputs}});\n\nconst output = await client.{{ methodName }}({\n\tdata,\n\tmodel: "{{ model.id }}",\n\tprovider: "{{ provider }}",\n}{% if billTo %}, {\n\tbillTo: "{{ billTo }}",\n}{% endif %});\n\nconsole.log(output);',
                        basicImage: 'import { InferenceClient } from "@huggingface/inference";\n\nconst client = new InferenceClient("{{ accessToken }}");\n\nconst data = fs.readFileSync({{inputs.asObj.inputs}});\n\nconst output = await client.{{ methodName }}({\n\tdata,\n\tmodel: "{{ model.id }}",\n\tprovider: "{{ provider }}",\n}{% if billTo %}, {\n\tbillTo: "{{ billTo }}",\n}{% endif %});\n\nconsole.log(output);',
                        conversational: 'import { InferenceClient } from "@huggingface/inference";\n\nconst client = new InferenceClient("{{ accessToken }}");\n\nconst chatCompletion = await client.chatCompletion({\n    provider: "{{ provider }}",\n    model: "{{ model.id }}",\n{{ inputs.asTsString }}\n}{% if billTo %}, {\n    billTo: "{{ billTo }}",\n}{% endif %});\n\nconsole.log(chatCompletion.choices[0].message);',
                        conversationalStream: 'import { InferenceClient } from "@huggingface/inference";\n\nconst client = new InferenceClient("{{ accessToken }}");\n\nlet out = "";\n\nconst stream = client.chatCompletionStream({\n    provider: "{{ provider }}",\n    model: "{{ model.id }}",\n{{ inputs.asTsString }}\n}{% if billTo %}, {\n    billTo: "{{ billTo }}",\n}{% endif %});\n\nfor await (const chunk of stream) {\n\tif (chunk.choices && chunk.choices.length > 0) {\n\t\tconst newContent = chunk.choices[0].delta.content;\n\t\tout += newContent;\n\t\tconsole.log(newContent);\n\t}\n}',
                        textToImage: 'import { InferenceClient } from "@huggingface/inference";\n\nconst client = new InferenceClient("{{ accessToken }}");\n\nconst image = await client.textToImage({\n    provider: "{{ provider }}",\n    model: "{{ model.id }}",\n\tinputs: {{ inputs.asObj.inputs }},\n\tparameters: { num_inference_steps: 5 },\n}{% if billTo %}, {\n    billTo: "{{ billTo }}",\n}{% endif %});\n/// Use the generated image (it\'s a Blob)',
                        textToSpeech: 'import { InferenceClient } from "@huggingface/inference";\n\nconst client = new InferenceClient("{{ accessToken }}");\n\nconst audio = await client.textToSpeech({\n    provider: "{{ provider }}",\n    model: "{{ model.id }}",\n\tinputs: {{ inputs.asObj.inputs }},\n}{% if billTo %}, {\n    billTo: "{{ billTo }}",\n}{% endif %});\n// Use the generated audio (it\'s a Blob)',
                        textToVideo: 'import { InferenceClient } from "@huggingface/inference";\n\nconst client = new InferenceClient("{{ accessToken }}");\n\nconst video = await client.textToVideo({\n    provider: "{{ provider }}",\n    model: "{{ model.id }}",\n\tinputs: {{ inputs.asObj.inputs }},\n}{% if billTo %}, {\n    billTo: "{{ billTo }}",\n}{% endif %});\n// Use the generated video (it\'s a Blob)'
                    },
                    openai: {
                        conversational: 'import { OpenAI } from "openai";\n\nconst client = new OpenAI({\n\tbaseURL: "{{ baseUrl }}",\n\tapiKey: "{{ accessToken }}",\n{% if billTo %}\n\tdefaultHeaders: {\n\t\t"X-HF-Bill-To": "{{ billTo }}" \n\t}\n{% endif %}\n});\n\nconst chatCompletion = await client.chat.completions.create({\n\tmodel: "{{ providerModelId }}",\n{{ inputs.asTsString }}\n});\n\nconsole.log(chatCompletion.choices[0].message);',
                        conversationalStream: 'import { OpenAI } from "openai";\n\nconst client = new OpenAI({\n\tbaseURL: "{{ baseUrl }}",\n\tapiKey: "{{ accessToken }}",\n{% if billTo %}\n    defaultHeaders: {\n\t\t"X-HF-Bill-To": "{{ billTo }}" \n\t}\n{% endif %}\n});\n\nconst stream = await client.chat.completions.create({\n    model: "{{ providerModelId }}",\n{{ inputs.asTsString }}\n    stream: true,\n});\n\nfor await (const chunk of stream) {\n    process.stdout.write(chunk.choices[0]?.delta?.content || "");\n}'
                    }
                },
                python: {
                    fal_client: {
                        textToImage: '{% if provider == "fal-ai" %}\nimport fal_client\n\n{% if providerInputs.asObj.loras is defined and providerInputs.asObj.loras != none %}\nresult = fal_client.subscribe(\n    "{{ providerModelId }}",\n    arguments={\n        "prompt": {{ inputs.asObj.inputs }},\n        "loras":{{ providerInputs.asObj.loras | tojson }},\n    },\n)\n{% else %}\nresult = fal_client.subscribe(\n    "{{ providerModelId }}",\n    arguments={\n        "prompt": {{ inputs.asObj.inputs }},\n    },\n)\n{% endif %} \nprint(result)\n{% endif %} '
                    },
                    huggingface_hub: {
                        basic: 'result = client.{{ methodName }}(\n    {{ inputs.asObj.inputs }},\n    model="{{ model.id }}",\n)',
                        basicAudio: 'output = client.{{ methodName }}({{ inputs.asObj.inputs }}, model="{{ model.id }}")',
                        basicImage: 'output = client.{{ methodName }}({{ inputs.asObj.inputs }}, model="{{ model.id }}")',
                        conversational: 'completion = client.chat.completions.create(\n    model="{{ model.id }}",\n{{ inputs.asPythonString }}\n)\n\nprint(completion.choices[0].message) ',
                        conversationalStream: 'stream = client.chat.completions.create(\n    model="{{ model.id }}",\n{{ inputs.asPythonString }}\n    stream=True,\n)\n\nfor chunk in stream:\n    print(chunk.choices[0].delta.content, end="") ',
                        documentQuestionAnswering: 'output = client.document_question_answering(\n    "{{ inputs.asObj.image }}",\n    question="{{ inputs.asObj.question }}",\n    model="{{ model.id }}",\n) ',
                        imageToImage: '# output is a PIL.Image object\nimage = client.image_to_image(\n    "{{ inputs.asObj.inputs }}",\n    prompt="{{ inputs.asObj.parameters.prompt }}",\n    model="{{ model.id }}",\n) ',
                        importInferenceClient: 'from huggingface_hub import InferenceClient\n\nclient = InferenceClient(\n    provider="{{ provider }}",\n    api_key="{{ accessToken }}",\n{% if billTo %}\n    bill_to="{{ billTo }}",\n{% endif %}\n)',
                        questionAnswering: 'answer = client.question_answering(\n    question="{{ inputs.asObj.question }}",\n    context="{{ inputs.asObj.context }}",\n    model="{{ model.id }}",\n) ',
                        tableQuestionAnswering: 'answer = client.question_answering(\n    query="{{ inputs.asObj.query }}",\n    table={{ inputs.asObj.table }},\n    model="{{ model.id }}",\n) ',
                        textToImage: '# output is a PIL.Image object\nimage = client.text_to_image(\n    {{ inputs.asObj.inputs }},\n    model="{{ model.id }}",\n) ',
                        textToSpeech: '# audio is returned as bytes\naudio = client.text_to_speech(\n    {{ inputs.asObj.inputs }},\n    model="{{ model.id }}",\n) \n',
                        textToVideo: 'video = client.text_to_video(\n    {{ inputs.asObj.inputs }},\n    model="{{ model.id }}",\n) '
                    },
                    openai: {
                        conversational: 'from openai import OpenAI\n\nclient = OpenAI(\n    base_url="{{ baseUrl }}",\n    api_key="{{ accessToken }}",\n{% if billTo %}\n    default_headers={\n        "X-HF-Bill-To": "{{ billTo }}"\n    }\n{% endif %}\n)\n\ncompletion = client.chat.completions.create(\n    model="{{ providerModelId }}",\n{{ inputs.asPythonString }}\n)\n\nprint(completion.choices[0].message) ',
                        conversationalStream: 'from openai import OpenAI\n\nclient = OpenAI(\n    base_url="{{ baseUrl }}",\n    api_key="{{ accessToken }}",\n{% if billTo %}\n    default_headers={\n        "X-HF-Bill-To": "{{ billTo }}"\n    }\n{% endif %}\n)\n\nstream = client.chat.completions.create(\n    model="{{ providerModelId }}",\n{{ inputs.asPythonString }}\n    stream=True,\n)\n\nfor chunk in stream:\n    print(chunk.choices[0].delta.content, end="")'
                    },
                    requests: {
                        basic: 'def query(payload):\n    response = requests.post(API_URL, headers=headers, json=payload)\n    return response.json()\n\noutput = query({\n    "inputs": {{ providerInputs.asObj.inputs }},\n}) ',
                        basicAudio: 'def query(filename):\n    with open(filename, "rb") as f:\n        data = f.read()\n    response = requests.post(API_URL, headers={"Content-Type": "audio/flac", **headers}, data=data)\n    return response.json()\n\noutput = query({{ providerInputs.asObj.inputs }})',
                        basicImage: 'def query(filename):\n    with open(filename, "rb") as f:\n        data = f.read()\n    response = requests.post(API_URL, headers={"Content-Type": "image/jpeg", **headers}, data=data)\n    return response.json()\n\noutput = query({{ providerInputs.asObj.inputs }})',
                        conversational: 'def query(payload):\n    response = requests.post(API_URL, headers=headers, json=payload)\n    return response.json()\n\nresponse = query({\n{{ providerInputs.asJsonString }}\n})\n\nprint(response["choices"][0]["message"])',
                        conversationalStream: 'def query(payload):\n    response = requests.post(API_URL, headers=headers, json=payload, stream=True)\n    for line in response.iter_lines():\n        if not line.startswith(b"data:"):\n            continue\n        if line.strip() == b"data: [DONE]":\n            return\n        yield json.loads(line.decode("utf-8").lstrip("data:").rstrip("/n"))\n\nchunks = query({\n{{ providerInputs.asJsonString }},\n    "stream": True,\n})\n\nfor chunk in chunks:\n    print(chunk["choices"][0]["delta"]["content"], end="")',
                        documentQuestionAnswering: 'def query(payload):\n    with open(payload["image"], "rb") as f:\n        img = f.read()\n        payload["image"] = base64.b64encode(img).decode("utf-8")\n    response = requests.post(API_URL, headers=headers, json=payload)\n    return response.json()\n\noutput = query({\n    "inputs": {\n        "image": "{{ inputs.asObj.image }}",\n        "question": "{{ inputs.asObj.question }}",\n    },\n}) ',
                        imageToImage: 'def query(payload):\n    with open(payload["inputs"], "rb") as f:\n        img = f.read()\n        payload["inputs"] = base64.b64encode(img).decode("utf-8")\n    response = requests.post(API_URL, headers=headers, json=payload)\n    return response.content\n\nimage_bytes = query({\n{{ providerInputs.asJsonString }}\n})\n\n# You can access the image with PIL.Image for example\nimport io\nfrom PIL import Image\nimage = Image.open(io.BytesIO(image_bytes)) ',
                        importRequests: '{% if importBase64 %}\nimport base64\n{% endif %}\n{% if importJson %}\nimport json\n{% endif %}\nimport requests\n\nAPI_URL = "{{ fullUrl }}"\nheaders = {\n    "Authorization": "{{ authorizationHeader }}",\n{% if billTo %}\n    "X-HF-Bill-To": "{{ billTo }}"\n{% endif %}\n}',
                        tabular: 'def query(payload):\n    response = requests.post(API_URL, headers=headers, json=payload)\n    return response.content\n\nresponse = query({\n    "inputs": {\n        "data": {{ providerInputs.asObj.inputs }}\n    },\n}) ',
                        textToAudio: '{% if model.library_name == "transformers" %}\ndef query(payload):\n    response = requests.post(API_URL, headers=headers, json=payload)\n    return response.content\n\naudio_bytes = query({\n    "inputs": {{ inputs.asObj.inputs }},\n})\n# You can access the audio with IPython.display for example\nfrom IPython.display import Audio\nAudio(audio_bytes)\n{% else %}\ndef query(payload):\n    response = requests.post(API_URL, headers=headers, json=payload)\n    return response.json()\n\naudio, sampling_rate = query({\n    "inputs": {{ inputs.asObj.inputs }},\n})\n# You can access the audio with IPython.display for example\nfrom IPython.display import Audio\nAudio(audio, rate=sampling_rate)\n{% endif %} ',
                        textToImage: '{% if provider == "hf-inference" %}\ndef query(payload):\n    response = requests.post(API_URL, headers=headers, json=payload)\n    return response.content\n\nimage_bytes = query({\n    "inputs": {{ providerInputs.asObj.inputs }},\n})\n\n# You can access the image with PIL.Image for example\nimport io\nfrom PIL import Image\nimage = Image.open(io.BytesIO(image_bytes))\n{% endif %}',
                        textToSpeech: '{% if model.library_name == "transformers" %}\ndef query(payload):\n    response = requests.post(API_URL, headers=headers, json=payload)\n    return response.content\n\naudio_bytes = query({\n    "text": {{ inputs.asObj.inputs }},\n})\n# You can access the audio with IPython.display for example\nfrom IPython.display import Audio\nAudio(audio_bytes)\n{% else %}\ndef query(payload):\n    response = requests.post(API_URL, headers=headers, json=payload)\n    return response.json()\n\naudio, sampling_rate = query({\n    "text": {{ inputs.asObj.inputs }},\n})\n# You can access the audio with IPython.display for example\nfrom IPython.display import Audio\nAudio(audio, rate=sampling_rate)\n{% endif %} ',
                        zeroShotClassification: 'def query(payload):\n    response = requests.post(API_URL, headers=headers, json=payload)\n    return response.json()\n\noutput = query({\n    "inputs": {{ providerInputs.asObj.inputs }},\n    "parameters": {"candidate_labels": ["refund", "legal", "faq"]},\n}) ',
                        zeroShotImageClassification: 'def query(data):\n    with open(data["image_path"], "rb") as f:\n        img = f.read()\n    payload={\n        "parameters": data["parameters"],\n        "inputs": base64.b64encode(img).decode("utf-8")\n    }\n    response = requests.post(API_URL, headers=headers, json=payload)\n    return response.json()\n\noutput = query({\n    "image_path": {{ providerInputs.asObj.inputs }},\n    "parameters": {"candidate_labels": ["cat", "dog", "llama"]},\n}) '
                    }
                },
                sh: {
                    curl: {
                        basic: "curl {{ fullUrl }} \\\n    -X POST \\\n    -H 'Authorization: {{ authorizationHeader }}' \\\n    -H 'Content-Type: application/json' \\\n{% if billTo %}\n    -H 'X-HF-Bill-To: {{ billTo }}' \\\n{% endif %}\n    -d '{\n{{ providerInputs.asCurlString }}\n    }'",
                        basicAudio: "curl {{ fullUrl }} \\\n    -X POST \\\n    -H 'Authorization: {{ authorizationHeader }}' \\\n    -H 'Content-Type: audio/flac' \\\n{% if billTo %}\n    -H 'X-HF-Bill-To: {{ billTo }}' \\\n{% endif %}\n    --data-binary @{{ providerInputs.asObj.inputs }}",
                        basicImage: "curl {{ fullUrl }} \\\n    -X POST \\\n    -H 'Authorization: {{ authorizationHeader }}' \\\n    -H 'Content-Type: image/jpeg' \\\n{% if billTo %}\n    -H 'X-HF-Bill-To: {{ billTo }}' \\\n{% endif %}\n    --data-binary @{{ providerInputs.asObj.inputs }}",
                        conversational: "curl {{ fullUrl }} \\\n    -H 'Authorization: {{ authorizationHeader }}' \\\n    -H 'Content-Type: application/json' \\\n{% if billTo %}\n    -H 'X-HF-Bill-To: {{ billTo }}' \\\n{% endif %}\n    -d '{\n{{ providerInputs.asCurlString }},\n        \"stream\": false\n    }'",
                        conversationalStream: "curl {{ fullUrl }} \\\n    -H 'Authorization: {{ authorizationHeader }}' \\\n    -H 'Content-Type: application/json' \\\n{% if billTo %}\n    -H 'X-HF-Bill-To: {{ billTo }}' \\\n{% endif %}\n    -d '{\n{{ providerInputs.asCurlString }},\n        \"stream\": true\n    }'",
                        zeroShotClassification: 'curl {{ fullUrl }} \\\n    -X POST \\\n    -d \'{"inputs": {{ providerInputs.asObj.inputs }}, "parameters": {"candidate_labels": ["refund", "legal", "faq"]}}\' \\\n    -H \'Content-Type: application/json\' \\\n    -H \'Authorization: {{ authorizationHeader }}\'\n{% if billTo %} \\\n    -H \'X-HF-Bill-To: {{ billTo }}\'\n{% endif %}'
                    }
                }
            }, va = {
                js: [ "fetch", "huggingface.js", "openai" ],
                python: [ "huggingface_hub", "fal_client", "requests", "openai" ],
                sh: [ "curl" ]
            }, xa = {
                js: [ "huggingface.js" ],
                python: [ "huggingface_hub" ]
            }, _a = (e, t, n) => {
                const a = wa[e]?.[t]?.[n];
                if (!a) throw new Error(`Template not found: ${e}/${t}/${n}`);
                return e => new class {
                    parsed;
                    constructor(e) {
                        const t = function(e, t = {}) {
                            const n = [], a = function(e, t = {}) {
                                return e.endsWith("\n") && (e = e.slice(0, -1)), t.lstrip_blocks && (e = e.replace(/^[ \t]*({[#%-])/gm, "$1")), 
                                t.trim_blocks && (e = e.replace(/([#%-]})\n/g, "$1")), e.replace(/{%\s*(end)?generation\s*%}/gs, "");
                            }(e, t);
                            let d = 0, u = 0;
                            const m = e => {
                                let t = "";
                                for (;e(a[d]); ) if ("\\" !== a[d]) {
                                    if (t += a[d++], d >= a.length) throw new SyntaxError("Unexpected end of input");
                                } else {
                                    if (++d, d >= a.length) throw new SyntaxError("Unexpected end of input");
                                    const e = a[d++], n = p.get(e);
                                    if (void 0 === n) throw new SyntaxError(`Unexpected escaped character: ${e}`);
                                    t += n;
                                }
                                return t;
                            }, f = () => {
                                const e = n.at(-1);
                                e && e.type === i.Text && (e.value = e.value.trimEnd(), "" === e.value && n.pop());
                            }, h = () => {
                                for (;d < a.length && l(a[d]); ) ++d;
                            };
                            e: for (;d < a.length; ) {
                                const e = n.at(-1)?.type;
                                if (void 0 === e || e === i.CloseStatement || e === i.CloseExpression || e === i.Comment) {
                                    let e = "";
                                    for (;d < a.length && ("{" !== a[d] || "%" !== a[d + 1] && "{" !== a[d + 1] && "#" !== a[d + 1]); ) e += a[d++];
                                    if (e.length > 0) {
                                        n.push(new o(e, i.Text));
                                        continue;
                                    }
                                }
                                if ("{" === a[d] && "#" === a[d + 1]) {
                                    d += 2;
                                    const e = "-" === a[d];
                                    e && ++d;
                                    let t = "";
                                    for (;"#" !== a[d] || "}" !== a[d + 1]; ) {
                                        if (d + 2 >= a.length) throw new SyntaxError("Missing end of comment tag");
                                        t += a[d++];
                                    }
                                    const r = t.endsWith("-");
                                    r && (t = t.slice(0, -1)), e && f(), n.push(new o(t, i.Comment)), d += 2, r && h();
                                    continue;
                                }
                                if ("{%-" === a.slice(d, d + 3)) {
                                    f(), n.push(new o("{%", i.OpenStatement)), d += 3;
                                    continue;
                                }
                                if ("{{-" === a.slice(d, d + 3)) {
                                    f(), n.push(new o("{{", i.OpenExpression)), u = 0, d += 3;
                                    continue;
                                }
                                if (m(l), "-%}" === a.slice(d, d + 3)) {
                                    n.push(new o("%}", i.CloseStatement)), d += 3, h();
                                    continue;
                                }
                                if ("-}}" === a.slice(d, d + 3)) {
                                    n.push(new o("}}", i.CloseExpression)), d += 3, h();
                                    continue;
                                }
                                const t = a[d];
                                if ("-" === t || "+" === t) {
                                    const e = n.at(-1)?.type;
                                    if (e === i.Text || void 0 === e) throw new SyntaxError(`Unexpected character: ${t}`);
                                    switch (e) {
                                      case i.Identifier:
                                      case i.NumericLiteral:
                                      case i.StringLiteral:
                                      case i.CloseParen:
                                      case i.CloseSquareBracket:
                                        break;

                                      default:
                                        {
                                            ++d;
                                            const e = m(s);
                                            n.push(new o(`${t}${e}`, e.length > 0 ? i.NumericLiteral : i.UnaryOperator));
                                            continue;
                                        }
                                    }
                                }
                                for (const [e, t] of c) if (!("}}" === e && u > 0) && a.slice(d, d + e.length) === e) {
                                    n.push(new o(e, t)), t === i.OpenExpression ? u = 0 : t === i.OpenCurlyBracket ? ++u : t === i.CloseCurlyBracket && --u, 
                                    d += e.length;
                                    continue e;
                                }
                                if ("'" !== t && '"' !== t) if (s(t)) {
                                    let e = m(s);
                                    "." === a[d] && s(a[d + 1]) && (++d, e = `${e}.${m(s)}`), n.push(new o(e, i.NumericLiteral));
                                } else {
                                    if (!r(t)) throw new SyntaxError(`Unexpected character: ${t}`);
                                    {
                                        const e = m(r);
                                        n.push(new o(e, i.Identifier));
                                    }
                                } else {
                                    ++d;
                                    const e = m((e => e !== t));
                                    n.push(new o(e, i.StringLiteral)), ++d;
                                }
                            }
                            return n;
                        }(e, {
                            lstrip_blocks: !0,
                            trim_blocks: !0
                        });
                        this.parsed = B(t);
                    }
                    render(e) {
                        const t = new ce;
                        if (function(e) {
                            e.set("false", !1), e.set("true", !0), e.set("none", null), e.set("raise_exception", (e => {
                                throw new Error(e);
                            })), e.set("range", F), e.set("strftime_now", V), e.set("True", !0), e.set("False", !1), 
                            e.set("None", null);
                        }(t), e) for (const [n, a] of Object.entries(e)) t.set(n, a);
                        return new class {
                            global;
                            constructor(e) {
                                this.global = e ?? new ce;
                            }
                            run(e) {
                                return this.evaluate(e, this.global);
                            }
                            evaluateBinaryExpression(e, t) {
                                const n = this.evaluate(e.left, t);
                                switch (e.operator.value) {
                                  case "and":
                                    return n.__bool__().value ? this.evaluate(e.right, t) : n;

                                  case "or":
                                    return n.__bool__().value ? n : this.evaluate(e.right, t);
                                }
                                const a = this.evaluate(e.right, t);
                                switch (e.operator.value) {
                                  case "==":
                                    return new Y(n.value == a.value);

                                  case "!=":
                                    return new Y(n.value != a.value);
                                }
                                if (n instanceof le || a instanceof le) {
                                    if (a instanceof le && [ "in", "not in" ].includes(e.operator.value)) return new Y("not in" === e.operator.value);
                                    throw new Error(`Cannot perform operation ${e.operator.value} on undefined values`);
                                }
                                if (n instanceof se || a instanceof se) throw new Error("Cannot perform operation on null values");
                                if ("~" === e.operator.value) return new X(n.value.toString() + a.value.toString());
                                if ((n instanceof K || n instanceof J) && (a instanceof K || a instanceof J)) {
                                    const t = n.value, i = a.value;
                                    switch (e.operator.value) {
                                      case "+":
                                      case "-":
                                      case "*":
                                        {
                                            const o = "+" === e.operator.value ? t + i : "-" === e.operator.value ? t - i : t * i;
                                            return n instanceof J || a instanceof J ? new J(o) : new K(o);
                                        }

                                      case "/":
                                        return new J(t / i);

                                      case "%":
                                        {
                                            const e = t % i;
                                            return n instanceof J || a instanceof J ? new J(e) : new K(e);
                                        }

                                      case "<":
                                        return new Y(t < i);

                                      case ">":
                                        return new Y(t > i);

                                      case ">=":
                                        return new Y(t >= i);

                                      case "<=":
                                        return new Y(t <= i);
                                    }
                                } else if (n instanceof ie && a instanceof ie) {
                                    if ("+" === e.operator.value) return new ie(n.value.concat(a.value));
                                } else if (a instanceof ie) {
                                    const t = void 0 !== a.value.find((e => e.value === n.value));
                                    switch (e.operator.value) {
                                      case "in":
                                        return new Y(t);

                                      case "not in":
                                        return new Y(!t);
                                    }
                                }
                                if ((n instanceof X || a instanceof X) && "+" === e.operator.value) return new X(n.value.toString() + a.value.toString());
                                if (n instanceof X && a instanceof X) switch (e.operator.value) {
                                  case "in":
                                    return new Y(a.value.includes(n.value));

                                  case "not in":
                                    return new Y(!a.value.includes(n.value));
                                }
                                if (n instanceof X && a instanceof ne) switch (e.operator.value) {
                                  case "in":
                                    return new Y(a.value.has(n.value));

                                  case "not in":
                                    return new Y(!a.value.has(n.value));
                                }
                                throw new SyntaxError(`Unknown operator "${e.operator.value}" between ${n.type} and ${a.type}`);
                            }
                            evaluateArguments(e, t) {
                                const n = [], a = new Map;
                                for (const i of e) if ("SpreadExpression" === i.type) {
                                    const e = i, a = this.evaluate(e.argument, t);
                                    if (!(a instanceof ie)) throw new Error(`Cannot unpack non-iterable type: ${a.type}`);
                                    for (const e of a.value) n.push(e);
                                } else if ("KeywordArgumentExpression" === i.type) {
                                    const e = i;
                                    a.set(e.key.value, this.evaluate(e.value, t));
                                } else {
                                    if (a.size > 0) throw new Error("Positional arguments must come before keyword arguments");
                                    n.push(this.evaluate(i, t));
                                }
                                return [ n, a ];
                            }
                            applyFilter(e, t, n) {
                                if ("Identifier" === t.type) {
                                    const a = t;
                                    if ("safe" === a.value) return e;
                                    if ("tojson" === a.value) return new X(te(e, {}));
                                    if (e instanceof ie) switch (a.value) {
                                      case "list":
                                        return e;

                                      case "first":
                                        return e.value[0];

                                      case "last":
                                        return e.value[e.value.length - 1];

                                      case "length":
                                        return new K(e.value.length);

                                      case "reverse":
                                        return new ie(e.value.slice().reverse());

                                      case "sort":
                                        return new ie(e.value.slice().sort(((e, t) => de(e, t, !1))));

                                      case "join":
                                        return new X(e.value.map((e => e.value)).join(""));

                                      case "string":
                                        return new X(te(e, {}, 0, !1));

                                      case "unique":
                                        {
                                            const t = new Set, n = [];
                                            for (const a of e.value) t.has(a.value) || (t.add(a.value), n.push(a));
                                            return new ie(n);
                                        }

                                      default:
                                        throw new Error(`Unknown ArrayValue filter: ${a.value}`);
                                    } else if (e instanceof X) switch (a.value) {
                                      case "length":
                                      case "upper":
                                      case "lower":
                                      case "title":
                                      case "capitalize":
                                        {
                                            const t = e.builtins.get(a.value);
                                            if (t instanceof re) return t.value([], n);
                                            if (t instanceof K) return t;
                                            throw new Error(`Unknown StringValue filter: ${a.value}`);
                                        }

                                      case "trim":
                                        return new X(e.value.trim());

                                      case "indent":
                                        return new X(e.value.split("\n").map(((e, t) => 0 === t || 0 === e.length ? e : "    " + e)).join("\n"));

                                      case "join":
                                      case "string":
                                        return e;

                                      case "int":
                                        {
                                            const t = parseInt(e.value, 10);
                                            return new K(isNaN(t) ? 0 : t);
                                        }

                                      case "float":
                                        {
                                            const t = parseFloat(e.value);
                                            return new J(isNaN(t) ? 0 : t);
                                        }

                                      default:
                                        throw new Error(`Unknown StringValue filter: ${a.value}`);
                                    } else if (e instanceof K || e instanceof J) switch (a.value) {
                                      case "abs":
                                        return e instanceof K ? new K(Math.abs(e.value)) : new J(Math.abs(e.value));

                                      case "int":
                                        return new K(Math.floor(e.value));

                                      case "float":
                                        return new J(e.value);

                                      case "string":
                                        return new X(e.toString());

                                      default:
                                        throw new Error(`Unknown NumericValue filter: ${a.value}`);
                                    } else if (e instanceof ne) switch (a.value) {
                                      case "items":
                                        return new ie(Array.from(e.value.entries()).map((([e, t]) => new ie([ new X(e), t ]))));

                                      case "length":
                                        return new K(e.value.size);

                                      default:
                                        {
                                            const t = e.builtins.get(a.value);
                                            if (t) return t instanceof re ? t.value([], n) : t;
                                            throw new Error(`Unknown ObjectValue filter: ${a.value}`);
                                        }
                                    } else if (e instanceof Y) switch (a.value) {
                                      case "bool":
                                        return new Y(e.value);

                                      case "int":
                                        return new K(e.value ? 1 : 0);

                                      case "float":
                                        return new J(e.value ? 1 : 0);

                                      case "string":
                                        return new X(e.value ? "true" : "false");

                                      default:
                                        throw new Error(`Unknown BooleanValue filter: ${a.value}`);
                                    }
                                    throw new Error(`Cannot apply filter "${a.value}" to type: ${e.type}`);
                                }
                                if ("CallExpression" === t.type) {
                                    const a = t;
                                    if ("Identifier" !== a.callee.type) throw new Error(`Unknown filter: ${a.callee.type}`);
                                    const i = a.callee.value;
                                    if ("tojson" === i) {
                                        const [, t] = this.evaluateArguments(a.args, n), i = t.get("indent") ?? new se;
                                        if (!(i instanceof K || i instanceof se)) throw new Error("If set, indent must be a number");
                                        const o = t.get("ensure_ascii") ?? new Y(!1);
                                        if (!(o instanceof Y)) throw new Error("If set, ensure_ascii must be a boolean");
                                        const r = t.get("sort_keys") ?? new Y(!1);
                                        if (!(r instanceof Y)) throw new Error("If set, sort_keys must be a boolean");
                                        const s = t.get("separators") ?? new se;
                                        let l = null;
                                        if (s instanceof ie || s instanceof oe) {
                                            if (2 !== s.value.length) throw new Error("separators must be a tuple of two strings");
                                            const [e, t] = s.value;
                                            if (!(e instanceof X && t instanceof X)) throw new Error("separators must be a tuple of two strings");
                                            l = [ e.value, t.value ];
                                        } else if (!(s instanceof se)) throw new Error("If set, separators must be a tuple of two strings");
                                        return new X(te(e, {
                                            indent: i.value,
                                            ensureAscii: o.value,
                                            sortKeys: r.value,
                                            separators: l
                                        }));
                                    }
                                    if ("join" === i) {
                                        let t;
                                        if (e instanceof X) t = Array.from(e.value); else {
                                            if (!(e instanceof ie)) throw new Error(`Cannot apply filter "${i}" to type: ${e.type}`);
                                            t = e.value.map((e => e.value));
                                        }
                                        const [o, r] = this.evaluateArguments(a.args, n), s = o.at(0) ?? r.get("separator") ?? new X("");
                                        if (!(s instanceof X)) throw new Error("separator must be a string");
                                        return new X(t.join(s.value));
                                    }
                                    if ("int" === i || "float" === i) {
                                        const [t, o] = this.evaluateArguments(a.args, n), r = t.at(0) ?? o.get("default") ?? ("int" === i ? new K(0) : new J(0));
                                        if (e instanceof X) {
                                            const t = "int" === i ? parseInt(e.value, 10) : parseFloat(e.value);
                                            return isNaN(t) ? r : "int" === i ? new K(t) : new J(t);
                                        }
                                        if (e instanceof K || e instanceof J) return e;
                                        if (e instanceof Y) return "int" === i ? new K(e.value ? 1 : 0) : new J(e.value ? 1 : 0);
                                        throw new Error(`Cannot apply filter "${i}" to type: ${e.type}`);
                                    }
                                    if ("default" === i) {
                                        const [t, i] = this.evaluateArguments(a.args, n), o = t[0] ?? new X(""), r = t[1] ?? i.get("boolean") ?? new Y(!1);
                                        if (!(r instanceof Y)) throw new Error("`default` filter flag must be a boolean");
                                        return e instanceof le || r.value && !e.__bool__().value ? o : e;
                                    }
                                    if (e instanceof ie) {
                                        switch (i) {
                                          case "sort":
                                            {
                                                const [t, i] = this.evaluateArguments(a.args, n), o = t.at(0) ?? i.get("reverse") ?? new Y(!1);
                                                if (!(o instanceof Y)) throw new Error("reverse must be a boolean");
                                                const r = t.at(1) ?? i.get("case_sensitive") ?? new Y(!1);
                                                if (!(r instanceof Y)) throw new Error("case_sensitive must be a boolean");
                                                const s = t.at(2) ?? i.get("attribute") ?? new se;
                                                if (!(s instanceof X || s instanceof K || s instanceof se)) throw new Error("attribute must be a string, integer, or null");
                                                const l = e => s instanceof se ? e : pe(e, s instanceof K ? String(s.value) : s.value);
                                                return new ie(e.value.slice().sort(((e, t) => {
                                                    const n = de(l(e), l(t), r.value);
                                                    return o.value ? -n : n;
                                                })));
                                            }

                                          case "selectattr":
                                          case "rejectattr":
                                            {
                                                const t = "selectattr" === i;
                                                if (e.value.some((e => !(e instanceof ne)))) throw new Error(`\`${i}\` can only be applied to array of objects`);
                                                if (a.args.some((e => "StringLiteral" !== e.type))) throw new Error(`arguments of \`${i}\` must be strings`);
                                                const [o, r, s] = a.args.map((e => this.evaluate(e, n)));
                                                let l;
                                                if (r) {
                                                    const e = n.tests.get(r.value);
                                                    if (!e) throw new Error(`Unknown test: ${r.value}`);
                                                    l = e;
                                                } else l = (...e) => e[0].__bool__().value;
                                                const c = e.value.filter((e => {
                                                    const n = e.value.get(o.value), a = !!n && l(n, s);
                                                    return t ? a : !a;
                                                }));
                                                return new ie(c);
                                            }

                                          case "map":
                                            {
                                                const [, t] = this.evaluateArguments(a.args, n);
                                                if (t.has("attribute")) {
                                                    const n = t.get("attribute");
                                                    if (!(n instanceof X)) throw new Error("attribute must be a string");
                                                    const a = t.get("default"), i = e.value.map((e => {
                                                        if (!(e instanceof ne)) throw new Error("items in map must be an object");
                                                        const t = pe(e, n.value);
                                                        return t instanceof le ? a ?? new le : t;
                                                    }));
                                                    return new ie(i);
                                                }
                                                throw new Error("`map` expressions without `attribute` set are not currently supported.");
                                            }
                                        }
                                        throw new Error(`Unknown ArrayValue filter: ${i}`);
                                    }
                                    if (e instanceof X) {
                                        switch (i) {
                                          case "indent":
                                            {
                                                const [t, i] = this.evaluateArguments(a.args, n), o = t.at(0) ?? i.get("width") ?? new K(4);
                                                if (!(o instanceof K)) throw new Error("width must be a number");
                                                const r = t.at(1) ?? i.get("first") ?? new Y(!1), s = t.at(2) ?? i.get("blank") ?? new Y(!1), l = e.value.split("\n"), c = " ".repeat(o.value), p = l.map(((e, t) => !r.value && 0 === t || !s.value && 0 === e.length ? e : c + e));
                                                return new X(p.join("\n"));
                                            }

                                          case "replace":
                                            {
                                                const t = e.builtins.get("replace");
                                                if (!(t instanceof re)) throw new Error("replace filter not available");
                                                const [i, o] = this.evaluateArguments(a.args, n);
                                                return t.value([ ...i, new ae(o) ], n);
                                            }
                                        }
                                        throw new Error(`Unknown StringValue filter: ${i}`);
                                    }
                                    if (e instanceof ne) {
                                        const t = e.builtins.get(i);
                                        if (t && t instanceof re) {
                                            const [e, i] = this.evaluateArguments(a.args, n);
                                            return i.size > 0 && e.push(new ae(i)), t.value(e, n);
                                        }
                                        throw new Error(`Unknown ObjectValue filter: ${i}`);
                                    }
                                    throw new Error(`Cannot apply filter "${i}" to type: ${e.type}`);
                                }
                                throw new Error(`Unknown filter: ${t.type}`);
                            }
                            evaluateFilterExpression(e, t) {
                                const n = this.evaluate(e.operand, t);
                                return this.applyFilter(n, e.filter, t);
                            }
                            evaluateTestExpression(e, t) {
                                const n = this.evaluate(e.operand, t), a = t.tests.get(e.test.value);
                                if (!a) throw new Error(`Unknown test: ${e.test.value}`);
                                const i = a(n);
                                return new Y(e.negate ? !i : i);
                            }
                            evaluateSelectExpression(e, t) {
                                return this.evaluate(e.test, t).__bool__().value ? this.evaluate(e.lhs, t) : new le;
                            }
                            evaluateUnaryExpression(e, t) {
                                const n = this.evaluate(e.argument, t);
                                if ("not" === e.operator.value) return new Y(!n.value);
                                throw new SyntaxError(`Unknown operator: ${e.operator.value}`);
                            }
                            evaluateTernaryExpression(e, t) {
                                return this.evaluate(e.condition, t).__bool__().value ? this.evaluate(e.trueExpr, t) : this.evaluate(e.falseExpr, t);
                            }
                            evalProgram(e, t) {
                                return this.evaluateBlock(e.body, t);
                            }
                            evaluateBlock(e, t) {
                                let n = "";
                                for (const a of e) {
                                    const e = this.evaluate(a, t);
                                    "NullValue" !== e.type && "UndefinedValue" !== e.type && (n += e.toString());
                                }
                                return new X(n);
                            }
                            evaluateIdentifier(e, t) {
                                return t.lookupVariable(e.value);
                            }
                            evaluateCallExpression(e, t) {
                                const [n, a] = this.evaluateArguments(e.args, t);
                                a.size > 0 && n.push(new ae(a));
                                const i = this.evaluate(e.callee, t);
                                if ("FunctionValue" !== i.type) throw new Error(`Cannot call something that is not a function: got ${i.type}`);
                                return i.value(n, t);
                            }
                            evaluateSliceExpression(e, t, n) {
                                if (!(e instanceof ie || e instanceof X)) throw new Error("Slice object must be an array or string");
                                const a = this.evaluate(t.start, n), i = this.evaluate(t.stop, n), o = this.evaluate(t.step, n);
                                if (!(a instanceof K || a instanceof le)) throw new Error("Slice start must be numeric or undefined");
                                if (!(i instanceof K || i instanceof le)) throw new Error("Slice stop must be numeric or undefined");
                                if (!(o instanceof K || o instanceof le)) throw new Error("Slice step must be numeric or undefined");
                                return e instanceof ie ? new ie(Q(e.value, a.value, i.value, o.value)) : new X(Q(Array.from(e.value), a.value, i.value, o.value).join(""));
                            }
                            evaluateMemberExpression(e, t) {
                                const n = this.evaluate(e.object, t);
                                let a, i;
                                if (e.computed) {
                                    if ("SliceExpression" === e.property.type) return this.evaluateSliceExpression(n, e.property, t);
                                    a = this.evaluate(e.property, t);
                                } else a = new X(e.property.value);
                                if (n instanceof ne) {
                                    if (!(a instanceof X)) throw new Error(`Cannot access property with non-string: got ${a.type}`);
                                    i = n.value.get(a.value) ?? n.builtins.get(a.value);
                                } else if (n instanceof ie || n instanceof X) if (a instanceof K) i = n.value.at(a.value), 
                                n instanceof X && (i = new X(n.value.at(a.value))); else {
                                    if (!(a instanceof X)) throw new Error(`Cannot access property with non-string/non-number: got ${a.type}`);
                                    i = n.builtins.get(a.value);
                                } else {
                                    if (!(a instanceof X)) throw new Error(`Cannot access property with non-string: got ${a.type}`);
                                    i = n.builtins.get(a.value);
                                }
                                return i instanceof W ? i : new le;
                            }
                            evaluateSet(e, t) {
                                const n = e.value ? this.evaluate(e.value, t) : this.evaluateBlock(e.body, t);
                                if ("Identifier" === e.assignee.type) {
                                    const a = e.assignee.value;
                                    t.setVariable(a, n);
                                } else if ("TupleLiteral" === e.assignee.type) {
                                    const a = e.assignee;
                                    if (!(n instanceof ie)) throw new Error(`Cannot unpack non-iterable type in set: ${n.type}`);
                                    const i = n.value;
                                    if (i.length !== a.value.length) throw new Error(`Too ${a.value.length > i.length ? "few" : "many"} items to unpack in set`);
                                    for (let e = 0; e < a.value.length; ++e) {
                                        const n = a.value[e];
                                        if ("Identifier" !== n.type) throw new Error(`Cannot unpack to non-identifier in set: ${n.type}`);
                                        t.setVariable(n.value, i[e]);
                                    }
                                } else {
                                    if ("MemberExpression" !== e.assignee.type) throw new Error(`Invalid LHS inside assignment expression: ${JSON.stringify(e.assignee)}`);
                                    {
                                        const a = e.assignee, i = this.evaluate(a.object, t);
                                        if (!(i instanceof ne)) throw new Error("Cannot assign to member of non-object");
                                        if ("Identifier" !== a.property.type) throw new Error("Cannot assign to member with non-identifier property");
                                        i.value.set(a.property.value, n);
                                    }
                                }
                                return new se;
                            }
                            evaluateIf(e, t) {
                                const n = this.evaluate(e.test, t);
                                return this.evaluateBlock(n.__bool__().value ? e.body : e.alternate, t);
                            }
                            evaluateFor(e, t) {
                                const n = new ce(t);
                                let a, i;
                                if ("SelectExpression" === e.iterable.type) {
                                    const t = e.iterable;
                                    i = this.evaluate(t.lhs, n), a = t.test;
                                } else i = this.evaluate(e.iterable, n);
                                if (!(i instanceof ie || i instanceof ne)) throw new Error(`Expected iterable or object type in for loop: got ${i.type}`);
                                i instanceof ne && (i = i.keys());
                                const o = [], r = [];
                                for (let t = 0; t < i.value.length; ++t) {
                                    const s = new ce(n), l = i.value[t];
                                    let c;
                                    if ("Identifier" === e.loopvar.type) c = t => t.setVariable(e.loopvar.value, l); else {
                                        if ("TupleLiteral" !== e.loopvar.type) throw new Error(`Invalid loop variable(s): ${e.loopvar.type}`);
                                        {
                                            const t = e.loopvar;
                                            if ("ArrayValue" !== l.type) throw new Error(`Cannot unpack non-iterable type: ${l.type}`);
                                            const n = l;
                                            if (t.value.length !== n.value.length) throw new Error(`Too ${t.value.length > n.value.length ? "few" : "many"} items to unpack`);
                                            c = e => {
                                                for (let a = 0; a < t.value.length; ++a) {
                                                    if ("Identifier" !== t.value[a].type) throw new Error(`Cannot unpack non-identifier type: ${t.value[a].type}`);
                                                    e.setVariable(t.value[a].value, n.value[a]);
                                                }
                                            };
                                        }
                                    }
                                    a && (c(s), !this.evaluate(a, s).__bool__().value) || (o.push(l), r.push(c));
                                }
                                let s = "", l = !0;
                                for (let t = 0; t < o.length; ++t) {
                                    const a = new Map([ [ "index", new K(t + 1) ], [ "index0", new K(t) ], [ "revindex", new K(o.length - t) ], [ "revindex0", new K(o.length - t - 1) ], [ "first", new Y(0 === t) ], [ "last", new Y(t === o.length - 1) ], [ "length", new K(o.length) ], [ "previtem", t > 0 ? o[t - 1] : new le ], [ "nextitem", t < o.length - 1 ? o[t + 1] : new le ] ]);
                                    n.setVariable("loop", new ne(a)), r[t](n);
                                    try {
                                        s += this.evaluateBlock(e.body, n).value;
                                    } catch (e) {
                                        if (e instanceof G) continue;
                                        if (e instanceof H) break;
                                        throw e;
                                    }
                                    l = !1;
                                }
                                return l && (s += this.evaluateBlock(e.defaultBlock, n).value), new X(s);
                            }
                            evaluateMacro(e, t) {
                                return t.setVariable(e.name.value, new re(((t, n) => {
                                    const a = new ce(n);
                                    let i;
                                    "KeywordArgumentsValue" === (t = t.slice()).at(-1)?.type && (i = t.pop());
                                    for (let n = 0; n < e.args.length; ++n) {
                                        const o = e.args[n], r = t[n];
                                        if ("Identifier" === o.type) {
                                            const e = o;
                                            if (!r) throw new Error(`Missing positional argument: ${e.value}`);
                                            a.setVariable(e.value, r);
                                        } else {
                                            if ("KeywordArgumentExpression" !== o.type) throw new Error(`Unknown argument type: ${o.type}`);
                                            {
                                                const e = o, t = r ?? i?.value.get(e.key.value) ?? this.evaluate(e.value, a);
                                                a.setVariable(e.key.value, t);
                                            }
                                        }
                                    }
                                    return this.evaluateBlock(e.body, a);
                                }))), new se;
                            }
                            evaluateCallStatement(e, t) {
                                const n = new re(((t, n) => {
                                    const a = new ce(n);
                                    if (e.callerArgs) for (let n = 0; n < e.callerArgs.length; ++n) {
                                        const i = e.callerArgs[n];
                                        if ("Identifier" !== i.type) throw new Error(`Caller parameter must be an identifier, got ${i.type}`);
                                        a.setVariable(i.value, t[n] ?? new le);
                                    }
                                    return this.evaluateBlock(e.body, a);
                                })), [a, i] = this.evaluateArguments(e.call.args, t);
                                a.push(new ae(i));
                                const o = this.evaluate(e.call.callee, t);
                                if ("FunctionValue" !== o.type) throw new Error(`Cannot call something that is not a function: got ${o.type}`);
                                const r = new ce(t);
                                return r.setVariable("caller", n), o.value(a, r);
                            }
                            evaluateFilterStatement(e, t) {
                                const n = this.evaluateBlock(e.body, t);
                                return this.applyFilter(n, e.filter, t);
                            }
                            evaluate(e, t) {
                                if (!e) return new le;
                                switch (e.type) {
                                  case "Program":
                                    return this.evalProgram(e, t);

                                  case "Set":
                                    return this.evaluateSet(e, t);

                                  case "If":
                                    return this.evaluateIf(e, t);

                                  case "For":
                                    return this.evaluateFor(e, t);

                                  case "Macro":
                                    return this.evaluateMacro(e, t);

                                  case "CallStatement":
                                    return this.evaluateCallStatement(e, t);

                                  case "Break":
                                    throw new H;

                                  case "Continue":
                                    throw new G;

                                  case "IntegerLiteral":
                                    return new K(e.value);

                                  case "FloatLiteral":
                                    return new J(e.value);

                                  case "StringLiteral":
                                    return new X(e.value);

                                  case "ArrayLiteral":
                                    return new ie(e.value.map((e => this.evaluate(e, t))));

                                  case "TupleLiteral":
                                    return new oe(e.value.map((e => this.evaluate(e, t))));

                                  case "ObjectLiteral":
                                    {
                                        const n = new Map;
                                        for (const [a, i] of e.value) {
                                            const e = this.evaluate(a, t);
                                            if (!(e instanceof X)) throw new Error(`Object keys must be strings: got ${e.type}`);
                                            n.set(e.value, this.evaluate(i, t));
                                        }
                                        return new ne(n);
                                    }

                                  case "Identifier":
                                    return this.evaluateIdentifier(e, t);

                                  case "CallExpression":
                                    return this.evaluateCallExpression(e, t);

                                  case "MemberExpression":
                                    return this.evaluateMemberExpression(e, t);

                                  case "UnaryExpression":
                                    return this.evaluateUnaryExpression(e, t);

                                  case "BinaryExpression":
                                    return this.evaluateBinaryExpression(e, t);

                                  case "FilterExpression":
                                    return this.evaluateFilterExpression(e, t);

                                  case "FilterStatement":
                                    return this.evaluateFilterStatement(e, t);

                                  case "TestExpression":
                                    return this.evaluateTestExpression(e, t);

                                  case "SelectExpression":
                                    return this.evaluateSelectExpression(e, t);

                                  case "Ternary":
                                    return this.evaluateTernaryExpression(e, t);

                                  case "Comment":
                                    return new se;

                                  default:
                                    throw new SyntaxError(`Unknown node type: ${e.type}`);
                                }
                            }
                        }(t).run(this.parsed).value;
                    }
                    format(e) {
                        return function(e, t = "\t") {
                            const n = "number" == typeof t ? " ".repeat(t) : t;
                            return be(e.body, 0, n).replace(/\n$/, "");
                        }(this.parsed, e?.indent || "\t");
                    }
                }(a).render({
                    ...e
                });
            }, ka = _a("python", "huggingface_hub", "importInferenceClient"), Aa = _a("python", "requests", "importRequests"), Sa = {
                "audio-classification": "audio_classification",
                "audio-to-audio": "audio_to_audio",
                "automatic-speech-recognition": "automatic_speech_recognition",
                "document-question-answering": "document_question_answering",
                "feature-extraction": "feature_extraction",
                "fill-mask": "fill_mask",
                "image-classification": "image_classification",
                "image-segmentation": "image_segmentation",
                "image-to-image": "image_to_image",
                "image-to-text": "image_to_text",
                "object-detection": "object_detection",
                "question-answering": "question_answering",
                "sentence-similarity": "sentence_similarity",
                summarization: "summarization",
                "table-question-answering": "table_question_answering",
                "tabular-classification": "tabular_classification",
                "tabular-regression": "tabular_regression",
                "text-classification": "text_classification",
                "text-generation": "text_generation",
                "text-to-image": "text_to_image",
                "text-to-speech": "text_to_speech",
                "text-to-video": "text_to_video",
                "token-classification": "token_classification",
                translation: "translation",
                "visual-question-answering": "visual_question_answering",
                "zero-shot-classification": "zero_shot_classification",
                "zero-shot-image-classification": "zero_shot_image_classification"
            }, Ta = {
                "automatic-speech-recognition": "automaticSpeechRecognition",
                "feature-extraction": "featureExtraction",
                "fill-mask": "fillMask",
                "image-classification": "imageClassification",
                "question-answering": "questionAnswering",
                "sentence-similarity": "sentenceSimilarity",
                summarization: "summarization",
                "table-question-answering": "tableQuestionAnswering",
                "text-classification": "textClassification",
                "text-generation": "textGeneration",
                "text2text-generation": "textGeneration",
                "token-classification": "tokenClassification",
                "text-to-speech": "textToSpeech",
                translation: "translation"
            }, Ia = (e, t) => (n, a, i, o, r) => {
                const s = o?.providerId ?? n.id;
                let l, c = n.pipeline_tag;
                n.pipeline_tag && [ "text-generation", "image-text-to-text" ].includes(n.pipeline_tag) && n.tags.includes("conversational") && (e = r?.streaming ? "conversationalStream" : "conversational", 
                t = Ea, c = "conversational");
                try {
                    l = Mn("auto" === i ? "hf-inference" : i, c);
                } catch (e) {
                    return [];
                }
                const p = t ? t(n, r) : {
                    inputs: jt(n)
                }, d = On(s, l, {
                    accessToken: a,
                    provider: i,
                    ...p
                }, o, {
                    task: c,
                    billTo: r?.billTo
                });
                let u = p;
                const m = d.info.body;
                if ("string" == typeof m) try {
                    u = JSON.parse(m);
                } catch (e) {}
                const f = {
                    accessToken: a,
                    authorizationHeader: d.info.headers?.Authorization,
                    baseUrl: (h = d.url, g = "/chat/completions", h.endsWith(g) ? h.slice(0, -g.length) : h),
                    fullUrl: d.url,
                    inputs: {
                        asObj: p,
                        asCurlString: ja(p, "curl"),
                        asJsonString: ja(p, "json"),
                        asPythonString: ja(p, "python"),
                        asTsString: ja(p, "ts")
                    },
                    providerInputs: {
                        asObj: u,
                        asCurlString: ja(u, "curl"),
                        asJsonString: ja(u, "json"),
                        asPythonString: ja(u, "python"),
                        asTsString: ja(u, "ts")
                    },
                    model: n,
                    provider: i,
                    providerModelId: s ?? n.id,
                    billTo: r?.billTo
                };
                var h, g;
                const y = "auto" === i ? xa : va;
                return Ht.map((t => (y[t] ?? []).map((a => {
                    if (!((e, t, n) => void 0 !== wa[e]?.[t]?.[n])(t, a, e)) return;
                    const i = _a(t, a, e);
                    if ("huggingface_hub" === a && e.includes("basic")) {
                        if (!n.pipeline_tag || !(n.pipeline_tag in Sa)) return;
                        f.methodName = Sa[n.pipeline_tag];
                    }
                    if ("huggingface.js" === a && e.includes("basic")) {
                        if (!n.pipeline_tag || !(n.pipeline_tag in Ta)) return;
                        f.methodName = Ta[n.pipeline_tag];
                    }
                    let o = i(f).trim();
                    if (o) {
                        if ("huggingface_hub" === a) o = `${ka({
                            ...f
                        })}\n\n${o}`; else if ("requests" === a) {
                            const e = Aa({
                                ...f,
                                importBase64: o.includes("base64"),
                                importJson: o.includes("json.")
                            });
                            o = `${e}\n\n${o}`;
                        }
                        return {
                            language: t,
                            client: a,
                            content: o
                        };
                    }
                })).filter((e => void 0 !== e)))).flat();
            }, Ea = (e, t) => ({
                messages: t?.messages ?? jt(e),
                ...t?.temperature ? {
                    temperature: t?.temperature
                } : void 0,
                ...t?.max_tokens ? {
                    max_tokens: t?.max_tokens
                } : void 0,
                ...t?.top_p ? {
                    top_p: t?.top_p
                } : void 0
            }), Ma = {
                "audio-classification": Ia("basicAudio"),
                "audio-to-audio": Ia("basicAudio"),
                "automatic-speech-recognition": Ia("basicAudio"),
                "document-question-answering": Ia("documentQuestionAnswering", (e => JSON.parse(jt(e)))),
                "feature-extraction": Ia("basic"),
                "fill-mask": Ia("basic"),
                "image-classification": Ia("basicImage"),
                "image-segmentation": Ia("basicImage"),
                "image-text-to-text": Ia("conversational"),
                "image-to-image": Ia("imageToImage", (e => {
                    const t = JSON.parse(jt(e));
                    return {
                        inputs: t.image,
                        parameters: {
                            prompt: t.prompt
                        }
                    };
                })),
                "image-to-text": Ia("basicImage"),
                "object-detection": Ia("basicImage"),
                "question-answering": Ia("questionAnswering", (e => {
                    const t = JSON.parse(jt(e));
                    return {
                        question: t.question,
                        context: t.context
                    };
                })),
                "sentence-similarity": Ia("basic"),
                summarization: Ia("basic"),
                "tabular-classification": Ia("tabular"),
                "tabular-regression": Ia("tabular"),
                "table-question-answering": Ia("tableQuestionAnswering", (e => {
                    const t = JSON.parse(jt(e));
                    return {
                        query: t.query,
                        table: JSON.stringify(t.table)
                    };
                })),
                "text-classification": Ia("basic"),
                "text-generation": Ia("basic"),
                "text-to-audio": Ia("textToAudio"),
                "text-to-image": Ia("textToImage"),
                "text-to-speech": Ia("textToSpeech"),
                "text-to-video": Ia("textToVideo"),
                "text2text-generation": Ia("basic"),
                "token-classification": Ia("basic"),
                translation: Ia("basic"),
                "zero-shot-classification": Ia("zeroShotClassification"),
                "zero-shot-image-classification": Ia("zeroShotImageClassification")
            };
            function Ca(e, t, n, a, i) {
                return e.pipeline_tag && e.pipeline_tag in Ma ? Ma[e.pipeline_tag]?.(e, t, n, a, i) ?? [] : [];
            }
            function ja(e, t) {
                switch (t) {
                  case "curl":
                    return Ua(ja(e, "json"));

                  case "json":
                    return JSON.stringify(e, null, 4).split("\n").slice(1, -1).join("\n");

                  case "python":
                    return Ua(Object.entries(e).map((([e, t]) => `${e}=${JSON.stringify(t, null, 4).replace(/"/g, '"')},`)).join("\n"));

                  case "ts":
                    return La(e).split("\n").slice(1, -1).join("\n");

                  default:
                    throw new Error(`Unsupported format: ${t}`);
                }
            }
            function La(e, t) {
                return t = t ?? 0, "object" != typeof e || null === e ? JSON.stringify(e) : Array.isArray(e) ? `[\n${e.map((e => {
                    const n = La(e, t + 1);
                    return `${" ".repeat(4 * (t + 1))}${n},`;
                })).join("\n")}\n${" ".repeat(4 * t)}]` : `{\n${Object.entries(e).map((([e, n]) => {
                    const a = La(n, t + 1), i = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(e) ? e : `"${e}"`;
                    return `${" ".repeat(4 * (t + 1))}${i}: ${a},`;
                })).join("\n")}\n${" ".repeat(4 * t)}}`;
            }
            function Ua(e) {
                return e.split("\n").map((e => " ".repeat(4) + e)).join("\n");
            }
            const $a = [ 239, 187, 191 ];
            e = n.hmd(e), (() => {
                let t, i, o = [];
                var r = {
                    780(e, t, n) {
                        let a = n(918);
                        class i {
                            constructor(e, t) {
                                if (this.maxAge = e, this[Symbol.toStringTag] = "Map", this.data = new Map, a(this.data), 
                                t) for (let [e, n] of t) this.set(e, n);
                            }
                            get size() {
                                return this.data.size;
                            }
                            clear() {
                                this.data.clear();
                            }
                            delete(e) {
                                return this.data.delete(e);
                            }
                            has(e) {
                                return this.data.has(e);
                            }
                            get(e) {
                                let t = this.data.get(e);
                                if (t) return t.data;
                            }
                            set(e, t) {
                                return this.data.set(e, {
                                    maxAge: Date.now() + this.maxAge,
                                    data: t
                                }), this;
                            }
                            values() {
                                return this.createIterator((e => e[1].data));
                            }
                            keys() {
                                return this.data.keys();
                            }
                            entries() {
                                return this.createIterator((e => [ e[0], e[1].data ]));
                            }
                            forEach(e, t) {
                                for (let [n, a] of this.entries()) e.apply(t, [ a, n, this ]);
                            }
                            [Symbol.iterator]() {
                                return this.entries();
                            }
                            * createIterator(e) {
                                for (let t of this.data.entries()) yield e(t);
                            }
                        }
                        e.exports = i;
                    },
                    918(e, t, n) {
                        let a = n(931);
                        e.exports = function(e, t = "maxAge") {
                            let n, i, o, r = async () => {
                                if (void 0 !== n) return;
                                let r = async r => {
                                    o = a();
                                    let s = r[1][t] - Date.now();
                                    return s <= 0 ? (e.delete(r[0]), void o.resolve()) : (n = r[0], "function" == typeof (i = setTimeout((() => {
                                        e.delete(r[0]), o && o.resolve();
                                    }), s)).unref && i.unref(), o.promise);
                                };
                                try {
                                    for (let t of e) await r(t);
                                } catch (e) {}
                                n = void 0;
                            }, s = e.set.bind(e);
                            return e.set = (t, a) => {
                                e.has(t) && e.delete(t);
                                let l = s(t, a);
                                return n && n === t && (n = void 0, void 0 !== i && (clearTimeout(i), i = void 0), 
                                void 0 !== o && (o.reject(void 0), o = void 0)), r(), l;
                            }, r(), e;
                        };
                    },
                    931(e) {
                        e.exports = () => {
                            let e = {};
                            return e.promise = new Promise(((t, n) => {
                                e.resolve = t, e.reject = n;
                            })), e;
                        };
                    }
                }, s = {};
                function l(e) {
                    var t = s[e];
                    if (void 0 !== t) return t.exports;
                    var n = s[e] = {
                        exports: {}
                    };
                    return r[e](n, n.exports, l), n.exports;
                }
                l.n = e => {
                    var t = e && e.__esModule ? () => e.default : () => e;
                    return l.d(t, {
                        a: t
                    }), t;
                }, l.d = (e, t) => {
                    for (var n in t) l.o(t, n) && !l.o(e, n) && Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: t[n]
                    });
                }, l.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), (async () => {
                    var r, s = l(780), c = l.n(s);
                    "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto), 
                    new Uint8Array(16);
                    let p = [];
                    for (let e = 0; e < 256; ++e) p.push((e + 256).toString(16).slice(1));
                    async function d(e, t, n, a) {
                        return fetch(`https://chatgpt.com/backend-api${n}`, {
                            method: t,
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${e}`
                            },
                            body: JSON.stringify(a)
                        });
                    }
                    async function u(e, t, n) {
                        await d(e, "PATCH", `/conversation/${t}`, n);
                    }
                    let f = [ 239, 187, 191 ];
                    async function h() {
                        return chrome.storage.local.get("user_settings").then((e => e && e.user_settings ? e.user_settings : {
                            apiKey: null,
                            loginType: r.CHAT_GPT
                        }));
                    }
                    !function(e) {
                        e[e.CHAT_GPT = 0] = "CHAT_GPT", e[e.API_KEY = 1] = "API_KEY";
                    }(r || (r = {}));
                    var g = Object.prototype;
                    let y = function(e) {
                        var t = e && e.constructor;
                        return e === ("function" == typeof t && t.prototype || g);
                    }, w = function(e, t) {
                        return function(n) {
                            return e(t(n));
                        };
                    }(Object.keys, Object);
                    var v = Object.prototype.hasOwnProperty;
                    let _ = "object" == typeof n.g && n.g && n.g.Object === Object && n.g;
                    var k = "object" == typeof self && self && self.Object === Object && self;
                    let A = _ || k || Function("return this")(), S = A.Symbol;
                    var T = Object.prototype, I = T.hasOwnProperty, E = T.toString, M = S ? S.toStringTag : void 0;
                    var j = Object.prototype.toString;
                    var U = S ? S.toStringTag : void 0;
                    let O = function(e) {
                        return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : U && U in Object(e) ? function(e) {
                            var t = I.call(e, M), n = e[M];
                            try {
                                e[M] = void 0;
                                var a = !0;
                            } catch (e) {}
                            var i = E.call(e);
                            return a && (t ? e[M] = n : delete e[M]), i;
                        }(e) : function(e) {
                            return j.call(e);
                        }(e);
                    }, $ = function(e) {
                        var t = typeof e;
                        return null != e && ("object" == t || "function" == t);
                    }, P = function(e) {
                        if (!$(e)) return !1;
                        var t = O(e);
                        return "[object Function]" == t || "[object GeneratorFunction]" == t || "[object AsyncFunction]" == t || "[object Proxy]" == t;
                    }, R = A["__core-js_shared__"];
                    var D = function() {
                        var e = /[^.]+$/.exec(R && R.keys && R.keys.IE_PROTO || "");
                        return e ? "Symbol(src)_1." + e : "";
                    }();
                    var q = Function.prototype.toString;
                    let z = function(e) {
                        if (null != e) {
                            try {
                                return q.call(e);
                            } catch (e) {}
                            try {
                                return e + "";
                            } catch (e) {}
                        }
                        return "";
                    };
                    var B = /^\[object .+?Constructor\]$/, F = Function.prototype, Q = Object.prototype, V = F.toString, H = Q.hasOwnProperty, G = RegExp("^" + V.call(H).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
                    let W = function(e) {
                        return !(!$(e) || function(e) {
                            return !!D && D in e;
                        }(e)) && (P(e) ? G : B).test(z(e));
                    }, J = function(e, t) {
                        var n = function(e, t) {
                            return null == e ? void 0 : e[t];
                        }(e, t);
                        return W(n) ? n : void 0;
                    }, X = J(A, "DataView"), Y = J(A, "Map"), Z = J(A, "Promise"), ee = J(A, "Set"), te = J(A, "WeakMap");
                    var ne = "[object Map]", ae = "[object Promise]", ie = "[object Set]", oe = "[object WeakMap]", re = "[object DataView]", se = z(X), le = z(Y), ce = z(Z), pe = z(ee), de = z(te), ue = O;
                    (X && ue(new X(new ArrayBuffer(1))) != re || Y && ue(new Y) != ne || Z && ue(Z.resolve()) != ae || ee && ue(new ee) != ie || te && ue(new te) != oe) && (ue = function(e) {
                        var t = O(e), n = "[object Object]" == t ? e.constructor : void 0, a = n ? z(n) : "";
                        if (a) switch (a) {
                          case se:
                            return re;

                          case le:
                            return ne;

                          case ce:
                            return ae;

                          case pe:
                            return ie;

                          case de:
                            return oe;
                        }
                        return t;
                    });
                    let me = ue, fe = function(e) {
                        return null != e && "object" == typeof e;
                    }, he = function(e) {
                        return fe(e) && "[object Arguments]" == O(e);
                    };
                    var ge = Object.prototype, ye = ge.hasOwnProperty, be = ge.propertyIsEnumerable;
                    let ve = he(function() {
                        return arguments;
                    }()) ? he : function(e) {
                        return fe(e) && ye.call(e, "callee") && !be.call(e, "callee");
                    }, xe = Array.isArray, _e = function(e) {
                        return "number" == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991;
                    };
                    var Se = "object" == typeof exports && exports && !exports.nodeType && exports, Te = Se && e && !e.nodeType && e, Ie = Te && Te.exports === Se ? A.Buffer : void 0;
                    let Ee = (Ie ? Ie.isBuffer : void 0) || function() {
                        return !1;
                    };
                    var Me = {};
                    Me["[object Float32Array]"] = Me["[object Float64Array]"] = Me["[object Int8Array]"] = Me["[object Int16Array]"] = Me["[object Int32Array]"] = Me["[object Uint8Array]"] = Me["[object Uint8ClampedArray]"] = Me["[object Uint16Array]"] = Me["[object Uint32Array]"] = !0, 
                    Me["[object Arguments]"] = Me["[object Array]"] = Me["[object ArrayBuffer]"] = Me["[object Boolean]"] = Me["[object DataView]"] = Me["[object Date]"] = Me["[object Error]"] = Me["[object Function]"] = Me["[object Map]"] = Me["[object Number]"] = Me["[object Object]"] = Me["[object RegExp]"] = Me["[object Set]"] = Me["[object String]"] = Me["[object WeakMap]"] = !1;
                    var Le = "object" == typeof exports && exports && !exports.nodeType && exports, Ue = Le && e && !e.nodeType && e, Oe = Ue && Ue.exports === Le && _.process, $e = function() {
                        try {
                            return Ue && Ue.require && Ue.require("util").types || Oe && Oe.binding && Oe.binding("util");
                        } catch (e) {}
                    }(), Pe = $e && $e.isTypedArray;
                    let Re = Pe ? function(e) {
                        return function(t) {
                            return e(t);
                        };
                    }(Pe) : function(e) {
                        return fe(e) && _e(e.length) && !!Me[O(e)];
                    };
                    var De = Object.prototype.hasOwnProperty;
                    let Ne = function(e) {
                        if (null == e) return !0;
                        if (function(e) {
                            return null != e && _e(e.length) && !P(e);
                        }(e) && (xe(e) || "string" == typeof e || "function" == typeof e.splice || Ee(e) || Re(e) || ve(e))) return !e.length;
                        var t = me(e);
                        if ("[object Map]" == t || "[object Set]" == t) return !e.size;
                        if (y(e)) return !function(e) {
                            if (!y(e)) return w(e);
                            var t = [];
                            for (var n in Object(e)) v.call(e, n) && "constructor" != n && t.push(n);
                            return t;
                        }(e).length;
                        for (var n in e) if (De.call(e, n)) return !1;
                        return !0;
                    }, qe = "accessToken", ze = new (c())(1e4);
                    async function Be() {
                        if (ze.get(qe)) return ze.get(qe);
                        let e = await fetch("https://chatgpt.com/api/auth/session");
                        if (403 === e.status) throw Error(JSON.stringify({
                            code: "CLOUDFLARE"
                        }));
                        let t = await e.json().catch((() => ({})));
                        if (!t.accessToken) throw Error(JSON.stringify({
                            code: "UNAUTHORIZED"
                        }));
                        return ze.set(qe, t.accessToken), t.accessToken;
                    }
                    async function Fe(e, n, s) {
                        let l = await async function() {
                            return (await h()).loginType;
                        }(), c = await async function() {
                            return (await h()).apiKey;
                        }();
                        l == r.API_KEY && c && c.length > 0 ? await async function(e, t, n, a) {
                            let i = new AbortController;
                            t.onDisconnect.addListener((() => {
                                i.abort();
                            }));
                            let r = "";
                            await async function(e, t) {
                                let {onMessage: n, onError: a, ...i} = t, o = await fetch("https://api.openai.com/v1/completions", i);
                                if (!o.ok) return void a(o);
                                let r = function(e) {
                                    let t, n, a, i, o, r, s;
                                    return l(), {
                                        feed: function(e) {
                                            n = n ? n + e : e, t && function(e) {
                                                return f.every(((t, n) => e.charCodeAt(n) === t));
                                            }(n) && (n = n.slice(f.length)), t = !1;
                                            let o = n.length, r = 0, s = !1;
                                            for (;r < o; ) {
                                                s && ("\n" === n[r] && ++r, s = !1);
                                                let e, t = -1, l = i;
                                                for (let i = a; t < 0 && i < o; ++i) ":" === (e = n[i]) && l < 0 ? l = i - r : "\r" === e ? (s = !0, 
                                                t = i - r) : "\n" === e && (t = i - r);
                                                if (t < 0) {
                                                    a = o - r, i = l;
                                                    break;
                                                }
                                                a = 0, i = -1, c(n, r, l, t), r += t + 1;
                                            }
                                            r === o ? n = "" : r > 0 && (n = n.slice(r));
                                        },
                                        reset: l
                                    };
                                    function l() {
                                        t = !0, n = "", a = 0, i = -1, o = void 0, r = void 0, s = "";
                                    }
                                    function c(t, n, a, i) {
                                        if (0 === i) return s.length > 0 && (e({
                                            type: "event",
                                            id: o,
                                            event: r || void 0,
                                            data: s.slice(0, -1)
                                        }), s = "", o = void 0), void (r = void 0);
                                        let l = a < 0, c = t.slice(n, n + (l ? i : a)), p = 0;
                                        p = l ? i : " " === t[n + a + 1] ? a + 2 : a + 1;
                                        let d = n + p, u = i - p, m = t.slice(d, d + u).toString();
                                        if ("data" === c) s += m ? "".concat(m, "\n") : "\n"; else if ("event" === c) r = m; else if ("id" !== c || m.includes("\0")) {
                                            if ("retry" === c) {
                                                let t = parseInt(m, 10);
                                                Number.isNaN(t) || e({
                                                    type: "reconnect-interval",
                                                    value: t
                                                });
                                            }
                                        } else o = m;
                                    }
                                }((e => {
                                    "event" === e.type && n(e.data);
                                }));
                                for await (let e of async function*(e) {
                                    let t = e.getReader();
                                    try {
                                        for (;;) {
                                            let {done: e, value: n} = await t.read();
                                            if (e) return;
                                            yield n;
                                        }
                                    } finally {
                                        t.releaseLock();
                                    }
                                }(o.body)) {
                                    let t = (new TextDecoder).decode(e);
                                    r.feed(t);
                                }
                            }(0, {
                                method: "POST",
                                signal: i.signal,
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${e}`
                                },
                                body: JSON.stringify({
                                    messages: [ {
                                        role: "user",
                                        content: n
                                    } ],
                                    model: "gpt-5-mini",
                                    stream: !0
                                }),
                                onMessage(e) {
                                    var n, a;
                                    if ("[DONE]" === e) return void t.postMessage({
                                        event: "DONE"
                                    });
                                    let i;
                                    try {
                                        i = JSON.parse(e);
                                    } catch (e) {
                                        return;
                                    }
                                    let o = null === (a = null === (n = i.choices) || void 0 === n ? void 0 : n[0].delta) || void 0 === a ? void 0 : a.content;
                                    o && (r += o, t.postMessage({
                                        text: r.trim(),
                                        messageId: i.id,
                                        conversationId: i.id
                                    }));
                                },
                                onError: async function(e) {
                                    var t;
                                    let i, o = await e.json().catch((() => ({})));
                                    Ne(o) || (i = null === (t = null == o ? void 0 : o.error) || void 0 === t ? void 0 : t.message), 
                                    a({
                                        code: undefined,
                                        message: i
                                    });
                                }
                            });
                        }(c, e, n, s) : await async function(e, n, r) {
                            let s = await Be().catch((e => {
                                r({
                                    error: JSON.parse(e.message)
                                });
                            }));
                            if (!s) return void ze.delete(qe);
                            let p = new AbortController;
                            e.onDisconnect.addListener((() => {
                                p.abort();
                            }));
                            const d = {}, m = {};
                            let f;
                            d.arkose = await chrome.storage.local.get([ "appl1_sgpt_arkose_config" ]).then((e => e.appl1_sgpt_arkose_config));
                            const [h, g, y, b] = await Promise.all([ He(s).catch((() => {})), Ge(s).catch((() => {})), We(d.arkose).catch((e => {
                                f = e;
                            })), Ke(s).catch((() => {})) ]), w = g && g.arkose?.required;
                            if (f && w) throw f;
                            let v, x, _;
                            if (g?.proofofwork?.required && (v = function(e, t, n) {
                                const i = [ 8, 12, 16, 24 ], o = [ 3e3, 4e3, 6e3 ], c = [ i[Qe(0, i.length)] + o[Qe(0, o.length)], (new Date).toString(), 4294705152, 0, void 0 ], p = t.length / 2;
                                for (let n = 0; n < 1e5; n++) {
                                    c[3] = n;
                                    const i = JSON.stringify(c), o = btoa(unescape(encodeURIComponent(i)));
                                    if (a.s.sha3_512.create().update(e + o).hex().substring(0, p) <= t) return "gAAAAAB" + o;
                                }
                                return "gAAAAABwQ8Lk5FbGpA2NcR9dShT6gYjU7VxZ4D" + Buffer.from(`"${e}"`).toString("base64");
                            }(g.proofofwork.seed, g.proofofwork.difficulty)), chrome.cookies && chrome.cookies.getAll && (x = (await chrome.cookies.getAll({
                                url: "https://chatgpt.com/"
                            })).map((e => `${e.name}=${e.value}`)).join("; "), _ = (await chrome.cookies.get({
                                url: "https://openai.com/",
                                name: "oai-did"
                            })).value), m.messageId = crypto.randomUUID(), m.wsRequestId = crypto.randomUUID(), 
                            null == m.parentMessageId && (m.parentMessageId = crypto.randomUUID()), !h) return;
                            const k = {
                                method: "POST",
                                signal: p.signal,
                                credentials: "include",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${s}`,
                                    ...x && {
                                        Cookie: x
                                    },
                                    ...w && {
                                        "Openai-Sentinel-Arkose-Token": y
                                    },
                                    ...g && {
                                        "Openai-Sentinel-Chat-Requirements-Token": g.token
                                    },
                                    ...v && {
                                        "Openai-Sentinel-Proof-Token": v
                                    },
                                    "Oai-Device-Id": _
                                },
                                body: JSON.stringify({
                                    action: "next",
                                    conversation_id: m.conversationId || void 0,
                                    messages: [ {
                                        id: m.messageId,
                                        author: {
                                            role: "user"
                                        },
                                        content: {
                                            content_type: "text",
                                            parts: [ n ]
                                        }
                                    } ],
                                    conversation_mode: {
                                        kind: "primary_assistant"
                                    },
                                    force_paragen: !1,
                                    force_rate_limit: !1,
                                    suggestions: [],
                                    model: h[0],
                                    parent_message_id: m.parentMessageId,
                                    timezone_offset_min: (new Date).getTimezoneOffset(),
                                    history_and_training_disabled: d.disableWebModeHistory,
                                    websocket_request_id: m.wsRequestId
                                })
                            };
                            if (b) {
                                await async function(e) {
                                    if (t && new Date < i - 3e5) return;
                                    const n = JSON.parse((await Ve(e, "POST", "/register-websocket")).responseText);
                                    let a;
                                    return n.wss_url && (t = new WebSocket(n.wss_url), t.onopen = () => {
                                        a();
                                    }, t.onclose = () => {
                                        t = null, i = null;
                                    }, t.onmessage = e => {
                                        o.forEach((t => t(e)));
                                    }, i = new Date(n.expires_at)), new Promise((e => a = e));
                                }(s);
                                const e = async t => {
                                    let n;
                                    try {
                                        n = JSON.parse(t.data);
                                    } catch (e) {
                                        return;
                                    }
                                    if ("http.response.body" === n.type) {
                                        let t;
                                        try {
                                            t = atob(n.body).replace(/^data:/, "");
                                            const e = JSON.parse(t);
                                            n.conversation_id === m.conversationId && r({
                                                text: e.message?.content?.parts?.[0],
                                                messageId: e.message.id,
                                                conversationId: e.conversation_id
                                            });
                                        } catch (a) {
                                            if (t && "[DONE]" === t.trim() && n.conversation_id === m.conversationId) return r({
                                                event: "DONE"
                                            }), void (o = o.filter((t => t !== e)));
                                        }
                                    }
                                };
                                o.push(e);
                                const {conversationId: n, wsRequestId: a} = await async function(e, t) {
                                    const n = await fetch("https://chatgpt.com/backend-api/conversation", t).then((e => e.json()));
                                    return {
                                        conversationId: n.conversation_id,
                                        wsRequestId: n.websocket_request_id
                                    };
                                }(0, k);
                                m.conversationId = n, m.wsRequestId = a;
                            } else {
                                let e = null;
                                await async function(e, t) {
                                    const {onMessage: n, onStart: a, onEnd: i, onError: o, ...r} = t, s = await fetch(e, r).catch((async e => {
                                        await o(e);
                                    }));
                                    if (!s) return;
                                    if (!s.ok) return void await o(s);
                                    const l = function(e) {
                                        let t, n, a, i, o, r, s, l, c;
                                        return p(), {
                                            feed: function(e) {
                                                n = n.concat(Array.from(e)), a = (new TextDecoder).decode(new Uint8Array(n)), t && function(e) {
                                                    return $a.every(((t, n) => e.charCodeAt(n) === t));
                                                }(a) && (a = a.slice($a.length)), t = !1;
                                                const r = a.length;
                                                let s = 0, l = !1;
                                                for (;s < r; ) {
                                                    l && ("\n" === a[s] && ++s, l = !1);
                                                    let e, t = -1, n = o;
                                                    for (let o = i; t < 0 && o < r; ++o) e = a[o], ":" === e && n < 0 ? n = o - s : "\r" === e ? (l = !0, 
                                                    t = o - s) : "\n" === e && (t = o - s);
                                                    if (t < 0) {
                                                        i = r - s, o = n;
                                                        break;
                                                    }
                                                    i = 0, o = -1, u(a, s, n, t), s += t + 1;
                                                }
                                                s === r ? (n = [], a = "") : s > 0 && (n = n.slice((new TextEncoder).encode(a.slice(0, s)).length), 
                                                a = a.slice(s));
                                            },
                                            reset: p
                                        };
                                        function p() {
                                            t = !0, n = [], a = "", i = 0, o = -1, r = void 0, s = void 0, l = "";
                                        }
                                        function u(t, n, a, i) {
                                            if (0 === i) return (l.length > 0 || c) && (e({
                                                type: "event",
                                                id: r,
                                                event: s || void 0,
                                                data: l.slice(0, -1),
                                                extra: c || void 0
                                            }), l = "", r = void 0, c = void 0), void (s = void 0);
                                            const o = a < 0, p = t.slice(n, n + (o ? i : a));
                                            let d = 0;
                                            d = o ? i : " " === t[n + a + 1] ? a + 2 : a + 1;
                                            const u = n + d, m = i - d, f = t.slice(u, u + m).toString();
                                            if ("data" === p) l += f ? "".concat(f, "\n") : "\n"; else if ("event" === p) s = f; else if ("id" !== p || f.includes("\0")) {
                                                if ("retry" === p) {
                                                    const t = parseInt(f, 10);
                                                    Number.isNaN(t) || e({
                                                        type: "reconnect-interval",
                                                        value: t
                                                    });
                                                } else if ("meta" === p) {
                                                    const e = `{"${p}":${f}}`;
                                                    c = c ?? [], c.push(JSON.parse(e));
                                                }
                                            } else r = f;
                                        }
                                    }((e => {
                                        "event" === e.type && n(e.data);
                                    }));
                                    let c = !1;
                                    const p = s.body.getReader();
                                    let d;
                                    for (;!(d = await p.read()).done; ) {
                                        const e = d.value;
                                        if (!c) {
                                            const t = (new TextDecoder).decode(e);
                                            let n;
                                            c = !0, await a(t);
                                            try {
                                                const e = JSON.parse(t);
                                                n = "data: " + JSON.stringify(e) + "\n\ndata: [DONE]\n\n";
                                            } catch (e) {}
                                            if (n) {
                                                l.feed((new TextEncoder).encode(n));
                                                break;
                                            }
                                        }
                                        l.feed(e);
                                    }
                                    await i();
                                }("https://chatgpt.com/backend-api/conversation", {
                                    ...k,
                                    onMessage(t) {
                                        if ("[DONE]" === t.trim()) return r({
                                            event: "DONE"
                                        }), void (e && u(s, e, {
                                            is_visible: !1
                                        }));
                                        let n;
                                        try {
                                            n = JSON.parse(t);
                                        } catch (e) {
                                            return void r({
                                                type: "error",
                                                text: e?.toString()
                                            });
                                        }
                                        if (n?.conversation_id && (e = n.conversation_id), n?.message?.content?.parts?.length && "assistant" === n?.message?.author?.role) {
                                            const e = n.message.content.parts[0];
                                            e && r({
                                                text: e,
                                                messageId: n.message.id,
                                                conversationId: n.conversation_id
                                            });
                                        }
                                    },
                                    async onStart() {},
                                    async onEnd() {},
                                    async onError(e) {
                                        if (e) if (e.detail.code) r({
                                            type: "error",
                                            text: e.detail
                                        }); else {
                                            let t, n;
                                            e.detail.includes("reached our limit of messages per hour") ? (t = "Failed to load response from ChatGPT: You have sent too many requests to the model. Please try again later.", 
                                            n = !0) : (t = e.detail, n = !1), r({
                                                type: "error",
                                                text: t,
                                                block: n
                                            });
                                        }
                                    }
                                });
                            }
                        }(e, n, s);
                    }
                    function Qe(e, t) {
                        if (void 0 === t && (t = e, e = 0), "number" != typeof e || "number" != typeof t) throw new TypeError("Expected all arguments to be numbers");
                        return Math.floor(Math.random() * (t - e + 1) + e);
                    }
                    async function Ve(e, t, n, a) {
                        const i = await fetch(`https://chatgpt.com/backend-api${n}`, {
                            method: t,
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${e}`
                            },
                            body: JSON.stringify(a)
                        }), o = await i.text();
                        return {
                            response: i,
                            responseText: o
                        };
                    }
                    async function He(e) {
                        const t = JSON.parse((await Ve(e, "GET", "/models")).responseText);
                        if (t.models) return t.models.map((e => e.slug));
                    }
                    async function Ge(e) {
                        const t = JSON.parse((await Ve(e, "POST", "/sentinel/chat-requirements")).responseText);
                        if (t) return t;
                    }
                    async function We(e) {
                        if (!e.chatgptArkoseReqUrl) throw new Error("Please login at https://chatgpt.com first\n\nPlease keep https://chatgpt.com open and try again. If it still doesn't work, type some characters in the input box of chatgpt web page and try again.");
                        const t = await fetch("https://chatgpt.com?cgb=vhwi", {
                            method: "POST",
                            body: e.chatgptArkoseReqForm,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                            }
                        }).then((e => e.json())).then((e => e.token)).catch((() => null));
                        if (!t) throw new Error("Failed to get arkose token.\n\nPlease keep https://chatgpt.com open and try again. If it still doesn't work, type some characters in the input box of chatgpt web page and try again.");
                        return t;
                    }
                    async function Ke(e) {
                        return (await Ve(e, "GET", "/accounts/check/v4-2023-04-27")).responseText.includes("shared_websocket");
                    }
                    chrome.runtime.onConnect.addListener((e => {
                        e.onMessage.addListener((async t => {
                            const n = await async function(e) {
                                return e.length > 14e3 && (e = e.slice(0, 14e3)), `${await async function() {
                                    return chrome.storage.local.get("summary_prompt").then((e => e && e.summary_prompt ? e.summary_prompt : "Summarise the main points of the article in a list format:"));
                                }()} ${e}`;
                            }(t.pageContent);
                            try {
                                await Fe(e, n, (t => {
                                    e.postMessage(t);
                                }));
                            } catch (t) {
                                e.postMessage({
                                    error: {}
                                });
                            }
                        }));
                    })), chrome.runtime.onMessage.addListener((async e => {
                        if ("FEEDBACK" === e.type) {
                            let t = await Be();
                            await async function(e, t) {
                                await d(e, "POST", "/conversation/message_feedback", t);
                            }(t, e.data);
                        } else if ("OPEN_OPTIONS_PAGE" === e.type) chrome.runtime.openOptionsPage(); else if ("GET_ACCESS_TOKEN" === e.type) return Be();
                    })), chrome.action.onClicked.addListener((e => {
                        chrome.scripting.executeScript({
                            target: {
                                tabId: e.id
                            },
                            files: [ "javascripts/script.js" ]
                        });
                    })), chrome.runtime.onInstalled.addListener((function(e) {
                        "install" == e.reason && chrome.runtime.openOptionsPage();
                    }));
                })();
            })(), chrome.storage.local.get((e => {
                e && e.appl1_sgpt_arkose_config || chrome.storage.local.set({
                    appl1_sgpt_arkose_config: {
                        chatgptArkoseReqUrl: "",
                        chatgptArkoseReqForm: ""
                    }
                });
            })), chrome.webRequest.onBeforeRequest.addListener((e => {
                if (e.url.includes("/public_key") && !e.url.includes("cgb=vhwi")) {
                    let t = new URLSearchParams;
                    for (const n in e.requestBody.formData) t.append(n, e.requestBody.formData[n]);
                    chrome.storage.local.set({
                        appl1_sgpt_arkose_config: {
                            chatgptArkoseReqUrl: e.url,
                            chatgptArkoseReqForm: t.toString() || new TextDecoder("utf-8").decode(new Uint8Array(e.requestBody.raw[0].bytes))
                        }
                    });
                }
            }), {
                urls: [ "https://*.openai.com/*" ],
                types: [ "xmlhttprequest", "sub_frame" ]
            }, [ "requestBody" ]);
        },
        408: (e, t, n) => {
            n.d(t, {
                s: () => N
            }), e = n.hmd(e);
            var a = "input is invalid type", i = "object" == typeof window, o = i ? window : {};
            o.JS_SHA3_NO_WINDOW && (i = !1);
            var r = !i && "object" == typeof self;
            !o.JS_SHA3_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node ? o = n.g : r && (o = self), 
            !o.JS_SHA3_NO_COMMON_JS && e.exports, "function" == typeof define && n.amdO;
            for (var s = !o.JS_SHA3_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer, l = "0123456789abcdef".split(""), c = [ 4, 1024, 262144, 67108864 ], p = [ 0, 8, 16, 24 ], d = [ 1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648 ], u = [ 224, 256, 384, 512 ], m = [ 128, 256 ], f = [ "hex", "buffer", "arrayBuffer", "array", "digest" ], h = {
                128: 168,
                256: 136
            }, g = o.JS_SHA3_NO_NODE_JS || !Array.isArray ? function(e) {
                return "[object Array]" === Object.prototype.toString.call(e);
            } : Array.isArray, y = !s || !o.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView ? ArrayBuffer.isView : function(e) {
                return "object" == typeof e && e.buffer && e.buffer.constructor === ArrayBuffer;
            }, b = function(e) {
                var t = typeof e;
                if ("string" === t) return [ e, !0 ];
                if ("object" !== t || null === e) throw new Error(a);
                if (s && e.constructor === ArrayBuffer) return [ new Uint8Array(e), !1 ];
                if (!g(e) && !y(e)) throw new Error(a);
                return [ e, !1 ];
            }, w = function(e) {
                return 0 === b(e)[0].length;
            }, v = function(e) {
                for (var t = [], n = 0; n < e.length; ++n) t[n] = e[n];
                return t;
            }, x = function(e, t, n) {
                return function(a) {
                    return new P(e, t, e).update(a)[n]();
                };
            }, _ = function(e, t, n) {
                return function(a, i) {
                    return new P(e, t, i).update(a)[n]();
                };
            }, k = function(e, t, n) {
                return function(t, a, i, o) {
                    return E["cshake" + e].update(t, a, i, o)[n]();
                };
            }, A = function(e, t, n) {
                return function(t, a, i, o) {
                    return E["kmac" + e].update(t, a, i, o)[n]();
                };
            }, S = function(e, t, n, a) {
                for (var i = 0; i < f.length; ++i) {
                    var o = f[i];
                    e[o] = t(n, a, o);
                }
                return e;
            }, T = function(e, t) {
                var n = x(e, t, "hex");
                return n.create = function() {
                    return new P(e, t, e);
                }, n.update = function(e) {
                    return n.create().update(e);
                }, S(n, x, e, t);
            }, I = [ {
                name: "keccak",
                padding: [ 1, 256, 65536, 16777216 ],
                bits: u,
                createMethod: T
            }, {
                name: "sha3",
                padding: [ 6, 1536, 393216, 100663296 ],
                bits: u,
                createMethod: T
            }, {
                name: "shake",
                padding: [ 31, 7936, 2031616, 520093696 ],
                bits: m,
                createMethod: function(e, t) {
                    var n = _(e, t, "hex");
                    return n.create = function(n) {
                        return new P(e, t, n);
                    }, n.update = function(e, t) {
                        return n.create(t).update(e);
                    }, S(n, _, e, t);
                }
            }, {
                name: "cshake",
                padding: c,
                bits: m,
                createMethod: function(e, t) {
                    var n = h[e], a = k(e, 0, "hex");
                    return a.create = function(a, i, o) {
                        return w(i) && w(o) ? E["shake" + e].create(a) : new P(e, t, a).bytepad([ i, o ], n);
                    }, a.update = function(e, t, n, i) {
                        return a.create(t, n, i).update(e);
                    }, S(a, k, e, t);
                }
            }, {
                name: "kmac",
                padding: c,
                bits: m,
                createMethod: function(e, t) {
                    var n = h[e], a = A(e, 0, "hex");
                    return a.create = function(a, i, o) {
                        return new R(e, t, i).bytepad([ "KMAC", o ], n).bytepad([ a ], n);
                    }, a.update = function(e, t, n, i) {
                        return a.create(e, n, i).update(t);
                    }, S(a, A, e, t);
                }
            } ], E = {}, M = [], C = 0; C < I.length; ++C) for (var j = I[C], L = j.bits, U = 0; U < L.length; ++U) {
                var O = j.name + "_" + L[U];
                if (M.push(O), E[O] = j.createMethod(L[U], j.padding), "sha3" !== j.name) {
                    var $ = j.name + L[U];
                    M.push($), E[$] = E[O];
                }
            }
            function P(e, t, n) {
                this.blocks = [], this.s = [], this.padding = t, this.outputBits = n, this.reset = !0, 
                this.finalized = !1, this.block = 0, this.start = 0, this.blockCount = 1600 - (e << 1) >> 5, 
                this.byteCount = this.blockCount << 2, this.outputBlocks = n >> 5, this.extraBytes = (31 & n) >> 3;
                for (var a = 0; a < 50; ++a) this.s[a] = 0;
            }
            function R(e, t, n) {
                P.call(this, e, t, n);
            }
            P.prototype.update = function(e) {
                if (this.finalized) throw new Error("finalize already called");
                var t = b(e);
                e = t[0];
                for (var n, a, i = t[1], o = this.blocks, r = this.byteCount, s = e.length, l = this.blockCount, c = 0, d = this.s; c < s; ) {
                    if (this.reset) for (this.reset = !1, o[0] = this.block, n = 1; n < l + 1; ++n) o[n] = 0;
                    if (i) for (n = this.start; c < s && n < r; ++c) (a = e.charCodeAt(c)) < 128 ? o[n >> 2] |= a << p[3 & n++] : a < 2048 ? (o[n >> 2] |= (192 | a >> 6) << p[3 & n++], 
                    o[n >> 2] |= (128 | 63 & a) << p[3 & n++]) : a < 55296 || a >= 57344 ? (o[n >> 2] |= (224 | a >> 12) << p[3 & n++], 
                    o[n >> 2] |= (128 | a >> 6 & 63) << p[3 & n++], o[n >> 2] |= (128 | 63 & a) << p[3 & n++]) : (a = 65536 + ((1023 & a) << 10 | 1023 & e.charCodeAt(++c)), 
                    o[n >> 2] |= (240 | a >> 18) << p[3 & n++], o[n >> 2] |= (128 | a >> 12 & 63) << p[3 & n++], 
                    o[n >> 2] |= (128 | a >> 6 & 63) << p[3 & n++], o[n >> 2] |= (128 | 63 & a) << p[3 & n++]); else for (n = this.start; c < s && n < r; ++c) o[n >> 2] |= e[c] << p[3 & n++];
                    if (this.lastByteIndex = n, n >= r) {
                        for (this.start = n - r, this.block = o[l], n = 0; n < l; ++n) d[n] ^= o[n];
                        D(d), this.reset = !0;
                    } else this.start = n;
                }
                return this;
            }, P.prototype.encode = function(e, t) {
                var n = 255 & e, a = 1, i = [ n ];
                for (n = 255 & (e >>= 8); n > 0; ) i.unshift(n), n = 255 & (e >>= 8), ++a;
                return t ? i.push(a) : i.unshift(a), this.update(i), i.length;
            }, P.prototype.encodeString = function(e) {
                var t = b(e);
                e = t[0];
                var n = t[1], a = 0, i = e.length;
                if (n) for (var o = 0; o < e.length; ++o) {
                    var r = e.charCodeAt(o);
                    r < 128 ? a += 1 : r < 2048 ? a += 2 : r < 55296 || r >= 57344 ? a += 3 : (r = 65536 + ((1023 & r) << 10 | 1023 & e.charCodeAt(++o)), 
                    a += 4);
                } else a = i;
                return a += this.encode(8 * a), this.update(e), a;
            }, P.prototype.bytepad = function(e, t) {
                for (var n = this.encode(t), a = 0; a < e.length; ++a) n += this.encodeString(e[a]);
                var i = (t - n % t) % t, o = [];
                return o.length = i, this.update(o), this;
            }, P.prototype.finalize = function() {
                if (!this.finalized) {
                    this.finalized = !0;
                    var e = this.blocks, t = this.lastByteIndex, n = this.blockCount, a = this.s;
                    if (e[t >> 2] |= this.padding[3 & t], this.lastByteIndex === this.byteCount) for (e[0] = e[n], 
                    t = 1; t < n + 1; ++t) e[t] = 0;
                    for (e[n - 1] |= 2147483648, t = 0; t < n; ++t) a[t] ^= e[t];
                    D(a);
                }
            }, P.prototype.toString = P.prototype.hex = function() {
                this.finalize();
                for (var e, t = this.blockCount, n = this.s, a = this.outputBlocks, i = this.extraBytes, o = 0, r = 0, s = ""; r < a; ) {
                    for (o = 0; o < t && r < a; ++o, ++r) e = n[o], s += l[e >> 4 & 15] + l[15 & e] + l[e >> 12 & 15] + l[e >> 8 & 15] + l[e >> 20 & 15] + l[e >> 16 & 15] + l[e >> 28 & 15] + l[e >> 24 & 15];
                    r % t == 0 && (n = v(n), D(n), o = 0);
                }
                return i && (e = n[o], s += l[e >> 4 & 15] + l[15 & e], i > 1 && (s += l[e >> 12 & 15] + l[e >> 8 & 15]), 
                i > 2 && (s += l[e >> 20 & 15] + l[e >> 16 & 15])), s;
            }, P.prototype.arrayBuffer = function() {
                this.finalize();
                var e, t = this.blockCount, n = this.s, a = this.outputBlocks, i = this.extraBytes, o = 0, r = 0, s = this.outputBits >> 3;
                e = i ? new ArrayBuffer(a + 1 << 2) : new ArrayBuffer(s);
                for (var l = new Uint32Array(e); r < a; ) {
                    for (o = 0; o < t && r < a; ++o, ++r) l[r] = n[o];
                    r % t == 0 && (n = v(n), D(n));
                }
                return i && (l[r] = n[o], e = e.slice(0, s)), e;
            }, P.prototype.buffer = P.prototype.arrayBuffer, P.prototype.digest = P.prototype.array = function() {
                this.finalize();
                for (var e, t, n = this.blockCount, a = this.s, i = this.outputBlocks, o = this.extraBytes, r = 0, s = 0, l = []; s < i; ) {
                    for (r = 0; r < n && s < i; ++r, ++s) e = s << 2, t = a[r], l[e] = 255 & t, l[e + 1] = t >> 8 & 255, 
                    l[e + 2] = t >> 16 & 255, l[e + 3] = t >> 24 & 255;
                    s % n == 0 && (a = v(a), D(a));
                }
                return o && (e = s << 2, t = a[r], l[e] = 255 & t, o > 1 && (l[e + 1] = t >> 8 & 255), 
                o > 2 && (l[e + 2] = t >> 16 & 255)), l;
            }, R.prototype = new P, R.prototype.finalize = function() {
                return this.encode(this.outputBits, !0), P.prototype.finalize.call(this);
            };
            var D = function(e) {
                var t, n, a, i, o, r, s, l, c, p, u, m, f, h, g, y, b, w, v, x, _, k, A, S, T, I, E, M, C, j, L, U, O, $, P, R, D, N, q, z, B, F, Q, V, H, G, W, K, J, X, Y, Z, ee, te, ne, ae, ie, oe, re, se, le, ce, pe;
                for (a = 0; a < 48; a += 2) i = e[0] ^ e[10] ^ e[20] ^ e[30] ^ e[40], o = e[1] ^ e[11] ^ e[21] ^ e[31] ^ e[41], 
                r = e[2] ^ e[12] ^ e[22] ^ e[32] ^ e[42], s = e[3] ^ e[13] ^ e[23] ^ e[33] ^ e[43], 
                l = e[4] ^ e[14] ^ e[24] ^ e[34] ^ e[44], c = e[5] ^ e[15] ^ e[25] ^ e[35] ^ e[45], 
                p = e[6] ^ e[16] ^ e[26] ^ e[36] ^ e[46], u = e[7] ^ e[17] ^ e[27] ^ e[37] ^ e[47], 
                t = (m = e[8] ^ e[18] ^ e[28] ^ e[38] ^ e[48]) ^ (r << 1 | s >>> 31), n = (f = e[9] ^ e[19] ^ e[29] ^ e[39] ^ e[49]) ^ (s << 1 | r >>> 31), 
                e[0] ^= t, e[1] ^= n, e[10] ^= t, e[11] ^= n, e[20] ^= t, e[21] ^= n, e[30] ^= t, 
                e[31] ^= n, e[40] ^= t, e[41] ^= n, t = i ^ (l << 1 | c >>> 31), n = o ^ (c << 1 | l >>> 31), 
                e[2] ^= t, e[3] ^= n, e[12] ^= t, e[13] ^= n, e[22] ^= t, e[23] ^= n, e[32] ^= t, 
                e[33] ^= n, e[42] ^= t, e[43] ^= n, t = r ^ (p << 1 | u >>> 31), n = s ^ (u << 1 | p >>> 31), 
                e[4] ^= t, e[5] ^= n, e[14] ^= t, e[15] ^= n, e[24] ^= t, e[25] ^= n, e[34] ^= t, 
                e[35] ^= n, e[44] ^= t, e[45] ^= n, t = l ^ (m << 1 | f >>> 31), n = c ^ (f << 1 | m >>> 31), 
                e[6] ^= t, e[7] ^= n, e[16] ^= t, e[17] ^= n, e[26] ^= t, e[27] ^= n, e[36] ^= t, 
                e[37] ^= n, e[46] ^= t, e[47] ^= n, t = p ^ (i << 1 | o >>> 31), n = u ^ (o << 1 | i >>> 31), 
                e[8] ^= t, e[9] ^= n, e[18] ^= t, e[19] ^= n, e[28] ^= t, e[29] ^= n, e[38] ^= t, 
                e[39] ^= n, e[48] ^= t, e[49] ^= n, h = e[0], g = e[1], G = e[11] << 4 | e[10] >>> 28, 
                W = e[10] << 4 | e[11] >>> 28, M = e[20] << 3 | e[21] >>> 29, C = e[21] << 3 | e[20] >>> 29, 
                se = e[31] << 9 | e[30] >>> 23, le = e[30] << 9 | e[31] >>> 23, F = e[40] << 18 | e[41] >>> 14, 
                Q = e[41] << 18 | e[40] >>> 14, $ = e[2] << 1 | e[3] >>> 31, P = e[3] << 1 | e[2] >>> 31, 
                y = e[13] << 12 | e[12] >>> 20, b = e[12] << 12 | e[13] >>> 20, K = e[22] << 10 | e[23] >>> 22, 
                J = e[23] << 10 | e[22] >>> 22, j = e[33] << 13 | e[32] >>> 19, L = e[32] << 13 | e[33] >>> 19, 
                ce = e[42] << 2 | e[43] >>> 30, pe = e[43] << 2 | e[42] >>> 30, te = e[5] << 30 | e[4] >>> 2, 
                ne = e[4] << 30 | e[5] >>> 2, R = e[14] << 6 | e[15] >>> 26, D = e[15] << 6 | e[14] >>> 26, 
                w = e[25] << 11 | e[24] >>> 21, v = e[24] << 11 | e[25] >>> 21, X = e[34] << 15 | e[35] >>> 17, 
                Y = e[35] << 15 | e[34] >>> 17, U = e[45] << 29 | e[44] >>> 3, O = e[44] << 29 | e[45] >>> 3, 
                S = e[6] << 28 | e[7] >>> 4, T = e[7] << 28 | e[6] >>> 4, ae = e[17] << 23 | e[16] >>> 9, 
                ie = e[16] << 23 | e[17] >>> 9, N = e[26] << 25 | e[27] >>> 7, q = e[27] << 25 | e[26] >>> 7, 
                x = e[36] << 21 | e[37] >>> 11, _ = e[37] << 21 | e[36] >>> 11, Z = e[47] << 24 | e[46] >>> 8, 
                ee = e[46] << 24 | e[47] >>> 8, V = e[8] << 27 | e[9] >>> 5, H = e[9] << 27 | e[8] >>> 5, 
                I = e[18] << 20 | e[19] >>> 12, E = e[19] << 20 | e[18] >>> 12, oe = e[29] << 7 | e[28] >>> 25, 
                re = e[28] << 7 | e[29] >>> 25, z = e[38] << 8 | e[39] >>> 24, B = e[39] << 8 | e[38] >>> 24, 
                k = e[48] << 14 | e[49] >>> 18, A = e[49] << 14 | e[48] >>> 18, e[0] = h ^ ~y & w, 
                e[1] = g ^ ~b & v, e[10] = S ^ ~I & M, e[11] = T ^ ~E & C, e[20] = $ ^ ~R & N, e[21] = P ^ ~D & q, 
                e[30] = V ^ ~G & K, e[31] = H ^ ~W & J, e[40] = te ^ ~ae & oe, e[41] = ne ^ ~ie & re, 
                e[2] = y ^ ~w & x, e[3] = b ^ ~v & _, e[12] = I ^ ~M & j, e[13] = E ^ ~C & L, e[22] = R ^ ~N & z, 
                e[23] = D ^ ~q & B, e[32] = G ^ ~K & X, e[33] = W ^ ~J & Y, e[42] = ae ^ ~oe & se, 
                e[43] = ie ^ ~re & le, e[4] = w ^ ~x & k, e[5] = v ^ ~_ & A, e[14] = M ^ ~j & U, 
                e[15] = C ^ ~L & O, e[24] = N ^ ~z & F, e[25] = q ^ ~B & Q, e[34] = K ^ ~X & Z, 
                e[35] = J ^ ~Y & ee, e[44] = oe ^ ~se & ce, e[45] = re ^ ~le & pe, e[6] = x ^ ~k & h, 
                e[7] = _ ^ ~A & g, e[16] = j ^ ~U & S, e[17] = L ^ ~O & T, e[26] = z ^ ~F & $, e[27] = B ^ ~Q & P, 
                e[36] = X ^ ~Z & V, e[37] = Y ^ ~ee & H, e[46] = se ^ ~ce & te, e[47] = le ^ ~pe & ne, 
                e[8] = k ^ ~h & y, e[9] = A ^ ~g & b, e[18] = U ^ ~S & I, e[19] = O ^ ~T & E, e[28] = F ^ ~$ & R, 
                e[29] = Q ^ ~P & D, e[38] = Z ^ ~V & G, e[39] = ee ^ ~H & W, e[48] = ce ^ ~te & ae, 
                e[49] = pe ^ ~ne & ie, e[0] ^= d[a], e[1] ^= d[a + 1];
            };
            const N = E;
        }
    }, t = {};
    function n(a) {
        var i = t[a];
        if (void 0 !== i) return i.exports;
        var o = t[a] = {
            id: a,
            loaded: !1,
            exports: {}
        };
        return e[a](o, o.exports, n), o.loaded = !0, o.exports;
    }
    n.amdO = {}, n.d = (e, t) => {
        for (var a in t) n.o(t, a) && !n.o(e, a) && Object.defineProperty(e, a, {
            enumerable: !0,
            get: t[a]
        });
    }, n.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")();
        } catch (e) {
            if ("object" == typeof window) return window;
        }
    }(), n.hmd = e => ((e = Object.create(e)).children || (e.children = []), Object.defineProperty(e, "exports", {
        enumerable: !0,
        set: () => {
            throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " + e.id);
        }
    }), e), n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), n(17);
})();