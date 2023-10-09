import React, { useEffect } from "react";
import { fetchPreviews } from "../../app/redditSlice";
import styles from "./SearchPreview.module.css";
import { useDispatch, useSelector } from "react-redux";
import PreviewTile from "../PreviewTile/PreviewTile";

export function SearchPreview() {
    const reddit = useSelector((state) => state.reddit);
    const { searchTerm, previews } = reddit;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPreviews(searchTerm));
    }, [searchTerm, dispatch]);

    if (previews.length === 0) {
        return;
    };

    return (
        <div className={styles.previews}>
        {previews.map((preview) => (
        <PreviewTile 
            preview={preview}
            key={preview.id}/>
        ))}
        </div>
    )
}