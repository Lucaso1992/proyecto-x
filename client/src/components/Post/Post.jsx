import styles from "./Post.module.css";

const Post = ({ img, text }) => {


    

    return (
        <div class={`card ${styles.post_container}`}>
            <div className={styles.img_container}>
                <img src={img} class={`card-img-top ${styles.img}`} alt={text} />
            </div>
            <div class="card-body">
                <h5 class="card-title">{text}</h5>
            </div>
        </div>
    )
}

export default Post;