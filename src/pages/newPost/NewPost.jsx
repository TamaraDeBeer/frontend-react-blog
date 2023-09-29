import { useForm } from 'react-hook-form';
import calculateReadTime from "../../helpers/calculateReadTime.jsx";
import NewPostForm from "../../components/NewPostForm/NewPostForm.jsx";
import "./NewPost.css";
import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function NewPost() {
    const { register, formState: { errors } } = useForm();
    const [addPost, setAddPost] = useState([]);
    const [errorAddPost, toggleErrorAddPost] = useState(false);

    async function handleFormSubmit(e) {
        e.preventDefault();
        toggleErrorAddPost(false);

        try {
            const result = await axios.post(`http://localhost:3000/posts`, {
                title: e.target.title.value,
                subtitle: e.target.subtitle.value,
                content: e.target.content.value,
                created: new Date().toISOString(),
                author: e.target.author.value,
                readTime: calculateReadTime(e.target.content.value),
                comments: 0,
                shares: 0,
            }, {
                'Content-Type': 'application/json'
            });
            console.log(result.data);
            setAddPost(result.data);
        } catch (e) {
            console.error(e);
            toggleErrorAddPost(true);
        }
    }

    return (
        <main>
            <h2>Verstuur hier een nieuwe post</h2>
            <form onSubmit={handleFormSubmit}>
            {errorAddPost && <p className="error-message">Stom...</p>}

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

                <label htmlFor="post-content">Blog bericht:</label>
                <textarea
                    name="content"
                    id="blog-content"
                    cols="30"
                    rows="10"
                    required
                    minLength={300}
                    maxLength={2000}>
                </textarea>

                <button type="submit">Versturen</button>

            </form>

        </main>
    );
}

export default NewPost;