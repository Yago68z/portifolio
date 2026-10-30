/**
 * ============================================================================
 * MÓDULO DE CONTATO (contact.js)
 * ============================================================================
 * Gerencia a funcionalidade de cópia de e-mail para a área de transferência
 * com feedback visual instantâneo e fallback para todos os navegadores.
 */

export function initContact() {
  const copyBtn = document.getElementById("btn-copy-email");
  const emailTextEl = document.getElementById("contact-email-val");
  const copyToast = document.getElementById("copy-toast");

  if (!copyBtn || !emailTextEl) {
    return;
  }

  let resetTimer = null;

  copyBtn.addEventListener("click", async () => {
    const emailToCopy = emailTextEl.textContent.trim();

    try {
      // 1. Tenta a API Clipboard moderna
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(emailToCopy);
      } else {
        // 2. Fallback para execCommand (funciona em file:// e navegadores antigos)
        executeFallbackCopy(emailToCopy);
      }

      showFeedback(true);
    } catch (err) {
      // Se a Clipboard API for bloqueada por permissão, tenta o fallback
      try {
        executeFallbackCopy(emailToCopy);
        showFeedback(true);
      } catch (fallbackErr) {
        console.warn("Não foi possível copiar automaticamente:", fallbackErr);
        showFeedback(false);
      }
    }
  });

  function executeFallbackCopy(text) {
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = text;
    tempTextarea.setAttribute("readonly", "");
    if (tempTextarea.style) {
      tempTextarea.style.position = "fixed";
      tempTextarea.style.left = "-9999px";
      tempTextarea.style.top = "0";
      tempTextarea.style.opacity = "0";
    }
    document.body.appendChild(tempTextarea);
    tempTextarea.focus();
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
  }

  function showFeedback(success) {
    if (resetTimer) clearTimeout(resetTimer);

    const btnText = copyBtn.querySelector(".btn-text");
    const originalText = "Copiar E-mail";

    if (success) {
      copyBtn.classList.add("copied");
      if (btnText) btnText.textContent = "✓ Copiado!";
      if (copyToast) {
        copyToast.textContent = "✓ E-mail copiado para a área de transferência!";
        copyToast.classList.add("visible");
      }
    } else {
      if (btnText) btnText.textContent = "Selecione para copiar";
      if (copyToast) {
        copyToast.textContent = "Selecione o e-mail acima para copiar";
        copyToast.classList.add("visible");
      }
    }

    resetTimer = setTimeout(() => {
      copyBtn.classList.remove("copied");
      if (btnText) btnText.textContent = originalText;
      if (copyToast) copyToast.classList.remove("visible");
    }, 2800);
  }
}
