import {useParams} from "react-router-dom";
import createDateToString from "../../helpers/createDateToString.jsx";
import './BlogpostDetail.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function BlogpostDetail() {
    const {id} = useParams();
    const [getById, setGetById] = useState({});
    const [deletePost, setDeletePost] = useState(false);
    const [errorGetById, toggleErrorGetById] = useState(false);
    const [errorDeletePost, toggleErrorDeletePost] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        void fetchPostById();
    }, []);

    async function fetchPostById() {
        toggleErrorGetById(false);

        try {
            toggleLoading(true);
            const result = await axios.get(`http://localhost:3000/posts/${id}`);
            console.log(result.data);
            setGetById(result.data);
        } catch (e) {
            console.error(e);
            toggleErrorGetById(true);
        }
        toggleLoading(false);
    }

    async function deletePostById() {
        toggleErrorDeletePost(false);
        navigate("/blogposts/");

        try {
            toggleLoading(true);
            const result = await axios.delete(`http://localhost:3000/posts/${id}`);
            console.log(result.data);
            setDeletePost(true);
        } catch (e) {
            console.error(e);
            toggleErrorDeletePost(true);
        }
        toggleLoading(false);
    }


    return (
        <main>
            <div className="new-posts-outer-container ">
                <h2>Blogpost Detail</h2>

                <section className="new-posts-inner-container">

                    {errorGetById && <p className="error-message">Deze blog bestaat niet (meer).</p>}
                    {loading && <p>Loading...</p>}

                    {Object.keys(getById).length > 0 &&
                        <div>
                            <h3>{getById.title} ({getById.readTime} minuten)</h3>
                            <h4>{getById.subtitle}</h4>
                            <h5>Geschreven door {getById.author} op {createDateToString(getById.created)}</h5>
                            <p>{getById.content}</p>
                            <p>{getById.comments} reacties - {getById.shares} keer gedeeld</p>

                            <button type="button" onClick={() => deletePostById()}>Verwijder deze post</button>
                            {errorDeletePost &&
                                <p className="error-message">Er ging iets mis, allicht is deze post al verwijderd.</p>}
                            {loading && <p>Loading...</p>}
                            {deletePost && <p>De post is succesvol verwijderd.</p>}

                            <button type="button" onClick={() => navigate(`/blogposts/${getById.id}/edit`)}>Bewerk deze
                                post
                            </button>
                            <button type="button" onClick={() => navigate("/blogposts/")}>Terug naar alle posts</button>
                        </div>
                    }

                </section>
            </div>

        </main>
    )
}

export default BlogpostDetail;