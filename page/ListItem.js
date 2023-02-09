import React from 'react';
import { Link } from 'react-router-dom';
//import './ListItem.css'

function ListItem({ board_id, title, start_date, end_date }) {

    return (
        <Link to={{
            pathname:"/detail",
            search:`?board_id=${board_id}`
        }} style={{ textDecoration: 'none', color: 'black'}}>
            <div className="list-item">
                <div className="id">{board_id}</div>
                <div className="column-title">{title}</div>
                <div className="member">작성자</div>
                <div className="start">{start_date}</div>
                <div className="end">{end_date}</div>
            </div>
        </Link>
    )
}

export default ListItem;