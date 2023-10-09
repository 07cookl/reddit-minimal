import React from "react";
import styles from "./PreviewTile.module.css";
import { setSelectedSubreddit } from "../../app/redditSlice";
import { useDispatch } from "react-redux";

export default function PreviewTile( { preview }) {
    const dispatch = useDispatch();
    
    const changeSubreddit = () => {
        dispatch(setSelectedSubreddit(`/${preview.display_name_prefixed}`))
    };

    return (
        <div className={styles.preview} onClick={changeSubreddit}>
            <img src={preview.icon_img} className={styles.previewImage}/>
            <div className={styles.previewInfo}>
                <h3 className={styles.previewTitle}>{preview.display_name_prefixed}</h3>
                <p className={styles.previewSubscribers}>{preview.subscribers} subscribers</p>
            </div>
        </div>
    )
}
