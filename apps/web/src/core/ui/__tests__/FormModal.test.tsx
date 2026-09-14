import { fireEvent, render, screen } from '@testing-library/react';
import { expect, jest, test } from '@jest/globals';
import FormModal from '@/core/ui/FormModal';

const fields = [{ name: 'name', label: 'Nombre', placeholder: 'Nombre' }];

test('animates the modal in and out before unmounting', () => {
  const onClose = jest.fn();
  const { container, rerender } = render(
    <FormModal isOpen={false} onClose={onClose} title="Registrar" accentTitle="Videojuego" image="test-image" fields={fields} />,
  );

  rerender(
    <FormModal isOpen onClose={onClose} title="Registrar" accentTitle="Videojuego" image="test-image" fields={fields} />,
  );

  const form = container.querySelector('form') as HTMLFormElement;
  const overlay = form.parentElement as HTMLElement;
  expect(overlay).toHaveAttribute('role', 'dialog');
  expect(overlay).toHaveAttribute('aria-modal', 'true');
  expect(overlay).toHaveClass('modal-backdrop-enter');
  expect(form).toHaveClass('modal-panel-enter');

  fireEvent.click(screen.getByRole('button', { name: 'Cerrar formulario' }));
  expect(onClose).toHaveBeenCalledTimes(1);

  rerender(
    <FormModal isOpen={false} onClose={onClose} title="Registrar" accentTitle="Videojuego" image="test-image" fields={fields} />,
  );
  expect(overlay).toHaveClass('modal-backdrop-exit');

  fireEvent.animationEnd(overlay);
  expect(container.querySelector('form')).not.toBeInTheDocument();
});

test('locks page scroll and keeps overflow inside the modal', () => {
  document.body.style.overflow = '';
  const { container, unmount } = render(
    <FormModal isOpen onClose={jest.fn()} title="Registrar" accentTitle="Videojuego" image="test-image" fields={fields} />,
  );

  expect(document.body.style.overflow).toBe('hidden');
  expect(container.querySelector('form')).toHaveClass('overflow-y-auto', 'overscroll-contain');

  unmount();
  expect(document.body.style.overflow).toBe('');
});
