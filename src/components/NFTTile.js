import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";

function NFTTile (data) {
    const newTo = {
        pathname:"/nftPage/"+data.data.tokenId
    }
    return (
        <Link to={newTo}>
        <div style={{border: '2', marginLeft: '12', marginTop: '5', marginBottom: '12', flex: 'flex-col', alignItems: 'center', borderRadius: '0.5rem', width: '12rem', maxWidth: '72'}}>
            <img src={data.data.image} alt="" style={{width: '130px', height: '150px', borderRadius: '0.5rem', objectFit: 'cover'}} />
            <div style={{textColor: 'white', width: '100%', backgroundImage: 'linear-gradient(to top, var(--tw-gradient-stops))', borderRadius: '0.5rem', paddingTop: '1.25rem', marginTop: '5rem'}}>
                <strong style={{fontSize: '1.25rem', lineHeight: '1.75rem'}}>{data.data.name}</strong>
                <p style={{display: 'inline'}}>
                    {data.data.description}
                </p>
            </div>
        </div>
        </Link>
    )
}

export default NFTTile;