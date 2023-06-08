import classNames from "classnames";
import { getIn } from "formik";
import React from "react";

function TextInput({
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
    <div
      className={classNames(
        "relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600",
        containerStyles
      )}
    >
      <label
        htmlFor={idValue}
        class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type="text"
        {...field}
        {...restProps}
        id={idValue}
        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus-visible:outline-none sm:text-sm"
        // placeholder="Jane"
      />
    </div>
  );
  return (
    <div className={field.value ? "dirty" : ""}>
      <label>{label}</label>

      <input
        type="text"
        {...field}
        {...restProps}
        className={
          showErrorOnTouch
            ? touch && errorMessage
              ? "invalid"
              : ""
            : errorMessage && "invalid"
        }
      />

      {showErrorOnTouch
        ? touch && errorMessage && <span className="error">{errorMessage}</span>
        : errorMessage && <span className="error">{errorMessage}</span>}
    </div>
  );
}

export default TextInput;
