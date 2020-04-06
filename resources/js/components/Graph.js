import React from 'react';
import ReactDOM from 'react-dom';

function Graph() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component fewfew</div>

                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Graph;

if (document.getElementById('graph')) {
    ReactDOM.render(<Graph />, document.getElementById('graph'));
}
