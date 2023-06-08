import classNames from "classnames";
import { getIn } from "formik";
import React from "react";

function TextInputSecodary({
  showErrorOnTouch = true,
  label,
  field,
  form: { touched, errors },
  containerStyles,
  idValue,
  ...restProps
}) {
  const errorMessage = getIn(errors, field.name);
  const touch = getIn(touched, field.name);
  return (
    <div className={classNames(containerStyles)}>
      <label
        htmlFor={idValue}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          type="text"
          {...field}
          {...restProps}
          id={idValue}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
}

export default TextInputSecodary;
