// Three small labeled-input components, kept in one file because they
// share the same label+error wrapper markup. Used in the checkout form
// and every admin add/edit form — write the label/error style once here
// instead of repeating <label> + <input> + error <span> everywhere.

export function TextField({ label, error, required, id, ...inputProps }) {
  return (
    <div className="form-field">
      {label && (
        <label className="form-field__label" htmlFor={id}>
          {label}
          {required && <span className="form-field__required"> *</span>}
        </label>
      )}
      <input id={id} className="form-field__input" {...inputProps} />
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}

export function TextAreaField({ label, error, required, id, rows = 4, ...textareaProps }) {
  return (
    <div className="form-field">
      {label && (
        <label className="form-field__label" htmlFor={id}>
          {label}
          {required && <span className="form-field__required"> *</span>}
        </label>
      )}
      <textarea id={id} className="form-field__input" rows={rows} {...textareaProps} />
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}

export function SelectField({ label, error, required, id, options = [], ...selectProps }) {
  return (
    <div className="form-field">
      {label && (
        <label className="form-field__label" htmlFor={id}>
          {label}
          {required && <span className="form-field__required"> *</span>}
        </label>
      )}
      <select id={id} className="form-field__input form-field__select" {...selectProps}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}
