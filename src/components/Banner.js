import 'bootstrap/dist/css/bootstrap.min.css';

const Banner = () => {
    return (
        <div >
            <h1 style={bannerText}>Force Quotes</h1>
        </div>
    )
}


const bannerText = {
    margin: 'auto',
    padding: '40px',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'SFDistantGalaxy',
    whiteSpace: 'nowrap',

}

export default Banner
