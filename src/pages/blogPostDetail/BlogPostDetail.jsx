import posts from '../../constants/data.json';
import {Link, useParams} from "react-router-dom";
import createDateToString from "../../helpers/createDateToString.jsx";
import './BlogpostDetail.css';

function BlogpostDetail() {
    const {id} = useParams();
    const {title, readTime, subtitle, author, created, content, comments, shares} = posts.find((post) => {
        return post.id.toString() === id;
    });

    return(
        <main>
            <div className="new-posts-outer-container ">
                <h2>Blogpost Detail</h2>

                <section className="new-posts-inner-container">
                    <h3>{title} ({readTime} minuten)</h3>
                    <h4>{subtitle}</h4>
                    <h5>Geschreven door {author} op {createDateToString(created)}</h5>
                    <p>{content}</p>
                    <p className="comments-shares">{comments} reacties - {shares} keer gedeeld</p>
                    <Link to="/blogposts">Terug naar alle posts</Link>
                </section>
            </div>

        </main>
    )
}

export default BlogpostDetail;