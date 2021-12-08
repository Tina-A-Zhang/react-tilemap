import React from 'react';
import './index.css';
import Button from './Button';

class Map extends React.Component {
    state = {
        zoom: 0, // image zoom
        containerLeft: window.innerWidth / 2 - 256 * (2 ** -1),
        containerTop: window.innerHeight / 2 - 256 * (2 ** (-1)),
        center_x: 0,
        center_y: 0,
        tileSize: 256,
    };

    async componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }
    zoomin = () => {
        console.log(this);
        if (this.state.zoom >= 3) {
            return;
        }
        var zoom = this.state.zoom + 1;
        var left = this.state.containerLeft - this.state.tileSize * (2 ** zoom - 2 ** this.state.zoom) / 2;
        var top = this.state.containerTop - this.state.tileSize * (2 ** zoom - 2 ** this.state.zoom) / 2;
        this.setState({
            zoom: zoom,
            containerLeft: left,
            containerTop: top,
        });
    }


    zoomout = () => {
        if (this.state.zoom <= 0) {
            return;
        }
        var zoom = this.state.zoom - 1;
        var left = this.state.containerLeft - this.state.tileSize * (2 ** zoom - 2 ** this.state.zoom) / 2;
        var top = this.state.containerTop - this.state.tileSize * (2 ** zoom - 2 ** this.state.zoom) / 2;
        this.setState({
            zoom: zoom,
            containerLeft: left,
            containerTop: top,
        });
    }

    handleKeyDown = (e) => {
        let left = this.state.containerLeft, top = this.state.containerTop, tileSize = this.state.tileSize, zoom = this.state.zoom;
        let center_x = this.state.center_x, center_y = this.state.center_y;
        const step = 10;
        if (e.key === "-") { // -
            if (zoom > 0) {
                zoom = zoom - 1;
                left = left - tileSize * (2 ** zoom - 2 ** this.state.zoom) / 2;
                top = top - tileSize * (2 ** zoom - 2 ** this.state.zoom) / 2;
            }
        } else if (e.key === "=") { // +
            if (zoom < 3) {
                zoom = zoom + 1;
                left = left - this.state.tileSize * (2 ** zoom - 2 ** this.state.zoom) / 2;
                top = this.state.containerTop - this.state.tileSize * (2 ** zoom - 2 ** this.state.zoom) / 2;
            }
        } else if (e.key === "ArrowLeft") { // <-
            left = left - step;
            center_x = center_x - 10;
        } else if (e.key === "ArrowRight") { // ->
            left = left + step;
            center_x = center_x + 10;
        } else if (e.key === "ArrowUp") { // up
            top = top - step;
            center_y = center_y + 10;
        } else if (e.key === "ArrowDown") { // down
            top = top + step;
            center_y = center_y - 10;
        }
        this.setState({
            zoom: zoom,
            containerLeft: left,
            containerTop: top,
            center_x: center_x,
            center_y: center_y
        });
    }
    render() {

        let zoom = this.state.zoom;
        let containerWidth = this.state.tileSize * 2 ** zoom;
        let imgUrls = [];
        for (let i = 0; i < 2 ** zoom; i++) {
            let urls = [];
            for (let j = 0; j < 2 ** zoom; j++) {
                let url = 'https://challenge-tiler.services.propelleraero.com/tiles/' + zoom + '/' + j + '/' + i + '?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGluYS16aGFuZyIsImlhdCI6MTYzODQyMTAxOH0.7a-1gEFZ1hYH-EE2vvLBJavAFLbdh1uLhDvlJ6X-qSo';
                urls.push(url);
            }
            imgUrls.push(urls);
        }
        let left = this.state.containerLeft + 'px';
        let top = this.state.containerTop + 'px';
        return (
            <div className='map_box'>
                <div className='windows' style={{ marginLeft: left, marginTop: top }}>
                    <div className='container' style={{ width: containerWidth, lineHeight: 0 }}>
                        {imgUrls.map(
                            (urls) => (
                                urls.map(
                                    (url) => (
                                        <img src={url} key="map-image" />
                                    )
                                )
                            )
                        )}
                    </div>
                </div>
                <div className="zoom-btns">
                    <Button ButtonType="zoom-in" onClick={this.zoomin} />
                    <Button ButtonType="zoom-out" onClick={this.zoomout} />
                </div>
            </div >
        );
    }
}

export default Map;
