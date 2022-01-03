import React, {useEffect, useState} from "react";
import {fetchUrls} from "./api";

function Header() {
    return (
        <header className="hero is-dark is-bold is-mediam">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <h1 className="title">Influence of Covid-19</h1>
                </div>
            </div>
        </header>
    );
}

function Loading(){
    return (
        <p className="title has-text-centered">Loading...</p>
    );
}

function Data(props) {
    const {data} = props;
    if(data == null){
        return <Loading />;
    }
    const capital = data.All.capital_city;
    return (
        <div>
            <div className="columns">
                <div className="column is-full">
                    <figure className="content">
                        <p className="title has-text-centered">Country : {data.All.country}</p>
                        <ul className="content">
                            <li className="subtitle">Capital_city : {data.All.capital_city}</li>
                            <li className="subtitle">Population : {data.All.population}</li>
                            <li className="subtitle">Confirmed : {data.All.confirmed}</li>
                            <li className="subtitle">Recovered : {data.All.recovered}</li>
                            <li className="subtitle">Deaths : {data.All.deaths}</li>
                        </ul>
                    </figure>
                </div>
            </div>
            <div>
                <div className="columns">
                    <div className="column is-centered">
                        <figure className="content has-text-centered">
                            <p className="subtitle has-text-centered">About {capital}</p>
                            <ul>
                                <li>city : {data.All.capital_city}</li>
                                <li>Confirmed : {data[capital].confirmed}</li>
                                <li>Recovered : {data[capital].recovered}</li>
                                <li>Deaths : {data[capital].deaths}(Updated:{data[capital].updated})</li>
                            </ul>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Form(props){
    function handleSubmit(event){
        event.preventDefault();
        const {country} = event.target.elements;
        props.onFormSubmit(country.value);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p className="title has-text-centered">Choose Country</p>
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <div className="select is-fullwidth">
                            <select name="country" defaultValue="Japan">
                                <option value="Germany">Germany</option>
                                <option value="Japan">Japan</option>
                                <option value="Russia">Russia</option>
                                <option value="Spain">Spain</option>
                                <option value="US">US</option>
                            </select>
                        </div>
                    </div>
                    <div className="control">
                        <button type="submit" className="button is-info">
                            Reload
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function Main() {
    const [data, setUrl] = useState(null);
    useEffect(() => {
        fetchUrls("Japan").then((data) => {
            setUrl(data);
        });
    }, []);

    function reloadData(country){
        fetchUrls(country).then((data) => {
            setUrl(data);
        });
    }

    return (
        <main>
            <section className="section">
                <div className="container">
                    <Form onFormSubmit={reloadData}/>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <Data data = {data}/>
                </div>
            </section>
        </main>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>Text Information are retrieved from Covid-19-API.<br/>日本大学文理学部情報科学科 Webプログラミング演習課題</p>
                <p>
                    <a href="https://mmediagroup.fr/covid-19">Home link to Covid-19-API</a>
                </p>
                <p>5420038 坂井俊亮</p>
            </div>
        </footer>
    );
}

function App() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;