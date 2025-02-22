/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("@tensorflow/tfjs-core"), require("@tensorflow/tfjs-converter")) : "function" == typeof define && define.amd ? define(["exports", "@tensorflow/tfjs-core", "@tensorflow/tfjs-converter"], e) : e(t.bodyPix = {}, t.tf, t.tf)
}(this, function(t, e, n) {
    "use strict";
    var r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
            })(t, e)
    };

    function o(t, e) {
        function n() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
    }
    var i = function() {
        return (i = Object.assign || function(t) {
            for (var e, n = 1, r = arguments.length; n < r; n++)
                for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            return t
        }).apply(this, arguments)
    };

    function a(t, e, n, r) {
        return new(n || (n = Promise))(function(o, i) {
            function a(t) {
                try {
                    u(r.next(t))
                } catch (t) {
                    i(t)
                }
            }

            function s(t) {
                try {
                    u(r.throw(t))
                } catch (t) {
                    i(t)
                }
            }

            function u(t) {
                t.done ? o(t.value) : new n(function(e) {
                    e(t.value)
                }).then(a, s)
            }
            u((r = r.apply(t, e || [])).next())
        })
    }

    function s(t, e) {
        var n, r, o, i, a = {
            label: 0,
            sent: function() {
                if (1 & o[0]) throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: s(0),
            throw: s(1),
            return: s(2)
        }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }), i;

        function s(i) {
            return function(s) {
                return function(i) {
                    if (n) throw new TypeError("Generator is already executing.");
                    for (; a;) try {
                        if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                        switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return a.label++, {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                a.label++, r = i[1], i = [0];
                                continue;
                            case 7:
                                i = a.ops.pop(), a.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    a = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    a.label = i[1];
                                    break
                                }
                                if (6 === i[0] && a.label < o[1]) {
                                    a.label = o[1], o = i;
                                    break
                                }
                                if (o && a.label < o[2]) {
                                    a.label = o[2], a.ops.push(i);
                                    break
                                }
                                o[2] && a.ops.pop(), a.trys.pop();
                                continue
                        }
                        i = e.call(t, a)
                    } catch (t) {
                        i = [6, t], r = 0
                    } finally {
                        n = o = 0
                    }
                    if (5 & i[0]) throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, s])
            }
        }
    }

    function u(t) {
        var n = t.shape[2],
            r = t.argMax(2).reshape([-1]);
        return e.oneHot(r, n)
    }

    function d(t, n) {
        return e.tidy(function() {
            return t.greater(e.scalar(n)).toInt()
        })
    }
    var f = function() {
            function t(t, n) {
                this.model = t, this.outputStride = n;
                var r = this.model.inputs[0].shape;
                e.util.assert(-1 === r[1] && -1 === r[2], function() {
                    return "Input shape [" + r[1] + ", " + r[2] + "] must both be equal to or -1"
                })
            }
            return t.prototype.predict = function(t) {
                var n = this;
                return e.tidy(function() {
                    var e = n.preprocessInput(t.toFloat()).expandDims(0),
                        r = n.model.predict(e).map(function(t) {
                            return t.squeeze([0])
                        }),
                        o = n.nameOutputResults(r);
                    return {
                        heatmapScores: o.heatmap.sigmoid(),
                        offsets: o.offsets,
                        displacementFwd: o.displacementFwd,
                        displacementBwd: o.displacementBwd,
                        segmentation: o.segmentation,
                        partHeatmaps: o.partHeatmaps,
                        longOffsets: o.longOffsets,
                        partOffsets: o.partOffsets
                    }
                })
            }, t.prototype.dispose = function() {
                this.model.dispose()
            }, t
        }(),
        l = function(t) {
            function n() {
                return null !== t && t.apply(this, arguments) || this
            }
            return o(n, t), n.prototype.preprocessInput = function(t) {
                return e.tidy(function() {
                    return e.div(t, 127.5).sub(1)
                })
            }, n.prototype.nameOutputResults = function(t) {
                return {
                    offsets: t[0],
                    segmentation: t[1],
                    partHeatmaps: t[2],
                    longOffsets: t[3],
                    heatmap: t[4],
                    displacementFwd: t[5],
                    displacementBwd: t[6],
                    partOffsets: t[7]
                }
            }, n
        }(f),
        c = ["nose", "leftEye", "rightEye", "leftEar", "rightEar", "leftShoulder", "rightShoulder", "leftElbow", "rightElbow", "leftWrist", "rightWrist", "leftHip", "rightHip", "leftKnee", "rightKnee", "leftAnkle", "rightAnkle"],
        h = c.length,
        p = c.reduce(function(t, e, n) {
            return t[e] = n, t
        }, {});
    [
        ["leftHip", "leftShoulder"],
        ["leftElbow", "leftShoulder"],
        ["leftElbow", "leftWrist"],
        ["leftHip", "leftKnee"],
        ["leftKnee", "leftAnkle"],
        ["rightHip", "rightShoulder"],
        ["rightElbow", "rightShoulder"],
        ["rightElbow", "rightWrist"],
        ["rightHip", "rightKnee"],
        ["rightKnee", "rightAnkle"],
        ["leftShoulder", "rightShoulder"],
        ["leftHip", "rightHip"]
    ].map(function(t) {
        var e = t[0],
            n = t[1];
        return [p[e], p[n]]
    });

    function m(t, e, n) {
        var r = t[0],
            o = t[1],
            i = e[0],
            a = e[1],
            s = n.top,
            u = n.bottom;
        return [a / (n.left + n.right + o), i / (s + u + r)]
    }

    function g(t, e, n, r) {
        return {
            y: r.get(t, e, n),
            x: r.get(t, e, n + h)
        }
    }

    function v(t, e, n) {
        var r = g(t.heatmapY, t.heatmapX, t.id, n),
            o = r.y,
            i = r.x;
        return {
            x: t.heatmapX * e + i,
            y: t.heatmapY * e + o
        }
    }

    function w(t, e, n) {
        return t < e ? e : t > n ? n : t
    }

    function y(t, e) {
        return {
            x: t.x + e.x,
            y: t.y + e.y
        }
    }

    function b(t, e, n) {
        void 0 === n && (n = .3);
        for (var r = 0, o = 0, i = 0; i < t.length; i++) e.keypoints[i].score > n && (o += 1, r += Math.pow(t[i].x - e.keypoints[i].position.x, 2) + Math.pow(t[i].y - e.keypoints[i].position.y, 2));
        return 0 === o ? r = 1 / 0 : r /= o, r
    }

    function x(t, e, n, r, o, i, a) {
        for (var s = a[0], u = a[1], d = n(t), f = d.y * r + d.x, l = o[h * (2 * f) + e], c = o[h * (2 * f + 1) + e], p = t.y + l, m = t.x + c, g = 0; g < i; g++) {
            p = Math.min(p, s - 1);
            var v = n({
                    x: m = Math.min(m, u - 1),
                    y: p
                }),
                w = v.y * r + v.x;
            p += l = o[h * (2 * w) + e], m += c = o[h * (2 * w + 1) + e]
        }
        return {
            x: m,
            y: p
        }
    }

    function S(t, e, n, r, o, i, a, s, u, d) {
        for (var f = o[0], l = o[1], c = i[0], h = i[1], p = s[0], m = s[1], g = [], v = function(t) {
                return function(t, e, n, r) {
                    var o = e[0],
                        i = e[1],
                        a = n[0],
                        s = n[1],
                        u = Math.round(((o + t.y + 1) * s - 1) / r);
                    return {
                        x: Math.round(((i + t.x + 1) * a - 1) / r),
                        y: u
                    }
                }(t, [f, l], [c, h], u)
            }, w = 0; w < r; w++) {
            var y = x(t, w, v, a, e, d, [p, m]);
            g.push(y)
        }
        for (var S = -1, M = 1 / 0, k = 0; k < n.length; k++) {
            var _ = b(g, n[k]);
            _ < M && (S = k, M = _)
        }
        return S
    }

    function M(t, e) {
        var n = t[0],
            r = t[1];
        return [Math.round((r - 1) / e + 1), Math.round((n - 1) / e + 1)]
    }

    function k(t, n, r, o, i, a, s, u, d, f, l) {
        for (var c = s[0], p = s[1], g = t.shape, v = g[0], w = g[1], y = n.shape.slice(0, 2), b = y[0], x = y[1], S = n.reshape([b, x, 2, h]), M = new Float32Array(l * h * 3).fill(0), k = 0; k < r.length; k++)
            for (var _ = k * h * 3, E = r[k], P = 0; P < h; P++) {
                var O = E.keypoints[P],
                    I = _ + 3 * P;
                M[I] = O.score, M[I + 1] = O.position.y, M[I + 2] = O.position.x
            }
        var A = m([o, i], [c, p], u),
            R = A[0],
            H = A[1],
            T = e.tensor(M, [l, h, 3]),
            B = u.top,
            F = u.left,
            D = {
                variableNames: ["segmentation", "longOffsets", "poses"],
                outputShape: [v, w],
                userCode: "\n    int convertToPositionInOutput(int pos, int pad, float scale, int stride) {\n      return round(((float(pos + pad) + 1.0) * scale - 1.0) / float(stride));\n    }\n\n    float convertToPositionInOutputFloat(\n        int pos, int pad, float scale, int stride) {\n      return ((float(pos + pad) + 1.0) * scale - 1.0) / float(stride);\n    }\n\n    float dist(float x1, float y1, float x2, float y2) {\n      return pow(x1 - x2, 2.0) + pow(y1 - y2, 2.0);\n    }\n\n    float sampleLongOffsets(float h, float w, int d, int k) {\n      float fh = fract(h);\n      float fw = fract(w);\n      int clH = int(ceil(h));\n      int clW = int(ceil(w));\n      int flH = int(floor(h));\n      int flW = int(floor(w));\n      float o11 = getLongOffsets(flH, flW, d, k);\n      float o12 = getLongOffsets(flH, clW, d, k);\n      float o21 = getLongOffsets(clH, flW, d, k);\n      float o22 = getLongOffsets(clH, clW, d, k);\n      float o1 = mix(o11, o12, fw);\n      float o2 = mix(o21, o22, fw);\n      return mix(o1, o2, fh);\n    }\n\n    int findNearestPose(int h, int w) {\n      float prob = getSegmentation(h, w);\n      if (prob < 1.0) {\n        return -1;\n      }\n\n      // Done(Tyler): convert from output space h/w to strided space.\n      float stridedH = convertToPositionInOutputFloat(\n        h, " + B + ", " + H + ", " + a + ");\n      float stridedW = convertToPositionInOutputFloat(\n        w, " + F + ", " + R + ", " + a + ");\n\n      float minDist = 1000000.0;\n      int iMin = -1;\n      for (int i = 0; i < " + l + "; i++) {\n        float curDistSum = 0.0;\n        int numKpt = 0;\n        for (int k = 0; k < " + h + "; k++) {\n          float dy = sampleLongOffsets(stridedH, stridedW, 0, k);\n          float dx = sampleLongOffsets(stridedH, stridedW, 1, k);\n\n          float y = float(h) + dy;\n          float x = float(w) + dx;\n\n          for (int s = 0; s < " + d + "; s++) {\n            int yRounded = round(min(y, float(" + (o - 1) + ")));\n            int xRounded = round(min(x, float(" + (i - 1) + ")));\n\n            float yStrided = convertToPositionInOutputFloat(\n              yRounded, " + B + ", " + H + ", " + a + ");\n            float xStrided = convertToPositionInOutputFloat(\n              xRounded, " + F + ", " + R + ", " + a + ");\n\n            float dy = sampleLongOffsets(yStrided, xStrided, 0, k);\n            float dx = sampleLongOffsets(yStrided, xStrided, 1, k);\n\n            y = y + dy;\n            x = x + dx;\n          }\n\n          float poseScore = getPoses(i, k, 0);\n          float poseY = getPoses(i, k, 1);\n          float poseX = getPoses(i, k, 2);\n          if (poseScore > " + f + ") {\n            numKpt = numKpt + 1;\n            curDistSum = curDistSum + dist(x, y, poseX, poseY);\n          }\n        }\n        if (numKpt > 0 && curDistSum / float(numKpt) < minDist) {\n          minDist = curDistSum / float(numKpt);\n          iMin = i;\n        }\n      }\n      return iMin;\n    }\n\n    void main() {\n        ivec2 coords = getOutputCoords();\n        int nearestPose = findNearestPose(coords[0], coords[1]);\n        setOutput(float(nearestPose));\n      }\n  "
            };
        return e.backend().compileAndRun(D, [t, S, T])
    }

    function _() {
        return "webgl" === e.getBackend()
    }

    function E(t, n, r, o, i, u, d, f, l, c, h, p) {
        var g = d[0],
            v = d[1];
        return void 0 === l && (l = .2), void 0 === c && (c = 8), void 0 === h && (h = .3), void 0 === p && (p = 10), a(this, void 0, void 0, function() {
            var a, d, w, y, b;
            return s(this, function(s) {
                switch (s.label) {
                    case 0:
                        return a = r.filter(function(t) {
                            return t.score >= l
                        }), _() ? (w = e.tidy(function() {
                            var r = k(t, n, a, o, i, u, [g, v], f, c, h, p);
                            return a.map(function(t, n) {
                                return function(t, n) {
                                    return e.tidy(function() {
                                        return t.equal(e.scalar(n)).toInt()
                                    })
                                }(r, n)
                            })
                        }), [4, Promise.all(w.map(function(t) {
                            return t.data()
                        }))]) : [3, 2];
                    case 1:
                        return d = s.sent(), w.forEach(function(t) {
                            return t.dispose()
                        }), [3, 5];
                    case 2:
                        return [4, t.data()];
                    case 3:
                        return y = s.sent(), [4, n.data()];
                    case 4:
                        b = s.sent(), d = function(t, e, n, r, o, i, a, s, u, d) {
                            var f = a[0],
                                l = a[1];
                            void 0 === d && (d = 5);
                            for (var c = n.map(function(t) {
                                    return new Uint8Array(r * o).fill(0)
                                }), h = s.top, p = s.left, g = m([r, o], [f, l], s), v = g[0], w = g[1], y = M([f, l], i)[0], b = 0; b < r; b += 1)
                                for (var x = 0; x < o; x += 1) {
                                    var k = b * o + x;
                                    if (1 === t[k]) {
                                        var _ = S({
                                            x: x,
                                            y: b
                                        }, e, n, d, [h, p], [v, w], y, [r, o], i, u);
                                        _ >= 0 && (c[_][k] = 1)
                                    }
                                }
                            return c
                        }(y, b, a, o, i, u, [g, v], f, c), s.label = 5;
                    case 5:
                        return [2, d.map(function(t, e) {
                            return {
                                data: t,
                                pose: a[e],
                                width: i,
                                height: o
                            }
                        })]
                }
            })
        })
    }

    function P(t, n, r, o, i, u, d, f, l, c, h, p, g) {
        var v = f[0],
            w = f[1];
        return void 0 === c && (c = .2), void 0 === h && (h = 8), void 0 === p && (p = .3), void 0 === g && (g = 10), a(this, void 0, void 0, function() {
            var a, f, y, b, x, E;
            return s(this, function(s) {
                switch (s.label) {
                    case 0:
                        return a = o.filter(function(t) {
                            return t.score >= c
                        }), _() ? (y = e.tidy(function() {
                            var o = k(t, n, a, i, u, d, [v, w], l, h, p, g);
                            return a.map(function(t, n) {
                                return function(t, n, r) {
                                    return e.tidy(function() {
                                        return t.equal(e.scalar(r)).toInt().mul(n.add(1)).sub(1)
                                    })
                                }(o, r, n)
                            })
                        }), [4, Promise.all(y.map(function(t) {
                            return t.data()
                        }))]) : [3, 2];
                    case 1:
                        return f = s.sent(), y.forEach(function(t) {
                            return t.dispose()
                        }), [3, 6];
                    case 2:
                        return [4, t.data()];
                    case 3:
                        return b = s.sent(), [4, n.data()];
                    case 4:
                        return x = s.sent(), [4, r.data()];
                    case 5:
                        E = s.sent(), f = function(t, e, n, r, o, i, a, s, u, d, f) {
                            var l = s[0],
                                c = s[1];
                            void 0 === f && (f = 5);
                            for (var h = r.map(function(t) {
                                    return new Int32Array(o * i).fill(-1)
                                }), p = u.top, g = u.left, v = m([o, i], [l, c], u), w = v[0], y = v[1], b = M([l, c], a)[0], x = 0; x < o; x += 1)
                                for (var k = 0; k < i; k += 1) {
                                    var _ = x * i + k;
                                    if (1 === t[_]) {
                                        var E = S({
                                            x: k,
                                            y: x
                                        }, e, r, f, [p, g], [w, y], b, [o, i], a, d);
                                        E >= 0 && (h[E][_] = n[_])
                                    }
                                }
                            return h
                        }(b, x, E, a, i, u, d, [v, w], l, h), s.label = 6;
                    case 6:
                        return [2, f.map(function(t, e) {
                            return {
                                pose: a[e],
                                data: t,
                                height: i,
                                width: u
                            }
                        })]
                }
            })
        })
    }

    function O(t) {
        return Math.floor(t / 2)
    }
    var I = function() {
        function t(t, e) {
            this.priorityQueue = new Array(t), this.numberOfElements = -1, this.getElementValue = e
        }
        return t.prototype.enqueue = function(t) {
            this.priorityQueue[++this.numberOfElements] = t, this.swim(this.numberOfElements)
        }, t.prototype.dequeue = function() {
            var t = this.priorityQueue[0];
            return this.exchange(0, this.numberOfElements--), this.sink(0), this.priorityQueue[this.numberOfElements + 1] = null, t
        }, t.prototype.empty = function() {
            return -1 === this.numberOfElements
        }, t.prototype.size = function() {
            return this.numberOfElements + 1
        }, t.prototype.all = function() {
            return this.priorityQueue.slice(0, this.numberOfElements + 1)
        }, t.prototype.max = function() {
            return this.priorityQueue[0]
        }, t.prototype.swim = function(t) {
            for (; t > 0 && this.less(O(t), t);) this.exchange(t, O(t)), t = O(t)
        }, t.prototype.sink = function(t) {
            for (; 2 * t <= this.numberOfElements;) {
                var e = 2 * t;
                if (e < this.numberOfElements && this.less(e, e + 1) && e++, !this.less(t, e)) break;
                this.exchange(t, e), t = e
            }
        }, t.prototype.getValueAt = function(t) {
            return this.getElementValue(this.priorityQueue[t])
        }, t.prototype.less = function(t, e) {
            return this.getValueAt(t) < this.getValueAt(e)
        }, t.prototype.exchange = function(t, e) {
            var n = this.priorityQueue[t];
            this.priorityQueue[t] = this.priorityQueue[e], this.priorityQueue[e] = n
        }, t
    }();

    function A(t, e, n, r, o, i) {
        for (var a = i.shape, s = a[0], u = a[1], d = !0, f = Math.max(n - o, 0), l = Math.min(n + o + 1, s), c = f; c < l; ++c) {
            for (var h = Math.max(r - o, 0), p = Math.min(r + o + 1, u), m = h; m < p; ++m)
                if (i.get(c, m, t) > e) {
                    d = !1;
                    break
                } if (!d) break
        }
        return d
    }
    var R = [
            ["nose", "leftEye"],
            ["leftEye", "leftEar"],
            ["nose", "rightEye"],
            ["rightEye", "rightEar"],
            ["nose", "leftShoulder"],
            ["leftShoulder", "leftElbow"],
            ["leftElbow", "leftWrist"],
            ["leftShoulder", "leftHip"],
            ["leftHip", "leftKnee"],
            ["leftKnee", "leftAnkle"],
            ["nose", "rightShoulder"],
            ["rightShoulder", "rightElbow"],
            ["rightElbow", "rightWrist"],
            ["rightShoulder", "rightHip"],
            ["rightHip", "rightKnee"],
            ["rightKnee", "rightAnkle"]
        ].map(function(t) {
            var e = t[0],
                n = t[1];
            return [p[e], p[n]]
        }),
        H = R.map(function(t) {
            return t[1]
        }),
        T = R.map(function(t) {
            return t[0]
        });

    function B(t, e, n, r) {
        return {
            y: w(Math.round(t.y / e), 0, n - 1),
            x: w(Math.round(t.x / e), 0, r - 1)
        }
    }

    function F(t, e, n, r, o, i, a, s) {
        void 0 === s && (s = 2);
        for (var u = r.shape, d = u[0], f = u[1], l = function(t, e, n) {
                var r = n.shape[2] / 2;
                return {
                    y: n.get(e.y, e.x, t),
                    x: n.get(e.y, e.x, r + t)
                }
            }(t, B(e.position, i, d, f), a), h = y(e.position, l), p = 0; p < s; p++) {
            var m = B(h, i, d, f),
                v = g(m.y, m.x, n, o);
            h = y({
                x: m.x * i,
                y: m.y * i
            }, {
                x: v.x,
                y: v.y
            })
        }
        var w = B(h, i, d, f),
            b = r.get(w.y, w.x, n);
        return {
            position: h,
            part: c[n],
            score: b
        }
    }

    function D(t, e, n, r, o, i) {
        var a = e.shape[2],
            s = H.length,
            u = new Array(a),
            d = t.part,
            f = t.score,
            l = v(d, r, n);
        u[d.id] = {
            score: f,
            part: c[d.id],
            position: l
        };
        for (var h = s - 1; h >= 0; --h) {
            var p = H[h],
                m = T[h];
            u[p] && !u[m] && (u[m] = F(h, u[p], m, e, n, r, i))
        }
        for (h = 0; h < s; ++h) {
            p = T[h], m = H[h];
            u[p] && !u[m] && (u[m] = F(h, u[p], m, e, n, r, o))
        }
        return u
    }

    function L(t, e, n, r) {
        var o = n.x,
            i = n.y;
        return t.some(function(t) {
            var n, a, s, u, d, f, l = t.keypoints[r].position;
            return n = i, a = o, s = l.y, u = l.x, (d = s - n) * d + (f = u - a) * f <= e
        })
    }

    function q(t, e, n) {
        return n.reduce(function(n, r, o) {
            var i = r.position,
                a = r.score;
            return L(t, e, i, o) || (n += a), n
        }, 0) / n.length
    }
    var z = 1;

    function C(t, e, n, r, o, i, a, s) {
        void 0 === a && (a = .5), void 0 === s && (s = 20);
        for (var u = [], d = function(t, e, n) {
                for (var r = n.shape, o = r[0], i = r[1], a = r[2], s = new I(o * i * a, function(t) {
                        return t.score
                    }), u = 0; u < o; ++u)
                    for (var d = 0; d < i; ++d)
                        for (var f = 0; f < a; ++f) {
                            var l = n.get(u, d, f);
                            l < t || A(f, l, u, d, e, n) && s.enqueue({
                                score: l,
                                part: {
                                    heatmapY: u,
                                    heatmapX: d,
                                    id: f
                                }
                            })
                        }
                return s
            }(a, z, t), f = s * s; u.length < i && !d.empty();) {
            var l = d.dequeue();
            if (!L(u, f, v(l.part, o, e), l.part.id)) {
                var c = D(l, t, e, o, n, r),
                    h = q(u, f, c);
                u.push({
                    keypoints: c,
                    score: h
                })
            }
        }
        return u
    }
    var W, K = [-123.15, -115.9, -103.06],
        j = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return o(e, t), e.prototype.preprocessInput = function(t) {
                return t.add(K)
            }, e.prototype.nameOutputResults = function(t) {
                var e = t[0],
                    n = t[1],
                    r = t[2],
                    o = t[3],
                    i = t[4],
                    a = t[5];
                return {
                    offsets: i,
                    segmentation: t[6],
                    partHeatmaps: a,
                    longOffsets: o,
                    heatmap: r,
                    displacementFwd: n,
                    displacementBwd: e,
                    partOffsets: t[7]
                }
            }, e
        }(f),
        N = "https://storage.googleapis.com/tfjs-models/savedmodel/bodypix/resnet50/",
        V = "https://storage.googleapis.com/tfjs-models/savedmodel/bodypix/mobilenet/";

    function Q(t) {
        if ("undefined" != typeof HTMLCanvasElement && t instanceof HTMLCanvasElement || "undefined" != typeof HTMLImageElement && t instanceof HTMLImageElement) return function(t) {
            if (0 !== t.offsetHeight && 0 !== t.offsetWidth) return [t.offsetHeight, t.offsetWidth];
            if (null != t.height && null != t.width) return [t.height, t.width];
            throw new Error("HTMLImageElement must have height and width attributes set.")
        }(t);
        if ("undefined" != typeof ImageData && t instanceof ImageData) return [t.height, t.width];
        if ("undefined" != typeof HTMLVideoElement && t instanceof HTMLVideoElement) return function(t) {
            return null != t.height && null != t.width ? [t.height, t.width] : [t.videoHeight, t.videoWidth]
        }(t);
        if (t instanceof e.Tensor) return [t.shape[0], t.shape[1]];
        throw new Error("error: Unknown input type: " + t + ".")
    }

    function U(t, e) {
        return function(t, e) {
            return (t - 1) % e == 0
        }(t, e) ? t : Math.floor(t / e) * e + 1
    }
    var X = {
            low: "low",
            medium: "medium",
            high: "high",
            full: "full"
        },
        Y = ((W = {})[X.low] = .25, W[X.medium] = .5, W[X.high] = .75, W[X.full] = 1, W),
        G = .1,
        J = 2;

    function Z(t, n, r) {
        var o = r[0],
            i = r[1],
            a = function(t) {
                if ("string" == typeof t) {
                    var n = Y[t];
                    return e.util.assert("number" == typeof n, function() {
                        return "string value of inputResolution must be one of " + Object.values(X).join(",") + " but was " + t + "."
                    }), n
                }
                return e.util.assert("number" == typeof t && t <= J && t >= G, function() {
                    return "inputResolution must be a string or number between " + G + " and " + J + ", but was " + t
                }), t
            }(t);
        return [U(o * a, n), U(i * a, n)]
    }

    function $(t, n, r, o, i) {
        var a = n[0],
            s = n[1],
            u = r[0],
            d = r[1],
            f = o[0],
            l = f[0],
            c = f[1],
            h = o[1],
            p = h[0],
            m = h[1];
        return void 0 === i && (i = !1), e.tidy(function() {
            var n = t.resizeBilinear([u, d], !0);
            return i && (n = n.sigmoid()),
                function(t, n, r) {
                    var o = n[0],
                        i = n[1],
                        a = r[0],
                        s = a[0],
                        u = a[1],
                        d = r[1],
                        f = d[0],
                        l = d[1];
                    return e.tidy(function() {
                        return e.image.cropAndResize(t.expandDims(), [
                            [s / (o + s + u - 1), f / (i + f + l - 1), (s + o - 1) / (o + s + u - 1), (f + i - 1) / (i + f + l - 1)]
                        ], [0], [o, i]).squeeze([0])
                    })
                }(n, [a, s], [
                    [l, c],
                    [p, m]
                ])
        })
    }

    function tt(t, n) {
        var r = n[0],
            o = n[1],
            i = Q(t),
            a = i[0],
            s = i[1],
            u = o / r,
            d = [0, 0, 0, 0],
            f = d[0],
            l = d[1],
            c = d[2],
            h = d[3];
        return s / a < u ? (f = 0, l = 0, c = Math.round(.5 * (u * a - s)), h = Math.round(.5 * (u * a - s))) : (f = Math.round(.5 * (1 / u * s - a)), l = Math.round(.5 * (1 / u * s - a)), c = 0, h = 0), {
            resized: e.tidy(function() {
                var n = function(t) {
                    return t instanceof e.Tensor ? t : e.browser.fromPixels(t)
                }(t);
                return (n = e.pad3d(n, [
                    [f, l],
                    [c, h],
                    [0, 0]
                ])).resizeBilinear([r, o])
            }),
            padding: {
                top: f,
                left: c,
                right: h,
                bottom: l
            }
        }
    }

    function et(t) {
        return a(this, void 0, void 0, function() {
            return s(this, function(e) {
                return [2, Promise.all(t.map(function(t) {
                    return t.buffer()
                }))]
            })
        })
    }

    function nt(t, e) {
        return {
            score: t.score,
            keypoints: t.keypoints.map(function(t) {
                var n = t.score,
                    r = t.part,
                    o = t.position;
                return {
                    score: n,
                    part: r,
                    position: {
                        x: e - 1 - o.x,
                        y: o.y
                    }
                }
            })
        }
    }

    function rt(t, e, n, r, o) {
        var i = e[0],
            a = e[1],
            s = n[0],
            u = n[1],
            d = function(t, e, n, r, o) {
                return void 0 === r && (r = 0), void 0 === o && (o = 0), 1 === n && 1 === e && 0 === r && 0 === o ? t : t.map(function(t) {
                    return function(t, e, n, r, o) {
                        return void 0 === r && (r = 0), void 0 === o && (o = 0), {
                            score: t.score,
                            keypoints: t.keypoints.map(function(t) {
                                var i = t.score,
                                    a = t.part,
                                    s = t.position;
                                return {
                                    score: i,
                                    part: a,
                                    position: {
                                        x: s.x * n + o,
                                        y: s.y * e + r
                                    }
                                }
                            })
                        }
                    }(t, e, n, r, o)
                })
            }(t, (i + r.top + r.bottom) / s, (a + r.left + r.right) / u, -r.top, -r.left);
        return o ? function(t, e) {
            return e <= 0 ? t : t.map(function(t) {
                return nt(t, e)
            })
        }(d, a) : d
    }
    var ot = {
            architecture: "MobileNetV1",
            outputStride: 16,
            quantBytes: 4,
            multiplier: .75
        },
        it = ["MobileNetV1", "ResNet50"],
        at = {
            MobileNetV1: [8, 16, 32],
            ResNet50: [32, 16]
        },
        st = {
            MobileNetV1: [.5, .75, 1],
            ResNet50: [1]
        },
        ut = [1, 2, 4];
    var dt = {
            flipHorizontal: !1,
            internalResolution: "medium",
            segmentationThreshold: .7,
            maxDetections: 10,
            scoreThreshold: .4,
            nmsRadius: 20
        },
        ft = {
            flipHorizontal: !1,
            internalResolution: "medium",
            segmentationThreshold: .7,
            maxDetections: 10,
            scoreThreshold: .4,
            nmsRadius: 20,
            minKeypointScore: .3,
            refineSteps: 10
        };

    function lt(t) {
        var e = t.segmentationThreshold,
            n = t.maxDetections,
            r = t.scoreThreshold,
            o = t.nmsRadius;
        if (e < 0 || e > 1) throw new Error("segmentationThreshold " + e + ". Should be in range [0.0, 1.0]");
        if (n <= 0) throw new Error("Invalid maxDetections " + n + ". Should be > 0");
        if (r < 0 || r > 1) throw new Error("Invalid scoreThreshold " + r + ". Should be in range [0.0, 1.0]");
        if (o <= 0) throw new Error("Invalid nmsRadius " + o + ".")
    }

    function ct(t) {
        var e = t.segmentationThreshold,
            n = t.maxDetections,
            r = t.scoreThreshold,
            o = t.nmsRadius,
            i = t.minKeypointScore,
            a = t.refineSteps;
        if (e < 0 || e > 1) throw new Error("segmentationThreshold " + e + ". Should be in range [0.0, 1.0]");
        if (n <= 0) throw new Error("Invalid maxDetections " + n + ". Should be > 0");
        if (r < 0 || r > 1) throw new Error("Invalid scoreThreshold " + r + ". Should be in range [0.0, 1.0]");
        if (o <= 0) throw new Error("Invalid nmsRadius " + o + ".");
        if (i < 0 || i > 1) throw new Error("Invalid minKeypointScore " + i + ".Should be in range [0.0, 1.0]");
        if (a <= 0 || a > 20) throw new Error("Invalid refineSteps " + a + ".Should be in range [1, 20]")
    }
    var ht = function() {
        function t(t) {
            this.baseModel = t
        }
        return t.prototype.predictForPersonSegmentation = function(t) {
            var e = this.baseModel.predict(t);
            return {
                segmentLogits: e.segmentation,
                heatmapScores: e.heatmapScores,
                offsets: e.offsets,
                displacementFwd: e.displacementFwd,
                displacementBwd: e.displacementBwd
            }
        }, t.prototype.predictForPersonSegmentationAndPart = function(t) {
            var e = this.baseModel.predict(t);
            return {
                segmentLogits: e.segmentation,
                partHeatmapLogits: e.partHeatmaps,
                heatmapScores: e.heatmapScores,
                offsets: e.offsets,
                displacementFwd: e.displacementFwd,
                displacementBwd: e.displacementBwd
            }
        }, t.prototype.predictForMultiPersonInstanceSegmentationAndPart = function(t) {
            var e = this.baseModel.predict(t);
            return {
                segmentLogits: e.segmentation,
                longOffsets: e.longOffsets,
                heatmapScores: e.heatmapScores,
                offsets: e.offsets,
                displacementFwd: e.displacementFwd,
                displacementBwd: e.displacementBwd,
                partHeatmaps: e.partHeatmaps
            }
        }, t.prototype.segmentPersonActivation = function(t, n, r) {
            var o = this;
            void 0 === r && (r = .5);
            var i = Q(t),
                a = i[0],
                s = i[1],
                u = Z(n, this.baseModel.outputStride, [a, s]),
                f = tt(t, u),
                l = f.resized,
                c = f.padding,
                h = e.tidy(function() {
                    var t = o.predictForPersonSegmentation(l),
                        e = t.segmentLogits,
                        n = t.heatmapScores,
                        i = t.offsets,
                        u = t.displacementFwd,
                        f = t.displacementBwd,
                        h = l.shape,
                        p = h[0],
                        m = h[1];
                    return {
                        segmentation: d($(e, [a, s], [p, m], [
                            [c.top, c.bottom],
                            [c.left, c.right]
                        ], !0).squeeze(), r),
                        heatmapScores: n,
                        offsets: i,
                        displacementFwd: u,
                        displacementBwd: f
                    }
                }),
                p = h.segmentation,
                m = h.heatmapScores,
                g = h.offsets,
                v = h.displacementFwd,
                w = h.displacementBwd;
            return l.dispose(), {
                segmentation: p,
                heatmapScores: m,
                offsets: g,
                displacementFwd: v,
                displacementBwd: w,
                padding: c,
                internalResolutionHeightAndWidth: u
            }
        }, t.prototype.segmentPerson = function(t, e) {
            return void 0 === e && (e = dt), a(this, void 0, void 0, function() {
                var n, r, o, a, u, d, f, l, c, h, p, m, g, v, w, y, b, x;
                return s(this, function(s) {
                    switch (s.label) {
                        case 0:
                            return lt(e = i({}, dt, e)), n = this.segmentPersonActivation(t, e.internalResolution, e.segmentationThreshold), r = n.segmentation, o = n.heatmapScores, a = n.offsets, u = n.displacementFwd, d = n.displacementBwd, f = n.padding, l = n.internalResolutionHeightAndWidth, c = r.shape, h = c[0], p = c[1], [4, r.data()];
                        case 1:
                            return m = s.sent(), r.dispose(), [4, et([o, a, u, d])];
                        case 2:
                            return g = s.sent(), v = g[0], w = g[1], y = g[2], b = g[3], x = rt(x = C(v, w, y, b, this.baseModel.outputStride, e.maxDetections, e.scoreThreshold, e.nmsRadius), [h, p], l, f, !1), o.dispose(), a.dispose(), u.dispose(), d.dispose(), [2, {
                                height: h,
                                width: p,
                                data: m,
                                allPoses: x
                            }]
                    }
                })
            })
        }, t.prototype.segmentMultiPerson = function(t, n) {
            return void 0 === n && (n = ft), a(this, void 0, void 0, function() {
                var r, o, a, u, f, l, c, h, p, m, g, v, w, y, b, x, S, M, k, _, P, O = this;
                return s(this, function(s) {
                    switch (s.label) {
                        case 0:
                            return ct(n = i({}, ft, n)), r = Q(t), o = r[0], a = r[1], u = Z(n.internalResolution, this.baseModel.outputStride, [o, a]), f = tt(t, u), l = f.resized, c = f.padding, h = e.tidy(function() {
                                var t, e = O.predictForMultiPersonInstanceSegmentationAndPart(l),
                                    r = e.segmentLogits,
                                    i = e.longOffsets,
                                    s = e.heatmapScores,
                                    f = e.offsets,
                                    h = e.displacementFwd,
                                    p = e.displacementBwd;
                                return t = i, {
                                    segmentation: d($(r, [o, a], u, [
                                        [c.top, c.bottom],
                                        [c.left, c.right]
                                    ], !0).squeeze(), n.segmentationThreshold),
                                    longOffsets: t,
                                    heatmapScoresRaw: s,
                                    offsetsRaw: f,
                                    displacementFwdRaw: h,
                                    displacementBwdRaw: p
                                }
                            }), p = h.segmentation, m = h.longOffsets, g = h.heatmapScoresRaw, v = h.offsetsRaw, w = h.displacementFwdRaw, y = h.displacementBwdRaw, [4, et([g, v, w, y])];
                        case 1:
                            return b = s.sent(), x = b[0], S = b[1], M = b[2], k = b[3], _ = rt(_ = C(x, S, M, k, this.baseModel.outputStride, n.maxDetections, n.scoreThreshold, n.nmsRadius), [o, a], u, c, !1), [4, E(p, m, _, o, a, this.baseModel.outputStride, u, c, n.scoreThreshold, n.refineSteps, n.minKeypointScore, n.maxDetections)];
                        case 2:
                            return P = s.sent(), l.dispose(), p.dispose(), m.dispose(), g.dispose(), v.dispose(), w.dispose(), y.dispose(), [2, P]
                    }
                })
            })
        }, t.prototype.segmentPersonPartsActivation = function(t, n, r) {
            var o = this;
            void 0 === r && (r = .5);
            var i = Q(t),
                a = i[0],
                s = i[1],
                f = Z(n, this.baseModel.outputStride, [a, s]),
                l = tt(t, f),
                c = l.resized,
                h = l.padding,
                p = e.tidy(function() {
                    var t = o.predictForPersonSegmentationAndPart(c),
                        n = t.segmentLogits,
                        i = t.partHeatmapLogits,
                        f = t.heatmapScores,
                        l = t.offsets,
                        p = t.displacementFwd,
                        m = t.displacementBwd,
                        g = c.shape,
                        v = g[0],
                        w = g[1],
                        y = $(n, [a, s], [v, w], [
                            [h.top, h.bottom],
                            [h.left, h.right]
                        ], !0),
                        b = $(i, [a, s], [v, w], [
                            [h.top, h.bottom],
                            [h.left, h.right]
                        ], !0);
                    return {
                        partSegmentation: function(t, n) {
                            var r = n.shape,
                                o = r[0],
                                i = r[1],
                                a = r[2];
                            return e.tidy(function() {
                                var r, s, d = u(n),
                                    f = e.range(0, a, 1, "int32").expandDims(1),
                                    l = d.matMul(f).toInt().reshape([o, i]).add(e.scalar(1, "int32"));
                                return (r = l, s = t, r.mul(s)).sub(e.scalar(1, "int32"))
                            })
                        }(d(y.squeeze(), r), b),
                        heatmapScores: f,
                        offsets: l,
                        displacementFwd: p,
                        displacementBwd: m
                    }
                }),
                m = p.partSegmentation,
                g = p.heatmapScores,
                v = p.offsets,
                w = p.displacementFwd,
                y = p.displacementBwd;
            return c.dispose(), {
                partSegmentation: m,
                heatmapScores: g,
                offsets: v,
                displacementFwd: w,
                displacementBwd: y,
                padding: h,
                internalResolutionHeightAndWidth: f
            }
        }, t.prototype.segmentPersonParts = function(t, e) {
            return void 0 === e && (e = dt), a(this, void 0, void 0, function() {
                var n, r, o, a, u, d, f, l, c, h, p, m, g, v, w, y, b, x;
                return s(this, function(s) {
                    switch (s.label) {
                        case 0:
                            return lt(e = i({}, dt, e)), n = this.segmentPersonPartsActivation(t, e.internalResolution, e.segmentationThreshold), r = n.partSegmentation, o = n.heatmapScores, a = n.offsets, u = n.displacementFwd, d = n.displacementBwd, f = n.padding, l = n.internalResolutionHeightAndWidth, c = r.shape, h = c[0], p = c[1], [4, r.data()];
                        case 1:
                            return m = s.sent(), r.dispose(), [4, et([o, a, u, d])];
                        case 2:
                            return g = s.sent(), v = g[0], w = g[1], y = g[2], b = g[3], x = rt(x = C(v, w, y, b, this.baseModel.outputStride, e.maxDetections, e.scoreThreshold, e.nmsRadius), [h, p], l, f, !1), o.dispose(), a.dispose(), u.dispose(), d.dispose(), [2, {
                                height: h,
                                width: p,
                                data: m,
                                allPoses: x
                            }]
                    }
                })
            })
        }, t.prototype.segmentMultiPersonParts = function(t, n) {
            return void 0 === n && (n = ft), a(this, void 0, void 0, function() {
                var r, o, a, f, l, c, h, p, m, g, v, w, y, b, x, S, M, k, _, E, O, I, A = this;
                return s(this, function(s) {
                    switch (s.label) {
                        case 0:
                            return ct(n = i({}, ft, n)), r = Q(t), o = r[0], a = r[1], f = Z(n.internalResolution, this.baseModel.outputStride, [o, a]), l = tt(t, f), c = l.resized, h = l.padding, p = e.tidy(function() {
                                var t = A.predictForMultiPersonInstanceSegmentationAndPart(c),
                                    r = t.segmentLogits,
                                    i = t.longOffsets,
                                    s = t.heatmapScores,
                                    l = t.offsets,
                                    p = t.displacementFwd,
                                    m = t.displacementBwd,
                                    g = t.partHeatmaps,
                                    v = $(r, [o, a], f, [
                                        [h.top, h.bottom],
                                        [h.left, h.right]
                                    ], !0),
                                    w = $(g, [o, a], f, [
                                        [h.top, h.bottom],
                                        [h.left, h.right]
                                    ], !0),
                                    y = i;
                                return {
                                    segmentation: d(v.squeeze(), n.segmentationThreshold),
                                    longOffsets: y,
                                    heatmapScoresRaw: s,
                                    offsetsRaw: l,
                                    displacementFwdRaw: p,
                                    displacementBwdRaw: m,
                                    partSegmentation: function(t) {
                                        var n = t.shape,
                                            r = n[0],
                                            o = n[1],
                                            i = n[2];
                                        return e.tidy(function() {
                                            var n = u(t),
                                                a = e.range(0, i, 1, "int32").expandDims(1);
                                            return n.matMul(a).toInt().reshape([r, o])
                                        })
                                    }(w)
                                }
                            }), m = p.segmentation, g = p.longOffsets, v = p.heatmapScoresRaw, w = p.offsetsRaw, y = p.displacementFwdRaw, b = p.displacementBwdRaw, x = p.partSegmentation, [4, et([v, w, y, b])];
                        case 1:
                            return S = s.sent(), M = S[0], k = S[1], _ = S[2], E = S[3], O = rt(O = C(M, k, _, E, this.baseModel.outputStride, n.maxDetections, n.scoreThreshold, n.nmsRadius), [o, a], f, h, !1), [4, P(m, g, x, O, o, a, this.baseModel.outputStride, f, h, n.scoreThreshold, n.refineSteps, n.minKeypointScore, n.maxDetections)];
                        case 2:
                            return I = s.sent(), c.dispose(), m.dispose(), g.dispose(), v.dispose(), w.dispose(), y.dispose(), b.dispose(), x.dispose(), [2, I]
                    }
                })
            })
        }, t.prototype.dispose = function() {
            this.baseModel.dispose()
        }, t
    }();

    function pt(t) {
        return a(this, void 0, void 0, function() {
            var r, o, i, a, u, d;
            return s(this, function(s) {
                switch (s.label) {
                    case 0:
                        if (r = t.outputStride, o = t.quantBytes, i = t.multiplier, null == e) throw new Error("Cannot find TensorFlow.js. If you are using a <script> tag, please also include @tensorflow/tfjs on the page before using this\n        model.");
                        return a = function(t, e, n) {
                            var r = {
                                    1: "100",
                                    .75: "075",
                                    .5: "050"
                                },
                                o = "model-stride" + t + ".json";
                            return 4 === n ? V + "float/" + r[e] + "/" + o : V + "quant" + n + "/" + r[e] + "/" + o
                        }(r, i, o), [4, n.loadGraphModel(t.modelUrl || a)];
                    case 1:
                        return u = s.sent(), d = new l(u, r), [2, new ht(d)]
                }
            })
        })
    }

    function mt(t) {
        return a(this, void 0, void 0, function() {
            var r, o, i, a, u;
            return s(this, function(s) {
                switch (s.label) {
                    case 0:
                        if (r = t.outputStride, o = t.quantBytes, null == e) throw new Error("Cannot find TensorFlow.js. If you are using a <script> tag, please also include @tensorflow/tfjs on the page before using this\n        model.");
                        return i = function(t, e) {
                            var n = "model-stride" + t + ".json";
                            return 4 === e ? N + "float/" + n : N + "quant" + e + "/" + n
                        }(r, o), [4, n.loadGraphModel(t.modelUrl || i)];
                    case 1:
                        return a = s.sent(), u = new j(a, r), [2, new ht(u)]
                }
            })
        })
    }
    var gt = {};

    function vt(t, e, n, r) {
        var o = t.width,
            i = t.height,
            a = e.width,
            s = e.height;
        if (o !== a || i !== s) throw new Error("error: dimensions must match. " + n + " has dimensions " + o + "x" + i + ", " + r + " has dimensions " + a + "x" + s)
    }

    function wt(t) {
        var e = t.getContext("2d");
        e.scale(-1, 1), e.translate(-t.width, 0)
    }

    function yt(t, e, n) {
        t.globalCompositeOperation = n, t.drawImage(e, 0, 0)
    }

    function bt(t) {
        return gt[t] || (gt[t] = document.createElement("canvas")), gt[t]
    }

    function xt(t, e, n) {
        var r = t.height,
            o = t.width,
            i = n.getContext("2d");
        n.width = o, n.height = r, i.clearRect(0, 0, o, r), i.save(), /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? function(t, e, n) {
            for (var r = t.getContext("2d"), o = 0, i = 1 / (2 * Math.PI * 5 * 5), a = n < 3 ? 1 : 2, s = -n; s <= n; s += a)
                for (var u = -n; u <= n; u += a) o += i * Math.exp(-(u * u + s * s) / 50);
            for (s = -n; s <= n; s += a)
                for (u = -n; u <= n; u += a) r.globalAlpha = i * Math.exp(-(u * u + s * s) / 50) / o * n, r.drawImage(e, u, s);
            r.globalAlpha = 1
        }(n, t, e) : (i.filter = "blur(" + e + "px)", i.drawImage(t, 0, 0, o, r)), i.restore()
    }

    function St(t, e, n) {
        var r = bt(n);
        return 0 === e ? function(t, e) {
            var n = t.width,
                r = t.height;
            e.width = n, e.height = r, e.getContext("2d").drawImage(t, 0, 0, n, r)
        }(t, r) : xt(t, e, r), r
    }

    function Mt(t, e) {
        var n = bt(e);
        return function(t, e) {
            e.width = t.width, e.height = t.height, e.getContext("2d").putImageData(t, 0, 0)
        }(t, n), n
    }

    function kt(t, e, n, r, o) {
        if (void 0 === e && (e = {
                r: 0,
                g: 0,
                b: 0,
                a: 0
            }), void 0 === n && (n = {
                r: 0,
                g: 0,
                b: 0,
                a: 255
            }), void 0 === r && (r = !1), void 0 === o && (o = [1]), Array.isArray(t) && 0 === t.length) return null;
        var i, a = (i = Array.isArray(t) ? t : [t])[0],
            s = a.width,
            u = a.height,
            d = new Uint8ClampedArray(s * u * 4);

        function f(t, e, n, r, o, i) {
            void 0 === i && (i = {
                r: 0,
                g: 255,
                b: 255,
                a: 255
            });
            for (var a = -o; a <= o; a++)
                for (var s = -o; s <= o; s++)
                    if (0 !== a && 0 !== s) {
                        var u = (e + a) * r + (n + s);
                        t[4 * u + 0] = i.r, t[4 * u + 1] = i.g, t[4 * u + 2] = i.b, t[4 * u + 3] = i.a
                    }
        }

        function l(t, e, n, r, o, i) {
            void 0 === o && (o = [1]), void 0 === i && (i = 1);
            for (var a = 0, s = -i; s <= i; s++)
                for (var u = function(i) {
                        if (0 !== s && 0 !== i) {
                            var u = (e + s) * r + (n + i);
                            o.some(function(e) {
                                return e === t[u]
                            }) || (a += 1)
                        }
                    }, d = -i; d <= i; d++) u(d);
            return a > 0
        }
        for (var c = 0; c < u; c += 1)
            for (var h = function(t) {
                    var a = c * s + t;
                    d[4 * a + 0] = n.r, d[4 * a + 1] = n.g, d[4 * a + 2] = n.b, d[4 * a + 3] = n.a;
                    for (var h = function(n) {
                            if (o.some(function(t) {
                                    return t === i[n].data[a]
                                })) {
                                d[4 * a] = e.r, d[4 * a + 1] = e.g, d[4 * a + 2] = e.b, d[4 * a + 3] = e.a;
                                var h = l(i[n].data, c, t, s, o);
                                r && c - 1 >= 0 && c + 1 < u && t - 1 >= 0 && t + 1 < s && h && f(d, c, t, s, 1)
                            }
                        }, p = 0; p < i.length; p++) h(p)
                }, p = 0; p < s; p += 1) h(p);
        return new ImageData(d, s, u)
    }
    var _t = [
        [110, 64, 170],
        [143, 61, 178],
        [178, 60, 178],
        [210, 62, 167],
        [238, 67, 149],
        [255, 78, 125],
        [255, 94, 99],
        [255, 115, 75],
        [255, 140, 56],
        [239, 167, 47],
        [217, 194, 49],
        [194, 219, 64],
        [175, 240, 91],
        [135, 245, 87],
        [96, 247, 96],
        [64, 243, 115],
        [40, 234, 141],
        [28, 219, 169],
        [26, 199, 194],
        [33, 176, 213],
        [47, 150, 224],
        [65, 125, 224],
        [84, 101, 214],
        [99, 81, 195]
    ];
    var Et = {
        blurred: "blurred",
        blurredMask: "blurred-mask",
        mask: "mask",
        lowresPartMask: "lowres-part-mask"
    };
    t.BodyPix = ht, t.load = function(t) {
        return void 0 === t && (t = ot), a(this, void 0, void 0, function() {
            return s(this, function(e) {
                return "ResNet50" === (t = function(t) {
                    if (null == (t = t || ot).architecture && (t.architecture = "MobileNetV1"), it.indexOf(t.architecture) < 0) throw new Error("Invalid architecture " + t.architecture + ". Should be one of " + it);
                    if (null == t.outputStride && (t.outputStride = 16), at[t.architecture].indexOf(t.outputStride) < 0) throw new Error("Invalid outputStride " + t.outputStride + ". Should be one of " + at[t.architecture] + " for architecture " + t.architecture + ".");
                    if (null == t.multiplier && (t.multiplier = 1), st[t.architecture].indexOf(t.multiplier) < 0) throw new Error("Invalid multiplier " + t.multiplier + ". Should be one of " + st[t.architecture] + " for architecture " + t.architecture + ".");
                    if (null == t.quantBytes && (t.quantBytes = 4), ut.indexOf(t.quantBytes) < 0) throw new Error("Invalid quantBytes " + t.quantBytes + ". Should be one of " + ut + " for architecture " + t.architecture + ".");
                    return t
                }(t)).architecture ? [2, mt(t)] : "MobileNetV1" === t.architecture ? [2, pt(t)] : [2, null]
            })
        })
    }, t.blurBodyPart = function(t, e, n, r, o, i, a) {
        void 0 === r && (r = [0, 1]), void 0 === o && (o = 3), void 0 === i && (i = 3), void 0 === a && (a = !1);
        var s = St(e, o, Et.blurred);
        t.width = s.width, t.height = s.height;
        var u = t.getContext("2d");
        if (Array.isArray(n) && 0 === n.length) u.drawImage(s, 0, 0);
        else {
            var d = function(t, e, n) {
                var r = Mt(kt(t, {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0
                }, {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 255
                }, !0, e), Et.mask);
                return 0 === n ? r : St(r, n, Et.blurredMask)
            }(n, r, i);
            u.save(), a && wt(t);
            var f = Q(e),
                l = f[0],
                c = f[1];
            u.drawImage(e, 0, 0, c, l), yt(u, d, "destination-in"), u.restore()
        }
    }, t.drawBokehEffect = function(t, e, n, r, o, i) {
        void 0 === r && (r = 3), void 0 === o && (o = 3), void 0 === i && (i = !1);
        var a = St(e, r, Et.blurred);
        t.width = a.width, t.height = a.height;
        var s = t.getContext("2d");
        if (Array.isArray(n) && 0 === n.length) s.drawImage(a, 0, 0);
        else {
            var u = function(t, e) {
                var n = Mt(kt(t, {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 255
                }, {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0
                }), Et.mask);
                return 0 === e ? n : St(n, e, Et.blurredMask)
            }(n, o);
            s.save(), i && wt(t);
            var d = Q(e),
                f = d[0],
                l = d[1];
            s.drawImage(e, 0, 0, l, f), yt(s, u, "destination-in"), yt(s, a, "destination-over"), s.restore()
        }
    }, t.drawMask = function(t, e, n, r, o, i) {
        void 0 === r && (r = .7), void 0 === o && (o = 0), void 0 === i && (i = !1);
        var a = Q(e),
            s = a[0],
            u = a[1];
        t.width = u, t.height = s;
        var d = t.getContext("2d");
        if (d.save(), i && wt(t), d.drawImage(e, 0, 0), d.globalAlpha = r, n) {
            vt({
                width: u,
                height: s
            }, n, "image", "mask");
            var f = St(Mt(n, Et.mask), o, Et.blurredMask);
            d.drawImage(f, 0, 0, u, s)
        }
        d.restore()
    }, t.drawPixelatedMask = function(t, e, n, r, o, i, a) {
        void 0 === r && (r = .7), void 0 === o && (o = 0), void 0 === i && (i = !1), void 0 === a && (a = 10);
        var s = Q(e),
            u = s[0];
        vt({
            width: s[1],
            height: u
        }, n, "image", "mask");
        var d = St(Mt(n, Et.mask), o, Et.blurredMask);
        t.width = d.width, t.height = d.height;
        var f = t.getContext("2d");
        f.save(), i && wt(t);
        var l = bt(Et.lowresPartMask),
            c = l.getContext("2d");
        l.width = d.width * (1 / a), l.height = d.height * (1 / a), c.drawImage(d, 0, 0, d.width, d.height, 0, 0, l.width, l.height), f.imageSmoothingEnabled = !1, f.drawImage(l, 0, 0, l.width, l.height, 0, 0, t.width, t.height);
        for (var h = 0; h < l.width; h++) f.beginPath(), f.strokeStyle = "#ffffff", f.moveTo(a * h, 0), f.lineTo(a * h, t.height), f.stroke();
        for (h = 0; h < l.height; h++) f.beginPath(), f.strokeStyle = "#ffffff", f.moveTo(0, a * h), f.lineTo(t.width, a * h), f.stroke();
        f.globalAlpha = 1 - r, f.drawImage(e, 0, 0, d.width, d.height), f.restore()
    }, t.toColoredPartMask = function(t, e) {
        if (void 0 === e && (e = _t), Array.isArray(t) && 0 === t.length) return null;
        for (var n, r = (n = Array.isArray(t) ? t : [t])[0], o = r.width, i = r.height, a = new Uint8ClampedArray(o * i * 4), s = 0; s < i * o; ++s) {
            var u = 4 * s;
            a[u + 0] = 255, a[u + 1] = 255, a[u + 2] = 255, a[u + 3] = 255;
            for (var d = 0; d < n.length; d++) {
                var f = n[d].data[s];
                if (-1 !== f) {
                    var l = e[f];
                    if (!l) throw new Error("No color could be found for part id " + f);
                    a[u + 0] = l[0], a[u + 1] = l[1], a[u + 2] = l[2], a[u + 3] = 255
                }
            }
        }
        return new ImageData(a, o, i)
    }, t.toMask = kt, t.PART_CHANNELS = ["left_face", "right_face", "left_upper_arm_front", "left_upper_arm_back", "right_upper_arm_front", "right_upper_arm_back", "left_lower_arm_front", "left_lower_arm_back", "right_lower_arm_front", "right_lower_arm_back", "left_hand", "right_hand", "torso_front", "torso_back", "left_upper_leg_front", "left_upper_leg_back", "right_upper_leg_front", "right_upper_leg_back", "left_lower_leg_front", "left_lower_leg_back", "right_lower_leg_front", "right_lower_leg_back", "left_feet", "right_feet"], t.flipPoseHorizontal = nt, t.resizeAndPadTo = function(t, n, r) {
        var o = n[0],
            i = n[1];
        void 0 === r && (r = !1);
        var a, s, u, d, f, l, c = t.shape,
            h = c[0],
            p = c[1] / h;
        if (p > i / o) {
            a = i;
            var m = o - (s = Math.ceil(a / p));
            u = 0, d = 0, f = Math.floor(m / 2), l = o - (s + f)
        } else {
            s = o;
            var g = i - (a = Math.ceil(o * p));
            u = Math.floor(g / 2), d = i - (a + u), f = 0, l = 0
        }
        return {
            resizedAndPadded: e.tidy(function() {
                var n;
                return n = r ? t.reverse(1).resizeBilinear([s, a]) : t.resizeBilinear([s, a]), e.pad3d(n, [
                    [f, l],
                    [u, d],
                    [0, 0]
                ])
            }),
            paddedBy: [
                [f, l],
                [u, d]
            ]
        }
    }, t.scaleAndCropToInputTensorShape = $, t.version = "2.0.4", Object.defineProperty(t, "__esModule", {
        value: !0
    })
});
//# sourceMappingURL=body-pix.min.js.map
