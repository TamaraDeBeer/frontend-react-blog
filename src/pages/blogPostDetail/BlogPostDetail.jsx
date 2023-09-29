import {Link, useParams} from "react-router-dom";
import createDateToString from "../../helpers/createDateToString.jsx";
import './BlogpostDetail.css';
import {useState} from "react";
import axios from "axios";

function BlogpostDetail() {
    const {id} = useParams();
    const [getById, setGetById] = useState({});
    const [deletePost, setDeletePost] = useState({});
    const [errorGetById, toggleErrorGetById] = useState(false);
    const [errorDeletePost, toggleErrorDeletePost] = useState(false);

    async function fetchPostById() {
        toggleErrorGetById(false);
        try {
            const result = await axios.get(`http://localhost:3000/posts/${id}`);
            console.log(result.data);
            setGetById(result.data);
        } catch (e) {
            console.error(e);
            toggleErrorGetById(true);
        }
    }

    async function deletePostById() {
        toggleErrorDeletePost(false);

        try {
            const result = await axios.delete(`http://localhost:3000/posts/${id}`);
            console.log(result.data);
            setDeletePost('Deze post is succesvol verwijderd' + result.data);
        } catch (e) {
            console.error(e);
            toggleErrorDeletePost(true);
        }
    }

    return (
        <main>
            <div className="new-posts-outer-container ">
                <h2>Blogpost Detail</h2>

                <section className="new-posts-inner-container">
                    <button type="button" onClick={() => fetchPostById()}>Get post by ID</button>
                    {errorGetById && <p className="error-message">Deze blog bestaat niet (meer).</p>}
                    {Object.keys(getById).length > 0 &&
                        <div>
                            <h3>{getById.title} ({getById.readTime} minuten)</h3>
                            <h4>{getById.subtitle}</h4>
                            <h5>Geschreven door {getById.author} op {createDateToString(getById.created)}</h5>
                            <p>{getById.content}</p>
                            <p>{getById.comments} reacties - {getById.shares} keer gedeeld</p>

                            <button type="button" onClick={() => deletePostById()}>Verwijder deze post</button>
                            {errorDeletePost && <p className="error-message">Er ging iets mis, allicht is deze post al verwijderd.</p>}

                            <Link to="/blogposts">Terug naar alle posts</Link>
                        </div>
                    }

                </section>
            </div>

        </main>
    )
}

export default BlogpostDetail;