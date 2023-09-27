import { useForm } from 'react-hook-form';
import calculateReadTime from "../../helpers/calculateReadTime.jsx";
import {useNavigate} from "react-router-dom";
import NewPostForm from "../../components/NewPostForm/NewPostForm.jsx";
import "./NewPost.css";

function NewPost() {
    const { register, formState: { errors } } = useForm();

    const navigate = useNavigate();

    function handleFormSubmit(e) {
        e.preventDefault();

        console.log({
            title: e.target.title.value,
            subtitle: e.target.subtitle.value,
            author: e.target.author.value,
            content: e.target.content.value,
            shares: 0,
            comments: 0,
            created: new Date().toISOString(),
            readTime: calculateReadTime(e.target.content.value),
        });

        console.log("Je blog is verstuurd");
        navigate('/blogposts');
    }

    return (
        <main>
            <h2>Verstuur hier een nieuwe post</h2>
            <form onSubmit={handleFormSubmit}>

                <NewPostForm
                    inputType="text"
                    inputName="title"
                    inputLabel="Titel:"
                    inputId="title"
                    validationRules={{
                        required: {
                            value: true,
                            message: "Titel veld is verplicht",
                        },
                        maxLength: {
                            value: 20,
                            message: "Titel mag maximaal 20 karakters zijn",
                        },
                    }}
                    register={register}
                    errors={errors}
                />

                <NewPostForm
                    inputType="text"
                    inputName="subtitle"
                    inputLabel="Subtitel:"
                    inputId="subtitle"
                    validationRules={{
                        required: {
                            value: true,
                            message: "Subtitel veld is verplicht",
                        },
                        maxLength: {
                            value: 30,
                            message: "Subtitel mag maximaal 30 karakters omvatten",
                        },
                    }}
                    register={register}
                    errors={errors}
                />

                <NewPostForm
                    inputType="text"
                    inputName="author"
                    inputLabel="Auteur:"
                    inputId="author"
                    validationRules={{
                        required: {
                            value: true,
                            message: "Auteur veld is verplicht",
                        },
                        maxLength: {
                            value: 30,
                            message: "Auteur mag maximaal 30 karakters zijn",
                        },
                    }}
                    register={register}
                    errors={errors}
                />

                <NewPostForm
                    inputType="textarea"
                    inputName="content"
                    inputLabel="Bericht:"
                    inputId="content"
                    validationRules={{
                        required: {
                            value: true,
                            message: "Bericht veld is verplicht",
                        },
                        minLength: {
                            value: 300,
                            message: "Bericht moet minimaal 300 karakters hebben",
                        },
                        maxLength: {
                            value: 2000,
                            message: "Bericht moet maximaal 2000 karakters hebben",
                        },
                    }}
                    register={register}
                    errors={errors}
                />

                <button type="submit">Versturen</button>
            </form>

        </main>
    );
}

export default NewPost;