!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('react')))
    : 'function' == typeof define && define.amd
    ? define(['react'], t)
    : 'object' == typeof exports
    ? (exports['biglab-utils'] = t(require('react')))
    : (e['biglab-utils'] = t(e.React))
})(self, (e) =>
  (() => {
    'use strict'
    var t = {
        787: (t) => {
          t.exports = e
        },
      },
      r = {}
    function o(e) {
      var n = r[e]
      if (void 0 !== n) return n.exports
      var a = (r[e] = { exports: {} })
      return t[e](a, a.exports, o), a.exports
    }
    ;(o.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e
      return o.d(t, { a: t }), t
    }),
      (o.d = (e, t) => {
        for (var r in t)
          o.o(t, r) &&
            !o.o(e, r) &&
            Object.defineProperty(e, r, { enumerable: !0, get: t[r] })
      }),
      (o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (o.r = (e) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 })
      })
    var n = {}
    return (
      (() => {
        o.r(n), o.d(n, { HighlightText: () => r })
        var e = o(787),
          t = o.n(e)
        const r = (e) => {
          const { highlight: r, text: o } = e,
            n = o.split(new RegExp(`(${r})`, 'gi'))
          return t().createElement(
            'span',
            null,
            n.map((e, o) =>
              t().createElement(
                'span',
                {
                  key: o,
                  style:
                    e.toLowerCase() === r.toLowerCase()
                      ? { fontWeight: 'bold', color: 'red' }
                      : {},
                },
                e
              )
            )
          )
        }
      })(),
      n
    )
  })()
)
