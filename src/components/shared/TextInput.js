import React from "react";

const TextInput = ({ label, placeholder, className , value, setValue,labelClassName}) => {
  return (
    <div className={`form-group w-50 d-flex flex-column ${className}`}>
      <label className={`pb-1 ${labelClassName}`} style={{ fontWeight: "bold" }} htmlFor={label}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="form-control p-2 border border-success rounded"
        id={label}
        value={value}
        onChange={(e)=>{setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default TextInput;
