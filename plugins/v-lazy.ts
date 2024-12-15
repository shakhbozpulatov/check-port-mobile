export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('lazy-load', {
    mounted(el) {
      function loadImage() {
        const dataUrl = el.getAttribute('data-url')
        if (dataUrl) {
          el.setAttribute('src', dataUrl)
          el.removeAttribute('data-url')
        }
      }

      function handleIntersection(entries, observer) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage()
            observer.unobserve(el)
          }
        })
      }

      const observer = new IntersectionObserver(handleIntersection)
      observer.observe(el)
    },
  })
})
