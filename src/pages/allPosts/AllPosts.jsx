import './AllPosts.css'
import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function AllPosts() {
    const [allPosts, setAllPosts] = useState([]);
    const [errorAllPosts, toggleErrorAllPosts] = useState(false);

    async function fetchAllPosts() {
        toggleErrorAllPosts(false);

        try {
            const result = await axios.get('http://localhost:3000/posts');
            console.log(result.data);
            setAllPosts(result.data);
        } catch (e) {
            console.error(e);
            toggleErrorAllPosts(true);
        }
    }

    return (
        <>
            <section className="all-posts-outer-container">
                <h2>Overzichtspagina</h2>

                <button type="button" onClick={fetchAllPosts}>Get all posts</button>
                {errorAllPosts && <p className="error-message">De connectie met de database is tijdelijk verbroken, probeer het over enkele minuten nog eens...</p>}
                <p>Totaal aantal blogs: {allPosts.length}</p>
                {allPosts.map((post) => (
                    <div key={post.id} className="all-posts-inner-container">
                        <h4><Link to={`/blogposts/${post.id}`}>{post.title}</Link> ({post.author})</h4>
                        <p>{post.comments} reacties - {post.shares} keer gedeeld</p>
                    </div>
                ))}
            </section>
        </>
    )
}


export default AllPosts;