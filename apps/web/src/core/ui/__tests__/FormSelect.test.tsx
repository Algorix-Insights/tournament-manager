import { fireEvent, render, screen } from '@testing-library/react';
import { expect, jest, test } from '@jest/globals';
import FormSelect from '@/core/ui/FormSelect';

test('filters a long option list and selects a matching option', () => {
  const onChange = jest.fn();

  render(
    <form>
      <FormSelect
        name="genreId"
        value=""
        placeholder="Selecciona un género"
        aria-label="Género del videojuego"
        options={[
          { label: 'Acción', value: '1' },
          { label: 'Aventura', value: '2' },
          { label: 'RPG', value: '3' },
          { label: 'Fighting', value: '4' },
          { label: 'Carreras', value: '5' },
          { label: 'Estrategia', value: '6' },
        ]}
        onChange={onChange}
      />
    </form>,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Género del videojuego' }));

  const listbox = screen.getByRole('listbox');
  expect(listbox).toHaveClass('max-h-52', 'overflow-y-auto');
  expect(listbox.closest('form')).not.toBeInTheDocument();

  fireEvent.change(screen.getByRole('textbox', { name: 'Buscar género del videojuego' }), {
    target: { value: 'rpg' },
  });

  expect(screen.getByRole('option', { name: 'RPG' })).toBeInTheDocument();
  expect(screen.queryByRole('option', { name: 'Acción' })).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('option', { name: 'RPG' }));
  expect(onChange).toHaveBeenCalledWith('3');
});
