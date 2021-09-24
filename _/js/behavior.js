;(function () {
  'use strict'

  var hash = window.location.hash
  find('.tabset').forEach(function (tabset) {
    var active
    var tabs = tabset.querySelector('.tabs')
    if (tabs) {
      var first
      find('li', tabs).forEach(function (tab, idx) {
        var id = (tab.querySelector('a[id]') || tab).id
        var label = (tab.querySelector('a[id]') || tab).parentElement.innerText
        if (!id) return
        var pane = getPane(id, tabset)
        if (!idx) first = { tab: tab, pane: pane }
        if (!active && hash === '#' + id && (active = true)) {
          tab.classList.add('is-active')
          if (pane) pane.classList.add('is-active')
        } else if (!idx) {
          tab.classList.remove('is-active')
          if (pane) pane.classList.remove('is-active')
        }
        tab.addEventListener('click', activateTab.bind({ tabset: tabset, tab: tab, pane: pane, label: label }))
      })
      if (!active && first) {
        first.tab.classList.add('is-active')
        if (first.pane) first.pane.classList.add('is-active')
      }
    }
    tabset.classList.remove('is-loading')
  })

  function activateTab (e) {
    var tab = this.tab
    var pane = this.pane
    var label = this.label
    find('.tabs li').forEach(function (it) {
      if (it.children[0].innerText === label) {
        it.classList.add('is-active');
      } else {
        it.classList.remove('is-active');
      }
    })
    find('.tab-pane').forEach(function (it) {
      if (it.getAttribute('aria-labelledby').includes(label.toLowerCase())) {
        it.classList.add('is-active');
      } else {
        it.classList.remove('is-active');
      }
    })
    e.preventDefault()
  }

  function find (selector, from) {
    return Array.prototype.slice.call((from || document).querySelectorAll(selector))
  }

  function getPane (id, tabset) {
    return find('.tab-pane', tabset).find(function (it) {
      return it.getAttribute('aria-labelledby') === id
    })
  }
})()
