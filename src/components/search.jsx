import React, { useState } from 'react';

export default function Search(props) {
    return (
        <>
            <div className="Search-container">
                <span className="Search-Icon">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </span>
                <input className="Search-Input" type="text" placeholder="Search call transcript" aria-label="Search" onChange={(event) => {
                    // Actions.searchStories(event.target.value);
                }} />
            </div>
        </>
    )
}