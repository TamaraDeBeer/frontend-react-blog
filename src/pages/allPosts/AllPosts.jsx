import './AllPosts.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function AllPosts() {
    const [allPosts, setAllPosts] = useState([]);
    const [errorAllPosts, toggleErrorAllPosts] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        void fetchAllPosts();
    }, []);

    async function fetchAllPosts() {
        toggleErrorAllPosts(false);

        try {
            toggleLoading(true);
            const result = await axios.get('http://localhost:3000/posts');
            setAllPosts(result.data);
        } catch (e) {
            console.error(e);
            toggleErrorAllPosts(true);
        }
        toggleLoading(false);
    }


    return (
        <main>
            <section className="all-posts-outer-container">
                <h2>Overzichtspagina</h2>

                {errorAllPosts &&
                    <p className="error-message">De connectie met de database is tijdelijk verbroken, probeer het over
                        enkele minuten nog eens...</p>}
                {loading && <p>Loading...</p>}

                <p>Totaal aantal blogs: {allPosts.length}</p>
                {allPosts.map((post) => (
                    <div key={post.id} className="all-posts-inner-container">
                        <h4><Link to={`/blogposts/${post.id}`}>{post.title}</Link> ({post.author})</h4>
                        <p>{post.comments} reacties - {post.shares} keer gedeeld</p>
                    </div>
                ))}
            </section>
        </main>
    )
}


export default AllPosts;