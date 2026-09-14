import { fireEvent, render, screen } from '@testing-library/react';
import { expect, jest, test } from '@jest/globals';
import FormModal from '@/core/ui/FormModal';

const fields = [{ name: 'name', label: 'Nombre', placeholder: 'Nombre' }];

test('animates the modal in and out before unmounting', () => {
  const onClose = jest.fn();
  const { rerender } = render(
    <FormModal isOpen={false} onClose={onClose} title="Registrar" accentTitle="Videojuego" image="test-image" fields={fields} />,
  );

  rerender(
    <FormModal isOpen onClose={onClose} title="Registrar" accentTitle="Videojuego" image="test-image" fields={fields} />,
  );

  const overlay = screen.getByRole('dialog');
  const form = overlay.querySelector('form') as HTMLFormElement;
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
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('locks page scroll and keeps overflow inside the modal', () => {
  document.body.style.overflow = '';
  const { unmount } = render(
    <FormModal isOpen onClose={jest.fn()} title="Registrar" accentTitle="Videojuego" image="test-image" fields={fields} />,
  );

  expect(document.body.style.overflow).toBe('hidden');
  expect(screen.getByRole('dialog').querySelector('form')).toHaveClass('overflow-y-auto', 'overscroll-contain');

  unmount();
  expect(document.body.style.overflow).toBe('');
});

test('renders the modal overlay outside the layout stacking context', () => {
  render(
    <div className="route-enter">
      <header>Navbar</header>
      <FormModal isOpen onClose={jest.fn()} title="Registrar" accentTitle="Videojuego" image="test-image" fields={fields} />
    </div>,
  );

  expect(screen.getByRole('dialog').parentElement).toBe(document.body);
});
