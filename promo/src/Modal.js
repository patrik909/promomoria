import ReactDOM from 'react-dom';

// console.log("hej")

function PostItPopUp(props) {
    // return ("hej");
    console.log("hej")
    return ReactDOM.createPortal(
        props.children,
        props.element
    );
}

export default PostItPopUp;