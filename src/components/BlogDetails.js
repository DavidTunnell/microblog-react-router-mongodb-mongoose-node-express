import { useParams, useHistory } from "react-router-dom";
import useFetchRead from "../utils/useFetchRead";
import { fetchDelete } from "../utils/api";

const BlogDetails = () => {
    //this allows ups to grab parameters from the URL routes with destructuring
    const { id } = useParams();
    const {
        data: blog,
        error,
        isPending,
    } = useFetchRead("http://localhost:8000/blogs/" + id);
    const history = useHistory();

    const handleClick = () => {
        fetchDelete("http://localhost:8000/blogs/", id).then(() => {
            history.push("/");
        });
    };

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}
        </div>
    );
};

export default BlogDetails;
