import React from "react";

const TextInput = ({ label, placeholder , value, setValue }) => {
  return (
    <div className="form-group w-50 d-flex flex-column">
      <label className="pb-1" style={{ fontWeight: "bold" }} htmlFor={label}>
        {label}
      </label>
      <input
          type="password"
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
