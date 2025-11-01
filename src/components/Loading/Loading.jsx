import './Loading.css'
function Loading({inline}){
    
    return(
        <>
        <div className={`loading-container ${inline?'inline':'overlay'}`}>
            <div className="loading"><i className="fa fa-spinner"></i></div>
            <div className="loading text" aria-hidden={true} hidden={true}>Loading...</div>
        </div>
        </>
    )
}
export default Loading;