// @ts-nocheck
import { useState, Fragment } from 'react';
import { buildFeedBackPath, extractFeedback } from '../api/feedback/index';

function FeedbackPage(props) {
    const [feedbackData, setFeedbackData] = useState();

    function loadFeedbackHandler(id) {
        fetch(`/api/feedback/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setFeedbackData(data.feedback);
            });
    }

    return (
        <Fragment>
            {feedbackData && <p>{feedbackData.email}</p>}
            <ul>
                {props.feedbackItems.map((item) => (
                    <li key={item.id}>
                        {item.text}
                        <button
                            onClick={loadFeedbackHandler.bind(null, item.id)}
                        >
                            Show Details
                        </button>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
}

export async function getStaticProps() {
    const filePath = buildFeedBackPath();
    const data = extractFeedback(filePath);
    return {
        props: {
            feedbackItems: data,
        },
    };
}

export default FeedbackPage;
