import "./NewPostForm.css";

function NewPostForm({inputType, inputName, inputLabel, inputId, validationRules, register, errors}) {
    return (
        <>
            <label htmlFor={inputId}>
                {inputLabel}
                <input
                    type={inputType}
                    id={inputId}
                    {...register(inputName, validationRules)}
                />
            </label>
            {errors[inputName] && <p>{errors[inputName].message}</p>}
        </>

    );
}
export default NewPostForm;