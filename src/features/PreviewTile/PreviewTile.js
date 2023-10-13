import React from "react";
import styles from "./PreviewTile.module.css";
import { setSelectedSubreddit } from "../../app/redditSlice";
import { useDispatch } from "react-redux";
import images from "../../util/randomAvatar";

export default function PreviewTile( { preview }) {
    const dispatch = useDispatch();
    
    const changeSubreddit = () => {
        dispatch(setSelectedSubreddit(preview.display_name_prefixed))
    };

    const source = preview.icon_img ? preview.icon_img : images[2];

    return (
        <div className={styles.preview} onClick={changeSubreddit}>
            <img src={source} className={styles.previewImage}/>
            <div className={styles.previewInfo}>
                <h3 className={styles.previewTitle}>{preview.display_name_prefixed}</h3>
                <p className={styles.previewSubscribers}>{preview.subscribers} subscribers</p>
            </div>
        </div>
    )
}
