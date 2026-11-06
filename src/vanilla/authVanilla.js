/**
 * FLOWER TRICKS — Módulo de Autenticación Vanilla JavaScript
 * Requisito de evaluación: Construido 100% mediante manipulación nativa del DOM,
 * sin dependencias de JSX, React ni hooks de ningún tipo.
 */

export function mountVanillaAuth(containerElement, onAuthSuccess) {
  if (!containerElement) return () => {};

  // Limpiar el contenedor receptor
  containerElement.replaceChildren();

  let currentMode = 'login'; // 'login' | 'register'
  let timerId = null;

  // 1. Tarjeta contenedora BEM .ft-auth
  const card = document.createElement('section');
  card.className = 'ft-auth';
  card.setAttribute('aria-labelledby', 'auth-heading');

  // 2. Encabezado h1 para accesibilidad y semántica
  const heading = document.createElement('h1');
  heading.id = 'auth-heading';
  heading.className = 'ft-auth__title';
  heading.textContent = 'Acceso a FLOWER TRICKS';
  heading.tabIndex = -1;
  card.appendChild(heading);

  // 3. Contenedor de pestañas
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'ft-auth__tabs';
  tabsContainer.setAttribute('role', 'group');
  tabsContainer.setAttribute('aria-label', 'Selección de modo de autenticación');

  const btnLoginTab = document.createElement('button');
  btnLoginTab.type = 'button';
  btnLoginTab.className = 'ft-btn-tab ft-btn-tab--active';
  btnLoginTab.textContent = 'Iniciar Sesión';
  btnLoginTab.setAttribute('aria-pressed', 'true');

  const btnRegisterTab = document.createElement('button');
  btnRegisterTab.type = 'button';
  btnRegisterTab.className = 'ft-btn-tab';
  btnRegisterTab.textContent = 'Registrarse';
  btnRegisterTab.setAttribute('aria-pressed', 'false');

  tabsContainer.appendChild(btnLoginTab);
  tabsContainer.appendChild(btnRegisterTab);
  card.appendChild(tabsContainer);

  // 4. Región aria-live para anuncios dinámicos de estado
  const globalMessage = document.createElement('p');
  globalMessage.className = 'ft-auth__message';
  globalMessage.setAttribute('aria-live', 'polite');
  globalMessage.setAttribute('role', 'status');
  card.appendChild(globalMessage);

  // 5. Contenedor del formulario dinámico
  const formSlot = document.createElement('div');
  card.appendChild(formSlot);

  containerElement.appendChild(card);

  // Mover el foco al h1 al montar para guiar al usuario
  heading.focus();

  // Función constructora de campos con labels accesibles
  function createField({ id, labelText, type, autocomplete, required, hint }) {
    const fieldWrapper = document.createElement('div');
    fieldWrapper.className = 'ft-auth__field';

    const label = document.createElement('label');
    label.htmlFor = id;
    label.className = 'ft-auth__label';
    label.textContent = labelText;

    const input = document.createElement('input');
    input.id = id;
    input.name = id;
    input.type = type;
    input.autocomplete = autocomplete;
    input.required = required;
    input.className = 'ft-auth__input';

    const errorSpan = document.createElement('span');
    errorSpan.id = `${id}-error`;
    errorSpan.className = 'ft-auth__error';
    errorSpan.setAttribute('aria-live', 'polite');

    input.setAttribute('aria-describedby', `${id}-error`);

    fieldWrapper.appendChild(label);
    if (hint) {
      const hintSmall = document.createElement('small');
      hintSmall.className = 'text-muted small mb-1';
      hintSmall.textContent = hint;
      fieldWrapper.appendChild(hintSmall);
    }
    fieldWrapper.appendChild(input);
    fieldWrapper.appendChild(errorSpan);

    return { fieldWrapper, input, errorSpan };
  }

  // Renderizador del formulario según el modo activo
  function renderForm() {
    formSlot.replaceChildren();
    globalMessage.textContent = '';
    globalMessage.className = 'ft-auth__message';

    const form = document.createElement('form');
    form.className = 'ft-auth__form';
    form.noValidate = true; // Permite validación programática nativa sin popups del navegador

    if (currentMode === 'login') {
      const emailField = createField({
        id: 'auth-login-email',
        labelText: 'Correo electrónico',
        type: 'email',
        autocomplete: 'email',
        required: true,
      });

      const passField = createField({
        id: 'auth-login-password',
        labelText: 'Contraseña',
        type: 'password',
        autocomplete: 'current-password',
        required: true,
      });

      const submitBtn = document.createElement('button');
      submitBtn.type = 'submit';
      submitBtn.className = 'ft-btn-cta ft-auth__submit';
      submitBtn.textContent = 'Entrar a mi cuenta';

      form.appendChild(emailField.fieldWrapper);
      form.appendChild(passField.fieldWrapper);
      form.appendChild(submitBtn);

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        let hasErrors = false;

        // Limpiar errores previos
        [emailField, passField].forEach((f) => {
          f.input.classList.remove('ft-auth__input--invalid');
          f.input.removeAttribute('aria-invalid');
          f.errorSpan.textContent = '';
        });

        const emailVal = emailField.input.value.trim();
        const passVal = passField.input.value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal || !emailRegex.test(emailVal)) {
          emailField.input.classList.add('ft-auth__input--invalid');
          emailField.input.setAttribute('aria-invalid', 'true');
          emailField.errorSpan.textContent = 'Introduce un correo electrónico válido.';
          hasErrors = true;
        }

        if (!passVal || passVal.length < 6) {
          passField.input.classList.add('ft-auth__input--invalid');
          passField.input.setAttribute('aria-invalid', 'true');
          passField.errorSpan.textContent =
            'La contraseña debe contener al menos 6 caracteres.';
          hasErrors = true;
        }

        if (hasErrors) {
          globalMessage.textContent = 'Revisa los campos señalados antes de continuar.';
          globalMessage.className = 'ft-auth__message ft-auth__message--error';
          return;
        }

        globalMessage.textContent = '¡Sesión iniciada con éxito! Redirigiendo...';
        globalMessage.className = 'ft-auth__message ft-auth__message--success';

        timerId = setTimeout(() => {
          if (typeof onAuthSuccess === 'function') {
            onAuthSuccess({ email: emailVal, name: emailVal.split('@')[0] });
          }
        }, 1200);
      });
    } else {
      // Modo Registro
      const nameField = createField({
        id: 'auth-reg-name',
        labelText: 'Nombre completo',
        type: 'text',
        autocomplete: 'name',
        required: true,
      });

      const emailField = createField({
        id: 'auth-reg-email',
        labelText: 'Correo electrónico',
        type: 'email',
        autocomplete: 'email',
        required: true,
      });

      const passField = createField({
        id: 'auth-reg-password',
        labelText: 'Contraseña',
        type: 'password',
        autocomplete: 'new-password',
        required: true,
        hint: 'Mínimo 8 caracteres',
      });

      const passConfirmField = createField({
        id: 'auth-reg-password-confirm',
        labelText: 'Confirmar contraseña',
        type: 'password',
        autocomplete: 'new-password',
        required: true,
      });

      const submitBtn = document.createElement('button');
      submitBtn.type = 'submit';
      submitBtn.className = 'ft-btn-cta ft-auth__submit';
      submitBtn.textContent = 'Crear cuenta';

      form.appendChild(nameField.fieldWrapper);
      form.appendChild(emailField.fieldWrapper);
      form.appendChild(passField.fieldWrapper);
      form.appendChild(passConfirmField.fieldWrapper);
      form.appendChild(submitBtn);

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        let hasErrors = false;

        [nameField, emailField, passField, passConfirmField].forEach((f) => {
          f.input.classList.remove('ft-auth__input--invalid');
          f.input.removeAttribute('aria-invalid');
          f.errorSpan.textContent = '';
        });

        const nameVal = nameField.input.value.trim();
        const emailVal = emailField.input.value.trim();
        const passVal = passField.input.value;
        const passConfirmVal = passConfirmField.input.value;

        if (!nameVal || nameVal.length < 2) {
          nameField.input.classList.add('ft-auth__input--invalid');
          nameField.input.setAttribute('aria-invalid', 'true');
          nameField.errorSpan.textContent = 'Introduce tu nombre completo.';
          hasErrors = true;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal || !emailRegex.test(emailVal)) {
          emailField.input.classList.add('ft-auth__input--invalid');
          emailField.input.setAttribute('aria-invalid', 'true');
          emailField.errorSpan.textContent = 'Introduce un correo electrónico válido.';
          hasErrors = true;
        }

        if (!passVal || passVal.length < 8) {
          passField.input.classList.add('ft-auth__input--invalid');
          passField.input.setAttribute('aria-invalid', 'true');
          passField.errorSpan.textContent =
            'La contraseña debe tener al menos 8 caracteres.';
          hasErrors = true;
        }

        if (passVal !== passConfirmVal) {
          passConfirmField.input.classList.add('ft-auth__input--invalid');
          passConfirmField.input.setAttribute('aria-invalid', 'true');
          passConfirmField.errorSpan.textContent = 'Las contraseñas no coinciden.';
          hasErrors = true;
        }

        if (hasErrors) {
          globalMessage.textContent = 'Por favor, corrige los errores del formulario.';
          globalMessage.className = 'ft-auth__message ft-auth__message--error';
          return;
        }

        globalMessage.textContent =
          '¡Cuenta creada con éxito! Redirigiendo a tu cuenta...';
        globalMessage.className = 'ft-auth__message ft-auth__message--success';

        timerId = setTimeout(() => {
          if (typeof onAuthSuccess === 'function') {
            onAuthSuccess({ email: emailVal, name: nameVal });
          }
        }, 1200);
      });
    }

    formSlot.appendChild(form);
  }

  // Manejadores de pestañas
  function setMode(mode) {
    if (currentMode === mode) return;
    currentMode = mode;

    if (mode === 'login') {
      btnLoginTab.classList.add('ft-btn-tab--active');
      btnLoginTab.setAttribute('aria-pressed', 'true');
      btnRegisterTab.classList.remove('ft-btn-tab--active');
      btnRegisterTab.setAttribute('aria-pressed', 'false');
    } else {
      btnRegisterTab.classList.add('ft-btn-tab--active');
      btnRegisterTab.setAttribute('aria-pressed', 'true');
      btnLoginTab.classList.remove('ft-btn-tab--active');
      btnLoginTab.setAttribute('aria-pressed', 'false');
    }

    renderForm();
  }

  btnLoginTab.addEventListener('click', () => setMode('login'));
  btnRegisterTab.addEventListener('click', () => setMode('register'));

  // Montaje inicial del formulario
  renderForm();

  // Función de destrucción y saneamiento para React.StrictMode
  return function destroy() {
    if (timerId) clearTimeout(timerId);
    btnLoginTab.replaceWith(btnLoginTab.cloneNode(true));
    btnRegisterTab.replaceWith(btnRegisterTab.cloneNode(true));
    containerElement.replaceChildren();
  };
}
