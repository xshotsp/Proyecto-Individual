// validation.js

export const validation = (inputs) => {
  const errors = {};
  const regexName = /^[A-Z]+[a-z0-9\s]{3,25}$/;
  const regexDescription = /^[^$%&|<>#]{15,255}$/;
  const regexReleased = /^\d{4}([-])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/;
  const regexRating = /^[0-4](\.+[0-9]{0,2})?$/;
  const regexImage = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/;

  if (!regexName.test(inputs.name) && inputs.name) {
    errors.name =
      "El nombre debe comenzar en mayúscula, no debe contener caracteres especiales y debe tener entre 3 y 25 caracteres";
  }
  if (!regexDescription.test(inputs.description) && inputs.description) {
    errors.description =
      "La descripción no debe contener caracteres especiales y debe tener entre 15 y 255 caracteres";
  }
  if (!regexReleased.test(inputs.released) && inputs.released) {
    errors.released = 'El formato de la fecha debe ser: "yyyy-mm-dd"';
  }
  if (!regexRating.test(inputs.rating) && inputs.rating) {
    errors.rating =
      "El número de rating mayor a 5 o negativo. Puede contener hasta 2 decimales";
  }
  if (!regexImage.test(inputs.image) && inputs.image) {
    errors.image = "Ingrese una URL de imagen válida (png, jpg, jpeg, gif)";
  }

  // Validación para asegurar que todos los campos estén llenos
  if (
    !inputs.name ||
    !inputs.description ||
    !inputs.released ||
    !inputs.rating ||
    !inputs.image
  ) {
    errors.allFields = "Todos los campos son obligatorios";
  }

  return errors;
};
