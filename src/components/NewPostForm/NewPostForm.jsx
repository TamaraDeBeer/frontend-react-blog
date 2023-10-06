import "./NewPostForm.css";
import {useState} from "react";

function NewPostForm({inputType, inputValue, inputName, onChange, inputLabel, inputId, validationRules, register, errors}) {
    // const [updateValue, setUpdateValue] = useState(inputValue);
    console.log(onChange);

    return (
        <>

            <label htmlFor={inputId}>
                {inputLabel}
                <input
                    name={inputName}
                    type={inputType}
                    value={inputValue}
                    onChange={(e) => onChange(e.target.value)}
                    id={inputId}
                    {...register(inputName, validationRules)}
                />
            </label>
            {errors[inputName] && <p>{errors[inputName].message}</p>}
        </>

    );
}

export default NewPostForm;