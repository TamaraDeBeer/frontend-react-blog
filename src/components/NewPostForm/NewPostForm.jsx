import "./NewPostForm.css";

function NewPostForm({inputType, inputValue, inputName, inputLabel, inputId, validationRules, register, errors}) {
    return (
        <>
            <label htmlFor={inputId}>
                {inputLabel}
                <input
                    type={inputType}
                    placeholder={inputValue}
                    id={inputId}
                    {...register(inputName, validationRules)}
                />
            </label>
            {errors[inputName] && <p>{errors[inputName].message}</p>}
        </>

    );
}
export default NewPostForm;