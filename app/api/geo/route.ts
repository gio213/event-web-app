import { geolocation } from '@vercel/edge';

export function GET(request: Request) {
    const { city, country, region } = geolocation(request);
    console.log(city, country, region);
    return new Response(`<h1>Your location is ${city}, ${region}, ${country}</h1>`, {
        headers: { 'content-type': 'text/html' },
    });
}