import React, { useEffect } from "react";
import { fetchPreviews, hidePreviews } from "../../app/redditSlice";
import styles from "./SearchPreview.module.css";
import { useDispatch, useSelector } from "react-redux";
import PreviewTile from "../PreviewTile/PreviewTile";

export function SearchPreview(props) {
    const reddit = useSelector((state) => state.reddit);
    const { searchTerm, previews, showingPreviews } = reddit;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPreviews(searchTerm));
    }, [searchTerm, dispatch]);

    if (previews.length === 0) {
        return;
    };

    const previewsClass = showingPreviews ? `${styles.previews}` : `${styles.hide}`;

    return (
        <div id="preview" className={previewsClass}>
        {previews.map((preview) => (
        <PreviewTile 
            preview={preview}
            key={preview.id}/>
        ))}
        </div>
    )
}