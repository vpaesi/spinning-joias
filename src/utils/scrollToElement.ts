/**
 * Faz scroll suave até um elemento pelo id ou até o topo da página.
 * @param id Id do elemento para scroll. Se não informado, faz scroll até o topo.
 * @param options Opções extras de scroll.
 */

export function scrollToElement(
  id?: string,
  options?: ScrollIntoViewOptions & { top?: number }
) {
  if (id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start", ...options });
      return;
    }
  }
  window.scrollTo({
    top: options?.top ?? 0,
    behavior: "smooth",
  });
}
