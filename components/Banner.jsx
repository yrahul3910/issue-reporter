import React from "react";

class Banner extends React.Component {
    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper" style={{backgroundColor: "teal"}} >
                        <a href="#" className="brand-logo left-shift">Issue Reporter</a>
                    </div>
                </nav>
                <div className="row banner white-text" style={{backgroundImage: "url('banner.jpg')"}} >
                    <h3 className="left-shift" style={{marginTop: "70px"}}>Intelligent Duplicate Filtering</h3>
                    <div className="col s6 left-shift" style={{marginBottom: "40px"}} >
                        <p>
                            Issue Reporter lets you connect with citizens, users and clients using
                            powerful natural language processing algorithms to filter out duplicate
                            issues automatically, letting you focus on how many issues really exist.
                        </p><br />
                        <p>
                            Easily sort your issues based on number of duplicates, location, and
                            multiple other parameters, and visualize your issue resolutions with
                            charts.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;
