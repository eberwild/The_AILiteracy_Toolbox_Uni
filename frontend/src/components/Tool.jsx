import '../styles/components/Tool.css';

function Tool({tool , setRatingMenuOpen , setActiveTool , ratingSRC }) {
    
    return (

        <>
            <div className="tool">
                <div className="tool-title">
                    {tool.title}
                </div>
                <img src={tool.img_URL}
                        className="tool-img" 
                        alt={tool.title}/>

                <img src={ratingSRC}
                        className="tool-rating"
                        onClick={(event) => {
                            event.stopPropagation();
                            setActiveTool(tool);
                            setRatingMenuOpen(true);
                        }}/>

                <div className="tool-provider">
                    {tool.name}
                </div>

                <button className='tool-play-button'
                    onClick={() => {
                        window.open(tool.renderURL , '_blank')
                    }}
                >
                    Play 
                </button>

                <div className='tool-description'>
                        {tool.description}
                </div>
            </div>
        </>
    )
}

export default Tool;