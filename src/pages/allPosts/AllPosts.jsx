import posts from '../../constants/data.json';
import {Link} from "react-router-dom";
import './AllPosts.css'

function AllPosts() {
    console.log(posts);

    return (
        <>
            <section className="all-posts-outer-container">
                <h2>Overzichtspagina</h2>
                <p>Totaal aantal blogs: {posts.length}</p>
                {posts.map((post) => (
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