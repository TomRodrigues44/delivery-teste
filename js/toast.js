// Sistema de Toast Notifications
class Toast {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    // Criar container se não existir
    if (!document.querySelector('.toast-container')) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    } else {
      this.container = document.querySelector('.toast-container');
    }
  }

  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Ícone baseado no tipo
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };

    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close">&times;</button>
    `;

    // Adicionar ao container
    this.container.appendChild(toast);

    // Botão de fechar
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => this.hide(toast));

    // Auto esconder após duração
    setTimeout(() => this.hide(toast), duration);

    return toast;
  }

  hide(toast) {
    if (!toast) return;
    
    toast.classList.add('hiding');
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }

  success(message, duration) {
    return this.show(message, 'success', duration);
  }

  error(message, duration) {
    return this.show(message, 'error', duration);
  }

  warning(message, duration) {
    return this.show(message, 'warning', duration);
  }

  info(message, duration) {
    return this.show(message, 'info', duration);
  }
}

// Criar instância global
const toast = new Toast();

// Exportar para uso global
window.toast = toast;