import { fireEvent, render, screen } from '@testing-library/react';
import { expect, jest, test } from '@jest/globals';
import FormSelect from '@/core/ui/FormSelect';

test('filters a long option list and selects a matching option', () => {
  const onChange = jest.fn();

  render(
    <FormSelect
      name="genreId"
      value=""
      placeholder="Selecciona un género"
      aria-label="Género del videojuego"
      options={[
        { label: 'Acción', value: '1' },
        { label: 'Aventura', value: '2' },
        { label: 'RPG', value: '3' },
      ]}
      onChange={onChange}
    />,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Género del videojuego' }));

  expect(screen.getByRole('listbox').parentElement).toHaveClass('max-h-60', 'overflow-y-auto');

  fireEvent.change(screen.getByRole('textbox', { name: 'Buscar género del videojuego' }), {
    target: { value: 'rpg' },
  });

  expect(screen.getByRole('option', { name: 'RPG' })).toBeInTheDocument();
  expect(screen.queryByRole('option', { name: 'Acción' })).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('option', { name: 'RPG' }));
  expect(onChange).toHaveBeenCalledWith('3');
});
