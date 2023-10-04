import {useEffect, useState} from "react";
import axios from "axios";
import calculateReadTime from "../../helpers/calculateReadTime.jsx";
import NewPostForm from "../../components/NewPostForm/NewPostForm.jsx";
import {Link, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

function UpdatePost() {
    const {id} = useParams();
    const { register, formState: { errors } } = useForm();
    const [updatePost, setUpdatePost] = useState([]);
    const [errorUpdatePost, toggleErrorUpdatePost] = useState(false);
    const [getById, setGetById] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        console.log('useEffect is called');
        fetchPostById();
    } , []);

    async function fetchPostById() {
        try {
            const result = await axios.get(`http://localhost:3000/posts/${id}`);
            console.log(result.data);
            setGetById(result.data);
        } catch (e) {
            console.error(e);
        }
    }

    function handleChange(e) {
        setGetById({
            ...getById,
            [e.target.name]: e.target.value,
        });
    }

    async function handleFormUpdateSubmit(e) {
        e.preventDefault();
        toggleErrorUpdatePost(false);
        navigate("/blogposts/");

        try {
            const result = await axios.put(`http://localhost:3000/posts/${id}`, {
                id: getById.id,
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
            setUpdatePost(result.data);
        } catch (e) {
            console.error(e);
            toggleErrorUpdatePost(true);
        }
    }

    return (
        <main>
            <h2>Update hier uw post</h2>
            <h4>Je moet in ieder geval de titel, subtitel en auteur opnieuw intypen.</h4>
            <form onSubmit={handleFormUpdateSubmit}>
                {errorUpdatePost && <p className="error-message">Er gaat helaas iets mis, probeer het later nog eens ...</p>}

                <NewPostForm
                    inputType="text"
                    inputValue={getById.title}
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
                    inputValue={getById.subtitle}
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
                    inputValue={getById.author}
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
                    value={getById.content}
                    onChange={handleChange}
                    cols="30"
                    rows="10"
                    required
                    minLength={300}
                    maxLength={2000}>
                </textarea>

                <button type="submit">Updaten</button>
                <button type="button" onClick={() => navigate("/blogposts/")}>Terug naar alle posts</button>
                {Object.keys(updatePost).length > 0 && <p>De post is succesvol veranderd. <Link to={`/blogposts/${updatePost.id}`}>Klik hier</Link></p>}


            </form>

        </main>
    )
}

export default UpdatePost