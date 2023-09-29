import './App.css'

import Navigation from "./components/Navigation/Navigation.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import NewPost from "./pages/newPost/NewPost.jsx";
import AllPosts from "./pages/allPosts/AllPosts.jsx";
import BlogpostDetail from "./pages/blogpostDetail/BlogpostDetail.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import UpdatePost from "./pages/updatePost/UpdatePost.jsx";


function App() {

    return (
        <>
            <div>
                <Navigation/>

                <Routes>

                    <Route path="/" element={<Home/>}/>
                    <Route path="/new" element={<NewPost/>}/>
                    <Route path="/blogposts" element={<AllPosts/>}/>
                    <Route path="/blogposts/:id" element={<BlogpostDetail/>}/>
                    <Route path="/blogposts/:id/edit" element={<UpdatePost/>}/>
                    <Route path="*" element={<NotFound/>}/>

                </Routes>
            </div>
        </>

    )
}

export default App