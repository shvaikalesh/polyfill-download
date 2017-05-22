(function() {
  "use strict"

  if ("function" != typeof navigator.msSaveBlob) return
  if ("download" in HTMLAnchorElement.prototype) return

  document.addEventListener("click", function(event) {
    if (event.defaultPrevented) return

    var link = event.target.closest("a, area")
    if (!link || !link.hasAttribute("download")) return

    var name =
      link.getAttribute("download").trim() ||
      link.pathname.split("/").pop()

    var req = new XMLHttpRequest
    req.open("GET", link.href)
    req.send()

    req.responseType = "blob"
    req.onload = function() {
      if (req.status == 200)
        navigator.msSaveBlob(req.response, name)
    }

    event.preventDefault()
  })
})()
