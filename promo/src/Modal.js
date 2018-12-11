import ReactDOM from 'react-dom';

function PostItPopUp(props) {
    return ReactDOM.createPortal(
        props.children,
        props.element
    );
}

export default PostItPopUp;