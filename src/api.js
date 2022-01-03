export async function fetchUrls(country){
    const response = await fetch(
        `https://covid-api.mmediagroup.fr/v1/cases?country=${country}`
    );
    return response.json();
}